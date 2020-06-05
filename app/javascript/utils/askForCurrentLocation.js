const askForCurrentLocation = (map) => {
  if (!navigator.geolocation) return false;

  navigator.geolocation.getCurrentPosition(map.point);
};

export default askForCurrentLocation;
