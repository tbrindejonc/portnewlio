import Link from 'next/link';

type Props = {
  text: string;
  link: string;
  purpose?: 'home' | 'contact';
};

/**
 * App button with a link
 *
 * @param text {string} - Button text
 * @param link {string} - Button link
 */
export default function Button({text, link, purpose}: Props) {
  return (
    <button
      className={`bg-pblue font-outfit hover:bg-pred min-w-[60vw] rounded-full p-2 text-xl text-white transition-colors duration-500 ease-in-out hover:cursor-pointer ${purpose === 'contact' ? 'lg:min-w-[10vw]' : 'xl:min-w-[20vw]'}`}
    >
      <Link href={link}>{text}</Link>
    </button>
  );
}
