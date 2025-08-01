import React from 'react';

function SubheroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center font-poppins mt-0 md:-mt-20">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/assets/subhero.png"
            alt="Subhero Image"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="text-left space-y-4 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Promising Service
          </h1>
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            In Just <span className="text-[#06B67A]">One Click</span>
          </h1>
          <p className="text-[#A1A1A1] font-jakarta text-sm md:text-base leading-relaxed">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document.
          </p>
          <button className="button">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default SubheroSection;