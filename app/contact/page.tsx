import {ExternalSectionItem} from '@/app/types/app';
import ExternalSection from './components/ExternalSection';

/**
 * Contact page
 */
export default function Contact() {
  const sections: ExternalSectionItem[] = [
    {
      link: 'https://github.com/Timeuh',
      text: 'Pour découvrir mes travaux',
      imageSrc: '/images/icons/github.png',
    },
    {
      link: 'https://linkedin.com/in/timothee-brindejonc',
      text: 'Pour voir mon profil',
      imageSrc: '/images/icons/linkedin.png',
    },
    {
      link: 'mailto:tbrindejonc@gmail.com',
      text: 'Pour me contacter directement',
      imageSrc: '/images/icons/email.png',
    },
  ];

  return (
    <main className='bg-dark font-bungee flex h-screen w-full flex-col items-center justify-center space-y-8 p-4 text-white'>
      {sections.map((section: ExternalSectionItem) => (
        <ExternalSection key={section.link} section={section} />
      ))}
    </main>
  );
}
