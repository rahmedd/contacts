import {PhoneNumber, EmailAddress} from './ContactFields'

export type CreateContact = {
	firstName?: string | null
	lastName?: string | null
	photo?: any | null
	number?: Array<PhoneNumber> | null
	email?: Array<EmailAddress> | null
	users?: number | null
}