import classNames from "classnames";
import type { FormData } from "./types";

type Props = {
  label: string;
  name: keyof FormData;
  values: string[];
  formData: FormData;
  setValue: (formdata: FormData) => void;
};

export const Radio: React.FC<Props> = ({
  label,
  name,
  values,
  formData,
  setValue,
}) => {
  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string,
  ) => {
    e.preventDefault();
    setValue({ ...formData, [name]: value });
  };

  return (
    <label className="text-base flex flex-col gap-2">
      {label}
      <div className="flex flex-row sm:flex-col gap-2">
        {values.map((value) => (
          <button
            className={classNames("rounded-lg w-[76px] bg-white h-[46px]", {
              "border border-[#CBB6E5]": value !== formData[name],
              "border-2 border-[#761BE4]": value === formData[name],
            })}
            onClick={(e) => onClick(e, value)}
          >
            {value}
          </button>
        ))}
      </div>
    </label>
  );
};
