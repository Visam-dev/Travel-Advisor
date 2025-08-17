import axios from "axios";

// Add rate limiting to prevent too many requests
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests to be safe

// Test function to verify API key works
export const testAPI = async () => {
  try {
    console.log("Testing API with hardcoded key");
    const response = await axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=24.8607&longitude=67.0011&limit=5&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US', {
      headers: {
        "x-rapidapi-key": "2fd0b4c5admsh6ddb484874299aap1e2defjsna934e24faa4a",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });
    console.log("API Test successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Test failed:", error.response?.data || error.message);
    return null;
  }
};

export const getPlacesData = async (bounds, type = "restaurants") => {
  console.log("getplacesdata called with bounds", bounds, "and type", type);
  
  // Rate limiting
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    console.log("Rate limiting: waiting before next request...");
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - (now - lastRequestTime)));
  }
  lastRequestTime = Date.now();
  
  try {
    // Calculate center point from bounds
    const centerLat = (bounds.ne.lat + bounds.sw.lat) / 2;
    const centerLng = (bounds.ne.lng + bounds.sw.lng) / 2;
    
    console.log("Making API request with coordinates:", { centerLat, centerLng });
    console.log("Using hardcoded API key");
    
    let URL;
    
    switch(type) {
      case "restaurants":
        URL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${centerLat}&longitude=${centerLng}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`;
        break;
      case "hotels":
        URL = `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${centerLat}&longitude=${centerLng}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
        break;
      case "attractions":
        URL = `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?latitude=${centerLat}&longitude=${centerLng}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
        break;
      default:
        URL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${centerLat}&longitude=${centerLng}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`;
    }

    console.log("Request URL:", URL);

    const {
      data: { data },
    } = await axios.get(URL, {
      headers: {
        "x-rapidapi-key": "2fd0b4c5admsh6ddb484874299aap1e2defjsna934e24faa4a",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });
    
    console.log("API Response received:", data ? data.length : "No data");
    return data;
  } catch (error) {
    console.error("Error fetching places data:", error);
    console.error("Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return null;
  }
};