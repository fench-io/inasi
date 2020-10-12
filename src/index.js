import sharp from 'sharp'

import { InputSettings } from './InputSettings'
import { OutputFile } from './OutputFile'
import { TransFile } from './TransFile'

/**
 * @typedef {import("./interfaces/IInputSettings")}
 */

const INASI = {
  /**
   * @private
   * @param {string} imagePath
   * @param {sharp.JpegOptions|sharp.PngOptions|sharp.WebpOptions} options
   *
   * @throws {Error}
   * @returns {sharp.Sharp} A sharp instance that can be used to chain operations
   */
  _resize: (imagePath, options) => {
    return sharp(imagePath).resize(options)
  },

  /**
   * @private
   * @param {sharp.Sharp} sharpInstance
   * @param {string} imageOutputPath
   *
   * @throws {Error}
   * @returns {Promise<sharp.OutputInfo>}
   */
  _save: async (sharpInstance, imageOutputPath) => {
    return sharpInstance.toFile(imageOutputPath)
  },

  /**
   * @param {TransFile} inputFile
   * @param {TransFile} outputFile
   * @param {sharp.JpegOptions|sharp.PngOptions|sharp.WebpOptions} options
   * @param {string} format
   *
   * @returns OutputFile
   */
  _transform: async (inputFile, outputFile, options, format) => {
    let sharpInstance = INASI._resize(inputFile.absPath(), options)

    sharpInstance.toFormat(format)

    const out = await INASI._save(sharpInstance, outputFile.absPath())

    return new OutputFile(out.format, out.width, out.height, out.size, outputFile)
  },

  /**
   *
   * @param {string} originalImagePath Absulute path to the image you want to transform
   * @param {IInputSettings} inputSettings
   *
   * @throws {Error}
   * @returns {Promise<Array<OutputFile>>}
   */
  transform: async (originalImagePath, inputSettings) => {
    const inputFile = new TransFile(originalImagePath)
    const settings = new InputSettings(inputSettings, inputFile)

    const transOutputPromises = settings.transformations.map((transformation) => {
      const { options, formats } = transformation

      let filePostfix = '0'
      if (options.width && options.height) {
        filePostfix = `w${options.width}h${options.height}`
      } else if (options.width || options.height) {
        filePostfix = options.width ? `w${options.width}` : `h${options.height}`
      }

      if (settings.recursionSafeChar) {
        filePostfix = `${settings.recursionSafeChar}${filePostfix}`
      }

      const outputFormatsPromises = Object.keys(formats).map((format) => {
        const outputFile = inputFile.toNewFile(settings.outputDir, filePostfix, format)
        return INASI._transform(inputFile, outputFile, options, format)
      })

      return Promise.all(outputFormatsPromises)
    })

    const transformations = await Promise.all(transOutputPromises)

    let outputFiles = []
    transformations.forEach((transformation) => {
      transformation.forEach((outputFile) => {
        outputFiles.push(outputFile)
      })
    })

    return outputFiles
  },
}

export const { transform } = INASI
