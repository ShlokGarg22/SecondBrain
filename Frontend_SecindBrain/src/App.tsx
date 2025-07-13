import Signin from "./pages/Signin";
import Signup from "./pages/Signup"; // Updated to default import
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { ShareDbrain } from "./pages/ShareDbrain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ShareDbrain" element={<ShareDbrain />} />
        {/* Add a catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
