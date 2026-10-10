export interface RouteStopInput {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  contactName?: string;
  phone?: string;
  itemsDescription: string;
  weightKg: number;
  windowText?: string;
}

export interface RouteStopOutput extends RouteStopInput {
  stopOrder: number;
  isDepot: boolean;
  legDistanceKm: number;
  legDurationMinutes: number;
  cumulativeDistanceKm: number;
  cumulativeCargoKg: number;
  estimatedArrivalMinutes: number;
}

export interface OptimizedRouteResult {
  depot: RouteStopInput;
  orderedStops: RouteStopOutput[];
  totalDistanceKm: number;
  totalDurationMinutes: number;
  totalCargoKg: number;
  unoptimizedDistanceKm: number;
  distanceSavedKm: number;
  fuelSavedLiters: number;
  co2SavedKg: number;
  mapPolylineCoordinates: [number, number][];
}

// Great-circle distance between two GPS coordinates using Haversine formula
export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

// Nearest Neighbor + 2-Opt Local Search TSP Solver
export function optimizePickupRoute(
  depot: RouteStopInput,
  pickups: RouteStopInput[]
): OptimizedRouteResult {
  if (pickups.length === 0) {
    return {
      depot,
      orderedStops: [],
      totalDistanceKm: 0,
      totalDurationMinutes: 0,
      totalCargoKg: 0,
      unoptimizedDistanceKm: 0,
      distanceSavedKm: 0,
      fuelSavedLiters: 0,
      co2SavedKg: 0,
      mapPolylineCoordinates: [[depot.lat, depot.lng]],
    };
  }

  // 1. Calculate Unoptimized Distance (separate individual round trips from depot)
  let unoptimizedDistance = 0;
  for (const p of pickups) {
    unoptimizedDistance += haversineDistanceKm(depot.lat, depot.lng, p.lat, p.lng) * 2;
  }

  // 2. Greedy Nearest Neighbor Construction
  const unvisited = [...pickups];
  const tour: RouteStopInput[] = [];
  let currentLat = depot.lat;
  let currentLng = depot.lng;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const d = haversineDistanceKm(currentLat, currentLng, unvisited[i].lat, unvisited[i].lng);
      if (d < minDistance) {
        minDistance = d;
        nearestIndex = i;
      }
    }

    const nextStop = unvisited.splice(nearestIndex, 1)[0];
    tour.push(nextStop);
    currentLat = nextStop.lat;
    currentLng = nextStop.lng;
  }

  // 3. 2-Opt Optimization Loop for route crossing elimination
  let improved = true;
  let iterations = 0;
  while (improved && iterations < 50) {
    improved = false;
    iterations++;

    for (let i = 0; i < tour.length - 1; i++) {
      for (let k = i + 1; k < tour.length; k++) {
        const prevA = i === 0 ? depot : tour[i - 1];
        const nodeA = tour[i];
        const nodeB = tour[k];
        const nextB = k === tour.length - 1 ? depot : tour[k + 1];

        const currentDist =
          haversineDistanceKm(prevA.lat, prevA.lng, nodeA.lat, nodeA.lng) +
          haversineDistanceKm(nodeB.lat, nodeB.lng, nextB.lat, nextB.lng);

        const newDist =
          haversineDistanceKm(prevA.lat, prevA.lng, nodeB.lat, nodeB.lng) +
          haversineDistanceKm(nodeA.lat, nodeA.lng, nextB.lat, nextB.lng);

        if (newDist < currentDist - 0.01) {
          // Reverse sub-segment [i...k]
          const sub = tour.slice(i, k + 1).reverse();
          tour.splice(i, k - i + 1, ...sub);
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  // 4. Build Detailed Stop Output and Leg Metrics
  const orderedStops: RouteStopOutput[] = [];
  const mapPolylineCoordinates: [number, number][] = [[depot.lat, depot.lng]];

  let prevPoint = depot;
  let cumulativeDist = 0;
  let cumulativeCargo = 0;
  let totalMinutes = 0;

  // Average city driving speed: 28 km/h => 1 km ~ 2.14 minutes
  const driveMinutesPerKm = 2.14;
  const stopHandlingMinutes = 15; // 15 mins to check in, weigh, and load chilled items

  for (let i = 0; i < tour.length; i++) {
    const stop = tour[i];
    const legDist = haversineDistanceKm(prevPoint.lat, prevPoint.lng, stop.lat, stop.lng);
    const driveMinutes = Math.round(legDist * driveMinutesPerKm);
    totalMinutes += driveMinutes + stopHandlingMinutes;
    cumulativeDist += legDist;
    cumulativeCargo += stop.weightKg;

    orderedStops.push({
      ...stop,
      stopOrder: i + 1,
      isDepot: false,
      legDistanceKm: legDist,
      legDurationMinutes: driveMinutes,
      cumulativeDistanceKm: Number(cumulativeDist.toFixed(2)),
      cumulativeCargoKg: Number(cumulativeCargo.toFixed(1)),
      estimatedArrivalMinutes: totalMinutes - stopHandlingMinutes,
    });

    mapPolylineCoordinates.push([stop.lat, stop.lng]);
    prevPoint = stop;
  }

  // Return to Depot leg
  const returnDist = haversineDistanceKm(prevPoint.lat, prevPoint.lng, depot.lat, depot.lng);
  const returnDriveMinutes = Math.round(returnDist * driveMinutesPerKm);
  totalMinutes += returnDriveMinutes;
  cumulativeDist += returnDist;
  mapPolylineCoordinates.push([depot.lat, depot.lng]);

  const totalDist = Number(cumulativeDist.toFixed(2));
  const unoptDist = Number(unoptimizedDistance.toFixed(2));
  const savedDist = Math.max(0, Number((unoptDist - totalDist).toFixed(2)));

  // Fuel consumption: avg delivery van ~ 10 L per 100 km (0.10 L/km)
  // CO2 factor: 1 L diesel = 2.68 kg CO2
  const fuelSaved = Number((savedDist * 0.1).toFixed(2));
  const co2Saved = Number((fuelSaved * 2.68).toFixed(2));

  return {
    depot,
    orderedStops,
    totalDistanceKm: totalDist,
    totalDurationMinutes: totalMinutes,
    totalCargoKg: Number(cumulativeCargo.toFixed(1)),
    unoptimizedDistanceKm: unoptDist,
    distanceSavedKm: savedDist,
    fuelSavedLiters: fuelSaved,
    co2SavedKg: co2Saved,
    mapPolylineCoordinates,
  };
}
