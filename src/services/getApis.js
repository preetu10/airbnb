
export const getPlacesinDhaka = async () => {
  try {
    const res = await fetch("http://localhost:5000/places-in-dhaka"); 
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};

export const getPlacesinBusan = async () => {
  try {
    const res = await fetch("http://localhost:5000/places-in-busan"); 
    const data = await res.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};
export const getPlacesinKualalampur = async () => {
  try {
    const res = await fetch("http://localhost:5000/places-in-kualalampur"); 
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};
export const getSearchDestinations = async () => {
  try {
    const res = await fetch("http://localhost:5000/search-destinations"); 
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
};