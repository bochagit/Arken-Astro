import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const games = defineCollection({
	loader: glob({ base: './src/content/games', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		banner: z.string(),
		box: z.string(),
		players: z.string(),
		duration: z.string(),
		age: z.string(),
		gallery: z.array(z.string()).optional(),
		relatedGames: z.array(z.string()).optional(),
		buyUrl: z.string().optional()
	})
})

export const collections = { games }
