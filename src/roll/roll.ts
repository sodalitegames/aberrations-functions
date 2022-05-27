export interface RollData {
  results: RollResults;
  successes: number;
  experience: number;
  critical: {
    success: boolean;
    fail: boolean;
  };
}

export interface RollResults {
  rolls: number[];
  removed: number[];
  dice: number;
  advantage: number;
}

export const roll = (dice: number, advantage: number): RollData => {
  const results = rollDice(dice, advantage);
  const data = calcRollData(results);
  return data;
};

export const rollOne = (): number => {
  const roll = Math.floor(Math.random() * 6) + 1;
  return roll;
};

export const rollDice = (dice: number, advantage: number): RollResults => {
  let rolls: number[] = [];
  let removed: number[] = [];

  // create the array of rolls
  for (let i = 0; i < dice + Math.abs(advantage); i++) {
    rolls.push(rollOne());
  }

  if (advantage > 0) {
    for (let i = 0; i < advantage; i++) {
      // find the min value
      const min = Math.min(...rolls);

      // find index of min value
      const index = rolls.indexOf(min);

      // remove the first instance of the min value from the array
      rolls.splice(index, 1);

      // add that min value to the advantage rolls array
      removed.push(min);
    }
  }

  if (advantage < 0) {
    for (let i = 0; i > advantage; i--) {
      // find the max value
      const max = Math.max(...rolls);

      // find index of max value
      const index = rolls.indexOf(max);

      // remove the first instance of the max value from the array
      rolls.splice(index, 1);

      // add that max value to the advantage rolls array
      removed.push(max);
    }
  }

  return { rolls, removed, dice, advantage };
};

export const calcRollData = (results: RollResults): RollData => {
  const { rolls, removed, dice, advantage } = results;

  let successes = 0;
  let sixes = 0;
  let ones = 0;

  // set successes, sixes, and ones by looping through the rolls array
  rolls.forEach(roll => {
    if (roll > 3) {
      successes++;

      if (roll === 6) {
        sixes++;
      }
    } else if (roll === 1) {
      ones++;
    }
  });

  let experience = 0;
  let critical = {
    success: false,
    fail: false,
  };

  // set experience, crit, and conditions based on the rolls
  if (sixes >= dice / 2) {
    successes = dice;
    critical.success = true;

    // High risk, high reward - grant an additional experience point - experience++;
  }

  if (ones >= dice / 2) {
    successes = 0;
    critical.fail = true;

    // High risk, high reward - lose an additional experience point - experience--;
  }

  if (successes >= dice / 2) {
    experience++;
  }

  // save the roll data
  return { results, successes, experience, critical };
};
