import { scrapeAndStore } from './scraper.js';

async function runScraping() {
    try {
        await scrapeAndStore();
        console.log("Scraping and storing completed successfully.");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Execute the scraping function
runScraping();
