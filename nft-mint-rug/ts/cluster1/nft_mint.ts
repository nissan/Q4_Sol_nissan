import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../../wba-wallet.json"
import base58 from "bs58";

import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

// const RPC_ENDPOINT = "https://api.devnet.solana.com";
const RPC_ENDPOINT = `https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(
        umi,
        {
            mint,
            name: "JournalQuest Vision",
            symbol: "JQV",
            uri: "https://devnet.irys.xyz/JBcKfew8MdFnM5cYvwLso3XGpvthMaYzbe7Su8g2J2CH",
            sellerFeeBasisPoints: percentAmount(1),
        }
    );

    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();