export default class UserExistsError extends Error {
  constructor() {
    super('User already exists.')
  }
}
