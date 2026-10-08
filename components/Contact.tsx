import RevealText from "./RevealText";
export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-line bg-[#E8E3D8] px-6 py-24 text-[#111111] md:px-10 md:py-32"
    >
      <h2 className="font-display max-w-4xl text-hero font-medium">
        Let&apos;s build something.
      </h2>

      <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        {/* Contact details */}
        <div className="flex flex-col gap-4">
          <a
            href="mailto:mstudios.dev1@gmail.com"
            className="w-fit border-b border-[#111111] pb-1 text-lg transition-colors duration-300 hover:border-[#555555] md:text-2xl"
          >
            mstudios.dev1@gmail.com
          </a>

          <a
            href="tel:+201041585881"
            className="w-fit text-sm text-[#555555] transition-colors duration-300 hover:text-[#111111] md:text-base"
          >
            +20 104 158 5881
          </a>

          <a
            href="https://wa.me/201041585881?text=Hi%20M-Studios%21%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-[#555555] transition-colors duration-300 hover:text-[#111111] md:text-base"
          >
            WhatsApp <span className="arrow">{"\u2197\uFE0E"}</span>
          </a>
        </div>

        {/* Socials + CTA */}
        <div className="flex flex-col gap-8 md:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#555555]">
            <a
              href="https://www.instagram.com/mstudio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#111111]"
            >
              Instagram <span className="arrow">{"\u2197\uFE0E"}</span>
            </a>

            <a
              href="https://www.tiktok.com/@m.studiodev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#111111]"
            >
              TikTok <span className="arrow">{"\u2197\uFE0E"}</span>
            </a>
          </div>

          <a
            href="https://wa.me/201041585881?text=Hi%20M-Studios%21%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-5 rounded-full border border-[#111111] px-6 py-3 text-sm transition-colors duration-300 hover:bg-[#111111] hover:text-white"
          >
            Start a project
            <span className="arrow inline-block text-lg transition-transform duration-300 group-hover:translate-x-1">
              {"\u2197\uFE0E"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}