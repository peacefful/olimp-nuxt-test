export class Request {
	constructor(api) {
		this.api = api
	}

	async getUsers(numberPage = 1) {
		return await $fetch(`${this.api}/records?page=${n}`)
	}
}