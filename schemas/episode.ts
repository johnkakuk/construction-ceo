import React from 'react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { AudioUploadInput } from './components/AudioUploadInput'

export const episode = defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'guestName', title: 'Guest Name', type: 'string' }),
    defineField({ name: 'guestTitle', title: 'Guest Title', type: 'string' }),
    defineField({ name: 'guestCompany', title: 'Guest Company', type: 'string' }),
    defineField({ name: 'guestCtaText', title: 'Guest CTA Label', type: 'string', description: 'Button label on the guest card, e.g. "Follow on LinkedIn". Defaults to "Browse all episodes".' }),
    defineField({ name: 'guestCtaUrl', title: 'Guest CTA Link', type: 'url', description: 'Where the guest CTA button links — social profile, company website, etc.' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', placeholder: '1h 12m' }),
    defineField({ name: 'youtubeId', title: 'YouTube Video ID', type: 'string' }),
    defineField({
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'Paste a URL or upload an audio file directly. Large files stream straight to Sanity — no size limit.',
      components: { input: AudioUploadInput as React.ComponentType<Parameters<typeof AudioUploadInput>[0]> },
    }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'transcript', title: 'Transcript', type: 'text', rows: 20 }),
    defineField({
      name: 'relatedEpisodes',
      title: 'Related Episodes',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'episode' }] })],
      description: 'Up to 3 episodes. If left blank, 3 will be selected randomly.',
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', description: 'Defaults to the episode title if left blank.' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo', description: 'Defaults to the episode summary if left blank.' }),
  ],
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'guestName', media: 'featuredImage' },
  },
})
