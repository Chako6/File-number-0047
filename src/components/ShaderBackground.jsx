'use client'

import { useRef, useEffect } from 'react'

// ─── Shaders ────────────────────────────────────────────────────────────────

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

/**
 * Fragment shader — aerial view of a Formula racing circuit at night.
 *
 * Shape: rounded-rectangle oval, perfectly centred and symmetric.
 *   half-extents (0.620, 0.375), corner radius 0.180.
 *   Wider than tall → motorsport oval feel, frames 16:9 hero text.
 *
 * Car animation lives on a separate 2-D canvas overlay (see jCircuit /
 *   renderOverlay below). Only the static track is rendered here.
 *
 * Coordinate system (uv = (FC − 0.5·R) / min(R)):
 *   16:9 screen → x ∈ [−0.889, 0.889],  y ∈ [−0.5, 0.5]
 */
const FRAG_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform float trackScale;
#define FC gl_FragCoord.xy
#define T  time
#define R  resolution
#define MN min(R.x, R.y)

// ── Oval circuit constants ────────────────────────────────────────────────
const float HX = 0.620;
const float HY = 0.375;
const float CR = 0.180;

// Signed distance to the oval centreline.
//   sd < 0 → inside oval (inner track / apex-kerb side)
//   sd > 0 → outside oval (outer track / barrier side)
float ovalSDF(vec2 p) {
  vec2 d = abs(p) - vec2(HX, HY) + CR;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - CR;
}

void main(void) {
  vec2 uv  = (FC - 0.5*R) / MN;
  // tuv: same as uv but scaled so the track fits on portrait screens.
  // trackScale = 1.0 on landscape/desktop, 0.70 on portrait mobile.
  vec2 tuv = uv / trackScale;

  // ── Ambient background ──────────────────────────────────────────────────
  // Three slow sine waves at different angles and speeds combine into a
  // textured wash. No dominant direction → no visible streaks or bands.
  // A radial haze at centre adds depth without acting as a light source.
  float w1   = sin(uv.x * 2.10 + uv.y * 1.40 + T * 0.070);
  float w2   = sin(uv.x * 1.65 - uv.y * 2.30 + T * 0.055);
  float w3   = sin(length(uv) * 3.50          - T * 0.100);
  float tex  = (w1 + w2 + w3) * (1.0 / 6.0) + 0.5;
  float haze = exp(-dot(uv, uv) * 1.2);
  vec3 col = vec3(0.028, 0.055, 0.108)
           + tex  * 0.011 * vec3(0.30, 0.50, 1.00)
           + haze * 0.008 * vec3(0.20, 0.40, 0.90);

  // ── Track geometry — exact SDF, no iterations ──────────────────────────
  float sd        = ovalSDF(tuv);
  float trackDist = abs(sd);
  float innerMask = smoothstep( 0.004, -0.004, sd);
  float outerMask = smoothstep(-0.004,  0.004, sd);

  const float TW = 0.033;  // half-width from centreline to each border
  const float AA = 0.0015; // anti-alias width

  // ── 1. TARMAC ──────────────────────────────────────────────────────────
  col += smoothstep(TW + AA, TW - AA, trackDist) * vec3(0.038, 0.062, 0.112);

  // ── 2. BORDER LINES — soft warm white ──────────────────────────────────
  float borderLine = smoothstep(AA * 2.5, 0.0, abs(trackDist - TW));
  col += borderLine * outerMask * 0.58 * vec3(0.92, 0.90, 0.86);
  col += borderLine * innerMask * 0.58 * vec3(0.92, 0.90, 0.86);

  // ── 3. EDGE AURA ───────────────────────────────────────────────────────
  float edgeAura = exp(-pow((trackDist - TW) / 0.0040, 2.0));
  col += edgeAura * 0.09 * vec3(0.92, 0.90, 0.86);

  // ── 4. DASHED CENTRE LINE ──────────────────────────────────────────────
  // atan(y/HY, x/HX) normalises by oval aspect ratio → uniform arc-length
  // spacing so dashes are the same size on straights and corners.
  float arcAngle = atan(tuv.y / HY, tuv.x / HX);
  float dashOn   = smoothstep(-0.14, 0.14, sin(arcAngle * 12.0));
  float rl       = smoothstep(AA * 2.5, 0.0, trackDist);
  col += rl * dashOn * 0.34 * vec3(0.90, 0.83, 0.54);

  // ── 5. RADIAL VIGNETTE ─────────────────────────────────────────────────
  col *= clamp(1.0 - dot(uv * 0.76, uv * 0.76), 0.0, 1.0);

  O = vec4(col, 1.0);
}`;

// ─── WebGL renderer ──────────────────────────────────────────────────────────

class WebGLRenderer {
  constructor(canvas) {
    this.canvas   = canvas;
    this.gl       = canvas.getContext('webgl2');
    this.program  = null;
    this.vs       = null;
    this.fs       = null;
    this.buffer   = null;
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  }

  compile(shader, source) {
    const { gl } = this;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('[ShaderBackground] compile error:', gl.getShaderInfoLog(shader));
    }
  }

  setup() {
    const { gl } = this;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, VERTEX_SRC);
    this.compile(this.fs, FRAG_SRC);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('[ShaderBackground] link error:', gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const { gl, program } = this;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    program.uResolution = gl.getUniformLocation(program, 'resolution');
    program.uTime       = gl.getUniformLocation(program, 'time');
    program.uTrackScale = gl.getUniformLocation(program, 'trackScale');
  }

  resize() {
    const { gl, canvas } = this;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  render(now = 0, trackScale = 1.0) {
    const { gl, program, canvas } = this;
    if (!program) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(program.uResolution, canvas.width, canvas.height);
    gl.uniform1f(program.uTime, now * 1e-3);
    gl.uniform1f(program.uTrackScale, trackScale);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  reset() {
    const { gl } = this;
    if (!this.program) return;
    if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
    if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
    gl.deleteProgram(this.program);
    this.program = null;
  }
}

// ─── 2-D overlay: circuit math (mirrors the GLSL constants) ─────────────────

// These must stay in sync with the GLSL HX / HY / CR / SW / SH constants.
const HX_J = 0.620, HY_J = 0.375, CR_J = 0.180;
const SW_J = 0.880, SH_J = 0.390;
const AR_J = Math.PI * CR_J / 2;            // quarter-arc length ≈ 0.28274
const PL_J = 2 * (SW_J + SH_J) + 4 * AR_J; // total perimeter    ≈ 3.671
const LAP  = 9.5;                            // seconds per lap

// Arc-length–parameterised position on the oval. Mirrors GLSL circuit().
// t = 0 starts at the entry of the top-right corner arc, clockwise.
function jCircuit(t) {
  let s = (((t % 1) + 1) % 1) * PL_J;
  const ex = HX_J - CR_J, ey = HY_J - CR_J; // 0.440, 0.195

  if (s < AR_J) { const a = Math.PI / 2 - s / CR_J; return [ex + CR_J * Math.cos(a), ey + CR_J * Math.sin(a)]; } s -= AR_J;
  if (s < SH_J) return [HX_J, ey - s]; s -= SH_J;
  if (s < AR_J) { const a = -s / CR_J; return [ex + CR_J * Math.cos(a), -ey + CR_J * Math.sin(a)]; } s -= AR_J;
  if (s < SW_J) return [ex - s, -HY_J]; s -= SW_J;
  if (s < AR_J) { const a = -Math.PI / 2 - s / CR_J; return [-ex + CR_J * Math.cos(a), -ey + CR_J * Math.sin(a)]; } s -= AR_J;
  if (s < SH_J) return [-HX_J, -ey + s]; s -= SH_J;
  if (s < AR_J) { const a = Math.PI - s / CR_J; return [-ex + CR_J * Math.cos(a), ey + CR_J * Math.sin(a)]; } s -= AR_J;
  return [-ex + s, HY_J];
}

// Non-linear phase → circuit-position mapping. Mirrors GLSL circuitT().
// Primary 4-cycle wave: fast on straights, slow in corners.
// Second harmonic sharpens exit acceleration vs braking onset.
// Combined bound: 0.034×8π + 0.004×16π ≈ 0.855 + 0.201 = 0.956 < 1 → monotone.
function jCircuitT(ph) {
  const f  = ((ph % 1) + 1) % 1;
  const s1 = Math.sin(8  * Math.PI * f - 8  * Math.PI * 0.130);
  const s2 = Math.sin(16 * Math.PI * f - 16 * Math.PI * 0.130);
  return ((f + 0.034 * s1 + 0.004 * s2) % 1 + 1) % 1;
}

// Track-UV (tuv) → canvas pixel. Mirrors GLSL: uv=(FC−0.5R)/MN, tuv=uv/ts.
// Canvas y is inverted relative to GLSL uv.y (canvas y=0 at top).
function uvPx(tu, tv, cw, ch, ts) {
  const mn = Math.min(cw, ch);
  return [tu * ts * mn + cw * 0.5, -tv * ts * mn + ch * 0.5];
}

// 24-segment warm-gold trail fading behind the car.
function drawTrail(ctx, phase, cw, ch, ts) {
  const STEPS = 24, FRAC = 0.065;
  ctx.lineCap = 'round';
  for (let k = STEPS; k >= 1; k--) {
    const a0 = k / STEPS, a1 = (k - 1) / STEPS;
    const [u0, v0] = jCircuit(jCircuitT(((phase - a0 * FRAC) % 1 + 1) % 1));
    const [u1, v1] = jCircuit(jCircuitT(((phase - a1 * FRAC) % 1 + 1) % 1));
    const [px0, py0] = uvPx(u0, v0, cw, ch, ts);
    const [px1, py1] = uvPx(u1, v1, cw, ch, ts);
    const fade  = Math.pow(1 - a0, 2.5);
    const alpha = (fade * 0.90).toFixed(3);
    const lw    = Math.max(0.4, fade * 3.2);
    const gg    = Math.round(190 + fade * 45);
    const gb    = Math.round(45  + fade * 40);
    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo(px1, py1);
    ctx.strokeStyle = `rgba(255,${gg},${gb},${alpha})`;
    ctx.lineWidth   = lw;
    ctx.stroke();
  }
}

// Stylised top-down single-seater silhouette.
// cx/cy = canvas-pixel centre; angle = heading in radians.
// S = Math.min(cw, ch) * trackScale — canvas-space size reference.
function drawCar(ctx, cx, cy, angle, S) {
  const bl  = 0.032 * S, bw  = 0.011 * S;
  const fws = 0.016 * S, rws = 0.014 * S;
  const fwd = 0.0046 * S, rwd = 0.0055 * S;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Ambient halo — gold-light #D9BC72
  const grd = ctx.createRadialGradient(bl * 0.1, 0, 0, bl * 0.1, 0, bl * 1.35);
  grd.addColorStop(0,    'rgba(248,228,155,0.32)');
  grd.addColorStop(0.55, 'rgba(248,228,155,0.12)');
  grd.addColorStop(1,    'rgba(248,228,155,0.00)');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.ellipse(bl * 0.1, 0, bl * 1.30, bl * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body — teardrop silhouette with nose at +x
  ctx.beginPath();
  ctx.moveTo(bl, 0);
  ctx.quadraticCurveTo( bl * 0.65,  bw * 0.35,  bl * 0.10,  bw);
  ctx.lineTo(-bl * 0.48,  bw * 0.92);
  ctx.quadraticCurveTo(-bl * 0.80,  bw * 0.55, -bl,  bw * 0.25);
  ctx.lineTo(-bl, -bw * 0.25);
  ctx.quadraticCurveTo(-bl * 0.80, -bw * 0.55, -bl * 0.48, -bw * 0.92);
  ctx.lineTo(bl * 0.10, -bw);
  ctx.quadraticCurveTo( bl * 0.65, -bw * 0.35,  bl, 0);
  ctx.closePath();
  ctx.fillStyle   = 'rgba(248,228,155,1.00)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,252,220,0.95)';
  ctx.lineWidth   = 1.4;
  ctx.stroke();

  // Front wing
  ctx.beginPath();
  ctx.rect(bl * 0.70 - fwd, -fws, fwd * 2, fws * 2);
  ctx.fillStyle   = 'rgba(228,205,118,1.00)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,252,220,0.75)';
  ctx.lineWidth   = 0.85;
  ctx.stroke();

  // Rear wing
  ctx.beginPath();
  ctx.rect(-bl * 0.86 - rwd, -rws, rwd * 2, rws * 2);
  ctx.fill();
  ctx.stroke();

  // Cockpit — dark recess for shape contrast
  ctx.beginPath();
  ctx.ellipse(bl * 0.07, 0, bl * 0.17, bw * 0.44, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10,6,2,0.88)';
  ctx.fill();

  ctx.restore();
}

// Clear the overlay canvas and draw trail + car for the current timestamp.
function renderOverlay(ctx, nowMs, cw, ch, ts) {
  ctx.clearRect(0, 0, cw, ch);

  const phase = (nowMs / 1000 / LAP) % 1;
  const carT  = jCircuitT(phase);
  const [cu, cv] = jCircuit(carT);
  const [cx, cy] = uvPx(cu, cv, cw, ch, ts);

  // Car heading via symmetric finite difference — stable at all speeds.
  const dp = 0.003;
  const [uA, vA] = jCircuit(jCircuitT(((phase + dp) % 1 + 1) % 1));
  const [uB, vB] = jCircuit(jCircuitT(((phase - dp) % 1 + 1) % 1));
  const [pxA, pyA] = uvPx(uA, vA, cw, ch, ts);
  const [pxB, pyB] = uvPx(uB, vB, cw, ch, ts);
  const angle = Math.atan2(pyA - pyB, pxA - pxB);

  const S = Math.min(cw, ch) * ts;
  drawTrail(ctx, phase, cw, ch, ts);
  drawCar(ctx, cx, cy, angle, S);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShaderBackground() {
  const trackRef = useRef(null);
  const carRef   = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const car   = carRef.current;
    if (!track || !car) return;

    // Graceful degradation: if WebGL2 is unavailable, show plain navy.
    if (!track.getContext('webgl2')) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use half DPR on high-res screens to stay performant.
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    const renderer = new WebGLRenderer(track);
    renderer.setup();
    renderer.init();

    const ctx2d = car.getContext('2d');
    let trackScale = 1.0;

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      track.width  = w * dpr;
      track.height = h * dpr;
      car.width    = w * dpr;
      car.height   = h * dpr;
      // Portrait (height > width): shrink track to fit within ±0.5 uv-x.
      trackScale   = track.width >= track.height ? 1.0 : 0.70;
      renderer.resize();
    };

    resize();

    // Start / stop the render loop based on canvas visibility.
    let raf = null;

    const startLoop = () => {
      if (raf !== null) return;
      const tick = (now) => {
        renderer.render(now, trackScale);
        if (!reducedMotion) renderOverlay(ctx2d, now, car.width, car.height, trackScale);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      cancelAnimationFrame(raf);
      raf = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? startLoop() : stopLoop(); },
      { threshold: 0 }
    );
    observer.observe(track);
    startLoop();

    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      stopLoop();
      renderer.reset();
    };
  }, []);

  return (
    <>
      <canvas ref={trackRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
      <canvas ref={carRef}   aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
    </>
  );
}
