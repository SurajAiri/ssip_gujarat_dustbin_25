export interface IDustbin{
    id: string;
    location: string;
    status: string;
    category: string;
    filled: number;
    capacity: number;
    filledPercentage: number;
}

// Define types for our markers
export interface IBinMarker {
    id: string;
    position: google.maps.LatLngLiteral;
    title: string;
    description: string;
    filledPercentage: number;
    completelyFilled: boolean;
}