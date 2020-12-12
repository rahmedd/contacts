export type PhoneNumber = {
	number: string
	label?: string | null
}

export type EmailAddress = {
	email: string
}

export type Address = {
	addressOne: string | null
	addressTwo: string | null
	city: string | null
	state: string | null
	zipcode: string | null
	label: string | null
}

export type BasicId = {
	id: number
}