import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";

export function ResolveComplaintScreen(){
    return <div  className="flex flex-col min-h-screen">
        <CustomHeader  />
        <div className="flex-grow">
            <p>Resolve Complaint</p>
        </div>
        <Footer />
    </div>
}