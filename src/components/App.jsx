import React from "react";
import { Button } from '@mui/material';
import alarm from "./alarm.mp3";
import { useEffect } from "react";

 function App() {
    const [Hours, setHours] = React.useState("00");
    const [Minutes, setMinutes] = React.useState("00");
    const [Seconds, setSeconds] = React.useState("00");
    const [timerId, setTimerId] = React.useState(null);
    const [timeoutId, setTimeoutId] = React.useState(null);


    function handleSet(h,m,s){      
        (h)?((h<10)?setHours("0"+h): setHours(h)):setHours("00");
        (m)?((m<10)?setMinutes("0"+m): setMinutes(m)):setMinutes("00");
        (s)?((s<10)?setSeconds("0"+s): setSeconds(s)):setSeconds("00");
    }
    var totalSeconds = parseInt(Hours) * 3600 + parseInt(Minutes) * 60 + parseInt(Seconds);
    function set(){
        var h=document.getElementById("hours").value;
        var m=document.getElementById("minutes").value;
        var s=document.getElementById("seconds").value;
        handleSet(h,m,s);   

        document.getElementById("hours").value="";
        document.getElementById("minutes").value="";
        document.getElementById("seconds").value="";
    }

 
    function startTimer() {
        if (totalSeconds >0) {

            totalSeconds--;
            console.log(totalSeconds);
            var hh= Math.floor(totalSeconds/3600)
            var mm=Math.floor((totalSeconds/60)-(hh*60));
            var ss=totalSeconds-((hh*3600)+(mm*60));
            console.log(hh, mm, ss);
            handleSet(hh, mm, ss);

          
        } 
        else {
            const elements = document.getElementsByClassName("timer");
            const newElement = document.createElement("h2");
            newElement.innerHTML = "Time's up!";
            newElement.setAttribute("class", "alert");
            elements[0].parentNode.insertBefore(newElement, elements[0]);
            clearInterval(timerId);
            const audio = new Audio(alarm);
            audio.play();
            const newTimeoutId=setTimeout(() => {
                audio.pause();
                newElement.innerHTML="";
                newElement.parentNode.removeChild(newElement);
            }, 7000);
            setTimeoutId(newTimeoutId);

           
        }
    }
    useEffect(() => {
        return () => {
            clearInterval(timerId);
            clearTimeout(timeoutId); 
        };
    }, [timerId, timeoutId]);

    function handleStart() {
        clearInterval(timerId);
        const newTimerId =setInterval(startTimer, 1000);
        setTimerId(newTimerId);
    }

    function handlePause() {
        clearInterval(timerId); 
    }

    function handleReset() {
        clearInterval(timerId); 
        clearTimeout(timeoutId); 
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        totalSeconds=0;
    }

    return (
    <div className="main">
        <h1 className="heading">Timer</h1>
         <div className="App">
         {/* <h2 className="alert">xx</h2> */}
            <h1 className="timer">{Hours}:{Minutes}:{Seconds}</h1>
            <div className="inputs">
                <input type="number" min="00" placeholder="Hours" id="hours"/>
                <input type="number" max="60" min="00" placeholder="Minutes" id="minutes"/>
                <input type="number" max="60" min="00" placeholder="Seconds" id="seconds"/>
                <Button variant="contained" style={{backgroundColor:"#fe339c"}} onClick={set}>Set</Button>
            </div>


           <div className="controls">
                <Button variant="outlined" style={{color:"#fe339c"}} onClick={handlePause}>Pause</Button>
                <Button variant="contained" style={{backgroundColor:"#fe339c"}}  onClick={handleStart}>Start</Button>
                <Button variant="outlined" style={{color:"#fe339c"}}  onClick={handleReset}>Reset</Button>
           </div>

        </div>

    </div>
       
    )

}
export default App;