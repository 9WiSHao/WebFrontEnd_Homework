/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _year = new WeakMap();
var _month = new WeakMap();
var _date = new WeakMap();
var _dateString = new WeakMap();
var _inint = new WeakMap();
var _buttonAdd = new WeakMap();
var _setDate = new WeakMap();
var _getDateString = new WeakMap();
var _renderDates = new WeakMap();
var _getLastMonthInfo = new WeakMap();
var _getNextMonthInfo = new WeakMap();
var _getDayCount = new WeakMap();
var _getDayOfFirstDate = new WeakMap();
var Calendar = _createClass(function Calendar(_defaultDate) {
  var _this = this;
  _classCallCheck(this, Calendar);
  _classPrivateFieldInitSpec(this, _year, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _month, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _date, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _dateString, {
    writable: true,
    value: void 0
  });
  _classPrivateFieldInitSpec(this, _inint, {
    writable: true,
    value: function value() {
      var defaultYear = _this.defaultDate.getFullYear();
      var defaultMonth = _this.defaultDate.getMonth() + 1;
      var defaultDate = _this.defaultDate.getDate();
      _classPrivateFieldGet(_this, _setDate).call(_this, defaultYear, defaultMonth, defaultDate);
      _classPrivateFieldGet(_this, _buttonAdd).call(_this);
    }
  });
  _classPrivateFieldInitSpec(this, _buttonAdd, {
    writable: true,
    value: function value() {
      var lastYearButton = _this.calendarBody.querySelector('.lastYear');
      var lastMonthButton = _this.calendarBody.querySelector('.lastMonth');
      var nextMonthButton = _this.calendarBody.querySelector('.nextMonth');
      var nextYearButton = _this.calendarBody.querySelector('.nextYear');
      lastYearButton.addEventListener('click', function () {
        var _this$year, _this$year2;
        _classPrivateFieldSet(_this, _year, (_this$year = _classPrivateFieldGet(_this, _year), _this$year2 = _this$year--, _this$year)), _this$year2;
        _classPrivateFieldGet(_this, _setDate).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month));
      });
      lastMonthButton.addEventListener('click', function () {
        if (_classPrivateFieldGet(_this, _month) === 1) {
          var _this$year3, _this$year4;
          _classPrivateFieldSet(_this, _year, (_this$year3 = _classPrivateFieldGet(_this, _year), _this$year4 = _this$year3--, _this$year3)), _this$year4;
          _classPrivateFieldSet(_this, _month, 12);
        } else {
          var _this$month, _this$month2;
          _classPrivateFieldSet(_this, _month, (_this$month = _classPrivateFieldGet(_this, _month), _this$month2 = _this$month--, _this$month)), _this$month2;
        }
        _classPrivateFieldGet(_this, _setDate).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month));
      });
      nextMonthButton.addEventListener('click', function () {
        if (_classPrivateFieldGet(_this, _month) === 12) {
          var _this$year5, _this$year6;
          _classPrivateFieldSet(_this, _year, (_this$year5 = _classPrivateFieldGet(_this, _year), _this$year6 = _this$year5++, _this$year5)), _this$year6;
          _classPrivateFieldSet(_this, _month, 1);
        } else {
          var _this$month3, _this$month4;
          _classPrivateFieldSet(_this, _month, (_this$month3 = _classPrivateFieldGet(_this, _month), _this$month4 = _this$month3++, _this$month3)), _this$month4;
        }
        _classPrivateFieldGet(_this, _setDate).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month));
      });
      nextYearButton.addEventListener('click', function () {
        var _this$year7, _this$year8;
        _classPrivateFieldSet(_this, _year, (_this$year7 = _classPrivateFieldGet(_this, _year), _this$year8 = _this$year7++, _this$year7)), _this$year8;
        _classPrivateFieldGet(_this, _setDate).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month));
      });
      _this.calendarBody.addEventListener('click', function (element) {
        if (element.target.classList.contains('date')) {
          _classPrivateFieldSet(_this, _dateString, element.target.title);
          var dateEles = _this.calendarBody.querySelectorAll('.date');
          var _iterator = _createForOfIteratorHelper(dateEles),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _element = _step.value;
              _element.classList.toggle('selected', _element.title === _classPrivateFieldGet(_this, _dateString));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var currentDateEle = _this.calendarBody.querySelector('.currentDay');
          currentDateEle.textContent = _classPrivateFieldGet(_this, _dateString);
        }
      });
    }
  });
  _classPrivateFieldInitSpec(this, _setDate, {
    writable: true,
    value: function value(year, month, date) {
      _classPrivateFieldSet(_this, _year, year);
      _classPrivateFieldSet(_this, _month, month);
      _classPrivateFieldSet(_this, _date, date);
      var currentDateEle = _this.calendarBody.querySelector('.currentDay');
      _classPrivateFieldSet(_this, _dateString, _classPrivateFieldGet(_this, _getDateString).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month), _classPrivateFieldGet(_this, _date)));
      currentDateEle.textContent = _classPrivateFieldGet(_this, _dateString);
      _classPrivateFieldGet(_this, _renderDates).call(_this);
    }
  });
  _classPrivateFieldInitSpec(this, _getDateString, {
    writable: true,
    value: function value(year, month, date) {
      if (date) {
        return "".concat(year, "-").concat(month, "-").concat(date);
      } else {
        return "".concat(year, "-").concat(month);
      }
    }
  });
  _classPrivateFieldInitSpec(this, _renderDates, {
    writable: true,
    value: function value() {
      var datesEle = _this.calendarBody.querySelector('.dates');
      datesEle.innerHTML = '';
      var dayCountInCurrentMonth = _classPrivateFieldGet(_this, _getDayCount).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month));
      var firstDayInCurrentMonth = _classPrivateFieldGet(_this, _getDayOfFirstDate).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month));
      var _classPrivateFieldGet2 = _classPrivateFieldGet(_this, _getLastMonthInfo).call(_this),
        lastMonth = _classPrivateFieldGet2.lastMonth,
        yearOfLastMonth = _classPrivateFieldGet2.yearOfLastMonth,
        dayCountInLastMonth = _classPrivateFieldGet2.dayCountInLastMonth;
      var _classPrivateFieldGet3 = _classPrivateFieldGet(_this, _getNextMonthInfo).call(_this),
        nextMonth = _classPrivateFieldGet3.nextMonth,
        yearOfNextMonth = _classPrivateFieldGet3.yearOfNextMonth,
        dayCountInNextMonth = _classPrivateFieldGet3.dayCountInNextMonth;
      for (var i = 1; i <= 42; i++) {
        var date = void 0;
        var dateString = void 0;
        var classCurrentMonth = "";
        if (i < firstDayInCurrentMonth) {
          date = dayCountInLastMonth - firstDayInCurrentMonth + 1 + i;
          dateString = _classPrivateFieldGet(_this, _getDateString).call(_this, yearOfLastMonth, lastMonth, date);
        } else if (i >= firstDayInCurrentMonth + dayCountInCurrentMonth) {
          date = i - firstDayInCurrentMonth - dayCountInCurrentMonth + 1;
          dateString = _classPrivateFieldGet(_this, _getDateString).call(_this, yearOfNextMonth, nextMonth, date);
        } else {
          date = i - firstDayInCurrentMonth + 1;
          dateString = _classPrivateFieldGet(_this, _getDateString).call(_this, _classPrivateFieldGet(_this, _year), _classPrivateFieldGet(_this, _month), date);
          classCurrentMonth = 'currentMonth';
          if (date === _classPrivateFieldGet(_this, _date)) {
            classCurrentMonth = 'currentMonth selected';
          }
        }
        var insertDateHTML = "<button class=\"date ".concat(classCurrentMonth, "\" title=\"").concat(dateString, "\">").concat(date, "</button>");
        datesEle.insertAdjacentHTML('beforeend', insertDateHTML);
      }
    }
  });
  _classPrivateFieldInitSpec(this, _getLastMonthInfo, {
    writable: true,
    value: function value() {
      var lastMonth = _classPrivateFieldGet(_this, _month) - 1;
      var yearOfLastMonth = _classPrivateFieldGet(_this, _year);
      if (lastMonth === 0) {
        lastMonth = 12;
        yearOfLastMonth--;
      }
      var dayCountInLastMonth = _classPrivateFieldGet(_this, _getDayCount).call(_this, lastMonth, yearOfLastMonth);
      return {
        lastMonth: lastMonth,
        yearOfLastMonth: yearOfLastMonth,
        dayCountInLastMonth: dayCountInLastMonth
      };
    }
  });
  _classPrivateFieldInitSpec(this, _getNextMonthInfo, {
    writable: true,
    value: function value() {
      var nextMonth = _classPrivateFieldGet(_this, _month) + 1;
      var yearOfNextMonth = _classPrivateFieldGet(_this, _year);
      if (nextMonth === 13) {
        nextMonth = 1;
        yearOfNextMonth += 1;
      }
      var dayCountInNextMonth = _classPrivateFieldGet(_this, _getDayCount).call(_this, nextMonth, yearOfNextMonth);
      return {
        nextMonth: nextMonth,
        yearOfNextMonth: yearOfNextMonth,
        dayCountInNextMonth: dayCountInNextMonth
      };
    }
  });
  _classPrivateFieldInitSpec(this, _getDayCount, {
    writable: true,
    value: function value(year, month) {
      return new Date(year, month, 0).getDate();
    }
  });
  _classPrivateFieldInitSpec(this, _getDayOfFirstDate, {
    writable: true,
    value: function value(year, month) {
      var Dday = new Date(year, month - 1, 1).getDay();
      return Dday === 0 ? 7 : Dday;
    }
  });
  if (_defaultDate instanceof Date) {
    this.defaultDate = _defaultDate;
  } else {
    this.defaultDate = new Date();
  }
  this.calendarBody = document.querySelector('.calendar');
  _classPrivateFieldGet(this, _inint).call(this);
});
new Calendar(new Date('2022-11-22'));
/******/ })()
;