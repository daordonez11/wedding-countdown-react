'use client'

import { useState, useEffect } from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function calculateTimeLeft() {
    const difference = +new Date('2026-02-21T22:00:00Z') - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const timerComponents = Object.keys(timeLeft).map(interval => {
    if (!timeLeft[interval]) {
      return null
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-bold">{timeLeft[interval]}</span>
        <span className="text-xl md:text-2xl">{interval}</span>
      </div>
    )
  })

  return (
    <main 
      className={`flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center ${playfair.className}`}
      style={{backgroundImage: "url('https://wedding-page-assets.s3.us-east-1.amazonaws.com/images/IMG_1633.jpg')"}}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">Nuestra Boda</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white" aria-live="polite">
          {timerComponents.length ? timerComponents : <span className="text-4xl md:text-6xl font-bold col-span-4">¡Es hora!</span>}
        </div>
        <p className="mt-8 text-xl md:text-2xl text-white">21 de febrero de 2026 a las 17:00</p>
      </div>
    </main>
  )
}

