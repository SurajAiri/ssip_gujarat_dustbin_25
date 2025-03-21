import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";


export function HomeScreen() {
    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader  />
            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
}