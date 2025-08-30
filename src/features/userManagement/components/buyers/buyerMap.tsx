import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo, useState } from 'react';

import { Buyer } from '../../types/buyer.types';

interface BuyerMapProps {
  buyers: Buyer[];
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const libraries = ['places'];

export function BuyerMap({ buyers, selectedLocation, onLocationSelect }: BuyerMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as 'places'[]
  });

  const [selectedMarker, setSelectedMarker] = useState<Buyer | null>(null);

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
      {buyers.map((buyer, index) => (
        <Marker
          key={index}
          position={{
            lat: buyer.sellerDetails?.Location.coordinates[0] || 0,
            lng: buyer.sellerDetails?.Location.coordinates[1] || 0
          }}
          onClick={() => setSelectedMarker(buyer)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.sellerDetails?.Location.coordinates[0] || 0,
            lng: selectedMarker.sellerDetails?.Location.coordinates[1] || 0
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2">
            <h3 className="font-medium text-gray-900">{selectedMarker.name}</h3>
            <p className="text-sm text-gray-600">{selectedMarker.email}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
