export default class MaxCheckInsError extends Error {
  constructor() {
    super('Max checkins reached.')
  }
}
