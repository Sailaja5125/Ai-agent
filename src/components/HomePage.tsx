import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import SubheroSection from './SubheroSection'
import CardSection from './CardSection'
import Footer from './footer'

function HomePage() {
  return (
    <div>
      <Navbar hidden={false} />
      <HeroSection/>
      <SubheroSection/>
      <CardSection/>
      <Footer/>
    </div>
  )
}

export default HomePage
