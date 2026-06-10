export type Concept = {
  name: string;
};

export type Chapter = {
  name: string;
  concepts: Concept[];
};

export type Topic = {
  name: string;
  chapters: Chapter[];
};

export type Subject = {
  name: string;
  topics: Topic[];
};