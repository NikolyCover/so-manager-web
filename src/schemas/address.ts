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

export const locationTypeSchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
})

export type LocationType = z.output<typeof locationTypeSchema>

export const locationSchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
	locationType: locationTypeSchema,
})

export type Location = z.output<typeof locationSchema>

export const neighborhoodSchema = z.object({
	id: z.number().int().positive(),
	name: z.string(),
})

export type Neighborhood = z.output<typeof neighborhoodSchema>

export const addressSchema = z.object({
	id: z.number().int().positive(),
	zipCode: z.string(),
	neighborhood: neighborhoodSchema,
	location: locationSchema,
	city: citySchema,
})

// export const addressFormSchema = addressSchema.omit({ id: true })

export const addressFormSchema = z.object({
	zipCode: z.string(),
	neighborhoodId: z.number(),
	locationId: z.number(),
	cityId: z.number(),
})

export type AddressForm = z.output<typeof addressFormSchema>

export type Address = z.output<typeof addressSchema>
