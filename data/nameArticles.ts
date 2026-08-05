import name1 from "./nameArticles/name-1.json";
import name2 from "./nameArticles/name-2.json";
import name3 from "./nameArticles/name-3.json";
import name4 from "./nameArticles/name-4.json";
import name5 from "./nameArticles/name-5.json";
import name6 from "./nameArticles/name-6.json";
import name7 from "./nameArticles/name-7.json";
import name8 from "./nameArticles/name-8.json";
import name9 from "./nameArticles/name-9.json";
import name10 from "./nameArticles/name-10.json";
import name11 from "./nameArticles/name-11.json";
import name12 from "./nameArticles/name-12.json";
import name13 from "./nameArticles/name-13.json";
import name14 from "./nameArticles/name-14.json";
import name15 from "./nameArticles/name-15.json";
import name16 from "./nameArticles/name-16.json";
import name17 from "./nameArticles/name-17.json";
import name18 from "./nameArticles/name-18.json";
import name19 from "./nameArticles/name-19.json";
import name20 from "./nameArticles/name-20.json";
import name21 from "./nameArticles/name-21.json";

export type NameArticleParagraph = {
  id: number;
  title: string;
  content: string[];
};

export type NameArticle = {
  name: string;
  paragraphs: NameArticleParagraph[];
};

export const nameArticlesBySlug: Partial<Record<string, NameArticle>> = {
  "name-1": name1,
  "name-2": name2,
  "name-3": name3,
  "name-4": name4,
  "name-5": name5,
  "name-6": name6,
  "name-7": name7,
  "name-8": name8,
  "name-9": name9,
  "name-10": name10,
  "name-11": name11,
  "name-12": name12,
  "name-13": name13,
  "name-14": name14,
  "name-15": name15,
  "name-16": name16,
  "name-17": name17,
  "name-18": name18,
  "name-19": name19,
  "name-20": name20,
  "name-21": name21,
};
