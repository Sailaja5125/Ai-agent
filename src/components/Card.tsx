import React from 'react';

function Card() {
  return (
    <div className="bg-[#1B1B1B] rounded-lg shadow-md p-6 w-full max-w-md mx-auto hover:shadow-xl transition duration-300">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Left Icon or Image */}
        <img
          src="assets/card/c1.png"
          alt="Feature Icon"
          className="w-[40%]  object-cover rounded-md"
        />
        {/* Content */}
        <div className="flex flex-col text-left">
          {/* Header Image (optional) */}
          <img
            src="https://via.placeholder.com/150x80"
            alt="Header"
            className="rounded-md mb-3"
          />
          <h2 className="text-white text-lg font-semibold mb-1">Joijo</h2>
          <p className="text-sm text-[#A1A1A1] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos saepe voluptates.
          </p>
          <button className="mt-4 px-4 py-2 text-white font-medium rounded hover:bg-[#059865] transition duration-300 w-max">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;