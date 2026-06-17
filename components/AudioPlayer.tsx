'use client'

import H5AudioPlayer from 'react-h5-audio-player'

type AudioPlayerProps = {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  return (
    <H5AudioPlayer
      src={src}
      className="cc-audio-player"
      showJumpControls={false}
      customAdditionalControls={[]}
      customVolumeControls={[]}
    />
  )
}
