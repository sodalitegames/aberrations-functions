export interface RollResults {
  die: number;
  total: number;
  roll: number;
  bonus: number;
  modifier: number;
  critical: {
    success: boolean;
    failure: boolean;
  };
}

export const roll = (die: number, modifier: number): RollResults => {
  // TODO: Make sure that if a number is not passed as an arguement, the numbers still correctly add together

  const roll = calculateRoll(die);

  const { critical, bonus } = calculateCritical(roll, die);

  return {
    die,
    total: critical.failure ? 1 : roll + bonus + modifier,
    modifier,
    roll,
    bonus,
    critical,
  };
};

export const calculateRoll = (die: number): number => {
  return Math.floor(Math.random() * die) + 1;
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
