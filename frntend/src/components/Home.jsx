import React from 'react'
import heroImg from "../assets/hero.png"
import si from "../assets/s1.png"

const Home = () => {
  return (
    <div>Home
        <h2>Welcome to the Home Page</h2>
        <img src={heroImg} alt="Hero" />
        <img src={si} alt="SI" />
    </div>
  )
}

export default Home