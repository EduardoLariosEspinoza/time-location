import { useState, useEffect } from "react";

import { format } from "date-fns";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [info, setInfo] = useState({
    day_of_week: "",
    timezone: "",
    formattedTime: "",
    formattedDate: "",
  });

  let theme = "dark";

  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await fetch("https://worldtimeapi.org/api/ip");
        const data = await response.json();

        const { day_of_week, timezone, datetime } = data;
        const formattedTime = format(new Date(datetime), "HH:mm:ss");
        const formattedDate = format(new Date(datetime), "dd/MM/yyyy");

        const obj = {
          day_of_week,
          timezone,
          formattedTime,
          formattedDate,
        };

        if (info.day_of_week === "") {
          setTimeout(() => {
            setInfo(obj);
          }, 880);
        } else {
          setInfo(obj);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchApi();
  }, [info]);

  if (info.formattedTime !== "") {
    if (
      (info.formattedTime.split(":")[0] > 18 ||
        info.formattedTime.split(":")[0] < 8) &&
      theme !== "dark"
    ) {
      theme = "dark";
    } else if (
      theme !== "light" &&
      info.formattedTime.split(":")[0] <= 18 &&
      info.formattedTime.split(":")[0] >= 8
    ) {
      theme = "light";
    }
  }

  return (
    <div className={`container ${theme}`}>
      <div className={`card ${theme}`}>
        <p className={theme}>
          {WEEKDAYS[info.day_of_week]} {info.formattedDate}
        </p>
        <h2 className={theme}>Time Zone: {info.timezone}</h2>
        <h1 className={theme}>{info.formattedTime}</h1>
      </div>
    </div>
  );
}

export default App;
