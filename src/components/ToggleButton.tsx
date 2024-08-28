"use client";
import React, { useState } from "react";

interface ToggleButtonProps {
  opcions: string[];
  onOptionSelect: (option: string) => void;
}

export default function ToggleButton({ opcions, onOptionSelect }: ToggleButtonProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Selecciona Color");

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setIsOpened(false); // Cerrar el dropdown después de seleccionar una opción
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={toggle}
        className="mt-1 p-2  min-w-full border border-gray-300 rounded-md flex justify-between pl-2"
        type="button"
      >
        {selectedOption}
        <span>
            {
                isOpened ? (
                    <div>&#x25BC;</div>
                ):(
                    <div>
                        &#x25B2;
                    </div>
                )
            }
        </span>
      </button>
      {isOpened && (
        <div className="absolute left-0 w-full bg-gray-200 p-4 mt-2 rounded-md z-10">
          {opcions.map((option, index) => (
            <p
              key={index}
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
