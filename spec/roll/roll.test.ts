import { calculateCritical, calculateRoll } from '../../src/roll/roll';

describe('rolling dice', () => {
  it('should return a number from 1 to the number provided when rolling one die', () => {
    let timesRolled: number;

    for (timesRolled = 1; timesRolled < 50; timesRolled++) {
      let roll = calculateRoll(timesRolled);
      expect(roll).toBeGreaterThan(0);
      expect(roll).toBeLessThanOrEqual(timesRolled);
    }

    expect(timesRolled).toBe(50);
  });

  it('should correctly calculate critical results', () => {
    const success = calculateCritical(12, 12);
    expect(success.bonus > 0).toBeTruthy();
    expect(success).toHaveProperty('critical.success', true);
    expect(success).toHaveProperty('critical.failure', false);

    const failure = calculateCritical(1, 12);
    expect(failure.bonus === 0).toBeTruthy();
    expect(failure).toHaveProperty('critical.success', false);
    expect(failure).toHaveProperty('critical.failure', true);

    const neutral = calculateCritical(6, 12);
    expect(neutral.bonus === 0).toBeTruthy();
    expect(neutral).toHaveProperty('critical.success', false);
    expect(neutral).toHaveProperty('critical.failure', false);
  });
});
