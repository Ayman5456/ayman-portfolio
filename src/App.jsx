import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";

const supportsMotion = Boolean(motion);

const navItems = [
  { label: "Home", type: "section", target: "home" },
  { label: "About", type: "section", target: "about" },
  { label: "Hobbies", type: "section", target: "hobbies" },
  { label: "Experience", type: "route", target: "/experience" },
  { label: "Projects", type: "section", target: "projects" },
  { label: "Portfolio", type: "route", target: "/portfolio" },
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
    title: "Archbridge capital",
    description:
      "Data analysis and credit-focused workstreams from my internship experience at Archbridge.",
    tags: ["Python", "Credit", "Data Analysis"],
    link: "https://github.com/Ayman5456/Archbridge-Capital",
  },
  {
    title: "Econometrics regression (forgot what it was for)",
    description:
      "Regression-focused econometrics work exploring statistical relationships in financial data.",
    tags: ["Econometrics", "Regression", "Python"],
    link: "https://github.com/Ayman5456/Econometrics-regression",
  },
  {
    title: "Sentiment analysis for hotels to hit ESG targets",
    description:
      "NLP workflow to analyze hospitality sentiment data and map insights to ESG-linked targets.",
    tags: ["NLP", "Sentiment Analysis", "ESG"],
    link: "https://github.com/Ayman5456/Sentiment-analysis-for-hotels",
  },
  {
    title: "Fixed income swap pricing",
    description:
      "Swap pricing implementation with fixed income analytics and valuation mechanics.",
    tags: ["Fixed Income", "Derivatives", "Pricing"],
    link: "https://github.com/Ayman5456/Fixed-income-swap-pricing",
  },
];

const financialModels = [
  {
    title: "Netflix financial model",
    file: "models/netflix-financial-model.xlsx",
  },
  {
    title: "Macy's financial model",
    file: "models/macys-financial-model.xlsx",
  },
  {
    title: "Nissin Financial Model",
    file: "models/nissin-financial-model.xlsx",
  },
  {
    title: "AST Spacemobile",
    file: "models/ast-spacemobile-financial-model.xlsx",
  },
  {
    title: "Applied digital",
    file: "models/applied-digital-financial-model.xlsx",
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
  { title: "Macro report 22nd Feb", date: "22 Feb 2026", tags: ["Macro", "Rates", "Portfolio"], description: "Weekly macro update covering rates, positioning shifts, and cross-asset signals.", href: `${import.meta.env.BASE_URL}reports/macro-outlook-22nd-feb.pdf` },
  { title: "Credit note – Macy's senior unsecured bonds", date: "Jan 2025", tags: ["Credit", "Retail", "Bond"], description: "Issuer-specific view covering leverage, liquidity, catalysts, and relative value in Macy's capital structure.", href: `${import.meta.env.BASE_URL}reports/macys-report.pdf` },
  { title: "Netflix report", date: "Upcoming", tags: ["Equity", "Media", "Valuation"], description: "will be updated on substack and in here later", href: `${import.meta.env.BASE_URL}reports/netflix-report.pdf` },
  { title: "Nissin report", date: "Upcoming", tags: ["Equity", "Consumer", "Valuation"], description: "will be updated on substack and in here later" },
  { title: "Applied digital report", date: "Upcoming", tags: ["Equity", "Data Center", "Growth"], description: "will be updated on substack and in here later" },
  { title: "ASTS report", date: "Upcoming", tags: ["Equity", "Space", "Growth"], description: "will be updated on substack and in here later" },
];

const experienceTimeline = [
  { org: "Maybank Investment Banking Group", role: "Incoming Global Markets Intern (Quantitative Development)", date: "Upcoming", bullets: ["Working on AI-driven automation using Python and LLMs to structure financial data for trading and restructuring desks.", "Exposure to fixed income, FX, and derivatives while supporting front-office sales and risk teams across ASEAN."] },
  { org: "Team Lewis", role: "ESG Intern", date: "2025", bullets: ["Built an end-to-end sentiment analysis dashboard (10K+ hotel reviews) to identify ESG-linked operational pain points, with a focus on environmental (E) score drivers.", "Designed an aspect-level NLP model to isolate bathroom, water usage, drainage, heating/cooling, and cleanliness complaints, quantifying their impact on customer ratings.", "Identified that negative bathroom-related reviews resulted in an average ~45% drop in customer rating, making it the second-largest detractor to overall satisfaction.", "Linked customer pain points to Bloomberg ESG disclosures to uncover a structural issue: water conservation inefficiencies driving weaker environmental scores.", "Developed a data-driven problem-solving framework proposing targeted water optimization initiatives (e.g., pressure systems, heating regulation, water recycling concepts) to simultaneously improve ESG metrics and customer experience."] },
  { org: "Lucror Analytics", role: "Credit Research Intern, European High Yield", date: "Jul 2025 – Dec 2025", bullets: ["Build, maintain, and enhance fully-integrated financial models for European HY issuers incorporating IFRS 16 adjustments, capitalisation tables, liquidity runways, leverage metrics, and relative value comps.", "Draft and update tear sheets, earnings notes, and bond offering memorandum (OM) summaries for institutional clients across Europe and APAC", "Conduct deep-dive credit reviews covering refinancing risk, covenant packages, recovery analysis, and primary issuance pricing", "Extract financials, trading data, price curves, and market intelligence using Bloomberg (FA, DES, WATC, EQS, WECO) and S&P Capital IQ", "Build and standardise peer sheets (sales, EBITDA, leverage, liquidity, margins, guidance) using a consolidated modelling framework aligned with senior analysts methodology", "Improve internal workflows by automating ISIN mapping, OM retrieval tracking, and Excel formula consistency across issuers", "Collaborate with senior analysts to prepare investor-facing notes and weekly sector updates"] },
  { org: "Archbridge Capital Pte Ltd", role: "Data Analysis Intern", date: "Jun 2025 – Jul 2025", bullets: ["Conducted econometric modelling on micro-enterprise credit data to identify key determinants of borrower default risk (e.g., leverage ratios, repayment history, sectoral volatility, seasonality trends)", "Cleaned, merged, and analysed large structured datasets using Python (pandas, NumPy) to improve lending-model accuracy", "Designed automated stress-testing scenarios in Excel & Python to evaluate portfolio resilience under rate shocks, revenue declines, and liquidity squeezes", "Built dashboards summarising portfolio health metrics (PD, LGD, ECL, sector-level dispersion) to support the investment committee", "Assisted in refining internal credit scoring frameworks by testing additional variables and validating model robustness", "Created reporting templates enabling faster underwriting decisions and more consistent risk reviews"] },
  { org: "Maybank Mbassador", role: "Student Ambassador", date: "Mar 2025 – Present", bullets: ["Selected for Maybank's ambassador program focused on leadership, event management, and community engagement.", "Supported ESG and sustainability campaigns, including eco brick initiatives highlighting responsible banking.", "Facilitated student engagement events, promoting Maybank’s values around responsible banking and community impact"] },
  { org: "Nanyang Capital Stock Pitch Competition", role: "Runner up", date: "Mar 2025", bullets: ["Built a full 3-statement DCF model including revenue drivers, margin expansion, subscriber growth funnels, churn assumptions, and working-capital schedules", "Performed Comparable Company Analysis (EV/EBITDA, EV/Sales, P/E, PEG) benchmarking Netflix against global streaming peers", "Ran scenario analysis incorporating FX sensitivity, WACC adjustments, and terminal value methodologies (Perpetuity & Exit Multiple)", "Assessed competitive strategy using LTV/CAC, content amortisation patterns, and pricing-power dynamics", "Developed a balanced investment thesis combining macro tailwinds (advertising shift, global penetration) and firm-level catalysts", "Delivered a buy recommendation backed by both intrinsic and relative valuation outputs"] },
  { org: "Singfish Pte Ltd (Notes+)", role: "Marketing Intern", date: "May 2024 – Aug 2024", bullets: ["Drove KOL-led marketing campaigns that boosted Notes+ downloads 1,000% across India/UAE in two months.", "Collaborated on pitching Notes+ to Apple's editorial team, helping secure App Store features."] },
  { org: "High School Moms", role: "Student Mentor", date: "May 2021 – Jun 2021", bullets: ["Supported students with university applications and program selection, simplifying complex choices under pressure."] },
];

const benchmarkHolding = {
  ticker: "SPY",
  symbol: "SPY",
  fallbackName: "SPDR S&P 500 ETF Trust",
  fallbackType: "ETF",
};

const portfolioHoldings = [
  { ticker: "IAU", symbol: "IAU", fallbackName: "iShares Gold Trust", fallbackType: "ETF" },
  { ticker: "CSPX", symbol: "CSPX.L", fallbackName: "iShares Core S&P 500 UCITS ETF", fallbackType: "ETF" },
  { ticker: "SOC", symbol: "SOC", fallbackType: "Stock" },
  { ticker: "SBET", symbol: "SBET", fallbackType: "Stock" },
  { ticker: "APLD", symbol: "APLD", fallbackName: "Applied Digital Corporation", fallbackType: "Stock" },
  { ticker: "VDPX", symbol: "VDPX", fallbackType: "ETF" },
  { ticker: "COPX", symbol: "COPX", fallbackName: "Global X Copper Miners ETF", fallbackType: "ETF" },
  { ticker: "CSPXJ", symbol: "CSPXJ.L", fallbackType: "ETF" },
  { ticker: "UFO", symbol: "UFO", fallbackName: "Procure Space ETF", fallbackType: "ETF" },
  { ticker: "METC", symbol: "METC", fallbackName: "Ramaco Resources, Inc.", fallbackType: "Stock" },
  { ticker: "MAGS", symbol: "MAGS", fallbackName: "Roundhill Magnificent Seven ETF", fallbackType: "ETF" },
  { ticker: "INDA", symbol: "INDA", fallbackName: "iShares MSCI India ETF", fallbackType: "ETF" },
  { ticker: "UA", symbol: "UA", fallbackName: "Under Armour, Inc.", fallbackType: "Stock" },
  { ticker: "VERISURE", symbol: "VERISURE", fallbackType: "Stock" },
  { ticker: "ES3", symbol: "ES3.SI", fallbackName: "SPDR Straits Times Index ETF", fallbackType: "ETF" },
  { ticker: "JPM", symbol: "JPM", fallbackName: "JPMorgan Chase & Co.", fallbackType: "Stock" },
  { ticker: "GOOGL", symbol: "GOOGL", fallbackName: "Alphabet Inc.", fallbackType: "Stock" },
  { ticker: "ABNB", symbol: "ABNB", fallbackName: "Airbnb, Inc.", fallbackType: "Stock" },
  { ticker: "SOIL", symbol: "SOIL.L", fallbackType: "ETF" },
  { ticker: "KO", symbol: "KO", fallbackName: "The Coca-Cola Company", fallbackType: "Stock" },
  { ticker: "TLT", symbol: "TLT", fallbackName: "iShares 20+ Year Treasury Bond ETF", fallbackType: "ETF" },
];

const performanceRangeOptions = ["1M", "3M", "6M", "YTD", "1Y", "Max"];
const MARKET_DATA_BASE_URL =
  import.meta.env.VITE_MARKET_DATA_BASE_URL || "https://query1.finance.yahoo.com";
const MARKET_DATA_API_KEY = import.meta.env.VITE_MARKET_DATA_API_KEY;
const CACHE_PREFIX = "portfolio-market-cache:v1";
const QUOTE_CACHE_TTL_MS = 15 * 60 * 1000;
const HISTORY_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const chunkArray = (items, chunkSize) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
};

const getCache = (key, ttlMs) => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${CACHE_PREFIX}:${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || Date.now() - parsed.timestamp > ttlMs) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const setCache = (key, data) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      `${CACHE_PREFIX}:${key}`,
      JSON.stringify({ timestamp: Date.now(), data }),
    );
  } catch {
    // Ignore localStorage write errors (quota/private mode)
  }
};

const fetchJsonWithCache = async (key, ttlMs, url) => {
  const cached = getCache(key, ttlMs);
  if (cached) return cached;

  const headers = MARKET_DATA_API_KEY ? { "x-api-key": MARKET_DATA_API_KEY } : undefined;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Market data request failed (${response.status})`);
  }
  const data = await response.json();
  setCache(key, data);
  return data;
};

const fetchQuotes = async (symbols) => {
  const quoteMap = {};
  const chunks = chunkArray(symbols, 8);

  await Promise.all(
    chunks.map(async (chunk) => {
      const sortedChunk = [...chunk].sort();
      const url = `${MARKET_DATA_BASE_URL}/v7/finance/quote?symbols=${encodeURIComponent(
        sortedChunk.join(","),
      )}`;
      const data = await fetchJsonWithCache(
        `quotes:${sortedChunk.join(",")}`,
        QUOTE_CACHE_TTL_MS,
        url,
      );
      const results = data?.quoteResponse?.result || [];
      results.forEach((quote) => {
        if (quote?.symbol) quoteMap[quote.symbol] = quote;
      });
    }),
  );

  return quoteMap;
};

const fetchHistory = async (symbol) => {
  const url = `${MARKET_DATA_BASE_URL}/v8/finance/chart/${encodeURIComponent(
    symbol,
  )}?interval=1d&range=5y&events=history&includePrePost=false`;

  const data = await fetchJsonWithCache(`history:${symbol}:5y:1d`, HISTORY_CACHE_TTL_MS, url);
  const result = data?.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const closes = result?.indicators?.quote?.[0]?.close || [];

  return timestamps
    .map((timestamp, index) => ({
      date: timestamp * 1000,
      close: closes[index],
    }))
    .filter((point) => Number.isFinite(point.close))
    .sort((a, b) => a.date - b.date);
};

const normalizeAssetType = (quoteType, fallbackType) => {
  if (quoteType === "ETF") return "ETF";
  if (quoteType === "EQUITY") return "Stock";
  if (quoteType === "MUTUALFUND") return "Fund";
  return fallbackType || "—";
};

const formatCurrency = (value) => {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 4 : 2,
  }).format(value);
};

const formatPercent = (value) => {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(2)}%`;
};

const getPerformanceClass = (value) => {
  if (!Number.isFinite(value)) return "text-white/40";
  if (value > 0) return "text-emerald-300";
  if (value < 0) return "text-rose-300";
  return "text-white/50";
};

const findFirstPointOnOrAfter = (series, targetDate) =>
  series.find((point) => point.date >= targetDate) || null;

const calculateReturnFromStart = (series, startDate) => {
  if (!series.length) return null;
  const startPoint = findFirstPointOnOrAfter(series, startDate);
  const endPoint = series[series.length - 1];
  if (!startPoint || !endPoint || startPoint.close <= 0) return null;
  return endPoint.close / startPoint.close - 1;
};

const calculateHoldingMetrics = (series, quote) => {
  if (!series.length) {
    const oneDayFallback = Number.isFinite(quote?.regularMarketChangePercent)
      ? quote.regularMarketChangePercent / 100
      : null;
    return { oneDay: oneDayFallback, oneWeek: null, oneMonth: null, ytd: null, ttm: null };
  }

  const lastPoint = series[series.length - 1];
  const previousPoint = series.length > 1 ? series[series.length - 2] : null;
  const ytdStart = Date.UTC(new Date(lastPoint.date).getUTCFullYear(), 0, 1);

  return {
    oneDay:
      previousPoint && previousPoint.close > 0
        ? lastPoint.close / previousPoint.close - 1
        : Number.isFinite(quote?.regularMarketChangePercent)
          ? quote.regularMarketChangePercent / 100
          : null,
    oneWeek: calculateReturnFromStart(series, lastPoint.date - 7 * ONE_DAY_MS),
    oneMonth: calculateReturnFromStart(series, lastPoint.date - 30 * ONE_DAY_MS),
    ytd: calculateReturnFromStart(series, ytdStart),
    ttm: calculateReturnFromStart(series, lastPoint.date - 365 * ONE_DAY_MS),
  };
};

const getRangeStartDate = (range, latestDate, earliestDate) => {
  const latest = latestDate || Date.now();
  switch (range) {
    case "1M":
      return Math.max(earliestDate, latest - 31 * ONE_DAY_MS);
    case "3M":
      return Math.max(earliestDate, latest - 92 * ONE_DAY_MS);
    case "6M":
      return Math.max(earliestDate, latest - 183 * ONE_DAY_MS);
    case "YTD":
      return Math.max(earliestDate, Date.UTC(new Date(latest).getUTCFullYear(), 0, 1));
    case "1Y":
      return Math.max(earliestDate, latest - 365 * ONE_DAY_MS);
    case "Max":
    default:
      return earliestDate;
  }
};

const buildComparisonSeries = (holdingHistories, benchmarkHistory, range) => {
  if (!benchmarkHistory.length) return [];

  const benchmarkStart = benchmarkHistory[0].date;
  const benchmarkEnd = benchmarkHistory[benchmarkHistory.length - 1].date;
  const rangeStart = getRangeStartDate(range, benchmarkEnd, benchmarkStart);
  const benchmarkRangeStartPoint = findFirstPointOnOrAfter(benchmarkHistory, rangeStart);
  if (!benchmarkRangeStartPoint || benchmarkRangeStartPoint.close <= 0) return [];

  const benchmarkSeries = benchmarkHistory
    .filter((point) => point.date >= benchmarkRangeStartPoint.date)
    .map((point) => ({
      date: point.date,
      benchmark: point.close / benchmarkRangeStartPoint.close - 1,
    }));

  const normalizedHoldingSeries = holdingHistories
    .map((series) => {
      if (!series.length) return null;
      const holdingStartPoint = findFirstPointOnOrAfter(series, rangeStart);
      if (!holdingStartPoint || holdingStartPoint.close <= 0) return null;
      return series
        .filter((point) => point.date >= holdingStartPoint.date)
        .map((point) => ({
          date: point.date,
          value: point.close / holdingStartPoint.close - 1,
        }));
    })
    .filter(Boolean);

  if (!normalizedHoldingSeries.length) return [];

  const cursors = normalizedHoldingSeries.map(() => 0);

  return benchmarkSeries
    .map((benchmarkPoint) => {
      let sum = 0;
      let count = 0;

      normalizedHoldingSeries.forEach((series, index) => {
        while (
          cursors[index] + 1 < series.length &&
          series[cursors[index] + 1].date <= benchmarkPoint.date
        ) {
          cursors[index] += 1;
        }
        const point = series[cursors[index]];
        if (point && point.date <= benchmarkPoint.date) {
          sum += point.value;
          count += 1;
        }
      });

      if (!count) return null;
      return {
        date: benchmarkPoint.date,
        portfolio: sum / count,
        benchmark: benchmarkPoint.benchmark,
      };
    })
    .filter(Boolean);
};

const buildSvgPath = (points, valueAccessor, width, height, padding, minValue, maxValue) => {
  if (points.length < 2) return "";
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;
  const valueRange = maxValue - minValue || 1;

  return points
    .map((point, index) => {
      const x = padding + (index / (points.length - 1)) * usableWidth;
      const normalized = (valueAccessor(point) - minValue) / valueRange;
      const y = height - padding - normalized * usableHeight;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
};

const formatChartDate = (timestamp) =>
  new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatLastUpdated = (timestamp) =>
  new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const portfolioSnapshotStats = [
  { label: "Portfolio beta", value: "~ 2.23" },
  { label: "TTM performance", value: "12.43%" },
  { label: "TTM high", value: "58.044%" },
  { label: "TTM low", value: "-76.13%" },
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
        <div aria-hidden className="h-8 w-8" />

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
            I study Economics at NTU and spend my time connecting macro flows, credit cycles, and policy decisions to real markets. I like building structured views on rates, credit, and FX with models in Python and Excel. Long term, I want to sit where capital is allocated and complex ideas become real transactions. A small note that this website has been created with the help of Chatgpt and Claude. I would like to note that I'm not proficient with Javascript, React and Tailwind. 
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button href={`${import.meta.env.BASE_URL}resume.pdf`}>View Resume</Button>
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
                src={`${import.meta.env.BASE_URL}ayman-portrait.jpg`}
                alt="Portrait of Ayman Tripathi"
                className="h-72 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = placeholderCover; // fallback instead of disappearing
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

      <div className="mt-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Financial models</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Excel files from my valuation work</h3>
          <p className="mt-3 text-sm text-white/70">Download links for the models directly used in my equity and credit research workflow.</p>
        </motion.div>

        <motion.div
          variants={staggered}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          {financialModels.map((model) => (
            <motion.article
              key={model.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base font-semibold">{model.title}</h4>
                <a
                  href={`${import.meta.env.BASE_URL}${model.file}`}
                  download
                  className="text-sm text-accent-soft transition hover:text-white"
                >
                  Download
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function BooksSection() {
  return (
    <Section
      id="books"
      eyebrow="Books"
      title="Books shaping my thinking"
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
                src={`${import.meta.env.BASE_URL}books/${book.slug}.jpg`}
                alt={`${book.title} cover`}
                className="h-full w-full object-cover"
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
      description="Open to research, investment banking, and product roles that value clarity, hustle, and tasteful execution. Please help me get a job, my university SUCKS and have told me to go piss off and look for jobs myself (not helping at all). I'll take in anything at this point and will work for you for free pls."
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

function MiniSparkline({ values }) {
  if (!values || values.length < 2) {
    return <span className="text-xs text-white/40">—</span>;
  }

  const width = 96;
  const height = 28;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  const path = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - minValue) / valueRange) * height;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const isPositive = values[values.length - 1] >= values[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-7 w-24">
      <path
        d={path}
        fill="none"
        stroke={isPositive ? "#34d399" : "#fb7185"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PortfolioPerformanceChart({ data }) {
  if (!data.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
        Data temporarily unavailable
      </div>
    );
  }

  const width = 1100;
  const height = 360;
  const padding = 34;
  const allValues = data.flatMap((point) => [point.portfolio, point.benchmark]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const paddedMin = minValue - 0.02;
  const paddedMax = maxValue + 0.02;
  const portfolioPath = buildSvgPath(
    data,
    (point) => point.portfolio,
    width,
    height,
    padding,
    paddedMin,
    paddedMax,
  );
  const benchmarkPath = buildSvgPath(
    data,
    (point) => point.benchmark,
    width,
    height,
    padding,
    paddedMin,
    paddedMax,
  );
  const startDate = formatChartDate(data[0].date);
  const endDate = formatChartDate(data[data.length - 1].date);
  const latestPortfolio = data[data.length - 1]?.portfolio;
  const latestBenchmark = data[data.length - 1]?.benchmark;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-white/80">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-soft" />
          Portfolio (equal-weight)
          <span className={`font-semibold ${getPerformanceClass(latestPortfolio)}`}>
            {formatPercent(latestPortfolio)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
          SPY benchmark
          <span className={`font-semibold ${getPerformanceClass(latestBenchmark)}`}>
            {formatPercent(latestBenchmark)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full min-w-[720px]">
          <line
            x1={padding}
            y1={height / 2}
            x2={width - padding}
            y2={height / 2}
            stroke="rgba(255,255,255,0.16)"
            strokeDasharray="5 5"
          />
          <path
            d={benchmarkPath}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={portfolioPath}
            fill="none"
            stroke="rgba(251,113,133,0.95)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/50">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
    </div>
  );
}

function PortfolioPage() {
  const [selectedRange, setSelectedRange] = useState("YTD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [quoteMap, setQuoteMap] = useState({});
  const [historyMap, setHistoryMap] = useState({});
  const [benchmarkHistory, setBenchmarkHistory] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadMarketData = async () => {
      setLoading(true);
      setError(null);

      const symbols = [...new Set([...portfolioHoldings.map((holding) => holding.symbol), benchmarkHolding.symbol])];
      const historyResults = await Promise.allSettled(symbols.map((symbol) => fetchHistory(symbol)));
      const fetchedHistories = {};
      let availableSeriesCount = 0;
      historyResults.forEach((result, index) => {
        const symbol = symbols[index];
        const series = result.status === "fulfilled" ? result.value : [];
        fetchedHistories[symbol] = series;
        if (series.length > 1) availableSeriesCount += 1;
      });

      let fetchedQuotes = {};
      try {
        fetchedQuotes = await fetchQuotes(symbols);
      } catch {
        fetchedQuotes = {};
      }

      if (cancelled) return;

      setQuoteMap(fetchedQuotes);
      setBenchmarkHistory(fetchedHistories[benchmarkHolding.symbol] || []);
      const holdingsOnly = {};
      portfolioHoldings.forEach((holding) => {
        holdingsOnly[holding.symbol] = fetchedHistories[holding.symbol] || [];
      });
      setHistoryMap(holdingsOnly);

      if (!availableSeriesCount) {
        setError("Data temporarily unavailable");
      }
      setUpdatedAt(Date.now());
      setLoading(false);
    };

    loadMarketData().catch(() => {
      if (cancelled) return;
      setError("Data temporarily unavailable");
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const holdingsRows = useMemo(
    () =>
      portfolioHoldings.map((holding) => {
        const quote = quoteMap[holding.symbol];
        const series = historyMap[holding.symbol] || [];
        const metrics = calculateHoldingMetrics(series, quote);
        const latestClose = series.length ? series[series.length - 1].close : null;

        return {
          ticker: holding.ticker,
          name: quote?.longName || quote?.shortName || holding.fallbackName || "Data unavailable",
          type: normalizeAssetType(quote?.quoteType, holding.fallbackType),
          price: Number.isFinite(quote?.regularMarketPrice) ? quote.regularMarketPrice : latestClose,
          oneDay: metrics.oneDay,
          oneWeek: metrics.oneWeek,
          oneMonth: metrics.oneMonth,
          ytd: metrics.ytd,
          ttm: metrics.ttm,
          sparkline: series.slice(-20).map((point) => point.close),
        };
      }),
    [quoteMap, historyMap],
  );

  const comparisonSeries = useMemo(() => {
    const holdingSeries = portfolioHoldings
      .map((holding) => historyMap[holding.symbol] || [])
      .filter((series) => series.length > 1);
    return buildComparisonSeries(holdingSeries, benchmarkHistory, selectedRange);
  }, [historyMap, benchmarkHistory, selectedRange]);

  return (
    <section className="px-6 pt-32 pb-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Portfolio"
          title="Stock portfolio"
          description="Current holdings, estimated equal-weight performance, and benchmark-relative tracking."
        />

        <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-4 text-sm text-amber-100">
          Portfolio weights will be updated on 30 March 2026 (exams ongoing, so I haven&apos;t refreshed allocations yet).
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold">Portfolio Snapshot</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioSnapshotStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-semibold">Holdings</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolioHoldings.map((holding) => (
              <span
                key={holding.ticker}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                {holding.ticker}
              </span>
            ))}
          </div>

          <div className="mt-5 overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
            <table className="min-w-[1160px] w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-white/50">
                <tr>
                  <th className="px-4 py-4">Ticker</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">1D</th>
                  <th className="px-4 py-4">1W</th>
                  <th className="px-4 py-4">1M</th>
                  <th className="px-4 py-4">YTD</th>
                  <th className="px-4 py-4">TTM</th>
                  <th className="px-4 py-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {loading &&
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="animate-pulse border-b border-white/5">
                      <td className="px-4 py-4"><div className="h-3 w-14 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-52 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-16 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-20 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-16 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-16 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-16 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-16 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-3 w-16 rounded bg-white/10" /></td>
                      <td className="px-4 py-4"><div className="h-6 w-24 rounded bg-white/10" /></td>
                    </tr>
                  ))}
                {!loading &&
                  holdingsRows.map((row) => (
                    <tr key={row.ticker} className="border-b border-white/5 align-top">
                      <td className="px-4 py-4 font-semibold">{row.ticker}</td>
                      <td className="px-4 py-4 text-white/80">{row.name}</td>
                      <td className="px-4 py-4 text-white/70">{row.type}</td>
                      <td className="px-4 py-4 text-white/80">{formatCurrency(row.price)}</td>
                      <td className={`px-4 py-4 ${getPerformanceClass(row.oneDay)}`}>{formatPercent(row.oneDay)}</td>
                      <td className={`px-4 py-4 ${getPerformanceClass(row.oneWeek)}`}>{formatPercent(row.oneWeek)}</td>
                      <td className={`px-4 py-4 ${getPerformanceClass(row.oneMonth)}`}>{formatPercent(row.oneMonth)}</td>
                      <td className={`px-4 py-4 ${getPerformanceClass(row.ytd)}`}>{formatPercent(row.ytd)}</td>
                      <td className={`px-4 py-4 ${getPerformanceClass(row.ttm)}`}>{formatPercent(row.ttm)}</td>
                      <td className="px-4 py-4"><MiniSparkline values={row.sparkline} /></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {error && !loading && (
            <p className="mt-3 text-sm text-amber-300">{error}</p>
          )}
          {!error && updatedAt && (
            <p className="mt-3 text-xs text-white/50">Last updated: {formatLastUpdated(updatedAt)}</p>
          )}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-semibold">Performance vs Market</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {performanceRangeOptions.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setSelectedRange(range)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  selectedRange === range
                    ? "border-accent-soft bg-accent-soft/20 text-white"
                    : "border-white/20 text-white/65 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="mt-5">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="h-64 animate-pulse rounded-2xl bg-white/10" />
              </div>
            ) : (
              <PortfolioPerformanceChart data={comparisonSeries} />
            )}
          </div>
          <p className="mt-3 text-sm text-white/60">
            Note: returns are estimated using equal-weighted holdings until weights are updated.
          </p>
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-7">
          <p className="text-xs uppercase tracking-[0.35em] text-accent/80">Research & Thesis</p>
          <h3 className="mt-3 text-2xl font-semibold">Deep dives for every position</h3>
          <p className="mt-3 max-w-3xl text-sm text-white/70">
            Want to review my thesis, financial models, and reasoning behind each holding? Visit my Substack for individual write-ups and reports.
          </p>
          <div className="mt-5">
            <Button href="SUBSTACK_URL_HERE" target="_blank">
              Read on Substack
            </Button>
          </div>
        </div>

        <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-white/45">
          This is not financial advice. For informational purposes only.
        </p>
      </div>
    </section>
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
        <div className="relative border-l border-white/10 pl-10">
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
              <span className="absolute -left-12 top-1.5 h-4 w-4 rounded-full border border-accent/40 bg-accent" />
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
    <div
      data-motion={supportsMotion ? "enabled" : "disabled"}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-canvas to-black text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-120px] mx-auto h-96 w-96 rounded-full bg-accent/40 blur-[200px]" />
        <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-accent-soft/30 blur-[180px]" />
      </div>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} onSectionClick={handleSectionClick} />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
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
