import {ProjectDisplayColor} from '@/app/types/app';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  link: string;
  type: 'github' | 'web';
  displayColor: ProjectDisplayColor;
};

export default function ProjectLink({link, type, displayColor}: Props) {
  return (
    <Link
      href={link}
      className={`transition-color flex size-12 flex-col items-center justify-center rounded-xl duration-500 ease-in-out lg:size-14 ${displayColor === 'red' ? 'bg-pred hover:bg-pblue' : 'bg-pblue hover:bg-pred'}`}
    >
      <Image src={`/images/icons/${type}.png`} alt={type} width={300} height={300} className='size-10 object-cover' />
    </Link>
  );
}
