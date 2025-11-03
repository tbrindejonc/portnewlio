import Technology from '@/app/components/Technology';
import {ExperienceFull, ExperienceTechnology} from '@appVine/experience_schemas';
import Image from 'next/image';

type Props = {
  experience: ExperienceFull;
};

export default function Experience({experience}: Props) {
  return (
    <div className='border-obscure bg-obscure/50 group relative flex w-full flex-col justify-center space-y-4 overflow-hidden rounded-xl border-4 p-4 shadow-[0_0_4px_0] shadow-white/50'>
      <div className='flex flex-row items-center space-x-4'>
        <Image
          src={`/images/companies/${experience.logo_name}`}
          alt={experience.society_name}
          width={300}
          height={300}
          className='size-[25vw] rounded-md'
        />
        <div className='flex flex-col space-y-2'>
          <h3 className='text-xl'>{experience.title}</h3>
          <span className='font-outfit text-creme text-md text-balance'>
            {experience.society_name} - {experience.work_period}
          </span>
        </div>
      </div>
      <p className='font-outfit text-lg text-balance'>{experience.description}</p>
      <div className='flex flex-row flex-wrap items-center gap-4'>
        {experience.Experience_Technology.map((tech: ExperienceTechnology) => (
          <Technology key={tech.technology_id} technology={tech.technology} purpose='projects' />
        ))}
      </div>
    </div>
  );
}
