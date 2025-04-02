import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import { useState } from "react";

interface IBinPickupRequest {
    title: string;
    description: string;
    isPermanent: boolean;
    image: string;
    location: string;
    status: string;
    personName: string;
    personContact: string;
    personEmail: string;
    eventDate?: string;
    duration?: number;
}

export function ResolveComplaintScreen() {
    // State to track images that failed to load
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
    
    // Mock data - replace with actual data fetching
    const requests: IBinPickupRequest[] = [
        {
            title: "Festival Waste Collection",
            description: "Need waste collection service for upcoming local festival",
            isPermanent: false,
            image: "https://images.unsplash.com/photo-1567374783534-30cbac30c628",
            location: "Ahmedabad, Gujarat",
            status: "pending",
            personName: "Raj Patel",
            personContact: "9876543210",
            personEmail: "raj.patel@example.com",
            eventDate: "2023-12-25",
            duration: 3
        },
        {
            title: "New Residential Area Bin",
            description: "Permanent waste bin needed for new housing society",
            isPermanent: true,
            image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
            location: "Gandhinagar, Gujarat",
            status: "approved",
            personName: "Priya Shah",
            personContact: "9876543211",
            personEmail: "priya.shah@example.com"
        },
        {
            title: "Market Area Collection",
            description: "Daily waste collection required for vegetable market",
            isPermanent: true,
            image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
            location: "Vadodara, Gujarat",
            status: "rejected",
            personName: "Amit Modi",
            personContact: "9876543212",
            personEmail: "amit.modi@example.com"
        }
    ];

    // Handle image load error
    const handleImageError = (index: number) => {
        setFailedImages(prev => ({...prev, [index]: true}));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader />
            <div className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-6">Pickup Requests</h1>
                <div className="grid gap-6">
                    {requests.map((request, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Image column - 1/3 width on desktop */}
                                <div className="md:col-span-1">
                                    <div className="relative h-[200px] md:h-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {/* Image loading skeleton */}
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                        
                                        {/* Actual image or fallback */}
                                        {!failedImages[index] ? (
                                            <img 
                                                src={request.image} 
                                                alt={request.title} 
                                                onError={() => handleImageError(index)}
                                                className="relative z-10 w-full h-full object-cover" 
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="mt-2 text-sm">Image unavailable</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content column - 2/3 width on desktop */}
                                <div className="flex flex-col md:col-span-2">
                                    <h2 className="text-xl font-semibold">{request.title}</h2>
                                    <p className="text-gray-600 mt-2">{request.description}</p>
                                    
                                    <div className="mt-4 space-y-2 flex-grow">
                                        <p><span className="font-semibold">Status:</span> 
                                            <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </span>
                                        </p>
                                        <p><span className="font-semibold">Location:</span> {request.location}</p>
                                        <p><span className="font-semibold">Type:</span> {request.isPermanent ? 'Permanent' : 'Temporary'}</p>
                                        
                                        {!request.isPermanent && (
                                            <>
                                                <p><span className="font-semibold">Event Date:</span> {request.eventDate}</p>
                                                <p><span className="font-semibold">Duration:</span> {request.duration} days</p>
                                            </>
                                        )}
                                        
                                        <div className="border-t pt-2 mt-2">
                                            <p><span className="font-semibold">Contact Person:</span> {request.personName}</p>
                                            <p><span className="font-semibold">Phone:</span> {request.personContact}</p>
                                            <p><span className="font-semibold">Email:</span> {request.personEmail}</p>
                                        </div>
                                    </div>
                                    
                                    {request.status === 'pending' && (
                                        <div className="mt-4 space-x-2">
                                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                                                Approve
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    {request.status === 'approved' && (
                                        <div className="mt-4">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                                Mark as Complete
                                            </button>
                                        </div>
                                    )}

                                    {request.status === 'rejected' && (
                                        <div className="mt-4">
                                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                                                Reconsider
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}