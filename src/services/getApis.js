

const API_URL = "https://airbnb-server-coral.vercel.app" ;

const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return [];
  }
};

export const getPlacesinDhaka = () => fetchData("/places-in-dhaka");
export const getPlacesinBusan = () => fetchData("/places-in-busan");
export const getPlacesinKualalampur = () => fetchData("/places-in-kualalampur");
export const getSearchDestinations = () => fetchData("/search-destinations");
