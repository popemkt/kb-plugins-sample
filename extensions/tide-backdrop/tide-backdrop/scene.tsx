import { useEffect, useRef } from "react";
import { meterFrames, useReducedMotion, type BackdropProps } from "kb-ext-sdk/page";

const num = (value: unknown, fallback: number) => (typeof value === "number" ? value : fallback);

/**
 * Two soft bands of colour drifting across the head on a canvas of its own,
 * held to its budget by kb's frame meter. It draws only while on screen and
 * the tab is shown, and one still frame under reduced motion.
 */
export function TideScene({ knobs, budget, opacity, direction }: BackdropProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const still = useReducedMotion();
  const speed = num(knobs.speed, 1);
  const hue = num(knobs.hue, 190);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d") ?? null;
    if (element === null || context === null) return undefined;
    const meter = meterFrames(element, budget);
    let raf = 0;
    let shown = true;
    let t = 0;
    let last = performance.now();
    const draw = () => {
      const began = performance.now();
      const scale = Math.min(window.devicePixelRatio || 1, 2) * meter.quality();
      const width = Math.max(1, Math.round(element.clientWidth * scale));
      const height = Math.max(1, Math.round(element.clientHeight * scale));
      if (element.width !== width) element.width = width;
      if (element.height !== height) element.height = height;
      context.clearRect(0, 0, width, height);
      context.globalAlpha = opacity;
      for (const [i, shift] of [0, 60].entries()) {
        const x = width * (0.5 + 0.4 * Math.sin(t * (0.6 + i * 0.25) + i * 2));
        const y = direction === "up" ? height * 0.25 : height * 0.75;
        const glow = context.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.45);
        glow.addColorStop(0, `hsla(${hue + shift}, 80%, 62%, 0.85)`);
        glow.addColorStop(1, `hsla(${hue + shift}, 80%, 62%, 0)`);
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }
      meter.record(performance.now() - began);
    };
    const tick = (now: number) => {
      t += Math.min(now - last, 50) * 0.0005 * speed;
      last = now;
      draw();
      raf = shown && document.visibilityState === "visible" ? requestAnimationFrame(tick) : 0;
    };
    const resume = () => {
      if (raf !== 0 || !shown || still || document.visibilityState !== "visible") return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const seen = new IntersectionObserver(([entry]) => {
      shown = entry?.isIntersecting ?? true;
      resume();
    });
    seen.observe(element);
    document.addEventListener("visibilitychange", resume);
    draw();
    resume();
    return () => {
      cancelAnimationFrame(raf);
      seen.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, [budget, opacity, direction, speed, hue, still]);
  return <canvas ref={canvas} style={{ width: "100%", height: "100%", display: "block" }} />;
}
