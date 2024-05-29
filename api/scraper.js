import axios from 'axios';
import cheerio from 'cheerio';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = "https://food.grab.com/sg/en/restaurants";
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
};

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://srashtisaxena09:B3i79IjFI0LlQ7EN@cluster0.yi8w1li.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = 'testDatabase';
const COLLECTION_NAME = 'testCollection';

console.log("MONGODB_URI:", MONGODB_URI);  // Debugging line

let client;

async function connectToMongoDB() {
    if (!client) {
        client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client;
}

export default async function scrapeAndStore() {
    try {
        // Make the request using axios
        const response = await axios.get(url, { headers });

        // Check status code and proceed with parsing if successful
        if (response.status === 200) {
            // Load HTML content into Cheerio
            const $ = cheerio.load(response.data);

            // Find the script tag with id="__NEXT_DATA__"
            const scriptTag = $('script#__NEXT_DATA__').first();

            if (scriptTag.length > 0) {
                // Extract the content within the script tag
                const scriptContent = JSON.parse(scriptTag.html().trim());

                // Connect to MongoDB
                const client = await connectToMongoDB();
                const db = client.db(DATABASE_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Insert data into MongoDB
                await collection.insertOne(scriptContent);
                console.log("Data inserted into MongoDB");
            } else {
                console.log("Error: Script tag with id='__NEXT_DATA__' not found.");
            }
        } else {
            console.log(`Error: Unable to fetch content. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Execute the function
scrapeAndStore();
