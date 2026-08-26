/**
 * Pricing configuration for the project estimator.
 *
 * TODO(Vour): every number here is a placeholder. Confirm the real commercial
 * ranges before launch. Nothing in the UI or the calculation engine hardcodes a
 * price, so changing a value in this file is the only edit required.
 *
 * All amounts are IDR. `min`/`max` describe the range a line item adds to the
 * estimate, never a final quote.
 */

export type ProjectTypeId = "website" | "webapp" | "ai" | "infra";
export type ComplexityId = "basic" | "standard" | "advanced";
export type Billing = "once" | "monthly";

export type PriceRange = { min: number; max: number };

export type ProjectType = {
  id: ProjectTypeId;
  label: string;
  description: string;
  examples: string[];
  base: PriceRange;
  /** Marks the range as a floor rather than a ceiling in the UI. */
  openEnded?: boolean;
  /** Not offered yet: shown but not selectable, and never priced. */
  comingSoon?: boolean;
};

export type Feature = {
  id: string;
  label: string;
  description: string;
  price: PriceRange;
  availableFor: ProjectTypeId[];
  /** Always part of the scope: pre-selected, not togglable, adds nothing. */
  included?: boolean;
};

export type ComplexityLevel = {
  id: ComplexityId;
  label: string;
  description: string;
  /**
   * Which slice of the project type's base range this level occupies, as
   * fractions of that range. The base range already spans simple to complex,
   * so complexity positions the estimate inside it instead of multiplying it.
   */
  band: { from: number; to: number };
};

export type Addon = {
  id: string;
  label: string;
  description: string;
  price: PriceRange;
  billing: Billing;
  availableFor: ProjectTypeId[];
};

export const projectTypes: ProjectType[] = [
  {
    id: "website",
    label: "Website & Landing Page",
    description: "Halaman publik yang memperkenalkan bisnis dan menarik calon klien.",
    examples: ["Landing Page", "Company Profile", "Marketing Website"],
    base: { min: 1_500_000, max: 4_000_000 },
  },
  {
    id: "webapp",
    label: "Web Application",
    description: "Sistem yang dipakai tim Anda sehari-hari untuk menjalankan operasional.",
    examples: ["Dashboard", "Sistem Internal", "SaaS", "Aplikasi Web Custom"],
    base: { min: 4_000_000, max: 15_000_000 },
    openEnded: true,
  },
  {
    id: "ai",
    label: "AI & Automation",
    description: "Otomatisasi pekerjaan berulang dan alur kerja yang selama ini manual.",
    examples: ["AI Workflow", "Automasi Bisnis", "AI Agent", "Automasi API"],
    base: { min: 3_000_000, max: 15_000_000 },
    openEnded: true,
    comingSoon: true,
  },
  {
    id: "infra",
    label: "Infrastructure & Deployment",
    description: "Menyiapkan server dan proses rilis supaya aplikasi jalan stabil di production.",
    examples: ["Setup Server", "Docker", "VPS", "CI/CD", "Deployment", "Monitoring"],
    base: { min: 1_500_000, max: 8_000_000 },
    openEnded: true,
  },
];

export const complexityLevels: ComplexityLevel[] = [
  {
    id: "basic",
    label: "Basic",
    description: "Untuk kebutuhan sederhana dan fokus pada satu tujuan.",
    band: { from: 0, to: 0.45 },
  },
  {
    id: "standard",
    label: "Standard",
    description: "Untuk kebutuhan bisnis dengan beberapa fitur dan integrasi.",
    band: { from: 0.25, to: 0.75 },
  },
  {
    id: "advanced",
    label: "Advanced",
    description: "Untuk sistem dengan banyak fitur, integrasi, atau workflow kompleks.",
    band: { from: 0.55, to: 1 },
  },
];

const WEB: ProjectTypeId[] = ["website", "webapp"];

export const features: Feature[] = [
  // Website & Web Application
  {
    id: "responsive",
    label: "Responsive Design",
    description: "Rapi di ponsel, tablet, dan desktop.",
    price: { min: 0, max: 0 },
    availableFor: WEB,
    included: true,
  },
  {
    id: "cms",
    label: "CMS / Admin Dashboard",
    description: "Ubah konten sendiri tanpa perlu developer.",
    price: { min: 1_500_000, max: 3_500_000 },
    availableFor: WEB,
  },
  {
    id: "auth",
    label: "Authentication",
    description: "Login, hak akses, dan manajemen pengguna.",
    price: { min: 1_000_000, max: 2_500_000 },
    availableFor: ["webapp"],
  },
  {
    id: "database",
    label: "Database",
    description: "Penyimpanan data yang terstruktur dan bisa dikembangkan.",
    price: { min: 1_000_000, max: 3_000_000 },
    availableFor: ["webapp", "ai"],
  },
  {
    id: "api",
    label: "API Integration",
    description: "Menyambungkan sistem dengan layanan yang sudah Anda pakai.",
    price: { min: 1_000_000, max: 3_000_000 },
    availableFor: ["website", "webapp", "ai"],
  },
  {
    id: "payment",
    label: "Payment Gateway",
    description: "Terima pembayaran langsung dari dalam sistem.",
    price: { min: 2_000_000, max: 4_500_000 },
    availableFor: WEB,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Integration",
    description: "Notifikasi atau percakapan yang masuk lewat WhatsApp.",
    price: { min: 500_000, max: 1_200_000 },
    availableFor: WEB,
  },
  {
    id: "multilang",
    label: "Multi-language",
    description: "Lebih dari satu bahasa untuk audiens yang berbeda.",
    price: { min: 1_000_000, max: 2_500_000 },
    availableFor: WEB,
  },
  {
    id: "seo",
    label: "SEO",
    description: "Struktur dan metadata supaya mudah ditemukan di pencarian.",
    price: { min: 750_000, max: 2_000_000 },
    availableFor: WEB,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Data pengunjung dan konversi yang bisa dibaca.",
    price: { min: 500_000, max: 1_200_000 },
    availableFor: WEB,
  },

  // AI & Automation
  {
    id: "llm",
    label: "LLM Integration",
    description: "Menyambungkan model bahasa ke dalam proses bisnis.",
    price: { min: 2_000_000, max: 5_000_000 },
    availableFor: ["ai"],
  },
  {
    id: "workflow",
    label: "AI Workflow",
    description: "Rangkaian langkah otomatis dari input sampai hasil akhir.",
    price: { min: 1_500_000, max: 4_000_000 },
    availableFor: ["ai"],
  },
  {
    id: "agent",
    label: "AI Agent",
    description: "Agent yang menjalankan tugas bertahap secara mandiri.",
    price: { min: 3_000_000, max: 8_000_000 },
    availableFor: ["ai"],
  },
  {
    id: "external",
    label: "External Services",
    description: "Integrasi ke tools pihak ketiga yang sudah dipakai tim.",
    price: { min: 1_000_000, max: 2_500_000 },
    availableFor: ["ai"],
  },
  {
    id: "scheduled",
    label: "Scheduled Automation",
    description: "Proses yang berjalan otomatis pada jadwal tertentu.",
    price: { min: 750_000, max: 2_000_000 },
    availableFor: ["ai"],
  },
  {
    id: "approval",
    label: "Human Approval Step",
    description: "Titik persetujuan manusia sebelum proses dilanjutkan.",
    price: { min: 1_000_000, max: 2_500_000 },
    availableFor: ["ai"],
  },

  // Infrastructure
  {
    id: "vps",
    label: "VPS Setup",
    description: "Server disiapkan, diamankan, dan siap dipakai.",
    price: { min: 750_000, max: 2_000_000 },
    availableFor: ["infra"],
  },
  {
    id: "docker",
    label: "Docker",
    description: "Aplikasi dikemas supaya jalan sama di semua environment.",
    price: { min: 1_000_000, max: 2_500_000 },
    availableFor: ["infra"],
  },
  {
    id: "cicd",
    label: "CI/CD",
    description: "Rilis otomatis setiap kali kode diperbarui.",
    price: { min: 1_500_000, max: 3_500_000 },
    availableFor: ["infra"],
  },
  {
    id: "ssl",
    label: "SSL",
    description: "Sertifikat dan koneksi terenkripsi.",
    price: { min: 300_000, max: 800_000 },
    availableFor: ["infra"],
  },
  {
    id: "domain",
    label: "Domain Configuration",
    description: "Pengaturan DNS dan pengarahan domain.",
    price: { min: 300_000, max: 800_000 },
    availableFor: ["infra"],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description: "Peringatan dini saat ada yang bermasalah di production.",
    price: { min: 1_000_000, max: 2_500_000 },
    availableFor: ["infra"],
  },
  {
    id: "backup",
    label: "Backup",
    description: "Cadangan berkala dan prosedur pemulihan.",
    price: { min: 750_000, max: 2_000_000 },
    availableFor: ["infra"],
  },
  {
    id: "deployment",
    label: "Deployment",
    description: "Proses rilis ke production yang terdokumentasi.",
    price: { min: 750_000, max: 2_000_000 },
    availableFor: ["infra"],
  },
];

export const addons: Addon[] = [
  {
    id: "domain-hosting",
    label: "Domain + Hosting",
    description: "Pengadaan dan setup untuk tahun pertama.",
    price: { min: 750_000, max: 1_500_000 },
    billing: "once",
    availableFor: ["website", "webapp", "ai", "infra"],
  },
  {
    id: "seo-basic",
    label: "SEO Basic",
    description: "Riset kata kunci awal dan penataan konten.",
    price: { min: 1_000_000, max: 2_500_000 },
    billing: "once",
    availableFor: WEB,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description: "Update, perbaikan, dan pengawasan rutin.",
    price: { min: 500_000, max: 1_500_000 },
    billing: "monthly",
    availableFor: ["website", "webapp", "ai", "infra"],
  },
  {
    id: "monitoring-retainer",
    label: "Monitoring",
    description: "Pemantauan uptime dan penanganan insiden.",
    price: { min: 400_000, max: 1_000_000 },
    billing: "monthly",
    availableFor: ["webapp", "ai", "infra"],
  },
];

/** Estimates are rounded to this step so the range never looks like a quote. */
export const ROUNDING_STEP = 500_000;

export const ESTIMATE_DISCLAIMER =
  "Estimasi ini bersifat indikatif. Harga final ditentukan setelah scope dan kebutuhan project dikonfirmasi.";
