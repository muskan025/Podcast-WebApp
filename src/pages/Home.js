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
                <div className="hero-r">
                    <div className="intro-top">
                    <h1>A quick and easy<br></br>
                    way to listen to most<br></br>
                    favourite podcast</h1>
                    </div>
                        
                    <div className="intro-btm">
                    <p>Explore latest top-notch stories</p><p>from world-wide community and tech creaters</p>
                    </div>
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
                        <img src={audio} alt="audio"/>
                    </div>
                </div>
            </div>
            <div className="thumbnail-container">
                <h1>Weekly Popular</h1>
                <div className="thumbnail-subcontainer">
                    <div className="thumbnail">
                        <div className="thumbnail-r">
                        <img className='headphone' src={headphone} alt="headphone"/>
                        </div>
                        <div className="thumbnail-l">
                            <div className="top">
                                <h4>Tech Talk: Exploring the Future</h4>
                                <p>by John Smith</p>
                            </div>
                            <div className="btm">
                                <span>45:00</span>
                                <img src={pdtplay} alt="pause"/>
                            </div>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="thumbnail-r">
                           <img className='headphone' src={headphone} alt="headphone"/>
                        </div>
                        <div className="thumbnail-l">
                            <div className="top">
                                <h4>Every day life</h4>
                                <p>by Karry Jim</p>
                            </div>
                            <div className="btm">
                                <span>50:21</span>
                                <img src={pdtplay} alt="pause"/>
                            </div>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="thumbnail-r">
                           <img className='headphone' src={headphone} alt="headphone"/>
                        </div>
                        <div className="thumbnail-l">
                            <div className="top">
                                <h4>The Mindful Minute</h4>
                                <p>by Jane Doe</p>
                            </div>
                            <div className="btm">
                                <span>30:00</span>
                                <img src={pdtplay} alt="pause"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
