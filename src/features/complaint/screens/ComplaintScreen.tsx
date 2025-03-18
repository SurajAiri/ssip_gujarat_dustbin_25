import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";

export function ComplaintScreen(){
    return <div  className="flex flex-col min-h-screen">
        <CustomHeader  />
        <div className="flex-grow">
            <p>Raise Complaint</p>
        </div>
        <Footer />
    </div>
}