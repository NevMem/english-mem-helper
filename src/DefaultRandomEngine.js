export default class DefaultRandomEngine {
  constructor(size) {
    this.size = size;
  }

  next() {
    if (this.size === 0) {
      return {
        value: -1,
        propability: 100
      };
    }
    let newIndex = Math.random() * this.size | 0;
    return {
      value: newIndex,
      propability: ((1.0 / this.size) * 100.0).toFixed(2)
    };
  }

  setSize(size) {
    this.size = size
  }
}
