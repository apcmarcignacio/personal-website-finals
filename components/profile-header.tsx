"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:marc@example.com", icon: Mail, label: "Email" },
];

export function ProfileHeader() {
  return (
    <header className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/30 shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] lg:h-44 lg:w-44">
          <Image
            src="/profile.jpg"
            alt="Marc's profile photo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <div className="text-center lg:text-left">
          <p className="mb-2 font-mono text-sm text-primary">Hi, my name is</p>
          <h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl text-balance">
            Marc
          </h1>
          <p className="mt-2 text-lg text-muted-foreground md:text-xl">
            2nd Year BSIT Student
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            Passionate about Cloud Computing and building the virtual
            infrastructures of tomorrow. Exploring the intersection of
            networking, programming, and cloud technologies.
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 mt-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={link.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
