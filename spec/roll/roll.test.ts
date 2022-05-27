import { rollOne, rollDice, calcRollData } from '../../src/roll/roll';

describe('rolling dice', () => {
  it('should return a number between 1 and 6 when rolling one die', () => {
    let timesRolled: number;

    for (timesRolled = 0; timesRolled < 50; timesRolled++) {
      let roll = rollOne();
      expect(roll).toBeGreaterThan(0);
      expect(roll).toBeLessThan(7);
    }

    expect(timesRolled).toBe(50);
  });

  it('should correctly calculate roll results', () => {
    const results = rollDice(8, -4);

    expect(results).toHaveProperty('dice', 8);
    expect(results).toHaveProperty('advantage', -4);

    expect(results.rolls.length).toBe(8);
    expect(results.removed.length).toBe(4);
  });

  // Finish this test
  it('should correctly calculate roll data', () => {
    const data1 = calcRollData({
      rolls: [1, 1, 1, 1, 1, 1],
      removed: [2, 2],
      dice: 6,
      advantage: -2,
    });

    expect(data1.successes).toBe(0);
    expect(data1.experience).toBe(0);
    expect(data1.critical.fail).toBe(true);
    expect(data1.critical.success).toBe(false);

    // Test more types of roll results
  });
});
