import { GEOLOCATION_TIMEOUT_MS } from '../constants';

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this device.'));
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: GEOLOCATION_TIMEOUT_MS,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};