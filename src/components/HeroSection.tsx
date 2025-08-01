import React from 'react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center font-poppins px-6 md:px-12">
      <div className="container mx-40 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        
        {/* Text Content */}
        <div className="text-left space-y-4 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Let’s Horizon
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-[#06B67A]">Robotics</span> Handle It,
          </h1>
          <p className="text-sm md:text-base font-jakarta text-[#A1A1A1] leading-relaxed">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.
          </p>
          <button className="button">Learn More</button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/assets/hero.png"
            alt="Tech Hero"
            className="rounded-lg shadow-lg w-[80vw] md:w-[70vw] lg:w-[35vw] h-auto"
          />
        </div>
      </div>
    </section>
  );
}