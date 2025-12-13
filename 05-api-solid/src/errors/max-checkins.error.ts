export default class MaxCheckinsError extends Error {
  constructor() {
    super('Max checkins reached.')
  }
}
