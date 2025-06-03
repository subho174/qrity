export const getDistanceInMeters = (lat1, long1, lat2, long2) => {
  lat1 = Number(lat1);
  long1 = Number(long1);
  lat2 = Number(lat2);
  long2 = Number(long2);
  
  const R = 6371000; // Earth's radius in meters
  const toRad = (deg) => deg * (Math.PI / 180);

  const differenceInLat = toRad(lat2 - lat1);
  const differenceInLong = toRad(long2 - long1);
  const a =
    Math.sin(differenceInLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(differenceInLong / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
