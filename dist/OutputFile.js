"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutputFile = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _TransFile = require("./TransFile");

var OutputFile =
/**
 *
 * @param {string} format
 * @param {number} width
 * @param {number} height
 * @param {number} size
 * @param {TransFile} file
 */
function OutputFile(format, width, height, size, file) {
  (0, _classCallCheck2["default"])(this, OutputFile);
  this.format = format;
  this.width = width;
  this.height = height;
  this.size = size;
  this.file = file;
};

exports.OutputFile = OutputFile;