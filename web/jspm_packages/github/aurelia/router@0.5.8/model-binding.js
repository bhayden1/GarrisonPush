/* */ 
System.register([], function (_export) {
	var _prototypeProperties, _classCallCheck, ApplyModelBindersStep;

	return {
		setters: [],
		execute: function () {
			"use strict";

			_prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

			_classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

			ApplyModelBindersStep = _export("ApplyModelBindersStep", (function () {
				function ApplyModelBindersStep() {
					_classCallCheck(this, ApplyModelBindersStep);
				}

				_prototypeProperties(ApplyModelBindersStep, null, {
					run: {
						value: function run(navigationContext, next) {
							//look at each channel and determine if there's a custom binder to be used
							//to transform any of the lifecycleArgs

							//this needs to be done at each level...
							//chache across levels to avoid multiple loads of data, etc.

							return next();
						},
						writable: true,
						configurable: true
					}
				});

				return ApplyModelBindersStep;
			})());
		}
	};
});