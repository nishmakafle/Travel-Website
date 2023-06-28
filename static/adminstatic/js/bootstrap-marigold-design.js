(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? t(require('jquery'), require('popper.js')) : 'function' == typeof define && define.amd ? define(['jquery', 'popper.js'], t) : t(e.jQuery, e.Popper)
})(this, function(e, t) {
    'use strict';

    function n(e, t) {
        for (var n, o = 0; o < t.length; o++) n = t[o], n.enumerable = n.enumerable || !1, n.configurable = !0, 'value' in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
    }

    function o(e, t, o) {
        return t && n(e.prototype, t), o && n(e, o), e
    }

    function a() {
        return a = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var o in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }, a.apply(this, arguments)
    }

    function r(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    var i = Math.max;
    e = e && e.hasOwnProperty('default') ? e['default'] : e, t = t && t.hasOwnProperty('default') ? t['default'] : t;
    var l = function(e) {
            function t(e) {
                return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function n() {
                return {
                    bindType: i.end,
                    delegateType: i.end,
                    handle: function(t) {
                        return e(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
                    }
                }
            }

            function o() {
                return 'undefined' != typeof window && window.QUnit ? !1 : {
                    end: 'transitionend'
                }
            }

            function a(t) {
                var n = this,
                    o = !1;
                return e(this).one(l.TRANSITION_END, function() {
                    o = !0
                }), setTimeout(function() {
                    o || l.triggerTransitionEnd(n)
                }, t), this
            }

            function r(t) {
                return t = 'function' == typeof e.escapeSelector ? e.escapeSelector(t).substr(1) : t.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1'), t
            }
            var i = !1,
                l = {
                    TRANSITION_END: 'bsTransitionEnd',
                    getUID: function(e) {
                        do e += ~~(Math.random() * 1e6); while (document.getElementById(e));
                        return e
                    },
                    getSelectorFromElement: function(t) {
                        var n = t.getAttribute('data-target');
                        n && '#' !== n || (n = t.getAttribute('href') || ''), '#' === n.charAt(0) && (n = r(n));
                        try {
                            var o = e(document).find(n);
                            return 0 < o.length ? n : null
                        } catch (e) {
                            return null
                        }
                    },
                    reflow: function(e) {
                        return e.offsetHeight
                    },
                    triggerTransitionEnd: function(t) {
                        e(t).trigger(i.end)
                    },
                    supportsTransitionEnd: function() {
                        return !!i
                    },
                    isElement: function(e) {
                        return (e[0] || e).nodeType
                    },
                    typeCheckConfig: function(e, n, o) {
                        for (var a in o)
                            if (Object.prototype.hasOwnProperty.call(o, a)) {
                                var r = o[a],
                                    i = n[a],
                                    s = i && l.isElement(i) ? 'element' : t(i);
                                if (!new RegExp(r).test(s)) throw new Error(e.toUpperCase() + ': ' + ('Option "' + a + '" provided type "' + s + '" ') + ('but expected type "' + r + '".'))
                            }
                    }
                };
            return function() {
                i = o(), e.fn.emulateTransitionEnd = a, l.supportsTransitionEnd() && (e.event.special[l.TRANSITION_END] = n())
            }(), l
        }(e),
        s = function(e) {
            var t = 'alert',
                n = 'bs.alert',
                a = '.' + n,
                r = e.fn[t],
                i = {
                    CLOSE: 'close' + a,
                    CLOSED: 'closed' + a,
                    CLICK_DATA_API: 'click' + a + '.data-api'
                },
                s = {
                    ALERT: 'alert',
                    FADE: 'fade',
                    SHOW: 'show'
                },
                d = function() {
                    function t(e) {
                        this._element = e
                    }
                    var a = t.prototype;
                    return a.close = function(e) {
                        e = e || this._element;
                        var t = this._getRootElement(e),
                            n = this._triggerCloseEvent(t);
                        n.isDefaultPrevented() || this._removeElement(t)
                    }, a.dispose = function() {
                        e.removeData(this._element, n), this._element = null
                    }, a._getRootElement = function(t) {
                        var n = l.getSelectorFromElement(t),
                            o = !1;
                        return n && (o = e(n)[0]), o || (o = e(t).closest('.' + s.ALERT)[0]), o
                    }, a._triggerCloseEvent = function(t) {
                        var n = e.Event(i.CLOSE);
                        return e(t).trigger(n), n
                    }, a._removeElement = function(t) {
                        var n = this;
                        return e(t).removeClass(s.SHOW), l.supportsTransitionEnd() && e(t).hasClass(s.FADE) ? void e(t).one(l.TRANSITION_END, function(e) {
                            return n._destroyElement(t, e)
                        }).emulateTransitionEnd(150) : void this._destroyElement(t)
                    }, a._destroyElement = function(t) {
                        e(t).detach().trigger(i.CLOSED).remove()
                    }, t._jQueryInterface = function(o) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new t(this), a.data(n, r)), 'close' === o && r[o](this)
                        })
                    }, t._handleDismiss = function(e) {
                        return function(t) {
                            t && t.preventDefault(), e.close(this)
                        }
                    }, o(t, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }]), t
                }();
            return e(document).on(i.CLICK_DATA_API, {
                DISMISS: '[data-dismiss="alert"]'
            }.DISMISS, d._handleDismiss(new d)), e.fn[t] = d._jQueryInterface, e.fn[t].Constructor = d, e.fn[t].noConflict = function() {
                return e.fn[t] = r, d._jQueryInterface
            }, d
        }(e),
        d = function(e) {
            var t = 'button',
                n = 'bs.button',
                a = '.' + n,
                r = '.data-api',
                i = e.fn[t],
                l = {
                    ACTIVE: 'active',
                    BUTTON: 'btn',
                    FOCUS: 'focus'
                },
                s = {
                    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
                    DATA_TOGGLE: '[data-toggle="buttons"]',
                    INPUT: 'input',
                    ACTIVE: '.active',
                    BUTTON: '.btn'
                },
                d = {
                    CLICK_DATA_API: 'click' + a + r,
                    FOCUS_BLUR_DATA_API: 'focus' + a + r + ' ' + ('blur' + a + r)
                },
                c = function() {
                    function t(e) {
                        this._element = e
                    }
                    var a = t.prototype;
                    return a.toggle = function() {
                        var t = !0,
                            n = !0,
                            o = e(this._element).closest(s.DATA_TOGGLE)[0];
                        if (o) {
                            var a = e(this._element).find(s.INPUT)[0];
                            if (a) {
                                if ('radio' === a.type)
                                    if (a.checked && e(this._element).hasClass(l.ACTIVE)) t = !1;
                                    else {
                                        var r = e(o).find(s.ACTIVE)[0];
                                        r && e(r).removeClass(l.ACTIVE)
                                    }
                                if (t) {
                                    if (a.hasAttribute('disabled') || o.hasAttribute('disabled') || a.classList.contains('disabled') || o.classList.contains('disabled')) return;
                                    a.checked = !e(this._element).hasClass(l.ACTIVE), e(a).trigger('change')
                                }
                                a.focus(), n = !1
                            }
                        }
                        n && this._element.setAttribute('aria-pressed', !e(this._element).hasClass(l.ACTIVE)), t && e(this._element).toggleClass(l.ACTIVE)
                    }, a.dispose = function() {
                        e.removeData(this._element, n), this._element = null
                    }, t._jQueryInterface = function(o) {
                        return this.each(function() {
                            var a = e(this).data(n);
                            a || (a = new t(this), e(this).data(n, a)), 'toggle' === o && a[o]()
                        })
                    }, o(t, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }]), t
                }();
            return e(document).on(d.CLICK_DATA_API, s.DATA_TOGGLE_CARROT, function(t) {
                t.preventDefault();
                var n = t.target;
                e(n).hasClass(l.BUTTON) || (n = e(n).closest(s.BUTTON)), c._jQueryInterface.call(e(n), 'toggle')
            }).on(d.FOCUS_BLUR_DATA_API, s.DATA_TOGGLE_CARROT, function(t) {
                var n = e(t.target).closest(s.BUTTON)[0];
                e(n).toggleClass(l.FOCUS, /^focus(in)?$/.test(t.type))
            }), e.fn[t] = c._jQueryInterface, e.fn[t].Constructor = c, e.fn[t].noConflict = function() {
                return e.fn[t] = i, c._jQueryInterface
            }, c
        }(e),
        c = function(e) {
            var t = 'carousel',
                n = 'bs.carousel',
                r = '.' + n,
                i = '.data-api',
                s = e.fn[t],
                d = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: 'hover',
                    wrap: !0
                },
                c = {
                    interval: '(number|boolean)',
                    keyboard: 'boolean',
                    slide: '(boolean|string)',
                    pause: '(string|boolean)',
                    wrap: 'boolean'
                },
                _ = {
                    NEXT: 'next',
                    PREV: 'prev',
                    LEFT: 'left',
                    RIGHT: 'right'
                },
                p = {
                    SLIDE: 'slide' + r,
                    SLID: 'slid' + r,
                    KEYDOWN: 'keydown' + r,
                    MOUSEENTER: 'mouseenter' + r,
                    MOUSELEAVE: 'mouseleave' + r,
                    TOUCHEND: 'touchend' + r,
                    LOAD_DATA_API: 'load' + r + i,
                    CLICK_DATA_API: 'click' + r + i
                },
                m = {
                    CAROUSEL: 'carousel',
                    ACTIVE: 'active',
                    SLIDE: 'slide',
                    RIGHT: 'carousel-item-right',
                    LEFT: 'carousel-item-left',
                    NEXT: 'carousel-item-next',
                    PREV: 'carousel-item-prev',
                    ITEM: 'carousel-item'
                },
                g = {
                    ACTIVE: '.active',
                    ACTIVE_ITEM: '.active.carousel-item',
                    ITEM: '.carousel-item',
                    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
                    INDICATORS: '.carousel-indicators',
                    DATA_SLIDE: '[data-slide], [data-slide-to]',
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                f = function() {
                    function i(t, n) {
                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = e(t)[0], this._indicatorsElement = e(this._element).find(g.INDICATORS)[0], this._addEventListeners()
                    }
                    var s = i.prototype;
                    return s.next = function() {
                        this._isSliding || this._slide(_.NEXT)
                    }, s.nextWhenVisible = function() {
                        !document.hidden && e(this._element).is(':visible') && 'hidden' !== e(this._element).css('visibility') && this.next()
                    }, s.prev = function() {
                        this._isSliding || this._slide(_.PREV)
                    }, s.pause = function(t) {
                        t || (this._isPaused = !0), e(this._element).find(g.NEXT_PREV)[0] && l.supportsTransitionEnd() && (l.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, s.cycle = function(e) {
                        e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, s.to = function(t) {
                        var n = this;
                        this._activeElement = e(this._element).find(g.ACTIVE_ITEM)[0];
                        var o = this._getItemIndex(this._activeElement);
                        if (!(t > this._items.length - 1 || 0 > t)) {
                            if (this._isSliding) return void e(this._element).one(p.SLID, function() {
                                return n.to(t)
                            });
                            if (o === t) return this.pause(), void this.cycle();
                            var a = t > o ? _.NEXT : _.PREV;
                            this._slide(a, this._items[t])
                        }
                    }, s.dispose = function() {
                        e(this._element).off(r), e.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, s._getConfig = function(e) {
                        return e = a({}, d, e), l.typeCheckConfig(t, e, c), e
                    }, s._addEventListeners = function() {
                        var t = this;
                        this._config.keyboard && e(this._element).on(p.KEYDOWN, function(e) {
                            return t._keydown(e)
                        }), 'hover' === this._config.pause && (e(this._element).on(p.MOUSEENTER, function(e) {
                            return t.pause(e)
                        }).on(p.MOUSELEAVE, function(e) {
                            return t.cycle(e)
                        }), 'ontouchstart' in document.documentElement && e(this._element).on(p.TOUCHEND, function() {
                            t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                                return t.cycle(e)
                            }, 500 + t._config.interval)
                        }))
                    }, s._keydown = function(e) {
                        if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                            case 37:
                                e.preventDefault(), this.prev();
                                break;
                            case 39:
                                e.preventDefault(), this.next();
                                break;
                            default:
                        }
                    }, s._getItemIndex = function(t) {
                        return this._items = e.makeArray(e(t).parent().find(g.ITEM)), this._items.indexOf(t)
                    }, s._getItemByDirection = function(e, t) {
                        var n = e === _.NEXT,
                            o = e === _.PREV,
                            a = this._getItemIndex(t),
                            r = this._items.length - 1;
                        if ((o && 0 === a || n && a === r) && !this._config.wrap) return t;
                        var i = e === _.PREV ? -1 : 1,
                            l = (a + i) % this._items.length;
                        return -1 == l ? this._items[this._items.length - 1] : this._items[l]
                    }, s._triggerSlideEvent = function(t, n) {
                        var o = this._getItemIndex(t),
                            a = this._getItemIndex(e(this._element).find(g.ACTIVE_ITEM)[0]),
                            r = e.Event(p.SLIDE, {
                                relatedTarget: t,
                                direction: n,
                                from: a,
                                to: o
                            });
                        return e(this._element).trigger(r), r
                    }, s._setActiveIndicatorElement = function(t) {
                        if (this._indicatorsElement) {
                            e(this._indicatorsElement).find(g.ACTIVE).removeClass(m.ACTIVE);
                            var n = this._indicatorsElement.children[this._getItemIndex(t)];
                            n && e(n).addClass(m.ACTIVE)
                        }
                    }, s._slide = function(t, n) {
                        var o, a, r, i = this,
                            s = e(this._element).find(g.ACTIVE_ITEM)[0],
                            d = this._getItemIndex(s),
                            c = n || s && this._getItemByDirection(t, s),
                            f = this._getItemIndex(c),
                            u = !!this._interval;
                        if (t === _.NEXT ? (o = m.LEFT, a = m.NEXT, r = _.LEFT) : (o = m.RIGHT, a = m.PREV, r = _.RIGHT), c && e(c).hasClass(m.ACTIVE)) return void(this._isSliding = !1);
                        var E = this._triggerSlideEvent(c, r);
                        if (!E.isDefaultPrevented() && s && c) {
                            this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(c);
                            var h = e.Event(p.SLID, {
                                relatedTarget: c,
                                direction: r,
                                from: d,
                                to: f
                            });
                            l.supportsTransitionEnd() && e(this._element).hasClass(m.SLIDE) ? (e(c).addClass(a), l.reflow(c), e(s).addClass(o), e(c).addClass(o), e(s).one(l.TRANSITION_END, function() {
                                e(c).removeClass(o + ' ' + a).addClass(m.ACTIVE), e(s).removeClass(m.ACTIVE + ' ' + a + ' ' + o), i._isSliding = !1, setTimeout(function() {
                                    return e(i._element).trigger(h)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (e(s).removeClass(m.ACTIVE), e(c).addClass(m.ACTIVE), this._isSliding = !1, e(this._element).trigger(h)), u && this.cycle()
                        }
                    }, i._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this).data(n),
                                r = a({}, d, e(this).data());
                            'object' == typeof t && (r = a({}, r, t));
                            var l = 'string' == typeof t ? t : r.slide;
                            if (o || (o = new i(this, r), e(this).data(n, o)), 'number' == typeof t) o.to(t);
                            else if ('string' == typeof l) {
                                if ('undefined' == typeof o[l]) throw new TypeError('No method named "' + l + '"');
                                o[l]()
                            } else r.interval && (o.pause(), o.cycle())
                        })
                    }, i._dataApiClickHandler = function(t) {
                        var o = l.getSelectorFromElement(this);
                        if (o) {
                            var r = e(o)[0];
                            if (r && e(r).hasClass(m.CAROUSEL)) {
                                var s = a({}, e(r).data(), e(this).data()),
                                    d = this.getAttribute('data-slide-to');
                                d && (s.interval = !1), i._jQueryInterface.call(e(r), s), d && e(r).data(n).to(d), t.preventDefault()
                            }
                        }
                    }, o(i, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return d
                        }
                    }]), i
                }();
            return e(document).on(p.CLICK_DATA_API, g.DATA_SLIDE, f._dataApiClickHandler), e(window).on(p.LOAD_DATA_API, function() {
                e(g.DATA_RIDE).each(function() {
                    var t = e(this);
                    f._jQueryInterface.call(t, t.data())
                })
            }), e.fn[t] = f._jQueryInterface, e.fn[t].Constructor = f, e.fn[t].noConflict = function() {
                return e.fn[t] = s, f._jQueryInterface
            }, f
        }(e),
        _ = function(e) {
            var t = 'collapse',
                n = 'bs.collapse',
                r = '.' + n,
                i = e.fn[t],
                s = 600,
                d = {
                    toggle: !0,
                    parent: ''
                },
                c = {
                    toggle: 'boolean',
                    parent: '(string|element)'
                },
                _ = {
                    SHOW: 'show' + r,
                    SHOWN: 'shown' + r,
                    HIDE: 'hide' + r,
                    HIDDEN: 'hidden' + r,
                    CLICK_DATA_API: 'click' + r + '.data-api'
                },
                p = {
                    SHOW: 'show',
                    COLLAPSE: 'collapse',
                    COLLAPSING: 'collapsing',
                    COLLAPSED: 'collapsed'
                },
                m = {
                    WIDTH: 'width',
                    HEIGHT: 'height'
                },
                g = {
                    ACTIVES: '.show, .collapsing',
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                f = function() {
                    function r(t, n) {
                        this._isTransitioning = !1, this._element = t, this._config = this._getConfig(n), this._triggerArray = e.makeArray(e('[data-toggle="collapse"][href="#' + t.id + '"],' + ('[data-toggle="collapse"][data-target="#' + t.id + '"]')));
                        for (var o = e(g.DATA_TOGGLE), a = 0; a < o.length; a++) {
                            var r = o[a],
                                i = l.getSelectorFromElement(r);
                            null !== i && 0 < e(i).filter(t).length && (this._selector = i, this._triggerArray.push(r))
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    var i = r.prototype;
                    return i.toggle = function() {
                        e(this._element).hasClass(p.SHOW) ? this.hide() : this.show()
                    }, i.show = function() {
                        var t = this;
                        if (!(this._isTransitioning || e(this._element).hasClass(p.SHOW))) {
                            var o, a;
                            if (this._parent && (o = e.makeArray(e(this._parent).find(g.ACTIVES).filter('[data-parent="' + this._config.parent + '"]')), 0 === o.length && (o = null)), !(o && (a = e(o).not(this._selector).data(n), a && a._isTransitioning))) {
                                var i = e.Event(_.SHOW);
                                if (e(this._element).trigger(i), !i.isDefaultPrevented()) {
                                    o && (r._jQueryInterface.call(e(o).not(this._selector), 'hide'), !a && e(o).data(n, null));
                                    var d = this._getDimension();
                                    e(this._element).removeClass(p.COLLAPSE).addClass(p.COLLAPSING), this._element.style[d] = 0, 0 < this._triggerArray.length && e(this._triggerArray).removeClass(p.COLLAPSED).attr('aria-expanded', !0), this.setTransitioning(!0);
                                    var c = function() {
                                        e(t._element).removeClass(p.COLLAPSING).addClass(p.COLLAPSE).addClass(p.SHOW), t._element.style[d] = '', t.setTransitioning(!1), e(t._element).trigger(_.SHOWN)
                                    };
                                    if (!l.supportsTransitionEnd()) return void c();
                                    var m = d[0].toUpperCase() + d.slice(1);
                                    e(this._element).one(l.TRANSITION_END, c).emulateTransitionEnd(s), this._element.style[d] = this._element['scroll' + m] + 'px'
                                }
                            }
                        }
                    }, i.hide = function() {
                        var t = this;
                        if (!this._isTransitioning && e(this._element).hasClass(p.SHOW)) {
                            var n = e.Event(_.HIDE);
                            if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                                var o = this._getDimension();
                                if (this._element.style[o] = this._element.getBoundingClientRect()[o] + 'px', l.reflow(this._element), e(this._element).addClass(p.COLLAPSING).removeClass(p.COLLAPSE).removeClass(p.SHOW), 0 < this._triggerArray.length)
                                    for (var a = 0; a < this._triggerArray.length; a++) {
                                        var r = this._triggerArray[a],
                                            i = l.getSelectorFromElement(r);
                                        if (null !== i) {
                                            var d = e(i);
                                            d.hasClass(p.SHOW) || e(r).addClass(p.COLLAPSED).attr('aria-expanded', !1)
                                        }
                                    }
                                this.setTransitioning(!0);
                                var c = function() {
                                    t.setTransitioning(!1), e(t._element).removeClass(p.COLLAPSING).addClass(p.COLLAPSE).trigger(_.HIDDEN)
                                };
                                return this._element.style[o] = '', l.supportsTransitionEnd() ? void e(this._element).one(l.TRANSITION_END, c).emulateTransitionEnd(s) : void c()
                            }
                        }
                    }, i.setTransitioning = function(e) {
                        this._isTransitioning = e
                    }, i.dispose = function() {
                        e.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, i._getConfig = function(e) {
                        return e = a({}, d, e), e.toggle = !!e.toggle, l.typeCheckConfig(t, e, c), e
                    }, i._getDimension = function() {
                        var t = e(this._element).hasClass(m.WIDTH);
                        return t ? m.WIDTH : m.HEIGHT
                    }, i._getParent = function() {
                        var t = this,
                            n = null;
                        l.isElement(this._config.parent) ? (n = this._config.parent, 'undefined' != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = e(this._config.parent)[0];
                        var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return e(n).find(o).each(function(e, n) {
                            t._addAriaAndCollapsedClass(r._getTargetFromElement(n), [n])
                        }), n
                    }, i._addAriaAndCollapsedClass = function(t, n) {
                        if (t) {
                            var o = e(t).hasClass(p.SHOW);
                            0 < n.length && e(n).toggleClass(p.COLLAPSED, !o).attr('aria-expanded', o)
                        }
                    }, r._getTargetFromElement = function(t) {
                        var n = l.getSelectorFromElement(t);
                        return n ? e(n)[0] : null
                    }, r._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this),
                                i = o.data(n),
                                l = a({}, d, o.data(), 'object' == typeof t && t);
                            if (!i && l.toggle && /show|hide/.test(t) && (l.toggle = !1), i || (i = new r(this, l), o.data(n, i)), 'string' == typeof t) {
                                if ('undefined' == typeof i[t]) throw new TypeError('No method named "' + t + '"');
                                i[t]()
                            }
                        })
                    }, o(r, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return d
                        }
                    }]), r
                }();
            return e(document).on(_.CLICK_DATA_API, g.DATA_TOGGLE, function(t) {
                'A' === t.currentTarget.tagName && t.preventDefault();
                var o = e(this),
                    a = l.getSelectorFromElement(this);
                e(a).each(function() {
                    var t = e(this),
                        a = t.data(n),
                        r = a ? 'toggle' : o.data();
                    f._jQueryInterface.call(t, r)
                })
            }), e.fn[t] = f._jQueryInterface, e.fn[t].Constructor = f, e.fn[t].noConflict = function() {
                return e.fn[t] = i, f._jQueryInterface
            }, f
        }(e),
        p = function(e) {
            var t = 'modal',
                n = 'bs.modal',
                r = '.' + n,
                i = e.fn[t],
                s = 300,
                d = 150,
                c = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                _ = {
                    backdrop: '(boolean|string)',
                    keyboard: 'boolean',
                    focus: 'boolean',
                    show: 'boolean'
                },
                p = {
                    HIDE: 'hide' + r,
                    HIDDEN: 'hidden' + r,
                    SHOW: 'show' + r,
                    SHOWN: 'shown' + r,
                    FOCUSIN: 'focusin' + r,
                    RESIZE: 'resize' + r,
                    CLICK_DISMISS: 'click.dismiss' + r,
                    KEYDOWN_DISMISS: 'keydown.dismiss' + r,
                    MOUSEUP_DISMISS: 'mouseup.dismiss' + r,
                    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + r,
                    CLICK_DATA_API: 'click' + r + '.data-api'
                },
                m = {
                    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
                    BACKDROP: 'modal-backdrop',
                    OPEN: 'modal-open',
                    FADE: 'fade',
                    SHOW: 'show'
                },
                g = {
                    DIALOG: '.modal-dialog',
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
                    STICKY_CONTENT: '.sticky-top',
                    NAVBAR_TOGGLER: '.navbar-toggler'
                },
                f = function() {
                    function i(t, n) {
                        this._config = this._getConfig(n), this._element = t, this._dialog = e(t).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    var f = i.prototype;
                    return f.toggle = function(e) {
                        return this._isShown ? this.hide() : this.show(e)
                    }, f.show = function(t) {
                        var n = this;
                        if (!(this._isTransitioning || this._isShown)) {
                            l.supportsTransitionEnd() && e(this._element).hasClass(m.FADE) && (this._isTransitioning = !0);
                            var o = e.Event(p.SHOW, {
                                relatedTarget: t
                            });
                            e(this._element).trigger(o), this._isShown || o.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), e(document.body).addClass(m.OPEN), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(p.CLICK_DISMISS, g.DATA_DISMISS, function(e) {
                                return n.hide(e)
                            }), e(this._dialog).on(p.MOUSEDOWN_DISMISS, function() {
                                e(n._element).one(p.MOUSEUP_DISMISS, function(t) {
                                    e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return n._showElement(t)
                            }))
                        }
                    }, f.hide = function(t) {
                        var n = this;
                        if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                            var o = e.Event(p.HIDE);
                            if (e(this._element).trigger(o), this._isShown && !o.isDefaultPrevented()) {
                                this._isShown = !1;
                                var a = l.supportsTransitionEnd() && e(this._element).hasClass(m.FADE);
                                a && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(p.FOCUSIN), e(this._element).removeClass(m.SHOW), e(this._element).off(p.CLICK_DISMISS), e(this._dialog).off(p.MOUSEDOWN_DISMISS), a ? e(this._element).one(l.TRANSITION_END, function(e) {
                                    return n._hideModal(e)
                                }).emulateTransitionEnd(s) : this._hideModal()
                            }
                        }
                    }, f.dispose = function() {
                        e.removeData(this._element, n), e(window, document, this._element, this._backdrop).off(r), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, f.handleUpdate = function() {
                        this._adjustDialog()
                    }, f._getConfig = function(e) {
                        return e = a({}, c, e), l.typeCheckConfig(t, e, _), e
                    }, f._showElement = function(t) {
                        var n = this,
                            o = l.supportsTransitionEnd() && e(this._element).hasClass(m.FADE);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = 'block', this._element.removeAttribute('aria-hidden'), this._element.scrollTop = 0, o && l.reflow(this._element), e(this._element).addClass(m.SHOW), this._config.focus && this._enforceFocus();
                        var a = e.Event(p.SHOWN, {
                                relatedTarget: t
                            }),
                            r = function() {
                                n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(a)
                            };
                        o ? e(this._dialog).one(l.TRANSITION_END, r).emulateTransitionEnd(s) : r()
                    }, f._enforceFocus = function() {
                        var t = this;
                        e(document).off(p.FOCUSIN).on(p.FOCUSIN, function(n) {
                            document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                        })
                    }, f._setEscapeEvent = function() {
                        var t = this;
                        this._isShown && this._config.keyboard ? e(this._element).on(p.KEYDOWN_DISMISS, function(e) {
                            e.which === 27 && (e.preventDefault(), t.hide())
                        }) : !this._isShown && e(this._element).off(p.KEYDOWN_DISMISS)
                    }, f._setResizeEvent = function() {
                        var t = this;
                        this._isShown ? e(window).on(p.RESIZE, function(e) {
                            return t.handleUpdate(e)
                        }) : e(window).off(p.RESIZE)
                    }, f._hideModal = function() {
                        var t = this;
                        this._element.style.display = 'none', this._element.setAttribute('aria-hidden', !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            e(document.body).removeClass(m.OPEN), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(p.HIDDEN)
                        })
                    }, f._removeBackdrop = function() {
                        this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
                    }, f._showBackdrop = function(t) {
                        var n = this,
                            o = e(this._element).hasClass(m.FADE) ? m.FADE : '';
                        if (this._isShown && this._config.backdrop) {
                            var a = l.supportsTransitionEnd() && o;
                            if (this._backdrop = document.createElement('div'), this._backdrop.className = m.BACKDROP, o && e(this._backdrop).addClass(o), e(this._backdrop).appendTo(document.body), e(this._element).on(p.CLICK_DISMISS, function(e) {
                                    return n._ignoreBackdropClick ? void(n._ignoreBackdropClick = !1) : void(e.target !== e.currentTarget || ('static' === n._config.backdrop ? n._element.focus() : n.hide()))
                                }), a && l.reflow(this._backdrop), e(this._backdrop).addClass(m.SHOW), !t) return;
                            if (!a) return void t();
                            e(this._backdrop).one(l.TRANSITION_END, t).emulateTransitionEnd(d)
                        } else if (!this._isShown && this._backdrop) {
                            e(this._backdrop).removeClass(m.SHOW);
                            var r = function() {
                                n._removeBackdrop(), t && t()
                            };
                            l.supportsTransitionEnd() && e(this._element).hasClass(m.FADE) ? e(this._backdrop).one(l.TRANSITION_END, r).emulateTransitionEnd(d) : r()
                        } else t && t()
                    }, f._adjustDialog = function() {
                        var e = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + 'px'), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + 'px')
                    }, f._resetAdjustments = function() {
                        this._element.style.paddingLeft = '', this._element.style.paddingRight = ''
                    }, f._checkScrollbar = function() {
                        var e = document.body.getBoundingClientRect();
                        this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, f._setScrollbar = function() {
                        var t = this;
                        if (this._isBodyOverflowing) {
                            e(g.FIXED_CONTENT).each(function(n, o) {
                                var a = e(o)[0].style.paddingRight,
                                    r = e(o).css('padding-right');
                                e(o).data('padding-right', a).css('padding-right', parseFloat(r) + t._scrollbarWidth + 'px')
                            }), e(g.STICKY_CONTENT).each(function(n, o) {
                                var a = e(o)[0].style.marginRight,
                                    r = e(o).css('margin-right');
                                e(o).data('margin-right', a).css('margin-right', parseFloat(r) - t._scrollbarWidth + 'px')
                            }), e(g.NAVBAR_TOGGLER).each(function(n, o) {
                                var a = e(o)[0].style.marginRight,
                                    r = e(o).css('margin-right');
                                e(o).data('margin-right', a).css('margin-right', parseFloat(r) + t._scrollbarWidth + 'px')
                            });
                            var n = document.body.style.paddingRight,
                                o = e('body').css('padding-right');
                            e('body').data('padding-right', n).css('padding-right', parseFloat(o) + this._scrollbarWidth + 'px')
                        }
                    }, f._resetScrollbar = function() {
                        e(g.FIXED_CONTENT).each(function(t, n) {
                            var o = e(n).data('padding-right');
                            'undefined' != typeof o && e(n).css('padding-right', o).removeData('padding-right')
                        }), e(g.STICKY_CONTENT + ', ' + g.NAVBAR_TOGGLER).each(function(t, n) {
                            var o = e(n).data('margin-right');
                            'undefined' != typeof o && e(n).css('margin-right', o).removeData('margin-right')
                        });
                        var t = e('body').data('padding-right');
                        'undefined' != typeof t && e('body').css('padding-right', t).removeData('padding-right')
                    }, f._getScrollbarWidth = function() {
                        var e = document.createElement('div');
                        e.className = m.SCROLLBAR_MEASURER, document.body.appendChild(e);
                        var t = e.getBoundingClientRect().width - e.clientWidth;
                        return document.body.removeChild(e), t
                    }, i._jQueryInterface = function(t, o) {
                        return this.each(function() {
                            var r = e(this).data(n),
                                l = a({}, i.Default, e(this).data(), 'object' == typeof t && t);
                            if (r || (r = new i(this, l), e(this).data(n, r)), 'string' == typeof t) {
                                if ('undefined' == typeof r[t]) throw new TypeError('No method named "' + t + '"');
                                r[t](o)
                            } else l.show && r.show(o)
                        })
                    }, o(i, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return c
                        }
                    }]), i
                }();
            return e(document).on(p.CLICK_DATA_API, g.DATA_TOGGLE, function(t) {
                var o, r = this,
                    i = l.getSelectorFromElement(this);
                i && (o = e(i)[0]);
                var s = e(o).data(n) ? 'toggle' : a({}, e(o).data(), e(this).data());
                ('A' === this.tagName || 'AREA' === this.tagName) && t.preventDefault();
                var d = e(o).one(p.SHOW, function(t) {
                    t.isDefaultPrevented() || d.one(p.HIDDEN, function() {
                        e(r).is(':visible') && r.focus()
                    })
                });
                f._jQueryInterface.call(e(o), s, this)
            }), e.fn[t] = f._jQueryInterface, e.fn[t].Constructor = f, e.fn[t].noConflict = function() {
                return e.fn[t] = i, f._jQueryInterface
            }, f
        }(e),
        m = function(e) {
            var n = 'tooltip',
                r = 'bs.tooltip',
                i = '.' + r,
                s = e.fn[n],
                d = /(^|\s)bs-tooltip\S+/g,
                c = {
                    animation: 'boolean',
                    template: 'string',
                    title: '(string|element|function)',
                    trigger: 'string',
                    delay: '(number|object)',
                    html: 'boolean',
                    selector: '(string|boolean)',
                    placement: '(string|function)',
                    offset: '(number|string)',
                    container: '(string|element|boolean)',
                    fallbackPlacement: '(string|array)',
                    boundary: '(string|element)'
                },
                _ = {
                    AUTO: 'auto',
                    TOP: 'top',
                    RIGHT: 'right',
                    BOTTOM: 'bottom',
                    LEFT: 'left'
                },
                p = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: 'hover focus',
                    title: '',
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: 'top',
                    offset: 0,
                    container: !1,
                    fallbackPlacement: 'flip',
                    boundary: 'scrollParent'
                },
                m = {
                    SHOW: 'show',
                    OUT: 'out'
                },
                g = {
                    HIDE: 'hide' + i,
                    HIDDEN: 'hidden' + i,
                    SHOW: 'show' + i,
                    SHOWN: 'shown' + i,
                    INSERTED: 'inserted' + i,
                    CLICK: 'click' + i,
                    FOCUSIN: 'focusin' + i,
                    FOCUSOUT: 'focusout' + i,
                    MOUSEENTER: 'mouseenter' + i,
                    MOUSELEAVE: 'mouseleave' + i
                },
                f = {
                    FADE: 'fade',
                    SHOW: 'show'
                },
                u = {
                    TOOLTIP: '.tooltip',
                    TOOLTIP_INNER: '.tooltip-inner',
                    ARROW: '.arrow'
                },
                E = {
                    HOVER: 'hover',
                    FOCUS: 'focus',
                    CLICK: 'click',
                    MANUAL: 'manual'
                },
                h = function() {
                    function s(e, n) {
                        if ('undefined' == typeof t) throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
                        this._isEnabled = !0, this._timeout = 0, this._hoverState = '', this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(n), this.tip = null, this._setListeners()
                    }
                    var h = s.prototype;
                    return h.enable = function() {
                        this._isEnabled = !0
                    }, h.disable = function() {
                        this._isEnabled = !1
                    }, h.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, h.toggle = function(t) {
                        if (this._isEnabled)
                            if (t) {
                                var n = this.constructor.DATA_KEY,
                                    o = e(t.currentTarget).data(n);
                                o || (o = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, o)), o._activeTrigger.click = !o._activeTrigger.click, o._isWithActiveTrigger() ? o._enter(null, o) : o._leave(null, o)
                            } else {
                                if (e(this.getTipElement()).hasClass(f.SHOW)) return void this._leave(null, this);
                                this._enter(null, this)
                            }
                    }, h.dispose = function() {
                        clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest('.modal').off('hide.bs.modal'), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, h.show = function() {
                        var n = this;
                        if ('none' === e(this.element).css('display')) throw new Error('Please use show on visible elements');
                        var o = e.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            e(this.element).trigger(o);
                            var a = e.contains(this.element.ownerDocument.documentElement, this.element);
                            if (o.isDefaultPrevented() || !a) return;
                            var r = this.getTipElement(),
                                i = l.getUID(this.constructor.NAME);
                            r.setAttribute('id', i), this.element.setAttribute('aria-describedby', i), this.setContent(), this.config.animation && e(r).addClass(f.FADE);
                            var d = 'function' == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                c = this._getAttachment(d);
                            this.addAttachmentClass(c);
                            var _ = !1 === this.config.container ? document.body : e(this.config.container);
                            e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(_), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new t(this.element, r, {
                                placement: c,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: u.ARROW
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function(e) {
                                    e.originalPlacement !== e.placement && n._handlePopperPlacementChange(e)
                                },
                                onUpdate: function(e) {
                                    n._handlePopperPlacementChange(e)
                                }
                            }), e(r).addClass(f.SHOW), 'ontouchstart' in document.documentElement && e('body').children().on('mouseover', null, e.noop);
                            var p = function() {
                                n.config.animation && n._fixTransition();
                                var t = n._hoverState;
                                n._hoverState = null, e(n.element).trigger(n.constructor.Event.SHOWN), t === m.OUT && n._leave(null, n)
                            };
                            l.supportsTransitionEnd() && e(this.tip).hasClass(f.FADE) ? e(this.tip).one(l.TRANSITION_END, p).emulateTransitionEnd(s._TRANSITION_DURATION) : p()
                        }
                    }, h.hide = function(t) {
                        var n = this,
                            o = this.getTipElement(),
                            a = e.Event(this.constructor.Event.HIDE),
                            r = function() {
                                n._hoverState !== m.SHOW && o.parentNode && o.parentNode.removeChild(o), n._cleanTipClass(), n.element.removeAttribute('aria-describedby'), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                            };
                        e(this.element).trigger(a), a.isDefaultPrevented() || (e(o).removeClass(f.SHOW), 'ontouchstart' in document.documentElement && e('body').children().off('mouseover', null, e.noop), this._activeTrigger[E.CLICK] = !1, this._activeTrigger[E.FOCUS] = !1, this._activeTrigger[E.HOVER] = !1, l.supportsTransitionEnd() && e(this.tip).hasClass(f.FADE) ? e(o).one(l.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = '')
                    }, h.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, h.isWithContent = function() {
                        return !!this.getTitle()
                    }, h.addAttachmentClass = function(t) {
                        e(this.getTipElement()).addClass('bs-tooltip' + '-' + t)
                    }, h.getTipElement = function() {
                        return this.tip = this.tip || e(this.config.template)[0], this.tip
                    }, h.setContent = function() {
                        var t = e(this.getTipElement());
                        this.setElementContent(t.find(u.TOOLTIP_INNER), this.getTitle()), t.removeClass(f.FADE + ' ' + f.SHOW)
                    }, h.setElementContent = function(t, n) {
                        var o = this.config.html;
                        'object' == typeof n && (n.nodeType || n.jquery) ? o ? !e(n).parent().is(t) && t.empty().append(n) : t.text(e(n).text()) : t[o ? 'html' : 'text'](n)
                    }, h.getTitle = function() {
                        var e = this.element.getAttribute('data-original-title');
                        return e || (e = 'function' == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
                    }, h._getAttachment = function(e) {
                        return _[e.toUpperCase()]
                    }, h._setListeners = function() {
                        var t = this,
                            n = this.config.trigger.split(' ');
                        n.forEach(function(n) {
                            if ('click' === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                                return t.toggle(e)
                            });
                            else if (n !== E.MANUAL) {
                                var o = n === E.HOVER ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                                    a = n === E.HOVER ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                                e(t.element).on(o, t.config.selector, function(e) {
                                    return t._enter(e)
                                }).on(a, t.config.selector, function(e) {
                                    return t._leave(e)
                                })
                            }
                            e(t.element).closest('.modal').on('hide.bs.modal', function() {
                                return t.hide()
                            })
                        }), this.config.selector ? this.config = a({}, this.config, {
                            trigger: 'manual',
                            selector: ''
                        }) : this._fixTitle()
                    }, h._fixTitle = function() {
                        var e = typeof this.element.getAttribute('data-original-title');
                        (this.element.getAttribute('title') || 'string' != e) && (this.element.setAttribute('data-original-title', this.element.getAttribute('title') || ''), this.element.setAttribute('title', ''))
                    }, h._enter = function(t, n) {
                        var o = this.constructor.DATA_KEY;
                        return (n = n || e(t.currentTarget).data(o), n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(o, n)), t && (n._activeTrigger['focusin' === t.type ? E.FOCUS : E.HOVER] = !0), e(n.getTipElement()).hasClass(f.SHOW) || n._hoverState === m.SHOW) ? void(n._hoverState = m.SHOW) : (clearTimeout(n._timeout), n._hoverState = m.SHOW, n.config.delay && n.config.delay.show ? void(n._timeout = setTimeout(function() {
                            n._hoverState === m.SHOW && n.show()
                        }, n.config.delay.show)) : void n.show())
                    }, h._leave = function(t, n) {
                        var o = this.constructor.DATA_KEY;
                        if (n = n || e(t.currentTarget).data(o), n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(o, n)), t && (n._activeTrigger['focusout' === t.type ? E.FOCUS : E.HOVER] = !1), !n._isWithActiveTrigger()) return clearTimeout(n._timeout), n._hoverState = m.OUT, n.config.delay && n.config.delay.hide ? void(n._timeout = setTimeout(function() {
                            n._hoverState === m.OUT && n.hide()
                        }, n.config.delay.hide)) : void n.hide()
                    }, h._isWithActiveTrigger = function() {
                        for (var e in this._activeTrigger)
                            if (this._activeTrigger[e]) return !0;
                        return !1
                    }, h._getConfig = function(t) {
                        return t = a({}, this.constructor.Default, e(this.element).data(), t), 'number' == typeof t.delay && (t.delay = {
                            show: t.delay,
                            hide: t.delay
                        }), 'number' == typeof t.title && (t.title = t.title.toString()), 'number' == typeof t.content && (t.content = t.content.toString()), l.typeCheckConfig(n, t, this.constructor.DefaultType), t
                    }, h._getDelegateConfig = function() {
                        var e = {};
                        if (this.config)
                            for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                        return e
                    }, h._cleanTipClass = function() {
                        var t = e(this.getTipElement()),
                            n = t.attr('class').match(d);
                        null !== n && 0 < n.length && t.removeClass(n.join(''))
                    }, h._handlePopperPlacementChange = function(e) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
                    }, h._fixTransition = function() {
                        var t = this.getTipElement(),
                            n = this.config.animation;
                        null !== t.getAttribute('x-placement') || (e(t).removeClass(f.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                    }, s._jQueryInterface = function(t) {
                        return this.each(function() {
                            var n = e(this).data(r);
                            if ((n || !/dispose|hide/.test(t)) && (n || (n = new s(this, 'object' == typeof t && t), e(this).data(r, n)), 'string' == typeof t)) {
                                if ('undefined' == typeof n[t]) throw new TypeError('No method named "' + t + '"');
                                n[t]()
                            }
                        })
                    }, o(s, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return p
                        }
                    }, {
                        key: 'NAME',
                        get: function() {
                            return n
                        }
                    }, {
                        key: 'DATA_KEY',
                        get: function() {
                            return r
                        }
                    }, {
                        key: 'Event',
                        get: function() {
                            return g
                        }
                    }, {
                        key: 'EVENT_KEY',
                        get: function() {
                            return i
                        }
                    }, {
                        key: 'DefaultType',
                        get: function() {
                            return c
                        }
                    }]), s
                }();
            return e.fn[n] = h._jQueryInterface, e.fn[n].Constructor = h, e.fn[n].noConflict = function() {
                return e.fn[n] = s, h._jQueryInterface
            }, h
        }(e, t),
        g = function(e) {
            var t = 'popover',
                n = 'bs.popover',
                i = '.' + n,
                l = e.fn[t],
                s = /(^|\s)bs-popover\S+/g,
                d = a({}, m.Default, {
                    placement: 'right',
                    trigger: 'click',
                    content: '',
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }),
                c = a({}, m.DefaultType, {
                    content: '(string|element|function)'
                }),
                _ = {
                    FADE: 'fade',
                    SHOW: 'show'
                },
                p = {
                    TITLE: '.popover-header',
                    CONTENT: '.popover-body'
                },
                g = {
                    HIDE: 'hide' + i,
                    HIDDEN: 'hidden' + i,
                    SHOW: 'show' + i,
                    SHOWN: 'shown' + i,
                    INSERTED: 'inserted' + i,
                    CLICK: 'click' + i,
                    FOCUSIN: 'focusin' + i,
                    FOCUSOUT: 'focusout' + i,
                    MOUSEENTER: 'mouseenter' + i,
                    MOUSELEAVE: 'mouseleave' + i
                },
                f = function(a) {
                    function l() {
                        return a.apply(this, arguments) || this
                    }
                    r(l, a);
                    var m = l.prototype;
                    return m.isWithContent = function() {
                        return this.getTitle() || this._getContent()
                    }, m.addAttachmentClass = function(t) {
                        e(this.getTipElement()).addClass('bs-popover' + '-' + t)
                    }, m.getTipElement = function() {
                        return this.tip = this.tip || e(this.config.template)[0], this.tip
                    }, m.setContent = function() {
                        var t = e(this.getTipElement());
                        this.setElementContent(t.find(p.TITLE), this.getTitle());
                        var n = this._getContent();
                        'function' == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(p.CONTENT), n), t.removeClass(_.FADE + ' ' + _.SHOW)
                    }, m._getContent = function() {
                        return this.element.getAttribute('data-content') || this.config.content
                    }, m._cleanTipClass = function() {
                        var t = e(this.getTipElement()),
                            n = t.attr('class').match(s);
                        null !== n && 0 < n.length && t.removeClass(n.join(''))
                    }, l._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this).data(n),
                                a = 'object' == typeof t ? t : null;
                            if ((o || !/destroy|hide/.test(t)) && (o || (o = new l(this, a), e(this).data(n, o)), 'string' == typeof t)) {
                                if ('undefined' == typeof o[t]) throw new TypeError('No method named "' + t + '"');
                                o[t]()
                            }
                        })
                    }, o(l, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return d
                        }
                    }, {
                        key: 'NAME',
                        get: function() {
                            return t
                        }
                    }, {
                        key: 'DATA_KEY',
                        get: function() {
                            return n
                        }
                    }, {
                        key: 'Event',
                        get: function() {
                            return g
                        }
                    }, {
                        key: 'EVENT_KEY',
                        get: function() {
                            return i
                        }
                    }, {
                        key: 'DefaultType',
                        get: function() {
                            return c
                        }
                    }]), l
                }(m);
            return e.fn[t] = f._jQueryInterface, e.fn[t].Constructor = f, e.fn[t].noConflict = function() {
                return e.fn[t] = l, f._jQueryInterface
            }, f
        }(e),
        f = function(e) {
            var t = 'scrollspy',
                n = 'bs.scrollspy',
                r = '.' + n,
                s = e.fn[t],
                d = {
                    offset: 10,
                    method: 'auto',
                    target: ''
                },
                c = {
                    offset: 'number',
                    method: 'string',
                    target: '(string|element)'
                },
                _ = {
                    ACTIVATE: 'activate' + r,
                    SCROLL: 'scroll' + r,
                    LOAD_DATA_API: 'load' + r + '.data-api'
                },
                p = {
                    DROPDOWN_ITEM: 'dropdown-item',
                    DROPDOWN_MENU: 'dropdown-menu',
                    ACTIVE: 'active'
                },
                m = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: '.active',
                    NAV_LIST_GROUP: '.nav, .list-group',
                    NAV_LINKS: '.nav-link',
                    NAV_ITEMS: '.nav-item',
                    LIST_ITEMS: '.list-group-item',
                    DROPDOWN: '.dropdown',
                    DROPDOWN_ITEMS: '.dropdown-item',
                    DROPDOWN_TOGGLE: '.dropdown-toggle'
                },
                g = {
                    OFFSET: 'offset',
                    POSITION: 'position'
                },
                f = function() {
                    function s(t, n) {
                        var o = this;
                        this._element = t, this._scrollElement = 'BODY' === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + ' ' + m.NAV_LINKS + ',' + (this._config.target + ' ' + m.LIST_ITEMS + ',') + (this._config.target + ' ' + m.DROPDOWN_ITEMS), this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(_.SCROLL, function(e) {
                            return o._process(e)
                        }), this.refresh(), this._process()
                    }
                    var f = s.prototype;
                    return f.refresh = function() {
                        var t = this,
                            n = this._scrollElement === this._scrollElement.window ? g.OFFSET : g.POSITION,
                            o = 'auto' === this._config.method ? n : this._config.method,
                            a = o === g.POSITION ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight();
                        var r = e.makeArray(e(this._selector));
                        r.map(function(t) {
                            var n, r = l.getSelectorFromElement(t);
                            if (r && (n = e(r)[0]), n) {
                                var i = n.getBoundingClientRect();
                                if (i.width || i.height) return [e(n)[o]().top + a, r]
                            }
                            return null
                        }).filter(function(e) {
                            return e
                        }).sort(function(e, t) {
                            return e[0] - t[0]
                        }).forEach(function(e) {
                            t._offsets.push(e[0]), t._targets.push(e[1])
                        })
                    }, f.dispose = function() {
                        e.removeData(this._element, n), e(this._scrollElement).off(r), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, f._getConfig = function(n) {
                        if (n = a({}, d, n), 'string' != typeof n.target) {
                            var o = e(n.target).attr('id');
                            o || (o = l.getUID(t), e(n.target).attr('id', o)), n.target = '#' + o
                        }
                        return l.typeCheckConfig(t, n, c), n
                    }, f._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, f._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || i(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, f._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, f._process = function() {
                        var e = this._getScrollTop() + this._config.offset,
                            t = this._getScrollHeight(),
                            n = this._config.offset + t - this._getOffsetHeight();
                        if (this._scrollHeight !== t && this.refresh(), e >= n) {
                            var o = this._targets[this._targets.length - 1];
                            return void(this._activeTarget !== o && this._activate(o))
                        }
                        if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                        for (var a, r = this._offsets.length; r--;) a = this._activeTarget !== this._targets[r] && e >= this._offsets[r] && ('undefined' == typeof this._offsets[r + 1] || e < this._offsets[r + 1]), a && this._activate(this._targets[r])
                    }, f._activate = function(t) {
                        this._activeTarget = t, this._clear();
                        var n = this._selector.split(',');
                        n = n.map(function(e) {
                            return e + '[data-target="' + t + '"],' + (e + '[href="' + t + '"]')
                        });
                        var o = e(n.join(','));
                        o.hasClass(p.DROPDOWN_ITEM) ? (o.closest(m.DROPDOWN).find(m.DROPDOWN_TOGGLE).addClass(p.ACTIVE), o.addClass(p.ACTIVE)) : (o.addClass(p.ACTIVE), o.parents(m.NAV_LIST_GROUP).prev(m.NAV_LINKS + ', ' + m.LIST_ITEMS).addClass(p.ACTIVE), o.parents(m.NAV_LIST_GROUP).prev(m.NAV_ITEMS).children(m.NAV_LINKS).addClass(p.ACTIVE)), e(this._scrollElement).trigger(_.ACTIVATE, {
                            relatedTarget: t
                        })
                    }, f._clear = function() {
                        e(this._selector).filter(m.ACTIVE).removeClass(p.ACTIVE)
                    }, s._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this).data(n);
                            if (o || (o = new s(this, 'object' == typeof t && t), e(this).data(n, o)), 'string' == typeof t) {
                                if ('undefined' == typeof o[t]) throw new TypeError('No method named "' + t + '"');
                                o[t]()
                            }
                        })
                    }, o(s, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return d
                        }
                    }]), s
                }();
            return e(window).on(_.LOAD_DATA_API, function() {
                for (var t, n = e.makeArray(e(m.DATA_SPY)), o = n.length; o--;) t = e(n[o]), f._jQueryInterface.call(t, t.data())
            }), e.fn[t] = f._jQueryInterface, e.fn[t].Constructor = f, e.fn[t].noConflict = function() {
                return e.fn[t] = s, f._jQueryInterface
            }, f
        }(e),
        u = function(e) {
            var t = 'tab',
                n = 'bs.tab',
                a = '.' + n,
                r = e.fn[t],
                i = {
                    HIDE: 'hide' + a,
                    HIDDEN: 'hidden' + a,
                    SHOW: 'show' + a,
                    SHOWN: 'shown' + a,
                    CLICK_DATA_API: 'click' + a + '.data-api'
                },
                s = {
                    DROPDOWN_MENU: 'dropdown-menu',
                    ACTIVE: 'active',
                    DISABLED: 'disabled',
                    FADE: 'fade',
                    SHOW: 'show'
                },
                d = {
                    DROPDOWN: '.dropdown',
                    NAV_LIST_GROUP: '.nav, .list-group',
                    ACTIVE: '.active',
                    ACTIVE_UL: '> li > .active',
                    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    DROPDOWN_TOGGLE: '.dropdown-toggle',
                    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
                },
                c = function() {
                    function t(e) {
                        this._element = e
                    }
                    var a = t.prototype;
                    return a.show = function() {
                        var t = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(s.ACTIVE) || e(this._element).hasClass(s.DISABLED))) {
                            var n, o, a = e(this._element).closest(d.NAV_LIST_GROUP)[0],
                                r = l.getSelectorFromElement(this._element);
                            if (a) {
                                var c = 'UL' === a.nodeName ? d.ACTIVE_UL : d.ACTIVE;
                                o = e.makeArray(e(a).find(c)), o = o[o.length - 1]
                            }
                            var _ = e.Event(i.HIDE, {
                                    relatedTarget: this._element
                                }),
                                p = e.Event(i.SHOW, {
                                    relatedTarget: o
                                });
                            if (o && e(o).trigger(_), e(this._element).trigger(p), !(p.isDefaultPrevented() || _.isDefaultPrevented())) {
                                r && (n = e(r)[0]), this._activate(this._element, a);
                                var m = function() {
                                    var n = e.Event(i.HIDDEN, {
                                            relatedTarget: t._element
                                        }),
                                        a = e.Event(i.SHOWN, {
                                            relatedTarget: o
                                        });
                                    e(o).trigger(n), e(t._element).trigger(a)
                                };
                                n ? this._activate(n, n.parentNode, m) : m()
                            }
                        }
                    }, a.dispose = function() {
                        e.removeData(this._element, n), this._element = null
                    }, a._activate = function(t, n, o) {
                        var a, r = this;
                        a = 'UL' === n.nodeName ? e(n).find(d.ACTIVE_UL) : e(n).children(d.ACTIVE);
                        var i = a[0],
                            c = o && l.supportsTransitionEnd() && i && e(i).hasClass(s.FADE),
                            _ = function() {
                                return r._transitionComplete(t, i, o)
                            };
                        i && c ? e(i).one(l.TRANSITION_END, _).emulateTransitionEnd(150) : _()
                    }, a._transitionComplete = function(t, n, o) {
                        if (n) {
                            e(n).removeClass(s.SHOW + ' ' + s.ACTIVE);
                            var a = e(n.parentNode).find(d.DROPDOWN_ACTIVE_CHILD)[0];
                            a && e(a).removeClass(s.ACTIVE), 'tab' === n.getAttribute('role') && n.setAttribute('aria-selected', !1)
                        }
                        if (e(t).addClass(s.ACTIVE), 'tab' === t.getAttribute('role') && t.setAttribute('aria-selected', !0), l.reflow(t), e(t).addClass(s.SHOW), t.parentNode && e(t.parentNode).hasClass(s.DROPDOWN_MENU)) {
                            var r = e(t).closest(d.DROPDOWN)[0];
                            r && e(r).find(d.DROPDOWN_TOGGLE).addClass(s.ACTIVE), t.setAttribute('aria-expanded', !0)
                        }
                        o && o()
                    }, t._jQueryInterface = function(o) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            if (r || (r = new t(this), a.data(n, r)), 'string' == typeof o) {
                                if ('undefined' == typeof r[o]) throw new TypeError('No method named "' + o + '"');
                                r[o]()
                            }
                        })
                    }, o(t, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0'
                        }
                    }]), t
                }();
            return e(document).on(i.CLICK_DATA_API, d.DATA_TOGGLE, function(t) {
                t.preventDefault(), c._jQueryInterface.call(e(this), 'show')
            }), e.fn[t] = c._jQueryInterface, e.fn[t].Constructor = c, e.fn[t].noConflict = function() {
                return e.fn[t] = r, c._jQueryInterface
            }, c
        }(e),
        E = function() {
            function e() {
                if (window.QUnit) return !1;
                var e = document.createElement('bmd');
                for (var t in o)
                    if (void 0 !== e.style[t]) return o[t];
                return !1
            }
            var t = !1,
                n = '',
                o = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };
            return function() {
                for (var a in t = e(), o) n += ' ' + o[a]
            }(), {
                transitionEndSupported: function() {
                    return t
                },
                transitionEndSelector: function() {
                    return n
                },
                isChar: function(e) {
                    return !('undefined' != typeof e.which) || 'number' == typeof e.which && 0 < e.which && !e.ctrlKey && !e.metaKey && !e.altKey && 8 !== e.which && 9 !== e.which && 13 !== e.which && 16 !== e.which && 17 !== e.which && 20 !== e.which && 27 !== e.which
                },
                assert: function(e, t, n) {
                    if (t) throw void 0 === !e && e.css('border', '1px solid red'), console.error(n, e), n
                },
                describe: function(e) {
                    return void 0 === e ? 'undefined' : 0 === e.length ? '(no matching elements)' : e[0].outerHTML.split('>')[0] + '>'
                }
            }
        }(jQuery),
        h = function(e) {
            var t = {
                    BMD_FORM_GROUP: 'bmd-form-group',
                    IS_FILLED: 'is-filled',
                    IS_FOCUSED: 'is-focused'
                },
                n = {
                    BMD_FORM_GROUP: '.' + t.BMD_FORM_GROUP
                },
                o = {},
                a = function() {
                    function a(t, n, a) {
                        for (var r in void 0 === a && (a = {}), this.$element = t, this.config = e.extend(!0, {}, o, n), a) this[r] = a[r]
                    }
                    var r = a.prototype;
                    return r.dispose = function(e) {
                        this.$element.data(e, null), this.$element = null, this.config = null
                    }, r.addFormGroupFocus = function() {
                        this.$element.prop('disabled') || this.$bmdFormGroup.addClass(t.IS_FOCUSED)
                    }, r.removeFormGroupFocus = function() {
                        this.$bmdFormGroup.removeClass(t.IS_FOCUSED)
                    }, r.removeIsFilled = function() {
                        this.$bmdFormGroup.removeClass(t.IS_FILLED)
                    }, r.addIsFilled = function() {
                        this.$bmdFormGroup.addClass(t.IS_FILLED)
                    }, r.findMdbFormGroup = function(t) {
                        void 0 === t && (t = !0);
                        var o = this.$element.closest(n.BMD_FORM_GROUP);
                        return 0 === o.length && t && e.error('Failed to find ' + n.BMD_FORM_GROUP + ' for ' + E.describe(this.$element)), o
                    }, a
                }();
            return a
        }(jQuery),
        A = function(e) {
            var t = {
                    FORM_GROUP: 'form-group',
                    BMD_FORM_GROUP: 'bmd-form-group',
                    BMD_LABEL: 'bmd-label',
                    BMD_LABEL_STATIC: 'bmd-label-static',
                    BMD_LABEL_PLACEHOLDER: 'bmd-label-placeholder',
                    BMD_LABEL_FLOATING: 'bmd-label-floating',
                    HAS_DANGER: 'has-danger',
                    IS_FILLED: 'is-filled',
                    IS_FOCUSED: 'is-focused',
                    INPUT_GROUP: 'input-group'
                },
                n = {
                    FORM_GROUP: '.' + t.FORM_GROUP,
                    BMD_FORM_GROUP: '.' + t.BMD_FORM_GROUP,
                    BMD_LABEL_WILDCARD: 'label[class^=\'' + t.BMD_LABEL + '\'], label[class*=\' ' + t.BMD_LABEL + '\']'
                },
                o = {
                    validate: !1,
                    formGroup: {
                        required: !1
                    },
                    bmdFormGroup: {
                        template: '<span class=\'' + t.BMD_FORM_GROUP + '\'></span>',
                        create: !0,
                        required: !0
                    },
                    label: {
                        required: !1,
                        selectors: ['.form-control-label', '> label'],
                        className: t.BMD_LABEL_STATIC
                    },
                    requiredClasses: [],
                    invalidComponentMatches: [],
                    convertInputSizeVariations: !0
                },
                a = {
                    "form-control-lg": 'bmd-form-group-lg',
                    "form-control-sm": 'bmd-form-group-sm'
                },
                i = function(i) {
                    function l(t, n, a) {
                        var r;
                        return void 0 === a && (a = {}), r = i.call(this, t, e.extend(!0, {}, o, n), a) || this, r._rejectInvalidComponentMatches(), r.rejectWithoutRequiredStructure(), r._rejectWithoutRequiredClasses(), r.$formGroup = r.findFormGroup(r.config.formGroup.required), r.$bmdFormGroup = r.resolveMdbFormGroup(), r.$bmdLabel = r.resolveMdbLabel(), r.resolveMdbFormGroupSizing(), r.addFocusListener(), r.addChangeListener(), '' != r.$element.val() && r.addIsFilled(), r
                    }
                    r(l, i);
                    var s = l.prototype;
                    return s.dispose = function(e) {
                        i.prototype.dispose.call(this, e), this.$bmdFormGroup = null, this.$formGroup = null
                    }, s.rejectWithoutRequiredStructure = function() {}, s.addFocusListener = function() {
                        var e = this;
                        this.$element.on('focus', function() {
                            e.addFormGroupFocus()
                        }).on('blur', function() {
                            e.removeFormGroupFocus()
                        })
                    }, s.addChangeListener = function() {
                        var e = this;
                        this.$element.on('keydown paste', function(t) {
                            E.isChar(t) && e.addIsFilled()
                        }).on('keyup change', function() {
                            if (e.isEmpty() ? e.removeIsFilled() : e.addIsFilled(), e.config.validate) {
                                var t = 'undefined' == typeof e.$element[0].checkValidity || e.$element[0].checkValidity();
                                t ? e.removeHasDanger() : e.addHasDanger()
                            }
                        })
                    }, s.addHasDanger = function() {
                        this.$bmdFormGroup.addClass(t.HAS_DANGER)
                    }, s.removeHasDanger = function() {
                        this.$bmdFormGroup.removeClass(t.HAS_DANGER)
                    }, s.isEmpty = function() {
                        return null === this.$element.val() || void 0 === this.$element.val() || '' === this.$element.val()
                    }, s.resolveMdbFormGroup = function() {
                        var e = this.findMdbFormGroup(!1);
                        return (void 0 === e || 0 === e.length) && (this.config.bmdFormGroup.create && (void 0 === this.$formGroup || 0 === this.$formGroup.length) ? this.outerElement().parent().hasClass(t.INPUT_GROUP) ? this.outerElement().parent().wrap(this.config.bmdFormGroup.template) : this.outerElement().wrap(this.config.bmdFormGroup.template) : this.$formGroup.addClass(t.BMD_FORM_GROUP), e = this.findMdbFormGroup(this.config.bmdFormGroup.required)), e
                    }, s.outerElement = function() {
                        return this.$element
                    }, s.resolveMdbLabel = function() {
                        var e = this.$bmdFormGroup.find(n.BMD_LABEL_WILDCARD);
                        return (void 0 === e || 0 === e.length) && (e = this.findMdbLabel(this.config.label.required), void 0 === e || 0 === e.length || e.addClass(this.config.label.className)), e
                    }, s.findMdbLabel = function(t) {
                        void 0 === t && (t = !0);
                        for (var o = null, a = this.config.label.selectors, r = Array.isArray(a), i = 0, a = r ? a : a[Symbol.iterator]();;) {
                            var l;
                            if (r) {
                                if (i >= a.length) break;
                                l = a[i++]
                            } else {
                                if (i = a.next(), i.done) break;
                                l = i.value
                            }
                            var s = l;
                            if (o = e.isFunction(s) ? s(this) : this.$bmdFormGroup.find(s), void 0 !== o && 0 < o.length) break
                        }
                        return 0 === o.length && t && e.error('Failed to find ' + n.BMD_LABEL_WILDCARD + ' within form-group for ' + E.describe(this.$element)), o
                    }, s.findFormGroup = function(t) {
                        void 0 === t && (t = !0);
                        var o = this.$element.closest(n.FORM_GROUP);
                        return 0 === o.length && t && e.error('Failed to find ' + n.FORM_GROUP + ' for ' + E.describe(this.$element)), o
                    }, s.resolveMdbFormGroupSizing = function() {
                        if (this.config.convertInputSizeVariations)
                            for (var e in a) this.$element.hasClass(e) && this.$bmdFormGroup.addClass(a[e])
                    }, s._rejectInvalidComponentMatches = function() {
                        for (var e = this.config.invalidComponentMatches, t = Array.isArray(e), n = 0, e = t ? e : e[Symbol.iterator]();;) {
                            var o;
                            if (t) {
                                if (n >= e.length) break;
                                o = e[n++]
                            } else {
                                if (n = e.next(), n.done) break;
                                o = n.value
                            }
                            var a = o;
                            a.rejectMatch(this.constructor.name, this.$element)
                        }
                    }, s._rejectWithoutRequiredClasses = function() {
                        for (var t = this.config.requiredClasses, n = Array.isArray(t), o = 0, t = n ? t : t[Symbol.iterator]();;) {
                            var a;
                            if (n) {
                                if (o >= t.length) break;
                                a = t[o++]
                            } else {
                                if (o = t.next(), o.done) break;
                                a = o.value
                            }
                            var r = a,
                                i = !1;
                            if (-1 !== r.indexOf('||'))
                                for (var l = r.split('||'), s = l, d = Array.isArray(s), c = 0, s = d ? s : s[Symbol.iterator]();;) {
                                    var _;
                                    if (d) {
                                        if (c >= s.length) break;
                                        _ = s[c++]
                                    } else {
                                        if (c = s.next(), c.done) break;
                                        _ = c.value
                                    }
                                    var p = _;
                                    if (this.$element.hasClass(p)) {
                                        i = !0;
                                        break
                                    }
                                } else this.$element.hasClass(r) && (i = !0);
                            i || e.error(this.constructor.name + ' element: ' + E.describe(this.$element) + ' requires class: ' + r)
                        }
                    }, l
                }(h);
            return i
        }(jQuery),
        C = function(e) {
            var t = {
                    label: {
                        required: !1
                    }
                },
                n = {
                    LABEL: 'label'
                },
                o = function(o) {
                    function a(n, a, r) {
                        var i;
                        return i = o.call(this, n, e.extend(!0, {}, t, a), r) || this, i.decorateMarkup(), i
                    }
                    r(a, o);
                    var i = a.prototype;
                    return i.decorateMarkup = function() {
                        var t = e(this.config.template);
                        this.$element.after(t), !1 !== this.config.ripples && t.bmdRipples()
                    }, i.outerElement = function() {
                        return this.$element.parent().closest('.' + this.outerClass)
                    }, i.rejectWithoutRequiredStructure = function() {
                        E.assert(this.$element, 'label' === !this.$element.parent().prop('tagName'), this.constructor.name + '\'s ' + E.describe(this.$element) + ' parent element should be <label>.'), E.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + '\'s ' + E.describe(this.$element) + ' outer element should have class ' + this.outerClass + '.')
                    }, i.addFocusListener = function() {
                        var e = this;
                        this.$element.closest(n.LABEL).hover(function() {
                            e.addFormGroupFocus()
                        }, function() {
                            e.removeFormGroupFocus()
                        })
                    }, i.addChangeListener = function() {
                        var e = this;
                        this.$element.change(function() {
                            e.$element.blur()
                        })
                    }, a
                }(A);
            return o
        }(jQuery),
        I = function(e) {
            var t = 'checkbox',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    template: '<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'
                },
                l = function(o) {
                    function a(n, a, r) {
                        return void 0 === r && (r = {
                            inputType: t,
                            outerClass: t
                        }), o.call(this, n, e.extend(!0, i, a), r) || this
                    }
                    r(a, o);
                    var l = a.prototype;
                    return l.dispose = function(e) {
                        void 0 === e && (e = n), o.prototype.dispose.call(this, e)
                    }, a.matches = function(e) {
                        return 'checkbox' === e.attr('type')
                    }, a.rejectMatch = function(e, t) {
                        E.assert(this.$element, this.matches(t), e + ' component element ' + E.describe(t) + ' is invalid for type=\'checkbox\'.')
                    }, a._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this),
                                r = o.data(n);
                            r || (r = new a(o, t), o.data(n, r))
                        })
                    }, a
                }(C);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        T = function(e) {
            var t = 'checkboxInline',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    bmdFormGroup: {
                        create: !1,
                        required: !1
                    }
                },
                l = function(t) {
                    function o(n, o, a) {
                        return void 0 === a && (a = {
                            inputType: 'checkbox',
                            outerClass: 'checkbox-inline'
                        }), t.call(this, n, e.extend(!0, {}, i, o), a) || this
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(I);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        N = function(e) {
            var t = 'collapseInline',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    ANY_INPUT: 'input, select, textarea'
                },
                l = {
                    IN: 'in',
                    COLLAPSE: 'collapse',
                    COLLAPSING: 'collapsing',
                    COLLAPSED: 'collapsed',
                    WIDTH: 'width'
                },
                s = {},
                d = function(t) {
                    function o(n, o) {
                        var a;
                        a = t.call(this, n, e.extend(!0, {}, s, o)) || this, a.$bmdFormGroup = a.findMdbFormGroup(!0);
                        var r = n.data('target');
                        a.$collapse = e(r), E.assert(n, 0 === a.$collapse.length, 'Cannot find collapse target for ' + E.describe(n)), E.assert(a.$collapse, !a.$collapse.hasClass(l.COLLAPSE), E.describe(a.$collapse) + ' is expected to have the \'' + l.COLLAPSE + '\' class.  It is being targeted by ' + E.describe(n));
                        var d = a.$bmdFormGroup.find(i.ANY_INPUT);
                        return 0 < d.length && (a.$input = d.first()), a.$collapse.hasClass(l.WIDTH) || a.$collapse.addClass(l.WIDTH), a.$input && (a.$collapse.on('shown.bs.collapse', function() {
                            a.$input.focus()
                        }), a.$input.blur(function() {
                            a.$collapse.collapse('hide')
                        })), a
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n), this.$bmdFormGroup = null, this.$collapse = null, this.$input = null
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(h);
            return e.fn[o] = d._jQueryInterface, e.fn[o].Constructor = d, e.fn[o].noConflict = function() {
                return e.fn[o] = a, d._jQueryInterface
            }, d
        }(jQuery),
        b = function(e) {
            var t = 'file',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {},
                l = {
                    FILE: t,
                    IS_FILE: 'is-file'
                },
                s = {
                    FILENAMES: 'input.form-control[readonly]'
                },
                d = function(t) {
                    function o(n, o) {
                        var a;
                        return a = t.call(this, n, e.extend(!0, i, o)) || this, a.$bmdFormGroup.addClass(l.IS_FILE), a
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, o.matches = function(e) {
                        return 'file' === e.attr('type')
                    }, o.rejectMatch = function(e, t) {
                        E.assert(this.$element, this.matches(t), e + ' component element ' + E.describe(t) + ' is invalid for type=\'file\'.')
                    }, a.outerElement = function() {
                        return this.$element.parent().closest('.' + l.FILE)
                    }, a.rejectWithoutRequiredStructure = function() {
                        E.assert(this.$element, 'label' === !this.outerElement().prop('tagName'), this.constructor.name + '\'s ' + E.describe(this.$element) + ' parent element ' + E.describe(this.outerElement()) + ' should be <label>.'), E.assert(this.$element, !this.outerElement().hasClass(l.FILE), this.constructor.name + '\'s ' + E.describe(this.$element) + ' parent element ' + E.describe(this.outerElement()) + ' should have class .' + l.FILE + '.')
                    }, a.addFocusListener = function() {
                        var e = this;
                        this.$bmdFormGroup.on('focus', function() {
                            e.addFormGroupFocus()
                        }).on('blur', function() {
                            e.removeFormGroupFocus()
                        })
                    }, a.addChangeListener = function() {
                        var t = this;
                        this.$element.on('change', function() {
                            var n = '';
                            e.each(t.$element.files, function(e, t) {
                                n += t.name + '  , '
                            }), n = n.substring(0, n.length - 2), n ? t.addIsFilled() : t.removeIsFilled(), t.$bmdFormGroup.find(s.FILENAMES).val(n)
                        })
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(A);
            return e.fn[o] = d._jQueryInterface, e.fn[o].Constructor = d, e.fn[o].noConflict = function() {
                return e.fn[o] = a, d._jQueryInterface
            }, d
        }(jQuery),
        O = function(e) {
            var t = 'radio',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    template: '<span class=\'bmd-radio\'></span>'
                },
                l = function(o) {
                    function a(n, a, r) {
                        return void 0 === r && (r = {
                            inputType: t,
                            outerClass: t
                        }), o.call(this, n, e.extend(!0, i, a), r) || this
                    }
                    r(a, o);
                    var l = a.prototype;
                    return l.dispose = function(e) {
                        void 0 === e && (e = n), o.prototype.dispose.call(this, e)
                    }, a.matches = function(e) {
                        return 'radio' === e.attr('type')
                    }, a.rejectMatch = function(e, t) {
                        E.assert(this.$element, this.matches(t), e + ' component element ' + E.describe(t) + ' is invalid for type=\'radio\'.')
                    }, a._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this),
                                r = o.data(n);
                            r || (r = new a(o, t), o.data(n, r))
                        })
                    }, a
                }(C);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        y = function(e) {
            var t = 'radioInline',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    bmdFormGroup: {
                        create: !1,
                        required: !1
                    }
                },
                l = function(t) {
                    function o(n, o, a) {
                        return void 0 === a && (a = {
                            inputType: 'radio',
                            outerClass: 'radio-inline'
                        }), t.call(this, n, e.extend(!0, {}, i, o), a) || this
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(O);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        D = function(e) {
            var t = {
                    requiredClasses: [] //'form-control'
                },
                n = function(n) {
                    function o(o, a) {
                        var r;
                        return r = n.call(this, o, e.extend(!0, t, a)) || this, r.isEmpty() && r.removeIsFilled(), r
                    }
                    return r(o, n), o
                }(A);
            return n
        }(jQuery),
        S = function(e) {
            var t = 'select',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    requiredClasses: ['custom-select']  //form-control||
                },
                l = function(t) {
                    function o(n, o) {
                        var a;
                        return a = t.call(this, n, e.extend(!0, i, o)) || this, a.addIsFilled(), a
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, o.matches = function(e) {
                        return 'select' === e.prop('tagName')
                    }, o.rejectMatch = function(e, t) {
                        E.assert(this.$element, this.matches(t), e + ' component element ' + E.describe(t) + ' is invalid for <select>.')
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(D);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        v = function(e) {
            var t = 'switch',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    template: '<span class=\'bmd-switch-track\'></span>'
                },
                l = function(t) {
                    function o(n, o, a) {
                        return void 0 === a && (a = {
                            inputType: 'checkbox',
                            outerClass: 'switch'
                        }), t.call(this, n, e.extend(!0, {}, i, o), a) || this
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(I);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        R = function(e) {
            var t = 'text',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {},
                l = function(t) {
                    function o(n, o) {
                        return t.call(this, n, e.extend(!0, i, o)) || this
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function(e) {
                        void 0 === e && (e = n), t.prototype.dispose.call(this, e)
                    }, o.matches = function(e) {
                        return 'text' === e.attr('type')
                    }, o.rejectMatch = function(e, t) {
                        E.assert(this.$element, this.matches(t), e + ' component element ' + E.describe(t) + ' is invalid for type=\'text\'.')
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(D);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        M = function(e) {
            var t = 'textarea',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {},
                l = function(t) {
                    function o(n, o) {
                        return t.call(this, n, e.extend(!0, i, o)) || this
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, o.matches = function(e) {
                        return 'textarea' === e.prop('tagName')
                    }, o.rejectMatch = function(e, t) {
                        E.assert(this.$element, this.matches(t), e + ' component element ' + E.describe(t) + ' is invalid for <textarea>.')
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(D);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery),
        L = function(e) {
            if ('undefined' == typeof Popper) throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
            var t = 'dropdown',
                n = 'bs.dropdown',
                a = '.' + n,
                r = '.data-api',
                i = e.fn[t],
                s = 27,
                d = 32,
                c = 9,
                _ = /38|40|27/,
                p = {
                    HIDE: 'hide' + a,
                    HIDDEN: 'hidden' + a,
                    SHOW: 'show' + a,
                    SHOWN: 'shown' + a,
                    CLICK: 'click' + a,
                    CLICK_DATA_API: 'click' + a + r,
                    KEYDOWN_DATA_API: 'keydown' + a + r,
                    KEYUP_DATA_API: 'keyup' + a + r,
                    TRANSITION_END: 'transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd'
                },
                m = {
                    DISABLED: 'disabled',
                    SHOW: 'show',
                    SHOWING: 'showing',
                    HIDING: 'hiding',
                    DROPUP: 'dropup',
                    MENURIGHT: 'dropdown-menu-right',
                    MENULEFT: 'dropdown-menu-left'
                },
                g = {
                    DATA_TOGGLE: '[data-toggle="dropdown"]',
                    FORM_CHILD: '.dropdown form',
                    MENU: '.dropdown-menu',
                    NAVBAR_NAV: '.navbar-nav',
                    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
                },
                f = {
                    TOP: 'top-start',
                    TOPEND: 'top-end',
                    BOTTOM: 'bottom-start',
                    BOTTOMEND: 'bottom-end'
                },
                u = {
                    placement: f.BOTTOM,
                    offset: 0,
                    flip: !0
                },
                E = {
                    placement: 'string',
                    offset: '(number|string)',
                    flip: 'boolean'
                },
                h = function() {
                    function r(e, t) {
                        this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var i = r.prototype;
                    return i.toggle = function() {
                        var t = this;
                        if (!(this._element.disabled || e(this._element).hasClass(m.DISABLED))) {
                            var n = r._getParentFromElement(this._element),
                                o = e(this._menu).hasClass(m.SHOW);
                            if (r._clearMenus(), !o) {
                                var a = {
                                        relatedTarget: this._element
                                    },
                                    i = e.Event(p.SHOW, a);
                                if (e(n).trigger(i), !i.isDefaultPrevented()) {
                                    var l = this._element;
                                    e(n).hasClass(m.DROPUP) && (e(this._menu).hasClass(m.MENULEFT) || e(this._menu).hasClass(m.MENURIGHT)) && (l = n), this._popper = new Popper(l, this._menu, this._getPopperConfig()), 'ontouchstart' in document.documentElement && !e(n).closest(g.NAVBAR_NAV).length && e('body').children().on('mouseover', null, e.noop), this._element.focus(), this._element.setAttribute('aria-expanded', !0), e(this._menu).one(p.TRANSITION_END, function() {
                                        e(n).trigger(e.Event(p.SHOWN, a)), e(t._menu).removeClass(m.SHOWING)
                                    }), e(this._menu).addClass(m.SHOW + ' ' + m.SHOWING), e(n).addClass(m.SHOW)
                                }
                            }
                        }
                    }, i.dispose = function() {
                        e.removeData(this._element, n), e(this._element).off(a), this._element = null, this._menu = null, null !== this._popper && this._popper.destroy(), this._popper = null
                    }, i.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, i._addEventListeners = function() {
                        var t = this;
                        e(this._element).on(p.CLICK, function(e) {
                            e.preventDefault(), e.stopPropagation(), t.toggle()
                        })
                    }, i._getConfig = function(n) {
                        var o = e(this._element).data();
                        return void 0 !== o.placement && (o.placement = f[o.placement.toUpperCase()]), n = e.extend({}, this.constructor.Default, e(this._element).data(), n), l.typeCheckConfig(t, n, this.constructor.DefaultType), n
                    }, i._getMenuElement = function() {
                        if (!this._menu) {
                            var t = r._getParentFromElement(this._element);
                            this._menu = e(t).find(g.MENU)[0]
                        }
                        return this._menu
                    }, i._getPlacement = function() {
                        var t = e(this._element).parent(),
                            n = this._config.placement;
                        return t.hasClass(m.DROPUP) || this._config.placement === f.TOP ? (n = f.TOP, e(this._menu).hasClass(m.MENURIGHT) && (n = f.TOPEND)) : e(this._menu).hasClass(m.MENURIGHT) && (n = f.BOTTOMEND), n
                    }, i._detectNavbar = function() {
                        return 0 < e(this._element).closest('.navbar').length
                    }, i._getPopperConfig = function() {
                        var e = {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: {
                                    offset: this._config.offset
                                },
                                flip: {
                                    enabled: this._config.flip
                                }
                            }
                        };
                        return this._inNavbar && (e.modifiers.applyStyle = {
                            enabled: !this._inNavbar
                        }), e
                    }, r._jQueryInterface = function(t) {
                        return this.each(function() {
                            var o = e(this).data(n),
                                a = 'object' == typeof t ? t : null;
                            if (o || (o = new r(this, a), e(this).data(n, o)), 'string' == typeof t) {
                                if (void 0 === o[t]) throw new Error('No method named "' + t + '"');
                                o[t]()
                            }
                        })
                    }, r._clearMenus = function(t) {
                        if (!(t && (t.which === 3 || 'keyup' === t.type && t.which !== c)))
                            for (var o, a = e.makeArray(e(g.DATA_TOGGLE)), l = function(o) {
                                    var i = r._getParentFromElement(a[o]),
                                        l = e(a[o]).data(n),
                                        s = {
                                            relatedTarget: a[o]
                                        };
                                    if (!l) return 'continue';
                                    var d = l._menu;
                                    if (!e(i).hasClass(m.SHOW)) return 'continue';
                                    if (t && ('click' === t.type && /input|textarea/i.test(t.target.tagName) || 'keyup' === t.type && t.which === c) && e.contains(i, t.target)) return 'continue';
                                    var _ = e.Event(p.HIDE, s);
                                    return e(i).trigger(_), _.isDefaultPrevented() ? 'continue' : void(('ontouchstart' in document.documentElement) && e('body').children().off('mouseover', null, e.noop), a[o].setAttribute('aria-expanded', 'false'), e(d).addClass(m.HIDING).removeClass(m.SHOW), e(i).removeClass(m.SHOW), e(d).one(p.TRANSITION_END, function() {
                                        e(i).trigger(e.Event(p.HIDDEN, s)), e(d).removeClass(m.HIDING)
                                    }))
                                }, s = 0; s < a.length; s++) o = l(s), 'continue' === o
                    }, r._getParentFromElement = function(t) {
                        var n, o = l.getSelectorFromElement(t);
                        return o && (n = e(o)[0]), n || t.parentNode
                    }, r._dataApiKeydownHandler = function(t) {
                        if (!(!_.test(t.which) || /button/i.test(t.target.tagName) && t.which === d || /input|textarea/i.test(t.target.tagName)) && (t.preventDefault(), t.stopPropagation(), !(this.disabled || e(this).hasClass(m.DISABLED)))) {
                            var n = r._getParentFromElement(this),
                                o = e(n).hasClass(m.SHOW);
                            if (!o && (t.which !== s || t.which !== d) || o && (t.which === s || t.which === d)) {
                                if (t.which === s) {
                                    var a = e(n).find(g.DATA_TOGGLE)[0];
                                    e(a).trigger('focus')
                                }
                                return void e(this).trigger('click')
                            }
                            var i = e(n).find(g.VISIBLE_ITEMS).get();
                            if (i.length) {
                                var l = i.indexOf(t.target);
                                t.which === 38 && 0 < l && l--, t.which === 40 && l < i.length - 1 && l++, 0 > l && (l = 0), i[l].focus()
                            }
                        }
                    }, o(r, null, [{
                        key: 'VERSION',
                        get: function() {
                            return '4.0.0-beta'
                        }
                    }, {
                        key: 'Default',
                        get: function() {
                            return u
                        }
                    }, {
                        key: 'DefaultType',
                        get: function() {
                            return E
                        }
                    }]), r
                }();
            return e(document).on(p.KEYDOWN_DATA_API, g.DATA_TOGGLE, h._dataApiKeydownHandler).on(p.KEYDOWN_DATA_API, g.MENU, h._dataApiKeydownHandler).on(p.CLICK_DATA_API + ' ' + p.KEYUP_DATA_API, h._clearMenus).on(p.CLICK_DATA_API, g.DATA_TOGGLE, function(t) {
                t.preventDefault(), t.stopPropagation(), h._jQueryInterface.call(e(this), 'toggle')
            }).on(p.CLICK_DATA_API, g.FORM_CHILD, function(t) {
                t.stopPropagation()
            }), e.fn[t] = h._jQueryInterface, e.fn[t].Constructor = h, e.fn[t].noConflict = function() {
                return e.fn[t] = i, h._jQueryInterface
            }, h
        }(jQuery),
        U = function(e) {
            var t = {
                    CANVAS: 'bmd-layout-canvas',
                    CONTAINER: 'bmd-layout-container',
                    BACKDROP: 'bmd-layout-backdrop'
                },
                n = {
                    CANVAS: '.' + t.CANVAS,
                    CONTAINER: '.' + t.CONTAINER,
                    BACKDROP: '.' + t.BACKDROP
                },
                o = {
                    canvas: {
                        create: !0,
                        required: !0,
                        template: '<div class="' + t.CANVAS + '"></div>'
                    },
                    backdrop: {
                        create: !0,
                        required: !0,
                        template: '<div class="' + t.BACKDROP + '"></div>'
                    }
                },
                a = function(t) {
                    function a(n, a, r) {
                        var i;
                        return void 0 === r && (r = {}), i = t.call(this, n, e.extend(!0, {}, o, a), r) || this, i.$container = i.findContainer(!0), i.$backdrop = i.resolveBackdrop(), i.resolveCanvas(), i
                    }
                    r(a, t);
                    var i = a.prototype;
                    return i.dispose = function(e) {
                        t.prototype.dispose.call(this, e), this.$container = null, this.$backdrop = null
                    }, i.resolveCanvas = function() {
                        var e = this.findCanvas(!1);
                        return (void 0 === e || 0 === e.length) && (this.config.canvas.create && this.$container.wrap(this.config.canvas.template), e = this.findCanvas(this.config.canvas.required)), e
                    }, i.findCanvas = function(t, o) {
                        void 0 === t && (t = !0), void 0 === o && (o = this.$container);
                        var a = o.closest(n.CANVAS);
                        return 0 === a.length && t && e.error('Failed to find ' + n.CANVAS + ' for ' + E.describe(o)), a
                    }, i.resolveBackdrop = function() {
                        var e = this.findBackdrop(!1);
                        return (void 0 === e || 0 === e.length) && (this.config.backdrop.create && this.$container.append(this.config.backdrop.template), e = this.findBackdrop(this.config.backdrop.required)), e
                    }, i.findBackdrop = function(t, o) {
                        void 0 === t && (t = !0), void 0 === o && (o = this.$container);
                        var a = o.find('> ' + n.BACKDROP);
                        return 0 === a.length && t && e.error('Failed to find ' + n.BACKDROP + ' for ' + E.describe(o)), a
                    }, i.findContainer = function(t, o) {
                        void 0 === t && (t = !0), void 0 === o && (o = this.$element);
                        var a = o.closest(n.CONTAINER);
                        return 0 === a.length && t && e.error('Failed to find ' + n.CONTAINER + ' for ' + E.describe(o)), a
                    }, a
                }(h);
            return a
        }(jQuery),
        P = function(e) {
            var t = 'drawer',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {
                    ESCAPE: 27
                },
                l = {
                    IN: 'in',
                    DRAWER_IN: 'bmd-drawer-in',
                    DRAWER_OUT: 'bmd-drawer-out',
                    DRAWER: 'bmd-layout-drawer',
                    CONTAINER: 'bmd-layout-container'
                },
                s = {
                    focusSelector: 'a, button, input'
                },
                d = function(t) {
                    function o(n, o) {
                        var a;
                        return a = t.call(this, n, e.extend(!0, {}, s, o)) || this, a.$toggles = e('[data-toggle="drawer"][href="#' + a.$element[0].id + '"], [data-toggle="drawer"][data-target="#' + a.$element[0].id + '"]'), a._addAria(), a.$backdrop.keydown(function(e) {
                            e.which === i.ESCAPE && a.hide()
                        }).click(function() {
                            a.hide()
                        }), a.$element.keydown(function(e) {
                            e.which === i.ESCAPE && a.hide()
                        }), a.$toggles.click(function() {
                            a.toggle()
                        }), a
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n), this.$toggles = null
                    }, a.toggle = function() {
                        this._isOpen() ? this.hide() : this.show()
                    }, a.show = function() {
                        if (!(this._isForcedClosed() || this._isOpen())) {
                            this.$toggles.attr('aria-expanded', !0), this.$element.attr('aria-expanded', !0), this.$element.attr('aria-hidden', !1);
                            var e = this.$element.find(this.config.focusSelector);
                            0 < e.length && e.first().focus(), this.$container.addClass(l.DRAWER_IN), this.$backdrop.addClass(l.IN)
                        }
                    }, a.hide = function() {
                        this._isOpen() && (this.$toggles.attr('aria-expanded', !1), this.$element.attr('aria-expanded', !1), this.$element.attr('aria-hidden', !0), this.$container.removeClass(l.DRAWER_IN), this.$backdrop.removeClass(l.IN))
                    }, a._isOpen = function() {
                        return this.$container.hasClass(l.DRAWER_IN)
                    }, a._isForcedClosed = function() {
                        return this.$container.hasClass(l.DRAWER_OUT)
                    }, a._addAria = function() {
                        var e = this._isOpen();
                        this.$element.attr('aria-expanded', e), this.$element.attr('aria-hidden', e), this.$toggles.length && this.$toggles.attr('aria-expanded', e)
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(U);
            return e.fn[o] = d._jQueryInterface, e.fn[o].Constructor = d, e.fn[o].noConflict = function() {
                return e.fn[o] = a, d._jQueryInterface
            }, d
        }(jQuery),
        w = function(e) {
            var t = 'ripples',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                r = {
                    CONTAINER: 'ripple-container',
                    DECORATOR: 'ripple-decorator'
                },
                l = {
                    CONTAINER: '.' + r.CONTAINER,
                    DECORATOR: '.' + r.DECORATOR
                },
                s = {
                    container: {
                        template: '<div class=\'' + r.CONTAINER + '\'></div>'
                    },
                    decorator: {
                        template: '<div class=\'' + r.DECORATOR + '\'></div>'
                    },
                    trigger: {
                        start: 'mousedown touchstart',
                        end: 'mouseup mouseleave touchend'
                    },
                    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
                    duration: 500
                },
                d = function() {
                    function t(t, n) {
                        var o = this;
                        this.$element = t, this.config = e.extend(!0, {}, s, n), this.$element.on(this.config.trigger.start, function(e) {
                            o._onStartRipple(e)
                        })
                    }
                    var o = t.prototype;
                    return o.dispose = function() {
                        this.$element.data(n, null), this.$element = null, this.$container = null, this.$decorator = null, this.config = null
                    }, o._onStartRipple = function(e) {
                        var t = this;
                        if (!(this._isTouch() && 'mousedown' === e.type)) {
                            this._findOrCreateContainer();
                            var n = this._getRelY(e),
                                o = this._getRelX(e);
                            (n || o) && (this.$decorator.css({
                                left: o,
                                top: n,
                                "background-color": this._getRipplesColor()
                            }), this._forceStyleApplication(), this.rippleOn(), setTimeout(function() {
                                t.rippleEnd()
                            }, this.config.duration), this.$element.on(this.config.trigger.end, function() {
                                t.$decorator && (t.$decorator.data('mousedown', 'off'), 'off' === t.$decorator.data('animating') && t.rippleOut())
                            }))
                        }
                    }, o._findOrCreateContainer = function() {
                        (!this.$container || 0 < !this.$container.length) && (this.$element.append(this.config.container.template), this.$container = this.$element.find(l.CONTAINER)), this.$container.append(this.config.decorator.template), this.$decorator = this.$container.find(l.DECORATOR)
                    }, o._forceStyleApplication = function() {
                        return window.getComputedStyle(this.$decorator[0]).opacity
                    }, o._getRelX = function(e) {
                        var t = this.$container.offset(),
                            n = null;
                        return this._isTouch() ? (e = e.originalEvent, n = 1 === e.touches.length && e.touches[0].pageX - t.left) : n = e.pageX - t.left, n
                    }, o._getRelY = function(e) {
                        var t = this.$container.offset(),
                            n = null;
                        return this._isTouch() ? (e = e.originalEvent, n = 1 === e.touches.length && e.touches[0].pageY - t.top) : n = e.pageY - t.top, n
                    }, o._getRipplesColor = function() {
                        var e = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color;
                        return e
                    }, o._isTouch = function() {
                        return this.config.touchUserAgentRegex.test(navigator.userAgent)
                    }, o.rippleEnd = function() {
                        this.$decorator && (this.$decorator.data('animating', 'off'), 'off' === this.$decorator.data('mousedown') && this.rippleOut(this.$decorator))
                    }, o.rippleOut = function() {
                        var e = this;
                        this.$decorator.off(), E.transitionEndSupported() ? this.$decorator.addClass('ripple-out') : this.$decorator.animate({
                            opacity: 0
                        }, 100, function() {
                            e.$decorator.trigger('transitionend')
                        }), this.$decorator.on(E.transitionEndSelector(), function() {
                            e.$decorator && (e.$decorator.remove(), e.$decorator = null)
                        })
                    }, o.rippleOn = function() {
                        var e = this,
                            t = this._getNewSize();
                        E.transitionEndSupported() ? this.$decorator.css({
                            "-ms-transform": 'scale(' + t + ')',
                            "-moz-transform": 'scale(' + t + ')',
                            "-webkit-transform": 'scale(' + t + ')',
                            transform: 'scale(' + t + ')'
                        }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on') : this.$decorator.animate({
                            width: 2 * i(this.$element.outerWidth(), this.$element.outerHeight()),
                            height: 2 * i(this.$element.outerWidth(), this.$element.outerHeight()),
                            "margin-left": -1 * i(this.$element.outerWidth(), this.$element.outerHeight()),
                            "margin-top": -1 * i(this.$element.outerWidth(), this.$element.outerHeight()),
                            opacity: 0.2
                        }, this.config.duration, function() {
                            e.$decorator.trigger('transitionend')
                        })
                    }, o._getNewSize = function() {
                        return 2.5 * (i(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth())
                    }, t._jQueryInterface = function(o) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new t(a, o), a.data(n, r))
                        })
                    }, t
                }();
            return e.fn[o] = d._jQueryInterface, e.fn[o].Constructor = d, e.fn[o].noConflict = function() {
                return e.fn[o] = a, d._jQueryInterface
            }, d
        }(jQuery),
        k = function(e) {
            var t = 'autofill',
                n = 'bmd.' + t,
                o = 'bmd' + (t.charAt(0).toUpperCase() + t.slice(1)),
                a = e.fn[o],
                i = {},
                l = function(t) {
                    function o(n, o) {
                        var a;
                        return a = t.call(this, n, e.extend(!0, {}, i, o)) || this, a._watchLoading(), a._attachEventHandlers(), a
                    }
                    r(o, t);
                    var a = o.prototype;
                    return a.dispose = function() {
                        t.prototype.dispose.call(this, n)
                    }, a._watchLoading = function() {
                        var e = this;
                        setTimeout(function() {
                            clearInterval(e._onLoading)
                        }, 1e4)
                    }, a._onLoading = function() {
                        setInterval(function() {
                            e('input[type!=checkbox]').each(function(t, n) {
                                var o = e(n);
                                o.val() && o.val() !== o.attr('value') && o.trigger('change')
                            })
                        }, 100)
                    }, a._attachEventHandlers = function() {
                        var t = null;
                        e(document).on('focus', 'input', function(n) {
                            var o = e(n.currentTarget).closest('form').find('input').not('[type=file]');
                            t = setInterval(function() {
                                o.each(function(t, n) {
                                    var o = e(n);
                                    o.val() !== o.attr('value') && o.trigger('change')
                                })
                            }, 100)
                        }).on('blur', '.form-group input', function() {
                            clearInterval(t)
                        })
                    }, o._jQueryInterface = function(t) {
                        return this.each(function() {
                            var a = e(this),
                                r = a.data(n);
                            r || (r = new o(a, t), a.data(n, r))
                        })
                    }, o
                }(h);
            return e.fn[o] = l._jQueryInterface, e.fn[o].Constructor = l, e.fn[o].noConflict = function() {
                return e.fn[o] = a, l._jQueryInterface
            }, l
        }(jQuery);
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = !1;
    (function(t) {
        var e = 'bootstrapMaterialDesign',
            n = 'bmd.' + e,
            o = e,
            a = t.fn[o],
            r = {
                global: {
                    validate: !1,
                    label: {
                        className: 'bmd-label-static'
                    }
                },
                autofill: {
                    selector: 'body'
                },
                checkbox: {
                    selector: '.checkbox > label > input[type=checkbox]'
                },
                checkboxInline: {
                    selector: 'label.checkbox-inline > input[type=checkbox]'
                },
                collapseInline: {
                    selector: '.bmd-collapse-inline [data-toggle="collapse"]'
                },
                drawer: {
                    selector: '.bmd-layout-drawer'
                },
                file: {
                    selector: 'input[type=file]'
                },
                radio: {
                    selector: '.radio > label > input[type=radio]'
                },
                radioInline: {
                    selector: 'label.radio-inline > input[type=radio]'
                },
                ripples: {
                    selector: ['.btn:not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple']
                },
                select: {
                    selector: ['select']
                },
                switch: {
                    selector: '.switch > label > input[type=checkbox]'
                },
                text: {
                    selector: ['input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])']
                },
                textarea: {
                    selector: ['textarea']
                },
                arrive: !0,
                instantiation: ['ripples', 'checkbox', 'checkboxInline', 'collapseInline', 'drawer', 'radio', 'radioInline', 'switch', 'text', 'textarea', 'autofill']
            },
            i = function() {
                function e(e, n) {
                    var o = this;
                    this.$element = e, this.config = t.extend(!0, {}, r, n);
                    for (var a = t(document), i = function(e) {
                            var n = o.config[e];
                            if (n) {
                                var r = o._resolveSelector(n);
                                n = t.extend(!0, {}, o.config.global, n);
                                var i = '' + (e.charAt(0).toUpperCase() + e.slice(1)),
                                    l = 'bmd' + i;
                                try {
                                    t(r)[l](n), document.arrive && o.config.arrive && a.arrive(r, function() {
                                        t(this)[l](n)
                                    })
                                } catch (o) {
                                    var s = 'Failed to instantiate component: $(\'' + r + '\')[' + l + '](' + n + ')';
                                    throw console.error(s, o, '\nSelected elements: ', t(r)), o
                                }
                            }
                        }, l = this.config.instantiation, s = Array.isArray(l), d = 0, l = s ? l : l[Symbol.iterator]();;) {
                        var c;
                        if (s) {
                            if (d >= l.length) break;
                            c = l[d++]
                        } else {
                            if (d = l.next(), d.done) break;
                            c = d.value
                        }
                        var _ = c;
                        i(_)
                    }
                }
                var o = e.prototype;
                return o.dispose = function() {
                    this.$element.data(n, null), this.$element = null, this.config = null
                }, o._resolveSelector = function(e) {
                    var t = e.selector;
                    return Array.isArray(t) && (t = t.join(', ')), t
                }, e._jQueryInterface = function(o) {
                    return this.each(function() {
                        var a = t(this),
                            r = a.data(n);
                        r || (r = new e(a, o), a.data(n, r))
                    })
                }, e
            }();
        return t.fn[o] = i._jQueryInterface, t.fn[o].Constructor = i, t.fn[o].noConflict = function() {
            return t.fn[o] = a, i._jQueryInterface
        }, i
    })(jQuery)
});