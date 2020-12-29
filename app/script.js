import React, { useState } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [work, setWork] = useState(false)
  const [rest, setRest] = useState(false)
  const [time, setTime] = useState(1200)
  const [stop, setStop] = useState(false)
  const [workImage, setWorkImage] = useState(false)
  const [timer, setTimer] = useState(null)

  const formatTime = arg => {
    let output;
    if (arg === undefined) {
      return null;
    } else if (typeof arg == 'number' && !isNaN(arg)) {
      let seconds = arg % 60;
      let minutes = Math.floor(parseInt((arg / 60 ) % 60));
      if (seconds < 10) {
        seconds = ':0' + seconds;
      } else {
        seconds = ':' + seconds;
      }
      if (minutes < 10) {
        output = '0' + minutes + seconds;
      } else {
        output = minutes + seconds;
      }
    }
    return output
  };

  const step = () => {
    setTime((time) => { 
      if(time === 0) {
        setRest(rest => {
          if(rest === true && time === 0) {
            setTime(1200)
          }
          return !rest
        })
        setWorkImage(workImage => !workImage)
        setTime(20)
      }
      return time - 1
    })
  }

  const startTimer = () => {
    setTimer(setInterval(() => step(), 1000))
  }

  const initWork = () => {
    setWork(true)
    setStop(true)
    setWorkImage(true)
    startTimer()
  }

  const handleStop = () => {
    setTime(1200)
    setWork(false)
    setRest(false)
    setStop(false)
    setWorkImage(false)
    clearInterval(timer)
  }

  const closeApp = () => {
    return window.close()
  }
  

  return (
    <div>
      <h1>Protect your eyes</h1>
      {!work &&
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
      }
      {workImage && <img src="./images/work.png" />}
      {rest && <img src="./images/rest.png" />}
      {(work || rest) &&  
      <div className="timer">
       {formatTime(time)}
      </div>
     }
      {!work && <button onClick={initWork} className="btn">Start</button> }
      {stop && <button onClick={handleStop} className="btn">Stop</button> }
      <button onClick={closeApp} className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
