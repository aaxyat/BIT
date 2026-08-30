import * as THREE from 'three';

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
}

export interface ScenePreset {
  name: string;
  init(ctx: SceneContext): void;
  update(ctx: SceneContext, delta: number, elapsed: number): void;
  onMouseMove?(ctx: SceneContext, x: number, y: number): void;
  onSlideChange?(ctx: SceneContext, slideIndex: number, totalSlides: number): void;
  onResize?(ctx: SceneContext, width: number, height: number): void;
  destroy(ctx: SceneContext): void;
}
