import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';

// Define types for our markers
interface BinMarker {
    id: string;
    position: google.maps.LatLngLiteral;
    title: string;
    description: string;
    filledPercentage: number;
    completelyFilled: boolean;
}

// Initial map center (Gujarat)
const center = {
    lat: 23.2156,
    lng: 72.6369
};

// Sample bin data
const sampleBins: BinMarker[] = [
    {
        id: '1',
        position: { lat: 23.2156, lng: 72.6369 },
        title: 'Waste Collection Point #1',
        description: 'Main collection point in Ahmedabad',
        filledPercentage: 78,
        completelyFilled: false
    },
    {
        id: '2',
        position: { lat: 23.2256, lng: 72.6469 },
        title: 'Waste Collection Point #2',
        description: 'Secondary collection point',
        filledPercentage: 52,
        completelyFilled: false
    },
    {
        id: '3',
        position: { lat: 23.2056, lng: 72.6269 },
        title: 'Recycling Station',
        description: 'Specialized recycling point',
        filledPercentage: 99,
        completelyFilled: true
    },
    {
        id: '4',
        position: { lat: 23.2356, lng: 72.6569 },
        title: 'Waste Collection Point #4',
        description: 'Commercial waste collection',
        filledPercentage: 30,
        completelyFilled: false
    },
    {
        id: '5',
        position: { lat: 23.2456, lng: 72.6669 },
        title: 'Waste Collection Point #5',
        description: 'Residential waste collection',
        filledPercentage: 90,
        completelyFilled: false
    }
];

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places'];

export function ShowBinScreen() {
    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY as string,
        libraries
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [bins] = useState<BinMarker[]>(sampleBins);
    const [selectedBin, setSelectedBin] = useState<BinMarker | null>(null);

    // Handle map load
    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    // Handle map unmount
    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Get custom bin marker icon based on fill percentage
    const getBinMarkerIcon = (bin: BinMarker) => {
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
                    mapContainerStyle={{ width: '100%', height: '100%', minHeight: '500px' }}
                    center={center}
                    zoom={13}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
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