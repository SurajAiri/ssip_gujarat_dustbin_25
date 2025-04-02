import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface IBinPickupRequest {
    title: string;
    description: string;
    isPermanent: boolean;
    image: string;
    location: string;
    status: string;
    date: string;
    personName: string;
    personContact: string;
    personEmail: string;
}

export function ComplaintScreen() {
    const [imageUrl, setImageUrl] = useState("");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [location, setLocation] = useState("");
    const [isPermanent, setIsPermanent] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IBinPickupRequest>({
        defaultValues: {
            isPermanent: false
        }
    });

    // Update form value when toggle changes
    useEffect(() => {
        setValue('isPermanent', isPermanent);
    }, [isPermanent, setValue]);

    // Get current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(`${position.coords.latitude},${position.coords.longitude}`);
                },
                (error) => {
                    toast.error(`Unable to get location. Please enable location services ${error.message || error}`);
                }
            );
        } else {
            toast.warning("Geolocation is not supported by your browser.");
        }
    }, []);

    const startCamera = async () => {
        setShowCamera(true);
        setUploadComplete(false);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            toast.error("Could not access camera. Please check permissions.");
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current) {
            const stream = videoRef.current.srcObject as MediaStream;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        }
        setShowCamera(false);
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                
                // Get the image data
                const imageData = canvasRef.current.toDataURL('image/jpeg');
                setCapturedImage(imageData);
                
                // Stop the camera
                stopCamera();
            }
        }
    };

    const discardImage = () => {
        setCapturedImage(null);
        setUploadComplete(false);
        setImageUrl("");
    };

    const uploadToCloudinary = async () => {
        if (!capturedImage) return;
        
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', capturedImage);
            formData.append('upload_preset', 'your_cloudinary_upload_preset');
            
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
                formData
            );
            
            setImageUrl(response.data.secure_url);
            setUploadComplete(true);
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            toast.error("Failed to upload image. Please try again.");
            setUploadComplete(false);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (data: IBinPickupRequest) => {
        // Check if image is required and has been uploaded
        if (!uploadComplete || !imageUrl) {
            toast.error("Please upload an image before submitting.");
            return;
        }
        
        const requestData: IBinPickupRequest = {
            ...data,
            image: imageUrl,
            location: location,
            date: new Date().toISOString(),
            status: "created"
        };
        
        console.log(requestData);
        
        // Here you would send the data to your backend
        try {
            // Simulating a successful API call
            // axios.post('/api/bin-pickup-requests', requestData);
            
            toast.success("Bin pickup request submitted successfully!");
            reset();
            setImageUrl("");
            setCapturedImage(null);
            setUploadComplete(false);
            setIsPermanent(false);
        } catch (error) {
            toast.error("Failed to submit request. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader />
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Request Bin Pickup</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input 
                            type="text" 
                            {...register("title", { required: "Title is required" })}
                            className="w-full p-2 border rounded"
                            placeholder="E.g., Garbage pile at Gandhi Road"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                            {...register("description", { required: "Description is required" })}
                            className="w-full p-2 border rounded"
                            rows={4}
                            placeholder="Please describe the situation and why a bin is needed"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                    
                    <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex flex-col space-y-3">
                            <label className="block text-sm font-medium">Bin Request Type</label>
                            
                            <div className="flex items-center space-x-4">
                                <div 
                                    className={`flex-1 py-3 px-4 border rounded-lg transition-all duration-200 cursor-pointer ${!isPermanent ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                                    onClick={() => setIsPermanent(false)}
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">Temporary</p>
                                        <p className="text-xs text-gray-500">One-time pickup or event-based cleanup</p>
                                    </div>
                                </div>
                                
                                <div 
                                    className={`flex-1 py-3 px-4 border rounded-lg transition-all duration-200 cursor-pointer ${isPermanent ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                                    onClick={() => setIsPermanent(true)}
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">Permanent</p>
                                        <p className="text-xs text-gray-500">Area lacks waste management solution</p>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="hidden" {...register("isPermanent")} />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Image of Area <span className="text-red-500">*</span>
                        </label>
                        <div className="border rounded p-4">
                            {/* Camera View */}
                            {showCamera && (
                                <div className="space-y-2">
                                    <video 
                                        ref={videoRef} 
                                        autoPlay 
                                        className="w-full h-auto border rounded" 
                                    />
                                    <div className="flex space-x-2">
                                        <button 
                                            type="button" 
                                            onClick={captureImage}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Take Photo
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={stopCamera}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Captured Image (Not Yet Uploaded) */}
                            {!showCamera && capturedImage && !uploadComplete && (
                                <div className="space-y-2">
                                    <div className="border rounded overflow-hidden">
                                        <img 
                                            src={capturedImage} 
                                            alt="Captured" 
                                            className="w-full h-auto max-h-[250px] object-cover" 
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            type="button" 
                                            onClick={uploadToCloudinary}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Uploading..." : "Upload Image"}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={startCamera}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                            disabled={isLoading}
                                        >
                                            Re-capture
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={discardImage}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            disabled={isLoading}
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Uploaded Image */}
                            {uploadComplete && imageUrl && (
                                <div className="space-y-2">
                                    <div className="border rounded overflow-hidden">
                                        <img 
                                            src={imageUrl} 
                                            alt="Uploaded" 
                                            className="w-full h-auto max-h-[250px] object-cover" 
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-green-600 text-sm">✓ Image uploaded successfully</p>
                                        <button 
                                            type="button" 
                                            onClick={startCamera}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* No Image Yet */}
                            {!showCamera && !capturedImage && !imageUrl && (
                                <div className="space-y-2">
                                    <div className="bg-gray-100 border rounded h-[200px] flex flex-col items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-gray-500 mt-2">Please capture image of the area</p>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={startCamera}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Capture Image
                                    </button>
                                </div>
                            )}
                            
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </div>
                        {!uploadComplete && <p className="text-red-500 text-sm mt-1">Image is required</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <input 
                            type="text" 
                            {...register("personName", { required: "Name is required" })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.personName && <p className="text-red-500 text-sm">{errors.personName.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact Number</label>
                        <input 
                            type="tel" 
                            {...register("personContact", { 
                                required: "Contact number is required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Please enter a valid 10-digit number"
                                }
                            })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.personContact && <p className="text-red-500 text-sm">{errors.personContact.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input 
                            type="email" 
                            {...register("personEmail", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email"
                                }
                            })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.personEmail && <p className="text-red-500 text-sm">{errors.personEmail.message}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`py-2 px-6 rounded ${!uploadComplete 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-primary text-white hover:bg-primary-dark'}`}
                        disabled={isLoading || !uploadComplete}
                    >
                        Submit Bin Pickup Request
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}