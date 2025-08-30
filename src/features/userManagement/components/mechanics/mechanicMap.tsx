import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo, useState } from 'react';

import { Mepa } from '../../types/mechanics.types';

interface MechanicMapProps {
  mechanics: Mepa[];
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const libraries = ['places'];

export function MechanicMap({ mechanics, selectedLocation, onLocationSelect }: MechanicMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as 'places'[]
  });

  const [selectedMarker, setSelectedMarker] = useState<Mepa | null>(null);

  const center = useMemo(
    () => selectedLocation || { lat: 5.6037, lng: -0.187 }, // Default to Accra
    [selectedLocation]
  );

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-red-600">Error loading map. Please check your API key.</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerClassName="w-full h-full"
      onClick={(e) => {
        if (e.latLng) {
          onLocationSelect({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          });
        }
      }}
    >
      {mechanics.map((mechanic, index) => (
        <Marker
          key={index}
          position={{
            lat: mechanic.location?.coordinates[0],
            lng: mechanic.location?.coordinates[1]
          }}
          onClick={() => setSelectedMarker(mechanic)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.location?.coordinates[0],
            lng: selectedMarker.location?.coordinates[1]
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2">
            <h3 className="font-medium text-gray-900">{selectedMarker.shop_name}</h3>
            <p className="text-sm text-gray-600">{selectedMarker.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
