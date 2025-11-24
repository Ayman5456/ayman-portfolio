import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", type: "section", target: "home" },
  { label: "About", type: "section", target: "about" },
  { label: "Hobbies", type: "section", target: "hobbies" },
  { label: "Experience", type: "route", target: "/experience" },
  { label: "Projects", type: "section", target: "projects" },
  { label: "Books", type: "section", target: "books" },
  { label: "Research", type: "section", target: "reports" },
  { label: "Contact", type: "section", target: "contact" },
];

const hobbies = [
  {
    title: "Boxing",
    description:
      "Ritual early sessions help me stay disciplined, sharpen focus, and remind me resilience is built one round at a time.",
    icon: "🥊",
  },
  {
    title: "Guitar",
    description:
      "Playing guitar is my creative reset. Working through complex arrangements trains patience, timing, and an ear for detail.",
    icon: "🎸",
  },
  {
    title: "Financial Markets",
    description:
      "Tracking price action, sentiment, and flows keeps me close to how macro narratives get priced into equities, credit, and FX.",
    icon: "📈",
  },
  {
    title: "Painting",
    description:
      "Painting slows me down enough to notice details. It keeps my visual sense sharp and informs how I design decks and dashboards.",
    icon: "🎨",
  },
  {
    title: "Football",
    description:
      "Football is where I switch off from screens and think in space, coordination, and strategy. Execution is a team sport.",
    icon: "⚽",
  },
  {
    title: "Reading",
    description:
      "I read widely across macroeconomics, history, and behavioral finance to build mental models that survive more than one cycle.",
    icon: "📚",
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
  { slug: "macroeconomics-blanchard", title: "Macroeconomics (8th ed.)", author: "Olivier Blanchard", note: "Built the framework I use to interpret inflation, output gaps, and policy regimes." },
  { slug: "microeconomics-pindyck", title: "Microeconomics", author: "Robert Pindyck", note: "Sharpened my intuition on behaviour under uncertainty, market power, and externalities." },
  { slug: "python-for-finance", title: "Python for Finance", author: "Yves Hilpisch", note: "Bridged Python fundamentals with real financial workflows and automation patterns." },
  { slug: "future-of-money", title: "The Future of Money", author: "Eswar S. Prasad", note: "Pushed me to consider how digital currencies and policy will reshape market plumbing." },
  { slug: "fooled-by-randomness", title: "Fooled by Randomness", author: "Nassim Nicholas Taleb", note: "Keeps me skeptical of neat narratives and respectful of noise, bias, and fat tails." },
  { slug: "fabozzi-bond-markets", title: "Bond Markets, Analysis, and Strategies", author: "Frank J. Fabozzi", note: "Grounded my understanding of fixed income instruments, term structures, and risk." },
  { slug: "global-macro-trading", title: "Global Macro Trading", author: "Greg Gliner", note: "Connects macro frameworks to concrete cross-asset trade ideas and positioning." },
  { slug: "when-genius-failed", title: "When Genius Failed", author: "Roger Lowenstein", note: "A reminder that leverage, liquidity, and model risk can derail elegant strategies." },
  { slug: "irrational-exuberance", title: "Irrational Exuberance", author: "Robert J. Shiller", note: "Useful lens on behavioural finance and why mispricings can persist." },
  { slug: "investment-banking", title: "Investment Banking", author: "Joshua Rosenbaum & Joshua Pearl", note: "My reference for valuation, LBOs, and the pragmatic side of deal execution." },
  { slug: "venture-deals", title: "Venture Deals", author: "Brad Feld", note: "Clarified how term sheets align incentives between founders and investors." },
  { slug: "liars-poker", title: "Liar's Poker", author: "Michael Lewis", note: "Culture drives risk appetite—structures fail when incentives drift." },
  { slug: "man-who-solved-market", title: "The Man Who Solved the Market", author: "Gregory Zuckerman", note: "Edge compounds when teams blend math, humility, and relentless iteration." },
  { slug: "principles", title: "Principles", author: "Ray Dalio", note: "Radical transparency only works when feedback loops are explicit and kind." },
  { slug: "alchemy", title: "Alchemy", author: "Rory Sutherland", note: "Perception is leverage—small narrative shifts can move markets." },
];

const reports = [
  { title: "Bi-Weekly Portfolio Letter – Vol. 01", date: "Feb 2025", tags: ["Equities", "Macro", "Portfolio"], description: "Key moves across US equities, positioning shifts, and how credit spreads fed into my portfolio decisions." },
  { title: "Credit note – Macy's senior unsecured bonds", date: "Jan 2025", tags: ["Credit", "Retail", "Bond"], description: "Issuer-specific view covering leverage, liquidity, catalysts, and relative value in Macy's capital structure." },
  { title: "Macro view – US rates and consumer credit", date: "Dec 2024", tags: ["Macro", "Rates", "Consumer"], description: "Synthesis of rate expectations, delinquency data, and labour trends shaping my 1H25 outlook." },
];

const assetUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

const experienceTimeline = [
  { org: "Maybank Investment Banking Group", role: "Incoming Global Markets Intern (Quantitative Development)", date: "Upcoming", bullets: ["Working on AI-driven automation using Python and LLMs to structure financial data for trading and restructuring desks.", "Exposure to fixed income, FX, and derivatives while supporting front-office sales and risk teams across ASEAN."] },
  { org: "Lucror Analytics", role: "Credit Research Intern, European High Yield", date: "Jul 2025 – Present", bullets: ["Build, maintain, and enhance fully-integrated financial models for European HY issuers incorporating IFRS 16 adjustments, capitalisation tables, liquidity runways, leverage metrics, and relative value comps.", "Draft and update tear sheets, earnings notes, and bond offering memorandum (OM) summaries for institutional clients across Europe and APAC", "Conduct deep-dive credit reviews covering refinancing risk, covenant packages, recovery analysis, and primary issuance pricing", "Extract financials, trading data, price curves, and market intelligence using Bloomberg (FA, DES, WATC, EQS, WECO) and S&P Capital IQ", "Build and standardise peer sheets (sales, EBITDA, leverage, liquidity, margins, guidance) using a consolidated modelling framework aligned with senior analysts methodology", "Improve internal workflows by automating ISIN mapping, OM retrieval tracking, and Excel formula consistency across issuers", "Collaborate with senior analysts to prepare investor-facing notes and weekly sector updates"] },
  { org: "Archbridge Capital Pte Ltd", role: "Data Analysis Intern", date: "Jun 2025 – Jul 2025", bullets: ["Conducted econometric modelling on micro-enterprise credit data to identify key determinants of borrower default risk (e.g., leverage ratios, repayment history, sectoral volatility, seasonality trends)", "Cleaned, merged, and analysed large structured datasets using Python (pandas, NumPy) to improve lending-model accuracy", "Designed automated stress-testing scenarios in Excel & Python to evaluate portfolio resilience under rate shocks, revenue declines, and liquidity squeezes", "Built dashboards summarising portfolio health metrics (PD, LGD, ECL, sector-level dispersion) to support the investment committee", "Assisted in refining internal credit scoring frameworks by testing additional variables and validating model robustness", "Created reporting templates enabling faster underwriting decisions and more consistent risk reviews"] },
  { org: "Maybank Mbassador", role: "Student Ambassador", date: "Mar 2025 – Present", bullets: ["Selected for Maybank's ambassador program focused on leadership, event management, and community engagement.", "Supported ESG and sustainability campaigns, including eco brick initiatives highlighting responsible banking.", "Facilitated student engagement events, promoting Maybank’s values around responsible banking and community impact"] },
  { org: "Nanyang Capital Stock Pitch Competition", role: "Runner up", date: "Mar 2025", bullets: ["Built a full 3-statement DCF model including revenue drivers, margin expansion, subscriber growth funnels, churn assumptions, and working-capital schedules", "Performed Comparable Company Analysis (EV/EBITDA, EV/Sales, P/E, PEG) benchmarking Netflix against global streaming peers", "Ran scenario analysis incorporating FX sensitivity, WACC adjustments, and terminal value methodologies (Perpetuity & Exit Multiple)", "Assessed competitive strategy using LTV/CAC, content amortisation patterns, and pricing-power dynamics", "Developed a balanced investment thesis combining macro tailwinds (advertising shift, global penetration) and firm-level catalysts", "Delivered a buy recommendation backed by both intrinsic and relative valuation outputs"] },
  { org: "Singfish Pte Ltd (Notes+)", role: "Marketing Intern", date: "May 2024 – Aug 2024", bullets: ["Drove KOL-led marketing campaigns that boosted Notes+ downloads 1,000% across India/UAE in two months.", "Collaborated on pitching Notes+ to Apple's editorial team, helping secure App Store features."] },
  { org: "High School Moms", role: "Student Mentor", date: "May 2021 – Jun 2021", bullets: ["Supported students with university applications and program selection, simplifying complex choices under pressure."] },
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

const placeholderCover =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23161616'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff55' font-size='24' font-family='Arial'%3EBook%20Cover%3C/text%3E%3C/svg%3E";

const scrollToSection = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
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

const Button = ({ href, children, variant = "primary", onClick, target }) => {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-accent focus-visible:outline-white"
      : "border border-white/30 text-white/80 hover:text-white hover:border-white focus-visible:outline-white";

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

function Navigation({ menuOpen, setMenuOpen, onSectionClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img
            src={assetUrl("nav-avatar.jpg")}
            alt="Ayman Tripathi logo"
            className="h-8 w-8 rounded-full border border-white/40 object-cover"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.4em]">
            AT
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          {navItems.map((item) =>
            item.type === "section" ? (
              <button
                key={item.target}
                onClick={() => onSectionClick(item.target)}
                className="transition hover:text-white"
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.target} to={item.target} className="transition hover:text-white">
                {item.label}
              </Link>
            ),
          )}
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
            {navItems.map((item) =>
              item.type === "section" ? (
                <button
                  key={item.target}
                  onClick={() => {
                    onSectionClick(item.target);
                    setMenuOpen(false);
                  }}
                  className="rounded-full border border-white/10 px-4 py-2 text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.target}
                  to={item.target}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/10 px-4 py-2"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection({ onViewProjects }) {
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
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/70">
            Ayman Tripathi
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Economics student focused on global markets, credit, and macro risk.
          </h1>
          <p className="mt-6 text-base text-white/70 sm:text-lg">
            I study Economics at NTU and spend my time connecting macro flows, credit cycles, and policy decisions to real markets. I like building structured views on rates, credit, and FX with models in Python and Excel. Long term, I want to sit where capital is allocated and complex ideas become real transactions.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button href={assetUrl("resume.pdf")}>View Resume</Button>
            <Button variant="ghost" onClick={onViewProjects}>
              View Projects
            </Button>
          </div>
        </div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="mx-auto max-w-sm rounded-[32px] border border-white/15 bg-white/5 p-6 text-center shadow-glow backdrop-blur"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-transparent to-white/5">
              <img
                src={assetUrl("ayman-portrait.jpg")}
                alt="Portrait of Ayman Tripathi"
                className="h-72 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Portrait</p>
            <p className="mt-3 text-xl font-semibold text-white">BSoSci Economics (Honours)</p>
            <p className="mt-2 text-sm text-white/70">
            Yes that's me. Scroll down a bit to know more about me :)
            </p>
          </motion.div>
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
      title="Curious about credit, macro, and how risk gets priced"
      description=""
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
            I am currently an Economics student at Nanyang Technological University, building a portfolio that connects theory with actual balance sheets and trading screens. My experience spans high yield credit research at Lucror Analytics, data analysis at Archbridge Capital, and product-led growth at Singfish where I marketed the Notes+ app across India and the Middle East.
          </p>
          <p>
            Alongside internships, I stay close to markets through my own portfolio and upcoming role with Maybank's Global Markets team, where I will work on AI-driven automation for fixed income and FX workflows. Earlier, I supported students at High School Moms with university applications, which taught me how to simplify complex decisions for people who are under pressure.
          </p>
          <p>
            Outside finance, I box, play guitar, and paint as ways to train discipline, creativity, and patience. Technically, I am comfortable in Python, Excel, VBA, Power BI, and building lightweight tools that help investment decisions move faster with less friction.
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
              <p className="mt-2 text-2xl font-semibold">Credit research in high yield fixed income</p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm text-white/60">
              <div>
                <p className="text-white/40">Timezone</p>
                <p className="text-lg font-semibold text-white">Singapore (SGT)</p>
              </div>
              <div>
                <p className="text-white/40">Availability</p>
                <p className="text-lg font-semibold text-white">Available for internships: Jan – Aug</p>
              </div>
              <div>
                <p className="text-white/40">Edge</p>
                <p className="text-lg font-semibold text-white">Macroeconomics × programming · valuation · financial modelling</p>
              </div>
              <div>
                <p className="text-white/40">Tools</p>
                <p className="text-lg font-semibold text-white">Python · Excel · VBA · Power BI · Bloomberg · Capital IQ</p>
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
      description="Movement, music, and markets—each trains a different muscle but rewards deliberate practice."
    >
      <motion.div
        variants={staggered}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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

function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Side quests that taught me leverage"
      description="Cards are data-driven so I can drop in new builds quickly."
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
                <span key={tag} className="rounded-full border border-white/20 px-3 py-1">
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
      description="Each card pulls from a data array so I can swap cover art and notes easily."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <motion.div
            key={book.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="relative mb-5 h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
              <img
                src={assetUrl(`books/${book.slug}.jpg`)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-lg opacity-50"
                aria-hidden="true"
                onError={(event) => {
                  event.currentTarget.src = placeholderCover;
                }}
              />
              <img
                src={assetUrl(`books/${book.slug}.jpg`)}
                alt={`${book.title} cover`}
                className="relative z-10 h-full w-full object-contain"
                onError={(event) => {
                  event.currentTarget.src = placeholderCover;
                }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{book.author}</p>
            <h3 className="mt-2 text-xl font-semibold">{book.title}</h3>
            <p className="mt-3 text-sm text-white/70">{book.note}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ResearchSection() {
  return (
    <Section
      id="reports"
      eyebrow="Research Reports"
      title="Personal equity and macro notes, updated regularly"
      description="Each report is a snapshot of how my views evolve across equities, credit, and macro."
    >
      <div className="space-y-6">
        {reports.map((report) => (
          <motion.a
            key={report.title}
            href={report.href || "#"}
            onClick={(event) => {
              if (!report.href) event.preventDefault();
            }}
            target={report.href ? "_blank" : undefined}
            rel={report.href ? "noreferrer" : undefined}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-6 text-left sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{report.date}</p>
              <h3 className="mt-2 text-xl font-semibold">{report.title}</h3>
              {report.description && (
                <p className="mt-2 text-sm text-white/70">{report.description}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              {report.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/20 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
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
      description="Open to research, investment banking, and product roles that value clarity, hustle, and tasteful execution."
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

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      scrollToSection(location.hash.replace("#", ""));
    }
  }, [location.hash]);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      scrollToSection(location.state.scrollTo);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <HeroSection onViewProjects={() => scrollToSection("projects")} />
      <AboutSection />
      <HobbiesSection />
      <ProjectsSection />
      <BooksSection />
      <ResearchSection />
      <ContactSection />
    </>
  );
}

function ExperiencePage() {
  return (
    <section className="px-6 pt-32 pb-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Experience"
          title="Experience timeline"
          description="A dedicated page so recruiters and collaborators can skim roles quickly."
        />
        <div className="relative border-l border-white/10 pl-8">
          {experienceTimeline.map((experience, idx) => (
            <motion.div
              key={`${experience.org}-${experience.role}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border border-accent/40 bg-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{experience.date}</p>
              <h3 className="mt-2 text-2xl font-semibold">{experience.role}</h3>
              <p className="text-white/60">{experience.org}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {experience.bullets.map((point) => (
                  <li key={point} className="leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-canvas to-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-120px] mx-auto h-96 w-96 rounded-full bg-accent/40 blur-[200px]" />
        <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-accent-soft/30 blur-[180px]" />
      </div>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} onSectionClick={handleSectionClick} />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
      </main>
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Ayman Tripathi. Built with React + Tailwind.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout />
    </BrowserRouter>
  );
}
