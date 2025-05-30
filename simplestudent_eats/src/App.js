import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main app container for SimpleStudentEats.
 * Provides navigation between three sections and lists recipes in text-centric minimalist cards.
 * Uses specified color theme for a clean, accessible, and responsive layout with no images.
 */
const SECTION_KEYS = [
  'studentMeals',
  'fiveIngredients',
  'veganPlant',
  'grandparentsCooking'
];

const SECTION_LABELS = {
  studentMeals: 'Student Meals',
  fiveIngredients: '5-Ingredient Recipes',
  veganPlant: 'Vegan & Plant-Based Galaxy',
  grandparentsCooking: 'Cooking with Grandparents'
};

/**
 * Hardcoded demo recipes without images,
 * including "Cooking with Grandparents" traditional recipes and stories.
 */
const RECIPE_DATA = {
  studentMeals: [
    // ...unchanged studentMeals recipes...
  ],
  fiveIngredients: [
    {
      title: '3-Minute Peanut Butter Oats',
      ingredients: [
        '1/2 cup rolled oats',
        '1 cup milk or water',
        '2 tbsp peanut butter',
        '1 tsp honey or maple syrup',
        'Pinch of salt'
      ],
      steps: [
        'Mix oats, milk, and salt in bowl.',
        'Microwave 2 minutes, stir in peanut butter and honey.',
        'Microwave 1 more minute, stir and enjoy.'
      ]
    },
    {
      title: 'Cheese & Veggie Quesadilla',
      ingredients: [
        '2 flour tortillas',
        '1/2 cup shredded cheese',
        '1/4 cup chopped peppers',
        '2 tbsp chopped onion',
        'Spray oil'
      ],
      steps: [
        'Heat pan, spray with oil.',
        'Place one tortilla, add cheese and veg.',
        'Top with second tortilla, cook both sides till golden. Slice and serve.'
      ]
    },
    {
      title: 'Avocado Toast',
      ingredients: [
        '2 slices bread',
        '1 ripe avocado',
        '1/4 lemon',
        'Salt',
        'Pepper'
      ],
      steps: [
        'Toast the bread to liking.',
        'Mash avocado with lemon juice, salt, and pepper.',
        'Spread over toast and serve.'
      ]
    },
    {
      title: 'Microwave Scrambled Eggs',
      ingredients: [
        '2 eggs',
        '2 tbsp milk',
        'Salt',
        'Pepper',
        'Butter'
      ],
      steps: [
        'Beat eggs with milk, salt, and pepper in mug.',
        'Microwave 45 secs, stir, then 30 secs more.',
        'Add butter and enjoy from mug or plate.'
      ]
    },
    {
      title: 'One-Pot Sausage Rice',
      ingredients: [
        '1 cup rice',
        '2 sausages',
        '1 cup frozen peas',
        '2 cups water',
        '1 stock cube'
      ],
      steps: [
        'Slice sausages and brown in pot.',
        'Add rice, water, peas, and stock cube.',
        'Simmer covered for 15 min until rice is cooked.'
      ]
    },
    {
      title: 'Tortilla Chips & Salsa',
      ingredients: [
        'Tortilla chips',
        '1 small jar salsa',
        '1/2 avocado (optional)',
        'Lime wedge',
        'Pinch of chili flakes'
      ],
      steps: [
        'Arrange chips on plate.',
        'Top with spoonfuls of salsa and avocado if using.',
        'Squeeze lime and sprinkle chili, serve immediately.'
      ]
    },
    {
      title: 'Pasta Aglio e Olio',
      ingredients: [
        '200g spaghetti',
        '3 cloves garlic',
        '2 tbsp olive oil',
        'Chili flakes',
        'Salt'
      ],
      steps: [
        'Cook pasta. Reserve 1/4 cup pasta water.',
        'Fry sliced garlic in oil, add chili flakes.',
        'Add drained pasta and water, toss, season to taste.'
      ]
    },
    {
      title: 'Egg & Cheese Sandwich',
      ingredients: [
        '2 slices bread',
        '1 egg',
        '1 slice cheese',
        '1 tbsp butter',
        'Salt & pepper'
      ],
      steps: [
        'Heat pan, melt butter.',
        'Fry egg, add cheese on top to melt slightly.',
        'Sandwich between toasted bread, season to taste.'
      ]
    },
    {
      title: 'Tomato & Mozzarella Salad',
      ingredients: [
        '1 large tomato',
        '1 ball mozzarella',
        'Basil leaves or dried basil',
        'Olive oil',
        'Salt'
      ],
      steps: [
        'Slice tomato and mozzarella.',
        'Arrange with basil, drizzle olive oil.',
        'Sprinkle with salt and serve.'
      ]
    },
    {
      title: 'Simple Banana Pancakes',
      ingredients: [
        '1 banana',
        '2 eggs',
        'Pinch of cinnamon',
        'Butter or oil for cooking',
        'Syrup (optional)'
      ],
      steps: [
        'Mash banana, whisk with eggs and cinnamon.',
        'Pour spoonfuls onto hot pan in oil/butter.',
        'Cook both sides, serve with syrup if liked.'
      ]
    },
    {
      title: 'Microwaved Jacket Potato',
      ingredients: [
        '1 medium potato',
        'Salt',
        'Pepper',
        'Butter',
        'Grated cheese'
      ],
      steps: [
        'Prick potato, microwave 5-7 min until soft.',
        'Cut open, add butter and cheese.',
        'Season well, eat hot.'
      ]
    },
    {
      title: 'Easy Pesto Pasta',
      ingredients: [
        '200g pasta',
        '2 tbsp pesto',
        'Salt',
        'Pepper',
        'Grated cheese'
      ],
      steps: [
        'Cook pasta, drain.',
        'Stir through pesto.',
        'Season and serve topped with cheese.'
      ]
    },
    {
      title: 'Ham & Cheese Roll-Ups',
      ingredients: [
        '2 tortilla wraps',
        '2 slices ham',
        '2 slices cheese',
        'Mustard',
        'Lettuce (optional)'
      ],
      steps: [
        'Layer ham, cheese, and mustard in wrap.',
        'Add lettuce if desired.',
        'Roll up tightly and slice.'
      ]
    },
    {
      title: 'Peanut Butter Apple Slices',
      ingredients: [
        '1 apple',
        '2 tbsp peanut butter',
        '1/2 tbsp honey',
        'Pinch of cinnamon',
        'Granola (optional)'
      ],
      steps: [
        'Core and slice apple.',
        'Spread peanut butter, drizzle honey, sprinkle cinnamon.',
        'Top with granola if available.'
      ]
    },
    {
      title: 'Greek Yogurt & Berries',
      ingredients: [
        '1 cup Greek yogurt',
        '1/2 cup mixed berries',
        '1 tsp honey',
        '1 tbsp nuts or seeds',
        'Pinch of cinnamon'
      ],
      steps: [
        'Scoop yogurt into bowl.',
        'Top with berries, honey, and cinnamon.',
        'Sprinkle with nuts or seeds.'
      ]
    }
  ],
  veganPlant: [
    // ...unchanged veganPlant recipes...
  ],
  grandparentsCooking: [
    {
      title: "Grandma's Apple Cinnamon Pancakes",
      ingredients: [
        "2 apples (peeled, grated)",
        "1 1/2 cups flour",
        "2 eggs",
        "1 cup milk",
        "1 tsp cinnamon",
        "2 tbsp sugar",
        "1 tsp baking powder",
        "Pinch of salt",
        "Butter or oil for frying"
      ],
      steps: [
        "In a bowl, mix flour, baking powder, cinnamon, sugar, and salt.",
        "Whisk in eggs and milk until just combined.",
        "Fold in grated apples.",
        "Heat pan with a little butter or oil; drop small ladlefuls of batter.",
        "Flip when bubbles form, cook until golden on both sides.",
        "Serve warm, optionally sprinkle with more cinnamon or a little sugar."
      ],
      story:
        "Legend has it my grandma learned this recipe from her own mother during the autumn apple harvests in the Polish countryside. Every Sunday, the smell of cinnamon would drift from her small kitchen, bringing neighbors in for a chat and a warm treat. These soft pancakes celebrate family, togetherness, and making the most of simple ingredients."
    },
    {
      title: "Nana’s Hearty Vegetable Soup",
      ingredients: [
        "2 carrots, diced",
        "2 potatoes, peeled and cubed",
        "1 onion, chopped",
        "2 celery stalks, chopped",
        "2 cups vegetable broth",
        "1 can diced tomatoes",
        "1 clove garlic, minced",
        "1 tsp dried thyme",
        "Salt and pepper to taste"
      ],
      steps: [
        "Heat a large pot, sauté the onion, garlic, carrot, and celery for 3-4 minutes.",
        "Add potatoes, diced tomatoes (with juice), broth, and thyme.",
        "Bring to a boil; reduce to simmer and cook until veggies are tender (20-25 minutes).",
        "Season with salt and pepper to taste. Serve steaming hot."
      ],
      story:
        "Nana would serve this soup after long days in her garden, as a way to bring the whole family together around one pot. It’s a celebration of simple, local produce and the comfort of home. Every bowl brings back memories of laughter at a crowded table."
    },
    {
      title: "Nonno’s Classic Spaghetti Aglio e Olio",
      ingredients: [
        "200g spaghetti",
        "3 tbsp olive oil",
        "3 garlic cloves, thinly sliced",
        "Pinch of red chili flakes",
        "2 tbsp chopped parsley",
        "Salt",
        "Grated parmesan (optional)"
      ],
      steps: [
        "Cook spaghetti until al dente in salted water.",
        "While pasta cooks, gently warm olive oil in a pan. Add sliced garlic and chili flakes, sauté on low till garlic golden.",
        "Reserve some pasta water, drain spaghetti, then toss into the pan.",
        "Add a splash of pasta water if needed, mix with parsley. Serve hot, with parmesan if liked."
      ],
      story:
        "Inspired by Italian kitchen traditions, Nonno would cook this simple meal after returning from the olive groves. He believed great flavor came from simplicity and gathering at the table. This recipe is a delicious reminder of resilience, thrift, and family joy."
    }
  ]
};

// PUBLIC_INTERFACE
function App() {
  const [selectedSection, setSelectedSection] = useState('studentMeals');

  // For Vegan section, group by protein source. (Can expand logic as needed)
  const groupVeganRecipes = () => {
    const grouped = {};
    RECIPE_DATA.veganPlant.forEach(recipe => {
      const protein = recipe.proteinSource || 'Other';
      if (!grouped[protein]) grouped[protein] = [];
      grouped[protein].push(recipe);
    });
    return grouped;
  };

  return (
    <div className="sse-app" style={{ background: 'var(--sse-bg)', color: 'var(--sse-text)' }}>
      <nav className="sse-navbar" role="navigation" aria-label="Main">
        <div className="sse-container sse-navbar-content">
          <div className="sse-logo" aria-label="SimpleStudentEats">🍲 <span>SimpleStudentEats</span></div>
          <ul className="sse-nav-list" role="menubar">
            {SECTION_KEYS.map(key => (
              <li 
                key={key}
                className={`sse-nav-item${selectedSection === key ? ' sse-nav-active' : ''}`}
                role="none"
              >
                <button
                  className="sse-nav-btn"
                  aria-current={selectedSection === key ? 'page' : undefined}
                  aria-label={`Go to ${SECTION_LABELS[key]}`}
                  onClick={() => setSelectedSection(key)}
                  tabIndex={0}
                  role="menuitem"
                  style={{ fontWeight: selectedSection === key ? 600 : 400 }}
                >
                  {SECTION_LABELS[key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="sse-main sse-container" tabIndex={-1}>
        <h1 className="sse-section-title">{SECTION_LABELS[selectedSection]}</h1>
        <div className="sse-section-desc">
          {selectedSection === 'studentMeals' &&
            <p>Budget-friendly, quick, minimal-equipment meals for students. Simple, tasty, and fuss-free.</p>
          }
          {selectedSection === 'fiveIngredients' &&
            <p>Just 5 ingredients! These meals are quick, easy, and perfect for busy days or beginner cooks.</p>
          }
          {selectedSection === 'veganPlant' &&
            <p>Explore plant-based recipes, organized by their main protein (lentils, tofu, seitan, and more).</p>
          }
        </div>
        <section aria-label="Recipe List">
          {selectedSection !== 'veganPlant' && (
            <ul className="sse-recipe-list">
              {RECIPE_DATA[selectedSection].map((recipe, i) => (
                <li className="sse-recipe-card" key={recipe.title}>
                  <h2 className="sse-recipe-title">{recipe.title}</h2>
                  <div className="sse-recipe-section">
                    <h3 className="sse-recipe-subtitle">Ingredients</h3>
                    <ul className="sse-ingredient-list">
                      {recipe.ingredients.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="sse-recipe-section">
                    <h3 className="sse-recipe-subtitle">Steps</h3>
                    <ol className="sse-steps-list">
                      {recipe.steps.map((step, k) => (
                        <li key={k}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {selectedSection === 'veganPlant' && (
            <div>
              {Object.entries(groupVeganRecipes()).map(([protein, recipes]) => (
                <div className="sse-vegan-group" key={protein}>
                  <h2 className="sse-protein-label">{protein}</h2>
                  <ul className="sse-recipe-list">
                    {recipes.map((recipe, i) => (
                      <li className="sse-recipe-card" key={recipe.title}>
                        <h3 className="sse-recipe-title">{recipe.title}</h3>
                        <div className="sse-recipe-section">
                          <h4 className="sse-recipe-subtitle">Ingredients</h4>
                          <ul className="sse-ingredient-list">
                            {recipe.ingredients.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="sse-recipe-section">
                          <h4 className="sse-recipe-subtitle">Steps</h4>
                          <ol className="sse-steps-list">
                            {recipe.steps.map((step, k) => (
                              <li key={k}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="sse-footer" aria-label="Footer">
        <div className="sse-container">
          <span>© {new Date().getFullYear()} SimpleStudentEats</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
