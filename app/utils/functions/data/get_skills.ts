import {ApiCollection} from '@/app/types/api';
import {OrderedSkills} from '@/app/types/app';
import {TechnologyFull} from '@appVine/technology_schemas';

/**
 * Fetch skills data from the API
 */
export const getSkills = async (): Promise<OrderedSkills> => {
  // instanciate empty ordered skills
  const orderedSkills: OrderedSkills = {
    frontend: [],
    backend: [],
    tools: [],
  };

  //fetch data from the api
  const response = await fetch('/api/technologies?fullContent=true');

  // if the request failed, return empty skills
  if (!response.ok) {
    console.error('❌ API error:', response.status, response.statusText);
    return orderedSkills;
  }

  // read data
  const data: ApiCollection<TechnologyFull> = await response.json();

  // order skills by category
  data.items.forEach((tech: TechnologyFull) => {
    if (tech.category.name.toLowerCase().includes('frontend')) {
      orderedSkills.frontend.push(tech);
    }
    if (tech.category.name.toLowerCase().includes('backend')) {
      orderedSkills.backend.push(tech);
    }
    if (tech.category.name.toLowerCase().includes('outil')) {
      orderedSkills.tools.push(tech);
    }
  });

  // return ordered skills
  return orderedSkills;
};
