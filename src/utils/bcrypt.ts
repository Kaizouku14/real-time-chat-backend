import bcrypt from 'bcrypt'

/**
 * Encrypts a given string using bcrypt.
 *
 * @param {string} str - the string to be encrypted
 * @return {Promise<string>} the encrypted string
 */
const encrypt = (str : string): Promise<string> => {
  const saltRounds = 10;
  const hashString = bcrypt.hash(str, saltRounds);

  return hashString;
}

const compare = (password : string, currentPass : string) : Promise<boolean> => {
  return bcrypt.compare(password, currentPass);
}

export { encrypt , compare }