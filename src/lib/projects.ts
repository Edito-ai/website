export interface Project {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  blurb: string;
  stack: string[];
  href: string;
  external?: { label: string; url: string };
  /** Static Tailwind class strings — kept literal so the compiler can see them. */
  accent: {
    text: string;
    ring: string;
    glow: string;
    badge: string;
  };
}

export const projects: Project[] = [
  {
    slug: "adarpan-cut",
    name: "Adarpan Cut",
    kind: "AI-powered desktop video editor",
    tagline: "Find anyone. Cut everything.",
    blurb:
      "A native desktop video editor with a real multi-track timeline and AI built in — upload one photo and find every appearance of that person across hours of footage, exported as ranked crops with metadata. All AI runs locally; footage never leaves the machine.",
    stack: [
      "Electron",
      "React 18",
      "TypeScript",
      "Zustand",
      "Tailwind CSS",
      "Web Audio API",
      "Python",
      "ONNX Runtime",
      "YOLOv8",
    ],
    href: "/",
    accent: {
      text: "text-violet-400",
      ring: "hover:border-violet-500/40",
      glow: "bg-violet-500/20",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    },
  },
  {
    slug: "accessway",
    name: "AccessWay",
    kind: "Accessibility app",
    tagline: "Accessibility in Motion. Everywhere You Go.",
    blurb:
      "AI-powered navigation and smart assistance for people with disabilities — accessible routing that works indoors and outdoors, real-time obstacle detection, and community-driven accessibility data.",
    stack: ["AI Navigation", "Microsoft Azure", "React", "Computer Vision", "Community Data"],
    href: "/accessway",
    external: { label: "accessway.xyz", url: "https://www.accessway.xyz/" },
    accent: {
      text: "text-teal-400",
      ring: "hover:border-teal-500/40",
      glow: "bg-teal-500/20",
      badge: "bg-teal-500/10 text-teal-300 border-teal-500/20",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
