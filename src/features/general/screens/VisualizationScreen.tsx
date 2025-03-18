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
import { IDustbinFilledCount } from "@/types/DustbinInfo";

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

export function VisualizationScreen() {
  const [updateInterval, setUpdateInterval] = useState<number>(10);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [dustbinData, setDustbinData] = useState<IDustbinFilledCount[]>([]);
  const TOTAL_BINS = 830; // Total number of bins remains constant

  // Initialize with 10 data points
  useEffect(() => {
    // Generate initial data point with more realistic normal distribution
    // Most bins should be in the middle range (30-50% and 50-90%)
    // with fewer bins at the extremes (below 30% and above 90%)
    const initialData: IDustbinFilledCount = {
      filled90: Math.floor(TOTAL_BINS * 0.15), // About 15% of bins are very full
      filled50: Math.floor(TOTAL_BINS * 0.35), // About 35% are moderately full
      filled30: Math.floor(TOTAL_BINS * 0.30), // About 30% are somewhat full
      below30: Math.floor(TOTAL_BINS * 0.20)  // About 20% are mostly empty
    };
    
    // Adjust to ensure total is exactly TOTAL_BINS
    const total = initialData.filled90 + initialData.filled50 + initialData.filled30 + initialData.below30;
    const diff = TOTAL_BINS - total;
    initialData.below30 += diff; // Adjust the below30 category to make sure total is exact
    
    // Function to generate next data point based on previous
    const generateNextDataPoint = (prevData: IDustbinFilledCount): IDustbinFilledCount => {
      // Create a copy of the previous data
      let newData = { ...prevData };
      
      // FILLING PROCESS
      const below30ToFilled30 = Math.min(
        newData.below30, 
        Math.floor(Math.random() * 5)
      );
      newData.below30 -= below30ToFilled30;
      newData.filled30 += below30ToFilled30;
      
      const filled30ToFilled50 = Math.min(
        newData.filled30, 
        Math.floor(Math.random() * 4)
      );
      newData.filled30 -= filled30ToFilled50;
      newData.filled50 += filled30ToFilled50;
      
      const filled50ToFilled90 = Math.min(
        newData.filled50, 
        Math.floor(Math.random() * 3)
      );
      newData.filled50 -= filled50ToFilled90;
      newData.filled90 += filled50ToFilled90;
      
      // EMPTYING PROCESS
      const filled90ToBelow30 = Math.min(
        newData.filled90,
        Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0
      );
      newData.filled90 -= filled90ToBelow30;
      newData.below30 += filled90ToBelow30;
      
      const filled50ToBelow30 = Math.min(
        newData.filled50,
        Math.random() > 0.7 ? Math.floor(Math.random() * 2) : 0
      );
      newData.filled50 -= filled50ToBelow30;
      newData.below30 += filled50ToBelow30;
      
      const filled30ToBelow30 = Math.min(
        newData.filled30,
        Math.random() > 0.9 ? 1 : 0
      );
      newData.filled30 -= filled30ToBelow30;
      newData.below30 += filled30ToBelow30;
      
      // Validate total
      const total = newData.filled90 + newData.filled50 + newData.filled30 + newData.below30;
      if (total !== TOTAL_BINS) {
        const diff = TOTAL_BINS - total;
        newData.below30 += diff;
      }
      
      return newData;
    };
    
    // Generate 10 data points
    const initialDataArray: IDustbinFilledCount[] = [initialData];
    const initialTimeLabels: string[] = [];
    
    // Start with a time 10 * updateInterval seconds ago
    const startTime = new Date();
    startTime.setSeconds(startTime.getSeconds() - (updateInterval * 9));
    
    // Add first time label
    initialTimeLabels.push(startTime.toLocaleTimeString());
    
    // Generate 9 more data points (total 10)
    for (let i = 1; i < 10; i++) {
      // Generate next data based on previous
      const nextData = generateNextDataPoint(initialDataArray[i-1]);
      initialDataArray.push(nextData);
      
      // Create time label with proper interval spacing
      const nextTime = new Date(startTime);
      nextTime.setSeconds(nextTime.getSeconds() + (updateInterval * i));
      initialTimeLabels.push(nextTime.toLocaleTimeString());
    }
    
    // Set the initial data array and time labels
    setDustbinData(initialDataArray);
    setTimeLabels(initialTimeLabels);
  }, [updateInterval]);

  // Update data at intervals (existing code)
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
          // Force correction if there's a mismatch
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