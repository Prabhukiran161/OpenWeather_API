Weather App

Objective

Create a weather app that fetches real-time weather data for a city using an open API (e.g., OpenWeatherMap API).

Features

Allow users to input a city name.

Use the Fetch API to call the weather API.

Use Promises to handle API response and errors.

Display the following weather details for the city:

Temperature

Weather description

Humidity

Wind speed

Include a loading message while fetching data.

Handle and display errors (e.g., invalid city name or network error).

Bonus Features

Show a 5-day weather forecast.

Use Promise.all to fetch data from multiple endpoints simultaneously (e.g., current weather and forecast).

Technologies Used

HTML

CSS

JavaScript (ES6+)

Fetch API

OpenWeatherMap API

Installation and Setup

Clone the repository:

git clone https://github.com/your-username/weather-app.git
cd weather-app

Create an .env file to store your API key securely:

API_KEY=your_openweathermap_api_key

Install dependencies (if applicable):

npm install

Run the project:

open index.html

Usage

Enter a city name in the search bar.

Click the "Get Weather" button.

View the current weather details.

Check the 5-day weather forecast (if implemented).

Error Handling

Displays an error message for invalid city names.

Alerts the user if there is a network issue.

Handles API errors gracefully.

How API Key is Hidden

API key is stored in an .env file.

The .gitignore file includes .env to prevent committing sensitive data.

Example API Endpoints Used

Current Weather: https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}

5-Day Forecast: https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}

Future Enhancements

Improve UI/UX with animations.

Add location-based weather detection.

Support multiple weather APIs.

Implement unit conversion (Celsius/Fahrenheit).
