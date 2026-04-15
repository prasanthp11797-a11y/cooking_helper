/**
 * What to Cook Today? — Dish Dataset
 * 32 authentic South Indian home-style dishes (Tamil Nadu + Andhra)
 */

// ─── Ingredient Catalog ────────────────────────────────────────
const INGREDIENTS = [
  { id: 'onion',       name: 'Onion',       emoji: '🧅' },
  { id: 'tomato',      name: 'Tomato',      emoji: '🍅' },
  { id: 'potato',      name: 'Potato',      emoji: '🥔' },
  { id: 'brinjal',     name: 'Brinjal',     emoji: '🍆' },
  { id: 'drumstick',   name: 'Drumstick',   emoji: '🥒' },
  { id: 'coconut',     name: 'Coconut',     emoji: '🥥' },
  { id: 'curry_leaves', name: 'Curry Leaves', emoji: '🌿' },
  { id: 'tamarind',    name: 'Tamarind',    emoji: '🟤' },
  { id: 'chicken',     name: 'Chicken',     emoji: '🍗' },
  { id: 'egg',         name: 'Egg',         emoji: '🥚' },
  { id: 'okra',        name: 'Okra',        emoji: '🫑' },
  { id: 'spinach',     name: 'Spinach',     emoji: '🥬' },
  { id: 'beans',       name: 'Beans',       emoji: '🫘' },
  { id: 'cabbage',     name: 'Cabbage',     emoji: '🥗' },
  { id: 'toor_dal',    name: 'Toor Dal',    emoji: '🟡' },
  { id: 'moong_dal',   name: 'Moong Dal',   emoji: '🟢' },
  { id: 'raw_banana',  name: 'Raw Banana',  emoji: '🍌' },
  { id: 'curd',        name: 'Curd',        emoji: '🥛' },
  { id: 'garlic',      name: 'Garlic',      emoji: '🧄' },
  { id: 'green_chili', name: 'Green Chili', emoji: '🌶️' },
  { id: 'peanuts',     name: 'Peanuts',     emoji: '🥜' },
  { id: 'gongura',     name: 'Gongura',     emoji: '🍃' },
];

// ─── Dish Dataset ───────────────────────────────────────────────
const DISHES = [

  // ════════════════════════════════════════════════════════════════
  //  TAMIL NADU DISHES (16)
  // ════════════════════════════════════════════════════════════════

  {
    id: 'tn01',
    name: 'Sambar',
    cuisine_type: 'Tamil',
    ingredients: ['toor_dal', 'onion', 'tomato', 'drumstick', 'tamarind', 'curry_leaves', 'coconut'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'medium',
    steps: [
      'Cook toor dal until soft, set aside.',
      'Sauté onion, tomato, drumstick in oil with mustard seeds and curry leaves.',
      'Add tamarind water, sambar powder, and salt. Boil 10 min.',
      'Mix in cooked dal and ground coconut paste. Simmer 5 min.',
      'Temper with mustard, curry leaves, and dried chili.'
    ]
  },
  {
    id: 'tn02',
    name: 'Tomato Rasam',
    cuisine_type: 'Tamil',
    ingredients: ['tomato', 'garlic', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'medium',
    steps: [
      'Boil tomatoes until soft, mash well.',
      'Add tamarind water, crushed garlic, pepper, and cumin.',
      'Bring to a rolling boil for 5 min.',
      'Temper with mustard seeds, curry leaves, and dried chili.',
      'Serve hot with rice.'
    ]
  },
  {
    id: 'tn03',
    name: 'Keerai Kootu',
    cuisine_type: 'Tamil',
    ingredients: ['spinach', 'moong_dal', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    steps: [
      'Cook moong dal until soft.',
      'Wash and chop spinach, cook with little water.',
      'Grind coconut with cumin and pepper.',
      'Combine dal, spinach, and coconut paste. Simmer 5 min.',
      'Temper with mustard, curry leaves, and urad dal.'
    ]
  },
  {
    id: 'tn04',
    name: 'Beans Poriyal',
    cuisine_type: 'Tamil',
    ingredients: ['beans', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    steps: [
      'Chop beans into small pieces and cook until tender.',
      'Heat oil, add mustard seeds, urad dal, and curry leaves.',
      'Add cooked beans, salt, and turmeric. Sauté 3 min.',
      'Add grated coconut, toss well. Serve.'
    ]
  },
  {
    id: 'tn05',
    name: 'Potato Fry',
    cuisine_type: 'Tamil',
    ingredients: ['potato', 'curry_leaves', 'onion'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'mild',
    steps: [
      'Peel and dice potatoes into small cubes.',
      'Heat oil, add mustard, curry leaves, and sliced onion.',
      'Add potato, turmeric, chili powder, and salt.',
      'Cover and cook on low until crispy and golden.'
    ]
  },
  {
    id: 'tn06',
    name: 'Kara Kuzhambu',
    cuisine_type: 'Tamil',
    ingredients: ['onion', 'tamarind', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Grind coconut with coriander, chili, and cumin to a paste.',
      'Sauté chopped onion until golden.',
      'Add tamarind water, ground paste, turmeric, and salt.',
      'Boil for 15 min until thick.',
      'Temper with mustard, curry leaves, and fenugreek.'
    ]
  },
  {
    id: 'tn07',
    name: 'Mor Kuzhambu',
    cuisine_type: 'Tamil',
    ingredients: ['curd', 'coconut', 'curry_leaves', 'okra'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'mild',
    steps: [
      'Grind coconut with cumin and green chili.',
      'Whisk curd until smooth, mix with ground paste.',
      'Fry okra pieces until light golden.',
      'Add curd mixture, bring to a gentle boil (don\'t overheat).',
      'Temper with mustard, curry leaves, and dried chili.'
    ]
  },
  {
    id: 'tn08',
    name: 'Egg Poriyal',
    cuisine_type: 'Tamil',
    ingredients: ['egg', 'onion', 'curry_leaves', 'coconut'],
    isVeg: false,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    steps: [
      'Boil eggs, peel and chop into small pieces.',
      'Heat oil, add mustard seeds and curry leaves.',
      'Add chopped onion, sauté until soft.',
      'Add egg, turmeric, chili powder, and grated coconut. Toss well.'
    ]
  },
  {
    id: 'tn09',
    name: 'Chicken Chettinad',
    cuisine_type: 'Tamil',
    ingredients: ['chicken', 'onion', 'tomato', 'coconut', 'curry_leaves', 'garlic'],
    isVeg: false,
    prep_time: 45,
    effort_level: 'high',
    spice_level: 'hot',
    steps: [
      'Dry roast and grind fennel, pepper, cinnamon, cloves, and coconut.',
      'Sauté onion, garlic, and tomato until soft.',
      'Add chicken pieces, turmeric, and salt. Cook 5 min.',
      'Add ground masala and curry leaves. Cover and cook 25 min.',
      'Garnish with fresh curry leaves and serve.'
    ]
  },
  {
    id: 'tn10',
    name: 'Vendakkai Poriyal',
    cuisine_type: 'Tamil',
    ingredients: ['okra', 'coconut', 'curry_leaves', 'onion'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'mild',
    steps: [
      'Wash okra, pat dry, and chop into rounds.',
      'Heat oil, add mustard seeds, urad dal, and curry leaves.',
      'Add okra and chopped onion, sauté on medium heat.',
      'Add turmeric, chili powder, salt. Cook until crispy.',
      'Finish with grated coconut.'
    ]
  },
  {
    id: 'tn11',
    name: 'Paruppu Usili',
    cuisine_type: 'Tamil',
    ingredients: ['beans', 'toor_dal', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'medium',
    steps: [
      'Soak toor dal for 1 hour. Grind coarsely with chili and cumin.',
      'Steam the dal paste until cooked, then crumble.',
      'Cook beans until tender.',
      'Sauté crumbled dal with beans, curry leaves, and seasoning.',
      'Mix well and serve as a dry side dish.'
    ]
  },
  {
    id: 'tn12',
    name: 'Thakkali Kuzhambu',
    cuisine_type: 'Tamil',
    ingredients: ['tomato', 'onion', 'tamarind', 'coconut', 'curry_leaves'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'medium',
    steps: [
      'Sauté sliced onion until golden.',
      'Add chopped tomatoes, cook until mushy.',
      'Add tamarind water, sambar powder, salt, and turmeric.',
      'Simmer for 15 min until gravy thickens.',
      'Temper with mustard, curry leaves, and fenugreek seeds.'
    ]
  },
  {
    id: 'tn13',
    name: 'Vazhaikai Varuval',
    cuisine_type: 'Tamil',
    ingredients: ['raw_banana', 'curry_leaves', 'coconut'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'medium',
    steps: [
      'Peel and slice raw banana into thin rounds.',
      'Heat oil, add mustard seeds and curry leaves.',
      'Add banana slices with turmeric, chili powder, and salt.',
      'Fry on medium heat until golden and crispy.',
      'Finish with a sprinkle of grated coconut.'
    ]
  },
  {
    id: 'tn14',
    name: 'Cabbage Poriyal',
    cuisine_type: 'Tamil',
    ingredients: ['cabbage', 'coconut', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'mild',
    steps: [
      'Finely shred cabbage and wash well.',
      'Heat oil, add mustard, urad dal, and curry leaves.',
      'Add slit green chili and shredded cabbage.',
      'Cover and cook on low for 8 min. Add grated coconut. Serve.'
    ]
  },
  {
    id: 'tn15',
    name: 'Drumstick Sambar',
    cuisine_type: 'Tamil',
    ingredients: ['drumstick', 'toor_dal', 'onion', 'tomato', 'tamarind', 'curry_leaves'],
    isVeg: true,
    prep_time: 35,
    effort_level: 'medium',
    spice_level: 'medium',
    steps: [
      'Cook toor dal until mushy.',
      'Cut drumstick into 3-inch pieces. Boil until tender.',
      'Sauté onion and tomato. Add tamarind water and sambar powder.',
      'Add drumstick and cooked dal. Simmer 10 min.',
      'Temper with mustard, curry leaves, hing, and dried chili.'
    ]
  },
  {
    id: 'tn16',
    name: 'Chettinad Egg Curry',
    cuisine_type: 'Tamil',
    ingredients: ['egg', 'onion', 'tomato', 'coconut', 'curry_leaves', 'garlic'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Boil eggs, peel, and make small slits.',
      'Dry roast and grind fennel, pepper, coconut, and cumin.',
      'Sauté onion, garlic, and tomato until soft.',
      'Add ground masala, turmeric, and salt with water.',
      'Add eggs, simmer 10 min until gravy coats them.'
    ]
  },

  // ════════════════════════════════════════════════════════════════
  //  ANDHRA DISHES (16)
  // ════════════════════════════════════════════════════════════════

  {
    id: 'ap01',
    name: 'Pappu',
    cuisine_type: 'Andhra',
    ingredients: ['toor_dal', 'tomato', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'medium',
    steps: [
      'Cook toor dal with tomato, green chili, and turmeric.',
      'Mash the dal well once cooked.',
      'Add salt and adjust consistency.',
      'Temper with mustard, cumin, curry leaves, and dried chili.',
      'Mix well and serve with rice and ghee.'
    ]
  },
  {
    id: 'ap02',
    name: 'Tomato Pappu',
    cuisine_type: 'Andhra',
    ingredients: ['tomato', 'toor_dal', 'curry_leaves', 'green_chili', 'garlic'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'medium',
    steps: [
      'Cook toor dal till soft.',
      'Sauté garlic and green chili, add lots of chopped tomatoes.',
      'Cook tomatoes until completely mushy.',
      'Mix with dal, add salt and turmeric. Simmer.',
      'Temper with mustard, cumin, and curry leaves.'
    ]
  },
  {
    id: 'ap03',
    name: 'Gongura Pachadi',
    cuisine_type: 'Andhra',
    ingredients: ['gongura', 'green_chili', 'garlic', 'onion'],
    isVeg: true,
    prep_time: 15,
    effort_level: 'low',
    spice_level: 'hot',
    steps: [
      'Wash gongura leaves and remove stems.',
      'Dry roast gongura with green chili until wilted.',
      'Add garlic and roast 2 more minutes.',
      'Cool and grind to a coarse paste.',
      'Temper with mustard, urad dal, and chopped onion.'
    ]
  },
  {
    id: 'ap04',
    name: 'Bendakaya Fry',
    cuisine_type: 'Andhra',
    ingredients: ['okra', 'onion', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'hot',
    steps: [
      'Wash and fully dry okra. Slit lengthwise.',
      'Heat oil generously, add mustard and curry leaves.',
      'Add okra with turmeric, red chili powder, and salt.',
      'Fry on high heat without stirring too much until crispy.',
      'Add sliced onion in last 2 min. Serve hot.'
    ]
  },
  {
    id: 'ap05',
    name: 'Gutti Vankaya',
    cuisine_type: 'Andhra',
    ingredients: ['brinjal', 'peanuts', 'coconut', 'tamarind', 'curry_leaves', 'onion'],
    isVeg: true,
    prep_time: 35,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Slit small brinjals into quarters without cutting through.',
      'Dry roast and grind peanuts, coconut, sesame, cumin, and chili.',
      'Stuff brinjals with the ground masala.',
      'Sauté onion, add stuffed brinjals with tamarind water.',
      'Cover and cook on low for 20 min until tender.'
    ]
  },
  {
    id: 'ap06',
    name: 'Andhra Chicken Curry',
    cuisine_type: 'Andhra',
    ingredients: ['chicken', 'onion', 'tomato', 'curry_leaves', 'green_chili', 'garlic'],
    isVeg: false,
    prep_time: 40,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Sauté sliced onion until deep golden.',
      'Add ginger-garlic paste, green chili, and tomato. Cook 5 min.',
      'Add chicken with red chili, turmeric, coriander powder, and salt.',
      'Add little water, cover and cook on low for 25 min.',
      'Finish with curry leaves and cook until oil separates.'
    ]
  },
  {
    id: 'ap07',
    name: 'Andhra Egg Curry',
    cuisine_type: 'Andhra',
    ingredients: ['egg', 'onion', 'tomato', 'curry_leaves', 'green_chili', 'garlic'],
    isVeg: false,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Boil eggs, peel, and slit for masala absorption.',
      'Sauté onion with garlic and green chili until browned.',
      'Add tomatoes, red chili powder, turmeric. Cook until thick.',
      'Add water to make gravy. Simmer 5 min.',
      'Add eggs and curry leaves. Cook 5 more minutes.'
    ]
  },
  {
    id: 'ap08',
    name: 'Chinta Chiguru Pulusu',
    cuisine_type: 'Andhra',
    ingredients: ['tamarind', 'onion', 'tomato', 'curry_leaves', 'green_chili'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Extract thick tamarind juice.',
      'Sauté onion and tomato until soft.',
      'Add tamarind juice, jaggery, red chili powder, and turmeric.',
      'Simmer for 15 min until raw smell goes.',
      'Temper with mustard, cumin, curry leaves, and fenugreek.'
    ]
  },
  {
    id: 'ap09',
    name: 'Dondakaya Fry',
    cuisine_type: 'Andhra',
    ingredients: ['onion', 'curry_leaves', 'green_chili', 'peanuts'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'hot',
    steps: [
      'Slice tindora into thin rounds.',
      'Heat oil, add mustard, peanuts, and curry leaves.',
      'Add tindora with turmeric, chili powder, and salt.',
      'Fry on medium-high heat until crispy, stirring occasionally.',
      'Add sliced onion, toss and serve.'
    ]
  },
  {
    id: 'ap10',
    name: 'Andhra Aloo Fry',
    cuisine_type: 'Andhra',
    ingredients: ['potato', 'onion', 'curry_leaves', 'green_chili', 'garlic'],
    isVeg: true,
    prep_time: 20,
    effort_level: 'low',
    spice_level: 'hot',
    steps: [
      'Peel and cube potatoes. Par-boil slightly.',
      'Heat oil, add mustard, curry leaves, and sliced garlic.',
      'Add potatoes with red chili powder, turmeric, and salt.',
      'Fry on medium heat until crispy and golden.',
      'Add sliced onion, toss for 2 min. Serve hot.'
    ]
  },
  {
    id: 'ap11',
    name: 'Tomato Pachadi',
    cuisine_type: 'Andhra',
    ingredients: ['tomato', 'onion', 'green_chili', 'curry_leaves'],
    isVeg: true,
    prep_time: 10,
    effort_level: 'low',
    spice_level: 'medium',
    steps: [
      'Sauté chopped tomatoes and green chili until soft.',
      'Cool and grind to coarse paste.',
      'Temper with mustard, curry leaves, and dried chili.',
      'Mix in finely chopped onion. Add salt to taste.'
    ]
  },
  {
    id: 'ap12',
    name: 'Pesarattu',
    cuisine_type: 'Andhra',
    ingredients: ['moong_dal', 'green_chili', 'onion', 'garlic'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'mild',
    steps: [
      'Soak whole moong dal overnight or 4 hours.',
      'Grind with green chili, garlic, and cumin to a batter.',
      'Spread thin on a hot tawa like a dosa.',
      'Sprinkle chopped onion and cook until crispy.',
      'Fold and serve with ginger chutney.'
    ]
  },
  {
    id: 'ap13',
    name: 'Gongura Chicken',
    cuisine_type: 'Andhra',
    ingredients: ['chicken', 'gongura', 'onion', 'garlic', 'green_chili', 'curry_leaves'],
    isVeg: false,
    prep_time: 40,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Cook gongura leaves with little water until wilted. Set aside.',
      'Sauté onion and garlic until golden.',
      'Add chicken with spices (turmeric, chili, coriander). Cook 15 min.',
      'Add cooked gongura, green chili, and curry leaves.',
      'Cook on low 10 more min until oil separates.'
    ]
  },
  {
    id: 'ap14',
    name: 'Vankaya Pulusu',
    cuisine_type: 'Andhra',
    ingredients: ['brinjal', 'tamarind', 'onion', 'curry_leaves', 'peanuts'],
    isVeg: true,
    prep_time: 30,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Slit brinjals and fry until half-cooked.',
      'Extract tamarind juice. Add chili, turmeric, and salt.',
      'Add brinjals and sliced onion to tamarind gravy.',
      'Simmer 15 min until brinjals are tender.',
      'Temper with mustard, curry leaves, and crushed peanuts.'
    ]
  },
  {
    id: 'ap15',
    name: 'Natu Kodi Pulusu',
    cuisine_type: 'Andhra',
    ingredients: ['chicken', 'tamarind', 'onion', 'curry_leaves', 'tomato', 'garlic'],
    isVeg: false,
    prep_time: 45,
    effort_level: 'high',
    spice_level: 'hot',
    steps: [
      'Sauté onion and garlic until deeply browned.',
      'Add chicken pieces with turmeric, chili powder, and salt.',
      'Cook 10 min, then add chopped tomato and tamarind water.',
      'Add curry leaves. Cover and slow-cook for 25 min.',
      'Cook until gravy is thick and oil floats on top.'
    ]
  },
  {
    id: 'ap16',
    name: 'Senaga Pindi Kura',
    cuisine_type: 'Andhra',
    ingredients: ['onion', 'curry_leaves', 'green_chili', 'coconut'],
    isVeg: true,
    prep_time: 25,
    effort_level: 'medium',
    spice_level: 'hot',
    steps: [
      'Soak chana dal for 1 hour. Drain well.',
      'Heat oil, add mustard, curry leaves, and green chili.',
      'Add soaked dal, turmeric, chili powder, and salt.',
      'Cover and cook on low heat 15 min, stirring occasionally.',
      'Add grated coconut and chopped onion. Mix and serve.'
    ]
  }
];
