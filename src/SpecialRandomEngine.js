export default class SpecialRandomEngine {
  constructor(size) {
    this.size = size;
    this.counter = [];
    this.max = 0;
    this.history = [];
    this.available = 0;
  }

  recalc() {
    this.max = 0;
    this.counter.forEach(elem => {
      if (elem > this.max) this.max = elem;
    });
    if (this.max === 0) this.max = 1;
    this.available = 0;
    this.counter.forEach(elem => {
      if (this.max !== elem) {
        this.available += 1;
      }
    });
  }

  initCounter() {
    this.counter = [];
    for (let i = 0; i !== this.size; ++i) this.counter.push(0);
    this.recalc();
  }

  use(index) {
    if (index < 0 || index >= this.counter.length) {
      console.error("Wrong index: " + index);
      return;
    }
    this.counter[index] += 1;
    this.recalc();
  }

  next() {
    let outIndex = Math.random() * this.available | 0;
    let curIndex = 0;
    let realIndex = 0;
    for (let i = 0; i !== this.counter.length; ++i) {
      if (this.counter[i] !== this.max) {
        if (curIndex === outIndex) {
          realIndex = i;
          break;
        } else {
          curIndex += 1;
        }
      }
    }
    const prop = (1.0 / this.available * 100.0).toFixed(2);
    this.use(realIndex);
    return {
      propability: prop,
      value: realIndex,
    }
  }

  setSize(size) {
    this.size = size;
    this.initCounter();
  }
}
