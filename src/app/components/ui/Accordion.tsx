'use client'
import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`
          px-4 overflow-hidden 
          transition-all duration-300 ease-in-out 
          ${isOpen ? 'max-h-40 py-3 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        {content}
      </div>
    </div>
  );
};

export default function Accordion() {
  const items = [
    {
      title: "섹션 1",
      content: "여기는 첫 번째 섹션의 내용입니다. 원하는 내용을 넣어주세요."
    },
    {
      title: "섹션 2",
      content: "두 번째 섹션입니다. 다른 내용을 넣어볼 수 있습니다."
    },
    {
      title: "섹션 3",
      content: "세 번째 섹션의 내용입니다. 얼마든지 섹션을 추가할 수 있어요."
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-4 rounded-lg border border-gray-200 divide-y">
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
}