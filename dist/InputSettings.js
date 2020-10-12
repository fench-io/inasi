"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettings = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _os = require("os");

var _TransFile = require("./TransFile");

var InputSettings =
/**
 * @param {IInputSettings} inputSettings
 * @param {TransFile} inputFile
 */
function InputSettings(inputSettings, inputFile) {
  (0, _classCallCheck2["default"])(this, InputSettings);

  /** @property {string} outputDir Output directory */
  this.outputDir = inputSettings.outputDir || (0, _os.tmpdir)();
  /** @property {string} [recursionSafeChar] Default is `@` character */

  this.recursionSafeChar = inputSettings.recursionSafeChar || '@';
  /** @property {Array<ITransformation>} transformations */

  this.transformations = inputSettings.transformations || [];

  if (this.transformations.length === 0) {
    throw new Error('no transformations defined');
  }

  this.transformations = this.transformations.map(function (transformation, index) {
    var options = transformation.options;

    if ((0, _typeof2["default"])(options) !== 'object') {
      throw new Error("options is undefined in transformation ".concat(index));
    }

    var width = options.width,
        height = options.height;

    if (width === undefined && height === undefined) {
      throw new Error("option width or height is mandatory in transformation ".concat(index));
    }

    if (transformation.formats === undefined) {
      throw new Error("you have to defined at least one format in transformation ".concat(index));
    }

    if (transformation.formats.original !== undefined) {
      transformation.formats[inputFile.extension] = transformation.formats.original;
      delete transformation.formats.original;
    }

    if (Object.keys(transformation.formats).length === 0) {
      throw new Error("you have to defined at least one format in transformation ".concat(index));
    }

    return transformation;
  });
};

exports.InputSettings = InputSettings;