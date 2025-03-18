import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";

export function VisualizationScreen(){
    return <div  className="flex flex-col min-h-screen">
        <CustomHeader  />
        <div className="flex-grow">
            <p>Visualization</p>
        </div>
        <Footer />
    </div>
}