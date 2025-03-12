import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FacebookLogin from "./pages/FacebookLogin";
import InstagramLogin from "./pages/InstagramLogin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facebook-login" element={<FacebookLogin />} />
        <Route path="/instagram-login" element={<InstagramLogin />} />
      </Routes>
    </Router>
  );
};

export default App;