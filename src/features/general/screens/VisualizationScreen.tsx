import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import CustomHeader from "@/components/Header";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface IDustbinFilledCount {
  filled90: number;
  filled50: number;
  filled30: number;
  below30: number;
}

export function VisualizationScreen() {
  const [updateInterval, setUpdateInterval] = useState<number>(10);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [dustbinData, setDustbinData] = useState<IDustbinFilledCount[]>([]);
  const TOTAL_BINS = 100; // Total number of bins remains constant

  // Initialize with random data
  useEffect(() => {
    const initialData: IDustbinFilledCount = {
      filled90: Math.floor(Math.random() * 20),
      filled50: Math.floor(Math.random() * 25),
      filled30: Math.floor(Math.random() * 25),
      below30: TOTAL_BINS - (Math.floor(Math.random() * 20) + Math.floor(Math.random() * 25) + Math.floor(Math.random() * 25)),
    };
    
    setDustbinData([initialData]);
    setTimeLabels([new Date().toLocaleTimeString()]);
  }, []);

  // Update data at intervals
  useEffect(() => {
    const timer = setInterval(() => {
      setDustbinData((prevData) => {
        const lastData = prevData[prevData.length - 1];
        
        // Create a copy of the last data for modification
        let newData = { ...lastData };
        
        // FILLING PROCESS: bins move up in fill levels
        // Some below30 bins get filled to 30-50% level
        const below30ToFilled30 = Math.min(
          newData.below30, 
          Math.floor(Math.random() * 5)
        );
        
        // Apply this transition
        newData.below30 -= below30ToFilled30;
        newData.filled30 += below30ToFilled30;
        
        // Some 30-50% bins get filled to 50-90% level
        const filled30ToFilled50 = Math.min(
          newData.filled30, 
          Math.floor(Math.random() * 4)
        );
        
        // Apply this transition
        newData.filled30 -= filled30ToFilled50;
        newData.filled50 += filled30ToFilled50;
        
        // Some 50-90% bins get filled to 90%+ level
        const filled50ToFilled90 = Math.min(
          newData.filled50, 
          Math.floor(Math.random() * 3)
        );
        
        // Apply this transition
        newData.filled50 -= filled50ToFilled90;
        newData.filled90 += filled50ToFilled90;
        
        // EMPTYING PROCESS: primarily 90%+ bins get emptied
        // Higher chance for 90%+ bins to be emptied completely
        const filled90ToBelow30 = Math.min(
          newData.filled90,
          Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0
        );
        
        // Apply this transition
        newData.filled90 -= filled90ToBelow30;
        newData.below30 += filled90ToBelow30;
        
        // Small chance for 50-90% bins to be emptied
        const filled50ToBelow30 = Math.min(
          newData.filled50,
          Math.random() > 0.7 ? Math.floor(Math.random() * 2) : 0
        );
        
        // Apply this transition
        newData.filled50 -= filled50ToBelow30;
        newData.below30 += filled50ToBelow30;
        
        // Very small chance for 30-50% bins to be emptied
        const filled30ToBelow30 = Math.min(
          newData.filled30,
          Math.random() > 0.9 ? 1 : 0
        );
        
        // Apply this transition
        newData.filled30 -= filled30ToBelow30;
        newData.below30 += filled30ToBelow30;
        
        // Validate total remains constant
        const total = newData.filled90 + newData.filled50 + newData.filled30 + newData.below30;
        
        if (total !== TOTAL_BINS) {
          console.error("Total bins mismatch:", total, "expected:", TOTAL_BINS);
          // Force correction if there's a mismatch (shouldn't happen with this approach)
          const diff = TOTAL_BINS - total;
          newData.below30 += diff;
        }
        
        // Keep last 10 data points for better visualization
        return [...prevData.slice(-9), newData];
      });
      
      setTimeLabels((prevLabels) => {
        const newLabel = new Date().toLocaleTimeString();
        return [...prevLabels.slice(-9), newLabel];
      });
    }, updateInterval * 1000);
    
    return () => clearInterval(timer);
  }, [updateInterval]);

  const chartData: ChartData<'line'> = {
    labels: timeLabels,
    datasets: [
      {
        label: '90%+ Filled',
        data: dustbinData.map(d => d.filled90),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.2,
      },
      {
        label: '50-90% Filled',
        data: dustbinData.map(d => d.filled50),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.2,
      },
      {
        label: '30-50% Filled',
        data: dustbinData.map(d => d.filled30),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2,
      },
      {
        label: 'Below 30% Filled',
        data: dustbinData.map(d => d.below30),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.2,
      },
    ],
  };

// // Debug: Log the total count of bins after each update
// useEffect(() => {
//     if (dustbinData.length > 0) {
//         const lastData = dustbinData[dustbinData.length - 1];
//         const total = lastData.filled90 + lastData.filled50 + lastData.filled30 + lastData.below30;
//         console.log(`Total bins count: ${total} (Target: ${TOTAL_BINS})`);
        
//         // Additional stats for debugging
//         console.log({
//             time: timeLabels[timeLabels.length - 1],
//             filled90: lastData.filled90,
//             filled50: lastData.filled50,
//             filled30: lastData.filled30,
//             below30: lastData.below30
//         });
//     }
// }, [dustbinData, timeLabels]);

  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <div className="flex-grow p-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Dustbin Fill Level Distribution</h2>
          
          <div className="mb-4">
            <label htmlFor="updateInterval" className="mr-2">Update Interval (seconds):</label>
            <input
              id="updateInterval"
              type="number"
              min="1"
              max="60"
              value={updateInterval}
              onChange={(e) => setUpdateInterval(parseInt(e.target.value) || 10)}
              className="border rounded px-2 py-1"
            />
          </div>
          
          <div className="mb-4">
            <div className="grid grid-cols-4 gap-4">
              {dustbinData.length > 0 && (
                <>
                  <div className="bg-red-100 p-3 rounded text-center">
                    <h3 className="font-bold">90%+ Filled</h3>
                    <p className="text-2xl">{dustbinData[dustbinData.length - 1].filled90}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded text-center">
                    <h3 className="font-bold">50-90% Filled</h3>
                    <p className="text-2xl">{dustbinData[dustbinData.length - 1].filled50}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded text-center">
                    <h3 className="font-bold">30-50% Filled</h3>
                    <p className="text-2xl">{dustbinData[dustbinData.length - 1].filled30}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded text-center">
                    <h3 className="font-bold">Below 30% Filled</h3>
                    <p className="text-2xl">{dustbinData[dustbinData.length - 1].below30}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="h-96">
            {dustbinData.length > 0 && <Line data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  stacked: false,
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: `Real-time Dustbin Distribution (Total Bins: ${TOTAL_BINS})`,
                },
                tooltip: {
                  mode: 'index',
                }
              }
            }} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}