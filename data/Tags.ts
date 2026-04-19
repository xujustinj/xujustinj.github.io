import { Tag } from "@models/Tag";
import { Colour, Hue } from "@styles/Colours";

const TagCategory = (
  names: Record<string, string>,
  h: Hue
): Record<string, Tag> => {
  const colour = Colour({ h, s: "vibrant" });
  return Object.fromEntries(
    Object.entries<string>(names).map(([id, name]) => [
      id,
      { name, colour } as Tag,
    ])
  );
};

enum Languages {
  CPP = "C++",
  CSS = "CSS",
  HTML = "HTML",
  JAVA = "Java",
  JS = "JavaScript",
  KOTLIN = "Kotlin",
  LUA = "Lua",
  MYSQL = "MySQL",
  PSQL = "PostgreSQL",
  PYTHON = "Python",
  SQL = "SQL",
  SWIFT = "Swift",
  TEX = "TeX",
  TS = "TypeScript",
  R = "R",
}

enum Technologies {
  AIRFLOW = "Airflow",
  ANDROID = "Android",
  AWS = "AWS",
  DOCKER = "Docker",
  EXPRESS = "Express",
  FIGMA = "Figma",
  FLASK = "Flask",
  GOOGLE_CLOUD_VISION = "Google Cloud Vision",
  GOOGLE_SHEETS = "Google Sheets",
  GQL = "GraphQL",
  IOS = "iOS",
  MONGO = "MongoDB",
  NEXT = "Next.js",
  P5 = "p5.js",
  REACT = "React",
  RPC = "RPC",
  SVELTE = "Svelte",
  WORD2VEC = "Word2vec",
}

enum Topics {
  AB = "A/B Testing",
  AGILE = "Agile",
  AI = "AI",
  ARCHITECTURE = "Architecture",
  ENGINEERING = "Engineering",
  GRAPHICS = "Graphics",
  HCI = "HCI",
  LEADERSHIP = "Leadership",
  PERFORMANCE = "Performance",
  MATH = "Mathematics",
  WRITING = "Writing",
}

export const Tags = {
  ...TagCategory(Languages, "red"),
  ...TagCategory(Technologies, "orange"),
  ...TagCategory(Topics, "purple"),
} as const;
