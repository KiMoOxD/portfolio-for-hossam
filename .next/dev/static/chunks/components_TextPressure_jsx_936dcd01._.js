(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/TextPressure.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const TextPressure = ({ text = 'Compressa', fontFamily = 'Compressa VF', // This font is just an example, you should not use it in commercial projects.
fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2', width = true, weight = true, italic = true, alpha = false, flex = true, stroke = false, scale = false, textColor = '#FFFFFF', strokeColor = '#FF0000', strokeWidth = 2, className = '', minFontSize = 24 })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const spansRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(minFontSize);
    const [scaleY, setScaleY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lineHeight, setLineHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const chars = text.split('');
    const dist = (a, b)=>{
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextPressure.useEffect": ()=>{
            const handleMouseMove = {
                "TextPressure.useEffect.handleMouseMove": (e)=>{
                    cursorRef.current.x = e.clientX;
                    cursorRef.current.y = e.clientY;
                }
            }["TextPressure.useEffect.handleMouseMove"];
            const handleTouchMove = {
                "TextPressure.useEffect.handleTouchMove": (e)=>{
                    const t = e.touches[0];
                    cursorRef.current.x = t.clientX;
                    cursorRef.current.y = t.clientY;
                }
            }["TextPressure.useEffect.handleTouchMove"];
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove, {
                passive: false
            });
            if (containerRef.current) {
                const { left, top, width, height } = containerRef.current.getBoundingClientRect();
                mouseRef.current.x = left + width / 2;
                mouseRef.current.y = top + height / 2;
                cursorRef.current.x = mouseRef.current.x;
                cursorRef.current.y = mouseRef.current.y;
            }
            return ({
                "TextPressure.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('touchmove', handleTouchMove);
                }
            })["TextPressure.useEffect"];
        }
    }["TextPressure.useEffect"], []);
    const setSize = ()=>{
        if (!containerRef.current || !titleRef.current) return;
        const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
        let newFontSize = containerW / (chars.length / 2);
        newFontSize = Math.max(newFontSize, minFontSize);
        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);
        requestAnimationFrame(()=>{
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();
            if (scale && textRect.height > 0) {
                const yRatio = containerH / textRect.height;
                setScaleY(yRatio);
                setLineHeight(yRatio);
            }
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextPressure.useEffect": ()=>{
            setSize();
            window.addEventListener('resize', setSize);
            return ({
                "TextPressure.useEffect": ()=>window.removeEventListener('resize', setSize)
            })["TextPressure.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TextPressure.useEffect"], [
        scale,
        text
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextPressure.useEffect": ()=>{
            let rafId;
            const animate = {
                "TextPressure.useEffect.animate": ()=>{
                    mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
                    mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
                    if (titleRef.current) {
                        const titleRect = titleRef.current.getBoundingClientRect();
                        const maxDist = titleRect.width / 2;
                        spansRef.current.forEach({
                            "TextPressure.useEffect.animate": (span)=>{
                                if (!span) return;
                                const rect = span.getBoundingClientRect();
                                const charCenter = {
                                    x: rect.x + rect.width / 2,
                                    y: rect.y + rect.height / 2
                                };
                                const d = dist(mouseRef.current, charCenter);
                                const getAttr = {
                                    "TextPressure.useEffect.animate.getAttr": (distance, minVal, maxVal)=>{
                                        const val = maxVal - Math.abs(maxVal * distance / maxDist);
                                        return Math.max(minVal, val + minVal);
                                    }
                                }["TextPressure.useEffect.animate.getAttr"];
                                const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
                                const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
                                const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
                                const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;
                                span.style.opacity = alphaVal;
                                span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
                            }
                        }["TextPressure.useEffect.animate"]);
                    }
                    rafId = requestAnimationFrame(animate);
                }
            }["TextPressure.useEffect.animate"];
            animate();
            return ({
                "TextPressure.useEffect": ()=>cancelAnimationFrame(rafId)
            })["TextPressure.useEffect"];
        }
    }["TextPressure.useEffect"], [
        width,
        weight,
        italic,
        alpha,
        chars.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative w-full h-full bg-transparent",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/TextPressure.jsx",
                lineNumber: 150,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                ref: titleRef,
                className: `text-pressure-title ${className} ${flex ? 'flex justify-between' : ''} ${stroke ? 'stroke' : ''} uppercase text-center`,
                style: {
                    fontFamily,
                    fontSize: fontSize,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    fontWeight: 300,
                    color: stroke ? undefined : textColor
                },
                children: chars.map((char, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: (el)=>spansRef.current[i] = el,
                        "data-char": char,
                        className: "inline-block",
                        children: char
                    }, i, false, {
                        fileName: "[project]/components/TextPressure.jsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/TextPressure.jsx",
                lineNumber: 172,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/TextPressure.jsx",
        lineNumber: 149,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TextPressure, "J8llmEpNEjfPp6uZcGdS8ivn7Jo=");
_c = TextPressure;
const __TURBOPACK__default__export__ = TextPressure;
var _c;
__turbopack_context__.k.register(_c, "TextPressure");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TextPressure.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/TextPressure.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_TextPressure_jsx_936dcd01._.js.map