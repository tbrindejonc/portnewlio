'use client';

import {getSkills} from '@functions/data/get_skills';
import {useQuery} from '@tanstack/react-query';

/**
 * Display the skills
 */
export default function SkillsSection() {
  const {data} = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  return <div>{JSON.stringify(data)}</div>;
}
