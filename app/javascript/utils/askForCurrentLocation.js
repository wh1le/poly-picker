const askForCurrentLocation = (callback) => {
  if (!navigator.geolocation) return false;

  navigator.geolocation.getCurrentPosition(callback);
};

export default askForCurrentLocation;
