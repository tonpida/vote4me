import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext"; // Import the provider
import Home from "./pages/Home";
import FacebookLogin from "./pages/FacebookLogin";
import InstagramLogin from "./pages/InstagramLogin";
import ConfirmPage from "./pages/ConfirmPage";
import DonePage from "./pages/DonePage";
import ThankYouPage from "./pages/ThankYouPage";
import CodeList from "./pages/CodeList";
import VoteList from "./pages/VoteList";

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facebook-login" element={<FacebookLogin />} /> {/* Fixed the typo */}
          <Route path="/instagram-login" element={<InstagramLogin />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/done" element={<DonePage />} />
          <Route path="/honeycomb/codes" element={<CodeList />} />
          <Route path="/honeycomb/votes" element={<VoteList />} />
        </Routes>
      </Router>
    </SiteProvider>
  );
};

export default App;