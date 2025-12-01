(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/DataCosmos.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const DataCosmos = ({ particleColor = "rgba(255, 255, 255, 0.5)", lineColor = "rgba(16, 185, 129, 0.1)", particleCount = 100 })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataCosmos.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let animationFrameId;
            let w = canvas.width = window.innerWidth;
            let h = canvas.height = window.innerHeight;
            const particles = [];
            const resize = {
                "DataCosmos.useEffect.resize": ()=>{
                    w = canvas.width = window.innerWidth;
                    h = canvas.height = window.innerHeight;
                }
            }["DataCosmos.useEffect.resize"];
            window.addEventListener("resize", resize);
            class Particle {
                x;
                y;
                vx;
                vy;
                size;
                constructor(){
                    this.x = Math.random() * w;
                    this.y = Math.random() * h;
                    // Very slow, drifting movement for a "monumental" space feel
                    this.vx = (Math.random() - 0.5) * 0.2;
                    this.vy = (Math.random() - 0.5) * 0.2;
                    this.size = Math.random() * 1.5 + 0.5;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    // Wrap around screen edges for infinite space effect
                    if (this.x < 0) this.x = w;
                    if (this.x > w) this.x = 0;
                    if (this.y < 0) this.y = h;
                    if (this.y > h) this.y = 0;
                }
                draw() {
                    if (!ctx) return;
                    ctx.fillStyle = particleColor;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            const init = {
                "DataCosmos.useEffect.init": ()=>{
                    for(let i = 0; i < particleCount; i++){
                        particles.push(new Particle());
                    }
                }
            }["DataCosmos.useEffect.init"];
            const animate = {
                "DataCosmos.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, w, h);
                    // Draw lines between nearby particles (The "Constellations")
                    // This visualizes data connections
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 0.5;
                    for(let i = 0; i < particles.length; i++){
                        for(let j = i + 1; j < particles.length; j++){
                            const dx = particles[i].x - particles[j].x;
                            const dy = particles[i].y - particles[j].y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            // Connection threshold distance
                            if (distance < 120) {
                                ctx.beginPath();
                                ctx.moveTo(particles[i].x, particles[i].y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                    // Update and draw particles
                    particles.forEach({
                        "DataCosmos.useEffect.animate": (p)=>{
                            p.update();
                            p.draw();
                        }
                    }["DataCosmos.useEffect.animate"]);
                    animationFrameId = requestAnimationFrame(animate);
                }
            }["DataCosmos.useEffect.animate"];
            init();
            animate();
            return ({
                "DataCosmos.useEffect": ()=>{
                    window.removeEventListener("resize", resize);
                    cancelAnimationFrame(animationFrameId);
                }
            })["DataCosmos.useEffect"];
        }
    }["DataCosmos.useEffect"], [
        particleColor,
        lineColor,
        particleCount
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 z-0 pointer-events-none"
    }, void 0, false, {
        fileName: "[project]/components/DataCosmos.tsx",
        lineNumber: 118,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DataCosmos, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = DataCosmos;
const __TURBOPACK__default__export__ = DataCosmos;
var _c;
__turbopack_context__.k.register(_c, "DataCosmos");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/DataCosmos.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/DataCosmos.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_DataCosmos_tsx_325a585f._.js.map