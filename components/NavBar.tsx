'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },

]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [width, setWidth] = useState(10)
    const [isHovered, setIsHovered] = useState(false)
    const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null)
    const [desktopActiveSubmenu, setDesktopActiveSubmenu] = useState<string | null>(null)

    const toggleMobileSubmenu = (name: string) => {
        setMobileActiveSubmenu(mobileActiveSubmenu === name ? null : name)
    }

    const toggleDesktopSubmenu = (name: string) => {
        setDesktopActiveSubmenu(desktopActiveSubmenu === name ? null : name)
    }

    function handleHover() {
        if (isHovered) {

            let witdhIN = setInterval(() => {
                setWidth(width + 10)
            }, 1000)

            if (width == 100) {
                clearInterval(witdhIN)
            }
        }
    }

    return (
        <nav className="bg-transparent z-50 backdrop-blur-lg fixed w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold text-gray-800">
                            <Image src="/overcomers.jpg" width={100} height={100} alt="Overcomers logo" className='rounded-full' />

                        </span>
                    </div>

                    {/* Center menu items (medium to large screens) */}
                    <div className="hidden md:flex space-x-8">
                        {menuItems.slice(0, 3).map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onFocus={handleHover}
                                className="text-primary700 group  hover:bg-primary700 hover:text-white transition-background duration-300 hover:font-bold px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {item.name}

                              
                            </Link>
                        ))}
                    </div>

                    {/* Menu button (all screen sizes) */}
                    <div className="flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Full-screen menu (medium to large screens) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hidden md:flex -mt-20 slide-in-from-top-20 slide-out-to-top-20 inset-0 z-40  bg-gray-800 bg-opacity-75"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="w-full bg-primary950  shadow-xl -top-20 z-[100] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                                <div className="flex justify-between items-start">
                                    {/* Logo on the left */}
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl font-bold text-gray-800">
                                            <Image src="/overcomers.jpg" width={100} height={100} alt="Overcomers logo" className='rounded-full' />

                                        </span>
                                    </div>

                                    {/* Close button on the right */}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsOpen(false)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </motion.button>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl font-bold text-white text-center mt-8 mb-12">Overcomers INTL</h2>

                                {/* Centered menu items */}
                                <div className="flex flex-col items-center space-y-6">
                                    {menuItems.map((item: { name: string; href: string; submenu?: { name: string; href: string }[] }) => (
                                        <div key={item.name} className="w-64">
                                            {item?.submenu ? (
                                                <div>
                                                    <button
                                                        onClick={() => toggleDesktopSubmenu(item.name)}
                                                        className="flex items-center justify-between w-full text-left text-xl font-semibold text-white hover:text-indigo-600 transition-colors"
                                                    >
                                                        {item.name}
                                                        <ChevronDown
                                                            className={`h-5 w-5 transition-transform ${desktopActiveSubmenu === item.name ? 'transform rotate-180' : ''
                                                                }`}
                                                        />
                                                    </button>
                                                    <AnimatePresence>
                                                        {desktopActiveSubmenu === item.name && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="mt-2 space-y-2"
                                                            >
                                                                {item.submenu.map((subitem) => (
                                                                    <Link
                                                                        key={subitem.name}
                                                                        href={subitem.href}
                                                                        className="block pl-4 text-white font-semibold hover:text-indigo-600 transition-colors"
                                                                    >
                                                                        {subitem.name}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className="block text-xl font-semibold text-white  hover:text-indigo-600 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden inset-0 z-40 bg-gray-800 bg-opacity-75"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm  bg-white h-full shadow-xl z-[100] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-gray-800">
                                        <Image src="/overcomers.jpg" width={100} height={100} alt="Overcomers logo" className='rounded-full' />

                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </motion.button>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        {menuItems.map((item: { name: string; href: string; submenu?: any[] }) => (
                                            <div key={item.name}>
                                                {item.submenu ? (
                                                    <div>
                                                        <button
                                                            onClick={() => toggleMobileSubmenu(item.name)}
                                                            className="flex justify-between items-center w-full text-base font-medium text-gray-900"
                                                        >
                                                            {item.name}
                                                            <ChevronDown
                                                                className={`h-5 w-5 transition-transform ${mobileActiveSubmenu === item.name ? 'transform rotate-180' : ''
                                                                    }`}
                                                            />
                                                        </button>
                                                        <AnimatePresence>
                                                            {mobileActiveSubmenu === item.name && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="mt-2 space-y-2"
                                                                >
                                                                    {item.submenu.map((subitem) => (
                                                                        <Link
                                                                            key={subitem.name}
                                                                            href={subitem.href}
                                                                            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-primary950 hover:bg-gray-50"
                                                                        >
                                                                            {subitem.name}
                                                                        </Link>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}