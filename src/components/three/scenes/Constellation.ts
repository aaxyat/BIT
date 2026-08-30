import * as THREE from 'three';
import type { ScenePreset, SceneContext } from './types';

export class ConstellationPreset implements ScenePreset {
  name = 'constellation';

  private group: THREE.Group | null = null;
  private pointCloud: THREE.Points | null = null;
  private linesMesh: THREE.LineSegments | null = null;
  private particlesData: Array<{ velocity: THREE.Vector3; numConnections: number }> = [];
  private particlePositions: Float32Array | null = null;
  private linesPositions: Float32Array | null = null;
  private linesColors: Float32Array | null = null;

  private maxParticleCount = 110;
  private connectDistance = 115;

  init(ctx: SceneContext): void {
    this.group = new THREE.Group();

    const segments = this.maxParticleCount * this.maxParticleCount;
    this.linesPositions = new Float32Array(segments * 3);
    this.linesColors = new Float32Array(segments * 3);
    this.particlePositions = new Float32Array(this.maxParticleCount * 3);
    this.particlesData = [];

    const r = 260;
    const rHalf = r / 2;

    for (let i = 0; i < this.maxParticleCount; i++) {
      const x = Math.random() * r - rHalf;
      const y = Math.random() * r - rHalf;
      const z = Math.random() * r - rHalf;

      this.particlePositions[i * 3] = x;
      this.particlePositions[i * 3 + 1] = y;
      this.particlePositions[i * 3 + 2] = z;

      this.particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.7
        ),
        numConnections: 0,
      });
    }

    // Points
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 4.5,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true,
    });

    this.pointCloud = new THREE.Points(pGeo, pMat);
    this.group.add(this.pointCloud);

    // Lines
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(this.linesPositions, 3).setUsage(THREE.DynamicDrawUsage));
    lGeo.setAttribute('color', new THREE.BufferAttribute(this.linesColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    this.linesMesh = new THREE.LineSegments(lGeo, lMat);
    this.group.add(this.linesMesh);

    ctx.scene.add(this.group);

    ctx.camera.position.set(0, 0, 220);
    ctx.camera.lookAt(0, 0, 0);
  }

  update(ctx: SceneContext, delta: number, elapsed: number): void {
    if (!this.pointCloud || !this.linesMesh || !this.particlePositions || !this.linesPositions || !this.linesColors || !this.group) return;

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    const r = 260;
    const rHalf = r / 2;

    for (let i = 0; i < this.maxParticleCount; i++) {
      this.particlesData[i].numConnections = 0;
    }

    for (let i = 0; i < this.maxParticleCount; i++) {
      const pData = this.particlesData[i];

      this.particlePositions[i * 3] += pData.velocity.x;
      this.particlePositions[i * 3 + 1] += pData.velocity.y;
      this.particlePositions[i * 3 + 2] += pData.velocity.z;

      if (this.particlePositions[i * 3 + 1] < -rHalf || this.particlePositions[i * 3 + 1] > rHalf)
        pData.velocity.y = -pData.velocity.y;

      if (this.particlePositions[i * 3] < -rHalf || this.particlePositions[i * 3] > rHalf)
        pData.velocity.x = -pData.velocity.x;

      if (this.particlePositions[i * 3 + 2] < -rHalf || this.particlePositions[i * 3 + 2] > rHalf)
        pData.velocity.z = -pData.velocity.z;

      // Check connections
      for (let j = i + 1; j < this.maxParticleCount; j++) {
        const pDataB = this.particlesData[j];

        const dx = this.particlePositions[i * 3] - this.particlePositions[j * 3];
        const dy = this.particlePositions[i * 3 + 1] - this.particlePositions[j * 3 + 1];
        const dz = this.particlePositions[i * 3 + 2] - this.particlePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < this.connectDistance) {
          pData.numConnections++;
          pDataB.numConnections++;

          const alpha = 1.0 - dist / this.connectDistance;

          this.linesPositions[vertexpos++] = this.particlePositions[i * 3];
          this.linesPositions[vertexpos++] = this.particlePositions[i * 3 + 1];
          this.linesPositions[vertexpos++] = this.particlePositions[i * 3 + 2];

          this.linesPositions[vertexpos++] = this.particlePositions[j * 3];
          this.linesPositions[vertexpos++] = this.particlePositions[j * 3 + 1];
          this.linesPositions[vertexpos++] = this.particlePositions[j * 3 + 2];

          this.linesColors[colorpos++] = alpha * 0.38; // R
          this.linesColors[colorpos++] = alpha * 0.74; // G
          this.linesColors[colorpos++] = alpha * 0.97; // B

          this.linesColors[colorpos++] = alpha * 0.38;
          this.linesColors[colorpos++] = alpha * 0.74;
          this.linesColors[colorpos++] = alpha * 0.97;

          numConnected++;
        }
      }
    }

    this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
    (this.linesMesh.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.linesMesh.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    (this.pointCloud.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // Slow rotation & parallax
    this.group.rotation.y = elapsed * 0.05 + ctx.mouseX * 0.2;
    this.group.rotation.x = ctx.mouseY * 0.15;
  }

  destroy(ctx: SceneContext): void {
    if (this.group) {
      ctx.scene.remove(this.group);
      this.group = null;
    }
    if (this.pointCloud) {
      this.pointCloud.geometry.dispose();
      this.pointCloud = null;
    }
    if (this.linesMesh) {
      this.linesMesh.geometry.dispose();
      this.linesMesh = null;
    }
    this.particlePositions = null;
    this.linesPositions = null;
    this.linesColors = null;
    this.particlesData = [];
  }
}
