import { Info } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div className=" w-full p-1 bg-indigo-950 font-sans">
      <div className="container mx-auto px-4 flex items-center justify-between text-sm text-gray-200">
        <p>✔ Free Shipping On All Orders Over $50</p>
        <div className="flex items-center gap-12 cursor-pointer ">
          <select name="lang" id="lang">
            <option value="en">English</option>
            <option value="ar">arabic</option>
          </select>
          <p className="cursor-pointer">Faqs</p>
          <p className="flex items-center gap-1 cursor-pointer">
            <Info size={15} />
            Need Help
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
