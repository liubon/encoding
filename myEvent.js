class Events {
  constructor() {
    this.eventMap = new Map();
  }
  on(name, fn, ...args) {
    const callback = () => {
      return fn(...args);
    };
    if (this.eventMap.has(name)) {
      const callbackList = this.eventMap.get(name);
      callbackList.set(fn, callback);
    } else {
      this.eventMap.set(name, new Map([[fn, callback]]));
    }
  }
  fire(name, ...args) {
    const callbacks = this.eventMap.get(name);
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }
  off(name, fn) {
    this.eventMap.get(name).delete(fn);
  }
  once(name, fn, ...args) {
    const hoc = () => {
      const res = fn(...args);
      this.off(name, hoc);
      return res;
    };
    this.on(name, hoc);
  }
}
const fn1 = (...args) => console.log('I want sleep1', ...args);
const fn2 = (...args) => console.log('I want sleep2', ...args);
const Myevent = new Events();
Myevent.on('sleep', fn1, 1, 2, 3);
Myevent.on('sleep', fn2, 1, 2, 3);
Myevent.fire('sleep', 4, 5, 6);
Myevent.off('sleep', fn1);
Myevent.once('sleep', () => console.log('I want sleep'));
Myevent.fire('sleep');
Myevent.fire('sleep');
