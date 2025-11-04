import Button from '@/app/components/Button';
import {ExternalSectionItem} from '@/app/types/app';
import Image from 'next/image';

type Props = {
  section: ExternalSectionItem;
};

/**
 * Display a section with an external link
 *
 * @param link {string} - External link
 * @param text {string} - Section title
 */
export default function ExternalSection({section}: Props) {
  return (
    <div className='relative flex h-[20vh] w-full flex-col items-center justify-center rounded-xl bg-black/50 p-4 shadow-[0_0_4px_0] shadow-white/50'>
      <Image
        src={section.imageSrc}
        alt={'section icon'}
        width={300}
        height={300}
        className='absolute left-5 size-24 object-cover blur-sm'
      />
      <div className='z-10 flex flex-col items-center space-y-6'>
        <h2 className='font-outfit text-xl font-bold'>{section.text}</h2>
        <Button text='Voir' link={section.link} />
      </div>
      <Image
        src={section.imageSrc}
        alt={'section icon'}
        width={300}
        height={300}
        className='absolute right-5 size-24 object-cover blur-sm'
      />
    </div>
  );
}
