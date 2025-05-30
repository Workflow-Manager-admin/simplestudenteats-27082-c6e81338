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
    },
    {
      title: 'Instant Ramen Egg Drop',
      ingredients: [
        '1 pack instant ramen',
        '2 cups water',
        '1 egg',
        '2 spring onions',
        'Soy sauce to taste'
      ],
      steps: [
        'Boil water, add ramen and seasoning.',
        'When noodles soften, beat egg and swirl into soup.',
        'Top with chopped spring onion and soy sauce, serve hot.'
      ]
    },
    {
      title: 'Simple Tuna Mayo Rice',
      ingredients: [
        '1 cup cooked rice',
        '1 can tuna (drained)',
        '2 tbsp mayonnaise',
        '1/2 tsp black pepper',
        'Pinch of salt'
      ],
      steps: [
        'Mix tuna with mayonnaise and pepper.',
        'Serve atop warm rice. Add salt to taste.',
        'Optional: Add chopped green onion.'
      ]
    },
    {
      title: 'Breakfast Burrito',
      ingredients: [
        '1 tortilla wrap',
        '2 eggs',
        '1/4 cup grated cheese',
        '2 tbsp salsa',
        '1 tbsp oil or butter'
      ],
      steps: [
        'Scramble eggs in pan with oil or butter.',
        'Add cheese, stir gently. Place into tortilla.',
        'Top with salsa, wrap, cut in half.'
      ]
    },
    {
      title: 'Lazy Bean Quesadilla',
      ingredients: [
        '1 flour tortilla',
        '1/2 can refried beans',
        '1/2 cup cheese',
        'Hot sauce (optional)',
        'Oil spray'
      ],
      steps: [
        'Spread beans over half tortilla, top with cheese and hot sauce.',
        'Fold, fry on pan with oil spray each side until golden.',
        'Cool slightly, slice and serve.'
      ]
    },
    {
      title: 'Microwave Veggie Omelet',
      ingredients: [
        '2 eggs',
        '1/4 cup mixed chopped veggies',
        '2 tbsp milk',
        'Salt & pepper',
        'Microwave-safe bowl'
      ],
      steps: [
        'Beat eggs, milk, salt, and pepper in bowl.',
        'Stir in veggies. Microwave 1 min, stir, then 30 sec more.',
        'Enjoy straight from bowl or on toast.'
      ]
    },
    {
      title: 'Canned Soup Uplift',
      ingredients: [
        '1 can of soup',
        '1 slice bread (cubed or torn)',
        '1/2 cup frozen peas or corn',
        'Salt and pepper',
        'Chili flakes (optional)'
      ],
      steps: [
        'Pour soup into pot, add bread cubes and frozen veg.',
        'Heat through until bread softens.',
        'Season with salt, pepper, and chili if desired.'
      ]
    },
    {
      title: 'Baked Bean Toast',
      ingredients: [
        '1 can baked beans',
        '2 slices bread',
        'Butter',
        'Black pepper',
        'Paprika (optional)'
      ],
      steps: [
        'Toast the bread and butter it.',
        'Heat beans, season with pepper or paprika.',
        'Spoon beans over toast and enjoy.'
      ]
    },
    {
      title: 'Pita Pizza',
      ingredients: [
        '1 pita bread',
        '3 tbsp tomato sauce',
        '1/2 cup cheese',
        'Dried oregano',
        'Veg toppings (optional)'
      ],
      steps: [
        'Spread sauce on pita, sprinkle cheese, add toppings if desired.',
        'Sprinkle oregano. Bake or grill till cheese melts.',
        'Slice and serve.'
      ]
    },
    {
      title: 'No-Cook Chickpea Salad',
      ingredients: [
        '1 can chickpeas',
        '1/4 onion (chopped)',
        '1 tbsp olive oil',
        'Juice of half a lemon',
        'Salt & pepper'
      ],
      steps: [
        'Rinse chickpeas, mix all ingredients in a bowl.',
        'Toss until well combined.',
        'Serve as is or in a wrap.'
      ]
    },
    {
      title: 'Cheap Tomato Risotto',
      ingredients: [
        '3/4 cup rice (short grain best)',
        '1 can chopped tomatoes',
        '1 onion',
        '2 cups water or broth',
        'Salt & pepper'
      ],
      steps: [
        'Chop onion and sauté in pot.',
        'Add rice, stir, then add tomatoes and water.',
        'Cook on low, stirring, until rice is creamy and soft. Season to taste.'
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
      title: 'Soy Sauce Noodle Bowl',
      ingredients: [
        '200g dried noodles',
        '2 spring onions',
        '2 tbsp soy sauce',
        '1 tbsp sesame oil',
        'Pinch of white pepper'
      ],
      steps: [
        'Prepare noodles as per pack instructions.',
        'Mix soy sauce, oil, pepper. Toss noodles in mixture.',
        'Top with chopped spring onion and serve.'
      ],
      proteinSource: 'Soy'
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
      title: 'Lentil Shepherd\'s Pie',
      ingredients: [
        '1.5 cups cooked lentils',
        '2 cups mashed potato',
        '1 onion',
        '1 carrot',
        '2 tbsp tomato paste'
      ],
      steps: [
        'Sauté onion and carrot, mix in lentils and tomato paste.',
        'Spread in dish, top with mashed potato.',
        'Bake at 200°C for 15 min.'
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
      title: 'Curried Chickpea Stew',
      ingredients: [
        '1 can chickpeas',
        '1 can chopped tomatoes',
        '1 onion',
        '1 tsp curry powder',
        'Salt'
      ],
      steps: [
        'Sauté onion, add curry powder and cook 1 min.',
        'Add chickpeas and tomatoes, simmer 10 min.',
        'Season and serve with bread or rice.'
      ],
      proteinSource: 'Chickpeas'
    },
    {
      title: 'Beans on Toast (Vegan)',
      ingredients: [
        '1 can baked beans',
        '2 slices wholemeal bread',
        '1 tsp vegan spread',
        '1/2 tsp paprika',
        'Pinch black pepper'
      ],
      steps: [
        'Toast bread, spread with vegan spread.',
        'Heat beans, season with paprika and pepper.',
        'Top bread with beans and serve.'
      ],
      proteinSource: 'Beans'
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
    },
    {
      title: 'Quick Black Bean Rice',
      ingredients: [
        '1 cup cooked rice',
        '1 can black beans',
        '1/2 tsp cumin',
        'Salt',
        '1 tbsp chopped onion'
      ],
      steps: [
        'Mix beans, onion, cumin, salt in pan; heat 2 min.',
        'Stir in rice, cook until warm.',
        'Serve as bowl or side.'
      ],
      proteinSource: 'Beans'
    },
    {
      title: 'Peanut Butter Banana Toast',
      ingredients: [
        '2 slices bread',
        '1 banana',
        '2 tbsp peanut butter',
        'Chia seeds (optional)',
        'Cinnamon'
      ],
      steps: [
        'Toast bread, spread peanut butter.',
        'Slice banana on top.',
        'Sprinkle cinnamon and chia seeds.'
      ],
      proteinSource: 'Peanut'
    },
    {
      title: 'Hummus Stuffed Pita',
      ingredients: [
        '1 pita bread',
        '3 tbsp hummus',
        '1/4 cucumber, sliced',
        'Tomato slices',
        'Lettuce'
      ],
      steps: [
        'Warm pita, slice open.',
        'Fill with hummus, cucumber, lettuce and tomato.',
        'Serve cold or warm.'
      ],
      proteinSource: 'Chickpeas'
    },
    {
      title: 'Plant-Based Pesto Pasta',
      ingredients: [
        '150g pasta',
        '2 tbsp vegan pesto',
        '1 tbsp olive oil',
        'Salt & pepper',
        'Chopped walnuts (optional)'
      ],
      steps: [
        'Cook pasta, drain.',
        'Stir in pesto, oil, seasonings.',
        'Top with chopped walnuts.'
      ],
      proteinSource: 'Nuts'
    },
    {
      title: 'Smashed Avocado & Beans',
      ingredients: [
        '1 avocado',
        '1/2 cup canned black beans',
        'Juice of 1/4 lime',
        'Salt',
        '2 slices bread'
      ],
      steps: [
        'Toast bread.',
        'Mash avocado with lime and salt, spread on toast.',
        'Top with beans.'
      ],
      proteinSource: 'Avocado & Beans'
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
