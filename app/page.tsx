export const revalidate = 60

import { getAllEpisodes } from '@/lib/queries'
import HomeClient from './HomeClient'

export default async function Home() {
  const episodes = await getAllEpisodes()
  return <HomeClient episodes={episodes} />
}
