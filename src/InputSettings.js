const { tmpdir } = require('os')
const { TransFile } = require('./TransFile')

module.exports = class InputSettings {
  /**
   * @param {IInputSettings} inputSettings
   * @param {TransFile} inputFile
   */
  constructor(inputSettings, inputFile) {
    /** @property {string} outputDir Output directory */
    this.outputDir = inputSettings.outputDir || tmpdir()

    /** @property {string} [recursionSafeChar] Default is `@` character */
    this.recursionSafeChar = inputSettings.recursionSafeChar || '@'

    /** @property {Array<ITransformation>} transformations */
    this.transformations = inputSettings.transformations || []

    if (this.transformations.length === 0) {
      throw new Error('no transformations defined')
    }

    this.transformations = this.transformations.map((transformation, index) => {
      const { options } = transformation

      if (typeof options !== 'object') {
        throw new Error(`options is undefined in transformation ${index}`)
      }

      const { width, height } = options
      if (width === undefined && height === undefined) {
        throw new Error(`option width or height is mandatory in transformation ${index}`)
      }

      if (transformation.formats === undefined) {
        throw new Error(`you have to defined at least one format in transformation ${index}`)
      }

      if (transformation.formats.original !== undefined) {
        transformation.formats[inputFile.extension] = transformation.formats.original
        delete transformation.formats.original
      }

      if (Object.keys(transformation.formats).length === 0) {
        throw new Error(`you have to defined at least one format in transformation ${index}`)
      }

      return transformation
    })
  }
}
