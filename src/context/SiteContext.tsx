import { createContext, useContext } from "react";

// Define context type
interface SiteContextType {
  siteId: string;
}

// Create context with a default value
const SiteContext = createContext<SiteContextType | undefined>(undefined);

// Custom hook to use SiteContext
export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
};

// Export SiteContext Provider
export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const siteId = "BOSSJSITE"; // Your global site ID
  const profileName = "Cathy Donald";
  const candidateText = "Candidate for World Medical Association Committee Chair";
  const passionText = "Dedicated to advancing orthopedic care and global healthcare policies."
  const voteText = "I am running for the World Medical Association Committee Chair to champion ethical medical practices, enhance orthopedic care, and drive innovation in global healthcare. With over 10 years of experience as an orthopedic surgeon, I have dedicated my career to bridging the gap between cutting-edge research, effective policies, and patient well-being.I am running for the World Medical Association Committee Chair to champion ethical medical practices, enhance orthopedic care, and drive innovation in global healthcare. With over 10 years of experience as an orthopedic surgeon, I have dedicated my career to bridging the gap between cutting-edge research, effective policies, and patient well-being. Let's step towards a healthier, stronger future for all.";
  const color2 = "color"
  

  return (
    <SiteContext.Provider value={{ siteId, profileName, candidateText, passionText, voteText }}>
      {children}
    </SiteContext.Provider>
  );
};
