import {HobbyFull} from '@appVine/hobby_schemas';
import {TechnologyFull} from '@appVine/technology_schemas';

// link in the navigation bar
export type NavLink = {
  href: string;
  label: string;
  bgColor: string;
};

// ordered skills for display
export type OrderedSkills = {
  frontend: TechnologyFull[];
  backend: TechnologyFull[];
  tools: TechnologyFull[];
};

// ordered hobbies for display
export type OrderedHobbies = {
  book: HobbyFull[];
  manga: HobbyFull[];
  webtoon: HobbyFull[];
  game: HobbyFull[];
  music: HobbyFull[];
};

// hobby great categories for display purposes
export type HobbyType = 'book' | 'game' | 'music';

// project display color options
export type ProjectDisplayColor = 'red' | 'blue';

// project display colors list
export type ProjectDisplayColorsList = {
  red: {
    primary: string;
    secondary: string;
    text: string;
  };
  blue: {
    primary: string;
    secondary: string;
    text: string;
  };
};

// external section item
export type ExternalSectionItem = {
  link: string;
  text: string;
  imageSrc: string;
};
