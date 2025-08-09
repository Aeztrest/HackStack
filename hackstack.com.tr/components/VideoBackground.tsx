"use client"

export default function VideoBackground() {
  return (
    <video
      className="absolute w-full h-full object-cover"
      src="/BG-1920-1080.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  )
}
