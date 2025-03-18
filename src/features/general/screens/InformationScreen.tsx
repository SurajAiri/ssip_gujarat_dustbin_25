import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trash, Sword, CheckCircle, ShieldX, ShieldPlus } from "lucide-react";

export function InformationScreen() {
    const dummyData = {
        overview: {
            totalBins: 1000,
            damagedBins: 85,
            workingBins: 830,
            underMaintenance: 85,
        },
        sectorCounts: [
            { title: "Sector A", count: 135 },
            { title: "Sector B", count: 120 },
            { title: "Sector C", count: 110 },
            { title: "Sector D", count: 105 },
            { title: "Sector E", count: 95 },
            { title: "Sector F", count: 98 },
            { title: "Sector G", count: 92 },
            { title: "Sector H", count: 88 },
            { title: "Sector I", count: 80 },
            { title: "Sector J", count: 77 },
        ],
    };

    const stats = [
        { label: "Total Bins", value: dummyData.overview.totalBins, icon: <Trash className="text-blue-500" /> },
        { label: "Working Bins", value: dummyData.overview.workingBins, icon: <CheckCircle className="text-green-500" /> },
        { label: "Damaged Bins", value: dummyData.overview.damagedBins, icon: <ShieldX className="text-red-500" /> },
        { label: "Under Maintenance", value: dummyData.overview.underMaintenance, icon: <ShieldPlus className="text-yellow-500" /> },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <CustomHeader />
            <div className="flex-grow p-6">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Dustbin Information</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4">
                            <div className="text-4xl">{stat.icon}</div>
                            <div>
                                <p className="text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-semibold">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overview Chart */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Overview</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={dummyData.sectorCounts}>
                            <XAxis dataKey="title" stroke="#555" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#1D4ED8" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <Footer />
        </div>
    );
}