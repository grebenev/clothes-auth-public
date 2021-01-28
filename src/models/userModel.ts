import mongoose from 'mongoose';

import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// to hash password
const toHashPassword = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buffer.toString('hex')}.${salt}`;
};

// compare password
const comparePasswords = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buffer.toString('hex') === hashedPassword;
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform: (...args) => {
        delete args[1].password;
        args[1].id = args[1]._id;
        delete args[1]._id;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await toHashPassword(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
