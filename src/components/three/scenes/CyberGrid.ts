import * as THREE from 'three';
import type { ScenePreset, SceneContext } from './types';

export class CyberGridPreset implements ScenePreset {
  name = 'grid';

  private gridGroup: THREE.Group | null = null;
  private gridHelper1: THREE.GridHelper | null = null;
  private gridHelper2: THREE.GridHelper | null = null;
  private stars: THREE.Points | null = null;
  private sun: THREE.Mesh | null = null;
  private gridSpeed = 60;
  private gridOffset = 0;
  private gridSize = 800;

  init(ctx: SceneContext): void {
    this.gridGroup = new THREE.Group();

    // Floor grid
    const size = this.gridSize;
    const divisions = 40;
    const gridColor1 = new THREE.Color(0x818cf8); // Neon indigo
    const gridColor2 = new THREE.Color(0x22d3ee); // Cyan

    this.gridHelper1 = new THREE.GridHelper(size, divisions, gridColor1, gridColor2);
    this.gridHelper1.position.y = -80;
    this.gridHelper1.position.z = 0;
    this.gridGroup.add(this.gridHelper1);

    this.gridHelper2 = new THREE.GridHelper(size, divisions, gridColor1, gridColor2);
    this.gridHelper2.position.y = -80;
    this.gridHelper2.position.z = -size;
    this.gridGroup.add(this.gridHelper2);

    // Glowing horizon sun / ring
    const sunGeo = new THREE.RingGeometry(80, 84, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    this.sun = new THREE.Mesh(sunGeo, sunMat);
    this.sun.position.set(0, -10, -500);
    this.gridGroup.add(this.sun);

    // Background starfield
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const col = new THREE.Color();

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 1200;
      starPos[i + 1] = Math.random() * 500 - 50;
      starPos[i + 2] = -Math.random() * 800 - 100;

      col.setHSL(0.55 + Math.random() * 0.2, 0.8, 0.8);
      starColors[i] = col.r;
      starColors[i + 1] = col.g;
      starColors[i + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.stars = new THREE.Points(starGeo, starMat);
    this.gridGroup.add(this.stars);

    ctx.scene.add(this.gridGroup);

    ctx.camera.position.set(0, 30, 240);
    ctx.camera.lookAt(0, 0, -200);
  }

  update(ctx: SceneContext, delta: number, elapsed: number): void {
    if (!this.gridHelper1 || !this.gridHelper2 || !this.gridGroup) return;

    // Move grid towards camera to simulate flight
    this.gridOffset += delta * this.gridSpeed;
    if (this.gridOffset >= this.gridSize) {
      this.gridOffset = 0;
    }

    this.gridHelper1.position.z = this.gridOffset;
    this.gridHelper2.position.z = this.gridOffset - this.gridSize;

    // Sun subtle pulse
    if (this.sun) {
      const scale = 1 + Math.sin(elapsed * 2) * 0.04;
      this.sun.scale.set(scale, scale, 1);
    }

    // Parallax
    this.gridGroup.rotation.y = ctx.mouseX * 0.1;
    this.gridGroup.rotation.x = ctx.mouseY * 0.05;
  }

  onSlideChange(ctx: SceneContext, slideIndex: number): void {
    // Increase flight speed momentarily on slide change
    this.gridSpeed = 160;
    setTimeout(() => {
      this.gridSpeed = 60;
    }, 600);
  }

  destroy(ctx: SceneContext): void {
    if (this.gridGroup) {
      ctx.scene.remove(this.gridGroup);
      this.gridGroup = null;
    }
    if (this.gridHelper1) {
      this.gridHelper1.geometry.dispose();
      this.gridHelper1 = null;
    }
    if (this.gridHelper2) {
      this.gridHelper2.geometry.dispose();
      this.gridHelper2 = null;
    }
    if (this.stars) {
      this.stars.geometry.dispose();
      this.stars = null;
    }
    if (this.sun) {
      this.sun.geometry.dispose();
      this.sun = null;
    }
  }
}
