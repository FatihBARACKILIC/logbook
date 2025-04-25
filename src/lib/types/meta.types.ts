type RobotsIndex = "index" | "noindex";
type RobotsFollow = "follow" | "nofollow";
type Robots = `${RobotsIndex}, ${RobotsFollow}` | `${RobotsIndex}` | `${RobotsFollow}`;

type OgType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "video.movie"
  | "video.tv_show"
  | "video.other"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "place"
  | "product"
  | "event"
  | "business.business";

export type Meta = {
  title?: string;
  description?: string;
  robots?: Robots;
  canonical?: string;
  url?: string;
  image?: string; // 1200x630
  ogType?: OgType; // default: website
};
