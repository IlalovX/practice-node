const mylib = require('./mylib');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = mylib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive number if input is negative', () => {
    const result = mylib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = mylib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = mylib.greet('John');
    // expect(result).toContain('Hello John' );
    expect(result).toMatch(/Hello John/);
  });
});

describe('getCurrencies', () => {
  it('should return default currencies', () => {
    const result = mylib.getCurrencies();
    // common matchers
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // exact matchers
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('EUR');
    expect(result[2]).toBe('AUD');
    expect(result.length).toBe(3);
    // better way to test array
    expect(result).toContain('USD');
    expect(result).toContain('EUR');
    expect(result).toContain('AUD');
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = mylib.getProduct(1);
    expect(result).toEqual({ id: 1, title: 'banana', price: 10 });
    expect(result).toMatchObject({ id: 1 });
    expect(result).toHaveProperty('title', 'banana');
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => {
        mylib.registerUser(a);
      }).toThrow();
    });
  });
  it('should return a user object if valid username is passed', () => {
    const result = mylib.registerUser('John');
    expect(result).toMatchObject({ username: 'John' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('fizzBuzz', () => {
  it('should throw an error if input is not a number', () => {
    expect(() => {
      mylib.fizzBuzz('a');
    }).toThrow();
    expect(() => {
      mylib.fizzBuzz(null);
    }).toThrow();
    expect(() => {
      mylib.fizzBuzz(undefined);
    }).toThrow();
  });
  it('should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = mylib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('should return Fizz if input is divisible by 3', () => {
    const result = mylib.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  it('should return Buzz if input is divisible by 5', () => {
    const result = mylib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  it('should return input if input is not divisible by 3 or 5', () => {
    const result = mylib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
