'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Countdown from 'react-countdown'
import { Spotlight } from './ui/Spotlight'
import { TypewriterEffect } from './ui/typewriter-effect'
import { TextGenerateEffect } from './ui/text-generate-effect'
import Link from 'next/link'

export default function ChurchHero() {
    const [nextSunday, setNextSunday] = useState(getNextSundayDate())

    const words = [
        {
            text: "Join us",
        },
        {
            text: "in our ",
        },
        {
            text: "worship experience",
            className: "text-primary700 dark:text-primary700",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setNextSunday(getNextSundayDate())
        }, 60000) // Update every minute

        return () => clearInterval(timer)
    }, [])

    function getNextSundayDate() {
        const now = new Date()
        const nextSunday = new Date(now)
        nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7)
        nextSunday.setHours(10, 0, 0, 0) // Assuming service starts at 10:00 AM
        return nextSunday
    }

    const CountdownRenderer = ({ days, hours, minutes, seconds, completed }: { days: React.ReactNode; hours: React.ReactNode; minutes: React.ReactNode; seconds: React.ReactNode; completed: Boolean }) => {
        if (completed) {
            return <span>Service is starting!</span>
        } else {
            return (
                <motion.div
                    className="flex space-x-4  ml-2 my-10 text-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {[
                        { label: 'Days', value: days },
                        { label: 'Hours', value: hours },
                        { label: 'Minutes', value: minutes },
                        { label: 'Seconds', value: seconds }
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-white p-3 rounded-lg shadow-md">
                            <div className="md:text-3xl text-lg font-bold text-primary500">{value}</div>
                            <div className="text-gray-500 capitalize">{label}</div>
                        </div>
                    ))}
                </motion.div>
            )
        }
    }

    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-between px-2 py-10 md:px-8 md:py-20 bg-gray-950 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/church.jpg?height=1080&width=1920')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            {/* Left side - Hero section */}
            <motion.div
                className="w-full lg:w-1/2 space-y-8 z-10"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Spotlight
                    className="-top-10 left-0 md:left-10 md:-top-10"
                    fill="blue"
                />
                <Spotlight
                    className="-top-10 left-0 md:left-10 md:-top-10"
                    fill="blue"
                />
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-10"> <TextGenerateEffect words={"Welcome to overcomers"} /></h1>
                {/* <TypewriterEffect words={words} /> */}
                <p className="text-xl text-gray-600">Join us in worship and community</p>

                {/* Countdown */}
                <Countdown
                    date={nextSunday}
                    renderer={CountdownRenderer}
                />
                <p className="text-gray-600">Until next Sunday service</p>

                {/* Call to action buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.a
                        href={"#livestream"}
                        className="px-6 py-3 bg-primary700 text-white rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Watch Latest Message
                    </motion.a>
                    <motion.button
                        className="px-6 py-3 bg-white text-primary700 border-2 border-primary700 rounded-md font-semibold"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Our Service
                    </motion.button>
                </div>
            </motion.div>

            {/* Right side - Video section */}
            <motion.div
                className="w-full lg:w-1/2 mt-8 mb-10 md:mb-0 lg:mt-0 relative"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
                <div className="absolute inset-0 bg-transaparent backdrop-blur-lg rounded-full transform scale-110 translate-x-1/4"></div>
                <motion.div
                    className="relative z-10 rounded-lg bg-transparent overflow-hidden shadow-xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <div className="aspect-w-16 aspect-h-9">
                        <video
                            src="/My work.mp4"
                            autoPlay
                            loop
                            muted

                            className="object-cover"
                        // style={{ filter: videoFilter }}
                        />
                        {/* <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                className="p-4 bg-white bg-opacity-75 rounded-full text-blue-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Play size={32} />
                            </motion.button>
                        </div> */}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}