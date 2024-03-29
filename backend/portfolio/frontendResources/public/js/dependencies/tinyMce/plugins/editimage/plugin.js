/*!
 * Tiny Enhanced Image Editing plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 1.1.0-68
 */

!function() {
    "use strict";
    const e = e=>{
            let t = e;
            return {
                    get: ()=>t,
                    set: e=>{
                            t = e
                    }
            }
    }
      , t = Object.getPrototypeOf
      , r = (e,t,r)=>{
            var o;
            return !!r(e, t.prototype) || (null === (o = e.constructor) || void 0 === o ? void 0 : o.name) === t.name
    }
      , o = e=>t=>(e=>{
            const t = typeof e;
            return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && r(e, String, ((e,t)=>t.isPrototypeOf(e))) ? "string" : t
    }
    )(t) === e
      , n = e=>t=>typeof t === e
      , a = o("string")
      , i = o("object")
      , s = e=>((e,o)=>i(e) && r(e, o, ((e,r)=>t(e) === r)))(e, Object)
      , l = o("array")
      , d = n("boolean")
      , c = (void 0,
    e=>undefined === e);
    const u = e=>!(e=>null == e)(e)
      , m = n("function")
      , h = n("number")
      , g = ()=>{}
      , p = e=>()=>e
      , f = e=>e
      , y = (e,t)=>e === t;
    function b(e, ...t) {
            return (...r)=>{
                    const o = t.concat(r);
                    return e.apply(null, o)
            }
    }
    const w = e=>e()
      , v = p(!1)
      , x = p(!0);
    class S {
            constructor(e, t) {
                    this.tag = e,
                    this.value = t
            }
            static some(e) {
                    return new S(!0,e)
            }
            static none() {
                    return S.singletonNone
            }
            fold(e, t) {
                    return this.tag ? t(this.value) : e()
            }
            isSome() {
                    return this.tag
            }
            isNone() {
                    return !this.tag
            }
            map(e) {
                    return this.tag ? S.some(e(this.value)) : S.none()
            }
            bind(e) {
                    return this.tag ? e(this.value) : S.none()
            }
            exists(e) {
                    return this.tag && e(this.value)
            }
            forall(e) {
                    return !this.tag || e(this.value)
            }
            filter(e) {
                    return !this.tag || e(this.value) ? this : S.none()
            }
            getOr(e) {
                    return this.tag ? this.value : e
            }
            or(e) {
                    return this.tag ? this : e
            }
            getOrThunk(e) {
                    return this.tag ? this.value : e()
            }
            orThunk(e) {
                    return this.tag ? this : e()
            }
            getOrDie(e) {
                    if (this.tag)
                            return this.value;
                    throw new Error(null != e ? e : "Called getOrDie on None")
            }
            static from(e) {
                    return u(e) ? S.some(e) : S.none()
            }
            getOrNull() {
                    return this.tag ? this.value : null
            }
            getOrUndefined() {
                    return this.value
            }
            each(e) {
                    this.tag && e(this.value)
            }
            toArray() {
                    return this.tag ? [this.value] : []
            }
            toString() {
                    return this.tag ? `some(${this.value})` : "none()"
            }
    }
    S.singletonNone = new S(!1);
    const O = Object.keys
      , I = Object.hasOwnProperty
      , E = (e,t)=>{
            const r = O(e);
            for (let o = 0, n = r.length; o < n; o++) {
                    const n = r[o];
                    t(e[n], n)
            }
    }
      , P = (e,t)=>I.call(e, t)
      , D = Array.prototype.indexOf
      , R = (e,t)=>((e,t)=>D.call(e, t))(e, t) > -1
      , C = (e,t)=>{
            const r = e.length
              , o = new Array(r);
            for (let n = 0; n < r; n++) {
                    const r = e[n];
                    o[n] = t(r, n)
            }
            return o
    }
      , M = (e,t)=>{
            for (let r = 0, o = e.length; r < o; r++)
                    t(e[r], r)
    }
      , U = (e,t,r)=>(M(e, ((e,o)=>{
            r = t(r, e, o)
    }
    )),
    r)
      , A = (e,t)=>((e,t,r)=>{
            for (let o = 0, n = e.length; o < n; o++) {
                    const n = e[o];
                    if (t(n, o))
                            return S.some(n);
                    if (r(n, o))
                            break
            }
            return S.none()
    }
    )(e, t, v)
      , F = e=>{
            if (null == e)
                    throw new Error("Node cannot be null or undefined");
            return {
                    dom: e
            }
    }
      , k = (e,t)=>{
            const r = (t || document).createElement(e);
            return F(r)
    }
      , T = F
      , L = (e,t)=>{
            const r = void 0 === t ? document : t.dom;
            return 1 !== (o = r).nodeType && 9 !== o.nodeType && 11 !== o.nodeType || 0 === o.childElementCount ? S.none() : S.from(r.querySelector(e)).map(T);
            var o
    }
    ;
    "undefined" != typeof window ? window : Function("return this;")();
    const _ = e=>t=>(e=>e.dom.nodeType)(t) === e
      , N = _(1)
      , z = _(3)
      , B = _(9)
      , j = _(11)
      , G = m(Element.prototype.attachShadow) && m(Node.prototype.getRootNode)
      , H = p(G)
      , W = G ? e=>T(e.dom.getRootNode()) : e=>B(e) ? e : T(e.dom.ownerDocument)
      , V = e=>T(e.dom.host)
      , X = e=>{
            const t = z(e) ? e.dom.parentNode : e.dom;
            if (null == t || null === t.ownerDocument)
                    return !1;
            const r = t.ownerDocument;
            return (e=>{
                    const t = W(e);
                    return j(r = t) && u(r.dom.host) ? S.some(t) : S.none();
                    var r
            }
            )(T(t)).fold((()=>r.body.contains(t)), (o = X,
            n = V,
            e=>o(n(e))));
            var o, n
    }
      , Y = (e,t)=>((e,r)=>A(e.dom.childNodes, (e=>((e,t)=>{
            const r = e.dom;
            if (1 !== r.nodeType)
                    return !1;
            {
                    const e = r;
                    if (void 0 !== e.matches)
                            return e.matches(t);
                    if (void 0 !== e.msMatchesSelector)
                            return e.msMatchesSelector(t);
                    if (void 0 !== e.webkitMatchesSelector)
                            return e.webkitMatchesSelector(t);
                    if (void 0 !== e.mozMatchesSelector)
                            return e.mozMatchesSelector(t);
                    throw new Error("Browser lacks native selectors")
            }
    }
    )(T(e), t))).map(T))(e)
      , J = (e,t)=>L(t, e)
      , K = e=>{
            const t = T((e=>{
                    if (H() && u(e.target)) {
                            const t = T(e.target);
                            if (N(t) && u(t.dom.shadowRoot) && e.composed && e.composedPath) {
                                    const t = e.composedPath();
                                    if (t)
                                            return ((e,t)=>0 < e.length ? S.some(e[0]) : S.none())(t)
                            }
                    }
                    return S.from(e.target)
            }
            )(e).getOr(e.target))
              , r = ()=>e.stopPropagation()
              , o = ()=>e.preventDefault()
              , n = (a = o,
            i = r,
            (...e)=>a(i.apply(null, e)));
            var a, i;
            return ((e,t,r,o,n,a,i)=>({
                    target: e,
                    x: t,
                    y: r,
                    stop: o,
                    prevent: n,
                    kill: a,
                    raw: i
            }))(t, e.clientX, e.clientY, r, o, n, e)
    }
      , q = (e,t,r,o)=>{
            e.dom.removeEventListener(t, r, o)
    }
      , Z = x
      , $ = (e,t,r)=>((e,t,r,o)=>((e,t,r,o,n)=>{
            const a = ((e,t)=>r=>{
                    e(r) && t(K(r))
            }
            )(r, o);
            return e.dom.addEventListener(t, a, n),
            {
                    unbind: b(q, e, t, a, n)
            }
    }
    )(e, t, r, o, !1))(e, t, Z, r)
      , Q = e=>new Promise(((t,r)=>{
            const o = ()=>{
                    a(),
                    t(e)
            }
              , n = [$(e, "load", o), $(e, "error", (()=>{
                    a(),
                    r("Unable to load data from image: " + e.dom.src)
            }
            ))]
              , a = ()=>M(n, (e=>e.unbind()));
            e.dom.complete && o()
    }
    ))
      , ee = (e,t)=>oe(document.createElement("canvas"), e, t)
      , te = e=>{
            const t = ee(e.width, e.height);
            return re(t).drawImage(e, 0, 0),
            t
    }
      , re = e=>e.getContext("2d")
      , oe = (e,t,r)=>(e.width = t,
    e.height = r,
    e)
      , ne = e=>e.naturalWidth || e.width
      , ae = e=>e.naturalHeight || e.height
      , ie = e=>{
            const t = URL.createObjectURL(e)
              , r = new Image;
            return r.src = t,
            Q(T(r)).then((e=>e.dom))
    }
      , se = e=>new Promise(((t,r)=>{
            (e=>{
                    const t = e.split(",")
                      , r = /data:([^;]+)/.exec(t[0]);
                    if (!r)
                            return S.none();
                    const o = r[1]
                      , n = t[1]
                      , a = 1024
                      , i = atob(n)
                      , s = i.length
                      , l = Math.ceil(s / a)
                      , d = new Array(l);
                    for (let e = 0; e < l; ++e) {
                            const t = e * a
                              , r = Math.min(t + a, s)
                              , o = new Array(r - t);
                            for (let e = t, n = 0; e < r; ++n,
                            ++e)
                                    o[n] = i[e].charCodeAt(0);
                            d[e] = new Uint8Array(o)
                    }
                    return S.some(new Blob(d,{
                            type: o
                    }))
            }
            )(e).fold((()=>{
                    r("uri is not base64: " + e)
            }
            ), t)
    }
    ))
      , le = (e,t,r)=>(t = t || "image/png",
    m(HTMLCanvasElement.prototype.toBlob) ? new Promise(((o,n)=>{
            e.toBlob((e=>{
                    e ? o(e) : n()
            }
            ), t, r)
    }
    )) : se(e.toDataURL(t, r)))
      , de = e=>ie(e)
      , ce = e=>(e=>{
            const t = e.src;
            return 0 === t.indexOf("data:") ? se(t) : fetch(t).then((e=>e.ok ? e.blob() : Promise.reject(new Error("Error " + e.status + " downloading image"))), (()=>Promise.reject((()=>{
                    const e = new Error("No access to download image");
                    return e.code = 18,
                    e.name = "SecurityError",
                    e
            }
            )())))
    }
    )(e)
      , ue = e=>e.bind(f);
    (e=>{
            if (!l(e))
                    throw new Error("cases must be an array");
            if (0 === e.length)
                    throw new Error("there must be at least one case");
            const t = []
              , r = {};
            M(e, ((o,n)=>{
                    const a = O(o);
                    if (1 !== a.length)
                            throw new Error("one and only one name per case");
                    const i = a[0]
                      , s = o[i];
                    if (void 0 !== r[i])
                            throw new Error("duplicate key detected:" + i);
                    if ("cata" === i)
                            throw new Error("cannot have a case named cata (sorry)");
                    if (!l(s))
                            throw new Error("case arguments must be an array");
                    t.push(i),
                    r[i] = (...r)=>{
                            const o = r.length;
                            if (o !== s.length)
                                    throw new Error("Wrong number of arguments to case " + i + ". Expected " + s.length + " (" + s + "), got " + o);
                            return {
                                    fold: (...t)=>{
                                            if (t.length !== e.length)
                                                    throw new Error("Wrong number of arguments to fold. Expected " + e.length + ", got " + t.length);
                                            return t[n].apply(null, r)
                                    }
                                    ,
                                    match: e=>{
                                            const o = O(e);
                                            if (t.length !== o.length)
                                                    throw new Error("Wrong number of arguments to match. Expected: " + t.join(",") + "\nActual: " + o.join(","));
                                            if (!((e,t)=>{
                                                    for (let t = 0, n = e.length; t < n; ++t)
                                                            if (!0 !== (r = e[t],
                                                            R(o, r)))
                                                                    return !1;
                                                    var r;
                                                    return !0
                                            }
                                            )(t))
                                                    throw new Error("Not all branches were specified when using match. Specified: " + o.join(", ") + "\nRequired: " + t.join(", "));
                                            return e[i].apply(null, r)
                                    }
                                    ,
                                    log: e=>{
                                            console.log(e, {
                                                    constructors: t,
                                                    constructor: i,
                                                    params: r
                                            })
                                    }
                            }
                    }
            }
            ))
    }
    )([{
            bothErrors: ["error1", "error2"]
    }, {
            firstError: ["error1", "value2"]
    }, {
            secondError: ["value1", "error2"]
    }, {
            bothValues: ["value1", "value2"]
    }]);
    const me = (e,t)=>e.exists((e=>e === t))
      , he = e=>{
            const t = t=>t(e)
              , r = p(e)
              , o = ()=>n
              , n = {
                    tag: !0,
                    inner: e,
                    fold: (t,r)=>r(e),
                    isValue: x,
                    isError: v,
                    map: t=>pe.value(t(e)),
                    mapError: o,
                    bind: t,
                    exists: t,
                    forall: t,
                    getOr: r,
                    or: o,
                    getOrThunk: r,
                    orThunk: o,
                    getOrDie: r,
                    each: t=>{
                            t(e)
                    }
                    ,
                    toOptional: ()=>S.some(e)
            };
            return n
    }
      , ge = e=>{
            const t = ()=>r
              , r = {
                    tag: !1,
                    inner: e,
                    fold: (t,r)=>t(e),
                    isValue: v,
                    isError: x,
                    map: t,
                    mapError: t=>pe.error(t(e)),
                    bind: t,
                    exists: v,
                    forall: x,
                    getOr: f,
                    or: f,
                    getOrThunk: w,
                    orThunk: w,
                    getOrDie: (o = String(e),
                    ()=>{
                            throw new Error(o)
                    }
                    ),
                    each: g,
                    toOptional: S.none
            };
            var o;
            return r
    }
      , pe = {
            value: he,
            error: ge,
            fromOption: (e,t)=>e.fold((()=>ge(t)), he)
    };
    class fe {
            constructor(e) {
                    this.littleEndian = !1,
                    this.dataView = new DataView(e)
            }
            read(e, t) {
                    if (e + t > this.length())
                            return pe.error("Read extends past buffer end");
                    const r = this.littleEndian ? 0 : -8 * (t - 1);
                    let o = 0;
                    for (let n = 0; n < t; n++)
                            o |= this.readByteAt(e + n) << Math.abs(r + 8 * n);
                    return pe.value(o)
            }
            segment(e, t) {
                    const r = this.dataView.buffer;
                    return void 0 !== e && void 0 !== t ? r.slice(e, e + t) : void 0 !== e ? r.slice(e) : r
            }
            length() {
                    return this.dataView.byteLength
            }
            readByteAt(e) {
                    return this.dataView.getUint8(e)
            }
    }
    const ye = (e,t,r,o,n)=>{
            if (t + r * o > e.length())
                    return pe.error("Read would extend past end of buffer");
            const a = [];
            for (let i = 0; i < o; i++) {
                    const o = n(e, t + r * i);
                    if (o.isError())
                            return o.map((e=>[e]));
                    a.push(o.getOrDie())
            }
            return pe.value(a)
    }
      , be = (e,t)=>e.read(t, 1)
      , we = (e,t)=>e.read(t, 2)
      , ve = (e,t)=>e.read(t, 4)
      , xe = e=>pe.value(String.fromCharCode(e))
      , Se = e=>pe.value(e > 2147483647 ? e - 4294967296 : e)
      , Oe = (e,t)=>ve(e, t).bind(Se)
      , Ie = (e,t)=>be(e, t).bind(xe)
      , Ee = (e,t,r=1)=>ye(e, t, 1, r, Ie).map((e=>e.join("")))
      , Pe = {
            274: "Orientation",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            305: "Software",
            34665: "ExifIFDPointer",
            34853: "GPSInfoIFDPointer"
    }
      , De = {
            36864: "ExifVersion",
            40961: "ColorSpace",
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            36867: "DateTimeOriginal",
            33434: "ExposureTime",
            33437: "FNumber",
            34855: "ISOSpeedRatings",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37383: "MeteringMode",
            37384: "LightSource",
            37385: "Flash",
            37386: "FocalLength",
            41986: "ExposureMode",
            41987: "WhiteBalance",
            41990: "SceneCaptureType",
            41988: "DigitalZoomRatio",
            41992: "Contrast",
            41993: "Saturation",
            41994: "Sharpness"
    }
      , Re = {
            0: "GPSVersionID",
            1: "GPSLatitudeRef",
            2: "GPSLatitude",
            3: "GPSLongitudeRef",
            4: "GPSLongitude"
    }
      , Ce = {
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength"
    }
      , Me = {
            ColorSpace: {
                    1: "sRGB",
                    0: "Uncalibrated"
            },
            MeteringMode: {
                    0: "Unknown",
                    1: "Average",
                    2: "CenterWeightedAverage",
                    3: "Spot",
                    4: "MultiSpot",
                    5: "Pattern",
                    6: "Partial",
                    255: "Other"
            },
            LightSource: {
                    1: "Daylight",
                    2: "Fliorescent",
                    3: "Tungsten",
                    4: "Flash",
                    9: "Fine weather",
                    10: "Cloudy weather",
                    11: "Shade",
                    12: "Daylight fluorescent (D 5700 - 7100K)",
                    13: "Day white fluorescent (N 4600 -5400K)",
                    14: "Cool white fluorescent (W 3900 - 4500K)",
                    15: "White fluorescent (WW 3200 - 3700K)",
                    17: "Standard light A",
                    18: "Standard light B",
                    19: "Standard light C",
                    20: "D55",
                    21: "D65",
                    22: "D75",
                    23: "D50",
                    24: "ISO studio tungsten",
                    255: "Other"
            },
            Flash: {
                    0: "Flash did not fire",
                    1: "Flash fired",
                    5: "Strobe return light not detected",
                    7: "Strobe return light detected",
                    9: "Flash fired, compulsory flash mode",
                    13: "Flash fired, compulsory flash mode, return light not detected",
                    15: "Flash fired, compulsory flash mode, return light detected",
                    16: "Flash did not fire, compulsory flash mode",
                    24: "Flash did not fire, auto mode",
                    25: "Flash fired, auto mode",
                    29: "Flash fired, auto mode, return light not detected",
                    31: "Flash fired, auto mode, return light detected",
                    32: "No flash function",
                    65: "Flash fired, red-eye reduction mode",
                    69: "Flash fired, red-eye reduction mode, return light not detected",
                    71: "Flash fired, red-eye reduction mode, return light detected",
                    73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                    77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                    79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                    89: "Flash fired, auto mode, red-eye reduction mode",
                    93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                    95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
            },
            ExposureMode: {
                    0: "Auto exposure",
                    1: "Manual exposure",
                    2: "Auto bracket"
            },
            WhiteBalance: {
                    0: "Auto white balance",
                    1: "Manual white balance"
            },
            SceneCaptureType: {
                    0: "Standard",
                    1: "Landscape",
                    2: "Portrait",
                    3: "Night scene"
            },
            Contrast: {
                    0: "Normal",
                    1: "Soft",
                    2: "Hard"
            },
            Saturation: {
                    0: "Normal",
                    1: "Low saturation",
                    2: "High saturation"
            },
            Sharpness: {
                    0: "Normal",
                    1: "Soft",
                    2: "Hard"
            },
            GPSLatitudeRef: {
                    78: "North latitude",
                    83: "South latitude"
            },
            GPSLongitudeRef: {
                    69: "East longitude",
                    87: "West longitude"
            }
    }
      , Ue = (e,t)=>ve(e, t).bind((r=>ve(e, t + 4).map((e=>r / e))))
      , Ae = (e,t)=>Oe(e, t).bind((r=>Oe(e, t + 4).map((e=>r / e))))
      , Fe = (e,t,r,o)=>{
            const n = {
                    1: {
                            name: "BYTE",
                            size: 1,
                            read: be
                    },
                    7: {
                            name: "UNDEFINED",
                            size: 1,
                            read: be
                    },
                    2: {
                            name: "ASCII",
                            size: 1,
                            read: be
                    },
                    3: {
                            name: "SHORT",
                            size: 2,
                            read: we
                    },
                    4: {
                            name: "LONG",
                            size: 4,
                            read: ve
                    },
                    5: {
                            name: "RATIONAL",
                            size: 8,
                            read: Ue
                    },
                    9: {
                            name: "SLONG",
                            size: 4,
                            read: Oe
                    },
                    10: {
                            name: "SRATIONAL",
                            size: 8,
                            read: Ae
                    }
            }
              , a = e=>t=>S.some([e, t])
              , i = e=>e.replace(/\0$/, "").trim();
            return we(e, t).fold((()=>pe.value({})), (s=>{
                    const l = {};
                    for (let d = 0; d < s; d++) {
                            const s = t + 2 + 12 * d
                              , c = we(e, s + 0).bind((t=>we(e, s + 2).bind((l=>ve(e, s + 4).bind((d=>{
                                    const c = o[t];
                                    if (void 0 === c)
                                            return pe.value(S.none());
                                    const u = n[l];
                                    if (void 0 === u)
                                            return pe.error("Tag with type number " + l + " was unrecognised.");
                                    let m = s + 8;
                                    if (u.size * d > 4) {
                                            const t = ve(e, s + 8);
                                            if (t.isError())
                                                    return t.map((e=>S.none()));
                                            m = t.getOrDie() + r
                                    }
                                    return m + u.size * d >= e.length() ? pe.error("Invalid Exif data.") : 1 === d && void 0 !== Me[c] ? u.read(e, m).map((e=>Me[c][e])).map(a(c)) : "ASCII" === u.name ? Ee(e, m, d).map(i).map(a(c)) : 1 === d ? u.read(e, m).map(a(c)) : ye(e, m, u.size, d, u.read).map(a(c))
                            }
                            ))))));
                            if (c.isError())
                                    return c.map((e=>l));
                            c.each((e=>e.each((([e,t])=>{
                                    l[e] = t
                            }
                            ))))
                    }
                    return pe.value(l)
            }
            ))
    }
      , ke = e=>({
            Orientation: S.from(e.Orientation).filter(h).getOrUndefined(),
            ImageDescription: S.from(e.ImageDescription).filter(a).getOrUndefined(),
            Make: S.from(e.Make).filter(a).getOrUndefined(),
            Model: S.from(e.Model).filter(a).getOrUndefined(),
            Software: S.from(e.Software).filter(a).getOrUndefined(),
            ExifIFDPointer: S.from(e.ExifIFDPointer).filter(h),
            GPSInfoIFDPointer: S.from(e.GPSInfoIFDPointer).filter(h)
    })
      , Te = e=>({
            ExifVersion: (()=>{
                    const t = e.ExifVersion;
                    return a(t) ? t : l(t) ? C(t, (e=>h(e) ? String.fromCharCode(e) : "")).join("") : void 0
            }
            )(),
            ColorSpace: S.from(e.ColorSpace).filter(a).getOrUndefined(),
            PixelXDimension: S.from(e.PixelXDimension).filter(h).getOrUndefined(),
            PixelYDimension: S.from(e.PixelYDimension).filter(h).getOrUndefined(),
            DateTimeOriginal: S.from(e.DateTimeOriginal).filter(a).getOrUndefined(),
            ExposureTime: S.from(e.ExposureTime).filter(h).getOrUndefined(),
            FNumber: S.from(e.FNumber).filter(h).getOrUndefined(),
            ISOSpeedRatings: S.from(e.ISOSpeedRatings).filter(h).getOrUndefined(),
            ShutterSpeedValue: S.from(e.ShutterSpeedValue).filter(h).getOrUndefined(),
            ApertureValue: S.from(e.ApertureValue).filter(h).getOrUndefined(),
            MeteringMode: S.from(e.MeteringMode).filter(a).getOrUndefined(),
            LightSource: S.from(e.LightSource).filter(a).getOrUndefined(),
            Flash: S.from(e.Flash).filter(a).getOrUndefined(),
            FocalLength: S.from(e.FocalLength).filter(h).getOrUndefined(),
            ExposureMode: S.from(e.ExposureMode).filter(a).getOrUndefined(),
            WhiteBalance: S.from(e.WhiteBalance).filter(a).getOrUndefined(),
            SceneCaptureType: S.from(e.SceneCaptureType).filter(a).getOrUndefined(),
            DigitalZoomRatio: S.from(e.DigitalZoomRatio).filter(h).getOrUndefined(),
            Contrast: S.from(e.Contrast).filter(a).getOrUndefined(),
            Saturation: S.from(e.Saturation).filter(a).getOrUndefined(),
            Sharpness: S.from(e.Sharpness).filter(a).getOrUndefined()
    })
      , Le = e=>({
            GPSVersionID: (()=>{
                    const t = e.GPSVersionID;
                    return a(t) ? t : l(t) ? C(t, (e=>h(e) ? "" + e : a(e) ? e : "")).join(".") : void 0
            }
            )(),
            GPSLatitudeRef: S.from(e.GPSLatitudeRef).filter(a).getOrUndefined(),
            GPSLatitude: S.from(e.GPSLatitude).filter(h).getOrUndefined(),
            GPSLongitudeRef: S.from(e.GPSLongitudeRef).filter(a).getOrUndefined(),
            GPSLongitude: S.from(e.GPSLongitude).filter(h).getOrUndefined()
    })
      , _e = e=>{
            const t = e.JPEGInterchangeFormat;
            if (void 0 === t)
                    return pe.error("");
            if (!h(t))
                    return pe.error("");
            const r = e.JPEGInterchangeFormatLength;
            return void 0 === r ? pe.error("") : h(r) ? pe.value({
                    JPEGInterchangeFormat: t,
                    JPEGInterchangeFormatLength: r
            }) : pe.error("")
    }
      , Ne = e=>(e=>new Promise((t=>{
            const r = new FileReader;
            r.onloadend = ()=>{
                    t(r.result)
            }
            ,
            r.readAsArrayBuffer(e)
    }
    )))(e).then((t=>{
            try {
                    const e = new fe(t);
                    if (me(we(e, 0), 65496)) {
                            const t = ze(e)
                              , r = t.filter((e=>"APP1" === e.name))
                              , o = {
                                    rawHeaders: t
                            };
                            if (!r.length)
                                    return Promise.reject("Headers did not include required information");
                            {
                                    const e = (e=>{
                                            const t = new fe(e)
                                              , r = 10
                                              , o = me(we(t, 0), 65505) && me(Ee(t, 4, 5).map((e=>e.toUpperCase())), "EXIF\0") ? (t.littleEndian = me(we(t, r), 18761),
                                            me(we(t, 12), 42) ? ve(t, 14).map((e=>r + e)) : pe.error("Invalid Exif data.")) : pe.error("APP1 marker and EXIF marker cannot be read or not available.")
                                              , n = o.bind((e=>Fe(t, e, r, Pe).map(ke)))
                                              , a = n.bind((e=>e.ExifIFDPointer.fold((()=>pe.value(S.none())), (e=>Fe(t, r + e, r, De).map(Te).map(S.some)))))
                                              , i = n.bind((e=>e.GPSInfoIFDPointer.fold((()=>pe.value(S.none())), (e=>Fe(t, r + e, r, Re).map(Le).map(S.some)))));
                                            return {
                                                    tiff: n,
                                                    exif: a,
                                                    gps: i,
                                                    thumb: o.bind((e=>we(t, e).map((t=>e + 2 + 12 * t)))).bind((e=>ve(t, e).map((e=>e + r)))).bind((e=>Fe(t, e, r, Ce).bind(_e).map((e=>t.segment(r + e.JPEGInterchangeFormat, e.JPEGInterchangeFormatLength))).map(S.some)))
                                            }
                                    }
                                    )(r[0].segment);
                                    o.tiff = e.tiff.getOrDie(),
                                    o.exif = ue(e.exif.toOptional()).getOrNull(),
                                    o.gps = ue(e.gps.toOptional()).getOrNull(),
                                    o.thumb = ue(e.thumb.toOptional()).getOrNull()
                            }
                            return o
                    }
                    return Promise.reject("Image was not a jpeg")
            } catch (t) {
                    return Promise.reject(`Unsupported format or not an image: ${e.type} (Exception: ${t.message})`)
            }
    }
    ))
      , ze = e=>{
            const t = [];
            let r = 2;
            for (; r + 2 <= e.length(); ) {
                    const o = we(e, r).toOptional().getOrNull();
                    if (null === o)
                            throw new Error("Invalid Exif data.");
                    if (o >= 65488 && o <= 65495) {
                            r += 2;
                            continue
                    }
                    if (65498 === o || 65497 === o)
                            break;
                    const n = we(e, r + 2).toOptional().getOrNull();
                    if (null === n)
                            throw new Error("Invalid Exif data.");
                    const a = n + 2;
                    o >= 65505 && o <= 65519 && t.push({
                            hex: o,
                            name: "APP" + (15 & o),
                            start: r,
                            length: a,
                            segment: e.segment(r, a)
                    }),
                    r += a
            }
            return t
    }
      , Be = (e,t,r)=>{
            const o = t.type
              , n = p(o)
              , a = p(r)
              , i = (t,r)=>e.then((e=>((e,t,r)=>(t = t || "image/png",
            e.toDataURL(t, r)))(e, t, r)));
            return {
                    getType: n,
                    toBlob: ()=>Promise.resolve(t),
                    toDataURL: a,
                    toBase64: ()=>r.split(",")[1],
                    toAdjustedBlob: (t,r)=>e.then((e=>le(e, t, r))),
                    toAdjustedDataURL: i,
                    toAdjustedBase64: (e,t)=>i(e, t).then((e=>e.split(",")[1])),
                    toCanvas: ()=>e.then(te)
            }
    }
      , je = e=>(e=>new Promise((t=>{
            const r = new FileReader;
            r.onloadend = ()=>{
                    t(r.result)
            }
            ,
            r.readAsDataURL(e)
    }
    )))(e).then((t=>Be((e=>ie(e).then((e=>{
            (e=>{
                    URL.revokeObjectURL(e.src)
            }
            )(e);
            const t = ee(ne(e), ae(e));
            return re(t).drawImage(e, 0, 0),
            t
    }
    )))(e), e, t)))
      , Ge = (e,t)=>le(e, t).then((t=>Be(Promise.resolve(e), t, e.toDataURL())))
      , He = (e,t,r)=>{
            let o = "string" == typeof e ? parseFloat(e) : e;
            return o > r ? o = r : o < t && (o = t),
            o
    }
      , We = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10]
      , Ve = (e,t)=>{
            const r = []
              , o = new Array(25);
            let n;
            for (let a = 0; a < 5; a++) {
                    for (let e = 0; e < 5; e++)
                            r[e] = t[e + 5 * a];
                    for (let t = 0; t < 5; t++) {
                            n = 0;
                            for (let o = 0; o < 5; o++)
                                    n += e[t + 5 * o] * r[o];
                            o[t + 5 * a] = n
                    }
            }
            return o
    }
      , Xe = (e,t)=>(t = He(t, 0, 1),
    e.map(((e,r)=>(r % 6 == 0 ? e = 1 - (1 - e) * t : e *= t,
    He(e, 0, 1)))))
      , Ye = (e,t)=>e.toCanvas().then((r=>Je(r, e.getType(), t)))
      , Je = (e,t,r)=>{
            const o = re(e)
              , n = ((e,t)=>{
                    let r, o, n, a;
                    const i = e.data
                      , s = t[0]
                      , l = t[1]
                      , d = t[2]
                      , c = t[3]
                      , u = t[4]
                      , m = t[5]
                      , h = t[6]
                      , g = t[7]
                      , p = t[8]
                      , f = t[9]
                      , y = t[10]
                      , b = t[11]
                      , w = t[12]
                      , v = t[13]
                      , x = t[14]
                      , S = t[15]
                      , O = t[16]
                      , I = t[17]
                      , E = t[18]
                      , P = t[19];
                    for (let e = 0; e < i.length; e += 4)
                            r = i[e],
                            o = i[e + 1],
                            n = i[e + 2],
                            a = i[e + 3],
                            i[e] = r * s + o * l + n * d + a * c + u,
                            i[e + 1] = r * m + o * h + n * g + a * p + f,
                            i[e + 2] = r * y + o * b + n * w + a * v + x,
                            i[e + 3] = r * S + o * O + n * I + a * E + P;
                    return e
            }
            )(o.getImageData(0, 0, e.width, e.height), r);
            return o.putImageData(n, 0, 0),
            Ge(e, t)
    }
      , Ke = e=>(t,r)=>t.toCanvas().then((o=>((t,r,o)=>{
            const n = re(t)
              , a = new Array(256);
            for (let t = 0; t < a.length; t++)
                    a[t] = e(t, o);
            const i = ((e,t)=>{
                    const r = e.data;
                    for (let e = 0; e < r.length; e += 4)
                            r[e] = t[r[e]],
                            r[e + 1] = t[r[e + 1]],
                            r[e + 2] = t[r[e + 2]];
                    return e
            }
            )(n.getImageData(0, 0, t.width, t.height), a);
            return n.putImageData(i, 0, 0),
            Ge(t, r)
    }
    )(o, t.getType(), r)))
      , qe = e=>(t,r)=>Ye(t, e([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], r))
      , Ze = e=>t=>((e,t)=>e.toCanvas().then((r=>((e,t,r)=>{
            const o = re(e)
              , n = o.getImageData(0, 0, e.width, e.height);
            let a = o.getImageData(0, 0, e.width, e.height);
            return a = ((e,t,r)=>{
                    const o = (e,t,r)=>(e > r ? e = r : e < t && (e = t),
                    e)
                      , n = Math.round(Math.sqrt(r.length))
                      , a = Math.floor(n / 2)
                      , i = e.data
                      , s = t.data
                      , l = e.width
                      , d = e.height;
                    for (let e = 0; e < d; e++)
                            for (let t = 0; t < l; t++) {
                                    let c = 0
                                      , u = 0
                                      , m = 0;
                                    for (let s = 0; s < n; s++)
                                            for (let h = 0; h < n; h++) {
                                                    const g = o(t + h - a, 0, l - 1)
                                                      , p = 4 * (o(e + s - a, 0, d - 1) * l + g)
                                                      , f = r[s * n + h];
                                                    c += i[p] * f,
                                                    u += i[p + 1] * f,
                                                    m += i[p + 2] * f
                                            }
                                    const h = 4 * (e * l + t);
                                    s[h] = o(c, 0, 255),
                                    s[h + 1] = o(u, 0, 255),
                                    s[h + 2] = o(m, 0, 255)
                            }
                    return t
            }
            )(n, a, r),
            o.putImageData(a, 0, 0),
            Ge(e, t)
    }
    )(r, e.getType(), t))))(t, e)
      , $e = (Qe = [-1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    e=>Ye(e, Qe));
    var Qe;
    const et = qe(((e,t)=>(t = He(255 * t, -255, 255),
    Ve(e, [1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]))))
      , tt = qe(((e,t)=>{
            t = He(t, -180, 180) / 180 * Math.PI;
            const r = Math.cos(t)
              , o = Math.sin(t)
              , n = .213
              , a = .715
              , i = .072;
            return Ve(e, [n + .787 * r + o * -n, a + r * -a + o * -a, i + r * -i + .928 * o, 0, 0, n + r * -n + .143 * o, a + r * (1 - a) + .14 * o, i + r * -i + -.283 * o, 0, 0, n + r * -n + -.787 * o, a + r * -a + o * a, i + .928 * r + o * i, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
    }
    ))
      , rt = qe(((e,t)=>{
            const r = 1 + ((t = He(t, -1, 1)) > 0 ? 3 * t : t)
              , o = .3086
              , n = .6094
              , a = .082;
            return Ve(e, [o * (1 - r) + r, n * (1 - r), a * (1 - r), 0, 0, o * (1 - r), n * (1 - r) + r, a * (1 - r), 0, 0, o * (1 - r), n * (1 - r), a * (1 - r) + r, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
    }
    ))
      , ot = qe(((e,t)=>{
            let r;
            return t = He(t, -1, 1),
            (t *= 100) < 0 ? r = 127 + t / 100 * 127 : (r = t % 1,
            r = 0 === r ? We[t] : We[Math.floor(t)] * (1 - r) + We[Math.floor(t) + 1] * r,
            r = 127 * r + 127),
            Ve(e, [r / 127, 0, 0, 0, .5 * (127 - r), 0, r / 127, 0, 0, .5 * (127 - r), 0, 0, r / 127, 0, .5 * (127 - r), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
    }
    ))
      , nt = qe(((e,t)=>(t = He(t, 0, 1),
    Ve(e, Xe([.33, .34, .33, 0, 0, .33, .34, .33, 0, 0, .33, .34, .33, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t)))))
      , at = qe(((e,t)=>(t = He(t, 0, 1),
    Ve(e, Xe([.393, .769, .189, 0, 0, .349, .686, .168, 0, 0, .272, .534, .131, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t)))))
      , it = Ze([0, -1, 0, -1, 5, -1, 0, -1, 0])
      , st = Ze([-2, -1, 0, -1, 1, 1, 0, 1, 2])
      , lt = Ke(((e,t)=>255 * Math.pow(e / 255, 1 - t)))
      , dt = Ke(((e,t)=>255 * (1 - Math.exp(-e / 255 * t))))
      , ct = (e,t,r)=>{
            const o = ne(e)
              , n = ae(e);
            let a = t / o
              , i = r / n
              , s = !1;
            (a < .5 || a > 2) && (a = a < .5 ? .5 : 2,
            s = !0),
            (i < .5 || i > 2) && (i = i < .5 ? .5 : 2,
            s = !0);
            const l = ut(e, a, i);
            return s ? l.then((e=>ct(e, t, r))) : l
    }
      , ut = (e,t,r)=>new Promise((o=>{
            const n = ne(e)
              , a = ae(e)
              , i = Math.floor(n * t)
              , s = Math.floor(a * r)
              , l = ee(i, s);
            re(l).drawImage(e, 0, 0, n, a, 0, 0, i, s),
            o(l)
    }
    ))
      , mt = (e,t=2)=>{
            const r = Math.pow(10, t)
              , o = Math.round(e * r);
            return Math.ceil(o / r)
    }
      , ht = (e,t,r,o)=>((e,t,r,o)=>Ye(e, ((e,t,r,o)=>(t = He(t, 0, 2),
    r = He(r, 0, 2),
    o = He(o, 0, 2),
    Ve([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [t, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])))(0, t, r, o)))(e, t, r, o)
      , gt = (e,t)=>((e,t)=>e.toCanvas().then((r=>((e,t,r)=>{
            const o = ee(e.width, e.height)
              , n = re(o);
            return "v" === r ? (n.scale(1, -1),
            n.drawImage(e, 0, -o.height)) : (n.scale(-1, 1),
            n.drawImage(e, -o.width, 0)),
            Ge(o, t)
    }
    )(r, e.getType(), t))))(e, t)
      , pt = (e,t,r,o,n)=>((e,t,r,o,n)=>e.toCanvas().then((a=>((e,t,r,o,n,a)=>{
            const i = ee(n, a);
            return re(i).drawImage(e, -r, -o),
            Ge(i, t)
    }
    )(a, e.getType(), t, r, o, n))))(e, t, r, o, n)
      , ft = (e,t,r)=>((e,t,r)=>e.toCanvas().then((o=>ct(o, t, r).then((t=>Ge(t, e.getType()))))))(e, t, r)
      , yt = (e,t)=>((e,t)=>e.toCanvas().then((r=>((e,t,r)=>{
            const o = (r < 0 ? 360 + r : r) * Math.PI / 180
              , n = e.width
              , a = e.height
              , i = Math.sin(o)
              , s = Math.cos(o)
              , l = mt(Math.abs(n * s) + Math.abs(a * i))
              , d = mt(Math.abs(n * i) + Math.abs(a * s))
              , c = ee(l, d)
              , u = re(c);
            return u.translate(l / 2, d / 2),
            u.rotate(o),
            u.drawImage(e, -n / 2, -a / 2),
            Ge(c, t)
    }
    )(r, e.getType(), t))))(e, t);
    var bt = Object.freeze({
            __proto__: null,
            invert: e=>$e(e),
            sharpen: e=>it(e),
            emboss: e=>st(e),
            brightness: (e,t)=>et(e, t),
            hue: (e,t)=>tt(e, t),
            saturate: (e,t)=>rt(e, t),
            contrast: (e,t)=>ot(e, t),
            grayscale: (e,t)=>nt(e, t),
            sepia: (e,t)=>at(e, t),
            colorize: ht,
            gamma: (e,t)=>lt(e, t),
            exposure: (e,t)=>dt(e, t),
            flip: gt,
            crop: pt,
            resize: ft,
            rotate: yt,
            exifRotate: e=>e.toBlob().then(Ne).then((t=>{
                    switch (t.tiff.Orientation) {
                    case 6:
                            return yt(e, 90);
                    case 3:
                            return yt(e, 180);
                    case 8:
                            return yt(e, 270);
                    default:
                            return e
                    }
            }
            ), (()=>e))
    });
    const wt = (e,t,r=!1)=>fetch(e, {
            credentials: r ? "include" : "same-origin",
            headers: t
    }).then((async e=>{
            const t = await e.blob();
            return {
                    ok: e.ok,
                    status: e.status,
                    blob: t
            }
    }
    ), (()=>({
            ok: !1,
            status: 0
    })))
      , vt = [{
            code: 404,
            message: "Could not find Image Proxy"
    }, {
            code: 403,
            message: "Rejected request"
    }, {
            code: 0,
            message: "Incorrect Image Proxy URL"
    }]
      , xt = [{
            type: "not_found",
            message: "Failed to load image."
    }, {
            type: "key_missing",
            message: "The request did not include an api key."
    }, {
            type: "key_not_found",
            message: "The provided api key could not be found."
    }, {
            type: "domain_not_trusted",
            message: "The api key is not valid for the request origins."
    }]
      , St = e=>{
            const t = (e=>{
                    const t = A(vt, (t=>e === t.code)).fold(p("Unknown ImageProxy error"), (e=>e.message));
                    return "ImageProxy HTTP error: " + t
            }
            )(e);
            return Promise.reject(t)
    }
      , Ot = e=>A(xt, (t=>t.type === e)).fold(p("Unknown service error"), (e=>e.message))
      , It = e=>(e=>new Promise(((t,r)=>{
            const o = new FileReader;
            o.onload = ()=>{
                    t(o.result)
            }
            ,
            o.onerror = e=>{
                    r(e)
            }
            ,
            o.readAsText(e)
    }
    )))(e).then((e=>{
            const t = (e=>{
                    const t = (e=>{
                            try {
                                    return S.some(JSON.parse(e))
                            } catch (e) {
                                    return S.none()
                            }
                    }
                    )(e)
                      , r = t.bind((e=>((e,t)=>{
                            const r = U(["error", "type"], ((e,t)=>u(e) ? e[t] : void 0), e);
                            return S.from(r)
                    }
                    )(e).map(Ot))).getOr("Invalid JSON in service error message");
                    return "ImageProxy Service error: " + r
            }
            )(e);
            return Promise.reject(t)
    }
    ))
      , Et = (e,t,r=!0)=>t ? ((e,t)=>{
            const r = {
                    "Content-Type": "application/json;charset=UTF-8",
                    "tiny-api-key": t
            };
            return wt(((e,t)=>{
                    const r = -1 === e.indexOf("?") ? "?" : "&";
                    return /[?&]apiKey=/.test(e) ? e : e + r + "apiKey=" + encodeURIComponent(t)
            }
            )(e, t), r).then((e=>{
                    return e.ok ? Promise.resolve(e.blob) : ((e,t)=>"application/json" === (null == t ? void 0 : t.type) && (400 === e || 403 === e || 404 === e || 500 === e))(t = e.status, r = e.blob) ? It(r) : St(t);
                    var t, r
            }
            ))
    }
    )(e, t) : ((e,t)=>wt(e, {}, t).then((e=>e.ok ? Promise.resolve(e.blob) : St(e.status))))(e, r)
      , Pt = e=>je(e)
      , Dt = e=>t=>t.options.get(e)
      , Rt = Dt("editimage_toolbar")
      , Ct = Dt("editimage_cors_hosts")
      , Mt = Dt("editimage_credentials_hosts")
      , Ut = Dt("editimage_fetch_image")
      , At = Dt("editimage_upload_timeout")
      , Ft = Dt("images_reuse_filename")
      , kt = e=>{
            const t = e.options.get("editimage_proxy_service_url");
            return a(t) ? t + "/2/image" : e.options.get("editimage_proxy")
    }
      , Tt = e=>{
            let t, r;
            const o = e=>/^[0-9\.]+px$/.test(e);
            return t = e.style.width,
            r = e.style.height,
            t || r ? o(t) && o(r) ? {
                    w: parseInt(t, 10),
                    h: parseInt(r, 10)
            } : null : (t = e.width,
            r = e.height,
            t && r ? {
                    w: t,
                    h: r
            } : null)
    }
      , Lt = e=>({
            w: e.naturalWidth,
            h: e.naturalHeight
    });
    let _t = 0;
    const Nt = e=>Y(e, "img")
      , zt = (e,t)=>e.dom.is(t, "figure")
      , Bt = (e,t)=>e.dom.is(t, "img:not([data-mce-object]):not([data-mce-placeholder])")
      , jt = (e,t)=>{
            const r = t=>(t=>Bt(e, t.dom) && (Vt(e, t.dom) || Xt(e, t.dom) || u(kt(e))))(t) ? S.some(t) : S.none();
            return zt(e, t.dom) ? Nt(t).bind(r) : r(t)
    }
      , Gt = (e,t)=>{
            e.notificationManager.open({
                    text: t,
                    type: "error"
            })
    }
      , Ht = e=>{
            const t = e.selection.getNode()
              , r = e.dom.getParent(t, "figure.image");
            return null !== r && zt(e, r) ? Nt(T(r)) : Bt(e, t) ? S.some(T(t)) : S.none()
    }
      , Wt = (e,t,r)=>{
            const o = /(?:\/|^)(([^\/\?]+)\.(?:[a-z0-9.]+))(?:\?|$)/i.exec(t);
            return u(o) ? e.dom.encode(o[r]) : void 0
    }
      , Vt = (e,t)=>{
            const r = t.src;
            return 0 === r.indexOf("data:") || 0 === r.indexOf("blob:") || new tinymce.util.URI(r).host === e.documentBaseURI.host
    }
      , Xt = (e,t)=>R(Ct(e), new tinymce.util.URI(t.src).host)
      , Yt = (e,t)=>{
            const r = e.editorUpload.blobCache.getByUri(t.src);
            return r ? Promise.resolve(r.blob()) : ((e,t)=>S.from(Ut(e)).fold((()=>((e,t)=>{
                    var r;
                    if (Xt(e, t))
                            return Et(t.src, void 0, ((e,t)=>R(Mt(e), new tinymce.util.URI(t.src).host))(e, t));
                    if (!Vt(e, t)) {
                            const o = null !== (r = kt(e)) && void 0 !== r ? r : ""
                              , n = o + (-1 === o.indexOf("?") ? "?" : "&") + "url=" + encodeURIComponent(t.src)
                              , a = (e=>{
                                    var t;
                                    return null !== (t = e.options.get("api_key")) && void 0 !== t ? t : e.options.get("editimage_api_key")
                            }
                            )(e);
                            return Et(n, a, !0)
                    }
                    return ce(t)
            }
            )(e, t)), (e=>e(t))))(e, t)
    }
      , Jt = e=>{
            clearTimeout(e.get())
    }
      , Kt = (e,t,r,o,n,a,i)=>r.toBlob().then((s=>{
            let l, d, c;
            const m = e.editorUpload.blobCache;
            l = a.src;
            const h = t.type === s.type;
            if (Ft(e)) {
                    const t = m.getByUri(l);
                    u(t) ? (l = t.uri(),
                    d = t.name(),
                    c = t.filename()) : (d = Wt(e, l, 2),
                    c = Wt(e, l, 1))
            }
            const g = m.create({
                    id: "editimage" + _t++,
                    blob: s,
                    base64: r.toBase64(),
                    uri: l,
                    name: d,
                    filename: h ? c : void 0
            });
            return m.add(g),
            e.undoManager.transact((()=>{
                    const t = ()=>{
                            e.dom.unbind(a, "load", t),
                            e.nodeChanged(),
                            o ? e.editorUpload.uploadImagesAuto() : (Jt(n),
                            ((e,t)=>{
                                    const r = tinymce.util.Delay.setEditorTimeout(e, (()=>{
                                            e.editorUpload.uploadImagesAuto()
                                    }
                                    ), At(e));
                                    t.set(r)
                            }
                            )(e, n))
                    }
                    ;
                    e.dom.bind(a, "load", t),
                    i && e.dom.setAttribs(a, {
                            width: i.w,
                            height: i.h
                    }),
                    e.dom.setAttribs(a, {
                            src: g.blobUri()
                    }),
                    a.removeAttribute("data-mce-src")
            }
            )),
            g
    }
    ))
      , qt = (e,t,r,o)=>()=>Ht(e).fold((()=>{
            Gt(e, "Could not find selected image")
    }
    ), (n=>e._scanForImages().then((()=>Yt(e, n.dom))).then((a=>Pt(a).then(r).then((r=>Kt(e, a, r, !1, t, n.dom, o))))).catch((t=>{
            Gt(e, t)
    }
    ))))
      , Zt = (e,t,r)=>()=>{
            const o = Ht(e).map((e=>{
                    const t = Tt(e.dom);
                    return t ? {
                            w: t.h,
                            h: t.w
                    } : null
            }
            )).getOrNull();
            return qt(e, t, (e=>yt(e, r)), o)()
    }
      , $t = (e,t,r)=>()=>qt(e, t, (e=>gt(e, r)))()
      , Qt = (er = (e,t)=>s(e) && s(t) ? Qt(e, t) : t,
    (...e)=>{
            if (0 === e.length)
                    throw new Error("Can't merge zero objects");
            const t = {};
            for (let r = 0; r < e.length; r++) {
                    const o = e[r];
                    for (const e in o)
                            P(o, e) && (t[e] = er(t[e], o[e]))
            }
            return t
    }
    );
    var er;
    const tr = {
            type: "panel",
            classes: ["tox-spacer"],
            items: []
    }
      , rr = (e,t,r=!1)=>({
            type: "button",
            name: e,
            text: t,
            primary: r
    })
      , or = (e,t,r,o=!1)=>({
            type: "button",
            name: e,
            icon: t,
            text: r,
            buttonType: "toolbar",
            enabled: !o
    })
      , nr = "undo-btn"
      , ar = "redo-btn"
      , ir = "zoom-in-btn"
      , sr = "zoom-out-btn"
      , lr = "crop-btn"
      , dr = "resize-btn"
      , cr = "orientation-btn"
      , ur = "brightness-btn"
      , mr = "sharpen-btn"
      , hr = "contrast-btn"
      , gr = "color-levels-btn"
      , pr = "gamma-btn"
      , fr = "invert-btn"
      , yr = "flip-horizontally-btn"
      , br = "flip-vertically-btn"
      , wr = "rotate-left-btn"
      , vr = "rotate-right-btn"
      , xr = t=>{
            const r = e(S.none())
              , o = ()=>r.get().each(t);
            return {
                    clear: ()=>{
                            o(),
                            r.set(S.none())
                    }
                    ,
                    isSet: ()=>r.get().isSome(),
                    get: ()=>r.get(),
                    set: e=>{
                            o(),
                            r.set(S.some(e))
                    }
            }
    }
      , Sr = ()=>{
            const e = xr(g);
            return {
                    ...e,
                    on: t=>e.get().each(t)
            }
    }
      , Or = e=>void 0 !== e.style && m(e.style.getPropertyValue)
      , Ir = (e,t,r)=>{
            if (!(a(r) || d(r) || h(r)))
                    throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", r, ":: Element ", e),
                    new Error("Attribute value was not simple");
            e.setAttribute(t, r + "")
    }
      , Er = (e,t,r)=>{
            Ir(e.dom, t, r)
    }
      , Pr = (e,t)=>{
            const r = e.dom;
            E(t, ((e,t)=>{
                    Ir(r, t, e)
            }
            ))
    }
      , Dr = (e,t)=>{
            const r = e.dom.getAttribute(t);
            return null === r ? void 0 : r
    }
      , Rr = (e,t)=>{
            const r = e.dom;
            E(t, ((e,t)=>{
                    ((e,t,r)=>{
                            if (!a(r))
                                    throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", r, ":: Element ", e),
                                    new Error("CSS value must be a string: " + r);
                            Or(e) && e.style.setProperty(t, r)
                    }
                    )(r, t, e)
            }
            ))
    }
      , Cr = (e,t)=>{
            const r = e.dom
              , o = window.getComputedStyle(r).getPropertyValue(t);
            return "" !== o || X(e) ? o : Mr(r, t)
    }
      , Mr = (e,t)=>Or(e) ? e.style.getPropertyValue(t) : ""
      , Ur = (e,t)=>{
            const r = r=>{
                    const o = t(r);
                    if (o <= 0 || null === o) {
                            const t = Cr(r, e);
                            return parseFloat(t) || 0
                    }
                    return o
            }
              , o = (e,t)=>U(t, ((t,r)=>{
                    const o = Cr(e, r)
                      , n = void 0 === o ? 0 : parseInt(o, 10);
                    return isNaN(n) ? t : t + n
            }
            ), 0);
            return {
                    set: (t,r)=>{
                            if (!h(r) && !r.match(/^[0-9]+$/))
                                    throw new Error(e + ".set accepts only positive integer values. Value was " + r);
                            const o = t.dom;
                            Or(o) && (o.style[e] = r + "px")
                    }
                    ,
                    get: r,
                    getOuter: r,
                    aggregate: o,
                    max: (e,t,r)=>{
                            const n = o(e, r);
                            return t > n ? t - n : 0
                    }
            }
    }
      , Ar = Ur("height", (e=>{
            const t = e.dom;
            return X(e) ? t.getBoundingClientRect().height : t.offsetHeight
    }
    ))
      , Fr = e=>Ar.get(e)
      , kr = Ur("width", (e=>e.dom.offsetWidth))
      , Tr = e=>kr.get(e)
      , Lr = (e,t)=>Pt(e).then(t).then((e=>e.toBlob()))
      , _r = (e,t)=>{
            (e=>void 0 !== e.dom.classList)(e) ? e.dom.classList.add(t) : ((e,t)=>{
                    ((e,t,r)=>{
                            const o = ((e,t)=>{
                                    const r = Dr(e, t);
                                    return void 0 === r || "" === r ? [] : r.split(" ")
                            }
                            )(e, t)
                              , n = o.concat([r]);
                            Er(e, t, n.join(" "))
                    }
                    )(e, "class", t)
            }
            )(e, t)
    }
      , Nr = (e,t)=>{
            e.dom.appendChild(t.dom)
    }
      , zr = e=>{
            const t = e.dom;
            null !== t.parentNode && t.parentNode.removeChild(t)
    }
      , Br = e=>{
            const t = (e=>u(e.changedTouches))(e) ? e.changedTouches[0] : e;
            return ((e,r)=>{
                    const o = {};
                    for (let r = 0, n = e.length; r < n; r++) {
                            const n = e[r];
                            o[String(n)] = t[n]
                    }
                    return o
            }
            )(["screenX", "screenY", "pageX", "pageY", "clientX", "clientY"])
    }
    ;
    let jr = 0;
    const Gr = (e,t,r,o,n)=>{
            let a, i = [];
            const s = "tox-"
              , l = s + "crid-" + jr++
              , d = [{
                    name: "move",
                    xMul: 0,
                    yMul: 0,
                    deltaX: 1,
                    deltaY: 1,
                    deltaW: 0,
                    deltaH: 0,
                    label: "Crop Mask"
            }, {
                    name: "nw",
                    xMul: 0,
                    yMul: 0,
                    deltaX: 1,
                    deltaY: 1,
                    deltaW: -1,
                    deltaH: -1,
                    label: "Top Left Crop Handle"
            }, {
                    name: "ne",
                    xMul: 1,
                    yMul: 0,
                    deltaX: 0,
                    deltaY: 1,
                    deltaW: 1,
                    deltaH: -1,
                    label: "Top Right Crop Handle"
            }, {
                    name: "sw",
                    xMul: 0,
                    yMul: 1,
                    deltaX: 1,
                    deltaY: 0,
                    deltaW: -1,
                    deltaH: 1,
                    label: "Bottom Left Crop Handle"
            }, {
                    name: "se",
                    xMul: 1,
                    yMul: 1,
                    deltaX: 0,
                    deltaY: 0,
                    deltaW: 1,
                    deltaH: 1,
                    label: "Bottom Right Crop Handle"
            }]
              , c = ["top", "right", "bottom", "left"]
              , m = (e,t)=>({
                    x: t.x - e.x,
                    y: t.y - e.y,
                    w: t.w,
                    h: t.h
            })
              , h = (t,o,n,a)=>{
                    const i = o.x + n * t.deltaX
                      , s = o.y + a * t.deltaY
                      , l = Math.max(20, o.w + n * t.deltaW)
                      , d = Math.max(20, o.h + a * t.deltaH)
                      , c = tinymce.geom.Rect;
                    let u = e = c.clamp({
                            x: i,
                            y: s,
                            w: l,
                            h: d
                    }, r, "move" === t.name);
                    u = m(r, u),
                    y.dispatch("updateRect", {
                            rect: u
                    }),
                    f(u)
            }
              , g = e=>{
                    const r = (e,t)=>{
                            J(o, "#" + l + "-" + e).each((e=>{
                                    Rr(e, {
                                            left: t.x + "px",
                                            top: t.y + "px",
                                            width: Math.max(0, t.w) + "px",
                                            height: Math.max(0, t.h) + "px"
                                    })
                            }
                            ))
                    }
                    ;
                    M(d, (t=>{
                            J(o, "#" + l + "-" + t.name).each((r=>{
                                    Rr(r, {
                                            left: e.w * t.xMul + e.x + "px",
                                            top: e.h * t.yMul + e.y + "px"
                                    })
                            }
                            ))
                    }
                    )),
                    r("top", {
                            x: t.x,
                            y: t.y,
                            w: t.w,
                            h: e.y - t.y
                    }),
                    r("right", {
                            x: e.x + e.w,
                            y: e.y,
                            w: t.w - e.x - e.w + t.x,
                            h: e.h
                    }),
                    r("bottom", {
                            x: t.x,
                            y: e.y + e.h,
                            w: t.w,
                            h: t.h - e.y - e.h + t.y
                    }),
                    r("left", {
                            x: t.x,
                            y: e.y,
                            w: e.x - t.x,
                            h: e.h
                    }),
                    r("move", e)
            }
              , p = t=>{
                    g(e = t)
            }
              , f = e=>{
                    var t, o;
                    p((t = r,
                    {
                            x: (o = e).x + t.x,
                            y: o.y + t.y,
                            w: o.w,
                            h: o.h
                    }))
            }
            ;
            (()=>{
                    const t = k("div");
                    Pr(t, {
                            id: l,
                            class: s + "croprect-container",
                            role: "grid",
                            "aria-dropeffect": "execute"
                    }),
                    Nr(o, t),
                    M(c, (e=>{
                            J(o, "#" + l).each((t=>{
                                    const r = k("div");
                                    Pr(r, {
                                            id: l + "-" + e,
                                            class: s + "croprect-block",
                                            "data-mce-bogus": "all"
                                    }),
                                    Nr(t, r)
                            }
                            ))
                    }
                    )),
                    M(d, (e=>{
                            J(o, "#" + l).each((t=>{
                                    const r = k("div");
                                    var o, n;
                                    Pr(r, {
                                            id: l + "-" + e.name,
                                            "aria-label": e.label,
                                            "aria-grabbed": "false",
                                            "data-mce-bogus": "all",
                                            role: "gridcell",
                                            tabindex: "-1",
                                            title: e.label
                                    }),
                                    o = r,
                                    n = [s + "croprect-handle", s + "croprect-handle-" + e.name],
                                    M(n, (e=>{
                                            _r(o, e)
                                    }
                                    )),
                                    Nr(t, r)
                            }
                            ))
                    }
                    )),
                    a = C(d, (t=>{
                            let r;
                            return ((e,t)=>{
                                    var r, o, n;
                                    let a, i = [], s = [];
                                    const l = null !== (r = t.document) && void 0 !== r ? r : document
                                      , d = null !== (o = t.root) && void 0 !== o ? o : l
                                      , c = T(l);
                                    let m, h, g;
                                    const p = T(d.getElementById(null !== (n = t.handle) && void 0 !== n ? n : e))
                                      , f = e=>{
                                            const r = e.raw
                                              , o = (e=>{
                                                    const t = Math.max
                                                      , r = e.documentElement
                                                      , o = e.body
                                                      , n = t(r.scrollWidth, o.scrollWidth)
                                                      , a = t(r.clientWidth, o.clientWidth)
                                                      , i = t(r.offsetWidth, o.offsetWidth)
                                                      , s = t(r.scrollHeight, o.scrollHeight)
                                                      , l = t(r.clientHeight, o.clientHeight);
                                                    return {
                                                            width: n < i ? a : n,
                                                            height: s < t(r.offsetHeight, o.offsetHeight) ? l : s
                                                    }
                                            }
                                            )(l)
                                              , n = Br(r);
                                            e.prevent(),
                                            m = r.button,
                                            h = n.screenX,
                                            g = n.screenY;
                                            const i = Cr(p, "cursor");
                                            a = k("div", l),
                                            Rr(a, {
                                                    position: "absolute",
                                                    top: "0",
                                                    left: "0",
                                                    width: o.width + "px",
                                                    height: o.height + "px",
                                                    "z-index": "2147483647",
                                                    opacity: "0.0001",
                                                    cursor: i
                                            }),
                                            Nr((e=>{
                                                    const t = e.dom.body;
                                                    if (null == t)
                                                            throw new Error("Body is not available yet");
                                                    return T(t)
                                            }
                                            )(c), a),
                                            s.push($(c, "mousemove", y), $(c, "touchmove", y), $(c, "mouseup", b), $(c, "touchend", b)),
                                            t.start(r, n)
                                    }
                                      , y = e=>{
                                            const r = e.raw
                                              , o = Br(r);
                                            if (r.button !== m)
                                                    return b(e);
                                            const n = {
                                                    ...o,
                                                    deltaX: o.screenX - h,
                                                    deltaY: o.screenY - g
                                            };
                                            e.prevent(),
                                            t.drag(r, n)
                                    }
                                      , b = e=>{
                                            const r = Br(e.raw);
                                            M(s, (e=>e.unbind())),
                                            s = [],
                                            u(a) && zr(a),
                                            t.stop && t.stop(e.raw, r)
                                    }
                                    ;
                                    return i.push($(p, "mousedown", f), $(p, "touchstart", f)),
                                    {
                                            destroy: ()=>{
                                                    M(s.concat(i), (e=>e.unbind())),
                                                    s = [],
                                                    i = [],
                                                    u(a) && zr(a)
                                            }
                                    }
                            }
                            )(l, {
                                    document: o.dom.ownerDocument,
                                    root: W(o).dom,
                                    handle: l + "-" + t.name,
                                    start: ()=>{
                                            r = e
                                    }
                                    ,
                                    drag: (e,o)=>{
                                            h(t, r, o.deltaX, o.deltaY)
                                    }
                            })
                    }
                    )),
                    g(e);
                    const r = e=>{
                            Er(e.target, "aria-grabbed", "focus" === e.raw.type ? "true" : "false")
                    }
                    ;
                    i.push($(o, "focusin", r), $(o, "focusout", r), $(o, "keydown", (t=>{
                            const r = N(t.target) ? Dr(t.target, "id") : void 0;
                            A(d, (e=>r === l + "-" + e.name)).each((r=>{
                                    const o = (e,t,o,n)=>{
                                            e.kill(),
                                            h(r, t, o, n)
                                    }
                                      , a = tinymce.util.VK;
                                    switch (t.raw.keyCode) {
                                    case a.LEFT:
                                            o(t, e, -10, 0);
                                            break;
                                    case a.RIGHT:
                                            o(t, e, 10, 0);
                                            break;
                                    case a.UP:
                                            o(t, e, 0, -10);
                                            break;
                                    case a.DOWN:
                                            o(t, e, 0, 10);
                                            break;
                                    case a.ENTER:
                                    case a.SPACEBAR:
                                            t.prevent(),
                                            n()
                                    }
                            }
                            ))
                    }
                    )))
            }
            )();
            const y = {
                    ...tinymce.util.Observable,
                    setClampRect: t=>{
                            r = t,
                            g(e)
                    }
                    ,
                    setRect: p,
                    getInnerRect: ()=>m(r, e),
                    setInnerRect: f,
                    setViewPortRect: r=>{
                            t = r,
                            g(e)
                    }
                    ,
                    destroy: ()=>{
                            M(a, (e=>e.destroy())),
                            a = [],
                            M(i, (e=>e.unbind())),
                            i = []
                    }
            };
            return y
    }
      , Hr = e=>[rr("back", "Back"), ...e, rr("apply", "Apply", !0)]
      , Wr = ()=>Hr([tr])
      , Vr = (e,t)=>r=>Lr(r.blob, (r=>e(r, t)))
      , Xr = e=>(t,r)=>Lr(t.blob, (t=>bt[e](t, r[e] / 100)))
      , Yr = e=>t=>Lr(t.blob, (t=>bt[e](t)))
      , Jr = t=>{
            const r = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
            }
              , o = (()=>{
                    const e = xr((e=>e.destroy()));
                    return {
                            ...e,
                            run: t=>e.get().each(t)
                    }
            }
            )()
              , n = e(r)
              , a = ()=>L(".tox .tox-imagepreview", t).getOrDie("cannot find preview panel")
              , i = e=>{
                    o.run((t=>{
                            const r = a()
                              , o = L(".tox-imagepreview__container", r).getOrDie("cannot find preview container")
                              , i = Tr(r)
                              , s = Fr(r)
                              , l = Tr(o)
                              , d = Fr(o)
                              , c = Math.max(0, i / 2 - l / 2)
                              , u = Math.max(0, s / 2 - d / 2)
                              , m = n.get();
                            t.setRect({
                                    x: m.x * e + c,
                                    y: m.y * e + u,
                                    w: m.w * e,
                                    h: m.h * e
                            }),
                            t.setClampRect({
                                    x: c,
                                    y: u,
                                    w: l,
                                    h: d
                            }),
                            t.setViewPortRect({
                                    x: 0,
                                    y: 0,
                                    w: i,
                                    h: s
                            })
                    }
                    ))
            }
            ;
            return {
                    barComponents: Wr(),
                    renderFinal: e=>{
                            const t = n.get();
                            return o.clear(),
                            n.set(r),
                            Lr(e.blob, (e=>pt(e, t.x, t.y, t.w, t.h)))
                    }
                    ,
                    onZoom: e=>{
                            var t;
                            i(null !== (t = e.getData().imagepreview.zoom) && void 0 !== t ? t : 1)
                    }
                    ,
                    onOpen: e=>{
                            const r = L(".tox .tox-imagepreview .tox-imagepreview__container img", t).getOrDie("cannot find preview image");
                            Q(r).then((()=>{
                                    const t = ()=>{
                                            var t;
                                            return i(null !== (t = e.getData().imagepreview.zoom) && void 0 !== t ? t : 1)
                                    }
                                      , s = {
                                            x: 0,
                                            y: 0,
                                            w: r.dom.naturalWidth,
                                            h: r.dom.naturalHeight
                                    }
                                      , l = ((e,t,r)=>tinymce.geom.Rect.inflate(e, -20, -20))(s);
                                    n.set(l);
                                    const d = Gr(l, s, s, a(), g);
                                    o.set(d),
                                    t(),
                                    d.on("updateRect", (r=>{
                                            var o;
                                            const a = r.rect
                                              , i = null !== (o = e.getData().imagepreview.zoom) && void 0 !== o ? o : 1
                                              , s = {
                                                    x: Math.round(a.x / i),
                                                    y: Math.round(a.y / i),
                                                    w: Math.round(a.w / i),
                                                    h: Math.round(a.h / i)
                                            };
                                            n.set(s),
                                            t()
                                    }
                                    ))
                            }
                            ))
                    }
            }
    }
      , Kr = e=>de(e).then((t=>{
            const r = t.src;
            return {
                    blob: e,
                    url: r,
                    width: t.naturalWidth,
                    height: t.naturalHeight
            }
    }
    ))
      , qr = (e,t,r)=>({
            type: "panel",
            classes: ["tox-image-tools"],
            items: [{
                    type: "bar",
                    items: e
            }, {
                    type: "imagepreview",
                    name: "imagepreview"
            }, {
                    type: "bar",
                    items: [or(nr, "undo", "Undo", t), or(ar, "redo", "Redo", r), or(ir, "zoom-in", "Zoom in"), or(sr, "zoom-out", "Zoom out")]
            }]
    })
      , Zr = (e,t)=>{
            var r;
            const o = null !== (r = e.getData().imagepreview.zoom) && void 0 !== r ? r : 1
              , n = 0 === t ? Math.min(2, o + .1) : Math.max(.1, o - .1);
            e.setData({
                    imagepreview: {
                            zoom: n
                    }
            })
    }
      , $r = (t,r,o,n)=>{
            const a = e=>{
                    ((e,t,r,o,n)=>{
                            de(n).then((e=>{
                                    const t = Lt(e);
                                    return o.w === t.w && o.h === t.h || Tt(r) && ((e,t)=>{
                                            let r, o;
                                            t && (r = e.style.width,
                                            o = e.style.height,
                                            (r || o) && (e.style.width = t.w + "px",
                                            e.style.height = t.h + "px",
                                            e.removeAttribute("data-mce-style")),
                                            r = e.width,
                                            o = e.height,
                                            (r || o) && (e.setAttribute("width", String(t.w)),
                                            e.setAttribute("height", String(t.h))))
                                    }
                                    )(r, t),
                                    URL.revokeObjectURL(e.src),
                                    n
                            }
                            )).then(Pt).then((o=>Kt(e, n, o, !0, t, r)))
                    }
                    )(t, r, o.dom, n, e)
            }
              , i = W(T(t.getContainer()));
            Yt(t, o.dom).then((r=>{
                    const o = (t=>{
                            const r = e(t)
                              , o = Sr()
                              , n = (()=>{
                                    const e = [];
                                    let t = -1;
                                    const r = ()=>t > 0
                                      , o = ()=>-1 !== t && t < e.length - 1;
                                    return {
                                            data: e,
                                            add: r=>{
                                                    const o = e.splice(++t);
                                                    return e.push(r),
                                                    {
                                                            state: r,
                                                            removed: o
                                                    }
                                            }
                                            ,
                                            undo: ()=>e[r() ? --t : t],
                                            redo: ()=>e[o() ? ++t : t],
                                            canUndo: r,
                                            canRedo: o
                                    }
                            }
                            )();
                            n.add(t);
                            const a = e=>{
                                    r.set(e);
                                    const t = n.add(e).removed;
                                    l(t)
                            }
                              , i = ()=>o.get().getOrThunk(r.get)
                              , s = e=>URL.revokeObjectURL(e.url)
                              , l = e=>M(e, s)
                              , d = ()=>{
                                    o.on(s),
                                    o.clear()
                            }
                            ;
                            return {
                                    getState: ()=>r.get(),
                                    addState: e=>Kr(e).then(a),
                                    destroyState: ()=>{
                                            d(),
                                            l(n.data)
                                    }
                                    ,
                                    getTempState: i,
                                    setTempState: e=>Kr(e).then((e=>{
                                            d(),
                                            o.set(e)
                                    }
                                    )),
                                    applyTempState: ()=>o.get().each((e=>{
                                            a(e),
                                            o.clear()
                                    }
                                    )),
                                    destroyTempState: d,
                                    undo: ()=>{
                                            const e = n.undo();
                                            r.set(e)
                                    }
                                    ,
                                    redo: ()=>{
                                            const e = n.redo();
                                            r.set(e)
                                    }
                                    ,
                                    canRedo: n.canRedo,
                                    canUndo: n.canUndo,
                                    dialogData: (e=!1)=>{
                                            const t = i();
                                            return {
                                                    imagepreview: {
                                                            ...e ? {
                                                                    cachedWidth: t.width,
                                                                    cachedHeight: t.height
                                                            } : {},
                                                            url: t.url
                                                    },
                                                    size: {
                                                            width: String(t.width),
                                                            height: String(t.height)
                                                    }
                                            }
                                    }
                            }
                    }
                    )({
                            blob: r,
                            url: URL.createObjectURL(r),
                            width: n.w,
                            height: n.h
                    })
                      , s = t.windowManager.open(((e,t,r)=>{
                            const o = e=>{
                                    const r = e.getData().imagepreview;
                                    return Qt({
                                            imagepreview: r
                                    }, t.dialogData())
                            }
                              , n = (e,r,o)=>e(o, r.getData()).then(t.setTempState).then((()=>{
                                    r.setData(t.dialogData())
                            }
                            ))
                              , a = e=>{
                                    e.setEnabled(nr, t.canUndo()),
                                    e.setEnabled(ar, t.canRedo())
                            }
                              , i = ({ui: e, existingApi: r, overrides: a, actions: i})=>r.redial({
                                    ...p(),
                                    initialData: o(r),
                                    body: qr(e.barComponents, !0, !0),
                                    onAction: (e,r)=>{
                                            !c(i) && P(i, r.name) ? n(i[r.name], e, t.getTempState()) : ("apply" === r.name && t.applyTempState(),
                                            h.onAction(e, r))
                                    }
                                    ,
                                    ...a
                            })
                              , s = e=>r=>{
                                    n(e.renderInitial, r, t.getState()).then((()=>i({
                                            ui: e,
                                            existingApi: r
                                    })))
                            }
                              , l = e=>r=>i({
                                    ui: e,
                                    existingApi: r,
                                    overrides: {
                                            onChange: r=>{
                                                    n(e.renderChange, r, t.getState())
                                            }
                                    }
                            })
                              , d = e=>r=>{
                                    i({
                                            ui: e,
                                            existingApi: r,
                                            overrides: {
                                                    onAction: (r,o)=>{
                                                            switch ("apply" === o.name ? e.renderFinal(t.getState(), r.getData()).then(t.addState).then((()=>{
                                                                    r.setData(t.dialogData()),
                                                                    h.onAction(r, o)
                                                            }
                                                            )) : h.onAction(r, o),
                                                            o.name) {
                                                            case ir:
                                                            case sr:
                                                                    e.onZoom(r)
                                                            }
                                                    }
                                            }
                                    }),
                                    e.onOpen(r)
                            }
                              , u = {
                                    [lr]: d(Jr(e)),
                                    [dr]: d({
                                            barComponents: Hr([tr, {
                                                    type: "sizeinput",
                                                    name: "size"
                                            }, tr]),
                                            onOpen: g,
                                            onZoom: g,
                                            renderFinal: (e,t)=>{
                                                    const r = t.size;
                                                    return Lr(e.blob, (e=>ft(e, parseInt(r.width, 10), parseInt(r.height, 10))))
                                            }
                                    }),
                                    [cr]: (m = {
                                            barComponents: Hr([tr, or(yr, "flip-horizontally", "Flip horizontally"), or(br, "flip-vertically", "Flip vertically"), or(wr, "rotate-left", "Rotate counterclockwise"), or(vr, "rotate-right", "Rotate clockwise"), tr]),
                                            actions: {
                                                    [yr]: Vr(gt, "h"),
                                                    [br]: Vr(gt, "v"),
                                                    [wr]: Vr(yt, -90),
                                                    [vr]: Vr(yt, 90)
                                            }
                                    },
                                    e=>i({
                                            ui: m,
                                            existingApi: e,
                                            actions: m.actions
                                    })),
                                    [ur]: l({
                                            barComponents: Hr([{
                                                    type: "slider",
                                                    name: "brightness",
                                                    label: "Brightness",
                                                    min: -100,
                                                    max: 100
                                            }]),
                                            renderChange: Xr("brightness")
                                    }),
                                    [mr]: s({
                                            barComponents: Wr(),
                                            renderInitial: Yr("sharpen")
                                    }),
                                    [hr]: l({
                                            barComponents: Hr([{
                                                    type: "slider",
                                                    name: "contrast",
                                                    label: "Contrast",
                                                    min: -100,
                                                    max: 100
                                            }]),
                                            renderChange: Xr("contrast")
                                    }),
                                    [gr]: l({
                                            barComponents: Hr([{
                                                    type: "slider",
                                                    name: "color-red",
                                                    label: "R",
                                                    min: 0,
                                                    max: 200
                                            }, {
                                                    type: "slider",
                                                    name: "color-green",
                                                    label: "G",
                                                    min: 0,
                                                    max: 200
                                            }, {
                                                    type: "slider",
                                                    name: "color-blue",
                                                    label: "B",
                                                    min: 0,
                                                    max: 200
                                            }]),
                                            renderChange: (e,t)=>{
                                                    const r = t["color-red"] / 100
                                                      , o = t["color-green"] / 100
                                                      , n = t["color-blue"] / 100;
                                                    return Lr(e.blob, (e=>ht(e, r, o, n)))
                                            }
                                    }),
                                    [pr]: l({
                                            barComponents: Hr([{
                                                    type: "slider",
                                                    name: "gamma",
                                                    label: "Gamma",
                                                    min: -100,
                                                    max: 100
                                            }]),
                                            renderChange: Xr("gamma")
                                    }),
                                    [fr]: s({
                                            barComponents: Wr(),
                                            renderInitial: Yr("invert")
                                    })
                            };
                            var m;
                            const h = {
                                    onSubmit: e=>{
                                            const o = t.getState().blob;
                                            r(o),
                                            e.close()
                                    }
                                    ,
                                    onClose: t.destroyState,
                                    onAction: (e,r)=>{
                                            const n = u[r.name];
                                            if (c(n))
                                                    switch (r.name) {
                                                    case "apply":
                                                    case "back":
                                                            t.destroyTempState(),
                                                            e.redial({
                                                                    ...p(),
                                                                    initialData: o(e)
                                                            });
                                                            break;
                                                    case nr:
                                                            t.undo(),
                                                            e.setData(t.dialogData()),
                                                            a(e);
                                                            break;
                                                    case ar:
                                                            t.redo(),
                                                            e.setData(t.dialogData()),
                                                            a(e);
                                                            break;
                                                    case ir:
                                                            Zr(e, 0);
                                                            break;
                                                    case sr:
                                                            Zr(e, 1)
                                                    }
                                            else
                                                    n(e)
                                    }
                            }
                              , p = ()=>({
                                    ...h,
                                    title: "Edit Image",
                                    size: "large",
                                    body: qr([or(lr, "crop", "Crop"), or(dr, "resize", "Resize"), or(cr, "orientation", "Orientation"), or(ur, "brightness", "Brightness"), or(mr, "sharpen", "Sharpen"), or(hr, "contrast", "Contrast"), or(gr, "color-levels", "Color levels"), or(pr, "gamma", "Gamma"), or(fr, "invert", "Invert")], !t.canUndo(), !t.canRedo()),
                                    buttons: [{
                                            type: "cancel",
                                            name: "cancel",
                                            text: "Cancel"
                                    }, {
                                            type: "submit",
                                            name: "save",
                                            text: "Save",
                                            enabled: t.canUndo(),
                                            primary: !0
                                    }]
                            });
                            return {
                                    ...p(),
                                    initialData: t.dialogData(!0)
                            }
                    }
                    )(i, o, a));
                    s.setEnabled("save", !1)
            }
            ))
    }
      , Qr = (e,t)=>()=>{
            Ht(e).bind((t=>jt(e, t))).each((r=>{
                    $r(e, t, r, Lt(r.dom))
            }
            ))
    }
      , eo = (e,t)=>{
            const r = Sr();
            e.on("NodeChange", (o=>{
                    const n = r.get()
                      , a = jt(e, T(o.element));
                    n.isSome() && !((e,t,r=y)=>{
                            return (o = e,
                            n = t,
                            a = r,
                            o.isSome() && n.isSome() ? S.some(a(o.getOrDie(), n.getOrDie())) : S.none()).getOr(e.isNone() && t.isNone());
                            var o, n, a
                    }
                    )(a, n, ((e,t)=>e.dom.src === t.dom.src)) ? (Jt(t),
                    e.editorUpload.uploadImagesAuto(),
                    r.clear()) : a.each(r.set)
            }
            ))
    }
    ;
    tinymce.PluginManager.requireLangPack("editimage", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW"),
    tinymce.PluginManager.add("editimage", (t=>{
            (e=>{
                    const t = e.options.register;
                    t("editimage_toolbar", {
                            processor: "string",
                            default: "rotateleft rotateright flipv fliph editimage imageoptions"
                    }),
                    t("editimage_proxy", {
                            processor: "string"
                    }),
                    t("editimage_proxy_service_url", {
                            processor: "string"
                    }),
                    t("editimage_cors_hosts", {
                            processor: "string[]",
                            default: []
                    }),
                    t("editimage_credentials_hosts", {
                            processor: "string[]",
                            default: []
                    }),
                    t("editimage_fetch_image", {
                            processor: "function"
                    }),
                    t("editimage_api_key", {
                            processor: "string"
                    }),
                    t("editimage_upload_timeout", {
                            processor: "number",
                            default: 3e4
                    })
            }
            )(t);
            const r = e(0);
            ((e,t)=>{
                    E({
                            mceImageRotateLeft: Zt(e, t, -90),
                            mceImageRotateRight: Zt(e, t, 90),
                            mceImageFlipVertical: $t(e, t, "v"),
                            mceImageFlipHorizontal: $t(e, t, "h"),
                            mceEditImage: Qr(e, t)
                    }, ((t,r)=>{
                            e.addCommand(r, t)
                    }
                    ))
            }
            )(t, r),
            (e=>{
                    let t = [];
                    const r = t=>()=>e.execCommand(t)
                      , o = ()=>Ht(e).exists((t=>jt(e, t).isSome()))
                      , n = e=>{
                            const r = t=>e.setEnabled(t);
                            return r(o()),
                            t = t.concat([r]),
                            ()=>{
                                    t = ((e,t)=>{
                                            const o = [];
                                            for (let t = 0, n = e.length; t < n; t++) {
                                                    const n = e[t];
                                                    n !== r && o.push(n)
                                            }
                                            return o
                                    }
                                    )(t)
                            }
                    }
                    ;
                    e.on("NodeChange", (()=>{
                            const e = o();
                            M(t, (t=>t(e)))
                    }
                    )),
                    e.ui.registry.addButton("rotateleft", {
                            tooltip: "Rotate counterclockwise",
                            icon: "rotate-left",
                            onAction: r("mceImageRotateLeft"),
                            onSetup: n
                    }),
                    e.ui.registry.addButton("rotateright", {
                            tooltip: "Rotate clockwise",
                            icon: "rotate-right",
                            onAction: r("mceImageRotateRight"),
                            onSetup: n
                    }),
                    e.ui.registry.addButton("flipv", {
                            tooltip: "Flip vertically",
                            icon: "flip-vertically",
                            onAction: r("mceImageFlipVertical"),
                            onSetup: n
                    }),
                    e.ui.registry.addButton("fliph", {
                            tooltip: "Flip horizontally",
                            icon: "flip-horizontally",
                            onAction: r("mceImageFlipHorizontal"),
                            onSetup: n
                    }),
                    e.ui.registry.addButton("editimage", {
                            tooltip: "Edit image",
                            icon: "edit-image",
                            onAction: r("mceEditImage"),
                            onSetup: n
                    }),
                    e.ui.registry.addButton("imageoptions", {
                            tooltip: "Image options",
                            icon: "image",
                            onAction: r("mceImage")
                    }),
                    e.ui.registry.addContextMenu("editimage", {
                            update: t=>jt(e, T(t)).map((e=>({
                                    text: "Edit image",
                                    icon: "edit-image",
                                    onAction: r("mceEditImage")
                            }))).toArray()
                    })
            }
            )(t),
            (e=>{
                    e.ui.registry.addContextToolbar("editimage", {
                            items: Rt(e),
                            predicate: t=>jt(e, T(t)).isSome(),
                            position: "node",
                            scope: "node"
                    })
            }
            )(t),
            eo(t, r)
    }
    ))
}();
