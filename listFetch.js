import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Read IDs from the combined_listArray.txt file
const combinedListFilePath = "combined_listArray.txt";
const ids = JSON.parse(fs.readFileSync(combinedListFilePath, "utf-8"));

// Path to the folder where responses will be saved
const outputFolder = "responses";

// Function to extract data and save it in gzip of ndjson format
function extractAndSaveData() {
    for (const merchantId of ids) {
        // Read the response file
        const inputFilePath = path.join(outputFolder, `${merchantId}_response.json`);
        const data = JSON.parse(fs.readFileSync(inputFilePath, "utf-8"));
        const merchantInfo = data.merchant;

        // Check if the required data is available
        if (merchantInfo && merchantInfo.estimatedDeliveryFee) {
            const estimatedDeliveryFee = merchantInfo.estimatedDeliveryFee;
            let currency = "USD"; // Default currency

            // Check if the currency is specified
            if (estimatedDeliveryFee.currency) {
                currency = estimatedDeliveryFee.currency;
            }

            // Construct the data object
            const extractedData = {
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
                        Currency: currency,
                        Price: estimatedDeliveryFee.price,
                        PriceDisplay: estimatedDeliveryFee.priceDisplay,
                        Status: estimatedDeliveryFee.status,
                        Multiplier: estimatedDeliveryFee.Multiplier,
                    },
                    Promotions: merchantInfo.promotions,
                    // Add more fields here if needed
                }
            };

            // Convert the object to ndjson format
            const ndjsonData = JSON.stringify(extractedData) + '\n';

            // Compress the ndjson data
            const compressedData = zlib.gzipSync(ndjsonData);

            // Write the compressed data to a file
            const outputFilePath = path.join(outputFolder, `${merchantId}_extracted_data.ndjson.gz`);
            fs.writeFileSync(outputFilePath, compressedData);

            console.log(`Extracted data for ID ${merchantId} saved to ${outputFilePath}`);
        } else {
            console.error(`Error: estimatedDeliveryFee is undefined for ID ${merchantId}`);
        }
    }
}

// Call the function to extract and save data
extractAndSaveData();
