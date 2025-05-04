import { expect, test } from 'vitest'
import { RandomItemGenerator } from './RandomItemGenerator'

test('less count - more generated', () => {
  const ROUNDS = 1000;
  const array = [
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6'
  ];
  const generator = new RandomItemGenerator(array);
  const generatedTimes = Object.fromEntries(array.map(x => [x, 0]));

  for (let i = 0; i < ROUNDS; i++) {
    const item = generator.nextItem();
    generatedTimes[item]++;

    if (item !== 'item1') {
      generator.countUpdate(item);
    }
  }

  const max = Math.max(...Object.values(generatedTimes));

  console.log(generatedTimes);
  expect(generatedTimes['item1']).toBe(max);
})