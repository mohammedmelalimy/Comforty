import React from 'react';

const page = () => {
  return (
    <div className=" w-full p-2 bg-slate-900 font-sans">
      <div className="container mx-auto flex items-center justify-between text-sm text-gray-400">
        <p> Free Shipping On All Orders Over $50</p>
        <div className="flex items-center gap-12 ">
          <select name="lang" id="lang">
            <option value="en">English</option>
            <option value="ar">arabic</option>
          </select>
          <p>Faqs</p>
          <p>Need Help</p>
        </div>
      </div>
    </div>
  );
};

export default page;
