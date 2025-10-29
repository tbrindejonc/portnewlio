'use client';

import ArrowIcon from '@/app/components/icons/ArrowIcon';
import {ProjectDisplayColor} from '@/app/types/app';
import {projectColors} from '@/app/utils/data/project_colors';
import {Image as ProjectImage} from '@appVine/image_schemas';
import Image from 'next/image';
import {useState} from 'react';

type Props = {
  images: ProjectImage[];
  displayColor: ProjectDisplayColor;
};

/**
 * Carousel component to display a serie of images
 *
 * @param images {ProjectImage[]} - project images to display
 * @param displayColor {ProjectDisplayColor} - color theme to use for the carousel
 */
export default function Carousel({images, displayColor}: Props) {
  // state to track the current image
  const [currentImage, setCurrentImage] = useState<number>(0);

  // classes to offset images
  const imageClasses: string[] = ['translate-x-0', '-translate-x-full', '-translate-x-[200%]', '-translate-x-[300%]'];

  /**
   * Switch to previous image
   */
  const handlePrevClick = () => {
    setCurrentImage((prevIndex: number) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  /**
   * Switch to next image
   */
  const handleNextClick = () => {
    setCurrentImage((prevIndex: number) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='border-obscure relative flex w-[95%] flex-row justify-center overflow-hidden rounded-xl border-4 shadow-[0_0_4px_0] shadow-white/50'>
      <div
        className='bg-darklight/80 absolute top-0 left-0 z-10 flex h-full flex-col items-center justify-center px-1'
        onClick={handlePrevClick}
      >
        <ArrowIcon className={`${projectColors[displayColor].text} -rotate-90`} />
      </div>
      <div className={`flex flex-row ${imageClasses[currentImage]} transition-transform duration-500 ease-in-out`}>
        {images.map((image: ProjectImage, index: number) => {
          return (
            <Image
              key={image.id}
              src={`/images/projects/${image.name}`}
              alt={`Project image ${index + 1}`}
              width={500}
              height={500}
              className={`h-auto w-full rounded-lg transition-transform duration-500 ease-in-out`}
            />
          );
        })}
      </div>
      <div
        className='bg-darklight/80 absolute top-0 right-0 z-10 flex h-full flex-col items-center justify-center px-1'
        onClick={handleNextClick}
      >
        <ArrowIcon className={`${projectColors[displayColor].text} rotate-90`} />
      </div>
      <div className='absolute bottom-1 flex flex-row space-x-2'>
        {images.map((_image: ProjectImage, index: number) => {
          // determine if the dot is active
          const isActive: boolean = index === currentImage;

          return (
            <div
              key={index}
              className={`transition-color size-4 rounded-full duration-500 ease-in-out ${isActive ? projectColors[displayColor].primary : projectColors[displayColor].secondary}`}
            />
          );
        })}
      </div>
    </div>
  );
}
