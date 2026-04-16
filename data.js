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
  { id: 'egg',              name: 'Muttai (Egg)',             emoji: '🥚', category: 'protein' },
  { id: 'fish',             name: 'Meen (Fish)',              emoji: '🐟', category: 'protein' },
  { id: 'prawn',            name: 'Eral (Prawn)',             emoji: '🦐', category: 'protein' },

  // ── Pantry Staples ──
  { id: 'coconut',          name: 'Thengai (Coconut)',        emoji: '🥥', category: 'pantry' },
  { id: 'curry_leaves',     name: 'Karuveppilai',             emoji: '🌿', category: 'pantry' },
  { id: 'tamarind',         name: 'Puli (Tamarind)',          emoji: '🟤', category: 'pantry' },
  { id: 'curd',             name: 'Thayir (Curd)',            emoji: '🥛', category: 'pantry' },
  { id: 'garlic',           name: 'Poondu (Garlic)',          emoji: '🧄', category: 'pantry' },
  { id: 'green_chili',      name: 'Pachai Milagai',           emoji: '🌶️', category: 'pantry' },
  { id: 'ghee',             name: 'Nei (Ghee)',               emoji: '🧈', category: 'pantry' },
  { id: 'jaggery',          name: 'Vellam (Jaggery)',         emoji: '🟫', category: 'pantry' },

  // ── Grains & Dals ──
  { id: 'rice',             name: 'Arisi (Rice)',             emoji: '🍚', category: 'grain' },
  { id: 'toor_dal',         name: 'Thuvaram Paruppu',         emoji: '🟡', category: 'grain' },
  { id: 'moong_dal',        name: 'Payatham Paruppu',         emoji: '🟢', category: 'grain' },
  { id: 'chana_dal',        name: 'Kadalai Paruppu',          emoji: '🟤', category: 'grain' },
  { id: 'urad_dal',         name: 'Ulutham Paruppu',          emoji: '⚪', category: 'grain' },
  { id: 'rava',             name: 'Rava (Semolina)',          emoji: '🌾', category: 'grain' },
  { id: 'rice_flour',       name: 'Arisi Maavu',              emoji: '🍘', category: 'grain' },
  { id: 'wheat_flour',      name: 'Godhumai Maavu',           emoji: '🌾', category: 'grain' },
  { id: 'vermicelli',       name: 'Semiya',                   emoji: '🍝', category: 'grain' },

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
];
