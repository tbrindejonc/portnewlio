'use client';

import {getHobbies} from '@functions/data/get_hobbies';
import {useQuery} from '@tanstack/react-query';

/**
 * Display the hobbies
 */
export default function HobbiesSection() {
  // get the hobbies from database
  const {data} = useQuery({
    queryKey: ['hobbies'],
    queryFn: getHobbies,
  });

  // check if the data is available
  const failedFetch =
    !data ||
    (data.book.length === 0 &&
      data.manga.length === 0 &&
      data.webtoon.length === 0 &&
      data.game.length === 0 &&
      data.music.length === 0);

  return (
    <div className='flex flex-col items-center space-y-10'>
      {failedFetch && <h2 className='font-outfit font-bold text-red-700'>Échec du chargement des données</h2>}
    </div>
  );
}
