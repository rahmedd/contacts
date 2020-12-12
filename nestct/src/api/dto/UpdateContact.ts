import {PhoneNumber, EmailAddress, BasicId} from './ContactFields'

export class UpdateEmail {
	data: EmailAddress
	where: BasicId
	constructor(userReq: BasicId & EmailAddress) {
		this.data = {
			email: userReq.email
		}
		
		this.where = {
			id: userReq.id
		}
	}
}

export class UpdateNumber {
	data: PhoneNumber
	where: BasicId
	constructor(userReq: BasicId & PhoneNumber) {
		this.data = {
			number: userReq.number,
			label: userReq.label
		}
		
		this.where = {
			id: userReq.id
		}
	}
}

export class CreateNumber {
	number: string
	label: string
	constructor(userReq: BasicId & PhoneNumber) {
		this.number = userReq.number
		this.label = userReq.label
	}
}

export class CreateEmail {
	email: string
	constructor(userReq: BasicId & EmailAddress) {
		this.email = userReq.email
	}
}