import {TechnologyFull, Technology as AppTechnology} from '@appVine/technology_schemas';
import Image from 'next/image';

type Props = {
  technology: TechnologyFull | AppTechnology;
  purpose: 'skills' | 'projects';
};

/**
 * Display a technology with its logo
 *
 * @param technology {TechnologyFull} - The technology to display
 */
export default function Technology({technology, purpose}: Props) {
  return (
    <div
      className={`font-outfit flex flex-row items-center ${purpose === 'projects' ? 'bg-obscure rounded-md p-2' : ''}`}
    >
      <Image
        src={`/images/logos/${technology.logo_name}`}
        alt={technology.name}
        width={500}
        height={500}
        className={`h-auto ${purpose === 'projects' ? 'w-6' : 'w-10'}`}
      />
      <h3 className={`ps-2 ${purpose === 'projects' ? 'text-lg' : 'text-xl'}`}>{technology.name}</h3>
    </div>
  );
}
