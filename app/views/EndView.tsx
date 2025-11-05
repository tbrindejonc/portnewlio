import Button from '@/app/components/Button';
import Image from 'next/image';

/**
 * Home page end view
 */
export default function EndView() {
  return (
    <section
      id='home-end'
      className='flex h-fit min-h-screen w-full flex-col items-center justify-center space-y-12 py-6'
    >
      <h2 className='text-center text-3xl xl:text-5xl'>Pour en savoir plus</h2>
      <div className='flex flex-col space-y-8 xl:flex-row xl:space-y-0 xl:space-x-12'>
        <div className='flex w-[80vw] flex-col items-center space-y-6 rounded-xl bg-black/50 p-6 shadow-[0_0_10px_0px] shadow-white/25 xl:w-[30vw]'>
          <Image
            src='/images/end/projects.png'
            alt='Illustration de projet'
            width={500}
            height={500}
            className='h-auto w-[70vw] rounded-md'
          />
          <Button text='Voir mes projets' link='/projects' />
        </div>
        <div className='flex w-[80vw] flex-col items-center space-y-6 rounded-xl bg-black/50 p-6 shadow-[0_0_10px_0px] shadow-white/25 xl:w-[30vw]'>
          <Image
            src='/images/end/experiences.png'
            alt='Illustration d’expérience'
            width={500}
            height={500}
            className='h-auto w-[70vw] rounded-md'
          />
          <Button text='Voir mes expériences' link='/experiences' />
        </div>
        <div className='flex w-[80vw] flex-col items-center space-y-6 rounded-xl bg-black/50 p-6 shadow-[0_0_10px_0px] shadow-white/25 xl:w-[30vw]'>
          <Image
            src='/images/end/contact.png'
            alt='Illustration de contact'
            width={500}
            height={500}
            className='h-auto w-[70vw] rounded-md'
          />
          <Button text='Me contacter' link='/contact' />
        </div>
      </div>
    </section>
  );
}
