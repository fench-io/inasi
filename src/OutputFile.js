const { TransFile } = require('./TransFile')

module.exports = class OutputFile {
  /**
   *
   * @param {string} format
   * @param {number} width
   * @param {number} height
   * @param {number} size
   * @param {TransFile} file
   */
  constructor(format, width, height, size, file) {
    this.format = format
    this.width = width
    this.height = height
    this.size = size
    this.file = file
  }
}
