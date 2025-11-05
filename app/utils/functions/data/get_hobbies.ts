import {ApiCollection} from '@/app/types/api';
import {OrderedHobbies} from '@/app/types/app';
import {HobbyFull} from '@appVine/hobby_schemas';

/**
 * Fetch hobbies data from the API
 */
export const getHobbies = async (): Promise<OrderedHobbies> => {
  // instanciate empty ordered hobbies
  const orderedHobbies: OrderedHobbies = {
    book: [],
    manga: [],
    webtoon: [],
    game: [],
    music: [],
  };

  // fetch data from the api
  const response = await fetch(`${process.env.API_URL}/api/hobbies?fullContent=true`);

  // if the request failed, return empty hobbies
  if (!response.ok) {
    console.error('❌ API error:', response.status, response.statusText);
    return orderedHobbies;
  }

  // read data
  const data: ApiCollection<HobbyFull> = await response.json();

  // order hobbies by category
  data.items.forEach((hobby: HobbyFull) => {
    switch (hobby.category.name.toLowerCase()) {
      case 'roman':
        orderedHobbies.book.push(hobby);
        break;

      case 'manga':
        orderedHobbies.manga.push(hobby);
        break;

      case 'webtoon':
        orderedHobbies.webtoon.push(hobby);
        break;

      case 'jeu':
        orderedHobbies.game.push(hobby);
        break;

      case 'musique':
        orderedHobbies.music.push(hobby);
        break;

      default:
        break;
    }
  });

  // return ordered hobbies
  return orderedHobbies;
};
