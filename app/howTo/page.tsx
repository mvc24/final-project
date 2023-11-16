import Link from 'next/link';

export default function HowToPage() {
  return (
    <div>
      <h1>Ingredient Combinations to Inspire Your Cooking</h1>
      <div>
        <p>
          Hey there! When it comes to spicing up my cooking, I've got a secret
          stash of inspiration from the "Vegetarian Flavor Bible" by Karen Page
          and Andrew Dornenburg. It might sound like a book of lists, but trust
          me, it's a goldmine for creative combos.
        </p>
        <h2>My Approach to Cooking</h2>
        <ul>
          <li>
            <strong>Mix and Match Magic:</strong> These aren't full-blown
            recipes; they're more like ingredient trios or quartets that will
            surprise you with amazing flavours and when combined.
          </li>
          <li>
            <strong>Veggie-Centric:</strong> I adore veggies, so most combos are
            plant-based. However, I occasionally sprinkle in some anchovies for
            extra taste, or use canned sardines or mackerels for an extra dose
            of Omega-3.
          </li>
          <li>
            <strong>Low effort, high impact:</strong> I mainly cook for myself
            and don't have a dishwasher, so I love to make impactful, tasty
            dishes that don't need need a lot of effort to make them.
          </li>
          {/* Add more bullet points for the other information you want to include */}
        </ul>
        <p>
          Remember, these combinations are like keys to unlock new flavors in
          your kitchen. Feel free to explore and make them your own! 🌟
        </p>
        <p>For more detailed recipes based on these combos, check out:</p>
        <ul>
          <li>
            <Link href="https://www.theguardian.com/lifeandstyle/series/nigelslaterrecipe">
              The Guardian Observer Magazine
            </Link>
          </li>
          <li>
            <Link href="https://www.bbcgoodfood.com/">BBC Good Food</Link>
          </li>
          <li>
            <Link href="https://www.seriouseats.com/">Serious Eats</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
