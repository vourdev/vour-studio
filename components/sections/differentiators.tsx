import { BookOpenIcon, UsersIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";

export function Differentiators() {
  return (
    <Section className="border-t border-border bg-bg-subtle">
      <Container>
        <div className="max-w-2xl mb-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl text-left">
              Yang menentukan project masih enak dipegang setahun kemudian
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base text-text-muted leading-relaxed max-w-lg">
              Lima hal ini jarang terlihat di hasil akhirnya, tapi paling terasa
              saat Anda ingin menambah fitur.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {/* Card 1: Modern Tech Stack (Col-span 2) */}
          <div className="col-span-full lg:col-span-2 border border-border rounded-surface bg-bg-subtle/50 overflow-hidden flex flex-col justify-between p-7 group hover:border-border-strong transition-colors min-h-[310px]">
            <div className="size-full flex items-center justify-center py-4">
              <div className="relative flex h-24 w-56 items-center m-auto text-accent-text">
                <svg className="absolute inset-0 size-full opacity-35 text-accent" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="mx-auto block w-fit text-5xl font-mono font-semibold text-accent">100%</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Modern Tech Stack</h3>
              <p className="text-[13px] text-text-muted leading-relaxed">
                Teknologi dipilih karena cocok dengan masalahnya, bukan karena sedang ramai dibicarakan.
              </p>
            </div>
          </div>

          {/* Card 2: AI-Powered Development (Col-span 2) */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2 border border-border rounded-surface bg-bg-subtle/50 overflow-hidden flex flex-col justify-between p-7 group hover:border-border-strong transition-colors min-h-[310px]">
            <div className="size-full flex items-center justify-center py-4">
              <svg className="w-full max-h-24 text-accent/85" viewBox="0 0 380 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 120C0 120 14 90 35 85C56 80 66 80 66 80C66 80 80 80 92 80C104 80 101 60 109 60C117 60 117 90 125 90C133 90 143 75 154 80C165 85 186 90 193 90C200 90 206 60 214 60C221 60 238 90 244 90C250 90 259 60 266 60C272 60 284 85 286 85C294 86 300 70 305 70C312 70 323 60 335 60C347 60 348 80 363 80C367 80 372 82 376 85C379 88 380 120 380 120"
                  fill="url(#gradient-chart)"
                />
                <path
                  d="M0 120C0 120 14 90 35 85C56 80 66 80 66 80C66 80 80 80 92 80C104 80 101 60 109 60C117 60 117 90 125 90C133 90 143 75 154 80C165 85 186 90 193 90C200 90 206 60 214 60C221 60 238 90 244 90C250 90 259 60 266 60C272 60 284 85 286 85C294 86 300 70 305 70C312 70 323 60 335 60C347 60 348 80 363 80C367 80 372 82 376 85C379 88 380 120 380 120"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient-chart" x1="0" y1="60" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="currentColor" stopOpacity="0.25" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold">AI-Powered Development</h3>
              <p className="text-[13px] text-text-muted leading-relaxed">
                AI kami pakai untuk pekerjaan yang berulang. Keputusan arsitektur dan review kode tetap dipegang orang.
              </p>
            </div>
          </div>

          {/* Card 3: Clean Architecture (Col-span 2) */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2 border border-border rounded-surface bg-bg-subtle/50 overflow-hidden flex flex-col justify-between p-7 group hover:border-border-strong transition-colors min-h-[310px]">
            <div className="relative -mx-7 -mt-7 mb-4 h-40 border-b border-border bg-bg-subtle/40 p-5 flex flex-col font-mono text-[0.65rem] overflow-hidden select-none">
              <div className="flex items-center gap-1.5 pb-2.5 border-b border-border/40">
                <span className="block size-2.5 rounded-full bg-red-500/60"></span>
                <span className="block size-2.5 rounded-full bg-yellow-500/60"></span>
                <span className="block size-2.5 rounded-full bg-green-500/60"></span>
                <span className="ml-2 text-text-faint text-[0.6rem]">clean-architecture/src</span>
              </div>
              <div className="flex-1 pt-3.5 space-y-2.5 text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="text-accent">dir</span> <span className="text-text">entities/</span> <span className="text-[0.55rem] text-text-faint">(Business Domain)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">dir</span> <span className="text-text">usecases/</span> <span className="text-[0.55rem] text-text-faint">(Application Logic)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">dir</span> <span className="text-text">frameworks/</span> <span className="text-[0.55rem] text-text-faint">(UI & DB Setup)</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Clean Architecture</h3>
              <p className="text-[13px] text-text-muted leading-relaxed">
                Developer lain bisa membaca struktur kode ini tanpa perlu menelepon kami dulu.
              </p>
            </div>
          </div>

          {/* Card 4: Documentation (Col-span 3) */}
          <div className="col-span-full lg:col-span-3 border border-border rounded-surface bg-bg-subtle/50 overflow-hidden group hover:border-border-strong transition-colors min-h-[295px] p-7">
            <div className="grid h-full sm:grid-cols-2 gap-6">
              <div className="flex flex-col justify-between space-y-10">
                <div className="relative flex aspect-square size-12 rounded-full border border-border before:absolute before:-inset-1.5 before:rounded-full before:border before:border-border-strong/20 bg-bg-subtle/50">
                  <BookOpenIcon className="m-auto size-5 text-accent-text" weight="light" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">Dokumentasi Lengkap</h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    Cara menjalankan, mengubah, dan merilis ulang ditulis di repo. Tidak ada langkah yang cuma ada di kepala kami.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center bg-bg-subtle/30 rounded-surface border border-border/80 p-5 font-mono text-[0.68rem] select-none space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="block h-fit rounded border border-border bg-surface-solid px-2 py-0.5 text-xs text-text shadow-sm">README.md</span>
                  <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[0.58rem] text-text-faint">Panduan inisiasi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="block h-fit rounded border border-border bg-surface-solid px-2 py-0.5 text-xs text-text shadow-sm">DEPLOY.md</span>
                  <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[0.58rem] text-text-faint">Langkah hosting otomatis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="block h-fit rounded border border-border bg-surface-solid px-2 py-0.5 text-xs text-text shadow-sm">SETUP.md</span>
                  <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[0.58rem] text-text-faint">Konfigurasi env keys</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Support & Maintenance (Col-span 3) */}
          <div className="col-span-full lg:col-span-3 border border-border rounded-surface bg-bg-subtle/50 overflow-hidden group hover:border-border-strong transition-colors min-h-[295px] p-7">
            <div className="grid h-full sm:grid-cols-2 gap-6">
              <div className="flex flex-col justify-between space-y-10">
                <div className="relative flex aspect-square size-12 rounded-full border border-border before:absolute before:-inset-1.5 before:rounded-full before:border before:border-border-strong/20 bg-bg-subtle/50">
                  <UsersIcon className="m-auto size-5 text-accent-text" weight="light" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">Pendampingan Rilis</h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    Minggu-minggu pertama setelah rilis biasanya paling ribut. Kami temani sampai keadaan tenang.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center space-y-4">
                <div className="relative flex w-[85%] items-center justify-end gap-2 ml-auto">
                  <span className="block h-fit rounded border border-border bg-surface-solid px-2 py-1 text-[10px] text-text-muted shadow-sm">Ready to deploy?</span>
                  <div className="size-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-fg">DE</div>
                </div>
                <div className="relative flex w-[85%] items-center justify-start gap-2 mr-auto">
                  <div className="size-6 rounded-full bg-border-strong flex items-center justify-center text-[10px] font-bold text-text">V</div>
                  <span className="block h-fit rounded border border-border bg-accent/15 px-2 py-1 text-[10px] text-accent-text font-medium shadow-sm">All pipelines cleared.</span>
                </div>
                <div className="relative flex w-[85%] items-center justify-end gap-2 ml-auto">
                  <span className="block h-fit rounded border border-border bg-surface-solid px-2 py-1 text-[10px] text-text-muted shadow-sm">Awesome, thank you!</span>
                  <div className="size-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-fg">DE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
