import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";

export function SchedulePickupScreen(){
    return <div  className="flex flex-col min-h-screen">
        <CustomHeader  />
        <div className="flex-grow">
            <p>Schedule Pickup</p>
        </div>
        <Footer />
    </div>
}