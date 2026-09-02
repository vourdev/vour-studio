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
  siapa: "identitas", profil: "identitas",
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
  | { kind: "answer"; answer: Answer; score: number }
  | { kind: "unmatched" };

/** The brand's own name carries no topic, so a question made only of it is
    asking who we are. It is also the single likeliest opening question. */
const BRAND_TOKENS = new Set(["vour", "dev", "vourdev"]);

const identityAnswer = answers.find((entry) => entry.q === "Apa itu VOUR.dev?");

export function findAnswer(question: string): MatchResult {
  const tokens = tokenize(question);
  if (tokens.length === 0) return { kind: "unmatched" };

  if (identityAnswer && tokens.every((token) => BRAND_TOKENS.has(token))) {
    return { kind: "answer", answer: identityAnswer, score: 1 };
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
  if (best.score < THRESHOLD) return { kind: "unmatched" };

  return { kind: "answer", answer: best.answer, score: best.score };
}
