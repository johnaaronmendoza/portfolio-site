import FramerReveal from './FramerReveal';

const ROW_1 = [
  "Java", "Python", "TypeScript", "React", "Next.js", "Tailwind CSS",
  "Kotlin", "Jetpack Compose", "scikit-learn", "NumPy", "Pandas", "Matplotlib",
];

const ROW_2 = [
  "Node.js", "gRPC", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
  "AWS", "Firebase", "ARCore", "TFLite", "Git", "Figma",
];

// Duplicate for seamless loop
const r1 = [...ROW_1, ...ROW_1];
const r2 = [...ROW_2, ...ROW_2];

export default function Skills() {
  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-16">
            SKILLS
          </h2>

          <div className="space-y-5 overflow-hidden">
            {/* Row 1 — scrolls left */}
            <div className="relative">
              <div className="flex gap-3 animate-marquee whitespace-nowrap">
                {r1.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-tag skill-tag-amber inline-block font-mono-8bit text-xs text-amber-400 border-2 border-amber-400 bg-zinc-900 px-3 py-2 flex-shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="relative">
              <div className="flex gap-3 animate-marquee-reverse whitespace-nowrap">
                {r2.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-tag skill-tag-blue inline-block font-mono-8bit text-xs text-blue-400 border-2 border-blue-400 bg-zinc-900 px-3 py-2 flex-shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
