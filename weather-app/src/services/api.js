/* First request - Use Geo-coding api to gather the long and lat of a specefic loctaion 

1. create state to save the location that the user has searched for - DONE (state name - submittedSearch)
2. set up function that makes api request to Geo-coding to gather the lat and longitude values

once we have the lat and long values, we can use them to gather weather data for the desired location.

*/

const key = "a2908dd7515a80a21c48877f342f56c2"

async function locationData(location) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${key}`
    console.log('Geocoding URL:', url)

    const response = await fetch(url)
    const data = await response.json()
    console.log('response data:', data)
    return data;
}

export { locationData }

/* Second request - Use the Lat & Long values from our Geo-coding api request to gather weather data from desired location

1. Write our weather API request which takes the Lat and Long values of the searched location
2. Create useEffect function in searchBar to be is triggered once co-ordinates state is updated, which calls our weather api request.
4. Save weather data in new state.

*/

async function weatherData(lat,lon) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${key}`

    const response = await fetch(url)
    const data = await response.json()

    return data;
}

export { weatherData }