import * as THREE from 'three';
import type { ScenePreset, SceneContext } from './types';

export class FloatingGeometryPreset implements ScenePreset {
  name = 'geometry';

  private group: THREE.Group | null = null;
  private torusKnot: THREE.Mesh | null = null;
  private icosahedron: THREE.Mesh | null = null;
  private octahedron: THREE.Mesh | null = null;
  private ring: THREE.Mesh | null = null;
  private light1: THREE.PointLight | null = null;
  private light2: THREE.PointLight | null = null;

  init(ctx: SceneContext): void {
    this.group = new THREE.Group();

    // Central Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(45, 12, 128, 32);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      emissive: 0x312e81,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    this.torusKnot = new THREE.Mesh(torusGeo, torusMat);
    this.torusKnot.position.set(0, 0, 0);
    this.group.add(this.torusKnot);

    // Orbiting Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(24, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5,
    });
    this.icosahedron = new THREE.Mesh(icoGeo, icoMat);
    this.icosahedron.position.set(120, 40, -50);
    this.group.add(this.icosahedron);

    // Orbiting Octahedron
    const octGeo = new THREE.OctahedronGeometry(20, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      wireframe: true,
      emissive: 0x9f1239,
      emissiveIntensity: 0.5,
    });
    this.octahedron = new THREE.Mesh(octGeo, octMat);
    this.octahedron.position.set(-110, -30, -30);
    this.group.add(this.octahedron);

    // Orbiting outer ring
    const ringGeo = new THREE.TorusGeometry(140, 1.5, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.rotation.x = Math.PI / 3;
    this.group.add(this.ring);

    // Dynamic Colored Point Lights
    this.light1 = new THREE.PointLight(0x6366f1, 4, 600);
    this.light1.position.set(100, 100, 150);
    this.group.add(this.light1);

    this.light2 = new THREE.PointLight(0x22d3ee, 4, 600);
    this.light2.position.set(-100, -100, 150);
    this.group.add(this.light2);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    this.group.add(ambientLight);

    ctx.scene.add(this.group);

    ctx.camera.position.set(0, 0, 260);
    ctx.camera.lookAt(0, 0, 0);
  }

  update(ctx: SceneContext, delta: number, elapsed: number): void {
    if (!this.group) return;

    if (this.torusKnot) {
      this.torusKnot.rotation.x = elapsed * 0.3;
      this.torusKnot.rotation.y = elapsed * 0.4;
    }

    if (this.icosahedron) {
      this.icosahedron.rotation.x = elapsed * 0.5;
      this.icosahedron.rotation.z = elapsed * 0.3;
      this.icosahedron.position.x = Math.cos(elapsed * 0.6) * 130;
      this.icosahedron.position.z = Math.sin(elapsed * 0.6) * 70 - 50;
      this.icosahedron.position.y = Math.sin(elapsed * 0.9) * 30 + 20;
    }

    if (this.octahedron) {
      this.octahedron.rotation.y = elapsed * 0.7;
      this.octahedron.rotation.x = elapsed * 0.4;
      this.octahedron.position.x = Math.sin(elapsed * 0.5 + 2) * 120;
      this.octahedron.position.z = Math.cos(elapsed * 0.5 + 2) * 60 - 30;
      this.octahedron.position.y = Math.cos(elapsed * 0.8) * 35 - 15;
    }

    if (this.ring) {
      this.ring.rotation.z = elapsed * 0.15;
    }

    // Parallax mouse rotation
    this.group.rotation.y = ctx.mouseX * 0.2;
    this.group.rotation.x = -ctx.mouseY * 0.2;
  }

  onSlideChange(ctx: SceneContext, slideIndex: number): void {
    if (!this.torusKnot) return;
    // Morph scale effect on slide change
    this.torusKnot.scale.set(1.2, 1.2, 1.2);
    setTimeout(() => {
      if (this.torusKnot) this.torusKnot.scale.set(1, 1, 1);
    }, 400);
  }

  destroy(ctx: SceneContext): void {
    if (this.group) {
      ctx.scene.remove(this.group);
      this.group = null;
    }
    this.torusKnot = null;
    this.icosahedron = null;
    this.octahedron = null;
    this.ring = null;
    this.light1 = null;
    this.light2 = null;
  }
}
