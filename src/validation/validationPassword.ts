import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// to hash password
export const toHashPassword = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buffer.toString('hex')}.${salt}`;
};

// compare password
export const comparePasswords = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buffer.toString('hex') === hashedPassword;
};
