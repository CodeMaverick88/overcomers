'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sun, Book, Users } from 'lucide-react'

const services = [
    {
        name: 'Sunday Worship',
        time: '10:00 AM',
        description: 'Join us for praise, worship, and an inspiring message.',
        icon: Sun,
        color: 'from-yellow-400 to-orange-500'
    },
    {
        name: 'Wednesday Bible Study',
        time: '7:00 PM',
        description: 'Dive deep into God\'s word with interactive study and discussion.',
        icon: Book,
        color: 'from-blue-400 to-indigo-500'
    },
    {
        name: 'Friday Prayer Meeting',
        time: '6:30 PM',
        description: 'Come together in prayer for our community and beyond.',
        icon: Sun,
        color: 'from-green-400 to-emerald-500'
    },
    {
        name: 'Saturday Youth Fellowship',
        time: '4:00 PM',
        description: 'A dynamic gathering for young people to connect and grow in faith.',
        icon: Users,
        color: 'from-purple-400 to-pink-500'
    }
]

function ServiceCard({ service}: { service: { color: string; name: string; time: string; description: string; icon: any; }, index: number }) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50])

    const Icon = service.icon

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, scale, x }}
            className="relative flex items-center mb-16 last:mb-0"
        >
            <div className={`absolute left-0 w-1 h-full bg-gradient-to-b ${service.color}`} />
            <div className="ml-8 bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${service.color} text-white mr-4`}>
                        <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <p className="text-muted-foreground">{service.time}</p>
                    </div>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
            </div>
        </motion.div>
    )
}

export default function OrderOfServices() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} className="md:py-16 ">
            <div className="md:container mx-auto md:px-4">
                <div className='grid gap-2 grid-flow-row-dense md:grid-cols-2'>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <p className="text-4xl text-balance tracking-tight leading-tight space-x-2 space-y-2  mb-4">
                            We welcome you to join us in worship and fellowship!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Plan Your Visit
                        </motion.button>
                    </motion.div>
                    <div className="relative">
                        <motion.h2
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold top-50 text-center mb-12"
                        >
                            Our Order of Services
                        </motion.h2>
                        {/* <motion.div
                            className="absolute left-4 w-0.5 bg-gray-300"
                            style={{ height: lineHeight, top: 0, bottom: 0 }}
                        /> */}
                        {services.map((service, index) => (
                            
                            <ServiceCard key={index} service={service} index={index} />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    )
}