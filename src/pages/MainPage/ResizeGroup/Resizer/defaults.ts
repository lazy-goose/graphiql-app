export default {
  thickness: 2,
  padding: 5,
  get size() {
    return this.thickness + this.padding
  },
  activeClassName: 'active',
}
