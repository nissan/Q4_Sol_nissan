import bs58 from 'bs58';
import promptSync from 'prompt-sync';

// Initialize prompt
const prompt = promptSync();

// Prompt the user for the base58 private key
const privateKeyBase58 = prompt('Enter your base58-encoded private key: ');

// Decode the base58-encoded private key from Phantom
const decodedKey = bs58.decode(privateKeyBase58);

// Convert the decoded key into a Uint8Array
const uint8ArrayKey = new Uint8Array(decodedKey.buffer, decodedKey.byteOffset, decodedKey.byteLength / Uint8Array.BYTES_PER_ELEMENT);

// Output the key as a JSON array to the console
console.log('Decoded Private Key:', JSON.stringify(Array.from(uint8ArrayKey)));
