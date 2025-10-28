'use client';

import HobbyDisplay from '@/app/components/home/HobbyDisplay';
import BookIcon from '@/app/components/icons/BookIcon';
import GamepadIcon from '@/app/components/icons/GamepadIcon';
import HeadphonesIcon from '@/app/components/icons/HeadphonesIcon';
import {HobbyFull} from '@appVine/hobby_schemas';
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
    <div className='font-outfit text-creme flex flex-col items-center space-y-10'>
      {failedFetch && <h2 className='font-outfit font-bold text-red-700'>Échec du chargement des données</h2>}
      <div id='hobbies-container' className='flex flex-col items-center space-y-6'>
        <section
          id='hobby-reads'
          className='bg-dark/50 w-[80vw] space-y-4 rounded-xl p-4 shadow-[0_0_10px_0px] shadow-white/25'
        >
          <div className='flex flex-row items-center space-x-4'>
            <BookIcon className='size-10 text-white' />
            <h2 className='text-3xl font-bold text-white'>Lectures</h2>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Romans</h3>
            <div className='flex flex-row flex-wrap items-center gap-4'>
              {data?.book.map((hobby: HobbyFull) => (
                <HobbyDisplay key={hobby.id} hobby={hobby} />
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Mangas</h3>
            <div className='flex flex-row flex-wrap items-center gap-4'>
              {data?.manga.map((hobby: HobbyFull) => (
                <HobbyDisplay key={hobby.id} hobby={hobby} />
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Webtoons</h3>
            <div className='flex flex-row flex-wrap items-center gap-4'>
              {data?.webtoon.map((hobby: HobbyFull) => (
                <HobbyDisplay key={hobby.id} hobby={hobby} />
              ))}
            </div>
          </div>
        </section>
        <div className='flex flex-col items-center space-y-6'>
          <section
            id='hobby-games'
            className='bg-dark/50 w-[80vw] space-y-4 rounded-xl p-4 shadow-[0_0_10px_0px] shadow-white/25'
          >
            <div className='flex flex-row items-center space-x-4'>
              <GamepadIcon className='size-10 text-white' />
              <h2 className='text-3xl font-bold text-white'>Jeux</h2>
            </div>
            <div className='flex flex-row flex-wrap items-center gap-4'>
              {data?.game.map((hobby: HobbyFull) => (
                <HobbyDisplay key={hobby.id} hobby={hobby} />
              ))}
            </div>
          </section>
          <section
            id='hobby-music'
            className='bg-dark/50 w-[80vw] space-y-4 rounded-xl p-4 shadow-[0_0_10px_0px] shadow-white/25'
          >
            <div className='flex flex-row items-center space-x-4'>
              <HeadphonesIcon className='size-10 text-white' />
              <h2 className='text-3xl font-bold text-white'>Musiques</h2>
            </div>
            <div className='flex flex-row flex-wrap items-center gap-4'>
              {data?.music.map((hobby: HobbyFull) => (
                <HobbyDisplay key={hobby.id} hobby={hobby} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
