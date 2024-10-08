import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import FileInput from '../components/common/input/FileInput'
import mic from "../assets/podcast-mic.png"
import audio from "../assets/sound-waves.png"
import play from "../assets/play.png"
import pause from "../assets/pause.png"
import headphone from "../assets/headphone.png"
import pdtplay from "../assets/play-sm.png"
import welcome from "../assets/welcome.wav"

const Home = () => {

     const [isplaying,setIsplaying]=useState(false)

    

    const toggleAudio=()=>{
        const audioElement=document.getElementById('podcastAudio')
        
        setIsplaying(prevIsplaying => {
            if (prevIsplaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            return !prevIsplaying;
        });
    }

    isplaying && setTimeout(()=>{
        setIsplaying(!isplaying)
    },9000)

    
  return (
    <div>
        <Header/>
        <div className="container">
            <div className="hero">
                <div className="intro-top">
                 
                    <h1>A quick and easy 
                    way to listen to most 
                    favourite podcast</h1>
                    <p className="intro-btm">Explore latest top-notch stories from world-wide community and tech creaters</p>
                </div>
                 
                <div className="hero-l">
                    <div className="btm">
                    {
                        isplaying?<img src={play} alt="play" onClick={toggleAudio} />:
                        <img src={pause} alt="pause" onClick={toggleAudio} />
                    }
            <audio id="podcastAudio">
              <source src={welcome} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
                        <img src={audio} alt="audio" className="audioImg"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home
