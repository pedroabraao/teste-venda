function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * jquery.mask.js
 * @version: v1.14.15
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at github.com/igorescobar/jQuery-Mask-Plugin
 *
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery || Zepto);
  }
})(function ($) {
  'use strict';

  var Mask = function Mask(el, mask, options) {
    var p = {
      invalid: [],
      getCaret: function getCaret() {
        try {
          var sel,
            pos = 0,
            ctrl = el.get(0),
            dSel = document.selection,
            cSelStart = ctrl.selectionStart;

          // IE Support
          if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
            sel = dSel.createRange();
            sel.moveStart('character', -p.val().length);
            pos = sel.text.length;
          }
          // Firefox support
          else if (cSelStart || cSelStart === '0') {
            pos = cSelStart;
          }
          return pos;
        } catch (e) {}
      },
      setCaret: function setCaret(pos) {
        try {
          if (el.is(':focus')) {
            var range,
              ctrl = el.get(0);

            // Firefox, WebKit, etc..
            if (ctrl.setSelectionRange) {
              ctrl.setSelectionRange(pos, pos);
            } else {
              // IE
              range = ctrl.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          }
        } catch (e) {}
      },
      events: function events() {
        el.on('keydown.mask', function (e) {
          el.data('mask-keycode', e.keyCode || e.which);
          el.data('mask-previus-value', el.val());
          el.data('mask-previus-caret-pos', p.getCaret());
          p.maskDigitPosMapOld = p.maskDigitPosMap;
        }).on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour).on('paste.mask drop.mask', function () {
          setTimeout(function () {
            el.keydown().keyup();
          }, 100);
        }).on('change.mask', function () {
          el.data('changed', true);
        }).on('blur.mask', function () {
          if (oldValue !== p.val() && !el.data('changed')) {
            el.trigger('change');
          }
          el.data('changed', false);
        })
        // it's very important that this callback remains in this position
        // otherwhise oldValue it's going to work buggy
        .on('blur.mask', function () {
          oldValue = p.val();
        })
        // select all text on focus
        .on('focus.mask', function (e) {
          if (options.selectOnFocus === true) {
            $(e.target).select();
          }
        })
        // clear the value if it not complete the mask
        .on('focusout.mask', function () {
          if (options.clearIfNotMatch && !regexMask.test(p.val())) {
            p.val('');
          }
        });
      },
      getRegexMask: function getRegexMask() {
        var maskChunks = [],
          translation,
          pattern,
          optional,
          recursive,
          oRecursive,
          r;
        for (var i = 0; i < mask.length; i++) {
          translation = jMask.translation[mask.charAt(i)];
          if (translation) {
            pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
            optional = translation.optional;
            recursive = translation.recursive;
            if (recursive) {
              maskChunks.push(mask.charAt(i));
              oRecursive = {
                digit: mask.charAt(i),
                pattern: pattern
              };
            } else {
              maskChunks.push(!optional && !recursive ? pattern : pattern + '?');
            }
          } else {
            maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
          }
        }
        r = maskChunks.join('');
        if (oRecursive) {
          r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?').replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
        }
        return new RegExp(r);
      },
      destroyEvents: function destroyEvents() {
        el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
      },
      val: function val(v) {
        var isInput = el.is('input'),
          method = isInput ? 'val' : 'text',
          r;
        if (arguments.length > 0) {
          if (el[method]() !== v) {
            el[method](v);
          }
          r = el;
        } else {
          r = el[method]();
        }
        return r;
      },
      calculateCaretPosition: function calculateCaretPosition() {
        var oldVal = el.data('mask-previus-value') || '',
          newVal = p.getMasked(),
          caretPosNew = p.getCaret();
        if (oldVal !== newVal) {
          var caretPosOld = el.data('mask-previus-caret-pos') || 0,
            newValL = newVal.length,
            oldValL = oldVal.length,
            maskDigitsBeforeCaret = 0,
            maskDigitsAfterCaret = 0,
            maskDigitsBeforeCaretAll = 0,
            maskDigitsBeforeCaretAllOld = 0,
            i = 0;
          for (i = caretPosNew; i < newValL; i++) {
            if (!p.maskDigitPosMap[i]) {
              break;
            }
            maskDigitsAfterCaret++;
          }
          for (i = caretPosNew - 1; i >= 0; i--) {
            if (!p.maskDigitPosMap[i]) {
              break;
            }
            maskDigitsBeforeCaret++;
          }
          for (i = caretPosNew - 1; i >= 0; i--) {
            if (p.maskDigitPosMap[i]) {
              maskDigitsBeforeCaretAll++;
            }
          }
          for (i = caretPosOld - 1; i >= 0; i--) {
            if (p.maskDigitPosMapOld[i]) {
              maskDigitsBeforeCaretAllOld++;
            }
          }

          // if the cursor is at the end keep it there
          if (caretPosNew > oldValL) {
            caretPosNew = newValL * 10;
          } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
            if (!p.maskDigitPosMapOld[caretPosNew]) {
              var caretPos = caretPosNew;
              caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
              caretPosNew -= maskDigitsBeforeCaret;
              if (p.maskDigitPosMap[caretPosNew]) {
                caretPosNew = caretPos;
              }
            }
          } else if (caretPosNew > caretPosOld) {
            caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
            caretPosNew += maskDigitsAfterCaret;
          }
        }
        return caretPosNew;
      },
      behaviour: function behaviour(e) {
        e = e || window.event;
        p.invalid = [];
        var keyCode = el.data('mask-keycode');
        if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
          var newVal = p.getMasked(),
            caretPos = p.getCaret();

          // this is a compensation to devices/browsers that don't compensate
          // caret positioning the right way
          setTimeout(function () {
            p.setCaret(p.calculateCaretPosition());
          }, $.jMaskGlobals.keyStrokeCompensation);
          p.val(newVal);
          p.setCaret(caretPos);
          return p.callbacks(e);
        }
      },
      getMasked: function getMasked(skipMaskChars, val) {
        var buf = [],
          value = val === undefined ? p.val() : val + '',
          m = 0,
          maskLen = mask.length,
          v = 0,
          valLen = value.length,
          offset = 1,
          addMethod = 'push',
          resetPos = -1,
          maskDigitCount = 0,
          maskDigitPosArr = [],
          lastMaskChar,
          check;
        if (options.reverse) {
          addMethod = 'unshift';
          offset = -1;
          lastMaskChar = 0;
          m = maskLen - 1;
          v = valLen - 1;
          check = function check() {
            return m > -1 && v > -1;
          };
        } else {
          lastMaskChar = maskLen - 1;
          check = function check() {
            return m < maskLen && v < valLen;
          };
        }
        var lastUntranslatedMaskChar;
        while (check()) {
          var maskDigit = mask.charAt(m),
            valDigit = value.charAt(v),
            translation = jMask.translation[maskDigit];
          if (translation) {
            if (valDigit.match(translation.pattern)) {
              buf[addMethod](valDigit);
              if (translation.recursive) {
                if (resetPos === -1) {
                  resetPos = m;
                } else if (m === lastMaskChar && m !== resetPos) {
                  m = resetPos - offset;
                }
                if (lastMaskChar === resetPos) {
                  m -= offset;
                }
              }
              m += offset;
            } else if (valDigit === lastUntranslatedMaskChar) {
              // matched the last untranslated (raw) mask character that we encountered
              // likely an insert offset the mask character from the last entry; fall
              // through and only increment v
              maskDigitCount--;
              lastUntranslatedMaskChar = undefined;
            } else if (translation.optional) {
              m += offset;
              v -= offset;
            } else if (translation.fallback) {
              buf[addMethod](translation.fallback);
              m += offset;
              v -= offset;
            } else {
              p.invalid.push({
                p: v,
                v: valDigit,
                e: translation.pattern
              });
            }
            v += offset;
          } else {
            if (!skipMaskChars) {
              buf[addMethod](maskDigit);
            }
            if (valDigit === maskDigit) {
              maskDigitPosArr.push(v);
              v += offset;
            } else {
              lastUntranslatedMaskChar = maskDigit;
              maskDigitPosArr.push(v + maskDigitCount);
              maskDigitCount++;
            }
            m += offset;
          }
        }
        var lastMaskCharDigit = mask.charAt(lastMaskChar);
        if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
          buf.push(lastMaskCharDigit);
        }
        var newVal = buf.join('');
        p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
        return newVal;
      },
      mapMaskdigitPositions: function mapMaskdigitPositions(newVal, maskDigitPosArr, valLen) {
        var maskDiff = options.reverse ? newVal.length - valLen : 0;
        p.maskDigitPosMap = {};
        for (var i = 0; i < maskDigitPosArr.length; i++) {
          p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
        }
      },
      callbacks: function callbacks(e) {
        var val = p.val(),
          changed = val !== oldValue,
          defaultArgs = [val, e, el, options],
          callback = function callback(name, criteria, args) {
            if (typeof options[name] === 'function' && criteria) {
              options[name].apply(this, args);
            }
          };
        callback('onChange', changed === true, defaultArgs);
        callback('onKeyPress', changed === true, defaultArgs);
        callback('onComplete', val.length === mask.length, defaultArgs);
        callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
      }
    };
    el = $(el);
    var jMask = this,
      oldValue = p.val(),
      regexMask;
    mask = typeof mask === 'function' ? mask(p.val(), undefined, el, options) : mask;

    // public methods
    jMask.mask = mask;
    jMask.options = options;
    jMask.remove = function () {
      var caret = p.getCaret();
      if (jMask.options.placeholder) {
        el.removeAttr('placeholder');
      }
      if (el.data('mask-maxlength')) {
        el.removeAttr('maxlength');
      }
      p.destroyEvents();
      p.val(jMask.getCleanVal());
      p.setCaret(caret);
      return el;
    };

    // get value without mask
    jMask.getCleanVal = function () {
      return p.getMasked(true);
    };

    // get masked value without the value being in the input or element
    jMask.getMaskedVal = function (val) {
      return p.getMasked(false, val);
    };
    jMask.init = function (onlyMask) {
      onlyMask = onlyMask || false;
      options = options || {};
      jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
      jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
      jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);
      jMask = $.extend(true, {}, jMask, options);
      regexMask = p.getRegexMask();
      if (onlyMask) {
        p.events();
        p.val(p.getMasked());
      } else {
        if (options.placeholder) {
          el.attr('placeholder', options.placeholder);
        }

        // this is necessary, otherwise if the user submit the form
        // and then press the "back" button, the autocomplete will erase
        // the data. Works fine on IE9+, FF, Opera, Safari.
        if (el.data('mask')) {
          el.attr('autocomplete', 'off');
        }

        // detect if is necessary let the user type freely.
        // for is a lot faster than forEach.
        for (var i = 0, maxlength = true; i < mask.length; i++) {
          var translation = jMask.translation[mask.charAt(i)];
          if (translation && translation.recursive) {
            maxlength = false;
            break;
          }
        }
        if (maxlength) {
          el.attr('maxlength', mask.length).data('mask-maxlength', true);
        }
        p.destroyEvents();
        p.events();
        var caret = p.getCaret();
        p.val(p.getMasked());
        p.setCaret(caret);
      }
    };
    jMask.init(!el.is('input'));
  };

  // $.maskWatchers = {};
  var HTMLAttributes = function HTMLAttributes() {
      var input = $(this),
        options = {},
        prefix = 'data-mask-',
        mask = input.attr('data-mask');
      if (input.attr(prefix + 'reverse')) {
        options.reverse = true;
      }
      if (input.attr(prefix + 'clearifnotmatch')) {
        options.clearIfNotMatch = true;
      }
      if (input.attr(prefix + 'selectonfocus') === 'true') {
        options.selectOnFocus = true;
      }
      if (notSameMaskObject(input, mask, options)) {
        return input.data('mask', new Mask(this, mask, options));
      }
    },
    notSameMaskObject = function notSameMaskObject(field, mask, options) {
      options = options || {};
      var maskObject = $(field).data('mask'),
        stringify = JSON.stringify,
        value = $(field).val() || $(field).text();
      try {
        if (typeof mask === 'function') {
          mask = mask(value);
        }
        return _typeof(maskObject) !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
      } catch (e) {}
    },
    eventSupported = function eventSupported(eventName) {
      var el = document.createElement('div'),
        isSupported;
      eventName = 'on' + eventName;
      isSupported = eventName in el;
      if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] === 'function';
      }
      el = null;
      return isSupported;
    };
  $.fn.mask = function (mask, options) {
    options = options || {};
    var selector = this.selector,
      globals = $.jMaskGlobals,
      interval = globals.watchInterval,
      watchInputs = options.watchInputs || globals.watchInputs,
      maskFunction = function maskFunction() {
        if (notSameMaskObject(this, mask, options)) {
          return $(this).data('mask', new Mask(this, mask, options));
        }
      };
    $(this).each(maskFunction);
    if (selector && selector !== '' && watchInputs) {
      clearInterval($.maskWatchers[selector]);
      $.maskWatchers[selector] = setInterval(function () {
        $(document).find(selector).each(maskFunction);
      }, interval);
    }
    return this;
  };
  $.fn.masked = function (val) {
    return this.data('mask').getMaskedVal(val);
  };
  $.fn.unmask = function () {
    clearInterval($.maskWatchers[this.selector]);
    delete $.maskWatchers[this.selector];
    return this.each(function () {
      var dataMask = $(this).data('mask');
      if (dataMask) {
        dataMask.remove().removeData('mask');
      }
    });
  };
  $.fn.cleanVal = function () {
    return this.data('mask').getCleanVal();
  };
  $.applyDataMask = function (selector) {
    selector = selector || $.jMaskGlobals.maskElements;
    var $selector = selector instanceof $ ? selector : $(selector);
    $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
  };
  var globals = {
    maskElements: 'input,td,span,div',
    dataMaskAttr: '*[data-mask]',
    dataMask: true,
    watchInterval: 300,
    watchInputs: true,
    keyStrokeCompensation: 10,
    // old versions of chrome dont work great with input event
    useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
    watchDataMask: false,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      '0': {
        pattern: /\d/
      },
      '9': {
        pattern: /\d/,
        optional: true
      },
      '#': {
        pattern: /\d/,
        recursive: true
      },
      'A': {
        pattern: /[a-zA-Z0-9]/
      },
      'S': {
        pattern: /[a-zA-Z]/
      }
    }
  };
  $.jMaskGlobals = $.jMaskGlobals || {};
  globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

  // looking for inputs with data-mask attribute
  if (globals.dataMask) {
    $.applyDataMask();
  }
  setInterval(function () {
    if ($.jMaskGlobals.watchDataMask) {
      $.applyDataMask();
    }
  }, globals.watchInterval);
}, window.jQuery, window.Zepto);

/*
 *  jquery-maskmoney - v3.1.1
 *  jQuery plugin to mask data entry in the input text in the form of money (currency)
 *  https://github.com/plentz/jquery-maskmoney
 *
 *  Made by Diego Plentz
 *  Under MIT License
 */
(function ($) {
  "use strict";

  if (!$.browser) {
    $.browser = {};
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    $.browser.device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  }
  var defaultOptions = {
      prefix: "",
      suffix: "",
      affixesStay: true,
      thousands: ",",
      decimal: ".",
      precision: 2,
      allowZero: false,
      allowNegative: false,
      doubleClickSelection: true,
      allowEmpty: false,
      bringCaretAtEndOnFocus: true
    },
    methods = {
      destroy: function destroy() {
        $(this).unbind(".maskMoney");
        if ($.browser.msie) {
          this.onpaste = null;
        }
        return this;
      },
      applyMask: function applyMask(value) {
        var $input = $(this);
        // data-* api
        var settings = $input.data("settings");
        return maskValue(value, settings);
      },
      mask: function mask(value) {
        return this.each(function () {
          var $this = $(this);
          if (typeof value === "number") {
            $this.val(value);
          }
          return $this.trigger("mask");
        });
      },
      unmasked: function unmasked() {
        return this.map(function () {
          var value = $(this).val() || "0",
            isNegative = value.indexOf("-") !== -1,
            decimalPart;
          // get the last position of the array that is a number(coercion makes "" to be evaluated as false)
          $(value.split(/\D/).reverse()).each(function (index, element) {
            if (element) {
              decimalPart = element;
              return false;
            }
          });
          value = value.replace(/\D/g, "");
          value = value.replace(new RegExp(decimalPart + "$"), "." + decimalPart);
          if (isNegative) {
            value = "-" + value;
          }
          return parseFloat(value);
        });
      },
      unmaskedWithOptions: function unmaskedWithOptions() {
        return this.map(function () {
          var value = $(this).val() || "0",
            settings = $(this).data("settings") || defaultOptions,
            regExp = new RegExp(settings.thousandsForUnmasked || settings.thousands, "g");
          value = value.replace(regExp, "");
          return parseFloat(value);
        });
      },
      init: function init(parameters) {
        // the default options should not be shared with others
        parameters = $.extend($.extend({}, defaultOptions), parameters);
        return this.each(function () {
          var $input = $(this),
            settings,
            onFocusValue;

          // data-* api
          settings = $.extend({}, parameters);
          settings = $.extend(settings, $input.data());

          // Store settings for use with the applyMask method.
          $input.data("settings", settings);
          function getInputSelection() {
            var el = $input.get(0),
              start = 0,
              end = 0,
              normalizedValue,
              range,
              textInputRange,
              len,
              endRange;
            if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
              start = el.selectionStart;
              end = el.selectionEnd;
            } else {
              range = document.selection.createRange();
              if (range && range.parentElement() === el) {
                len = el.value.length;
                normalizedValue = el.value.replace(/\r\n/g, "\n");

                // Create a working TextRange that lives only in the input
                textInputRange = el.createTextRange();
                textInputRange.moveToBookmark(range.getBookmark());

                // Check if the start and end of the selection are at the very end
                // of the input, since moveStart/moveEnd doesn't return what we want
                // in those cases
                endRange = el.createTextRange();
                endRange.collapse(false);
                if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                  start = end = len;
                } else {
                  start = -textInputRange.moveStart("character", -len);
                  start += normalizedValue.slice(0, start).split("\n").length - 1;
                  if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                  } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                  }
                }
              }
            }
            return {
              start: start,
              end: end
            };
          } // getInputSelection

          function canInputMoreNumbers() {
            var haventReachedMaxLength = !($input.val().length >= $input.attr("maxlength") && $input.attr("maxlength") >= 0),
              selection = getInputSelection(),
              start = selection.start,
              end = selection.end,
              haveNumberSelected = selection.start !== selection.end && $input.val().substring(start, end).match(/\d/) ? true : false,
              startWithZero = $input.val().substring(0, 1) === "0";
            return haventReachedMaxLength || haveNumberSelected || startWithZero;
          }
          function setCursorPosition(pos) {
            // Do not set the position if
            // the we're formatting on blur.
            // This is because we do not want
            // to refocus on the control after
            // the blur.
            if (!!settings.formatOnBlur) {
              return;
            }
            $input.each(function (index, elem) {
              if (elem.setSelectionRange) {
                elem.focus();
                elem.setSelectionRange(pos, pos);
              } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
              }
            });
          }
          function maskAndPosition(startPos) {
            var originalLen = $input.val().length,
              newLen;
            $input.val(maskValue($input.val(), settings));
            newLen = $input.val().length;
            // If the we're using the reverse option,
            // do not put the cursor at the end of
            // the input. The reverse option allows
            // the user to input text from left to right.
            if (!settings.reverse) {
              startPos = startPos - (originalLen - newLen);
            }
            setCursorPosition(startPos);
          }
          function mask() {
            var value = $input.val();
            if (settings.allowEmpty && value === "") {
              return;
            }
            var decimalPointIndex = value.indexOf(settings.decimal);
            if (settings.precision > 0) {
              if (decimalPointIndex < 0) {
                value += settings.decimal + new Array(settings.precision + 1).join(0);
              } else {
                // If the following decimal part dosen't have enough length against the precision, it needs to be filled with zeros.
                var integerPart = value.slice(0, decimalPointIndex),
                  decimalPart = value.slice(decimalPointIndex + 1);
                value = integerPart + settings.decimal + decimalPart + new Array(settings.precision + 1 - decimalPart.length).join(0);
              }
            } else if (decimalPointIndex > 0) {
              // if the precision is 0, discard the decimal part
              value = value.slice(0, decimalPointIndex);
            }
            $input.val(maskValue(value, settings));
          }
          function changeSign() {
            var inputValue = $input.val();
            if (settings.allowNegative) {
              if (inputValue !== "" && inputValue.charAt(0) === "-") {
                return inputValue.replace("-", "");
              } else {
                return "-" + inputValue;
              }
            } else {
              return inputValue;
            }
          }
          function preventDefault(e) {
            if (e.preventDefault) {
              //standard browsers
              e.preventDefault();
            } else {
              // old internet explorer
              e.returnValue = false;
            }
          }
          function fixMobile() {
            if ($.browser.device) {
              $input.attr("type", "tel");
            }
          }
          function keypressEvent(e) {
            e = e || window.event;
            var key = e.which || e.charCode || e.keyCode,
              decimalKeyCode = settings.decimal.charCodeAt(0);
            //added to handle an IE "special" event
            if (key === undefined) {
              return false;
            }

            // any key except the numbers 0-9. if we're using settings.reverse,
            // allow the user to input the decimal key
            if ((key < 48 || key > 57) && (key !== decimalKeyCode || !settings.reverse)) {
              return handleAllKeysExceptNumericalDigits(key, e);
            } else if (!canInputMoreNumbers()) {
              return false;
            } else {
              if (key === decimalKeyCode && shouldPreventDecimalKey()) {
                return false;
              }
              if (settings.formatOnBlur) {
                return true;
              }
              preventDefault(e);
              applyMask(e);
              return false;
            }
          }
          function shouldPreventDecimalKey() {
            // If all text is selected, we can accept the decimal
            // key because it will replace everything.
            if (isAllTextSelected()) {
              return false;
            }
            return alreadyContainsDecimal();
          }
          function isAllTextSelected() {
            var length = $input.val().length;
            var selection = getInputSelection();
            // This should if all text is selected or if the
            // input is empty.
            return selection.start === 0 && selection.end === length;
          }
          function alreadyContainsDecimal() {
            return $input.val().indexOf(settings.decimal) > -1;
          }
          function applyMask(e) {
            e = e || window.event;
            var key = e.which || e.charCode || e.keyCode,
              keyPressedChar = "",
              selection,
              startPos,
              endPos,
              value;
            if (key >= 48 && key <= 57) {
              keyPressedChar = String.fromCharCode(key);
            }
            selection = getInputSelection();
            startPos = selection.start;
            endPos = selection.end;
            value = $input.val();
            $input.val(value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length));
            maskAndPosition(startPos + 1);
          }
          function handleAllKeysExceptNumericalDigits(key, e) {
            // -(minus) key
            if (key === 45) {
              $input.val(changeSign());
              return false;
              // +(plus) key
            } else if (key === 43) {
              $input.val($input.val().replace("-", ""));
              return false;
              // enter key or tab key
            } else if (key === 13 || key === 9) {
              return true;
            } else if ($.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
              // needed for left arrow key or right arrow key with firefox
              // the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
              return true;
            } else {
              // any other key with keycode less than 48 and greater than 57
              preventDefault(e);
              return true;
            }
          }
          function keydownEvent(e) {
            e = e || window.event;
            var key = e.which || e.charCode || e.keyCode,
              selection,
              startPos,
              endPos,
              value,
              lastNumber;
            //needed to handle an IE "special" event
            if (key === undefined) {
              return false;
            }
            selection = getInputSelection();
            startPos = selection.start;
            endPos = selection.end;
            if (key === 8 || key === 46 || key === 63272) {
              // backspace or delete key (with special case for safari)
              preventDefault(e);
              value = $input.val();

              // not a selection
              if (startPos === endPos) {
                // backspace
                if (key === 8) {
                  if (settings.suffix === "") {
                    startPos -= 1;
                  } else {
                    // needed to find the position of the last number to be erased
                    lastNumber = value.split("").reverse().join("").search(/\d/);
                    startPos = value.length - lastNumber - 1;
                    endPos = startPos + 1;
                  }
                  //delete
                } else {
                  endPos += 1;
                }
              }
              $input.val(value.substring(0, startPos) + value.substring(endPos, value.length));
              maskAndPosition(startPos);
              return false;
            } else if (key === 9) {
              // tab key
              return true;
            } else {
              // any other key
              return true;
            }
          }
          function focusEvent() {
            onFocusValue = $input.val();
            mask();
            var input = $input.get(0),
              textRange;
            if (!!settings.selectAllOnFocus) {
              input.select();
            } else if (input.createTextRange && settings.bringCaretAtEndOnFocus) {
              textRange = input.createTextRange();
              textRange.collapse(false); // set the cursor at the end of the input
              textRange.select();
            }
          }
          function cutPasteEvent() {
            setTimeout(function () {
              mask();
            }, 0);
          }
          function getDefaultMask() {
            var n = parseFloat("0") / Math.pow(10, settings.precision);
            return n.toFixed(settings.precision).replace(new RegExp("\\.", "g"), settings.decimal);
          }
          function blurEvent(e) {
            if ($.browser.msie) {
              keypressEvent(e);
            }
            if (!!settings.formatOnBlur && $input.val() !== onFocusValue) {
              applyMask(e);
            }
            if ($input.val() === "" && settings.allowEmpty) {
              $input.val("");
            } else if ($input.val() === "" || $input.val() === setSymbol(getDefaultMask(), settings)) {
              if (!settings.allowZero) {
                $input.val("");
              } else if (!settings.affixesStay) {
                $input.val(getDefaultMask());
              } else {
                $input.val(setSymbol(getDefaultMask(), settings));
              }
            } else {
              if (!settings.affixesStay) {
                var newValue = $input.val().replace(settings.prefix, "").replace(settings.suffix, "");
                $input.val(newValue);
              }
            }
            if ($input.val() !== onFocusValue) {
              $input.change();
            }
          }
          function clickEvent() {
            var input = $input.get(0),
              length;
            if (!!settings.selectAllOnFocus) {
              // selectAllOnFocus will be handled by
              // the focus event. The focus event is
              // also fired when the input is clicked.
              return;
            } else if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
              length = $input.val().length;
              input.setSelectionRange(length, length);
            } else {
              $input.val($input.val());
            }
          }
          function doubleClickEvent() {
            var input = $input.get(0),
              start,
              length;
            if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
              length = $input.val().length;
              start = settings.doubleClickSelection ? 0 : length;
              input.setSelectionRange(start, length);
            } else {
              $input.val($input.val());
            }
          }
          fixMobile();
          $input.unbind(".maskMoney");
          $input.bind("keypress.maskMoney", keypressEvent);
          $input.bind("keydown.maskMoney", keydownEvent);
          $input.bind("blur.maskMoney", blurEvent);
          $input.bind("focus.maskMoney", focusEvent);
          $input.bind("click.maskMoney", clickEvent);
          $input.bind("dblclick.maskMoney", doubleClickEvent);
          $input.bind("cut.maskMoney", cutPasteEvent);
          $input.bind("paste.maskMoney", cutPasteEvent);
          $input.bind("mask.maskMoney", mask);
        });
      }
    };
  function setSymbol(value, settings) {
    var operator = "";
    if (value.indexOf("-") > -1) {
      value = value.replace("-", "");
      operator = "-";
    }
    if (value.indexOf(settings.prefix) > -1) {
      value = value.replace(settings.prefix, "");
    }
    if (value.indexOf(settings.suffix) > -1) {
      value = value.replace(settings.suffix, "");
    }
    return operator + settings.prefix + value + settings.suffix;
  }
  function maskValue(value, settings) {
    if (settings.allowEmpty && value === "") {
      return "";
    }
    if (!!settings.reverse) {
      return maskValueReverse(value, settings);
    }
    return maskValueStandard(value, settings);
  }
  function maskValueStandard(value, settings) {
    var negative = value.indexOf("-") > -1 && settings.allowNegative ? "-" : "",
      onlyNumbers = value.replace(/[^0-9]/g, ""),
      integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision),
      newValue,
      decimalPart,
      leadingZeros;
    newValue = buildIntegerPart(integerPart, negative, settings);
    if (settings.precision > 0) {
      decimalPart = onlyNumbers.slice(onlyNumbers.length - settings.precision);
      leadingZeros = new Array(settings.precision + 1 - decimalPart.length).join(0);
      newValue += settings.decimal + leadingZeros + decimalPart;
    }
    return setSymbol(newValue, settings);
  }
  function maskValueReverse(value, settings) {
    var negative = value.indexOf("-") > -1 && settings.allowNegative ? "-" : "",
      valueWithoutSymbol = value.replace(settings.prefix, "").replace(settings.suffix, ""),
      integerPart = valueWithoutSymbol.split(settings.decimal)[0],
      newValue,
      decimalPart = "";
    if (integerPart === "") {
      integerPart = "0";
    }
    newValue = buildIntegerPart(integerPart, negative, settings);
    if (settings.precision > 0) {
      var arr = valueWithoutSymbol.split(settings.decimal);
      if (arr.length > 1) {
        decimalPart = arr[1];
      }
      newValue += settings.decimal + decimalPart;
      var rounded = Number.parseFloat(integerPart + "." + decimalPart).toFixed(settings.precision);
      var roundedDecimalPart = rounded.toString().split(settings.decimal)[1];
      newValue = newValue.split(settings.decimal)[0] + "." + roundedDecimalPart;
    }
    return setSymbol(newValue, settings);
  }
  function buildIntegerPart(integerPart, negative, settings) {
    // remove initial zeros
    integerPart = integerPart.replace(/^0*/g, "");

    // put settings.thousands every 3 chars
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, settings.thousands);
    if (integerPart === "") {
      integerPart = "0";
    }
    return negative + integerPart;
  }
  $.fn.maskMoney = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.maskMoney");
    }
  };
})(window.jQuery || window.Zepto);
