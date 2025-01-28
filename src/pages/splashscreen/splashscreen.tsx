import { useEffect } from "react";
import "./splashscreen.css"

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Call the callback after 3 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onFinish]);

  return (
    <div className="splashscreen">
      <div className="splashscreen__logo"></div>
      <h1>EVOLVE</h1>
    </div>
  );
};

export default SplashScreen;
