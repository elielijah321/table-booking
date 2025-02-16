import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection

const CountdownTimer = ({ minutes, redirectTo }: { minutes: number; redirectTo: string }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(redirectTo); // Redirect when timer reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, redirectTo]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <span style={{ color: timeLeft < 10 ? "red" : "black" }}>{formatTime(timeLeft)}</span>
  );
};

export default CountdownTimer;
