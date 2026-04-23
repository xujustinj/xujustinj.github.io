import { Item } from "@models/Item";
import { Tags } from "./Tags";
import { FontAwesome } from "./FontAwesome";
import { Icons } from "./Icons";

export const Items: ReadonlyArray<Item> = [
  {
    title: "Defensive Python",
    description:
      "A running series of articles on programming habits for producing Python code that protects itself from mistakes.",
    tags: [Tags.PYTHON, Tags.WRITING],
    icon: Icons.PYTHON,
    links: [
      {
        url: "/blog/series/defensive-python",
        icon: FontAwesome.BLOG,
      },
    ],
    status: "featured",
  },
  {
    title: "AceTeam",
    subtitle: "Senior Software Engineer",
    description:
      "Current job: building workflows for AI agents, state of the art information extraction, and more.",
    tags: [Tags.AI, Tags.PYTHON, Tags.TS, Tags.REACT, Tags.NEXT],
    icon: Icons.ACETEAM,
    links: [
      {
        url: "https://aceteam.ai/",
        icon: FontAwesome.WEBSITE,
      },
      {
        url: "https://www.linkedin.com/company/aceteam-ai/",
        icon: FontAwesome.LINKEDIN,
      },
      {
        url: "https://github.com/aceteam-ai/workflow-engine",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "featured",
  },
  {
    title: "Waabi",
    subtitle: "Research Intern",
    description:
      "6th co-op internship: self-driving research on simulating safety-critical (adversarial) driving scenarios. We published something!",
    tags: [Tags.AI, Tags.PYTHON],
    icon: Icons.WAABI,
    links: [
      {
        url: "https://www.linkedin.com/company/waabi/",
        icon: FontAwesome.LINKEDIN,
      },
      {
        url: "https://waabi.ai/mixsim/",
        icon: FontAwesome.PAPER,
      },
    ],
    status: "ended",
  },
  {
    title: "Personal Website",
    description:
      "You're on it right now! I'm allergic to templates, so this took quite a while. Working on adding a blog and other extras.",
    tags: [Tags.NEXT, Tags.CSS],
    icon: Icons.WEBSITE,
    links: [
      {
        url: "https://github.com/xujustinj/xujustinj.github.io",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "hidden",
  },
  {
    title: "Amazon",
    subtitle: "SDE Intern",
    description:
      "5th co-op internship: over-engineered a debugging tool and ended up with a new programming language plus a distributed tracing framework.",
    tags: [Tags.AWS, Tags.JAVA, Tags.TS, Tags.REACT],
    icon: Icons.AMAZON,
    links: [
      {
        url: "https://www.linkedin.com/company/amazon/",
        icon: FontAwesome.LINKEDIN,
      },
    ],
    status: "ended",
  },
  {
    title: "Raytracer",
    subtitle: "UWaterloo CS488 (Graphics)",
    description:
      "Renders arbitrary scenes complete with bump mapping, depth-of-field, and anti-aliasing. Used to make a cool animation.",
    tags: [Tags.GRAPHICS, Tags.CPP, Tags.LUA],
    icon: Icons.RAYTRACER,
    links: [
      {
        url: "https://youtu.be/7qCtGmXyJa8",
        icon: FontAwesome.YOUTUBE,
      },
    ],
    status: "ended",
  },
  {
    title: "E2E TS Template",
    description:
      "A template full-stack web app following a variation of the Clean Architecture. Fully strongly typed with TypeScript.",
    tags: [
      Tags.TS,
      Tags.ARCHITECTURE,
      Tags.RPC,
      Tags.NEXT,
      Tags.EXPRESS,
      Tags.DOCKER,
    ],
    icon: Icons.E2E_TS_TEMPLATE,
    links: [
      {
        url: "https://github.com/xujustinj/e2e-ts-template",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "hidden",
  },
  {
    title: "Imagine Scrum",
    subtitle: "UWaterloo CS449 (HCI)",
    description:
      "Design project in an HCI course I took with the UGO II team. Can we improve team cohesion by rethinking scrum?",
    tags: [Tags.HCI, Tags.AGILE, Tags.FIGMA],
    icon: Icons.IMAGINE_SCRUM,
    links: [
      {
        url: "https://medium.com/cs449-649-f21-uwaterloo/ugo-ii-our-product-is-imagine-scrum-2c512a989393",
        icon: FontAwesome.MEDIUM,
      },
    ],
    status: "ended",
  },
  {
    title: "Alloy",
    subtitle: "Software Developer Intern",
    description:
      "4th co-op internship: helped roll out a huge improvement in the way we handle customers' product data.",
    tags: [Tags.JAVA, Tags.PSQL, Tags.REACT, Tags.TS, Tags.GOOGLE_SHEETS],
    icon: Icons.ALLOY,
    links: [
      {
        url: "https://www.linkedin.com/company/alloy-inc/",
        icon: FontAwesome.LINKEDIN,
      },
      {
        url: "https://alloy.ai/",
        icon: FontAwesome.WEBSITE,
      },
    ],
    status: "ended",
  },
  {
    title: "Co-op MMR",
    subtitle: "UWaterloo CS348 (Databases)",
    description:
      "A database-driven full-stack web app built around an MMR system for co-op employers at UWaterloo.",
    tags: [Tags.PYTHON, Tags.FLASK, Tags.DOCKER, Tags.REACT, Tags.MYSQL],
    icon: Icons.COOP_MMR,
    links: [
      {
        url: "https://github.com/SimonZhang0606/Coop_MMR",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "ended",
  },
  {
    title: "Businext",
    subtitle: "FairVentures Lab",
    description:
      "An open-source FVLab project that uses pictures and AI to learn about businesses.",
    tags: [
      Tags.AI,
      Tags.GOOGLE_CLOUD_VISION,
      Tags.WORD2VEC,
      Tags.REACT,
      Tags.GQL,
    ],
    icon: Icons.BUSINEXT,
    links: [
      {
        url: "https://github.com/businext",
        icon: FontAwesome.GITHUB,
      },
      {
        url: "https://youtu.be/lj-PPQe61I8",
        icon: FontAwesome.YOUTUBE,
      },
    ],
    status: "ended",
  },
  {
    title: "FairVentures Lab",
    subtitle: "Solutions Developer",
    description:
      "3rd co-op internship: built and demoed configurable AI assistants for underwriters at Fairfax.",
    tags: [Tags.AI, Tags.PYTHON, Tags.AIRFLOW, Tags.DOCKER, Tags.REACT],
    icon: Icons.FAIRVENTURES,
    links: [
      {
        url: "https://www.linkedin.com/company/fairventures/",
        icon: FontAwesome.LINKEDIN,
      },
      {
        url: "https://www.fairventures.ca/",
        icon: FontAwesome.WEBSITE,
      },
    ],
    status: "ended",
  },
  {
    title: "Waterpark",
    subtitle: "Loo Labs",
    description:
      "A UWaterloo student wiki. Some of my finest full-stack engineering work, cut short by the collapse of Loo Labs itself.",
    tags: [Tags.TS, Tags.EXPRESS, Tags.NEXT, Tags.CSS, Tags.DOCKER],
    icon: Icons.WATERPARK,
    links: [
      {
        url: "https://github.com/loolabs/waterpark",
        icon: FontAwesome.GITHUB,
      },
      {
        url: "https://waterpark-loo-labs.vercel.app/",
        icon: FontAwesome.WEBSITE,
      },
    ],
    status: "ended",
  },
  {
    title: "Loo Labs",
    subtitle: "Backend Team Lead",
    description:
      "Led the backend team within a short-lived student developer organization. Kicked bugs, took ownership. Learned how to (and not to) design and lead.",
    tags: [Tags.LEADERSHIP, Tags.HCI, Tags.ENGINEERING],
    icon: Icons.LOO_LABS,
    links: [
      {
        url: "https://website-loo-labs.vercel.app/",
        icon: FontAwesome.WEBSITE,
      },
    ],
    status: "ended",
  },
  {
    title: "Wish",
    subtitle: "Full Stack SWE Intern",
    description:
      "2nd co-op internship: helped the ProductBoost team encourage merchants to advertise on our platform.",
    tags: [Tags.PYTHON, Tags.REACT, Tags.MONGO, Tags.GQL, Tags.AB],
    icon: Icons.WISH,
    links: [
      {
        url: "https://merchantfaq.wish.com/hc/en-us/sections/360001746773-ProductBoost",
        icon: FontAwesome.WEBSITE,
      },
      {
        url: "https://www.linkedin.com/company/wishshopping/",
        icon: FontAwesome.LINKEDIN,
      },
    ],
    status: "ended",
  },
  {
    title: "Stairway Constants",
    subtitle: "UWaterloo mathNEWS",
    description:
      "A massive guide to every constant featured on a decorative number line in a UWaterloo campus stairwell.",
    tags: [Tags.WRITING, Tags.MATH],
    icon: Icons.STAIRWAY_CONSTANTS,
    links: [
      {
        url: "/blog/series/stairway-constants",
        icon: FontAwesome.BLOG,
      },
    ],
    status: "featured",
  },
  {
    title: "SRG",
    subtitle: "Swift Record Generator",
    description:
      "Outputs random code to measure the performance of structs, classes, and dictionaries for representing data records in Swift.",
    tags: [Tags.SWIFT, Tags.PERFORMANCE],
    icon: Icons.SWIFT,
    links: [
      {
        url: "https://github.com/xujustinj/swift-record-generator",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "ended",
  },
  {
    title: "Osellus Mobile",
    subtitle: "Mobile Software Developer",
    description:
      "1st co-op internship: added features to the Surge9 microlearning platform, which the company is now named after.",
    tags: [Tags.SWIFT, Tags.IOS, Tags.KOTLIN, Tags.ANDROID],
    icon: Icons.OSELLUS,
    links: [
      {
        url: "https://surge9.com/",
        icon: FontAwesome.WEBSITE,
      },
      {
        url: "https://www.linkedin.com/company/leap9-inc/",
        icon: FontAwesome.LINKEDIN,
      },
    ],
    status: "ended",
  },
  {
    title: "ADETOS",
    subtitle: "Automated Double-Elimination Tournament Organising Spreadsheet",
    description:
      "A macro-powered spreadsheet that plans and runs table tennis tournaments.",
    tags: [Tags.GOOGLE_SHEETS, Tags.JS],
    icon: Icons.ADETOS,
    links: [
      {
        url: "https://docs.google.com/spreadsheets/d/1JsttjsZt6USt7h1Z66PhwibUmafxuH1Mwkzk2tNlDag/edit",
        icon: FontAwesome.SPREADSHEET,
      },
    ],
    status: "ended",
  },
  {
    title: "Ulam Spiral",
    subtitle: "IB Extended Essay",
    description:
      "Strange patterns appear when you highlight all the primes on a spiral number line. This was the topic of a paper I wrote in high school.",
    tags: [Tags.MATH, Tags.WRITING, Tags.JAVA],
    icon: Icons.ULAM_SPIRAL,
    links: [
      {
        url: "https://xujustinj.github.io/Extended-Essay/03-01-19%20Version%20(Revision).pdf",
        icon: FontAwesome.PAPER,
      },
      {
        url: "https://github.com/xujustinj/Extended-Essay",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "ended",
  },
  {
    title: "Hexagonal 2048",
    description:
      "My introductory project to JavaScript, inspired by my love for the original (square) 2048. Swipe or use QWEASD to control the board.",
    tags: [Tags.JS, Tags.P5],
    icon: Icons.HEXAGONAL_2048,
    links: [
      {
        url: "/hexagonal-2048",
        icon: FontAwesome.GAME,
      },
      {
        url: "https://github.com/xujustinj/hexagonal-2048",
        icon: FontAwesome.GITHUB,
      },
    ],
    status: "featured",
  },
];
