
import LoginScreen from "./features/auth/screens/LoginScreen"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFoundScreen from "./features/general/screens/NotFoundScreen";
import { ShowBinScreen } from "./features/map/screens/ShowBinScreen";
import { ComplaintScreen } from "./features/complaint/screens/ComplaintScreen";
import { InformationScreen } from "./features/general/screens/InformationScreen";
import { VisualizationScreen } from "./features/general/screens/VisualizationScreen";
import { ResolveComplaintScreen } from "./features/complaint/screens/ResolveComplaintScreen";
import { SchedulePickupScreen } from "./features/map/screens/SchedulePickupScreen";
import { useAuthStore } from "./stores/authStore";
import { JSX } from 'react/jsx-runtime';
import LandingScreen from "./features/general/screens/LandingScreen";

// Protected Route Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginScreen />} />

        {/* No Auth: General public */}
        <Route path="/request" element={<ComplaintScreen />} />
        <Route path='/bin-map' element={<ShowBinScreen />} />
        <Route path='/landing' element={<LandingScreen />} />

        {/* Admin */}
        <Route path="/" element={<ProtectedRoute element={<InformationScreen />} />} />
        {/* <Route path="/info" element={<ProtectedRoute element={<InformationScreen />} />} /> */}
        <Route path="/visualize" element={<ProtectedRoute element={<VisualizationScreen />} />} />
        <Route path="/pickup-map" element={<ProtectedRoute element={<SchedulePickupScreen />} />} />
        <Route path="/resolve" element={<ProtectedRoute element={<ResolveComplaintScreen />} />} />


        {/* 404 */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  );
}

export default App
