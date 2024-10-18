use std::io::{self, BufRead}; // Import for handling stdin input
use bs58; // Import the bs58 crate for base58 encoding/decoding

#[test]
fn base58_to_wallet() {
    // Simulating user input for the base58 encoded wallet string
    println!("Enter base58 encoded wallet string:");
    
    let stdin = io::stdin();
    let base58_input = stdin.lock().lines().next().unwrap().unwrap(); 
    // Example base58 string: "gdtKSTXYULQNx87fdD3YgXkzVeyFeqwtxHm6WdEb5a9YJRnHse7GQr7t5pbepsyvUCk7VvksUGhPt4SZ8JHVSkt"
    
    // Decode the base58 input string into a vector of bytes
    let wallet_bytes = bs58::decode(base58_input).into_vec().unwrap();
    
    // Print the resulting byte vector
    println!("Decoded wallet (bytes): {:?}", wallet_bytes);
}

#[test]
fn wallet_to_base58() {
    // Example wallet byte vector
    let wallet_bytes: Vec<u8> = vec![
        34, 46, 55, 124, 141, 190, 24, 204, 134, 91, 70, 184, 161, 181, 44, 122, 15, 172, 63, 62,
        153, 150, 99, 255, 202, 89, 105, 77, 41, 89, 253, 130, 27, 195, 134, 14, 66, 75, 24, 242,
        7, 132, 234, 160, 203, 109, 195, 116, 251, 144, 44, 28, 56, 231, 114, 50, 131, 185, 168, 138,
        61, 35, 98, 78, 53
    ];
    
    // Encode the byte vector into a base58 string
    let base58_encoded = bs58::encode(wallet_bytes).into_string();
    
    // Print the resulting base58 string
    println!("Encoded wallet (base58): {:?}", base58_encoded);
}
