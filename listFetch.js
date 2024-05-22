const fs = require('fs');

// Specify the path to your JSON file
const jsonFilePath = 'resultJson.json';
const outputFilePath = 'combined_list.txt';

try {
    // Read the JSON content
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    // Extract data from "recommendedMerchants" and "restaurantList"
    const recommendedMerchants = jsonData.props.initialReduxState.pageRestaurantsV2.collections.recommendedMerchants;
    const restaurantList = jsonData.props.initialReduxState.pageRestaurantsV2.collections.restaurantList;

    // Combine both lists into a single object
    const combinedList = {
        'getRecommendedMerchantsV2/countryCode=SG&latitude=1.287953&longitude=103.851784': recommendedMerchants,
        'getRestaurantsV2/countryCode=SG&latlng=1.287953%2C103.851784': restaurantList
    };

    // Print or process the combined list as needed
    console.log('Combined List:', combinedList);

    // Store the combined list in a text file
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedList, null, 2), 'utf-8');
    console.log(`Combined list stored in '${outputFilePath}'`);
} catch (error) {
    console.error('Error:', error.message);
}
