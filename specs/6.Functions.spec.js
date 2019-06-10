describe("Functions", () => {

  describe("shorthand notation", () => {

    it("() => {} is the shortest function", () => {
      expect(() => {}).toEqual(jasmine.any(Function));
    });

    it("(a,b) => {} accepts arguments", () => {
      expect((a,b) => {}).toEqual(jasmine.any(Function));
    });

    it("a => {} is a shorthand for one argument", () => {
      expect(a => {}).toEqual(jasmine.any(Function));
    });

    it("() => n returns n", () => {
      const fn = () => 3;
      expect(3).toBe(fn());
    });

    it("n => n is identity", () => {
      const fn = n => n;
      expect(5).toBe(fn(5));
    });

    it("(a,b) => a+b sums two numbers", () => {
      const fn = (a,b) => a+b;
      expect(5).toBe(fn(2,3));
    });

    it("() => ({ hello: \"world\" }) requires parenthesis to return a constant object", () => {
      const fn = (a) => ({ hello: a });
      expect({hello: "world"}).toEqual(fn("world"));
      expect({hello: "you"}).toEqual(fn("you"));
    });

      it("() => { /*code*/ } accepts any arbitrary code inside brackets", () => {
        const fn = a => {
          if (a > 3) { return a; }
          else return 3;
        };
        expect(3).toEqual(fn(2));
        expect(5).toEqual(fn(5));
      });

  });

  describe("object function shorthand", () => {

    it("you can use parenthesis to declare a function in an object", () => {
      const object = {
        incr(a) { 
          return a + 1;
        },
      };
      expect(3).toBe(object.incr(2));
    });

  });

  describe("long notation", () => {

    it("function() {} was the shortest function", () => {
      expect(function() {}).toEqual(jasmine.any(Function));
    });

    it("function(a,b) {} accepts arguments", () => {
      expect(function(a,b) {}).toEqual(jasmine.any(Function));
    });

    it("function(a) {} there is no shorthand for one argument", () => {
      expect(function(a) {}).toEqual(jasmine.any(Function));
    });

    it("function() { return n; } returns n", () => {
      const fn = function() { return 3; };
      expect(3).toBe(fn());
    });

    it("function name() { … } can have named", () => {
      function fn() { return 3; };
      expect(3).toBe(fn());
    });

    it("function (n) { return n; } is identity", () => {
      const fn = function (n) { return n; };
      expect(5).toBe(fn(5));
    });

    it("function (a, b) { return a + b; } sums two numbers", () => {
      const fn = (a,b) => a+b;
      expect(5).toBe(fn(2,3));
    });

    it("function() { return { hello: \"world\" }; } requires nothing special to return a constant object", () => {
      const fn = function(a) { return { hello: a }; };
      expect({ hello: "world" }).toEqual(fn("world"));
      expect({ hello: "you" }).toEqual(fn("you"));
    });

      it("function() { /*code*/ } accepts any arbitrary code inside brackets", () => {
        const fn = function(a) {
          if (a > 3) { return a; }
          else return 3;
        };
        expect(3).toEqual(fn(2));
        expect(5).toEqual(fn(5));
      });
      
  });

  describe("missmatching parameters / returns", () => {

    it("ignores extra parameters", () => {
      const fn = (a,b) => a + b;
      expect(3).toBe(fn(1,2,3));
    });

    it("converts missing parameters into undefined", () => {
      const fn = n => n;
      expect(undefined).toBe(fn());
    });

    it("always returns something, returns undefined by default", () => {
      const fn = () => {};
      expect(undefined).toBe(fn());
    });

    it("returns return undefined if no value specified", () => {
      const fn = () => { return; };
      expect(undefined).toBe(fn());
    });

  });

  describe("default arguments", () => {
    it('allows arguments with default value', () => {
      const fn = (n = 3) => n;

      const three = fn();
      const four = fn(4);
      expect(3).toBe(three);
      expect(4).toBe(four);
    });
  });

  describe("return standarized bug", () => {

    it("return does not need ; to finish", () => {
      const fn = () => {
        return 
          1 +
          1;
      };
      expect(undefined).toBe(fn());
    });

  });

  describe("high order functions", () => {

    it("functions can receive other functions", () => {
      const twice = (fn, value) => fn(fn(value));
      const incr = a => a + 1;
      const double = a => a * 2;

      expect(4).toBe(twice(incr, 2));
      expect(12).toBe(twice(double, 3));
    });

    it("functions can be defined in place as expressions", () => {
      const twice = (fn, value) => fn(fn(value));

      expect(1).toBe(twice(n => n / 2, 4));
    });

    it("functions can return other functions", () => {
      const compose = (fn1, fn2) => value => fn2(fn1(value));
      const incr = a => a + 1;
      const double = a => a * 2;

      expect(8).toBe(compose(incr, double)(3));
    });

  });

});
