export { metadata, viewport } from 'next-sanity/studio'
import StudioClient from './studio-client'

export default function StudioPage() {
  return (
    <div className="studio-route">
      <StudioClient />
    </div>
  )
}
