import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { icons } from "../utils/icons";

interface DropdownOption {
  value: string;
  label: React.ReactNode;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-[#DDDDDD] p-2 rounded-md text-left flex items-center justify-between cursor-pointer"
      >
        {options.find((option) => option.value === value)?.label ||
          "Select an option"}
        <Image src={icons.dropdownIcon} className="ml-2" alt="dropdown" />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 border border-[#DDDDDD] bg-white rounded-md w-full">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
