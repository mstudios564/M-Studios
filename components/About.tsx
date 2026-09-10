const skills = [
  "Shopify",
  "C++",
  "Python",
  "HTML / CSS",
  "JavaScript",
  "UI / UX",
  "Order automation",
  "Business automation",
]

export default function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t border-line">
      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-6">
            Approach
          </h2>
          <p className="text-muted leading-relaxed max-w-md">
            I build brands from idea to online — shaping everything from the first concept to a refined Shopify experience. Clean design, thoughtful systems, and seamless execution. Built to look good, work beautifully, and sell.
          </p>
        </div>

        <div>
          <p className="text-sm text-muted mb-6">Currently working with</p>
          <ul className="grid grid-cols-2 gap-y-4">
            {skills.map((skill) => (
              <li key={skill} className="text-lg font-display">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
