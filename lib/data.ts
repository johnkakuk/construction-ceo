export interface EpisodeImage {
  url: string
  alt?: string
}

export interface Episode {
  slug: string
  title: string
  guestName?: string
  guestTitle?: string
  guestCompany?: string
  guestCtaText?: string
  guestCtaUrl?: string
  summary?: string
  keyTakeaways?: string[]
  publishedAt?: string
  duration?: string
  youtubeId?: string
  audioUrl?: string
  featuredImage?: EpisodeImage
  relatedSlugs?: string[]
  transcript?: string
  seoTitle?: string
  seoDescription?: string
}

export const episodes: Episode[] = [
  {
    slug: 'how-a-contractor-scaled-to-500m',
    title: 'How a Contractor Scaled to $500M Without Losing the Culture',
    guestName: 'Marcus Whitfield',
    guestTitle: 'CEO',
    guestCompany: 'Whitfield Construction Group',
    summary:
      'Marcus Whitfield built his commercial contracting firm from a two-truck operation to a $500M regional powerhouse over 22 years. In this conversation, he breaks down the exact inflection points where growth became dangerous, how he restructured leadership to scale without him, and why the culture decisions he made at $50M determined everything that came after.',
    keyTakeaways: [
      'The $50M threshold is where most contractors either systematize or stall permanently.',
      'Hiring a COO before you feel ready is the single highest-leverage decision in scaling.',
      'Culture isn\'t a values poster — it\'s who you promote and who you fire.',
      'Bonding capacity forced Marcus to think like a CFO before he was ready to.',
      'Client relationships at the executive level are a moat that competitors can\'t easily copy.',
    ],
    publishedAt: '2026-05-28',
    duration: '1h 12m',
    youtubeId: 'dQw4w9WgXcQ',
    relatedSlugs: ['hiring-and-culture-in-commercial-construction', 'the-future-of-industrial-construction'],
    transcript: `Jonathan: Marcus, you started with two trucks and a $200K line of credit. At what point did you realize you were building something that needed real infrastructure?\n\nMarcus: Honestly, it was when I missed my son's birthday because I was the only person who knew how to deal with a superintendent crisis in Memphis. We had 40 guys on site and I was the single point of failure. That was a Thursday. By Monday I had started writing the first version of what became our ops manual.\n\nJonathan: That's the founder bottleneck. Everyone hits it, but not everyone recognizes it for what it is.\n\nMarcus: Most guys just hire another project manager and call it delegation. That's not delegation. That's just distributed chaos. Real delegation means the decision gets made the same way whether I'm there or not.\n\n[Full transcript continues...]`,
  },
  {
    slug: 'leadership-lessons-from-a-billion-dollar-builder',
    title: 'Leadership Lessons from a Billion-Dollar Builder',
    guestName: 'Sandra Reyes',
    guestTitle: 'President & CEO',
    guestCompany: 'Reyes Industrial Partners',
    summary:
      'Sandra Reyes leads one of the largest woman-owned industrial construction firms in the country. She discusses how she built credibility in a male-dominated industry, the strategic bets that got her to $1B in revenue, and what she wishes she had known earlier about board governance and capital structure.',
    keyTakeaways: [
      'Credibility in construction is earned project by project — there are no shortcuts.',
      'Having a board with real accountability changed how Sandra made decisions.',
      'Industrial and commercial construction require completely different risk models.',
      'The best general managers Sandra ever hired came from the military.',
      'Knowing your numbers at the project level is table stakes — knowing them at the portfolio level is the job.',
    ],
    publishedAt: '2026-05-14',
    duration: '58m',
    youtubeId: 'dQw4w9WgXcQ',
    relatedSlugs: ['how-a-contractor-scaled-to-500m', 'the-future-of-industrial-construction'],
    transcript: `Jonathan: You were the only woman in many rooms for a long time. How did you navigate that without it becoming the story?\n\nSandra: I made the work the story. Every single time. If someone wanted to talk about being a woman in construction, I redirected to the project, to the numbers, to the plan. Eventually people stopped asking because they were too busy paying attention to results.\n\n[Full transcript continues...]`,
  },
  {
    slug: 'hiring-and-culture-in-commercial-construction',
    title: 'Hiring Operators, Not Order-Takers: Building a Team That Runs Itself',
    guestName: 'Derek Callahan',
    guestTitle: 'Founder & Chairman',
    guestCompany: 'Callahan Commercial Builders',
    summary:
      'Derek Callahan spent 30 years learning the wrong way to hire before cracking the code on what separates operators from order-takers. In this episode, he shares the interview frameworks, compensation structures, and cultural signals that transformed his firm from a personality-driven business into one that runs without him.',
    keyTakeaways: [
      'Stop hiring for experience. Hire for judgment. Experience can be taught; judgment is rare.',
      'Your compensation structure is your culture. If you reward hours, people work hours.',
      'The best hiring question Derek ever found: "Tell me about a decision you made that your boss didn\'t know about."',
      'Reference checks are only useful if you call people who weren\'t on the list.',
      'Onboarding is where culture is transmitted — most firms treat it like paperwork.',
    ],
    publishedAt: '2026-04-30',
    duration: '1h 4m',
    youtubeId: 'dQw4w9WgXcQ',
    relatedSlugs: ['how-a-contractor-scaled-to-500m', 'leadership-lessons-from-a-billion-dollar-builder'],
    transcript: `Jonathan: Derek, you've said hiring was your biggest mistake for the first decade. What does that actually mean?\n\nDerek: It means I hired people who were good at the interview. Which turns out to be a completely different skill than being good at the job. I was basically running a performance assessment for a job that doesn't exist.\n\n[Full transcript continues...]`,
  },
  {
    slug: 'the-future-of-industrial-construction',
    title: 'Data Centers, Reshoring, and the $2 Trillion Industrial Buildout',
    guestName: 'James Thornton',
    guestTitle: 'Managing Director',
    guestCompany: 'Thornton Capital Group',
    summary:
      'James Thornton has deployed capital into industrial construction across three market cycles. He explains why the current reshoring wave is structurally different from past booms, what it means for general contractors, and how smart operators are positioning themselves for a decade of demand.',
    keyTakeaways: [
      'Data center construction is the most specialized and highest-margin work available to industrial contractors right now.',
      'Reshoring is not a trend — it\'s a policy-driven structural shift that will outlast multiple administrations.',
      'The labor shortage is the binding constraint, not demand. Firms that solve labor win.',
      'Most GCs are underpricing complexity on mission-critical projects.',
      'The contractors who thrive in the next decade will be those who built owner relationships before the boom.',
    ],
    publishedAt: '2026-04-16',
    duration: '1h 18m',
    youtubeId: 'dQw4w9WgXcQ',
    relatedSlugs: ['leadership-lessons-from-a-billion-dollar-builder', 'hiring-and-culture-in-commercial-construction'],
    transcript: `Jonathan: James, you've been through the 2008 collapse, the infrastructure wave, COVID disruption. How does what's happening now compare?\n\nJames: It's categorically different. Every prior cycle was demand-driven with policy as a headwind or tailwind. This one is policy-driven at a structural level. The CHIPS Act, the IRA, reshoring incentives — these aren't stimulus. They're industrial policy. That's a different kind of floor under demand.\n\n[Full transcript continues...]`,
  },
]

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug)
}

export function getRelatedEpisodes(slugs: string[] = [], currentSlug?: string): Episode[] {
  const curated = slugs.map((s) => episodes.find((e) => e.slug === s)).filter(Boolean) as Episode[]
  if (curated.length > 0) return curated

  return shuffleEpisodes(episodes.filter((episode) => episode.slug !== currentSlug)).slice(0, 3)
}

function shuffleEpisodes(items: Episode[]) {
  return [...items].sort(() => Math.random() - 0.5)
}
