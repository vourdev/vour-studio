import { answers, type Answer } from "@/lib/chat/answers";

/**
 * Words that carry no meaning in an Indonesian question. Dropping them stops
 * "apa", "bisa" and "saya" from making every question look alike.
 */
const STOP_WORDS = new Set([
  "apa", "apakah", "itu", "yang", "di", "ke", "dari", "dan", "atau", "untuk",
  "dengan", "saya", "kami", "kalian", "anda", "bisa", "boleh", "ada", "nya",
  "sudah", "juga", "akan", "pada", "saja", "mau", "ingin", "kalau", "jika",
  "ya", "dong", "sih", "kah", "pun", "aja", "min", "kak", "halo", "hai",
  "tolong", "mohon", "punya", "dapat", "adalah", "ini", "dalam", "oleh",
]);

/**
 * Colloquial and abbreviated forms mapped onto the vocabulary the knowledge
 * base actually uses. Visitors type "brp hrg lp", the answers say "berapa
 * harga landing page"; without this the match never happens.
 */
const SYNONYMS: Record<string, string> = {
  // Spelling and shorthand
  brp: "berapa", hrg: "harga", gmn: "bagaimana", gimana: "bagaimana",
  gmna: "bagaimana", bgmn: "bagaimana", knp: "kenapa", kpn: "kapan",
  gak: "tidak", ga: "tidak", nggak: "tidak", enggak: "tidak", engga: "tidak",
  tdk: "tidak", blm: "belum", udh: "sudah", udah: "sudah", bikin: "buat",
  bkn: "buat", dpt: "dapat", sm: "sama",
  yg: "yang", dgn: "dengan", utk: "untuk", jg: "juga", trs: "terus",

  // Domain shorthand
  lp: "landing page", web: "website", situs: "website", webnya: "website",
  wa: "whatsapp", cs: "kontak", hp: "telepon", no: "nomor",
  sc: "source code", vps: "hosting", ssl: "keamanan", cms: "website",

  // Meaning-equivalent vocabulary
  biaya: "harga", tarif: "harga", bayar: "harga", budget: "harga",
  ongkos: "harga", price: "harga", murah: "harga", mahal: "harga",
  lama: "waktu", durasi: "waktu", selesai: "waktu", deadline: "waktu",
  estimasi: "waktu",
  kantor: "lokasi", alamat: "lokasi", dimana: "lokasi", tempat: "lokasi",
  daerah: "lokasi", berlokasi: "lokasi",
  aman: "keamanan", garansi: "keamanan", jaminan: "keamanan",
  pakai: "gunakan", pake: "gunakan", make: "gunakan", digunakan: "gunakan",
  menggunakan: "gunakan", memakai: "gunakan",
  tech: "teknologi", stack: "teknologi",
  framework: "teknologi", bahasa: "teknologi", coding: "teknologi",
  pesan: "memulai", order: "memulai", mulai: "memulai", pemesanan: "memulai",
  daftar: "memulai", booking: "memulai",
  ubah: "revisi", ganti: "revisi", perbaikan: "revisi", edit: "revisi",
  ecommerce: "toko", olshop: "toko", jualan: "toko", shop: "toko",
  hosting: "hosting", server: "hosting", domain: "domain",
  milik: "kepemilikan", punyai: "kepemilikan", hak: "kepemilikan",
  layanan: "layanan", jasa: "layanan", service: "layanan",
  perusahaan: "identitas", studio: "identitas", agency: "identitas",
  profil: "identitas",
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

/** Indonesian clitics and possessives. Stripping them collapses
    "pengerjaannya" onto "pengerjaan", which is the same word to a reader. */
const SUFFIXES = ["nya", "kah", "lah", "pun", "ku", "mu"];

function stem(word: string) {
  for (const suffix of SUFFIXES) {
    if (word.length > suffix.length + 3 && word.endsWith(suffix)) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}

function tokenize(text: string) {
  const out: string[] = [];

  for (const raw of normalize(text).split(/\s+/)) {
    if (!raw) continue;

    const mapped = SYNONYMS[raw] ?? SYNONYMS[stem(raw)] ?? stem(raw);
    for (const word of mapped.split(" ")) {
      const token = stem(word);
      if (token.length > 2 && !STOP_WORDS.has(token)) out.push(token);
    }
  }
  return out;
}

/**
 * Inverse document frequency. A question sharing the word "landing" with an
 * answer says little, since dozens mention it; sharing "sitemap" says a lot.
 * Weighting by rarity is what separates a real match from a topical one.
 */
const documentFrequency = new Map<string, number>();

const seenQuestions = new Set<string>();

const index = answers
  .filter((answer) => {
    const key = normalize(answer.q).replace(/\s+/g, " ").trim();
    if (seenQuestions.has(key)) return false;
    seenQuestions.add(key);
    return true;
  })
  .map((answer) => {
    const tokens = new Set([...tokenize(answer.q), ...tokenize(answer.topic)]);

    for (const token of tokens) {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    }
    return { answer, tokens };
  });

function weight(token: string) {
  const seen = documentFrequency.get(token) ?? 0;
  return Math.log((index.length + 1) / (seen + 1)) + 1;
}

/**
 * A match must clear this share of the question's total weight. Tuned against
 * real phrasings: lower and "berapa lama pengerjaannya" starts matching
 * "bagaimana proses pengerjaannya", which is a different question with a
 * confident-looking wrong answer.
 */
const THRESHOLD = 0.38;

/**
 * Near-ties are not a problem to solve. Several stored questions about domains
 * score alike because they are all about domains, and answering with any of
 * them is right. An earlier version rejected those ties and answered barely
 * half the questions it had answers for. The threshold alone decides.
 */

export type MatchResult =
  /** Confident enough to answer. `related` keeps the topic browsable. */
  | { kind: "answer"; answer: Answer; related: Answer[] }
  /** Recognised the subject but not the question. Offer what we do have. */
  | { kind: "suggestions"; options: Answer[] }
  | { kind: "unmatched" };

/**
 * Anything scoring above this is related enough to offer as a choice, even
 * though it is too weak to answer with. Asking about landing pages should
 * surface every landing page question rather than dead-ending at WhatsApp.
 */
const SUGGEST_FLOOR = 0.22;

const MAX_SUGGESTIONS = 5;
const MAX_RELATED = 3;

/** Unique answers, in knowledge-base order. Duplicates exist across sections. */
const uniqueAnswers = index.map((entry) => entry.answer);

/** Topics in the order the knowledge base introduces them. */
export function listTopics(): string[] {
  const seen: string[] = [];
  for (const answer of uniqueAnswers) {
    if (!seen.includes(answer.topic)) seen.push(answer.topic);
  }
  return seen;
}

export function questionsByTopic(topic: string): Answer[] {
  return uniqueAnswers.filter((answer) => answer.topic === topic);
}

/**
 * Visitor-facing names for the knowledge base's section headings. The headings
 * were written for whoever maintains the file, so several are internal jargon
 * ("Whatsapp Lead Qualification") or English where the site is Indonesian.
 */
const TOPIC_LABELS: Record<string, string> = {
  "IDENTITAS VOUR.dev": "Tentang vour.dev",
  "LAYANAN VOUR.dev": "Layanan",
  "LANDING PAGE": "Landing Page",
  "HOSTING & DEPLOYMENT": "Hosting & Deployment",
  "SOURCE CODE": "Source Code",
  TEKNOLOGI: "Teknologi",
  HARGA: "Harga",
  REVISI: "Revisi",
  "CLIENT MATERIAL": "Materi dari Klien",
  "PROSES PEMESANAN": "Cara Memesan",
  "LANDING PAGE USE CASE": "Kegunaan Landing Page",
  FITUR: "Fitur",
  "SEO & PERFORMANCE": "SEO & Performa",
  MAINTENANCE: "Maintenance",
  KEAMANAN: "Keamanan",
  DOMAIN: "Domain",
  "SOURCE CODE & OWNERSHIP": "Kepemilikan",
  "WHATSAPP LEAD QUALIFICATION": "Pertanyaan Umum",
  "OBJECTION HANDLING": "Pertimbangan",
  PRODUCTS: "Produk",
  CONTACT: "Kontak",
};

export function topicLabel(topic: string): string {
  return TOPIC_LABELS[topic] ?? topic;
}

export function findQuestion(question: string): Answer | undefined {
  return uniqueAnswers.find((answer) => answer.q === question);
}

/** The brand's own name carries no topic, so a question made only of it is
    asking who we are. It is also the single likeliest opening question. */
const BRAND_TOKENS = new Set(["vour", "dev", "vourdev"]);

const identityAnswer = answers.find((entry) => entry.q === "Apa itu VOUR.dev?");

export function findAnswer(question: string): MatchResult {
  const tokens = tokenize(question);
  if (tokens.length === 0) return { kind: "unmatched" };

  if (identityAnswer && tokens.every((token) => BRAND_TOKENS.has(token))) {
    return { kind: "answer", answer: identityAnswer, related: [] };
  }

  const asked = new Set(tokens);
  let askedWeight = 0;
  for (const token of asked) askedWeight += weight(token);
  if (askedWeight === 0) return { kind: "unmatched" };

  const scored: { answer: Answer; score: number }[] = [];

  for (const { answer, tokens: candidate } of index) {
    let shared = 0;
    for (const token of asked) {
      if (candidate.has(token)) shared += weight(token);
    }
    if (shared === 0) continue;

    /* Weighted Dice: the overlap has to account for much of BOTH sides. A
       stored question that merely contains the asked words, among many others,
       scores lower than a short one that is about exactly them. */
    let candidateWeight = 0;
    for (const token of candidate) candidateWeight += weight(token);

    scored.push({ answer, score: (2 * shared) / (askedWeight + candidateWeight) });
  }

  if (scored.length === 0) return { kind: "unmatched" };
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (best.score >= THRESHOLD) {
    /* Sibling questions under the same topic. Whatever the visitor asked,
       these are the next things they are likely to want. */
    const related = scored
      .slice(1)
      .filter((entry) => entry.answer.topic === best.answer.topic)
      .slice(0, MAX_RELATED)
      .map((entry) => entry.answer);

    return { kind: "answer", answer: best.answer, related };
  }

  const options = scored
    .filter((entry) => entry.score >= SUGGEST_FLOOR)
    .slice(0, MAX_SUGGESTIONS)
    .map((entry) => entry.answer);

  if (options.length > 0) return { kind: "suggestions", options };

  return { kind: "unmatched" };
}
