!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("chart.js"), require("chart.js/helpers")) : "function" == typeof define && define.amd ? define(["exports", "chart.js", "chart.js/helpers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).ChartGeo = {}, e.Chart, e.Chart.helpers)
}
(this, (function (e, t, n) {
        "use strict";
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
        var r = {
            exports: {}
        };
        !function (e, t) {
            !function (e) {
                function t(e, t) {
                    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
                }
                function n(e) {
                    let t = e,
                    n = e;
                    function a(e, t, r, a) {
                        for (null == r && (r = 0), null == a && (a = e.length); r < a; ) {
                            const i = r + a >>> 1;
                            n(e[i], t) < 0 ? r = i + 1 : a = i
                        }
                        return r
                    }
                    function i(e, t, r, a) {
                        for (null == r && (r = 0), null == a && (a = e.length); r < a; ) {
                            const i = r + a >>> 1;
                            n(e[i], t) > 0 ? a = i : r = i + 1
                        }
                        return r
                    }
                    function o(e, n, r, i) {
                        null == r && (r = 0),
                        null == i && (i = e.length);
                        const o = a(e, n, r, i - 1);
                        return o > r && t(e[o - 1], n) > -t(e[o], n) ? o - 1 : o
                    }
                    return 1 === e.length && (t = (t, n) => e(t) - n, n = r(e)), {
                        left: a,
                        center: o,
                        right: i
                    }
                }
                function r(e) {
                    return (n, r) => t(e(n), r)
                }
                function a(e) {
                    return null === e ? NaN : +e
                }
                function  * i(e, t) {
                    if (void 0 === t)
                        for (let t of e)
                            null != t && (t = +t) >= t && (yield t);
                    else {
                        let n = -1;
                        for (let r of e)
                            null != (r = t(r, ++n, e)) && (r = +r) >= r && (yield r)
                    }
                }
                const o = n(t),
                f = o.right,
                c = o.left,
                u = n(a).center;
                function l(e, t) {
                    let n = 0;
                    if (void 0 === t)
                        for (let t of e)
                            null != t && (t = +t) >= t && ++n;
                    else {
                        let r = -1;
                        for (let a of e)
                            null != (a = t(a, ++r, e)) && (a = +a) >= a && ++n
                    }
                    return n
                }
                function s(e) {
                    return 0 | e.length
                }
                function d(e) {
                    return !(e > 0)
                }
                function h(e) {
                    return "object" != typeof e || "length" in e ? e : Array.from(e)
                }
                function b(e) {
                    return t => e(...t)
                }
                function p(...e) {
                    const t = "function" == typeof e[e.length - 1] && b(e.pop()),
                    n = (e = e.map(h)).map(s),
                    r = e.length - 1,
                    a = new Array(r + 1).fill(0),
                    i = [];
                    if (r < 0 || n.some(d))
                        return i;
                    for (; ; ) {
                        i.push(a.map(((t, n) => e[n][t])));
                        let o = r;
                        for (; ++a[o] === n[o]; ) {
                            if (0 === o)
                                return t ? i.map(t) : i;
                            a[o--] = 0
                        }
                    }
                }
                function g(e, t) {
                    var n = 0,
                    r = 0;
                    return Float64Array.from(e, void 0 === t ? e => n += +e || 0 : a => n += +t(a, r++, e) || 0)
                }
                function y(e, t) {
                    return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
                }
                function v(e, t) {
                    let n,
                    r = 0,
                    a = 0,
                    i = 0;
                    if (void 0 === t)
                        for (let t of e)
                            null != t && (t = +t) >= t && (n = t - a, a += n / ++r, i += n * (t - a));
                    else {
                        let o = -1;
                        for (let f of e)
                            null != (f = t(f, ++o, e)) && (f = +f) >= f && (n = f - a, a += n / ++r, i += n * (f - a))
                    }
                    if (r > 1)
                        return i / (r - 1)
                }
                function m(e, t) {
                    const n = v(e, t);
                    return n ? Math.sqrt(n) : n
                }
                function x(e, t) {
                    let n,
                    r;
                    if (void 0 === t)
                        for (const t of e)
                            null != t && (void 0 === n ? t >= t && (n = r = t) : (n > t && (n = t), r < t && (r = t)));
                    else {
                        let a = -1;
                        for (let i of e)
                            null != (i = t(i, ++a, e)) && (void 0 === n ? i >= i && (n = r = i) : (n > i && (n = i), r < i && (r = i)))
                    }
                    return [n, r]
                }
                class w {
                    constructor() {
                        this._partials = new Float64Array(32),
                        this._n = 0
                    }
                    add(e) {
                        const t = this._partials;
                        let n = 0;
                        for (let r = 0; r < this._n && r < 32; r++) {
                            const a = t[r],
                            i = e + a,
                            o = Math.abs(e) < Math.abs(a) ? e - (i - a) : a - (i - e);
                            o && (t[n++] = o),
                            e = i
                        }
                        return t[n] = e,
                        this._n = n + 1,
                        this
                    }
                    valueOf() {
                        const e = this._partials;
                        let t,
                        n,
                        r,
                        a = this._n,
                        i = 0;
                        if (a > 0) {
                            for (i = e[--a]; a > 0 && (t = i, n = e[--a], i = t + n, r = n - (i - t), !r); );
                            a > 0 && (r < 0 && e[a - 1] < 0 || r > 0 && e[a - 1] > 0) && (n = 2 * r, t = i + n, n == t - i && (i = t))
                        }
                        return i
                    }
                }
                function M(e, t) {
                    const n = new w;
                    if (void 0 === t)
                        for (let t of e)
                            (t = +t) && n.add(t);
                    else {
                        let r = -1;
                        for (let a of e)
                            (a = +t(a, ++r, e)) && n.add(a)
                    }
                    return +n
                }
                function S(e, t) {
                    const n = new w;
                    let r = -1;
                    return Float64Array.from(e, void 0 === t ? e => n.add(+e || 0) : a => n.add(+t(a, ++r, e) || 0))
                }
                class E extends Map {
                    constructor(e, t = C) {
                        if (super(), Object.defineProperties(this, {
                                _intern: {
                                    value: new Map
                                },
                                _key: {
                                    value: t
                                }
                            }), null != e)
                            for (const[t, n]of e)
                                this.set(t, n)
                    }
                    get(e) {
                        return super.get(N(this, e))
                    }
                    has(e) {
                        return super.has(N(this, e))
                    }
                    set(e, t) {
                        return super.set(_(this, e), t)
                    }
                    delete (e) {
                        return super.delete(k(this, e))
                    }
                }
                class A extends Set {
                    constructor(e, t = C) {
                        if (super(), Object.defineProperties(this, {
                                _intern: {
                                    value: new Map
                                },
                                _key: {
                                    value: t
                                }
                            }), null != e)
                            for (const t of e)
                                this.add(t)
                    }
                    has(e) {
                        return super.has(N(this, e))
                    }
                    add(e) {
                        return super.add(_(this, e))
                    }
                    delete (e) {
                        return super.delete(k(this, e))
                    }
                }
                function N({
                    _intern: e,
                    _key: t
                }, n) {
                    const r = t(n);
                    return e.has(r) ? e.get(r) : n
                }
                function _({
                    _intern: e,
                    _key: t
                }, n) {
                    const r = t(n);
                    return e.has(r) ? e.get(r) : (e.set(r, n), n)
                }
                function k({
                    _intern: e,
                    _key: t
                }, n) {
                    const r = t(n);
                    return e.has(r) && (n = e.get(n), e.delete(r)),
                    n
                }
                function C(e) {
                    return null !== e && "object" == typeof e ? e.valueOf() : e
                }
                function I(e) {
                    return e
                }
                function P(e, ...t) {
                    return G(e, I, I, t)
                }
                function j(e, ...t) {
                    return G(e, Array.from, I, t)
                }
                function O(e, t, ...n) {
                    return G(e, I, t, n)
                }
                function z(e, t, ...n) {
                    return G(e, Array.from, t, n)
                }
                function D(e, ...t) {
                    return G(e, I, T, t)
                }
                function R(e, ...t) {
                    return G(e, Array.from, T, t)
                }
                function T(e) {
                    if (1 !== e.length)
                        throw new Error("duplicate key");
                    return e[0]
                }
                function G(e, t, n, r) {
                    return function e(a, i) {
                        if (i >= r.length)
                            return n(a);
                        const o = new E,
                        f = r[i++];
                        let c = -1;
                        for (const e of a) {
                            const t = f(e, ++c, a),
                            n = o.get(t);
                            n ? n.push(e) : o.set(t, [e])
                        }
                        for (const[t, n]of o)
                            o.set(t, e(n, i));
                        return t(o)
                    }
                    (e, 0)
                }
                function q(e, t) {
                    return Array.from(t, (t => e[t]))
                }
                function B(e, ...n) {
                    if ("function" != typeof e[Symbol.iterator])
                        throw new TypeError("values is not iterable");
                    e = Array.from(e);
                    let[r = t] = n;
                    if (1 === r.length || n.length > 1) {
                        const a = Uint32Array.from(e, ((e, t) => t));
                        return n.length > 1 ? (n = n.map((t => e.map(t))), a.sort(((e, r) => {
                                    for (const a of n) {
                                        const n = t(a[e], a[r]);
                                        if (n)
                                            return n
                                    }
                                }))) : (r = e.map(r), a.sort(((e, n) => t(r[e], r[n])))),
                        q(e, a)
                    }
                    return e.sort(r)
                }
                function L(e, n, r) {
                    return (1 === n.length ? B(O(e, n, r), (([e, n], [r, a]) => t(n, a) || t(e, r))) : B(P(e, r), (([e, r], [a, i]) => n(r, i) || t(e, a)))).map((([e]) => e))
                }
                var F = Array.prototype.slice;
                function W(e) {
                    return function () {
                        return e
                    }
                }
                var V = Math.sqrt(50),
                $ = Math.sqrt(10),
                H = Math.sqrt(2);
                function Y(e, t, n) {
                    var r,
                    a,
                    i,
                    o,
                    f = -1;
                    if (n = +n, (e = +e) == (t = +t) && n > 0)
                        return [e];
                    if ((r = t < e) && (a = e, e = t, t = a), 0 === (o = X(e, t, n)) || !isFinite(o))
                        return [];
                    if (o > 0) {
                        let n = Math.round(e / o),
                        r = Math.round(t / o);
                        for (n * o < e && ++n, r * o > t && --r, i = new Array(a = r - n + 1); ++f < a; )
                            i[f] = (n + f) * o
                    } else {
                        o = -o;
                        let n = Math.round(e * o),
                        r = Math.round(t * o);
                        for (n / o < e && ++n, r / o > t && --r, i = new Array(a = r - n + 1); ++f < a; )
                            i[f] = (n + f) / o
                    }
                    return r && i.reverse(),
                    i
                }
                function X(e, t, n) {
                    var r = (t - e) / Math.max(0, n),
                    a = Math.floor(Math.log(r) / Math.LN10),
                    i = r / Math.pow(10, a);
                    return a >= 0 ? (i >= V ? 10 : i >= $ ? 5 : i >= H ? 2 : 1) * Math.pow(10, a) : -Math.pow(10, -a) / (i >= V ? 10 : i >= $ ? 5 : i >= H ? 2 : 1)
                }
                function K(e, t, n) {
                    var r = Math.abs(t - e) / Math.max(0, n),
                    a = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                    i = r / a;
                    return i >= V ? a *= 10 : i >= $ ? a *= 5 : i >= H && (a *= 2),
                    t < e ? -a : a
                }
                function U(e, t, n) {
                    let r;
                    for (; ; ) {
                        const a = X(e, t, n);
                        if (a === r || 0 === a || !isFinite(a))
                            return [e, t];
                        a > 0 ? (e = Math.floor(e / a) * a, t = Math.ceil(t / a) * a) : a < 0 && (e = Math.ceil(e * a) / a, t = Math.floor(t * a) / a),
                        r = a
                    }
                }
                function Q(e) {
                    return Math.ceil(Math.log(l(e)) / Math.LN2) + 1
                }
                function Z() {
                    var e = I,
                    t = x,
                    n = Q;
                    function r(r) {
                        Array.isArray(r) || (r = Array.from(r));
                        var a,
                        i,
                        o = r.length,
                        c = new Array(o);
                        for (a = 0; a < o; ++a)
                            c[a] = e(r[a], a, r);
                        var u = t(c),
                        l = u[0],
                        s = u[1],
                        d = n(c, l, s);
                        if (!Array.isArray(d)) {
                            const e = s,
                            n = +d;
                            if (t === x && ([l, s] = U(l, s, n)), (d = Y(l, s, n))[d.length - 1] >= s)
                                if (e >= s && t === x) {
                                    const e = X(l, s, n);
                                    isFinite(e) && (e > 0 ? s = (Math.floor(s / e) + 1) * e : e < 0 && (s = (Math.ceil(s * -e) + 1) / -e))
                                } else
                                    d.pop()
                        }
                        for (var h = d.length; d[0] <= l; )
                            d.shift(), --h;
                        for (; d[h - 1] > s; )
                            d.pop(), --h;
                        var b,
                        p = new Array(h + 1);
                        for (a = 0; a <= h; ++a)
                            (b = p[a] = []).x0 = a > 0 ? d[a - 1] : l, b.x1 = a < h ? d[a] : s;
                        for (a = 0; a < o; ++a)
                            l <= (i = c[a]) && i <= s && p[f(d, i, 0, h)].push(r[a]);
                        return p
                    }
                    return r.value = function (t) {
                        return arguments.length ? (e = "function" == typeof t ? t : W(t), r) : e
                    },
                    r.domain = function (e) {
                        return arguments.length ? (t = "function" == typeof e ? e : W([e[0], e[1]]), r) : t
                    },
                    r.thresholds = function (e) {
                        return arguments.length ? (n = "function" == typeof e ? e : Array.isArray(e) ? W(F.call(e)) : W(e), r) : n
                    },
                    r
                }
                function J(e, t) {
                    let n;
                    if (void 0 === t)
                        for (const t of e)
                            null != t && (n < t || void 0 === n && t >= t) && (n = t);
                    else {
                        let r = -1;
                        for (let a of e)
                            null != (a = t(a, ++r, e)) && (n < a || void 0 === n && a >= a) && (n = a)
                    }
                    return n
                }
                function ee(e, t) {
                    let n;
                    if (void 0 === t)
                        for (const t of e)
                            null != t && (n > t || void 0 === n && t >= t) && (n = t);
                    else {
                        let r = -1;
                        for (let a of e)
                            null != (a = t(a, ++r, e)) && (n > a || void 0 === n && a >= a) && (n = a)
                    }
                    return n
                }
                function te(e, n, r = 0, a = e.length - 1, i = t) {
                    for (; a > r; ) {
                        if (a - r > 600) {
                            const t = a - r + 1,
                            o = n - r + 1,
                            f = Math.log(t),
                            c = .5 * Math.exp(2 * f / 3),
                            u = .5 * Math.sqrt(f * c * (t - c) / t) * (o - t / 2 < 0 ? -1 : 1);
                            te(e, n, Math.max(r, Math.floor(n - o * c / t + u)), Math.min(a, Math.floor(n + (t - o) * c / t + u)), i)
                        }
                        const t = e[n];
                        let o = r,
                        f = a;
                        for (ne(e, r, n), i(e[a], t) > 0 && ne(e, r, a); o < f; ) {
                            for (ne(e, o, f), ++o, --f; i(e[o], t) < 0; )
                                ++o;
                            for (; i(e[f], t) > 0; )
                                --f
                        }
                        0 === i(e[r], t) ? ne(e, r, f) : (++f, ne(e, f, a)),
                        f <= n && (r = f + 1),
                        n <= f && (a = f - 1)
                    }
                    return e
                }
                function ne(e, t, n) {
                    const r = e[t];
                    e[t] = e[n],
                    e[n] = r
                }
                function re(e, t, n) {
                    if (r = (e = Float64Array.from(i(e, n))).length) {
                        if ((t = +t) <= 0 || r < 2)
                            return ee(e);
                        if (t >= 1)
                            return J(e);
                        var r,
                        a = (r - 1) * t,
                        o = Math.floor(a),
                        f = J(te(e, o).subarray(0, o + 1));
                        return f + (ee(e.subarray(o + 1)) - f) * (a - o)
                    }
                }
                function ae(e, t, n = a) {
                    if (r = e.length) {
                        if ((t = +t) <= 0 || r < 2)
                            return +n(e[0], 0, e);
                        if (t >= 1)
                            return +n(e[r - 1], r - 1, e);
                        var r,
                        i = (r - 1) * t,
                        o = Math.floor(i),
                        f = +n(e[o], o, e);
                        return f + (+n(e[o + 1], o + 1, e) - f) * (i - o)
                    }
                }
                function ie(e, t, n) {
                    return Math.ceil((n - t) / (2 * (re(e, .75) - re(e, .25)) * Math.pow(l(e), -1 / 3)))
                }
                function oe(e, t, n) {
                    return Math.ceil((n - t) / (3.5 * m(e) * Math.pow(l(e), -1 / 3)))
                }
                function fe(e, t) {
                    let n,
                    r = -1,
                    a = -1;
                    if (void 0 === t)
                        for (const t of e)
                            ++a, null != t && (n < t || void 0 === n && t >= t) && (n = t, r = a);
                    else
                        for (let i of e)
                            null != (i = t(i, ++a, e)) && (n < i || void 0 === n && i >= i) && (n = i, r = a);
                    return r
                }
                function ce(e, t) {
                    let n = 0,
                    r = 0;
                    if (void 0 === t)
                        for (let t of e)
                            null != t && (t = +t) >= t && (++n, r += t);
                    else {
                        let a = -1;
                        for (let i of e)
                            null != (i = t(i, ++a, e)) && (i = +i) >= i && (++n, r += i)
                    }
                    if (n)
                        return r / n
                }
                function ue(e, t) {
                    return re(e, .5, t)
                }
                function  * le(e) {
                    for (const t of e)
                        yield * t
                }
                function se(e) {
                    return Array.from(le(e))
                }
                function de(e, t) {
                    let n,
                    r = -1,
                    a = -1;
                    if (void 0 === t)
                        for (const t of e)
                            ++a, null != t && (n > t || void 0 === n && t >= t) && (n = t, r = a);
                    else
                        for (let i of e)
                            null != (i = t(i, ++a, e)) && (n > i || void 0 === n && i >= i) && (n = i, r = a);
                    return r
                }
                function he(e, t = be) {
                    const n = [];
                    let r,
                    a = !1;
                    for (const i of e)
                        a && n.push(t(r, i)), r = i, a = !0;
                    return n
                }
                function be(e, t) {
                    return [e, t]
                }
                function pe(e, t, n) {
                    e = +e,
                    t = +t,
                    n = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +n;
                    for (var r = -1, a = 0 | Math.max(0, Math.ceil((t - e) / n)), i = new Array(a); ++r < a; )
                        i[r] = e + r * n;
                    return i
                }
                function ge(e, n = t) {
                    let r,
                    a = !1;
                    if (1 === n.length) {
                        let i;
                        for (const o of e) {
                            const e = n(o);
                            (a ? t(e, i) < 0 : 0 === t(e, e)) && (r = o, i = e, a = !0)
                        }
                    } else
                        for (const t of e)
                            (a ? n(t, r) < 0 : 0 === n(t, t)) && (r = t, a = !0);
                    return r
                }
                function ye(e, n = t) {
                    if (1 === n.length)
                        return de(e, n);
                    let r,
                    a = -1,
                    i = -1;
                    for (const t of e)
                        ++i, (a < 0 ? 0 === n(t, t) : n(t, r) < 0) && (r = t, a = i);
                    return a
                }
                function ve(e, n = t) {
                    let r,
                    a = !1;
                    if (1 === n.length) {
                        let i;
                        for (const o of e) {
                            const e = n(o);
                            (a ? t(e, i) > 0 : 0 === t(e, e)) && (r = o, i = e, a = !0)
                        }
                    } else
                        for (const t of e)
                            (a ? n(t, r) > 0 : 0 === n(t, t)) && (r = t, a = !0);
                    return r
                }
                function me(e, n = t) {
                    if (1 === n.length)
                        return fe(e, n);
                    let r,
                    a = -1,
                    i = -1;
                    for (const t of e)
                        ++i, (a < 0 ? 0 === n(t, t) : n(t, r) > 0) && (r = t, a = i);
                    return a
                }
                function xe(e, t) {
                    const n = ye(e, t);
                    return n < 0 ? void 0 : n
                }
                var we = Me(Math.random);
                function Me(e) {
                    return function (t, n = 0, r = t.length) {
                        let a = r - (n = +n);
                        for (; a; ) {
                            const r = e() * a-- | 0,
                            i = t[a + n];
                            t[a + n] = t[r + n],
                            t[r + n] = i
                        }
                        return t
                    }
                }
                function Se(e, t) {
                    let n = 0;
                    if (void 0 === t)
                        for (let t of e)
                            (t = +t) && (n += t);
                    else {
                        let r = -1;
                        for (let a of e)
                            (a = +t(a, ++r, e)) && (n += a)
                    }
                    return n
                }
                function Ee(e) {
                    if (!(a = e.length))
                        return [];
                    for (var t = -1, n = ee(e, Ae), r = new Array(n); ++t < n; )
                        for (var a, i = -1, o = r[t] = new Array(a); ++i < a; )
                            o[i] = e[i][t];
                    return r
                }
                function Ae(e) {
                    return e.length
                }
                function Ne() {
                    return Ee(arguments)
                }
                function _e(e, t) {
                    if ("function" != typeof t)
                        throw new TypeError("test is not a function");
                    let n = -1;
                    for (const r of e)
                        if (!t(r, ++n, e))
                            return !1;
                    return !0
                }
                function ke(e, t) {
                    if ("function" != typeof t)
                        throw new TypeError("test is not a function");
                    let n = -1;
                    for (const r of e)
                        if (t(r, ++n, e))
                            return !0;
                    return !1
                }
                function Ce(e, t) {
                    if ("function" != typeof t)
                        throw new TypeError("test is not a function");
                    const n = [];
                    let r = -1;
                    for (const a of e)
                        t(a, ++r, e) && n.push(a);
                    return n
                }
                function Ie(e, t) {
                    if ("function" != typeof e[Symbol.iterator])
                        throw new TypeError("values is not iterable");
                    if ("function" != typeof t)
                        throw new TypeError("mapper is not a function");
                    return Array.from(e, ((n, r) => t(n, r, e)))
                }
                function Pe(e, t, n) {
                    if ("function" != typeof t)
                        throw new TypeError("reducer is not a function");
                    const r = e[Symbol.iterator]();
                    let a,
                    i,
                    o = -1;
                    if (arguments.length < 3) {
                        if (({
                                done: a,
                                value: n
                            } = r.next()), a)
                            return;
                        ++o
                    }
                    for (; ({
                            done: a,
                            value: i
                        } = r.next()), !a; )
                        n = t(n, i, ++o, e);
                    return n
                }
                function je(e) {
                    if ("function" != typeof e[Symbol.iterator])
                        throw new TypeError("values is not iterable");
                    return Array.from(e).reverse()
                }
                function Oe(e, ...t) {
                    e = new Set(e);
                    for (const n of t)
                        for (const t of n)
                            e.delete(t);
                    return e
                }
                function ze(e, t) {
                    const n = t[Symbol.iterator](),
                    r = new Set;
                    for (const t of e) {
                        if (r.has(t))
                            return !1;
                        let e,
                        a;
                        for (; ({
                                value: e,
                                done: a
                            } = n.next()) && !a; ) {
                            if (Object.is(t, e))
                                return !1;
                            r.add(e)
                        }
                    }
                    return !0
                }
                function De(e) {
                    return e instanceof Set ? e : new Set(e)
                }
                function Re(e, ...t) {
                    e = new Set(e),
                    t = t.map(De);
                    e: for (const n of e)
                        for (const r of t)
                            if (!r.has(n)) {
                                e.delete(n);
                                continue e
                            }
                    return e
                }
                function Te(e, t) {
                    const n = e[Symbol.iterator](),
                    r = new Set;
                    for (const e of t) {
                        if (r.has(e))
                            continue;
                        let t,
                        a;
                        for (; ({
                                value: t,
                                done: a
                            } = n.next()); ) {
                            if (a)
                                return !1;
                            if (r.add(t), Object.is(e, t))
                                break
                        }
                    }
                    return !0
                }
                function Ge(e, t) {
                    return Te(t, e)
                }
                function qe(...e) {
                    const t = new Set;
                    for (const n of e)
                        for (const e of n)
                            t.add(e);
                    return t
                }
                e.Adder = w,
                e.InternMap = E,
                e.InternSet = A,
                e.ascending = t,
                e.bin = Z,
                e.bisect = f,
                e.bisectCenter = u,
                e.bisectLeft = c,
                e.bisectRight = f,
                e.bisector = n,
                e.count = l,
                e.cross = p,
                e.cumsum = g,
                e.descending = y,
                e.deviation = m,
                e.difference = Oe,
                e.disjoint = ze,
                e.every = _e,
                e.extent = x,
                e.fcumsum = S,
                e.filter = Ce,
                e.fsum = M,
                e.greatest = ve,
                e.greatestIndex = me,
                e.group = P,
                e.groupSort = L,
                e.groups = j,
                e.histogram = Z,
                e.index = D,
                e.indexes = R,
                e.intersection = Re,
                e.least = ge,
                e.leastIndex = ye,
                e.map = Ie,
                e.max = J,
                e.maxIndex = fe,
                e.mean = ce,
                e.median = ue,
                e.merge = se,
                e.min = ee,
                e.minIndex = de,
                e.nice = U,
                e.pairs = he,
                e.permute = q,
                e.quantile = re,
                e.quantileSorted = ae,
                e.quickselect = te,
                e.range = pe,
                e.reduce = Pe,
                e.reverse = je,
                e.rollup = O,
                e.rollups = z,
                e.scan = xe,
                e.shuffle = we,
                e.shuffler = Me,
                e.some = ke,
                e.sort = B,
                e.subset = Ge,
                e.sum = Se,
                e.superset = Te,
                e.thresholdFreedmanDiaconis = ie,
                e.thresholdScott = oe,
                e.thresholdSturges = Q,
                e.tickIncrement = X,
                e.tickStep = K,
                e.ticks = Y,
                e.transpose = Ee,
                e.union = qe,
                e.variance = v,
                e.zip = Ne,
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }
            (t)
        }
        (0, r.exports);
        var a = 1e-6,
        i = 1e-12,
        o = Math.PI,
        f = o / 2,
        c = o / 4,
        u = 2 * o,
        l = 180 / o,
        s = o / 180,
        d = Math.abs,
        h = Math.atan,
        b = Math.atan2,
        p = Math.cos,
        g = Math.ceil,
        y = Math.exp,
        v = Math.log,
        m = Math.pow,
        x = Math.sin,
        w = Math.sign || function (e) {
            return e > 0 ? 1 : e < 0 ? -1 : 0
        },
        M = Math.sqrt,
        S = Math.tan;
        function E(e) {
            return e > 1 ? 0 : e < -1 ? o : Math.acos(e)
        }
        function A(e) {
            return e > 1 ? f : e < -1 ? -f : Math.asin(e)
        }
        function N() {}
        function _(e, t) {
            e && C.hasOwnProperty(e.type) && C[e.type](e, t)
        }
        var k = {
            Feature: function (e, t) {
                _(e.geometry, t)
            },
            FeatureCollection: function (e, t) {
                for (var n = e.features, r = -1, a = n.length; ++r < a; )
                    _(n[r].geometry, t)
            }
        },
        C = {
            Sphere: function (e, t) {
                t.sphere()
            },
            Point: function (e, t) {
                e = e.coordinates,
                t.point(e[0], e[1], e[2])
            },
            MultiPoint: function (e, t) {
                for (var n = e.coordinates, r = -1, a = n.length; ++r < a; )
                    e = n[r], t.point(e[0], e[1], e[2])
            },
            LineString: function (e, t) {
                I(e.coordinates, t, 0)
            },
            MultiLineString: function (e, t) {
                for (var n = e.coordinates, r = -1, a = n.length; ++r < a; )
                    I(n[r], t, 0)
            },
            Polygon: function (e, t) {
                P(e.coordinates, t)
            },
            MultiPolygon: function (e, t) {
                for (var n = e.coordinates, r = -1, a = n.length; ++r < a; )
                    P(n[r], t)
            },
            GeometryCollection: function (e, t) {
                for (var n = e.geometries, r = -1, a = n.length; ++r < a; )
                    _(n[r], t)
            }
        };
        function I(e, t, n) {
            var r,
            a = -1,
            i = e.length - n;
            for (t.lineStart(); ++a < i; )
                r = e[a], t.point(r[0], r[1], r[2]);
            t.lineEnd()
        }
        function P(e, t) {
            var n = -1,
            r = e.length;
            for (t.polygonStart(); ++n < r; )
                I(e[n], t, 1);
            t.polygonEnd()
        }
        function j(e, t) {
            e && k.hasOwnProperty(e.type) ? k[e.type](e, t) : _(e, t)
        }
        function O(e) {
            return [b(e[1], e[0]), A(e[2])]
        }
        function z(e) {
            var t = e[0],
            n = e[1],
            r = p(n);
            return [r * p(t), r * x(t), x(n)]
        }
        function D(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }
        function R(e, t) {
            return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]]
        }
        function T(e, t) {
            e[0] += t[0],
            e[1] += t[1],
            e[2] += t[2]
        }
        function G(e, t) {
            return [e[0] * t, e[1] * t, e[2] * t]
        }
        function q(e) {
            var t = M(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
            e[0] /= t,
            e[1] /= t,
            e[2] /= t
        }
        function B(e, t) {
            function n(n, r) {
                return n = e(n, r),
                t(n[0], n[1])
            }
            return e.invert && t.invert && (n.invert = function (n, r) {
                return (n = t.invert(n, r)) && e.invert(n[0], n[1])
            }),
            n
        }
        function L(e, t) {
            return [d(e) > o ? e + Math.round(-e / u) * u : e, t]
        }
        function F(e, t, n) {
            return (e %= u) ? t || n ? B(V(e), $(t, n)) : V(e) : t || n ? $(t, n) : L
        }
        function W(e) {
            return function (t, n) {
                return [(t += e) > o ? t - u : t < -o ? t + u : t, n]
            }
        }
        function V(e) {
            var t = W(e);
            return t.invert = W(-e),
            t
        }
        function $(e, t) {
            var n = p(e),
            r = x(e),
            a = p(t),
            i = x(t);
            function o(e, t) {
                var o = p(t),
                f = p(e) * o,
                c = x(e) * o,
                u = x(t),
                l = u * n + f * r;
                return [b(c * a - l * i, f * n - u * r), A(l * a + c * i)]
            }
            return o.invert = function (e, t) {
                var o = p(t),
                f = p(e) * o,
                c = x(e) * o,
                u = x(t),
                l = u * a - c * i;
                return [b(c * a + u * i, f * n + l * r), A(l * n - f * r)]
            },
            o
        }
        function H(e, t) {
            (t = z(t))[0] -= e,
            q(t);
            var n = E(-t[1]);
            return ((-t[2] < 0 ? -n : n) + u - a) % u
        }
        function Y() {
            var e,
            t = [];
            return {
                point: function (t, n, r) {
                    e.push([t, n, r])
                },
                lineStart: function () {
                    t.push(e = [])
                },
                lineEnd: N,
                rejoin: function () {
                    t.length > 1 && t.push(t.pop().concat(t.shift()))
                },
                result: function () {
                    var n = t;
                    return t = [],
                    e = null,
                    n
                }
            }
        }
        function X(e, t) {
            return d(e[0] - t[0]) < a && d(e[1] - t[1]) < a
        }
        function K(e, t, n, r) {
            this.x = e,
            this.z = t,
            this.o = n,
            this.e = r,
            this.v = !1,
            this.n = this.p = null
        }
        function U(e, t, n, r, a) {
            var i,
            o,
            f = [],
            c = [];
            if (e.forEach((function (e) {
                        if (!((t = e.length - 1) <= 0)) {
                            var t,
                            n,
                            r = e[0],
                            o = e[t];
                            if (X(r, o)) {
                                if (!r[2] && !o[2]) {
                                    for (a.lineStart(), i = 0; i < t; ++i)
                                        a.point((r = e[i])[0], r[1]);
                                        return void a.lineEnd()
                                    }
                                    o[0] += 2e-6
                                }
                                f.push(n = new K(r, e, null, !0)),
                                c.push(n.o = new K(r, null, n, !1)),
                                f.push(n = new K(o, e, null, !1)),
                                c.push(n.o = new K(o, null, n, !0))
                            }
                        })), f.length) {
                    for (c.sort(t), Q(f), Q(c), i = 0, o = c.length; i < o; ++i)
                        c[i].e = n = !n;
                    for (var u, l, s = f[0]; ; ) {
                        for (var d = s, h = !0; d.v; )
                            if ((d = d.n) === s)
                                return;
                        u = d.z,
                        a.lineStart();
                        do {
                            if (d.v = d.o.v = !0, d.e) {
                                if (h)
                                    for (i = 0, o = u.length; i < o; ++i)
                                        a.point((l = u[i])[0], l[1]);
                                else
                                    r(d.x, d.n.x, 1, a);
                                d = d.n
                            } else {
                                if (h)
                                    for (u = d.p.z, i = u.length - 1; i >= 0; --i)
                                        a.point((l = u[i])[0], l[1]);
                                else
                                    r(d.x, d.p.x, -1, a);
                                d = d.p
                            }
                            u = (d = d.o).z,
                            h = !h
                        } while (!d.v);
                        a.lineEnd()
                    }
                }
        }
        function Q(e) {
            if (t = e.length) {
                for (var t, n, r = 0, a = e[0]; ++r < t; )
                    a.n = n = e[r], n.p = a, a = n;
                a.n = n = e[0],
                n.p = a
            }
        }
        function Z(e) {
            return d(e[0]) <= o ? e[0] : w(e[0]) * ((d(e[0]) + o) % u - o)
        }
        function J(e, t) {
            var n = Z(t),
            i = t[1],
            l = x(i),
            s = [x(n), -p(n), 0],
            d = 0,
            h = 0,
            g = new r.exports.Adder;
            1 === l ? i = f + a : -1 === l && (i = -f - a);
            for (var y = 0, v = e.length; y < v; ++y)
                if (w = (m = e[y]).length)
                    for (var m, w, M = m[w - 1], S = Z(M), E = M[1] / 2 + c, N = x(E), _ = p(E), k = 0; k < w; ++k, S = I, N = j, _ = O, M = C) {
                        var C = m[k],
                        I = Z(C),
                        P = C[1] / 2 + c,
                        j = x(P),
                        O = p(P),
                        D = I - S,
                        T = D >= 0 ? 1 : -1,
                        G = T * D,
                        B = G > o,
                        L = N * j;
                        if (g.add(b(L * T * x(G), _ * O + L * p(G))), d += B ? D + T * u : D, B ^ S >= n ^ I >= n) {
                            var F = R(z(M), z(C));
                            q(F);
                            var W = R(s, F);
                            q(W);
                            var V = (B ^ D >= 0 ? -1 : 1) * A(W[2]);
                            (i > V || i === V && (F[0] || F[1])) && (h += B ^ D >= 0 ? 1 : -1)
                        }
                    }
            return (d < -a || d < a && g < -1e-12) ^ 1 & h
        }
        function ee(e, t, n, a) {
            return function (i) {
                var o,
                f,
                c,
                u = t(i),
                l = Y(),
                s = t(l),
                d = !1,
                h = {
                    point: b,
                    lineStart: g,
                    lineEnd: y,
                    polygonStart: function () {
                        h.point = v,
                        h.lineStart = m,
                        h.lineEnd = x,
                        f = [],
                        o = []
                    },
                    polygonEnd: function () {
                        h.point = b,
                        h.lineStart = g,
                        h.lineEnd = y,
                        f = r.exports.merge(f);
                        var e = J(o, a);
                        f.length ? (d || (i.polygonStart(), d = !0), U(f, ne, e, n, i)) : e && (d || (i.polygonStart(), d = !0), i.lineStart(), n(null, null, 1, i), i.lineEnd()),
                        d && (i.polygonEnd(), d = !1),
                        f = o = null
                    },
                    sphere: function () {
                        i.polygonStart(),
                        i.lineStart(),
                        n(null, null, 1, i),
                        i.lineEnd(),
                        i.polygonEnd()
                    }
                };
                function b(t, n) {
                    e(t, n) && i.point(t, n)
                }
                function p(e, t) {
                    u.point(e, t)
                }
                function g() {
                    h.point = p,
                    u.lineStart()
                }
                function y() {
                    h.point = b,
                    u.lineEnd()
                }
                function v(e, t) {
                    c.push([e, t]),
                    s.point(e, t)
                }
                function m() {
                    s.lineStart(),
                    c = []
                }
                function x() {
                    v(c[0][0], c[0][1]),
                    s.lineEnd();
                    var e,
                    t,
                    n,
                    r,
                    a = s.clean(),
                    u = l.result(),
                    h = u.length;
                    if (c.pop(), o.push(c), c = null, h)
                        if (1 & a) {
                            if ((t = (n = u[0]).length - 1) > 0) {
                                for (d || (i.polygonStart(), d = !0), i.lineStart(), e = 0; e < t; ++e)
                                    i.point((r = n[e])[0], r[1]);
                                i.lineEnd()
                            }
                        } else
                            h > 1 && 2 & a && u.push(u.pop().concat(u.shift())), f.push(u.filter(te))
                }
                return h
            }
        }
        function te(e) {
            return e.length > 1
        }
        function ne(e, t) {
            return ((e = e.x)[0] < 0 ? e[1] - f - a : f - e[1]) - ((t = t.x)[0] < 0 ? t[1] - f - a : f - t[1])
        }
        L.invert = L;
        var re = ee((function () {
                    return !0
                }), (function (e) {
                    var t,
                    n = NaN,
                    r = NaN,
                    i = NaN;
                    return {
                        lineStart: function () {
                            e.lineStart(),
                            t = 1
                        },
                        point: function (c, u) {
                            var l = c > 0 ? o : -o,
                            s = d(c - n);
                            d(s - o) < a ? (e.point(n, r = (r + u) / 2 > 0 ? f : -f), e.point(i, r), e.lineEnd(), e.lineStart(), e.point(l, r), e.point(c, r), t = 0) : i !== l && s >= o && (d(n - i) < a && (n -= i * a), d(c - l) < a && (c -= l * a), r = function (e, t, n, r) {
                                var i,
                                o,
                                f = x(e - n);
                                return d(f) > a ? h((x(t) * (o = p(r)) * x(n) - x(r) * (i = p(t)) * x(e)) / (i * o * f)) : (t + r) / 2
                            }
                                (n, r, c, u), e.point(i, r), e.lineEnd(), e.lineStart(), e.point(l, r), t = 0),
                            e.point(n = c, r = u),
                            i = l
                        },
                        lineEnd: function () {
                            e.lineEnd(),
                            n = r = NaN
                        },
                        clean: function () {
                            return 2 - t
                        }
                    }
                }), (function (e, t, n, r) {
                    var i;
                    if (null == e)
                        i = n * f, r.point(-o, i), r.point(0, i), r.point(o, i), r.point(o, 0), r.point(o, -i), r.point(0, -i), r.point(-o, -i), r.point(-o, 0), r.point(-o, i);
                    else if (d(e[0] - t[0]) > a) {
                        var c = e[0] < t[0] ? o : -o;
                        i = n * c / 2,
                        r.point(-c, i),
                        r.point(0, i),
                        r.point(c, i)
                    } else
                        r.point(t[0], t[1])
                }), [-o, -f]);
        function ae(e) {
            var t = p(e),
            n = 6 * s,
            r = t > 0,
            i = d(t) > a;
            function f(e, n) {
                return p(e) * p(n) > t
            }
            function c(e, n, r) {
                var i = [1, 0, 0],
                f = R(z(e), z(n)),
                c = D(f, f),
                u = f[0],
                l = c - u * u;
                if (!l)
                    return !r && e;
                var s = t * c / l,
                h = -t * u / l,
                b = R(i, f),
                p = G(i, s);
                T(p, G(f, h));
                var g = b,
                y = D(p, g),
                v = D(g, g),
                m = y * y - v * (D(p, p) - 1);
                if (!(m < 0)) {
                    var x = M(m),
                    w = G(g, (-y - x) / v);
                    if (T(w, p), w = O(w), !r)
                        return w;
                    var S,
                    E = e[0],
                    A = n[0],
                    N = e[1],
                    _ = n[1];
                    A < E && (S = E, E = A, A = S);
                    var k = A - E,
                    C = d(k - o) < a;
                    if (!C && _ < N && (S = N, N = _, _ = S), C || k < a ? C ? N + _ > 0 ^ w[1] < (d(w[0] - E) < a ? N : _) : N <= w[1] && w[1] <= _ : k > o ^ (E <= w[0] && w[0] <= A)) {
                        var I = G(g, (-y + x) / v);
                        return T(I, p),
                        [w, O(I)]
                    }
                }
            }
            function l(t, n) {
                var a = r ? e : o - e,
                i = 0;
                return t < -a ? i |= 1 : t > a && (i |= 2),
                n < -a ? i |= 4 : n > a && (i |= 8),
                i
            }
            return ee(f, (function (e) {
                    var t,
                    n,
                    a,
                    u,
                    s;
                    return {
                        lineStart: function () {
                            u = a = !1,
                            s = 1
                        },
                        point: function (d, h) {
                            var b,
                            p = [d, h],
                            g = f(d, h),
                            y = r ? g ? 0 : l(d, h) : g ? l(d + (d < 0 ? o : -o), h) : 0;
                            if (!t && (u = a = g) && e.lineStart(), g !== a && (!(b = c(t, p)) || X(t, b) || X(p, b)) && (p[2] = 1), g !== a)
                                s = 0, g ? (e.lineStart(), b = c(p, t), e.point(b[0], b[1])) : (b = c(t, p), e.point(b[0], b[1], 2), e.lineEnd()), t = b;
                            else if (i && t && r ^ g) {
                                var v;
                                y & n || !(v = c(p, t, !0)) || (s = 0, r ? (e.lineStart(), e.point(v[0][0], v[0][1]), e.point(v[1][0], v[1][1]), e.lineEnd()) : (e.point(v[1][0], v[1][1]), e.lineEnd(), e.lineStart(), e.point(v[0][0], v[0][1], 3)))
                            }
                            !g || t && X(t, p) || e.point(p[0], p[1]),
                            t = p,
                            a = g,
                            n = y
                        },
                        lineEnd: function () {
                            a && e.lineEnd(),
                            t = null
                        },
                        clean: function () {
                            return s | (u && a) << 1
                        }
                    }
                }), (function (t, r, a, i) {
                    !function (e, t, n, r, a, i) {
                        if (n) {
                            var o = p(t),
                            f = x(t),
                            c = r * n;
                            null == a ? (a = t + r * u, i = t - c / 2) : (a = H(o, a), i = H(o, i), (r > 0 ? a < i : a > i) && (a += r * u));
                            for (var l, s = a; r > 0 ? s > i : s < i; s -= c)
                                l = O([o, -f * p(s), -f * x(s)]), e.point(l[0], l[1])
                        }
                    }
                    (i, e, n, a, t, r)
                }), r ? [0, -e] : [-o, e - o])
        }
        var ie,
        oe,
        fe,
        ce,
        ue = 1e9,
        le = -ue;
        function se(e, t, n, i) {
            function o(r, a) {
                return e <= r && r <= n && t <= a && a <= i
            }
            function f(r, a, o, f) {
                var u = 0,
                s = 0;
                if (null == r || (u = c(r, o)) !== (s = c(a, o)) || l(r, a) < 0 ^ o > 0)
                    do {
                        f.point(0 === u || 3 === u ? e : n, u > 1 ? i : t)
                    } while ((u = (u + o + 4) % 4) !== s);
                else
                    f.point(a[0], a[1])
            }
            function c(r, i) {
                return d(r[0] - e) < a ? i > 0 ? 0 : 3 : d(r[0] - n) < a ? i > 0 ? 2 : 1 : d(r[1] - t) < a ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
            }
            function u(e, t) {
                return l(e.x, t.x)
            }
            function l(e, t) {
                var n = c(e, 1),
                r = c(t, 1);
                return n !== r ? n - r : 0 === n ? t[1] - e[1] : 1 === n ? e[0] - t[0] : 2 === n ? e[1] - t[1] : t[0] - e[0]
            }
            return function (a) {
                var c,
                l,
                s,
                d,
                h,
                b,
                p,
                g,
                y,
                v,
                m,
                x = a,
                w = Y(),
                M = {
                    point: S,
                    lineStart: function () {
                        M.point = E,
                        l && l.push(s = []);
                        v = !0,
                        y = !1,
                        p = g = NaN
                    },
                    lineEnd: function () {
                        c && (E(d, h), b && y && w.rejoin(), c.push(w.result()));
                        M.point = S,
                        y && x.lineEnd()
                    },
                    polygonStart: function () {
                        x = w,
                        c = [],
                        l = [],
                        m = !0
                    },
                    polygonEnd: function () {
                        var t = function () {
                            for (var t = 0, n = 0, r = l.length; n < r; ++n)
                                for (var a, o, f = l[n], c = 1, u = f.length, s = f[0], d = s[0], h = s[1]; c < u; ++c)
                                    a = d, o = h, d = (s = f[c])[0], h = s[1], o <= i ? h > i && (d - a) * (i - o) > (h - o) * (e - a) && ++t : h <= i && (d - a) * (i - o) < (h - o) * (e - a) && --t;
                            return t
                        }
                        (),
                        n = m && t,
                        o = (c = r.exports.merge(c)).length;
                        (n || o) && (a.polygonStart(), n && (a.lineStart(), f(null, null, 1, a), a.lineEnd()), o && U(c, u, t, f, a), a.polygonEnd());
                        x = a,
                        c = l = s = null
                    }
                };
                function S(e, t) {
                    o(e, t) && x.point(e, t)
                }
                function E(r, a) {
                    var f = o(r, a);
                    if (l && s.push([r, a]), v)
                        d = r, h = a, b = f, v = !1, f && (x.lineStart(), x.point(r, a));
                    else if (f && y)
                        x.point(r, a);
                    else {
                        var c = [p = Math.max(le, Math.min(ue, p)), g = Math.max(le, Math.min(ue, g))],
                        u = [r = Math.max(le, Math.min(ue, r)), a = Math.max(le, Math.min(ue, a))];
                        !function (e, t, n, r, a, i) {
                            var o,
                            f = e[0],
                            c = e[1],
                            u = 0,
                            l = 1,
                            s = t[0] - f,
                            d = t[1] - c;
                            if (o = n - f, s || !(o > 0)) {
                                if (o /= s, s < 0) {
                                    if (o < u)
                                        return;
                                    o < l && (l = o)
                                } else if (s > 0) {
                                    if (o > l)
                                        return;
                                    o > u && (u = o)
                                }
                                if (o = a - f, s || !(o < 0)) {
                                    if (o /= s, s < 0) {
                                        if (o > l)
                                            return;
                                        o > u && (u = o)
                                    } else if (s > 0) {
                                        if (o < u)
                                            return;
                                        o < l && (l = o)
                                    }
                                    if (o = r - c, d || !(o > 0)) {
                                        if (o /= d, d < 0) {
                                            if (o < u)
                                                return;
                                            o < l && (l = o)
                                        } else if (d > 0) {
                                            if (o > l)
                                                return;
                                            o > u && (u = o)
                                        }
                                        if (o = i - c, d || !(o < 0)) {
                                            if (o /= d, d < 0) {
                                                if (o > l)
                                                    return;
                                                o > u && (u = o)
                                            } else if (d > 0) {
                                                if (o < u)
                                                    return;
                                                o < l && (l = o)
                                            }
                                            return u > 0 && (e[0] = f + u * s, e[1] = c + u * d),
                                            l < 1 && (t[0] = f + l * s, t[1] = c + l * d),
                                            !0
                                        }
                                    }
                                }
                            }
                        }
                        (c, u, e, t, n, i) ? f && (x.lineStart(), x.point(r, a), m = !1) : (y || (x.lineStart(), x.point(c[0], c[1])), x.point(u[0], u[1]), f || x.lineEnd(), m = !1)
                    }
                    p = r,
                    g = a,
                    y = f
                }
                return M
            }
        }
        var de = {
            sphere: N,
            point: N,
            lineStart: function () {
                de.point = be,
                de.lineEnd = he
            },
            lineEnd: N,
            polygonStart: N,
            polygonEnd: N
        };
        function he() {
            de.point = de.lineEnd = N
        }
        function be(e, t) {
            oe = e *= s,
            fe = x(t *= s),
            ce = p(t),
            de.point = pe
        }
        function pe(e, t) {
            e *= s;
            var n = x(t *= s),
            r = p(t),
            a = d(e - oe),
            i = p(a),
            o = r * x(a),
            f = ce * n - fe * r * i,
            c = fe * n + ce * r * i;
            ie.add(b(M(o * o + f * f), c)),
            oe = e,
            fe = n,
            ce = r
        }
        var ge = [null, null],
        ye = {
            type: "LineString",
            coordinates: ge
        };
        function ve(e, t) {
            return ge[0] = e,
            ge[1] = t,
            function (e) {
                return ie = new r.exports.Adder,
                j(e, de),
                +ie
            }
            (ye)
        }
        var me = {
            Feature: function (e, t) {
                return we(e.geometry, t)
            },
            FeatureCollection: function (e, t) {
                for (var n = e.features, r = -1, a = n.length; ++r < a; )
                    if (we(n[r].geometry, t))
                        return !0;
                return !1
            }
        },
        xe = {
            Sphere: function () {
                return !0
            },
            Point: function (e, t) {
                return Me(e.coordinates, t)
            },
            MultiPoint: function (e, t) {
                for (var n = e.coordinates, r = -1, a = n.length; ++r < a; )
                    if (Me(n[r], t))
                        return !0;
                return !1
            },
            LineString: function (e, t) {
                return Se(e.coordinates, t)
            },
            MultiLineString: function (e, t) {
                for (var n = e.coordinates, r = -1, a = n.length; ++r < a; )
                    if (Se(n[r], t))
                        return !0;
                return !1
            },
            Polygon: function (e, t) {
                return Ee(e.coordinates, t)
            },
            MultiPolygon: function (e, t) {
                for (var n = e.coordinates, r = -1, a = n.length; ++r < a; )
                    if (Ee(n[r], t))
                        return !0;
                return !1
            },
            GeometryCollection: function (e, t) {
                for (var n = e.geometries, r = -1, a = n.length; ++r < a; )
                    if (we(n[r], t))
                        return !0;
                return !1
            }
        };
        function we(e, t) {
            return !(!e || !xe.hasOwnProperty(e.type)) && xe[e.type](e, t)
        }
        function Me(e, t) {
            return 0 === ve(e, t)
        }
        function Se(e, t) {
            for (var n, r, a, o = 0, f = e.length; o < f; o++) {
                if (0 === (r = ve(e[o], t)))
                    return !0;
                if (o > 0 && (a = ve(e[o], e[o - 1])) > 0 && n <= a && r <= a && (n + r - a) * (1 - Math.pow((n - r) / a, 2)) < i * a)
                    return !0;
                n = r
            }
            return !1
        }
        function Ee(e, t) {
            return !!J(e.map(Ae), Ne(t))
        }
        function Ae(e) {
            return (e = e.map(Ne)).pop(),
            e
        }
        function Ne(e) {
            return [e[0] * s, e[1] * s]
        }
        function _e(e, t, n) {
            var i = r.exports.range(e, t - a, n).concat(t);
            return function (e) {
                return i.map((function (t) {
                        return [e, t]
                    }))
            }
        }
        function ke(e, t, n) {
            var i = r.exports.range(e, t - a, n).concat(t);
            return function (e) {
                return i.map((function (t) {
                        return [t, e]
                    }))
            }
        }
        function Ce() {
            var e,
            t,
            n,
            i,
            o,
            f,
            c,
            u,
            l,
            s,
            h,
            b,
            p = 10,
            y = p,
            v = 90,
            m = 360,
            x = 2.5;
            function w() {
                return {
                    type: "MultiLineString",
                    coordinates: M()
                }
            }
            function M() {
                return r.exports.range(g(i / v) * v, n, v).map(h).concat(r.exports.range(g(u / m) * m, c, m).map(b)).concat(r.exports.range(g(t / p) * p, e, p).filter((function (e) {
                            return d(e % v) > a
                        })).map(l)).concat(r.exports.range(g(f / y) * y, o, y).filter((function (e) {
                            return d(e % m) > a
                        })).map(s))
            }
            return w.lines = function () {
                return M().map((function (e) {
                        return {
                            type: "LineString",
                            coordinates: e
                        }
                    }))
            },
            w.outline = function () {
                return {
                    type: "Polygon",
                    coordinates: [h(i).concat(b(c).slice(1), h(n).reverse().slice(1), b(u).reverse().slice(1))]
                }
            },
            w.extent = function (e) {
                return arguments.length ? w.extentMajor(e).extentMinor(e) : w.extentMinor()
            },
            w.extentMajor = function (e) {
                return arguments.length ? (i = +e[0][0], n = +e[1][0], u = +e[0][1], c = +e[1][1], i > n && (e = i, i = n, n = e), u > c && (e = u, u = c, c = e), w.precision(x)) : [[i, u], [n, c]]
            },
            w.extentMinor = function (n) {
                return arguments.length ? (t = +n[0][0], e = +n[1][0], f = +n[0][1], o = +n[1][1], t > e && (n = t, t = e, e = n), f > o && (n = f, f = o, o = n), w.precision(x)) : [[t, f], [e, o]]
            },
            w.step = function (e) {
                return arguments.length ? w.stepMajor(e).stepMinor(e) : w.stepMinor()
            },
            w.stepMajor = function (e) {
                return arguments.length ? (v = +e[0], m = +e[1], w) : [v, m]
            },
            w.stepMinor = function (e) {
                return arguments.length ? (p = +e[0], y = +e[1], w) : [p, y]
            },
            w.precision = function (r) {
                return arguments.length ? (x = +r, l = _e(f, o, 90), s = ke(t, e, x), h = _e(u, c, 90), b = ke(i, n, x), w) : x
            },
            w.extentMajor([[-180, -89.999999], [180, 89.999999]]).extentMinor([[-180, -80.000001], [180, 80.000001]])
        }
        var Ie,
        Pe,
        je,
        Oe,
        ze = e => e,
        De = new r.exports.Adder,
        Re = new r.exports.Adder,
        Te = {
            point: N,
            lineStart: N,
            lineEnd: N,
            polygonStart: function () {
                Te.lineStart = Ge,
                Te.lineEnd = Le
            },
            polygonEnd: function () {
                Te.lineStart = Te.lineEnd = Te.point = N,
                De.add(d(Re)),
                Re = new r.exports.Adder
            },
            result: function () {
                var e = De / 2;
                return De = new r.exports.Adder,
                e
            }
        };
        function Ge() {
            Te.point = qe
        }
        function qe(e, t) {
            Te.point = Be,
            Ie = je = e,
            Pe = Oe = t
        }
        function Be(e, t) {
            Re.add(Oe * e - je * t),
            je = e,
            Oe = t
        }
        function Le() {
            Be(Ie, Pe)
        }
        var Fe = Te,
        We = 1 / 0,
        Ve = We,
        $e = -We,
        He = $e;
        var Ye,
        Xe,
        Ke,
        Ue,
        Qe = {
            point: function (e, t) {
                e < We && (We = e);
                e > $e && ($e = e);
                t < Ve && (Ve = t);
                t > He && (He = t)
            },
            lineStart: N,
            lineEnd: N,
            polygonStart: N,
            polygonEnd: N,
            result: function () {
                var e = [[We, Ve], [$e, He]];
                return $e = He =  - (Ve = We = 1 / 0),
                e
            }
        },
        Ze = 0,
        Je = 0,
        et = 0,
        tt = 0,
        nt = 0,
        rt = 0,
        at = 0,
        it = 0,
        ot = 0,
        ft = {
            point: ct,
            lineStart: ut,
            lineEnd: dt,
            polygonStart: function () {
                ft.lineStart = ht,
                ft.lineEnd = bt
            },
            polygonEnd: function () {
                ft.point = ct,
                ft.lineStart = ut,
                ft.lineEnd = dt
            },
            result: function () {
                var e = ot ? [at / ot, it / ot] : rt ? [tt / rt, nt / rt] : et ? [Ze / et, Je / et] : [NaN, NaN];
                return Ze = Je = et = tt = nt = rt = at = it = ot = 0,
                e
            }
        };
        function ct(e, t) {
            Ze += e,
            Je += t,
            ++et
        }
        function ut() {
            ft.point = lt
        }
        function lt(e, t) {
            ft.point = st,
            ct(Ke = e, Ue = t)
        }
        function st(e, t) {
            var n = e - Ke,
            r = t - Ue,
            a = M(n * n + r * r);
            tt += a * (Ke + e) / 2,
            nt += a * (Ue + t) / 2,
            rt += a,
            ct(Ke = e, Ue = t)
        }
        function dt() {
            ft.point = ct
        }
        function ht() {
            ft.point = pt
        }
        function bt() {
            gt(Ye, Xe)
        }
        function pt(e, t) {
            ft.point = gt,
            ct(Ye = Ke = e, Xe = Ue = t)
        }
        function gt(e, t) {
            var n = e - Ke,
            r = t - Ue,
            a = M(n * n + r * r);
            tt += a * (Ke + e) / 2,
            nt += a * (Ue + t) / 2,
            rt += a,
            at += (a = Ue * e - Ke * t) * (Ke + e),
            it += a * (Ue + t),
            ot += 3 * a,
            ct(Ke = e, Ue = t)
        }
        var yt = ft;
        function vt(e) {
            this._context = e
        }
        vt.prototype = {
            _radius: 4.5,
            pointRadius: function (e) {
                return this._radius = e,
                this
            },
            polygonStart: function () {
                this._line = 0
            },
            polygonEnd: function () {
                this._line = NaN
            },
            lineStart: function () {
                this._point = 0
            },
            lineEnd: function () {
                0 === this._line && this._context.closePath(),
                this._point = NaN
            },
            point: function (e, t) {
                switch (this._point) {
                case 0:
                    this._context.moveTo(e, t),
                    this._point = 1;
                    break;
                case 1:
                    this._context.lineTo(e, t);
                    break;
                default:
                    this._context.moveTo(e + this._radius, t),
                    this._context.arc(e, t, this._radius, 0, u)
                }
            },
            result: N
        };
        var mt,
        xt,
        wt,
        Mt,
        St,
        Et = new r.exports.Adder,
        At = {
            point: N,
            lineStart: function () {
                At.point = Nt
            },
            lineEnd: function () {
                mt && _t(xt, wt),
                At.point = N
            },
            polygonStart: function () {
                mt = !0
            },
            polygonEnd: function () {
                mt = null
            },
            result: function () {
                var e = +Et;
                return Et = new r.exports.Adder,
                e
            }
        };
        function Nt(e, t) {
            At.point = _t,
            xt = Mt = e,
            wt = St = t
        }
        function _t(e, t) {
            Mt -= e,
            St -= t,
            Et.add(M(Mt * Mt + St * St)),
            Mt = e,
            St = t
        }
        var kt = At;
        function Ct() {
            this._string = []
        }
        function It(e) {
            return "m0," + e + "a" + e + "," + e + " 0 1,1 0," + -2 * e + "a" + e + "," + e + " 0 1,1 0," + 2 * e + "z"
        }
        function Pt(e, t) {
            var n,
            r,
            a = 4.5;
            function i(e) {
                return e && ("function" == typeof a && r.pointRadius(+a.apply(this, arguments)), j(e, n(r))),
                r.result()
            }
            return i.area = function (e) {
                return j(e, n(Fe)),
                Fe.result()
            },
            i.measure = function (e) {
                return j(e, n(kt)),
                kt.result()
            },
            i.bounds = function (e) {
                return j(e, n(Qe)),
                Qe.result()
            },
            i.centroid = function (e) {
                return j(e, n(yt)),
                yt.result()
            },
            i.projection = function (t) {
                return arguments.length ? (n = null == t ? (e = null, ze) : (e = t).stream, i) : e
            },
            i.context = function (e) {
                return arguments.length ? (r = null == e ? (t = null, new Ct) : new vt(t = e), "function" != typeof a && r.pointRadius(a), i) : t
            },
            i.pointRadius = function (e) {
                return arguments.length ? (a = "function" == typeof e ? e : (r.pointRadius(+e), +e), i) : a
            },
            i.projection(e).context(t)
        }
        function jt(e) {
            return function (t) {
                var n = new Ot;
                for (var r in e)
                    n[r] = e[r];
                return n.stream = t,
                n
            }
        }
        function Ot() {}
        function zt(e, t, n) {
            var r = e.clipExtent && e.clipExtent();
            return e.scale(150).translate([0, 0]),
            null != r && e.clipExtent(null),
            j(n, e.stream(Qe)),
            t(Qe.result()),
            null != r && e.clipExtent(r),
            e
        }
        function Dt(e, t, n) {
            return zt(e, (function (n) {
                    var r = t[1][0] - t[0][0],
                    a = t[1][1] - t[0][1],
                    i = Math.min(r / (n[1][0] - n[0][0]), a / (n[1][1] - n[0][1])),
                    o = +t[0][0] + (r - i * (n[1][0] + n[0][0])) / 2,
                    f = +t[0][1] + (a - i * (n[1][1] + n[0][1])) / 2;
                    e.scale(150 * i).translate([o, f])
                }), n)
        }
        function Rt(e, t, n) {
            return Dt(e, [[0, 0], t], n)
        }
        function Tt(e, t, n) {
            return zt(e, (function (n) {
                    var r = +t,
                    a = r / (n[1][0] - n[0][0]),
                    i = (r - a * (n[1][0] + n[0][0])) / 2,
                    o = -a * n[0][1];
                    e.scale(150 * a).translate([i, o])
                }), n)
        }
        function Gt(e, t, n) {
            return zt(e, (function (n) {
                    var r = +t,
                    a = r / (n[1][1] - n[0][1]),
                    i = -a * n[0][0],
                    o = (r - a * (n[1][1] + n[0][1])) / 2;
                    e.scale(150 * a).translate([i, o])
                }), n)
        }
        Ct.prototype = {
            _radius: 4.5,
            _circle: It(4.5),
            pointRadius: function (e) {
                return (e = +e) !== this._radius && (this._radius = e, this._circle = null),
                this
            },
            polygonStart: function () {
                this._line = 0
            },
            polygonEnd: function () {
                this._line = NaN
            },
            lineStart: function () {
                this._point = 0
            },
            lineEnd: function () {
                0 === this._line && this._string.push("Z"),
                this._point = NaN
            },
            point: function (e, t) {
                switch (this._point) {
                case 0:
                    this._string.push("M", e, ",", t),
                    this._point = 1;
                    break;
                case 1:
                    this._string.push("L", e, ",", t);
                    break;
                default:
                    null == this._circle && (this._circle = It(this._radius)),
                    this._string.push("M", e, ",", t, this._circle)
                }
            },
            result: function () {
                if (this._string.length) {
                    var e = this._string.join("");
                    return this._string = [],
                    e
                }
                return null
            }
        },
        Ot.prototype = {
            constructor: Ot,
            point: function (e, t) {
                this.stream.point(e, t)
            },
            sphere: function () {
                this.stream.sphere()
            },
            lineStart: function () {
                this.stream.lineStart()
            },
            lineEnd: function () {
                this.stream.lineEnd()
            },
            polygonStart: function () {
                this.stream.polygonStart()
            },
            polygonEnd: function () {
                this.stream.polygonEnd()
            }
        };
        var qt = p(30 * s);
        function Bt(e, t) {
            return +t ? function (e, t) {
                function n(r, i, o, f, c, u, l, s, h, p, g, y, v, m) {
                    var x = l - r,
                    w = s - i,
                    S = x * x + w * w;
                    if (S > 4 * t && v--) {
                        var E = f + p,
                        N = c + g,
                        _ = u + y,
                        k = M(E * E + N * N + _ * _),
                        C = A(_ /= k),
                        I = d(d(_) - 1) < a || d(o - h) < a ? (o + h) / 2 : b(N, E),
                        P = e(I, C),
                        j = P[0],
                        O = P[1],
                        z = j - r,
                        D = O - i,
                        R = w * z - x * D;
                        (R * R / S > t || d((x * z + w * D) / S - .5) > .3 || f * p + c * g + u * y < qt) && (n(r, i, o, f, c, u, j, O, I, E /= k, N /= k, _, v, m), m.point(j, O), n(j, O, I, E, N, _, l, s, h, p, g, y, v, m))
                    }
                }
                return function (t) {
                    var r,
                    a,
                    i,
                    o,
                    f,
                    c,
                    u,
                    l,
                    s,
                    d,
                    h,
                    b,
                    p = {
                        point: g,
                        lineStart: y,
                        lineEnd: m,
                        polygonStart: function () {
                            t.polygonStart(),
                            p.lineStart = x
                        },
                        polygonEnd: function () {
                            t.polygonEnd(),
                            p.lineStart = y
                        }
                    };
                    function g(n, r) {
                        n = e(n, r),
                        t.point(n[0], n[1])
                    }
                    function y() {
                        l = NaN,
                        p.point = v,
                        t.lineStart()
                    }
                    function v(r, a) {
                        var i = z([r, a]),
                        o = e(r, a);
                        n(l, s, u, d, h, b, l = o[0], s = o[1], u = r, d = i[0], h = i[1], b = i[2], 16, t),
                        t.point(l, s)
                    }
                    function m() {
                        p.point = g,
                        t.lineEnd()
                    }
                    function x() {
                        y(),
                        p.point = w,
                        p.lineEnd = M
                    }
                    function w(e, t) {
                        v(r = e, t),
                        a = l,
                        i = s,
                        o = d,
                        f = h,
                        c = b,
                        p.point = v
                    }
                    function M() {
                        n(l, s, u, d, h, b, a, i, r, o, f, c, 16, t),
                        p.lineEnd = m,
                        m()
                    }
                    return p
                }
            }
            (e, t) : function (e) {
                return jt({
                    point: function (t, n) {
                        t = e(t, n),
                        this.stream.point(t[0], t[1])
                    }
                })
            }
            (e)
        }
        var Lt = jt({
            point: function (e, t) {
                this.stream.point(e * s, t * s)
            }
        });
        function Ft(e, t, n, r, a, i) {
            if (!i)
                return function (e, t, n, r, a) {
                    function i(i, o) {
                        return [t + e * (i *= r), n - e * (o *= a)]
                    }
                    return i.invert = function (i, o) {
                        return [(i - t) / e * r, (n - o) / e * a]
                    },
                    i
                }
            (e, t, n, r, a);
            var o = p(i),
            f = x(i),
            c = o * e,
            u = f * e,
            l = o / e,
            s = f / e,
            d = (f * n - o * t) / e,
            h = (f * t + o * n) / e;
            function b(e, i) {
                return [c * (e *= r) - u * (i *= a) + t, n - u * e - c * i]
            }
            return b.invert = function (e, t) {
                return [r * (l * e - s * t + d), a * (h - s * e - l * t)]
            },
            b
        }
        function Wt(e) {
            return Vt((function () {
                    return e
                }))()
        }
        function Vt(e) {
            var t,
            n,
            r,
            a,
            i,
            o,
            f,
            c,
            u,
            d,
            h = 150,
            b = 480,
            p = 250,
            g = 0,
            y = 0,
            v = 0,
            m = 0,
            x = 0,
            w = 0,
            S = 1,
            E = 1,
            A = null,
            N = re,
            _ = null,
            k = ze,
            C = .5;
            function I(e) {
                return c(e[0] * s, e[1] * s)
            }
            function P(e) {
                return (e = c.invert(e[0], e[1])) && [e[0] * l, e[1] * l]
            }
            function j() {
                var e = Ft(h, 0, 0, S, E, w).apply(null, t(g, y)),
                r = Ft(h, b - e[0], p - e[1], S, E, w);
                return n = F(v, m, x),
                f = B(t, r),
                c = B(n, f),
                o = Bt(f, C),
                O()
            }
            function O() {
                return u = d = null,
                I
            }
            return I.stream = function (e) {
                return u && d === e ? u : u = Lt(function (e) {
                    return jt({
                        point: function (t, n) {
                            var r = e(t, n);
                            return this.stream.point(r[0], r[1])
                        }
                    })
                }
                        (n)(N(o(k(d = e)))))
            },
            I.preclip = function (e) {
                return arguments.length ? (N = e, A = void 0, O()) : N
            },
            I.postclip = function (e) {
                return arguments.length ? (k = e, _ = r = a = i = null, O()) : k
            },
            I.clipAngle = function (e) {
                return arguments.length ? (N = +e ? ae(A = e * s) : (A = null, re), O()) : A * l
            },
            I.clipExtent = function (e) {
                return arguments.length ? (k = null == e ? (_ = r = a = i = null, ze) : se(_ = +e[0][0], r = +e[0][1], a = +e[1][0], i = +e[1][1]), O()) : null == _ ? null : [[_, r], [a, i]]
            },
            I.scale = function (e) {
                return arguments.length ? (h = +e, j()) : h
            },
            I.translate = function (e) {
                return arguments.length ? (b = +e[0], p = +e[1], j()) : [b, p]
            },
            I.center = function (e) {
                return arguments.length ? (g = e[0] % 360 * s, y = e[1] % 360 * s, j()) : [g * l, y * l]
            },
            I.rotate = function (e) {
                return arguments.length ? (v = e[0] % 360 * s, m = e[1] % 360 * s, x = e.length > 2 ? e[2] % 360 * s : 0, j()) : [v * l, m * l, x * l]
            },
            I.angle = function (e) {
                return arguments.length ? (w = e % 360 * s, j()) : w * l
            },
            I.reflectX = function (e) {
                return arguments.length ? (S = e ? -1 : 1, j()) : S < 0
            },
            I.reflectY = function (e) {
                return arguments.length ? (E = e ? -1 : 1, j()) : E < 0
            },
            I.precision = function (e) {
                return arguments.length ? (o = Bt(f, C = e * e), O()) : M(C)
            },
            I.fitExtent = function (e, t) {
                return Dt(I, e, t)
            },
            I.fitSize = function (e, t) {
                return Rt(I, e, t)
            },
            I.fitWidth = function (e, t) {
                return Tt(I, e, t)
            },
            I.fitHeight = function (e, t) {
                return Gt(I, e, t)
            },
            function () {
                return t = e.apply(this, arguments),
                I.invert = t.invert && P,
                j()
            }
        }
        function $t(e) {
            var t = 0,
            n = o / 3,
            r = Vt(e),
            a = r(t, n);
            return a.parallels = function (e) {
                return arguments.length ? r(t = e[0] * s, n = e[1] * s) : [t * l, n * l]
            },
            a
        }
        function Ht(e, t) {
            var n = x(e),
            r = (n + x(t)) / 2;
            if (d(r) < a)
                return function (e) {
                    var t = p(e);
                    function n(e, n) {
                        return [e * t, x(n) / t]
                    }
                    return n.invert = function (e, n) {
                        return [e / t, A(n * t)]
                    },
                    n
                }
            (e);
            var i = 1 + n * (2 * r - n),
            f = M(i) / r;
            function c(e, t) {
                var n = M(i - 2 * r * x(t)) / r;
                return [n * x(e *= r), f - n * p(e)]
            }
            return c.invert = function (e, t) {
                var n = f - t,
                a = b(e, d(n)) * w(n);
                return n * r < 0 && (a -= o * w(e) * w(n)),
                [a / r, A((i - (e * e + n * n) * r * r) / (2 * r))]
            },
            c
        }
        function Yt() {
            return $t(Ht).scale(155.424).center([0, 33.6442])
        }
        function Xt() {
            return Yt().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([ - .6, 38.7])
        }
        function Kt(e) {
            return function (t, n) {
                var r = p(t),
                a = p(n),
                i = e(r * a);
                return i === 1 / 0 ? [2, 0] : [i * a * x(t), i * x(n)]
            }
        }
        function Ut(e) {
            return function (t, n) {
                var r = M(t * t + n * n),
                a = e(r),
                i = x(a),
                o = p(a);
                return [b(t * i, r * o), A(r && n * i / r)]
            }
        }
        var Qt = Kt((function (e) {
                    return M(2 / (1 + e))
                }));
        Qt.invert = Ut((function (e) {
                    return 2 * A(e / 2)
                }));
        var Zt = Kt((function (e) {
                    return (e = E(e)) && e / x(e)
                }));
        function Jt(e, t) {
            return [e, v(S((f + t) / 2))]
        }
        function en(e) {
            var t,
            n,
            r,
            a = Wt(e),
            i = a.center,
            f = a.scale,
            c = a.translate,
            u = a.clipExtent,
            d = null;
            function h() {
                var i = o * f(),
                c = a(function (e) {
                    function t(t) {
                        return (t = e(t[0] * s, t[1] * s))[0] *= l,
                        t[1] *= l,
                        t
                    }
                    return e = F(e[0] * s, e[1] * s, e.length > 2 ? e[2] * s : 0),
                    t.invert = function (t) {
                        return (t = e.invert(t[0] * s, t[1] * s))[0] *= l,
                        t[1] *= l,
                        t
                    },
                    t
                }
                        (a.rotate()).invert([0, 0]));
                return u(null == d ? [[c[0] - i, c[1] - i], [c[0] + i, c[1] + i]] : e === Jt ? [[Math.max(c[0] - i, d), t], [Math.min(c[0] + i, n), r]] : [[d, Math.max(c[1] - i, t)], [n, Math.min(c[1] + i, r)]])
            }
            return a.scale = function (e) {
                return arguments.length ? (f(e), h()) : f()
            },
            a.translate = function (e) {
                return arguments.length ? (c(e), h()) : c()
            },
            a.center = function (e) {
                return arguments.length ? (i(e), h()) : i()
            },
            a.clipExtent = function (e) {
                return arguments.length ? (null == e ? d = t = n = r = null : (d = +e[0][0], t = +e[0][1], n = +e[1][0], r = +e[1][1]), h()) : null == d ? null : [[d, t], [n, r]]
            },
            h()
        }
        function tn(e) {
            return S((f + e) / 2)
        }
        function nn(e, t) {
            var n = p(e),
            r = e === t ? x(e) : v(n / p(t)) / v(tn(t) / tn(e)),
            i = n * m(tn(e), r) / r;
            if (!r)
                return Jt;
            function c(e, t) {
                i > 0 ? t < -f + a && (t = -f + a) : t > f - a && (t = f - a);
                var n = i / m(tn(t), r);
                return [n * x(r * e), i - n * p(r * e)]
            }
            return c.invert = function (e, t) {
                var n = i - t,
                a = w(r) * M(e * e + n * n),
                c = b(e, d(n)) * w(n);
                return n * r < 0 && (c -= o * w(e) * w(n)),
                [c / r, 2 * h(m(i / a, 1 / r)) - f]
            },
            c
        }
        function rn(e, t) {
            return [e, t]
        }
        function an(e, t) {
            var n = p(e),
            r = e === t ? x(e) : (n - p(t)) / (t - e),
            i = n / r + e;
            if (d(r) < a)
                return rn;
            function f(e, t) {
                var n = i - t,
                a = r * e;
                return [n * x(a), i - n * p(a)]
            }
            return f.invert = function (e, t) {
                var n = i - t,
                a = b(e, d(n)) * w(n);
                return n * r < 0 && (a -= o * w(e) * w(n)),
                [a / r, i - w(r) * M(e * e + n * n)]
            },
            f
        }
        Zt.invert = Ut((function (e) {
                    return e
                })),
        Jt.invert = function (e, t) {
            return [e, 2 * h(y(t)) - f]
        },
        rn.invert = rn;
        var on = 1.340264,
        fn =  - .081106,
        cn = 893e-6,
        un = .003796,
        ln = M(3) / 2;
        function sn(e, t) {
            var n = A(ln * x(t)),
            r = n * n,
            a = r * r * r;
            return [e * p(n) / (ln * (on + 3 * fn * r + a * (7 * cn + 9 * un * r))), n * (on + fn * r + a * (cn + un * r))]
        }
        function dn(e, t) {
            var n = p(t),
            r = p(e) * n;
            return [n * x(e) / r, x(t) / r]
        }
        function hn(e, t) {
            var n = t * t,
            r = n * n;
            return [e * (.8707 - .131979 * n + r * (r * (.003971 * n - .001529 * r) - .013791)), t * (1.007226 + n * (.015085 + r * (.028874 * n - .044475 - .005916 * r)))]
        }
        function bn(e, t) {
            return [p(t) * x(e), x(t)]
        }
        function pn(e, t) {
            var n = p(t),
            r = 1 + p(e) * n;
            return [n * x(e) / r, x(t) / r]
        }
        function gn(e, t) {
            return [v(S((f + t) / 2)), -e]
        }
        sn.invert = function (e, t) {
            for (var n, r = t, a = r * r, o = a * a * a, f = 0; f < 12 && (o = (a = (r -= n = (r * (on + fn * a + o * (cn + un * a)) - t) / (on + 3 * fn * a + o * (7 * cn + 9 * un * a))) * r) * a * a, !(d(n) < i)); ++f);
            return [ln * e * (on + 3 * fn * a + o * (7 * cn + 9 * un * a)) / p(r), A(x(r) / ln)]
        },
        dn.invert = Ut(h),
        hn.invert = function (e, t) {
            var n,
            r = t,
            i = 25;
            do {
                var o = r * r,
                f = o * o;
                r -= n = (r * (1.007226 + o * (.015085 + f * (.028874 * o - .044475 - .005916 * f))) - t) / (1.007226 + o * (.045255 + f * (.259866 * o - .311325 - .005916 * 11 * f)))
            } while (d(n) > a && --i > 0);
            return [e / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r]
        },
        bn.invert = Ut(A),
        pn.invert = Ut((function (e) {
                    return 2 * h(e)
                })),
        gn.invert = function (e, t) {
            return [-t, 2 * h(y(e)) - f]
        };
        const yn = {
            geoAzimuthalEqualArea: function () {
                return Wt(Qt).scale(124.75).clipAngle(179.999)
            },
            geoAzimuthalEquidistant: function () {
                return Wt(Zt).scale(79.4188).clipAngle(179.999)
            },
            geoGnomonic: function () {
                return Wt(dn).scale(144.049).clipAngle(60)
            },
            geoOrthographic: function () {
                return Wt(bn).scale(249.5).clipAngle(90.000001)
            },
            geoStereographic: function () {
                return Wt(pn).scale(250).clipAngle(142)
            },
            geoEqualEarth: function () {
                return Wt(sn).scale(177.158)
            },
            geoAlbers: Xt,
            geoAlbersUsa: function () {
                var e,
                t,
                n,
                r,
                i,
                o,
                f = Xt(),
                c = Yt().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
                u = Yt().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
                l = {
                    point: function (e, t) {
                        o = [e, t]
                    }
                };
                function s(e) {
                    var t = e[0],
                    a = e[1];
                    return o = null,
                    n.point(t, a),
                    o || (r.point(t, a), o) || (i.point(t, a), o)
                }
                function d() {
                    return e = t = null,
                    s
                }
                return s.invert = function (e) {
                    var t = f.scale(),
                    n = f.translate(),
                    r = (e[0] - n[0]) / t,
                    a = (e[1] - n[1]) / t;
                    return (a >= .12 && a < .234 && r >=  - .425 && r <  - .214 ? c : a >= .166 && a < .234 && r >=  - .214 && r <  - .115 ? u : f).invert(e)
                },
                s.stream = function (n) {
                    return e && t === n ? e : (r = [f.stream(t = n), c.stream(n), u.stream(n)], a = r.length, e = {
                            point: function (e, t) {
                                for (var n = -1; ++n < a; )
                                    r[n].point(e, t)
                            },
                            sphere: function () {
                                for (var e = -1; ++e < a; )
                                    r[e].sphere()
                            },
                            lineStart: function () {
                                for (var e = -1; ++e < a; )
                                    r[e].lineStart()
                            },
                            lineEnd: function () {
                                for (var e = -1; ++e < a; )
                                    r[e].lineEnd()
                            },
                            polygonStart: function () {
                                for (var e = -1; ++e < a; )
                                    r[e].polygonStart()
                            },
                            polygonEnd: function () {
                                for (var e = -1; ++e < a; )
                                    r[e].polygonEnd()
                            }
                        });
                    var r,
                    a
                },
                s.precision = function (e) {
                    return arguments.length ? (f.precision(e), c.precision(e), u.precision(e), d()) : f.precision()
                },
                s.scale = function (e) {
                    return arguments.length ? (f.scale(e), c.scale(.35 * e), u.scale(e), s.translate(f.translate())) : f.scale()
                },
                s.translate = function (e) {
                    if (!arguments.length)
                        return f.translate();
                    var t = f.scale(),
                    o = +e[0],
                    s = +e[1];
                    return n = f.translate(e).clipExtent([[o - .455 * t, s - .238 * t], [o + .455 * t, s + .238 * t]]).stream(l),
                    r = c.translate([o - .307 * t, s + .201 * t]).clipExtent([[o - .425 * t + a, s + .12 * t + a], [o - .214 * t - a, s + .234 * t - a]]).stream(l),
                    i = u.translate([o - .205 * t, s + .212 * t]).clipExtent([[o - .214 * t + a, s + .166 * t + a], [o - .115 * t - a, s + .234 * t - a]]).stream(l),
                    d()
                },
                s.fitExtent = function (e, t) {
                    return Dt(s, e, t)
                },
                s.fitSize = function (e, t) {
                    return Rt(s, e, t)
                },
                s.fitWidth = function (e, t) {
                    return Tt(s, e, t)
                },
                s.fitHeight = function (e, t) {
                    return Gt(s, e, t)
                },
                s.scale(1070)
            },
            geoConicConformal: function () {
                return $t(nn).scale(109.5).parallels([30, 30])
            },
            geoConicEqualArea: Yt,
            geoConicEquidistant: function () {
                return $t(an).scale(131.154).center([0, 13.9389])
            },
            geoEquirectangular: function () {
                return Wt(rn).scale(152.63)
            },
            geoMercator: function () {
                return en(Jt).scale(961 / u)
            },
            geoTransverseMercator: function () {
                var e = en(gn),
                t = e.center,
                n = e.rotate;
                return e.center = function (e) {
                    return arguments.length ? t([-e[1], e[0]]) : [(e = t())[1], -e[0]]
                },
                e.rotate = function (e) {
                    return arguments.length ? n([e[0], e[1], e.length > 2 ? e[2] + 90 : 90]) : [(e = n())[0], e[1], e[2] - 90]
                },
                n([0, 0, 90]).scale(159.155)
            },
            geoNaturalEarth1: function () {
                return Wt(hn).scale(175.295)
            }
        };
        Object.keys(yn).forEach((e => {
                yn[`${e.charAt(3).toLowerCase()}${e.slice(4)}`] = yn[e]
            }));
        class vn extends t.Scale {
            constructor(e) {
                super(e),
                this.outlineBounds = null,
                this.oldChartBounds = null,
                this.geoPath = Pt()
            }
            init(e) {
                e.position = "chartArea",
                super.init(e),
                "function" == typeof e.projection ? this.projection = e.projection : this.projection = (yn[e.projection] || yn.albersUsa)(),
                this.geoPath.projection(this.projection)
            }
            computeBounds(e) {
                const t = Pt(this.projection.fitWidth(1e3, e)).bounds(e),
                n = Math.ceil(t[1][1] - t[0][1]),
                r = Math.ceil(t[1][0] - t[0][0]),
                a = this.projection.translate();
                this.outlineBounds = {
                    width: r,
                    height: n,
                    aspectRatio: r / n,
                    refScale: this.projection.scale(),
                    refX: a[0],
                    refY: a[1]
                }
            }
            updateBounds() {
                const e = this.chart.chartArea,
                t = this.outlineBounds;
                if (!t)
                    return !1;
                const n = e.right - e.left,
                r = e.bottom - e.top,
                a = this.oldChartBounds;
                this.oldChartBounds = {
                    chartWidth: n,
                    chartHeight: r
                };
                const i = Math.min(n / t.width, r / t.height),
                o = t.width * i,
                f = t.height * i,
                c = .5 * (n - o) + e.left,
                u = .5 * (r - f) + e.top,
                l = this.options;
                return this.projection.scale(t.refScale * i * l.projectionScale).translate([i * t.refX + c + l.projectionOffset[0], i * t.refY + u + l.projectionOffset[1]]),
                !a || a.chartWidth !== this.oldChartBounds.chartWidth || a.chartHeight !== this.oldChartBounds.chartHeight
            }
        }
        function mn(e) {
            for (var t = e.length / 6 | 0, n = new Array(t), r = 0; r < t; )
                n[r] = "#" + e.slice(6 * r, 6 * ++r);
            return n
        }
        vn.id = "projection",
        vn.defaults = {
            projection: "albersUsa",
            projectionScale: 1,
            projectionOffset: [0, 0]
        },
        vn.descriptors = {
            _scriptable: e => "projection" !== e,
            _indexable: e => "projectionOffset" !== e
        };
        var xn = {
            exports: {}
        },
        wn = {
            exports: {}
        };
        !function (e, t) {
            !function (e) {
                function t(e, t, n) {
                    e.prototype = t.prototype = n,
                    n.constructor = e
                }
                function n(e, t) {
                    var n = Object.create(e.prototype);
                    for (var r in t)
                        n[r] = t[r];
                    return n
                }
                function r() {}
                var a = .7,
                i = 1 / a,
                o = "\\s*([+-]?\\d+)\\s*",
                f = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
                c = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
                u = /^#([0-9a-f]{3,8})$/,
                l = new RegExp("^rgb\\(" + [o, o, o] + "\\)$"),
                s = new RegExp("^rgb\\(" + [c, c, c] + "\\)$"),
                d = new RegExp("^rgba\\(" + [o, o, o, f] + "\\)$"),
                h = new RegExp("^rgba\\(" + [c, c, c, f] + "\\)$"),
                b = new RegExp("^hsl\\(" + [f, c, c] + "\\)$"),
                p = new RegExp("^hsla\\(" + [f, c, c, f] + "\\)$"),
                g = {
                    aliceblue: 15792383,
                    antiquewhite: 16444375,
                    aqua: 65535,
                    aquamarine: 8388564,
                    azure: 15794175,
                    beige: 16119260,
                    bisque: 16770244,
                    black: 0,
                    blanchedalmond: 16772045,
                    blue: 255,
                    blueviolet: 9055202,
                    brown: 10824234,
                    burlywood: 14596231,
                    cadetblue: 6266528,
                    chartreuse: 8388352,
                    chocolate: 13789470,
                    coral: 16744272,
                    cornflowerblue: 6591981,
                    cornsilk: 16775388,
                    crimson: 14423100,
                    cyan: 65535,
                    darkblue: 139,
                    darkcyan: 35723,
                    darkgoldenrod: 12092939,
                    darkgray: 11119017,
                    darkgreen: 25600,
                    darkgrey: 11119017,
                    darkkhaki: 12433259,
                    darkmagenta: 9109643,
                    darkolivegreen: 5597999,
                    darkorange: 16747520,
                    darkorchid: 10040012,
                    darkred: 9109504,
                    darksalmon: 15308410,
                    darkseagreen: 9419919,
                    darkslateblue: 4734347,
                    darkslategray: 3100495,
                    darkslategrey: 3100495,
                    darkturquoise: 52945,
                    darkviolet: 9699539,
                    deeppink: 16716947,
                    deepskyblue: 49151,
                    dimgray: 6908265,
                    dimgrey: 6908265,
                    dodgerblue: 2003199,
                    firebrick: 11674146,
                    floralwhite: 16775920,
                    forestgreen: 2263842,
                    fuchsia: 16711935,
                    gainsboro: 14474460,
                    ghostwhite: 16316671,
                    gold: 16766720,
                    goldenrod: 14329120,
                    gray: 8421504,
                    green: 32768,
                    greenyellow: 11403055,
                    grey: 8421504,
                    honeydew: 15794160,
                    hotpink: 16738740,
                    indianred: 13458524,
                    indigo: 4915330,
                    ivory: 16777200,
                    khaki: 15787660,
                    lavender: 15132410,
                    lavenderblush: 16773365,
                    lawngreen: 8190976,
                    lemonchiffon: 16775885,
                    lightblue: 11393254,
                    lightcoral: 15761536,
                    lightcyan: 14745599,
                    lightgoldenrodyellow: 16448210,
                    lightgray: 13882323,
                    lightgreen: 9498256,
                    lightgrey: 13882323,
                    lightpink: 16758465,
                    lightsalmon: 16752762,
                    lightseagreen: 2142890,
                    lightskyblue: 8900346,
                    lightslategray: 7833753,
                    lightslategrey: 7833753,
                    lightsteelblue: 11584734,
                    lightyellow: 16777184,
                    lime: 65280,
                    limegreen: 3329330,
                    linen: 16445670,
                    magenta: 16711935,
                    maroon: 8388608,
                    mediumaquamarine: 6737322,
                    mediumblue: 205,
                    mediumorchid: 12211667,
                    mediumpurple: 9662683,
                    mediumseagreen: 3978097,
                    mediumslateblue: 8087790,
                    mediumspringgreen: 64154,
                    mediumturquoise: 4772300,
                    mediumvioletred: 13047173,
                    midnightblue: 1644912,
                    mintcream: 16121850,
                    mistyrose: 16770273,
                    moccasin: 16770229,
                    navajowhite: 16768685,
                    navy: 128,
                    oldlace: 16643558,
                    olive: 8421376,
                    olivedrab: 7048739,
                    orange: 16753920,
                    orangered: 16729344,
                    orchid: 14315734,
                    palegoldenrod: 15657130,
                    palegreen: 10025880,
                    paleturquoise: 11529966,
                    palevioletred: 14381203,
                    papayawhip: 16773077,
                    peachpuff: 16767673,
                    peru: 13468991,
                    pink: 16761035,
                    plum: 14524637,
                    powderblue: 11591910,
                    purple: 8388736,
                    rebeccapurple: 6697881,
                    red: 16711680,
                    rosybrown: 12357519,
                    royalblue: 4286945,
                    saddlebrown: 9127187,
                    salmon: 16416882,
                    sandybrown: 16032864,
                    seagreen: 3050327,
                    seashell: 16774638,
                    sienna: 10506797,
                    silver: 12632256,
                    skyblue: 8900331,
                    slateblue: 6970061,
                    slategray: 7372944,
                    slategrey: 7372944,
                    snow: 16775930,
                    springgreen: 65407,
                    steelblue: 4620980,
                    tan: 13808780,
                    teal: 32896,
                    thistle: 14204888,
                    tomato: 16737095,
                    turquoise: 4251856,
                    violet: 15631086,
                    wheat: 16113331,
                    white: 16777215,
                    whitesmoke: 16119285,
                    yellow: 16776960,
                    yellowgreen: 10145074
                };
                function y() {
                    return this.rgb().formatHex()
                }
                function v() {
                    return I(this).formatHsl()
                }
                function m() {
                    return this.rgb().formatRgb()
                }
                function x(e) {
                    var t,
                    n;
                    return e = (e + "").trim().toLowerCase(),
                    (t = u.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), 6 === n ? w(t) : 3 === n ? new A(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, (15 & t) << 4 | 15 & t, 1) : 8 === n ? M(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (255 & t) / 255) : 4 === n ? M(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, ((15 & t) << 4 | 15 & t) / 255) : null) : (t = l.exec(e)) ? new A(t[1], t[2], t[3], 1) : (t = s.exec(e)) ? new A(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, 1) : (t = d.exec(e)) ? M(t[1], t[2], t[3], t[4]) : (t = h.exec(e)) ? M(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = b.exec(e)) ? C(t[1], t[2] / 100, t[3] / 100, 1) : (t = p.exec(e)) ? C(t[1], t[2] / 100, t[3] / 100, t[4]) : g.hasOwnProperty(e) ? w(g[e]) : "transparent" === e ? new A(NaN, NaN, NaN, 0) : null
                }
                function w(e) {
                    return new A(e >> 16 & 255, e >> 8 & 255, 255 & e, 1)
                }
                function M(e, t, n, r) {
                    return r <= 0 && (e = t = n = NaN),
                    new A(e, t, n, r)
                }
                function S(e) {
                    return e instanceof r || (e = x(e)),
                    e ? new A((e = e.rgb()).r, e.g, e.b, e.opacity) : new A
                }
                function E(e, t, n, r) {
                    return 1 === arguments.length ? S(e) : new A(e, t, n, null == r ? 1 : r)
                }
                function A(e, t, n, r) {
                    this.r = +e,
                    this.g = +t,
                    this.b = +n,
                    this.opacity = +r
                }
                function N() {
                    return "#" + k(this.r) + k(this.g) + k(this.b)
                }
                function _() {
                    var e = this.opacity;
                    return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === e ? ")" : ", " + e + ")")
                }
                function k(e) {
                    return ((e = Math.max(0, Math.min(255, Math.round(e) || 0))) < 16 ? "0" : "") + e.toString(16)
                }
                function C(e, t, n, r) {
                    return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN),
                    new j(e, t, n, r)
                }
                function I(e) {
                    if (e instanceof j)
                        return new j(e.h, e.s, e.l, e.opacity);
                    if (e instanceof r || (e = x(e)), !e)
                        return new j;
                    if (e instanceof j)
                        return e;
                    var t = (e = e.rgb()).r / 255,
                    n = e.g / 255,
                    a = e.b / 255,
                    i = Math.min(t, n, a),
                    o = Math.max(t, n, a),
                    f = NaN,
                    c = o - i,
                    u = (o + i) / 2;
                    return c ? (f = t === o ? (n - a) / c + 6 * (n < a) : n === o ? (a - t) / c + 2 : (t - n) / c + 4, c /= u < .5 ? o + i : 2 - o - i, f *= 60) : c = u > 0 && u < 1 ? 0 : f,
                    new j(f, c, u, e.opacity)
                }
                function P(e, t, n, r) {
                    return 1 === arguments.length ? I(e) : new j(e, t, n, null == r ? 1 : r)
                }
                function j(e, t, n, r) {
                    this.h = +e,
                    this.s = +t,
                    this.l = +n,
                    this.opacity = +r
                }
                function O(e, t, n) {
                    return 255 * (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t)
                }
                t(r, x, {
                    copy: function (e) {
                        return Object.assign(new this.constructor, this, e)
                    },
                    displayable: function () {
                        return this.rgb().displayable()
                    },
                    hex: y,
                    formatHex: y,
                    formatHsl: v,
                    formatRgb: m,
                    toString: m
                }),
                t(A, E, n(r, {
                        brighter: function (e) {
                            return e = null == e ? i : Math.pow(i, e),
                            new A(this.r * e, this.g * e, this.b * e, this.opacity)
                        },
                        darker: function (e) {
                            return e = null == e ? a : Math.pow(a, e),
                            new A(this.r * e, this.g * e, this.b * e, this.opacity)
                        },
                        rgb: function () {
                            return this
                        },
                        displayable: function () {
                            return  - .5 <= this.r && this.r < 255.5 &&  - .5 <= this.g && this.g < 255.5 &&  - .5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
                        },
                        hex: N,
                        formatHex: N,
                        formatRgb: _,
                        toString: _
                    })),
                t(j, P, n(r, {
                        brighter: function (e) {
                            return e = null == e ? i : Math.pow(i, e),
                            new j(this.h, this.s, this.l * e, this.opacity)
                        },
                        darker: function (e) {
                            return e = null == e ? a : Math.pow(a, e),
                            new j(this.h, this.s, this.l * e, this.opacity)
                        },
                        rgb: function () {
                            var e = this.h % 360 + 360 * (this.h < 0),
                            t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
                            n = this.l,
                            r = n + (n < .5 ? n : 1 - n) * t,
                            a = 2 * n - r;
                            return new A(O(e >= 240 ? e - 240 : e + 120, a, r), O(e, a, r), O(e < 120 ? e + 240 : e - 120, a, r), this.opacity)
                        },
                        displayable: function () {
                            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
                        },
                        formatHsl: function () {
                            var e = this.opacity;
                            return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === e ? ")" : ", " + e + ")")
                        }
                    }));
                const z = Math.PI / 180,
                D = 180 / Math.PI,
                R = 18,
                T = .96422,
                G = 1,
                q = .82521,
                B = 4 / 29,
                L = 6 / 29,
                F = 3 * L * L,
                W = L * L * L;
                function V(e) {
                    if (e instanceof Y)
                        return new Y(e.l, e.a, e.b, e.opacity);
                    if (e instanceof te)
                        return ne(e);
                    e instanceof A || (e = S(e));
                    var t,
                    n,
                    r = Q(e.r),
                    a = Q(e.g),
                    i = Q(e.b),
                    o = X((.2225045 * r + .7168786 * a + .0606169 * i) / G);
                    return r === a && a === i ? t = n = o : (t = X((.4360747 * r + .3850649 * a + .1430804 * i) / T), n = X((.0139322 * r + .0971045 * a + .7141733 * i) / q)),
                    new Y(116 * o - 16, 500 * (t - o), 200 * (o - n), e.opacity)
                }
                function $(e, t) {
                    return new Y(e, 0, 0, null == t ? 1 : t)
                }
                function H(e, t, n, r) {
                    return 1 === arguments.length ? V(e) : new Y(e, t, n, null == r ? 1 : r)
                }
                function Y(e, t, n, r) {
                    this.l = +e,
                    this.a = +t,
                    this.b = +n,
                    this.opacity = +r
                }
                function X(e) {
                    return e > W ? Math.pow(e, 1 / 3) : e / F + B
                }
                function K(e) {
                    return e > L ? e * e * e : F * (e - B)
                }
                function U(e) {
                    return 255 * (e <= .0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055)
                }
                function Q(e) {
                    return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                }
                function Z(e) {
                    if (e instanceof te)
                        return new te(e.h, e.c, e.l, e.opacity);
                    if (e instanceof Y || (e = V(e)), 0 === e.a && 0 === e.b)
                        return new te(NaN, 0 < e.l && e.l < 100 ? 0 : NaN, e.l, e.opacity);
                    var t = Math.atan2(e.b, e.a) * D;
                    return new te(t < 0 ? t + 360 : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity)
                }
                function J(e, t, n, r) {
                    return 1 === arguments.length ? Z(e) : new te(n, t, e, null == r ? 1 : r)
                }
                function ee(e, t, n, r) {
                    return 1 === arguments.length ? Z(e) : new te(e, t, n, null == r ? 1 : r)
                }
                function te(e, t, n, r) {
                    this.h = +e,
                    this.c = +t,
                    this.l = +n,
                    this.opacity = +r
                }
                function ne(e) {
                    if (isNaN(e.h))
                        return new Y(e.l, 0, 0, e.opacity);
                    var t = e.h * z;
                    return new Y(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity)
                }
                t(Y, H, n(r, {
                        brighter: function (e) {
                            return new Y(this.l + R * (null == e ? 1 : e), this.a, this.b, this.opacity)
                        },
                        darker: function (e) {
                            return new Y(this.l - R * (null == e ? 1 : e), this.a, this.b, this.opacity)
                        },
                        rgb: function () {
                            var e = (this.l + 16) / 116,
                            t = isNaN(this.a) ? e : e + this.a / 500,
                            n = isNaN(this.b) ? e : e - this.b / 200;
                            return new A(U(3.1338561 * (t = T * K(t)) - 1.6168667 * (e = G * K(e)) - .4906146 * (n = q * K(n))), U( - .9787684 * t + 1.9161415 * e + .033454 * n), U(.0719453 * t - .2289914 * e + 1.4052427 * n), this.opacity)
                        }
                    })),
                t(te, ee, n(r, {
                        brighter: function (e) {
                            return new te(this.h, this.c, this.l + R * (null == e ? 1 : e), this.opacity)
                        },
                        darker: function (e) {
                            return new te(this.h, this.c, this.l - R * (null == e ? 1 : e), this.opacity)
                        },
                        rgb: function () {
                            return ne(this).rgb()
                        }
                    }));
                var re =  - .14861,
                ae = 1.78277,
                ie =  - .29227,
                oe =  - .90649,
                fe = 1.97294,
                ce = fe * oe,
                ue = fe * ae,
                le = ae * ie - oe * re;
                function se(e) {
                    if (e instanceof he)
                        return new he(e.h, e.s, e.l, e.opacity);
                    e instanceof A || (e = S(e));
                    var t = e.r / 255,
                    n = e.g / 255,
                    r = e.b / 255,
                    a = (le * r + ce * t - ue * n) / (le + ce - ue),
                    i = r - a,
                    o = (fe * (n - a) - ie * i) / oe,
                    f = Math.sqrt(o * o + i * i) / (fe * a * (1 - a)),
                    c = f ? Math.atan2(o, i) * D - 120 : NaN;
                    return new he(c < 0 ? c + 360 : c, f, a, e.opacity)
                }
                function de(e, t, n, r) {
                    return 1 === arguments.length ? se(e) : new he(e, t, n, null == r ? 1 : r)
                }
                function he(e, t, n, r) {
                    this.h = +e,
                    this.s = +t,
                    this.l = +n,
                    this.opacity = +r
                }
                t(he, de, n(r, {
                        brighter: function (e) {
                            return e = null == e ? i : Math.pow(i, e),
                            new he(this.h, this.s, this.l * e, this.opacity)
                        },
                        darker: function (e) {
                            return e = null == e ? a : Math.pow(a, e),
                            new he(this.h, this.s, this.l * e, this.opacity)
                        },
                        rgb: function () {
                            var e = isNaN(this.h) ? 0 : (this.h + 120) * z,
                            t = +this.l,
                            n = isNaN(this.s) ? 0 : this.s * t * (1 - t),
                            r = Math.cos(e),
                            a = Math.sin(e);
                            return new A(255 * (t + n * (re * r + ae * a)), 255 * (t + n * (ie * r + oe * a)), 255 * (t + n * (fe * r)), this.opacity)
                        }
                    })),
                e.color = x,
                e.cubehelix = de,
                e.gray = $,
                e.hcl = ee,
                e.hsl = P,
                e.lab = H,
                e.lch = J,
                e.rgb = E,
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }
            (t)
        }
        (0, wn.exports),
        function (e, t) {
            !function (e, t) {
                function n(e, t, n, r, a) {
                    var i = e * e,
                    o = i * e;
                    return ((1 - 3 * e + 3 * i - o) * t + (4 - 6 * i + 3 * o) * n + (1 + 3 * e + 3 * i - 3 * o) * r + o * a) / 6
                }
                function r(e) {
                    var t = e.length - 1;
                    return function (r) {
                        var a = r <= 0 ? r = 0 : r >= 1 ? (r = 1, t - 1) : Math.floor(r * t),
                        i = e[a],
                        o = e[a + 1],
                        f = a > 0 ? e[a - 1] : 2 * i - o,
                        c = a < t - 1 ? e[a + 2] : 2 * o - i;
                        return n((r - a / t) * t, f, i, o, c)
                    }
                }
                function a(e) {
                    var t = e.length;
                    return function (r) {
                        var a = Math.floor(((r %= 1) < 0 ? ++r : r) * t),
                        i = e[(a + t - 1) % t],
                        o = e[a % t],
                        f = e[(a + 1) % t],
                        c = e[(a + 2) % t];
                        return n((r - a / t) * t, i, o, f, c)
                    }
                }
                var i = e => () => e;
                function o(e, t) {
                    return function (n) {
                        return e + n * t
                    }
                }
                function f(e, t, n) {
                    return e = Math.pow(e, n),
                    t = Math.pow(t, n) - e,
                    n = 1 / n,
                    function (r) {
                        return Math.pow(e + r * t, n)
                    }
                }
                function c(e, t) {
                    var n = t - e;
                    return n ? o(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : i(isNaN(e) ? t : e)
                }
                function u(e) {
                    return 1 == (e = +e) ? l : function (t, n) {
                        return n - t ? f(t, n, e) : i(isNaN(t) ? n : t)
                    }
                }
                function l(e, t) {
                    var n = t - e;
                    return n ? o(e, n) : i(isNaN(e) ? t : e)
                }
                var s = function e(n) {
                    var r = u(n);
                    function a(e, n) {
                        var a = r((e = t.rgb(e)).r, (n = t.rgb(n)).r),
                        i = r(e.g, n.g),
                        o = r(e.b, n.b),
                        f = l(e.opacity, n.opacity);
                        return function (t) {
                            return e.r = a(t),
                            e.g = i(t),
                            e.b = o(t),
                            e.opacity = f(t),
                            e + ""
                        }
                    }
                    return a.gamma = e,
                    a
                }
                (1);
                function d(e) {
                    return function (n) {
                        var r,
                        a,
                        i = n.length,
                        o = new Array(i),
                        f = new Array(i),
                        c = new Array(i);
                        for (r = 0; r < i; ++r)
                            a = t.rgb(n[r]), o[r] = a.r || 0, f[r] = a.g || 0, c[r] = a.b || 0;
                        return o = e(o),
                        f = e(f),
                        c = e(c),
                        a.opacity = 1,
                        function (e) {
                            return a.r = o(e),
                            a.g = f(e),
                            a.b = c(e),
                            a + ""
                        }
                    }
                }
                var h = d(r),
                b = d(a);
                function p(e, t) {
                    t || (t = []);
                    var n,
                    r = e ? Math.min(t.length, e.length) : 0,
                    a = t.slice();
                    return function (i) {
                        for (n = 0; n < r; ++n)
                            a[n] = e[n] * (1 - i) + t[n] * i;
                        return a
                    }
                }
                function g(e) {
                    return ArrayBuffer.isView(e) && !(e instanceof DataView)
                }
                function y(e, t) {
                    return (g(t) ? p : v)(e, t)
                }
                function v(e, t) {
                    var n,
                    r = t ? t.length : 0,
                    a = e ? Math.min(r, e.length) : 0,
                    i = new Array(a),
                    o = new Array(r);
                    for (n = 0; n < a; ++n)
                        i[n] = _(e[n], t[n]);
                    for (; n < r; ++n)
                        o[n] = t[n];
                    return function (e) {
                        for (n = 0; n < a; ++n)
                            o[n] = i[n](e);
                        return o
                    }
                }
                function m(e, t) {
                    var n = new Date;
                    return e = +e,
                    t = +t,
                    function (r) {
                        return n.setTime(e * (1 - r) + t * r),
                        n
                    }
                }
                function x(e, t) {
                    return e = +e,
                    t = +t,
                    function (n) {
                        return e * (1 - n) + t * n
                    }
                }
                function w(e, t) {
                    var n,
                    r = {},
                    a = {};
                    for (n in null !== e && "object" == typeof e || (e = {}), null !== t && "object" == typeof t || (t = {}), t)
                        n in e ? r[n] = _(e[n], t[n]) : a[n] = t[n];
                    return function (e) {
                        for (n in r)
                            a[n] = r[n](e);
                        return a
                    }
                }
                var M = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
                S = new RegExp(M.source, "g");
                function E(e) {
                    return function () {
                        return e
                    }
                }
                function A(e) {
                    return function (t) {
                        return e(t) + ""
                    }
                }
                function N(e, t) {
                    var n,
                    r,
                    a,
                    i = M.lastIndex = S.lastIndex = 0,
                    o = -1,
                    f = [],
                    c = [];
                    for (e += "", t += ""; (n = M.exec(e)) && (r = S.exec(t)); )
                        (a = r.index) > i && (a = t.slice(i, a), f[o] ? f[o] += a : f[++o] = a), (n = n[0]) === (r = r[0]) ? f[o] ? f[o] += r : f[++o] = r : (f[++o] = null, c.push({
                                    i: o,
                                    x: x(n, r)
                                })), i = S.lastIndex;
                    return i < t.length && (a = t.slice(i), f[o] ? f[o] += a : f[++o] = a),
                    f.length < 2 ? c[0] ? A(c[0].x) : E(t) : (t = c.length, function (e) {
                        for (var n, r = 0; r < t; ++r)
                            f[(n = c[r]).i] = n.x(e);
                        return f.join("")
                    })
                }
                function _(e, n) {
                    var r,
                    a = typeof n;
                    return null == n || "boolean" === a ? i(n) : ("number" === a ? x : "string" === a ? (r = t.color(n)) ? (n = r, s) : N : n instanceof t.color ? s : n instanceof Date ? m : g(n) ? p : Array.isArray(n) ? v : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? w : x)(e, n)
                }
                function k(e) {
                    var t = e.length;
                    return function (n) {
                        return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))]
                    }
                }
                function C(e, t) {
                    var n = c(+e, +t);
                    return function (e) {
                        var t = n(e);
                        return t - 360 * Math.floor(t / 360)
                    }
                }
                function I(e, t) {
                    return e = +e,
                    t = +t,
                    function (n) {
                        return Math.round(e * (1 - n) + t * n)
                    }
                }
                var P,
                j = 180 / Math.PI,
                O = {
                    translateX: 0,
                    translateY: 0,
                    rotate: 0,
                    skewX: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                function z(e, t, n, r, a, i) {
                    var o,
                    f,
                    c;
                    return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o),
                    (c = e * n + t * r) && (n -= e * c, r -= t * c),
                    (f = Math.sqrt(n * n + r * r)) && (n /= f, r /= f, c /= f),
                    e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
                        translateX: a,
                        translateY: i,
                        rotate: Math.atan2(t, e) * j,
                        skewX: Math.atan(c) * j,
                        scaleX: o,
                        scaleY: f
                    }
                }
                function D(e) {
                    const t = new("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(e + "");
                    return t.isIdentity ? O : z(t.a, t.b, t.c, t.d, t.e, t.f)
                }
                function R(e) {
                    return null == e ? O : (P || (P = document.createElementNS("http://www.w3.org/2000/svg", "g")), P.setAttribute("transform", e), (e = P.transform.baseVal.consolidate()) ? z((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f) : O)
                }
                function T(e, t, n, r) {
                    function a(e) {
                        return e.length ? e.pop() + " " : ""
                    }
                    function i(e, r, a, i, o, f) {
                        if (e !== a || r !== i) {
                            var c = o.push("translate(", null, t, null, n);
                            f.push({
                                i: c - 4,
                                x: x(e, a)
                            }, {
                                i: c - 2,
                                x: x(r, i)
                            })
                        } else (a || i) && o.push("translate(" + a + t + i + n)
                    }
                    function o(e, t, n, i) {
                        e !== t ? (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), i.push({
                                i: n.push(a(n) + "rotate(", null, r) - 2,
                                x: x(e, t)
                            })) : t && n.push(a(n) + "rotate(" + t + r)
                    }
                    function f(e, t, n, i) {
                        e !== t ? i.push({
                            i: n.push(a(n) + "skewX(", null, r) - 2,
                            x: x(e, t)
                        }) : t && n.push(a(n) + "skewX(" + t + r)
                    }
                    function c(e, t, n, r, i, o) {
                        if (e !== n || t !== r) {
                            var f = i.push(a(i) + "scale(", null, ",", null, ")");
                            o.push({
                                i: f - 4,
                                x: x(e, n)
                            }, {
                                i: f - 2,
                                x: x(t, r)
                            })
                        } else
                            1 === n && 1 === r || i.push(a(i) + "scale(" + n + "," + r + ")")
                    }
                    return function (t, n) {
                        var r = [],
                        a = [];
                        return t = e(t),
                        n = e(n),
                        i(t.translateX, t.translateY, n.translateX, n.translateY, r, a),
                        o(t.rotate, n.rotate, r, a),
                        f(t.skewX, n.skewX, r, a),
                        c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, a),
                        t = n = null,
                        function (e) {
                            for (var t, n = -1, i = a.length; ++n < i; )
                                r[(t = a[n]).i] = t.x(e);
                            return r.join("")
                        }
                    }
                }
                var G = T(D, "px, ", "px)", "deg)"),
                q = T(R, ", ", ")", ")"),
                B = 1e-12;
                function L(e) {
                    return ((e = Math.exp(e)) + 1 / e) / 2
                }
                function F(e) {
                    return ((e = Math.exp(e)) - 1 / e) / 2
                }
                function W(e) {
                    return ((e = Math.exp(2 * e)) - 1) / (e + 1)
                }
                var V = function e(t, n, r) {
                    function a(e, a) {
                        var i,
                        o,
                        f = e[0],
                        c = e[1],
                        u = e[2],
                        l = a[0],
                        s = a[1],
                        d = a[2],
                        h = l - f,
                        b = s - c,
                        p = h * h + b * b;
                        if (p < B)
                            o = Math.log(d / u) / t, i = function (e) {
                                return [f + e * h, c + e * b, u * Math.exp(t * e * o)]
                            };
                        else {
                            var g = Math.sqrt(p),
                            y = (d * d - u * u + r * p) / (2 * u * n * g),
                            v = (d * d - u * u - r * p) / (2 * d * n * g),
                            m = Math.log(Math.sqrt(y * y + 1) - y),
                            x = Math.log(Math.sqrt(v * v + 1) - v);
                            o = (x - m) / t,
                            i = function (e) {
                                var r = e * o,
                                a = L(m),
                                i = u / (n * g) * (a * W(t * r + m) - F(m));
                                return [f + i * h, c + i * b, u * a / L(t * r + m)]
                            }
                        }
                        return i.duration = 1e3 * o * t / Math.SQRT2,
                        i
                    }
                    return a.rho = function (t) {
                        var n = Math.max(.001, +t),
                        r = n * n;
                        return e(n, r, r * r)
                    },
                    a
                }
                (Math.SQRT2, 2, 4);
                function $(e) {
                    return function (n, r) {
                        var a = e((n = t.hsl(n)).h, (r = t.hsl(r)).h),
                        i = l(n.s, r.s),
                        o = l(n.l, r.l),
                        f = l(n.opacity, r.opacity);
                        return function (e) {
                            return n.h = a(e),
                            n.s = i(e),
                            n.l = o(e),
                            n.opacity = f(e),
                            n + ""
                        }
                    }
                }
                var H = $(c),
                Y = $(l);
                function X(e, n) {
                    var r = l((e = t.lab(e)).l, (n = t.lab(n)).l),
                    a = l(e.a, n.a),
                    i = l(e.b, n.b),
                    o = l(e.opacity, n.opacity);
                    return function (t) {
                        return e.l = r(t),
                        e.a = a(t),
                        e.b = i(t),
                        e.opacity = o(t),
                        e + ""
                    }
                }
                function K(e) {
                    return function (n, r) {
                        var a = e((n = t.hcl(n)).h, (r = t.hcl(r)).h),
                        i = l(n.c, r.c),
                        o = l(n.l, r.l),
                        f = l(n.opacity, r.opacity);
                        return function (e) {
                            return n.h = a(e),
                            n.c = i(e),
                            n.l = o(e),
                            n.opacity = f(e),
                            n + ""
                        }
                    }
                }
                var U = K(c),
                Q = K(l);
                function Z(e) {
                    return function n(r) {
                        function a(n, a) {
                            var i = e((n = t.cubehelix(n)).h, (a = t.cubehelix(a)).h),
                            o = l(n.s, a.s),
                            f = l(n.l, a.l),
                            c = l(n.opacity, a.opacity);
                            return function (e) {
                                return n.h = i(e),
                                n.s = o(e),
                                n.l = f(Math.pow(e, r)),
                                n.opacity = c(e),
                                n + ""
                            }
                        }
                        return r = +r,
                        a.gamma = n,
                        a
                    }
                    (1)
                }
                var J = Z(c),
                ee = Z(l);
                function te(e, t) {
                    void 0 === t && (t = e, e = _);
                    for (var n = 0, r = t.length - 1, a = t[0], i = new Array(r < 0 ? 0 : r); n < r; )
                        i[n] = e(a, a = t[++n]);
                    return function (e) {
                        var t = Math.max(0, Math.min(r - 1, Math.floor(e *= r)));
                        return i[t](e - t)
                    }
                }
                function ne(e, t) {
                    for (var n = new Array(t), r = 0; r < t; ++r)
                        n[r] = e(r / (t - 1));
                    return n
                }
                e.interpolate = _,
                e.interpolateArray = y,
                e.interpolateBasis = r,
                e.interpolateBasisClosed = a,
                e.interpolateCubehelix = J,
                e.interpolateCubehelixLong = ee,
                e.interpolateDate = m,
                e.interpolateDiscrete = k,
                e.interpolateHcl = U,
                e.interpolateHclLong = Q,
                e.interpolateHsl = H,
                e.interpolateHslLong = Y,
                e.interpolateHue = C,
                e.interpolateLab = X,
                e.interpolateNumber = x,
                e.interpolateNumberArray = p,
                e.interpolateObject = w,
                e.interpolateRgb = s,
                e.interpolateRgbBasis = h,
                e.interpolateRgbBasisClosed = b,
                e.interpolateRound = I,
                e.interpolateString = N,
                e.interpolateTransformCss = G,
                e.interpolateTransformSvg = q,
                e.interpolateZoom = V,
                e.piecewise = te,
                e.quantize = ne,
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }
            (t, wn.exports)
        }
        (0, xn.exports);
        var Mn = e => xn.exports.interpolateRgbBasis(e[e.length - 1]),
        Sn = Mn(new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(mn)),
        En = Mn(new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(mn)),
        An = Mn(new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(mn)),
        Nn = Mn(new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(mn)),
        _n = Mn(new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(mn)),
        kn = Mn(new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(mn)),
        Cn = Mn(new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(mn)),
        In = Mn(new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(mn)),
        Pn = Mn(new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(mn)),
        jn = Mn(new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(mn)),
        On = Mn(new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(mn)),
        zn = Mn(new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(mn)),
        Dn = Mn(new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(mn)),
        Rn = Mn(new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(mn)),
        Tn = Mn(new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(mn)),
        Gn = Mn(new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(mn)),
        qn = Mn(new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(mn)),
        Bn = Mn(new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(mn)),
        Ln = Mn(new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(mn)),
        Fn = Mn(new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(mn)),
        Wn = Mn(new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(mn)),
        Vn = Mn(new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(mn)),
        $n = Mn(new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(mn)),
        Hn = Mn(new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(mn)),
        Yn = Mn(new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(mn)),
        Xn = Mn(new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(mn)),
        Kn = Mn(new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(mn));
        var Un = xn.exports.interpolateCubehelixLong(wn.exports.cubehelix(300, .5, 0), wn.exports.cubehelix(-240, .5, 1)),
        Qn = xn.exports.interpolateCubehelixLong(wn.exports.cubehelix(-100, .75, .35), wn.exports.cubehelix(80, 1.5, .8)),
        Zn = xn.exports.interpolateCubehelixLong(wn.exports.cubehelix(260, .75, .35), wn.exports.cubehelix(80, 1.5, .8)),
        Jn = wn.exports.cubehelix();
        var er = wn.exports.rgb(),
        tr = Math.PI / 3,
        nr = 2 * Math.PI / 3;
        function rr(e) {
            var t = e.length;
            return function (n) {
                return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))]
            }
        }
        var ar = rr(mn("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),
        ir = rr(mn("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),
        or = rr(mn("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),
        fr = rr(mn("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
        const cr = {
            position: "chartArea",
            property: "value",
            grid: {
                z: 1,
                drawOnChartArea: !1
            },
            ticks: {
                z: 1
            },
            legend: {
                align: "right",
                position: "bottom-right",
                length: 100,
                width: 50,
                margin: 8,
                indicatorWidth: 10
            }
        };
        class ur extends t.LinearScale {
            constructor() {
                super(...arguments),
                this.legendSize = {
                    w: 0,
                    h: 0
                }
            }
            init(e) {
                e.position = "chartArea",
                super.init(e),
                this.axis = "r"
            }
            parse(e, t) {
                return e && "number" == typeof e[this.options.property] ? e[this.options.property] : super.parse(e, t)
            }
            isHorizontal() {
                return "top" === this.options.legend.align || "bottom" === this.options.legend.align
            }
            _getNormalizedValue(e) {
                return null == e || Number.isNaN(e) ? null : (e - this._startValue) / this._valueRange
            }
            update(e, t, n) {
                const r = Math.min(t, null == this.bottom ? Number.POSITIVE_INFINITY : this.bottom),
                a = Math.min(e, null == this.right ? Number.POSITIVE_INFINITY : this.right),
                i = this.options.legend,
                o = this.isHorizontal(),
                f = (e, t) => e < 1 ? t * e : e,
                c = Math.min(a, f(o ? i.length : i.width, a)) - (o ? 0 : i.indicatorWidth),
                u = Math.min(r, f(o ? i.width : i.length, r)) - (o ? i.indicatorWidth : 0);
                this.legendSize = {
                    w: c,
                    h: u
                },
                this.bottom = u,
                this.height = u,
                this.right = c,
                this.width = c;
                const l = this.options.position;
                this.options.position = this.options.legend.align;
                const s = super.update(c, u, n);
                return this.options.position = l,
                this.height = Math.min(u, this.height),
                this.width = Math.min(c, this.width),
                s
            }
            _computeLabelArea() {}
            draw(e) {
                if (!this._isVisible())
                    return;
                const t = function (e, t, n, r, a) {
                    const {
                        indicatorWidth: i,
                        align: o,
                        position: f
                    } = t,
                    c = "top" === o || "bottom" === o,
                    u = ("left" === o ? a.w : n) + (c ? i : 0),
                    l = ("top" === o ? a.h : r) + (c ? 0 : i),
                    s = function (e) {
                        const {
                            indicatorWidth: t,
                            align: n,
                            margin: r
                        } = e;
                        return {
                            left: ("number" == typeof r ? r : r.left) + ("right" === n ? t : 0),
                            top: ("number" == typeof r ? r : r.top) + ("bottom" === n ? t : 0),
                            right: ("number" == typeof r ? r : r.right) + ("left" === n ? t : 0),
                            bottom: ("number" == typeof r ? r : r.bottom) + ("top" === n ? t : 0)
                        }
                    }
                    (t);
                    if ("string" == typeof f)
                        switch (f) {
                        case "top-left":
                            return [s.left, s.top];
                        case "top":
                            return [(e.right - u) / 2, s.top];
                        case "left":
                            return [s.left, (e.bottom - l) / 2];
                        case "top-right":
                            return [e.right - u - s.right, s.top];
                        case "bottom-right":
                            return [e.right - u - s.right, e.bottom - l - s.bottom];
                        case "bottom":
                            return [(e.right - u) / 2, e.bottom - l - s.bottom];
                        case "bottom-left":
                            return [s.left, e.bottom - l - s.bottom];
                        default:
                            return [e.right - u - s.right, (e.bottom - l) / 2]
                        }
                    return [f.x, f.y]
                }
                (e, this.options.legend, this.width, this.height, this.legendSize), {
                    ctx: n
                } = this;
                n.save(),
                n.translate(t[0], t[1]);
                const r = this.options.position;
                this.options.position = this.options.legend.align,
                super.draw({
                    ...e,
                    bottom: this.height + 10,
                    right: this.width
                }),
                this.options.position = r;
                const {
                    indicatorWidth: a
                } = this.options.legend;
                switch (this.options.legend.align) {
                case "left":
                    n.translate(this.legendSize.w, 0);
                    break;
                case "top":
                    n.translate(0, this.legendSize.h);
                    break;
                case "bottom":
                    n.translate(0, -a);
                    break;
                default:
                    n.translate(-a, 0)
                }
                this._drawIndicator(),
                n.restore()
            }
            _drawIndicator() {}
        }
        class lr extends t.LogarithmicScale {
            constructor() {
                super(...arguments),
                this.legendSize = {
                    w: 0,
                    h: 0
                }
            }
            init(e) {
                ur.prototype.init.call(this, e)
            }
            parse(e, t) {
                return ur.prototype.parse.call(this, e, t)
            }
            isHorizontal() {
                return "top" === this.options.legend.align || "bottom" === this.options.legend.align
            }
            _getNormalizedValue(e) {
                return null == e || Number.isNaN(e) ? null : (Math.log10(e) - this._startValue) / this._valueRange
            }
            update(e, t, n) {
                return ur.prototype.update.call(this, e, t, n)
            }
            _computeLabelArea() {}
            draw(e) {
                return ur.prototype.draw.call(this, e)
            }
            _drawIndicator() {}
        }
        const sr = {
            interpolateBlues: Vn,
            interpolateBrBG: Sn,
            interpolateBuGn: jn,
            interpolateBuPu: On,
            interpolateCividis: function (e) {
                return e = Math.max(0, Math.min(1, e)),
                "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - e * (35.34 - e * (2381.73 - e * (6402.7 - e * (7024.72 - 2710.57 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + e * (170.73 + e * (52.82 - e * (131.46 - e * (176.58 - 67.37 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + e * (442.36 - e * (2482.43 - e * (6167.24 - e * (6614.94 - 2475.67 * e))))))) + ")"
            },
            interpolateCool: Zn,
            interpolateCubehelixDefault: Un,
            interpolateGnBu: zn,
            interpolateGreens: $n,
            interpolateGreys: Hn,
            interpolateInferno: or,
            interpolateMagma: ir,
            interpolateOrRd: Dn,
            interpolateOranges: Kn,
            interpolatePRGn: En,
            interpolatePiYG: An,
            interpolatePlasma: fr,
            interpolatePuBu: Tn,
            interpolatePuBuGn: Rn,
            interpolatePuOr: Nn,
            interpolatePuRd: Gn,
            interpolatePurples: Yn,
            interpolateRainbow: function (e) {
                (e < 0 || e > 1) && (e -= Math.floor(e));
                var t = Math.abs(e - .5);
                return Jn.h = 360 * e - 100,
                Jn.s = 1.5 - 1.5 * t,
                Jn.l = .8 - .9 * t,
                Jn + ""
            },
            interpolateRdBu: _n,
            interpolateRdGy: kn,
            interpolateRdPu: qn,
            interpolateRdYlBu: Cn,
            interpolateRdYlGn: In,
            interpolateReds: Xn,
            interpolateSinebow: function (e) {
                var t;
                return e = (.5 - e) * Math.PI,
                er.r = 255 * (t = Math.sin(e)) * t,
                er.g = 255 * (t = Math.sin(e + tr)) * t,
                er.b = 255 * (t = Math.sin(e + nr)) * t,
                er + ""
            },
            interpolateSpectral: Pn,
            interpolateTurbo: function (e) {
                return e = Math.max(0, Math.min(1, e)),
                "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + e * (1172.33 - e * (10793.56 - e * (33300.12 - e * (38394.49 - 14825.05 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + e * (557.33 + e * (1225.33 - e * (3574.96 - e * (1073.77 + 707.56 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + e * (3211.1 - e * (15327.97 - e * (27814 - e * (22569.18 - 6838.66 * e))))))) + ")"
            },
            interpolateViridis: ar,
            interpolateWarm: Qn,
            interpolateYlGn: Ln,
            interpolateYlGnBu: Bn,
            interpolateYlOrBr: Fn,
            interpolateYlOrRd: Wn
        };
        function dr(e, t) {
            const n = 1 / t;
            if (e <= n)
                return 0;
            if (e >= 1 - n)
                return 1;
            for (let t = 0; t < 1; t += n)
                if (e < t)
                    return t - n / 2;
            return e
        }
        Object.keys(sr).forEach((e => {
                sr[`${e.charAt(11).toLowerCase()}${e.slice(12)}`] = sr[e],
                sr[e.slice(11)] = sr[e]
            }));
        const hr = {
            interpolate: "blues",
            missing: "transparent",
            quantize: 0
        };
        class br extends ur {
            constructor() {
                super(...arguments),
                this.interpolate = e => `rgb(${e},${e},${e})`
            }
            init(e) {
                super.init(e),
                "function" == typeof e.interpolate ? this.interpolate = e.interpolate : this.interpolate = sr[e.interpolate] || sr.blues
            }
            getColorForValue(e) {
                const t = this._getNormalizedValue(e);
                return null == t || Number.isNaN(t) ? this.options.missing : this.getColor(t)
            }
            getColor(e) {
                let t = e;
                return this.options.quantize > 0 && (t = dr(t, this.options.quantize)),
                this.interpolate(t)
            }
            _drawIndicator() {
                const {
                    indicatorWidth: e
                } = this.options.legend,
                t = this._reversePixels;
                if (this.isHorizontal()) {
                    const n = this.width;
                    if (this.options.quantize > 0) {
                        const r = n / this.options.quantize,
                        a = t ? e => n - r - e : e => e;
                        for (let t = 0; t < n; t += r) {
                            const i = (t + r / 2) / n;
                            this.ctx.fillStyle = this.getColor(i),
                            this.ctx.fillRect(a(t), 0, r, e)
                        }
                    } else {
                        const r = t ? e => n - 1 - e : e => e;
                        for (let t = 0; t < n; t += 1)
                            this.ctx.fillStyle = this.getColor((t + .5) / n), this.ctx.fillRect(r(t), 0, 1, e)
                    }
                } else {
                    const n = this.height;
                    if (this.options.quantize > 0) {
                        const r = n / this.options.quantize,
                        a = t ? e => n - r - e : e => e;
                        for (let t = 0; t < n; t += r) {
                            const i = (t + r / 2) / n;
                            this.ctx.fillStyle = this.getColor(i),
                            this.ctx.fillRect(0, a(t), e, r)
                        }
                    } else {
                        const r = t ? e => n - 1 - e : e => e;
                        for (let t = 0; t < n; t += 1)
                            this.ctx.fillStyle = this.getColor((t + .5) / n), this.ctx.fillRect(0, r(t), e, 1)
                    }
                }
            }
        }
        br.id = "color",
        br.defaults = n.merge({}, [t.LinearScale.defaults, cr, hr]),
        br.descriptors = {
            _scriptable: e => "interpolate" !== e,
            _indexable: !1
        };
        class pr extends lr {
            constructor() {
                super(...arguments),
                this.interpolate = e => `rgb(${e},${e},${e})`
            }
            init(e) {
                super.init(e),
                "function" == typeof e.interpolate ? this.interpolate = e.interpolate : this.interpolate = sr[e.interpolate] || sr.blues
            }
            getColorForValue(e) {
                return br.prototype.getColorForValue.call(this, e)
            }
            getColor(e) {
                let t = e;
                return this.options.quantize > 0 && (t = dr(t, this.options.quantize)),
                this.interpolate(t)
            }
            _drawIndicator() {
                return br.prototype._drawIndicator.call(this)
            }
        }
        pr.id = "colorLogarithmic",
        pr.defaults = n.merge({}, [t.LogarithmicScale.defaults, cr, hr]),
        pr.descriptors = {
            _scriptable: e => "interpolate" !== e,
            _indexable: !1
        };
        const gr = {
            missing: 1,
            mode: "area",
            range: [2, 20],
            legend: {
                align: "bottom",
                length: 90,
                width: 70,
                indicatorWidth: 42
            }
        };
        class yr extends ur {
            constructor() {
                super(...arguments),
                this._model = null
            }
            getSizeForValue(e) {
                const t = this._getNormalizedValue(e);
                return null == t || Number.isNaN(t) ? this.options.missing : this.getSizeImpl(t)
            }
            getSizeImpl(e) {
                const[t, n] = this.options.range;
                if ("area" === this.options.mode) {
                    const r = n * n * Math.PI,
                    a = t * t * Math.PI,
                    i = e * (r - a) + a;
                    return Math.sqrt(i / Math.PI)
                }
                return e * (n - t) + t
            }
            _drawIndicator() {
                const {
                    ctx: e
                } = this,
                t = this.options.legend.indicatorWidth / 2,
                r = this.isHorizontal(),
                a = this.ticks,
                i = this._labelItems ? this._labelItems.map((e => ({
                                [r ? "x" : "y"]: e.translation[r ? 0 : 1]
                            }))) : a.map(((e, t) => ({
                                [r ? "x" : "y"]: this.getPixelForTick(t)
                            })));
                if ((this._gridLineItems || []).forEach((n => {
                            if (e.save(), e.strokeStyle = n.color, e.lineWidth = n.width, e.setLineDash && (e.setLineDash(n.borderDash), e.lineDashOffset = n.borderDashOffset), e.beginPath(), this.options.grid.drawTicks)
                                switch (this.options.legend.align) {
                                case "left":
                                    e.moveTo(0, n.ty1),
                                    e.lineTo(t, n.ty2);
                                    break;
                                case "top":
                                    e.moveTo(n.tx1, 0),
                                    e.lineTo(n.tx2, t);
                                    break;
                                case "bottom":
                                    e.moveTo(n.tx1, t),
                                    e.lineTo(n.tx2, 2 * t);
                                    break;
                                default:
                                    e.moveTo(t, n.ty1),
                                    e.lineTo(2 * t, n.ty2)
                                }
                            e.stroke(),
                            e.restore()
                        })), this._model) {
                    const t = this._model;
                    e.strokeStyle = t.borderColor,
                    e.lineWidth = t.borderWidth || 0,
                    e.fillStyle = t.backgroundColor
                } else
                    e.fillStyle = "blue";
                a.forEach(((a, o) => {
                        const f = i[o],
                        c = this.getSizeForValue(a.value),
                        u = r ? f.x : t,
                        l = r ? t : f.y,
                        s = {
                            pointStyle: "circle",
                            borderWidth: 0,
                            ...this._model || {},
                            radius: c
                        };
                        n.drawPoint(e, s, u, l)
                    }))
            }
        }
        yr.id = "size",
        yr.defaults = n.merge({}, [t.LinearScale.defaults, cr, gr]),
        yr.descriptors = {
            _scriptable: !0,
            _indexable: e => "range" !== e
        };
        class vr extends lr {
            constructor() {
                super(...arguments),
                this._model = null
            }
            getSizeForValue(e) {
                const t = this._getNormalizedValue(e);
                return null == t || Number.isNaN(t) ? this.options.missing : this.getSizeImpl(t)
            }
            getSizeImpl(e) {
                return yr.prototype.getSizeImpl.call(this, e)
            }
            _drawIndicator() {
                yr.prototype._drawIndicator.call(this)
            }
        }
        vr.id = "sizeLogarithmic",
        vr.defaults = n.merge({}, [t.LogarithmicScale.defaults, cr, gr]);
        class mr extends t.Element {
            constructor() {
                super(...arguments),
                this.cache = void 0
            }
            inRange(e, t) {
                const n = this.getBounds(),
                r = (Number.isNaN(e) || e >= n.x && e <= n.x2) && (Number.isNaN(t) || t >= n.y && t <= n.y2),
                a = this.projectionScale.geoPath.projection();
                if (r && !Number.isNaN(e) && !Number.isNaN(t) && "function" == typeof a.invert) {
                    const n = a.invert([e, t]);
                    return null != n && function (e, t) {
                        return (e && me.hasOwnProperty(e.type) ? me[e.type] : we)(e, t)
                    }
                    (this.feature, n)
                }
                return r
            }
            inXRange(e) {
                return this.inRange(e, Number.NaN)
            }
            inYRange(e) {
                return this.inRange(Number.NaN, e)
            }
            getCenterPoint() {
                if (this.cache && this.cache.center)
                    return this.cache.center;
                const e = this.projectionScale.geoPath.centroid(this.feature),
                t = {
                    x: e[0],
                    y: e[1]
                };
                return this.cache = {
                    ...this.cache || {},
                    center: t
                },
                t
            }
            getBounds() {
                if (this.cache && this.cache.bounds)
                    return this.cache.bounds;
                const e = this.projectionScale.geoPath.bounds(this.feature),
                t = {
                    x: e[0][0],
                    x2: e[1][0],
                    y: e[0][1],
                    y2: e[1][1],
                    width: e[1][0] - e[0][0],
                    height: e[1][1] - e[0][1]
                };
                return this.cache = {
                    ...this.cache || {},
                    bounds: t
                },
                t
            }
            _drawInCache(e) {
                const t = this.getBounds();
                if (!Number.isFinite(t.x))
                    return;
                const n = this.cache && this.cache.canvas ? this.cache.canvas : e.createElement("canvas");
                n.width = Math.max(Math.ceil(t.width), 1),
                n.height = Math.max(Math.ceil(t.height), 1);
                const r = n.getContext("2d");
                r && (r.clearRect(0, 0, n.width, n.height), r.save(), r.translate(-t.x, -t.y), this._drawImpl(r), r.restore(), this.cache = {
                        ...this.cache || {},
                        canvas: n,
                        canvasKey: this._optionsToKey()
                    })
            }
            _optionsToKey() {
                const {
                    options: e
                } = this;
                return `${e.backgroundColor};${e.borderColor};${e.borderWidth}`
            }
            _drawImpl(e) {
                const {
                    feature: t
                } = this, {
                    options: n
                } = this;
                e.beginPath(),
                this.projectionScale.geoPath.context(e)(t),
                n.backgroundColor && (e.fillStyle = n.backgroundColor, e.fill()),
                n.borderColor && (e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.stroke())
            }
            draw(e) {
                const {
                    feature: t
                } = this;
                if (!t)
                    return;
                this.cache && this.cache.canvasKey === this._optionsToKey() || this._drawInCache(e.canvas.ownerDocument);
                const n = this.getBounds();
                this.cache && this.cache.canvas ? e.drawImage(this.cache.canvas, n.x, n.y, n.width, n.height) : Number.isFinite(n.x) && (e.save(), this._drawImpl(e), e.restore())
            }
        }
        mr.id = "geoFeature",
        mr.defaults = {
            ...t.BarElement.defaults,
            outlineBackgroundColor: null,
            outlineBorderWidth: 0,
            graticuleBorderColor: "#CCCCCC",
            graticuleBorderWidth: 0
        },
        mr.defaultRoutes = {
            outlineBorderColor: "borderColor",
            ...t.BarElement.defaultRoutes || {}
        };
        const xr = {
            showOutline: !1,
            showGraticule: !1,
            clipMap: !0
        },
        wr = {
            scales: {
                xy: {
                    type: vn.id,
                    position: "chartArea",
                    display: !1
                }
            }
        };
        function Mr(e) {
            const t = {
                ...e
            };
            return Object.keys(e).forEach((n => {
                    let r = n;
                    if (n.startsWith("outline")) {
                        const e = n.slice("outline".length);
                        r = e[0].toLowerCase() + e.slice(1)
                    } else {
                        if (!n.startsWith("hoverOutline"))
                            return;
                        r = `hover${n.slice("hoverOutline".length)}`
                    }
                    delete t[n],
                    t[r] = e[n]
                })),
            t
        }
        class Sr extends t.DatasetController {
            getGeoDataset() {
                return super.getDataset()
            }
            getGeoOptions() {
                return this.chart.options
            }
            getProjectionScale() {
                return this.getScaleForId("xy")
            }
            linkScales() {
                const e = this.getGeoDataset(),
                t = this.getMeta();
                t.xAxisID = "xy",
                e.xAxisID = "xy",
                t.yAxisID = "xy",
                e.yAxisID = "xy",
                t.xScale = this.getScaleForId("xy"),
                t.yScale = this.getScaleForId("xy"),
                this.getProjectionScale().computeBounds(this.resolveOutline())
            }
            showOutline() {
                return n.valueOrDefault(this.getGeoDataset().showOutline, this.getGeoOptions().showOutline)
            }
            clipMap() {
                return n.valueOrDefault(this.getGeoDataset().clipMap, this.getGeoOptions().clipMap)
            }
            getGraticule() {
                return n.valueOrDefault(this.getGeoDataset().showGraticule, this.getGeoOptions().showGraticule)
            }
            update(e) {
                super.update(e);
                const t = this.getMeta(),
                n = this.getProjectionScale(),
                r = n.updateBounds();
                if (this.showOutline()) {
                    const a = t.dataset;
                    if (r && delete a.cache, a.projectionScale = n, "resize" !== e) {
                        const n = Mr(this.resolveDatasetElementOptions(e)),
                        r = {
                            feature: this.resolveOutline(),
                            options: n
                        };
                        this.updateElement(a, void 0, r, e),
                        this.getGraticule() && (t.graticule = n)
                    }
                } else
                    this.getGraticule() && "resize" !== e && (t.graticule = Mr(this.resolveDatasetElementOptions(e)));
                this.updateElements(t.data, 0, t.data.length, e),
                r && t.data.forEach((e => delete e.cache))
            }
            resolveOutline() {
                const e = this.getGeoDataset().outline || {
                    type: "Sphere"
                };
                return Array.isArray(e) ? {
                    type: "FeatureCollection",
                    features: e
                }
                 : e
            }
            showGraticule() {
                const e = this.getGraticule(),
                t = this.getMeta().graticule;
                if (!e || !t)
                    return;
                const {
                    ctx: n
                } = this.chart,
                r = this.getProjectionScale().geoPath.context(n);
                if (n.save(), n.beginPath(), "boolean" == typeof e)
                    e && r(Ce()());
                else {
                    const t = Ce();
                    e.stepMajor && t.stepMajor(e.stepMajor),
                    e.stepMinor && t.stepMinor(e.stepMinor),
                    r(t())
                }
                n.strokeStyle = t.graticuleBorderColor,
                n.lineWidth = t.graticuleBorderWidth,
                n.stroke(),
                n.restore()
            }
            draw() {
                const {
                    chart: e
                } = this,
                t = this.clipMap();
                let r = !1;
                !0 !== t && "outline" !== t && "outline+graticule" !== t || (r = !0, n.clipArea(e.ctx, e.chartArea)),
                this.showOutline() && this.getMeta().dataset && this.getMeta().dataset.draw.call(this.getMeta().dataset, e.ctx, e.chartArea),
                !0 === t || "graticule" === t || "outline+graticule" === t ? r || n.clipArea(e.ctx, e.chartArea) : r && (r = !1, n.unclipArea(e.ctx)),
                this.showGraticule(),
                !0 === t || "items" === t ? r || n.clipArea(e.ctx, e.chartArea) : r && (r = !1, n.unclipArea(e.ctx)),
                this.getMeta().data.forEach((t => t.draw.call(t, e.ctx, e.chartArea))),
                r && (r = !1, n.unclipArea(e.ctx))
            }
        }
        function Er(e, n, r, a = [], i = []) {
            t.registry.addControllers(r),
            Array.isArray(a) ? t.registry.addElements(...a) : t.registry.addElements(a),
            Array.isArray(i) ? t.registry.addScales(...i) : t.registry.addScales(i);
            const o = n;
            return o.type = e,
            o
        }
        class Ar extends Sr {
            initialize() {
                super.initialize(),
                this.enableOptionSharing = !0
            }
            linkScales() {
                super.linkScales();
                const e = this.getGeoDataset(),
                t = this.getMeta();
                t.vAxisID = "color",
                t.rAxisID = "color",
                e.vAxisID = "color",
                e.rAxisID = "color",
                t.rScale = this.getScaleForId("color"),
                t.vScale = t.rScale,
                t.iScale = t.xScale,
                t.iAxisID = t.xAxisID,
                e.iAxisID = t.xAxisID
            }
            _getOtherScale(e) {
                return e
            }
            parse(e, t) {
                const n = this.getMeta().rScale, {
                    data: r
                } = this.getDataset(),
                a = this._cachedMeta;
                for (let i = e; i < e + t; i += 1)
                    a._parsed[i] = {
                        [n.axis]: n.parse(r[i], i)
                    }
            }
            updateElements(e, t, n, r) {
                const a = this.resolveDataElementOptions(t, r),
                i = this.getSharedOptions(a),
                o = this.includeOptions(r, i),
                f = this.getProjectionScale();
                this.updateSharedOptions(i, r, a);
                for (let a = t; a < t + n; a += 1) {
                    const t = e[a];
                    t.projectionScale = f,
                    t.feature = this._data[a].feature;
                    const n = t.getCenterPoint(),
                    c = {
                        x: n.x,
                        y: n.y
                    };
                    o && (c.options = i || this.resolveDataElementOptions(a, r)),
                    this.updateElement(t, a, c, r)
                }
            }
            indexToColor(e) {
                const t = this.getMeta().rScale;
                return t.getColorForValue(this.getParsed(e)[t.axis])
            }
        }
        Ar.id = "choropleth",
        Ar.defaults = n.merge({}, [xr, {
                        datasetElementType: mr.id,
                        dataElementType: mr.id
                    }
                ]),
        Ar.overrides = n.merge({}, [wr, {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    title: () => "",
                                    label(e) {
                                        var t,
                                        n,
                                        r,
                                        a;
                                        return null == e.formattedValue ? null === (n = null === (t = e.chart.data) || void 0 === t ? void 0 : t.labels) || void 0 === n ? void 0 : n[e.dataIndex] : `${null===(a=null===(r=e.chart.data)||void 0===r?void 0:r.labels)||void 0===a?void 0:a[e.dataIndex]}: ${e.formattedValue}`
                                    }
                                }
                            }
                        },
                        scales: {
                            color: {
                                type: br.id
                            }
                        },
                        elements: {
                            geoFeature: {
                                backgroundColor(e) {
                                    if (null == e.dataIndex)
                                        return null;
                                    return e.chart.getDatasetMeta(e.datasetIndex).controller.indexToColor(e.dataIndex)
                                }
                            }
                        }
                    }
                ]);
        class Nr extends t.Chart {
            constructor(e, t) {
                super(e, Er("choropleth", t, Ar, mr, [br, vn]))
            }
        }
        Nr.id = Ar.id;
        class _r extends Sr {
            initialize() {
                super.initialize(),
                this.enableOptionSharing = !0
            }
            linkScales() {
                super.linkScales();
                const e = this.getGeoDataset(),
                t = this.getMeta();
                t.vAxisID = "r",
                t.rAxisID = "r",
                e.vAxisID = "r",
                e.rAxisID = "r",
                t.rScale = this.getScaleForId("r"),
                t.vScale = t.rScale,
                t.iScale = t.xScale,
                t.iAxisID = t.xAxisID,
                e.iAxisID = t.xAxisID
            }
            _getOtherScale(e) {
                return e
            }
            parse(e, t) {
                const n = this.getMeta().rScale,
                r = this.getDataset().data,
                a = this._cachedMeta;
                for (let i = e; i < e + t; i += 1) {
                    const e = r[i];
                    a._parsed[i] = {
                        x: null == e.longitude ? e.x : e.longitude,
                        y: null == e.latitude ? e.y : e.latitude,
                        [n.axis]: n.parse(e, i)
                    }
                }
            }
            updateElements(e, t, n, r) {
                const a = "reset" === r,
                i = this.resolveDataElementOptions(t, r),
                o = this.getSharedOptions(i),
                f = this.includeOptions(r, o),
                c = this.getProjectionScale();
                this.getMeta().rScale._model = i,
                this.updateSharedOptions(o, r, i);
                for (let i = t; i < t + n; i += 1) {
                    const t = e[i],
                    n = this.getParsed(i),
                    u = c.projection([n.x, n.y]),
                    l = {
                        x: u ? u[0] : 0,
                        y: u ? u[1] : 0,
                        skip: Number.isNaN(n.x) || Number.isNaN(n.y)
                    };
                    f && (l.options = o || this.resolveDataElementOptions(i, r), a && (l.options.radius = 0)),
                    this.updateElement(t, i, l, r)
                }
            }
            indexToRadius(e) {
                const t = this.getMeta().rScale;
                return t.getSizeForValue(this.getParsed(e)[t.axis])
            }
        }
        _r.id = "bubbleMap",
        _r.defaults = n.merge({}, [xr, {
                        dataElementType: t.PointElement.id,
                        datasetElementType: mr.id,
                        showOutline: !0,
                        clipMap: "outline+graticule"
                    }
                ]),
        _r.overrides = n.merge({}, [wr, {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    title: () => "",
                                    label(e) {
                                        var t,
                                        n,
                                        r,
                                        a;
                                        return null == e.formattedValue ? null === (n = null === (t = e.chart.data) || void 0 === t ? void 0 : t.labels) || void 0 === n ? void 0 : n[e.dataIndex] : `${null===(a=null===(r=e.chart.data)||void 0===r?void 0:r.labels)||void 0===a?void 0:a[e.dataIndex]}: ${e.formattedValue}`
                                    }
                                }
                            }
                        },
                        scales: {
                            r: {
                                type: yr.id
                            }
                        },
                        elements: {
                            point: {
                                radius(e) {
                                    if (null == e.dataIndex)
                                        return null;
                                    return e.chart.getDatasetMeta(e.datasetIndex).controller.indexToRadius(e.dataIndex)
                                },
                                hoverRadius(e) {
                                    if (null == e.dataIndex)
                                        return null;
                                    return e.chart.getDatasetMeta(e.datasetIndex).controller.indexToRadius(e.dataIndex) + 1
                                }
                            }
                        }
                    }
                ]);
        class kr extends t.Chart {
            constructor(e, t) {
                super(e, Er("bubbleMap", t, _r, mr, [yr, vn]))
            }
        }
        function Cr(e) {
            return e
        }
        function Ir(e) {
            if (null == e)
                return Cr;
            var t,
            n,
            r = e.scale[0],
            a = e.scale[1],
            i = e.translate[0],
            o = e.translate[1];
            return function (e, f) {
                f || (t = n = 0);
                var c = 2,
                u = e.length,
                l = new Array(u);
                for (l[0] = (t += e[0]) * r + i, l[1] = (n += e[1]) * a + o; c < u; )
                    l[c] = e[c], ++c;
                return l
            }
        }
        function Pr(e) {
            var t,
            n = Ir(e.transform),
            r = 1 / 0,
            a = r,
            i = -r,
            o = -r;
            function f(e) {
                (e = n(e))[0] < r && (r = e[0]),
                e[0] > i && (i = e[0]),
                e[1] < a && (a = e[1]),
                e[1] > o && (o = e[1])
            }
            function c(e) {
                switch (e.type) {
                case "GeometryCollection":
                    e.geometries.forEach(c);
                    break;
                case "Point":
                    f(e.coordinates);
                    break;
                case "MultiPoint":
                    e.coordinates.forEach(f)
                }
            }
            for (t in e.arcs.forEach((function (e) {
                        for (var t, f = -1, c = e.length; ++f < c; )
                            (t = n(e[f], f))
                                [0] < r && (r = t[0]), t[0] > i && (i = t[0]), t[1] < a && (a = t[1]), t[1] > o && (o = t[1])
                        })), e.objects)c(e.objects[t]);
            return [r, a, i, o]
        }
        function jr(e, t) {
            var n = t.id,
            r = t.bbox,
            a = null == t.properties ? {}
             : t.properties,
            i = Or(e, t);
            return null == n && null == r ? {
                type: "Feature",
                properties: a,
                geometry: i
            }
             : null == r ? {
                type: "Feature",
                id: n,
                properties: a,
                geometry: i
            }
             : {
                type: "Feature",
                id: n,
                bbox: r,
                properties: a,
                geometry: i
            }
        }
        function Or(e, t) {
            var n = Ir(e.transform),
            r = e.arcs;
            function a(e, t) {
                t.length && t.pop();
                for (var a = r[e < 0 ? ~e : e], i = 0, o = a.length; i < o; ++i)
                    t.push(n(a[i], i));
                e < 0 && function (e, t) {
                    for (var n, r = e.length, a = r - t; a < --r; )
                        n = e[a], e[a++] = e[r], e[r] = n
                }
                (t, o)
            }
            function i(e) {
                return n(e)
            }
            function o(e) {
                for (var t = [], n = 0, r = e.length; n < r; ++n)
                    a(e[n], t);
                return t.length < 2 && t.push(t[0]),
                t
            }
            function f(e) {
                for (var t = o(e); t.length < 4; )
                    t.push(t[0]);
                return t
            }
            function c(e) {
                return e.map(f)
            }
            return function e(t) {
                var n,
                r = t.type;
                switch (r) {
                case "GeometryCollection":
                    return {
                        type: r,
                        geometries: t.geometries.map(e)
                    };
                case "Point":
                    n = i(t.coordinates);
                    break;
                case "MultiPoint":
                    n = t.coordinates.map(i);
                    break;
                case "LineString":
                    n = o(t.arcs);
                    break;
                case "MultiLineString":
                    n = t.arcs.map(o);
                    break;
                case "Polygon":
                    n = c(t.arcs);
                    break;
                case "MultiPolygon":
                    n = t.arcs.map(c);
                    break;
                default:
                    return null
                }
                return {
                    type: r,
                    coordinates: n
                }
            }
            (t)
        }
        function zr(e, t) {
            var n = {},
            r = {},
            a = {},
            i = [],
            o = -1;
            function f(e, t) {
                for (var r in e) {
                    var a = e[r];
                    delete t[a.start],
                    delete a.start,
                    delete a.end,
                    a.forEach((function (e) {
                            n[e < 0 ? ~e : e] = 1
                        })),
                    i.push(a)
                }
            }
            return t.forEach((function (n, r) {
                    var a,
                    i = e.arcs[n < 0 ? ~n : n];
                    i.length < 3 && !i[1][0] && !i[1][1] && (a = t[++o], t[o] = n, t[r] = a)
                })),
            t.forEach((function (t) {
                    var n,
                    i,
                    o = function (t) {
                        var n,
                        r = e.arcs[t < 0 ? ~t : t],
                        a = r[0];
                        e.transform ? (n = [0, 0], r.forEach((function (e) {
                                    n[0] += e[0],
                                    n[1] += e[1]
                                }))) : n = r[r.length - 1];
                        return t < 0 ? [n, a] : [a, n]
                    }
                    (t),
                    f = o[0],
                    c = o[1];
                    if (n = a[f])
                        if (delete a[n.end], n.push(t), n.end = c, i = r[c]) {
                            delete r[i.start];
                            var u = i === n ? n : n.concat(i);
                            r[u.start = n.start] = a[u.end = i.end] = u
                        } else
                            r[n.start] = a[n.end] = n;
                    else if (n = r[c])
                        if (delete r[n.start], n.unshift(t), n.start = f, i = a[f]) {
                            delete a[i.end];
                            var l = i === n ? n : i.concat(n);
                            r[l.start = i.start] = a[l.end = n.end] = l
                        } else
                            r[n.start] = a[n.end] = n;
                    else
                        r[(n = [t]).start = f] = a[n.end = c] = n
                })),
            f(a, r),
            f(r, a),
            t.forEach((function (e) {
                    n[e < 0 ? ~e : e] || i.push([e])
                })),
            i
        }
        function Dr(e, t, n) {
            var r,
            a,
            i;
            if (arguments.length > 1)
                r = Rr(e, t, n);
            else
                for (a = 0, r = new Array(i = e.arcs.length); a < i; ++a)
                    r[a] = a;
            return {
                type: "MultiLineString",
                arcs: zr(e, r)
            }
        }
        function Rr(e, t, n) {
            var r,
            a = [],
            i = [];
            function o(e) {
                var t = e < 0 ? ~e : e;
                (i[t] || (i[t] = [])).push({
                    i: e,
                    g: r
                })
            }
            function f(e) {
                e.forEach(o)
            }
            function c(e) {
                e.forEach(f)
            }
            return function e(t) {
                switch (r = t, t.type) {
                case "GeometryCollection":
                    t.geometries.forEach(e);
                    break;
                case "LineString":
                    f(t.arcs);
                    break;
                case "MultiLineString":
                case "Polygon":
                    c(t.arcs);
                    break;
                case "MultiPolygon":
                    !function (e) {
                        e.forEach(c)
                    }
                    (t.arcs)
                }
            }
            (t),
            i.forEach(null == n ? function (e) {
                a.push(e[0].i)
            }
                 : function (e) {
                n(e[0].g, e[e.length - 1].g) && a.push(e[0].i)
            }),
            a
        }
        function Tr(e, t) {
            var n = {},
            r = [],
            a = [];
            function i(e) {
                e.forEach((function (t) {
                        t.forEach((function (t) {
                                (n[t = t < 0 ? ~t : t] || (n[t] = [])).push(e)
                            }))
                    })),
                r.push(e)
            }
            function o(t) {
                return function (e) {
                    for (var t, n = -1, r = e.length, a = e[r - 1], i = 0; ++n < r; )
                        t = a, a = e[n], i += t[0] * a[1] - t[1] * a[0];
                    return Math.abs(i)
                }
                (Or(e, {
                        type: "Polygon",
                        arcs: [t]
                    }).coordinates[0])
            }
            return t.forEach((function e(t) {
                    switch (t.type) {
                    case "GeometryCollection":
                        t.geometries.forEach(e);
                        break;
                    case "Polygon":
                        i(t.arcs);
                        break;
                    case "MultiPolygon":
                        t.arcs.forEach(i)
                    }
                })),
            r.forEach((function (e) {
                    if (!e._) {
                        var t = [],
                        r = [e];
                        for (e._ = 1, a.push(t); e = r.pop(); )
                            t.push(e), e.forEach((function (e) {
                                    e.forEach((function (e) {
                                            n[e < 0 ? ~e : e].forEach((function (e) {
                                                    e._ || (e._ = 1, r.push(e))
                                                }))
                                        }))
                                }))
                    }
                })),
            r.forEach((function (e) {
                    delete e._
                })), {
                type: "MultiPolygon",
                arcs: a.map((function (t) {
                        var r,
                        a = [];
                        if (t.forEach((function (e) {
                                    e.forEach((function (e) {
                                            e.forEach((function (e) {
                                                    n[e < 0 ? ~e : e].length < 2 && a.push(e)
                                                }))
                                        }))
                                })), (r = (a = zr(e, a)).length) > 1)
                            for (var i, f, c = 1, u = o(a[0]); c < r; ++c)
                                (i = o(a[c])) > u && (f = a[0], a[0] = a[c], a[c] = f, u = i);
                        return a
                    })).filter((function (e) {
                        return e.length > 0
                    }))
            }
        }
        function Gr(e, t) {
            for (var n = 0, r = e.length; n < r; ) {
                var a = n + r >>> 1;
                e[a] < t ? n = a + 1 : r = a
            }
            return n
        }
        function qr(e) {
            if (null == e)
                return Cr;
            var t,
            n,
            r = e.scale[0],
            a = e.scale[1],
            i = e.translate[0],
            o = e.translate[1];
            return function (e, f) {
                f || (t = n = 0);
                var c = 2,
                u = e.length,
                l = new Array(u),
                s = Math.round((e[0] - i) / r),
                d = Math.round((e[1] - o) / a);
                for (l[0] = s - t, t = s, l[1] = d - n, n = d; c < u; )
                    l[c] = e[c], ++c;
                return l
            }
        }
        kr.id = _r.id;
        var Br = Object.freeze({
            __proto__: null,
            bbox: Pr,
            feature: function (e, t) {
                return "string" == typeof t && (t = e.objects[t]),
                "GeometryCollection" === t.type ? {
                    type: "FeatureCollection",
                    features: t.geometries.map((function (t) {
                            return jr(e, t)
                        }))
                }
                 : jr(e, t)
            },
            mesh: function (e) {
                return Or(e, Dr.apply(this, arguments))
            },
            meshArcs: Dr,
            merge: function (e) {
                return Or(e, Tr.apply(this, arguments))
            },
            mergeArcs: Tr,
            neighbors: function (e) {
                var t = {},
                n = e.map((function () {
                            return []
                        }));
                function r(e, n) {
                    e.forEach((function (e) {
                            e < 0 && (e = ~e);
                            var r = t[e];
                            r ? r.push(n) : t[e] = [n]
                        }))
                }
                function a(e, t) {
                    e.forEach((function (e) {
                            r(e, t)
                        }))
                }
                var i = {
                    LineString: r,
                    MultiLineString: a,
                    Polygon: a,
                    MultiPolygon: function (e, t) {
                        e.forEach((function (e) {
                                a(e, t)
                            }))
                    }
                };
                for (var o in e.forEach((function e(t, n) {
                            "GeometryCollection" === t.type ? t.geometries.forEach((function (t) {
                                    e(t, n)
                                })) : t.type in i && i[t.type](t.arcs, n)
                        })), t)
                    for (var f = t[o], c = f.length, u = 0; u < c; ++u)
                        for (var l = u + 1; l < c; ++l) {
                            var s,
                            d = f[u],
                            h = f[l];
                            (s = n[d])[o = Gr(s, h)] !== h && s.splice(o, 0, h),
                            (s = n[h])[o = Gr(s, d)] !== d && s.splice(o, 0, d)
                        }
                return n
            },
            quantize: function (e, t) {
                if (e.transform)
                    throw new Error("already quantized");
                if (t && t.scale)
                    f = e.bbox;
                else {
                    if (!((n = Math.floor(t)) >= 2))
                        throw new Error("n must be ≥2");
                    var n,
                    r = (f = e.bbox || Pr(e))[0],
                    a = f[1],
                    i = f[2],
                    o = f[3];
                    t = {
                        scale: [i - r ? (i - r) / (n - 1) : 1, o - a ? (o - a) / (n - 1) : 1],
                        translate: [r, a]
                    }
                }
                var f,
                c,
                u = qr(t),
                l = e.objects,
                s = {};
                function d(e) {
                    return u(e)
                }
                function h(e) {
                    var t;
                    switch (e.type) {
                    case "GeometryCollection":
                        t = {
                            type: "GeometryCollection",
                            geometries: e.geometries.map(h)
                        };
                        break;
                    case "Point":
                        t = {
                            type: "Point",
                            coordinates: d(e.coordinates)
                        };
                        break;
                    case "MultiPoint":
                        t = {
                            type: "MultiPoint",
                            coordinates: e.coordinates.map(d)
                        };
                        break;
                    default:
                        return e
                    }
                    return null != e.id && (t.id = e.id),
                    null != e.bbox && (t.bbox = e.bbox),
                    null != e.properties && (t.properties = e.properties),
                    t
                }
                for (c in l)
                    s[c] = h(l[c]);
                return {
                    type: "Topology",
                    bbox: f,
                    transform: t,
                    objects: s,
                    arcs: e.arcs.map((function (e) {
                            var t,
                            n = 0,
                            r = 1,
                            a = e.length,
                            i = new Array(a);
                            for (i[0] = u(e[0], 0); ++n < a; )
                                ((t = u(e[n], n))[0] || t[1]) && (i[r++] = t);
                            return 1 === r && (i[r++] = [0, 0]),
                            i.length = r,
                            i
                        }))
                }
            },
            transform: Ir,
            untransform: qr
        });
        t.registry.addScales(pr, vr, vn, br, yr),
        t.registry.addElements(mr),
        t.registry.addControllers(Ar, _r),
        e.BubbleMapChart = kr,
        e.BubbleMapController = _r,
        e.ChoroplethChart = Nr,
        e.ChoroplethController = Ar,
        e.ColorLogarithmicScale = pr,
        e.ColorScale = br,
        e.GeoController = Sr,
        e.GeoFeature = mr,
        e.ProjectionScale = vn,
        e.SizeLogarithmicScale = vr,
        e.SizeScale = yr,
        e.topojson = Br,
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }));
//# sourceMappingURL=index.umd.min.js.map