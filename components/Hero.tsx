import RevealText from "./RevealText";
export default function Hero() {
  return (
<section className="relative flex min-h-[75svh] flex-col justify-end px-6 pb-10 pt-20 md:px-10 md:pb-12 md:pt-24">      <div className="max-w-5xl">
        <p className="reveal-line mb-6 text-sm text-muted md:text-base">
          <span style={{ animationDelay: "0.1s" }}>
            Web developer & builder, based in Cairo
          </span>
        </p>

        <h1 className="font-display font-semibold text-hero">
          <span className="reveal-line block">
            <span style={{ animationDelay: "0.2s" }}>
              Building sites,
            </span>
          </span>

          <span className="reveal-line block">
            <span style={{ animationDelay: "0.35s" }}>
              tools & systems
            </span>
          </span>

          <span className="reveal-line block">
            <span style={{ animationDelay: "0.5s" }}>
              that work.
            </span>
          </span>
        </h1>
      </div>

      <div
        className="fade-in mt-10 flex flex-col justify-between gap-6 border-t border-line py-6 md:flex-row md:items-end"
        style={{ animationDelay: "0.9s" }}
      >
        <p className="max-w-md leading-relaxed text-muted">
          I design and build websites, trading tools, and digital products —
          then ship them. Currently taking on a limited number of client
          projects.
        </p>

        <a
          href="#work"
          className="group inline-flex items-center gap-1 text-sm font-medium"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:bg-paper group-hover:text-ink">
                        <span className="arrow">{"\u2193\uFE0E"}</span>
          </span>
          See the work
        </a>
      </div>
    </section>
  );
}