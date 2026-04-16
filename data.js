/**
 * இன்று என்ன சமையல்? — Tamil Nadu Home Cooking Dataset
 * Pure Tamil Nadu household cooking assistant
 * 
 * BATTER SYSTEM:
 * Tamil homes always have idli/dosa batter in different states.
 * - Fresh batter (just ground) → Adai, Dosai (flat but tasty)
 * - Fermented batter (perfect) → Idli, Dosai, Uthappam, Appam
 * - Sour/over-fermented batter → Paniyaram, Kuzhi Paniyaram (saves waste!)
 * 
 * MEAL TYPES:
 * - breakfast: Morning tiffin
 * - lunch: Full meals (rice + accompaniments)
 * - dinner: Evening tiffin OR light rice meals
 * - snack: Evening snacks (4 PM bajji/bonda time)
 */

// ─── Ingredient Catalog ────────────────────────────────────────
const INGREDIENTS = [
  // ── Vegetables ──
  { id: 'onion',            name: 'Vengayam (Onion)',         emoji: '🧅', category: 'vegetable' },
  { id: 'tomato',           name: 'Thakkali (Tomato)',        emoji: '🍅', category: 'vegetable' },
  { id: 'potato',           name: 'Urulai (Potato)',          emoji: '🥔', category: 'vegetable' },
  { id: 'brinjal',          name: 'Kathirikai (Brinjal)',     emoji: '🍆', category: 'vegetable' },
  { id: 'drumstick',        name: 'Murungakkai',              emoji: '🥒', category: 'vegetable' },
  { id: 'okra',             name: 'Vendakkai (Okra)',         emoji: '🫑', category: 'vegetable' },
  { id: 'spinach',          name: 'Keerai (Greens)',          emoji: '🥬', category: 'vegetable' },
  { id: 'beans',            name: 'Beans',                    emoji: '🫘', category: 'vegetable' },
  { id: 'cabbage',          name: 'Muttaikose (Cabbage)',     emoji: '🥗', category: 'vegetable' },
  { id: 'raw_banana',       name: 'Vazhaikkai (Raw Banana)',  emoji: '🍌', category: 'vegetable' },
  { id: 'carrot',           name: 'Carrot',                   emoji: '🥕', category: 'vegetable' },
  { id: 'snake_gourd',      name: 'Pudalangai',               emoji: '🥒', category: 'vegetable' },
  { id: 'bitter_gourd',     name: 'Pavakkai (Bitter Gourd)',  emoji: '🥒', category: 'vegetable' },
  { id: 'ash_gourd',        name: 'Poosanikai (Ash Gourd)',   emoji: '🎃', category: 'vegetable' },

  // ── Protein ──
  { id: 'chicken',          name: 'Kozhi (Chicken)',          emoji: '🍗', category: 'protein' },
  { id: 'mutton',           name: 'Aattu Iraichi (Mutton)',   emoji: '🥩', category: 'protein' },
  { id: 'egg',              name: 'Muttai (Egg)',             emoji: '🥚', category: 'protein' },
  { id: 'fish',             name: 'Meen (Fish)',              emoji: '🐟', category: 'protein' },
  { id: 'prawn',            name: 'Eral (Prawn)',             emoji: '🦐', category: 'protein' },
  { id: 'crab',             name: 'Nandu (Crab)',             emoji: '🦀', category: 'protein' },

  // ── Pantry Staples & Masala ──
  { id: 'coconut',          name: 'Thengai (Coconut)',        emoji: '🥥', category: 'pantry' },
  { id: 'curry_leaves',     name: 'Karuveppilai',             emoji: '🌿', category: 'pantry' },
  { id: 'coriander',        name: 'Kothamalli (Coriander)',   emoji: '🌿', category: 'pantry' },
  { id: 'tamarind',         name: 'Puli (Tamarind)',          emoji: '🟤', category: 'pantry' },
  { id: 'curd',             name: 'Thayir (Curd)',            emoji: '🥛', category: 'pantry' },
  { id: 'garlic',           name: 'Poondu (Garlic)',          emoji: '🧄', category: 'pantry' },
  { id: 'green_chili',      name: 'Pachai Milagai',           emoji: '🌶️', category: 'pantry' },
  { id: 'ghee',             name: 'Nei (Ghee)',               emoji: '🧈', category: 'pantry' },
  { id: 'jaggery',          name: 'Vellam (Jaggery)',         emoji: '🟫', category: 'pantry' },
  { id: 'mustard',          name: 'Kadugu (Mustard)',         emoji: '🟤', category: 'pantry' },
  { id: 'cumin',            name: 'Seeragam (Cumin)',         emoji: '🌱', category: 'pantry' },
  { id: 'pepper',           name: 'Milagu (Pepper)',          emoji: '⚫', category: 'pantry' },
  { id: 'turmeric',         name: 'Manjal (Turmeric)',        emoji: '🟡', category: 'pantry' },
  { id: 'ginger',           name: 'Inji (Ginger)',            emoji: '🫚', category: 'pantry' },
  { id: 'fennel',           name: 'Sompu (Fennel Seeds)',     emoji: '🌿', category: 'pantry' },
  { id: 'whole_spices',     name: 'Pattai Lavangam (Spices)', emoji: '🍂', category: 'pantry' },
  { id: 'mint_leaves',      name: 'Pudhina (Mint)',           emoji: '🌿', category: 'pantry' },
  { id: 'coconut_oil',      name: 'Thengai Ennai',            emoji: '🥥', category: 'pantry' },
  { id: 'asafoetida',       name: 'Perungayam (Hing)',        emoji: '🪴', category: 'pantry' },
  { id: 'cashews',          name: 'Mundhiri (Cashews)',       emoji: '🥜', category: 'pantry' },
  { id: 'vathal',           name: 'Sundakkai Vathal',         emoji: '🫐', category: 'pantry' },

  // ── Grains & Dals ──
  { id: 'rice',             name: 'Arisi (Normal Rice)',      emoji: '🍚', category: 'grain' },
  { id: 'basmati_rice',     name: 'Basmati Rice',             emoji: '🍚', category: 'grain' },
  { id: 'seeraga_samba',    name: 'Seeraga Samba (Biryani)',  emoji: '🌾', category: 'grain' },
  { id: 'toor_dal',         name: 'Thuvaram Paruppu',         emoji: '🟡', category: 'grain' },
  { id: 'moong_dal',        name: 'Payatham Paruppu',         emoji: '🟢', category: 'grain' },
  { id: 'chana_dal',        name: 'Kadalai Paruppu',          emoji: '🟤', category: 'grain' },
  { id: 'urad_dal',         name: 'Ulutham Paruppu',          emoji: '⚪', category: 'grain' },
  { id: 'rava',             name: 'Rava (Semolina)',          emoji: '🌾', category: 'grain' },
  { id: 'rice_flour',       name: 'Arisi Maavu',              emoji: '🍘', category: 'grain' },
  { id: 'wheat_flour',      name: 'Godhumai Maavu',           emoji: '🌾', category: 'grain' },
  { id: 'vermicelli',       name: 'Semiya',                   emoji: '🍝', category: 'grain' },
  { id: 'horsegram',        name: 'Kollu (Horsegram)',        emoji: '🟤', category: 'grain' },
  { id: 'parotta',          name: 'Parotta / Maida',          emoji: '🫓', category: 'grain' },

  // ── Leftovers (Zero Waste) ──
  { id: 'leftover_rice',    name: 'Pazhaiya Sadam (Old Rice)',  emoji: '🍚', category: 'leftovers' },
  { id: 'leftover_idli',    name: 'Meethi Idli (Leftover Idli)',emoji: '🥟', category: 'leftovers' },
  { id: 'sour_curd',        name: 'Pulitha Thayir (Sour Curd)', emoji: '🥛', category: 'leftovers' },

  // ── Batter States ──
  // This is the KEY feature: your batter status determines what tiffin you can make
  { id: 'batter_fresh',     name: '🥣 Fresh Batter (Just Ground)', emoji: '🥣', category: 'batter' },
  { id: 'batter_fermented', name: '🫧 Fermented Batter (Ready!)', emoji: '🫧', category: 'batter' },
  { id: 'batter_sour',      name: '⚡ Sour Batter (Over-fermented)', emoji: '⚡', category: 'batter' },
];

// ─── Dish Dataset ───────────────────────────────────────────────
const DISHES = [

  // ════════════════════════════════════════════════════════════════
  //  BREAKFAST — Batter-based Tiffin
  //  These dishes depend on your batter's fermentation state
  // ════════════════════════════════════════════════════════════════

  {
    id: 'idli',
    name: 'Soft Idli',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fermented'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Sambar & Coconut Chutney',
    steps: [
      'Grease idli plates with sesame oil',
      'Pour fermented batter into each mould',
      'Steam for 10–12 minutes',
      'Let rest 1 min, scoop with wet spoon',
      'Serve hot with sambar & chutney'
    ]
  },
  {
    id: 'dosai',
    name: 'Crispy Dosai',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fermented'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Sambar & Chutney',
    steps: [
      'Heat tawa on medium-high flame',
      'Pour a ladle of batter, spread in circles',
      'Drizzle oil around edges',
      'Cook till golden and crispy',
      'Fold and serve hot'
    ]
  },
  {
    id: 'ghee_roast_dosai',
    name: 'Nei Roast Dosai',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fermented', 'ghee'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Molagai Podi & Chutney',
    steps: [
      'Spread batter thin on hot tawa',
      'Add generous ghee on top',
      'Cook on medium flame till golden & crispy',
      'The ghee makes it extra aromatic',
      'Serve with podi or chutney'
    ]
  },
  {
    id: 'kal_dosai',
    name: 'Kal Dosai (Thick Dosai)',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fresh'],
    isVeg: true,
    prep_time: 12,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Chutney & Sambar',
    steps: [
      'Pour batter on hot tawa — don\'t spread too thin',
      'Cover and cook on medium-low flame',
      'Flip when top sets and bottom is golden',
      'Cook other side briefly',
      'Serve — soft inside, crispy outside'
    ]
  },
  {
    id: 'uthappam',
    name: 'Onion Uthappam',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fermented', 'onion', 'green_chili', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Sambar & Chutney',
    steps: [
      'Pour thick batter on tawa, spread slightly',
      'Sprinkle chopped onion, green chili, curry leaves on top',
      'Press toppings gently into batter',
      'Cover and cook till bottom is golden',
      'Flip carefully, cook 1 more minute'
    ]
  },
  {
    id: 'tomato_uthappam',
    name: 'Tomato Uthappam',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fermented', 'tomato', 'onion', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Coconut Chutney',
    steps: [
      'Spread batter thick on hot tawa',
      'Top with chopped tomato, onion, green chili',
      'Press toppings in, drizzle oil',
      'Cover & cook till set',
      'Flip and cook briefly'
    ]
  },
  {
    id: 'paniyaram',
    name: 'Kuzhi Paniyaram',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    // The BEST use for sour batter — saves it from waste!
    ingredients: ['batter_sour', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Coconut Chutney & Tomato Chutney',
    steps: [
      'Mix chopped onion, curry leaves, green chili into sour batter',
      'Add salt to taste (sour batter needs more salt)',
      'Heat paniyaram pan, add oil in each mould',
      'Pour batter into moulds, fill ¾ full',
      'Flip with a stick when bottom is golden — cook both sides'
    ]
  },
  {
    id: 'sweet_paniyaram',
    name: 'Inippu Paniyaram (Sweet)',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_sour', 'jaggery', 'coconut', 'ghee'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'As-is — perfect sweet snack',
    steps: [
      'Melt jaggery with little water, strain',
      'Mix jaggery syrup + grated coconut into sour batter',
      'Add a pinch of cardamom',
      'Grease paniyaram pan with ghee',
      'Pour batter, cook on low flame till golden on both sides'
    ]
  },
  {
    id: 'adai',
    name: 'Adai Dosai',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    // Fresh multi-dal batter — no fermentation needed!
    ingredients: ['batter_fresh', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Aviyal or Jaggery',
    steps: [
      'Mix chopped onion, curry leaves into fresh batter',
      'Heat tawa on medium flame',
      'Spread batter thick (thicker than dosai)',
      'Make a hole in center, add oil',
      'Cook covered on medium-low till crispy'
    ]
  },
  {
    id: 'ven_pongal',
    name: 'Ven Pongal',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['rice', 'moong_dal', 'ghee', 'curry_leaves'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Sambar & Coconut Chutney',
    steps: [
      'Dry roast moong dal till light golden',
      'Pressure cook rice + dal with extra water (3 whistles)',
      'Mash well while hot',
      'Temper with ghee, pepper, cumin, curry leaves, cashews',
      'Mix tempering in — serve hot & creamy'
    ]
  },
  {
    id: 'rava_upma',
    name: 'Rava Upma',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['rava', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Coconut Chutney',
    steps: [
      'Dry roast rava till light golden, set aside',
      'Temper mustard, urad dal, chana dal, curry leaves',
      'Add chopped onion, green chili — sauté',
      'Add 2.5 cups water, salt — bring to boil',
      'Add rava slowly while stirring, cook covered 3 min'
    ]
  },
  {
    id: 'vermicelli_upma',
    name: 'Semiya Upma',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['vermicelli', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Coconut Chutney',
    steps: [
      'Roast vermicelli in a drop of oil till golden',
      'In another pan, temper mustard, dal, curry leaves',
      'Sauté onion and green chili',
      'Add water (1:1 ratio), bring to boil',
      'Add roasted vermicelli, cover and cook 3 min'
    ]
  },
  {
    id: 'idiyappam',
    name: 'Idiyappam (String Hoppers)',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['rice_flour', 'coconut'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Coconut Milk or Egg Curry',
    steps: [
      'Boil water with salt, pour over rice flour',
      'Knead into smooth soft dough (not too stiff)',
      'Press through idiyappam maker onto greased plates',
      'Sprinkle grated coconut on top',
      'Steam for 5–7 minutes, serve hot'
    ]
  },
  {
    id: 'puttu',
    name: 'Puttu',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['rice_flour', 'coconut'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Kadala Curry or Banana',
    steps: [
      'Sprinkle water over rice flour, mix to crumbly texture',
      'Layer coconut and flour alternately in puttu maker',
      'Start with coconut, end with coconut',
      'Steam for 5–7 minutes',
      'Push out and serve with banana or curry'
    ]
  },
  {
    id: 'podi_dosai',
    name: 'Molagai Podi Dosai',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['batter_fermented', 'ghee'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'As-is — podi is the filling',
    steps: [
      'Spread batter thin on hot tawa',
      'Sprinkle molagai podi generously',
      'Drizzle ghee or sesame oil',
      'Cook till crispy golden',
      'Fold and serve — spicy & aromatic!'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  LUNCH — Full Meals (Saapaadu)
  //  Rice + Sambar/Rasam/Kuzhambu + Poriyal + Kootu
  // ════════════════════════════════════════════════════════════════

  {
    id: 'sambar',
    name: 'Sambar',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['toor_dal', 'onion', 'tomato', 'drumstick', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Rice, Idli, or Dosai',
    steps: [
      'Pressure cook toor dal (3 whistles), mash smooth',
      'Cut vegetables — drumstick, onion, tomato',
      'Soak tamarind, extract juice',
      'Boil vegetables in tamarind water with sambar powder',
      'Add mashed dal, temper with mustard & curry leaves'
    ]
  },
  {
    id: 'rasam',
    name: 'Thakkali Rasam',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['tomato', 'garlic', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Rice — comfort food',
    steps: [
      'Mash tomatoes, soak tamarind and extract juice',
      'Mix tomato, tamarind water, rasam powder, salt',
      'Bring to a boil — don\'t over-boil!',
      'Crush garlic, add to rasam',
      'Temper with mustard, curry leaves, dry chili — pour over'
    ]
  },
  {
    id: 'pepper_rasam',
    name: 'Milagu Rasam (Pepper Rasam)',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['tomato', 'garlic', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'hot',
    serves_with: 'Rice — best for cold/rain',
    steps: [
      'Grind pepper + cumin + garlic coarsely',
      'Mix tamarind water, tomato, and ground paste',
      'Add diluted dal water if available',
      'Boil till frothy — remove from heat immediately',
      'Temper with ghee, mustard, curry leaves'
    ]
  },
  {
    id: 'kara_kuzhambu',
    name: 'Kara Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['onion', 'tamarind', 'coconut', 'curry_leaves', 'okra'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Hot Rice',
    steps: [
      'Fry okra pieces in oil till half-cooked, set aside',
      'Grind coconut + dry chili paste',
      'Extract tamarind juice',
      'Cook onion, add tamarind water + ground paste',
      'Add fried okra, simmer 10 min — temper with mustard'
    ]
  },
  {
    id: 'vatha_kuzhambu',
    name: 'Vatha Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['tamarind', 'onion', 'garlic', 'curry_leaves'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Rice & Appalam',
    steps: [
      'Extract thick tamarind juice',
      'Temper mustard, fenugreek, dry chili, curry leaves',
      'Add small onions (pearl onions) — fry till golden',
      'Add tamarind water, sambar powder, jaggery pinch',
      'Simmer on low till oil separates & it thickens'
    ]
  },
  {
    id: 'mor_kuzhambu',
    name: 'Mor Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['curd', 'coconut', 'curry_leaves', 'okra'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice — cooling dish for summer',
    steps: [
      'Beat curd smooth with water',
      'Grind coconut + green chili + cumin to paste',
      'Cook okra/ash gourd pieces till tender',
      'Add ground paste + beaten curd — heat on low',
      'Don\'t boil! Temper with mustard, curry leaves'
    ]
  },
  {
    id: 'puli_kuzhambu',
    name: 'Puli Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['tamarind', 'onion', 'brinjal', 'curry_leaves', 'jaggery'],
    isVeg: true,
    prep_time: 35,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Rice & Appalam',
    steps: [
      'Extract thick tamarind juice',
      'Fry brinjal pieces in oil till soft',
      'In same oil, temper mustard, fenugreek, curry leaves',
      'Add onion, fry golden. Add tamarind water, sambar powder',
      'Add jaggery, fried brinjal — simmer till thick & glossy'
    ]
  },
  {
    id: 'keerai_kootu',
    name: 'Keerai Kootu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['spinach', 'moong_dal', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Rice',
    steps: [
      'Cook moong dal till soft, mash lightly',
      'Wash and chop spinach/keerai',
      'Cook keerai with little water till wilted',
      'Grind coconut + cumin + pepper to paste',
      'Combine dal + keerai + paste, temper with mustard & curry leaves'
    ]
  },
  {
    id: 'beans_poriyal',
    name: 'Beans Poriyal',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['beans', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice + Any Kuzhambu',
    steps: [
      'Cut beans into small pieces',
      'Temper mustard, urad dal, curry leaves',
      'Add beans, sprinkle water, cover & cook',
      'Stir occasionally — cook till tender but not mushy',
      'Add grated coconut last — mix and serve'
    ]
  },
  {
    id: 'potato_fry',
    name: 'Urulai Kizhangu Varuval',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['potato', 'curry_leaves', 'onion'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice & Sambar/Rasam',
    steps: [
      'Peel & dice potatoes into small cubes',
      'Temper mustard, urad dal, curry leaves, dried chili',
      'Add onion, sauté till translucent',
      'Add potato, turmeric, chili powder, salt',
      'Cover & cook on low — stir occasionally till crispy'
    ]
  },
  {
    id: 'vendakkai_poriyal',
    name: 'Vendakkai Poriyal',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['okra', 'coconut', 'curry_leaves', 'onion'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice + Sambar',
    steps: [
      'Wash, dry, and chop okra into rounds',
      'Temper mustard, urad dal, curry leaves',
      'Add onion, cook briefly',
      'Add okra — don\'t cover! Sauté on medium heat',
      'Add coconut once okra is cooked & not slimy'
    ]
  },
  {
    id: 'cabbage_poriyal',
    name: 'Muttaikose Poriyal',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['cabbage', 'coconut', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice + Sambar/Rasam',
    steps: [
      'Shred cabbage finely',
      'Temper mustard, urad dal, curry leaves, green chili',
      'Add cabbage, turmeric, salt',
      'Sprinkle water, cover & cook 5 min',
      'Add grated coconut, mix well — don\'t overcook!'
    ]
  },
  {
    id: 'paruppu_usili',
    name: 'Paruppu Usili',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['beans', 'toor_dal', 'chana_dal', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Rice — protein-rich side',
    steps: [
      'Soak toor + chana dal 30 min, grind coarse with chili',
      'Steam or microwave ground dal mixture till cooked',
      'Crumble steamed dal into small bits',
      'Cook chopped beans separately with turmeric',
      'Mix crumbled dal into cooked beans — temper with mustard & curry leaves'
    ]
  },
  {
    id: 'vazhaikai_varuval',
    name: 'Vazhaikai Varuval',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['raw_banana', 'curry_leaves', 'coconut'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Rice + Sambar',
    steps: [
      'Peel and slice raw banana into rounds',
      'Soak in turmeric water to prevent browning',
      'Temper mustard, urad dal, curry leaves',
      'Add banana slices, chili powder, salt',
      'Fry on medium heat till golden & crispy — add coconut last'
    ]
  },
  {
    id: 'drumstick_sambar',
    name: 'Murungakkai Sambar',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['drumstick', 'toor_dal', 'onion', 'tomato', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 35,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Rice — Sunday special',
    steps: [
      'Pressure cook toor dal, mash smooth',
      'Cut drumstick into finger-length pieces',
      'Cook drumstick in tamarind water with sambar powder',
      'Once drumstick is tender, add mashed dal',
      'Temper with mustard, fenugreek, curry leaves, asafoetida'
    ]
  },
  {
    id: 'curd_rice',
    name: 'Thayir Saadham (Curd Rice)',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['rice', 'curd', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Pickle — always the last course',
    steps: [
      'Use leftover rice or cook rice soft',
      'Mash rice slightly while warm',
      'Add curd + milk, mix well',
      'Temper mustard, urad dal, curry leaves, green chili, ginger',
      'Mix tempering in, add salt — best when chilled!'
    ]
  },
  {
    id: 'kathirikai_kootu',
    name: 'Kathirikai Kootu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['brinjal', 'chana_dal', 'coconut', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Rice + Rasam',
    steps: [
      'Soak chana dal, cook till half-done',
      'Cut brinjal into cubes',
      'Grind coconut + cumin + pepper to paste',
      'Cook brinjal with tamarind water & turmeric',
      'Add dal + coconut paste — temper with mustard & curry leaves'
    ]
  },
  {
    id: 'pudalangai_kootu',
    name: 'Pudalangai Kootu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['snake_gourd', 'moong_dal', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Rice + Rasam',
    steps: [
      'Peel and chop snake gourd, remove seeds',
      'Cook moong dal till soft',
      'Boil snake gourd pieces till tender',
      'Grind coconut + cumin to paste',
      'Combine all, temper with mustard & curry leaves'
    ]
  },
  {
    id: 'pavakkai_fry',
    name: 'Pavakkai Varuval',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['bitter_gourd', 'onion', 'curry_leaves'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Rice + Curd Rice',
    steps: [
      'Slice bitter gourd thin, rub with salt & turmeric',
      'Squeeze out bitter juice, set aside 10 min',
      'Heat oil, temper mustard, curry leaves',
      'Add onion, fry till golden',
      'Add bitter gourd slices, fry on medium heat till crispy'
    ]
  },
  {
    id: 'carrot_beans_poriyal',
    name: 'Carrot Beans Poriyal',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['carrot', 'beans', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice + Any Kuzhambu',
    steps: [
      'Dice carrot and beans into small pieces',
      'Temper mustard, urad dal, curry leaves',
      'Add vegetables, sprinkle water, cover & cook',
      'Cook till tender-crisp, not mushy',
      'Finish with grated coconut'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  DINNER — Tiffin Dinners & Light Meals
  //  Tamil families often have tiffin (dosai/idli) for dinner too
  // ════════════════════════════════════════════════════════════════

  {
    id: 'dinner_dosai',
    name: 'Dinner Dosai + Chutney',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['batter_fermented', 'coconut'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Coconut Chutney & Molagai Podi',
    steps: [
      'Make coconut chutney — grind coconut + green chili + ginger',
      'Spread batter thin on hot tawa',
      'Cook till golden & crispy',
      'Serve with fresh chutney & podi',
      'Quick, light dinner — perfect for weeknights'
    ]
  },
  {
    id: 'dinner_idli',
    name: 'Dinner Idli + Sambar',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['batter_fermented', 'toor_dal', 'onion'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Sambar & Chutney',
    steps: [
      'Steam idlis as usual (10-12 min)',
      'Make a quick sambar — dal + onion + tomato',
      'Or serve with leftover sambar from lunch',
      'Pair with coconut chutney',
      'Light, easy on the stomach — ideal dinner'
    ]
  },
  {
    id: 'dinner_paniyaram',
    name: 'Masala Paniyaram',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['batter_sour', 'onion', 'curry_leaves', 'green_chili', 'carrot'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Tomato Chutney',
    steps: [
      'Grate carrot, chop onion, curry leaves, green chili',
      'Mix everything into sour batter with salt',
      'Heat paniyaram pan, add oil in moulds',
      'Fill moulds ¾, cook on medium-low',
      'Flip when golden — serve hot with chutney'
    ]
  },
  {
    id: 'dinner_uthappam',
    name: 'Mixed Veg Uthappam',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['batter_fermented', 'onion', 'tomato', 'carrot', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Sambar or Chutney',
    steps: [
      'Dice onion, tomato, carrot finely',
      'Spread thick batter on hot tawa',
      'Top with all vegetables, press in gently',
      'Drizzle oil, cover and cook till golden',
      'Flip once — serve hot'
    ]
  },
  {
    id: 'chapathi',
    name: 'Chapathi',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['wheat_flour', 'ghee'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Kurma or Dal',
    steps: [
      'Knead wheat flour + water + salt to soft dough',
      'Rest 15 min covered',
      'Divide into balls, roll into thin circles',
      'Cook on hot tawa — flip when bubbles appear',
      'Press with cloth to puff, apply ghee'
    ]
  },
  {
    id: 'semiya_bath',
    name: 'Semiya Bath (Vermicelli)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['vermicelli', 'onion', 'carrot', 'beans', 'curry_leaves'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Raita or Chutney',
    steps: [
      'Dry roast thin vermicelli till light golden',
      'Temper mustard, urad dal, curry leaves, cashews',
      'Sauté onion, carrot, beans',
      'Add water (1.5x), bring to boil',
      'Add roasted vermicelli, cover & cook 3 min on low'
    ]
  },
  {
    id: 'rava_dosai',
    name: 'Rava Dosai',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    // No fermented batter needed! Perfect when batter is finished
    ingredients: ['rava', 'rice_flour', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Sambar & Coconut Chutney',
    steps: [
      'Mix rava + rice flour + maida (2:1:1) with water — thin batter',
      'Add chopped onion, curry leaves, cumin, pepper, green chili',
      'Let rest 15 min — batter should be very watery',
      'Pour on hot tawa by splashing/sprinkling (don\'t spread like dosai!)',
      'Add oil, cook till crispy — no need to flip'
    ]
  },
  {
    id: 'egg_dosai',
    name: 'Egg Dosai',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['batter_fermented', 'egg', 'onion', 'green_chili'],
    isVeg: false,
    prep_time: 12,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Onion Chutney',
    steps: [
      'Spread batter on hot tawa for dosai',
      'Crack egg on top, spread it over the dosai',
      'Sprinkle chopped onion, green chili, salt',
      'Drizzle oil, cook till bottom is crispy',
      'Fold in half — serve hot!'
    ]
  },

  // ── Non-Veg Dinner Classics ──

  {
    id: 'chicken_chettinad',
    name: 'Chettinad Chicken Curry',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['chicken', 'onion', 'tomato', 'coconut', 'curry_leaves', 'garlic'],
    isVeg: false,
    prep_time: 45,
    effort_level: 'high',
    spice_level: 'hot',
    serves_with: 'Rice or Chapathi',
    steps: [
      'Dry roast fennel, pepper, cloves, cinnamon, poppy seeds',
      'Grind roasted spices with coconut to paste',
      'Cook onion till dark golden, add tomato',
      'Add chicken pieces, ground paste, turmeric',
      'Cover & cook 25 min — finish with curry leaves'
    ]
  },
  {
    id: 'egg_curry',
    name: 'Muttai Kuzhambu (Egg Curry)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['egg', 'onion', 'tomato', 'coconut', 'curry_leaves', 'garlic'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Rice or Idiyappam',
    steps: [
      'Hard boil eggs, peel and slit',
      'Grind coconut + fennel + poppy seeds to paste',
      'Sauté onion, add tomato, cook till mushy',
      'Add ground paste + chili powder + turmeric',
      'Add boiled eggs, simmer 10 min in gravy'
    ]
  },
  {
    id: 'egg_poriyal',
    name: 'Egg Poriyal (Egg Bhurji)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['egg', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: false,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Dosai or Chapathi',
    steps: [
      'Temper mustard, curry leaves, green chili',
      'Sauté chopped onion till soft',
      'Add turmeric, chili powder',
      'Crack eggs directly in, scramble well',
      'Cook till set — quick protein side dish!'
    ]
  },
  {
    id: 'meen_kuzhambu',
    name: 'Meen Kuzhambu (Fish Curry)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['fish', 'tamarind', 'onion', 'tomato', 'curry_leaves', 'garlic'],
    isVeg: false,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Hot Rice',
    steps: [
      'Clean fish, marinate with turmeric + salt',
      'Extract tamarind juice',
      'Temper mustard, fenugreek, curry leaves',
      'Add onion, tomato, cook with tamarind water + chili powder',
      'Add fish pieces, cook on low 10 min — don\'t stir/break fish'
    ]
  },
  {
    id: 'meen_varuval',
    name: 'Meen Varuval (Fish Fry)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['fish', 'garlic', 'curry_leaves'],
    isVeg: false,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'hot',
    serves_with: 'Rice + Rasam',
    steps: [
      'Marinate fish with chili powder, turmeric, garlic paste, salt',
      'Add lemon juice, rest 15 min',
      'Heat oil in kadai',
      'Shallow fry fish on medium heat — flip once',
      'Cook till golden & crispy on both sides'
    ]
  },
  {
    id: 'eral_masala',
    name: 'Eral Masala (Prawn Masala)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['prawn', 'onion', 'tomato', 'curry_leaves', 'garlic', 'coconut'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Rice or Dosai',
    steps: [
      'Clean and devein prawns, marinate with turmeric',
      'Sauté onion till golden, add tomato',
      'Add chili powder, coriander powder, garam masala',
      'Add prawns — they cook fast! 5-7 min',
      'Finish with coconut and curry leaves'
    ]
  },
  {
    id: 'kozhi_varuval',
    name: 'Kozhi Varuval (Chicken Fry)',
    cuisine_type: 'Tamil',
    meal_type: 'dinner',
    ingredients: ['chicken', 'onion', 'curry_leaves', 'garlic', 'green_chili'],
    isVeg: false,
    prep_time: 35,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Rice or Chapathi',
    steps: [
      'Marinate chicken with chili powder, turmeric, ginger-garlic paste',
      'Heat oil, temper curry leaves',
      'Add onion, cook till dark golden',
      'Add marinated chicken, cook covered on medium',
      'Uncover and fry on high till dry & crispy'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  SNACKS — Evening Bajji/Bonda Time
  // ════════════════════════════════════════════════════════════════

  {
    id: 'vazhaikai_bajji',
    name: 'Vazhaikkai Bajji',
    cuisine_type: 'Tamil',
    meal_type: 'snack',
    ingredients: ['raw_banana', 'rice_flour', 'green_chili'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Tea — rainy day classic',
    steps: [
      'Slice raw banana into thin rounds',
      'Make batter: rice flour + chili powder + salt + water',
      'Dip banana slices in batter',
      'Deep fry in hot oil till golden',
      'Serve hot with evening tea! ☕'
    ]
  },
  {
    id: 'onion_pakoda',
    name: 'Vengaya Pakoda',
    cuisine_type: 'Tamil',
    meal_type: 'snack',
    ingredients: ['onion', 'rice_flour', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Tea — must with rain',
    steps: [
      'Slice onion thin, add salt — rest 5 min to release moisture',
      'Add rice flour, chana flour, curry leaves, chili',
      'Mix with minimal water — use onion\'s own moisture',
      'Drop spoonfuls into hot oil',
      'Fry till deep golden & crunchy'
    ]
  },
  {
    id: 'medhu_vadai',
    name: 'Medhu Vadai',
    cuisine_type: 'Tamil',
    meal_type: 'snack',
    ingredients: ['urad_dal', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'high',
    spice_level: 'mild',
    serves_with: 'Sambar & Coconut Chutney',
    steps: [
      'Soak urad dal 3 hours, drain well',
      'Grind to thick fluffy batter — add minimal water',
      'Add chopped onion, curry leaves, pepper, cumin, green chili',
      'Wet hands, shape into donuts with hole in center',
      'Slide into hot oil — fry on medium till deep golden'
    ]
  },
  {
    id: 'rava_kesari',
    name: 'Rava Kesari',
    cuisine_type: 'Tamil',
    meal_type: 'snack',
    ingredients: ['rava', 'ghee', 'jaggery'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'As-is — sweet treat',
    steps: [
      'Roast rava in ghee till golden & aromatic',
      'Dissolve jaggery in warm water, strain',
      'Boil jaggery water, add roasted rava slowly',
      'Stir continuously to avoid lumps',
      'Cook till it comes together, add ghee & cardamom'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  LEFTOVER RESCUE
  // ════════════════════════════════════════════════════════════════
  {
    id: 'lemon_rice',
    name: 'Elumichai Sadam (Lemon Rice)',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['leftover_rice', 'green_chili', 'curry_leaves', 'turmeric', 'mustard'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Potato Fry & Pickle',
    steps: [
      'Crumble leftover rice so it is grain-separated',
      'Temper mustard, chana dal, peanuts, curry leaves, green chili',
      'Turn off heat, add turmeric and squeeze fresh lemon juice',
      'Mix thoroughly with rice and salt'
    ]
  },
  {
    id: 'idli_upma',
    name: 'Idli Upma',
    cuisine_type: 'Tamil',
    meal_type: 'breakfast',
    ingredients: ['leftover_idli', 'onion', 'curry_leaves', 'green_chili', 'mustard'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Chutney or Podi',
    steps: [
      'Crumble the leftover cold idlis into small pieces',
      'Temper mustard, urad dal, curry leaves',
      'Sauté chopped onions and green chili until soft',
      'Add crumbled idli, a dash of turmeric, and toss well'
    ]
  },
  {
    id: 'mor_kuzhambu_leftover',
    name: 'Mor Kuzhambu (Sour Curd)',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['sour_curd', 'coconut', 'green_chili', 'cumin', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    serves_with: 'Rice & Beans Poriyal',
    steps: [
      'Whisk leftover sour curd with water and salt',
      'Grind coconut, cumin, and green chili to a fine paste',
      'Mix paste into curd and gently warm on stove (Do not boil!)',
      'Temper mustard and curry leaves in coconut oil and pour over'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  NON-VEG / REGIONAL SPECIALS
  // ════════════════════════════════════════════════════════════════
  {
    id: 'chettinad_chicken',
    name: 'Chettinad Kozhi Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['chicken', 'onion', 'tomato', 'ginger', 'garlic', 'fennel', 'whole_spices', 'coconut'],
    isVeg: false,
    prep_time: 40,
    effort_level: 'high',
    spice_level: 'hot',
    serves_with: 'White Rice & Rasam',
    steps: [
      'Dry roast fennel, whole spices, coriander, and coconut, then grind to a fine paste',
      'Temper oil with fennel and curry leaves, sauté onions and ginger-garlic paste',
      'Add chicken and tomatoes, cook until chicken seals',
      'Mix in the ground masala, salt, and water',
      'Simmer until oil floats on top and chicken is tender'
    ]
  },
  {
    id: 'pepper_chicken',
    name: 'Pepper Chicken Fry',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['chicken', 'onion', 'pepper', 'ginger', 'garlic', 'curry_leaves', 'fennel'],
    isVeg: false,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Rasam Rice or Chapati',
    steps: [
      'Marinate chicken briefly with turmeric and salt',
      'Coarsely grind fresh black pepper and fennel seeds',
      'Fry onions until brown, add ginger-garlic paste and curry leaves',
      'Toss in chicken, cook dry in its own juices',
      'Finish with the heavy pepper-fennel powder and roast till dark'
    ]
  },
  {
    id: 'pallipalayam_chicken',
    name: 'Pallipalayam Kozhi Varuval',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['chicken', 'coconut', 'garlic', 'curry_leaves', 'turmeric'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Curd Rice',
    steps: [
      'Do not use onions! Heat sesame oil and fry loads of crushed garlic and dry red chilies',
      'Add chicken pieces, turmeric, and salt; sauté well',
      'Add a splash of water, cover and cook until done',
      'Throw in fresh coconut slivers and roast until the dish is entirely dry'
    ]
  },
  {
    id: 'mutton_chukka',
    name: 'Mutton Chukka',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['mutton', 'onion', 'pepper', 'fennel', 'curry_leaves', 'ginger', 'garlic'],
    isVeg: false,
    prep_time: 45,
    effort_level: 'high',
    spice_level: 'hot',
    serves_with: 'Sambar & Rice',
    steps: [
      'Pressure cook mutton with turmeric and ginger-garlic paste until tender',
      'Dry roast and grind fennel, pepper, and cumin',
      'Sauté shallots in gingelly oil until translucent',
      'Add the cooked mutton (without water) and the ground spice mix',
      'Roast continually on low heat until dark, dry, and aromatic'
    ]
  },
  {
    id: 'mutton_kuzhambu',
    name: 'Mutton Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['mutton', 'onion', 'tomato', 'potato', 'ginger', 'garlic', 'coconut', 'whole_spices'],
    isVeg: false,
    prep_time: 50,
    effort_level: 'high',
    spice_level: 'medium',
    serves_with: 'White Rice, Idli or Dosai',
    steps: [
      'Heat oil with whole spices, sauté onions, tomatoes, and ginger-garlic paste',
      'Add mutton pieces and sauté for 5 minutes',
      'Add masala powders, potato cubes, and water; pressure cook',
      'Grind coconut to a milk/paste and stir it in at the end',
      'Simmer for 5 minutes and garnish with coriander'
    ]
  },
  {
    id: 'meen_kuzhambu',
    name: 'Meen Kuzhambu (Fish Gravy)',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['fish', 'tamarind', 'onion', 'tomato', 'garlic', 'green_chili', 'curry_leaves'],
    isVeg: false,
    prep_time: 35,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Hot White Rice (Tastes better next day!)',
    steps: [
      'Extract thick tamarind juice',
      'Temper mustard, fenugreek, and lots of garlic cloves',
      'Fry onions and tomatoes into a mush, add tamarind water and bring to an intense boil',
      'Lower heat, gently drop in fish pieces and simmer for exactly 7-10 minutes',
      'Turn off heat and let it rest (do not stir aggressively!)'
    ]
  },
  {
    id: 'muttai_thokku',
    name: 'Muttai Thokku',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['egg', 'onion', 'tomato', 'ginger', 'garlic', 'curry_leaves'],
    isVeg: false,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Chapati, Dosai or Rice',
    steps: [
      'Hard boil the eggs, peel, and make small slits in the whites',
      'Sauté finely chopped onions and tomatoes until they melt into a paste',
      'Add ginger-garlic paste, chili powder, and salt',
      'Drop in the boiled eggs and coat them thoroughly in the thick masala gravy'
    ]
  },
  {
    id: 'drop_egg_curry',
    name: 'Udaithu Oothina Muttai Kuzhambu',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['egg', 'onion', 'tomato', 'coconut', 'ginger', 'garlic', 'fennel'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'White Rice or Idiyappam',
    steps: [
      'Prepare a boiling gravy base using onions, tomatoes, and ground coconut-fennel paste',
      'Turn the heat down to a gentle simmer',
      'Crack raw eggs directly into the bubbling gravy (do not stir!)',
      'Cover and cook for 5-7 minutes until eggs are perfectly poached in the masala'
    ]
  },
  {
    id: 'prawn_thokku',
    name: 'Eral Thokku (Prawn Masala)',
    cuisine_type: 'Tamil',
    meal_type: 'lunch',
    ingredients: ['prawn', 'onion', 'tomato', 'ginger', 'garlic', 'fennel', 'curry_leaves'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'low',
    spice_level: 'hot',
    serves_with: 'Rasam Rice',
    steps: [
      'Clean and devein prawns (they cook very fast!)',
      'Temper fennel seeds and curry leaves',
      'Sauté onions and tomatoes heavily to form a thick jam-like base',
      'Add prawns and cook on medium-high for just 5-7 minutes until they curl',
      'Finish with pepper and serve immediately'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  THE GRAND BIRYANI UNIVERSE (Pan-India)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'hyderabadi_dum_biryani',
    name: 'Hyderabadi Dum Biryani',
    cuisine_type: 'Andhra/Telangana',
    meal_type: 'lunch',
    ingredients: ['chicken', 'basmati_rice', 'mint_leaves', 'curd', 'onion', 'ginger', 'garlic', 'whole_spices'],
    isVeg: false,
    prep_time: 90,
    effort_level: 'high',
    spice_level: 'hot',
    serves_with: 'Mirchi Ka Salan & Onion Raita',
    steps: [
      'Deep fry thinly sliced onions until golden brown (Birista)',
      'Marinate raw chicken overnight with curd, half the birista, mint, and whole spices',
      'Boil basmati rice with whole spices until exactly 70% cooked and drain',
      'Layer the raw marinated meat with the par-boiled rice in a heavy-bottom pot',
      'Seal with dough (Dum) and cook on very low flame for 45 mins'
    ]
  },
  {
    id: 'dindigul_biryani',
    name: 'Dindigul Thalappakatti Biryani',
    cuisine_type: 'Tamil (Madurai region)',
    meal_type: 'lunch',
    ingredients: ['mutton', 'seeraga_samba', 'pepper', 'curd', 'mint_leaves', 'ginger', 'garlic', 'onion'],
    isVeg: false,
    prep_time: 60,
    effort_level: 'high',
    spice_level: 'hot',
    serves_with: 'Dalcha & Onion Raita',
    steps: [
      'Grind small onions (shallots), ginger, and garlic into a coarse paste',
      'Do NOT use tomatoes. Sauté the shallot paste with generous ghee and whole spices',
      'Add mutton pieces and cook with curd, heavy black pepper, and mint',
      'Once meat is 80% tender, add soaking Seeraga Samba rice and exact water',
      'Dum for 20 mins until the tiny grains absorb the rich meat stock'
    ]
  },
  {
    id: 'ambur_biryani',
    name: 'Ambur Mutton Biryani',
    cuisine_type: 'Tamil (North Arcot)',
    meal_type: 'lunch',
    ingredients: ['mutton', 'seeraga_samba', 'tomato', 'onion', 'mint_leaves', 'ginger', 'garlic', 'curd'],
    isVeg: false,
    prep_time: 75,
    effort_level: 'high',
    spice_level: 'medium',
    serves_with: 'Brinjal Ennai Kathirikai (Pachadi)',
    steps: [
      'Make a vibrant red paste by soaking and grinding dried red chilies',
      'Unlike Dindigul, use large quantities of tomatoes and onions in a 1:1 ratio',
      'Cook the mutton in the tomato-red chili base until oil separates',
      'Par-boil Seeraga Samba rice separately (do not mix raw rice and water into meat)',
      'Layer the cooked meat gravy and cooked rice, then dum for 15 mins'
    ]
  },
  {
    id: 'kolkata_biryani',
    name: 'Kolkata Biryani',
    cuisine_type: 'Bengali/Awadhi',
    meal_type: 'lunch',
    ingredients: ['chicken', 'basmati_rice', 'potato', 'egg', 'onion', 'whole_spices', 'curd'],
    isVeg: false,
    prep_time: 80,
    effort_level: 'high',
    spice_level: 'mild',
    serves_with: 'Chicken Chaap & Salad',
    steps: [
      'Very lightly spice the chicken with subtle aromatics (no heavy chili or mint)',
      'Deep fry large potato halves until golden, then simmer them in the meat stock',
      'Par-boil basmati rice with whole spices',
      'Layer meat, the flavor-soaked potatoes, boiled eggs, and rice',
      'Drizzle heavily with rose water/kewra and dum. The hero here is the potato!'
    ]
  },
  {
    id: 'donne_biryani',
    name: 'Bengaluru Donne Biryani',
    cuisine_type: 'Karnataka',
    meal_type: 'lunch',
    ingredients: ['chicken', 'seeraga_samba', 'mint_leaves', 'coriander', 'green_chili', 'ginger', 'garlic'],
    isVeg: false,
    prep_time: 50,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Cucumber Raita & Half-Boil Egg',
    steps: [
      'Grind massive amounts of mint, coriander, and green chilies into a pure green paste',
      'Sauté the green paste in oil until the raw smell completely vanishes',
      'Add chicken and cook in the green masala',
      'Add short-grain Seeraga Samba rice directly into the green broth',
      'Cook until water is absorbed and serve strictly in a dried leaf bowl (Donne)'
    ]
  },
  {
    id: 'lucknowi_biryani',
    name: 'Awadhi (Lucknowi) Biryani',
    cuisine_type: 'Awadhi',
    meal_type: 'lunch',
    ingredients: ['mutton', 'basmati_rice', 'curd', 'whole_spices', 'onion', 'ginger', 'garlic'],
    isVeg: false,
    prep_time: 90,
    effort_level: 'high',
    spice_level: 'mild',
    serves_with: 'Burhani Raita',
    steps: [
      'Make a delicate Yakhni (mutton broth) using whole spices and soft cuts of meat',
      'Strain the broth so it is completely smooth and free of whole spices',
      'Cook the basmati rice directly in this meat milk/broth',
      'Layer the cooked meat and the flavored rice in copper vessels',
      'Seal tightly with dough and let the subtle floral aromas steep into the rice'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  THE REGIONAL EXPERIENCES (Kongu, Chettinad, Madurai, Nanjil)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'kongu_paruppu_sadam',
    name: 'Kongu Arisi Paruppu Sadam',
    cuisine_type: 'Kongunadu',
    meal_type: 'lunch',
    ingredients: ['rice', 'toor_dal', 'onion', 'tomato', 'garlic', 'cumin'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'medium',
    serves_with: 'Potato Fry & Ghee',
    steps: [
      'In a pressure cooker, temper mustard, cumin, and lots of garlic in coconut oil',
      'Sauté shallots and tomatoes until soft',
      'Add soaked rice, toor dal, turmeric, and exact 1:3 water ratio',
      'Pressure cook for 3 whistles until extremely mushy and flavourful',
      'Serve hot with a massive spoonful of pure ghee'
    ]
  },
  {
    id: 'kollu_rasam',
    name: 'Kongunadu Kollu Rasam (Horsegram)',
    cuisine_type: 'Kongunadu',
    meal_type: 'lunch',
    ingredients: ['horsegram', 'tamarind', 'tomato', 'garlic', 'pepper', 'cumin', 'coriander'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'White Rice',
    steps: [
      'Dry roast horsegram and pressure cook until extremely soft (save the dark water!)',
      'Grind half the cooked horsegram with pepper, garlic, and cumin into a paste',
      'Mix the paste, tamarind extract, and the horsegram water together',
      'Temper with mustard and curry leaves, then simmer until frothy (Do not boil hard!)'
    ]
  },
  {
    id: 'vellai_kurma',
    name: 'Chettinad Vellai Kurma',
    cuisine_type: 'Chettinad',
    meal_type: 'dinner',
    ingredients: ['cashews', 'coconut', 'potato', 'carrot', 'beans', 'fennel', 'green_chili'],
    isVeg: true,
    prep_time: 40,
    effort_level: 'high',
    spice_level: 'mild',
    serves_with: 'Idiyappam or Parotta',
    steps: [
      'Soak cashews and grind them into a rich, silky paste with fresh coconut and fennel seeds',
      'Boil chopped root vegetables until barely tender (Do NOT use turmeric or red chili!)',
      'Temper whole spices in oil, add the vegetables and the white cashew-coconut paste',
      'Simmer gently until the oil shines through the pure white gravy'
    ]
  },
  {
    id: 'kanyakumari_avial',
    name: 'Nanjil Nadu Avial',
    cuisine_type: 'Nanjil Nadu',
    meal_type: 'lunch',
    ingredients: ['carrot', 'beans', 'raw_banana', 'drumstick', 'coconut', 'curd', 'cumin', 'coconut_oil'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'mild',
    serves_with: 'Adai or Rice',
    steps: [
      'Chop all vegetables into identical long batons',
      'Cook them in minimum water until just fork-tender',
      'Grind coconut, green chilies, and cumin without water',
      'Mix the paste and sour curd into the vegetables off the heat',
      'Finish by drizzling raw coconut oil and adding fresh curry leaves'
    ]
  },
  {
    id: 'nandu_masala',
    name: 'Nanjil Nandu (Crab) Roast',
    cuisine_type: 'Nanjil Nadu',
    meal_type: 'lunch',
    ingredients: ['crab', 'coconut', 'fennel', 'pepper', 'onion', 'tomato', 'ginger', 'garlic'],
    isVeg: false,
    prep_time: 40,
    effort_level: 'high',
    spice_level: 'hot',
    serves_with: 'White Rice',
    steps: [
      'Clean crab thoroughly (retain the claws)',
      'Sauté onions, tomatoes, and ginger-garlic paste into a heavy dark masala',
      'Toss the crab in the masala and cook covered; it will release its own sweet juices',
      'Finish by heavily coating the crab in a dry roasted coconut-fennel-pepper paste'
    ]
  },
  {
    id: 'madurai_kari_dosa',
    name: 'Madurai Kari Dosa',
    cuisine_type: 'Madurai',
    meal_type: 'dinner',
    ingredients: ['batter_fermented', 'mutton', 'egg', 'onion', 'pepper', 'ginger', 'garlic'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Mutton Salna',
    steps: [
      'Pour a thick kal dosa onto a hot tawa (do not spread it too thin)',
      'Beat an egg with pepper and salt, and pour it evenly over the wet dosa',
      'Immediately top with heavily spiced semi-dry mutton minced chukka/kheema',
      'Drizzle with oil or ghee, flip carefully, and roast until the meat side chars slightly'
    ]
  },
  {
    id: 'kothu_parotta',
    name: 'Madurai Kothu Parotta',
    cuisine_type: 'Madurai',
    meal_type: 'dinner',
    ingredients: ['parotta', 'chicken', 'egg', 'onion', 'tomato', 'curry_leaves', 'pepper'],
    isVeg: false,
    prep_time: 20,
    effort_level: 'medium',
    spice_level: 'hot',
    serves_with: 'Onion Raita',
    steps: [
      'Shred flaky parottas into small bite-sized pieces',
      'Fry onions, tomatoes, and curry leaves heavily on a flat tawa',
      'Pour in beaten eggs and scramble them directly on the tawa',
      'Add shredded parotta and chicken salna (gravy), then beat/chop them aggressively together until completely mixed'
    ]
  },
  {
    id: 'vathal_kuzhambu',
    name: 'Agraharam Vathal Kuzhambu',
    cuisine_type: 'Agraharam',
    meal_type: 'lunch',
    ingredients: ['vathal', 'tamarind', 'asafoetida', 'mustard', 'jaggery', 'curry_leaves'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'medium',
    serves_with: 'Rice & Appalam',
    steps: [
      'Strictly NO ONION OR GARLIC! Extract a very thick, dark tamarind juice',
      'Roast the dried turkey berries (vathal) in sesame oil until almost black, keep aside',
      'Temper mustard, fenugreek, and a large pinch of asafoetida (hing)',
      'Pour in tamarind juice, basic chili powders, and boil heavily until it reduces and thickens',
      'Add roasted vathal and a tiny piece of jaggery to balance the tanginess'
    ]
  }
];
