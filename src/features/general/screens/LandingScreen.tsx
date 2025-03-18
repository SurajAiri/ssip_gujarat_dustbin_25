import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";


export function LandingScreen() {
    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader  />
            <p>Landing screen</p>
            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
}