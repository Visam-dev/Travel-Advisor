import axios from "axios";

export const getPlacesData = async (bounds, type = "restaurants") => {
  console.log("getplacesdata called with bounds", bounds, "and type", type);
  try {
    const timestamp = new Date().getTime();
    let URL;
    
    switch(type) {
      case "restaurants":
        URL = `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${bounds.sw.lat}&tr_latitude=${bounds.ne.lat}&bl_longitude=${bounds.sw.lng}&tr_longitude=${bounds.ne.lng}&timestamp=${timestamp}`;
        break;
      case "hotels":
        URL = `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary?bl_latitude=${bounds.sw.lat}&tr_latitude=${bounds.ne.lat}&bl_longitude=${bounds.sw.lng}&tr_longitude=${bounds.ne.lng}&timestamp=${timestamp}`;
        break;
      case "attractions":
        URL = `https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary?bl_latitude=${bounds.sw.lat}&tr_latitude=${bounds.ne.lat}&bl_longitude=${bounds.sw.lng}&tr_longitude=${bounds.ne.lng}&timestamp=${timestamp}`;
        break;
      default:
        URL = `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${bounds.sw.lat}&tr_latitude=${bounds.ne.lat}&bl_longitude=${bounds.sw.lng}&tr_longitude=${bounds.ne.lng}&timestamp=${timestamp}`;
    }

    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: bounds.sw.lat,
        tr_latitude: bounds.ne.lat,
        bl_longitude: bounds.sw.lng,
        tr_longitude: bounds.ne.lng,
      },
      headers: {
        "x-rapidapi-key": "85990b601dmshfe4f909663afee7p175b65jsn53bf513ee609",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching places data:", error);
    return null;
  }
};