"use client";

import { useEffect, useRef } from "react";
import { meshDriftFragmentShader } from "@/lib/shaders/mesh-drift";

const vertexShader = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

function createResources(gl: WebGLRenderingContext) {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl.FRAGMENT_SHADER, meshDriftFragmentShader);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const buffer = gl.createBuffer();
  if (!buffer) {
    gl.deleteProgram(program);
    return null;
  }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform3fv(
    gl.getUniformLocation(program, "u_colors[0]"),
    // Retém charcoal, warm black and muted red; remaining slots are unused.
    new Float32Array([
      25 / 255,
      24 / 255,
      24 / 255,
      31 / 255,
      28 / 255,
      27 / 255,
      50 / 255,
      35 / 255,
      32 / 255,
      90 / 255,
      38 / 255,
      35 / 255,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]),
  );
  gl.uniform4f(
    gl.getUniformLocation(program, "u_shape"),
    1.3,
    0.56,
    0.67,
    0.19,
  );
  gl.uniform4f(
    gl.getUniformLocation(program, "u_surface"),
    2.02,
    1.17,
    0.0,
    1.0,
  );
  gl.uniform4f(
    gl.getUniformLocation(program, "u_finish"),
    0.0,
    0.15,
    0.007,
    0.1,
  );
  gl.uniform4f(
    gl.getUniformLocation(program, "u_transform"),
    5069.0,
    2.72,
    0.15,
    0.0,
  );
  gl.uniform4f(gl.getUniformLocation(program, "u_space"), 0.09, 0.15, 0, 0);
  gl.uniform4f(gl.getUniformLocation(program, "u_cursor"), 0, 2.0, 0.65, 0.46);
  return { program, buffer, scene: gl.getUniformLocation(program, "u_scene") };
}

export function MeshDriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    let resources = createResources(gl);
    if (!resources) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    let lastDraw = 0;
    let inView = false;
    let active = false;
    let contextLost = false;

    const draw = () => {
      if (!resources || contextLost) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(resources.program);
      gl.uniform4f(
        resources.scene,
        canvas.width,
        canvas.height,
        elapsedRef.current * -1.37,
        4.0,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.renderer = "webgl";
    };
    const render = (now: number) => {
      frame = 0;
      if (!active) return;
      if (previousTime)
        elapsedRef.current += Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      // A subtle backdrop stays smooth at 24fps without competing with UI motion.
      if (now - lastDraw >= 40) {
        draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(render);
    };
    const update = () => {
      active =
        inView && !document.hidden && !preference.matches && !contextLost;
      canvas.dataset.motion = active
        ? "running"
        : preference.matches
          ? "reduced"
          : "paused";
      if (active && !frame) {
        previousTime = 0;
        frame = requestAnimationFrame(render);
      } else if (!active) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      }
    };
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.sqrt(1_000_000 / (width * height)),
      );
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    intersectionObserver.observe(canvas);
    const changePreference = () => {
      update();
      draw();
    };
    const loseContext = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      resources = null;
      canvas.dataset.renderer = "fallback";
      update();
    };
    const restoreContext = () => {
      resources = createResources(gl);
      contextLost = !resources;
      resize();
      update();
    };
    preference.addEventListener("change", changePreference);
    document.addEventListener("visibilitychange", update);
    canvas.addEventListener("webglcontextlost", loseContext);
    canvas.addEventListener("webglcontextrestored", restoreContext);
    resize();
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      preference.removeEventListener("change", changePreference);
      document.removeEventListener("visibilitychange", update);
      canvas.removeEventListener("webglcontextlost", loseContext);
      canvas.removeEventListener("webglcontextrestored", restoreContext);
      if (resources) {
        gl.deleteBuffer(resources.buffer);
        gl.deleteProgram(resources.program);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mesh-drift-canvas"
      data-renderer="fallback"
      aria-hidden="true"
    />
  );
}
