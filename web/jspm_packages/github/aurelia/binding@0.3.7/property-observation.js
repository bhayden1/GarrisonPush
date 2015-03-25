/* */ 
System.register([], function (_export) {
  var _prototypeProperties, _classCallCheck, SetterObserver, OoObjectObserver, OoPropertyObserver, UndefinedPropertyObserver, ElementObserver;

  return {
    setters: [],
    execute: function () {
      "use strict";

      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      SetterObserver = _export("SetterObserver", (function () {
        function SetterObserver(taskQueue, obj, propertyName) {
          _classCallCheck(this, SetterObserver);

          this.taskQueue = taskQueue;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbacks = [];
          this.queued = false;
          this.observing = false;
        }

        _prototypeProperties(SetterObserver, null, {
          getValue: {
            value: function getValue() {
              return this.obj[this.propertyName];
            },
            writable: true,
            configurable: true
          },
          setValue: {
            value: function setValue(newValue) {
              this.obj[this.propertyName] = newValue;
            },
            writable: true,
            configurable: true
          },
          getterValue: {
            value: function getterValue() {
              return this.currentValue;
            },
            writable: true,
            configurable: true
          },
          setterValue: {
            value: function setterValue(newValue) {
              var oldValue = this.currentValue;

              if (oldValue != newValue) {
                if (!this.queued) {
                  this.oldValue = oldValue;
                  this.queued = true;
                  this.taskQueue.queueMicroTask(this);
                }

                this.currentValue = newValue;
              }
            },
            writable: true,
            configurable: true
          },
          call: {
            value: function call() {
              var callbacks = this.callbacks,
                  i = callbacks.length,
                  oldValue = this.oldValue,
                  newValue = this.currentValue;

              this.queued = false;

              while (i--) {
                callbacks[i](newValue, oldValue);
              }
            },
            writable: true,
            configurable: true
          },
          subscribe: {
            value: function subscribe(callback) {
              var callbacks = this.callbacks;
              callbacks.push(callback);

              if (!this.observing) {
                this.convertProperty();
              }

              return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
              };
            },
            writable: true,
            configurable: true
          },
          convertProperty: {
            value: function convertProperty() {
              this.observing = true;
              this.currentValue = this.obj[this.propertyName];
              this.setValue = this.setterValue;
              this.getValue = this.getterValue;

              try {
                Object.defineProperty(this.obj, this.propertyName, {
                  configurable: true,
                  enumerable: true,
                  get: this.getValue.bind(this),
                  set: this.setValue.bind(this)
                });
              } catch (_) {}
            },
            writable: true,
            configurable: true
          }
        });

        return SetterObserver;
      })());
      OoObjectObserver = _export("OoObjectObserver", (function () {
        function OoObjectObserver(obj, observerLocator) {
          _classCallCheck(this, OoObjectObserver);

          this.obj = obj;
          this.observers = {};
          this.observerLocator = observerLocator;
        }

        _prototypeProperties(OoObjectObserver, null, {
          subscribe: {
            value: function subscribe(propertyObserver, callback) {
              var _this = this;

              var callbacks = propertyObserver.callbacks;
              callbacks.push(callback);

              if (!this.observing) {
                this.observing = true;
                try {
                  Object.observe(this.obj, function (changes) {
                    return _this.handleChanges(changes);
                  }, ["update", "add"]);
                } catch (_) {}
              }

              return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
              };
            },
            writable: true,
            configurable: true
          },
          getObserver: {
            value: function getObserver(propertyName, descriptor) {
              var propertyObserver = this.observers[propertyName];
              if (!propertyObserver) {
                if (descriptor) {
                  propertyObserver = this.observers[propertyName] = new OoPropertyObserver(this, this.obj, propertyName);
                } else {
                  propertyObserver = this.observers[propertyName] = new UndefinedPropertyObserver(this, this.obj, propertyName);
                }
              }
              return propertyObserver;
            },
            writable: true,
            configurable: true
          },
          handleChanges: {
            value: function handleChanges(changeRecords) {
              var updates = {},
                  observers = this.observers,
                  i = changeRecords.length;

              while (i--) {
                var change = changeRecords[i],
                    name = change.name;

                if (!(name in updates)) {
                  var observer = observers[name];
                  updates[name] = true;
                  if (observer) {
                    observer.trigger(change.object[name], change.oldValue);
                  }
                }
              }
            },
            writable: true,
            configurable: true
          }
        });

        return OoObjectObserver;
      })());
      OoPropertyObserver = _export("OoPropertyObserver", (function () {
        function OoPropertyObserver(owner, obj, propertyName) {
          _classCallCheck(this, OoPropertyObserver);

          this.owner = owner;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbacks = [];
        }

        _prototypeProperties(OoPropertyObserver, null, {
          getValue: {
            value: function getValue() {
              return this.obj[this.propertyName];
            },
            writable: true,
            configurable: true
          },
          setValue: {
            value: function setValue(newValue) {
              this.obj[this.propertyName] = newValue;
            },
            writable: true,
            configurable: true
          },
          trigger: {
            value: function trigger(newValue, oldValue) {
              var callbacks = this.callbacks,
                  i = callbacks.length;

              while (i--) {
                callbacks[i](newValue, oldValue);
              }
            },
            writable: true,
            configurable: true
          },
          subscribe: {
            value: function subscribe(callback) {
              return this.owner.subscribe(this, callback);
            },
            writable: true,
            configurable: true
          }
        });

        return OoPropertyObserver;
      })());
      UndefinedPropertyObserver = _export("UndefinedPropertyObserver", (function () {
        function UndefinedPropertyObserver(owner, obj, propertyName) {
          _classCallCheck(this, UndefinedPropertyObserver);

          this.owner = owner;
          this.obj = obj;
          this.propertyName = propertyName;
          this.callbackMap = new Map();
          this.callbacks = []; // unused here, but required by owner OoObjectObserver.
        }

        _prototypeProperties(UndefinedPropertyObserver, null, {
          getValue: {
            value: function getValue() {
              // delegate this to the actual observer if possible.
              if (this.actual) {
                return this.actual.getValue();
              }
              return this.obj[this.propertyName];
            },
            writable: true,
            configurable: true
          },
          setValue: {
            value: function setValue(newValue) {
              // delegate this to the actual observer if possible.
              if (this.actual) {
                this.actual.setValue(newValue);
                return;
              }
              // define the property and trigger the callbacks.
              this.obj[this.propertyName] = newValue;
              this.trigger(newValue, undefined);
            },
            writable: true,
            configurable: true
          },
          trigger: {
            value: function trigger(newValue, oldValue) {
              var callback;

              // we only care about this event one time:  when the property becomes defined.
              if (this.subscription) {
                this.subscription();
              }

              // get the actual observer.
              this.getObserver();

              // invoke the callbacks.
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = this.callbackMap.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  callback = _step.value;

                  callback(newValue, oldValue);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            },
            writable: true,
            configurable: true
          },
          getObserver: {
            value: function getObserver() {
              var callback, observerLocator;

              // has the property has been defined?
              if (!Object.getOwnPropertyDescriptor(this.obj, this.propertyName)) {
                return;
              }

              // get the actual observer.
              observerLocator = this.owner.observerLocator;
              delete this.owner.observers[this.propertyName];
              delete observerLocator.getObserversLookup(this.obj, observerLocator)[this.propertyName];
              this.actual = observerLocator.getObserver(this.obj, this.propertyName);

              // attach any existing callbacks to the actual observer.
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = this.callbackMap.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  callback = _step.value;

                  this.callbackMap.set(callback, this.actual.subscribe(callback));
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            },
            writable: true,
            configurable: true
          },
          subscribe: {
            value: function subscribe(callback) {
              var _this = this;

              // attempt to get the actual observer in case the property has become
              // defined since the ObserverLocator returned [this].
              if (!this.actual) {
                this.getObserver();
              }

              // if we have the actual observer, use it.
              if (this.actual) {
                return this.actual.subscribe(callback);
              }

              // start listening for the property to become defined.
              if (!this.subscription) {
                this.subscription = this.owner.subscribe(this);
              }

              // cache the callback.
              this.callbackMap.set(callback, null);

              // return the method to dispose the subscription.
              return function () {
                var actualDispose = _this.callbackMap.get(callback);
                if (actualDispose) actualDispose();
                _this.callbackMap["delete"](callback);
              };
            },
            writable: true,
            configurable: true
          }
        });

        return UndefinedPropertyObserver;
      })());
      ElementObserver = _export("ElementObserver", (function () {
        function ElementObserver(element, propertyName, handler) {
          var _this = this;

          _classCallCheck(this, ElementObserver);

          var xlinkResult = /^xlink:(.+)$/.exec(propertyName);

          this.element = element;
          this.propertyName = propertyName;
          this.handler = handler;
          this.callbacks = [];

          if (xlinkResult) {
            // xlink namespaced attributes require getAttributeNS/setAttributeNS
            // (even though the NS version doesn't work for other namespaces
            // in html5 documents)
            propertyName = xlinkResult[1];
            this.getValue = function () {
              return element.getAttributeNS("http://www.w3.org/1999/xlink", propertyName);
            };
            this.setValue = function (newValue) {
              return element.setAttributeNS("http://www.w3.org/1999/xlink", propertyName, newValue);
            };
          } else if (/^\w+:|^data-|^aria-/.test(propertyName) || element instanceof SVGElement) {
            // namespaced attributes, data-* attributes, aria-* attributes and any native SVGElement attribute require getAttribute/setAttribute
            this.getValue = function () {
              return element.getAttribute(propertyName);
            };
            this.setValue = function (newValue) {
              return element.setAttribute(propertyName, newValue);
            };
          } else {
            // everything else uses standard property accessor/assignment.
            this.getValue = function () {
              return element[propertyName];
            };
            this.setValue = function (newValue) {
              element[propertyName] = newValue;
              if (handler) {
                _this.call();
              }
            };
          }

          this.oldValue = this.getValue();
        }

        _prototypeProperties(ElementObserver, null, {
          call: {
            value: function call() {
              var callbacks = this.callbacks,
                  i = callbacks.length,
                  oldValue = this.oldValue,
                  newValue = this.getValue();

              while (i--) {
                callbacks[i](newValue, oldValue);
              }

              this.oldValue = newValue;
            },
            writable: true,
            configurable: true
          },
          subscribe: {
            value: function subscribe(callback) {
              var that = this;

              if (!this.handler) {
                // todo: consider adding logic to use DirtyChecking for "native" Element
                // properties and O.o/SetterObserver/etc for "ad-hoc" Element properties.
                throw new Error("Observation of an Element's \"" + this.propertyName + "\" is not supported.");
              }

              if (!this.disposeHandler) {
                this.disposeHandler = this.handler.subscribe(this.element, this.propertyName, this.call.bind(this));
              }

              var callbacks = this.callbacks;

              callbacks.push(callback);

              return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
                if (callback.length === 0) {
                  that.disposeHandler();
                  that.disposeHandler = null;
                }
              };
            },
            writable: true,
            configurable: true
          }
        });

        return ElementObserver;
      })());
    }
  };
});