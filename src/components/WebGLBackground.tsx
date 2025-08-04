'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  alpha: number;
  size: number;
}

interface Connection {
  from: Particle;
  to: Particle;
  strength: number;
  life: number;
  maxLife: number;
}

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvasFallback = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };

      const initParticles = () => {
        const particleCount = 25;
        particlesRef.current = [];
        
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: -50 - Math.random() * 100,
            z: 0,
            vx: (Math.random() - 0.5) * 0.3,
            vy: 0.5 + Math.random() * 1.0,
            vz: 0,
            life: Math.random() * 1000,
            maxLife: 1000 + Math.random() * 2000,
            alpha: Math.random() * 0.4 + 0.2,
            size: Math.random() * 3 + 1
          });
        }
      };

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const isDark = theme === 'dark';
        const color = isDark ? 'rgba(102, 204, 255, ' : 'rgba(59, 130, 246, ';
        
        particlesRef.current.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = color + particle.alpha + ')';
          ctx.fill();
          
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life += 16;
          
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y > canvas.height + 50) {
            particle.y = -50 - Math.random() * 100;
            particle.x = Math.random() * canvas.width;
          }
          
          const lifeCycle = (particle.life % particle.maxLife) / particle.maxLife;
          particle.alpha = Math.sin(lifeCycle * Math.PI) * 0.8 + 0.2;
        });
      };

      const animate = () => {
        render();
        animationRef.current = requestAnimationFrame(animate);
      };

      resize();
      initParticles();
      window.addEventListener('resize', resize);
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('resize', resize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    };

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to canvas');
      return setupCanvasFallback();
    }
    

    const webgl = gl as WebGLRenderingContext;

    const setupWebGL = () => {
      const vertexShaderSource = `
        attribute vec2 a_position;
        attribute float a_size;
        attribute float a_alpha;
        uniform vec2 u_resolution;
        uniform float u_time;
        varying float v_alpha;
        
        void main() {
          vec2 position = (a_position / u_resolution) * 2.0 - 1.0;
          position.y = -position.y;
          
          gl_Position = vec4(position, 0.0, 1.0);
          gl_PointSize = a_size;
          v_alpha = a_alpha;
        }
      `;

      const fragmentShaderSource = `
        precision mediump float;
        uniform vec3 u_color;
        varying float v_alpha;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * v_alpha;
          gl_FragColor = vec4(u_color, alpha);
        }
      `;

      const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compile error:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        
        return shader;
      };

      const vertexShader = createShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(webgl, webgl.FRAGMENT_SHADER, fragmentShaderSource);
      
      if (!vertexShader || !fragmentShader) return null;

      const program = webgl.createProgram();
      if (!program) return null;
      
      webgl.attachShader(program, vertexShader);
      webgl.attachShader(program, fragmentShader);
      webgl.linkProgram(program);
      
      if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
        console.error('Program link error:', webgl.getProgramInfoLog(program));
        return null;
      }

      return program;
    };

    const program = setupWebGL();
    if (!program) return setupCanvasFallback();

    const positionLocation = webgl.getAttribLocation(program, 'a_position');
    const sizeLocation = webgl.getAttribLocation(program, 'a_size');
    const alphaLocation = webgl.getAttribLocation(program, 'a_alpha');
    const resolutionLocation = webgl.getUniformLocation(program, 'u_resolution');
    const colorLocation = webgl.getUniformLocation(program, 'u_color');
    const timeLocation = webgl.getUniformLocation(program, 'u_time');

    const positionBuffer = webgl.createBuffer();
    const sizeBuffer = webgl.createBuffer();
    const alphaBuffer = webgl.createBuffer();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      webgl.viewport(0, 0, canvas.width, canvas.height);
    };

    const initParticles = () => {
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: -50 - Math.random() * 100,
          z: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.3,
          vy: 0.5 + Math.random() * 1.0,
          vz: (Math.random() - 0.5) * 0.1,
          life: Math.random() * 1000,
          maxLife: 1000 + Math.random() * 2000,
          alpha: Math.random() * 0.4 + 0.2,
          size: Math.random() * 3 + 1
        });
      }
    };

    const updateParticles = (deltaTime: number) => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;
        particle.z += particle.vz * deltaTime;
        particle.life += deltaTime;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height + 50) {
          particle.y = -50 - Math.random() * 100;
          particle.x = Math.random() * canvas.width;
        }

        const lifeCycle = (particle.life % particle.maxLife) / particle.maxLife;
        particle.alpha = Math.sin(lifeCycle * Math.PI) * 0.8 + 0.2;
      });

      connectionsRef.current = connectionsRef.current.filter(conn => {
        conn.life += deltaTime;
        return conn.life < conn.maxLife;
      });

      if (Math.random() < 0.02) {
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length - 1; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150 && connectionsRef.current.length < 10) {
              connectionsRef.current.push({
                from: particles[i],
                to: particles[j],
                strength: 1 - (distance / 150),
                life: 0,
                maxLife: 2000 + Math.random() * 3000
              });
            }
          }
        }
      }
    };

    const render = () => {
      webgl.clearColor(0, 0, 0, 0);
      webgl.clear(webgl.COLOR_BUFFER_BIT);
      webgl.enable(webgl.BLEND);
      webgl.blendFunc(webgl.SRC_ALPHA, webgl.ONE_MINUS_SRC_ALPHA);

      webgl.useProgram(program);

      webgl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      webgl.uniform1f(timeLocation, timeRef.current * 0.001);

      const isDark = theme === 'dark';
      const color = isDark ? [0.4, 0.8, 1.0] : [0.1, 0.6, 0.9];
      webgl.uniform3f(colorLocation, color[0], color[1], color[2]);

      const positions = new Float32Array(particlesRef.current.length * 2);
      const sizes = new Float32Array(particlesRef.current.length);
      const alphas = new Float32Array(particlesRef.current.length);

      particlesRef.current.forEach((particle, i) => {
        positions[i * 2] = particle.x;
        positions[i * 2 + 1] = particle.y;
        sizes[i] = particle.size;
        alphas[i] = Math.max(0.1, particle.alpha);
      });

      webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
      webgl.bufferData(webgl.ARRAY_BUFFER, positions, webgl.DYNAMIC_DRAW);
      webgl.enableVertexAttribArray(positionLocation);
      webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

      webgl.bindBuffer(webgl.ARRAY_BUFFER, sizeBuffer);
      webgl.bufferData(webgl.ARRAY_BUFFER, sizes, webgl.DYNAMIC_DRAW);
      webgl.enableVertexAttribArray(sizeLocation);
      webgl.vertexAttribPointer(sizeLocation, 1, webgl.FLOAT, false, 0, 0);

      webgl.bindBuffer(webgl.ARRAY_BUFFER, alphaBuffer);
      webgl.bufferData(webgl.ARRAY_BUFFER, alphas, webgl.DYNAMIC_DRAW);
      webgl.enableVertexAttribArray(alphaLocation);
      webgl.vertexAttribPointer(alphaLocation, 1, webgl.FLOAT, false, 0, 0);

      webgl.drawArrays(webgl.POINTS, 0, particlesRef.current.length);
    };

    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      timeRef.current = currentTime;

      updateParticles(deltaTime);
      render();

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    window.addEventListener('resize', resize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-30"
      style={{ background: 'transparent' }}
    />
  );
}
