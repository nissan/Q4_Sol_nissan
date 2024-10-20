import wallet from "../../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(__dirname, '../../.env.local');
dotenv.config({ path: envPath });
// Create a devnet connection
// const umi = createUmi('https://api.devnet.solana.com');
const umi = createUmi(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/3EkaauQ4W6b2w7C8eTpAU4jrRryDEZwAxWA5JuED2LKy";
        const metadata = {
            name: "JournalQuest Vision",
            symbol: "JQV",
            description: "Eat, Sleep, Journal, Quest, Repeat",
            image: image,
            attributes: [
                {trait_type: 'JournalMojo', value: '100'},
                {trait_type: 'QuestMojo', value: '100'},
                {trait_type: 'RugIntensity', value: '0'},
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: [
                keypair.publicKey
            ]
        };
        
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
