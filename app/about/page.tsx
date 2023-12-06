export default function About() {
  return (
    <div className="container prose p-6 w-4/6">
      <h1 className="prose font-bold text-center tracking-wide text-decoration-600 text-2xl mx-auto lowercase">
        about this project
      </h1>
      <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
        Purpose and Inspiration
      </h2>
      <div>
        <p className="prose font-light">
          This is my final project for an immersive full stack web development
          bootcamp.
          <br />
          Fuelled by years of selling cookbooks and spices, my love for cooking
          and belief that everyone can create delicious food steered this
          venture. Often, we're stuck in a recipe rut or lack inspiration; this
          platform aims to guide users toward new culinary ideas.
        </p>

        <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
          why sage?
        </h2>
        <div>
          <p className="prose font-light">
            Not only is a sage a wise person, it is incidentally also one of my
            favourite herbs. And as simply as that, there was a name.
          </p>

          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            My Philosophy for Food and Cooking
          </h2>

          <ul>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                Accessible Good Food:{' '}
              </strong>
              Complexity doesn't define good food; quality base ingredients and
              simplicity do.
            </li>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                Cooking for Oneself:{' '}
              </strong>
              Embrace daring kitchen experiments when you're the sole audience.
            </li>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                Intuitive Eating:{' '}
              </strong>
              Listen to your body and cook according to cravings.
            </li>
            <li>
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                Balanced Flavours:{' '}
              </strong>
              A dish sings when flavours are balanced—adjust salt, acidity,
              sweetness until it's just right.
            </li>
            <li>
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                Food Beyond Fuel:{' '}
              </strong>
              Food is so much more than just fuel for your body.
            </li>
          </ul>

          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            Technical Expertise{' '}
          </h2>

          <ul>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                Database Management:{' '}
              </strong>
              With PostgreSQL, I tackled the challenge of structuring data from
              an Excel list to a database, adhering to 3NF principles.
              Transforming data into a usable format was both a challenge and a
              learning experience.
            </li>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                {' '}
                Interactive Functionality and Frameworks:{' '}
              </strong>
              Employing GraphQL and Next.js, I crafted user-interactive features
              and structured the codebase. This wasn't just about using
              frameworks; it was about harnessing their power to build a dynamic
              and responsive platform.
            </li>

            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                {' '}
                Photography and Visual Editing:{' '}
              </strong>
              All the pictures on this platform were captured and edited by me
              using Adobe Lightroom and Adobe Photoshop.
            </li>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                {' '}
                Graphic Design:{' '}
              </strong>
              The logo, a symbol of this platform's essence, was brought to life
              using Procreate and Adobe Illustrator.
            </li>
            <li className="font-light">
              <strong className="font-medium text-decoration-600 text-lg lowercase">
                {' '}
                Styling and Aesthetics:{' '}
              </strong>
              TailwindCSS was my tool of choice for creating an aesthetically
              pleasing interface.
            </li>
          </ul>

          <h2 className="font-bold mx-auto mb-2  text-decoration-600 text-xl lowercase">
            future development
          </h2>

          <p className="font-light">
            More ingredient combinations and further functionalities are on the
            horizon, promising an ever-growing pool of culinary inspiration for
            users.
          </p>
        </div>
      </div>
    </div>
  );
}
