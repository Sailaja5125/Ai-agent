import React from 'react';
import Card from './Card';

function CardSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-8 w-fit">
        {/* You can render multiple cards like this */}
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default CardSection;