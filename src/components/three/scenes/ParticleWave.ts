import * as THREE from 'three';
import type { ScenePreset, SceneContext } from './types';

export class ParticleWavePreset implements ScenePreset {
  name = 'particles';

  private points: THREE.Points | null = null;
  private geometry: THREE.BufferGeometry | null = null;
  private material: THREE.PointsMaterial | null = null;
  private countX = 50;
  private countY = 50;
  private totalParticles = 50 * 50;
  private waveSpeed = 0.3;
  private waveHeight = 10;
  private basePositions: Float32Array | null = null;
  private currentHue = 0.65; // Indigo / blue default
  private targetHue = 0.65;

  init(ctx: SceneContext): void {
    const numParticles = this.totalParticles;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    this.basePositions = new Float32Array(numParticles * 3);

    const separation = 14;
    let i = 0;
    let i3 = 0;

    const baseColor = new THREE.Color();

    for (let ix = 0; ix < this.countX; ix++) {
      for (let iy = 0; iy < this.countY; iy++) {
        const x = ix * separation - (this.countX * separation) / 2;
        const z = iy * separation - (this.countY * separation) / 2;
        const y = 0;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        this.basePositions[i3] = x;
        this.basePositions[i3 + 1] = y;
        this.basePositions[i3 + 2] = z;

        // Gradient coloring
        const distanceFromCenter = Math.sqrt(x * x + z * z) / 400;
        baseColor.setHSL(0.65 + distanceFromCenter * 0.15, 0.85, 0.65);

        colors[i3] = baseColor.r;
        colors[i3 + 1] = baseColor.g;
        colors[i3 + 2] = baseColor.b;

        i++;
        i3 += 3;
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite or smooth point material
    this.material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.points.position.y = -60;
    this.points.rotation.x = 0.25;

    ctx.scene.add(this.points);

    ctx.camera.position.set(0, 80, 420);
    ctx.camera.lookAt(0, -30, 0);
  }

  update(ctx: SceneContext, delta: number, elapsed: number): void {
    if (!this.geometry || !this.points || !this.basePositions) return;

    const positionAttr = this.geometry.attributes.position as THREE.BufferAttribute;
    const colorAttr = this.geometry.attributes.color as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    const colors = colorAttr.array as Float32Array;

    // Smoothly interpolate hue
    this.currentHue += (this.targetHue - this.currentHue) * 0.05;

    const tempColor = new THREE.Color();
    let i3 = 0;

    const t = elapsed * this.waveSpeed;

    for (let ix = 0; ix < this.countX; ix++) {
      for (let iy = 0; iy < this.countY; iy++) {
        const x = this.basePositions[i3];
        const z = this.basePositions[i3 + 2];

        // Complex undulating wave calculation
        const wave1 = Math.sin(ix * 0.25 + t) * this.waveHeight;
        const wave2 = Math.cos(iy * 0.25 + t * 0.8) * (this.waveHeight * 0.75);
        const wave3 = Math.sin((ix + iy) * 0.15 + t * 1.2) * 10;

        positions[i3 + 1] = wave1 + wave2 + wave3;

        // Dynamic color shifting based on height & slide hue
        const heightNorm = (positions[i3 + 1] + this.waveHeight) / (this.waveHeight * 2);
        tempColor.setHSL(this.currentHue + heightNorm * 0.12, 0.9, 0.45 + heightNorm * 0.35);

        colors[i3] = tempColor.r;
        colors[i3 + 1] = tempColor.g;
        colors[i3 + 2] = tempColor.b;

        i3 += 3;
      }
    }

    positionAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;

    // Subtle mouse parallax
    this.points.rotation.y = ctx.mouseX * 0.15;
    this.points.rotation.x = 0.25 + ctx.mouseY * 0.1;
  }

  onSlideChange(ctx: SceneContext, slideIndex: number, totalSlides: number): void {
    // Shift color hue based on slide progress (e.g. blue -> cyan -> purple -> emerald)
    const progress = totalSlides > 1 ? slideIndex / (totalSlides - 1) : 0;
    const hues = [0.65, 0.55, 0.78, 0.45, 0.95];
    const hueIdx = slideIndex % hues.length;
    this.targetHue = hues[hueIdx];
  }

  destroy(ctx: SceneContext): void {
    if (this.points) {
      ctx.scene.remove(this.points);
      this.points = null;
    }
    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }
    if (this.material) {
      this.material.dispose();
      this.material = null;
    }
    this.basePositions = null;
  }
}
