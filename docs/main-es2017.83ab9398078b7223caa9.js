(self.webpackChunkrandomquranverse =
  self.webpackChunkrandomquranverse || []).push([
  [179],
  {
    8255: function (e) {
      function t(e) {
        return Promise.resolve().then(function () {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        });
      }
      (t.keys = function () {
        return [];
      }),
        (t.resolve = t),
        (t.id = 8255),
        (e.exports = t);
    },
    4541: function (e, t, n) {
      "use strict";
      function s(e) {
        return "function" == typeof e;
      }
      let r = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack,
            );
          } else
            r &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3",
              );
          r = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return r;
        },
      };
      function o(e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
      const a = {
          closed: !0,
          next(e) {},
          error(e) {
            if (i.useDeprecatedSynchronousErrorHandling) throw e;
            o(e);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((e) => e && "number" == typeof e.length))();
      function c(e) {
        return null !== e && "object" == typeof e;
      }
      const u = (() => {
        function e(e) {
          return (
            Error.call(this),
            (this.message = e
              ? `${e.length} errors occurred during unsubscription:\n${e
                  .map((e, t) => `${t + 1}) ${e.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = e),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      let h = (() => {
        class e {
          constructor(e) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
          }
          unsubscribe() {
            let t;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: r,
              _unsubscribe: i,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof e)
            )
              n.remove(this);
            else if (null !== n)
              for (let e = 0; e < n.length; ++e) n[e].remove(this);
            if (s(i)) {
              r && (this._unsubscribe = void 0);
              try {
                i.call(this);
              } catch (a) {
                t = a instanceof u ? d(a.errors) : [a];
              }
            }
            if (l(o)) {
              let e = -1,
                n = o.length;
              for (; ++e < n; ) {
                const n = o[e];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (t = t || []),
                      a instanceof u ? (t = t.concat(d(a.errors))) : t.push(a);
                  }
              }
            }
            if (t) throw new u(t);
          }
          add(t) {
            let n = t;
            if (!t) return e.EMPTY;
            switch (typeof t) {
              case "function":
                n = new e(t);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof e)) {
                  const t = n;
                  (n = new e()), (n._subscriptions = [t]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + t + " added to Subscription.",
                );
            }
            let { _parentOrParents: s } = n;
            if (null === s) n._parentOrParents = this;
            else if (s instanceof e) {
              if (s === this) return n;
              n._parentOrParents = [s, this];
            } else {
              if (-1 !== s.indexOf(this)) return n;
              s.push(this);
            }
            const r = this._subscriptions;
            return null === r ? (this._subscriptions = [n]) : r.push(n), n;
          }
          remove(e) {
            const t = this._subscriptions;
            if (t) {
              const n = t.indexOf(e);
              -1 !== n && t.splice(n, 1);
            }
          }
        }
        return (
          (e.EMPTY = (function (e) {
            return (e.closed = !0), e;
          })(new e())),
          e
        );
      })();
      function d(e) {
        return e.reduce((e, t) => e.concat(t instanceof u ? t.errors : t), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(e, t, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!e) {
                this.destination = a;
                break;
              }
              if ("object" == typeof e) {
                e instanceof f
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, e, t, n));
          }
        }
        [p]() {
          return this;
        }
        static create(e, t, n) {
          const s = new f(e, t, n);
          return (s.syncErrorThrowable = !1), s;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: e } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = e),
            this
          );
        }
      }
      class m extends f {
        constructor(e, t, n, r) {
          let i;
          super(), (this._parentSubscriber = e);
          let o = this;
          s(t)
            ? (i = t)
            : t &&
              ((i = t.next),
              (n = t.error),
              (r = t.complete),
              t !== a &&
                ((o = Object.create(t)),
                s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = r);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: t } = this;
            i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (t.syncErrorThrowable)
              n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : o(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw e;
              o(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const t = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                : (this.__tryOrUnsub(t), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, t) {
          try {
            e.call(this._context, t);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(e, t, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            t.call(this._context, n);
          } catch (s) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = s), (e.syncErrorThrown = !0), !0)
              : (o(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const y = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function g(e) {
        return e;
      }
      let _ = (() => {
        class e {
          constructor(e) {
            (this._isScalar = !1), e && (this._subscribe = e);
          }
          lift(t) {
            const n = new e();
            return (n.source = this), (n.operator = t), n;
          }
          subscribe(e, t, n) {
            const { operator: s } = this,
              r = (function (e, t, n) {
                if (e) {
                  if (e instanceof f) return e;
                  if (e[p]) return e[p]();
                }
                return e || t || n ? new f(e, t, n) : new f(a);
              })(e, t, n);
            if (
              (r.add(
                s
                  ? s.call(r, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !r.syncErrorThrowable)
                  ? this._subscribe(r)
                  : this._trySubscribe(r),
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                r.syncErrorThrowable &&
                ((r.syncErrorThrowable = !1), r.syncErrorThrown))
            )
              throw r.syncErrorValue;
            return r;
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                (function (e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: s } = e;
                    if (t || s) return !1;
                    e = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(e)
                  ? e.error(t)
                  : console.warn(t);
            }
          }
          forEach(e, t) {
            return new (t = v(t))((t, n) => {
              let s;
              s = this.subscribe(
                (t) => {
                  try {
                    e(t);
                  } catch (r) {
                    n(r), s && s.unsubscribe();
                  }
                },
                n,
                t,
              );
            });
          }
          _subscribe(e) {
            const { source: t } = this;
            return t && t.subscribe(e);
          }
          [y]() {
            return this;
          }
          pipe(...e) {
            return 0 === e.length
              ? this
              : (0 === (t = e).length
                  ? g
                  : 1 === t.length
                  ? t[0]
                  : function (e) {
                      return t.reduce((e, t) => t(e), e);
                    })(this);
            var t;
          }
          toPromise(e) {
            return new (e = v(e))((e, t) => {
              let n;
              this.subscribe(
                (e) => (n = e),
                (e) => t(e),
                () => e(n),
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function v(e) {
        if ((e || (e = i.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      const b = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class w extends h {
        constructor(e, t) {
          super(),
            (this.subject = e),
            (this.subscriber = t),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !t || 0 === t.length || e.isStopped || e.closed)
          )
            return;
          const n = t.indexOf(this.subscriber);
          -1 !== n && t.splice(n, 1);
        }
      }
      class E extends f {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let S = (() => {
        class e extends _ {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new E(this);
          }
          lift(e) {
            const t = new T(this, this);
            return (t.operator = e), t;
          }
          next(e) {
            if (this.closed) throw new b();
            if (!this.isStopped) {
              const { observers: t } = this,
                n = t.length,
                s = t.slice();
              for (let r = 0; r < n; r++) s[r].next(e);
            }
          }
          error(e) {
            if (this.closed) throw new b();
            (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
            const { observers: t } = this,
              n = t.length,
              s = t.slice();
            for (let r = 0; r < n; r++) s[r].error(e);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new b();
            this.isStopped = !0;
            const { observers: e } = this,
              t = e.length,
              n = e.slice();
            for (let s = 0; s < t; s++) n[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(e) {
            if (this.closed) throw new b();
            return super._trySubscribe(e);
          }
          _subscribe(e) {
            if (this.closed) throw new b();
            return this.hasError
              ? (e.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (e.complete(), h.EMPTY)
              : (this.observers.push(e), new w(this, e));
          }
          asObservable() {
            const e = new _();
            return (e.source = this), e;
          }
        }
        return (e.create = (e, t) => new T(e, t)), e;
      })();
      class T extends S {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          const { destination: t } = this;
          t && t.next && t.next(e);
        }
        error(e) {
          const { destination: t } = this;
          t && t.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: t } = this;
          return t ? this.source.subscribe(e) : h.EMPTY;
        }
      }
      function C(e) {
        return e && "function" == typeof e.schedule;
      }
      function k(e, t) {
        return function (n) {
          if ("function" != typeof e)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?",
            );
          return n.lift(new x(e, t));
        };
      }
      class x {
        constructor(e, t) {
          (this.project = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new A(e, this.project, this.thisArg));
        }
      }
      class A extends f {
        constructor(e, t, n) {
          super(e),
            (this.project = t),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(e) {
          let t;
          try {
            t = this.project.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      const P = (e) => (t) => {
        for (let n = 0, s = e.length; n < s && !t.closed; n++) t.next(e[n]);
        t.complete();
      };
      function O() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const I = O();
      const D = (e) => {
        if (e && "function" == typeof e[y])
          return (
            (r = e),
            (e) => {
              const t = r[y]();
              if ("function" != typeof t.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable",
                );
              return t.subscribe(e);
            }
          );
        if ((t = e) && "number" == typeof t.length && "function" != typeof t)
          return P(e);
        var t, n, s, r;
        if (
          (n = e) &&
          "function" != typeof n.subscribe &&
          "function" == typeof n.then
        )
          return ((e) => (t) => (
            e
              .then(
                (e) => {
                  t.closed || (t.next(e), t.complete());
                },
                (e) => t.error(e),
              )
              .then(null, o),
            t
          ))(e);
        if (e && "function" == typeof e[I])
          return (
            (s = e),
            (e) => {
              const t = s[I]();
              for (;;) {
                let s;
                try {
                  s = t.next();
                } catch (n) {
                  return e.error(n), e;
                }
                if (s.done) {
                  e.complete();
                  break;
                }
                if ((e.next(s.value), e.closed)) break;
              }
              return (
                "function" == typeof t.return &&
                  e.add(() => {
                    t.return && t.return();
                  }),
                e
              );
            }
          );
        {
          const t = c(e) ? "an invalid object" : `'${e}'`;
          throw new TypeError(
            `You provided ${t} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`,
          );
        }
      };
      function N(e, t) {
        return new _((n) => {
          const s = new h();
          let r = 0;
          return (
            s.add(
              t.schedule(function () {
                r !== e.length
                  ? (n.next(e[r++]), n.closed || s.add(this.schedule()))
                  : n.complete();
              }),
            ),
            s
          );
        });
      }
      class F extends f {
        constructor(e) {
          super(), (this.parent = e);
        }
        _next(e) {
          this.parent.notifyNext(e);
        }
        _error(e) {
          this.parent.notifyError(e), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class M extends f {
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyError(e) {
          this.destination.error(e);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function R(e, t, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof t
          ? (s) =>
              s.pipe(
                R((n, s) => {
                  return ((r = e(n, s)), r instanceof _ ? r : new _(D(r))).pipe(
                    k((e, r) => t(n, e, s, r)),
                  );
                  var r;
                }, n),
              )
          : ("number" == typeof t && (n = t), (t) => t.lift(new j(e, n)));
      }
      class j {
        constructor(e, t = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = t);
        }
        call(e, t) {
          return t.subscribe(new H(e, this.project, this.concurrent));
        }
      }
      class H extends M {
        constructor(e, t, n = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = t),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(t);
        }
        _innerSub(e) {
          const t = new F(this),
            n = this.destination;
          n.add(t);
          const s = (function (e, t) {
            if (t.closed) return;
            if (e instanceof _) return e.subscribe(t);
            let n;
            try {
              n = D(e)(t);
            } catch (s) {
              t.error(s);
            }
            return n;
          })(e, t);
          s !== t && n.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyComplete() {
          const e = this.buffer;
          this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function V(e, t) {
        return t ? N(e, t) : new _(P(e));
      }
      function L() {
        return function (e) {
          return e.lift(new $(e));
        };
      }
      class $ {
        constructor(e) {
          this.connectable = e;
        }
        call(e, t) {
          const { connectable: n } = this;
          n._refCount++;
          const s = new B(e, n),
            r = t.subscribe(s);
          return s.closed || (s.connection = n.connect()), r;
        }
      }
      class B extends f {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const t = e._refCount;
          if (t <= 0) return void (this.connection = null);
          if (((e._refCount = t - 1), t > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            s = e._connection;
          (this.connection = null), !s || (n && s !== n) || s.unsubscribe();
        }
      }
      class z extends _ {
        constructor(e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (e && !e.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let e = this._connection;
          return (
            e ||
              ((this._isComplete = !1),
              (e = this._connection = new h()),
              e.add(this.source.subscribe(new K(this.getSubject(), this))),
              e.closed && ((this._connection = null), (e = h.EMPTY))),
            e
          );
        }
        refCount() {
          return L()(this);
        }
      }
      const q = (() => {
        const e = z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: e._subscribe },
          _isComplete: { value: e._isComplete, writable: !0 },
          getSubject: { value: e.getSubject },
          connect: { value: e.connect },
          refCount: { value: e.refCount },
        };
      })();
      class K extends E {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const t = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              t && t.unsubscribe();
          }
        }
      }
      function Q() {
        return new S();
      }
      function U(e) {
        for (let t in e) if (e[t] === U) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Z(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Z).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function W(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const G = U({ __forward_ref__: U });
      function J(e) {
        return (
          (e.__forward_ref__ = J),
          (e.toString = function () {
            return Z(this());
          }),
          e
        );
      }
      function Y(e) {
        return "function" == typeof (t = e) &&
          t.hasOwnProperty(G) &&
          t.__forward_ref__ === J
          ? e()
          : e;
        var t;
      }
      class X extends Error {
        constructor(e, t) {
          super(
            (function (e, t) {
              return `${e ? `NG0${e}: ` : ""}${t}`;
            })(e, t),
          ),
            (this.code = e);
        }
      }
      function ee(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function te(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : ee(e);
      }
      function ne(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new X("201", `No provider for ${te(e)} found${n}`);
      }
      function se(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function re(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function ie(e) {
        return oe(e, le) || oe(e, ue);
      }
      function oe(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function ae(e) {
        return e && (e.hasOwnProperty(ce) || e.hasOwnProperty(he))
          ? e[ce]
          : null;
      }
      const le = U({ "\u0275prov": U }),
        ce = U({ "\u0275inj": U }),
        ue = U({ ngInjectableDef: U }),
        he = U({ ngInjectorDef: U });
      var de = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })({});
      let pe;
      function fe(e) {
        const t = pe;
        return (pe = e), t;
      }
      function me(e, t, n) {
        const s = ie(e);
        return s && "root" == s.providedIn
          ? void 0 === s.value
            ? (s.value = s.factory())
            : s.value
          : n & de.Optional
          ? null
          : void 0 !== t
          ? t
          : void ne(Z(e), "Injector");
      }
      function ye(e) {
        return { toString: e }.toString();
      }
      var ge = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })({}),
        _e = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })({});
      const ve = "undefined" != typeof globalThis && globalThis,
        be = "undefined" != typeof window && window,
        we =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ee = "undefined" != typeof global && global,
        Se = ve || Ee || be || we,
        Te = {},
        Ce = [],
        ke = U({ "\u0275cmp": U }),
        xe = U({ "\u0275dir": U }),
        Ae = U({ "\u0275pipe": U }),
        Pe = U({ "\u0275mod": U }),
        Oe = U({ "\u0275loc": U }),
        Ie = U({ "\u0275fac": U }),
        De = U({ __NG_ELEMENT_ID__: U });
      let Ne = 0;
      function Fe(e) {
        return ye(() => {
          const t = {},
            n = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === ge.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || Ce,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || _e.Emulated,
              id: "c",
              styles: e.styles || Ce,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            s = e.directives,
            r = e.features,
            i = e.pipes;
          return (
            (n.id += Ne++),
            (n.inputs = Ve(e.inputs, t)),
            (n.outputs = Ve(e.outputs)),
            r && r.forEach((e) => e(n)),
            (n.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(Me)
              : null),
            (n.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Re)
              : null),
            n
          );
        });
      }
      function Me(e) {
        return (
          Be(e) ||
          (function (e) {
            return e[xe] || null;
          })(e)
        );
      }
      function Re(e) {
        return (function (e) {
          return e[Ae] || null;
        })(e);
      }
      const je = {};
      function He(e) {
        return ye(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || Ce,
            declarations: e.declarations || Ce,
            imports: e.imports || Ce,
            exports: e.exports || Ce,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (je[e.id] = e.type), t;
        });
      }
      function Ve(e, t) {
        if (null == e) return Te;
        const n = {};
        for (const s in e)
          if (e.hasOwnProperty(s)) {
            let r = e[s],
              i = r;
            Array.isArray(r) && ((i = r[1]), (r = r[0])),
              (n[r] = s),
              t && (t[r] = i);
          }
        return n;
      }
      const Le = Fe;
      function $e(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function Be(e) {
        return e[ke] || null;
      }
      function ze(e, t) {
        const n = e[Pe] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${Z(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function qe(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Ke(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Qe(e) {
        return 0 != (8 & e.flags);
      }
      function Ue(e) {
        return 2 == (2 & e.flags);
      }
      function Ze(e) {
        return 1 == (1 & e.flags);
      }
      function We(e) {
        return null !== e.template;
      }
      function Ge(e, t) {
        return e.hasOwnProperty(Ie) ? e[Ie] : null;
      }
      class Je {
        constructor(e, t, n) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ye() {
        const e = et(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === Te) e.previous = t;
          else for (let e in t) n[e] = t[e];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Xe(e, t, n, s) {
        const r =
            et(e) ||
            (function (e, t) {
              return (e.__ngSimpleChanges__ = t);
            })(e, { previous: Te, current: null }),
          i = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new Je(l && l.currentValue, t, o === Te)), (e[s] = t);
      }
      function et(e) {
        return e.__ngSimpleChanges__ || null;
      }
      let tt;
      function nt(e) {
        return !!e.listen;
      }
      const st = {
        createRenderer: (e, t) =>
          void 0 !== tt
            ? tt
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function rt(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function it(e, t) {
        return rt(t[e.index]);
      }
      function ot(e, t) {
        return e.data[t];
      }
      function at(e, t) {
        const n = t[e];
        return qe(n) ? n : n[0];
      }
      function lt(e) {
        return 128 == (128 & e[2]);
      }
      function ct(e, t) {
        return null == t ? null : e[t];
      }
      function ut(e) {
        e[18] = 0;
      }
      function ht(e, t) {
        e[5] += t;
        let n = e,
          s = e[3];
        for (
          ;
          null !== s && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (s[5] += t), (n = s), (s = s[3]);
      }
      const dt = {
        lFrame: Ot(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function pt() {
        return dt.bindingsEnabled;
      }
      function ft() {
        return dt.lFrame.lView;
      }
      function mt() {
        return dt.lFrame.tView;
      }
      function yt() {
        let e = gt();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function gt() {
        return dt.lFrame.currentTNode;
      }
      function _t(e, t) {
        const n = dt.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function vt() {
        return dt.lFrame.isParent;
      }
      function bt() {
        return dt.isInCheckNoChangesMode;
      }
      function wt(e) {
        dt.isInCheckNoChangesMode = e;
      }
      function Et() {
        return dt.lFrame.bindingIndex++;
      }
      function St(e, t) {
        const n = dt.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Tt(t);
      }
      function Tt(e) {
        dt.lFrame.currentDirectiveIndex = e;
      }
      function Ct(e) {
        dt.lFrame.currentQueryIndex = e;
      }
      function kt(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function xt(e, t, n) {
        if (n & de.SkipSelf) {
          let s = t,
            r = e;
          for (
            ;
            (s = s.parent),
              !(
                null !== s ||
                n & de.Host ||
                ((s = kt(r)), null === s) ||
                ((r = r[15]), 10 & s.type)
              );

          );
          if (null === s) return !1;
          (t = s), (e = r);
        }
        const s = (dt.lFrame = Pt());
        return (s.currentTNode = t), (s.lView = e), !0;
      }
      function At(e) {
        const t = Pt(),
          n = e[1];
        (dt.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Pt() {
        const e = dt.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Ot(e) : t;
      }
      function Ot(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function It() {
        const e = dt.lFrame;
        return (
          (dt.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Dt = It;
      function Nt() {
        const e = It();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ft() {
        return dt.lFrame.selectedIndex;
      }
      function Mt(e) {
        dt.lFrame.selectedIndex = e;
      }
      function Rt(e, t) {
        for (let n = t.directiveStart, s = t.directiveEnd; n < s; n++) {
          const t = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: r,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = t;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            r &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, r),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, r)),
            i && (e.viewHooks || (e.viewHooks = [])).push(-n, i),
            o &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, o),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, o)),
            null != a && (e.destroyHooks || (e.destroyHooks = [])).push(n, a);
        }
      }
      function jt(e, t, n) {
        Lt(e, t, 3, n);
      }
      function Ht(e, t, n, s) {
        (3 & e[2]) === n && Lt(e, t, n, s);
      }
      function Vt(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Lt(e, t, n, s) {
        const r = null != s ? s : -1,
          i = t.length - 1;
        let o = 0;
        for (let a = void 0 !== s ? 65535 & e[18] : 0; a < i; a++)
          if ("number" == typeof t[a + 1]) {
            if (((o = t[a]), null != s && o >= s)) break;
          } else
            t[a] < 0 && (e[18] += 65536),
              (o < r || -1 == r) &&
                ($t(e, n, t, a), (e[18] = (4294901760 & e[18]) + a + 2)),
              a++;
      }
      function $t(e, t, n, s) {
        const r = n[s] < 0,
          i = n[s + 1],
          o = e[r ? -n[s] : n[s]];
        if (r) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(o);
            } finally {
            }
          }
        } else
          try {
            i.call(o);
          } finally {
          }
      }
      class Bt {
        constructor(e, t, n) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = n);
        }
      }
      function zt(e, t, n) {
        const s = nt(e);
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              a = n[r++],
              l = n[r++];
            s ? e.setAttribute(t, a, l, o) : t.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++r];
            qt(o)
              ? s && e.setProperty(t, o, a)
              : s
              ? e.setAttribute(t, o, a)
              : t.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function qt(e) {
        return 64 === e.charCodeAt(0);
      }
      function Kt(e, t) {
        if (null === t || 0 === t.length);
        else if (null === e || 0 === e.length) e = t.slice();
        else {
          let n = -1;
          for (let s = 0; s < t.length; s++) {
            const r = t[s];
            "number" == typeof r
              ? (n = r)
              : 0 === n ||
                Qt(e, n, r, null, -1 === n || 2 === n ? t[++s] : null);
          }
        }
        return e;
      }
      function Qt(e, t, n, s, r) {
        let i = 0,
          o = e.length;
        if (-1 === t) o = -1;
        else
          for (; i < e.length; ) {
            const n = e[i++];
            if ("number" == typeof n) {
              if (n === t) {
                o = -1;
                break;
              }
              if (n > t) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const t = e[i];
          if ("number" == typeof t) break;
          if (t === n) {
            if (null === s) return void (null !== r && (e[i + 1] = r));
            if (s === e[i + 1]) return void (e[i + 2] = r);
          }
          i++, null !== s && i++, null !== r && i++;
        }
        -1 !== o && (e.splice(o, 0, t), (i = o + 1)),
          e.splice(i++, 0, n),
          null !== s && e.splice(i++, 0, s),
          null !== r && e.splice(i++, 0, r);
      }
      function Ut(e) {
        return -1 !== e;
      }
      function Zt(e) {
        return 32767 & e;
      }
      function Wt(e, t) {
        let n = e >> 16,
          s = t;
        for (; n > 0; ) (s = s[15]), n--;
        return s;
      }
      let Gt = !0;
      function Jt(e) {
        const t = Gt;
        return (Gt = e), t;
      }
      let Yt = 0;
      function Xt(e, t) {
        const n = tn(e, t);
        if (-1 !== n) return n;
        const s = t[1];
        s.firstCreatePass &&
          ((e.injectorIndex = t.length),
          en(s.data, e),
          en(t, null),
          en(s.blueprint, null));
        const r = nn(e, t),
          i = e.injectorIndex;
        if (Ut(r)) {
          const e = Zt(r),
            n = Wt(r, t),
            s = n[1].data;
          for (let r = 0; r < 8; r++) t[i + r] = n[e + r] | s[e + r];
        }
        return (t[i + 8] = r), i;
      }
      function en(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function tn(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function nn(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          s = null,
          r = t;
        for (; null !== r; ) {
          const e = r[1],
            t = e.type;
          if (((s = 2 === t ? e.declTNode : 1 === t ? r[6] : null), null === s))
            return -1;
          if ((n++, (r = r[15]), -1 !== s.injectorIndex))
            return s.injectorIndex | (n << 16);
        }
        return -1;
      }
      function sn(e, t, n) {
        !(function (e, t, n) {
          let s;
          "string" == typeof n
            ? (s = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(De) && (s = n[De]),
            null == s && (s = n[De] = Yt++);
          const r = 255 & s;
          t.data[e + (r >> 5)] |= 1 << r;
        })(e, t, n);
      }
      function rn(e, t, n) {
        if (n & de.Optional) return e;
        ne(t, "NodeInjector");
      }
      function on(e, t, n, s) {
        if (
          (n & de.Optional && void 0 === s && (s = null),
          0 == (n & (de.Self | de.Host)))
        ) {
          const r = e[9],
            i = fe(void 0);
          try {
            return r ? r.get(t, s, n & de.Optional) : me(t, s, n & de.Optional);
          } finally {
            fe(i);
          }
        }
        return rn(s, t, n);
      }
      function an(e, t, n, s = de.Default, r) {
        if (null !== e) {
          const i = (function (e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(De) ? e[De] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : cn) : t;
          })(n);
          if ("function" == typeof i) {
            if (!xt(t, e, s)) return s & de.Host ? rn(r, n, s) : on(t, n, s, r);
            try {
              const e = i(s);
              if (null != e || s & de.Optional) return e;
              ne(n);
            } finally {
              Dt();
            }
          } else if ("number" == typeof i) {
            let r = null,
              o = tn(e, t),
              a = -1,
              l = s & de.Host ? t[16][6] : null;
            for (
              (-1 === o || s & de.SkipSelf) &&
              ((a = -1 === o ? nn(e, t) : t[o + 8]),
              -1 !== a && pn(s, !1)
                ? ((r = t[1]), (o = Zt(a)), (t = Wt(a, t)))
                : (o = -1));
              -1 !== o;

            ) {
              const e = t[1];
              if (dn(i, o, e.data)) {
                const e = un(o, t, n, r, s, l);
                if (e !== ln) return e;
              }
              (a = t[o + 8]),
                -1 !== a && pn(s, t[1].data[o + 8] === l) && dn(i, o, t)
                  ? ((r = e), (o = Zt(a)), (t = Wt(a, t)))
                  : (o = -1);
            }
          }
        }
        return on(t, n, s, r);
      }
      const ln = {};
      function cn() {
        return new fn(yt(), ft());
      }
      function un(e, t, n, s, r, i) {
        const o = t[1],
          a = o.data[e + 8],
          l = (function (e, t, n, s, r) {
            const i = e.providerIndexes,
              o = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              c = i >> 20,
              u = r ? a + c : e.directiveEnd;
            for (let h = s ? a : a + c; h < u; h++) {
              const e = o[h];
              if ((h < l && n === e) || (h >= l && e.type === n)) return h;
            }
            if (r) {
              const e = o[l];
              if (e && We(e) && e.type === n) return l;
            }
            return null;
          })(
            a,
            o,
            n,
            null == s ? Ue(a) && Gt : s != o && 0 != (3 & a.type),
            r & de.Host && i === a,
          );
        return null !== l ? hn(t, o, l, a) : ln;
      }
      function hn(e, t, n, s) {
        let r = e[n];
        const i = t.data;
        if (r instanceof Bt) {
          const o = r;
          o.resolving &&
            (function (e, t) {
              throw new X("200", `Circular dependency in DI detected for ${e}`);
            })(te(i[n]));
          const a = Jt(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? fe(o.injectImpl) : null;
          xt(e, s, de.Default);
          try {
            (r = e[n] = o.factory(void 0, i, e, s)),
              t.firstCreatePass &&
                n >= s.directiveStart &&
                (function (e, t, n) {
                  const {
                    ngOnChanges: s,
                    ngOnInit: r,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (s) {
                    const s =
                      ((o = t).type.prototype.ngOnChanges && (o.setInput = Xe),
                      Ye);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  var o;
                  r &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, r),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && fe(l), Jt(a), (o.resolving = !1), Dt();
          }
        }
        return r;
      }
      function dn(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function pn(e, t) {
        return !(e & de.Self || (e & de.Host && t));
      }
      class fn {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t) {
          return an(this._tNode, this._lView, e, void 0, t);
        }
      }
      function mn(e, t, n) {
        return ye(() => {
          const s = (function (e) {
            return function (...t) {
              if (e) {
                const n = e(...t);
                for (const e in n) this[e] = n[e];
              }
            };
          })(t);
          function r(...e) {
            if (this instanceof r) return s.apply(this, e), this;
            const t = new r(...e);
            return (n.annotation = t), n;
            function n(e, n, s) {
              const r = e.hasOwnProperty("__parameters__")
                ? e.__parameters__
                : Object.defineProperty(e, "__parameters__", { value: [] })
                    .__parameters__;
              for (; r.length <= s; ) r.push(null);
              return (r[s] = r[s] || []).push(t), e;
            }
          }
          return (
            n && (r.prototype = Object.create(n.prototype)),
            (r.prototype.ngMetadataName = e),
            (r.annotationCls = r),
            r
          );
        });
      }
      class yn {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = se({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function gn(e, t) {
        e.forEach((e) => (Array.isArray(e) ? gn(e, t) : t(e)));
      }
      function _n(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function vn(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const bn = {},
        wn = /\n/gm,
        En = U({ provide: String, useValue: U });
      let Sn;
      function Tn(e) {
        const t = Sn;
        return (Sn = e), t;
      }
      function Cn(e, t = de.Default) {
        if (void 0 === Sn)
          throw new Error("inject() must be called from an injection context");
        return null === Sn
          ? me(e, void 0, t)
          : Sn.get(e, t & de.Optional ? null : void 0, t);
      }
      function kn(e, t = de.Default) {
        return (pe || Cn)(Y(e), t);
      }
      function xn(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const s = Y(e[n]);
          if (Array.isArray(s)) {
            if (0 === s.length)
              throw new Error("Arguments array must have arguments.");
            let e,
              n = de.Default;
            for (let t = 0; t < s.length; t++) {
              const r = s[t],
                i = r.__NG_DI_FLAG__;
              "number" == typeof i
                ? -1 === i
                  ? (e = r.token)
                  : (n |= i)
                : (e = r);
            }
            t.push(kn(e, n));
          } else t.push(kn(s));
        }
        return t;
      }
      function An(e, t) {
        return (e.__NG_DI_FLAG__ = t), (e.prototype.__NG_DI_FLAG__ = t), e;
      }
      const Pn = An(
          mn("Inject", (e) => ({ token: e })),
          -1,
        ),
        On = An(mn("Optional"), 8),
        In = An(mn("SkipSelf"), 4);
      function Dn(e, t) {
        e.__ngContext__ = t;
      }
      function Nn(e) {
        const t = (function (e) {
          return e.__ngContext__ || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function Fn(e) {
        return e.ngDebugContext;
      }
      function Mn(e) {
        return e.ngOriginalError;
      }
      function Rn(e, ...t) {
        e.error(...t);
      }
      class jn {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            n = this._findContext(e),
            s = (function (e) {
              return e.ngErrorLogger || Rn;
            })(e);
          s(this._console, "ERROR", e),
            t && s(this._console, "ORIGINAL ERROR", t),
            n && s(this._console, "ERROR CONTEXT", n);
        }
        _findContext(e) {
          return e ? (Fn(e) ? Fn(e) : this._findContext(Mn(e))) : null;
        }
        _findOriginalError(e) {
          let t = Mn(e);
          for (; t && Mn(t); ) t = Mn(t);
          return t;
        }
      }
      const Hn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Se))();
      function Vn(e) {
        return e instanceof Function ? e() : e;
      }
      var Ln = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })({});
      function $n(e, t) {
        return (void 0)(e, t);
      }
      function Bn(e) {
        const t = e[3];
        return Ke(t) ? t[3] : t;
      }
      function zn(e) {
        return Kn(e[13]);
      }
      function qn(e) {
        return Kn(e[4]);
      }
      function Kn(e) {
        for (; null !== e && !Ke(e); ) e = e[4];
        return e;
      }
      function Qn(e, t, n, s, r) {
        if (null != s) {
          let i,
            o = !1;
          Ke(s) ? (i = s) : qe(s) && ((o = !0), (s = s[0]));
          const a = rt(s);
          0 === e && null !== n
            ? null == r
              ? Xn(t, n, a)
              : Yn(t, n, a, r || null, !0)
            : 1 === e && null !== n
            ? Yn(t, n, a, r || null, !0)
            : 2 === e
            ? (function (e, t, n) {
                const s = ts(e, t);
                s &&
                  (function (e, t, n, s) {
                    nt(e) ? e.removeChild(t, n, s) : t.removeChild(n);
                  })(e, s, t, n);
              })(t, a, o)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function (e, t, n, s, r) {
                const i = n[7];
                i !== rt(n) && Qn(t, e, s, i, r);
                for (let o = 10; o < n.length; o++) {
                  const r = n[o];
                  as(r[1], r, e, t, s, i);
                }
              })(t, e, i, n, r);
        }
      }
      function Un(e, t, n) {
        return nt(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function Zn(e, t) {
        const n = e[9],
          s = n.indexOf(t),
          r = t[3];
        1024 & t[2] && ((t[2] &= -1025), ht(r, -1)), n.splice(s, 1);
      }
      function Wn(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          s = e[n];
        if (s) {
          const i = s[17];
          null !== i && i !== e && Zn(i, s), t > 0 && (e[n - 1][4] = s[4]);
          const o = vn(e, 10 + t);
          as(s[1], (r = s), r[11], 2, null, null), (r[0] = null), (r[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (s[3] = null),
            (s[4] = null),
            (s[2] &= -129);
        }
        var r;
        return s;
      }
      function Gn(e, t) {
        if (!(256 & t[2])) {
          const n = t[11];
          nt(n) && n.destroyNode && as(e, t, n, 3, null, null),
            (function (e) {
              let t = e[13];
              if (!t) return Jn(e[1], e);
              for (; t; ) {
                let n = null;
                if (qe(t)) n = t[13];
                else {
                  const e = t[10];
                  e && (n = e);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    qe(t) && Jn(t[1], t), (t = t[3]);
                  null === t && (t = e), qe(t) && Jn(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Jn(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function (e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let s = 0; s < n.length; s += 2) {
                  const e = t[n[s]];
                  if (!(e instanceof Bt)) {
                    const t = n[s + 1];
                    if (Array.isArray(t))
                      for (let n = 0; n < t.length; n += 2) {
                        const s = e[t[n]],
                          r = t[n + 1];
                        try {
                          r.call(s);
                        } finally {
                        }
                      }
                    else
                      try {
                        t.call(e);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function (e, t) {
              const n = e.cleanup,
                s = t[7];
              let r = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const e = n[i + 1],
                      o = "function" == typeof e ? e(t) : rt(t[e]),
                      a = s[(r = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? o.removeEventListener(n[i], a, l)
                      : l >= 0
                      ? s[(r = l)]()
                      : s[(r = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const e = s[(r = n[i + 1])];
                    n[i].call(e);
                  }
              if (null !== s) {
                for (let e = r + 1; e < s.length; e++) (0, s[e])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && nt(t[11]) && t[11].destroy();
          const n = t[17];
          if (null !== n && Ke(t[3])) {
            n !== t[3] && Zn(n, t);
            const s = t[19];
            null !== s && s.detachView(e);
          }
        }
      }
      function Yn(e, t, n, s, r) {
        nt(e) ? e.insertBefore(t, n, s, r) : t.insertBefore(n, s, r);
      }
      function Xn(e, t, n) {
        nt(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function es(e, t, n, s, r) {
        null !== s ? Yn(e, t, n, s, r) : Xn(e, t, n);
      }
      function ts(e, t) {
        return nt(e) ? e.parentNode(t) : t.parentNode;
      }
      function ns(e, t, n, s) {
        const r = (function (e, t, n) {
            return (function (e, t, n) {
              let s = t;
              for (; null !== s && 40 & s.type; ) s = (t = s).parent;
              if (null === s) return n[0];
              if (2 & s.flags) {
                const t = e.data[s.directiveStart].encapsulation;
                if (t === _e.None || t === _e.Emulated) return null;
              }
              return it(s, n);
            })(e, t.parent, n);
          })(e, s, t),
          i = t[11],
          o = (function (e, t, n) {
            return (function (e, t, n) {
              return 40 & e.type ? it(e, n) : null;
            })(e, 0, n);
          })(s.parent || t[6], 0, t);
        if (null != r)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) es(i, r, n[a], o, !1);
          else es(i, r, n, o, !1);
      }
      function ss(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return it(t, e);
          if (4 & n) return is(-1, e[t.index]);
          if (8 & n) {
            const n = t.child;
            if (null !== n) return ss(e, n);
            {
              const n = e[t.index];
              return Ke(n) ? is(-1, n) : rt(n);
            }
          }
          if (32 & n) return $n(t, e)() || rt(e[t.index]);
          {
            const n = rs(e, t);
            return null !== n
              ? Array.isArray(n)
                ? n[0]
                : ss(Bn(e[16]), n)
              : ss(e, t.next);
          }
        }
        return null;
      }
      function rs(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function is(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const e = t[n],
            s = e[1].firstChild;
          if (null !== s) return ss(e, s);
        }
        return t[7];
      }
      function os(e, t, n, s, r, i, o) {
        for (; null != n; ) {
          const a = s[n.index],
            l = n.type;
          if (
            (o && 0 === t && (a && Dn(rt(a), s), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) os(e, t, n.child, s, r, i, !1), Qn(t, e, r, a, i);
            else if (32 & l) {
              const o = $n(n, s);
              let l;
              for (; (l = o()); ) Qn(t, e, r, l, i);
              Qn(t, e, r, a, i);
            } else 16 & l ? ls(e, t, s, n, r, i) : Qn(t, e, r, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function as(e, t, n, s, r, i) {
        os(n, s, e.firstChild, t, r, i, !1);
      }
      function ls(e, t, n, s, r, i) {
        const o = n[16],
          a = o[6].projection[s.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) Qn(t, e, r, a[l], i);
        else os(e, t, a, o[3], r, i, !0);
      }
      function cs(e, t, n) {
        nt(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function us(e, t, n) {
        nt(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function hs(e, t, n) {
        let s = e.length;
        for (;;) {
          const r = e.indexOf(t, n);
          if (-1 === r) return r;
          if (0 === r || e.charCodeAt(r - 1) <= 32) {
            const n = t.length;
            if (r + n === s || e.charCodeAt(r + n) <= 32) return r;
          }
          n = r + 1;
        }
      }
      function ds(e, t, n) {
        let s = 0;
        for (; s < e.length; ) {
          let r = e[s++];
          if (n && "class" === r) {
            if (((r = e[s]), -1 !== hs(r.toLowerCase(), t, 0))) return !0;
          } else if (1 === r) {
            for (; s < e.length && "string" == typeof (r = e[s++]); )
              if (r.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function ps(e) {
        return 4 === e.type && "ng-template" !== e.value;
      }
      function fs(e, t, n) {
        return t === (4 !== e.type || n ? e.value : "ng-template");
      }
      function ms(e, t, n) {
        let s = 4;
        const r = e.attrs || [],
          i = (function (e) {
            for (let n = 0; n < e.length; n++)
              if (3 === (t = e[n]) || 4 === t || 6 === t) return n;
            var t;
            return e.length;
          })(r);
        let o = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & s) {
                if (
                  ((s = 2 | (1 & s)),
                  ("" !== l && !fs(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (ys(s)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & s ? l : t[++a];
                if (8 & s && null !== e.attrs) {
                  if (!ds(e.attrs, c, n)) {
                    if (ys(s)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = gs(8 & s ? "class" : l, r, ps(e), n);
                if (-1 === u) {
                  if (ys(s)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let e;
                  e = u > i ? "" : r[u + 1].toLowerCase();
                  const t = 8 & s ? e : null;
                  if ((t && -1 !== hs(t, c, 0)) || (2 & s && c !== e)) {
                    if (ys(s)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !ys(s) && !ys(l)) return !1;
            if (o && ys(l)) continue;
            (o = !1), (s = l | (1 & s));
          }
        }
        return ys(s) || o;
      }
      function ys(e) {
        return 0 == (1 & e);
      }
      function gs(e, t, n, s) {
        if (null === t) return -1;
        let r = 0;
        if (s || !n) {
          let n = !1;
          for (; r < t.length; ) {
            const s = t[r];
            if (s === e) return r;
            if (3 === s || 6 === s) n = !0;
            else {
              if (1 === s || 2 === s) {
                let e = t[++r];
                for (; "string" == typeof e; ) e = t[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += n ? 1 : 2;
          }
          return -1;
        }
        return (function (e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const s = e[n];
              if ("number" == typeof s) return -1;
              if (s === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function _s(e, t, n = !1) {
        for (let s = 0; s < t.length; s++) if (ms(e, t[s], n)) return !0;
        return !1;
      }
      function vs(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function bs(e) {
        let t = e[0],
          n = 1,
          s = 2,
          r = "",
          i = !1;
        for (; n < e.length; ) {
          let o = e[n];
          if ("string" == typeof o)
            if (2 & s) {
              const t = e[++n];
              r += "[" + o + (t.length > 0 ? '="' + t + '"' : "") + "]";
            } else 8 & s ? (r += "." + o) : 4 & s && (r += " " + o);
          else
            "" === r || ys(o) || ((t += vs(i, r)), (r = "")),
              (s = o),
              (i = i || !ys(s));
          n++;
        }
        return "" !== r && (t += vs(i, r)), t;
      }
      const ws = {};
      function Es(e) {
        Ss(mt(), ft(), Ft() + e, bt());
      }
      function Ss(e, t, n, s) {
        if (!s)
          if (3 == (3 & t[2])) {
            const s = e.preOrderCheckHooks;
            null !== s && jt(t, s, n);
          } else {
            const s = e.preOrderHooks;
            null !== s && Ht(t, s, 0, n);
          }
        Mt(n);
      }
      function Ts(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) {
            const r = n[s],
              i = n[s + 1];
            if (-1 !== i) {
              const n = e.data[i];
              Ct(r), n.contentQueries(2, t[i], i);
            }
          }
      }
      function Cs(e, t, n, s, r, i, o, a, l, c) {
        const u = t.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | s),
          ut(u),
          (u[3] = u[15] = e),
          (u[8] = n),
          (u[10] = o || (e && e[10])),
          (u[11] = a || (e && e[11])),
          (u[12] = l || (e && e[12]) || null),
          (u[9] = c || (e && e[9]) || null),
          (u[6] = i),
          (u[16] = 2 == t.type ? e[16] : u),
          u
        );
      }
      function ks(e, t, n, s, r) {
        let i = e.data[t];
        if (null === i)
          (i = (function (e, t, n, s, r) {
            const i = gt(),
              o = vt(),
              a = (e.data[t] = (function (e, t, n, s, r, i) {
                return {
                  type: n,
                  index: s,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, t, s, r));
            return (
              null === e.firstChild && (e.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            );
          })(e, t, n, s, r)),
            dt.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = s), (i.attrs = r);
          const e = (function () {
            const e = dt.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === e ? -1 : e.injectorIndex;
        }
        return _t(i, !0), i;
      }
      function xs(e, t, n, s) {
        if (0 === n) return -1;
        const r = t.length;
        for (let i = 0; i < n; i++)
          t.push(s), e.blueprint.push(s), e.data.push(null);
        return r;
      }
      function As(e, t, n) {
        At(t);
        try {
          const s = e.viewQuery;
          null !== s && tr(1, s, n);
          const r = e.template;
          null !== r && Is(e, t, r, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Ts(e, t),
            e.staticViewQueries && tr(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function (e, t) {
              for (let n = 0; n < t.length; n++) Gs(e, t[n]);
            })(t, i);
        } catch (s) {
          throw (e.firstCreatePass && (e.incompleteFirstPass = !0), s);
        } finally {
          (t[2] &= -5), Nt();
        }
      }
      function Ps(e, t, n, s) {
        const r = t[2];
        if (256 == (256 & r)) return;
        At(t);
        const i = bt();
        try {
          ut(t),
            (dt.lFrame.bindingIndex = e.bindingStartIndex),
            null !== n && Is(e, t, n, 2, s);
          const o = 3 == (3 & r);
          if (!i)
            if (o) {
              const n = e.preOrderCheckHooks;
              null !== n && jt(t, n, null);
            } else {
              const n = e.preOrderHooks;
              null !== n && Ht(t, n, 0, null), Vt(t, 0);
            }
          if (
            ((function (e) {
              for (let t = zn(e); null !== t; t = qn(t)) {
                if (!t[2]) continue;
                const e = t[9];
                for (let t = 0; t < e.length; t++) {
                  const n = e[t],
                    s = n[3];
                  0 == (1024 & n[2]) && ht(s, 1), (n[2] |= 1024);
                }
              }
            })(t),
            (function (e) {
              for (let t = zn(e); null !== t; t = qn(t))
                for (let e = 10; e < t.length; e++) {
                  const n = t[e],
                    s = n[1];
                  lt(n) && Ps(s, n, s.template, n[8]);
                }
            })(t),
            null !== e.contentQueries && Ts(e, t),
            !i)
          )
            if (o) {
              const n = e.contentCheckHooks;
              null !== n && jt(t, n);
            } else {
              const n = e.contentHooks;
              null !== n && Ht(t, n, 1), Vt(t, 1);
            }
          !(function (e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let e = 0; e < n.length; e++) {
                  const s = n[e];
                  if (s < 0) Mt(~s);
                  else {
                    const r = s,
                      i = n[++e],
                      o = n[++e];
                    St(i, r), o(2, t[r]);
                  }
                }
              } finally {
                Mt(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function (e, t) {
              for (let n = 0; n < t.length; n++) Zs(e, t[n]);
            })(t, a);
          const l = e.viewQuery;
          if ((null !== l && tr(2, l, s), !i))
            if (o) {
              const n = e.viewCheckHooks;
              null !== n && jt(t, n);
            } else {
              const n = e.viewHooks;
              null !== n && Ht(t, n, 2), Vt(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            i || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), ht(t[3], -1));
        } finally {
          Nt();
        }
      }
      function Os(e, t, n, s) {
        const r = t[10],
          i = !bt(),
          o = 4 == (4 & t[2]);
        try {
          i && !o && r.begin && r.begin(), o && As(e, t, s), Ps(e, t, n, s);
        } finally {
          i && !o && r.end && r.end();
        }
      }
      function Is(e, t, n, s, r) {
        const i = Ft(),
          o = 2 & s;
        try {
          Mt(-1), o && t.length > 20 && Ss(e, t, 20, bt()), n(s, r);
        } finally {
          Mt(i);
        }
      }
      function Ds(e, t, n) {
        pt() &&
          ((function (e, t, n, s) {
            const r = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || Xt(n, t), Dn(s, t);
            const o = n.initialInputs;
            for (let a = r; a < i; a++) {
              const s = e.data[a],
                i = We(s);
              i && qs(t, n, s);
              const l = hn(t, e, a, n);
              Dn(l, t),
                null !== o && Ks(0, a - r, l, s, 0, o),
                i && (at(n.index, t)[8] = l);
            }
          })(e, t, n, it(n, t)),
          128 == (128 & n.flags) &&
            (function (e, t, n) {
              const s = n.directiveStart,
                r = n.directiveEnd,
                i = n.index,
                o = dt.lFrame.currentDirectiveIndex;
              try {
                Mt(i);
                for (let n = s; n < r; n++) {
                  const s = e.data[n],
                    r = t[n];
                  Tt(n),
                    (null === s.hostBindings &&
                      0 === s.hostVars &&
                      null === s.hostAttrs) ||
                      Vs(s, r);
                }
              } finally {
                Mt(-1), Tt(o);
              }
            })(e, t, n));
      }
      function Ns(e, t, n = it) {
        const s = t.localNames;
        if (null !== s) {
          let r = t.index + 1;
          for (let i = 0; i < s.length; i += 2) {
            const o = s[i + 1],
              a = -1 === o ? n(t, e) : e[o];
            e[r++] = a;
          }
        }
      }
      function Fs(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Ms(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
            ))
          : t;
      }
      function Ms(e, t, n, s, r, i, o, a, l, c) {
        const u = 20 + s,
          h = u + r,
          d = (function (e, t) {
            const n = [];
            for (let s = 0; s < t; s++) n.push(s < e ? null : ws);
            return n;
          })(u, h),
          p = "function" == typeof c ? c() : c;
        return (d[1] = {
          type: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function Rs(e, t, n) {
        for (let s in e)
          if (e.hasOwnProperty(s)) {
            const r = e[s];
            (n = null === n ? {} : n).hasOwnProperty(s)
              ? n[s].push(t, r)
              : (n[s] = [t, r]);
          }
        return n;
      }
      function js(e, t, n, s) {
        let r = !1;
        if (pt()) {
          const i = (function (e, t, n) {
              const s = e.directiveRegistry;
              let r = null;
              if (s)
                for (let i = 0; i < s.length; i++) {
                  const o = s[i];
                  _s(n, o.selectors, !1) &&
                    (r || (r = []),
                    sn(Xt(n, t), e, o.type),
                    We(o) ? (Ls(e, n), r.unshift(o)) : r.push(o));
                }
              return r;
            })(e, t, n),
            o = null === s ? null : { "": -1 };
          if (null !== i) {
            (r = !0), Bs(n, e.data.length, i.length);
            for (let e = 0; e < i.length; e++) {
              const t = i[e];
              t.providersResolver && t.providersResolver(t);
            }
            let s = !1,
              a = !1,
              l = xs(e, t, i.length, null);
            for (let r = 0; r < i.length; r++) {
              const c = i[r];
              (n.mergedAttrs = Kt(n.mergedAttrs, c.hostAttrs)),
                zs(e, n, t, l, c),
                $s(l, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const u = c.type.prototype;
              !s &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (s = !0)),
                a ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index,
                  ),
                  (a = !0)),
                l++;
            }
            !(function (e, t) {
              const n = t.directiveEnd,
                s = e.data,
                r = t.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = t.directiveStart; l < n; l++) {
                const e = s[l],
                  n = e.inputs,
                  c = null === r || ps(t) ? null : Qs(n, r);
                i.push(c), (o = Rs(n, l, o)), (a = Rs(e.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (t.flags |= 16),
                o.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = i),
                (t.inputs = o),
                (t.outputs = a);
            })(e, n);
          }
          o &&
            (function (e, t, n) {
              if (t) {
                const s = (e.localNames = []);
                for (let e = 0; e < t.length; e += 2) {
                  const r = n[t[e + 1]];
                  if (null == r)
                    throw new X(
                      "301",
                      `Export of name '${t[e + 1]}' not found!`,
                    );
                  s.push(t[e], r);
                }
              }
            })(n, s, o);
        }
        return (n.mergedAttrs = Kt(n.mergedAttrs, n.attrs)), r;
      }
      function Hs(e, t, n, s, r, i) {
        const o = i.hostBindings;
        if (o) {
          let n = e.hostBindingOpCodes;
          null === n && (n = e.hostBindingOpCodes = []);
          const i = ~t.index;
          (function (e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(s, r, o);
        }
      }
      function Vs(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Ls(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function $s(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let s = 0; s < t.exportAs.length; s++) n[t.exportAs[s]] = e;
          We(t) && (n[""] = e);
        }
      }
      function Bs(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function zs(e, t, n, s, r) {
        e.data[s] = r;
        const i = r.factory || (r.factory = Ge(r.type)),
          o = new Bt(i, We(r), null);
        (e.blueprint[s] = o),
          (n[s] = o),
          Hs(e, t, 0, s, xs(e, n, r.hostVars, ws), r);
      }
      function qs(e, t, n) {
        const s = it(t, e),
          r = Fs(n),
          i = e[10],
          o = Js(
            e,
            Cs(
              e,
              r,
              null,
              n.onPush ? 64 : 16,
              s,
              t,
              i,
              i.createRenderer(s, n),
              null,
              null,
            ),
          );
        e[t.index] = o;
      }
      function Ks(e, t, n, s, r, i) {
        const o = i[t];
        if (null !== o) {
          const e = s.setInput;
          for (let t = 0; t < o.length; ) {
            const r = o[t++],
              i = o[t++],
              a = o[t++];
            null !== e ? s.setInput(n, a, r, i) : (n[i] = a);
          }
        }
      }
      function Qs(e, t) {
        let n = null,
          s = 0;
        for (; s < t.length; ) {
          const r = t[s];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              e.hasOwnProperty(r) &&
                (null === n && (n = []), n.push(r, e[r], t[s + 1])),
                (s += 2);
            } else s += 2;
          else s += 4;
        }
        return n;
      }
      function Us(e, t, n, s) {
        return new Array(e, !0, !1, t, null, 0, s, n, null, null);
      }
      function Zs(e, t) {
        const n = at(t, e);
        if (lt(n)) {
          const e = n[1];
          80 & n[2] ? Ps(e, n, e.template, n[8]) : n[5] > 0 && Ws(n);
        }
      }
      function Ws(e) {
        for (let n = zn(e); null !== n; n = qn(n))
          for (let e = 10; e < n.length; e++) {
            const t = n[e];
            if (1024 & t[2]) {
              const e = t[1];
              Ps(e, t, e.template, t[8]);
            } else t[5] > 0 && Ws(t);
          }
        const t = e[1].components;
        if (null !== t)
          for (let n = 0; n < t.length; n++) {
            const s = at(t[n], e);
            lt(s) && s[5] > 0 && Ws(s);
          }
      }
      function Gs(e, t) {
        const n = at(t, e),
          s = n[1];
        !(function (e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(s, n),
          As(s, n, n[8]);
      }
      function Js(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Ys(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = Bn(e);
          if (0 != (512 & e[2]) && !t) return e;
          e = t;
        }
        return null;
      }
      function Xs(e, t, n) {
        const s = t[10];
        s.begin && s.begin();
        try {
          Ps(e, t, e.template, n);
        } catch (r) {
          throw (ir(t, r), r);
        } finally {
          s.end && s.end();
        }
      }
      function er(e) {
        !(function (e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              s = Nn(n),
              r = s[1];
            Os(r, s, r.template, n);
          }
        })(e[8]);
      }
      function tr(e, t, n) {
        Ct(0), t(e, n);
      }
      const nr = (() => Promise.resolve(null))();
      function sr(e) {
        return e[7] || (e[7] = []);
      }
      function rr(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function ir(e, t) {
        const n = e[9],
          s = n ? n.get(jn, null) : null;
        s && s.handleError(t);
      }
      function or(e, t, n, s, r) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = t[o],
            c = e.data[o];
          null !== c.setInput ? c.setInput(l, r, s, a) : (l[a] = r);
        }
      }
      function ar(e, t, n) {
        let s = n ? e.styles : null,
          r = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const e = t[o];
            "number" == typeof e
              ? (i = e)
              : 1 == i
              ? (r = W(r, e))
              : 2 == i && (s = W(s, e + ": " + t[++o] + ";"));
          }
        n ? (e.styles = s) : (e.stylesWithoutHost = s),
          n ? (e.classes = r) : (e.classesWithoutHost = r);
      }
      const lr = new yn("INJECTOR", -1);
      class cr {
        get(e, t = bn) {
          if (t === bn) {
            const t = new Error(`NullInjectorError: No provider for ${Z(e)}!`);
            throw ((t.name = "NullInjectorError"), t);
          }
          return t;
        }
      }
      const ur = new yn("Set Injector scope."),
        hr = {},
        dr = {};
      let pr;
      function fr() {
        return void 0 === pr && (pr = new cr()), pr;
      }
      function mr(e, t = null, n = null, s) {
        return new yr(e, n, t || fr(), s);
      }
      class yr {
        constructor(e, t, n, s = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const r = [];
          t && gn(t, (n) => this.processProvider(n, e, t)),
            gn([e], (e) => this.processInjectorType(e, [], r)),
            this.records.set(lr, _r(void 0, this));
          const i = this.records.get(ur);
          (this.scope = null != i ? i.value : null),
            (this.source = s || ("object" == typeof e ? null : Z(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, t = bn, n = de.Default) {
          this.assertNotDestroyed();
          const s = Tn(this);
          try {
            if (!(n & de.SkipSelf)) {
              let t = this.records.get(e);
              if (void 0 === t) {
                const n =
                  ("function" == typeof (r = e) ||
                    ("object" == typeof r && r instanceof yn)) &&
                  ie(e);
                (t = n && this.injectableDefInScope(n) ? _r(gr(e), hr) : null),
                  this.records.set(e, t);
              }
              if (null != t) return this.hydrate(e, t);
            }
            return (n & de.Self ? fr() : this.parent).get(
              e,
              (t = n & de.Optional && t === bn ? null : t),
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(Z(e)), s)
              )
                throw i;
              return (function (e, t, n, s) {
                const r = e.ngTempTokenPath;
                throw (
                  (t.__source && r.unshift(t.__source),
                  (e.message = (function (e, t, n, s = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let r = Z(t);
                    if (Array.isArray(t)) r = t.map(Z).join(" -> ");
                    else if ("object" == typeof t) {
                      let e = [];
                      for (let n in t)
                        if (t.hasOwnProperty(n)) {
                          let s = t[n];
                          e.push(
                            n +
                              ":" +
                              ("string" == typeof s ? JSON.stringify(s) : Z(s)),
                          );
                        }
                      r = `{${e.join(", ")}}`;
                    }
                    return `${n}${s ? "(" + s + ")" : ""}[${r}]: ${e.replace(
                      wn,
                      "\n  ",
                    )}`;
                  })("\n" + e.message, r, n, s)),
                  (e.ngTokenPath = r),
                  (e.ngTempTokenPath = null),
                  e)
                );
              })(i, e, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            Tn(s);
          }
          var r;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((t, n) => e.push(Z(n))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(e, t, n) {
          if (!(e = Y(e))) return !1;
          let s = ae(e);
          const r = (null == s && e.ngModule) || void 0,
            i = void 0 === r ? e : r,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== r && (s = ae(r)), null == s)) return !1;
          if (null != s.imports && !o) {
            let e;
            n.push(i);
            try {
              gn(s.imports, (s) => {
                this.processInjectorType(s, t, n) &&
                  (void 0 === e && (e = []), e.push(s));
              });
            } finally {
            }
            if (void 0 !== e)
              for (let t = 0; t < e.length; t++) {
                const { ngModule: n, providers: s } = e[t];
                gn(s, (e) => this.processProvider(e, n, s || Ce));
              }
          }
          this.injectorDefTypes.add(i);
          const a = Ge(i) || (() => new i());
          this.records.set(i, _r(a, hr));
          const l = s.providers;
          if (null != l && !o) {
            const t = e;
            gn(l, (e) => this.processProvider(e, t, l));
          }
          return void 0 !== r && void 0 !== e.providers;
        }
        processProvider(e, t, n) {
          let s = br((e = Y(e))) ? e : Y(e && e.provide);
          const r = (function (e, t, n) {
            return vr(e)
              ? _r(void 0, e.useValue)
              : _r(
                  (function (e, t, n) {
                    let s;
                    if (br(e)) {
                      const t = Y(e);
                      return Ge(t) || gr(t);
                    }
                    if (vr(e)) s = () => Y(e.useValue);
                    else if ((r = e) && r.useFactory)
                      s = () => e.useFactory(...xn(e.deps || []));
                    else if (
                      (function (e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      s = () => kn(Y(e.useExisting));
                    else {
                      const t = Y(e && (e.useClass || e.provide));
                      if (
                        !(function (e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Ge(t) || gr(t);
                      s = () => new t(...xn(e.deps));
                    }
                    var r;
                    return s;
                  })(e),
                  hr,
                );
          })(e);
          if (br(e) || !0 !== e.multi) this.records.get(s);
          else {
            let t = this.records.get(s);
            t ||
              ((t = _r(void 0, hr, !0)),
              (t.factory = () => xn(t.multi)),
              this.records.set(s, t)),
              (s = e),
              t.multi.push(e);
          }
          this.records.set(s, r);
        }
        hydrate(e, t) {
          var n;
          return (
            t.value === hr && ((t.value = dr), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              null !== (n = t.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(t.value),
            t.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = Y(e.providedIn);
          return "string" == typeof t
            ? "any" === t || t === this.scope
            : this.injectorDefTypes.has(t);
        }
      }
      function gr(e) {
        const t = ie(e),
          n = null !== t ? t.factory : Ge(e);
        if (null !== n) return n;
        if (e instanceof yn)
          throw new Error(`Token ${Z(e)} is missing a \u0275prov definition.`);
        if (e instanceof Function)
          return (function (e) {
            const t = e.length;
            if (t > 0) {
              const n = (function (e, t) {
                const n = [];
                for (let s = 0; s < e; s++) n.push("?");
                return n;
              })(t);
              throw new Error(
                `Can't resolve all parameters for ${Z(e)}: (${n.join(", ")}).`,
              );
            }
            const n = (function (e) {
              const t = e && (e[le] || e[ue]);
              if (t) {
                const n = (function (e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`,
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new Error("unreachable");
      }
      function _r(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function vr(e) {
        return null !== e && "object" == typeof e && En in e;
      }
      function br(e) {
        return "function" == typeof e;
      }
      const wr = function (e, t, n) {
        return (function (e, t = null, n = null, s) {
          const r = mr(e, t, n, s);
          return r._resolveInjectorDefTypes(), r;
        })({ name: n }, t, e, n);
      };
      let Er = (() => {
        class e {
          static create(e, t) {
            return Array.isArray(e)
              ? wr(e, t, "")
              : wr(e.providers, e.parent, e.name || "");
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = bn),
          (e.NULL = new cr()),
          (e.ɵprov = se({
            token: e,
            providedIn: "any",
            factory: () => kn(lr),
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function Sr(e, t) {
        Rt(Nn(e)[1], yt());
      }
      let Tr = null;
      function Cr() {
        if (!Tr) {
          const e = Se.Symbol;
          if (e && e.iterator) Tr = e.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const n = e[t];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Tr = n);
            }
          }
        }
        return Tr;
      }
      class kr {
        constructor(e) {
          this.wrapped = e;
        }
        static wrap(e) {
          return new kr(e);
        }
        static unwrap(e) {
          return kr.isWrapped(e) ? e.wrapped : e;
        }
        static isWrapped(e) {
          return e instanceof kr;
        }
      }
      function xr(e) {
        return (
          !!Ar(e) && (Array.isArray(e) || (!(e instanceof Map) && Cr() in e))
        );
      }
      function Ar(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Pr(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Or(e, t = de.Default) {
        const n = ft();
        return null === n ? kn(e, t) : an(yt(), n, Y(e), t);
      }
      function Ir(e, t, n) {
        const s = ft();
        return (
          Pr(s, Et(), t) &&
            (function (e, t, n, s, r, i, o, a) {
              const l = it(t, n);
              let c,
                u = t.inputs;
              var h;
              null != u && (c = u[s])
                ? (or(e, n, c, s, r),
                  Ue(t) &&
                    (function (e, t) {
                      const n = at(t, e);
                      16 & n[2] || (n[2] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((s =
                    "class" === (h = s)
                      ? "className"
                      : "for" === h
                      ? "htmlFor"
                      : "formaction" === h
                      ? "formAction"
                      : "innerHtml" === h
                      ? "innerHTML"
                      : "readonly" === h
                      ? "readOnly"
                      : "tabindex" === h
                      ? "tabIndex"
                      : h),
                  (r = null != o ? o(r, t.value || "", s) : r),
                  nt(i)
                    ? i.setProperty(l, s, r)
                    : qt(s) ||
                      (l.setProperty ? l.setProperty(s, r) : (l[s] = r)));
            })(
              mt(),
              (function () {
                const e = dt.lFrame;
                return ot(e.tView, e.selectedIndex);
              })(),
              s,
              e,
              t,
              s[11],
              n,
            ),
          Ir
        );
      }
      function Dr(e, t, n, s, r) {
        const i = r ? "class" : "style";
        or(e, n, t.inputs[i], i, s);
      }
      function Nr(e, t, n, s) {
        const r = ft(),
          i = mt(),
          o = 20 + e,
          a = r[11],
          l = (r[o] = Un(a, t, dt.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function (e, t, n, s, r, i, o) {
                const a = t.consts,
                  l = ks(t, e, 2, r, ct(a, i));
                return (
                  js(t, n, l, ct(a, o)),
                  null !== l.attrs && ar(l, l.attrs, !1),
                  null !== l.mergedAttrs && ar(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(o, i, r, 0, t, n, s)
            : i.data[o];
        _t(c, !0);
        const u = c.mergedAttrs;
        null !== u && zt(a, l, u);
        const h = c.classes;
        null !== h && us(a, l, h);
        const d = c.styles;
        null !== d && cs(a, l, d),
          64 != (64 & c.flags) && ns(i, r, l, c),
          0 === dt.lFrame.elementDepthCount && Dn(l, r),
          dt.lFrame.elementDepthCount++,
          Ze(c) &&
            (Ds(i, r, c),
            (function (e, t, n) {
              if (Qe(t)) {
                const s = t.directiveEnd;
                for (let r = t.directiveStart; r < s; r++) {
                  const t = e.data[r];
                  t.contentQueries && t.contentQueries(1, n[r], r);
                }
              }
            })(i, c, r)),
          null !== s && Ns(r, c);
      }
      function Fr() {
        let e = yt();
        vt() ? (dt.lFrame.isParent = !1) : ((e = e.parent), _t(e, !1));
        const t = e;
        dt.lFrame.elementDepthCount--;
        const n = mt();
        n.firstCreatePass && (Rt(n, e), Qe(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function (e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Dr(n, t, ft(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function (e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Dr(n, t, ft(), t.stylesWithoutHost, !1);
      }
      function Mr(e, t, n, s) {
        Nr(e, t, n, s), Fr();
      }
      function Rr(e) {
        return !!e && "function" == typeof e.then;
      }
      function jr(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      const Hr = jr;
      function Vr(e, t, n, s) {
        const r = ft(),
          i = mt(),
          o = yt();
        return (
          (function (e, t, n, s, r, i, o, a) {
            const l = Ze(s),
              c = e.firstCreatePass && rr(e),
              u = sr(t);
            let h = !0;
            if (3 & s.type || a) {
              const d = it(s, t),
                p = a ? a(d) : d,
                f = u.length,
                m = a ? (e) => a(rt(e[s.index])) : s.index;
              if (nt(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (e, t, n, s) {
                      const r = e.cleanup;
                      if (null != r)
                        for (let i = 0; i < r.length - 1; i += 2) {
                          const e = r[i];
                          if (e === n && r[i + 1] === s) {
                            const e = t[7],
                              n = r[i + 2];
                            return e.length > n ? e[n] : null;
                          }
                          "string" == typeof e && (i += 2);
                        }
                      return null;
                    })(e, t, r, s.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = $r(s, t, 0, i, !1);
                  const e = n.listen(p, r, i);
                  u.push(i, e), c && c.push(r, m, f, f + 1);
                }
              } else
                (i = $r(s, t, 0, i, !0)),
                  p.addEventListener(r, i, o),
                  u.push(i),
                  c && c.push(r, m, f, o);
            } else i = $r(s, t, 0, i, !1);
            const d = s.outputs;
            let p;
            if (h && null !== d && (p = d[r])) {
              const e = p.length;
              if (e)
                for (let n = 0; n < e; n += 2) {
                  const e = t[p[n]][p[n + 1]].subscribe(i),
                    o = u.length;
                  u.push(i, e), c && c.push(r, s.index, o, -(o + 1));
                }
            }
          })(i, r, r[11], o, e, t, !!n, s),
          Vr
        );
      }
      function Lr(e, t, n, s) {
        try {
          return !1 !== n(s);
        } catch (r) {
          return ir(e, r), !1;
        }
      }
      function $r(e, t, n, s, r) {
        return function n(i) {
          if (i === Function) return s;
          const o = 2 & e.flags ? at(e.index, t) : t;
          0 == (32 & t[2]) && Ys(o);
          let a = Lr(t, 0, s, i),
            l = n.__ngNextListenerFn__;
          for (; l; ) (a = Lr(t, 0, l, i) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function Br(e, t = "") {
        const n = ft(),
          s = mt(),
          r = e + 20,
          i = s.firstCreatePass ? ks(s, r, 1, t, null) : s.data[r],
          o = (n[r] = (function (e, t) {
            return nt(e) ? e.createText(t) : e.createTextNode(t);
          })(n[11], t));
        ns(s, n, o, i), _t(i, !1);
      }
      function zr(e) {
        return qr("", e, ""), zr;
      }
      function qr(e, t, n) {
        const s = ft(),
          r = (function (e, t, n, s) {
            return Pr(e, Et(), n) ? t + ee(n) + s : ws;
          })(s, e, t, n);
        return (
          r !== ws &&
            (function (e, t, n) {
              const s = (function (e, t) {
                return rt(t[e]);
              })(t, e);
              !(function (e, t, n) {
                nt(e) ? e.setValue(t, n) : (t.textContent = n);
              })(e[11], s, n);
            })(s, Ft(), r),
          qr
        );
      }
      const Kr = void 0;
      var Qr = [
        "en",
        [["a", "p"], ["AM", "PM"], Kr],
        [["AM", "PM"], Kr, Kr],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Kr,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Kr,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Kr, "{1} 'at' {0}", Kr],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (e) {
          let t = Math.floor(Math.abs(e)),
            n = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === n ? 1 : 5;
        },
      ];
      let Ur = {};
      function Zr(e) {
        return (
          e in Ur ||
            (Ur[e] =
              Se.ng &&
              Se.ng.common &&
              Se.ng.common.locales &&
              Se.ng.common.locales[e]),
          Ur[e]
        );
      }
      var Wr = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = "LocaleId"),
          (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (e[(e.DaysFormat = 3)] = "DaysFormat"),
          (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
          (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
          (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
          (e[(e.Eras = 7)] = "Eras"),
          (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (e[(e.WeekendRange = 9)] = "WeekendRange"),
          (e[(e.DateFormat = 10)] = "DateFormat"),
          (e[(e.TimeFormat = 11)] = "TimeFormat"),
          (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
          (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
          (e[(e.NumberFormats = 14)] = "NumberFormats"),
          (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
          (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
          (e[(e.CurrencyName = 17)] = "CurrencyName"),
          (e[(e.Currencies = 18)] = "Currencies"),
          (e[(e.Directionality = 19)] = "Directionality"),
          (e[(e.PluralCase = 20)] = "PluralCase"),
          (e[(e.ExtraData = 21)] = "ExtraData"),
          e
        );
      })({});
      let Gr = "en-US";
      function Jr(e) {
        var t, n;
        (n = "Expected localeId to be defined"),
          null == (t = e) &&
            (function (e, t, n, s) {
              throw new Error(
                `ASSERTION ERROR: ${e} [Expected=> null != ${t} <=Actual]`,
              );
            })(n, t),
          "string" == typeof e && (Gr = e.toLowerCase().replace(/_/g, "-"));
      }
      class Yr {}
      class Xr {
        resolveComponentFactory(e) {
          throw (function (e) {
            const t = Error(
              `No component factory found for ${Z(
                e,
              )}. Did you add it to @NgModule.entryComponents?`,
            );
            return (t.ngComponent = e), t;
          })(e);
        }
      }
      let ei = (() => {
        class e {}
        return (e.NULL = new Xr()), e;
      })();
      function ti(...e) {}
      function ni(e, t) {
        return new ri(it(e, t));
      }
      const si = function () {
        return ni(yt(), ft());
      };
      let ri = (() => {
        class e {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (e.__NG_ELEMENT_ID__ = si), e;
      })();
      class ii {}
      let oi = (() => {
        class e {}
        return (
          (e.ɵprov = se({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class ai {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const li = new ai("12.0.5");
      class ci {
        constructor() {}
        supports(e) {
          return xr(e);
        }
        create(e) {
          return new hi(e);
        }
      }
      const ui = (e, t) => t;
      class hi {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || ui);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            n = this._removalsHead,
            s = 0,
            r = null;
          for (; t || n; ) {
            const i = !n || (t && t.currentIndex < mi(n, s, r)) ? t : n,
              o = mi(i, s, r),
              a = i.currentIndex;
            if (i === n) s--, (n = n._nextRemoved);
            else if (((t = t._next), null == i.previousIndex)) s++;
            else {
              r || (r = []);
              const e = o - s,
                t = a - s;
              if (e != t) {
                for (let n = 0; n < e; n++) {
                  const s = n < r.length ? r[n] : (r[n] = 0),
                    i = s + n;
                  t <= i && i < e && (r[n] = s + 1);
                }
                r[i.previousIndex] = t - e;
              }
            }
            o !== a && e(i, o, a);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !xr(e)))
            throw new Error(
              `Error trying to diff '${Z(
                e,
              )}'. Only arrays and iterables are allowed`,
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t,
            n,
            s,
            r = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let t = 0; t < this.length; t++)
              (n = e[t]),
                (s = this._trackByFn(t, n)),
                null !== r && Object.is(r.trackById, s)
                  ? (i && (r = this._verifyReinsertion(r, n, s, t)),
                    Object.is(r.item, n) || this._addIdentityChange(r, n))
                  : ((r = this._mismatch(r, n, s, t)), (i = !0)),
                (r = r._next);
          } else
            (t = 0),
              (function (e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Cr()]();
                  let s;
                  for (; !(s = n.next()).done; ) t(s.value);
                }
              })(e, (e) => {
                (s = this._trackByFn(t, e)),
                  null !== r && Object.is(r.trackById, s)
                    ? (i && (r = this._verifyReinsertion(r, e, s, t)),
                      Object.is(r.item, e) || this._addIdentityChange(r, e))
                    : ((r = this._mismatch(r, e, s, t)), (i = !0)),
                  (r = r._next),
                  t++;
              }),
              (this.length = t);
          return this._truncate(r), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, n, s) {
          let r;
          return (
            null === e ? (r = this._itTail) : ((r = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(n, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, r, s))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, s))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, r, s))
              : (e = this._addAfter(new di(t, n), r, s)),
            e
          );
        }
        _verifyReinsertion(e, t, n, s) {
          let r =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== r
              ? (e = this._reinsertAfter(r, e._prev, s))
              : e.currentIndex != s &&
                ((e.currentIndex = s), this._addToMoves(e, s)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const s = e._prevRemoved,
            r = e._nextRemoved;
          return (
            null === s ? (this._removalsHead = r) : (s._nextRemoved = r),
            null === r ? (this._removalsTail = s) : (r._prevRemoved = s),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _moveAfter(e, t, n) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _addAfter(e, t, n) {
          return (
            this._insertAfter(e, t, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, n) {
          const s = null === t ? this._itHead : t._next;
          return (
            (e._next = s),
            (e._prev = t),
            null === s ? (this._itTail = e) : (s._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new fi()),
            this._linkedRecords.put(e),
            (e.currentIndex = n),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            n = e._next;
          return (
            null === t ? (this._itHead = n) : (t._next = n),
            null === n ? (this._itTail = t) : (n._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new fi()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class di {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class pi {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === t || t <= n.currentIndex) &&
              Object.is(n.trackById, e)
            )
              return n;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            n = e._nextDup;
          return (
            null === t ? (this._head = n) : (t._nextDup = n),
            null === n ? (this._tail = t) : (n._prevDup = t),
            null === this._head
          );
        }
      }
      class fi {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let n = this.map.get(t);
          n || ((n = new pi()), this.map.set(t, n)), n.add(e);
        }
        get(e, t) {
          const n = this.map.get(e);
          return n ? n.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function mi(e, t, n) {
        const s = e.previousIndex;
        if (null === s) return s;
        let r = 0;
        return n && s < n.length && (r = n[s]), s + t + r;
      }
      class yi {
        constructor() {}
        supports(e) {
          return e instanceof Map || Ar(e);
        }
        create() {
          return new gi();
        }
      }
      class gi {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Ar(e)))
              throw new Error(
                `Error trying to diff '${Z(
                  e,
                )}'. Only maps and objects are allowed`,
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (e, n) => {
              if (t && t.key === n)
                this._maybeAddToChanges(t, e),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(n, e);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let e = t; null !== e; e = e._nextRemoved)
              e === this._mapHead && (this._mapHead = null),
                this._records.delete(e.key),
                (e._nextRemoved = e._next),
                (e.previousValue = e.currentValue),
                (e.currentValue = null),
                (e._prev = null),
                (e._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const n = e._prev;
            return (
              (t._next = e),
              (t._prev = n),
              (e._prev = t),
              n && (n._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const n = this._records.get(e);
            this._maybeAddToChanges(n, t);
            const s = n._prev,
              r = n._next;
            return (
              s && (s._next = r),
              r && (r._prev = s),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new _i(e);
          return (
            this._records.set(e, n),
            (n.currentValue = t),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((n) => t(e[n], n));
        }
      }
      class _i {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function vi() {
        return new bi([new ci()]);
      }
      let bi = (() => {
        class e {
          constructor(e) {
            this.factories = e;
          }
          static create(t, n) {
            if (null != n) {
              const e = n.factories.slice();
              t = t.concat(e);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (n) => e.create(t, n || vi()),
              deps: [[e, new In(), new On()]],
            };
          }
          find(e) {
            const t = this.factories.find((t) => t.supports(e));
            if (null != t) return t;
            throw new Error(
              `Cannot find a differ supporting object '${e}' of type '${
                ((n = e), n.name || typeof n)
              }'`,
            );
            var n;
          }
        }
        return (e.ɵprov = se({ token: e, providedIn: "root", factory: vi })), e;
      })();
      function wi() {
        return new Ei([new yi()]);
      }
      let Ei = (() => {
        class e {
          constructor(e) {
            this.factories = e;
          }
          static create(t, n) {
            if (n) {
              const e = n.factories.slice();
              t = t.concat(e);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (n) => e.create(t, n || wi()),
              deps: [[e, new In(), new On()]],
            };
          }
          find(e) {
            const t = this.factories.find((t) => t.supports(e));
            if (t) return t;
            throw new Error(`Cannot find a differ supporting object '${e}'`);
          }
        }
        return (e.ɵprov = se({ token: e, providedIn: "root", factory: wi })), e;
      })();
      function Si(e, t, n, s, r = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && s.push(rt(i)), Ke(i)))
            for (let e = 10; e < i.length; e++) {
              const t = i[e],
                n = t[1].firstChild;
              null !== n && Si(t[1], t, n, s);
            }
          const o = n.type;
          if (8 & o) Si(e, t, n.child, s);
          else if (32 & o) {
            const e = $n(n, t);
            let r;
            for (; (r = e()); ) s.push(r);
          } else if (16 & o) {
            const e = rs(t, n);
            if (Array.isArray(e)) s.push(...e);
            else {
              const n = Bn(t[16]);
              Si(n[1], n, e, s, !0);
            }
          }
          n = r ? n.projectionNext : n.next;
        }
        return s;
      }
      class Ti {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return Si(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (Ke(e)) {
              const t = e[8],
                n = t ? t.indexOf(this) : -1;
              n > -1 && (Wn(e, n), vn(t, n));
            }
            this._attachedToViewContainer = !1;
          }
          Gn(this._lView[1], this._lView);
        }
        onDestroy(e) {
          !(function (e, t, n, s) {
            const r = sr(t);
            r.push(s);
          })(0, this._lView, 0, e);
        }
        markForCheck() {
          Ys(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Xs(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (e, t, n) {
            wt(!0);
            try {
              Xs(e, t, n);
            } finally {
              wt(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!",
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var e;
          (this._appRef = null),
            as(this._lView[1], (e = this._lView), e[11], 2, null, null);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!",
            );
          this._appRef = e;
        }
      }
      class Ci extends Ti {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          er(this._view);
        }
        checkNoChanges() {
          !(function (e) {
            wt(!0);
            try {
              er(e);
            } finally {
              wt(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const ki = function (e) {
        return (function (e, t, n) {
          if (Ue(e) && !n) {
            const n = at(e.index, t);
            return new Ti(n, n);
          }
          return 47 & e.type ? new Ti(t[16], t) : null;
        })(yt(), ft(), 16 == (16 & e));
      };
      let xi = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ki), e;
      })();
      const Ai = [new yi()],
        Pi = new bi([new ci()]),
        Oi = new Ei(Ai),
        Ii = function () {
          return (
            (e = yt()), (t = ft()), 4 & e.type ? new Fi(t, e, ni(e, t)) : null
          );
          var e, t;
        };
      let Di = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = Ii), e;
      })();
      const Ni = Di,
        Fi = class extends Ni {
          constructor(e, t, n) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = n);
          }
          createEmbeddedView(e) {
            const t = this._declarationTContainer.tViews,
              n = Cs(
                this._declarationLView,
                t,
                e,
                16,
                null,
                t.declTNode,
                null,
                null,
                null,
                null,
              );
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (n[19] = s.createEmbeddedView(t)),
              As(t, n, e),
              new Ti(n)
            );
          }
        };
      class Mi {}
      const Ri = function () {
        return (function (e, t) {
          let n;
          const s = t[e.index];
          if (Ke(s)) n = s;
          else {
            let r;
            if (8 & e.type) r = rt(s);
            else {
              const n = t[11];
              r = n.createComment("");
              const s = it(e, t);
              Yn(
                n,
                ts(n, s),
                r,
                (function (e, t) {
                  return nt(e) ? e.nextSibling(t) : t.nextSibling;
                })(n, s),
                !1,
              );
            }
            (t[e.index] = n = Us(s, t, r, e)), Js(t, n);
          }
          return new Vi(n, e, t);
        })(yt(), ft());
      };
      let ji = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = Ri), e;
      })();
      const Hi = ji,
        Vi = class extends Hi {
          constructor(e, t, n) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = n);
          }
          get element() {
            return ni(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new fn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = nn(this._hostTNode, this._hostLView);
            if (Ut(e)) {
              const t = Wt(e, this._hostLView),
                n = Zt(e);
              return new fn(t[1].data[n + 8], t);
            }
            return new fn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const t = Li(this._lContainer);
            return (null !== t && t[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, t, n) {
            const s = e.createEmbeddedView(t || {});
            return this.insert(s, n), s;
          }
          createComponent(e, t, n, s, r) {
            const i = n || this.parentInjector;
            if (!r && null == e.ngModule && i) {
              const e = i.get(Mi, null);
              e && (r = e);
            }
            const o = e.create(i, s, void 0, r);
            return this.insert(o.hostView, t), o;
          }
          insert(e, t) {
            const n = e._lView,
              s = n[1];
            if (Ke(n[3])) {
              const t = this.indexOf(e);
              if (-1 !== t) this.detach(t);
              else {
                const t = n[3],
                  s = new Vi(t, t[6], t[3]);
                s.detach(s.indexOf(e));
              }
            }
            const r = this._adjustIndex(t),
              i = this._lContainer;
            !(function (e, t, n, s) {
              const r = 10 + s,
                i = n.length;
              s > 0 && (n[r - 1][4] = t),
                s < i - 10
                  ? ((t[4] = n[r]), _n(n, 10 + s, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const o = t[17];
              null !== o &&
                n !== o &&
                (function (e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(o, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(s, n, i, r);
            const o = is(r, i),
              a = n[11],
              l = ts(a, i[7]);
            return (
              null !== l &&
                (function (e, t, n, s, r, i) {
                  (s[0] = r), (s[6] = t), as(e, s, n, 1, r, i);
                })(s, i[6], a, n, l, o),
              e.attachToViewContainerRef(),
              _n($i(i), r, e),
              e
            );
          }
          move(e, t) {
            return this.insert(e, t);
          }
          indexOf(e) {
            const t = Li(this._lContainer);
            return null !== t ? t.indexOf(e) : -1;
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              n = Wn(this._lContainer, t);
            n && (vn($i(this._lContainer), t), Gn(n[1], n));
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              n = Wn(this._lContainer, t);
            return n && null != vn($i(this._lContainer), t) ? new Ti(n) : null;
          }
          _adjustIndex(e, t = 0) {
            return null == e ? this.length + t : e;
          }
        };
      function Li(e) {
        return e[8];
      }
      function $i(e) {
        return e[8] || (e[8] = []);
      }
      const Bi = {};
      class zi extends ei {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = Be(e);
          return new Qi(t, this.ngModule);
        }
      }
      function qi(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const Ki = new yn("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Hn,
      });
      class Qi extends Yr {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = e.selectors.map(bs).join(",")),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return qi(this.componentDef.inputs);
        }
        get outputs() {
          return qi(this.componentDef.outputs);
        }
        create(e, t, n, s) {
          const r = (s = s || this.ngModule)
              ? (function (e, t) {
                  return {
                    get: (n, s, r) => {
                      const i = e.get(n, Bi, r);
                      return i !== Bi || s === Bi ? i : t.get(n, s, r);
                    },
                  };
                })(e, s.injector)
              : e,
            i = r.get(ii, st),
            o = r.get(oi, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (e, t, n) {
                  if (nt(e)) return e.selectRootElement(t, n === _e.ShadowDom);
                  let s = "string" == typeof t ? e.querySelector(t) : t;
                  return (s.textContent = ""), s;
                })(a, n, this.componentDef.encapsulation)
              : Un(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function (e) {
                    const t = e.toLowerCase();
                    return "svg" === t
                      ? "http://www.w3.org/2000/svg"
                      : "math" === t
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l),
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: Hn,
              clean: nr,
              playerHandler: null,
              flags: 0,
            },
            d = Ms(0, null, null, 1, 0, null, null, null, null, null),
            p = Cs(null, d, h, u, null, null, i, a, o, r);
          let f, m;
          At(p);
          try {
            const e = (function (e, t, n, s, r, i) {
              const o = n[1];
              n[20] = e;
              const a = ks(o, 20, 2, "#host", null),
                l = (a.mergedAttrs = t.hostAttrs);
              null !== l &&
                (ar(a, l, !0),
                null !== e &&
                  (zt(r, e, l),
                  null !== a.classes && us(r, e, a.classes),
                  null !== a.styles && cs(r, e, a.styles)));
              const c = s.createRenderer(e, t),
                u = Cs(
                  n,
                  Fs(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  a,
                  s,
                  c,
                  null,
                  null,
                );
              return (
                o.firstCreatePass &&
                  (sn(Xt(a, n), o, t.type), Ls(o, a), Bs(a, n.length, 1)),
                Js(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, p, i, a);
            if (c)
              if (n) zt(a, c, ["ng-version", li.full]);
              else {
                const { attrs: e, classes: t } = (function (e) {
                  const t = [],
                    n = [];
                  let s = 1,
                    r = 2;
                  for (; s < e.length; ) {
                    let i = e[s];
                    if ("string" == typeof i)
                      2 === r
                        ? "" !== i && t.push(i, e[++s])
                        : 8 === r && n.push(i);
                    else {
                      if (!ys(r)) break;
                      r = i;
                    }
                    s++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                e && zt(a, c, e), t && t.length > 0 && us(a, c, t.join(" "));
              }
            if (((m = ot(d, 20)), void 0 !== t)) {
              const e = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const s = t[n];
                e.push(null != s ? Array.from(s) : null);
              }
            }
            (f = (function (e, t, n, s, r) {
              const i = n[1],
                o = (function (e, t, n) {
                  const s = yt();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    zs(e, s, t, xs(e, t, 1, null), n));
                  const r = hn(t, e, s.directiveStart, s);
                  Dn(r, t);
                  const i = it(s, t);
                  return i && Dn(i, t), r;
                })(i, n, t);
              if (
                (s.components.push(o),
                (e[8] = o),
                r && r.forEach((e) => e(o, t)),
                t.contentQueries)
              ) {
                const e = yt();
                t.contentQueries(1, o, e.directiveStart);
              }
              const a = yt();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Mt(a.index),
                  Hs(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Vs(t, o)),
                o
              );
            })(e, this.componentDef, p, h, [Sr])),
              As(d, p, null);
          } finally {
            Nt();
          }
          return new Ui(this.componentType, f, ni(m, p), p, m);
        }
      }
      class Ui extends class {} {
        constructor(e, t, n, s, r) {
          super(),
            (this.location = n),
            (this._rootLView = s),
            (this._tNode = r),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new Ci(s)),
            (this.componentType = e);
        }
        get injector() {
          return new fn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      const Zi = new Map();
      class Wi extends Mi {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new zi(this));
          const n = ze(e),
            s = e[Oe] || null;
          s && Jr(s),
            (this._bootstrapComponents = Vn(n.bootstrap)),
            (this._r3Injector = mr(
              e,
              t,
              [
                { provide: Mi, useValue: this },
                { provide: ei, useValue: this.componentFactoryResolver },
              ],
              Z(e),
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, t = Er.THROW_IF_NOT_FOUND, n = de.Default) {
          return e === Er || e === Mi || e === lr
            ? this
            : this._r3Injector.get(e, t, n);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((e) => e()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Gi extends class {} {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== ze(e) &&
              (function (e) {
                const t = new Set();
                !(function e(n) {
                  const s = ze(n, !0),
                    r = s.id;
                  null !== r &&
                    ((function (e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${Z(
                            t,
                          )} vs ${Z(t.name)}`,
                        );
                    })(r, Zi.get(r), n),
                    Zi.set(r, n));
                  const i = Vn(s.imports);
                  for (const o of i) t.has(o) || (t.add(o), e(o));
                })(e);
              })(e);
        }
        create(e) {
          return new Wi(this.moduleType, e);
        }
      }
      function Ji(e, t, n) {
        const s = e + 20,
          r = ft(),
          i = (function (e, t) {
            return e[t];
          })(r, s);
        return (function (e, t) {
          return (
            kr.isWrapped(t) &&
              ((t = kr.unwrap(t)), (e[dt.lFrame.bindingIndex] = ws)),
            t
          );
        })(
          r,
          (function (e, t) {
            return e[1].data[t].pure;
          })(r, s)
            ? (function (e, t, n, s, r, i) {
                const o = t + n;
                return Pr(e, o, r)
                  ? (function (e, t, n) {
                      return (e[t] = n);
                    })(e, o + 1, i ? s.call(i, r) : s(r))
                  : (function (e, t) {
                      const n = e[t];
                      return n === ws ? void 0 : n;
                    })(e, o + 1);
              })(
                r,
                (function () {
                  const e = dt.lFrame;
                  let t = e.bindingRootIndex;
                  return (
                    -1 === t &&
                      (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                    t
                  );
                })(),
                t,
                i.transform,
                n,
                i,
              )
            : i.transform(n),
        );
      }
      function Yi(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Xi = class extends S {
          constructor(e = !1) {
            super(), (this.__isAsync = e);
          }
          emit(e) {
            super.next(e);
          }
          subscribe(e, t, n) {
            var s, r, i;
            let o = e,
              a = t || (() => null),
              l = n;
            if (e && "object" == typeof e) {
              const t = e;
              (o = null === (s = t.next) || void 0 === s ? void 0 : s.bind(t)),
                (a =
                  null === (r = t.error) || void 0 === r ? void 0 : r.bind(t)),
                (l =
                  null === (i = t.complete) || void 0 === i
                    ? void 0
                    : i.bind(t));
            }
            this.__isAsync && ((a = Yi(a)), o && (o = Yi(o)), l && (l = Yi(l)));
            const c = super.subscribe({ next: o, error: a, complete: l });
            return e instanceof h && e.add(c), c;
          }
        },
        eo = new yn("Application Initializer");
      let to = (() => {
        class e {
          constructor(e) {
            (this.appInits = e),
              (this.resolve = ti),
              (this.reject = ti),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((e, t) => {
                (this.resolve = e), (this.reject = t);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              t = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const t = this.appInits[n]();
                if (Rr(t)) e.push(t);
                else if (Hr(t)) {
                  const n = new Promise((e, n) => {
                    t.subscribe({ complete: e, error: n });
                  });
                  e.push(n);
                }
              }
            Promise.all(e)
              .then(() => {
                t();
              })
              .catch((e) => {
                this.reject(e);
              }),
              0 === e.length && t(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(eo, 8));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const no = new yn("AppId"),
        so = {
          provide: no,
          useFactory: function () {
            return `${ro()}${ro()}${ro()}`;
          },
          deps: [],
        };
      function ro() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const io = new yn("Platform Initializer"),
        oo = new yn("Platform ID"),
        ao = new yn("appBootstrapListener");
      let lo = (() => {
        class e {
          log(e) {
            console.log(e);
          }
          warn(e) {
            console.warn(e);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const co = new yn("LocaleId"),
        uo = new yn("DefaultCurrencyCode");
      class ho {
        constructor(e, t) {
          (this.ngModuleFactory = e), (this.componentFactories = t);
        }
      }
      const po = function (e) {
          return new Gi(e);
        },
        fo = po,
        mo = function (e) {
          return Promise.resolve(po(e));
        },
        yo = function (e) {
          const t = po(e),
            n = Vn(ze(e).declarations).reduce((e, t) => {
              const n = Be(t);
              return n && e.push(new Qi(n)), e;
            }, []);
          return new ho(t, n);
        },
        go = yo,
        _o = function (e) {
          return Promise.resolve(yo(e));
        };
      let vo = (() => {
        class e {
          constructor() {
            (this.compileModuleSync = fo),
              (this.compileModuleAsync = mo),
              (this.compileModuleAndAllComponentsSync = go),
              (this.compileModuleAndAllComponentsAsync = _o);
          }
          clearCache() {}
          clearCacheFor(e) {}
          getModuleId(e) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bo = (() => Promise.resolve(0))();
      function wo(e) {
        "undefined" == typeof Zone
          ? bo.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Eo {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Xi(!1)),
            (this.onMicrotaskEmpty = new Xi(!1)),
            (this.onStable = new Xi(!1)),
            (this.onError = new Xi(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = !n && t),
            (this.shouldCoalesceRunChangeDetection = n),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let e = Se.requestAnimationFrame,
                t = Se.cancelAnimationFrame;
              if ("undefined" != typeof Zone && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const s = t[Zone.__symbol__("OriginalDelegate")];
                s && (t = s);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function (e) {
              const t = () => {
                !(function (e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Se, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Co(e),
                                (e.isCheckStableRunning = !0),
                                To(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {},
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Co(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, s, r, i, o, a) => {
                  try {
                    return ko(e), n.invokeTask(r, i, o, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      xo(e);
                  }
                },
                onInvoke: (n, s, r, i, o, a, l) => {
                  try {
                    return ko(e), n.invoke(r, i, o, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), xo(e);
                  }
                },
                onHasTask: (t, n, s, r) => {
                  t.hasTask(s, r),
                    n === s &&
                      ("microTask" == r.change
                        ? ((e._hasPendingMicrotasks = r.microTask),
                          Co(e),
                          To(e))
                        : "macroTask" == r.change &&
                          (e.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (t, n, s, r) => (
                  t.handleError(s, r),
                  e.runOutsideAngular(() => e.onError.emit(r)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Eo.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Eo.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, n) {
          return this._inner.run(e, t, n);
        }
        runTask(e, t, n, s) {
          const r = this._inner,
            i = r.scheduleEventTask("NgZoneEvent: " + s, e, So, ti, ti);
          try {
            return r.runTask(i, t, n);
          } finally {
            r.cancelTask(i);
          }
        }
        runGuarded(e, t, n) {
          return this._inner.runGuarded(e, t, n);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const So = {};
      function To(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Co(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ko(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function xo(e) {
        e._nesting--, To(e);
      }
      class Ao {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Xi()),
            (this.onMicrotaskEmpty = new Xi()),
            (this.onStable = new Xi()),
            (this.onError = new Xi());
        }
        run(e, t, n) {
          return e.apply(t, n);
        }
        runGuarded(e, t, n) {
          return e.apply(t, n);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, n, s) {
          return e.apply(t, n);
        }
      }
      let Po = (() => {
          class e {
            constructor(e) {
              (this._ngZone = e),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Eo.assertNotInAngularZone(),
                        wo(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                wo(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (t) =>
                    !t.updateCb ||
                    !t.updateCb(e) ||
                    (clearTimeout(t.timeoutId), !1),
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((e) => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data,
                  }))
                : [];
            }
            addCallback(e, t, n) {
              let s = -1;
              t &&
                t > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (e) => e.timeoutId !== s,
                  )),
                    e(this._didWork, this.getPendingTasks());
                }, t)),
                this._callbacks.push({ doneCb: e, timeoutId: s, updateCb: n });
            }
            whenStable(e, t, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?',
                );
              this.addCallback(e, t, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(e, t, n) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn(Eo));
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Oo = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), No.addToWindow(this);
            }
            registerApplication(e, t) {
              this._applications.set(e, t);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, t = !0) {
              return No.findTestabilityInTree(this, e, t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class Io {
        addToWindow(e) {}
        findTestabilityInTree(e, t, n) {
          return null;
        }
      }
      let Do,
        No = new Io(),
        Fo = !0,
        Mo = !1;
      const Ro = new yn("AllowMultipleToken");
      function jo(e, t, n = []) {
        const s = `Platform: ${t}`,
          r = new yn(s);
        return (t = []) => {
          let i = Ho();
          if (!i || i.injector.get(Ro, !1))
            if (e) e(n.concat(t).concat({ provide: r, useValue: !0 }));
            else {
              const e = n
                .concat(t)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: ur, useValue: "platform" },
                );
              !(function (e) {
                if (Do && !Do.destroyed && !Do.injector.get(Ro, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one.",
                  );
                Do = e.get(Vo);
                const t = e.get(io, null);
                t && t.forEach((e) => e());
              })(Er.create({ providers: e, name: s }));
            }
          return (function (e) {
            const t = Ho();
            if (!t) throw new Error("No platform exists!");
            if (!t.injector.get(e, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first.",
              );
            return t;
          })(r);
        };
      }
      function Ho() {
        return Do && !Do.destroyed ? Do : null;
      }
      let Vo = (() => {
        class e {
          constructor(e) {
            (this._injector = e),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, t) {
            const n = (function (e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new Ao()
                      : ("zone.js" === e ? void 0 : e) ||
                        new Eo({
                          enableLongStackTrace: ((Mo = !0), Fo),
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(t ? t.ngZone : void 0, {
                ngZoneEventCoalescing: (t && t.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (t && t.ngZoneRunCoalescing) || !1,
              }),
              s = [{ provide: Eo, useValue: n }];
            return n.run(() => {
              const t = Er.create({
                  providers: s,
                  parent: this.injector,
                  name: e.moduleType.name,
                }),
                r = e.create(t),
                i = r.injector.get(jn, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?",
                );
              return (
                n.runOutsideAngular(() => {
                  const e = n.onError.subscribe({
                    next: (e) => {
                      i.handleError(e);
                    },
                  });
                  r.onDestroy(() => {
                    Bo(this._modules, r), e.unsubscribe();
                  });
                }),
                (function (e, t, n) {
                  try {
                    const s = n();
                    return Rr(s)
                      ? s.catch((n) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(n)), n)
                          );
                        })
                      : s;
                  } catch (s) {
                    throw (t.runOutsideAngular(() => e.handleError(s)), s);
                  }
                })(i, n, () => {
                  const e = r.injector.get(to);
                  return (
                    e.runInitializers(),
                    e.donePromise.then(
                      () => (
                        Jr(r.injector.get(co, "en-US") || "en-US"),
                        this._moduleDoBootstrap(r),
                        r
                      ),
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, t = []) {
            const n = Lo({}, t);
            return (function (e, t, n) {
              const s = new Gi(n);
              return Promise.resolve(s);
            })(0, 0, e).then((e) => this.bootstrapModuleFactory(e, n));
          }
          _moduleDoBootstrap(e) {
            const t = e.injector.get($o);
            if (e._bootstrapComponents.length > 0)
              e._bootstrapComponents.forEach((e) => t.bootstrap(e));
            else {
              if (!e.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${Z(
                    e.instance.constructor,
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`,
                );
              e.instance.ngDoBootstrap(t);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((e) => e.destroy()),
              this._destroyListeners.forEach((e) => e()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(Er));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Lo(e, t) {
        return Array.isArray(t)
          ? t.reduce(Lo, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let $o = (() => {
        class e {
          constructor(e, t, n, s, r) {
            (this._zone = e),
              (this._injector = t),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = s),
              (this._initStatus = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new _((e) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    e.next(this._stable), e.complete();
                  });
              }),
              o = new _((e) => {
                let t;
                this._zone.runOutsideAngular(() => {
                  t = this._zone.onStable.subscribe(() => {
                    Eo.assertNotInAngularZone(),
                      wo(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), e.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Eo.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        e.next(!1);
                      }));
                });
                return () => {
                  t.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...e) {
              let t = Number.POSITIVE_INFINITY,
                n = null,
                s = e[e.length - 1];
              return (
                C(s)
                  ? ((n = e.pop()),
                    e.length > 1 &&
                      "number" == typeof e[e.length - 1] &&
                      (t = e.pop()))
                  : "number" == typeof s && (t = e.pop()),
                null === n && 1 === e.length && e[0] instanceof _
                  ? e[0]
                  : (function (e = Number.POSITIVE_INFINITY) {
                      return R(g, e);
                    })(t)(V(e, n))
              );
            })(
              i,
              o.pipe((e) => {
                return L()(
                  ((t = Q),
                  function (e) {
                    let n;
                    n =
                      "function" == typeof t
                        ? t
                        : function () {
                            return t;
                          };
                    const s = Object.create(e, q);
                    return (s.source = e), (s.subjectFactory = n), s;
                  })(e),
                );
                var t;
              }),
            );
          }
          bootstrap(e, t) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.",
              );
            let n;
            (n =
              e instanceof Yr
                ? e
                : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(n.componentType);
            const s = n.isBoundToModule ? void 0 : this._injector.get(Mi),
              r = n.create(Er.NULL, [], t || n.selector, s),
              i = r.location.nativeElement,
              o = r.injector.get(Po, null),
              a = o && r.injector.get(Oo);
            return (
              o && a && a.registerApplication(i, o),
              r.onDestroy(() => {
                this.detachView(r.hostView),
                  Bo(this.components, r),
                  a && a.unregisterApplication(i);
              }),
              this._loadComponent(r),
              r
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(e),
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const t = e;
            this._views.push(t), t.attachToAppRef(this);
          }
          detachView(e) {
            const t = e;
            Bo(this._views, t), t.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(ao, [])
                .concat(this._bootstrapListeners)
                .forEach((t) => t(e));
          }
          ngOnDestroy() {
            this._views.slice().forEach((e) => e.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(Eo), kn(Er), kn(jn), kn(ei), kn(to));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Bo(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const zo = jo(null, "core", [
          { provide: oo, useValue: "unknown" },
          { provide: Vo, deps: [Er] },
          { provide: Oo, deps: [] },
          { provide: lo, deps: [] },
        ]),
        qo = [
          { provide: $o, useClass: $o, deps: [Eo, Er, jn, ei, to] },
          {
            provide: Ki,
            deps: [Eo],
            useFactory: function (e) {
              let t = [];
              return (
                e.onStable.subscribe(() => {
                  for (; t.length; ) t.pop()();
                }),
                function (e) {
                  t.push(e);
                }
              );
            },
          },
          { provide: to, useClass: to, deps: [[new On(), eo]] },
          { provide: vo, useClass: vo, deps: [] },
          so,
          {
            provide: bi,
            useFactory: function () {
              return Pi;
            },
            deps: [],
          },
          {
            provide: Ei,
            useFactory: function () {
              return Oi;
            },
            deps: [],
          },
          {
            provide: co,
            useFactory: function (e) {
              return (
                Jr(
                  (e =
                    e ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US"),
                ),
                e
              );
            },
            deps: [[new Pn(co), new On(), new In()]],
          },
          { provide: uo, useValue: "USD" },
        ];
      let Ko = (() => {
          class e {
            constructor(e) {}
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn($o));
            }),
            (e.ɵmod = He({ type: e })),
            (e.ɵinj = re({ providers: qo })),
            e
          );
        })(),
        Qo = null;
      function Uo() {
        return Qo;
      }
      const Zo = new yn("DocumentToken");
      var Wo = (function (e) {
        return (
          (e[(e.Zero = 0)] = "Zero"),
          (e[(e.One = 1)] = "One"),
          (e[(e.Two = 2)] = "Two"),
          (e[(e.Few = 3)] = "Few"),
          (e[(e.Many = 4)] = "Many"),
          (e[(e.Other = 5)] = "Other"),
          e
        );
      })({});
      class Go {}
      let Jo = (() => {
        class e extends Go {
          constructor(e) {
            super(), (this.locale = e);
          }
          getPluralCategory(e, t) {
            switch (
              (function (e) {
                return (function (e) {
                  const t = (function (e) {
                    return e.toLowerCase().replace(/_/g, "-");
                  })(e);
                  let n = Zr(t);
                  if (n) return n;
                  const s = t.split("-")[0];
                  if (((n = Zr(s)), n)) return n;
                  if ("en" === s) return Qr;
                  throw new Error(`Missing locale data for the locale "${e}".`);
                })(e)[Wr.PluralCase];
              })(t || this.locale)(e)
            ) {
              case Wo.Zero:
                return "zero";
              case Wo.One:
                return "one";
              case Wo.Two:
                return "two";
              case Wo.Few:
                return "few";
              case Wo.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(co));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Yo(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const e = n.indexOf("="),
            [s, r] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
          if (s.trim() === t) return decodeURIComponent(r);
        }
        return null;
      }
      let Xo = (() => {
        class e {
          constructor(e, t) {
            (this._viewContainer = e),
              (this._context = new ea()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = t);
          }
          set ngIf(e) {
            (this._context.$implicit = this._context.ngIf = e),
              this._updateView();
          }
          set ngIfThen(e) {
            ta("ngIfThen", e),
              (this._thenTemplateRef = e),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(e) {
            ta("ngIfElse", e),
              (this._elseTemplateRef = e),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context,
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context,
                  )));
          }
          static ngTemplateContextGuard(e, t) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(Or(ji), Or(Di));
          }),
          (e.ɵdir = Le({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          e
        );
      })();
      class ea {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function ta(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${Z(t)}'.`,
          );
      }
      class na {
        createSubscription(e, t) {
          return e.subscribe({
            next: t,
            error: (e) => {
              throw e;
            },
          });
        }
        dispose(e) {
          e.unsubscribe();
        }
        onDestroy(e) {
          e.unsubscribe();
        }
      }
      class sa {
        createSubscription(e, t) {
          return e.then(t, (e) => {
            throw e;
          });
        }
        dispose(e) {}
        onDestroy(e) {}
      }
      const ra = new sa(),
        ia = new na();
      let oa = (() => {
          class e {
            constructor(e) {
              (this._ref = e),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(e) {
              return this._obj
                ? e !== this._obj
                  ? (this._dispose(), this.transform(e))
                  : this._latestValue
                : (e && this._subscribe(e), this._latestValue);
            }
            _subscribe(e) {
              (this._obj = e),
                (this._strategy = this._selectStrategy(e)),
                (this._subscription = this._strategy.createSubscription(
                  e,
                  (t) => this._updateLatestValue(e, t),
                ));
            }
            _selectStrategy(t) {
              if (Rr(t)) return ra;
              if (jr(t)) return ia;
              throw Error(`InvalidPipeArgument: '${t}' for pipe '${Z(e)}'`);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(e, t) {
              e === this._obj &&
                ((this._latestValue = t), this._ref.markForCheck());
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Or(xi, 16));
            }),
            (e.ɵpipe = $e({ name: "async", type: e, pure: !1 })),
            e
          );
        })(),
        aa = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = He({ type: e })),
            (e.ɵinj = re({ providers: [{ provide: Go, useClass: Jo }] })),
            e
          );
        })();
      class la {}
      class ca extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          var e;
          (e = new ca()), Qo || (Qo = e);
        }
        onAndCancel(e, t, n) {
          return (
            e.addEventListener(t, n, !1),
            () => {
              e.removeEventListener(t, n, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const t =
            ((ha = ha || document.querySelector("base")),
            ha ? ha.getAttribute("href") : null);
          return null == t
            ? null
            : (function (e) {
                (ua = ua || document.createElement("a")),
                  ua.setAttribute("href", e);
                const t = ua.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(t);
        }
        resetBaseElement() {
          ha = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return Yo(document.cookie, e);
        }
      }
      let ua,
        ha = null;
      const da = new yn("TRANSITION_ID"),
        pa = [
          {
            provide: eo,
            useFactory: function (e, t, n) {
              return () => {
                n.get(to).donePromise.then(() => {
                  const n = Uo();
                  Array.prototype.slice
                    .apply(t.querySelectorAll("style[ng-transition]"))
                    .filter((t) => t.getAttribute("ng-transition") === e)
                    .forEach((e) => n.remove(e));
                });
              };
            },
            deps: [da, Zo, Er],
            multi: !0,
          },
        ];
      class fa {
        static init() {
          var e;
          (e = new fa()), (No = e);
        }
        addToWindow(e) {
          (Se.getAngularTestability = (t, n = !0) => {
            const s = e.findTestabilityInTree(t, n);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (Se.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (Se.getAllAngularRootElements = () => e.getAllRootElements()),
            Se.frameworkStabilizers || (Se.frameworkStabilizers = []),
            Se.frameworkStabilizers.push((e) => {
              const t = Se.getAllAngularTestabilities();
              let n = t.length,
                s = !1;
              const r = function (t) {
                (s = s || t), n--, 0 == n && e(s);
              };
              t.forEach(function (e) {
                e.whenStable(r);
              });
            });
        }
        findTestabilityInTree(e, t, n) {
          if (null == t) return null;
          const s = e.getTestability(t);
          return null != s
            ? s
            : n
            ? Uo().isShadowRoot(t)
              ? this.findTestabilityInTree(e, t.host, !0)
              : this.findTestabilityInTree(e, t.parentElement, !0)
            : null;
        }
      }
      let ma = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ya = new yn("EventManagerPlugins");
      let ga = (() => {
        class e {
          constructor(e, t) {
            (this._zone = t),
              (this._eventNameToPlugin = new Map()),
              e.forEach((e) => (e.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, t, n) {
            return this._findPluginFor(t).addEventListener(e, t, n);
          }
          addGlobalEventListener(e, t, n) {
            return this._findPluginFor(t).addGlobalEventListener(e, t, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const t = this._eventNameToPlugin.get(e);
            if (t) return t;
            const n = this._plugins;
            for (let s = 0; s < n.length; s++) {
              const t = n[s];
              if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(ya), kn(Eo));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class _a {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, n) {
          const s = Uo().getGlobalEventTarget(this._doc, e);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${t}`);
          return this.addEventListener(s, t, n);
        }
      }
      let va = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const t = new Set();
              e.forEach((e) => {
                this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
              }),
                this.onStylesAdded(t);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ba = (() => {
          class e extends va {
            constructor(e) {
              super(),
                (this._doc = e),
                (this._hostNodes = new Map()),
                this._hostNodes.set(e.head, []);
            }
            _addStylesToHost(e, t, n) {
              e.forEach((e) => {
                const s = this._doc.createElement("style");
                (s.textContent = e), n.push(t.appendChild(s));
              });
            }
            addHost(e) {
              const t = [];
              this._addStylesToHost(this._stylesSet, e, t),
                this._hostNodes.set(e, t);
            }
            removeHost(e) {
              const t = this._hostNodes.get(e);
              t && t.forEach(wa), this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((t, n) => {
                this._addStylesToHost(e, n, t);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((e) => e.forEach(wa));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn(Zo));
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function wa(e) {
        Uo().remove(e);
      }
      const Ea = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Sa = /%COMP%/g;
      function Ta(e, t, n) {
        for (let s = 0; s < t.length; s++) {
          let r = t[s];
          Array.isArray(r) ? Ta(e, r, n) : ((r = r.replace(Sa, e)), n.push(r));
        }
        return n;
      }
      function Ca(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let ka = (() => {
        class e {
          constructor(e, t, n) {
            (this.eventManager = e),
              (this.sharedStylesHost = t),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new xa(e));
          }
          createRenderer(e, t) {
            if (!e || !t) return this.defaultRenderer;
            switch (t.encapsulation) {
              case _e.Emulated: {
                let n = this.rendererByCompId.get(t.id);
                return (
                  n ||
                    ((n = new Aa(
                      this.eventManager,
                      this.sharedStylesHost,
                      t,
                      this.appId,
                    )),
                    this.rendererByCompId.set(t.id, n)),
                  n.applyToHost(e),
                  n
                );
              }
              case 1:
              case _e.ShadowDom:
                return new Pa(this.eventManager, this.sharedStylesHost, e, t);
              default:
                if (!this.rendererByCompId.has(t.id)) {
                  const e = Ta(t.id, t.styles, []);
                  this.sharedStylesHost.addStyles(e),
                    this.rendererByCompId.set(t.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(ga), kn(ba), kn(no));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class xa {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(Ea[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, n) {
          e && e.insertBefore(t, n);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let n = "string" == typeof e ? document.querySelector(e) : e;
          if (!n)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (n.textContent = ""), n;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, n, s) {
          if (s) {
            t = s + ":" + t;
            const r = Ea[s];
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n);
          } else e.setAttribute(t, n);
        }
        removeAttribute(e, t, n) {
          if (n) {
            const s = Ea[n];
            s ? e.removeAttributeNS(s, t) : e.removeAttribute(`${n}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, n, s) {
          s & (Ln.DashCase | Ln.Important)
            ? e.style.setProperty(t, n, s & Ln.Important ? "important" : "")
            : (e.style[t] = n);
        }
        removeStyle(e, t, n) {
          n & Ln.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, n) {
          e[t] = n;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, n) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, Ca(n))
            : this.eventManager.addEventListener(e, t, Ca(n));
        }
      }
      class Aa extends xa {
        constructor(e, t, n, s) {
          super(e), (this.component = n);
          const r = Ta(s + "-" + n.id, n.styles, []);
          t.addStyles(r),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Sa,
              s + "-" + n.id,
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(Sa, s + "-" + n.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const n = super.createElement(e, t);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Pa extends xa {
        constructor(e, t, n, s) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = Ta(s.id, s.styles, []);
          for (let i = 0; i < r.length; i++) {
            const e = document.createElement("style");
            (e.textContent = r[i]), this.shadowRoot.appendChild(e);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, n) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e)),
          );
        }
      }
      let Oa = (() => {
        class e extends _a {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, t, n) {
            return (
              e.addEventListener(t, n, !1),
              () => this.removeEventListener(e, t, n)
            );
          }
          removeEventListener(e, t, n) {
            return e.removeEventListener(t, n);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(Zo));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ia = ["alt", "control", "meta", "shift"],
        Da = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Na = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Fa = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let Ma = (() => {
        class e extends _a {
          constructor(e) {
            super(e);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, n, s) {
            const r = e.parseEventName(n),
              i = e.eventCallback(r.fullKey, s, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Uo().onAndCancel(t, r.domEventName, i));
          }
          static parseEventName(t) {
            const n = t.toLowerCase().split("."),
              s = n.shift();
            if (0 === n.length || ("keydown" !== s && "keyup" !== s))
              return null;
            const r = e._normalizeKey(n.pop());
            let i = "";
            if (
              (Ia.forEach((e) => {
                const t = n.indexOf(e);
                t > -1 && (n.splice(t, 1), (i += e + "."));
              }),
              (i += r),
              0 != n.length || 0 === r.length)
            )
              return null;
            const o = {};
            return (o.domEventName = s), (o.fullKey = i), o;
          }
          static getEventFullKey(e) {
            let t = "",
              n = (function (e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && Na.hasOwnProperty(t) && (t = Na[t]));
                }
                return Da[t] || t;
              })(e);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              Ia.forEach((s) => {
                s != n && (0, Fa[s])(e) && (t += s + ".");
              }),
              (t += n),
              t
            );
          }
          static eventCallback(t, n, s) {
            return (r) => {
              e.getEventFullKey(r) === t && s.runGuarded(() => n(r));
            };
          }
          static _normalizeKey(e) {
            switch (e) {
              case "esc":
                return "escape";
              default:
                return e;
            }
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(Zo));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ra = jo(zo, "browser", [
          { provide: oo, useValue: "browser" },
          {
            provide: io,
            useValue: function () {
              ca.makeCurrent(), fa.init();
            },
            multi: !0,
          },
          {
            provide: Zo,
            useFactory: function () {
              return (
                (function (e) {
                  tt = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        ja = [
          [],
          { provide: ur, useValue: "root" },
          {
            provide: jn,
            useFactory: function () {
              return new jn();
            },
            deps: [],
          },
          { provide: ya, useClass: Oa, multi: !0, deps: [Zo, Eo, oo] },
          { provide: ya, useClass: Ma, multi: !0, deps: [Zo] },
          [],
          { provide: ka, useClass: ka, deps: [ga, ba, no] },
          { provide: ii, useExisting: ka },
          { provide: va, useExisting: ba },
          { provide: ba, useClass: ba, deps: [Zo] },
          { provide: Po, useClass: Po, deps: [Eo] },
          { provide: ga, useClass: ga, deps: [ya, Eo] },
          { provide: la, useClass: ma, deps: [] },
          [],
        ];
      let Ha = (() => {
        class e {
          constructor(e) {
            if (e)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.",
              );
          }
          static withServerTransition(t) {
            return {
              ngModule: e,
              providers: [
                { provide: no, useValue: t.appId },
                { provide: da, useExisting: no },
                pa,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(e, 12));
          }),
          (e.ɵmod = He({ type: e })),
          (e.ɵinj = re({ providers: ja, imports: [aa, Ko] })),
          e
        );
      })();
      "undefined" != typeof window && window;
      class Va {
        constructor(e, t) {
          (this.predicate = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new La(e, this.predicate, this.thisArg));
        }
      }
      class La extends f {
        constructor(e, t, n) {
          super(e), (this.predicate = t), (this.thisArg = n), (this.count = 0);
        }
        _next(e) {
          let t;
          try {
            t = this.predicate.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          t && this.destination.next(e);
        }
      }
      class $a {}
      class Ba {}
      class za {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((e) => {
                            const t = e.indexOf(":");
                            if (t > 0) {
                              const n = e.slice(0, t),
                                s = n.toLowerCase(),
                                r = e.slice(t + 1).trim();
                              this.maybeSetNormalizedName(n, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(r)
                                  : this.headers.set(s, [r]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((t) => {
                            let n = e[t];
                            const s = t.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(s, n),
                                this.maybeSetNormalizedName(t, s));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof za
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((t) => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new za();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof za
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let n = e.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const s = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              s.push(...n), this.headers.set(t, s);
              break;
            case "d":
              const r = e.value;
              if (r) {
                let e = this.headers.get(t);
                if (!e) return;
                (e = e.filter((e) => -1 === r.indexOf(e))),
                  0 === e.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, e);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              e(this.normalizedNames.get(t), this.headers.get(t)),
            );
        }
      }
      class qa {
        encodeKey(e) {
          return Ka(e);
        }
        encodeValue(e) {
          return Ka(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      function Ka(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      function Qa(e) {
        return `${e}`;
      }
      class Ua {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new qa()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((e) => {
                      const s = e.indexOf("="),
                        [r, i] =
                          -1 == s
                            ? [t.decodeKey(e), ""]
                            : [
                                t.decodeKey(e.slice(0, s)),
                                t.decodeValue(e.slice(s + 1)),
                              ],
                        o = n.get(r) || [];
                      o.push(i), n.set(r, o);
                    }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((t) => {
                  const n = e.fromObject[t];
                  this.map.set(t, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        appendAll(e) {
          const t = [];
          return (
            Object.keys(e).forEach((n) => {
              const s = e[n];
              Array.isArray(s)
                ? s.forEach((e) => {
                    t.push({ param: n, value: e, op: "a" });
                  })
                : t.push({ param: n, value: s, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((e) => t + "=" + this.encoder.encodeValue(e))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const t = new Ua({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(e)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(Qa(e.value)), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let t = this.map.get(e.param) || [];
                      const n = t.indexOf(Qa(e.value));
                      -1 !== n && t.splice(n, 1),
                        t.length > 0
                          ? this.map.set(e.param, t)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Za {
        constructor() {
          this.map = new Map();
        }
        set(e, t) {
          return this.map.set(e, t), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function Wa(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function Ga(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function Ja(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class Ya {
        constructor(e, t, n, s) {
          let r;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function (e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || s
              ? ((this.body = void 0 !== n ? n : null), (r = s))
              : (r = n),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.context && (this.context = r.context),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new za()),
            this.context || (this.context = new Za()),
            this.params)
          ) {
            const e = this.params.toString();
            if (0 === e.length) this.urlWithParams = t;
            else {
              const n = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === n ? "?" : n < t.length - 1 ? "&" : "") + e;
            }
          } else (this.params = new Ua()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Wa(this.body) ||
              Ga(this.body) ||
              Ja(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Ua
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Ja(this.body)
            ? null
            : Ga(this.body)
            ? this.body.type || null
            : Wa(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Ua
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          var t;
          const n = e.method || this.method,
            s = e.url || this.url,
            r = e.responseType || this.responseType,
            i = void 0 !== e.body ? e.body : this.body,
            o =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            a =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let l = e.headers || this.headers,
            c = e.params || this.params;
          const u = null !== (t = e.context) && void 0 !== t ? t : this.context;
          return (
            void 0 !== e.setHeaders &&
              (l = Object.keys(e.setHeaders).reduce(
                (t, n) => t.set(n, e.setHeaders[n]),
                l,
              )),
            e.setParams &&
              (c = Object.keys(e.setParams).reduce(
                (t, n) => t.set(n, e.setParams[n]),
                c,
              )),
            new Ya(n, s, i, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: o,
            })
          );
        }
      }
      var Xa = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })({});
      class el {
        constructor(e, t = 200, n = "OK") {
          (this.headers = e.headers || new za()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || n),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class tl extends el {
        constructor(e = {}) {
          super(e), (this.type = Xa.ResponseHeader);
        }
        clone(e = {}) {
          return new tl({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class nl extends el {
        constructor(e = {}) {
          super(e),
            (this.type = Xa.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new nl({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class sl extends el {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function rl(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let il = (() => {
        class e {
          constructor(e) {
            this.handler = e;
          }
          request(e, t, n = {}) {
            let s;
            if (e instanceof Ya) s = e;
            else {
              let r, i;
              (r = n.headers instanceof za ? n.headers : new za(n.headers)),
                n.params &&
                  (i =
                    n.params instanceof Ua
                      ? n.params
                      : new Ua({ fromObject: n.params })),
                (s = new Ya(e, t, void 0 !== n.body ? n.body : null, {
                  headers: r,
                  context: n.context,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const r = (function (...e) {
              let t = e[e.length - 1];
              return C(t) ? (e.pop(), N(e, t)) : V(e);
            })(s).pipe(R((e) => this.handler.handle(e), void 0, 1));
            if (e instanceof Ya || "events" === n.observe) return r;
            const i = r.pipe(
              ((o = (e) => e instanceof nl),
              function (e) {
                return e.lift(new Va(o, void 0));
              }),
            );
            var o;
            switch (n.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return i.pipe(
                      k((e) => {
                        if (null !== e.body && !(e.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return e.body;
                      }),
                    );
                  case "blob":
                    return i.pipe(
                      k((e) => {
                        if (null !== e.body && !(e.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return e.body;
                      }),
                    );
                  case "text":
                    return i.pipe(
                      k((e) => {
                        if (null !== e.body && "string" != typeof e.body)
                          throw new Error("Response is not a string.");
                        return e.body;
                      }),
                    );
                  case "json":
                  default:
                    return i.pipe(k((e) => e.body));
                }
              case "response":
                return i;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`,
                );
            }
          }
          delete(e, t = {}) {
            return this.request("DELETE", e, t);
          }
          get(e, t = {}) {
            return this.request("GET", e, t);
          }
          head(e, t = {}) {
            return this.request("HEAD", e, t);
          }
          jsonp(e, t) {
            return this.request("JSONP", e, {
              params: new Ua().append(t, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(e, t = {}) {
            return this.request("OPTIONS", e, t);
          }
          patch(e, t, n = {}) {
            return this.request("PATCH", e, rl(n, t));
          }
          post(e, t, n = {}) {
            return this.request("POST", e, rl(n, t));
          }
          put(e, t, n = {}) {
            return this.request("PUT", e, rl(n, t));
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn($a));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ol {
        constructor(e, t) {
          (this.next = e), (this.interceptor = t);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const al = new yn("HTTP_INTERCEPTORS");
      let ll = (() => {
        class e {
          intercept(e, t) {
            return t.handle(e);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const cl = /^\)\]\}',?\n/;
      let ul = (() => {
        class e {
          constructor(e) {
            this.xhrFactory = e;
          }
          handle(e) {
            if ("JSONP" === e.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed.",
              );
            return new _((t) => {
              const n = this.xhrFactory.build();
              if (
                (n.open(e.method, e.urlWithParams),
                e.withCredentials && (n.withCredentials = !0),
                e.headers.forEach((e, t) => n.setRequestHeader(e, t.join(","))),
                e.headers.has("Accept") ||
                  n.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*",
                  ),
                !e.headers.has("Content-Type"))
              ) {
                const t = e.detectContentTypeHeader();
                null !== t && n.setRequestHeader("Content-Type", t);
              }
              if (e.responseType) {
                const t = e.responseType.toLowerCase();
                n.responseType = "json" !== t ? t : "text";
              }
              const s = e.serializeBody();
              let r = null;
              const i = () => {
                  if (null !== r) return r;
                  const t = 1223 === n.status ? 204 : n.status,
                    s = n.statusText || "OK",
                    i = new za(n.getAllResponseHeaders()),
                    o =
                      (function (e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(n) || e.url;
                  return (
                    (r = new tl({
                      headers: i,
                      status: t,
                      statusText: s,
                      url: o,
                    })),
                    r
                  );
                },
                o = () => {
                  let { headers: s, status: r, statusText: o, url: a } = i(),
                    l = null;
                  204 !== r &&
                    (l = void 0 === n.response ? n.responseText : n.response),
                    0 === r && (r = l ? 200 : 0);
                  let c = r >= 200 && r < 300;
                  if ("json" === e.responseType && "string" == typeof l) {
                    const e = l;
                    l = l.replace(cl, "");
                    try {
                      l = "" !== l ? JSON.parse(l) : null;
                    } catch (u) {
                      (l = e), c && ((c = !1), (l = { error: u, text: l }));
                    }
                  }
                  c
                    ? (t.next(
                        new nl({
                          body: l,
                          headers: s,
                          status: r,
                          statusText: o,
                          url: a || void 0,
                        }),
                      ),
                      t.complete())
                    : t.error(
                        new sl({
                          error: l,
                          headers: s,
                          status: r,
                          statusText: o,
                          url: a || void 0,
                        }),
                      );
                },
                a = (e) => {
                  const { url: s } = i(),
                    r = new sl({
                      error: e,
                      status: n.status || 0,
                      statusText: n.statusText || "Unknown Error",
                      url: s || void 0,
                    });
                  t.error(r);
                };
              let l = !1;
              const c = (s) => {
                  l || (t.next(i()), (l = !0));
                  let r = { type: Xa.DownloadProgress, loaded: s.loaded };
                  s.lengthComputable && (r.total = s.total),
                    "text" === e.responseType &&
                      n.responseText &&
                      (r.partialText = n.responseText),
                    t.next(r);
                },
                u = (e) => {
                  let n = { type: Xa.UploadProgress, loaded: e.loaded };
                  e.lengthComputable && (n.total = e.total), t.next(n);
                };
              return (
                n.addEventListener("load", o),
                n.addEventListener("error", a),
                n.addEventListener("timeout", a),
                n.addEventListener("abort", a),
                e.reportProgress &&
                  (n.addEventListener("progress", c),
                  null !== s &&
                    n.upload &&
                    n.upload.addEventListener("progress", u)),
                n.send(s),
                t.next({ type: Xa.Sent }),
                () => {
                  n.removeEventListener("error", a),
                    n.removeEventListener("abort", a),
                    n.removeEventListener("load", o),
                    n.removeEventListener("timeout", a),
                    e.reportProgress &&
                      (n.removeEventListener("progress", c),
                      null !== s &&
                        n.upload &&
                        n.upload.removeEventListener("progress", u)),
                    n.readyState !== n.DONE && n.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(la));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const hl = new yn("XSRF_COOKIE_NAME"),
        dl = new yn("XSRF_HEADER_NAME");
      class pl {}
      let fl = (() => {
          class e {
            constructor(e, t, n) {
              (this.doc = e),
                (this.platform = t),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const e = this.doc.cookie || "";
              return (
                e !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Yo(e, this.cookieName)),
                  (this.lastCookieString = e)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn(Zo), kn(oo), kn(hl));
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ml = (() => {
          class e {
            constructor(e, t) {
              (this.tokenService = e), (this.headerName = t);
            }
            intercept(e, t) {
              const n = e.url.toLowerCase();
              if (
                "GET" === e.method ||
                "HEAD" === e.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return t.handle(e);
              const s = this.tokenService.getToken();
              return (
                null === s ||
                  e.headers.has(this.headerName) ||
                  (e = e.clone({ headers: e.headers.set(this.headerName, s) })),
                t.handle(e)
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn(pl), kn(dl));
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        yl = (() => {
          class e {
            constructor(e, t) {
              (this.backend = e), (this.injector = t), (this.chain = null);
            }
            handle(e) {
              if (null === this.chain) {
                const e = this.injector.get(al, []);
                this.chain = e.reduceRight(
                  (e, t) => new ol(e, t),
                  this.backend,
                );
              }
              return this.chain.handle(e);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn(Ba), kn(Er));
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        gl = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: ml, useClass: ll }],
              };
            }
            static withOptions(t = {}) {
              return {
                ngModule: e,
                providers: [
                  t.cookieName ? { provide: hl, useValue: t.cookieName } : [],
                  t.headerName ? { provide: dl, useValue: t.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = He({ type: e })),
            (e.ɵinj = re({
              providers: [
                ml,
                { provide: al, useExisting: ml, multi: !0 },
                { provide: pl, useClass: fl },
                { provide: hl, useValue: "XSRF-TOKEN" },
                { provide: dl, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        _l = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = He({ type: e })),
            (e.ɵinj = re({
              providers: [
                il,
                { provide: $a, useClass: yl },
                ul,
                { provide: Ba, useExisting: ul },
              ],
              imports: [
                [
                  gl.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            e
          );
        })();
      function vl(e, t, n, s, r, i, o) {
        try {
          var a = e[i](o),
            l = a.value;
        } catch (c) {
          return void n(c);
        }
        a.done ? t(l) : Promise.resolve(l).then(s, r);
      }
      function bl(e) {
        return function () {
          var t = this,
            n = arguments;
          return new Promise(function (s, r) {
            var i = e.apply(t, n);
            function o(e) {
              vl(i, s, r, o, a, "next", e);
            }
            function a(e) {
              vl(i, s, r, o, a, "throw", e);
            }
            o(void 0);
          });
        };
      }
      class wl {}
      function El(e, t = null) {
        return { type: 4, styles: t, timings: e };
      }
      function Sl(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function Tl(e) {
        return { type: 6, styles: e, offset: null };
      }
      function Cl(e, t, n) {
        return { type: 0, name: e, styles: t, options: n };
      }
      function kl(e, t, n = null) {
        return { type: 1, expr: e, animation: t, options: n };
      }
      function xl(e) {
        Promise.resolve(null).then(e);
      }
      class Al {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          xl(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
      }
      class Pl {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            n = 0,
            s = 0;
          const r = this.players.length;
          0 == r
            ? xl(() => this._onFinish())
            : this.players.forEach((e) => {
                e.onDone(() => {
                  ++t == r && this._onFinish();
                }),
                  e.onDestroy(() => {
                    ++n == r && this._onDestroy();
                  }),
                  e.onStart(() => {
                    ++s == r && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (e, t) => Math.max(e, t.totalTime),
              0,
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((e) => {
            const n = e.totalTime ? Math.min(1, t / e.totalTime) : 1;
            e.setPosition(n);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (e, t) => (null === e || t.totalTime > e.totalTime ? t : e),
            null,
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
      }
      const Ol = [
        { id: "en.ahmedali", name: "Ahmed Ali" },
        { id: "en.ahmedraza", name: "Ahmed Raza Khan" },
        { id: "en.arberry", name: "Arberry" },
        { id: "en.asad", name: "Asad" },
        { id: "en.daryabadi", name: "Daryabadi" },
        { id: "en.hilali", name: "Hilali & Khan" },
        { id: "en.pickthall", name: "Pickthall" },
        { id: "en.qaribullah", name: "Qaribullah & Darwish" },
        { id: "en.sahih", name: "Saheeh International" },
        { id: "en.sarwar", name: "Sarwar" },
        { id: "en.yusufali", name: "Yusuf Ali" },
      ];
      let Il = (() => {
        class e {
          constructor(e) {
            (this.httpClient = e),
              (this.baseUrl = "https://api.alquran.cloud/v1/ayah");
          }
          getVerse(e) {
            var t = this;
            return bl(function* () {
              return t.getVerseFromUrl(`${t.baseUrl}/${e}`);
            })();
          }
          getVerseTranslation(e, t) {
            var n = this;
            return bl(function* () {
              return n.getVerseFromUrl(`${n.baseUrl}/${e}/${t.id}`);
            })();
          }
          getVerseFromUrl(e) {
            var t = this;
            return bl(function* () {
              let n = {
                code: 0,
                status: "",
                data: { numberInSurah: 0, text: "", surah: { number: 0 } },
              };
              return (
                yield t.httpClient
                  .get(e)
                  .toPromise()
                  .then((e) => (n = e)),
                n
              );
            })();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(il));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class Dl extends S {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return t && !t.closed && e.next(this._value), t;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new b();
          return this._value;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      class Nl {
        constructor(e, t) {
          (this.compare = e), (this.keySelector = t);
        }
        call(e, t) {
          return t.subscribe(new Fl(e, this.compare, this.keySelector));
        }
      }
      class Fl extends f {
        constructor(e, t, n) {
          super(e),
            (this.keySelector = n),
            (this.hasKey = !1),
            "function" == typeof t && (this.compare = t);
        }
        compare(e, t) {
          return e === t;
        }
        _next(e) {
          let t;
          try {
            const { keySelector: n } = this;
            t = n ? n(e) : e;
          } catch (s) {
            return this.destination.error(s);
          }
          let n = !1;
          if (this.hasKey)
            try {
              const { compare: e } = this;
              n = e(this.key, t);
            } catch (s) {
              return this.destination.error(s);
            }
          else this.hasKey = !0;
          n || ((this.key = t), this.destination.next(e));
        }
      }
      const Ml = new yn("DARK_MODE_OPTIONS"),
        Rl = {
          darkModeClass: "dark-mode",
          lightModeClass: "light-mode",
          preloadingClass: "dark-mode-preloading",
          storageKey: "dark-mode",
          element: document.body,
        };
      let jl = (() => {
          class e {
            matchMedia(e) {
              return window.matchMedia(e);
            }
            prefersDarkMode() {
              return this.matchMedia("(prefers-color-scheme: dark)").matches;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = se({
              factory: function () {
                return new e();
              },
              token: e,
              providedIn: "root",
            })),
            e
          );
        })(),
        Hl = (() => {
          class e {
            constructor(e, t, n) {
              (this.rendererFactory = e),
                (this.mediaQueryService = t),
                (this.providedOptions = n),
                (this.options = Object.assign(
                  Object.assign({}, Rl),
                  this.providedOptions || {},
                )),
                (this.renderer = this.rendererFactory.createRenderer(
                  null,
                  null,
                )),
                (this.darkModeSubject$ = new Dl(
                  this.getInitialDarkModeValue(),
                )),
                this.darkModeSubject$.getValue()
                  ? this.enable()
                  : this.disable(),
                this.removePreloadingClass();
            }
            get darkMode$() {
              return this.darkModeSubject$
                .asObservable()
                .pipe((e) => e.lift(new Nl(void 0, void 0)));
            }
            toggle() {
              this.darkModeSubject$.getValue() ? this.disable() : this.enable();
            }
            enable() {
              const {
                element: e,
                darkModeClass: t,
                lightModeClass: n,
              } = this.options;
              this.renderer.removeClass(e, n),
                this.renderer.addClass(e, t),
                this.saveDarkModeToStorage(!0),
                this.darkModeSubject$.next(!0);
            }
            disable() {
              const {
                element: e,
                darkModeClass: t,
                lightModeClass: n,
              } = this.options;
              this.renderer.removeClass(e, t),
                this.renderer.addClass(e, n),
                this.saveDarkModeToStorage(!1),
                this.darkModeSubject$.next(!1);
            }
            getInitialDarkModeValue() {
              const e = this.getDarkModeFromStorage();
              return null == e ? this.mediaQueryService.prefersDarkMode() : e;
            }
            saveDarkModeToStorage(e) {
              localStorage.setItem(
                this.options.storageKey,
                JSON.stringify({ darkMode: e }),
              );
            }
            getDarkModeFromStorage() {
              var e;
              const t = localStorage.getItem(this.options.storageKey);
              if (t)
                try {
                  return null === (e = JSON.parse(t)) || void 0 === e
                    ? void 0
                    : e.darkMode;
                } catch (n) {
                  console.error(
                    "Invalid darkMode localStorage item:",
                    t,
                    "falling back to color scheme media query",
                  );
                }
              return null;
            }
            removePreloadingClass() {
              setTimeout(() => {
                this.renderer.removeClass(
                  this.options.element,
                  this.options.preloadingClass,
                );
              });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(kn(ii), kn(jl), kn(Ml, 8));
            }),
            (e.ɵprov = se({
              factory: function () {
                return new e(kn(ii), kn(jl), kn(Ml, 8));
              },
              token: e,
              providedIn: "root",
            })),
            e
          );
        })(),
        Vl = (() => {
          class e {
            constructor(e) {
              (this.darkModeService = e),
                (this.darkMode$ = this.darkModeService.darkMode$);
            }
            ngOnInit() {}
            onToggle() {
              this.darkModeService.toggle();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Or(Hl));
            }),
            (e.ɵcmp = Fe({
              type: e,
              selectors: [["app-dark-mode-toggle"]],
              decls: 8,
              vars: 3,
              consts: [
                [1, "theme-switch-wrapper"],
                [1, "fa-solid", "fa-sun"],
                ["for", "checkbox", 1, "theme-switch"],
                ["type", "checkbox", "id", "checkbox", 3, "checked", "change"],
                [1, "slider", "round"],
                [1, "fa-solid", "fa-moon"],
              ],
              template: function (e, t) {
                1 & e &&
                  (Nr(0, "nav"),
                  Nr(1, "div", 0),
                  Mr(2, "i", 1),
                  Nr(3, "label", 2),
                  Nr(4, "input", 3),
                  Vr("change", function () {
                    return t.onToggle();
                  }),
                  (function (e, t) {
                    const n = mt();
                    let s;
                    n.firstCreatePass
                      ? ((s = (function (e, t) {
                          if (t)
                            for (let n = t.length - 1; n >= 0; n--) {
                              const e = t[n];
                              if ("async" === e.name) return e;
                            }
                          throw new X(
                            "302",
                            "The pipe 'async' could not be found!",
                          );
                        })(0, n.pipeRegistry)),
                        (n.data[25] = s),
                        s.onDestroy &&
                          (n.destroyHooks || (n.destroyHooks = [])).push(
                            25,
                            s.onDestroy,
                          ))
                      : (s = n.data[25]);
                    const r = s.factory || (s.factory = Ge(s.type)),
                      i = fe(Or);
                    try {
                      const e = Jt(!1),
                        t = r();
                      Jt(e),
                        (function (e, t, n, s) {
                          25 >= e.data.length &&
                            ((e.data[25] = null), (e.blueprint[25] = null)),
                            (t[25] = s);
                        })(n, ft(), 0, t);
                    } finally {
                      fe(i);
                    }
                  })(),
                  Fr(),
                  Mr(6, "div", 4),
                  Fr(),
                  Mr(7, "i", 5),
                  Fr(),
                  Fr()),
                  2 & e && (Es(4), Ir("checked", Ji(5, 1, t.darkMode$)));
              },
              pipes: [oa],
              styles: [
                '.theme-switch-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}.theme-switch-wrapper[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{margin-left:10px;font-size:1rem}.theme-switch[_ngcontent-%COMP%]{display:inline-block;height:34px;position:relative;width:60px}.theme-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:none}.slider[_ngcontent-%COMP%]{background-color:#ccc;bottom:0;cursor:pointer;left:0;right:0;top:0}.slider[_ngcontent-%COMP%], .slider[_ngcontent-%COMP%]:before{position:absolute;transition:.4s}.slider[_ngcontent-%COMP%]:before{background-color:#fff;bottom:4px;content:"";height:26px;left:4px;width:26px}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]{background-color:#66bb6a}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]:before{transform:translateX(26px)}.slider.round[_ngcontent-%COMP%]{border-radius:34px}.slider.round[_ngcontent-%COMP%]:before{border-radius:50%}i[_ngcontent-%COMP%]{font-family:fontAwesome;padding:10px;font-size:1.5rem;font-style:normal}.fa-sun[_ngcontent-%COMP%]{padding-left:0}.fa-moon[_ngcontent-%COMP%]{padding-right:0}',
              ],
            })),
            e
          );
        })();
      function Ll(e, t) {
        1 & e && (Nr(0, "div", 3), Mr(1, "app-dark-mode-toggle"), Fr());
      }
      let $l = (() => {
          class e {
            constructor() {
              (this.logo = { bold: "Random", text: " Quran Verse" }),
                (this.isOnMobile = !1);
            }
            ngOnInit() {
              this.setMobile();
            }
            setMobile() {
              screen.width <= 600 &&
                ((this.isOnMobile = !0),
                (this.logo.bold = "R"),
                (this.logo.text = "QV"));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵcmp = Fe({
              type: e,
              selectors: [["app-header"]],
              decls: 21,
              vars: 3,
              consts: [
                [1, "inner-header"],
                [1, "logo-container"],
                [1, "navigation"],
                [1, "choice"],
                [
                  "href",
                  "https://github.com/awhumayun/randomquranverse.github.io",
                  "target",
                  "blank",
                ],
                ["href", "https://alquran.cloud/", "target", "blank"],
                ["href", "https://quran.com/", "target", "blank"],
                ["class", "choice", 4, "ngIf"],
              ],
              template: function (e, t) {
                1 & e &&
                  (Nr(0, "header"),
                  Nr(1, "div", 0),
                  Nr(2, "div", 1),
                  Nr(3, "h1"),
                  Br(4),
                  Nr(5, "span"),
                  Br(6),
                  Fr(),
                  Fr(),
                  Fr(),
                  Nr(7, "ul", 2),
                  Nr(8, "div", 3),
                  Nr(9, "a", 4),
                  Nr(10, "li"),
                  Br(11, "Code"),
                  Fr(),
                  Fr(),
                  Fr(),
                  Nr(12, "div", 3),
                  Nr(13, "a", 5),
                  Nr(14, "li"),
                  Br(15, "API"),
                  Fr(),
                  Fr(),
                  Fr(),
                  Nr(16, "div", 3),
                  Nr(17, "a", 6),
                  Nr(18, "li"),
                  Br(19, "Quran"),
                  Fr(),
                  Fr(),
                  Fr(),
                  (function (e, t, n, s, r, i, o, a) {
                    const l = ft(),
                      c = mt(),
                      u = c.firstCreatePass
                        ? (function (e, t, n, s, r, i, o, a, l) {
                            const c = t.consts,
                              u = ks(t, 40, 4, "div", ct(c, 7));
                            js(t, n, u, ct(c, undefined)), Rt(t, u);
                            const h = (u.tViews = Ms(
                              2,
                              u,
                              s,
                              2,
                              0,
                              t.directiveRegistry,
                              t.pipeRegistry,
                              null,
                              t.schemas,
                              c,
                            ));
                            return (
                              null !== t.queries &&
                                (t.queries.template(t, u),
                                (h.queries = t.queries.embeddedTView(u))),
                              u
                            );
                          })(0, c, l, t)
                        : c.data[40];
                    _t(u, !1);
                    const h = l[11].createComment("");
                    ns(c, l, h, u),
                      Dn(h, l),
                      Js(l, (l[40] = Us(h, l, h, u))),
                      Ze(u) && Ds(c, l, u);
                  })(0, Ll),
                  Fr(),
                  Fr(),
                  Fr()),
                  2 & e &&
                    (Es(4),
                    zr(t.logo.bold),
                    Es(2),
                    zr(t.logo.text),
                    Es(14),
                    Ir("ngIf", !t.isOnMobile));
              },
              directives: [Xo, Vl],
              styles: [
                "header[_ngcontent-%COMP%]{width:100vw;min-height:10vh;display:block;margin:-8px;font-family:Rubik,sans-serif}.inner-header[_ngcontent-%COMP%]{width:75%;height:10vh;display:block;margin:0 auto}.logo-container[_ngcontent-%COMP%]{min-height:100%;display:table;float:left}.logo-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{min-height:100%;display:table-cell;vertical-align:middle;font-size:2rem;font-weight:700}.logo-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:200}.navigation[_ngcontent-%COMP%]{float:right;height:10vh;margin:0}.navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px}.navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{outline:solid;opacity:.75;transition:all .05s}.choice[_ngcontent-%COMP%], .navigation[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:table-cell;font-size:1rem}.choice[_ngcontent-%COMP%]{height:10vh;vertical-align:middle;padding:0 15px}@media only screen and (max-width:600px){.choice[_ngcontent-%COMP%]{padding:0}}",
              ],
            })),
            e
          );
        })(),
        Bl = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵcmp = Fe({
              type: e,
              selectors: [["app-button"]],
              decls: 2,
              vars: 0,
              template: function (e, t) {
                1 & e &&
                  (Nr(0, "button"), Br(1, "Get Another Random Verse"), Fr());
              },
              styles: [
                "button[_ngcontent-%COMP%]{padding:15px 25px;font-size:24px;cursor:pointer;text-align:center;border:none;border-radius:15px;box-shadow:0 9px #999;font-family:Source Sans Pro,sans-serif}button[_ngcontent-%COMP%]:hover{opacity:.75}button[_ngcontent-%COMP%]:active{filter:brightness(.7);box-shadow:0 5px #666;transform:translateY(4px);opacity:1}",
              ],
            })),
            e
          );
        })(),
        zl = (() => {
          class e {
            constructor(e) {
              (this.verseService = e),
                (this.numOfVerses = 6236),
                (this.translation = Ol[6]),
                (this.isNew = !0);
            }
            ngOnInit() {
              var e = this;
              return bl(function* () {
                yield e.getRandomVerse();
              })();
            }
            getRandomVerse() {
              var e = this;
              return bl(function* () {
                e.isNew = !0;
                const t = Math.floor(Math.random() * e.numOfVerses) + 1;
                (e.verse = yield e.verseService.getVerse(t)),
                  (e.verseTranslation =
                    yield e.verseService.getVerseTranslation(t, e.translation)),
                  (e.translationText = `(${e.verseTranslation.data.surah.number}:${e.verseTranslation.data.numberInSurah}) ${e.verseTranslation.data.text}`),
                  (e.isNew = !1);
              })();
            }
          }
          var t;
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Or(Il));
            }),
            (e.ɵcmp = Fe({
              type: e,
              selectors: [["app-root"]],
              decls: 9,
              vars: 3,
              consts: [
                [1, "text-container"],
                [1, "translation"],
                [1, "button-container"],
                [3, "click"],
              ],
              template: function (e, t) {
                1 & e &&
                  (Mr(0, "app-header"),
                  Nr(1, "body"),
                  Nr(2, "div", 0),
                  Nr(3, "p"),
                  Br(4),
                  Fr(),
                  Nr(5, "p", 1),
                  Br(6),
                  Fr(),
                  Fr(),
                  Nr(7, "div", 2),
                  Nr(8, "app-button", 3),
                  Vr("click", function () {
                    return t.getRandomVerse();
                  }),
                  Fr(),
                  Fr(),
                  Fr()),
                  2 & e &&
                    (Es(2),
                    Ir("@fade", t.isNew ? "out" : "in"),
                    Es(2),
                    zr(t.verse.data.text),
                    Es(2),
                    zr(t.translationText));
              },
              directives: [$l, Bl],
              styles: [
                "*[_ngcontent-%COMP%]{margin:0;padding:0;list-style:none;text-decoration:none}body[_ngcontent-%COMP%]{min-height:90vh;margin:8px -8px -8px}.text-container[_ngcontent-%COMP%]{padding:2.5% 10%;text-align:center;font-size:2.5rem;min-height:65vh}.text-container[_ngcontent-%COMP%]   .translation[_ngcontent-%COMP%]{margin-top:2.5%;font-family:Source Sans Pro,sans-serif}.button-container[_ngcontent-%COMP%]{width:100%;display:grid;justify-content:center;margin-bottom:2.5%}@media only screen and (max-width:600px){.text-container[_ngcontent-%COMP%]{font-size:1.25rem}}",
              ],
              data: {
                animation: [
                  ((t = [
                    Cl("out", Tl({ opacity: 0 })),
                    Cl("in", Tl({ opacity: 1 })),
                    kl("out => in", [El("2s")]),
                  ]),
                  { type: 7, name: "fade", definitions: t, options: {} }),
                ],
              },
            })),
            e
          );
        })();
      function ql() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function Kl() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Ql(e) {
        switch (e.length) {
          case 0:
            return new Al();
          case 1:
            return e[0];
          default:
            return new Pl(e);
        }
      }
      function Ul(e, t, n, s, r = {}, i = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (s.forEach((e) => {
            const n = e.offset,
              s = n == l,
              u = (s && c) || {};
            Object.keys(e).forEach((n) => {
              let s = n,
                a = e[n];
              if ("offset" !== n)
                switch (((s = t.normalizePropertyName(s, o)), a)) {
                  case "!":
                    a = r[n];
                    break;
                  case "*":
                    a = i[n];
                    break;
                  default:
                    a = t.normalizeStyleValue(n, s, a, o);
                }
              u[s] = a;
            }),
              s || a.push(u),
              (c = u),
              (l = n);
          }),
          o.length)
        ) {
          const e = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${e}${o.join(e)}`,
          );
        }
        return a;
      }
      function Zl(e, t, n, s) {
        switch (t) {
          case "start":
            e.onStart(() => s(n && Wl(n, "start", e)));
            break;
          case "done":
            e.onDone(() => s(n && Wl(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => s(n && Wl(n, "destroy", e)));
        }
      }
      function Wl(e, t, n) {
        const s = n.totalTime,
          r = Gl(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            t || e.phaseName,
            null == s ? e.totalTime : s,
            !!n.disabled,
          ),
          i = e._data;
        return null != i && (r._data = i), r;
      }
      function Gl(e, t, n, s, r = "", i = 0, o) {
        return {
          element: e,
          triggerName: t,
          fromState: n,
          toState: s,
          phaseName: r,
          totalTime: i,
          disabled: !!o,
        };
      }
      function Jl(e, t, n) {
        let s;
        return (
          e instanceof Map
            ? ((s = e.get(t)), s || e.set(t, (s = n)))
            : ((s = e[t]), s || (s = e[t] = n)),
          s
        );
      }
      function Yl(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.substr(t + 1)];
      }
      let Xl = (e, t) => !1,
        ec = (e, t) => !1,
        tc = (e, t, n) => [];
      const nc = Kl();
      (nc || "undefined" != typeof Element) &&
        ((Xl = ql()
          ? (e, t) => {
              for (; t && t !== document.documentElement; ) {
                if (t === e) return !0;
                t = t.parentNode || t.host;
              }
              return !1;
            }
          : (e, t) => e.contains(t)),
        (ec = (() => {
          if (nc || Element.prototype.matches) return (e, t) => e.matches(t);
          {
            const e = Element.prototype,
              t =
                e.matchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector ||
                e.oMatchesSelector ||
                e.webkitMatchesSelector;
            return t ? (e, n) => t.apply(e, [n]) : ec;
          }
        })()),
        (tc = (e, t, n) => {
          let s = [];
          if (n) {
            const n = e.querySelectorAll(t);
            for (let e = 0; e < n.length; e++) s.push(n[e]);
          } else {
            const n = e.querySelector(t);
            n && s.push(n);
          }
          return s;
        }));
      let sc = null,
        rc = !1;
      function ic(e) {
        sc ||
          ((sc = ("undefined" != typeof document ? document.body : null) || {}),
          (rc = !!sc.style && "WebkitAppearance" in sc.style));
        let t = !0;
        return (
          sc.style &&
            !(function (e) {
              return "ebkit" == e.substring(1, 6);
            })(e) &&
            ((t = e in sc.style), !t && rc) &&
            (t =
              "Webkit" + e.charAt(0).toUpperCase() + e.substr(1) in sc.style),
          t
        );
      }
      const oc = ec,
        ac = Xl,
        lc = tc;
      function cc(e) {
        const t = {};
        return (
          Object.keys(e).forEach((n) => {
            const s = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            t[s] = e[n];
          }),
          t
        );
      }
      let uc = (() => {
          class e {
            validateStyleProperty(e) {
              return ic(e);
            }
            matchesElement(e, t) {
              return oc(e, t);
            }
            containsElement(e, t) {
              return ac(e, t);
            }
            query(e, t, n) {
              return lc(e, t, n);
            }
            computeStyle(e, t, n) {
              return n || "";
            }
            animate(e, t, n, s, r, i = [], o) {
              return new Al(n, s);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = se({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        hc = (() => {
          class e {}
          return (e.NOOP = new uc()), e;
        })();
      function dc(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : pc(parseFloat(t[1]), t[2]);
      }
      function pc(e, t) {
        switch (t) {
          case "s":
            return 1e3 * e;
          default:
            return e;
        }
      }
      function fc(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function (e, t, n) {
              let s,
                r = 0,
                i = "";
              if ("string" == typeof e) {
                const n = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
                );
                if (null === n)
                  return (
                    t.push(`The provided timing value "${e}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                s = pc(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (r = pc(parseFloat(o), n[4]));
                const a = n[5];
                a && (i = a);
              } else s = e;
              if (!n) {
                let n = !1,
                  i = t.length;
                s < 0 &&
                  (t.push(
                    "Duration values below 0 are not allowed for this animation step.",
                  ),
                  (n = !0)),
                  r < 0 &&
                    (t.push(
                      "Delay values below 0 are not allowed for this animation step.",
                    ),
                    (n = !0)),
                  n &&
                    t.splice(
                      i,
                      0,
                      `The provided timing value "${e}" is invalid.`,
                    );
              }
              return { duration: s, delay: r, easing: i };
            })(e, t, n);
      }
      function mc(e, t = {}) {
        return (
          Object.keys(e).forEach((n) => {
            t[n] = e[n];
          }),
          t
        );
      }
      function yc(e, t, n = {}) {
        if (t) for (let s in e) n[s] = e[s];
        else mc(e, n);
        return n;
      }
      function gc(e, t, n) {
        return n ? t + ":" + n + ";" : "";
      }
      function _c(e) {
        let t = "";
        for (let n = 0; n < e.style.length; n++) {
          const s = e.style.item(n);
          t += gc(0, s, e.style.getPropertyValue(s));
        }
        for (const n in e.style)
          e.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (t += gc(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              e.style[n],
            ));
        e.setAttribute("style", t);
      }
      function vc(e, t, n) {
        e.style &&
          (Object.keys(t).forEach((s) => {
            const r = xc(s);
            n && !n.hasOwnProperty(s) && (n[s] = e.style[r]),
              (e.style[r] = t[s]);
          }),
          Kl() && _c(e));
      }
      function bc(e, t) {
        e.style &&
          (Object.keys(t).forEach((t) => {
            const n = xc(t);
            e.style[n] = "";
          }),
          Kl() && _c(e));
      }
      function wc(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : Sl(e)) : e;
      }
      const Ec = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Sc(e) {
        let t = [];
        if ("string" == typeof e) {
          let n;
          for (; (n = Ec.exec(e)); ) t.push(n[1]);
          Ec.lastIndex = 0;
        }
        return t;
      }
      function Tc(e, t, n) {
        const s = e.toString(),
          r = s.replace(Ec, (e, s) => {
            let r = t[s];
            return (
              t.hasOwnProperty(s) ||
                (n.push(`Please provide a value for the animation param ${s}`),
                (r = "")),
              r.toString()
            );
          });
        return r == s ? e : r;
      }
      function Cc(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const kc = /-+([a-z0-9])/g;
      function xc(e) {
        return e.replace(kc, (...e) => e[1].toUpperCase());
      }
      function Ac(e, t) {
        return 0 === e || 0 === t;
      }
      function Pc(e, t, n) {
        const s = Object.keys(n);
        if (s.length && t.length) {
          let i = t[0],
            o = [];
          if (
            (s.forEach((e) => {
              i.hasOwnProperty(e) || o.push(e), (i[e] = n[e]);
            }),
            o.length)
          )
            for (var r = 1; r < t.length; r++) {
              let n = t[r];
              o.forEach(function (t) {
                n[t] = Ic(e, t);
              });
            }
        }
        return t;
      }
      function Oc(e, t, n) {
        switch (t.type) {
          case 7:
            return e.visitTrigger(t, n);
          case 0:
            return e.visitState(t, n);
          case 1:
            return e.visitTransition(t, n);
          case 2:
            return e.visitSequence(t, n);
          case 3:
            return e.visitGroup(t, n);
          case 4:
            return e.visitAnimate(t, n);
          case 5:
            return e.visitKeyframes(t, n);
          case 6:
            return e.visitStyle(t, n);
          case 8:
            return e.visitReference(t, n);
          case 9:
            return e.visitAnimateChild(t, n);
          case 10:
            return e.visitAnimateRef(t, n);
          case 11:
            return e.visitQuery(t, n);
          case 12:
            return e.visitStagger(t, n);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${t.type}`,
            );
        }
      }
      function Ic(e, t) {
        return window.getComputedStyle(e)[t];
      }
      function Dc(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach((e) =>
                (function (e, t, n) {
                  if (":" == e[0]) {
                    const s = (function (e, t) {
                      switch (e) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (e, t) => parseFloat(t) > parseFloat(e);
                        case ":decrement":
                          return (e, t) => parseFloat(t) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              `The transition alias value "${e}" is not supported`,
                            ),
                            "* => *"
                          );
                      }
                    })(e, n);
                    if ("function" == typeof s) return void t.push(s);
                    e = s;
                  }
                  const s = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == s || s.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${e}" is not supported`,
                      ),
                      t
                    );
                  const r = s[1],
                    i = s[2],
                    o = s[3];
                  t.push(Mc(r, o)),
                    "<" != i[0] || ("*" == r && "*" == o) || t.push(Mc(o, r));
                })(e, n, t),
              )
            : n.push(e),
          n
        );
      }
      const Nc = new Set(["true", "1"]),
        Fc = new Set(["false", "0"]);
      function Mc(e, t) {
        const n = Nc.has(e) || Fc.has(e),
          s = Nc.has(t) || Fc.has(t);
        return (r, i) => {
          let o = "*" == e || e == r,
            a = "*" == t || t == i;
          return (
            !o && n && "boolean" == typeof r && (o = r ? Nc.has(e) : Fc.has(e)),
            !a && s && "boolean" == typeof i && (a = i ? Nc.has(t) : Fc.has(t)),
            o && a
          );
        };
      }
      const Rc = new RegExp("s*:selfs*,?", "g");
      function jc(e, t, n) {
        return new Hc(e).build(t, n);
      }
      class Hc {
        constructor(e) {
          this._driver = e;
        }
        build(e, t) {
          const n = new Vc(t);
          return this._resetContextStyleTimingState(n), Oc(this, wc(e), n);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let n = (t.queryCount = 0),
            s = (t.depCount = 0);
          const r = [],
            i = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))",
              ),
            e.definitions.forEach((e) => {
              if ((this._resetContextStyleTimingState(t), 0 == e.type)) {
                const n = e,
                  s = n.name;
                s
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((e) => {
                    (n.name = e), r.push(this.visitState(n, t));
                  }),
                  (n.name = s);
              } else if (1 == e.type) {
                const r = this.visitTransition(e, t);
                (n += r.queryCount), (s += r.depCount), i.push(r);
              } else
                t.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()",
                );
            }),
            {
              type: 7,
              name: e.name,
              states: r,
              transitions: i,
              queryCount: n,
              depCount: s,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const n = this.visitStyle(e.styles, t),
            s = (e.options && e.options.params) || null;
          if (n.containsDynamicStyles) {
            const r = new Set(),
              i = s || {};
            if (
              (n.styles.forEach((e) => {
                if (Lc(e)) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    Sc(t[e]).forEach((e) => {
                      i.hasOwnProperty(e) || r.add(e);
                    });
                  });
                }
              }),
              r.size)
            ) {
              const n = Cc(r.values());
              t.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", ",
                )}`,
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: n,
            options: s ? { params: s } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const n = Oc(this, wc(e.animation), t);
          return {
            type: 1,
            matchers: Dc(e.expr, t.errors),
            animation: n,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: $c(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((e) => Oc(this, e, t)),
            options: $c(e.options),
          };
        }
        visitGroup(e, t) {
          const n = t.currentTime;
          let s = 0;
          const r = e.steps.map((e) => {
            t.currentTime = n;
            const r = Oc(this, e, t);
            return (s = Math.max(s, t.currentTime)), r;
          });
          return (
            (t.currentTime = s), { type: 3, steps: r, options: $c(e.options) }
          );
        }
        visitAnimate(e, t) {
          const n = (function (e, t) {
            let n = null;
            if (e.hasOwnProperty("duration")) n = e;
            else if ("number" == typeof e) return Bc(fc(e, t).duration, 0, "");
            const s = e;
            if (
              s
                .split(/\s+/)
                .some((e) => "{" == e.charAt(0) && "{" == e.charAt(1))
            ) {
              const e = Bc(0, 0, "");
              return (e.dynamic = !0), (e.strValue = s), e;
            }
            return (n = n || fc(s, t)), Bc(n.duration, n.delay, n.easing);
          })(e.timings, t.errors);
          let s;
          t.currentAnimateTimings = n;
          let r = e.styles ? e.styles : Tl({});
          if (5 == r.type) s = this.visitKeyframes(r, t);
          else {
            let r = e.styles,
              i = !1;
            if (!r) {
              i = !0;
              const e = {};
              n.easing && (e.easing = n.easing), (r = Tl(e));
            }
            t.currentTime += n.duration + n.delay;
            const o = this.visitStyle(r, t);
            (o.isEmptyStep = i), (s = o);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: n, style: s, options: null }
          );
        }
        visitStyle(e, t) {
          const n = this._makeStyleAst(e, t);
          return this._validateStyleAst(n, t), n;
        }
        _makeStyleAst(e, t) {
          const n = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((e) => {
                "string" == typeof e
                  ? "*" == e
                    ? n.push(e)
                    : t.errors.push(
                        `The provided style string value ${e} is not allowed.`,
                      )
                  : n.push(e);
              })
            : n.push(e.styles);
          let s = !1,
            r = null;
          return (
            n.forEach((e) => {
              if (Lc(e)) {
                const t = e,
                  n = t.easing;
                if ((n && ((r = n), delete t.easing), !s))
                  for (let e in t)
                    if (t[e].toString().indexOf("{{") >= 0) {
                      s = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: r,
              offset: e.offset,
              containsDynamicStyles: s,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const n = t.currentAnimateTimings;
          let s = t.currentTime,
            r = t.currentTime;
          n && r > 0 && (r -= n.duration + n.delay),
            e.styles.forEach((e) => {
              "string" != typeof e &&
                Object.keys(e).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void t.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`,
                    );
                  const i = t.collectedStyles[t.currentQuerySelector],
                    o = i[n];
                  let a = !0;
                  o &&
                    (r != s &&
                      r >= o.startTime &&
                      s <= o.endTime &&
                      (t.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${r}ms" and "${s}ms"`,
                      ),
                      (a = !1)),
                    (r = o.startTime)),
                    a && (i[n] = { startTime: r, endTime: s }),
                    t.options &&
                      (function (e, t, n) {
                        const s = t.params || {},
                          r = Sc(e);
                        r.length &&
                          r.forEach((e) => {
                            s.hasOwnProperty(e) ||
                              n.push(
                                `Unable to resolve the local animation param ${e} in the given list of values`,
                              );
                          });
                      })(e[n], t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const n = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                "keyframes() must be placed inside of a call to animate()",
              ),
              n
            );
          let s = 0;
          const r = [];
          let i = !1,
            o = !1,
            a = 0;
          const l = e.steps.map((e) => {
            const n = this._makeStyleAst(e, t);
            let l =
                null != n.offset
                  ? n.offset
                  : (function (e) {
                      if ("string" == typeof e) return null;
                      let t = null;
                      if (Array.isArray(e))
                        e.forEach((e) => {
                          if (Lc(e) && e.hasOwnProperty("offset")) {
                            const n = e;
                            (t = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (Lc(e) && e.hasOwnProperty("offset")) {
                        const n = e;
                        (t = parseFloat(n.offset)), delete n.offset;
                      }
                      return t;
                    })(n.styles),
              c = 0;
            return (
              null != l && (s++, (c = n.offset = l)),
              (o = o || c < 0 || c > 1),
              (i = i || c < a),
              (a = c),
              r.push(c),
              n
            );
          });
          o &&
            t.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1",
            ),
            i &&
              t.errors.push(
                "Please ensure that all keyframe offsets are in order",
              );
          const c = e.steps.length;
          let u = 0;
          s > 0 && s < c
            ? t.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets",
              )
            : 0 == s && (u = 1 / (c - 1));
          const h = c - 1,
            d = t.currentTime,
            p = t.currentAnimateTimings,
            f = p.duration;
          return (
            l.forEach((e, s) => {
              const i = u > 0 ? (s == h ? 1 : u * s) : r[s],
                o = i * f;
              (t.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(e, t),
                (e.offset = i),
                n.styles.push(e);
            }),
            n
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: Oc(this, wc(e.animation), t),
            options: $c(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: $c(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: $c(e.options),
          };
        }
        visitQuery(e, t) {
          const n = t.currentQuerySelector,
            s = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [r, i] = (function (e) {
            const t = !!e.split(/\s*,\s*/).find((e) => ":self" == e);
            return (
              t && (e = e.replace(Rc, "")),
              [
                (e = e
                  .replace(/@\*/g, ".ng-trigger")
                  .replace(/@\w+/g, (e) => ".ng-trigger-" + e.substr(1))
                  .replace(/:animating/g, ".ng-animating")),
                t,
              ]
            );
          })(e.selector);
          (t.currentQuerySelector = n.length ? n + " " + r : r),
            Jl(t.collectedStyles, t.currentQuerySelector, {});
          const o = Oc(this, wc(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = n),
            {
              type: 11,
              selector: r,
              limit: s.limit || 0,
              optional: !!s.optional,
              includeSelf: i,
              animation: o,
              originalSelector: e.selector,
              options: $c(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : fc(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: Oc(this, wc(e.animation), t),
            timings: n,
            options: null,
          };
        }
      }
      class Vc {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function Lc(e) {
        return !Array.isArray(e) && "object" == typeof e;
      }
      function $c(e) {
        var t;
        return (
          e
            ? (e = mc(e)).params && (e.params = (t = e.params) ? mc(t) : null)
            : (e = {}),
          e
        );
      }
      function Bc(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function zc(e, t, n, s, r, i, o = null, a = !1) {
        return {
          type: 1,
          element: e,
          keyframes: t,
          preStyleProps: n,
          postStyleProps: s,
          duration: r,
          delay: i,
          totalTime: r + i,
          easing: o,
          subTimeline: a,
        };
      }
      class qc {
        constructor() {
          this._map = new Map();
        }
        consume(e) {
          let t = this._map.get(e);
          return t ? this._map.delete(e) : (t = []), t;
        }
        append(e, t) {
          let n = this._map.get(e);
          n || this._map.set(e, (n = [])), n.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const Kc = new RegExp(":enter", "g"),
        Qc = new RegExp(":leave", "g");
      function Uc(e, t, n, s, r, i = {}, o = {}, a, l, c = []) {
        return new Zc().buildKeyframes(e, t, n, s, r, i, o, a, l, c);
      }
      class Zc {
        buildKeyframes(e, t, n, s, r, i, o, a, l, c = []) {
          l = l || new qc();
          const u = new Gc(e, t, l, s, r, c, []);
          (u.options = a),
            u.currentTimeline.setStyles([i], null, u.errors, a),
            Oc(this, n, u);
          const h = u.timelines.filter((e) => e.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const e = h[h.length - 1];
            e.allowOnlyTimelineStyles() || e.setStyles([o], null, u.errors, a);
          }
          return h.length
            ? h.map((e) => e.buildKeyframes())
            : [zc(t, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const n = t.subInstructions.consume(t.element);
          if (n) {
            const s = t.createSubContext(e.options),
              r = t.currentTimeline.currentTime,
              i = this._visitSubInstructions(n, s, s.options);
            r != i && t.transformIntoNewTimeline(i);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const n = t.createSubContext(e.options);
          n.transformIntoNewTimeline(),
            this.visitReference(e.animation, n),
            t.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, n) {
          let s = t.currentTimeline.currentTime;
          const r = null != n.duration ? dc(n.duration) : null,
            i = null != n.delay ? dc(n.delay) : null;
          return (
            0 !== r &&
              e.forEach((e) => {
                const n = t.appendInstructionToTimeline(e, r, i);
                s = Math.max(s, n.duration + n.delay);
              }),
            s
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            Oc(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const n = t.subContextCount;
          let s = t;
          const r = e.options;
          if (
            r &&
            (r.params || r.delay) &&
            ((s = t.createSubContext(r)),
            s.transformIntoNewTimeline(),
            null != r.delay)
          ) {
            6 == s.previousNode.type &&
              (s.currentTimeline.snapshotCurrentStyles(),
              (s.previousNode = Wc));
            const e = dc(r.delay);
            s.delayNextStep(e);
          }
          e.steps.length &&
            (e.steps.forEach((e) => Oc(this, e, s)),
            s.currentTimeline.applyStylesToKeyframe(),
            s.subContextCount > n && s.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const n = [];
          let s = t.currentTimeline.currentTime;
          const r = e.options && e.options.delay ? dc(e.options.delay) : 0;
          e.steps.forEach((i) => {
            const o = t.createSubContext(e.options);
            r && o.delayNextStep(r),
              Oc(this, i, o),
              (s = Math.max(s, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((e) => t.currentTimeline.mergeTimelineCollectedStyles(e)),
            t.transformIntoNewTimeline(s),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const n = e.strValue;
            return fc(t.params ? Tc(n, t.params, t.errors) : n, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const n = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            s = t.currentTimeline;
          n.delay && (t.incrementTime(n.delay), s.snapshotCurrentStyles());
          const r = e.style;
          5 == r.type
            ? this.visitKeyframes(r, t)
            : (t.incrementTime(n.duration),
              this.visitStyle(r, t),
              s.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const n = t.currentTimeline,
            s = t.currentAnimateTimings;
          !s && n.getCurrentStyleProperties().length && n.forwardFrame();
          const r = (s && s.easing) || e.easing;
          e.isEmptyStep
            ? n.applyEmptyStep(r)
            : n.setStyles(e.styles, r, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const n = t.currentAnimateTimings,
            s = t.currentTimeline.duration,
            r = n.duration,
            i = t.createSubContext().currentTimeline;
          (i.easing = n.easing),
            e.styles.forEach((e) => {
              i.forwardTime((e.offset || 0) * r),
                i.setStyles(e.styles, e.easing, t.errors, t.options),
                i.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(i),
            t.transformIntoNewTimeline(s + r),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const n = t.currentTimeline.currentTime,
            s = e.options || {},
            r = s.delay ? dc(s.delay) : 0;
          r &&
            (6 === t.previousNode.type ||
              (0 == n &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Wc));
          let i = n;
          const o = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!s.optional,
            t.errors,
          );
          t.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, s) => {
            t.currentQueryIndex = s;
            const o = t.createSubContext(e.options, n);
            r && o.delayNextStep(r),
              n === t.element && (a = o.currentTimeline),
              Oc(this, e.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (i = Math.max(i, o.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(i),
            a &&
              (t.currentTimeline.mergeTimelineCollectedStyles(a),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const n = t.parentContext,
            s = t.currentTimeline,
            r = e.timings,
            i = Math.abs(r.duration),
            o = i * (t.currentQueryTotal - 1);
          let a = i * t.currentQueryIndex;
          switch (r.duration < 0 ? "reverse" : r.easing) {
            case "reverse":
              a = o - a;
              break;
            case "full":
              a = n.currentStaggerTime;
          }
          const l = t.currentTimeline;
          a && l.delayNextStep(a);
          const c = l.currentTime;
          Oc(this, e.animation, t),
            (t.previousNode = e),
            (n.currentStaggerTime =
              s.currentTime - c + (s.startTime - n.currentTimeline.startTime));
        }
      }
      const Wc = {};
      class Gc {
        constructor(e, t, n, s, r, i, o, a) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = n),
            (this._enterClassName = s),
            (this._leaveClassName = r),
            (this.errors = i),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Wc),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new Jc(this._driver, t, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const n = e;
          let s = this.options;
          null != n.duration && (s.duration = dc(n.duration)),
            null != n.delay && (s.delay = dc(n.delay));
          const r = n.params;
          if (r) {
            let e = s.params;
            e || (e = this.options.params = {}),
              Object.keys(r).forEach((n) => {
                (t && e.hasOwnProperty(n)) || (e[n] = Tc(r[n], e, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const n = (e.params = {});
              Object.keys(t).forEach((e) => {
                n[e] = t[e];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, n) {
          const s = t || this.element,
            r = new Gc(
              this._driver,
              s,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(s, n || 0),
            );
          return (
            (r.previousNode = this.previousNode),
            (r.currentAnimateTimings = this.currentAnimateTimings),
            (r.options = this._copyOptions()),
            r.updateOptions(e),
            (r.currentQueryIndex = this.currentQueryIndex),
            (r.currentQueryTotal = this.currentQueryTotal),
            (r.parentContext = this),
            this.subContextCount++,
            r
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = Wc),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, n) {
          const s = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                e.delay,
              easing: "",
            },
            r = new Yc(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              s,
              e.stretchStartingKeyframe,
            );
          return this.timelines.push(r), s;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, n, s, r, i) {
          let o = [];
          if ((s && o.push(this.element), e.length > 0)) {
            e = (e = e.replace(Kc, "." + this._enterClassName)).replace(
              Qc,
              "." + this._leaveClassName,
            );
            let t = this._driver.query(this.element, e, 1 != n);
            0 !== n &&
              (t = n < 0 ? t.slice(t.length + n, t.length) : t.slice(0, n)),
              o.push(...t);
          }
          return (
            r ||
              0 != o.length ||
              i.push(
                `\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`,
              ),
            o
          );
        }
      }
      class Jc {
        constructor(e, t, n, s) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = s),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles,
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new Jc(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup,
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          (this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((e) => {
              (this._backFill[e] = this._globalTimelineStyles[e] || "*"),
                (this._currentKeyframe[e] = "*");
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, t, n, s) {
          t && (this._previousKeyframe.easing = t);
          const r = (s && s.params) || {},
            i = (function (e, t) {
              const n = {};
              let s;
              return (
                e.forEach((e) => {
                  "*" === e
                    ? ((s = s || Object.keys(t)),
                      s.forEach((e) => {
                        n[e] = "*";
                      }))
                    : yc(e, !1, n);
                }),
                n
              );
            })(e, this._globalTimelineStyles);
          Object.keys(i).forEach((e) => {
            const t = Tc(i[e], r, n);
            (this._pendingStyles[e] = t),
              this._localTimelineStyles.hasOwnProperty(e) ||
                (this._backFill[e] = this._globalTimelineStyles.hasOwnProperty(
                  e,
                )
                  ? this._globalTimelineStyles[e]
                  : "*"),
              this._updateStyle(e, t);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach((t) => {
              this._currentKeyframe[t] = e[t];
            }),
            Object.keys(this._localTimelineStyles).forEach((e) => {
              this._currentKeyframe.hasOwnProperty(e) ||
                (this._currentKeyframe[e] = this._localTimelineStyles[e]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const t = this._localTimelineStyles[e];
            (this._pendingStyles[e] = t), this._updateStyle(e, t);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((t) => {
            const n = this._styleSummary[t],
              s = e._styleSummary[t];
            (!n || s.time > n.time) && this._updateStyle(t, s.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let s = [];
          this._keyframes.forEach((r, i) => {
            const o = yc(r, !0);
            Object.keys(o).forEach((n) => {
              const s = o[n];
              "!" == s ? e.add(n) : "*" == s && t.add(n);
            }),
              n || (o.offset = i / this.duration),
              s.push(o);
          });
          const r = e.size ? Cc(e.values()) : [],
            i = t.size ? Cc(t.values()) : [];
          if (n) {
            const e = s[0],
              t = mc(e);
            (e.offset = 0), (t.offset = 1), (s = [e, t]);
          }
          return zc(
            this.element,
            s,
            r,
            i,
            this.duration,
            this.startTime,
            this.easing,
            !1,
          );
        }
      }
      class Yc extends Jc {
        constructor(e, t, n, s, r, i, o = !1) {
          super(e, t, i.delay),
            (this.element = t),
            (this.keyframes = n),
            (this.preStyleProps = s),
            (this.postStyleProps = r),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: i.duration,
              delay: i.delay,
              easing: i.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: n, easing: s } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const r = [],
              i = n + t,
              o = t / i,
              a = yc(e[0], !1);
            (a.offset = 0), r.push(a);
            const l = yc(e[0], !1);
            (l.offset = Xc(o)), r.push(l);
            const c = e.length - 1;
            for (let s = 1; s <= c; s++) {
              let o = yc(e[s], !1);
              (o.offset = Xc((t + o.offset * n) / i)), r.push(o);
            }
            (n = i), (t = 0), (s = ""), (e = r);
          }
          return zc(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            n,
            t,
            s,
            !0,
          );
        }
      }
      function Xc(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class eu {}
      class tu extends eu {
        normalizePropertyName(e, t) {
          return xc(e);
        }
        normalizeStyleValue(e, t, n, s) {
          let r = "";
          const i = n.toString().trim();
          if (nu[t] && 0 !== n && "0" !== n)
            if ("number" == typeof n) r = "px";
            else {
              const t = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              t &&
                0 == t[1].length &&
                s.push(`Please provide a CSS unit value for ${e}:${n}`);
            }
          return i + r;
        }
      }
      const nu = (() =>
        (function (e) {
          const t = {};
          return e.forEach((e) => (t[e] = !0)), t;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ",",
          ),
        ))();
      function su(e, t, n, s, r, i, o, a, l, c, u, h, d) {
        return {
          type: 0,
          element: e,
          triggerName: t,
          isRemovalTransition: r,
          fromState: n,
          fromStyles: i,
          toState: s,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: h,
          errors: d,
        };
      }
      const ru = {};
      class iu {
        constructor(e, t, n) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = n);
        }
        match(e, t, n, s) {
          return (function (e, t, n, s, r) {
            return e.some((e) => e(t, n, s, r));
          })(this.ast.matchers, e, t, n, s);
        }
        buildStyles(e, t, n) {
          const s = this._stateStyles["*"],
            r = this._stateStyles[e],
            i = s ? s.buildStyles(t, n) : {};
          return r ? r.buildStyles(t, n) : i;
        }
        build(e, t, n, s, r, i, o, a, l, c) {
          const u = [],
            h = (this.ast.options && this.ast.options.params) || ru,
            d = this.buildStyles(n, (o && o.params) || ru, u),
            p = (a && a.params) || ru,
            f = this.buildStyles(s, p, u),
            m = new Set(),
            y = new Map(),
            g = new Map(),
            _ = "void" === s,
            v = { params: Object.assign(Object.assign({}, h), p) },
            b = c ? [] : Uc(e, t, this.ast.animation, r, i, d, f, v, l, u);
          let w = 0;
          if (
            (b.forEach((e) => {
              w = Math.max(e.duration + e.delay, w);
            }),
            u.length)
          )
            return su(t, this._triggerName, n, s, _, d, f, [], [], y, g, w, u);
          b.forEach((e) => {
            const n = e.element,
              s = Jl(y, n, {});
            e.preStyleProps.forEach((e) => (s[e] = !0));
            const r = Jl(g, n, {});
            e.postStyleProps.forEach((e) => (r[e] = !0)), n !== t && m.add(n);
          });
          const E = Cc(m.values());
          return su(t, this._triggerName, n, s, _, d, f, b, E, y, g, w);
        }
      }
      class ou {
        constructor(e, t) {
          (this.styles = e), (this.defaultParams = t);
        }
        buildStyles(e, t) {
          const n = {},
            s = mc(this.defaultParams);
          return (
            Object.keys(e).forEach((t) => {
              const n = e[t];
              null != n && (s[t] = n);
            }),
            this.styles.styles.forEach((e) => {
              if ("string" != typeof e) {
                const r = e;
                Object.keys(r).forEach((e) => {
                  let i = r[e];
                  i.length > 1 && (i = Tc(i, s, t)), (n[e] = i);
                });
              }
            }),
            n
          );
        }
      }
      class au {
        constructor(e, t) {
          (this.name = e),
            (this.ast = t),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach((e) => {
              this.states[e.name] = new ou(
                e.style,
                (e.options && e.options.params) || {},
              );
            }),
            lu(this.states, "true", "1"),
            lu(this.states, "false", "0"),
            t.transitions.forEach((t) => {
              this.transitionFactories.push(new iu(e, t, this.states));
            }),
            (this.fallbackTransition = new iu(
              e,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(e, t) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states,
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, n, s) {
          return (
            this.transitionFactories.find((r) => r.match(e, t, n, s)) || null
          );
        }
        matchStyles(e, t, n) {
          return this.fallbackTransition.buildStyles(e, t, n);
        }
      }
      function lu(e, t, n) {
        e.hasOwnProperty(t)
          ? e.hasOwnProperty(n) || (e[n] = e[t])
          : e.hasOwnProperty(n) && (e[t] = e[n]);
      }
      const cu = new qc();
      class uu {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, t) {
          const n = [],
            s = jc(this._driver, t, n);
          if (n.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${n.join(
                "\n",
              )}`,
            );
          this._animations[e] = s;
        }
        _buildPlayer(e, t, n) {
          const s = e.element,
            r = Ul(0, this._normalizer, 0, e.keyframes, t, n);
          return this._driver.animate(
            s,
            r,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0,
          );
        }
        create(e, t, n = {}) {
          const s = [],
            r = this._animations[e];
          let i;
          const o = new Map();
          if (
            (r
              ? ((i = Uc(
                  this._driver,
                  t,
                  r,
                  "ng-enter",
                  "ng-leave",
                  {},
                  {},
                  n,
                  cu,
                  s,
                )),
                i.forEach((e) => {
                  const t = Jl(o, e.element, {});
                  e.postStyleProps.forEach((e) => (t[e] = null));
                }))
              : (s.push(
                  "The requested animation doesn't exist or has already been destroyed",
                ),
                (i = [])),
            s.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${s.join(
                "\n",
              )}`,
            );
          o.forEach((e, t) => {
            Object.keys(e).forEach((n) => {
              e[n] = this._driver.computeStyle(t, n, "*");
            });
          });
          const a = Ql(
            i.map((e) => {
              const t = o.get(e.element);
              return this._buildPlayer(e, {}, t);
            }),
          );
          return (
            (this._playersById[e] = a),
            a.onDestroy(() => this.destroy(e)),
            this.players.push(a),
            a
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const n = this.players.indexOf(t);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t)
            throw new Error(
              `Unable to find the timeline player referenced by ${e}`,
            );
          return t;
        }
        listen(e, t, n, s) {
          const r = Gl(t, "", "", "");
          return Zl(this._getPlayer(e), n, r, s), () => {};
        }
        command(e, t, n, s) {
          if ("register" == n) return void this.register(e, s[0]);
          if ("create" == n) return void this.create(e, t, s[0] || {});
          const r = this._getPlayer(e);
          switch (n) {
            case "play":
              r.play();
              break;
            case "pause":
              r.pause();
              break;
            case "reset":
              r.reset();
              break;
            case "restart":
              r.restart();
              break;
            case "finish":
              r.finish();
              break;
            case "init":
              r.init();
              break;
            case "setPosition":
              r.setPosition(parseFloat(s[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const hu = [],
        du = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        pu = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class fu {
        constructor(e, t = "") {
          this.namespaceId = t;
          const n = e && e.hasOwnProperty("value");
          if (((this.value = null != (s = n ? e.value : e) ? s : null), n)) {
            const t = mc(e);
            delete t.value, (this.options = t);
          } else this.options = {};
          var s;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const e = this.options.params;
            Object.keys(t).forEach((n) => {
              null == e[n] && (e[n] = t[n]);
            });
          }
        }
      }
      const mu = new fu("void");
      class yu {
        constructor(e, t, n) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            Su(t, this._hostClassName);
        }
        listen(e, t, n, s) {
          if (!this._triggers.hasOwnProperty(t))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${t}" doesn't exist!`,
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${t}" because the provided event is undefined!`,
            );
          if ("start" != (r = n) && "done" != r)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${t}" is not supported!`,
            );
          var r;
          const i = Jl(this._elementListeners, e, []),
            o = { name: t, phase: n, callback: s };
          i.push(o);
          const a = Jl(this._engine.statesByElement, e, {});
          return (
            a.hasOwnProperty(t) ||
              (Su(e, "ng-trigger"), Su(e, "ng-trigger-" + t), (a[t] = mu)),
            () => {
              this._engine.afterFlush(() => {
                const e = i.indexOf(o);
                e >= 0 && i.splice(e, 1), this._triggers[t] || delete a[t];
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`,
            );
          return t;
        }
        trigger(e, t, n, s = !0) {
          const r = this._getTrigger(t),
            i = new _u(this.id, t, e);
          let o = this._engine.statesByElement.get(e);
          o ||
            (Su(e, "ng-trigger"),
            Su(e, "ng-trigger-" + t),
            this._engine.statesByElement.set(e, (o = {})));
          let a = o[t];
          const l = new fu(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              a &&
              l.absorbOptions(a.options),
            (o[t] = l),
            a || (a = mu),
            "void" !== l.value && a.value === l.value)
          ) {
            if (
              !(function (e, t) {
                const n = Object.keys(e),
                  s = Object.keys(t);
                if (n.length != s.length) return !1;
                for (let r = 0; r < n.length; r++) {
                  const s = n[r];
                  if (!t.hasOwnProperty(s) || e[s] !== t[s]) return !1;
                }
                return !0;
              })(a.params, l.params)
            ) {
              const t = [],
                n = r.matchStyles(a.value, a.params, t),
                s = r.matchStyles(l.value, l.params, t);
              t.length
                ? this._engine.reportError(t)
                : this._engine.afterFlush(() => {
                    bc(e, n), vc(e, s);
                  });
            }
            return;
          }
          const c = Jl(this._engine.playersByElement, e, []);
          c.forEach((e) => {
            e.namespaceId == this.id &&
              e.triggerName == t &&
              e.queued &&
              e.destroy();
          });
          let u = r.matchTransition(a.value, l.value, e, l.params),
            h = !1;
          if (!u) {
            if (!s) return;
            (u = r.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: u,
              fromState: a,
              toState: l,
              player: i,
              isFallbackTransition: h,
            }),
            h ||
              (Su(e, "ng-animate-queued"),
              i.onStart(() => {
                Tu(e, "ng-animate-queued");
              })),
            i.onDone(() => {
              let t = this.players.indexOf(i);
              t >= 0 && this.players.splice(t, 1);
              const n = this._engine.playersByElement.get(e);
              if (n) {
                let e = n.indexOf(i);
                e >= 0 && n.splice(e, 1);
              }
            }),
            this.players.push(i),
            c.push(i),
            i
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, n) => {
              delete t[e];
            }),
            this._elementListeners.forEach((t, n) => {
              this._elementListeners.set(
                n,
                t.filter((t) => t.name != e),
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((e) => e.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
          const n = this._engine.driver.query(e, ".ng-trigger", !0);
          n.forEach((e) => {
            if (e.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(e);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(e, t, !1, !0))
              : this.clearElementCache(e);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach((e) => this.clearElementCache(e)),
            );
        }
        triggerLeaveAnimation(e, t, n, s) {
          const r = this._engine.statesByElement.get(e);
          if (r) {
            const i = [];
            if (
              (Object.keys(r).forEach((t) => {
                if (this._triggers[t]) {
                  const n = this.trigger(e, t, "void", s);
                  n && i.push(n);
                }
              }),
              i.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t),
                n && Ql(i).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            n = this._engine.statesByElement.get(e);
          if (t && n) {
            const s = new Set();
            t.forEach((t) => {
              const r = t.name;
              if (s.has(r)) return;
              s.add(r);
              const i = this._triggers[r].fallbackTransition,
                o = n[r] || mu,
                a = new fu("void"),
                l = new _u(this.id, r, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: r,
                  transition: i,
                  fromState: o,
                  toState: a,
                  player: l,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, t) {
          const n = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let s = !1;
          if (n.totalAnimations) {
            const t = n.players.length ? n.playersByQueriedElement.get(e) : [];
            if (t && t.length) s = !0;
            else {
              let t = e;
              for (; (t = t.parentNode); )
                if (n.statesByElement.get(t)) {
                  s = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), s))
            n.markElementAsRemoved(this.id, e, !1, t);
          else {
            const s = e.__ng_removed;
            (s && s !== du) ||
              (n.afterFlush(() => this.clearElementCache(e)),
              n.destroyInnerAnimations(e),
              n._onRemovalComplete(e, t));
          }
        }
        insertNode(e, t) {
          Su(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((n) => {
              const s = n.player;
              if (s.destroyed) return;
              const r = n.element,
                i = this._elementListeners.get(r);
              i &&
                i.forEach((t) => {
                  if (t.name == n.triggerName) {
                    const s = Gl(
                      r,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value,
                    );
                    (s._data = e), Zl(n.player, t.phase, s, t.callback);
                  }
                }),
                s.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      s.destroy();
                    })
                  : t.push(n);
            }),
            (this._queue = []),
            t.sort((e, t) => {
              const n = e.transition.ast.depCount,
                s = t.transition.ast.depCount;
              return 0 == n || 0 == s
                ? n - s
                : this._engine.driver.containsElement(e.element, t.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((e) => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((t) => t.element === e) || t),
            t
          );
        }
      }
      class gu {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (e, t) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((t) => {
                t.queued && e.push(t);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const n = new yu(e, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(n, t)
              : (this.newHostElements.set(t, n), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = n)
          );
        }
        _balanceNamespaceList(e, t) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let s = !1;
            for (let r = n; r >= 0; r--)
              if (
                this.driver.containsElement(
                  this._namespaceList[r].hostElement,
                  t,
                )
              ) {
                this._namespaceList.splice(r + 1, 0, e), (s = !0);
                break;
              }
            s || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e;
        }
        register(e, t) {
          let n = this._namespaceLookup[e];
          return n || (n = this.createNamespace(e, t)), n;
        }
        registerTrigger(e, t, n) {
          let s = this._namespaceLookup[e];
          s && s.register(t, n) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const n = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[e];
            const t = this._namespaceList.indexOf(n);
            t >= 0 && this._namespaceList.splice(t, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            n = this.statesByElement.get(e);
          if (n) {
            const e = Object.keys(n);
            for (let s = 0; s < e.length; s++) {
              const r = n[e[s]].namespaceId;
              if (r) {
                const e = this._fetchNamespace(r);
                e && t.add(e);
              }
            }
          }
          return t;
        }
        trigger(e, t, n, s) {
          if (vu(t)) {
            const r = this._fetchNamespace(e);
            if (r) return r.trigger(t, n, s), !0;
          }
          return !1;
        }
        insertNode(e, t, n, s) {
          if (!vu(t)) return;
          const r = t.__ng_removed;
          if (r && r.setForRemoval) {
            (r.setForRemoval = !1), (r.setForMove = !0);
            const e = this.collectedLeaveElements.indexOf(t);
            e >= 0 && this.collectedLeaveElements.splice(e, 1);
          }
          if (e) {
            const s = this._fetchNamespace(e);
            s && s.insertNode(t, n);
          }
          s && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), Su(e, "ng-animate-disabled"))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), Tu(e, "ng-animate-disabled"));
        }
        removeNode(e, t, n, s) {
          if (vu(t)) {
            const r = e ? this._fetchNamespace(e) : null;
            if (
              (r ? r.removeNode(t, s) : this.markElementAsRemoved(e, t, !1, s),
              n)
            ) {
              const n = this.namespacesByHostElement.get(t);
              n && n.id !== e && n.removeNode(t, s);
            }
          } else this._onRemovalComplete(t, s);
        }
        markElementAsRemoved(e, t, n, s) {
          this.collectedLeaveElements.push(t),
            (t.__ng_removed = {
              namespaceId: e,
              setForRemoval: s,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(e, t, n, s, r) {
          return vu(t) ? this._fetchNamespace(e).listen(t, n, s, r) : () => {};
        }
        _buildInstruction(e, t, n, s, r) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            n,
            s,
            e.fromState.options,
            e.toState.options,
            t,
            r,
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, ".ng-trigger", !0);
          t.forEach((e) => this.destroyActiveAnimationsForElement(e)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, ".ng-animating", !0)),
              t.forEach((e) => this.finishActiveQueriedAnimationOnElement(e)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((e) => {
              e.queued ? (e.markedForDestroy = !0) : e.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((e) => e.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return Ql(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e.__ng_removed;
          if (t && t.setForRemoval) {
            if (((e.__ng_removed = du), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const n = this._fetchNamespace(t.namespaceId);
              n && n.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          this.driver.matchesElement(e, ".ng-animate-disabled") &&
            this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((e) => {
              this.markElementAsDisabled(e, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((e, t) =>
                this._balanceNamespaceList(e, t),
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              Su(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              t = this._flushAnimations(n, e);
            } finally {
              for (let e = 0; e < n.length; e++) n[e]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((e) => e()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const e = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? Ql(t).onDone(() => {
                    e.forEach((e) => e());
                  })
                : e.forEach((e) => e());
          }
        }
        reportError(e) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${e.join(
              "\n",
            )}`,
          );
        }
        _flushAnimations(e, t) {
          const n = new qc(),
            s = [],
            r = new Map(),
            i = [],
            o = new Map(),
            a = new Map(),
            l = new Map(),
            c = new Set();
          this.disabledNodes.forEach((e) => {
            c.add(e);
            const t = this.driver.query(e, ".ng-animate-queued", !0);
            for (let n = 0; n < t.length; n++) c.add(t[n]);
          });
          const u = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = Eu(h, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((e, t) => {
            const n = "ng-enter" + f++;
            p.set(t, n), e.forEach((e) => Su(e, n));
          });
          const m = [],
            y = new Set(),
            g = new Set();
          for (let O = 0; O < this.collectedLeaveElements.length; O++) {
            const e = this.collectedLeaveElements[O],
              t = e.__ng_removed;
            t &&
              t.setForRemoval &&
              (m.push(e),
              y.add(e),
              t.hasAnimation
                ? this.driver
                    .query(e, ".ng-star-inserted", !0)
                    .forEach((e) => y.add(e))
                : g.add(e));
          }
          const _ = new Map(),
            v = Eu(h, Array.from(y));
          v.forEach((e, t) => {
            const n = "ng-leave" + f++;
            _.set(t, n), e.forEach((e) => Su(e, n));
          }),
            e.push(() => {
              d.forEach((e, t) => {
                const n = p.get(t);
                e.forEach((e) => Tu(e, n));
              }),
                v.forEach((e, t) => {
                  const n = _.get(t);
                  e.forEach((e) => Tu(e, n));
                }),
                m.forEach((e) => {
                  this.processLeaveNode(e);
                });
            });
          const b = [],
            w = [];
          for (let O = this._namespaceList.length - 1; O >= 0; O--)
            this._namespaceList[O].drainQueuedTransitions(t).forEach((e) => {
              const t = e.player,
                r = e.element;
              if ((b.push(t), this.collectedEnterElements.length)) {
                const e = r.__ng_removed;
                if (e && e.setForMove) return void t.destroy();
              }
              const c = !u || !this.driver.containsElement(u, r),
                h = _.get(r),
                d = p.get(r),
                f = this._buildInstruction(e, n, d, h, c);
              if (f.errors && f.errors.length) w.push(f);
              else {
                if (c)
                  return (
                    t.onStart(() => bc(r, f.fromStyles)),
                    t.onDestroy(() => vc(r, f.toStyles)),
                    void s.push(t)
                  );
                if (e.isFallbackTransition)
                  return (
                    t.onStart(() => bc(r, f.fromStyles)),
                    t.onDestroy(() => vc(r, f.toStyles)),
                    void s.push(t)
                  );
                f.timelines.forEach((e) => (e.stretchStartingKeyframe = !0)),
                  n.append(r, f.timelines),
                  i.push({ instruction: f, player: t, element: r }),
                  f.queriedElements.forEach((e) => Jl(o, e, []).push(t)),
                  f.preStyleProps.forEach((e, t) => {
                    const n = Object.keys(e);
                    if (n.length) {
                      let e = a.get(t);
                      e || a.set(t, (e = new Set())),
                        n.forEach((t) => e.add(t));
                    }
                  }),
                  f.postStyleProps.forEach((e, t) => {
                    const n = Object.keys(e);
                    let s = l.get(t);
                    s || l.set(t, (s = new Set())), n.forEach((e) => s.add(e));
                  });
              }
            });
          if (w.length) {
            const e = [];
            w.forEach((t) => {
              e.push(`@${t.triggerName} has failed due to:\n`),
                t.errors.forEach((t) => e.push(`- ${t}\n`));
            }),
              b.forEach((e) => e.destroy()),
              this.reportError(e);
          }
          const E = new Map(),
            S = new Map();
          i.forEach((e) => {
            const t = e.element;
            n.has(t) &&
              (S.set(t, t),
              this._beforeAnimationBuild(
                e.player.namespaceId,
                e.instruction,
                E,
              ));
          }),
            s.forEach((e) => {
              const t = e.element;
              this._getPreviousPlayers(
                t,
                !1,
                e.namespaceId,
                e.triggerName,
                null,
              ).forEach((e) => {
                Jl(E, t, []).push(e), e.destroy();
              });
            });
          const T = m.filter((e) => xu(e, a, l)),
            C = new Map();
          wu(C, this.driver, g, l, "*").forEach((e) => {
            xu(e, a, l) && T.push(e);
          });
          const k = new Map();
          d.forEach((e, t) => {
            wu(k, this.driver, new Set(e), a, "!");
          }),
            T.forEach((e) => {
              const t = C.get(e),
                n = k.get(e);
              C.set(e, Object.assign(Object.assign({}, t), n));
            });
          const x = [],
            A = [],
            P = {};
          i.forEach((e) => {
            const { element: t, player: i, instruction: o } = e;
            if (n.has(t)) {
              if (c.has(t))
                return (
                  i.onDestroy(() => vc(t, o.toStyles)),
                  (i.disabled = !0),
                  i.overrideTotalTime(o.totalTime),
                  void s.push(i)
                );
              let e = P;
              if (S.size > 1) {
                let n = t;
                const s = [];
                for (; (n = n.parentNode); ) {
                  const t = S.get(n);
                  if (t) {
                    e = t;
                    break;
                  }
                  s.push(n);
                }
                s.forEach((t) => S.set(t, e));
              }
              const n = this._buildAnimation(i.namespaceId, o, E, r, k, C);
              if ((i.setRealPlayer(n), e === P)) x.push(i);
              else {
                const t = this.playersByElement.get(e);
                t && t.length && (i.parentPlayer = Ql(t)), s.push(i);
              }
            } else
              bc(t, o.fromStyles),
                i.onDestroy(() => vc(t, o.toStyles)),
                A.push(i),
                c.has(t) && s.push(i);
          }),
            A.forEach((e) => {
              const t = r.get(e.element);
              if (t && t.length) {
                const n = Ql(t);
                e.setRealPlayer(n);
              }
            }),
            s.forEach((e) => {
              e.parentPlayer ? e.syncPlayerEvents(e.parentPlayer) : e.destroy();
            });
          for (let O = 0; O < m.length; O++) {
            const e = m[O],
              t = e.__ng_removed;
            if ((Tu(e, "ng-leave"), t && t.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let t = o.get(e);
              t && t.length && n.push(...t);
              let s = this.driver.query(e, ".ng-animating", !0);
              for (let e = 0; e < s.length; e++) {
                let t = o.get(s[e]);
                t && t.length && n.push(...t);
              }
            }
            const s = n.filter((e) => !e.destroyed);
            s.length ? Cu(this, e, s) : this.processLeaveNode(e);
          }
          return (
            (m.length = 0),
            x.forEach((e) => {
              this.players.push(e),
                e.onDone(() => {
                  e.destroy();
                  const t = this.players.indexOf(e);
                  this.players.splice(t, 1);
                }),
                e.play();
            }),
            x
          );
        }
        elementContainsData(e, t) {
          let n = !1;
          const s = t.__ng_removed;
          return (
            s && s.setForRemoval && (n = !0),
            this.playersByElement.has(t) && (n = !0),
            this.playersByQueriedElement.has(t) && (n = !0),
            this.statesByElement.has(t) && (n = !0),
            this._fetchNamespace(e).elementContainsData(t) || n
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, n, s, r) {
          let i = [];
          if (t) {
            const t = this.playersByQueriedElement.get(e);
            t && (i = t);
          } else {
            const t = this.playersByElement.get(e);
            if (t) {
              const e = !r || "void" == r;
              t.forEach((t) => {
                t.queued || ((e || t.triggerName == s) && i.push(t));
              });
            }
          }
          return (
            (n || s) &&
              (i = i.filter(
                (e) =>
                  !((n && n != e.namespaceId) || (s && s != e.triggerName)),
              )),
            i
          );
        }
        _beforeAnimationBuild(e, t, n) {
          const s = t.element,
            r = t.isRemovalTransition ? void 0 : e,
            i = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const o of t.timelines) {
            const e = o.element,
              a = e !== s,
              l = Jl(n, e, []);
            this._getPreviousPlayers(e, a, r, i, t.toState).forEach((e) => {
              const t = e.getRealPlayer();
              t.beforeDestroy && t.beforeDestroy(), e.destroy(), l.push(e);
            });
          }
          bc(s, t.fromStyles);
        }
        _buildAnimation(e, t, n, s, r, i) {
          const o = t.triggerName,
            a = t.element,
            l = [],
            c = new Set(),
            u = new Set(),
            h = t.timelines.map((t) => {
              const h = t.element;
              c.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new Al(t.duration, t.delay);
              const p = h !== a,
                f = (function (e) {
                  const t = [];
                  return ku(e, t), t;
                })((n.get(h) || hu).map((e) => e.getRealPlayer())).filter(
                  (e) => !!e.element && e.element === h,
                ),
                m = r.get(h),
                y = i.get(h),
                g = Ul(0, this._normalizer, 0, t.keyframes, m, y),
                _ = this._buildPlayer(t, g, f);
              if ((t.subTimeline && s && u.add(h), p)) {
                const t = new _u(e, o, h);
                t.setRealPlayer(_), l.push(t);
              }
              return _;
            });
          l.forEach((e) => {
            Jl(this.playersByQueriedElement, e.element, []).push(e),
              e.onDone(() =>
                (function (e, t, n) {
                  let s;
                  if (e instanceof Map) {
                    if (((s = e.get(t)), s)) {
                      if (s.length) {
                        const e = s.indexOf(n);
                        s.splice(e, 1);
                      }
                      0 == s.length && e.delete(t);
                    }
                  } else if (((s = e[t]), s)) {
                    if (s.length) {
                      const e = s.indexOf(n);
                      s.splice(e, 1);
                    }
                    0 == s.length && delete e[t];
                  }
                  return s;
                })(this.playersByQueriedElement, e.element, e),
              );
          }),
            c.forEach((e) => Su(e, "ng-animating"));
          const d = Ql(h);
          return (
            d.onDestroy(() => {
              c.forEach((e) => Tu(e, "ng-animating")), vc(a, t.toStyles);
            }),
            u.forEach((e) => {
              Jl(s, e, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(e, t, n) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                n,
              )
            : new Al(e.duration, e.delay);
        }
      }
      class _u {
        constructor(e, t, n) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = n),
            (this._player = new Al()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((t) => {
              this._queuedCallbacks[t].forEach((n) => Zl(e, t, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          Jl(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function vu(e) {
        return e && 1 === e.nodeType;
      }
      function bu(e, t) {
        const n = e.style.display;
        return (e.style.display = null != t ? t : "none"), n;
      }
      function wu(e, t, n, s, r) {
        const i = [];
        n.forEach((e) => i.push(bu(e)));
        const o = [];
        s.forEach((n, s) => {
          const i = {};
          n.forEach((e) => {
            const n = (i[e] = t.computeStyle(s, e, r));
            (n && 0 != n.length) || ((s.__ng_removed = pu), o.push(s));
          }),
            e.set(s, i);
        });
        let a = 0;
        return n.forEach((e) => bu(e, i[a++])), o;
      }
      function Eu(e, t) {
        const n = new Map();
        if ((e.forEach((e) => n.set(e, [])), 0 == t.length)) return n;
        const s = new Set(t),
          r = new Map();
        function i(e) {
          if (!e) return 1;
          let t = r.get(e);
          if (t) return t;
          const o = e.parentNode;
          return (t = n.has(o) ? o : s.has(o) ? 1 : i(o)), r.set(e, t), t;
        }
        return (
          t.forEach((e) => {
            const t = i(e);
            1 !== t && n.get(t).push(e);
          }),
          n
        );
      }
      function Su(e, t) {
        if (e.classList) e.classList.add(t);
        else {
          let n = e.$$classes;
          n || (n = e.$$classes = {}), (n[t] = !0);
        }
      }
      function Tu(e, t) {
        if (e.classList) e.classList.remove(t);
        else {
          let n = e.$$classes;
          n && delete n[t];
        }
      }
      function Cu(e, t, n) {
        Ql(n).onDone(() => e.processLeaveNode(t));
      }
      function ku(e, t) {
        for (let n = 0; n < e.length; n++) {
          const s = e[n];
          s instanceof Pl ? ku(s.players, t) : t.push(s);
        }
      }
      function xu(e, t, n) {
        const s = n.get(e);
        if (!s) return !1;
        let r = t.get(e);
        return r ? s.forEach((e) => r.add(e)) : t.set(e, s), n.delete(e), !0;
      }
      class Au {
        constructor(e, t, n) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (e, t) => {}),
            (this._transitionEngine = new gu(e, t, n)),
            (this._timelineEngine = new uu(e, t, n)),
            (this._transitionEngine.onRemovalComplete = (e, t) =>
              this.onRemovalComplete(e, t));
        }
        registerTrigger(e, t, n, s, r) {
          const i = e + "-" + s;
          let o = this._triggerCache[i];
          if (!o) {
            const e = [],
              t = jc(this._driver, r, e);
            if (e.length)
              throw new Error(
                `The animation trigger "${s}" has failed to build due to the following errors:\n - ${e.join(
                  "\n - ",
                )}`,
              );
            (o = (function (e, t) {
              return new au(e, t);
            })(s, t)),
              (this._triggerCache[i] = o);
          }
          this._transitionEngine.registerTrigger(t, s, o);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, n, s) {
          this._transitionEngine.insertNode(e, t, n, s);
        }
        onRemove(e, t, n, s) {
          this._transitionEngine.removeNode(e, t, s || !1, n);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, n, s) {
          if ("@" == n.charAt(0)) {
            const [e, r] = Yl(n);
            this._timelineEngine.command(e, t, r, s);
          } else this._transitionEngine.trigger(e, t, n, s);
        }
        listen(e, t, n, s, r) {
          if ("@" == n.charAt(0)) {
            const [e, s] = Yl(n);
            return this._timelineEngine.listen(e, t, s, r);
          }
          return this._transitionEngine.listen(e, t, n, s, r);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players,
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Pu(e, t) {
        let n = null,
          s = null;
        return (
          Array.isArray(t) && t.length
            ? ((n = Iu(t[0])), t.length > 1 && (s = Iu(t[t.length - 1])))
            : t && (n = Iu(t)),
          n || s ? new Ou(e, n, s) : null
        );
      }
      let Ou = (() => {
        class e {
          constructor(t, n, s) {
            (this._element = t),
              (this._startStyles = n),
              (this._endStyles = s),
              (this._state = 0);
            let r = e.initialStylesByElement.get(t);
            r || e.initialStylesByElement.set(t, (r = {})),
              (this._initialStyles = r);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                vc(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (vc(this._element, this._initialStyles),
                this._endStyles &&
                  (vc(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (bc(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (bc(this._element, this._endStyles),
                  (this._endStyles = null)),
                vc(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (e.initialStylesByElement = new WeakMap()), e;
      })();
      function Iu(e) {
        let t = null;
        const n = Object.keys(e);
        for (let s = 0; s < n.length; s++) {
          const r = n[s];
          Du(r) && ((t = t || {}), (t[r] = e[r]));
        }
        return t;
      }
      function Du(e) {
        return "display" === e || "position" === e;
      }
      class Nu {
        constructor(e, t, n, s, r, i, o) {
          (this._element = e),
            (this._name = t),
            (this._duration = n),
            (this._delay = s),
            (this._easing = r),
            (this._fillMode = i),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (e) => this._handleCallback(e));
        }
        apply() {
          !(function (e, t) {
            const n = Vu(e, "").trim();
            n.length &&
              ((function (e, t) {
                let n = 0;
                for (let s = 0; s < e.length; s++) "," === e.charAt(s) && n++;
              })(n),
              (t = `${n}, ${t}`)),
              Hu(e, "", t);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`,
          ),
            ju(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          Fu(this._element, this._name, "paused");
        }
        resume() {
          Fu(this._element, this._name, "running");
        }
        setPosition(e) {
          const t = Mu(this._element, this._name);
          (this._position = e * this._duration),
            Hu(this._element, "Delay", `-${this._position}ms`, t);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(t - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            ju(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (e, t) {
              const n = Vu(e, "").split(","),
                s = Ru(n, t);
              s >= 0 && (n.splice(s, 1), Hu(e, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function Fu(e, t, n) {
        Hu(e, "PlayState", n, Mu(e, t));
      }
      function Mu(e, t) {
        const n = Vu(e, "");
        return n.indexOf(",") > 0 ? Ru(n.split(","), t) : Ru([n], t);
      }
      function Ru(e, t) {
        for (let n = 0; n < e.length; n++) if (e[n].indexOf(t) >= 0) return n;
        return -1;
      }
      function ju(e, t, n) {
        n
          ? e.removeEventListener("animationend", t)
          : e.addEventListener("animationend", t);
      }
      function Hu(e, t, n, s) {
        const r = "animation" + t;
        if (null != s) {
          const t = e.style[r];
          if (t.length) {
            const e = t.split(",");
            (e[s] = n), (n = e.join(","));
          }
        }
        e.style[r] = n;
      }
      function Vu(e, t) {
        return e.style["animation" + t] || "";
      }
      class Lu {
        constructor(e, t, n, s, r, i, o, a) {
          (this.element = e),
            (this.keyframes = t),
            (this.animationName = n),
            (this._duration = s),
            (this._delay = r),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = i || "linear"),
            (this.totalTime = s + r),
            this._buildStyler();
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((e) => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(e) {
          this._styler.setPosition(e);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          (this._state = 0),
            this._styler.destroy(),
            this._buildStyler(),
            this._styler.apply();
        }
        _buildStyler() {
          this._styler = new Nu(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish(),
          );
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              "offset" != n &&
                (e[n] = t ? this._finalStyles[n] : Ic(this.element, n));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class $u extends Al {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = cc(t));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((e) => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((e) =>
              this.element.style.setProperty(e, this._styles[e]),
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((e) => {
              const t = this._startingStyles[e];
              t
                ? this.element.style.setProperty(e, t)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class Bu {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(e) {
          return ic(e);
        }
        matchesElement(e, t) {
          return oc(e, t);
        }
        containsElement(e, t) {
          return ac(e, t);
        }
        query(e, t, n) {
          return lc(e, t, n);
        }
        computeStyle(e, t, n) {
          return window.getComputedStyle(e)[t];
        }
        buildKeyframeElement(e, t, n) {
          n = n.map((e) => cc(e));
          let s = `@keyframes ${t} {\n`,
            r = "";
          n.forEach((e) => {
            r = " ";
            const t = parseFloat(e.offset);
            (s += `${r}${100 * t}% {\n`),
              (r += " "),
              Object.keys(e).forEach((t) => {
                const n = e[t];
                switch (t) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (s += `${r}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (s += `${r}${t}: ${n};\n`);
                }
              }),
              (s += `${r}}\n`);
          }),
            (s += "}\n");
          const i = document.createElement("style");
          return (i.textContent = s), i;
        }
        animate(e, t, n, s, r, i = [], o) {
          const a = i.filter((e) => e instanceof Lu),
            l = {};
          Ac(n, s) &&
            a.forEach((e) => {
              let t = e.currentSnapshot;
              Object.keys(t).forEach((e) => (l[e] = t[e]));
            });
          const c = (function (e) {
            let t = {};
            return (
              e &&
                (Array.isArray(e) ? e : [e]).forEach((e) => {
                  Object.keys(e).forEach((n) => {
                    "offset" != n && "easing" != n && (t[n] = e[n]);
                  });
                }),
              t
            );
          })((t = Pc(e, t, l)));
          if (0 == n) return new $u(e, c);
          const u = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(e, u, t);
          (function (e) {
            var t;
            const n =
              null === (t = e.getRootNode) || void 0 === t ? void 0 : t.call(e);
            return "undefined" != typeof ShadowRoot && n instanceof ShadowRoot
              ? n
              : document.head;
          })(e).appendChild(h);
          const d = Pu(e, t),
            p = new Lu(e, t, u, n, s, r, c, d);
          return (
            p.onDestroy(() => {
              var e;
              (e = h).parentNode.removeChild(e);
            }),
            p
          );
        }
      }
      class zu {
        constructor(e, t, n, s) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = n),
            (this._specialStyles = s),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options,
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, t, n) {
          return e.animate(t, n);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((t) => {
              "offset" != t &&
                (e[t] = this._finished
                  ? this._finalKeyframe[t]
                  : Ic(this.element, t));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((e) => e()), (t.length = 0);
        }
      }
      class qu {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            Ku().toString(),
          )),
            (this._cssKeyframesDriver = new Bu());
        }
        validateStyleProperty(e) {
          return ic(e);
        }
        matchesElement(e, t) {
          return oc(e, t);
        }
        containsElement(e, t) {
          return ac(e, t);
        }
        query(e, t, n) {
          return lc(e, t, n);
        }
        computeStyle(e, t, n) {
          return window.getComputedStyle(e)[t];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, t, n, s, r, i = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, t, n, s, r, i);
          const a = {
            duration: n,
            delay: s,
            fill: 0 == s ? "both" : "forwards",
          };
          r && (a.easing = r);
          const l = {},
            c = i.filter((e) => e instanceof zu);
          Ac(n, s) &&
            c.forEach((e) => {
              let t = e.currentSnapshot;
              Object.keys(t).forEach((e) => (l[e] = t[e]));
            });
          const u = Pu(e, (t = Pc(e, (t = t.map((e) => yc(e, !1))), l)));
          return new zu(e, t, a, u);
        }
      }
      function Ku() {
        return (ql() && Element.prototype.animate) || {};
      }
      let Qu = (() => {
        class e extends wl {
          constructor(e, t) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = e.createRenderer(t.body, {
                id: "0",
                encapsulation: _e.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(e) {
            const t = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(e) ? Sl(e) : e;
            return (
              Wu(this._renderer, null, t, "register", [n]),
              new Uu(t, this._renderer)
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(ii), kn(Zo));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Uu extends class {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new Zu(this._id, e, t || {}, this._renderer);
        }
      }
      class Zu {
        constructor(e, t, n, s) {
          (this.id = e),
            (this.element = t),
            (this._renderer = s),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return Wu(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          var e, t;
          return null !==
            (t =
              null === (e = this._renderer.engine.players[+this.id]) ||
              void 0 === e
                ? void 0
                : e.getPosition()) && void 0 !== t
            ? t
            : 0;
        }
      }
      function Wu(e, t, n, s, r) {
        return e.setProperty(t, `@@${n}:${s}`, r);
      }
      let Gu = (() => {
        class e {
          constructor(e, t, n) {
            (this.delegate = e),
              (this.engine = t),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (t.onRemovalComplete = (e, t) => {
                t && t.parentNode(e) && t.removeChild(e.parentNode, e);
              });
          }
          createRenderer(e, t) {
            const n = this.delegate.createRenderer(e, t);
            if (!(e && t && t.data && t.data.animation)) {
              let e = this._rendererCache.get(n);
              return (
                e ||
                  ((e = new Ju("", n, this.engine)),
                  this._rendererCache.set(n, e)),
                e
              );
            }
            const s = t.id,
              r = t.id + "-" + this._currentId;
            this._currentId++, this.engine.register(r, e);
            const i = (t) => {
              Array.isArray(t)
                ? t.forEach(i)
                : this.engine.registerTrigger(s, r, e, t.name, t);
            };
            return t.data.animation.forEach(i), new Yu(this, r, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(e, t, n) {
            e >= 0 && e < this._microtaskId
              ? this._zone.run(() => t(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((e) => {
                        const [t, n] = e;
                        t(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([t, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(ii), kn(Au), kn(Eo));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ju {
        constructor(e, t, n) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? (e) => t.destroyNode(e)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, n, s = !0) {
          this.delegate.insertBefore(e, t, n),
            this.engine.onInsert(this.namespaceId, t, e, s);
        }
        removeChild(e, t, n) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, n);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, n, s) {
          this.delegate.setAttribute(e, t, n, s);
        }
        removeAttribute(e, t, n) {
          this.delegate.removeAttribute(e, t, n);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, n, s) {
          this.delegate.setStyle(e, t, n, s);
        }
        removeStyle(e, t, n) {
          this.delegate.removeStyle(e, t, n);
        }
        setProperty(e, t, n) {
          "@" == t.charAt(0) && "@.disabled" == t
            ? this.disableAnimations(e, !!n)
            : this.delegate.setProperty(e, t, n);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class Yu extends Ju {
        constructor(e, t, n, s) {
          super(t, n, s), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, n) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && "@.disabled" == t
              ? this.disableAnimations(e, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, e, t.substr(1), n)
            : this.delegate.setProperty(e, t, n);
        }
        listen(e, t, n) {
          if ("@" == t.charAt(0)) {
            const s = (function (e) {
              switch (e) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return e;
              }
            })(e);
            let r = t.substr(1),
              i = "";
            return (
              "@" != r.charAt(0) &&
                ([r, i] = (function (e) {
                  const t = e.indexOf(".");
                  return [e.substring(0, t), e.substr(t + 1)];
                })(r)),
              this.engine.listen(this.namespaceId, s, r, i, (e) => {
                this.factory.scheduleListenerCallback(e._data || -1, n, e);
              })
            );
          }
          return this.delegate.listen(e, t, n);
        }
      }
      let Xu = (() => {
        class e extends Au {
          constructor(e, t, n) {
            super(e.body, t, n);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(kn(Zo), kn(hc), kn(eu));
          }),
          (e.ɵprov = se({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const eh = new yn("AnimationModuleType"),
        th = [
          { provide: wl, useClass: Qu },
          {
            provide: eu,
            useFactory: function () {
              return new tu();
            },
          },
          { provide: Au, useClass: Xu },
          {
            provide: ii,
            useFactory: function (e, t, n) {
              return new Gu(e, t, n);
            },
            deps: [ka, Au, Eo],
          },
        ],
        nh = [
          {
            provide: hc,
            useFactory: function () {
              return "function" == typeof Ku() ? new qu() : new Bu();
            },
          },
          { provide: eh, useValue: "BrowserAnimations" },
          ...th,
        ],
        sh = [
          { provide: hc, useClass: uc },
          { provide: eh, useValue: "NoopAnimations" },
          ...th,
        ];
      let rh = (() => {
          class e {
            static withConfig(t) {
              return { ngModule: e, providers: t.disableAnimations ? sh : nh };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = He({ type: e })),
            (e.ɵinj = re({ providers: nh, imports: [Ha] })),
            e
          );
        })(),
        ih = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = He({ type: e, bootstrap: [zl] })),
            (e.ɵinj = re({ providers: [Il], imports: [[Ha, _l, rh]] })),
            e
          );
        })();
      (function () {
        if (Mo)
          throw new Error("Cannot enable prod mode after platform setup.");
        Fo = !1;
      })(),
        Ra()
          .bootstrapModule(ih)
          .catch((e) => console.error(e));
    },
  },
  function (e) {
    "use strict";
    e((e.s = 4541));
  },
]);
