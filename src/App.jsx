import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Hobbies", href: "hobbies" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Books", href: "books" },
  { label: "Writing", href: "writing" },
  { label: "Contact", href: "contact" },
];

const hobbies = [
  {
    title: "Boxing",
    description:
      "Ritual 6am sessions keep me disciplined, sharpen focus, and remind me that resilience is built one round at a time.",
    icon: "🥊",
  },
  {
    title: "Guitar",
    description:
      "Fingerstyle guitar is my creative reset—arranging melodies trains patience and an eye for detail.",
    icon: "🎸",
  },
  {
    title: "Financial Markets",
    description:
      "Tracking price action and sentiment daily helps me connect macro narratives with actionable investment theses.",
    icon: "📈",
  },
];

const experiences = [
  {
    role: "Equity Research Intern",
    org: "Independent Portfolio",
    date: "2024 — Present",
    points: [
      "Publish bi-weekly deep dives on holdings covering fundamentals, catalysts, and risk scenarios.",
      "Built a lightweight DCF + scenario model template to make idea updates faster and comparable.",
      "Outperformed the benchmark blend of MSCI World + STI by 240 bps YTD through disciplined sizing.",
    ],
  },
  {
    role: "Economics Undergraduate",
    org: "Nanyang Technological University",
    date: "2022 — Present",
    points: [
      "Specialising in international finance and econometrics while leading project work across cohorts.",
      "Applied panel regressions to study credit growth vs. employment in emerging markets.",
      "Mentored juniors on Python for economic research and data storytelling.",
    ],
  },
  {
    role: "Capital Markets Club Analyst",
    org: "NTU Global Markets Society",
    date: "2023 — 2024",
    points: [
      "Led weekly market briefings summarising macro moves, policy shifts, and sector dispersion.",
      "Co-authored investment memos for simulated credit mandates and equity L/S pair trades.",
      "Streamlined the research pipeline with Notion templates + data APIs for idea tracking.",
    ],
  },
];

const projects = [
  {
    title: "Equity Pulse Dashboard",
    description:
      "An interactive dashboard that blends macro data, factor performance, and watchlist alerts in one place.",
    tags: ["React", "D3", "Alphavantage API"],
    link: "https://github.com/Ayman5456",
  },
  {
    title: "Credit Stress Heatmap",
    description:
      "Python + Tableau workflow to visualise delinquencies across Indian states with rolling projections.",
    tags: ["Python", "Tableau", "Time-Series"],
    link: "https://github.com/Ayman5456",
  },
  {
    title: "Personal Macro Notes",
    description:
      "A living knowledge base that compiles readings, charts, and trade lessons into quarterly outlooks.",
    tags: ["Notion", "Writing", "Macro"],
    link: "https://github.com/Ayman5456",
  },
];

const books = [
  {
    title: "Liar's Poker",
    author: "Michael Lewis",
    takeaway: "Culture drives risk appetite—structures fail when incentives drift.",
  },
  {
    title: "The Man Who Solved the Market",
    author: "Gregory Zuckerman",
    takeaway: "Edge compounds when teams blend math, humility, and relentless iteration.",
  },
  {
    title: "Principles",
    author: "Ray Dalio",
    takeaway: "Radical transparency only works when feedback loops are explicit and kind.",
  },
  {
    title: "Alchemy",
    author: "Rory Sutherland",
    takeaway: "Perception is leverage—small narrative shifts can move markets.",
  },
];

const writing = [
  {
    title: "Bi-Weekly Markets Letter — Vol. 08",
    date: "Jan 2025",
    tags: ["Equities", "Rates", "Positioning"],
  },
  {
    title: "Building a Repeatable Research Process",
    date: "Dec 2024",
    tags: ["Playbook", "Productivity"],
  },
  {
    title: "What Boxing Teaches Me About Risk",
    date: "Nov 2024",
    tags: ["Mindset", "Discipline"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggered = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const SectionHeader = ({ eyebrow, title, description }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
    variants={fadeUp}
    className="mb-12 max-w-3xl"
  >
    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent/80">
      {eyebrow}
    </p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-base text-white/70 sm:text-lg">{description}</p>
    )}
  </motion.div>
);

const Section = ({ id, eyebrow, title, description, children }) => (
  <section id={id} className="relative px-6 py-24 sm:px-10">
    <div className="mx-auto max-w-6xl">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      {children}
    </div>
  </section>
);

const Button = ({ href, children, variant = "primary" }) => {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-accent focus-visible:outline-white"
      : "border border-white/30 text-white/80 hover:text-white hover:border-white focus-visible:outline-white";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
};

function Navigation({ menuOpen, setMenuOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border border-white/40 bg-white/10" />
          <span className="text-xs font-semibold uppercase tracking-[0.4em]">
            AT
          </span>
        </div>

        <div className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/70 px-6 py-4 sm:px-10 lg:hidden">
          <div className="flex flex-col gap-4 text-sm text-white/80">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/10 px-4 py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 pb-20 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-12 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/30 blur-[160px]" />
        <div className="absolute right-10 bottom-0 h-64 w-64 rounded-full bg-accent-soft/30 blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/70">
          Ayman Tripathi
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
          Economics student & aspiring <span className="text-accent">investment banker</span>
        </h1>
        <p className="mt-6 max-w-3xl text-base text-white/70 sm:text-lg">
          Blending macro research, bottom-up equity work, and product intuition to tell stories that move capital. I build clear playbooks, ship polished visuals, and chase compounding skill stacks.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/resume.pdf">View Resume</Button>
          <Button href="#projects" variant="ghost">
            View Projects
          </Button>
        </div>

        <motion.div
          className="mt-16 flex flex-col items-center text-xs text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>Scroll to explore</span>
          <span className="mt-3 h-10 w-px bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="Profile"
      title="Curious about people, markets, and the systems that connect them"
      description="I obsess over pairing rigorous analysis with beautiful execution—because the best ideas deserve compelling design."
    >
      <div className="grid gap-16 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-base text-white/70"
        >
          <p>
            I am currently studying Economics at NTU while building a personal portfolio that applies classroom theory directly to markets. My work sits at the intersection of research, storytelling, and digital product craft.
          </p>
          <p>
            Whether I am drafting a sector memo, building a dashboard, or jamming on guitar, I value clarity and craft. I enjoy collaborating with ambitious teams, translating complex models into narratives that resonate with clients and investors.
          </p>
          <p>
            Beyond finance, I am fascinated by how design can guide decision-making. That is why this portfolio leans on the restraint and polish of Apple’s product pages—focus the story, highlight the craft, and leave room for curiosity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-transparent p-8 shadow-glow"
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Current Focus</p>
              <p className="mt-2 text-2xl font-semibold">Equity research, storytelling, and tasteful product design.</p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm text-white/60">
              <div>
                <p className="text-white/40">Timezone</p>
                <p className="text-lg font-semibold text-white">Singapore (SGT)</p>
              </div>
              <div>
                <p className="text-white/40">Availability</p>
                <p className="text-lg font-semibold text-white">Summer 2025</p>
              </div>
              <div>
                <p className="text-white/40">Edge</p>
                <p className="text-lg font-semibold text-white">Macro x Storytelling</p>
              </div>
              <div>
                <p className="text-white/40">Tools</p>
                <p className="text-lg font-semibold text-white">Python · React · Figma</p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black" />
        </motion.div>
      </div>
    </Section>
  );
}

function HobbiesSection() {
  return (
    <Section
      id="hobbies"
      eyebrow="Hobbies"
      title="Obsessions that keep me balanced"
      description="Movement, music, and markets—they each train different muscles but reward deliberate practice."
    >
      <motion.div
        variants={staggered}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {hobbies.map((hobby) => (
          <motion.div
            key={hobby.title}
            variants={fadeUp}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/10"
          >
            <div className="text-3xl">{hobby.icon}</div>
            <p className="mt-4 text-lg font-semibold">{hobby.title}</p>
            <p className="mt-2 text-sm text-white/70">{hobby.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Learning through shipping real work"
      description="Every role sharpened my ability to distill complexity and act with conviction."
    >
      <div className="relative border-l border-white/10 pl-8">
        {experiences.map((experience, idx) => (
          <motion.div
            key={experience.role}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="relative pb-12 last:pb-0"
          >
            <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border border-accent/40 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{experience.date}</p>
            <h3 className="mt-2 text-2xl font-semibold">{experience.role}</h3>
            <p className="text-white/60">{experience.org}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {experience.points.map((point) => (
                <li key={point} className="leading-relaxed">
                  • {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Side quests that taught me leverage"
      description="I like pairing data with delightful interfaces so insights land instantly."
    >
      <motion.div
        variants={staggered}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <a
                href={project.link}
                className="text-sm text-accent-soft transition hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Details →
              </a>
            </div>
            <p className="mt-3 text-sm text-white/70">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function BooksSection() {
  return (
    <Section
      id="books"
      eyebrow="Books"
      title="Books shaping my thinking"
      description="Short notes from recent reads—what stuck, why it matters, and how it shows up in my work."
    >
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-3">
        {books.map((book) => (
          <motion.div
            key={book.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="snap-center rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{book.author}</p>
            <h3 className="mt-2 text-xl font-semibold">{book.title}</h3>
            <p className="mt-3 text-sm text-white/70">{book.takeaway}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function WritingSection() {
  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Ideas in motion"
      description="Published notes, market letters, and experiments in building a personal research cadence."
    >
      <div className="space-y-6">
        {writing.map((post) => (
          <motion.div
            key={post.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{post.date}</p>
              <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/20 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something intentional"
      description="Open to roles in research, investment banking, and product teams that value clarity, hustle, and tasteful execution."
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <Button href="mailto:aymantripathi@gmail.com">Email Me</Button>
        <div className="flex gap-6 text-sm text-white/70">
          <a
            href="https://www.linkedin.com/in/aymantripathi"
            className="transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ayman5456"
            className="transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-canvas to-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-120px] mx-auto h-96 w-96 rounded-full bg-accent/40 blur-[200px]" />
        <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-accent-soft/30 blur-[180px]" />
      </div>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <HobbiesSection />
        <ExperienceSection />
        <ProjectsSection />
        <BooksSection />
        <WritingSection />
        <ContactSection />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Ayman Tripathi. Built with React + Tailwind.
      </footer>
    </div>
  );
}
