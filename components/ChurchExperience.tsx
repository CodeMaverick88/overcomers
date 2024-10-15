'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, Circle } from 'lucide-react'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { Audiowide } from "next/font/google";
import { Spotlight } from './ui/Spotlight'

const AudiowideFont = Audiowide({ weight: "400", subsets: ["latin"], display: "swap" });

const experiences = [
    {
        title: 'Join Overcomers Church Community',
        description: 'Become part of a vibrant, supportive community of believers.',
        image: '/connecting_1_graphic.jpg?height=700&width=600',
        color: 'bg-blue-500',
        spot: "blue",
        cta: 'Join Now',
    },
    {
        title: 'Give or Donate to the Church Mission',
        description: 'Support our mission to spread love and hope around the world.',
        image: '/investmetn.jpeg?height=700&width=600',
        color: 'bg-green-500',
        spot: "green",
        cta: 'Donate',
    },
    {
        title: 'Find Your Space',
        description: 'Discover your unique gifts and serve in our various ministries.',
        image: '/mantles.jpg?height=700&width=600',
        color: 'bg-purple-500',
        spot: "purple",
        cta: 'Explore Ministries',
    },
    {
        title: 'Find Your Space',
        description: 'Discover your unique gifts and serve in our various ministries.',
        image: '/mantles.jpg?height=700&width=600',
        color: 'bg-yellow-500',
        spot: "purple",
        cta: 'Explore Ministries',
    },
]

export default function ChurchExperienceTimeline() {
    const [currentExperience, setCurrentExperience] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentExperience((prev) => (prev + 1) % experiences.length)
        }, 10000) // Change experience every 10 seconds

        return () => clearInterval(timer)
    }, [])

    const nextExperience = () => {
        setCurrentExperience((prev) => (prev + 1) % experiences.length)
    }

    const prevExperience = () => {
        setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length)
    }

    return (
        <div className={`w-full mx-auto relative space-y-10 p-6 ${AudiowideFont.className}`}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/efam.jpg?height=1080&width=1920')",
                    filter: 'grayscale(100%)',
                    zIndex: 0,
                    height: '100%', // Ensure it fills the height
                }}
            />
    
            {/* Overlay for opacity */}
            <div
                className="absolute inset-0 bg-black bg-opacity-40"
                style={{ zIndex: 1 }}
            />
    
            {/* Content */}
            <div className="relative z-10">
                <h2 className={`text-3xl w-70 flex items-center justify-between font-bold mb-8 tracking-wide leading-10 text-wrap ${AudiowideFont.className}`}>
                    Start Your Experience with Our Church
                </h2>
    
                <Spotlight
                    className="-top-10 right-0 md:right-10 md:-top-10"
                    fill={experiences[currentExperience].spot ?? "blue"}
                />
    
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentExperience}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col ml-4 md:flex-row items-center gap-6"
                    >
                        <div className="w-full md:w-1/2">
                            <img
                                src={experiences[currentExperience].image}
                                alt={experiences[currentExperience].title}
                                className="w-full h-100 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <h3 className="text-2xl font-semibold">{experiences[currentExperience].title}</h3>
                            <p className="text-gray-600">{experiences[currentExperience].description}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 text-white rounded-full ${experiences[currentExperience].color}`}
                            >
                                {experiences[currentExperience].cta}
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
    
                {/* Timeline */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200">
                    <motion.div
                        className={`absolute w-full ${experiences[currentExperience].color}`}
                        initial={{ height: '0%' }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 10, ease: 'linear' }}
                    />
                </div>
    
                {/* Navigation controls */}
                <div className="absolute md:right-10 right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevExperience}
                        className="p-2 bg-gray-200 rounded-full"
                    >
                        <ChevronUp size={24} />
                    </motion.button>
                    {experiences.map((_, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentExperience(index)}
                            className={`w-3 h-3 rounded-full ${index === currentExperience ? experiences[currentExperience].color : 'bg-gray-300'}`}
                        />
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextExperience}
                        className="p-2 bg-gray-200 rounded-full"
                    >
                        <ChevronDown size={24} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
    
}