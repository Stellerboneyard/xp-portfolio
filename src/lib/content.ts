// Single source of truth for the honest, current facts shown across every
// app window -- keep this the one place that changes when a bio/skill/
// project fact changes, rather than duplicating strings per-component.

export const profile = {
  name: "Aryan Raj",
  role: "2nd-year CS student",
  location: "Jaipur, Rajasthan, India",
  college: "Arya College of Engineering & I.T., Kukas-Jaipur",
  degree: "B.Tech, Computer Science & Engineering",
  graduating: "2029",
  email: "aryanqbz@gmail.com",
  github: "https://github.com/Stellerboneyard",
  linkedin: "https://www.linkedin.com/in/aryan-raj-314a55380",
};

export type SocialLink = { label: string; href: string };

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const bio = [
  "I'm a second-year CS student learning by actually shipping things, not just \
watching tutorials.",
  "Current focus is going deep on fewer things rather than spreading thin: \
Data Structures & Algorithms in C++, and Python for AI/ML foundations, in \
that order of priority.",
  "Everything linked from this desktop is real, working, and deployed. \
Nothing here is dressed up to look more finished than it is -- an open \
project slot stays marked open.",
];

export const skills = [
  { name: "C++ / DSA", level: "Daily practice" },
  { name: "Python", level: "AI/ML foundations, in progress" },
  { name: "TypeScript / JavaScript", level: "Working proficiency" },
  { name: "React / Next.js", level: "Working proficiency" },
  { name: "HTML / CSS", level: "Working proficiency" },
  { name: "Git / GitHub", level: "Working proficiency" },
];

export type Project = {
  title: string;
  tag: "Live" | "Open slot";
  body: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "ide-portfolio",
    tag: "Live",
    body: "A portfolio built to look and work like VS Code -- a real Monaco editor and a real xterm.js terminal.",
    href: "https://stellerboneyard.github.io/ide-portfolio/",
  },
  {
    title: "portfolio",
    tag: "Live",
    body: "A scroll-driven site: a morning-to-night frame sequence scrubbed by scroll position.",
    href: "https://stellerboneyard.github.io/portfolio/",
  },
  {
    title: "Next build",
    tag: "Open slot",
    body: "Reserved for whatever ships next -- left honestly empty rather than dressed up.",
    href: "https://github.com/Stellerboneyard",
  },
];

export const openTo = ["internships", "collaborations", "just talking shop about DSA or AI/ML"];
