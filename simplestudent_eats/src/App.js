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
 * Hardcoded demo recipes without images,
 * per the original requirements (three sections, 15 recipes each).
 */
const RECIPE_DATA = {
  studentMeals: [
    {
      title: "Classic Tuna Mayo Sandwich",
      ingredients: [
        "1 can tuna (drained)",
        "2 tbsp mayonnaise",
        "2 slices bread",
        "Pinch of salt & pepper",
        "Lettuce leaf (optional)"
      ],
      steps: [
        "Mix tuna with mayonnaise, salt, and pepper.",
        "Spread onto one slice of bread, add lettuce if using.",
        "Top with the other slice, slice in half, and serve."
      ]
    },
    {
      title: "Egg Fried Rice",
      ingredients: [
        "1 cup cooked rice",
        "2 eggs",
        "2 tsp soy sauce",
        "1 tbsp oil",
        "Frozen peas/carrots"
      ],
      steps: [
        "Heat oil in pan, add beaten eggs and scramble.",
        "Add cooked rice and veggies, stir-fry for 2 min.",
        "Add soy sauce, mix and serve hot."
      ]
    },
    {
      title: "One-Pan Baked Beans & Toast",
      ingredients: [
        "1 can baked beans",
        "2 slices bread",
        "Butter",
        "Salt & pepper",
        "Chili flakes (optional)"
      ],
      steps: [
        "Heat baked beans in a pot.",
        "Toast bread and butter it.",
        "Serve beans over toast, sprinkle chili if desired."
      ]
    },
    {
      title: "Simple Chicken Wrap",
      ingredients: [
        "1 cooked chicken breast (shredded)",
        "1 tortilla wrap",
        "Lettuce",
        "Mayonnaise or yogurt",
        "Sliced tomato"
      ],
      steps: [
        "Fill wrap with chicken, lettuce, tomato.",
        "Add a spoonful of mayo/yogurt.",
        "Roll up wrap and slice in half."
      ]
    },
    {
      title: "Vegetarian Pasta Salad",
      ingredients: [
        "1 cup cooked pasta",
        "1/2 cup cherry tomatoes",
        "1/4 cucumber",
        "Olive oil",
        "Feta cheese"
      ],
      steps: [
        "Chop veggies and add to pasta.",
        "Drizzle with olive oil and toss.",
        "Sprinkle feta on top before serving."
      ]
    },
    {
      title: "Lazy Bean Chili",
      ingredients: [
        "1 can mixed beans",
        "1/2 onion (chopped)",
        "1 tsp chili powder",
        "1 can chopped tomatoes",
        "Oil"
      ],
      steps: [
        "Heat oil, sauté onion and chili powder.",
        "Add beans and tomatoes, simmer 10 min.",
        "Serve with bread or rice."
      ]
    },
    {
      title: "Microwave Scrambled Eggs",
      ingredients: [
        "2 eggs",
        "2 tbsp milk",
        "Salt & pepper",
        "Butter",
        "Chopped herbs (optional)"
      ],
      steps: [
        "Beat eggs, milk, salt, pepper in a mug.",
        "Microwave 45 sec, stir, microwave 30 sec.",
        "Add butter and herbs, eat hot."
      ]
    },
    {
      title: "Cheesy Veggie Quesadilla",
      ingredients: [
        "1 flour tortilla",
        "1/2 cup shredded cheese",
        "1/4 bell pepper",
        "1 tbsp chopped onion",
        "Spray oil"
      ],
      steps: [
        "Heat pan, spray oil.",
        "Fill tortilla with cheese & veg, fold.",
        "Cook both sides until golden."
      ]
    },
    {
      title: "Student Curry",
      ingredients: [
        "1 cup cooked rice",
        "1/2 jar curry sauce",
        "1/2 can chickpeas",
        "Handful frozen peas",
        "Oil"
      ],
      steps: [
        "Heat oil, fry chickpeas and peas.",
        "Add curry sauce, simmer 5 min.",
        "Serve with rice."
      ]
    },
    {
      title: "Tomato Omelette",
      ingredients: [
        "2 eggs",
        "1 tomato (chopped)",
        "Salt",
        "Pepper",
        "Oil"
      ],
      steps: [
        "Beat eggs, add tomato, salt, and pepper.",
        "Heat pan with oil, pour egg mix.",
        "Cook until set, fold, serve."
      ]
    },
    {
      title: "Ham & Cheese Toastie",
      ingredients: [
        "2 slices bread",
        "1 slice ham",
        "1 slice cheese",
        "Butter",
        "Mustard (optional)"
      ],
      steps: [
        "Butter bread, fill with ham and cheese.",
        "Add mustard if liked.",
        "Toast in pan or sandwich press."
      ]
    },
    {
      title: "Quick Tomato Pasta",
      ingredients: [
        "200g pasta",
        "1 can chopped tomatoes",
        "1 garlic clove",
        "Oil",
        "Dried basil"
      ],
      steps: [
        "Cook pasta, drain.",
        "Meanwhile sauté garlic in oil, add tomatoes, cook 5 min.",
        "Add pasta and basil, toss to coat."
      ]
    },
    {
      title: "Peanut Butter Banana Toast",
      ingredients: [
        "2 slices bread",
        "2 tbsp peanut butter",
        "1 banana",
        "Honey",
        "Cinnamon"
      ],
      steps: [
        "Toast bread, spread peanut butter.",
        "Top with sliced banana, drizzle honey, sprinkle cinnamon."
      ]
    },
    {
      title: "Chickpea Salad Bowl",
      ingredients: [
        "1 can chickpeas (drained)",
        "1/4 red onion",
        "1 tomato",
        "Lemon juice",
        "Olive oil"
      ],
      steps: [
        "Chop onion and tomato, combine with chickpeas.",
        "Add lemon juice and olive oil, toss to coat."
      ]
    },
    {
      title: "Garlic Butter Noodles",
      ingredients: [
        "200g noodles",
        "2 tbsp butter",
        "2 garlic cloves",
        "Parsley",
        "Salt & pepper"
      ],
      steps: [
        "Cook noodles, drain.",
        "Melt butter, sauté garlic, toss noodles, add parsley."
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
      title: "Lentil Bolognese",
      proteinSource: "Lentils",
      ingredients: [
        "1 cup dried lentils",
        "1 can chopped tomatoes",
        "1 onion (chopped)",
        "2 garlic cloves",
        "1 tsp dried oregano"
      ],
      steps: [
        "Sauté onion and garlic, add lentils.",
        "Add tomatoes and oregano, simmer until lentils tender.",
        "Serve with pasta or rice."
      ]
    },
    {
      title: "Creamy Tofu Stir-Fry",
      proteinSource: "Tofu",
      ingredients: [
        "200g firm tofu",
        "1 cup broccoli florets",
        "2 tbsp soy sauce",
        "1 tbsp peanut butter",
        "1 tsp ginger"
      ],
      steps: [
        "Cube tofu, stir-fry with broccoli.",
        "Mix soy, peanut butter, ginger with splash water.",
        "Add sauce to pan, heat until thickened."
      ]
    },
    {
      title: "Chickpea Salad Wraps",
      proteinSource: "Chickpeas",
      ingredients: [
        "1 can chickpeas",
        "2 tbsp vegan mayo",
        "1 tsp mustard",
        "Lettuce leaves",
        "Salt & pepper"
      ],
      steps: [
        "Mash chickpeas; mix in mayo, mustard, salt, and pepper.",
        "Spoon mixture into lettuce leaves and serve."
      ]
    },
    {
      title: "Easy Seitan Chilli",
      proteinSource: "Seitan",
      ingredients: [
        "1 pack seitan (shredded)",
        "1 can kidney beans",
        "1/2 jar tomato sauce",
        "1 tsp cumin",
        "Chili flakes"
      ],
      steps: [
        "Brown seitan in pan, add sauce, beans, and spices.",
        "Simmer to blend flavors, serve hot."
      ]
    },
    {
      title: "Simple Hummus Bowl",
      proteinSource: "Chickpeas",
      ingredients: [
        "1 cup hummus",
        "1 pita bread",
        "Cherry tomatoes",
        "Cucumber",
        "Paprika"
      ],
      steps: [
        "Spoon hummus into bowl, top with sliced veggies.",
        "Sprinkle paprika, serve with pita."
      ]
    },
    {
      title: "Tofu Scramble",
      proteinSource: "Tofu",
      ingredients: [
        "200g firm tofu",
        "1/2 tsp turmeric",
        "1 tbsp plant milk",
        "Salt & pepper",
        "Spinach"
      ],
      steps: [
        "Crumble tofu, stir in turmeric and milk.",
        "Add spinach, cook until wilted, season."
      ]
    },
    {
      title: "Hearty Lentil Soup",
      proteinSource: "Lentils",
      ingredients: [
        "1 cup red lentils",
        "1 carrot (diced)",
        "1 onion",
        "1 veg stock cube",
        "2 cups water"
      ],
      steps: [
        "Cook all ingredients in pot until lentils are soft.",
        "Blend or mash for smooth texture if desired."
      ]
    },
    {
      title: "Chili Peanut Noodles",
      proteinSource: "Peanuts",
      ingredients: [
        "200g rice noodles",
        "2 tbsp peanut butter",
        "Soy sauce",
        "Spring onion",
        "Chili oil"
      ],
      steps: [
        "Cook noodles, toss with peanut butter, soy sauce, chili oil.",
        "Top with sliced spring onion."
      ]
    },
    {
      title: "Stuffed Bell Peppers",
      proteinSource: "Lentils",
      ingredients: [
        "2 bell peppers",
        "1 cup cooked lentils",
        "1/2 cup tomato sauce",
        "Garlic",
        "Rice"
      ],
      steps: [
        "Mix cooked rice, lentils, and sauce.",
        "Stuff into halved peppers, bake until soft."
      ]
    },
    {
      title: "Sesame Tofu Rice Bowl",
      proteinSource: "Tofu",
      ingredients: [
        "200g tofu",
        "1/2 cup rice",
        "Sesame seeds",
        "Soy sauce",
        "Green beans"
      ],
      steps: [
        "Cook rice, steam green beans.",
        "Fry tofu, sprinkle sesame seeds.",
        "Serve everything in a bowl, drizzle soy sauce."
      ]
    },
    {
      title: "Mushroom Stroganoff",
      proteinSource: "Mushrooms",
      ingredients: [
        "2 cups mushrooms",
        "1 onion",
        "1/2 cup plant cream",
        "Garlic",
        "Pasta"
      ],
      steps: [
        "Sauté onion and garlic, add mushrooms.",
        "Stir in plant cream, heat.",
        "Serve over cooked pasta."
      ]
    },
    {
      title: "Vegan Bean Burritos",
      proteinSource: "Beans",
      ingredients: [
        "1 can black beans",
        "2 tortillas",
        "Salsa",
        "Corn",
        "Avocado"
      ],
      steps: [
        "Mash beans, mix with salsa.",
        "Spread onto tortillas, add corn and avocado, roll up."
      ]
    },
    {
      title: "BBQ Jackfruit Sandwich",
      proteinSource: "Jackfruit",
      ingredients: [
        "1 can jackfruit",
        "BBQ sauce",
        "Sandwich buns",
        "Coleslaw",
        "Lettuce"
      ],
      steps: [
        "Cook jackfruit with BBQ sauce.",
        "Pile onto buns with lettuce and coleslaw."
      ]
    },
    {
      title: "Quick Lentil Dal",
      proteinSource: "Lentils",
      ingredients: [
        "1 cup red lentils",
        "2 cups water",
        "1/2 tsp cumin",
        "1/2 tsp turmeric",
        "Salt"
      ],
      steps: [
        "Boil all together until lentils are soft.",
        "Mash and serve with rice or flatbread."
      ]
    },
    {
      title: "Miso Soup with Tofu",
      proteinSource: "Tofu",
      ingredients: [
        "1 tbsp miso paste",
        "2 cups water",
        "75g tofu (cubed)",
        "Spring onion",
        "Seaweed"
      ],
      steps: [
        "Dissolve miso in hot water.",
        "Add tofu, seaweed, and spring onion, heat gently (don’t boil)."
      ]
    }
  ]
};

// PUBLIC_INTERFACE
function App() {
  const [selectedSection, setSelectedSection] = useState('studentMeals');

  // For Vegan section, group by protein source.
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
          {selectedSection === 'veganPlant' ? (
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
          ) : (
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
