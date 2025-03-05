import { useState } from "react";
import { ReactSVG } from "react-svg";
import deleteIcon from "../public/delete.svg";
import hoveredIcon from "../public/deleteHover.svg";

export const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="w-5 h-5 flex justify-center items-center">
        <ReactSVG src={isHovered ? hoveredIcon : deleteIcon} />
      </div>
    </button>
  );
};
