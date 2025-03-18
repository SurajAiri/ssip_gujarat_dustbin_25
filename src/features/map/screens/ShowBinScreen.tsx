import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import  { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, MarkerClusterer, Libraries } from '@react-google-maps/api';
import { IBinMarker } from "@/types/Dustbin";


// Initial map center (Gujarat)
const center = {
    lat: 23.2156,
    lng: 72.6369
};

// Function to generate random bins for testing
const generateRandomBins = (count = 100): IBinMarker[] => {
    const bins: IBinMarker[] = [];
    
    // Center point (Gujarat)
    const centerPoint = center;
    
    // 10km in degrees is approximately:
    // 1 degree of latitude = ~111km, so 10km = ~0.09 degrees latitude
    // 1 degree of longitude varies with latitude, at 23.2156°N it's roughly 102km, so 10km = ~0.098 degrees longitude
    const radiusLat = 0.09;
    const radiusLng = 0.098;
    
    for (let i = 0; i < count; i++) {
        // Generate random position within 10km radius
        // Using random angle and distance (up to 10km)
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 1; // 0-1 scale for the radius
        
        // Convert to lat/lng offset
        const lat = centerPoint.lat + (Math.cos(angle) * distance * radiusLat);
        const lng = centerPoint.lng + (Math.sin(angle) * distance * radiusLng);
        
        // Generate random fill percentage
        const filledPercentage = Math.floor(Math.random() * 101);
        const completelyFilled = filledPercentage >= 95;
        
        bins.push({
            id: `bin-${i}`,
            position: { lat, lng },
            title: `Waste Collection Point #${i + 1}`,
            description: `Collection point in ${filledPercentage > 80 ? 'critical' : filledPercentage > 50 ? 'moderate' : 'good'} condition`,
            filledPercentage,
            completelyFilled
        });
    }
    
    return bins;
};

// Sample bin data - generates 100 random bins by default
const sampleBins: IBinMarker[] = generateRandomBins();

const libraries: Libraries = ['places'];

export function ShowBinScreen() {
    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY as string,
        libraries
    });

    // const [map, setMap] = useState<google.maps.Map | null>(null);
    const [bins] = useState<IBinMarker[]>(sampleBins);
    const [selectedBin, setSelectedBin] = useState<IBinMarker | null>(null);

    // Handle map load
    // const onLoad = useCallback((map: google.maps.Map) => {
    //     // setMap(map);
    // }, []);

    // Handle map unmount
    // const onUnmount = useCallback(() => {
    //     setMap(null);
    // }, []);

    // Get custom bin marker icon based on fill percentage
    const getBinMarkerIcon = (bin: IBinMarker) => {
        // Determine color based on fill percentage
        let fillColor = '#4ade80'; // Green for low fill
        
        if (bin.completelyFilled) {
            fillColor = '#ef4444'; // Red for completely filled
        } else if (bin.filledPercentage >= 90) {
            fillColor = '#f97316'; // Orange for nearly full
        } else if (bin.filledPercentage >= 70) {
            fillColor = '#facc15'; // Yellow for medium-high
        } else if (bin.filledPercentage >= 50) {
            fillColor = '#a3e635'; // Light green/yellow for medium
        }
        
        // Bin icon path
        const path = bin.completelyFilled 
            ? 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm-3 6h6v1h-6V8zm1 3h4v5h-4v-5zm-2 7h8v1h-8v-1z' // Full bin
            : 'M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm-3 6h6v1h-6V8zm2 3h2v5h-2v-5zM9 16h6v1H9v-1z'; // Empty bin
        
        // Adjust scale based on fill percentage
        const scale = bin.filledPercentage >= 90 ? 1.8 : 1.5;
    
        return {
            path: path,
            fillColor: fillColor,
            fillOpacity: 1,
            strokeColor: '#3f403f',
            strokeWeight: 2,
            scale: scale,
            anchor: new google.maps.Point(12, 22),
        };
    };

    // Cluster options
    const clusterOptions = {
        gridSize: 60,
        minimumClusterSize: 3,
        maxZoom: 18
    };

    if (!isLoaded) return <div className="flex-grow flex items-center justify-center">Loading map...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader />
            <div className="flex-grow">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%', minHeight: '800px' }}
                    center={center}
                    zoom={13}
                    // onLoad={onLoad}
                    // onUnmount={onUnmount}
                    options={{
                        fullscreenControl: false,
                        mapTypeControl: false,
                        streetViewControl: false,
                        styles: [
                            {
                                featureType: "poi",
                                stylers: [{ visibility: "off" }] // Hide points of interest
                            }
                        ]
                    }}
                >
                    <MarkerClusterer options={clusterOptions}>
                        {(clusterer) => (
                            <>
                                {bins.map(bin => (
                                    <Marker
                                        key={bin.id}
                                        position={bin.position}
                                        title={bin.title}
                                        onClick={() => setSelectedBin(bin)}
                                        icon={getBinMarkerIcon(bin)}
                                        clusterer={clusterer}
                                    />
                                ))}
                            </>
                        )}
                    </MarkerClusterer>

                    {/* Info window for selected bin */}
                    {selectedBin && (
                        <InfoWindow
                            position={selectedBin.position}
                            onCloseClick={() => setSelectedBin(null)}
                        >
                            <div className="p-1">
                                <h3 className="font-semibold">{selectedBin.title}</h3>
                                <p className="text-sm">{selectedBin.description}</p>
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className={`h-2.5 rounded-full ${
                                                selectedBin.filledPercentage >= 90 ? 'bg-red-500' : 
                                                selectedBin.filledPercentage >= 70 ? 'bg-yellow-500' : 
                                                'bg-green-500'
                                            }`} 
                                            style={{width: `${selectedBin.filledPercentage}%`}}
                                        ></div>
                                    </div>
                                    <p className="text-xs mt-1">
                                        Fill status: {selectedBin.filledPercentage}% 
                                        {selectedBin.completelyFilled ? ' (Full)' : ''}
                                    </p>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
            <Footer />
        </div>
    );
}