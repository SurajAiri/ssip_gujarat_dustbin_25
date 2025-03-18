import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";

export function InformationScreen(){
    return <div  className="flex flex-col min-h-screen">
        <CustomHeader  />
        <div className="flex-grow">
            <p>Information</p>
        </div>
        <Footer />
    </div>
}