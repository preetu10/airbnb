// src/services/getApis.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
