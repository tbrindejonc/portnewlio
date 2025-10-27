import {TechnologyFull} from '@appVine/technology_schemas';
import Image from 'next/image';

type Props = {
  technology: TechnologyFull;
};

/**
 * Display a technology with its logo
 *
 * @param technology {TechnologyFull} - The technology to display
 */
export default function Technology({technology}: Props) {
  return (
    <div className='font-outfit flex flex-row items-center space-x-4'>
      <Image
        src={`/images/logos/${technology.logo_name}`}
        alt={technology.name}
        width={500}
        height={500}
        className='h-auto w-10'
      />
      <h3 className='text-xl'>{technology.name}</h3>
    </div>
  );
}
