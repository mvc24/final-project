import './globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage:
          'url(https://res.cloudinary.com/dnzitfasn/image/upload/f_auto,q_auto/v1/sage/cover-eggplant)',
      }}
    >
      <div className="hero-overlay bg-opacity-30" />
      <div className="hero-content text-center text-neutral-100 drop-shadow-lg">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl lowercase font-bold">
            Join Me in the Kitchen
          </h1>
          <p className="mb-5 text-lg lowercase">
            Let's bring a bit of magic into your kitchen with inventive
            ingredient mixes to inspire your cooking routine
          </p>
          <Link
            href="/ingredients"
            className="btn px-6 h-14 lowercase text-xl transform-none rounded-full border-0 bg-decoration-700 text-decoration-50 hover:bg-decoration-50 hover:text-decoration-800 hover:border-0"
          >
            get inspired
          </Link>
        </div>
      </div>
    </div>
  );
}
