'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Video = {
  id: string
  title: string
  date: Date
  thumbnailUrl: string
  youtubeId: string
}

const liveVideoId = 'jfKfPfyJRdk' // Example live video ID

const previousVideos: Video[] = [
  {
    id: '1',
    title: 'Sunday Service - Faith and Perseverance',
    date: new Date(2024, 3, 7),
    thumbnailUrl: '/placeholder.svg?height=90&width=160',
    youtubeId: 'VIDEO_ID_1',
  },
  {
    id: '2',
    title: 'Midweek Bible Study - Book of Romans',
    date: new Date(2024, 3, 10),
    thumbnailUrl: '/placeholder.svg?height=90&width=160',
    youtubeId: 'VIDEO_ID_2',
  },
  // Add more previous videos as needed
]

const upcomingVideos: Video[] = [
  {
    id: '3',
    title: 'Easter Sunday Service',
    date: new Date(2024, 3, 21),
    thumbnailUrl: '/placeholder.svg?height=90&width=160',
    youtubeId: 'VIDEO_ID_3',
  },
  {
    id: '4',
    title: 'Youth Ministry Special',
    date: new Date(2024, 3, 28),
    thumbnailUrl: '/placeholder.svg?height=90&width=160',
    youtubeId: 'VIDEO_ID_4',
  },
  // Add more upcoming videos as needed
]

export default function ChurchServicePlayer() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div id='livestream' className="container mx-auto px-4 py-4">
      <h1 className="text-5xl font-bold leading-snug tracking-widest text-white my-10 text-center">Church Service Live Stream</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo ? selectedVideo.youtubeId : liveVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="text-xl text-white font-semibold mt-4">
            {selectedVideo ? selectedVideo.title : 'Live Service'}
          </h2>
          <p className="text-primary200 flex items-start justify-start ">
           <Dot className="text-red-600 w-10 "/> {selectedVideo
              ? `Aired on ${format(selectedVideo?.date, 'MMMM d, yyyy')}`
              : 'Streaming live now'}
          </p>
        </motion.div>
        <motion.div 
          className={`lg:w-80 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Other Services</h3>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              {sidebarOpen ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
          <Tabs defaultValue="previous" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="previous">Previous</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="previous">
              <ScrollArea className="h-[400px]">
                {previousVideos.map((video) => (
                  <VideoItem key={video.id} video={video} onSelect={handleVideoSelect} />
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="upcoming">
              <ScrollArea className="h-[400px]">
                {upcomingVideos.map((video) => (
                  <VideoItem key={video.id} video={video} onSelect={handleVideoSelect} />
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>

  )
}

function VideoItem({ video, onSelect }: { video: Video; onSelect: (video: Video) => void }) {
  return (
    <motion.div 
      className="flex items-start space-x-4 mb-4 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(video)}
    >
      <img src={video.thumbnailUrl} alt={video.title} className="w-20 h-12 object-cover rounded" />
      <div>
        <h4 className="font-medium line-clamp-2 text-white">{video.title}</h4>
        <p className="text-sm text-primary200">{format(video.date, 'MMM d, yyyy')}</p>
      </div>
    </motion.div>
  )
}