import { useMemo, type InputHTMLAttributes } from "react";
import type { FormData } from "./types";
import { Tooltip } from "react-tooltip";

type Props = {
  label: string;
  name: keyof FormData;
  formData: FormData;
  setValue: (formdata: FormData) => void;
};

export const Slider: React.FC<
  Props & InputHTMLAttributes<HTMLInputElement>
> = ({ label, name, formData, setValue, ...props }) => {
  const percentage = useMemo(() => {
    return (((formData[name] as number) - 8) / 92) * 100;
  }, [formData[name]]);

  return (
    <label className="text-base flex flex-col gap-y-2">
      {label}
      <div className="relative ">
        <div className="flex flex-row justify-between mb-1 ">
          <p className="text-xs">8</p>
          <p className="text-xs">100</p>
        </div>
        <div className="relative mx-1">
          <div
            className="absolute h-2 bg-[#761BE4] rounded-l-full"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="absolute h-2 rounded-r-full bg-[#CBB6E5]"
            style={{ left: `${percentage}%`, right: 0 }}
          />
          <input
            type="range"
            min={8}
            max={100}
            step={1}
            value={formData[name] as number}
            onChange={(e) => {
              setValue({ ...formData, [name]: e.target.value });
            }}
            className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:rounded-full"
            //to wyżej nie zadziała dobrze na mozilli, ale już nie chciałem tej linii robić dłuższej, [&::-moz-range-thumb] i te same style i by śmigało
          />
          <div
            className="absolute w-4 h-4 bg-[#761BE4] rounded-full -top-1 pointer-events-none"
            style={{
              left: `calc(${percentage}% - 8px)`,
            }}
          />
          <Tooltip isOpen={true} place="bottom">{`${formData[name]}`}</Tooltip>
        </div>
      </div>
    </label>
  );
};
