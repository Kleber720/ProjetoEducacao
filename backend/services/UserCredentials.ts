import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const deriveKey = promisify(scrypt);
const PREFIX = Buffer.from('SC1');


export async function hashPassword(password: string): Promise<Buffer> {

    const salt = randomBytes(14);

    const key = await deriveKey(password, salt, 32) as Buffer;
    
    return Buffer.concat([PREFIX, salt, key]);
}

export async function verifyPassword(password: string, stored: Buffer | string): Promise<boolean> {

    const value = Buffer.isBuffer(stored) ? stored : Buffer.from(stored, 'utf8');

    if (value.length === 49 && value.subarray(0, 3).equals(PREFIX)) {
        const key = await deriveKey(password, value.subarray(3, 17), 32) as Buffer;

        return timingSafeEqual(value.subarray(17), key);
    }
    
    const provided = Buffer.from(password, 'utf8');

    return value.length === provided.length && timingSafeEqual(value, provided);
}
