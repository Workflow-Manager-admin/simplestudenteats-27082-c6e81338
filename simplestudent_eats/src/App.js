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
  'veganPlant'
];

const SECTION_LABELS = {
  studentMeals: 'Student Meals',
  fiveIngredients: '5-Ingredient Recipes',
  veganPlant: 'Vegan & Plant-Based Galaxy'
};

/**
 * Hardcoded demo recipes without images.
 */
const RECIPE_DATA = {
  studentMeals: [
    {
      title: 'One-Pan Tomato Pasta',
      ingredients: [
        '200g pasta',
        '1 can diced tomatoes',
        '2 cloves garlic',
        '1 tbsp olive oil',
        'Salt and pepper'
      ],
      steps: [
        'Cook pasta as per instructions. Drain.',
        'In same pan, sauté garlic in oil. Add tomatoes, simmer 5 min.',
        'Toss pasta with sauce, season, and serve.'
      ]
    },
    {
      title: 'Easy Chicken Rice Bowl',
      ingredients: [
        '1 cup cooked rice',
        '100g cooked chicken (shredded or diced)',
        '2 tbsp frozen peas',
        '2 tbsp soy sauce',
        '1 egg'
      ],
      steps: [
        'Heat rice and chicken in pan.',
        'Add peas and soy sauce, stir well.',
        'Push aside, scramble egg, mix all, serve warm.'
      ]
    },
    {
      title: 'Student Chili Bowl',
      ingredients: [
        '1 can kidney beans',
        '1 can chopped tomatoes',
        '1 small onion',
        '1 tsp chili powder',
        'Salt and pepper'
      ],
      steps: [
        'Chop onion and sauté in pan 2 min.',
        'Add beans, tomatoes, chili powder.',
        'Simmer for 8-10 min, season and serve with bread/rice.'
      ]
    },
    {
      title: 'Egg Fried Toasties',
      ingredients: [
        '2 slices bread',
        '2 eggs',
        '1 tbsp milk',
        'Butter or oil',
        'Pinch of salt'
      ],
      steps: [
        'Whisk eggs, milk, and salt together.',
        'Heat butter in pan, dip bread into egg mixture.',
        'Fry bread both sides until golden and egg is set.'
      ]
    },
    {
      title: 'Quick Veggie Couscous',
      ingredients: [
        '1 cup couscous',
        '1 cup boiling water',
        '1/2 cup frozen mixed veg',
        '1 stock cube',
        'Squeeze of lemon (optional)'
      ],
      steps: [
        'Place couscous, stock cube, and veg in bowl.',
        'Pour boiling water over, cover for 5 min.',
        'Fluff with fork, add lemon, and serve.'
      ]
    }
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
    }
  ],
  veganPlant: [
    {
      title: 'Tofu Stir-Fry',
      ingredients: [
        '200g firm tofu',
        '1 cup mixed veggies (bell pepper, broccoli, carrot)',
        '2 tbsp soy sauce',
        '1 tbsp sesame oil',
        '1 tsp ginger (optional)'
      ],
      steps: [
        'Dice tofu, pat dry. Sauté in oil until golden.',
        'Add veggies, stir-fry 3-5 min.',
        'Add soy sauce and ginger, toss well, serve hot.'
      ],
      proteinSource: 'Tofu'
    },
    {
      title: 'Crispy Baked Tofu Bites',
      ingredients: [
        '200g tofu',
        '1 tbsp olive oil',
        '1 tbsp soy sauce',
        '1 tbsp cornflour',
        'Salt & pepper'
      ],
      steps: [
        'Press tofu and cut into cubes.',
        'Toss cubes with oil, soy sauce, cornflour, salt & pepper.',
        'Bake at 200°C (400°F) for 25 min, turning halfway.'
      ],
      proteinSource: 'Tofu'
    },
    {
      title: 'Lentil Curry',
      ingredients: [
        '1 cup dried lentils',
        '2 cups water',
        '1 can diced tomatoes',
        '1 tsp curry powder',
        'Salt to taste'
      ],
      steps: [
        'Rinse lentils, simmer in water until soft.',
        'Add tomatoes, curry powder, and salt. Simmer 10 min.',
        'Serve with rice or bread.'
      ],
      proteinSource: 'Lentils'
    },
    {
      title: 'Simple Lentil Stew',
      ingredients: [
        '1 cup cooked lentils',
        '1 carrot',
        '1 small onion',
        '2 cups vegetable broth',
        '1 bay leaf'
      ],
      steps: [
        'Chop onion and carrot, sauté in pot.',
        'Add lentils, broth, bay leaf, simmer 15 min.',
        'Remove bay leaf and serve.'
      ],
      proteinSource: 'Lentils'
    },
    {
      title: 'Spicy Chickpea Wrap',
      ingredients: [
        '1 can chickpeas',
        '2 tbsp hummus',
        '1 tsp hot sauce',
        '1 wrap/tortilla',
        'Lettuce leaves'
      ],
      steps: [
        'Mash chickpeas with hummus and hot sauce.',
        'Spread on wrap, top with lettuce, roll up and serve.'
      ],
      proteinSource: 'Chickpeas'
    },
    {
      title: 'Bean & Corn Salad',
      ingredients: [
        '1 can black beans',
        '1 cup corn (canned or frozen)',
        '1 lime',
        'Salt',
        'Fresh coriander (optional)'
      ],
      steps: [
        'Rinse beans, mix with drained corn.',
        'Add juice of lime, salt, coriander; mix and serve.'
      ],
      proteinSource: 'Beans'
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
