export enum AppState {
  IDLE = 'IDLE',
  LOCATING = 'LOCATING',
  EMERGENCY_ACTIVE = 'EMERGENCY_ACTIVE',
  MANUAL_INPUT = 'MANUAL_INPUT',
}

export interface GeoLocationState {
  coords: GeolocationCoordinates | null;
  error: string | null;
  loading: boolean;
  accuracy: number | null;
  timestamp: number | null;
}

export interface EmergencyGuide {
  title: string;
  immediateActions: string[];
  safetyTips: string[];
  emergencyServicesNumber: string;
}

export enum EmergencyType {
  GENERAL = 'General',
  MEDICAL = 'Medical',
  FIRE = 'Fire',
  POLICE = 'Police',
}

export interface GeminiResponse {
  guide: EmergencyGuide;
}