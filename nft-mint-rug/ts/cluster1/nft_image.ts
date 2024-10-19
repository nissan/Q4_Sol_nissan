import wallet from "../../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"
import path from "path"
import dotenv from "dotenv";

const envPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

// Create a devnet connection
// const umi = createUmi('https://api.devnet.solana.com');
const umi = createUmi(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const imagePath = path.resolve(__dirname, "../../journalquest-vision.png");

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image

        const image = await readFile(imagePath);

        const myUri = await createGenericFile(
            image, 
            "JournalQuest-Vision",
        {
            contentType: "image/png",
        })
        
        console.log("Your image URI: ", myUri);

        const uri = await umi.uploader.upload(
            [myUri]
        );

        console.log("Your image URI: ", uri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
