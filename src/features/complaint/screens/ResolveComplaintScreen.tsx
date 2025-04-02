import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import { useState, useMemo } from "react";

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

type StatusType = 'all' | 'pending' | 'approved' | 'rejected';
type RequestType = 'all' | 'permanent' | 'temporary';

export function ResolveComplaintScreen() {
    // State to track images that failed to load
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
    
    // Filter states
    const [statusFilter, setStatusFilter] = useState<StatusType>('all');
    const [typeFilter, setTypeFilter] = useState<RequestType>('all');
    
    // Mock data - replace with actual data fetching
    const requests = useMemo<IBinPickupRequest[]>(() => [
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
    ], []);

    // Filter requests based on selected filters
    const filteredRequests = useMemo(() => {
        return requests.filter(request => {
            const statusMatch = statusFilter === 'all' || request.status === statusFilter;
            const typeMatch = typeFilter === 'all' || 
                (typeFilter === 'permanent' && request.isPermanent) || 
                (typeFilter === 'temporary' && !request.isPermanent);
            return statusMatch && typeMatch;
        });
    }, [requests, statusFilter, typeFilter]);

    // Handle image load error
    const handleImageError = (index: number) => {
        setFailedImages(prev => ({...prev, [index]: true}));
    };

    const renderFilter = () => {
        return (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-700">Filter Requests</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Request Status</label>
                        <div className="relative">
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as StatusType)}
                                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Request Type</label>
                        <div className="relative">
                            <select 
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value as RequestType)}
                                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="all">All Types</option>
                                <option value="permanent">Permanent</option>
                                <option value="temporary">Temporary</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderCard = (request:IBinPickupRequest,index:number)=>{
        return <div key={index} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Image column */}
            <div className="md:col-span-1">
                <div className="relative h-[200px] md:h-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    
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
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm">Image unavailable</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content column */}
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
    }

    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader />
            <div className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-6">Pickup Requests</h1>
                
                {/* Filters */}
                {renderFilter()}

                {filteredRequests.length > 0 ? (
                    <div className="grid gap-6">
                        {filteredRequests.map(renderCard)}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg mb-4">No requests found with the selected filters.</p>
                        <button 
                            onClick={() => {
                                setStatusFilter('all');
                                setTypeFilter('all');
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
