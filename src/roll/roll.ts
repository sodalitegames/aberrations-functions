export interface RollResults {
  die: number;
  total: number;
  roll: number;
  bonus: number;
  modifier: number;
  advantage: {
    value: number;
    calculated: number;
  };
  critical: {
    success: boolean;
    failure: boolean;
  };
}

export const roll = (die: number, adv: number, modifier: number): RollResults => {
  // TODO: Make sure that if a number is not passed as an arguement, the numbers still correctly add together

  const roll = calculateRoll(die);

  const { critical, bonus } = calculateCritical(roll, die);

  const advantage = calculateAdvantage(adv);

  return {
    die,
    total: roll + advantage.calculated + bonus + modifier,
    modifier,
    roll,
    bonus,
    advantage,
    critical,
  };
};

export const calculateRoll = (die: number): number => {
  return Math.floor(Math.random() * die) + 1;
};

export const calculateAdvantage = (advantage: number): { value: number; calculated: number } => {
  return {
    value: advantage,
    calculated: advantage * 2,
  };
};

export const calculateCritical = (roll: number, die: number): { critical: { success: boolean; failure: boolean }; bonus: number } => {
  let failure = false;
  let success = false;
  let bonus = 0;

  if (roll === 1) {
    failure = true;
  }

  if (roll === die) {
    success = true;
    bonus = calculateRoll(die);
  }

  return {
    bonus,
    critical: {
      success,
      failure,
    },
  };
};
