import React from 'react';
import Announcement from '../ui/Announcement';

const Navbar = () => {
  return (
    <>
      <Announcement />
      <div className="w-full bg-sky-100 p-5">
        <div className="container mx-auto flex items-center justify-between text-sm text-black">
          <div>Comforty</div>
          <div>search</div>
          <div className="flex items-center gap-4">
            <div>cart</div>
            <div>wishlist</div>
            <div>user</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
