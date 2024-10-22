"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import { Audiowide } from "next/font/google";
import Countdown from "react-countdown";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const AudiowideFont = Audiowide({ weight: "400", subsets: ["latin"], display: "swap" });

const getNextSundayService = () => {
  const now = new Date();
  const nextSunday = new Date();
  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
  nextSunday.setHours(10, 0, 0, 0);

  if (now > nextSunday) nextSunday.setDate(nextSunday.getDate() + 7);

  return nextSunday.getTime() - now.getTime();
};

const CountdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    return <span>Service is starting!</span>;
  } else {
    return (
      <motion.div
        className="flex space-x-4 ml-2 my-10 text-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Minutes", value: minutes }, { label: "Seconds", value: seconds }].map(({ label, value }) => (
          <div key={label} className=" p-3 rounded-lg shadow-md">
            <div className="md:text-3xl text-lg font-bold text-primary500">{value}</div>
            <div className="text-gray-500 capitalize">{label}</div>
          </div>
        ))}
      </motion.div>
    );
  }
};

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoFilter, setVideoFilter] = useState("brightness(1)");
  const [timeRemaining, setTimeRemaining] = useState(getNextSundayService());

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const words = [
    "The word of God",
    "Fellowship",
    "Praise",
    "Worship",
    "Here at Overcomers",
    "The Mountain of Hope and Healing",
    "WELCOME ALL",
  ];
  const colors = ["#8B4513", "#000000", "#228B22", "#6A0572", "#0000FF", "#FFFFFF"];
  const intervalTime = 6500;

  // **Fix Word Transitions**: Set interval to change words automatically
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % words.length);
    }, intervalTime);

    return () => clearInterval(wordInterval); // Clear the interval when the component unmounts
  }, [intervalTime]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeRemaining(getNextSundayService());
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setVideoFilter("brightness(0.5)");
      if (videoRef.current) videoRef.current.pause();
    } else {
      if (audioRef.current) audioRef.current.play();
      setVideoFilter("brightness(1)");
      if (videoRef.current) videoRef.current.play();
    }
  };

  return (
    <div className={`w-full h-screen relative flex items-center justify-center overflow-hidden ${AudiowideFont.className}`}>
      {/* Video background */}
      <motion.video
        ref={videoRef}
        src=""
        autoPlay
        loop
        muted
        className="absolute inset-0 z-[-1] object-cover h-full w-full"
        style={{ filter: videoFilter }}
      />

      {/* Words & Controls */}
      <motion.div className="absolute text-left space-y-2 left-5 md:left-10 top-1/3 md:top-1/2 transform -translate-y-1/2">
        <motion.h1
          key={currentWord}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
          style={{ color: colors[currentWord] }}
          className="text-lg font-semibold md:text-1xl"
        >
          {words[currentWord]}
        </motion.h1>

        <div className="mt-8 flex gap-4">
          <motion.a href="#livestream" className="px-6 py-3 bg-primary700 text-white rounded-md font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Watch Latest Message
          </motion.a>
          <motion.button className="px-6 py-3 bg-white text-primary700 border-2 border-primary700 rounded-md font-semibold" whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }} whileTap={{ scale: 0.95 }}>
            Join Our Service
          </motion.button>
        </div>
      </motion.div>

      {/* Countdown Timer moved to the bottom */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <Countdown date={Date.now() + timeRemaining} renderer={CountdownRenderer} />
      </div>

      {/* Play/Pause Button */}
      <motion.button whileHover={{ scale: 1.2 }} onClick={togglePlay} className="absolute bottom-10 right-5 md:right-10 p-3 text-white rounded-full">
        {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
      </motion.button>

      {/* Arrow to scroll down */}
      <Link href="#experience">
        <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" whileHover={{ scale: 1.2 }}>
          <FaArrowDown size={20} color="#fff" />
        </motion.div>
      </Link>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
    </div>
  );
};

export default HomePage;
