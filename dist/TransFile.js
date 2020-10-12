"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransFile = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _path = require("path");

var TransFile = /*#__PURE__*/function () {
  function TransFile(absoluteFilePath) {
    (0, _classCallCheck2["default"])(this, TransFile);

    /**
     * @type {ParsedPath}
     */
    this.parsedPath = (0, _path.parse)(absoluteFilePath);
  }

  (0, _createClass2["default"])(TransFile, [{
    key: "absPath",
    value: function absPath() {
      return "".concat(this.parsedPath.dir, "/").concat(this.parsedPath.base);
    }
  }, {
    key: "toNewFile",
    value: function toNewFile(outputDir) {
      var postfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var extension = arguments.length > 2 ? arguments[2] : undefined;

      if (extension === undefined) {
        extension = this.parsedPath.ext;
      }

      if (extension.indexOf('.') === -1) {
        extension = ".".concat(extension);
      }

      return new TransFile((0, _path.join)(outputDir, "".concat(this.parsedPath.name).concat(postfix).concat(extension)));
    }
  }, {
    key: "ext",
    get: function get() {
      return this.parsedPath.ext;
    }
  }, {
    key: "extension",
    get: function get() {
      return this.parsedPath.ext.replace('.', '');
    }
  }]);
  return TransFile;
}();

exports.TransFile = TransFile;