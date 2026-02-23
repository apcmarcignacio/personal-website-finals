import { ProfileHeader } from "@/components/profile-header";
import { ProfileTabs } from "@/components/profile-tabs";
import { TechStack } from "@/components/tech-stack";
import { Guestbook } from "@/components/guestbook";
import { SiteFooter } from "@/components/site-footer";
import { Gallery } from "@/components/gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <span className="font-mono text-sm font-bold text-primary">M.</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary">
              <span className="text-primary">01. </span>About
            </a>
            <a href="#skills" className="font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary">
              <span className="text-primary">02. </span>Skills
            </a>
            <a href="#guestbook" className="font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary">
              <span className="text-primary">04. </span>Guestbook
            </a>
            <a href="#gallery" className="font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary">
              <span className="text-primary">03. </span>Gallery
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6">
        {/* Hero / Header */}
        <section className="py-16 md:py-24">
          <ProfileHeader />
        </section>

        {/* Sections with consistent spacing */}
        <div className="flex flex-col gap-20 pb-20 md:gap-28 md:pb-28">
          <ProfileTabs />
          <TechStack />
          <Gallery />
          <Guestbook />
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
