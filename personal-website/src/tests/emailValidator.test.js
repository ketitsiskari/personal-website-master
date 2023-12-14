/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import emailValidations from '../email-validator.js';
import { expect } from 'chai';
import sinon from 'sinon';

const { validate, validateAsync, validateWithThrow, validateWithLog } =
  emailValidations;

describe('Test email validate function', () => {
  it('Email must end with gmail.com', () => {
    const email = 'epam@gmail.com';
    const actual = validate(email);
    expect(actual).to.equal(true);
  });

  it('Email must end with outlook.com', () => {
    const email = 'epam@outlook.com';
    const actual = validate(email);
    expect(actual).to.equal(true);
  });

  it('Email must end with yandex.ru', () => {
    const email = 'epam@yandex.ru';
    const actual = validate(email);
    expect(actual).to.equal(true);
  });

  it('Invalid email should return false', () => {
    const email = 'epam@zadad';
    const actual = validate(email);
    expect(actual).to.equal(false);
  });

  it('Email domain must be lowercase', () => {
    const email = 'test@GMAIL.COM';
    const actual = validate(email);
    expect(actual).to.equal(false);
  });

  it('Email must contain something', () => {
    const email = '';
    const actual = validate(email);
    expect(actual).to.equal(false);
  });
});

/// ///////////////  validateAsync   ////////////////////////////////

describe('validateAsync() function', () => {
  it('should return true for a valid email ending', async () => {
    const email = 'epam@gmail.com';
    const actual = await validateAsync(email);
    expect(actual).to.equal(true);
  });

  it('should return true for a valid email ending', async () => {
    const email = 'epam@outlook.com';
    const actual = await validateAsync(email);
    expect(actual).to.equal(true);
  });

  it('should resolve to true for a valid email ending', async () => {
    const email = 'epam@yandex.ru';
    return validateAsync(email).then((actual) => {
      expect(actual).to.equal(true);
    });
  });

  it('should return false for an invalid email ending', async () => {
    const email = 'epam@org.ru';
    const actual = await validateAsync(email);
    expect(actual).to.equal(false);
  });
});

/// ////////////// validateWithThrow  /////////////////////////

describe('validateWithThrow() function', () => {
  it('should throw an error with a proper message for an invalid email ending', () => {
    const email = 'epam@dzadasd.org';
    expect(() => validateWithThrow(email)).to.throw(Error, 'Invalid email');
  });

  it('should throw an error with a proper message for another invalid email ending', () => {
    const email = 'epam@fafasd.net';
    expect(() => validateWithThrow(email)).to.throw(Error, 'Invalid email');
  });

  it('should not throw an error for a valid email ending', () => {
    const email = 'epam@gmail.com';
    expect(() => validateWithThrow(email)).to.not.throw();
  });
});
/// /////////////// validateWithLog //////////////////////////////////

describe('validateWithLog() function', () => {
  let logStub;

  beforeEach(() => {
    logStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    logStub.restore();
  });

  it('should return true for a valid email ending and log the result', () => {
    const email = 'epam@gmail.com';
    const result = validateWithLog(email);
    expect(result).to.be.true;
    expect(logStub.calledWith(`${email} ends with gmail.com`)).to.equal(true);
  });

  it('should return false for an invalid email ending and log the result', () => {
    const email = 'epam@gakdjad.org';
    const result = validateWithLog(email);
    expect(result).to.be.false;
    expect(logStub.calledWith(`${email} ends with gmail.com`)).to.equal(false);
  });
});
