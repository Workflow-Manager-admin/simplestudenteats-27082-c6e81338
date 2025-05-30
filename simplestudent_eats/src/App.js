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
