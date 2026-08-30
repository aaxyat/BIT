import * as THREE from 'three';
import type { ScenePreset, SceneContext } from './types';
import { ParticleWavePreset } from './ParticleWave';
import { CyberGridPreset } from './CyberGrid';
import { FloatingGeometryPreset } from './FloatingGeometry';
import { ConstellationPreset } from './Constellation';

declare global {
  interface Window {
    __sceneManager?: SceneManager;
  }
}

export class SceneManager {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private ctx: SceneContext;

  private presets: Map<string, ScenePreset> = new Map();
  private activePreset: ScenePreset | null = null;
  private activePresetName = 'particles';

  private animFrameId: number | null = null;
  private isPaused = false;
  private isDestroyed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2000);
    this.camera.position.z = 300;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.ctx = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      width,
      height,
      mouseX: 0,
      mouseY: 0,
    };

    // Register all scene presets
    this.registerPreset(new ParticleWavePreset());
    this.registerPreset(new CyberGridPreset());
    this.registerPreset(new FloatingGeometryPreset());
    this.registerPreset(new ConstellationPreset());

    this.bindEvents();
    this.setScene('particles');
    this.startLoop();

    window.__sceneManager = this;
  }

  public registerPreset(preset: ScenePreset): void {
    this.presets.set(preset.name, preset);
  }

  public setScene(name: string): void {
    if (this.isDestroyed) return;
    if (name === 'none') {
      if (this.activePreset) {
        this.activePreset.destroy(this.ctx);
        this.activePreset = null;
      }
      this.activePresetName = 'none';
      return;
    }

    if (this.activePreset && this.activePreset.name === name) {
      return;
    }

    const nextPreset = this.presets.get(name) || this.presets.get('particles');
    if (!nextPreset) return;

    if (this.activePreset) {
      this.activePreset.destroy(this.ctx);
    }

    // Reset camera defaults before preset configures it
    this.camera.position.set(0, 0, 300);
    this.camera.rotation.set(0, 0, 0);

    this.activePreset = nextPreset;
    this.activePresetName = nextPreset.name;
    this.activePreset.init(this.ctx);
  }

  public onSlideChange(slideIndex: number, totalSlides: number, requestedScene?: string): void {
    if (requestedScene && requestedScene !== this.activePresetName) {
      this.setScene(requestedScene);
    }

    if (this.activePreset && this.activePreset.onSlideChange) {
      this.activePreset.onSlideChange(this.ctx, slideIndex, totalSlides);
    }
  }

  public pause(): void {
    this.isPaused = true;
  }

  public resume(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this.clock.start();
    }
  }

  private startLoop(): void {
    const loop = () => {
      if (this.isDestroyed) return;

      if (!this.isPaused) {
        const delta = Math.min(this.clock.getDelta(), 0.1);
        const elapsed = this.clock.getElapsedTime();

        if (this.activePreset) {
          this.activePreset.update(this.ctx, delta, elapsed);
        }

        this.renderer.render(this.scene, this.camera);
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  private bindEvents(): void {
    // Window Resize
    window.addEventListener('resize', this.onResize);

    // Mouse Parallax
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });

    // Auto-pause when tab is inactive to preserve battery and GPU
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  private onResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.ctx.width = width;
    this.ctx.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (this.activePreset && this.activePreset.onResize) {
      this.activePreset.onResize(this.ctx, width, height);
    }
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.ctx.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.ctx.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    if (this.activePreset && this.activePreset.onMouseMove) {
      this.activePreset.onMouseMove(this.ctx, this.ctx.mouseX, this.ctx.mouseY);
    }
  };

  private onVisibilityChange = (): void => {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  };

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.activePreset) {
      this.activePreset.destroy(this.ctx);
      this.activePreset = null;
    }

    this.renderer.dispose();
    if (window.__sceneManager === this) {
      delete window.__sceneManager;
    }
  }
}
