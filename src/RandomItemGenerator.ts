function getWeight(stat: ItemStat) {
  return 1 / (stat.count + 1) ** 3;
}

interface ItemStat {
  count: number
}

export class RandomItemGenerator<T> {
  private readonly array: readonly T[];
  private readonly weights: Map<T, ItemStat>;

  constructor(array: readonly T[]) {
    this.array = array;
    this.weights = new Map(array.map((x) => [x, { count: 0 }]));
  }

  nextItem(): T {
    const totalWeight = [...this.weights.entries()].reduce((acc, [_, stat]) => acc + getWeight(stat), 0);
    const roll = Math.random() * totalWeight;
    let current = 0;

    for (const [item, stat] of this.weights) {
      current += getWeight(stat);

      if (roll <= current) return item;
    }

    return this.array[0];
  }

  countUpdate(item: T) {
    const stat = this.weights.get(item);

    if (!stat) return;

    this.weights.set(item, { ...stat, count: stat.count + 1 });
  }
}
