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
    <div className='font-outfit text-creme flex flex-col items-center space-y-10 xl:h-[75vh]'>
      {failedFetch && (
        <h2 className='font-outfit font-bold text-red-700 xl:text-2xl'>Échec du chargement des données</h2>
      )}
      <div
        id='hobbies-container'
        className='flex flex-col items-center space-y-10 xl:h-full xl:flex-row xl:items-start xl:space-x-12'
      >
        <section
          id='hobby-reads'
          className='flex w-[80vw] flex-col space-y-4 rounded-xl bg-black/50 p-4 shadow-[0_0_10px_0px] shadow-white/25 xl:h-full xl:w-[35vw] xl:p-8'
        >
          <div className='flex flex-row items-center space-x-4'>
            <BookIcon className='size-10 text-white' />
            <h2 className='text-3xl font-bold text-white'>Lectures</h2>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Romans</h3>
            <div className='flex flex-row flex-wrap items-center gap-4 xl:gap-6'>
              {data?.book.map((hobby: HobbyFull) => {
                return <HobbyDisplay key={hobby.id} hobby={hobby} />;
              })}
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Mangas</h3>
            <div className='flex flex-row flex-wrap items-center gap-4 xl:gap-6'>
              {data?.manga.map((hobby: HobbyFull) => {
                return <HobbyDisplay key={hobby.id} hobby={hobby} />;
              })}
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Webtoons</h3>
            <div className='flex flex-row flex-wrap items-center gap-4 xl:gap-6'>
              {data?.webtoon.map((hobby: HobbyFull) => {
                return <HobbyDisplay key={hobby.id} hobby={hobby} />;
              })}
            </div>
          </div>
        </section>
        <div className='flex flex-col items-center space-y-10 xl:h-full xl:justify-between'>
          <section
            id='hobby-games'
            className='flex w-[80vw] flex-col space-y-4 rounded-xl bg-black/50 p-4 shadow-[0_0_10px_0px] shadow-white/25 xl:w-[40vw] xl:p-8'
          >
            <div className='flex flex-row items-center space-x-4'>
              <GamepadIcon className='size-10 text-white' />
              <h2 className='text-3xl font-bold text-white'>Jeux</h2>
            </div>
            <div className='flex flex-row flex-wrap items-center gap-4 xl:gap-6'>
              {data?.game.map((hobby: HobbyFull) => {
                return <HobbyDisplay key={hobby.id} hobby={hobby} />;
              })}
            </div>
          </section>
          <section
            id='hobby-music'
            className='flex w-[80vw] flex-col space-y-4 rounded-xl bg-black/50 p-4 shadow-[0_0_10px_0px] shadow-white/25 xl:w-[40vw] xl:p-8'
          >
            <div className='flex w-fit flex-row items-center space-x-4'>
              <HeadphonesIcon className='size-10 text-white' />
              <h2 className='text-3xl font-bold text-white'>Musiques</h2>
            </div>
            <div className='flex flex-row flex-wrap items-center gap-4 xl:gap-6'>
              {data?.music.map((hobby: HobbyFull) => {
                return <HobbyDisplay key={hobby.id} hobby={hobby} />;
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
