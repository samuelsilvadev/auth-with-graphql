import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function generateHash(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

export function isPasswordCorrect(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
