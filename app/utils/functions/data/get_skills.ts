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

  // fetch data from the api
  const response = await fetch(`${process.env.API_URL}/api/technologies?fullContent=true`);

  // if the request failed, return empty skills
  if (!response.ok) {
    console.error('❌ API error:', response.status, response.statusText);
    return orderedSkills;
  }

  // read data
  const data: ApiCollection<TechnologyFull> = await response.json();

  // order skills by category
  data.items.forEach((tech: TechnologyFull) => {
    switch (tech.category.name.toLowerCase()) {
      case 'frontend':
        orderedSkills.frontend.push(tech);
        break;

      case 'backend':
        orderedSkills.backend.push(tech);
        break;

      case 'outil':
        orderedSkills.tools.push(tech);
        break;

      default:
        break;
    }
  });

  // return ordered skills
  return orderedSkills;
};
