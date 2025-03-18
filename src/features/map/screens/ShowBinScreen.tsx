import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";

export function ShowBinScreen(){
    return <div  className="flex flex-col min-h-screen">
        <CustomHeader  />
        <div className="flex-grow">
            <p>Show bins</p>
        </div>
        <Footer />
    </div>
}