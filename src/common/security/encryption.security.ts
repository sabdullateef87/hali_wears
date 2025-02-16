import * as crypt from "bcrypt";

const hash = async (password: string) => {
    const hashedPassword = await crypt.hash(password, 10);
    return hashedPassword;
}

const isPasswordMatch = async (password: string, hashedPassword: string) => {
    return await crypt.compare(password, hashedPassword);
}

export { hash, isPasswordMatch };
