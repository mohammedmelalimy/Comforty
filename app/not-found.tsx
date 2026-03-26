import Link from 'next/link';
import './[lang]/globals.css';
export default function NotFound() {
  return (
    <div className=" min-h-screen text-center bg-black flex flex-col gap-3 justify-center items-center text-white">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="bg-rose-500 p-3 rounded-2xl">
        Return Home
      </Link>
    </div>
  );
}
