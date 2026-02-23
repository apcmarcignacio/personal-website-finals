"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { User, GraduationCap, Heart, Target } from "lucide-react";

const tabs = [
  {
    id: "about",
    label: "About Me",
    icon: User,
    title: "About Me",
    content:
      "Ever since I was a child, I had a deep fascination with computers. It started as a simple curiosity about how components work together, but quickly grew into a desire to understand the systems behind them. Now, as a 2nd-year BSIT student, I am channeling that lifelong passion into Cloud Computing, eager to learn how to build the virtual infrastructures of tomorrow.",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    title: "Education",
    content:
      "Currently pursuing a Bachelor of Science in Information Technology (BSIT). Focused on building a strong foundation in programming, networking, and cloud technologies to prepare for a career in the IT industry.",
  },
  {
    id: "hobbies",
    label: "Hobbies/Interests",
    icon: Heart,
    title: "Hobbies & Interests",
    content:
      "When I'm not coding, I enjoy exploring new technologies, playing video games, and reading about the latest trends in cloud computing and DevOps. I also like tinkering with hardware and building custom PC setups.",
  },
  {
    id: "goals",
    label: "Goals in Life",
    icon: Target,
    title: "Goals in Life",
    content:
      "My ultimate goal is to become a Cloud Computing professional, designing and managing scalable infrastructures that power modern applications. I aspire to earn industry certifications and contribute to innovative projects that make a real impact.",
  },
];

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("about");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="about" className="scroll-mt-20">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-sm text-primary">01.</span>
        <h2 className="text-xl font-bold text-heading md:text-2xl whitespace-nowrap">
          Get to Know Me
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Tab navigation -- horizontal scroll on mobile, vertical on md+ */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0 md:min-w-[180px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border-l-2 border-primary md:border-l-2"
                    : "text-muted-foreground hover:bg-card hover:text-foreground border-l-2 border-transparent"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 rounded-lg border border-border bg-card/50 p-6 md:p-8 backdrop-blur-sm">
          <h3 className="mb-4 font-mono text-lg font-semibold text-primary">
            {current.title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            {current.content}
          </p>
        </div>
      </div>
    </section>
  );
}
