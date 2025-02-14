import z from './zod'

export const federalUnitSchema = z.object({
	abbreviation: z.string(),
	name: z.string(),
})

export type FederalUnit = z.output<typeof federalUnitSchema>

export const citySchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
	federalUnit: federalUnitSchema,
})

export type City = z.output<typeof citySchema>

export const LocationTypeSchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
})

export type LocationType = z.output<typeof LocationTypeSchema>

export const LocationSchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
	locationType: LocationTypeSchema,
})

export type Location = z.output<typeof LocationSchema>

export const NeighborhoodSchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
})

export type Neighborhood = z.output<typeof NeighborhoodSchema>

export const AddressSchema = z.object({
	id: z.number().int().positive(),
	zipCode: z.string(),
	neighborhood: NeighborhoodSchema,
	location: LocationSchema,
	city: citySchema,
})

export type Address = z.output<typeof AddressSchema>
