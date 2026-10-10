/**
 * Haversine formula for calculating genuine great-circle distances
 * between two points on a sphere from their longitudes and latitudes.
 */

export interface LatLng {
  lat: number;
  lng: number;
}

export function calculateHaversineDistance(
  coord1: LatLng,
  coord2: LatLng
): number {
  const R = 6371; // Earth's mean radius in kilometers
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Returns rounded to 2 decimal places in km
}

/**
 * Calculates realistic city transit ETA based on distance and average urban congestion speed (22 km/h)
 */
export function calculateETA(distanceKm: number, avgSpeedKmh: number = 22): number {
  if (distanceKm <= 0.05) return 1;
  const hours = distanceKm / avgSpeedKmh;
  const minutes = Math.max(1, Math.round(hours * 60));
  return minutes;
}

/**
 * Calculates cumulative length along an array of waypoints
 */
export function calculateRouteTotalDistance(waypoints: LatLng[]): number {
  if (waypoints.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    total += calculateHaversineDistance(waypoints[i], waypoints[i + 1]);
  }
  return Math.round(total * 100) / 100;
}
