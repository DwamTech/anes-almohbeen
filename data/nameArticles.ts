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
};
