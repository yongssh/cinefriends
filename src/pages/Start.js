

import React, {useEffect} from "react"


function AboutMe({onClick}) {

    useEffect(()=> {
      window.addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
          onClick();
        }
      })
    });

    return (
      <div className="App">
        <header className="App-header">
        <div className= 'fade-in-animation'>
              <p> About </p>
              <div className='about-me-paragraph'>
              <p>
                 Hello!
              </p>
              </div>
          <button type="button" class="btn btn-outline-light" onClick = {onClick}> Back </button>
          </div>
        </header>
      </div>
    );
  
    
  }

export default AboutMe; // "export default" keywords specify the main component of the file