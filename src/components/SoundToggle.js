import React, { useEffect, useRef, useState } from "react";

/* Importing GSAP */
import { TweenMax, Power3, TimelineMax, gsap, TimelineLite } from "gsap";

/* Importing Audios */
import PokemonSong from "../assets/audios/pokemon-song.mp3";

//importing Assets
//Styles
import "../assets/styles/soundbarStyles.css";

const SoundToggle = ({ view }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  /* Creatin Bar Refs */
  let bar1 = useRef(null);
  let bar2 = useRef(null);
  let bar3 = useRef(null);
  let soundRef = useRef(null);

  const setVolume1 = useRef(new TimelineMax({ paused: true }));
  const setVolume2 = useRef(new TimelineMax({ paused: true }));

  const barAnim1 = useRef(new TimelineMax({ paused: true }));

  const music = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      soundRef.current.play();
      setVolume2.current.pause();
      setVolume1.current.restart();
    } else {
      setVolume1.current.pause();
      setVolume2.current.restart();
    }
  };

  const pauseMusic = () => {
    soundRef.current.pause();
  };

  // This will run only whe the value of isPlaying is updated

  useEffect(() => {
    soundRef.current.autoplay = false;
    soundRef.current.volume = 0.0;
    soundRef.current.loop = true;

    barAnim1.current
      .to(bar1.current, 0.2, {
        scaleY: "random(0.3,0.7)",
        ease: "none",
        yoyo: "true",
        repeat: -1,
        repeatRefresh: true,
      })
      .to(bar2.current, 0.2, {
        scaleY: "random(0.3,1)",
        ease: "none",
        yoyo: "true",
        repeat: -1,
        repeatRefresh: true,
      })
      .to(bar3.current, 0.2, {
        scaleY: "random(0.3,0.8)",
        ease: "none",
        yoyo: "true",
        repeat: -1,
        repeatRefresh: true,
      });

    setVolume1.current.to(soundRef.current, 0.5, {
      volume: 0.3,
    });

    setVolume2.current.to(soundRef.current, 0.5, {
      volume: 0.0,
      onComplete: pauseMusic,
    });
  }, []);

  useEffect(() => {
    barAnim1.current.paused(!isPlaying);
  }, [isPlaying]);

  return (
    <div className="sound-toggle">
      <div className="sound-bar-container" onClick={() => {}}>
        <div
          className={`sound-bars ${!view}`}
          onClick={() => {
            music();
          }}
        >
          <div className="sound-bar1" ref={bar1}></div>
          <div className="sound-bar2" ref={bar2}></div>
          <div className="sound-bar3" ref={bar3}></div>
          <audio src={PokemonSong} ref={soundRef}></audio>
        </div>
      </div>
    </div>
  );
};

export default SoundToggle;
