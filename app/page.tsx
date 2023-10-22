import './globals.css';
import { Cloudinary } from '@cloudinary/url-gen';

export default function Home() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dnzitfasn' } });
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dnzitfasn/image/upload/v1697885185/cover-eggplant.jpg)',
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-100 drop-shadow-lg">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn px-6 rounded-full border-0 bg-decoration-700 text-decoration-50 hover:bg-decoration-50 hover:text-decoration-800 hover:border-0 transform-none lowercase text-lg">
              get inspired
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
