# Grab Food Delivery Web Scraper

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Introduction
Welcome to the Grab Food Delivery Web Scraper project! This Node.js-based web scraping tool is designed to extract and analyze data from the GrabFood website in Singapore. The scraper collects information about restaurants, including details such as delivery fees and estimated delivery times.

## Features
- **Web Scraping**: Extracts data from the GrabFood website, focusing on restaurant information.
- **Data Processing**: Parses the extracted data and organizes it into structured formats.
- **API Requests**: Fetches detailed information about specific merchants using Grab's API.
- **Data Combination**: Combines collected data into a cohesive format for analysis.
- **Response Grab**: Uses collected IDs to fetch responses and extract specific details about merchants.

## Getting Started
To get started with this project, follow the installation instructions and explore the various features available.

### Prerequisites
Before starting with the GrabFood Web Scraper project, ensure you have the following installed:
- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).

### Installation
1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-username/grabfood-web-scraper.git
    cd grabfood-web-scraper
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

### Usage
1. **Run the Scraper Script** (`scraper.js`):
    ```sh
    node scraper.js
    ```

2. **Run the List Fetch Script** (`listFetch.js`):
    ```sh
    node listFetch.js
    ```

3. **Run the List Making Script** (`listMaking.cjs`):
    ```sh
    node listMaking.cjs
    ```

4. **Run the Response Script** (`response.js`):
    ```sh
    node response.js
    ```

5. **Check the `responses` Folder**:
    The gzipped NDJSON files with the extracted data will be saved in the `responses` folder.

## Project Structure
- `scraper.js`: Initial script to scrape HTML content from the GrabFood website.
- `listFetch.js`: Uses collected IDs to make API requests and fetch detailed information about specific merchants.
- `listMaking.cjs`: Combines the collected data into a structured format.
- `response.js`: Handles fetching responses and saving them in the desired format.
- `combined_listArray.txt`: Input file containing IDs to be scraped.
- `responses/`: Folder where the extracted data is saved.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## How It Works
### Web Scraping
- **Initial Script (`scraper.js`)**: Uses `axios` and `cheerio` to scrape HTML content from the GrabFood website.

### Data Processing
- **Fetch List Data (`listFetch.js`)**: Uses collected IDs to make API requests and fetch detailed information about specific merchants.

### Data Combination
- **Combine Data (`listMaking.cjs`)**: Combines the collected data into a structured format for comprehensive analysis.

### Response Grab
- **Fetch Responses (`response.js`)**: Uses collected IDs to fetch responses and extract specific details about merchants.

## Approach
### Solution Design
1. **Load Necessary Modules**: Load required Node.js libraries (`axios`, `cheerio`, `fs`, `path`, `zlib`).
2. **Extract Data**: Scrape and parse data from the GrabFood website.
3. **Process Data**: Format and store the extracted data.
4. **Fetch Detailed Information**: Use API requests to get detailed information about specific merchants.
5. **Combine Data**: Organize and combine the collected data into a structured format.
6. **Save Responses**: Save the final data in gzip-compressed NDJSON format.

### Technologies
- **Node.js**: Server-side JavaScript runtime.
- **Axios**: Promise-based HTTP client.
- **Cheerio**: Fast, flexible, and lean implementation of core jQuery for the server.
- **FS**: Node.js file system module.
- **Path**: Node.js path module.
- **Zlib**: Node.js compression module.

### Starting
1. **Clone the Project**:
    ```sh
    git clone https://github.com/your-username/grabfood-web-scraper.git
    cd grabfood-web-scraper
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Project**:
    ```sh
    # Scrape initial data
    node scraper.js
    
    # Fetch detailed data
    node listFetch.js
    
    # Combine data
    node listMaking.cjs
    
    # Fetch responses and extract detailed data
    node response.js
    ```
