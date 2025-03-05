import { useEffect, useState, type MouseEventHandler } from "react";
import { ReactSVG } from "react-svg";
import arrowLeft from "../public/arrowLeft.svg";
import arrowRight from "../public/arrowRight.svg";
import info from "../public/info.svg";
import type { FormData, FormError } from "./types";
import { Error } from "./Error";
import classNames from "classnames";

type Holidays = {
  country: string;
  date: string;
  day: string;
  iso: string;
  name: string;
  type: string;
  year: number;
}[];

type Props = {
  label: string;
  name: keyof FormData;
  formData: FormData;
  setValue: (formdata: FormData) => void;
  errors: FormError;
};

const Calendar: React.FC<Props> = ({
  label,
  name,
  formData,
  setValue,
  errors,
}) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [holidays, setHolidays] = useState<Holidays>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/holidays?country=PL", {
      method: "GET",
      headers: new Headers({
        "X-Api-Key": "OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data);
      });
  }, []);

  const prevMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setMonth((prev) => {
      if (prev === 0) setYear((prevYear) => prevYear - 1);
      return prev === 0 ? 11 : prev - 1;
    });
  };

  const nextMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setMonth((prev) => {
      if (prev === 11) setYear((prevYear) => prevYear + 1);
      return prev === 11 ? 0 : prev + 1;
    });
  };

  const onDayClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    day: number,
  ) => {
    e.preventDefault();
    setError("");
    const chosenDate = new Date(year, month, day);
    if (chosenDate.getDay() === 0) {
      setError("It is Sunday");
      setValue({
        ...formData,
        [name]: {
          day: day,
          month: month + 1,
          year: year,
          valid: false,
        },
      });
      return;
    }
    const holiday = holidays.find(
      (el) =>
        el.date ===
        `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    );

    if (holiday && holiday.type === "NATIONAL_HOLIDAY") {
      setError(`It is ${holiday.name}`);
      setValue({
        ...formData,
        [name]: {
          day: day,
          month: month + 1,
          year: year,
          valid: false,
        },
      });
      return;
    }

    setValue({
      ...formData,
      [name]: {
        day: day,
        month: month + 1,
        year: year,
        valid: true,
      },
    });
  };

  const checkSelectedDate = (day: number) => {
    if (
      formData.day &&
      day === formData.day.day &&
      month + 1 === formData.day.month &&
      year === formData.day.year
    )
      return true;
    return false;
  };

  const checkValidDate = (day: number) => {
    const chosenDate = new Date(year, month, day);
    const holiday = holidays.find(
      (el) =>
        el.date ===
        `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    );
    if (
      chosenDate.getDay() === 0 ||
      (holiday && holiday.type === "NATIONAL_HOLIDAY")
    ) {
      return false;
    }
    return true;
  };

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  let emptyDays = new Array(firstDay === 0 ? 6 : firstDay - 1).fill(null);

  return (
    <label className="text-base flex flex-col gap-y-2">
      {label}
      <div className="w-[342px] px-[32.5px] py-[42px] bg-white rounded-lg border border-[#CBB6E5]">
        <div className="flex justify-between items-center mb-4">
          <button onClick={(e) => prevMonth(e)} className="p-2">
            <ReactSVG src={arrowLeft} />
          </button>
          <h2 className="font-medium">
            {new Date(year, month).toLocaleString("default", { month: "long" })}{" "}
            {year}
          </h2>
          <button onClick={(e) => nextMonth(e)} className="p-2">
            <ReactSVG src={arrowRight} />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center font-medium">
          {weekdays.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center">
          {emptyDays.map((_, index) => (
            <div key={index} className="py-2"></div>
          ))}
          {daysArray.map((day) => (
            <button
              key={day}
              onClick={(e) => {
                onDayClick(e, day);
              }}
              className={classNames(
                "py-2 font-medium rounded-full hover:bg-gray-200",
                {
                  "text-white bg-[#761BE4]": checkSelectedDate(day),
                  "text-[#898DA9]": !checkValidDate(day),
                },
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <div className="flex gap-2">
          <ReactSVG src={info} />
          <p className="text-sm">{error}</p>
        </div>
      )}
      {errors[name] && <Error error={errors[name]} />}
    </label>
  );
};

export default Calendar;
