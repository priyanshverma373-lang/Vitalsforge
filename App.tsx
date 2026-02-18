import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { LocatingScreen } from './screens/LocatingScreen';
import { EmergencyDashboard } from './screens/EmergencyDashboard';
import { ManualLocationScreen } from './screens/ManualLocationScreen';
import { AppState, GeoLocationState, EmergencyType } from './types';
import { getCurrentPosition } from './services/location';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [location, setLocation] = useState<GeoLocationState>({
    coords: null,
    error: null,
    loading: false,
    accuracy: null,
    timestamp: null
  });
  
  const triggerEmergency = () => {
    setAppState(AppState.LOCATING);
    fetchLocation();
  };

  const fetchLocation = async () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));
    try {
      const position = await getCurrentPosition();
      setLocation({
        coords: position.coords,
        error: null,
        loading: false,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      });
      setAppState(AppState.EMERGENCY_ACTIVE);
    } catch (err: any) {
      setLocation(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || 'Location timeout' 
      }));
      // In this specific UI flow, we might want to proceed to Dashboard even with error to show the UI
      // But let's stick to logic:
    }
  };

  const handleManualSubmit = (locText: string) => {
    setLocation({
        coords: { latitude: 40.7128, longitude: -74.0060, accuracy: 10, altitude: null, altitudeAccuracy: null, heading: null, speed: null }, 
        error: null, 
        loading: false, 
        accuracy: 50, 
        timestamp: Date.now() 
    });
    setAppState(AppState.EMERGENCY_ACTIVE);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return (
          <HomeScreen 
            onTriggerEmergency={triggerEmergency} 
            onManualLocation={() => setAppState(AppState.MANUAL_INPUT)} 
          />
        );
      case AppState.LOCATING:
        return (
          <LocatingScreen 
            error={location.error} 
            onRetry={fetchLocation} 
            onManual={() => setAppState(AppState.MANUAL_INPUT)} 
          />
        );
      case AppState.MANUAL_INPUT:
        return (
          <ManualLocationScreen 
            onSubmit={handleManualSubmit} 
            onCancel={() => setAppState(AppState.IDLE)} 
          />
        );
      case AppState.EMERGENCY_ACTIVE:
        return (
            <EmergencyDashboard 
                location={location} 
                onReset={() => setAppState(AppState.IDLE)} 
            />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col max-w-lg mx-auto shadow-2xl overflow-hidden relative">
      <main className="flex-1 relative h-full w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;