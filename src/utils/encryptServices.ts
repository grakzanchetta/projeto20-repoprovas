import bcrypt from "bcrypt";

export function encryptMasterPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}
