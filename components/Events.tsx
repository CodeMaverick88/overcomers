'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isBefore, isAfter, isToday } from 'date-fns'
import { Calendar, Clock, MapPin, Heart, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'


type Event = {
  id: string
  title: string
  description: string
  image: string
  location: string
  date: Date
  endDate?: Date
}

const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'A three-day music extravaganza featuring top artists from around the world.',
    image: '/soothing.jpg?height=200&width=300',
    location: 'Central Park, New York',
    date: new Date(2024, 6, 15),
    endDate: new Date(2024, 6, 17),
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    description: 'Explore the latest innovations in technology and network with industry leaders.',
    image: '/soothing.jpg?height=200&width=300',
    location: 'Convention Center, San Francisco',
    date: new Date(2024, 8, 5),
  },
  {
    id: '3',
    title: 'Art Exhibition Opening',
    description: 'Witness the unveiling of breathtaking artworks from emerging and established artists.',
    image: '/soothing.jpg?height=200&width=300',
    location: 'Modern Art Gallery, London',
    date: new Date(2024, 3, 20),
  },
  {
    id: '4',
    title: 'Food and Wine Festival',
    description: 'Indulge in culinary delights and exquisite wines from around the globe.',
    image: '/soothing.jpg?height=200&width=300',
    location: 'Waterfront Park, San Diego',
    date: new Date(2024, 9, 10),
    endDate: new Date(2024, 9, 12),
  },
  {
    id: '5',
    title: 'International Film Festival',
    description: 'Experience the best of world cinema with premieres, panel discussions, and special screenings.',
    image: '/soothing.jpg?height=200&width=300',
    location: 'Various Theaters, Toronto',
    date: new Date(2024, 8, 7),
    endDate: new Date(2024, 8, 17),
  },
  {
    id: '6',
    title: 'Marathon for Charity',
    description: 'Run for a cause in this annual marathon supporting local charities.',
    image: '/soothing.jpg?height=200&width=300',
    location: 'City Center, Chicago',
    date: new Date(2024, 4, 1),
  },
]

export default function EventList() {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [filterDate, setFilterDate] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  useEffect(() => {
    if (filterDate) {
      const filtered = events.filter(event => 
        format(event.date, 'yyyy-MM-dd') === filterDate
      )
      setFilteredEvents(filtered)
    } else {
      setFilteredEvents(events)
    }
  }, [filterDate])

  const getEventStatus = (event: Event) => {
    const now = new Date()
    if (isToday(event.date)) return 'today'
    if (isBefore(event.date, now)) return 'past'
    if (event.endDate && isAfter(now, event.date) && isBefore(now, event.endDate)) return 'ongoing'
    return 'upcoming'
  }

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-5xl font-bold mb-2 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover Exciting Events
      </motion.h1>
      <motion.p 
        className="text-xl text-center mb-8 text-muted-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore a world of experiences waiting for you!
      </motion.p>

      <div className="mb-6 flex items-start justify-start flex-col gap-2">
        <Label htmlFor="date-filter " className='text-white font-semibold'>Filter by date</Label>
        <Input
          id="date-filter"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="mt-1 max-w-md text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden"
            >
              <motion.img 
                className="h-60 w-full object-cover"
                src={event.image}
                alt={event.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <motion.h3 
                  className="text-lg font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {event.title}
                </motion.h3>
                <motion.div 
                  className="flex items-center mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm text-muted-foreground">{event.location}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm text-muted-foreground">{format(event.date, 'MMMM d, yyyy')}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm text-muted-foreground">{format(event.date, 'h:mm a')}</span>
                </motion.div>
                {getEventStatus(event) === 'past' && (
                  <Badge variant="secondary" className="mb-4">Past Event</Badge>
                )}
                {getEventStatus(event) === 'ongoing' && (
                  <Badge variant="default" className="mb-4">Ongoing</Badge>
                )}
                <AnimatePresence>
                  {expandedEvent === event.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-muted-foreground mb-4"
                    >
                      {event.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant={getEventStatus(event) === 'today' ? 'default' : 'outline'}
                        onClick={() => setSelectedEvent(event)}
                        className="relative overflow-hidden"
                      >
                        {getEventStatus(event) === 'today' && (
                          <motion.div
                            className="absolute inset-0 bg-red-500 opacity-30"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                        <Heart className={`mr-2 h-4 w-4 ${getEventStatus(event) === 'today' ? 'text-red-500' : ''}`} />
                        Learn More
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <EventDetails event={selectedEvent} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleEventExpansion(event.id)}
                    aria-label={expandedEvent === event.id ? "Collapse description" : "Expand description"}
                  >
                    <motion.div
                      animate={{ rotate: expandedEvent === event.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function EventDetails({ event }: { event: Event | null }) {
  if (!event) return null

  return (
    <>
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <motion.img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.p 
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {event.description}
        </motion.p>
        <motion.div 
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{format(event.date, 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{format(event.date, 'h:mm a')}</span>
          </div>
        </motion.div>
      </div>
    </>
  )
}