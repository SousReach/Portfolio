import { GlassCard } from "@/components/glass-card";

const highlights = [
  { title: "Projects", body: "Selected work and case studies." },
  { title: "About", body: "Background, skills, and experience." },
  { title: "Contact", body: "Let's build something together." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center px-6">
      <main className="flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 py-16">
        <GlassCard as="section" id="home" className="scroll-mt-24 p-8 sm:p-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Glassmorphism is ready.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Use the <code className="font-mono">glass</code> and{" "}
            <code className="font-mono">glass-strong</code> utilities, or the{" "}
            <code className="font-mono">GlassCard</code> component, to build
            your layout.
          </p>
        </GlassCard>

        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <GlassCard
              key={item.title}
              id={item.title.toLowerCase()}
              interactive
              className="scroll-mt-24"
            >
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="mt-2 text-muted">{item.body}</p>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}
