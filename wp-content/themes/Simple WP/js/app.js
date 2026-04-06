/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      732: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var s in i)
                      Object.prototype.hasOwnProperty.call(i, s) &&
                        (e[s] = i[s]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            i =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            s = t && "IntersectionObserver" in window,
            n = t && "classList" in document.createElement("p"),
            r = t && window.devicePixelRatio > 1,
            o = {
              elements_selector: ".lazy",
              container: i || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            a = function (t) {
              return e({}, o, t);
            },
            l = function (e, t) {
              var i,
                s = "LazyLoad::Initialized",
                n = new e(t);
              try {
                i = new CustomEvent(s, { detail: { instance: n } });
              } catch (e) {
                (i = document.createEvent("CustomEvent")).initCustomEvent(
                  s,
                  !1,
                  !1,
                  { instance: n }
                );
              }
              window.dispatchEvent(i);
            },
            d = "src",
            c = "srcset",
            u = "sizes",
            h = "poster",
            p = "llOriginalAttrs",
            g = "data",
            m = "loading",
            f = "loaded",
            v = "applied",
            y = "error",
            b = "native",
            w = "data-",
            C = "ll-status",
            S = function (e, t) {
              return e.getAttribute(w + t);
            },
            x = function (e) {
              return S(e, C);
            },
            _ = function (e, t) {
              return (function (e, t, i) {
                var s = "data-ll-status";
                null !== i ? e.setAttribute(s, i) : e.removeAttribute(s);
              })(e, 0, t);
            },
            E = function (e) {
              return _(e, null);
            },
            T = function (e) {
              return null === x(e);
            },
            I = function (e) {
              return x(e) === b;
            },
            L = [m, f, v, y],
            O = function (e, t, i, s) {
              e &&
                (void 0 === s ? (void 0 === i ? e(t) : e(t, i)) : e(t, i, s));
            },
            z = function (e, t) {
              n
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            P = function (e, t) {
              n
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            A = function (e) {
              return e.llTempImage;
            },
            M = function (e, t) {
              if (t) {
                var i = t._observer;
                i && i.unobserve(e);
              }
            },
            $ = function (e, t) {
              e && (e.loadingCount += t);
            },
            k = function (e, t) {
              e && (e.toLoadCount = t);
            },
            B = function (e) {
              for (var t, i = [], s = 0; (t = e.children[s]); s += 1)
                "SOURCE" === t.tagName && i.push(t);
              return i;
            },
            D = function (e, t) {
              var i = e.parentNode;
              i && "PICTURE" === i.tagName && B(i).forEach(t);
            },
            G = function (e, t) {
              B(e).forEach(t);
            },
            V = [d],
            F = [d, h],
            H = [d, c, u],
            N = [g],
            q = function (e) {
              return !!e[p];
            },
            R = function (e) {
              return e[p];
            },
            X = function (e) {
              return delete e[p];
            },
            j = function (e, t) {
              if (!q(e)) {
                var i = {};
                t.forEach(function (t) {
                  i[t] = e.getAttribute(t);
                }),
                  (e[p] = i);
              }
            },
            Y = function (e, t) {
              if (q(e)) {
                var i = R(e);
                t.forEach(function (t) {
                  !(function (e, t, i) {
                    i ? e.setAttribute(t, i) : e.removeAttribute(t);
                  })(e, t, i[t]);
                });
              }
            },
            W = function (e, t, i) {
              z(e, t.class_loading),
                _(e, m),
                i && ($(i, 1), O(t.callback_loading, e, i));
            },
            Z = function (e, t, i) {
              i && e.setAttribute(t, i);
            },
            U = function (e, t) {
              Z(e, u, S(e, t.data_sizes)),
                Z(e, c, S(e, t.data_srcset)),
                Z(e, d, S(e, t.data_src));
            },
            K = {
              IMG: function (e, t) {
                D(e, function (e) {
                  j(e, H), U(e, t);
                }),
                  j(e, H),
                  U(e, t);
              },
              IFRAME: function (e, t) {
                j(e, V), Z(e, d, S(e, t.data_src));
              },
              VIDEO: function (e, t) {
                G(e, function (e) {
                  j(e, V), Z(e, d, S(e, t.data_src));
                }),
                  j(e, F),
                  Z(e, h, S(e, t.data_poster)),
                  Z(e, d, S(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                j(e, N), Z(e, g, S(e, t.data_src));
              },
            },
            Q = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            J = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                O(e.callback_finish, t);
            },
            ee = function (e, t, i) {
              e.addEventListener(t, i), (e.llEvLisnrs[t] = i);
            },
            te = function (e, t, i) {
              e.removeEventListener(t, i);
            },
            ie = function (e) {
              return !!e.llEvLisnrs;
            },
            se = function (e) {
              if (ie(e)) {
                var t = e.llEvLisnrs;
                for (var i in t) {
                  var s = t[i];
                  te(e, i, s);
                }
                delete e.llEvLisnrs;
              }
            },
            ne = function (e, t, i) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                $(i, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(i),
                P(e, t.class_loading),
                t.unobserve_completed && M(e, i);
            },
            re = function (e, t, i) {
              var s = A(e) || e;
              ie(s) ||
                (function (e, t, i) {
                  ie(e) || (e.llEvLisnrs = {});
                  var s = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  ee(e, s, t), ee(e, "error", i);
                })(
                  s,
                  function (n) {
                    !(function (e, t, i, s) {
                      var n = I(t);
                      ne(t, i, s),
                        z(t, i.class_loaded),
                        _(t, f),
                        O(i.callback_loaded, t, s),
                        n || J(i, s);
                    })(0, e, t, i),
                      se(s);
                  },
                  function (n) {
                    !(function (e, t, i, s) {
                      var n = I(t);
                      ne(t, i, s),
                        z(t, i.class_error),
                        _(t, y),
                        O(i.callback_error, t, s),
                        n || J(i, s);
                    })(0, e, t, i),
                      se(s);
                  }
                );
            },
            oe = function (e, t, i) {
              !(function (e) {
                e.llTempImage = document.createElement("IMG");
              })(e),
                re(e, t, i),
                (function (e) {
                  q(e) || (e[p] = { backgroundImage: e.style.backgroundImage });
                })(e),
                (function (e, t, i) {
                  var s = S(e, t.data_bg),
                    n = S(e, t.data_bg_hidpi),
                    o = r && n ? n : s;
                  o &&
                    ((e.style.backgroundImage = 'url("'.concat(o, '")')),
                    A(e).setAttribute(d, o),
                    W(e, t, i));
                })(e, t, i),
                (function (e, t, i) {
                  var s = S(e, t.data_bg_multi),
                    n = S(e, t.data_bg_multi_hidpi),
                    o = r && n ? n : s;
                  o &&
                    ((e.style.backgroundImage = o),
                    (function (e, t, i) {
                      z(e, t.class_applied),
                        _(e, v),
                        i &&
                          (t.unobserve_completed && M(e, t),
                          O(t.callback_applied, e, i));
                    })(e, t, i));
                })(e, t, i);
            },
            ae = function (e, t, i) {
              !(function (e) {
                return Q.indexOf(e.tagName) > -1;
              })(e)
                ? oe(e, t, i)
                : (function (e, t, i) {
                    re(e, t, i),
                      (function (e, t, i) {
                        var s = K[e.tagName];
                        s && (s(e, t), W(e, t, i));
                      })(e, t, i);
                  })(e, t, i);
            },
            le = function (e) {
              e.removeAttribute(d), e.removeAttribute(c), e.removeAttribute(u);
            },
            de = function (e) {
              D(e, function (e) {
                Y(e, H);
              }),
                Y(e, H);
            },
            ce = {
              IMG: de,
              IFRAME: function (e) {
                Y(e, V);
              },
              VIDEO: function (e) {
                G(e, function (e) {
                  Y(e, V);
                }),
                  Y(e, F),
                  e.load();
              },
              OBJECT: function (e) {
                Y(e, N);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = ce[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (q(e)) {
                        var t = R(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  T(e) ||
                    I(e) ||
                    (P(e, t.class_entered),
                    P(e, t.class_exited),
                    P(e, t.class_applied),
                    P(e, t.class_loading),
                    P(e, t.class_loaded),
                    P(e, t.class_error));
                })(e, t),
                E(e),
                X(e);
            },
            he = ["IMG", "IFRAME", "VIDEO"],
            pe = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            ge = function (e, t, i) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, i, s) {
                      var n = (function (e) {
                        return L.indexOf(x(e)) >= 0;
                      })(e);
                      _(e, "entered"),
                        z(e, i.class_entered),
                        P(e, i.class_exited),
                        (function (e, t, i) {
                          t.unobserve_entered && M(e, i);
                        })(e, i, s),
                        O(i.callback_enter, e, t, s),
                        n || ae(e, i, s);
                    })(e.target, e, t, i)
                  : (function (e, t, i, s) {
                      T(e) ||
                        (z(e, i.class_exited),
                        (function (e, t, i, s) {
                          i.cancel_on_exit &&
                            (function (e) {
                              return x(e) === m;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (se(e),
                            (function (e) {
                              D(e, function (e) {
                                le(e);
                              }),
                                le(e);
                            })(e),
                            de(e),
                            P(e, i.class_loading),
                            $(s, -1),
                            E(e),
                            O(i.callback_cancel, e, t, s));
                        })(e, t, i, s),
                        O(i.callback_exit, e, t, s));
                    })(e.target, e, t, i);
              });
            },
            me = function (e) {
              return Array.prototype.slice.call(e);
            },
            fe = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ve = function (e) {
              return (function (e) {
                return x(e) === y;
              })(e);
            },
            ye = function (e, t) {
              return (function (e) {
                return me(e).filter(T);
              })(e || fe(t));
            },
            be = function (e, i) {
              var n = a(e);
              (this._settings = n),
                (this.loadingCount = 0),
                (function (e, t) {
                  s &&
                    !pe(e) &&
                    (t._observer = new IntersectionObserver(
                      function (i) {
                        ge(i, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e)
                    ));
                })(n, this),
                (function (e, i) {
                  t &&
                    window.addEventListener("online", function () {
                      !(function (e, t) {
                        var i;
                        ((i = fe(e)), me(i).filter(ve)).forEach(function (t) {
                          P(t, e.class_error), E(t);
                        }),
                          t.update();
                      })(e, i);
                    });
                })(n, this),
                this.update(i);
            };
          return (
            (be.prototype = {
              update: function (e) {
                var t,
                  n,
                  r = this._settings,
                  o = ye(e, r);
                k(this, o.length),
                  !i && s
                    ? pe(r)
                      ? (function (e, t, i) {
                          e.forEach(function (e) {
                            -1 !== he.indexOf(e.tagName) &&
                              (function (e, t, i) {
                                e.setAttribute("loading", "lazy"),
                                  re(e, t, i),
                                  (function (e, t) {
                                    var i = K[e.tagName];
                                    i && i(e, t);
                                  })(e, t),
                                  _(e, b);
                              })(e, t, i);
                          }),
                            k(i, 0);
                        })(o, r, this)
                      : ((n = o),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, n))
                    : this.loadAll(o);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  fe(this._settings).forEach(function (e) {
                    X(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  i = this._settings;
                ye(e, i).forEach(function (e) {
                  M(e, t), ae(e, i, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                fe(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (be.load = function (e, t) {
              var i = a(t);
              ae(e, i);
            }),
            (be.resetStatus = function (e) {
              E(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var i, s = 0; (i = t[s]); s += 1) l(e, i);
                  else l(e, t);
              })(be, window.lazyLoadOptions),
            be
          );
        })();
      },
    },
    t = {};
  function i(s) {
    var n = t[s];
    if (void 0 !== n) return n.exports;
    var r = (t[s] = { exports: {} });
    return e[s].call(r.exports, r, r.exports, i), r.exports;
  }
  (() => {
    "use strict";
    function e(e) {
      this.type = e;
    }
    (e.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          i = t.dataset.da.trim().split(","),
          s = {};
        (s.element = t),
          (s.parent = t.parentNode),
          (s.destination = document.querySelector(i[0].trim())),
          (s.breakpoint = i[1] ? i[1].trim() : "48"),
          (s.place = i[2] ? i[2].trim() : "last"),
          (s.index = this.indexInParent(s.parent, s.element)),
          this.оbjects.push(s);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "em)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, i) {
            return Array.prototype.indexOf.call(i, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const i = this.mediaQueries[t],
          s = String.prototype.split.call(i, ","),
          n = window.matchMedia(s[0]),
          r = s[1],
          o = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        n.addListener(function () {
          e.mediaHandler(n, o);
        }),
          this.mediaHandler(n, o);
      }
    }),
      (e.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const i = t[e];
            (i.index = this.indexInParent(i.parent, i.element)),
              this.moveTo(i.place, i.element, i.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const i = t[e];
            i.element.classList.contains(this.daClassname) &&
              this.moveBack(i.parent, i.element, i.index);
          }
      }),
      (e.prototype.moveTo = function (e, t, i) {
        t.classList.add(this.daClassname),
          "last" === e || e >= i.children.length
            ? i.insertAdjacentElement("beforeend", t)
            : "first" !== e
            ? i.children[e].insertAdjacentElement("beforebegin", t)
            : i.insertAdjacentElement("afterbegin", t);
      }),
      (e.prototype.moveBack = function (e, t, i) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[i]
            ? e.children[i].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (e.prototype.indexInParent = function (e, t) {
        const i = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(i, t);
      }),
      (e.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    new e("max").init();
    class t {
      constructor(e) {
        (this.isOpen = !1),
          (this.targetOpen = { selector: !1, element: !1 }),
          (this.previousOpen = { selector: !1, element: !1 }),
          (this.lastClosed = { selector: !1, element: !1 }),
          (this._dataValue = !1),
          (this.hash = !1),
          (this._reopen = !1),
          (this._selectorOpen = !1),
          (this.lastFocusEl = !1),
          (this._focusEl = [
            "a[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "button:not([disabled]):not([aria-hidden])",
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "area[href]",
            "iframe",
            "object",
            "embed",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ]),
          (this.options = Object.assign(
            {
              logging: !0,
              init: !0,
              attributeOpenButton: "data-popup",
              attributeCloseButton: "data-close",
              fixElementSelector: "[data-lp]",
              youtubeAttribute: "data-youtube",
              setAutoplayYoutube: !0,
              classes: {
                popup: "popup",
                popupContent: "popup__content",
                popupActive: "popup_show",
                bodyActive: "popup-show",
                popupVideo: "popup__video",
              },
              focusCatch: !0,
              closeEsc: !0,
              bodyLock: !0,
              bodyLockDelay: 500,
              hashSettings: { location: !0, goHash: !0 },
              on: {
                beforeOpen: function () {},
                afterOpen: function () {},
                beforeClose: function () {},
                afterClose: function () {},
              },
            },
            e
          )),
          this.options.init && this.initPopups();
      }
      initPopups() {
        this.eventsPopup();
      }
      eventsPopup() {
        document.addEventListener(
          "click",
          function (e) {
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (t)
              return (
                e.preventDefault(),
                (this._dataValue = t.getAttribute(
                  this.options.attributeOpenButton
                )
                  ? t.getAttribute(this.options.attributeOpenButton)
                  : "error"),
                "error" !== this._dataValue
                  ? (this.isOpen || (this.lastFocusEl = t),
                    (this.targetOpen.selector = `${this._dataValue}`),
                    (this._selectorOpen = !0),
                    void this.open())
                  : void this.popupLogging(
                      `Не заполнен атрибут у ${t.classList}`
                    )
              );
            return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
              (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                this.isOpen)
              ? (e.preventDefault(), void this.close())
              : void 0;
          }.bind(this)
        ),
          document.addEventListener(
            "keydown",
            function (e) {
              if (
                this.options.closeEsc &&
                27 == e.which &&
                "Escape" === e.code &&
                this.isOpen
              )
                return e.preventDefault(), void this.close();
              this.options.focusCatch &&
                9 == e.which &&
                this.isOpen &&
                this._focusCatch(e);
            }.bind(this)
          ),
          document.querySelector("form[data-ajax],form[data-dev]") &&
            document.addEventListener(
              "formSent",
              function (e) {
                const t = e.detail.form.dataset.popupMessage;
                t && this.open(t);
              }.bind(this)
            ),
          this.options.hashSettings.goHash &&
            (window.addEventListener(
              "hashchange",
              function () {
                window.location.hash
                  ? this._openToHash()
                  : this.close(this.targetOpen.selector);
              }.bind(this)
            ),
            window.addEventListener(
              "load",
              function () {
                window.location.hash && this._openToHash();
              }.bind(this)
            ));
      }
      open(e) {
        if (
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
          ) {
            const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                this.options.youtubeAttribute
              )}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
            t.setAttribute("allow", `${i}; encrypted-media`),
              t.setAttribute("src", e),
              this.targetOpen.element.querySelector(
                `.${this.options.classes.popupVideo}`
              ) &&
                this.targetOpen.element
                  .querySelector(`.${this.options.classes.popupVideo}`)
                  .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive
            ),
            document.body.classList.add(this.options.classes.bodyActive),
            this._reopen ? (this._reopen = !1) : o(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } })
            );
        } else
          this.popupLogging(
            "Такого попапа нет. Проверьте корректность ввода. "
          );
      }
      close(e) {
        e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          (this.previousOpen.selector = e),
          this.isOpen &&
            r &&
            (this.options.on.beforeClose(this),
            this.targetOpen.element.hasAttribute(
              this.options.youtubeAttribute
            ) &&
              this.targetOpen.element.querySelector(
                `.${this.options.classes.popupVideo}`
              ) &&
              (this.targetOpen.element.querySelector(
                `.${this.options.classes.popupVideo}`
              ).innerHTML = ""),
            this.previousOpen.element.classList.remove(
              this.options.classes.popupActive
            ),
            this.previousOpen.element.setAttribute("aria-hidden", "true"),
            this._reopen ||
              (document.body.classList.remove(this.options.classes.bodyActive),
              o(),
              (this.isOpen = !1)),
            this._removeHash(),
            this._selectorOpen &&
              ((this.lastClosed.selector = this.previousOpen.selector),
              (this.lastClosed.element = this.previousOpen.element)),
            this.options.on.afterClose(this),
            setTimeout(() => {
              this._focusTrap();
            }, 50));
      }
      _getHash() {
        this.options.hashSettings.location &&
          (this.hash = this.targetOpen.selector.includes("#")
            ? this.targetOpen.selector
            : this.targetOpen.selector.replace(".", "#"));
      }
      _openToHash() {
        let e = document.querySelector(
          `.${window.location.hash.replace("#", "")}`
        )
          ? `.${window.location.hash.replace("#", "")}`
          : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
        document.querySelector(
          `[${this.options.attributeOpenButton}="${e}"]`
        ) &&
          e &&
          this.open(e);
      }
      _setHash() {
        history.pushState("", "", this.hash);
      }
      _removeHash() {
        history.pushState("", "", window.location.href.split("#")[0]);
      }
      _focusCatch(e) {
        const t = this.targetOpen.element.querySelectorAll(this._focusEl),
          i = Array.prototype.slice.call(t),
          s = i.indexOf(document.activeElement);
        e.shiftKey && 0 === s && (i[i.length - 1].focus(), e.preventDefault()),
          e.shiftKey ||
            s !== i.length - 1 ||
            (i[0].focus(), e.preventDefault());
      }
      _focusTrap() {
        const e = this.previousOpen.element.querySelectorAll(this._focusEl);
        !this.isOpen && this.lastFocusEl
          ? this.lastFocusEl.focus()
          : e[0].focus();
      }
    }
    let s = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          s.Android() || s.BlackBerry() || s.iOS() || s.Opera() || s.Windows()
        );
      },
    };
    function n() {
      if (location.hash) return location.hash.replace("#", "");
    }
    let r = !0,
      o = (e = 500) => {
        document.documentElement.classList.contains("lock") ? a(e) : l(e);
      },
      a = (e = 500) => {
        let t = document.querySelector("body");
        if (r) {
          let i = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < i.length; e++) {
              i[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e);
        }
      },
      l = (e = 500) => {
        let t = document.querySelector("body");
        if (r) {
          let i = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e);
        }
      };
    function d(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    let c = (e, t = !1, i = 500, s = 0) => {
      const n = document.querySelector(e);
      if (n) {
        let r = "",
          o = 0;
        t &&
          ((r = "header.header"), (o = document.querySelector(r).offsetHeight));
        let l = {
          speedAsDuration: !0,
          speed: i,
          header: r,
          offset: s,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (a(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(n, "", l);
        else {
          let e = n.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: o ? e - o : e, behavior: "smooth" });
        }
        d(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else d(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    const u = { selectModule: null };
    let h = {
      getErrors(e) {
        let t = 0,
          i = e.querySelectorAll("*[data-required]");
        return (
          i.length &&
            i.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : ("checkbox" !== e.type || e.checked) && e.value
            ? this.removeError(e)
            : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.parentElement.classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error")
            );
      },
      formClean(e) {
        e.reset(),
          setTimeout(() => {
            let t = e.querySelectorAll("input,textarea");
            for (let e = 0; e < t.length; e++) {
              const i = t[e];
              i.parentElement.classList.remove("_form-focus"),
                i.classList.remove("_form-focus"),
                h.removeError(i),
                (i.placeholder = i.dataset.placeholder);
            }
            let i = e.querySelectorAll(".checkbox__input");
            if (i.length > 0)
              for (let e = 0; e < i.length; e++) {
                i[e].checked = !1;
              }
            if (u.selectModule) {
              let t = e.querySelectorAll(".select");
              if (t.length)
                for (let e = 0; e < t.length; e++) {
                  const i = t[e].querySelector("select");
                  u.selectModule.selectBuild(i);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function p(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function g(e = {}, t = {}) {
      Object.keys(t).forEach((i) => {
        void 0 === e[i]
          ? (e[i] = t[i])
          : p(t[i]) && p(e[i]) && Object.keys(t[i]).length > 0 && g(e[i], t[i]);
      });
    }
    const m = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function f() {
      const e = "undefined" != typeof document ? document : {};
      return g(e, m), e;
    }
    const v = {
      document: m,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function y() {
      const e = "undefined" != typeof window ? window : {};
      return g(e, v), e;
    }
    class b extends Array {
      constructor(e) {
        "number" == typeof e
          ? super(e)
          : (super(...(e || [])),
            (function (e) {
              const t = e.__proto__;
              Object.defineProperty(e, "__proto__", {
                get: () => t,
                set(e) {
                  t.__proto__ = e;
                },
              });
            })(this));
      }
    }
    function w(e = []) {
      const t = [];
      return (
        e.forEach((e) => {
          Array.isArray(e) ? t.push(...w(e)) : t.push(e);
        }),
        t
      );
    }
    function C(e, t) {
      return Array.prototype.filter.call(e, t);
    }
    function S(e, t) {
      const i = y(),
        s = f();
      let n = [];
      if (!t && e instanceof b) return e;
      if (!e) return new b(n);
      if ("string" == typeof e) {
        const i = e.trim();
        if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
          let e = "div";
          0 === i.indexOf("<li") && (e = "ul"),
            0 === i.indexOf("<tr") && (e = "tbody"),
            (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
            0 === i.indexOf("<tbody") && (e = "table"),
            0 === i.indexOf("<option") && (e = "select");
          const t = s.createElement(e);
          t.innerHTML = i;
          for (let e = 0; e < t.childNodes.length; e += 1)
            n.push(t.childNodes[e]);
        } else
          n = (function (e, t) {
            if ("string" != typeof e) return [e];
            const i = [],
              s = t.querySelectorAll(e);
            for (let e = 0; e < s.length; e += 1) i.push(s[e]);
            return i;
          })(e.trim(), t || s);
      } else if (e.nodeType || e === i || e === s) n.push(e);
      else if (Array.isArray(e)) {
        if (e instanceof b) return e;
        n = e;
      }
      return new b(
        (function (e) {
          const t = [];
          for (let i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
          return t;
        })(n)
      );
    }
    S.fn = b.prototype;
    const x = "resize scroll".split(" ");
    function _(e) {
      return function (...t) {
        if (void 0 === t[0]) {
          for (let t = 0; t < this.length; t += 1)
            x.indexOf(e) < 0 &&
              (e in this[t] ? this[t][e]() : S(this[t]).trigger(e));
          return this;
        }
        return this.on(e, ...t);
      };
    }
    _("click"),
      _("blur"),
      _("focus"),
      _("focusin"),
      _("focusout"),
      _("keyup"),
      _("keydown"),
      _("keypress"),
      _("submit"),
      _("change"),
      _("mousedown"),
      _("mousemove"),
      _("mouseup"),
      _("mouseenter"),
      _("mouseleave"),
      _("mouseout"),
      _("mouseover"),
      _("touchstart"),
      _("touchend"),
      _("touchmove"),
      _("resize"),
      _("scroll");
    const E = {
      addClass: function (...e) {
        const t = w(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.add(...t);
          }),
          this
        );
      },
      removeClass: function (...e) {
        const t = w(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.remove(...t);
          }),
          this
        );
      },
      hasClass: function (...e) {
        const t = w(e.map((e) => e.split(" ")));
        return (
          C(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
            .length > 0
        );
      },
      toggleClass: function (...e) {
        const t = w(e.map((e) => e.split(" ")));
        this.forEach((e) => {
          t.forEach((t) => {
            e.classList.toggle(t);
          });
        });
      },
      attr: function (e, t) {
        if (1 === arguments.length && "string" == typeof e)
          return this[0] ? this[0].getAttribute(e) : void 0;
        for (let i = 0; i < this.length; i += 1)
          if (2 === arguments.length) this[i].setAttribute(e, t);
          else
            for (const t in e)
              (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
        return this;
      },
      removeAttr: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
        return this;
      },
      transform: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
        return this;
      },
      transition: function (e) {
        for (let t = 0; t < this.length; t += 1)
          this[t].style.transitionDuration =
            "string" != typeof e ? `${e}ms` : e;
        return this;
      },
      on: function (...e) {
        let [t, i, s, n] = e;
        function r(e) {
          const t = e.target;
          if (!t) return;
          const n = e.target.dom7EventData || [];
          if ((n.indexOf(e) < 0 && n.unshift(e), S(t).is(i))) s.apply(t, n);
          else {
            const e = S(t).parents();
            for (let t = 0; t < e.length; t += 1)
              S(e[t]).is(i) && s.apply(e[t], n);
          }
        }
        function o(e) {
          const t = (e && e.target && e.target.dom7EventData) || [];
          t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
        }
        "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
          n || (n = !1);
        const a = t.split(" ");
        let l;
        for (let e = 0; e < this.length; e += 1) {
          const t = this[e];
          if (i)
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                t.dom7LiveListeners[e].push({ listener: s, proxyListener: r }),
                t.addEventListener(e, r, n);
            }
          else
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7Listeners || (t.dom7Listeners = {}),
                t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                t.dom7Listeners[e].push({ listener: s, proxyListener: o }),
                t.addEventListener(e, o, n);
            }
        }
        return this;
      },
      off: function (...e) {
        let [t, i, s, n] = e;
        "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
          n || (n = !1);
        const r = t.split(" ");
        for (let e = 0; e < r.length; e += 1) {
          const t = r[e];
          for (let e = 0; e < this.length; e += 1) {
            const r = this[e];
            let o;
            if (
              (!i && r.dom7Listeners
                ? (o = r.dom7Listeners[t])
                : i && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
              o && o.length)
            )
              for (let e = o.length - 1; e >= 0; e -= 1) {
                const i = o[e];
                (s && i.listener === s) ||
                (s &&
                  i.listener &&
                  i.listener.dom7proxy &&
                  i.listener.dom7proxy === s)
                  ? (r.removeEventListener(t, i.proxyListener, n),
                    o.splice(e, 1))
                  : s ||
                    (r.removeEventListener(t, i.proxyListener, n),
                    o.splice(e, 1));
              }
          }
        }
        return this;
      },
      trigger: function (...e) {
        const t = y(),
          i = e[0].split(" "),
          s = e[1];
        for (let n = 0; n < i.length; n += 1) {
          const r = i[n];
          for (let i = 0; i < this.length; i += 1) {
            const n = this[i];
            if (t.CustomEvent) {
              const i = new t.CustomEvent(r, {
                detail: s,
                bubbles: !0,
                cancelable: !0,
              });
              (n.dom7EventData = e.filter((e, t) => t > 0)),
                n.dispatchEvent(i),
                (n.dom7EventData = []),
                delete n.dom7EventData;
            }
          }
        }
        return this;
      },
      transitionEnd: function (e) {
        const t = this;
        return (
          e &&
            t.on("transitionend", function i(s) {
              s.target === this && (e.call(this, s), t.off("transitionend", i));
            }),
          this
        );
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue("margin-right")) +
              parseFloat(e.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue("margin-top")) +
              parseFloat(e.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      styles: function () {
        const e = y();
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
      offset: function () {
        if (this.length > 0) {
          const e = y(),
            t = f(),
            i = this[0],
            s = i.getBoundingClientRect(),
            n = t.body,
            r = i.clientTop || n.clientTop || 0,
            o = i.clientLeft || n.clientLeft || 0,
            a = i === e ? e.scrollY : i.scrollTop,
            l = i === e ? e.scrollX : i.scrollLeft;
          return { top: s.top + a - r, left: s.left + l - o };
        }
        return null;
      },
      css: function (e, t) {
        const i = y();
        let s;
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (s = 0; s < this.length; s += 1)
              for (const t in e) this[s].style[t] = e[t];
            return this;
          }
          if (this[0])
            return i.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        return e
          ? (this.forEach((t, i) => {
              e.apply(t, [t, i]);
            }),
            this)
          : this;
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null;
        for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
        return this;
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
        return this;
      },
      is: function (e) {
        const t = y(),
          i = f(),
          s = this[0];
        let n, r;
        if (!s || void 0 === e) return !1;
        if ("string" == typeof e) {
          if (s.matches) return s.matches(e);
          if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
          if (s.msMatchesSelector) return s.msMatchesSelector(e);
          for (n = S(e), r = 0; r < n.length; r += 1) if (n[r] === s) return !0;
          return !1;
        }
        if (e === i) return s === i;
        if (e === t) return s === t;
        if (e.nodeType || e instanceof b) {
          for (n = e.nodeType ? [e] : e, r = 0; r < n.length; r += 1)
            if (n[r] === s) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        let e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        const t = this.length;
        if (e > t - 1) return S([]);
        if (e < 0) {
          const i = t + e;
          return S(i < 0 ? [] : [this[i]]);
        }
        return S([this[e]]);
      },
      append: function (...e) {
        let t;
        const i = f();
        for (let s = 0; s < e.length; s += 1) {
          t = e[s];
          for (let e = 0; e < this.length; e += 1)
            if ("string" == typeof t) {
              const s = i.createElement("div");
              for (s.innerHTML = t; s.firstChild; )
                this[e].appendChild(s.firstChild);
            } else if (t instanceof b)
              for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
            else this[e].appendChild(t);
        }
        return this;
      },
      prepend: function (e) {
        const t = f();
        let i, s;
        for (i = 0; i < this.length; i += 1)
          if ("string" == typeof e) {
            const n = t.createElement("div");
            for (n.innerHTML = e, s = n.childNodes.length - 1; s >= 0; s -= 1)
              this[i].insertBefore(n.childNodes[s], this[i].childNodes[0]);
          } else if (e instanceof b)
            for (s = 0; s < e.length; s += 1)
              this[i].insertBefore(e[s], this[i].childNodes[0]);
          else this[i].insertBefore(e, this[i].childNodes[0]);
        return this;
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && S(this[0].nextElementSibling).is(e)
              ? S([this[0].nextElementSibling])
              : S([])
            : this[0].nextElementSibling
            ? S([this[0].nextElementSibling])
            : S([])
          : S([]);
      },
      nextAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return S([]);
        for (; i.nextElementSibling; ) {
          const s = i.nextElementSibling;
          e ? S(s).is(e) && t.push(s) : t.push(s), (i = s);
        }
        return S(t);
      },
      prev: function (e) {
        if (this.length > 0) {
          const t = this[0];
          return e
            ? t.previousElementSibling && S(t.previousElementSibling).is(e)
              ? S([t.previousElementSibling])
              : S([])
            : t.previousElementSibling
            ? S([t.previousElementSibling])
            : S([]);
        }
        return S([]);
      },
      prevAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return S([]);
        for (; i.previousElementSibling; ) {
          const s = i.previousElementSibling;
          e ? S(s).is(e) && t.push(s) : t.push(s), (i = s);
        }
        return S(t);
      },
      parent: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1)
          null !== this[i].parentNode &&
            (e
              ? S(this[i].parentNode).is(e) && t.push(this[i].parentNode)
              : t.push(this[i].parentNode));
        return S(t);
      },
      parents: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          let s = this[i].parentNode;
          for (; s; )
            e ? S(s).is(e) && t.push(s) : t.push(s), (s = s.parentNode);
        }
        return S(t);
      },
      closest: function (e) {
        let t = this;
        return void 0 === e ? S([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const s = this[i].querySelectorAll(e);
          for (let e = 0; e < s.length; e += 1) t.push(s[e]);
        }
        return S(t);
      },
      children: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const s = this[i].children;
          for (let i = 0; i < s.length; i += 1)
            (e && !S(s[i]).is(e)) || t.push(s[i]);
        }
        return S(t);
      },
      filter: function (e) {
        return S(C(this, e));
      },
      remove: function () {
        for (let e = 0; e < this.length; e += 1)
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      },
    };
    Object.keys(E).forEach((e) => {
      Object.defineProperty(S.fn, e, { value: E[e], writable: !0 });
    });
    const T = S;
    function I(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function L() {
      return Date.now();
    }
    function O(e, t) {
      void 0 === t && (t = "x");
      const i = y();
      let s, n, r;
      const o = (function (e) {
        const t = y();
        let i;
        return (
          t.getComputedStyle && (i = t.getComputedStyle(e, null)),
          !i && e.currentStyle && (i = e.currentStyle),
          i || (i = e.style),
          i
        );
      })(e);
      return (
        i.WebKitCSSMatrix
          ? ((n = o.transform || o.webkitTransform),
            n.split(",").length > 6 &&
              (n = n
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (r = new i.WebKitCSSMatrix("none" === n ? "" : n)))
          : ((r =
              o.MozTransform ||
              o.OTransform ||
              o.MsTransform ||
              o.msTransform ||
              o.transform ||
              o
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (s = r.toString().split(","))),
        "x" === t &&
          (n = i.WebKitCSSMatrix
            ? r.m41
            : 16 === s.length
            ? parseFloat(s[12])
            : parseFloat(s[4])),
        "y" === t &&
          (n = i.WebKitCSSMatrix
            ? r.m42
            : 16 === s.length
            ? parseFloat(s[13])
            : parseFloat(s[5])),
        n || 0
      );
    }
    function z(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function P(e) {
      return "undefined" != typeof window && void 0 !== window.HTMLElement
        ? e instanceof HTMLElement
        : e && (1 === e.nodeType || 11 === e.nodeType);
    }
    function A() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let i = 1; i < arguments.length; i += 1) {
        const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (null != s && !P(s)) {
          const i = Object.keys(Object(s)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, n = i.length; t < n; t += 1) {
            const n = i[t],
              r = Object.getOwnPropertyDescriptor(s, n);
            void 0 !== r &&
              r.enumerable &&
              (z(e[n]) && z(s[n])
                ? s[n].__swiper__
                  ? (e[n] = s[n])
                  : A(e[n], s[n])
                : !z(e[n]) && z(s[n])
                ? ((e[n] = {}), s[n].__swiper__ ? (e[n] = s[n]) : A(e[n], s[n]))
                : (e[n] = s[n]));
          }
        }
      }
      return e;
    }
    function M(e, t, i) {
      e.style.setProperty(t, i);
    }
    function $(e) {
      let { swiper: t, targetPosition: i, side: s } = e;
      const n = y(),
        r = -t.translate;
      let o,
        a = null;
      const l = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        n.cancelAnimationFrame(t.cssModeFrameID);
      const d = i > r ? "next" : "prev",
        c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
        u = () => {
          (o = new Date().getTime()), null === a && (a = o);
          const e = Math.max(Math.min((o - a) / l, 1), 0),
            d = 0.5 - Math.cos(e * Math.PI) / 2;
          let h = r + d * (i - r);
          if ((c(h, i) && (h = i), t.wrapperEl.scrollTo({ [s]: h }), c(h, i)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [s]: h });
              }),
              void n.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = n.requestAnimationFrame(u);
        };
      u();
    }
    let k, B, D;
    function G() {
      return (
        k ||
          (k = (function () {
            const e = y(),
              t = f();
            return {
              smoothScroll:
                t.documentElement &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
              passiveListener: (function () {
                let t = !1;
                try {
                  const i = Object.defineProperty({}, "passive", {
                    get() {
                      t = !0;
                    },
                  });
                  e.addEventListener("testPassiveListener", null, i);
                } catch (e) {}
                return t;
              })(),
              gestures: "ongesturestart" in e,
            };
          })()),
        k
      );
    }
    function V(e) {
      return (
        void 0 === e && (e = {}),
        B ||
          (B = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const i = G(),
              s = y(),
              n = s.navigator.platform,
              r = t || s.navigator.userAgent,
              o = { ios: !1, android: !1 },
              a = s.screen.width,
              l = s.screen.height,
              d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = r.match(/(iPad).*OS\s([\d_]+)/);
            const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
              h = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              p = "Win32" === n;
            let g = "MacIntel" === n;
            return (
              !c &&
                g &&
                i.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${a}x${l}`) >= 0 &&
                ((c = r.match(/(Version)\/([\d.]+)/)),
                c || (c = [0, 1, "13_0_0"]),
                (g = !1)),
              d && !p && ((o.os = "android"), (o.android = !0)),
              (c || h || u) && ((o.os = "ios"), (o.ios = !0)),
              o
            );
          })(e)),
        B
      );
    }
    function F() {
      return (
        D ||
          (D = (function () {
            const e = y();
            return {
              isSafari: (function () {
                const t = e.navigator.userAgent.toLowerCase();
                return (
                  t.indexOf("safari") >= 0 &&
                  t.indexOf("chrome") < 0 &&
                  t.indexOf("android") < 0
                );
              })(),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
            };
          })()),
        D
      );
    }
    const H = {
      on(e, t, i) {
        const s = this;
        if ("function" != typeof t) return s;
        const n = i ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            s.eventsListeners[e] || (s.eventsListeners[e] = []),
              s.eventsListeners[e][n](t);
          }),
          s
        );
      },
      once(e, t, i) {
        const s = this;
        if ("function" != typeof t) return s;
        function n() {
          s.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
          for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++)
            r[o] = arguments[o];
          t.apply(s, r);
        }
        return (n.__emitterProxy = t), s.on(e, n, i);
      },
      onAny(e, t) {
        const i = this;
        if ("function" != typeof e) return i;
        const s = t ? "unshift" : "push";
        return (
          i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsAnyListeners) return t;
        const i = t.eventsAnyListeners.indexOf(e);
        return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
      },
      off(e, t) {
        const i = this;
        return i.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (i.eventsListeners[e] = [])
                : i.eventsListeners[e] &&
                  i.eventsListeners[e].forEach((s, n) => {
                    (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                      i.eventsListeners[e].splice(n, 1);
                  });
            }),
            i)
          : i;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners) return e;
        let t, i, s;
        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
          r[o] = arguments[o];
        "string" == typeof r[0] || Array.isArray(r[0])
          ? ((t = r[0]), (i = r.slice(1, r.length)), (s = e))
          : ((t = r[0].events), (i = r[0].data), (s = r[0].context || e)),
          i.unshift(s);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(s, [t, ...i]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(s, i);
                });
          }),
          e
        );
      },
    };
    const N = {
      updateSize: function () {
        const e = this;
        let t, i;
        const s = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : s[0].clientWidth),
          (i =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : s[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === i && e.isVertical()) ||
            ((t =
              t -
              parseInt(s.css("padding-left") || 0, 10) -
              parseInt(s.css("padding-right") || 0, 10)),
            (i =
              i -
              parseInt(s.css("padding-top") || 0, 10) -
              parseInt(s.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(i) && (i = 0),
            Object.assign(e, {
              width: t,
              height: i,
              size: e.isHorizontal() ? t : i,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function i(e, i) {
          return parseFloat(e.getPropertyValue(t(i)) || 0);
        }
        const s = e.params,
          { $wrapperEl: n, size: r, rtlTranslate: o, wrongRTL: a } = e,
          l = e.virtual && s.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          c = n.children(`.${e.params.slideClass}`),
          u = l ? e.virtual.slides.length : c.length;
        let h = [];
        const p = [],
          g = [];
        let m = s.slidesOffsetBefore;
        "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
        let f = s.slidesOffsetAfter;
        "function" == typeof f && (f = s.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length,
          y = e.slidesGrid.length;
        let b = s.spaceBetween,
          w = -m,
          C = 0,
          S = 0;
        if (void 0 === r) return;
        "string" == typeof b &&
          b.indexOf("%") >= 0 &&
          (b = (parseFloat(b.replace("%", "")) / 100) * r),
          (e.virtualSize = -b),
          o
            ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          s.centeredSlides &&
            s.cssMode &&
            (M(e.wrapperEl, "--swiper-centered-offset-before", ""),
            M(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const x = s.grid && s.grid.rows > 1 && e.grid;
        let _;
        x && e.grid.initSlides(u);
        const E =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter(
            (e) => void 0 !== s.breakpoints[e].slidesPerView
          ).length > 0;
        for (let n = 0; n < u; n += 1) {
          _ = 0;
          const o = c.eq(n);
          if (
            (x && e.grid.updateSlide(n, o, u, t), "none" !== o.css("display"))
          ) {
            if ("auto" === s.slidesPerView) {
              E && (c[n].style[t("width")] = "");
              const r = getComputedStyle(o[0]),
                a = o[0].style.transform,
                l = o[0].style.webkitTransform;
              if (
                (a && (o[0].style.transform = "none"),
                l && (o[0].style.webkitTransform = "none"),
                s.roundLengths)
              )
                _ = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
              else {
                const e = i(r, "width"),
                  t = i(r, "padding-left"),
                  s = i(r, "padding-right"),
                  n = i(r, "margin-left"),
                  a = i(r, "margin-right"),
                  l = r.getPropertyValue("box-sizing");
                if (l && "border-box" === l) _ = e + n + a;
                else {
                  const { clientWidth: i, offsetWidth: r } = o[0];
                  _ = e + t + s + n + a + (r - i);
                }
              }
              a && (o[0].style.transform = a),
                l && (o[0].style.webkitTransform = l),
                s.roundLengths && (_ = Math.floor(_));
            } else
              (_ = (r - (s.slidesPerView - 1) * b) / s.slidesPerView),
                s.roundLengths && (_ = Math.floor(_)),
                c[n] && (c[n].style[t("width")] = `${_}px`);
            c[n] && (c[n].swiperSlideSize = _),
              g.push(_),
              s.centeredSlides
                ? ((w = w + _ / 2 + C / 2 + b),
                  0 === C && 0 !== n && (w = w - r / 2 - b),
                  0 === n && (w = w - r / 2 - b),
                  Math.abs(w) < 0.001 && (w = 0),
                  s.roundLengths && (w = Math.floor(w)),
                  S % s.slidesPerGroup == 0 && h.push(w),
                  p.push(w))
                : (s.roundLengths && (w = Math.floor(w)),
                  (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                    e.params.slidesPerGroup ==
                    0 && h.push(w),
                  p.push(w),
                  (w = w + _ + b)),
              (e.virtualSize += _ + b),
              (C = _),
              (S += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, r) + f),
          o &&
            a &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            n.css({ width: `${e.virtualSize + s.spaceBetween}px` }),
          s.setWrapperSize &&
            n.css({ [t("width")]: `${e.virtualSize + s.spaceBetween}px` }),
          x && e.grid.updateWrapperSize(_, h, t),
          !s.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < h.length; i += 1) {
            let n = h[i];
            s.roundLengths && (n = Math.floor(n)),
              h[i] <= e.virtualSize - r && t.push(n);
          }
          (h = t),
            Math.floor(e.virtualSize - r) - Math.floor(h[h.length - 1]) > 1 &&
              h.push(e.virtualSize - r);
        }
        if ((0 === h.length && (h = [0]), 0 !== s.spaceBetween)) {
          const i = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
          c.filter((e, t) => !s.cssMode || t !== c.length - 1).css({
            [i]: `${b}px`,
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          g.forEach((t) => {
            e += t + (s.spaceBetween ? s.spaceBetween : 0);
          }),
            (e -= s.spaceBetween);
          const t = e - r;
          h = h.map((e) => (e < 0 ? -m : e > t ? t + f : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (g.forEach((t) => {
              e += t + (s.spaceBetween ? s.spaceBetween : 0);
            }),
            (e -= s.spaceBetween),
            e < r)
          ) {
            const t = (r - e) / 2;
            h.forEach((e, i) => {
              h[i] = e - t;
            }),
              p.forEach((e, i) => {
                p[i] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: h,
            slidesGrid: p,
            slidesSizesGrid: g,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          M(e.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"),
            M(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - g[g.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            i = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + i));
        }
        if (
          (u !== d && e.emit("slidesLengthChange"),
          h.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          p.length !== y && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset(),
          !(l || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
        ) {
          const t = `${s.containerModifierClass}backface-hidden`,
            i = e.$el.hasClass(t);
          u <= s.maxBackfaceHiddenSlides
            ? i || e.$el.addClass(t)
            : i && e.$el.removeClass(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          i = [],
          s = t.virtual && t.params.virtual.enabled;
        let n,
          r = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const o = (e) =>
          s
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            t.visibleSlides.each((e) => {
              i.push(e);
            });
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !s) break;
              i.push(o(e));
            }
        else i.push(o(t.activeIndex));
        for (n = 0; n < i.length; n += 1)
          if (void 0 !== i[n]) {
            const e = i[n].offsetHeight;
            r = e > r ? e : r;
          }
        (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset = e.isHorizontal()
            ? t[i].offsetLeft
            : t[i].offsetTop;
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          i = t.params,
          { slides: s, rtlTranslate: n, snapGrid: r } = t;
        if (0 === s.length) return;
        void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
        let o = -e;
        n && (o = e),
          s.removeClass(i.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let e = 0; e < s.length; e += 1) {
          const a = s[e];
          let l = a.swiperSlideOffset;
          i.cssMode && i.centeredSlides && (l -= s[0].swiperSlideOffset);
          const d =
              (o + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + i.spaceBetween),
            c =
              (o - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + i.spaceBetween),
            u = -(o - l),
            h = u + t.slidesSizesGrid[e];
          ((u >= 0 && u < t.size - 1) ||
            (h > 1 && h <= t.size) ||
            (u <= 0 && h >= t.size)) &&
            (t.visibleSlides.push(a),
            t.visibleSlidesIndexes.push(e),
            s.eq(e).addClass(i.slideVisibleClass)),
            (a.progress = n ? -d : d),
            (a.originalProgress = n ? -c : c);
        }
        t.visibleSlides = T(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const i = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * i) || 0;
        }
        const i = t.params,
          s = t.maxTranslate() - t.minTranslate();
        let { progress: n, isBeginning: r, isEnd: o } = t;
        const a = r,
          l = o;
        0 === s
          ? ((n = 0), (r = !0), (o = !0))
          : ((n = (e - t.minTranslate()) / s), (r = n <= 0), (o = n >= 1)),
          Object.assign(t, { progress: n, isBeginning: r, isEnd: o }),
          (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
            t.updateSlidesProgress(e),
          r && !a && t.emit("reachBeginning toEdge"),
          o && !l && t.emit("reachEnd toEdge"),
          ((a && !r) || (l && !o)) && t.emit("fromEdge"),
          t.emit("progress", n);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: i,
            $wrapperEl: s,
            activeIndex: n,
            realIndex: r,
          } = e,
          o = e.virtual && i.virtual.enabled;
        let a;
        t.removeClass(
          `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
        ),
          (a = o
            ? e.$wrapperEl.find(
                `.${i.slideClass}[data-swiper-slide-index="${n}"]`
              )
            : t.eq(n)),
          a.addClass(i.slideActiveClass),
          i.loop &&
            (a.hasClass(i.slideDuplicateClass)
              ? s
                  .children(
                    `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass)
              : s
                  .children(
                    `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass));
        let l = a.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
        i.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(i.slideNextClass));
        let d = a.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
        i.loop &&
          0 === d.length &&
          ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
          i.loop &&
            (l.hasClass(i.slideDuplicateClass)
              ? s
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass)
              : s
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass),
            d.hasClass(i.slideDuplicateClass)
              ? s
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)
              : s
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          i = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: s,
            snapGrid: n,
            params: r,
            activeIndex: o,
            realIndex: a,
            snapIndex: l,
          } = t;
        let d,
          c = e;
        if (void 0 === c) {
          for (let e = 0; e < s.length; e += 1)
            void 0 !== s[e + 1]
              ? i >= s[e] && i < s[e + 1] - (s[e + 1] - s[e]) / 2
                ? (c = e)
                : i >= s[e] && i < s[e + 1] && (c = e + 1)
              : i >= s[e] && (c = e);
          r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
        }
        if (n.indexOf(i) >= 0) d = n.indexOf(i);
        else {
          const e = Math.min(r.slidesPerGroupSkip, c);
          d = e + Math.floor((c - e) / r.slidesPerGroup);
        }
        if ((d >= n.length && (d = n.length - 1), c === o))
          return void (
            d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
          );
        const u = parseInt(
          t.slides.eq(c).attr("data-swiper-slide-index") || c,
          10
        );
        Object.assign(t, {
          snapIndex: d,
          realIndex: u,
          previousIndex: o,
          activeIndex: c,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          a !== u && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          i = t.params,
          s = T(e).closest(`.${i.slideClass}`)[0];
        let n,
          r = !1;
        if (s)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === s) {
              (r = !0), (n = e);
              break;
            }
        if (!s || !r)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = s),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                T(s).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = n),
          i.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    };
    const q = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {
          params: t,
          rtlTranslate: i,
          translate: s,
          $wrapperEl: n,
        } = this;
        if (t.virtualTranslate) return i ? -s : s;
        if (t.cssMode) return s;
        let r = O(n[0], e);
        return i && (r = -r), r || 0;
      },
      setTranslate: function (e, t) {
        const i = this,
          {
            rtlTranslate: s,
            params: n,
            $wrapperEl: r,
            wrapperEl: o,
            progress: a,
          } = i;
        let l,
          d = 0,
          c = 0;
        i.isHorizontal() ? (d = s ? -e : e) : (c = e),
          n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
          n.cssMode
            ? (o[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                i.isHorizontal() ? -d : -c)
            : n.virtualTranslate ||
              r.transform(`translate3d(${d}px, ${c}px, 0px)`),
          (i.previousTranslate = i.translate),
          (i.translate = i.isHorizontal() ? d : c);
        const u = i.maxTranslate() - i.minTranslate();
        (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
          l !== a && i.updateProgress(e),
          i.emit("setTranslate", i.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, i, s, n) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === i && (i = !0),
          void 0 === s && (s = !0);
        const r = this,
          { params: o, wrapperEl: a } = r;
        if (r.animating && o.preventInteractionOnTransition) return !1;
        const l = r.minTranslate(),
          d = r.maxTranslate();
        let c;
        if (
          ((c = s && e > l ? l : s && e < d ? d : e),
          r.updateProgress(c),
          o.cssMode)
        ) {
          const e = r.isHorizontal();
          if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!r.support.smoothScroll)
              return (
                $({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(c),
              i &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(c),
              i &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionStart")),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      i && r.emit("transitionEnd"));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function R(e) {
      let { swiper: t, runCallbacks: i, direction: s, step: n } = e;
      const { activeIndex: r, previousIndex: o } = t;
      let a = s;
      if (
        (a || (a = r > o ? "next" : r < o ? "prev" : "reset"),
        t.emit(`transition${n}`),
        i && r !== o)
      ) {
        if ("reset" === a) return void t.emit(`slideResetTransition${n}`);
        t.emit(`slideChangeTransition${n}`),
          "next" === a
            ? t.emit(`slideNextTransition${n}`)
            : t.emit(`slidePrevTransition${n}`);
      }
    }
    const X = {
      slideTo: function (e, t, i, s, n) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === i && (i = !0),
          "number" != typeof e && "string" != typeof e)
        )
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const r = this;
        let o = e;
        o < 0 && (o = 0);
        const {
          params: a,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: u,
          rtlTranslate: h,
          wrapperEl: p,
          enabled: g,
        } = r;
        if (
          (r.animating && a.preventInteractionOnTransition) ||
          (!g && !s && !n)
        )
          return !1;
        const m = Math.min(r.params.slidesPerGroupSkip, o);
        let f = m + Math.floor((o - m) / r.params.slidesPerGroup);
        f >= l.length && (f = l.length - 1),
          (u || a.initialSlide || 0) === (c || 0) &&
            i &&
            r.emit("beforeSlideChangeStart");
        const v = -l[f];
        if ((r.updateProgress(v), a.normalizeSlideIndex))
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
              i = Math.floor(100 * d[e]),
              s = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= i && t < s - (s - i) / 2
                ? (o = e)
                : t >= i && t < s && (o = e + 1)
              : t >= i && (o = e);
          }
        if (r.initialized && o !== u) {
          if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
            return !1;
          if (
            !r.allowSlidePrev &&
            v > r.translate &&
            v > r.maxTranslate() &&
            (u || 0) !== o
          )
            return !1;
        }
        let y;
        if (
          ((y = o > u ? "next" : o < u ? "prev" : "reset"),
          (h && -v === r.translate) || (!h && v === r.translate))
        )
          return (
            r.updateActiveIndex(o),
            a.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== a.effect && r.setTranslate(v),
            "reset" !== y && (r.transitionStart(i, y), r.transitionEnd(i, y)),
            !1
          );
        if (a.cssMode) {
          const e = r.isHorizontal(),
            i = h ? v : -v;
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t &&
              ((r.wrapperEl.style.scrollSnapType = "none"),
              (r._immediateVirtual = !0)),
              (p[e ? "scrollLeft" : "scrollTop"] = i),
              t &&
                requestAnimationFrame(() => {
                  (r.wrapperEl.style.scrollSnapType = ""),
                    (r._swiperImmediateVirtual = !1);
                });
          } else {
            if (!r.support.smoothScroll)
              return (
                $({ swiper: r, targetPosition: i, side: e ? "left" : "top" }),
                !0
              );
            p.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
          }
          return !0;
        }
        return (
          r.setTransition(t),
          r.setTranslate(v),
          r.updateActiveIndex(o),
          r.updateSlidesClasses(),
          r.emit("beforeTransitionStart", t, s),
          r.transitionStart(i, y),
          0 === t
            ? r.transitionEnd(i, y)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(i, y));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e, t, i, s) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === i && (i = !0);
        const n = this;
        let r = e;
        return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, i, s);
      },
      slideNext: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const s = this,
          { animating: n, enabled: r, params: o } = s;
        if (!r) return s;
        let a = o.slidesPerGroup;
        "auto" === o.slidesPerView &&
          1 === o.slidesPerGroup &&
          o.slidesPerGroupAuto &&
          (a = Math.max(s.slidesPerViewDynamic("current", !0), 1));
        const l = s.activeIndex < o.slidesPerGroupSkip ? 1 : a;
        if (o.loop) {
          if (n && o.loopPreventsSlide) return !1;
          s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
        }
        return o.rewind && s.isEnd
          ? s.slideTo(0, e, t, i)
          : s.slideTo(s.activeIndex + l, e, t, i);
      },
      slidePrev: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const s = this,
          {
            params: n,
            animating: r,
            snapGrid: o,
            slidesGrid: a,
            rtlTranslate: l,
            enabled: d,
          } = s;
        if (!d) return s;
        if (n.loop) {
          if (r && n.loopPreventsSlide) return !1;
          s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
        }
        function c(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = c(l ? s.translate : -s.translate),
          h = o.map((e) => c(e));
        let p = o[h.indexOf(u) - 1];
        if (void 0 === p && n.cssMode) {
          let e;
          o.forEach((t, i) => {
            u >= t && (e = i);
          }),
            void 0 !== e && (p = o[e > 0 ? e - 1 : e]);
        }
        let g = 0;
        if (
          (void 0 !== p &&
            ((g = a.indexOf(p)),
            g < 0 && (g = s.activeIndex - 1),
            "auto" === n.slidesPerView &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((g = g - s.slidesPerViewDynamic("previous", !0) + 1),
              (g = Math.max(g, 0)))),
          n.rewind && s.isBeginning)
        ) {
          const n =
            s.params.virtual && s.params.virtual.enabled && s.virtual
              ? s.virtual.slides.length - 1
              : s.slides.length - 1;
          return s.slideTo(n, e, t, i);
        }
        return s.slideTo(g, e, t, i);
      },
      slideReset: function (e, t, i) {
        return (
          void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          this.slideTo(this.activeIndex, e, t, i)
        );
      },
      slideToClosest: function (e, t, i, s) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === s && (s = 0.5);
        const n = this;
        let r = n.activeIndex;
        const o = Math.min(n.params.slidesPerGroupSkip, r),
          a = o + Math.floor((r - o) / n.params.slidesPerGroup),
          l = n.rtlTranslate ? n.translate : -n.translate;
        if (l >= n.snapGrid[a]) {
          const e = n.snapGrid[a];
          l - e > (n.snapGrid[a + 1] - e) * s && (r += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[a - 1];
          l - e <= (n.snapGrid[a] - e) * s && (r -= n.params.slidesPerGroup);
        }
        return (
          (r = Math.max(r, 0)),
          (r = Math.min(r, n.slidesGrid.length - 1)),
          n.slideTo(r, e, t, i)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: i } = e,
          s =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let n,
          r = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (n = parseInt(T(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? r < e.loopedSlides - s / 2 ||
                r > e.slides.length - e.loopedSlides + s / 2
                ? (e.loopFix(),
                  (r = i
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  I(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r)
              : r > e.slides.length - s
              ? (e.loopFix(),
                (r = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                I(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
        } else e.slideTo(r);
      },
    };
    const j = {
      loopCreate: function () {
        const e = this,
          t = f(),
          { params: i, $wrapperEl: s } = e,
          n = s.children().length > 0 ? T(s.children()[0].parentNode) : s;
        n.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
        let r = n.children(`.${i.slideClass}`);
        if (i.loopFillGroupWithBlank) {
          const e = i.slidesPerGroup - (r.length % i.slidesPerGroup);
          if (e !== i.slidesPerGroup) {
            for (let s = 0; s < e; s += 1) {
              const e = T(t.createElement("div")).addClass(
                `${i.slideClass} ${i.slideBlankClass}`
              );
              n.append(e);
            }
            r = n.children(`.${i.slideClass}`);
          }
        }
        "auto" !== i.slidesPerView ||
          i.loopedSlides ||
          (i.loopedSlides = r.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(i.loopedSlides || i.slidesPerView, 10)
          )),
          (e.loopedSlides += i.loopAdditionalSlides),
          e.loopedSlides > r.length && (e.loopedSlides = r.length);
        const o = [],
          a = [];
        r.each((t, i) => {
          const s = T(t);
          i < e.loopedSlides && a.push(t),
            i < r.length && i >= r.length - e.loopedSlides && o.push(t),
            s.attr("data-swiper-slide-index", i);
        });
        for (let e = 0; e < a.length; e += 1)
          n.append(T(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
        for (let e = o.length - 1; e >= 0; e -= 1)
          n.prepend(T(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: i,
          loopedSlides: s,
          allowSlidePrev: n,
          allowSlideNext: r,
          snapGrid: o,
          rtlTranslate: a,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const d = -o[t] - e.getTranslate();
        if (t < s) {
          (l = i.length - 3 * s + t), (l += s);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((a ? -e.translate : e.translate) - d);
        } else if (t >= i.length - s) {
          (l = -i.length + t + s), (l += s);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((a ? -e.translate : e.translate) - d);
        }
        (e.allowSlidePrev = n), (e.allowSlideNext = r), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: i } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          i.removeAttr("data-swiper-slide-index");
      },
    };
    function Y(e) {
      const t = this,
        i = f(),
        s = y(),
        n = t.touchEventsData,
        { params: r, touches: o, enabled: a } = t;
      if (!a) return;
      if (t.animating && r.preventInteractionOnTransition) return;
      !t.animating && r.cssMode && r.loop && t.loopFix();
      let l = e;
      l.originalEvent && (l = l.originalEvent);
      let d = T(l.target);
      if ("wrapper" === r.touchEventsTarget && !d.closest(t.wrapperEl).length)
        return;
      if (
        ((n.isTouchEvent = "touchstart" === l.type),
        !n.isTouchEvent && "which" in l && 3 === l.which)
      )
        return;
      if (!n.isTouchEvent && "button" in l && l.button > 0) return;
      if (n.isTouched && n.isMoved) return;
      !!r.noSwipingClass &&
        "" !== r.noSwipingClass &&
        l.target &&
        l.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (d = T(e.path[0]));
      const c = r.noSwipingSelector
          ? r.noSwipingSelector
          : `.${r.noSwipingClass}`,
        u = !(!l.target || !l.target.shadowRoot);
      if (
        r.noSwiping &&
        (u
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(i) {
                  return i && i !== f() && i !== y()
                    ? (i.assignedSlot && (i = i.assignedSlot),
                      i.closest(e) || t(i.getRootNode().host))
                    : null;
                })(t)
              );
            })(c, l.target)
          : d.closest(c)[0])
      )
        return void (t.allowClick = !0);
      if (r.swipeHandler && !d.closest(r.swipeHandler)[0]) return;
      (o.currentX =
        "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
        (o.currentY =
          "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
      const h = o.currentX,
        p = o.currentY,
        g = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
        m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
      if (g && (h <= m || h >= s.innerWidth - m)) {
        if ("prevent" !== g) return;
        e.preventDefault();
      }
      if (
        (Object.assign(n, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
        (o.startX = h),
        (o.startY = p),
        (n.touchStartTime = L()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        r.threshold > 0 && (n.allowThresholdMove = !1),
        "touchstart" !== l.type)
      ) {
        let e = !0;
        d.is(n.focusableElements) &&
          ((e = !1), "SELECT" === d[0].nodeName && (n.isTouched = !1)),
          i.activeElement &&
            T(i.activeElement).is(n.focusableElements) &&
            i.activeElement !== d[0] &&
            i.activeElement.blur();
        const s = e && t.allowTouchMove && r.touchStartPreventDefault;
        (!r.touchStartForcePreventDefault && !s) ||
          d[0].isContentEditable ||
          l.preventDefault();
      }
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
        t.emit("touchStart", l);
    }
    function W(e) {
      const t = f(),
        i = this,
        s = i.touchEventsData,
        { params: n, touches: r, rtlTranslate: o, enabled: a } = i;
      if (!a) return;
      let l = e;
      if ((l.originalEvent && (l = l.originalEvent), !s.isTouched))
        return void (
          s.startMoving &&
          s.isScrolling &&
          i.emit("touchMoveOpposite", l)
        );
      if (s.isTouchEvent && "touchmove" !== l.type) return;
      const d =
          "touchmove" === l.type &&
          l.targetTouches &&
          (l.targetTouches[0] || l.changedTouches[0]),
        c = "touchmove" === l.type ? d.pageX : l.pageX,
        u = "touchmove" === l.type ? d.pageY : l.pageY;
      if (l.preventedByNestedSwiper) return (r.startX = c), void (r.startY = u);
      if (!i.allowTouchMove)
        return (
          T(l.target).is(s.focusableElements) || (i.allowClick = !1),
          void (
            s.isTouched &&
            (Object.assign(r, {
              startX: c,
              startY: u,
              currentX: c,
              currentY: u,
            }),
            (s.touchStartTime = L()))
          )
        );
      if (s.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
        if (i.isVertical()) {
          if (
            (u < r.startY && i.translate <= i.maxTranslate()) ||
            (u > r.startY && i.translate >= i.minTranslate())
          )
            return (s.isTouched = !1), void (s.isMoved = !1);
        } else if (
          (c < r.startX && i.translate <= i.maxTranslate()) ||
          (c > r.startX && i.translate >= i.minTranslate())
        )
          return;
      if (
        s.isTouchEvent &&
        t.activeElement &&
        l.target === t.activeElement &&
        T(l.target).is(s.focusableElements)
      )
        return (s.isMoved = !0), void (i.allowClick = !1);
      if (
        (s.allowTouchCallbacks && i.emit("touchMove", l),
        l.targetTouches && l.targetTouches.length > 1)
      )
        return;
      (r.currentX = c), (r.currentY = u);
      const h = r.currentX - r.startX,
        p = r.currentY - r.startY;
      if (i.params.threshold && Math.sqrt(h ** 2 + p ** 2) < i.params.threshold)
        return;
      if (void 0 === s.isScrolling) {
        let e;
        (i.isHorizontal() && r.currentY === r.startY) ||
        (i.isVertical() && r.currentX === r.startX)
          ? (s.isScrolling = !1)
          : h * h + p * p >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(p), Math.abs(h))) / Math.PI),
            (s.isScrolling = i.isHorizontal()
              ? e > n.touchAngle
              : 90 - e > n.touchAngle));
      }
      if (
        (s.isScrolling && i.emit("touchMoveOpposite", l),
        void 0 === s.startMoving &&
          ((r.currentX === r.startX && r.currentY === r.startY) ||
            (s.startMoving = !0)),
        s.isScrolling)
      )
        return void (s.isTouched = !1);
      if (!s.startMoving) return;
      (i.allowClick = !1),
        !n.cssMode && l.cancelable && l.preventDefault(),
        n.touchMoveStopPropagation && !n.nested && l.stopPropagation(),
        s.isMoved ||
          (n.loop && !n.cssMode && i.loopFix(),
          (s.startTranslate = i.getTranslate()),
          i.setTransition(0),
          i.animating &&
            i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
          (s.allowMomentumBounce = !1),
          !n.grabCursor ||
            (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
            i.setGrabCursor(!0),
          i.emit("sliderFirstMove", l)),
        i.emit("sliderMove", l),
        (s.isMoved = !0);
      let g = i.isHorizontal() ? h : p;
      (r.diff = g),
        (g *= n.touchRatio),
        o && (g = -g),
        (i.swipeDirection = g > 0 ? "prev" : "next"),
        (s.currentTranslate = g + s.startTranslate);
      let m = !0,
        v = n.resistanceRatio;
      if (
        (n.touchReleaseOnEdges && (v = 0),
        g > 0 && s.currentTranslate > i.minTranslate()
          ? ((m = !1),
            n.resistance &&
              (s.currentTranslate =
                i.minTranslate() -
                1 +
                (-i.minTranslate() + s.startTranslate + g) ** v))
          : g < 0 &&
            s.currentTranslate < i.maxTranslate() &&
            ((m = !1),
            n.resistance &&
              (s.currentTranslate =
                i.maxTranslate() +
                1 -
                (i.maxTranslate() - s.startTranslate - g) ** v)),
        m && (l.preventedByNestedSwiper = !0),
        !i.allowSlideNext &&
          "next" === i.swipeDirection &&
          s.currentTranslate < s.startTranslate &&
          (s.currentTranslate = s.startTranslate),
        !i.allowSlidePrev &&
          "prev" === i.swipeDirection &&
          s.currentTranslate > s.startTranslate &&
          (s.currentTranslate = s.startTranslate),
        i.allowSlidePrev ||
          i.allowSlideNext ||
          (s.currentTranslate = s.startTranslate),
        n.threshold > 0)
      ) {
        if (!(Math.abs(g) > n.threshold || s.allowThresholdMove))
          return void (s.currentTranslate = s.startTranslate);
        if (!s.allowThresholdMove)
          return (
            (s.allowThresholdMove = !0),
            (r.startX = r.currentX),
            (r.startY = r.currentY),
            (s.currentTranslate = s.startTranslate),
            void (r.diff = i.isHorizontal()
              ? r.currentX - r.startX
              : r.currentY - r.startY)
          );
      }
      n.followFinger &&
        !n.cssMode &&
        (((n.freeMode && n.freeMode.enabled && i.freeMode) ||
          n.watchSlidesProgress) &&
          (i.updateActiveIndex(), i.updateSlidesClasses()),
        i.params.freeMode &&
          n.freeMode.enabled &&
          i.freeMode &&
          i.freeMode.onTouchMove(),
        i.updateProgress(s.currentTranslate),
        i.setTranslate(s.currentTranslate));
    }
    function Z(e) {
      const t = this,
        i = t.touchEventsData,
        {
          params: s,
          touches: n,
          rtlTranslate: r,
          slidesGrid: o,
          enabled: a,
        } = t;
      if (!a) return;
      let l = e;
      if (
        (l.originalEvent && (l = l.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", l),
        (i.allowTouchCallbacks = !1),
        !i.isTouched)
      )
        return (
          i.isMoved && s.grabCursor && t.setGrabCursor(!1),
          (i.isMoved = !1),
          void (i.startMoving = !1)
        );
      s.grabCursor &&
        i.isMoved &&
        i.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const d = L(),
        c = d - i.touchStartTime;
      if (t.allowClick) {
        const e = l.path || (l.composedPath && l.composedPath());
        t.updateClickedSlide((e && e[0]) || l.target),
          t.emit("tap click", l),
          c < 300 &&
            d - i.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", l);
      }
      if (
        ((i.lastClickTime = L()),
        I(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !i.isTouched ||
          !i.isMoved ||
          !t.swipeDirection ||
          0 === n.diff ||
          i.currentTranslate === i.startTranslate)
      )
        return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
      let u;
      if (
        ((i.isTouched = !1),
        (i.isMoved = !1),
        (i.startMoving = !1),
        (u = s.followFinger
          ? r
            ? t.translate
            : -t.translate
          : -i.currentTranslate),
        s.cssMode)
      )
        return;
      if (t.params.freeMode && s.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: u });
      let h = 0,
        p = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < o.length;
        e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
      ) {
        const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        void 0 !== o[e + t]
          ? u >= o[e] && u < o[e + t] && ((h = e), (p = o[e + t] - o[e]))
          : u >= o[e] && ((h = e), (p = o[o.length - 1] - o[o.length - 2]));
      }
      let g = null,
        m = null;
      s.rewind &&
        (t.isBeginning
          ? (m =
              t.params.virtual && t.params.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (g = 0));
      const f = (u - o[h]) / p,
        v = h < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
      if (c > s.longSwipesMs) {
        if (!s.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (f >= s.longSwipesRatio
            ? t.slideTo(s.rewind && t.isEnd ? g : h + v)
            : t.slideTo(h)),
          "prev" === t.swipeDirection &&
            (f > 1 - s.longSwipesRatio
              ? t.slideTo(h + v)
              : null !== m && f < 0 && Math.abs(f) > s.longSwipesRatio
              ? t.slideTo(m)
              : t.slideTo(h));
      } else {
        if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
          ? l.target === t.navigation.nextEl
            ? t.slideTo(h + v)
            : t.slideTo(h)
          : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + v),
            "prev" === t.swipeDirection && t.slideTo(null !== m ? m : h));
      }
    }
    function U() {
      const e = this,
        { params: t, el: i } = e;
      if (i && 0 === i.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: s, allowSlidePrev: n, snapGrid: r } = e;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
        e.isEnd &&
        !e.isBeginning &&
        !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.run(),
        (e.allowSlidePrev = n),
        (e.allowSlideNext = s),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function K(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function Q() {
      const e = this,
        { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
      if (!s) return;
      let n;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const r = e.maxTranslate() - e.minTranslate();
      (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        n !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    let J = !1;
    function ee() {}
    const te = (e, t) => {
      const i = f(),
        {
          params: s,
          touchEvents: n,
          el: r,
          wrapperEl: o,
          device: a,
          support: l,
        } = e,
        d = !!s.nested,
        c = "on" === t ? "addEventListener" : "removeEventListener",
        u = t;
      if (l.touch) {
        const t = !(
          "touchstart" !== n.start ||
          !l.passiveListener ||
          !s.passiveListeners
        ) && { passive: !0, capture: !1 };
        r[c](n.start, e.onTouchStart, t),
          r[c](
            n.move,
            e.onTouchMove,
            l.passiveListener ? { passive: !1, capture: d } : d
          ),
          r[c](n.end, e.onTouchEnd, t),
          n.cancel && r[c](n.cancel, e.onTouchEnd, t);
      } else
        r[c](n.start, e.onTouchStart, !1),
          i[c](n.move, e.onTouchMove, d),
          i[c](n.end, e.onTouchEnd, !1);
      (s.preventClicks || s.preventClicksPropagation) &&
        r[c]("click", e.onClick, !0),
        s.cssMode && o[c]("scroll", e.onScroll),
        s.updateOnWindowResize
          ? e[u](
              a.ios || a.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              U,
              !0
            )
          : e[u]("observerUpdate", U, !0);
    };
    const ie = {
        attachEvents: function () {
          const e = this,
            t = f(),
            { params: i, support: s } = e;
          (e.onTouchStart = Y.bind(e)),
            (e.onTouchMove = W.bind(e)),
            (e.onTouchEnd = Z.bind(e)),
            i.cssMode && (e.onScroll = Q.bind(e)),
            (e.onClick = K.bind(e)),
            s.touch && !J && (t.addEventListener("touchstart", ee), (J = !0)),
            te(e, "on");
        },
        detachEvents: function () {
          te(this, "off");
        },
      },
      se = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const ne = {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: i,
            loopedSlides: s = 0,
            params: n,
            $el: r,
          } = e,
          o = n.breakpoints;
        if (!o || (o && 0 === Object.keys(o).length)) return;
        const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
        if (!a || e.currentBreakpoint === a) return;
        const l = (a in o ? o[a] : void 0) || e.originalParams,
          d = se(e, n),
          c = se(e, l),
          u = n.enabled;
        d && !c
          ? (r.removeClass(
              `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !d &&
            c &&
            (r.addClass(`${n.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === n.grid.fill)) &&
              r.addClass(`${n.containerModifierClass}grid-column`),
            e.emitContainerClasses());
        const h = l.direction && l.direction !== n.direction,
          p = n.loop && (l.slidesPerView !== n.slidesPerView || h);
        h && i && e.changeDirection(), A(e.params, l);
        const g = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          u && !g ? e.disable() : !u && g && e.enable(),
          (e.currentBreakpoint = a),
          e.emit("_beforeBreakpoint", l),
          p &&
            i &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - s + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t, i) {
        if ((void 0 === t && (t = "window"), !e || ("container" === t && !i)))
          return;
        let s = !1;
        const n = y(),
          r = "window" === t ? n.innerHeight : i.clientHeight,
          o = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: r * t, point: e };
            }
            return { value: e, point: e };
          });
        o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let e = 0; e < o.length; e += 1) {
          const { point: r, value: a } = o[e];
          "window" === t
            ? n.matchMedia(`(min-width: ${a}px)`).matches && (s = r)
            : a <= i.clientWidth && (s = r);
        }
        return s || "max";
      },
    };
    const re = {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: i,
            rtl: s,
            $el: n,
            device: r,
            support: o,
          } = e,
          a = (function (e, t) {
            const i = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((s) => {
                      e[s] && i.push(t + s);
                    })
                  : "string" == typeof e && i.push(t + e);
              }),
              i
            );
          })(
            [
              "initialized",
              i.direction,
              { "pointer-events": !o.touch },
              { "free-mode": e.params.freeMode && i.freeMode.enabled },
              { autoheight: i.autoHeight },
              { rtl: s },
              { grid: i.grid && i.grid.rows > 1 },
              {
                "grid-column":
                  i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
              },
              { android: r.android },
              { ios: r.ios },
              { "css-mode": i.cssMode },
              { centered: i.cssMode && i.centeredSlides },
            ],
            i.containerModifierClass
          );
        t.push(...a), n.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    };
    const oe = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function ae(e, t) {
      return function (i) {
        void 0 === i && (i = {});
        const s = Object.keys(i)[0],
          n = i[s];
        "object" == typeof n && null !== n
          ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 &&
              !0 === e[s] &&
              (e[s] = { auto: !0 }),
            s in e && "enabled" in n
              ? (!0 === e[s] && (e[s] = { enabled: !0 }),
                "object" != typeof e[s] ||
                  "enabled" in e[s] ||
                  (e[s].enabled = !0),
                e[s] || (e[s] = { enabled: !1 }),
                A(t, i))
              : A(t, i))
          : A(t, i);
      };
    }
    const le = {
        eventsEmitter: H,
        update: N,
        translate: q,
        transition: {
          setTransition: function (e, t) {
            const i = this;
            i.params.cssMode || i.$wrapperEl.transition(e),
              i.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const i = this,
              { params: s } = i;
            s.cssMode ||
              (s.autoHeight && i.updateAutoHeight(),
              R({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const i = this,
              { params: s } = i;
            (i.animating = !1),
              s.cssMode ||
                (i.setTransition(0),
                R({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: X,
        loop: j,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const i =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            (i.style.cursor = "move"),
              (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
              (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (i.style.cursor = e ? "grabbing" : "grab");
          },
          unsetGrabCursor: function () {
            const e = this;
            e.support.touch ||
              (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = "");
          },
        },
        events: ie,
        breakpoints: ne,
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: i } = e,
              { slidesOffsetBefore: s } = i;
            if (s) {
              const t = e.slides.length - 1,
                i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
              e.isLocked = e.size > i;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: re,
        images: {
          loadImage: function (e, t, i, s, n, r) {
            const o = y();
            let a;
            function l() {
              r && r();
            }
            T(e).parent("picture")[0] || (e.complete && n)
              ? l()
              : t
              ? ((a = new o.Image()),
                (a.onload = l),
                (a.onerror = l),
                s && (a.sizes = s),
                i && (a.srcset = i),
                t && (a.src = t))
              : l();
          },
          preloadImages: function () {
            const e = this;
            function t() {
              null != e &&
                e &&
                !e.destroyed &&
                (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                e.imagesLoaded === e.imagesToLoad.length &&
                  (e.params.updateOnImagesReady && e.update(),
                  e.emit("imagesReady")));
            }
            e.imagesToLoad = e.$el.find("img");
            for (let i = 0; i < e.imagesToLoad.length; i += 1) {
              const s = e.imagesToLoad[i];
              e.loadImage(
                s,
                s.currentSrc || s.getAttribute("src"),
                s.srcset || s.getAttribute("srcset"),
                s.sizes || s.getAttribute("sizes"),
                !0,
                t
              );
            }
          },
        },
      },
      de = {};
    class ce {
      constructor() {
        let e, t;
        for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++)
          s[n] = arguments[n];
        if (
          (1 === s.length &&
          s[0].constructor &&
          "Object" === Object.prototype.toString.call(s[0]).slice(8, -1)
            ? (t = s[0])
            : ([e, t] = s),
          t || (t = {}),
          (t = A({}, t)),
          e && !t.el && (t.el = e),
          t.el && T(t.el).length > 1)
        ) {
          const e = [];
          return (
            T(t.el).each((i) => {
              const s = A({}, t, { el: i });
              e.push(new ce(s));
            }),
            e
          );
        }
        const r = this;
        (r.__swiper__ = !0),
          (r.support = G()),
          (r.device = V({ userAgent: t.userAgent })),
          (r.browser = F()),
          (r.eventsListeners = {}),
          (r.eventsAnyListeners = []),
          (r.modules = [...r.__modules__]),
          t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
        const o = {};
        r.modules.forEach((e) => {
          e({
            swiper: r,
            extendParams: ae(t, o),
            on: r.on.bind(r),
            once: r.once.bind(r),
            off: r.off.bind(r),
            emit: r.emit.bind(r),
          });
        });
        const a = A({}, oe, o);
        return (
          (r.params = A({}, a, de, t)),
          (r.originalParams = A({}, r.params)),
          (r.passedParams = A({}, t)),
          r.params &&
            r.params.on &&
            Object.keys(r.params.on).forEach((e) => {
              r.on(e, r.params.on[e]);
            }),
          r.params && r.params.onAny && r.onAny(r.params.onAny),
          (r.$ = T),
          Object.assign(r, {
            enabled: r.params.enabled,
            el: e,
            classNames: [],
            slides: T(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === r.params.direction,
            isVertical: () => "vertical" === r.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: r.params.allowSlideNext,
            allowSlidePrev: r.params.allowSlidePrev,
            touchEvents: (function () {
              const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                t = ["pointerdown", "pointermove", "pointerup"];
              return (
                (r.touchEventsTouch = {
                  start: e[0],
                  move: e[1],
                  end: e[2],
                  cancel: e[3],
                }),
                (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                r.support.touch || !r.params.simulateTouch
                  ? r.touchEventsTouch
                  : r.touchEventsDesktop
              );
            })(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: r.params.focusableElements,
              lastClickTime: L(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: r.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          r.emit("_swiper"),
          r.params.init && r.init(),
          r
        );
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const s = i.minTranslate(),
          n = (i.maxTranslate() - s) * e + s;
        i.translateTo(n, void 0 === t ? 0 : t),
          i.updateActiveIndex(),
          i.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.each((i) => {
          const s = e.getSlideClasses(i);
          t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: i,
          slides: s,
          slidesGrid: n,
          slidesSizesGrid: r,
          size: o,
          activeIndex: a,
        } = this;
        let l = 1;
        if (i.centeredSlides) {
          let e,
            t = s[a].swiperSlideSize;
          for (let i = a + 1; i < s.length; i += 1)
            s[i] &&
              !e &&
              ((t += s[i].swiperSlideSize), (l += 1), t > o && (e = !0));
          for (let i = a - 1; i >= 0; i -= 1)
            s[i] &&
              !e &&
              ((t += s[i].swiperSlideSize), (l += 1), t > o && (e = !0));
        } else if ("current" === e)
          for (let e = a + 1; e < s.length; e += 1) {
            (t ? n[e] + r[e] - n[a] < o : n[e] - n[a] < o) && (l += 1);
          }
        else
          for (let e = a - 1; e >= 0; e -= 1) {
            n[a] - n[e] < o && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: i } = e;
        function s() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let n;
        i.breakpoints && e.setBreakpoint(),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (s(), e.params.autoHeight && e.updateAutoHeight())
            : ((n =
                ("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              n || s()),
          i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const i = this,
          s = i.params.direction;
        return (
          e || (e = "horizontal" === s ? "vertical" : "horizontal"),
          e === s ||
            ("horizontal" !== e && "vertical" !== e) ||
            (i.$el
              .removeClass(`${i.params.containerModifierClass}${s}`)
              .addClass(`${i.params.containerModifierClass}${e}`),
            i.emitContainerClasses(),
            (i.params.direction = e),
            i.slides.each((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            i.emit("changeDirection"),
            t && i.update()),
          i
        );
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        const i = T(e || t.params.el);
        if (!(e = i[0])) return !1;
        e.swiper = t;
        const s = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let n = (() => {
          if (e && e.shadowRoot && e.shadowRoot.querySelector) {
            const t = T(e.shadowRoot.querySelector(s()));
            return (t.children = (e) => i.children(e)), t;
          }
          return i.children(s());
        })();
        if (0 === n.length && t.params.createElements) {
          const e = f().createElement("div");
          (n = T(e)),
            (e.className = t.params.wrapperClass),
            i.append(e),
            i.children(`.${t.params.slideClass}`).each((e) => {
              n.append(e);
            });
        }
        return (
          Object.assign(t, {
            $el: i,
            el: e,
            $wrapperEl: n,
            wrapperEl: n[0],
            mounted: !0,
            rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
            wrongRTL: "-webkit-box" === n.css("display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
          !1 === t.mount(e) ||
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop
              ? t.slideTo(
                  t.params.initialSlide + t.loopedSlides,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                ),
            t.attachEvents(),
            (t.initialized = !0),
            t.emit("init"),
            t.emit("afterInit")),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const i = this,
          { params: s, $el: n, $wrapperEl: r, slides: o } = i;
        return (
          void 0 === i.params ||
            i.destroyed ||
            (i.emit("beforeDestroy"),
            (i.initialized = !1),
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t &&
              (i.removeClasses(),
              n.removeAttr("style"),
              r.removeAttr("style"),
              o &&
                o.length &&
                o
                  .removeClass(
                    [
                      s.slideVisibleClass,
                      s.slideActiveClass,
                      s.slideNextClass,
                      s.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((e) => {
              i.off(e);
            }),
            !1 !== e &&
              ((i.$el[0].swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(i)),
            (i.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        A(de, e);
      }
      static get extendedDefaults() {
        return de;
      }
      static get defaults() {
        return oe;
      }
      static installModule(e) {
        ce.prototype.__modules__ || (ce.prototype.__modules__ = []);
        const t = ce.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => ce.installModule(e)), ce)
          : (ce.installModule(e), ce);
      }
    }
    Object.keys(le).forEach((e) => {
      Object.keys(le[e]).forEach((t) => {
        ce.prototype[t] = le[e][t];
      });
    }),
      ce.use([
        function (e) {
          let { swiper: t, on: i, emit: s } = e;
          const n = y();
          let r = null,
            o = null;
          const a = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (s("beforeResize"), s("resize"));
            },
            l = () => {
              t && !t.destroyed && t.initialized && s("orientationchange");
            };
          i("init", () => {
            t.params.resizeObserver && void 0 !== n.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((r = new ResizeObserver((e) => {
                  o = n.requestAnimationFrame(() => {
                    const { width: i, height: s } = t;
                    let n = i,
                      r = s;
                    e.forEach((e) => {
                      let { contentBoxSize: i, contentRect: s, target: o } = e;
                      (o && o !== t.el) ||
                        ((n = s ? s.width : (i[0] || i).inlineSize),
                        (r = s ? s.height : (i[0] || i).blockSize));
                    }),
                      (n === i && r === s) || a();
                  });
                })),
                r.observe(t.el))
              : (n.addEventListener("resize", a),
                n.addEventListener("orientationchange", l));
          }),
            i("destroy", () => {
              o && n.cancelAnimationFrame(o),
                r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                n.removeEventListener("resize", a),
                n.removeEventListener("orientationchange", l);
            });
        },
        function (e) {
          let { swiper: t, extendParams: i, on: s, emit: n } = e;
          const r = [],
            o = y(),
            a = function (e, t) {
              void 0 === t && (t = {});
              const i = new (o.MutationObserver || o.WebkitMutationObserver)(
                (e) => {
                  if (1 === e.length) return void n("observerUpdate", e[0]);
                  const t = function () {
                    n("observerUpdate", e[0]);
                  };
                  o.requestAnimationFrame
                    ? o.requestAnimationFrame(t)
                    : o.setTimeout(t, 0);
                }
              );
              i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
              }),
                r.push(i);
            };
          i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            s("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = t.$el.parents();
                  for (let t = 0; t < e.length; t += 1) a(e[t]);
                }
                a(t.$el[0], { childList: t.params.observeSlideChildren }),
                  a(t.$wrapperEl[0], { attributes: !1 });
              }
            }),
            s("destroy", () => {
              r.forEach((e) => {
                e.disconnect();
              }),
                r.splice(0, r.length);
            });
        },
      ]);
    const ue = ce;
    function he(e, t, i, s) {
      const n = f();
      return (
        e.params.createElements &&
          Object.keys(s).forEach((r) => {
            if (!i[r] && !0 === i.auto) {
              let o = e.$el.children(`.${s[r]}`)[0];
              o ||
                ((o = n.createElement("div")),
                (o.className = s[r]),
                e.$el.append(o)),
                (i[r] = o),
                (t[r] = o);
            }
          }),
        i
      );
    }
    function pe(e) {
      let { swiper: t, extendParams: i, on: s, emit: n } = e;
      function r(e) {
        let i;
        return (
          e &&
            ((i = T(e)),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              i.length > 1 &&
              1 === t.$el.find(e).length &&
              (i = t.$el.find(e))),
          i
        );
      }
      function o(e, i) {
        const s = t.params.navigation;
        e &&
          e.length > 0 &&
          (e[i ? "addClass" : "removeClass"](s.disabledClass),
          e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = i),
          t.params.watchOverflow &&
            t.enabled &&
            e[t.isLocked ? "addClass" : "removeClass"](s.lockClass));
      }
      function a() {
        if (t.params.loop) return;
        const { $nextEl: e, $prevEl: i } = t.navigation;
        o(i, t.isBeginning && !t.params.rewind),
          o(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
      }
      function d(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
      }
      function c() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = he(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        const i = r(e.nextEl),
          s = r(e.prevEl);
        i && i.length > 0 && i.on("click", d),
          s && s.length > 0 && s.on("click", l),
          Object.assign(t.navigation, {
            $nextEl: i,
            nextEl: i && i[0],
            $prevEl: s,
            prevEl: s && s[0],
          }),
          t.enabled ||
            (i && i.addClass(e.lockClass), s && s.addClass(e.lockClass));
      }
      function u() {
        const { $nextEl: e, $prevEl: i } = t.navigation;
        e &&
          e.length &&
          (e.off("click", d), e.removeClass(t.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", l),
            i.removeClass(t.params.navigation.disabledClass));
      }
      i({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
        },
      }),
        (t.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        s("init", () => {
          c(), a();
        }),
        s("toEdge fromEdge lock unlock", () => {
          a();
        }),
        s("destroy", () => {
          u();
        }),
        s("enable disable", () => {
          const { $nextEl: e, $prevEl: i } = t.navigation;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            ),
            i &&
              i[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              );
        }),
        s("click", (e, i) => {
          const { $nextEl: s, $prevEl: r } = t.navigation,
            o = i.target;
          if (t.params.navigation.hideOnClick && !T(o).is(r) && !T(o).is(s)) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === o || t.pagination.el.contains(o))
            )
              return;
            let e;
            s
              ? (e = s.hasClass(t.params.navigation.hiddenClass))
              : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
              n(!0 === e ? "navigationShow" : "navigationHide"),
              s && s.toggleClass(t.params.navigation.hiddenClass),
              r && r.toggleClass(t.params.navigation.hiddenClass);
          }
        }),
        Object.assign(t.navigation, { update: a, init: c, destroy: u });
    }
    function ge(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function me(e) {
      let { swiper: t, extendParams: i, on: s, emit: n } = e;
      const r = "swiper-pagination";
      let o;
      i({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
        },
      }),
        (t.pagination = { el: null, $el: null, bullets: [] });
      let a = 0;
      function l() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          !t.pagination.$el ||
          0 === t.pagination.$el.length
        );
      }
      function d(e, i) {
        const { bulletActiveClass: s } = t.params.pagination;
        e[i]().addClass(`${s}-${i}`)[i]().addClass(`${s}-${i}-${i}`);
      }
      function c() {
        const e = t.rtl,
          i = t.params.pagination;
        if (l()) return;
        const s =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          r = t.pagination.$el;
        let c;
        const u = t.params.loop
          ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((c = Math.ceil(
                (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
              )),
              c > s - 1 - 2 * t.loopedSlides && (c -= s - 2 * t.loopedSlides),
              c > u - 1 && (c -= u),
              c < 0 && "bullets" !== t.params.paginationType && (c = u + c))
            : (c = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
          "bullets" === i.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const s = t.pagination.bullets;
          let n, l, u;
          if (
            (i.dynamicBullets &&
              ((o = s
                .eq(0)
                [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              r.css(
                t.isHorizontal() ? "width" : "height",
                o * (i.dynamicMainBullets + 4) + "px"
              ),
              i.dynamicMainBullets > 1 &&
                void 0 !== t.previousIndex &&
                ((a += c - (t.previousIndex - t.loopedSlides || 0)),
                a > i.dynamicMainBullets - 1
                  ? (a = i.dynamicMainBullets - 1)
                  : a < 0 && (a = 0)),
              (n = Math.max(c - a, 0)),
              (l = n + (Math.min(s.length, i.dynamicMainBullets) - 1)),
              (u = (l + n) / 2)),
            s.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${i.bulletActiveClass}${e}`)
                .join(" ")
            ),
            r.length > 1)
          )
            s.each((e) => {
              const t = T(e),
                s = t.index();
              s === c && t.addClass(i.bulletActiveClass),
                i.dynamicBullets &&
                  (s >= n &&
                    s <= l &&
                    t.addClass(`${i.bulletActiveClass}-main`),
                  s === n && d(t, "prev"),
                  s === l && d(t, "next"));
            });
          else {
            const e = s.eq(c),
              r = e.index();
            if ((e.addClass(i.bulletActiveClass), i.dynamicBullets)) {
              const e = s.eq(n),
                o = s.eq(l);
              for (let e = n; e <= l; e += 1)
                s.eq(e).addClass(`${i.bulletActiveClass}-main`);
              if (t.params.loop)
                if (r >= s.length) {
                  for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                    s.eq(s.length - e).addClass(`${i.bulletActiveClass}-main`);
                  s.eq(s.length - i.dynamicMainBullets - 1).addClass(
                    `${i.bulletActiveClass}-prev`
                  );
                } else d(e, "prev"), d(o, "next");
              else d(e, "prev"), d(o, "next");
            }
          }
          if (i.dynamicBullets) {
            const n = Math.min(s.length, i.dynamicMainBullets + 4),
              r = (o * n - o) / 2 - u * o,
              a = e ? "right" : "left";
            s.css(t.isHorizontal() ? a : "top", `${r}px`);
          }
        }
        if (
          ("fraction" === i.type &&
            (r.find(ge(i.currentClass)).text(i.formatFractionCurrent(c + 1)),
            r.find(ge(i.totalClass)).text(i.formatFractionTotal(u))),
          "progressbar" === i.type)
        ) {
          let e;
          e = i.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const s = (c + 1) / u;
          let n = 1,
            o = 1;
          "horizontal" === e ? (n = s) : (o = s),
            r
              .find(ge(i.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${o})`)
              .transition(t.params.speed);
        }
        "custom" === i.type && i.renderCustom
          ? (r.html(i.renderCustom(t, c + 1, u)), n("paginationRender", r[0]))
          : n("paginationUpdate", r[0]),
          t.params.watchOverflow &&
            t.enabled &&
            r[t.isLocked ? "addClass" : "removeClass"](i.lockClass);
      }
      function u() {
        const e = t.params.pagination;
        if (l()) return;
        const i =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          s = t.pagination.$el;
        let r = "";
        if ("bullets" === e.type) {
          let n = t.params.loop
            ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.loop &&
            n > i &&
            (n = i);
          for (let i = 0; i < n; i += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, i, e.bulletClass))
              : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
          s.html(r), (t.pagination.bullets = s.find(ge(e.bulletClass)));
        }
        "fraction" === e.type &&
          ((r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          s.html(r)),
          "progressbar" === e.type &&
            ((r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
            s.html(r)),
          "custom" !== e.type && n("paginationRender", t.pagination.$el[0]);
      }
      function h() {
        t.params.pagination = he(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" }
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let i = T(e.el);
        0 !== i.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            i.length > 1 &&
            ((i = t.$el.find(e.el)),
            i.length > 1 &&
              (i = i.filter((e) => T(e).parents(".swiper")[0] === t.el))),
          "bullets" === e.type && e.clickable && i.addClass(e.clickableClass),
          i.addClass(e.modifierClass + e.type),
          i.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          "bullets" === e.type &&
            e.dynamicBullets &&
            (i.addClass(`${e.modifierClass}${e.type}-dynamic`),
            (a = 0),
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
          "progressbar" === e.type &&
            e.progressbarOpposite &&
            i.addClass(e.progressbarOppositeClass),
          e.clickable &&
            i.on("click", ge(e.bulletClass), function (e) {
              e.preventDefault();
              let i = T(this).index() * t.params.slidesPerGroup;
              t.params.loop && (i += t.loopedSlides), t.slideTo(i);
            }),
          Object.assign(t.pagination, { $el: i, el: i[0] }),
          t.enabled || i.addClass(e.lockClass));
      }
      function p() {
        const e = t.params.pagination;
        if (l()) return;
        const i = t.pagination.$el;
        i.removeClass(e.hiddenClass),
          i.removeClass(e.modifierClass + e.type),
          i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.pagination.bullets &&
            t.pagination.bullets.removeClass &&
            t.pagination.bullets.removeClass(e.bulletActiveClass),
          e.clickable && i.off("click", ge(e.bulletClass));
      }
      s("init", () => {
        h(), u(), c();
      }),
        s("activeIndexChange", () => {
          (t.params.loop || void 0 === t.snapIndex) && c();
        }),
        s("snapIndexChange", () => {
          t.params.loop || c();
        }),
        s("slidesLengthChange", () => {
          t.params.loop && (u(), c());
        }),
        s("snapGridLengthChange", () => {
          t.params.loop || (u(), c());
        }),
        s("destroy", () => {
          p();
        }),
        s("enable disable", () => {
          const { $el: e } = t.pagination;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.pagination.lockClass
            );
        }),
        s("lock unlock", () => {
          c();
        }),
        s("click", (e, i) => {
          const s = i.target,
            { $el: r } = t.pagination;
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r.length > 0 &&
            !T(s).hasClass(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && s === t.navigation.nextEl) ||
                (t.navigation.prevEl && s === t.navigation.prevEl))
            )
              return;
            const e = r.hasClass(t.params.pagination.hiddenClass);
            n(!0 === e ? "paginationShow" : "paginationHide"),
              r.toggleClass(t.params.pagination.hiddenClass);
          }
        }),
        Object.assign(t.pagination, {
          render: u,
          update: c,
          init: h,
          destroy: p,
        });
    }
    function fe(e) {
      let { swiper: t, extendParams: i, on: s } = e;
      i({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let n = !1,
        r = !1;
      function o() {
        const e = t.thumbs.swiper;
        if (!e) return;
        const i = e.clickedIndex,
          s = e.clickedSlide;
        if (s && T(s).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
        if (null == i) return;
        let n;
        if (
          ((n = e.params.loop
            ? parseInt(T(e.clickedSlide).attr("data-swiper-slide-index"), 10)
            : i),
          t.params.loop)
        ) {
          let e = t.activeIndex;
          t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
            (t.loopFix(),
            (t._clientLeft = t.$wrapperEl[0].clientLeft),
            (e = t.activeIndex));
          const i = t.slides
              .eq(e)
              .prevAll(`[data-swiper-slide-index="${n}"]`)
              .eq(0)
              .index(),
            s = t.slides
              .eq(e)
              .nextAll(`[data-swiper-slide-index="${n}"]`)
              .eq(0)
              .index();
          n = void 0 === i ? s : void 0 === s ? i : s - e < e - i ? s : i;
        }
        t.slideTo(n);
      }
      function a() {
        const { thumbs: e } = t.params;
        if (n) return !1;
        n = !0;
        const i = t.constructor;
        if (e.swiper instanceof i)
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            });
        else if (z(e.swiper)) {
          const s = Object.assign({}, e.swiper);
          Object.assign(s, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new i(s)),
            (r = !0);
        }
        return (
          t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
          t.thumbs.swiper.on("tap", o),
          !0
        );
      }
      function l(e) {
        const i = t.thumbs.swiper;
        if (!i) return;
        const s =
            "auto" === i.params.slidesPerView
              ? i.slidesPerViewDynamic()
              : i.params.slidesPerView,
          n = t.params.thumbs.autoScrollOffset,
          r = n && !i.params.loop;
        if (t.realIndex !== i.realIndex || r) {
          let o,
            a,
            l = i.activeIndex;
          if (i.params.loop) {
            i.slides.eq(l).hasClass(i.params.slideDuplicateClass) &&
              (i.loopFix(),
              (i._clientLeft = i.$wrapperEl[0].clientLeft),
              (l = i.activeIndex));
            const e = i.slides
                .eq(l)
                .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index(),
              s = i.slides
                .eq(l)
                .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index();
            (o =
              void 0 === e
                ? s
                : void 0 === s
                ? e
                : s - l == l - e
                ? i.params.slidesPerGroup > 1
                  ? s
                  : l
                : s - l < l - e
                ? s
                : e),
              (a = t.activeIndex > t.previousIndex ? "next" : "prev");
          } else (o = t.realIndex), (a = o > t.previousIndex ? "next" : "prev");
          r && (o += "next" === a ? n : -1 * n),
            i.visibleSlidesIndexes &&
              i.visibleSlidesIndexes.indexOf(o) < 0 &&
              (i.params.centeredSlides
                ? (o =
                    o > l
                      ? o - Math.floor(s / 2) + 1
                      : o + Math.floor(s / 2) - 1)
                : o > l && i.params.slidesPerGroup,
              i.slideTo(o, e ? 0 : void 0));
        }
        let o = 1;
        const a = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (o = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (o = 1),
          (o = Math.floor(o)),
          i.slides.removeClass(a),
          i.params.loop || (i.params.virtual && i.params.virtual.enabled))
        )
          for (let e = 0; e < o; e += 1)
            i.$wrapperEl
              .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
              .addClass(a);
        else
          for (let e = 0; e < o; e += 1)
            i.slides.eq(t.realIndex + e).addClass(a);
      }
      (t.thumbs = { swiper: null }),
        s("beforeInit", () => {
          const { thumbs: e } = t.params;
          e && e.swiper && (a(), l(!0));
        }),
        s("slideChange update resize observerUpdate", () => {
          t.thumbs.swiper && l();
        }),
        s("setTransition", (e, i) => {
          const s = t.thumbs.swiper;
          s && s.setTransition(i);
        }),
        s("beforeDestroy", () => {
          const e = t.thumbs.swiper;
          e && r && e && e.destroy();
        }),
        Object.assign(t.thumbs, { init: a, update: l });
    }
    function ve() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)'
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    window.addEventListener("load", function (e) {
      ve(),
        document.querySelector(".advantages__swiper") &&
          new ue(".advantages__right", {
            modules: [pe, me],
            observer: !0,
            observeParents: !0,
            slidesPerView: 3,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 800,
            loop: !1,
            lazy: !0,
            navigation: {
              nextEl:
                ".advantages-slider__arrows .advantages-slider__arrow-next",
              prevEl:
                ".advantages-slider__arrows .advantages-slider__arrow-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 15 },
              992: { slidesPerView: 3, spaceBetween: 20 },
              1268: { slidesPerView: 3, spaceBetween: 30 },
            },
            on: {},
          }),
			 document.querySelector(".about__swiper") &&
          new ue(".about__right ", {
            modules: [pe, me],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: !1,
            speed: 800,
            loop: !1,
            lazy: !0,
            on: {},
          }),
        document.querySelector(".diplom__swiper") &&
          new ue(".diplom__right", {
            modules: [pe, me],
            observer: !0,
            observeParents: !0,
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 800,
            loop: !0,
            lazy: !0,
            navigation: {
              nextEl: ".diplom-slider__arrows .diplom-slider__arrow-next",
              prevEl: ".diplom-slider__arrows .diplom-slider__arrow-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 15 },
              992: { slidesPerView: 3, spaceBetween: 20 },
              1268: { slidesPerView: 3, spaceBetween: 30 },
            },
            on: {},
          }),
        document.querySelector(".reviews__swiper") &&
          new ue(".reviews__body", {
            modules: [pe, me],
            observer: !0,
            observeParents: !0,
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 800,
            loop: !0,
            lazy: !0,
            navigation: {
              nextEl: ".reviews-slider__arrows .reviews-slider__arrow-next",
              prevEl: ".reviews-slider__arrows .reviews-slider__arrow-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 10 },
              468: { slidesPerView: 2, spaceBetween: 15 },
              792: { slidesPerView: 3, spaceBetween: 20 },
              1268: { slidesPerView: 4, spaceBetween: 30 },
            },
            on: {},
          }),
        document.querySelector(".product__swiper-main") &&
          new ue(".product__main-images", {
            modules: [pe, me, fe],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 800,
            loop: !0,
            lazy: !0,
            thumbs: {
              swiper: {
                el: ".product__sub-images",
                breakpoints: {
                  320: {
                    spaceBetween: 10,
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    direction: "horizontal",
                  },
                  500: {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                    direction: "horizontal",
                  },
                  1100: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                    direction: "horizontal",
                  },
                },
              },
            },
            navigation: {
              nextEl: ".product-slider__arrows .product-slider__arrow-next",
              prevEl: ".product-slider__arrows .product-slider__arrow-prev",
            },
            on: {},
          }),
        document.querySelector(".product__more__swiper") &&
          new ue(".product__more-body", {
            modules: [pe, me],
            observer: !0,
            observeParents: !0,
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 800,
            loop: !0,
            lazy: !0,
            navigation: {
              nextEl: ".more-slider__arrows .more-slider__arrow-next",
              prevEl: ".more-slider__arrows .more-slider__arrow-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 10 },
              468: { slidesPerView: 2, spaceBetween: 15 },
              792: { slidesPerView: 3, spaceBetween: 20 },
              1268: { slidesPerView: 4, spaceBetween: 30 },
            },
            on: {},
          }),
        document.querySelector(".newsdetail__more__swiper") &&
          new ue(".newsdetail__more-body", {
            modules: [pe, me],
            observer: !0,
            observeParents: !0,
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
            autoHeight: !1,
            speed: 800,
            loop: !0,
            lazy: !0,
            navigation: {
              nextEl:
                ".newsdetail-slider__arrows .newsdetail-slider__arrow-next",
              prevEl:
                ".newsdetail-slider__arrows .newsdetail-slider__arrow-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 10 },
              468: { slidesPerView: 1, spaceBetween: 15 },
              1e3: { slidesPerView: 2, spaceBetween: 20 },
              1268: { slidesPerView: 2, spaceBetween: 30 },
            },
            on: {},
          });
    });
    new (i(732))({
      elements_selector: "._lazy",
      class_loaded: "_lazy-loaded",
      use_native: !1,
    }).update();
    let ye = !1;
    setTimeout(() => {
      if (ye) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    var be = function () {
      return (
        (be =
          Object.assign ||
          function (e) {
            for (var t, i = 1, s = arguments.length; i < s; i++)
              for (var n in (t = arguments[i]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          }),
        be.apply(this, arguments)
      );
    };
    var we = "lgAfterAppendSlide",
      Ce = "lgInit",
      Se = "lgHasVideo",
      xe = "lgContainerResize",
      _e = "lgUpdateSlides",
      Ee = "lgAfterAppendSubHtml",
      Te = "lgBeforeOpen",
      Ie = "lgAfterOpen",
      Le = "lgSlideItemLoad",
      Oe = "lgBeforeSlide",
      ze = "lgAfterSlide",
      Pe = "lgPosterClick",
      Ae = "lgDragStart",
      Me = "lgDragMove",
      $e = "lgDragEnd",
      ke = "lgBeforeNextSlide",
      Be = "lgBeforePrevSlide",
      De = "lgBeforeClose",
      Ge = "lgAfterClose",
      Ve = {
        mode: "lg-slide",
        easing: "ease",
        speed: 400,
        licenseKey: "0000-0000-000-0000",
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 300,
        container: "",
        startAnimationDuration: 400,
        zoomFromOrigin: !0,
        hideBarsDelay: 0,
        showBarsAfter: 1e4,
        slideDelay: 0,
        supportLegacyBrowser: !0,
        allowMediaOverlap: !1,
        videoMaxSize: "1280-720",
        loadYouTubePoster: !0,
        defaultCaptionHeight: 0,
        ariaLabelledby: "",
        ariaDescribedby: "",
        closable: !0,
        swipeToClose: !0,
        closeOnTap: !0,
        showCloseIcon: !0,
        showMaximizeIcon: !1,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        controls: !0,
        slideEndAnimation: !0,
        hideControlOnEnd: !1,
        mousewheel: !1,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 2,
        numberOfSlideItemsInDom: 10,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: 0,
        iframeWidth: "100%",
        iframeHeight: "100%",
        iframeMaxWidth: "100%",
        iframeMaxHeight: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: "",
        isMobile: void 0,
        mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
        plugins: [],
        strings: {
          closeGallery: "Close gallery",
          toggleMaximize: "Toggle maximize",
          previousSlide: "Previous slide",
          nextSlide: "Next slide",
          download: "Download",
          playVideo: "Play video",
        },
      };
    var Fe = (function () {
      function e(e) {
        return (
          (this.cssVenderPrefixes = [
            "TransitionDuration",
            "TransitionTimingFunction",
            "Transform",
            "Transition",
          ]),
          (this.selector = this._getSelector(e)),
          (this.firstElement = this._getFirstEl()),
          this
        );
      }
      return (
        (e.generateUUID = function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" == e ? t : (3 & t) | 8).toString(16);
            }
          );
        }),
        (e.prototype._getSelector = function (e, t) {
          return (
            void 0 === t && (t = document),
            "string" != typeof e
              ? e
              : ((t = t || document),
                "#" === e.substring(0, 1)
                  ? t.querySelector(e)
                  : t.querySelectorAll(e))
          );
        }),
        (e.prototype._each = function (e) {
          return this.selector
            ? (void 0 !== this.selector.length
                ? [].forEach.call(this.selector, e)
                : e(this.selector, 0),
              this)
            : this;
        }),
        (e.prototype._setCssVendorPrefix = function (e, t, i) {
          var s = t.replace(/-([a-z])/gi, function (e, t) {
            return t.toUpperCase();
          });
          -1 !== this.cssVenderPrefixes.indexOf(s)
            ? ((e.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
              (e.style["webkit" + s] = i),
              (e.style["moz" + s] = i),
              (e.style["ms" + s] = i),
              (e.style["o" + s] = i))
            : (e.style[s] = i);
        }),
        (e.prototype._getFirstEl = function () {
          return this.selector && void 0 !== this.selector.length
            ? this.selector[0]
            : this.selector;
        }),
        (e.prototype.isEventMatched = function (e, t) {
          var i = t.split(".");
          return e
            .split(".")
            .filter(function (e) {
              return e;
            })
            .every(function (e) {
              return -1 !== i.indexOf(e);
            });
        }),
        (e.prototype.attr = function (e, t) {
          return void 0 === t
            ? this.firstElement
              ? this.firstElement.getAttribute(e)
              : ""
            : (this._each(function (i) {
                i.setAttribute(e, t);
              }),
              this);
        }),
        (e.prototype.find = function (e) {
          return He(this._getSelector(e, this.selector));
        }),
        (e.prototype.first = function () {
          return this.selector && void 0 !== this.selector.length
            ? He(this.selector[0])
            : He(this.selector);
        }),
        (e.prototype.eq = function (e) {
          return He(this.selector[e]);
        }),
        (e.prototype.parent = function () {
          return He(this.selector.parentElement);
        }),
        (e.prototype.get = function () {
          return this._getFirstEl();
        }),
        (e.prototype.removeAttr = function (e) {
          var t = e.split(" ");
          return (
            this._each(function (e) {
              t.forEach(function (t) {
                return e.removeAttribute(t);
              });
            }),
            this
          );
        }),
        (e.prototype.wrap = function (e) {
          if (!this.firstElement) return this;
          var t = document.createElement("div");
          return (
            (t.className = e),
            this.firstElement.parentNode.insertBefore(t, this.firstElement),
            this.firstElement.parentNode.removeChild(this.firstElement),
            t.appendChild(this.firstElement),
            this
          );
        }),
        (e.prototype.addClass = function (e) {
          return (
            void 0 === e && (e = ""),
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.add(e);
              });
            }),
            this
          );
        }),
        (e.prototype.removeClass = function (e) {
          return (
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.remove(e);
              });
            }),
            this
          );
        }),
        (e.prototype.hasClass = function (e) {
          return !!this.firstElement && this.firstElement.classList.contains(e);
        }),
        (e.prototype.hasAttribute = function (e) {
          return !!this.firstElement && this.firstElement.hasAttribute(e);
        }),
        (e.prototype.toggleClass = function (e) {
          return this.firstElement
            ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
            : this;
        }),
        (e.prototype.css = function (e, t) {
          var i = this;
          return (
            this._each(function (s) {
              i._setCssVendorPrefix(s, e, t);
            }),
            this
          );
        }),
        (e.prototype.on = function (t, i) {
          var s = this;
          return this.selector
            ? (t.split(" ").forEach(function (t) {
                Array.isArray(e.eventListeners[t]) ||
                  (e.eventListeners[t] = []),
                  e.eventListeners[t].push(i),
                  s.selector.addEventListener(t.split(".")[0], i);
              }),
              this)
            : this;
        }),
        (e.prototype.once = function (e, t) {
          var i = this;
          return (
            this.on(e, function () {
              i.off(e), t(e);
            }),
            this
          );
        }),
        (e.prototype.off = function (t) {
          var i = this;
          return this.selector
            ? (Object.keys(e.eventListeners).forEach(function (s) {
                i.isEventMatched(t, s) &&
                  (e.eventListeners[s].forEach(function (e) {
                    i.selector.removeEventListener(s.split(".")[0], e);
                  }),
                  (e.eventListeners[s] = []));
              }),
              this)
            : this;
        }),
        (e.prototype.trigger = function (e, t) {
          if (!this.firstElement) return this;
          var i = new CustomEvent(e.split(".")[0], { detail: t || null });
          return this.firstElement.dispatchEvent(i), this;
        }),
        (e.prototype.load = function (e) {
          var t = this;
          return (
            fetch(e)
              .then(function (e) {
                return e.text();
              })
              .then(function (e) {
                t.selector.innerHTML = e;
              }),
            this
          );
        }),
        (e.prototype.html = function (e) {
          return void 0 === e
            ? this.firstElement
              ? this.firstElement.innerHTML
              : ""
            : (this._each(function (t) {
                t.innerHTML = e;
              }),
              this);
        }),
        (e.prototype.append = function (e) {
          return (
            this._each(function (t) {
              "string" == typeof e
                ? t.insertAdjacentHTML("beforeend", e)
                : t.appendChild(e);
            }),
            this
          );
        }),
        (e.prototype.prepend = function (e) {
          return (
            this._each(function (t) {
              t.insertAdjacentHTML("afterbegin", e);
            }),
            this
          );
        }),
        (e.prototype.remove = function () {
          return (
            this._each(function (e) {
              e.parentNode.removeChild(e);
            }),
            this
          );
        }),
        (e.prototype.empty = function () {
          return (
            this._each(function (e) {
              e.innerHTML = "";
            }),
            this
          );
        }),
        (e.prototype.scrollTop = function (e) {
          return void 0 !== e
            ? ((document.body.scrollTop = e),
              (document.documentElement.scrollTop = e),
              this)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }),
        (e.prototype.scrollLeft = function (e) {
          return void 0 !== e
            ? ((document.body.scrollLeft = e),
              (document.documentElement.scrollLeft = e),
              this)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }),
        (e.prototype.offset = function () {
          if (!this.firstElement) return { left: 0, top: 0 };
          var e = this.firstElement.getBoundingClientRect(),
            t = He("body").style().marginLeft;
          return {
            left: e.left - parseFloat(t) + this.scrollLeft(),
            top: e.top + this.scrollTop(),
          };
        }),
        (e.prototype.style = function () {
          return this.firstElement
            ? this.firstElement.currentStyle ||
                window.getComputedStyle(this.firstElement)
            : {};
        }),
        (e.prototype.width = function () {
          var e = this.style();
          return (
            this.firstElement.clientWidth -
            parseFloat(e.paddingLeft) -
            parseFloat(e.paddingRight)
          );
        }),
        (e.prototype.height = function () {
          var e = this.style();
          return (
            this.firstElement.clientHeight -
            parseFloat(e.paddingTop) -
            parseFloat(e.paddingBottom)
          );
        }),
        (e.eventListeners = {}),
        e
      );
    })();
    function He(e) {
      return (
        (function () {
          if ("function" == typeof window.CustomEvent) return !1;
          window.CustomEvent = function (e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: null };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
          };
        })(),
        Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
        new Fe(e)
      );
    }
    var Ne = [
      "src",
      "sources",
      "subHtml",
      "subHtmlUrl",
      "html",
      "video",
      "poster",
      "slideName",
      "responsive",
      "srcset",
      "sizes",
      "iframe",
      "downloadUrl",
      "download",
      "width",
      "facebookShareUrl",
      "tweetText",
      "iframeTitle",
      "twitterShareUrl",
      "pinterestShareUrl",
      "pinterestText",
      "fbHtml",
      "disqusIdentifier",
      "disqusUrl",
    ];
    function qe(e) {
      return "href" === e
        ? "src"
        : (e = (e =
            (e = e.replace("data-", "")).charAt(0).toLowerCase() +
            e.slice(1)).replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          }));
    }
    var Re = function (e, t, i, s) {
        void 0 === i && (i = 0);
        var n = He(e).attr("data-lg-size") || s;
        if (n) {
          var r = n.split(",");
          if (r[1])
            for (var o = window.innerWidth, a = 0; a < r.length; a++) {
              var l = r[a];
              if (parseInt(l.split("-")[2], 10) > o) {
                n = l;
                break;
              }
              a === r.length - 1 && (n = l);
            }
          var d = n.split("-"),
            c = parseInt(d[0], 10),
            u = parseInt(d[1], 10),
            h = t.width(),
            p = t.height() - i,
            g = Math.min(h, c),
            m = Math.min(p, u),
            f = Math.min(g / c, m / u);
          return { width: c * f, height: u * f };
        }
      },
      Xe = function (e, t, i, s, n) {
        if (n) {
          var r = He(e).find("img").first();
          if (r.get()) {
            var o = t.get().getBoundingClientRect(),
              a = o.width,
              l = t.height() - (i + s),
              d = r.width(),
              c = r.height(),
              u = r.style(),
              h =
                (a - d) / 2 -
                r.offset().left +
                (parseFloat(u.paddingLeft) || 0) +
                (parseFloat(u.borderLeft) || 0) +
                He(window).scrollLeft() +
                o.left,
              p =
                (l - c) / 2 -
                r.offset().top +
                (parseFloat(u.paddingTop) || 0) +
                (parseFloat(u.borderTop) || 0) +
                He(window).scrollTop() +
                i;
            return (
              "translate3d(" +
              (h *= -1) +
              "px, " +
              (p *= -1) +
              "px, 0) scale3d(" +
              d / n.width +
              ", " +
              c / n.height +
              ", 1)"
            );
          }
        }
      },
      je = function (e, t, i, s, n, r) {
        return (
          '<div class="lg-video-cont lg-has-iframe" style="width:' +
          e +
          "; max-width:" +
          i +
          "; height: " +
          t +
          "; max-height:" +
          s +
          '">\n                    <iframe class="lg-object" frameborder="0" ' +
          (r ? 'title="' + r + '"' : "") +
          ' src="' +
          n +
          '"  allowfullscreen="true"></iframe>\n                </div>'
        );
      },
      Ye = function (e, t, i, s, n, r) {
        var o =
            "<img " +
            i +
            " " +
            (s ? 'srcset="' + s + '"' : "") +
            "  " +
            (n ? 'sizes="' + n + '"' : "") +
            ' class="lg-object lg-image" data-index="' +
            e +
            '" src="' +
            t +
            '" />',
          a = "";
        r &&
          (a = ("string" == typeof r ? JSON.parse(r) : r).map(function (e) {
            var t = "";
            return (
              Object.keys(e).forEach(function (i) {
                t += " " + i + '="' + e[i] + '"';
              }),
              "<source " + t + "></source>"
            );
          }));
        return "" + a + o;
      },
      We = function (e) {
        for (var t = [], i = [], s = "", n = 0; n < e.length; n++) {
          var r = e[n].split(" ");
          "" === r[0] && r.splice(0, 1), i.push(r[0]), t.push(r[1]);
        }
        for (var o = window.innerWidth, a = 0; a < t.length; a++)
          if (parseInt(t[a], 10) > o) {
            s = i[a];
            break;
          }
        return s;
      },
      Ze = function (e) {
        return !!e && !!e.complete && 0 !== e.naturalWidth;
      },
      Ue = function (e, t, i, s, n) {
        return (
          '<div class="lg-video-cont ' +
          (n && n.youtube
            ? "lg-has-youtube"
            : n && n.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
          '" style="' +
          i +
          '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
          s +
          '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
          s +
          '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
          (t || "") +
          '\n            <img class="lg-object lg-video-poster" src="' +
          e +
          '" />\n        </div>'
        );
      },
      Ke = function (e, t, i, s) {
        var n = [],
          r = (function () {
            for (var e = 0, t = 0, i = arguments.length; t < i; t++)
              e += arguments[t].length;
            var s = Array(e),
              n = 0;
            for (t = 0; t < i; t++)
              for (var r = arguments[t], o = 0, a = r.length; o < a; o++, n++)
                s[n] = r[o];
            return s;
          })(Ne, t);
        return (
          [].forEach.call(e, function (e) {
            for (var t = {}, o = 0; o < e.attributes.length; o++) {
              var a = e.attributes[o];
              if (a.specified) {
                var l = qe(a.name),
                  d = "";
                r.indexOf(l) > -1 && (d = l), d && (t[d] = a.value);
              }
            }
            var c = He(e),
              u = c.find("img").first().attr("alt"),
              h = c.attr("title"),
              p = s ? c.attr(s) : c.find("img").first().attr("src");
            (t.thumb = p),
              i && !t.subHtml && (t.subHtml = h || u || ""),
              (t.alt = u || h || ""),
              n.push(t);
          }),
          n
        );
      },
      Qe = function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      },
      Je = function (e, t, i) {
        if (!e)
          return t
            ? { html5: !0 }
            : void console.error(
                "lightGallery :- data-src is not provided on slide item " +
                  (i + 1) +
                  ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
              );
        var s = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
          ),
          n = e.match(
            /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
          ),
          r = e.match(
            /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
          );
        return s
          ? { youtube: s }
          : n
          ? { vimeo: n }
          : r
          ? { wistia: r }
          : void 0;
      },
      et = 0,
      tt = (function () {
        function e(e, t) {
          if (
            ((this.lgOpened = !1),
            (this.index = 0),
            (this.plugins = []),
            (this.lGalleryOn = !1),
            (this.lgBusy = !1),
            (this.currentItemsInDom = []),
            (this.prevScrollTop = 0),
            (this.isDummyImageRemoved = !1),
            (this.dragOrSwipeEnabled = !1),
            (this.mediaContainerPosition = { top: 0, bottom: 0 }),
            !e)
          )
            return this;
          if (
            (et++,
            (this.lgId = et),
            (this.el = e),
            (this.LGel = He(e)),
            this.generateSettings(t),
            this.buildModules(),
            this.settings.dynamic &&
              void 0 !== this.settings.dynamicEl &&
              !Array.isArray(this.settings.dynamicEl))
          )
            throw "When using dynamic mode, you must also define dynamicEl as an Array.";
          return (
            (this.galleryItems = this.getItems()),
            this.normalizeSettings(),
            this.init(),
            this.validateLicense(),
            this
          );
        }
        return (
          (e.prototype.generateSettings = function (e) {
            if (
              ((this.settings = be(be({}, Ve), e)),
              this.settings.isMobile &&
              "function" == typeof this.settings.isMobile
                ? this.settings.isMobile()
                : Qe())
            ) {
              var t = be(
                be({}, this.settings.mobileSettings),
                this.settings.mobileSettings
              );
              this.settings = be(be({}, this.settings), t);
            }
          }),
          (e.prototype.normalizeSettings = function () {
            this.settings.slideEndAnimation &&
              (this.settings.hideControlOnEnd = !1),
              this.settings.closable || (this.settings.swipeToClose = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              this.settings.dynamic && (this.zoomFromOrigin = !1),
              this.settings.container ||
                (this.settings.container = document.body),
              (this.settings.preload = Math.min(
                this.settings.preload,
                this.galleryItems.length
              ));
          }),
          (e.prototype.init = function () {
            var e = this;
            this.addSlideVideoInfo(this.galleryItems),
              this.buildStructure(),
              this.LGel.trigger(Ce, { instance: this }),
              this.settings.keyPress && this.keyPress(),
              setTimeout(function () {
                e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
              }, 50),
              this.arrow(),
              this.settings.mousewheel && this.mousewheel(),
              this.settings.dynamic || this.openGalleryOnItemClick();
          }),
          (e.prototype.openGalleryOnItemClick = function () {
            for (
              var e = this,
                t = function (t) {
                  var s = i.items[t],
                    n = He(s),
                    r = Fe.generateUUID();
                  n.attr("data-lg-id", r).on(
                    "click.lgcustom-item-" + r,
                    function (i) {
                      i.preventDefault();
                      var n = e.settings.index || t;
                      e.openGallery(n, s);
                    }
                  );
                },
                i = this,
                s = 0;
              s < this.items.length;
              s++
            )
              t(s);
          }),
          (e.prototype.buildModules = function () {
            var e = this;
            this.settings.plugins.forEach(function (t) {
              e.plugins.push(new t(e, He));
            });
          }),
          (e.prototype.validateLicense = function () {
            this.settings.licenseKey
              ? "0000-0000-000-0000" === this.settings.licenseKey &&
                console.warn(
                  "lightGallery: " +
                    this.settings.licenseKey +
                    " license key is not valid for production use"
                )
              : console.error("Please provide a valid license key");
          }),
          (e.prototype.getSlideItem = function (e) {
            return He(this.getSlideItemId(e));
          }),
          (e.prototype.getSlideItemId = function (e) {
            return "#lg-item-" + this.lgId + "-" + e;
          }),
          (e.prototype.getIdName = function (e) {
            return e + "-" + this.lgId;
          }),
          (e.prototype.getElementById = function (e) {
            return He("#" + this.getIdName(e));
          }),
          (e.prototype.manageSingleSlideClassName = function () {
            this.galleryItems.length < 2
              ? this.outer.addClass("lg-single-item")
              : this.outer.removeClass("lg-single-item");
          }),
          (e.prototype.buildStructure = function () {
            var e = this;
            if (!(this.$container && this.$container.get())) {
              var t = "",
                i = "";
              this.settings.controls &&
                (t =
                  '<button type="button" id="' +
                  this.getIdName("lg-prev") +
                  '" aria-label="' +
                  this.settings.strings.previousSlide +
                  '" class="lg-prev lg-icon"> ' +
                  this.settings.prevHtml +
                  ' </button>\n                <button type="button" id="' +
                  this.getIdName("lg-next") +
                  '" aria-label="' +
                  this.settings.strings.nextSlide +
                  '" class="lg-next lg-icon"> ' +
                  this.settings.nextHtml +
                  " </button>"),
                ".lg-item" !== this.settings.appendSubHtmlTo &&
                  (i =
                    '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
              var s = "";
              this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
              var n = this.settings.ariaLabelledby
                  ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                  : "",
                r = this.settings.ariaDescribedby
                  ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                  : "",
                o =
                  "lg-container " +
                  this.settings.addClass +
                  " " +
                  (document.body !== this.settings.container
                    ? "lg-inline"
                    : ""),
                a =
                  this.settings.closable && this.settings.showCloseIcon
                    ? '<button type="button" aria-label="' +
                      this.settings.strings.closeGallery +
                      '" id="' +
                      this.getIdName("lg-close") +
                      '" class="lg-close lg-icon"></button>'
                    : "",
                l = this.settings.showMaximizeIcon
                  ? '<button type="button" aria-label="' +
                    this.settings.strings.toggleMaximize +
                    '" id="' +
                    this.getIdName("lg-maximize") +
                    '" class="lg-maximize lg-icon"></button>'
                  : "",
                d =
                  '\n        <div class="' +
                  o +
                  '" id="' +
                  this.getIdName("lg-container") +
                  '" tabindex="-1" aria-modal="true" ' +
                  n +
                  " " +
                  r +
                  ' role="dialog"\n        >\n            <div id="' +
                  this.getIdName("lg-backdrop") +
                  '" class="lg-backdrop"></div>\n\n            <div id="' +
                  this.getIdName("lg-outer") +
                  '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                  s +
                  ' ">\n\n              <div id="' +
                  this.getIdName("lg-content") +
                  '" class="lg-content">\n                <div id="' +
                  this.getIdName("lg-inner") +
                  '" class="lg-inner">\n                </div>\n                ' +
                  t +
                  '\n              </div>\n                <div id="' +
                  this.getIdName("lg-toolbar") +
                  '" class="lg-toolbar lg-group">\n                    ' +
                  l +
                  "\n                    " +
                  a +
                  "\n                    </div>\n                    " +
                  (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                  '\n                <div id="' +
                  this.getIdName("lg-components") +
                  '" class="lg-components">\n                    ' +
                  (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                  "\n                </div>\n            </div>\n        </div>\n        ";
              He(this.settings.container).append(d),
                document.body !== this.settings.container &&
                  He(this.settings.container).css("position", "relative"),
                (this.outer = this.getElementById("lg-outer")),
                (this.$lgComponents = this.getElementById("lg-components")),
                (this.$backdrop = this.getElementById("lg-backdrop")),
                (this.$container = this.getElementById("lg-container")),
                (this.$inner = this.getElementById("lg-inner")),
                (this.$content = this.getElementById("lg-content")),
                (this.$toolbar = this.getElementById("lg-toolbar")),
                this.$backdrop.css(
                  "transition-duration",
                  this.settings.backdropDuration + "ms"
                );
              var c = this.settings.mode + " ";
              this.manageSingleSlideClassName(),
                this.settings.enableDrag && (c += "lg-grab "),
                this.outer.addClass(c),
                this.$inner.css(
                  "transition-timing-function",
                  this.settings.easing
                ),
                this.$inner.css(
                  "transition-duration",
                  this.settings.speed + "ms"
                ),
                this.settings.download &&
                  this.$toolbar.append(
                    '<a id="' +
                      this.getIdName("lg-download") +
                      '" target="_blank" rel="noopener" aria-label="' +
                      this.settings.strings.download +
                      '" download class="lg-download lg-icon"></a>'
                  ),
                this.counter(),
                He(window).on(
                  "resize.lg.global" +
                    this.lgId +
                    " orientationchange.lg.global" +
                    this.lgId,
                  function () {
                    e.refreshOnResize();
                  }
                ),
                this.hideBars(),
                this.manageCloseGallery(),
                this.toggleMaximize(),
                this.initModules();
            }
          }),
          (e.prototype.refreshOnResize = function () {
            if (this.lgOpened) {
              var e = this.galleryItems[this.index].__slideVideoInfo;
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var t = this.mediaContainerPosition,
                i = t.top,
                s = t.bottom;
              if (
                ((this.currentImageSize = Re(
                  this.items[this.index],
                  this.outer,
                  i + s,
                  e && this.settings.videoMaxSize
                )),
                e && this.resizeVideoSlide(this.index, this.currentImageSize),
                this.zoomFromOrigin && !this.isDummyImageRemoved)
              ) {
                var n = this.getDummyImgStyles(this.currentImageSize);
                this.outer
                  .find(".lg-current .lg-dummy-img")
                  .first()
                  .attr("style", n);
              }
              this.LGel.trigger(xe);
            }
          }),
          (e.prototype.resizeVideoSlide = function (e, t) {
            var i = this.getVideoContStyle(t);
            this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
          }),
          (e.prototype.updateSlides = function (e, t) {
            if (
              (this.index > e.length - 1 && (this.index = e.length - 1),
              1 === e.length && (this.index = 0),
              e.length)
            ) {
              var i = this.galleryItems[t].src;
              (this.galleryItems = e),
                this.updateControls(),
                this.$inner.empty(),
                (this.currentItemsInDom = []);
              var s = 0;
              this.galleryItems.some(function (e, t) {
                return e.src === i && ((s = t), !0);
              }),
                (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
                this.loadContent(s, !0),
                this.getSlideItem(s).addClass("lg-current"),
                (this.index = s),
                this.updateCurrentCounter(s),
                this.LGel.trigger(_e);
            } else this.closeGallery();
          }),
          (e.prototype.getItems = function () {
            if (((this.items = []), this.settings.dynamic))
              return this.settings.dynamicEl || [];
            if ("this" === this.settings.selector) this.items.push(this.el);
            else if (this.settings.selector)
              if ("string" == typeof this.settings.selector)
                if (this.settings.selectWithin) {
                  var e = He(this.settings.selectWithin);
                  this.items = e.find(this.settings.selector).get();
                } else
                  this.items = this.el.querySelectorAll(this.settings.selector);
              else this.items = this.settings.selector;
            else this.items = this.el.children;
            return Ke(
              this.items,
              this.settings.extraProps,
              this.settings.getCaptionFromTitleOrAlt,
              this.settings.exThumbImage
            );
          }),
          (e.prototype.openGallery = function (e, t) {
            var i = this;
            if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
              (this.lgOpened = !0),
                this.outer.get().focus(),
                this.outer.removeClass("lg-hide-items"),
                this.$container.addClass("lg-show");
              var s = this.getItemsToBeInsertedToDom(e, e);
              this.currentItemsInDom = s;
              var n = "";
              s.forEach(function (e) {
                n = n + '<div id="' + e + '" class="lg-item"></div>';
              }),
                this.$inner.append(n),
                this.addHtml(e);
              var r = "";
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var o = this.mediaContainerPosition,
                a = o.top,
                l = o.bottom;
              this.settings.allowMediaOverlap ||
                this.setMediaContainerPosition(a, l);
              var d = this.galleryItems[e].__slideVideoInfo;
              this.zoomFromOrigin &&
                t &&
                ((this.currentImageSize = Re(
                  t,
                  this.outer,
                  a + l,
                  d && this.settings.videoMaxSize
                )),
                (r = Xe(t, this.outer, a, l, this.currentImageSize))),
                (this.zoomFromOrigin && r) ||
                  (this.outer.addClass(this.settings.startClass),
                  this.getSlideItem(e).removeClass("lg-complete"));
              var c = this.settings.zoomFromOrigin
                ? 100
                : this.settings.backdropDuration;
              setTimeout(function () {
                i.outer.addClass("lg-components-open");
              }, c),
                (this.index = e),
                this.LGel.trigger(Te),
                this.getSlideItem(e).addClass("lg-current"),
                (this.lGalleryOn = !1),
                (this.prevScrollTop = He(window).scrollTop()),
                setTimeout(function () {
                  if (i.zoomFromOrigin && r) {
                    var t = i.getSlideItem(e);
                    t.css("transform", r),
                      setTimeout(function () {
                        t
                          .addClass("lg-start-progress lg-start-end-progress")
                          .css(
                            "transition-duration",
                            i.settings.startAnimationDuration + "ms"
                          ),
                          i.outer.addClass("lg-zoom-from-image");
                      }),
                      setTimeout(function () {
                        t.css("transform", "translate3d(0, 0, 0)");
                      }, 100);
                  }
                  setTimeout(function () {
                    i.$backdrop.addClass("in"),
                      i.$container.addClass("lg-show-in");
                  }, 10),
                    (i.zoomFromOrigin && r) ||
                      setTimeout(function () {
                        i.outer.addClass("lg-visible");
                      }, i.settings.backdropDuration),
                    i.slide(e, !1, !1, !1),
                    i.LGel.trigger(Ie);
                }),
                document.body === this.settings.container &&
                  He("html").addClass("lg-on");
            }
          }),
          (e.prototype.getMediaContainerPosition = function () {
            if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
            var e = this.$toolbar.get().clientHeight || 0,
              t = this.outer.find(".lg-components .lg-sub-html").get(),
              i =
                this.settings.defaultCaptionHeight ||
                (t && t.clientHeight) ||
                0,
              s = this.outer.find(".lg-thumb-outer").get();
            return { top: e, bottom: (s ? s.clientHeight : 0) + i };
          }),
          (e.prototype.setMediaContainerPosition = function (e, t) {
            void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              this.$content.css("top", e + "px").css("bottom", t + "px");
          }),
          (e.prototype.hideBars = function () {
            var e = this;
            setTimeout(function () {
              e.outer.removeClass("lg-hide-items"),
                e.settings.hideBarsDelay > 0 &&
                  (e.outer.on(
                    "mousemove.lg click.lg touchstart.lg",
                    function () {
                      e.outer.removeClass("lg-hide-items"),
                        clearTimeout(e.hideBarTimeout),
                        (e.hideBarTimeout = setTimeout(function () {
                          e.outer.addClass("lg-hide-items");
                        }, e.settings.hideBarsDelay));
                    }
                  ),
                  e.outer.trigger("mousemove.lg"));
            }, this.settings.showBarsAfter);
          }),
          (e.prototype.initPictureFill = function (e) {
            if (this.settings.supportLegacyBrowser)
              try {
                picturefill({ elements: [e.get()] });
              } catch (e) {
                console.warn(
                  "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                );
              }
          }),
          (e.prototype.counter = function () {
            if (this.settings.counter) {
              var e =
                '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                this.getIdName("lg-counter-current") +
                '" class="lg-counter-current">' +
                (this.index + 1) +
                ' </span> /\n                <span id="' +
                this.getIdName("lg-counter-all") +
                '" class="lg-counter-all">' +
                this.galleryItems.length +
                " </span></div>";
              this.outer.find(this.settings.appendCounterTo).append(e);
            }
          }),
          (e.prototype.addHtml = function (e) {
            var t, i;
            if (
              (this.galleryItems[e].subHtmlUrl
                ? (i = this.galleryItems[e].subHtmlUrl)
                : (t = this.galleryItems[e].subHtml),
              !i)
            )
              if (t) {
                var s = t.substring(0, 1);
                ("." !== s && "#" !== s) ||
                  (t =
                    this.settings.subHtmlSelectorRelative &&
                    !this.settings.dynamic
                      ? He(this.items).eq(e).find(t).first().html()
                      : He(t).first().html());
              } else t = "";
            if (".lg-item" !== this.settings.appendSubHtmlTo)
              i
                ? this.outer.find(".lg-sub-html").load(i)
                : this.outer.find(".lg-sub-html").html(t);
            else {
              var n = He(this.getSlideItemId(e));
              i
                ? n.load(i)
                : n.append('<div class="lg-sub-html">' + t + "</div>");
            }
            null != t &&
              ("" === t
                ? this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .addClass("lg-empty-html")
                : this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .removeClass("lg-empty-html")),
              this.LGel.trigger(Ee, { index: e });
          }),
          (e.prototype.preload = function (e) {
            for (
              var t = 1;
              t <= this.settings.preload &&
              !(t >= this.galleryItems.length - e);
              t++
            )
              this.loadContent(e + t, !1);
            for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
              this.loadContent(e - i, !1);
          }),
          (e.prototype.getDummyImgStyles = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                margin-left: -" +
                  e.width / 2 +
                  "px;\n                margin-top: -" +
                  e.height / 2 +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getVideoContStyle = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getDummyImageContent = function (e, t, i) {
            var s;
            if ((this.settings.dynamic || (s = He(this.items).eq(t)), s)) {
              var n = void 0;
              if (
                !(n = this.settings.exThumbImage
                  ? s.attr(this.settings.exThumbImage)
                  : s.find("img").first().attr("src"))
              )
                return "";
              var r =
                "<img " +
                i +
                ' style="' +
                this.getDummyImgStyles(this.currentImageSize) +
                '" class="lg-dummy-img" src="' +
                n +
                '" />';
              return (
                e.addClass("lg-first-slide"),
                this.outer.addClass("lg-first-slide-loading"),
                r
              );
            }
            return "";
          }),
          (e.prototype.setImgMarkup = function (e, t, i) {
            var s = this.galleryItems[i],
              n = s.alt,
              r = s.srcset,
              o = s.sizes,
              a = s.sources,
              l = n ? 'alt="' + n + '"' : "",
              d =
                '<picture class="lg-img-wrap"> ' +
                (this.isFirstSlideWithZoomAnimation()
                  ? this.getDummyImageContent(t, i, l)
                  : Ye(i, e, l, r, o, a)) +
                "</picture>";
            t.prepend(d);
          }),
          (e.prototype.onSlideObjectLoad = function (e, t, i, s) {
            var n = e.find(".lg-object").first();
            Ze(n.get()) || t
              ? i()
              : (n.on("load.lg error.lg", function () {
                  i && i();
                }),
                n.on("error.lg", function () {
                  s && s();
                }));
          }),
          (e.prototype.onLgObjectLoad = function (e, t, i, s, n, r) {
            var o = this;
            this.onSlideObjectLoad(
              e,
              r,
              function () {
                o.triggerSlideItemLoad(e, t, i, s, n);
              },
              function () {
                e.addClass("lg-complete lg-complete_"),
                  e.html(
                    '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                  );
              }
            );
          }),
          (e.prototype.triggerSlideItemLoad = function (e, t, i, s, n) {
            var r = this,
              o = this.galleryItems[t],
              a = n && "video" === this.getSlideType(o) && !o.poster ? s : 0;
            setTimeout(function () {
              e.addClass("lg-complete lg-complete_"),
                r.LGel.trigger(Le, {
                  index: t,
                  delay: i || 0,
                  isFirstSlide: n,
                });
            }, a);
          }),
          (e.prototype.isFirstSlideWithZoomAnimation = function () {
            return !(
              this.lGalleryOn ||
              !this.zoomFromOrigin ||
              !this.currentImageSize
            );
          }),
          (e.prototype.addSlideVideoInfo = function (e) {
            var t = this;
            e.forEach(function (e, i) {
              (e.__slideVideoInfo = Je(e.src, !!e.video, i)),
                e.__slideVideoInfo &&
                  t.settings.loadYouTubePoster &&
                  !e.poster &&
                  e.__slideVideoInfo.youtube &&
                  (e.poster =
                    "//img.youtube.com/vi/" +
                    e.__slideVideoInfo.youtube[1] +
                    "/maxresdefault.jpg");
            });
          }),
          (e.prototype.loadContent = function (e, t) {
            var i = this,
              s = this.galleryItems[e],
              n = He(this.getSlideItemId(e)),
              r = s.poster,
              o = s.srcset,
              a = s.sizes,
              l = s.sources,
              d = s.src,
              c = s.video,
              u = c && "string" == typeof c ? JSON.parse(c) : c;
            if (s.responsive) {
              var h = s.responsive.split(",");
              d = We(h) || d;
            }
            var p = s.__slideVideoInfo,
              g = "",
              m = !!s.iframe,
              f = !this.lGalleryOn,
              v = 0;
            if (
              (f &&
                (v =
                  this.zoomFromOrigin && this.currentImageSize
                    ? this.settings.startAnimationDuration + 10
                    : this.settings.backdropDuration + 10),
              !n.hasClass("lg-loaded"))
            ) {
              if (p) {
                var y = this.mediaContainerPosition,
                  b = y.top,
                  w = y.bottom,
                  C = Re(
                    this.items[e],
                    this.outer,
                    b + w,
                    p && this.settings.videoMaxSize
                  );
                g = this.getVideoContStyle(C);
              }
              if (m) {
                var S = je(
                  this.settings.iframeWidth,
                  this.settings.iframeHeight,
                  this.settings.iframeMaxWidth,
                  this.settings.iframeMaxHeight,
                  d,
                  s.iframeTitle
                );
                n.prepend(S);
              } else if (r) {
                var x = "";
                f &&
                  this.zoomFromOrigin &&
                  this.currentImageSize &&
                  (x = this.getDummyImageContent(n, e, ""));
                S = Ue(r, x || "", g, this.settings.strings.playVideo, p);
                n.prepend(S);
              } else if (p) {
                S = '<div class="lg-video-cont " style="' + g + '"></div>';
                n.prepend(S);
              } else if ((this.setImgMarkup(d, n, e), o || l)) {
                var _ = n.find(".lg-object");
                this.initPictureFill(_);
              }
              (r || p) &&
                this.LGel.trigger(Se, {
                  index: e,
                  src: d,
                  html5Video: u,
                  hasPoster: !!r,
                }),
                this.LGel.trigger(we, { index: e }),
                this.lGalleryOn &&
                  ".lg-item" === this.settings.appendSubHtmlTo &&
                  this.addHtml(e);
            }
            var E = 0;
            v && !He(document.body).hasClass("lg-from-hash") && (E = v),
              this.isFirstSlideWithZoomAnimation() &&
                (setTimeout(function () {
                  n.removeClass(
                    "lg-start-end-progress lg-start-progress"
                  ).removeAttr("style");
                }, this.settings.startAnimationDuration + 100),
                n.hasClass("lg-loaded") ||
                  setTimeout(function () {
                    if (
                      "image" === i.getSlideType(s) &&
                      (n
                        .find(".lg-img-wrap")
                        .append(Ye(e, d, "", o, a, s.sources)),
                      o || l)
                    ) {
                      var t = n.find(".lg-object");
                      i.initPictureFill(t);
                    }
                    ("image" === i.getSlideType(s) ||
                      ("video" === i.getSlideType(s) && r)) &&
                      (i.onLgObjectLoad(n, e, v, E, !0, !1),
                      i.onSlideObjectLoad(
                        n,
                        !(!p || !p.html5 || r),
                        function () {
                          i.loadContentOnFirstSlideLoad(e, n, E);
                        },
                        function () {
                          i.loadContentOnFirstSlideLoad(e, n, E);
                        }
                      ));
                  }, this.settings.startAnimationDuration + 100)),
              n.addClass("lg-loaded"),
              (this.isFirstSlideWithZoomAnimation() &&
                ("video" !== this.getSlideType(s) || r)) ||
                this.onLgObjectLoad(n, e, v, E, f, !(!p || !p.html5 || r)),
              (this.zoomFromOrigin && this.currentImageSize) ||
                !n.hasClass("lg-complete_") ||
                this.lGalleryOn ||
                setTimeout(function () {
                  n.addClass("lg-complete");
                }, this.settings.backdropDuration),
              (this.lGalleryOn = !0),
              !0 === t &&
                (n.hasClass("lg-complete_")
                  ? this.preload(e)
                  : n
                      .find(".lg-object")
                      .first()
                      .on("load.lg error.lg", function () {
                        i.preload(e);
                      }));
          }),
          (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
            var s = this;
            setTimeout(function () {
              t.find(".lg-dummy-img").remove(),
                t.removeClass("lg-first-slide"),
                s.outer.removeClass("lg-first-slide-loading"),
                (s.isDummyImageRemoved = !0),
                s.preload(e);
            }, i + 300);
          }),
          (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
            var s = this;
            void 0 === i && (i = 0);
            var n = [],
              r = Math.max(i, 3);
            r = Math.min(r, this.galleryItems.length);
            var o = "lg-item-" + this.lgId + "-" + t;
            if (this.galleryItems.length <= 3)
              return (
                this.galleryItems.forEach(function (e, t) {
                  n.push("lg-item-" + s.lgId + "-" + t);
                }),
                n
              );
            if (e < (this.galleryItems.length - 1) / 2) {
              for (var a = e; a > e - r / 2 && a >= 0; a--)
                n.push("lg-item-" + this.lgId + "-" + a);
              var l = n.length;
              for (a = 0; a < r - l; a++)
                n.push("lg-item-" + this.lgId + "-" + (e + a + 1));
            } else {
              for (
                a = e;
                a <= this.galleryItems.length - 1 && a < e + r / 2;
                a++
              )
                n.push("lg-item-" + this.lgId + "-" + a);
              for (l = n.length, a = 0; a < r - l; a++)
                n.push("lg-item-" + this.lgId + "-" + (e - a - 1));
            }
            return (
              this.settings.loop &&
                (e === this.galleryItems.length - 1
                  ? n.push("lg-item-" + this.lgId + "-0")
                  : 0 === e &&
                    n.push(
                      "lg-item-" +
                        this.lgId +
                        "-" +
                        (this.galleryItems.length - 1)
                    )),
              -1 === n.indexOf(o) && n.push("lg-item-" + this.lgId + "-" + t),
              n
            );
          }),
          (e.prototype.organizeSlideItems = function (e, t) {
            var i = this,
              s = this.getItemsToBeInsertedToDom(
                e,
                t,
                this.settings.numberOfSlideItemsInDom
              );
            return (
              s.forEach(function (e) {
                -1 === i.currentItemsInDom.indexOf(e) &&
                  i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
              }),
              this.currentItemsInDom.forEach(function (e) {
                -1 === s.indexOf(e) && He("#" + e).remove();
              }),
              s
            );
          }),
          (e.prototype.getPreviousSlideIndex = function () {
            var e = 0;
            try {
              var t = this.outer.find(".lg-current").first().attr("id");
              e = parseInt(t.split("-")[3]) || 0;
            } catch (t) {
              e = 0;
            }
            return e;
          }),
          (e.prototype.setDownloadValue = function (e) {
            if (this.settings.download) {
              var t = this.galleryItems[e];
              if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                this.outer.addClass("lg-hide-download");
              else {
                var i = this.getElementById("lg-download");
                this.outer.removeClass("lg-hide-download"),
                  i.attr("href", t.downloadUrl || t.src),
                  t.download && i.attr("download", t.download);
              }
            }
          }),
          (e.prototype.makeSlideAnimation = function (e, t, i) {
            var s = this;
            this.lGalleryOn && i.addClass("lg-slide-progress"),
              setTimeout(
                function () {
                  s.outer.addClass("lg-no-trans"),
                    s.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-next-slide"),
                    "prev" === e
                      ? (t.addClass("lg-prev-slide"),
                        i.addClass("lg-next-slide"))
                      : (t.addClass("lg-next-slide"),
                        i.addClass("lg-prev-slide")),
                    setTimeout(function () {
                      s.outer.find(".lg-item").removeClass("lg-current"),
                        t.addClass("lg-current"),
                        s.outer.removeClass("lg-no-trans");
                    }, 50);
                },
                this.lGalleryOn ? this.settings.slideDelay : 0
              );
          }),
          (e.prototype.slide = function (e, t, i, s) {
            var n = this,
              r = this.getPreviousSlideIndex();
            if (
              ((this.currentItemsInDom = this.organizeSlideItems(e, r)),
              !this.lGalleryOn || r !== e)
            ) {
              var o = this.galleryItems.length;
              if (!this.lgBusy) {
                this.settings.counter && this.updateCurrentCounter(e);
                var a = this.getSlideItem(e),
                  l = this.getSlideItem(r),
                  d = this.galleryItems[e],
                  c = d.__slideVideoInfo;
                if (
                  (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                  this.setDownloadValue(e),
                  c)
                ) {
                  var u = this.mediaContainerPosition,
                    h = u.top,
                    p = u.bottom,
                    g = Re(
                      this.items[e],
                      this.outer,
                      h + p,
                      c && this.settings.videoMaxSize
                    );
                  this.resizeVideoSlide(e, g);
                }
                if (
                  (this.LGel.trigger(Oe, {
                    prevIndex: r,
                    index: e,
                    fromTouch: !!t,
                    fromThumb: !!i,
                  }),
                  (this.lgBusy = !0),
                  clearTimeout(this.hideBarTimeout),
                  this.arrowDisable(e),
                  s || (e < r ? (s = "prev") : e > r && (s = "next")),
                  t)
                ) {
                  this.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-current lg-next-slide");
                  var m = void 0,
                    f = void 0;
                  o > 2
                    ? ((m = e - 1),
                      (f = e + 1),
                      ((0 === e && r === o - 1) || (e === o - 1 && 0 === r)) &&
                        ((f = 0), (m = o - 1)))
                    : ((m = 0), (f = 1)),
                    "prev" === s
                      ? this.getSlideItem(f).addClass("lg-next-slide")
                      : this.getSlideItem(m).addClass("lg-prev-slide"),
                    a.addClass("lg-current");
                } else this.makeSlideAnimation(s, a, l);
                this.lGalleryOn
                  ? setTimeout(function () {
                      n.loadContent(e, !0),
                        ".lg-item" !== n.settings.appendSubHtmlTo &&
                          n.addHtml(e);
                    }, this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay))
                  : this.loadContent(e, !0),
                  setTimeout(function () {
                    (n.lgBusy = !1),
                      l.removeClass("lg-slide-progress"),
                      n.LGel.trigger(ze, {
                        prevIndex: r,
                        index: e,
                        fromTouch: t,
                        fromThumb: i,
                      });
                  }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                    (t ? 0 : this.settings.slideDelay));
              }
              this.index = e;
            }
          }),
          (e.prototype.updateCurrentCounter = function (e) {
            this.getElementById("lg-counter-current").html(e + 1 + "");
          }),
          (e.prototype.updateCounterTotal = function () {
            this.getElementById("lg-counter-all").html(
              this.galleryItems.length + ""
            );
          }),
          (e.prototype.getSlideType = function (e) {
            return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
          }),
          (e.prototype.touchMove = function (e, t, i) {
            var s = t.pageX - e.pageX,
              n = t.pageY - e.pageY,
              r = !1;
            if (
              (this.swipeDirection
                ? (r = !0)
                : Math.abs(s) > 15
                ? ((this.swipeDirection = "horizontal"), (r = !0))
                : Math.abs(n) > 15 &&
                  ((this.swipeDirection = "vertical"), (r = !0)),
              r)
            ) {
              var o = this.getSlideItem(this.index);
              if ("horizontal" === this.swipeDirection) {
                null == i || i.preventDefault(),
                  this.outer.addClass("lg-dragging"),
                  this.setTranslate(o, s, 0);
                var a = o.get().offsetWidth,
                  l = (15 * a) / 100 - Math.abs((10 * s) / 100);
                this.setTranslate(
                  this.outer.find(".lg-prev-slide").first(),
                  -a + s - l,
                  0
                ),
                  this.setTranslate(
                    this.outer.find(".lg-next-slide").first(),
                    a + s + l,
                    0
                  );
              } else if (
                "vertical" === this.swipeDirection &&
                this.settings.swipeToClose
              ) {
                null == i || i.preventDefault(),
                  this.$container.addClass("lg-dragging-vertical");
                var d = 1 - Math.abs(n) / window.innerHeight;
                this.$backdrop.css("opacity", d);
                var c = 1 - Math.abs(n) / (2 * window.innerWidth);
                this.setTranslate(o, 0, n, c, c),
                  Math.abs(n) > 100 &&
                    this.outer
                      .addClass("lg-hide-items")
                      .removeClass("lg-components-open");
              }
            }
          }),
          (e.prototype.touchEnd = function (e, t, i) {
            var s,
              n = this;
            "lg-slide" !== this.settings.mode &&
              this.outer.addClass("lg-slide"),
              setTimeout(function () {
                n.$container.removeClass("lg-dragging-vertical"),
                  n.outer
                    .removeClass("lg-dragging lg-hide-items")
                    .addClass("lg-components-open");
                var r = !0;
                if ("horizontal" === n.swipeDirection) {
                  s = e.pageX - t.pageX;
                  var o = Math.abs(e.pageX - t.pageX);
                  s < 0 && o > n.settings.swipeThreshold
                    ? (n.goToNextSlide(!0), (r = !1))
                    : s > 0 &&
                      o > n.settings.swipeThreshold &&
                      (n.goToPrevSlide(!0), (r = !1));
                } else if ("vertical" === n.swipeDirection) {
                  if (
                    ((s = Math.abs(e.pageY - t.pageY)),
                    n.settings.closable && n.settings.swipeToClose && s > 100)
                  )
                    return void n.closeGallery();
                  n.$backdrop.css("opacity", 1);
                }
                if (
                  (n.outer.find(".lg-item").removeAttr("style"),
                  r && Math.abs(e.pageX - t.pageX) < 5)
                ) {
                  var a = He(i.target);
                  n.isPosterElement(a) && n.LGel.trigger(Pe);
                }
                n.swipeDirection = void 0;
              }),
              setTimeout(function () {
                n.outer.hasClass("lg-dragging") ||
                  "lg-slide" === n.settings.mode ||
                  n.outer.removeClass("lg-slide");
              }, this.settings.speed + 100);
          }),
          (e.prototype.enableSwipe = function () {
            var e = this,
              t = {},
              i = {},
              s = !1,
              n = !1;
            this.settings.enableSwipe &&
              (this.$inner.on("touchstart.lg", function (i) {
                e.dragOrSwipeEnabled = !0;
                var s = e.getSlideItem(e.index);
                (!He(i.target).hasClass("lg-item") &&
                  !s.get().contains(i.target)) ||
                  e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  1 !== i.targetTouches.length ||
                  ((n = !0),
                  (e.touchAction = "swipe"),
                  e.manageSwipeClass(),
                  (t = {
                    pageX: i.targetTouches[0].pageX,
                    pageY: i.targetTouches[0].pageY,
                  }));
              }),
              this.$inner.on("touchmove.lg", function (r) {
                n &&
                  "swipe" === e.touchAction &&
                  1 === r.targetTouches.length &&
                  ((i = {
                    pageX: r.targetTouches[0].pageX,
                    pageY: r.targetTouches[0].pageY,
                  }),
                  e.touchMove(t, i, r),
                  (s = !0));
              }),
              this.$inner.on("touchend.lg", function (r) {
                if ("swipe" === e.touchAction) {
                  if (s) (s = !1), e.touchEnd(i, t, r);
                  else if (n) {
                    var o = He(r.target);
                    e.isPosterElement(o) && e.LGel.trigger(Pe);
                  }
                  (e.touchAction = void 0), (n = !1);
                }
              }));
          }),
          (e.prototype.enableDrag = function () {
            var e = this,
              t = {},
              i = {},
              s = !1,
              n = !1;
            this.settings.enableDrag &&
              (this.outer.on("mousedown.lg", function (i) {
                e.dragOrSwipeEnabled = !0;
                var n = e.getSlideItem(e.index);
                (He(i.target).hasClass("lg-item") ||
                  n.get().contains(i.target)) &&
                  (e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    (i.preventDefault(),
                    e.lgBusy ||
                      (e.manageSwipeClass(),
                      (t = { pageX: i.pageX, pageY: i.pageY }),
                      (s = !0),
                      (e.outer.get().scrollLeft += 1),
                      (e.outer.get().scrollLeft -= 1),
                      e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                      e.LGel.trigger(Ae))));
              }),
              He(window).on("mousemove.lg.global" + this.lgId, function (r) {
                s &&
                  e.lgOpened &&
                  ((n = !0),
                  (i = { pageX: r.pageX, pageY: r.pageY }),
                  e.touchMove(t, i),
                  e.LGel.trigger(Me));
              }),
              He(window).on("mouseup.lg.global" + this.lgId, function (r) {
                if (e.lgOpened) {
                  var o = He(r.target);
                  n
                    ? ((n = !1), e.touchEnd(i, t, r), e.LGel.trigger($e))
                    : e.isPosterElement(o) && e.LGel.trigger(Pe),
                    s &&
                      ((s = !1),
                      e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                }
              }));
          }),
          (e.prototype.triggerPosterClick = function () {
            var e = this;
            this.$inner.on("click.lg", function (t) {
              !e.dragOrSwipeEnabled &&
                e.isPosterElement(He(t.target)) &&
                e.LGel.trigger(Pe);
            });
          }),
          (e.prototype.manageSwipeClass = function () {
            var e = this.index + 1,
              t = this.index - 1;
            this.settings.loop &&
              this.galleryItems.length > 2 &&
              (0 === this.index
                ? (t = this.galleryItems.length - 1)
                : this.index === this.galleryItems.length - 1 && (e = 0)),
              this.outer
                .find(".lg-item")
                .removeClass("lg-next-slide lg-prev-slide"),
              t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
              this.getSlideItem(e).addClass("lg-next-slide");
          }),
          (e.prototype.goToNextSlide = function (e) {
            var t = this,
              i = this.settings.loop;
            e && this.galleryItems.length < 3 && (i = !1),
              this.lgBusy ||
                (this.index + 1 < this.galleryItems.length
                  ? (this.index++,
                    this.LGel.trigger(ke, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : i
                  ? ((this.index = 0),
                    this.LGel.trigger(ke, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-right-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-right-end");
                    }, 400)));
          }),
          (e.prototype.goToPrevSlide = function (e) {
            var t = this,
              i = this.settings.loop;
            e && this.galleryItems.length < 3 && (i = !1),
              this.lgBusy ||
                (this.index > 0
                  ? (this.index--,
                    this.LGel.trigger(Be, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : i
                  ? ((this.index = this.galleryItems.length - 1),
                    this.LGel.trigger(Be, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-left-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-left-end");
                    }, 400)));
          }),
          (e.prototype.keyPress = function () {
            var e = this;
            He(window).on("keydown.lg.global" + this.lgId, function (t) {
              e.lgOpened &&
                !0 === e.settings.escKey &&
                27 === t.keyCode &&
                (t.preventDefault(),
                e.settings.allowMediaOverlap &&
                e.outer.hasClass("lg-can-toggle") &&
                e.outer.hasClass("lg-components-open")
                  ? e.outer.removeClass("lg-components-open")
                  : e.closeGallery()),
                e.lgOpened &&
                  e.galleryItems.length > 1 &&
                  (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                  39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
            });
          }),
          (e.prototype.arrow = function () {
            var e = this;
            this.getElementById("lg-prev").on("click.lg", function () {
              e.goToPrevSlide();
            }),
              this.getElementById("lg-next").on("click.lg", function () {
                e.goToNextSlide();
              });
          }),
          (e.prototype.arrowDisable = function (e) {
            if (!this.settings.loop && this.settings.hideControlOnEnd) {
              var t = this.getElementById("lg-prev"),
                i = this.getElementById("lg-next");
              e + 1 === this.galleryItems.length
                ? i.attr("disabled", "disabled").addClass("disabled")
                : i.removeAttr("disabled").removeClass("disabled"),
                0 === e
                  ? t.attr("disabled", "disabled").addClass("disabled")
                  : t.removeAttr("disabled").removeClass("disabled");
            }
          }),
          (e.prototype.setTranslate = function (e, t, i, s, n) {
            void 0 === s && (s = 1),
              void 0 === n && (n = 1),
              e.css(
                "transform",
                "translate3d(" +
                  t +
                  "px, " +
                  i +
                  "px, 0px) scale3d(" +
                  s +
                  ", " +
                  n +
                  ", 1)"
              );
          }),
          (e.prototype.mousewheel = function () {
            var e = this,
              t = 0;
            this.outer.on("wheel.lg", function (i) {
              if (i.deltaY && !(e.galleryItems.length < 2)) {
                i.preventDefault();
                var s = new Date().getTime();
                s - t < 1e3 ||
                  ((t = s),
                  i.deltaY > 0
                    ? e.goToNextSlide()
                    : i.deltaY < 0 && e.goToPrevSlide());
              }
            });
          }),
          (e.prototype.isSlideElement = function (e) {
            return (
              e.hasClass("lg-outer") ||
              e.hasClass("lg-item") ||
              e.hasClass("lg-img-wrap")
            );
          }),
          (e.prototype.isPosterElement = function (e) {
            var t = this.getSlideItem(this.index)
              .find(".lg-video-play-button")
              .get();
            return (
              e.hasClass("lg-video-poster") ||
              e.hasClass("lg-video-play-button") ||
              (t && t.contains(e.get()))
            );
          }),
          (e.prototype.toggleMaximize = function () {
            var e = this;
            this.getElementById("lg-maximize").on("click.lg", function () {
              e.$container.toggleClass("lg-inline"), e.refreshOnResize();
            });
          }),
          (e.prototype.invalidateItems = function () {
            for (var e = 0; e < this.items.length; e++) {
              var t = He(this.items[e]);
              t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
            }
          }),
          (e.prototype.manageCloseGallery = function () {
            var e = this;
            if (this.settings.closable) {
              var t = !1;
              this.getElementById("lg-close").on("click.lg", function () {
                e.closeGallery();
              }),
                this.settings.closeOnTap &&
                  (this.outer.on("mousedown.lg", function (i) {
                    var s = He(i.target);
                    t = !!e.isSlideElement(s);
                  }),
                  this.outer.on("mousemove.lg", function () {
                    t = !1;
                  }),
                  this.outer.on("mouseup.lg", function (i) {
                    var s = He(i.target);
                    e.isSlideElement(s) &&
                      t &&
                      (e.outer.hasClass("lg-dragging") || e.closeGallery());
                  }));
            }
          }),
          (e.prototype.closeGallery = function (e) {
            var t = this;
            if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
            this.LGel.trigger(De), He(window).scrollTop(this.prevScrollTop);
            var i,
              s = this.items[this.index];
            if (this.zoomFromOrigin && s) {
              var n = this.mediaContainerPosition,
                r = n.top,
                o = n.bottom,
                a = this.galleryItems[this.index],
                l = a.__slideVideoInfo,
                d = a.poster,
                c = Re(
                  s,
                  this.outer,
                  r + o,
                  l && d && this.settings.videoMaxSize
                );
              i = Xe(s, this.outer, r, o, c);
            }
            this.zoomFromOrigin && i
              ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                this.getSlideItem(this.index)
                  .addClass("lg-start-end-progress")
                  .css(
                    "transition-duration",
                    this.settings.startAnimationDuration + "ms"
                  )
                  .css("transform", i))
              : (this.outer.addClass("lg-hide-items"),
                this.outer.removeClass("lg-zoom-from-image")),
              this.destroyModules(),
              (this.lGalleryOn = !1),
              (this.isDummyImageRemoved = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              clearTimeout(this.hideBarTimeout),
              (this.hideBarTimeout = !1),
              He("html").removeClass("lg-on"),
              this.outer.removeClass("lg-visible lg-components-open"),
              this.$backdrop.removeClass("in").css("opacity", 0);
            var u =
              this.zoomFromOrigin && i
                ? Math.max(
                    this.settings.startAnimationDuration,
                    this.settings.backdropDuration
                  )
                : this.settings.backdropDuration;
            return (
              this.$container.removeClass("lg-show-in"),
              setTimeout(function () {
                t.zoomFromOrigin &&
                  i &&
                  t.outer.removeClass("lg-zoom-from-image"),
                  t.$container.removeClass("lg-show"),
                  t.$backdrop
                    .removeAttr("style")
                    .css(
                      "transition-duration",
                      t.settings.backdropDuration + "ms"
                    ),
                  t.outer.removeClass("lg-closing " + t.settings.startClass),
                  t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                  t.$inner.empty(),
                  t.lgOpened && t.LGel.trigger(Ge, { instance: t }),
                  t.outer.get() && t.outer.get().blur(),
                  (t.lgOpened = !1);
              }, u + 100),
              u + 100
            );
          }),
          (e.prototype.initModules = function () {
            this.plugins.forEach(function (e) {
              try {
                e.init();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly initiated"
                );
              }
            });
          }),
          (e.prototype.destroyModules = function (e) {
            this.plugins.forEach(function (t) {
              try {
                e ? t.destroy() : t.closeGallery && t.closeGallery();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly destroyed"
                );
              }
            });
          }),
          (e.prototype.refresh = function (e) {
            this.settings.dynamic || this.invalidateItems(),
              (this.galleryItems = e || this.getItems()),
              this.updateControls(),
              this.openGalleryOnItemClick(),
              this.LGel.trigger(_e);
          }),
          (e.prototype.updateControls = function () {
            this.addSlideVideoInfo(this.galleryItems),
              this.updateCounterTotal(),
              this.manageSingleSlideClassName();
          }),
          (e.prototype.destroy = function () {
            var e = this,
              t = this.closeGallery(!0);
            return (
              setTimeout(function () {
                e.destroyModules(!0),
                  e.settings.dynamic || e.invalidateItems(),
                  He(window).off(".lg.global" + e.lgId),
                  e.LGel.off(".lg"),
                  e.$container.remove();
              }, t),
              t
            );
          }),
          e
        );
      })();
    const it = function (e, t) {
      return new tt(e, t);
    };
    var st = function () {
        return (
          (st =
            Object.assign ||
            function (e) {
              for (var t, i = 1, s = arguments.length; i < s; i++)
                for (var n in (t = arguments[i]))
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              return e;
            }),
          st.apply(this, arguments)
        );
      },
      nt = {
        scale: 1,
        zoom: !0,
        actualSize: !0,
        showZoomInOutIcons: !1,
        actualSizeIcons: { zoomIn: "lg-zoom-in", zoomOut: "lg-zoom-out" },
        enableZoomAfter: 300,
        zoomPluginStrings: {
          zoomIn: "Zoom in",
          zoomOut: "Zoom out",
          viewActualSize: "View actual size",
        },
      },
      rt = "lgContainerResize",
      ot = "lgBeforeOpen",
      at = "lgAfterOpen",
      lt = "lgSlideItemLoad",
      dt = "lgAfterSlide",
      ct = "lgRotateLeft",
      ut = "lgRotateRight",
      ht = "lgFlipHorizontal",
      pt = "lgFlipVertical",
      gt = (function () {
        function e(e, t) {
          return (
            (this.core = e),
            (this.$LG = t),
            (this.settings = st(st({}, nt), this.core.settings)),
            this
          );
        }
        return (
          (e.prototype.buildTemplates = function () {
            var e = this.settings.showZoomInOutIcons
              ? '<button id="' +
                this.core.getIdName("lg-zoom-in") +
                '" type="button" aria-label="' +
                this.settings.zoomPluginStrings.zoomIn +
                '" class="lg-zoom-in lg-icon"></button><button id="' +
                this.core.getIdName("lg-zoom-out") +
                '" type="button" aria-label="' +
                this.settings.zoomPluginStrings.zoomIn +
                '" class="lg-zoom-out lg-icon"></button>'
              : "";
            this.settings.actualSize &&
              (e +=
                '<button id="' +
                this.core.getIdName("lg-actual-size") +
                '" type="button" aria-label="' +
                this.settings.zoomPluginStrings.viewActualSize +
                '" class="' +
                this.settings.actualSizeIcons.zoomIn +
                ' lg-icon"></button>'),
              this.core.outer.addClass("lg-use-transition-for-zoom"),
              this.core.$toolbar.first().append(e);
          }),
          (e.prototype.enableZoom = function (e) {
            var t = this,
              i = this.settings.enableZoomAfter + e.detail.delay;
            this.$LG("body").first().hasClass("lg-from-hash") && e.detail.delay
              ? (i = 0)
              : this.$LG("body").first().removeClass("lg-from-hash"),
              (this.zoomableTimeout = setTimeout(function () {
                t.isImageSlide() &&
                  (t.core.getSlideItem(e.detail.index).addClass("lg-zoomable"),
                  e.detail.index === t.core.index && t.setZoomEssentials());
              }, i + 30));
          }),
          (e.prototype.enableZoomOnSlideItemLoad = function () {
            this.core.LGel.on(lt + ".zoom", this.enableZoom.bind(this));
          }),
          (e.prototype.getModifier = function (e, t, i) {
            var s = e;
            e = Math.abs(e);
            var n = this.getCurrentTransform(i);
            if (!n) return 1;
            var r = 1;
            if ("X" === t) {
              var o = Math.sign(parseFloat(n[0]));
              0 === e || 180 === e
                ? (r = 1)
                : 90 === e &&
                  (r =
                    (-90 === s && 1 === o) || (90 === s && -1 === o) ? -1 : 1),
                (r *= o);
            } else {
              var a = Math.sign(parseFloat(n[3]));
              if (0 === e || 180 === e) r = 1;
              else if (90 === e) {
                var l = parseFloat(n[1]),
                  d = parseFloat(n[2]);
                r = Math.sign(l * d * s * a);
              }
              r *= a;
            }
            return r;
          }),
          (e.prototype.getImageSize = function (e, t, i) {
            return (
              90 === Math.abs(t) && (i = "x" === i ? "y" : "x"),
              e[{ y: "offsetHeight", x: "offsetWidth" }[i]]
            );
          }),
          (e.prototype.getDragCords = function (e, t) {
            return 90 === t
              ? { x: e.pageY, y: e.pageX }
              : { x: e.pageX, y: e.pageY };
          }),
          (e.prototype.getSwipeCords = function (e, t) {
            var i = e.targetTouches[0].pageX,
              s = e.targetTouches[0].pageY;
            return 90 === t ? { x: s, y: i } : { x: i, y: s };
          }),
          (e.prototype.getDragAllowedAxises = function (e, t) {
            t = t || this.scale || 1;
            var i = this.imageYSize * t > this.containerRect.height,
              s = this.imageXSize * t > this.containerRect.width;
            return 90 === e
              ? { allowX: i, allowY: s }
              : { allowX: s, allowY: i };
          }),
          (e.prototype.getCurrentTransform = function (e) {
            if (e) {
              var t = window.getComputedStyle(e, null),
                i =
                  t.getPropertyValue("-webkit-transform") ||
                  t.getPropertyValue("-moz-transform") ||
                  t.getPropertyValue("-ms-transform") ||
                  t.getPropertyValue("-o-transform") ||
                  t.getPropertyValue("transform") ||
                  "none";
              return "none" !== i
                ? i.split("(")[1].split(")")[0].split(",")
                : void 0;
            }
          }),
          (e.prototype.getCurrentRotation = function (e) {
            if (!e) return 0;
            var t = this.getCurrentTransform(e);
            return t
              ? Math.round(
                  Math.atan2(parseFloat(t[1]), parseFloat(t[0])) *
                    (180 / Math.PI)
                )
              : 0;
          }),
          (e.prototype.setZoomEssentials = function () {
            var e = this.core
                .getSlideItem(this.core.index)
                .find(".lg-image")
                .first(),
              t = this.core
                .getSlideItem(this.core.index)
                .find(".lg-img-rotate")
                .first()
                .get();
            (this.rotateValue = this.getCurrentRotation(t)),
              (this.imageYSize = this.getImageSize(
                e.get(),
                this.rotateValue,
                "y"
              )),
              (this.imageXSize = this.getImageSize(
                e.get(),
                this.rotateValue,
                "x"
              )),
              (this.containerRect = this.core.outer
                .get()
                .getBoundingClientRect()),
              (this.modifierX = this.getModifier(this.rotateValue, "X", t)),
              (this.modifierY = this.getModifier(this.rotateValue, "Y", t));
          }),
          (e.prototype.zoomImage = function (e) {
            var t,
              i,
              s =
                (this.containerRect.width - this.imageXSize) / 2 +
                this.containerRect.left,
              n = this.core.mediaContainerPosition,
              r = n.top,
              o = n.bottom,
              a = Math.abs(r - o) / 2,
              l =
                (this.containerRect.height -
                  this.imageYSize -
                  a * this.modifierX) /
                  2 +
                this.scrollTop +
                this.containerRect.top;
            1 === e && (this.positionChanged = !1);
            var d = this.getDragAllowedAxises(Math.abs(this.rotateValue), e),
              c = d.allowY,
              u = d.allowX;
            this.positionChanged &&
              ((t = this.left / (this.scale - 1)),
              (i = this.top / (this.scale - 1)),
              (this.pageX = Math.abs(t) + s),
              (this.pageY = Math.abs(i) + l),
              (this.positionChanged = !1));
            var h = this.getPossibleSwipeDragCords(this.rotateValue, e),
              p = (e - 1) * (s - this.pageX),
              g = (e - 1) * (l - this.pageY);
            u
              ? this.isBeyondPossibleLeft(p, h.minX)
                ? (p = h.minX)
                : this.isBeyondPossibleRight(p, h.maxX) && (p = h.maxX)
              : e > 1 &&
                (p < h.minX ? (p = h.minX) : p > h.maxX && (p = h.maxX)),
              c
                ? this.isBeyondPossibleTop(g, h.minY)
                  ? (g = h.minY)
                  : this.isBeyondPossibleBottom(g, h.maxY) && (g = h.maxY)
                : e > 1 &&
                  (g < h.minY ? (g = h.minY) : g > h.maxY && (g = h.maxY)),
              this.setZoomStyles({ x: p, y: g, scale: e });
          }),
          (e.prototype.setZoomStyles = function (e) {
            var t = this.core
                .getSlideItem(this.core.index)
                .find(".lg-image")
                .first(),
              i = this.core.outer.find(".lg-current .lg-dummy-img").first(),
              s = t.parent();
            (this.scale = e.scale),
              t.css(
                "transform",
                "scale3d(" + e.scale + ", " + e.scale + ", 1)"
              ),
              i.css(
                "transform",
                "scale3d(" + e.scale + ", " + e.scale + ", 1)"
              );
            var n = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
            s.css("transform", n), (this.left = e.x), (this.top = e.y);
          }),
          (e.prototype.setActualSize = function (e, t) {
            var i = this;
            if (
              this.isImageSlide() &&
              !this.core.outer.hasClass("lg-first-slide-loading")
            ) {
              var s = this.getCurrentImageActualSizeScale();
              this.core.outer.hasClass("lg-zoomed")
                ? (this.scale = 1)
                : (this.scale = this.getScale(s)),
                this.setPageCords(t),
                this.beginZoom(this.scale),
                this.zoomImage(this.scale),
                setTimeout(function () {
                  i.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                }, 10);
            }
          }),
          (e.prototype.getNaturalWidth = function (e) {
            var t = this.core.getSlideItem(e).find(".lg-image").first(),
              i = this.core.galleryItems[e].width;
            return i ? parseFloat(i) : t.get().naturalWidth;
          }),
          (e.prototype.getActualSizeScale = function (e, t) {
            return e > t ? e / t || 2 : 1;
          }),
          (e.prototype.getCurrentImageActualSizeScale = function () {
            var e = this.core
                .getSlideItem(this.core.index)
                .find(".lg-image")
                .first()
                .get().offsetWidth,
              t = this.getNaturalWidth(this.core.index) || e;
            return this.getActualSizeScale(t, e);
          }),
          (e.prototype.getPageCords = function (e) {
            var t = {};
            if (e)
              (t.x = e.pageX || e.targetTouches[0].pageX),
                (t.y = e.pageY || e.targetTouches[0].pageY);
            else {
              var i = this.core.outer.get().getBoundingClientRect();
              (t.x = i.width / 2 + i.left),
                (t.y = i.height / 2 + this.scrollTop + i.top);
            }
            return t;
          }),
          (e.prototype.setPageCords = function (e) {
            var t = this.getPageCords(e);
            (this.pageX = t.x), (this.pageY = t.y);
          }),
          (e.prototype.beginZoom = function (e) {
            (this.core.outer.removeClass(
              "lg-zoom-drag-transition lg-zoom-dragging"
            ),
            e > 1)
              ? (this.core.outer.addClass("lg-zoomed"),
                this.core
                  .getElementById("lg-actual-size")
                  .removeClass(this.settings.actualSizeIcons.zoomIn)
                  .addClass(this.settings.actualSizeIcons.zoomOut))
              : this.resetZoom();
            return e > 1;
          }),
          (e.prototype.getScale = function (e) {
            var t = this.getCurrentImageActualSizeScale();
            return e < 1 ? (e = 1) : e > t && (e = t), e;
          }),
          (e.prototype.init = function () {
            var e = this;
            if (this.settings.zoom) {
              this.buildTemplates(), this.enableZoomOnSlideItemLoad();
              var t = null;
              this.core.outer.on("dblclick.lg", function (t) {
                e.$LG(t.target).hasClass("lg-image") &&
                  e.setActualSize(e.core.index, t);
              }),
                this.core.outer.on("touchstart.lg", function (i) {
                  var s = e.$LG(i.target);
                  1 === i.targetTouches.length &&
                    s.hasClass("lg-image") &&
                    (t
                      ? (clearTimeout(t),
                        (t = null),
                        i.preventDefault(),
                        e.setActualSize(e.core.index, i))
                      : (t = setTimeout(function () {
                          t = null;
                        }, 300)));
                }),
                this.core.LGel.on(
                  rt +
                    ".zoom " +
                    ut +
                    ".zoom " +
                    ct +
                    ".zoom " +
                    ht +
                    ".zoom " +
                    pt +
                    ".zoom",
                  function () {
                    e.core.lgOpened &&
                      e.isImageSlide() &&
                      (e.setPageCords(),
                      e.setZoomEssentials(),
                      e.zoomImage(e.scale));
                  }
                ),
                this.$LG(window).on(
                  "scroll.lg.zoom.global" + this.core.lgId,
                  function () {
                    e.core.lgOpened &&
                      (e.scrollTop = e.$LG(window).scrollTop());
                  }
                ),
                this.core
                  .getElementById("lg-zoom-out")
                  .on("click.lg", function () {
                    e.core.outer.find(".lg-current .lg-image").get() &&
                      ((e.scale -= e.settings.scale),
                      (e.scale = e.getScale(e.scale)),
                      e.beginZoom(e.scale),
                      e.zoomImage(e.scale));
                  }),
                this.core
                  .getElementById("lg-zoom-in")
                  .on("click.lg", function () {
                    e.zoomIn();
                  }),
                this.core
                  .getElementById("lg-actual-size")
                  .on("click.lg", function () {
                    e.setActualSize(e.core.index);
                  }),
                this.core.LGel.on(ot + ".zoom", function () {
                  e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                }),
                this.core.LGel.on(at + ".zoom", function () {
                  (e.scrollTop = e.$LG(window).scrollTop()),
                    (e.pageX = e.core.outer.width() / 2),
                    (e.pageY = e.core.outer.height() / 2 + e.scrollTop),
                    (e.scale = 1);
                }),
                this.core.LGel.on(dt + ".zoom", function (t) {
                  var i = t.detail.prevIndex;
                  (e.scale = 1),
                    (e.positionChanged = !1),
                    e.resetZoom(i),
                    e.isImageSlide() && e.setZoomEssentials();
                }),
                this.zoomDrag(),
                this.pinchZoom(),
                this.zoomSwipe(),
                (this.zoomableTimeout = !1),
                (this.positionChanged = !1);
            }
          }),
          (e.prototype.zoomIn = function (e) {
            this.isImageSlide() &&
              (e ? (this.scale = e) : (this.scale += this.settings.scale),
              (this.scale = this.getScale(this.scale)),
              this.beginZoom(this.scale),
              this.zoomImage(this.scale));
          }),
          (e.prototype.resetZoom = function (e) {
            this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");
            var t = this.core.getElementById("lg-actual-size"),
              i = this.core.getSlideItem(void 0 !== e ? e : this.core.index);
            t
              .removeClass(this.settings.actualSizeIcons.zoomOut)
              .addClass(this.settings.actualSizeIcons.zoomIn),
              i.find(".lg-img-wrap").first().removeAttr("style"),
              i.find(".lg-image").first().removeAttr("style"),
              (this.scale = 1),
              (this.left = 0),
              (this.top = 0),
              this.setPageCords();
          }),
          (e.prototype.getTouchDistance = function (e) {
            return Math.sqrt(
              (e.targetTouches[0].pageX - e.targetTouches[1].pageX) *
                (e.targetTouches[0].pageX - e.targetTouches[1].pageX) +
                (e.targetTouches[0].pageY - e.targetTouches[1].pageY) *
                  (e.targetTouches[0].pageY - e.targetTouches[1].pageY)
            );
          }),
          (e.prototype.pinchZoom = function () {
            var e = this,
              t = 0,
              i = !1,
              s = 1,
              n = this.core.getSlideItem(this.core.index);
            this.core.$inner.on("touchstart.lg", function (i) {
              (n = e.core.getSlideItem(e.core.index)),
                e.isImageSlide() &&
                  (2 !== i.targetTouches.length ||
                    e.core.outer.hasClass("lg-first-slide-loading") ||
                    (!e.$LG(i.target).hasClass("lg-item") &&
                      !n.get().contains(i.target)) ||
                    ((s = e.scale || 1),
                    e.core.outer.removeClass(
                      "lg-zoom-drag-transition lg-zoom-dragging"
                    ),
                    (e.core.touchAction = "pinch"),
                    (t = e.getTouchDistance(i))));
            }),
              this.core.$inner.on("touchmove.lg", function (r) {
                if (
                  2 === r.targetTouches.length &&
                  "pinch" === e.core.touchAction &&
                  (e.$LG(r.target).hasClass("lg-item") ||
                    n.get().contains(r.target))
                ) {
                  r.preventDefault();
                  var o = e.getTouchDistance(r),
                    a = t - o;
                  !i && Math.abs(a) > 5 && (i = !0),
                    i &&
                      ((e.scale = Math.max(1, s + 0.008 * -a)),
                      e.zoomImage(e.scale));
                }
              }),
              this.core.$inner.on("touchend.lg", function (s) {
                "pinch" === e.core.touchAction &&
                  (e.$LG(s.target).hasClass("lg-item") ||
                    n.get().contains(s.target)) &&
                  ((i = !1),
                  (t = 0),
                  e.scale <= 1
                    ? e.resetZoom()
                    : ((e.scale = e.getScale(e.scale)),
                      e.zoomImage(e.scale),
                      e.core.outer.addClass("lg-zoomed")),
                  (e.core.touchAction = void 0));
              });
          }),
          (e.prototype.touchendZoom = function (e, t, i, s, n, r) {
            var o = t.x - e.x,
              a = t.y - e.y,
              l = Math.abs(o) / n + 1,
              d = Math.abs(a) / n + 1;
            l > 2 && (l += 1), d > 2 && (d += 1), (o *= l), (a *= d);
            var c = this.core
                .getSlideItem(this.core.index)
                .find(".lg-img-wrap")
                .first(),
              u = {};
            (u.x = this.left + o * this.modifierX),
              (u.y = this.top + a * this.modifierY);
            var h = this.getPossibleSwipeDragCords(r);
            (Math.abs(o) > 15 || Math.abs(a) > 15) &&
              (s &&
                (this.isBeyondPossibleTop(u.y, h.minY)
                  ? (u.y = h.minY)
                  : this.isBeyondPossibleBottom(u.y, h.maxY) && (u.y = h.maxY)),
              i &&
                (this.isBeyondPossibleLeft(u.x, h.minX)
                  ? (u.x = h.minX)
                  : this.isBeyondPossibleRight(u.x, h.maxX) && (u.x = h.maxX)),
              s ? (this.top = u.y) : (u.y = this.top),
              i ? (this.left = u.x) : (u.x = this.left),
              this.setZoomSwipeStyles(c, u),
              (this.positionChanged = !0));
          }),
          (e.prototype.getZoomSwipeCords = function (e, t, i, s, n) {
            var r = {};
            if (s) {
              if (
                ((r.y = this.top + (t.y - e.y) * this.modifierY),
                this.isBeyondPossibleTop(r.y, n.minY))
              ) {
                var o = n.minY - r.y;
                r.y = n.minY - o / 6;
              } else if (this.isBeyondPossibleBottom(r.y, n.maxY)) {
                var a = r.y - n.maxY;
                r.y = n.maxY + a / 6;
              }
            } else r.y = this.top;
            if (i) {
              if (
                ((r.x = this.left + (t.x - e.x) * this.modifierX),
                this.isBeyondPossibleLeft(r.x, n.minX))
              ) {
                var l = n.minX - r.x;
                r.x = n.minX - l / 6;
              } else if (this.isBeyondPossibleRight(r.x, n.maxX)) {
                var d = r.x - n.maxX;
                r.x = n.maxX + d / 6;
              }
            } else r.x = this.left;
            return r;
          }),
          (e.prototype.isBeyondPossibleLeft = function (e, t) {
            return e >= t;
          }),
          (e.prototype.isBeyondPossibleRight = function (e, t) {
            return e <= t;
          }),
          (e.prototype.isBeyondPossibleTop = function (e, t) {
            return e >= t;
          }),
          (e.prototype.isBeyondPossibleBottom = function (e, t) {
            return e <= t;
          }),
          (e.prototype.isImageSlide = function () {
            var e = this.core.galleryItems[this.core.index];
            return "image" === this.core.getSlideType(e);
          }),
          (e.prototype.getPossibleSwipeDragCords = function (e, t) {
            var i = t || this.scale || 1,
              s = Math.abs(i),
              n = this.core.mediaContainerPosition,
              r = n.top,
              o = n.bottom,
              a = Math.abs(r - o) / 2,
              l =
                (this.imageYSize - this.containerRect.height) / 2 +
                a * this.modifierX,
              d = this.containerRect.height - this.imageYSize * s + l,
              c = (this.imageXSize - this.containerRect.width) / 2,
              u = this.containerRect.width - this.imageXSize * s + c,
              h = { minY: l, maxY: d, minX: c, maxX: u };
            return (
              90 === Math.abs(e) &&
                (h = { minY: c, maxY: u, minX: l, maxX: d }),
              h
            );
          }),
          (e.prototype.setZoomSwipeStyles = function (e, t) {
            e.css("transform", "translate3d(" + t.x + "px, " + t.y + "px, 0)");
          }),
          (e.prototype.zoomSwipe = function () {
            var e,
              t,
              i = this,
              s = {},
              n = {},
              r = !1,
              o = !1,
              a = !1,
              l = new Date(),
              d = (new Date(), this.core.getSlideItem(this.core.index));
            this.core.$inner.on("touchstart.lg", function (n) {
              if (
                i.isImageSlide() &&
                ((d = i.core.getSlideItem(i.core.index)),
                (i.$LG(n.target).hasClass("lg-item") ||
                  d.get().contains(n.target)) &&
                  1 === n.targetTouches.length &&
                  i.core.outer.hasClass("lg-zoomed"))
              ) {
                n.preventDefault(),
                  (l = new Date()),
                  (i.core.touchAction = "zoomSwipe"),
                  (t = i.core
                    .getSlideItem(i.core.index)
                    .find(".lg-img-wrap")
                    .first());
                var r = i.getDragAllowedAxises(Math.abs(i.rotateValue));
                (a = r.allowY),
                  ((o = r.allowX) || a) &&
                    (s = i.getSwipeCords(n, Math.abs(i.rotateValue))),
                  (e = i.getPossibleSwipeDragCords(i.rotateValue)),
                  i.core.outer.addClass(
                    "lg-zoom-dragging lg-zoom-drag-transition"
                  );
              }
            }),
              this.core.$inner.on("touchmove.lg", function (l) {
                if (
                  1 === l.targetTouches.length &&
                  "zoomSwipe" === i.core.touchAction &&
                  (i.$LG(l.target).hasClass("lg-item") ||
                    d.get().contains(l.target))
                ) {
                  l.preventDefault(),
                    (i.core.touchAction = "zoomSwipe"),
                    (n = i.getSwipeCords(l, Math.abs(i.rotateValue)));
                  var c = i.getZoomSwipeCords(s, n, o, a, e);
                  (Math.abs(n.x - s.x) > 15 || Math.abs(n.y - s.y) > 15) &&
                    ((r = !0), i.setZoomSwipeStyles(t, c));
                }
              }),
              this.core.$inner.on("touchend.lg", function (e) {
                if (
                  "zoomSwipe" === i.core.touchAction &&
                  (i.$LG(e.target).hasClass("lg-item") ||
                    d.get().contains(e.target))
                ) {
                  if (
                    ((i.core.touchAction = void 0),
                    i.core.outer.removeClass("lg-zoom-dragging"),
                    !r)
                  )
                    return;
                  r = !1;
                  var t = new Date().valueOf() - l.valueOf();
                  i.touchendZoom(s, n, o, a, t, i.rotateValue);
                }
              });
          }),
          (e.prototype.zoomDrag = function () {
            var e,
              t,
              i,
              s,
              n = this,
              r = {},
              o = {},
              a = !1,
              l = !1,
              d = !1,
              c = !1;
            this.core.outer.on("mousedown.lg.zoom", function (t) {
              if (n.isImageSlide()) {
                var o = n.core.getSlideItem(n.core.index);
                if (
                  n.$LG(t.target).hasClass("lg-item") ||
                  o.get().contains(t.target)
                ) {
                  (e = new Date()),
                    (s = n.core
                      .getSlideItem(n.core.index)
                      .find(".lg-img-wrap")
                      .first());
                  var l = n.getDragAllowedAxises(Math.abs(n.rotateValue));
                  (c = l.allowY),
                    (d = l.allowX),
                    n.core.outer.hasClass("lg-zoomed") &&
                      n.$LG(t.target).hasClass("lg-object") &&
                      (d || c) &&
                      (t.preventDefault(),
                      (r = n.getDragCords(t, Math.abs(n.rotateValue))),
                      (i = n.getPossibleSwipeDragCords(n.rotateValue)),
                      (a = !0),
                      (n.core.outer.get().scrollLeft += 1),
                      (n.core.outer.get().scrollLeft -= 1),
                      n.core.outer
                        .removeClass("lg-grab")
                        .addClass(
                          "lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"
                        ));
                }
              }
            }),
              this.$LG(window).on(
                "mousemove.lg.zoom.global" + this.core.lgId,
                function (e) {
                  if (a) {
                    (l = !0), (o = n.getDragCords(e, Math.abs(n.rotateValue)));
                    var t = n.getZoomSwipeCords(r, o, d, c, i);
                    n.setZoomSwipeStyles(s, t);
                  }
                }
              ),
              this.$LG(window).on(
                "mouseup.lg.zoom.global" + this.core.lgId,
                function (i) {
                  if (a) {
                    if (
                      ((t = new Date()),
                      (a = !1),
                      n.core.outer.removeClass("lg-zoom-dragging"),
                      l && (r.x !== o.x || r.y !== o.y))
                    ) {
                      o = n.getDragCords(i, Math.abs(n.rotateValue));
                      var s = t.valueOf() - e.valueOf();
                      n.touchendZoom(r, o, d, c, s, n.rotateValue);
                    }
                    l = !1;
                  }
                  n.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
                }
              );
          }),
          (e.prototype.closeGallery = function () {
            this.resetZoom();
          }),
          (e.prototype.destroy = function () {
            this.$LG(window).off(".lg.zoom.global" + this.core.lgId),
              this.core.LGel.off(".lg.zoom"),
              this.core.LGel.off(".zoom"),
              clearTimeout(this.zoomableTimeout),
              (this.zoomableTimeout = !1);
          }),
          e
        );
      })();
    const mt = gt;
    var ft = function () {
        return (
          (ft =
            Object.assign ||
            function (e) {
              for (var t, i = 1, s = arguments.length; i < s; i++)
                for (var n in (t = arguments[i]))
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              return e;
            }),
          ft.apply(this, arguments)
        );
      },
      vt = {
        fullScreen: !0,
        fullscreenPluginStrings: { toggleFullscreen: "Toggle Fullscreen" },
      },
      yt = (function () {
        function e(e, t) {
          return (
            (this.core = e),
            (this.$LG = t),
            (this.settings = ft(ft({}, vt), this.core.settings)),
            this
          );
        }
        return (
          (e.prototype.init = function () {
            var e = "";
            if (this.settings.fullScreen) {
              if (
                !(
                  document.fullscreenEnabled ||
                  document.webkitFullscreenEnabled ||
                  document.mozFullScreenEnabled ||
                  document.msFullscreenEnabled
                )
              )
                return;
              (e =
                '<button type="button" aria-label="' +
                this.settings.fullscreenPluginStrings.toggleFullscreen +
                '" class="lg-fullscreen lg-icon"></button>'),
                this.core.$toolbar.append(e),
                this.fullScreen();
            }
          }),
          (e.prototype.isFullScreen = function () {
            return (
              document.fullscreenElement ||
              document.mozFullScreenElement ||
              document.webkitFullscreenElement ||
              document.msFullscreenElement
            );
          }),
          (e.prototype.requestFullscreen = function () {
            var e = document.documentElement;
            e.requestFullscreen
              ? e.requestFullscreen()
              : e.msRequestFullscreen
              ? e.msRequestFullscreen()
              : e.mozRequestFullScreen
              ? e.mozRequestFullScreen()
              : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
          }),
          (e.prototype.exitFullscreen = function () {
            document.exitFullscreen
              ? document.exitFullscreen()
              : document.msExitFullscreen
              ? document.msExitFullscreen()
              : document.mozCancelFullScreen
              ? document.mozCancelFullScreen()
              : document.webkitExitFullscreen &&
                document.webkitExitFullscreen();
          }),
          (e.prototype.fullScreen = function () {
            var e = this;
            this.$LG(document).on(
              "fullscreenchange.lg.global" +
                this.core.lgId +
                " \n            webkitfullscreenchange.lg.global" +
                this.core.lgId +
                " \n            mozfullscreenchange.lg.global" +
                this.core.lgId +
                " \n            MSFullscreenChange.lg.global" +
                this.core.lgId,
              function () {
                e.core.lgOpened && e.core.outer.toggleClass("lg-fullscreen-on");
              }
            ),
              this.core.outer
                .find(".lg-fullscreen")
                .first()
                .on("click.lg", function () {
                  e.isFullScreen() ? e.exitFullscreen() : e.requestFullscreen();
                });
          }),
          (e.prototype.closeGallery = function () {
            this.isFullScreen() && this.exitFullscreen();
          }),
          (e.prototype.destroy = function () {
            this.$LG(document).off(
              "fullscreenchange.lg.global" +
                this.core.lgId +
                " \n            webkitfullscreenchange.lg.global" +
                this.core.lgId +
                " \n            mozfullscreenchange.lg.global" +
                this.core.lgId +
                " \n            MSFullscreenChange.lg.global" +
                this.core.lgId
            );
          }),
          e
        );
      })();
    const bt = yt;
    var wt = function () {
        return (
          (wt =
            Object.assign ||
            function (e) {
              for (var t, i = 1, s = arguments.length; i < s; i++)
                for (var n in (t = arguments[i]))
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              return e;
            }),
          wt.apply(this, arguments)
        );
      },
      Ct = "lgAfterAppendSlide",
      St = "lgBeforeSlide",
      xt = "lgRotateLeft",
      _t = "lgRotateRight",
      Et = "lgFlipHorizontal",
      Tt = "lgFlipVertical",
      It = {
        rotate: !0,
        rotateSpeed: 400,
        rotateLeft: !0,
        rotateRight: !0,
        flipHorizontal: !0,
        flipVertical: !0,
        rotatePluginStrings: {
          flipVertical: "Flip vertical",
          flipHorizontal: "Flip horizontal",
          rotateLeft: "Rotate left",
          rotateRight: "Rotate right",
        },
      },
      Lt = (function () {
        function e(e, t) {
          return (
            (this.core = e),
            (this.$LG = t),
            (this.settings = wt(wt({}, It), this.core.settings)),
            this
          );
        }
        return (
          (e.prototype.buildTemplates = function () {
            var e = "";
            this.settings.flipVertical &&
              (e +=
                '<button type="button" id="lg-flip-ver" aria-label="' +
                this.settings.rotatePluginStrings.flipVertical +
                '" class="lg-flip-ver lg-icon"></button>'),
              this.settings.flipHorizontal &&
                (e +=
                  '<button type="button" id="lg-flip-hor" aria-label="' +
                  this.settings.rotatePluginStrings.flipHorizontal +
                  '" class="lg-flip-hor lg-icon"></button>'),
              this.settings.rotateLeft &&
                (e +=
                  '<button type="button" id="lg-rotate-left" aria-label="' +
                  this.settings.rotatePluginStrings.rotateLeft +
                  '" class="lg-rotate-left lg-icon"></button>'),
              this.settings.rotateRight &&
                (e +=
                  '<button type="button" id="lg-rotate-right" aria-label="' +
                  this.settings.rotatePluginStrings.rotateRight +
                  '" class="lg-rotate-right lg-icon"></button>'),
              this.core.$toolbar.append(e);
          }),
          (e.prototype.init = function () {
            var e = this;
            this.settings.rotate &&
              (this.buildTemplates(),
              (this.rotateValuesList = {}),
              this.core.LGel.on(Ct + ".rotate", function (t) {
                var i = t.detail.index;
                e.core
                  .getSlideItem(i)
                  .find(".lg-img-wrap")
                  .first()
                  .wrap("lg-img-rotate"),
                  e.core
                    .getSlideItem(e.core.index)
                    .find(".lg-img-rotate")
                    .css("transition-duration", e.settings.rotateSpeed + "ms");
              }),
              this.core.outer
                .find("#lg-rotate-left")
                .first()
                .on("click.lg", this.rotateLeft.bind(this)),
              this.core.outer
                .find("#lg-rotate-right")
                .first()
                .on("click.lg", this.rotateRight.bind(this)),
              this.core.outer
                .find("#lg-flip-hor")
                .first()
                .on("click.lg", this.flipHorizontal.bind(this)),
              this.core.outer
                .find("#lg-flip-ver")
                .first()
                .on("click.lg", this.flipVertical.bind(this)),
              this.core.LGel.on(St + ".rotate", function (t) {
                e.rotateValuesList[t.detail.index] ||
                  (e.rotateValuesList[t.detail.index] = {
                    rotate: 0,
                    flipHorizontal: 1,
                    flipVertical: 1,
                  });
              }));
          }),
          (e.prototype.applyStyles = function () {
            this.core
              .getSlideItem(this.core.index)
              .find(".lg-img-rotate")
              .first()
              .css(
                "transform",
                "rotate(" +
                  this.rotateValuesList[this.core.index].rotate +
                  "deg) scale3d(" +
                  this.rotateValuesList[this.core.index].flipHorizontal +
                  ", " +
                  this.rotateValuesList[this.core.index].flipVertical +
                  ", 1)"
              );
          }),
          (e.prototype.rotateLeft = function () {
            (this.rotateValuesList[this.core.index].rotate -= 90),
              this.applyStyles(),
              this.triggerEvents(xt, {
                rotate: this.rotateValuesList[this.core.index].rotate,
              });
          }),
          (e.prototype.rotateRight = function () {
            (this.rotateValuesList[this.core.index].rotate += 90),
              this.applyStyles(),
              this.triggerEvents(_t, {
                rotate: this.rotateValuesList[this.core.index].rotate,
              });
          }),
          (e.prototype.getCurrentRotation = function (e) {
            if (!e) return 0;
            var t = this.$LG(e).style(),
              i =
                t.getPropertyValue("-webkit-transform") ||
                t.getPropertyValue("-moz-transform") ||
                t.getPropertyValue("-ms-transform") ||
                t.getPropertyValue("-o-transform") ||
                t.getPropertyValue("transform") ||
                "none";
            if ("none" !== i) {
              var s = i.split("(")[1].split(")")[0].split(",");
              if (s) {
                var n = Math.round(Math.atan2(s[1], s[0]) * (180 / Math.PI));
                return n < 0 ? n + 360 : n;
              }
            }
            return 0;
          }),
          (e.prototype.flipHorizontal = function () {
            var e = this.core
                .getSlideItem(this.core.index)
                .find(".lg-img-rotate")
                .first()
                .get(),
              t = this.getCurrentRotation(e),
              i = "flipHorizontal";
            (90 !== t && 270 !== t) || (i = "flipVertical"),
              (this.rotateValuesList[this.core.index][i] *= -1),
              this.applyStyles(),
              this.triggerEvents(Et, {
                flipHorizontal: this.rotateValuesList[this.core.index][i],
              });
          }),
          (e.prototype.flipVertical = function () {
            var e = this.core
                .getSlideItem(this.core.index)
                .find(".lg-img-rotate")
                .first()
                .get(),
              t = this.getCurrentRotation(e),
              i = "flipVertical";
            (90 !== t && 270 !== t) || (i = "flipHorizontal"),
              (this.rotateValuesList[this.core.index][i] *= -1),
              this.applyStyles(),
              this.triggerEvents(Tt, {
                flipVertical: this.rotateValuesList[this.core.index][i],
              });
          }),
          (e.prototype.triggerEvents = function (e, t) {
            var i = this;
            setTimeout(function () {
              i.core.LGel.trigger(e, t);
            }, this.settings.rotateSpeed + 10);
          }),
          (e.prototype.isImageOrientationChanged = function () {
            var e = this.rotateValuesList[this.core.index],
              t = Math.abs(e.rotate) % 360 != 0,
              i = e.flipHorizontal < 0,
              s = e.flipVertical < 0;
            return t || i || s;
          }),
          (e.prototype.closeGallery = function () {
            this.isImageOrientationChanged() &&
              this.core.getSlideItem(this.core.index).css("opacity", 0),
              (this.rotateValuesList = {});
          }),
          (e.prototype.destroy = function () {
            this.core.LGel.off(".lg.rotate"), this.core.LGel.off(".rotate");
          }),
          e
        );
      })();
    const Ot = Lt,
      zt = document.querySelectorAll("[data-gallery]");
    zt.length &&
      zt.forEach((e) => {
        e.addEventListener("lgInit", (e) => {
          console.log(e);
        }),
          it(e, {
            plugins: [mt, bt, Ot],
            fullScreen: !0,
            selector: "[data-gallery-item]",
            zoom: !0,
            rotate: !0,
            preload: 1,
            licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
            speed: 500,
          });
      }),
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var i = document.createEvent("CustomEvent");
          return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
        };
      })();
    var Pt = "slider__item_active",
      At = "slider__control_show",
      Mt = "slider__indicators",
      $t = "slider__indicator",
      kt = "slider__indicator_active",
      Bt = "transition-none";
    function Dt(e, t) {
      for (var i in ((this._$root = document.querySelector(e)),
      (this._$wrapper = this._$root.querySelector(".slider__wrapper")),
      (this._$items = this._$root.querySelector(".slider__items")),
      (this._$itemList = this._$root.querySelectorAll(".slider__item")),
      (this._currentIndex = 0),
      (this._minOrder = 0),
      (this._maxOrder = 0),
      (this._$itemWithMinOrder = null),
      (this._$itemWithMaxOrder = null),
      (this._minTranslate = 0),
      (this._maxTranslate = 0),
      (this._direction = "next"),
      (this._balancingItemsFlag = !1),
      (this._transform = 0),
      (this._hasSwipeState = !1),
      (this._swipeStartPosX = 0),
      (this._intervalId = null),
      (this._config = { loop: !0, autoplay: !1, interval: 5e3, swipe: !0 }),
      t))
        this._config.hasOwnProperty(i) && (this._config[i] = t[i]);
      for (var s = 0, n = this._$itemList.length; s < n; s++)
        (this._$itemList[s].dataset.order = s),
          (this._$itemList[s].dataset.index = s),
          (this._$itemList[s].dataset.translate = 0);
      if (this._config.loop) {
        var r = this._$itemList.length - 1,
          o = 100 * -this._$itemList.length;
        (this._$itemList[r].dataset.order = -1),
          (this._$itemList[r].dataset.translate =
            100 * -this._$itemList.length);
        var a = "translateX(".concat(o, "%)");
        this._$itemList[r].style.transform = a;
      }
      this._addIndicators(),
        this._refreshExtremeValues(),
        this._setActiveClass(),
        this._addEventListener(),
        this._autoplay();
    }
    (Dt.prototype._setActiveClass = function () {
      var e, t, i, s;
      for (e = 0, t = this._$itemList.length; e < t; e++)
        (i = this._$itemList[e]),
          (s = parseInt(i.dataset.index)),
          this._currentIndex === s
            ? i.classList.add(Pt)
            : i.classList.remove(Pt);
      var n = this._$root.querySelectorAll(".slider__indicator");
      if (n.length)
        for (e = 0, t = n.length; e < t; e++)
          (i = n[e]),
            (s = parseInt(i.dataset.slideTo)),
            this._currentIndex === s
              ? i.classList.add(kt)
              : i.classList.remove(kt);
      var r = this._$root.querySelectorAll(".slider__control");
      if (r.length)
        if (this._config.loop)
          for (e = 0, t = r.length; e < t; e++) r[e].classList.add(At);
        else
          0 === this._currentIndex
            ? (r[0].classList.remove(At), r[1].classList.add(At))
            : this._currentIndex === this._$itemList.length - 1
            ? (r[0].classList.add(At), r[1].classList.remove(At))
            : (r[0].classList.add(At), r[1].classList.add(At));
    }),
      (Dt.prototype._move = function () {
        if ("none" === this._direction)
          return (
            this._$items.classList.remove(Bt),
            void (this._$items.style.transform = "translateX(".concat(
              this._transform,
              "%)"
            ))
          );
        if (!this._config.loop) {
          if (
            this._currentIndex + 1 >= this._$itemList.length &&
            "next" === this._direction
          )
            return void this._autoplay("stop");
          if (this._currentIndex <= 0 && "prev" === this._direction) return;
        }
        var e = "next" === this._direction ? -100 : 100,
          t = this._transform + e;
        "next" === this._direction
          ? ++this._currentIndex > this._$itemList.length - 1 &&
            (this._currentIndex -= this._$itemList.length)
          : --this._currentIndex < 0 &&
            (this._currentIndex += this._$itemList.length),
          (this._transform = t),
          (this._$items.style.transform = "translateX(".concat(t, "%)")),
          this._setActiveClass();
      }),
      (Dt.prototype._moveTo = function (e) {
        var t = this._currentIndex;
        this._direction = e > t ? "next" : "prev";
        for (var i = 0; i < Math.abs(e - t); i++) this._move();
      }),
      (Dt.prototype._autoplay = function (e) {
        if (this._config.autoplay)
          return "stop" === e
            ? (clearInterval(this._intervalId), void (this._intervalId = null))
            : void (
                null === this._intervalId &&
                (this._intervalId = setInterval(
                  function () {
                    (this._direction = "next"), this._move();
                  }.bind(this),
                  this._config.interval
                ))
              );
      }),
      (Dt.prototype._addIndicators = function () {
        if (!this._$root.querySelector(".slider__indicators")) {
          var e = document.createElement("ol");
          e.className = Mt;
          for (var t = 0, i = this._$itemList.length; t < i; t++) {
            var s = document.createElement("li");
            (s.className = $t), (s.dataset.slideTo = t), e.appendChild(s);
          }
          this._$root.appendChild(e);
        }
      }),
      (Dt.prototype._refreshExtremeValues = function () {
        var e = this._$itemList;
        (this._minOrder = parseInt(e[0].dataset.order)),
          (this._maxOrder = this._minOrder),
          (this._$itemWithMinOrder = e[0]),
          (this._$itemWithMaxOrder = this._$itemWithMinOrder),
          (this._minTranslate = parseInt(e[0].dataset.translate)),
          (this._maxTranslate = this._minTranslate);
        for (var t = 0, i = e.length; t < i; t++) {
          var s = e[t],
            n = parseInt(s.dataset.order);
          n < this._minOrder
            ? ((this._minOrder = n),
              (this._$itemWithMinOrder = s),
              (this._minTranslate = parseInt(s.dataset.translate)))
            : n > this._maxOrder &&
              ((this._maxOrder = n),
              (this._$itemWithMaxOrder = s),
              (this._maxTranslate = parseInt(s.dataset.translate)));
        }
      }),
      (Dt.prototype._balancingItems = function () {
        if (this._balancingItemsFlag) {
          var e,
            t = this._$wrapper.getBoundingClientRect(),
            i = t.width / 2,
            s = this._$itemList.length;
          if ("next" === this._direction) {
            var n = t.left,
              r = this._$itemWithMinOrder;
            (e = this._minTranslate),
              r.getBoundingClientRect().right < n - i &&
                ((r.dataset.order = this._minOrder + s),
                (e += 100 * s),
                (r.dataset.translate = e),
                (r.style.transform = "translateX(".concat(e, "%)")),
                this._refreshExtremeValues());
          } else if ("prev" === this._direction) {
            var o = t.right,
              a = this._$itemWithMaxOrder;
            (e = this._maxTranslate),
              a.getBoundingClientRect().left > o + i &&
                ((a.dataset.order = this._maxOrder - s),
                (e -= 100 * s),
                (a.dataset.translate = e),
                (a.style.transform = "translateX(".concat(e, "%)")),
                this._refreshExtremeValues());
          }
          requestAnimationFrame(this._balancingItems.bind(this));
        }
      }),
      (Dt.prototype._addEventListener = function () {
        var e = this._$items;
        function t(e) {
          this._autoplay("stop");
          var t = 0 === e.type.search("touch") ? e.touches[0] : e;
          (this._swipeStartPosX = t.clientX),
            (this._swipeStartPosY = t.clientY),
            (this._hasSwipeState = !0),
            (this._hasSwiping = !1);
        }
        function i(e) {
          if (this._hasSwipeState) {
            var t = 0 === e.type.search("touch") ? e.touches[0] : e,
              i = this._swipeStartPosX - t.clientX,
              s = this._swipeStartPosY - t.clientY;
            if (!this._hasSwiping) {
              if (Math.abs(s) > Math.abs(i))
                return void (this._hasSwipeState = !1);
              this._hasSwiping = !0;
            }
            e.preventDefault(),
              this._config.loop ||
                (this._currentIndex + 1 >= this._$itemList.length &&
                  i >= 0 &&
                  (i /= 4),
                this._currentIndex <= 0 && i <= 0 && (i /= 4));
            var n = (i / this._$wrapper.getBoundingClientRect().width) * 100,
              r = this._transform - n;
            this._$items.classList.add(Bt),
              (this._$items.style.transform = "translateX(".concat(r, "%)"));
          }
        }
        function s(e) {
          if (this._hasSwipeState) {
            var t = 0 === e.type.search("touch") ? e.changedTouches[0] : e,
              i = this._swipeStartPosX - t.clientX;
            this._config.loop ||
              (this._currentIndex + 1 >= this._$itemList.length &&
                i >= 0 &&
                (i /= 4),
              this._currentIndex <= 0 && i <= 0 && (i /= 4));
            var s = (i / this._$wrapper.getBoundingClientRect().width) * 100;
            this._$items.classList.remove(Bt),
              s > 20
                ? ((this._direction = "next"), this._move())
                : s < -20
                ? ((this._direction = "prev"), this._move())
                : ((this._direction = "none"), this._move()),
              (this._hasSwipeState = !1),
              this._config.loop && this._autoplay();
          }
        }
        if (
          (this._$root.addEventListener(
            "click",
            function (e) {
              var t = e.target;
              if (
                (this._autoplay("stop"),
                t.classList.contains("slider__control"))
              )
                e.preventDefault(),
                  (this._direction = t.dataset.slide),
                  this._move();
              else if (t.dataset.slideTo) {
                e.preventDefault();
                var i = parseInt(t.dataset.slideTo);
                this._moveTo(i);
              }
              this._config.loop && this._autoplay();
            }.bind(this)
          ),
          this._config.loop &&
            (e.addEventListener(
              "transitionstart",
              function () {
                (this._balancingItemsFlag = !0),
                  window.requestAnimationFrame(this._balancingItems.bind(this));
              }.bind(this)
            ),
            e.addEventListener(
              "transitionend",
              function () {
                (this._balancingItemsFlag = !1),
                  this._$root.dispatchEvent(
                    new CustomEvent("slider.transition.end", { bubbles: !0 })
                  );
              }.bind(this)
            )),
          this._config.autoplay &&
            (this._$root.addEventListener(
              "mouseenter",
              function () {
                this._autoplay("stop");
              }.bind(this)
            ),
            this._$root.addEventListener(
              "mouseleave",
              function () {
                this._config.loop && this._autoplay();
              }.bind(this)
            )),
          this._config.swipe)
        ) {
          var n = !1;
          try {
            var r = Object.defineProperty({}, "passive", {
              get: function () {
                n = !0;
              },
            });
            window.addEventListener("testPassiveListener", null, r);
          } catch (e) {}
          this._$root.addEventListener(
            "touchstart",
            t.bind(this),
            !!n && { passive: !1 }
          ),
            this._$root.addEventListener(
              "touchmove",
              i.bind(this),
              !!n && { passive: !1 }
            ),
            this._$root.addEventListener("mousedown", t.bind(this)),
            this._$root.addEventListener("mousemove", i.bind(this)),
            document.addEventListener("touchend", s.bind(this)),
            document.addEventListener("mouseup", s.bind(this));
        }
        this._$root.addEventListener(
          "dragstart",
          function (e) {
            e.preventDefault();
          }.bind(this)
        ),
          document.addEventListener(
            "visibilitychange",
            function () {
              "hidden" === document.visibilityState
                ? this._autoplay("stop")
                : "visible" === document.visibilityState &&
                  this._config.loop &&
                  this._autoplay();
            }.bind(this)
          );
      }),
      (Dt.prototype.next = function () {
        (this._direction = "next"), this._move();
      }),
      (Dt.prototype.prev = function () {
        (this._direction = "prev"), this._move();
      }),
      (Dt.prototype.autoplay = function (e) {
        this._autoplay("stop");
      });
    document.querySelector(".menu__item");
    if (n()) {
      const e = n(),
        t = document.querySelector(`a[href="${e}"]`);
      t &&
        window.addEventListener("load", function () {
          t.click();
        });
    }
    const Gt = document.querySelectorAll(".card-preview-slider");
    Gt.length > 0 &&
      (s.any()
        ? Gt.forEach((e) => {
            const t = e.querySelector(".swiper");
            new Swiper(t, {
              slidePreview: 1,
              loop: !0,
              pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                dynamicBullets: !0,
              },
            });
          })
        : (document.addEventListener("mouseover", (e) => {
            const t = e.target;
            if (t.classList.contains("card-preview-slider__item")) {
              const e = t.closest(".card-preview-slider"),
                i = e.querySelectorAll(".swiper-slide");
              e.querySelectorAll(".card-preview-slider__item").forEach(
                (e, s) => {
                  t === e
                    ? (e.classList.add("_active"),
                      i[s].classList.add("_active"))
                    : (e.classList.remove("_active"),
                      i[s].classList.remove("_active"));
                }
              );
            }
          }),
          document.addEventListener("click", (e) => {
            const t = e.target;
            if (t.classList.contains("card-preview-slider__item")) {
              const e = t.closest(".card-preview-slider"),
                i = e.dataset.href ? e.dataset.href : "https://www.google.com/";
              window.location.href = i;
            }
          }),
          Gt.forEach((e) => {
            e.addEventListener("mouseleave", (e) => {
              const t = e.currentTarget,
                i = t.querySelectorAll(".swiper-slide");
              t.querySelectorAll(".card-preview-slider__item").forEach(
                (e, t) => {
                  0 === t
                    ? (e.classList.add("_active"),
                      i[t].classList.add("_active"))
                    : (e.classList.remove("_active"),
                      i[t].classList.remove("_active"));
                }
              );
            });
          }))),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      (function () {
        let e = document.querySelector(".icon-menu");
        e &&
          e.addEventListener("click", function (e) {
            r && (o(), document.documentElement.classList.toggle("menu-open"));
          });
      })(),
      new t({}),
      (function () {
        const e = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]"
        );
        e.length &&
          e.forEach((e) => {
            e.dataset.placeholder = e.placeholder;
          }),
          document.body.addEventListener("focusin", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = ""),
              t.classList.add("_form-focus"),
              t.parentElement.classList.add("_form-focus"),
              h.removeError(t));
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && h.validateInput(t));
          });
      })(),
      (function (e) {
        const t = document.forms;
        if (t.length)
          for (const e of t)
            e.addEventListener("submit", function (e) {
              i(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                h.formClean(t);
              });
        async function i(t, i) {
          if (0 === (e ? h.getErrors(t) : 0)) {
            if (t.hasAttribute("data-ajax")) {
              i.preventDefault();
              const e = t.getAttribute("action")
                  ? t.getAttribute("action").trim()
                  : "#",
                n = t.getAttribute("method")
                  ? t.getAttribute("method").trim()
                  : "GET",
                r = new FormData(t);
              t.classList.add("_sending");
              const o = await fetch(e, { method: n, body: r });
              if (o.ok) {
                await o.json();
                t.classList.remove("_sending"), s(t);
              } else alert("Ошибка"), t.classList.remove("_sending");
            } else t.hasAttribute("data-dev") && (i.preventDefault(), s(t));
          } else {
            i.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && c(e, !0, 1e3);
          }
        }
        function s(e) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } })
          ),
            h.formClean(e),
            d(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0),
      (function () {
        ye = !0;
        const e = document.querySelector("header.header"),
          t = e.hasAttribute("data-scroll-show"),
          i = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
          s = e.dataset.animate ? e.dataset.animate : 800,
          n = e.dataset.scroll ? e.dataset.scroll : 1;
        let r,
          o = 0;
        document.addEventListener("windowScroll", function (a) {
          const l = window.scrollY;
          clearTimeout(r),
            l >= n
              ? (!e.classList.contains("_header-scroll") &&
                  e.classList.add("_header-scroll"),
                e.classList.contains("_header-animate") ||
                  e.classList.contains("_header-animated") ||
                  (e.classList.add("_header-animate"),
                  setTimeout(function () {
                    e.classList.remove("_header-animate"),
                      e.classList.add("_header-animated");
                  }, s)),
                t &&
                  (l > o
                    ? e.classList.contains("_header-show") &&
                      e.classList.remove("_header-show")
                    : !e.classList.contains("_header-show") &&
                      e.classList.add("_header-show"),
                  (r = setTimeout(() => {
                    !e.classList.contains("_header-show") &&
                      e.classList.add("_header-show");
                  }, i))))
              : (e.classList.contains("_header-scroll") &&
                  e.classList.remove("_header-scroll"),
                e.classList.contains("_header-animated") &&
                  e.classList.remove("_header-animated"),
                t &&
                  e.classList.contains("_header-show") &&
                  e.classList.remove("_header-show")),
            (o = l <= 0 ? 0 : l);
        });
      })();
  })();
})();
