import {HobbyType} from '@/app/types/app';
import {HobbyFull} from '@appVine/hobby_schemas';
import Image from 'next/image';
import {useState} from 'react';

type Props = {
  hobby: HobbyFull;
};

/**
 * Display a hobby logo and name
 *
 * @param hobby {HobbyFull} - The hobby to display
 */
export default function HobbyDisplay({hobby}: Props) {
  // clicked state for mobile view
  const [isClicked, setIsClicked] = useState<boolean>(false);

  /**
   * Get the hobby type based on its category name
   *
   * @param categoryName {string} - The category name of the hobby
   */
  const getHobbyType = (categoryName: string): HobbyType => {
    switch (categoryName.toLowerCase()) {
      case 'roman':
      case 'manga':
      case 'webtoon':
      default:
        return 'book';

      case 'jeu':
        return 'game';

      case 'musique':
        return 'music';
    }
  };

  /**
   * Get the image path for a hobby based on its type and logo name
   *
   * @param type {HobbyType} - The type of the hobby
   * @param logoName {string} - The logo name of the hobby
   */
  const getImagePath = (type: HobbyType, logoName: string): string => {
    switch (type) {
      case 'game':
        return `/images/games/${logoName}`;

      case 'music':
        return `/images/musics/${logoName}`;

      case 'book':
      default:
        return `/images/readings/${logoName}`;
    }
  };

  /**
   * Get the class name for a hobby based on its type
   *
   * @param type {HobbyType} - The type of the hobby
   */
  const getClassName = (type: HobbyType): string => {
    switch (type) {
      case 'book':
        return 'h-auto w-[20vw] rounded-md xl:w-[5vw]';

      case 'game':
        return 'h-auto w-[20vw] rounded-md xl:w-[6vw]';

      case 'music':
      default:
        return 'h-auto w-[20vw] rounded-md xl:w-[6vw]';
    }
  };

  /**
   * Toggle the clicked state of the hobby display for mobile view
   */
  const toggleClicked = () => {
    setIsClicked(!isClicked);
  };

  // determine hobby type, image path and class name
  const hobbyType: HobbyType = getHobbyType(hobby.category.name);
  const imagePath: string = getImagePath(hobbyType, hobby.logo_name);
  const className: string = getClassName(hobbyType);

  return (
    <div className='relative' onClick={toggleClicked}>
      <div
        className={`bg-dark/90 absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center rounded-md p-2 text-center text-white opacity-0 transition-opacity duration-500 ease-in-out hover:cursor-pointer hover:opacity-100 xl:text-lg ${isClicked ? 'opacity-100' : ''}`}
      >
        {hobby.name}
      </div>
      <Image src={imagePath} alt={hobby.name} width={500} height={500} className={className} />
    </div>
  );
}
