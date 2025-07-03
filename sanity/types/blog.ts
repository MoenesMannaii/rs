// /types/blog.ts

export interface SanityImage {
  asset: { url: string };
}

export interface VideoFile {
  asset: { _ref: string };
}

export interface Section {
  title: string;
  description: string;
  images: SanityImage[];
}

export interface Comment {
  name: string;
  comment: string;
  date: string;
}

export interface Blog {
  title: string;
  slug: { current: string };
  teaser: string;
  image: SanityImage;
  video?: VideoFile | null;
  location: string;
  activities: string[];
  contentSections: Section[];
  ecotourism_title: string;
  ecotourism: string;
  whatToDo_title: string;
  whatToDo: string;
  whatToDo_gallery: SanityImage[];
  whyvisit_title: string;
  whyvisit: string;
  whyvisit_gallery: SanityImage[];
  gallery?: SanityImage[];
  sources: string;
  comments: Comment[];
}
