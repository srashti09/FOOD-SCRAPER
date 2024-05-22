import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';
import zlib from 'zlib';
import fetch from 'node-fetch';

// Read IDs from the combined_listArray.txt file
const combinedListFilePath = "combined_listArray.txt";
const ids = JSON.parse(fs.readFileSync(combinedListFilePath, "utf-8"));

// Fetching responses and saving to individual JSON files
const urlTemplate = "https://portal.grab.com/foodweb/v2/merchants/";
const outputFolder = "responses";
fs.mkdirSync(outputFolder, { recursive: true });

async function fetchAndSaveResponses() {
    for (const merchantId of ids) {
        const url = urlTemplate + merchantId;
        const response = await fetch(url);
        const responseBody = await response.text();

        const outputFilePath = path.join(outputFolder, `${merchantId}_response.json`);
        fs.writeFileSync(outputFilePath, responseBody);

        console.log(`Response for ID ${merchantId} saved to ${outputFilePath}`);
    }
}

// Extracting data
const allData = [];

function extractData() {
    for (const merchantId of ids) {
        const inputFilePath = path.join(outputFolder, `${merchantId}_response.json`);
        const data = JSON.parse(fs.readFileSync(inputFilePath, "utf-8"));
        const merchantInfo = data.merchant;

        if (merchantInfo && merchantInfo.estimatedDeliveryFee) {
            const estimatedDeliveryFee = merchantInfo.estimatedDeliveryFee;

            let currency = "USD"; // Assuming the currency is in dollars by default

            // Check if the currency is explicitly specified
            if (estimatedDeliveryFee.currency) {
                currency = estimatedDeliveryFee.currency;
            }

            allData.push({
                ID: merchantInfo.ID,
                Details: {
                    Name: merchantInfo.name,
                    Cuisine: merchantInfo.cuisine,
                    TimeZone: merchantInfo.timeZone,
                    PhotoHref: merchantInfo.photoHref,
                    ETA: merchantInfo.ETA,
                    Latlng: merchantInfo.latlng,
                    Rating: merchantInfo.Rating,
                    DistanceInKm: merchantInfo.distanceInKm,
                    EstimatedDeliveryFee: {
                        Currency: currency, // Set the currency here
                        Price: estimatedDeliveryFee.price,
                        PriceDisplay: estimatedDeliveryFee.priceDisplay,
                        Status: estimatedDeliveryFee.status,
                        Multiplier: estimatedDeliveryFee.Multiplier,
                    },
                    Promotions: merchantInfo.promotions,
                    // Add more fields here
                }
            });
        } else {
            console.error(`Error: estimatedDeliveryFee is undefined for ID ${merchantId}`);
        }
    }
}
