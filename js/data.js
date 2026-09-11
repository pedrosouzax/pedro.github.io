// ============================================================
//  DATA.JS — Edit this file to add/update your content.
//  No need to touch any HTML file for normal updates.
// ============================================================


// ── STUDIES ──────────────────────────────────────────────────
// Fields:
//   title    : string
//   author   : string (optional)
//   format   : "Book" | "Video" | "Course" | "Article"
//   field    : "AI" | "Statistics" | "Math" | "Programming" | "Other"
//   status   : "Doing" | "To Do" | "Done" | "Paused"
//   summary  : string — your personal notes/takeaways

const STUDIES = [
  {
    id: 1,
    title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
    author: "Aurélien Géron",
    format: "Book",
    field: "AI",
    status: "Doing",
    summary:
      "A comprehensive practical guide to ML. Currently on Chapter 10, covering neural networks with Keras. The hands-on exercises are excellent for cementing concepts — highly recommend working through each Jupyter notebook as you go.",
  },
  {
    id: 2,
    title: "StatQuest with Josh Starmer — Machine Learning Playlist",
    author: "Josh Starmer",
    format: "Video",
    field: "Statistics",
    status: "Doing",
    summary:
      "The best statistics and ML content on YouTube. No-nonsense explanations that build intuition from scratch. No prerequisites, no fluff — just clear, visual explanations that actually stick.",
  },
  {
    id: 3,
    title: "Python for Data Analysis",
    author: "Wes McKinney",
    format: "Book",
    field: "Programming",
    status: "Done",
    summary:
      "Solid reference for pandas and NumPy. Gave me a strong foundation for data wrangling workflows. The sections on time series and GroupBy operations were particularly practical.",
  },
  {
    id: 4,
    title: "Essence of Linear Algebra",
    author: "3Blue1Brown",
    format: "Video",
    field: "Math",
    status: "Done",
    summary:
      "The most beautiful way to build geometric intuition for linear algebra. Transformations, eigenvectors, and the dot product finally clicked after watching this series. A must-watch before any deep ML study.",
  },
  {
    id: 5,
    title: "The Elements of Statistical Learning",
    author: "Hastie, Tibshirani & Friedman",
    format: "Book",
    field: "Statistics",
    status: "To Do",
    summary:
      'The "bible" of statistical learning. Dense but very thorough. Planning to tackle this after the Géron book to deepen the theoretical foundations behind the practical techniques.',
  },
  {
    id: 6,
    title: "CS50's Introduction to AI with Python",
    author: "Harvard / edX",
    format: "Course",
    field: "AI",
    status: "To Do",
    summary:
      "Harvard's free AI course. Covers search, optimization, knowledge representation, and neural networks. Queued up as a great structured complement to self-study books.",
  },
];


// ── PROJECTS ──────────────────────────────────────────────────
// Fields:
//   title       : string
//   description : string
//   tech        : string[]
//   github      : string | null
//   demo        : string | null

const PROJECTS = [
  // Uncomment and fill when you have a project!
  // {
  //   id: 1,
  //   title: "My Project",
  //   description: "A short description of what it does and what problem it solves.",
  //   tech: ["Python", "pandas", "scikit-learn"],
  //   github: "https://github.com/pedrosouzax/project-name",
  //   demo: null,
  // },
];


// ── NOTES ─────────────────────────────────────────────────────
// Fields:
//   title : string
//   date  : string (e.g. "Sep 2026")
//   tags  : string[] — use Field values (AI, Statistics, Math, Programming)
//   body  : string — HTML allowed (e.g. <strong>, <em>)

const NOTES = [
  {
    id: 1,
    title: "Understanding Gradient Descent Intuitively",
    date: "Sep 2026",
    tags: ["AI", "Math"],
    body: `Gradient descent is how machine learning models "learn." Imagine you're blindfolded on a hilly landscape and want to reach the lowest valley — you feel the slope under your feet and take a step downhill. Repeat until you can't go lower. That's it.<br><br>
The <strong>gradient</strong> tells you the direction of steepest ascent, so you move in the opposite direction. The <strong>learning rate</strong> controls how big your steps are — too big and you overshoot the valley, too small and it takes forever. <strong>Mini-batch gradient descent</strong> is the sweet spot in practice: faster than computing the full gradient, and less noisy than using a single sample.`,
  },
  {
    id: 2,
    title: "What is a p-value, actually?",
    date: "Sep 2026",
    tags: ["Statistics"],
    body: `A p-value is the probability of observing results <em>as extreme as yours</em>, assuming the null hypothesis is true. It does <strong>not</strong> tell you the probability that your hypothesis is correct.<br><br>
A p-value of 0.03 means: "if there were truly no effect, there's a 3% chance I'd see data this extreme by random chance." The common threshold of 0.05 is arbitrary — it was chosen by Fisher as a convenience. The misuse of p-values in science is a real problem (p-hacking, treating 0.049 and 0.051 as categorically different). Always pair with effect sizes and confidence intervals.`,
  },
];


// ── HOBBIES ───────────────────────────────────────────────────
const HOBBIES = {
  guitar: {
    level: "Beginner",
    startedOn: "Sep 2026",
    currentlyPracticing:
      "Open chords — C, G, D, Em, Am — and working on clean, smooth transitions between them.",
    goals: [
      "Learn all basic open chords fluently",
      "Play a complete song from start to finish without stopping",
      "Introduce fingerpicking patterns",
      "Learn my first barre chord (F major)",
    ],
    milestones: [
      { date: "Sep 2026", text: "Bought my first guitar 🎸 — a classical nylon string" },
      { date: "Sep 2026", text: "Learned the C major and G major chords" },
    ],
  },
  other: [
    {
      icon: "📊",
      name: "Data Science & Kaggle",
      description:
        "Beyond formal study — exploring datasets on Kaggle, following ML papers, and building intuition through experimentation. Learning how theory meets messy real-world data.",
    },
    {
      icon: "📚",
      name: "Reading",
      description:
        "Technical books on statistics and AI, but also occasional non-fiction on science, history, and systems thinking. Currently enjoying mixing technical and conceptual reading.",
    },
  ],
};
