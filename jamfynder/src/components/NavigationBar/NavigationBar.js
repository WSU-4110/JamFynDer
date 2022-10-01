import React from 'react'
import './NavigationBar.css'

const NavigationBar = () => {
  return(
    <header className="NavigationBar">
        <nav>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Settings</li>
            <li>Help/Tutorial</li>
          </ul>
        </nav>
      </header>
  )
}

export default NavigationBar;