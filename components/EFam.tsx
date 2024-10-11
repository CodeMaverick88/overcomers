'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const steps = [
  "Register your interest",
  "Receive a welcome email",
  "Join our online orientation",
  "Participate in virtual gatherings",
  "Engage in our online community"
]

export default function EFamilyJoin() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/efam.jpg?height=1080&width=1920')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join Our E-Family
          </motion.h2>
          <motion.p 
            className="text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect, worship, and grow with our online community of believers from around the world.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Steps to Join</h3>
              <div className="relative h-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center"
                  >
                    <ChevronRight className="text-primary mr-2" />
                    <span className="text-white text-lg">{steps[currentStep]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div 
              className="bg-white rounded-lg p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Register Your Interest</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="message">Why do you want to join our E-Family?</Label>
                  <Textarea id="message" placeholder="Share your thoughts..." required />
                </div>
                <Button type="submit" className="w-full">Join E-Family</Button>
              </form>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="mt-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Why Join Our E-Family?</h3>
          <ul className="list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
            <li>Access to exclusive online worship services and prayer meetings</li>
            <li>Connect with believers from diverse backgrounds worldwide</li>
            <li>Participate in virtual Bible study groups and spiritual growth programs</li>
            <li>Receive personalized spiritual guidance and support</li>
            <li>Engage in online community outreach and mission projects</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}