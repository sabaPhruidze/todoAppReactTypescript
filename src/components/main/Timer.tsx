import { useState, useEffect } from "react";

export default function Timer() {
  const [currentTime, setTime] = useState("");
  const [currentDate, setDate] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
      setDate(date.toLocaleDateString());
    }, 1000);
  }, []);

  return (
    <div className="imageContainer">
      <div className="dateTime">
        <div className="date">{currentDate}</div>
        <div className="time">{currentTime}</div>
      </div>
    </div>
  );
}
