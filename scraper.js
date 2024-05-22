import axios from 'axios';
import fs from 'fs';
import cheerio from 'cheerio';

const url = "https://food.grab.com/sg/en/restaurants";
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
};

// Make the request using axios
axios.get(url, { headers })
    .then(response => {
        // Check status code and proceed with parsing if successful
        if (response.status === 200) {
            // Load HTML content into Cheerio
            const $ = cheerio.load(response.data);
            
            // Find the script tag with id="__NEXT_DATA__"
            const scriptTag = $('script#__NEXT_DATA__').first();

            if (scriptTag.length > 0) {
                // Extract the content within the script tag
                const scriptContent = scriptTag.html().trim();

                // Save the content to a JSON file
                fs.writeFile('resultJson.json', scriptContent, 'utf8', (err) => {
                    if (err) throw err;
                    console.log('Data saved to resultJson.json');
                });
            } else {
                console.log("Error: Script tag with id='__NEXT_DATA__' not found.");
            }
        } else {
            console.log(`Error: Unable to fetch content. Status code: ${response.status}`);
        }
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
