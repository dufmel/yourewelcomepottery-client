import React from 'react'
import headshot from "/headshot.jpg"
import "./Bio.css"

function Bio() {
  return (
    <div className="bio-container">
        <img src={headshot} alt="<Emma's headshot>" className="headshot"/>
        <div className='biocard'>
        <h1>Emma</h1>
        <p>I'm a laweyer turned potter based in Nashville, TN. I love to make things.</p>

        </div>
    </ div>
  )
}

export default Bio