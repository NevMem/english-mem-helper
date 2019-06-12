const START_PROP = 1024;
const REM_PROP = 16;
const MAX_HISTORY_SIZE = 64;

export default class SpecialRandomEngine {
  constructor(size) {
    this.size = size;
    this.counter = [];
    this.sum = 0;
    this.history = [];
  }

  recalcSum() {
    this.sum = 0;
    this.counter.forEach(elem => (this.sum += elem));
  }

  initCounter() {
    this.counter = [];
    for (let i = 0; i !== this.size; ++i) this.counter.push(START_PROP);
    this.recalcSum();
  }

  next() {
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
      propability: ((this.counter[outIndex] / this.sum) * 100).toFixed(2),
      value: outIndex
    };
    this.history.push(outIndex);
    if (this.history.length > MAX_HISTORY_SIZE)
      this.history = this.history.slice(this.history.length - MAX_HISTORY_SIZE);
    for (let i = 0; i !== this.counter.length; ++i) {
      this.counter[i] = START_PROP;
    }
    for (let i = 0; i !== this.history.length; ++i) {
      let value = this.history[i];
      this.counter[value] -= REM_PROP * (i + 1);
      if (this.counter[value] < 0) this.counter[value] = 0;
    }
    this.recalcSum();
    return result;
  }

  setSize(size) {
    this.size = size;
    this.initCounter();
  }
}
