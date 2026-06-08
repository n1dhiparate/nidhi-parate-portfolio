import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Scene } from "@/components/garden/Scene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iris Bloom — Designer & Developer Portfolio" },
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
          <h1 className="text-display text-[clamp(3.5rem,10vw,9rem)] text-ink">
            A landscape that
            <br />
            <em className="font-light italic text-ink/90">blooms with you.</em>
          </h1>
          <p className="mt-10 max-w-xl mx-auto text-lg text-ink/70 leading-relaxed">
            I'm Iris — a designer and developer crafting interfaces that feel
            less like screens and more like places. Scroll, and a garden grows.
          </p>
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
          scroll to plant
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="01 — About">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 glass rounded-3xl p-10">
            <h2 className="text-display text-5xl md:text-6xl mb-6">
              Quiet craft, <em className="italic font-light">loud results.</em>
            </h2>
            <p className="text-ink/80 text-lg leading-relaxed mb-4">
              For eight years I've built digital products that prefer texture
              over noise — tools for museums, climate startups, independent
              publishers, and a handful of stubborn artists.
            </p>
            <p className="text-ink/70 leading-relaxed">
              My work sits between editorial design and engineering. I draw on
              the page before I open the editor, prototype in code rather than
              Figma, and treat motion as a first-class material.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <Stat k="Years practicing" v="8" />
            <Stat k="Shipped products" v="40+" />
            <Stat k="Based in" v="Lisbon · Remote" />
            <Stat k="Currently" v="Open to commissions" />
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
              href="#"
              className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-12 gap-6 group hover:bg-white/60 transition-colors"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
                  <div className="hidden md:block absolute left-[25%] top-8 bottom-[-2.5rem] w-px bg-white/30" />
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
            Let's grow
            <br />
            <em className="italic font-light">something together.</em>
          </h2>
          <p className="text-lg text-ink/70 max-w-xl mx-auto mb-10">
            I take on a handful of projects each year. If you have a quiet
            idea that needs careful building, I'd love to hear it.
          </p>
          <a
            href="mailto:hello@irisbloom.studio"
            className="inline-block text-2xl md:text-3xl font-display italic underline decoration-1 underline-offset-8 hover:text-ink/70 transition"
          >
            hello@irisbloom.studio
          </a>
          <div className="mt-16 flex flex-wrap gap-6 justify-center text-sm text-ink/60">
            <a href="#" className="hover:text-ink">Are.na</a>
            <span>·</span>
            <a href="#" className="hover:text-ink">Read.cv</a>
            <span>·</span>
            <a href="#" className="hover:text-ink">GitHub</a>
            <span>·</span>
            <a href="#" className="hover:text-ink">Instagram</a>
          </div>
        </div>
        <div className="mt-20 text-center text-xs tracking-[0.3em] uppercase text-ink/50">
          © 2026 · grown by hand in lisbon
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
    kind: "Design",
    title: "Interface & Editorial",
    body: "Typographic systems, layout grids, art direction for product surfaces and long-form reading.",
    tags: ["Figma", "Type", "Brand", "Print"],
  },
  {
    kind: "Engineering",
    title: "Frontend Craft",
    body: "Production React with an eye for motion, accessibility, and the seams between components.",
    tags: ["React", "TS", "Tailwind", "Motion"],
  },
  {
    kind: "Engineering",
    title: "Creative Coding",
    body: "WebGL, generative systems, and scroll-driven scenes — the moving parts of a living interface.",
    tags: ["GLSL", "Three.js", "Canvas", "SVG"],
  },
  {
    kind: "Practice",
    title: "Research & Writing",
    body: "User conversations, archival research, and writing the words that hold a product together.",
    tags: ["Interviews", "Strategy", "Copy"],
  },
  {
    kind: "Backend",
    title: "Quiet Infrastructure",
    body: "Small, considered backends — auth, content, payments — sized to the thing they support.",
    tags: ["Node", "Postgres", "Edge"],
  },
  {
    kind: "Direction",
    title: "Studio & Process",
    body: "Running small teams, shaping briefs, and protecting the slow time good work requires.",
    tags: ["Workshops", "Briefs", "Mentorship"],
  },
];

const projects = [
  {
    year: "2026",
    title: "Field Notes Atlas",
    body: "A reading-first publication platform for a network of climate journalists, with offline drafts and a quiet annotation layer.",
    tags: ["Editorial", "React", "CMS"],
  },
  {
    year: "2025",
    title: "Lumen Museum",
    body: "Online catalogue and ticketing for a contemporary art museum — typography-led, scroll-driven, image-forward.",
    tags: ["Brand", "Web", "Motion"],
  },
  {
    year: "2025",
    title: "Tide Studio",
    body: "Identity and product surface for an indie audio studio: gradient-rich, generative cover art, custom waveform views.",
    tags: ["Identity", "WebGL"],
  },
  {
    year: "2024",
    title: "Slow Mail",
    body: "A scheduled-send email client built around weekly rhythms instead of inbox zero. Quiet, considered, calm.",
    tags: ["Product", "App"],
  },
  {
    year: "2023",
    title: "Herbarium",
    body: "A taxonomy and search tool for a 19th-century botanical archive — 12,000 specimens, faceted, beautifully indexed.",
    tags: ["Archive", "Search"],
  },
  {
    year: "2022",
    title: "Common Ground",
    body: "Community land-trust software: maps, member rolls, voting. Built with three people over a long, careful year.",
    tags: ["Civic", "Maps"],
  },
];

const experience = [
  {
    range: "2024 — Now",
    role: "Independent Practice",
    place: "Iris Bloom Studio · Lisbon",
    body: "Working with small teams on editorial products, cultural institutions, and the occasional generative experiment.",
  },
  {
    range: "2021 — 2024",
    role: "Senior Designer & Engineer",
    place: "Tide Lab · Berlin",
    body: "Led design and frontend on three flagship products. Built the studio's motion language and component library.",
  },
  {
    range: "2019 — 2021",
    role: "Product Designer",
    place: "Field Studio · Remote",
    body: "Shipped end-to-end across research, design, and frontend. Mentored two juniors. Wrote our process handbook.",
  },
  {
    range: "2017 — 2019",
    role: "Designer",
    place: "Slow Press · London",
    body: "First job. Editorial design for a print quarterly that taught me to value white space and finishing the page.",
  },
];
