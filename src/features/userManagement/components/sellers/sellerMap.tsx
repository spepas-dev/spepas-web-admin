import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo, useState } from 'react';

import { Seller } from '../../types';

interface SellerMapProps {
  sellers: Seller[];
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const libraries = ['places'];

export function SellerMap({ sellers, selectedLocation, onLocationSelect }: SellerMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any
  });

  const [selectedMarker, setSelectedMarker] = useState<Seller | null>(null);

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
      {sellers.map((seller, index) => (
        <Marker
          key={index}
          position={{ lat: seller.sellerDetails.Location.coordinates[0], lng: seller.sellerDetails.Location.coordinates[1] }}
          onClick={() => setSelectedMarker(seller)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.sellerDetails.Location.coordinates[0],
            lng: selectedMarker.sellerDetails.Location.coordinates[1]
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2">
            <h3 className="font-medium text-gray-900">{selectedMarker.sellerDetails.storeName}</h3>
            <p className="text-sm text-gray-600">Gopa ID: {selectedMarker.sellerDetails.Gopa_ID}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
