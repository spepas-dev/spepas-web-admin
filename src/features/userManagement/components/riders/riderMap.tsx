import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { useState, useMemo } from "react"
import { Rider } from "."

interface RiderMapProps {
  riders: Rider[]
  selectedLocation: { lat: number; lng: number } | null
  onLocationSelect: (location: { lat: number; lng: number }) => void
}

const libraries = ["places"]

export function RiderMap({ 
  riders, 
  selectedLocation,
  onLocationSelect 
}: RiderMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any,
  })

  const [selectedMarker, setSelectedMarker] = useState<Rider | null>(null)

  const center = useMemo(
    () => selectedLocation || { lat: 5.6037, lng: -0.1870 }, // Default to Accra
    [selectedLocation]
  )

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-red-600">Error loading map. Please check your API key.</div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
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
            lng: e.latLng.lng(),
          })
        }
      }}
    >
      {riders.map((rider, index) => (
        <Marker
          key={index}
          position={{ lat: rider.latitude, lng: rider.longitude }}
          onClick={() => setSelectedMarker(rider)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2">
            <h3 className="font-medium text-gray-900">License: {selectedMarker.licenseNumber}</h3>
            <p className="text-sm text-gray-600">ID: {selectedMarker.User_ID}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
} 