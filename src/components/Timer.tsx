import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onTimeUp]);

  return <div>Time Left: {secondsLeft} seconds</div>;
};

export default Timer;
