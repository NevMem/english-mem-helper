export default class SpecialRandomEngine {
  constructor(size) {
    this.size = size;
    this.counter = [];
    this.sum = 0;
  }

  recalcSum() {
    this.sum = 0;
    this.counter.forEach(elem => (this.sum += elem));
  }

  initCounter() {
    this.counter = [];
    for (let i = 0; i !== this.size; ++i) this.counter.push(1);
    this.recalcSum();
  }

  next() {
    console.log(this.sum)
    let randomValue = (Math.random() * this.sum) | 0;
    let outIndex = 0;
    for (let i = 0; i !== this.counter.length; ++i) {
      let value = this.counter[i];
      if (randomValue >= value) {
        randomValue -= value;
      } else {
        outIndex = i;
        break;
      }
    }
    let result = {
      propability: (this.counter[outIndex] / this.sum * 100).toFixed(2),
      value: outIndex
    };
    for (let i = 0; i !== this.counter.length; ++i) {
      if (i !== outIndex) {
        this.counter[i] += 1;
      }
    }
    this.recalcSum();
    return result;
  }

  setSize(size) {
    this.size = size;
    this.initCounter()
  }
}
