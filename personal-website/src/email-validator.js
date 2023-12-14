const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yandex.ru'];

const validate = (email) => {
  for (const ending of VALID_EMAIL_ENDINGS) {
    if (email.endsWith(ending)) {
      return true;
    }
  }
  return false;
};

const validateAsync = (email) => {
  return new Promise((resolve) => {
    for (const ending of VALID_EMAIL_ENDINGS) {
      if (email.endsWith(ending)) {
        resolve(true);
        return;
      }
    }
    resolve(false);
  });
};

const validateWithThrow = (email) => {
  for (const ending of VALID_EMAIL_ENDINGS) {
    if (email.endsWith(ending)) {
      return true;
    }
  }

  throw new Error('Invalid email');
};

const validateWithLog = (email) => {
  for (const ending of VALID_EMAIL_ENDINGS) {
    if (email.endsWith(ending)) {
      console.log(`${email} ends with ${ending}`);
      return true;
    }
  }

  console.log(`${email} does not have a valid ending`);
  return false;
};

export default { validate, validateAsync, validateWithThrow, validateWithLog };
