import { join, parse, ParsedPath } from 'path'

export class TransFile {
  constructor(absoluteFilePath) {
    /**
     * @type {ParsedPath}
     */
    this.parsedPath = parse(absoluteFilePath)
  }

  get ext() {
    return this.parsedPath.ext
  }

  get extension() {
    return this.parsedPath.ext.replace('.', '')
  }

  absPath() {
    return `${this.parsedPath.dir}/${this.parsedPath.base}`
  }

  toNewFile(outputDir, postfix = '', extension) {
    if (extension === undefined) {
      extension = this.parsedPath.ext
    }

    if (extension.indexOf('.') === -1) {
      extension = `.${extension}`
    }

    return new TransFile(join(outputDir, `${this.parsedPath.name}${postfix}${extension}`))
  }
}
