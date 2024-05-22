const fs = require('fs');

// Specify the path to your JSON file
const jsonFilePath = 'combined_list.txt';
const outputFilePath = 'combined_listArray.txt';

try {
    // Read the JSON content
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Extract data from "getRecommendedMerchantsV2" and "getRestaurantsV2"
    const recommendedMerchants = data['getRecommendedMerchantsV2/countryCode=SG&latitude=1.287953&longitude=103.851784']['getRecommendedMerchantsV2/countryCode=SG&latitude=1.287953&longitude=103.851784'];
    const restaurantList = data['getRestaurantsV2/countryCode=SG&latlng=1.287953%2C103.851784']['getRestaurantsV2/countryCode=SG&latlng=1.287953%2C103.851784'];

    // Combine both lists into a single list
    const combinedList = recommendedMerchants.concat(restaurantList);

    // Print or process the combined list as needed
    console.log("Combined List Array:", combinedList);

    // Store the combined list as a JSON array in a text file
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedList, null, 2));

    console.log(`Combined list stored in '${outputFilePath}'`);

} catch (error) {
    console.error("Error:", error.message);
}
