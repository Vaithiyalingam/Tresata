import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { icons } from "../utils/icons";

interface AccordionProps {
  title: string;
  itemCount: number;
  children: React.ReactNode;
  isOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  itemCount,
  children,
  isOpen = false,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsAccordionOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isAccordionOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isAccordionOpen]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div>
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center text-left text-[#231F20] font-normal py-2.5 px-3.5 bg-[#F3F6F9] mb-3 rounded-md"
      >
        <p>
          {title} <span className="font-medium">({itemCount})</span>
        </p>
        <Image
          className={`${
            isAccordionOpen ? "rotate-180" : "rotate-0"
          } transition-all ease-in-out duration-300`}
          src={icons.dropdownIcon}
          alt="dropdown"
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
        style={{
          maxHeight: isAccordionOpen
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
