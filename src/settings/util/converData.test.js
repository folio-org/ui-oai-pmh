import { actualBooleansToStringify, stringifyBooleansToActual } from './convertData';

describe('actualBooleansToStringify', () => {
  it('converts true/false booleans to "true"/"false" strings', () => {
    const input = { a: true, b: false };
    const output = actualBooleansToStringify(input);

    expect(output).toEqual({ a: 'true', b: 'false' });
  });

  it('keeps non-boolean values unchanged', () => {
    const input = { a: 123, b: 'hello', c: null };
    const output = actualBooleansToStringify(input);

    expect(output).toEqual(input);
  });

  it('handles mixed types correctly', () => {
    const input = { a: true, b: 'false', c: false, d: 'test' };
    const output = actualBooleansToStringify(input);

    expect(output).toEqual({
      a: 'true',
      b: 'false',
      c: 'false',
      d: 'test',
    });
  });
});

describe('stringifyBooleansToActual', () => {
  it('converts "true"/"false" strings to booleans', () => {
    const input = { a: 'true', b: 'false' };
    const output = stringifyBooleansToActual(input);

    expect(output).toEqual({ a: true, b: false });
  });

  it('keeps non-boolean-string values unchanged', () => {
    const input = { a: 42, b: 'hello', c: null };
    const output = stringifyBooleansToActual(input);

    expect(output).toEqual(input);
  });

  it('handles mixed types correctly', () => {
    const input = { a: 'true', b: false, c: 'false', d: 10 };
    const output = stringifyBooleansToActual(input);

    expect(output).toEqual({
      a: true,
      b: false,
      c: false,
      d: 10,
    });
  });
});

describe('round-trip conversions', () => {
  it('boolean → string → boolean returns original object', () => {
    const original = { a: true, b: false, c: 'hello' };
    const roundTrip = stringifyBooleansToActual(
      actualBooleansToStringify(original)
    );

    expect(roundTrip).toEqual(original);
  });

  it('string → boolean → string returns original object', () => {
    const original = { a: 'true', b: 'false', c: 'hello' };
    const roundTrip = actualBooleansToStringify(
      stringifyBooleansToActual(original)
    );

    expect(roundTrip).toEqual(original);
  });
});
