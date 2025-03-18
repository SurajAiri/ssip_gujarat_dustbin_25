
import LoginScreen from "./features/auth/screens/LoginScreen"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./features/general/screens/HomeScreen";
import { TestScreen } from "./features/general/screens/TestScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/test" element={<TestScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App
