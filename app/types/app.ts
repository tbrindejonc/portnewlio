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
