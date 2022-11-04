export const getPrice = (type: 'weapon' | 'wearable' | 'consumable' | 'usable', data: any) => {
  switch (type) {
    case 'weapon':
      break;
    case 'wearable':
      break;
    case 'consumable':
      break;
    case 'usable':
      break;
    default:
      break;
  }
};

type Breakdown = {
  message: string;
  breakdown?: (Breakdown | string)[];
};

type Price = {
  price: number;
  breakdown?: (Breakdown | string)[];
};

type IncrementalPricingConfig = {
  levels: number;
  label?: string;
  base?: number;
  increment?: number;
};

const calculateIncrementalPricing = (config: IncrementalPricingConfig): Price => {
  const { levels, base = 50, increment = 50, label = 'Level' } = config;

  let price = 0;
  let breakdown = [];

  for (let i = 1; i <= levels; i++) {
    const cost = base + i * increment;
    breakdown.push(`${label} #${i} adds ${cost}`);

    price += cost;
  }

  return { price, breakdown };
};

export const getWeaponPrice = (level: number, hasAbility: boolean): Price => {
  const BASE_PRICE = 200;
  const ABILITY_PRICE = 500;

  let price = BASE_PRICE;

  if (hasAbility) {
    price += ABILITY_PRICE;
  }

  const levelCost = calculateIncrementalPricing({ levels: level, label: 'Level' });
  price += levelCost.price;

  const breakdown = [
    `A weapon's base price is ${BASE_PRICE}`,
    `Your weapon ${hasAbility ? `has an ability, which adds ${ABILITY_PRICE}` : `does not have an ability`}`,
    { message: `Your weapon is level ${level}, which adds ${levelCost.price}`, breakdown: levelCost.breakdown },
    `This brings your total to ${price}`,
  ];

  return { price, breakdown };
};

export const getWearablePrice = (shieldValue: number, speedAdjustment: number, modifierPoints: number): Price => {
  const BASE_PRICE = 100;

  let price = BASE_PRICE;

  const adjustorsCost = calculateIncrementalPricing({ levels: shieldValue + speedAdjustment, label: 'Adjustor' });
  price += adjustorsCost.price;

  const modifiersCost = calculateIncrementalPricing({ levels: modifierPoints, label: 'Modifier Point' });
  price += modifiersCost.price;

  const breakdown = [
    `A wearable's base price is ${BASE_PRICE}`,
    { message: `Your wearable has an adjustor of ${shieldValue + speedAdjustment}, which adds ${adjustorsCost.price}`, breakdown: adjustorsCost.breakdown },
    { message: `Your wearable modifies ${modifierPoints} points worth, which adds ${modifiersCost.price}`, breakdown: modifiersCost.breakdown },
    `This brings your total to ${price}`,
  ];

  return { price, breakdown };
};

export const getConsumablePrice = (uses: number, level: number, categories: number): Price => {
  const BASE_PRICE = 100;

  let price = BASE_PRICE;

  const usesCost = calculateIncrementalPricing({ levels: uses, base: 25, label: 'Use' });
  price += usesCost.price;

  const levelCost = calculateIncrementalPricing({ levels: level, label: 'Level' });
  price += levelCost.price;

  const categoriesCost = calculateIncrementalPricing({ levels: categories, base: 0, increment: 100, label: 'Category' });
  price += categoriesCost.price;

  const breakdown = [
    `A consumable's base price is ${BASE_PRICE}`,
    { message: `Your consumable has ${uses} uses, which adds ${usesCost.price}`, breakdown: usesCost.breakdown },
    { message: `Your consumable is level ${level}, which adds ${levelCost.price}`, breakdown: levelCost.breakdown },
    { message: `Your consumable has ${categories} categories, which adds ${categoriesCost.price}`, breakdown: categoriesCost.breakdown },
    `This brings your total to ${price}`,
  ];

  return { price, breakdown };
};

type UsableType = 'Common' | 'Semi-Common' | 'Rare' | 'Collectible' | 'One of a Kind';

type UsablePrice = {
  min: number | null;
  max: number | null;
  average?: number;
  random?: number;
};

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getUsablePrice = (type: UsableType): UsablePrice => {
  switch (type) {
    case 'Common':
      return {
        min: 100,
        max: 499,
        average: (100 + 499) / 2,
        random: randomNumberBetween(100, 499),
      };
    case 'Semi-Common':
      return {
        min: 500,
        max: 1499,
        average: (500 + 1499) / 2,
        random: randomNumberBetween(500, 1499),
      };
    case 'Rare':
      return {
        min: 1500,
        max: 4999,
        average: (1500 + 4999) / 2,
        random: randomNumberBetween(1500, 4999),
      };
    case 'Collectible':
      return {
        min: 5000,
        max: null,
      };
    case 'One of a Kind':
      return {
        min: 0,
        max: null,
      };
    default:
      return {
        min: null,
        max: null,
      };
  }
};
