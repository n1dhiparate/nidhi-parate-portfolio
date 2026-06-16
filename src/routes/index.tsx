import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Scene } from "@/components/garden/Scene";
import ShinyText from "@/components/ui/ShinyText";
import SplashCursor from '@/components/ui/SplashCursor';
import { FlickeringGrid } from "@/components/ui/flickering-grid";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nidhi Parate — Portfolio" },
      {
        name: "description",
        content:
          "An immersive portfolio that blooms as you scroll — work, experience, and ideas from designer-developer Iris Bloom.",
      },
      { property: "og:title", content: "Iris Bloom — Designer & Developer" },
      {
        property: "og:description",
        content: "A living portfolio that grows around you as you scroll.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div className="grain relative">
      <SplashCursor
      DENSITY_DISSIPATION={3.5}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.1}
      CURL={3}
      SPLAT_RADIUS={0.2}
      SPLAT_FORCE={6000}
      COLOR_UPDATE_SPEED={10}
      SHADING
      RAINBOW_MODE={false}
      COLOR="#F5E8A3"   // pollen green
    />
      <Scene />
     
      {/* Floating nav */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="glass rounded-full px-6 py-2.5 flex gap-1 text-[13px] tracking-wide">
          {[
            ["about", "About"],
            ["skills", "Skills"],
            ["projects", "Work"],
            ["experience", "Path"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-1.5 rounded-full hover:bg-white/40 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            A garden in progress · 2026
          </div>
          <h1
  className="
    text-display
    text-[clamp(3.5rem,10vw,9rem)]
    text-ink
    [text-shadow:0_6px_30px_rgba(255,255,255,0.45),0_4px_12px_rgba(15,23,42,0.2)]
  "
>  

<ShinyText
    text="Growing ideas into"
    speed={19}
    color="#0f172a"
    shineColor="#D0D08A"
    spread={120}
    direction="right"
    yoyo
  />

  <br />

  <em className="font-light italic text-ink/90">
    <ShinyText
      text="products that bloom."
      speed={19}
      color="#0f172a"
shineColor="#D0D08A"
      spread={120}
      direction="right"
      yoyo
    />
  </em>
</h1>
    <div className="max-w-2xl mx-auto text-center mt-8">
  <p className="max-w-2xl text-lg text-#0f172a/90 leading-relaxed shadow-lg *:**:not-[]:">
 Turning curiosity into code and ideas into intelligent experiences.
</p>
</div>
          <div className="mt-10 flex gap-3 justify-center">
            <a
              href="#projects"
              className="glass rounded-full px-6 py-3 text-sm hover:bg-white/60 transition"
            >
              Wander the work →
            </a>
            <a
              href="#contact"
              className="rounded-full px-6 py-3 text-sm bg-ink text-white hover:bg-ink/90 transition"
            >
              Say hello
            </a>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-ink/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          scroll to see !
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="01 — About">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 glass rounded-3xl p-10">
            <h2 className="text-display text-5xl md:text-6xl mb-6">
              Building projects, <em className="italic font-light">one at a time.</em>
            </h2>
            <p className="text-ink/80 text-lg leading-relaxed mb-4">
              I'm Nidhi Parate, a B.Tech Information Technology student at UMIT, SNDT University. I enjoy building AI-powered applications that solve practical problems—from student onboarding assistants and RAG systems to personalized recommendation platforms.
            </p>
            <p className="text-ink/70 leading-relaxed">
              My work focuses on Python, React, Flask, LLM integrations, and full-stack development. Through hackathons and personal projects, I've explored retrieval-augmented generation (RAG), authentication systems, recommendation engines, and AI-driven user experiences while continuously learning how to build products that people actually use.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <Stat k="CGPA" v="8.85" />
            <Stat k="PROJECTS BUILT/PROGRESS" v="4+" />
            <Stat k="Based in" v="Mumbai · India" />
            <Stat k="Currently" v="  Seeking AI & Software Engineering Internships" />
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="02 — Skills">
        <h2 className="text-display text-5xl md:text-6xl mb-12 max-w-2xl">
          A small toolkit, <em className="italic font-light">used carefully.</em>
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {skills.map((s) => (
            <div key={s.title} className="glass rounded-3xl p-8">
              <div className="text-xs tracking-[0.2em] uppercase text-ink/50 mb-4">
                {s.kind}
              </div>
              <h3 className="text-2xl mb-3">{s.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed mb-5">
                {s.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/40 border border-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="03 — Selected work">
        <h2 className="text-display text-5xl md:text-6xl mb-12 max-w-3xl">
          Six gardens I've <em className="italic font-light">tended.</em>
        </h2>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.a
  key={p.title}
  href={p.link || p.github}
  target="_blank"
  rel="noopener noreferrer"
  className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-12 gap-6 group hover:bg-white/60 transition-colors"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{
    duration: 0.8,
    delay: i * 0.05,
    ease: [0.22, 1, 0.36, 1],
  }}
>
              <div className="md:col-span-2 text-xs tracking-[0.2em] uppercase text-ink/50">
                {String(i + 1).padStart(2, "0")} · {p.year}
              </div>
              <div className="md:col-span-7">
                <h3 className="text-3xl md:text-4xl mb-2">{p.title}</h3>
                <p className="text-ink/70 leading-relaxed">{p.body}</p>
              </div>
              <div className="md:col-span-3 flex md:justify-end items-start">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/50 border border-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="04 — Path">
        <h2 className="text-display text-5xl md:text-6xl mb-12 max-w-2xl">
          A slow, <em className="italic font-light">winding</em> path.
        </h2>
        <div className="glass rounded-3xl p-10 md:p-14">
          <ol className="space-y-10">
            {experience.map((e, i) => (
              <li key={e.role} className="grid md:grid-cols-12 gap-6 relative">
                <div className="md:col-span-3 text-sm tracking-wide text-ink/60">
                  {e.range}
                </div>
                <div className="md:col-span-9 border-l border-white/60 pl-6">
                  <h3 className="text-2xl">{e.role}</h3>
                  <div className="text-ink/60 mb-3">{e.place}</div>
                  <p className="text-ink/75 leading-relaxed">{e.body}</p>
                </div>
                {i < experience.length - 1 && (
                  <div className="hidden md:block absolute left-[25%] top-8 -bg-conic-0bottom-[-2.5rem] w-px bg-white/30" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="05 — Contact" last>
        <div className="glass rounded-[2.5rem] p-12 md:p-20 text-center">
          <h2 className="text-display text-6xl md:text-8xl mb-8">
            Let's build
            <br />
            <em className="italic font-light">something intelligent.</em>
          </h2>
          <p className="text-lg text-ink/70 max-w-xl mx-auto mb-10">
            I'm actively seeking AI Engineering, Machine Learning, and Software
  Development internship opportunities. If you're building interesting
  products with AI, I'd love to connect and learn more.
          </p>
          <a
            href="mailto:nidhiparate2006@gmail.com"
            className="inline-block text-2xl md:text-3xl font-display italic underline decoration-1 underline-offset-8 hover:text-ink/70 transition"
          >
            nidhiparate2006@gmail.com
          </a>
          <div className="mt-16 flex flex-wrap gap-6 justify-center text-sm text-ink/60">
  <a
    href="https://github.com/n1dhiparate"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-ink"
  >
    GitHub
  </a>

  <span>·</span>

  <a
    href="https://www.linkedin.com/in/nidhi-parate"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-ink"
  >
    LinkedIn
  </a>

  <span>·</span>

  <a
  href="/nidhi_parate_resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-ink"
>
  Resume
</a>

  <span>·</span>

  <a
    href="mailto:nidhiparate2006@gmail.com"
    className="hover:text-ink"
  >
    Email
  </a>
</div>
        </div>
        <div className="mt-20 text-center text-xs tracking-[0.3em] uppercase text-ink/50">
          © 2026 · Nidhi Parate · Building AI-powered products that bloom.
        </div>
      </Section>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  children,
  last,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 md:px-12 max-w-6xl mx-auto ${last ? "pb-32 pt-32" : "py-32 md:py-40"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-xs tracking-[0.3em] uppercase text-ink/60 mb-10">
          {eyebrow}
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="glass rounded-2xl px-6 py-4 flex items-baseline justify-between">
      <span className="text-xs tracking-[0.15em] uppercase text-ink/60">{k}</span>
      <span className="text-xl font-display">{v}</span>
    </div>
  );
}

const skills = [
  {
    kind: "AI engineering",
    title: "RAG & LLM Applications",
    body: "Building AI systems using RAG, FAISS, SentenceTransformers, and LLM APIs to solve real-world student and productivity problems.",
    tags: ["Python", "RAG", "LLM", "API"],
  },
  {
    kind: "FULL-STACK DEVELOPMENT",
    title: "Frontend & Backend",
    body: "Developing responsive applications with React, Flask, Supabase, authentication systems, an",
    tags: ["React", "TS", "Tailwind", "Motion"],
  },
  {
    kind: "AI PROJECTS",
    title: "Applied Intelligence",
    body: "Creating AI-powered products like Admit-Assist and Moodwave that combine machine learning with practical user experiences.",
    tags: ["Groq API", "NLP", "AI Agents", "Automation"],
  },
  {
    kind: "DATA & DATABASES",
    title: "Backend Systems",
    body: "Designing scalable data flows, authentication, database integrations, and analytics-driven applications.",
    tags: ["Postgres", "SQL", " Supabase", "Docker","node.js"],
  },
  {
    kind: "HACKATHONS",
    title: "Rapid Product Building",
    body: "Top 25 among 700+ teams at TCS InnovGenius, building AI solutions under strict deadlines and presenting to industry judges.",
    tags: ["problem-solving", "teamwork", "innovation","pitching"],
  },
  {
    kind: "LEARNING & EXPLORATION",
    title: "Continuous Growth",
    body: "Currently exploring AI Agents, Advanced SQL, Retrieval-Augmented Generation, and modern AI workflows.",
    tags: ["AI agents", "Next.js", "Research", "Experimentation"],
  },
];

const projects = [
  {
    year: "2026",
    title: "VibeWeave AI",
    body: "AI-powered music discovery platform that combines Spotify listening history with LLM-based mood analysis to generate personalized playlists and recommendations.",
    tags: ["AI", "LLM", "Groq API", "Music"],
    github:"https://github.com/n1dhiparate/vibeweave-ai",
    link: "https://vibeweave-ai.vercel.app/,",
  },
  {
    year: "2026",
    title: "Admit-Assist",
    body: "RAG-powered student onboarding assistant that helps engineering students navigate admissions, documents, deadlines, and queries through contextual AI guidance.",
    github : "https://github.com/n1dhiparate/admit-assist",
    link: "",
    tags: ["RAG", "Flask", "FAISS", "Education"],
  },
  {
    year: "2025",
    title: "SafePath",
    body: "Safety-first navigation platform that analyzes crime-related datasets to score route risk and help users make safer travel decisions (especially for women).",
    github : "https://github.com/n1dhiparate/minor-project-safepath",
    link: "",
    tags: ["Safety", "Navigation","Data Analysis", "Maps"],
  },
  {
    year: "2026",
    title: "Nidhi Parate Portfolio",
    body: "A living portfolio documenting my journey into AI engineering through projects, experiments, hackathons, and thoughtful frontend craftsmanship.",
    github: "https://github.com/n1dhiparate/nidhi-parate-portfolio",
    link: "",
    tags: ["react", "typescript", "motion", "design"],
  },
  {
    year: "2026",
    title: "Multi-Agent AI Document System",
    body: "AI-powered document intelligence platform that transforms PDFs into structured research reports using RAG, semantic search, vector databases, and a multi-agent workflow for planning, writing, reviewing, and citation generation.",
    github: "https://github.com/n1dhiparate/multi-agent-ai-document-system",
    link: "",
    tags: ["RAG", "ChromaDB", "LLM", "AI Agents","FastAPI"],
  },
  
];

const experience = [
  
 
  {
    range: "2025 — Now",
    role: "E-Cell Member (Junior council)",
    place: "Entrepreneurship Cell, UMIT",
    body: "Contributing to social media strategy and student engagement initiatives while promoting innovation, entrepreneurship, and startup culture across campus.",
  },
  
  
  {
    range: "2025",
    role: "Python Specialization",
    place: "University of Michigan · Coursera",
    body: "Completed the Python for Everybody Specialization, covering programming fundamentals, databases, APIs, and data processing workflows that strengthened my backend development foundation.",
  },
  {
    range: "2024 — 2025",
    role: "ACM — PR & Outreach Lead",
    place: "UMIT ACM Student Chapter",
    body: "Coordinating outreach initiatives, fostering cross-college collaborations, and helping organize technical events that connect students with emerging technologies and industry opportunities.",
  },
   {
    range: "2024 — 2028",
    role: "B.Tech Information Technology",
    place: "Usha Mittal Institute of Technology, SNDT Women's University · Mumbai",
    body: "Pursuing Information Technology with a current GPA of 8.85. Exploring artificial intelligence, full-stack development, and intelligent systems through hands-on projects, hackathons, and technical communities.",
  },
  {
    range: "2022 — 2024",
    role: "Higher Secondary Education",
    place: "Jai Hind College · Mumbai",
    body: "Completed HSC under the Maharashtra State Board with 80% (vocational studies : Electronics), building a strong foundation in mathematics, logical reasoning, and analytical thinking that later led me toward technology and AI.",
  }
];
