describe("Classes", () => {

  describe("definition", () => {
    it("are defined using class keyword", () => {
      class Animal {};
      expect(Animal).toBeDefined();
    });

    it("new creates new instances", () => {
      class Animal {};
      const animal = new Animal();
      expect(animal).toBeInstanceOf(Animal);
    });
  });

  describe("objects", () => {
    it("class instances are objects", () => {
      class Animal {};
      const animal = new Animal();
      expect(animal).toEqual(jasmine.any(Object));
    });

    it("you can get/set properties to class object like any object", () => {
      class Animal {};
      const animal = new Animal();
      animal.name = "skipper";
      expect("skipper").toEqual(animal.name);
    });

    it("instance methods are defined in the class", () => {
      class Animal {
        getName() { return "skipper"; }
        salute(name) { return "hi " + name; }
      }
      const animal = new Animal();
      expect("skipper").toBe(animal.getName());
      expect("hi kowalski").toBe(animal.salute("kowalski"));
    });
  });

  describe("this", () => {
    it("instance methods can read instance properties through this", () => {
      class Animal {
        salute() { return "hi " + this.name; }
      }
      const animal = new Animal();
      animal.name = "skipper";
      expect("hi skipper").toBe(animal.salute());
    });

    it("without this it reads parent variables", () => {
      const name = "nobody";
      class Animal {
        salute() { return "hi " + name; }
      }
      const animal = new Animal();
      animal.name = "skipper";
      expect("hi nobody").toBe(animal.salute());
    });

    it("uses this to call to its own methods", () => {
      class Animal {
        getName() { return "skipper"; }
        salute() { return "hi " + this.getName(); }
      }
      const animal = new Animal();
      expect("hi skipper").toBe(animal.salute());
    });

    it("without this it calls a parent function", () => {
      const getName = () => "savio";
      class Animal {
        getName() { return "skipper"; }
        salute() { return "hi " + getName(); }
      }
      const animal = new Animal();
      expect("hi savio").toBe(animal.salute());
    });

    it("can create dynamically new own properties through this", () => {
      class Animal {
        setName(name) { this.name = name; }
        getName() { return this.name; }
      }
      const animal = new Animal();
      animal.setName("rico");
      expect("rico").toBe(animal.getName());
    });

    it("there are no private properties", () => {
      class Animal {
        setName(name) { this.name = name; }
      }
      const animal = new Animal();
      animal.setName("rico");
      expect("rico").toBe(animal.name);
    });
  });

  it("constructor is a special funcion called constructor", () => {
    class Animal {
      constructor(name) {
        this.name = name;
      }
    }
    const animal = new Animal("mort");
    expect("mort").toBe(animal.name)
  });

  describe('inheritance', () => {

    it("has inheritance using extends", () => {
      class Animal {
        setName(name) { this.name = name; }
        speak() { return this.name + " makes noise"; }
      }
      class Dog extends Animal {
        speak() { return this.name + " barks"; }
      }
      const dog = new Dog();
      dog.setName("bethoven");
      expect("bethoven barks").toBe(dog.speak());
    });

    it("you can call super constructor with super", () => {
      class Animal {
        constructor(name) { this.name = name; }
        speak() { return this.name + " makes noise"; }
      }
      class Dog extends Animal {
        constructor(name) { super(name); }
        speak() { return this.name + " barks"; }
      }
      const dog = new Dog("bethoven");
      expect("bethoven barks").toBe(dog.speak());
    });

    it("you can call super method with super", () => {
      class Animal {
        constructor(name) { this.name = name; }
        speak() { return this.name + " makes noise"; }
      }
      class Dog extends Animal {
        constructor(name) { super(name); }
        speak() { return super.speak() + " and barks"; }
      }
      const dog = new Dog("bethoven");
      expect("bethoven makes noise and barks").toBe(dog.speak());
    });

    it("you can use instanceof to know if an object is an instance of a class", () => {
      class Animal {}
      class Balloon {}
      expect(true).toBe(new Animal() instanceof Animal);
      expect(false).toBe(new Animal() instanceof Balloon);
    });

    it("you can use instanceof to know (true/false) if an object is an instance of a class or inheritancy", () => {
      class Animal {}
      class Dog extends Animal {}
      expect(true).toBe(new Animal() instanceof Animal);
      expect(false).toBe(new Animal() instanceof Dog);
      expect(true).toBe(new Dog() instanceof Animal);
      expect(true).toBe(new Dog() instanceof Dog);
    });
  });

  describe('more of this', () => {

    it("() => {} shorthand functions allows to use this", () => {
      class ThisTest {
        getThisWithFn() {
          const fn = () => this;
          return fn();
        }
      }
      const thisTest = new ThisTest();
      expect(thisTest).toBe(thisTest.getThisWithFn());
    });

    it("() => {} shorthand functions preserves this", () => {
      class Counters {
        constructor(factor) { this.factor = factor; }
        mult() { return [1,2,3].map(n => n * this.factor); }
      }
      const counters = new Counters(3);
      expect([3,6,9]).toEqual(counters.mult());
    });

    it("function() {} long notation uses this value is undefined", () => {
      class ThisTest {
        getThisWithFn() {
          const fn = function() { return this; };
          return fn();
        }
      }
      const thisTest = new ThisTest();
      expect(undefined).toBe(thisTest.getThisWithFn());
    });

    it('methods does not exists, they are simple functions', () => {
      class MethodTest {
        four() { return 4; }
      }
      const instance = new MethodTest();
      const four = instance.four;
      expect(4).toBe(four());
    });

    it('functions called without the object, does have undefined this', () => {
      class ThisTest {
        getThis() { return this; }
      }
      const instance = new ThisTest();
      const getThis = instance.getThis;
      expect(undefined).toBe(getThis());
    });

    it('functions called with another object, does have the other object as this', () => {
      class ThisTest {
        getThis() { return this; }
      }
      const instance = new ThisTest();
      const otherObj = {
        getThis: instance.getThis,
      };
      expect(otherObj).toBe(otherObj.getThis());
    });

    it('shorthand functions always preserves the original this', () => {
      class ThisTest {
        getGetThisFn() {
          const fn = () => this;
          return fn;
        }
      }
      const instance = new ThisTest();
      const getThis = instance.getGetThisFn();
      expect(instance).toBe(getThis());
    });
  });

  describe('field initialization', () => {
    it('initialize fields with = in the class definition', () => {
      class Animal {
        name = 'rico';
      }
      const instance = new Animal();
      expect("rico").toBe(instance.name);
    });

    it('create fixed this methods with =', () => {
      class ThisTest {
        getThis = () => this;
      }
      const instance = new ThisTest();
      const getThis = instance.getThis;
      expect(instance).toBe(getThis());
    });
  });

  it('classes are like any other object, and can be assigned, used as parameter, ...', () => {
    const makeAnimalClass = () => {
      class Animal {};
      return Animal;
    };
    const 動物 = makeAnimalClass();
    const instance = new 動物();
    const expectInstanceOf = (instance, Class) => {
      expect(instance).toBeInstanceOf(Class);
    };
    expectInstanceOf(instance, 動物);
  });

});
