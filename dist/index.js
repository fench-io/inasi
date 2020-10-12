"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sharp = _interopRequireDefault(require("sharp"));

var _InputSettings = require("./InputSettings");

var _OutputFile = require("./OutputFile");

var _TransFile = require("./TransFile");

/**
 * @typedef {import("./interfaces/IInputSettings")}
 */
var INASI = {
  /**
   * @private
   * @param {string} imagePath
   * @param {sharp.JpegOptions|sharp.PngOptions|sharp.WebpOptions} options
   *
   * @throws {Error}
   * @returns {sharp.Sharp} A sharp instance that can be used to chain operations
   */
  _resize: function _resize(imagePath, options) {
    return (0, _sharp["default"])(imagePath).resize(options);
  },

  /**
   * @private
   * @param {sharp.Sharp} sharpInstance
   * @param {string} imageOutputPath
   *
   * @throws {Error}
   * @returns {Promise<sharp.OutputInfo>}
   */
  _save: function () {
    var _save2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(sharpInstance, imageOutputPath) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", sharpInstance.toFile(imageOutputPath));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function _save(_x, _x2) {
      return _save2.apply(this, arguments);
    }

    return _save;
  }(),

  /**
   * @param {TransFile} inputFile
   * @param {TransFile} outputFile
   * @param {sharp.JpegOptions|sharp.PngOptions|sharp.WebpOptions} options
   * @param {string} format
   *
   * @returns OutputFile
   */
  _transform: function () {
    var _transform2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(inputFile, outputFile, options, format) {
      var sharpInstance, out;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sharpInstance = INASI._resize(inputFile.absPath(), options);
              sharpInstance.toFormat(format);
              _context2.next = 4;
              return INASI._save(sharpInstance, outputFile.absPath());

            case 4:
              out = _context2.sent;
              return _context2.abrupt("return", new _OutputFile.OutputFile(out.format, out.width, out.height, out.size, outputFile));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function _transform(_x3, _x4, _x5, _x6) {
      return _transform2.apply(this, arguments);
    }

    return _transform;
  }(),

  /**
   *
   * @param {string} originalImagePath Absulute path to the image you want to transform
   * @param {IInputSettings} inputSettings
   *
   * @throws {Error}
   * @returns {Promise<Array<OutputFile>>}
   */
  transform: function () {
    var _transform3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(originalImagePath, inputSettings) {
      var inputFile, settings, transOutputPromises, transformations, outputFiles;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              inputFile = new _TransFile.TransFile(originalImagePath);
              settings = new _InputSettings.InputSettings(inputSettings, inputFile);
              transOutputPromises = settings.transformations.map(function (transformation) {
                var options = transformation.options,
                    formats = transformation.formats;
                var filePostfix = '0';

                if (options.width && options.height) {
                  filePostfix = "w".concat(options.width, "h").concat(options.height);
                } else if (options.width || options.height) {
                  filePostfix = options.width ? "w".concat(options.width) : "h".concat(options.height);
                }

                if (settings.recursionSafeChar) {
                  filePostfix = "".concat(settings.recursionSafeChar).concat(filePostfix);
                }

                var outputFormatsPromises = Object.keys(formats).map(function (format) {
                  var outputFile = inputFile.toNewFile(settings.outputDir, filePostfix, format);
                  return INASI._transform(inputFile, outputFile, options, format);
                });
                return Promise.all(outputFormatsPromises);
              });
              _context3.next = 5;
              return Promise.all(transOutputPromises);

            case 5:
              transformations = _context3.sent;
              outputFiles = [];
              transformations.forEach(function (transformation) {
                transformation.forEach(function (outputFile) {
                  outputFiles.push(outputFile);
                });
              });
              return _context3.abrupt("return", outputFiles);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function transform(_x7, _x8) {
      return _transform3.apply(this, arguments);
    }

    return transform;
  }()
};
var transform = INASI.transform;
exports.transform = transform;