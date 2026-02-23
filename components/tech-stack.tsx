"use client";

const technologies = [
  "HTML & CSS",
  "JavaScript",
  "Python",
  "Next.js",
  "React",
  "Cloud Computing",
  "Networking",
  "Git & GitHub",
  "Tailwind CSS",
];

export function TechStack() {
  return (
    <section id="skills" className="scroll-mt-20">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-sm text-primary">02.</span>
        <h2 className="text-xl font-bold text-heading md:text-2xl whitespace-nowrap">
          Technologies & Skills
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-xs text-primary transition-colors duration-200 hover:bg-primary/10 hover:border-primary/40"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
