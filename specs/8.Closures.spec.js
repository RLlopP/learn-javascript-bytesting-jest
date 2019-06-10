describe('Closures', () => {

  it('inner functions can use parent arguments', () => {
    const makeConstant = (number) => {
      return () => number; 
    };
    const six = makeConstant(6);

    expect(6).toBe(six());
  });

  it('inner functions can use parent variables', () => {
    const makeCountFn = () => {
      let count = 0;
      return () => {
        count += 1;
        return count;
      };
    };
    let countGuests = makeCountFn();

    expect(1).toBe(countGuests());
  });

  it('each time that a parent is called a new set of variables is created', () => {
    const makeCountFn = () => {
      let count = 0;
      return () => {
        count += 1;
        return count;
      };
    };
    let countGuests = makeCountFn();
    let countAudience = makeCountFn();

    expect(1).toBe(countGuests());
    expect(2).toBe(countGuests());
    expect(1).toBe(countAudience());
    expect(3).toBe(countGuests());
    expect(2).toBe(countAudience());
  });

  it('can can be used to create objects with private variables (module pattern)', () => {
    const counter = (() => {
      let count = 0;
      return {
        incr() { count += 1; }, 
        decr() { count -= 1; }, 
        get() { return count; },
      };
    })();

    counter.incr();
    counter.incr();
    expect(2).toBe(counter.get());
    expect(undefined).toBe(counter.count);
  });

  it('use array traversal high order functions', () => {
    const makeConstants = () => {
      return [1,2,3].map(i => {
        return () => i;
      });
    }
    const [one,two,three] = makeConstants();

    expect(1).toBe(one());
    expect(2).toBe(two());
    expect(3).toBe(three());
  });

  it('avoid loops', () => {
    const makeConstants = () => {
      let result = [];
      let i = 0;
      while (i < 3) {
        result[i] = () => i + 1;
        i++;
      }
      return result;
    }
    const [one,two,three] = makeConstants();

    expect(4).toBe(one());
    expect(4).toBe(two());
    expect(4).toBe(three());
  });

  it('a closure is very similar to an object', () => {
    const makeCountFn = () => {
      let count = 0;
      return () => {
        count += 1;
        return count;
      };
    };
    class Counter {
      constructor() {
        this._count = 0;
      }
      count() {
        this._count += 1;
        return this._count;
      }
    }
    let countGuests = makeCountFn();
    let audienceCounter = new Counter();
    expect(1).toBe(countGuests());
    expect(1).toBe(audienceCounter.count());
  });

  it('but closures has private variables', () => {
    const makeCountFn = () => {
      let count = 0;
      return () => {
        count += 1;
        return count;
      };
    };
    class Counter {
      constructor() {
        this._count = 0;
      }
      count() {
        this._count += 1;
        return this._count;
      }
    }
    let countGuests = makeCountFn();
    let audienceCounter = new Counter();
    expect(undefined).toBe(countGuests.count);
    expect(0).toBe(audienceCounter._count);
  });

});
