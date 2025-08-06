export const formatTime = (timestamp) =>{
    const date = new Date(timestamp);
    
    // Convert UTC to IST using toLocaleString
    const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures AM/PM format
    };
    
    return date.toLocaleString("en-IN", options);
}

export const log = (...args) => {
  console.log(new Date().toISOString(), ...args);
};


export const debounce = (fn, delay = 300) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
