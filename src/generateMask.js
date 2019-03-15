// function that returns three.js group
const seedrandom = require('seedrandom');

const blobs = [
  { localSeed: 0.6734 },
  { localSeed: -0.1273 },
  { localSeed: 0.3932 },
  { localSeed: 0.9831 },
  { localSeed: -0.4930 },
  { localSeed: -0.2038 },
  { localSeed: 0.5301 },
  { localSeed: -0.8340 },
  { localSeed: 0.7203 },
  { localSeed: -0.6210 },
];

function perlinNoiseSphere(sphere, randNum) {
  const k = (2 * randNum) + 0.5;
  for (let i = 0; i < sphere.geometry.vertices.length; i++) {
    const p = sphere.geometry.vertices[i];
    p.normalize().multiplyScalar(0.2 + 0.1 * noise.perlin3(p.x * k, p.y * k, p.z * k));
  }
  sphere.geometry.computeFaceNormals();
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;
}

function generateMask(seed) {
  const randGen = seedrandom(seed);
  const randFromSeed = randGen();
  const group = new THREE.Group();

  for (var i = blobs.length - 1; i >= 0; i--) {
    const
      localSeed = blobs[i].localSeed,
      r = 0.7 * Math.sqrt(randGen(localSeed)),
      theta = randGen(localSeed) * 2 * Math.PI,
      diameter = 0.8 * Math.abs(randGen(localSeed)),
      x = r * Math.cos(theta),
      y = (r * Math.sin(theta)) + 0.3,
      z = 0.5 * (randGen(localSeed)),
      sphereGeometry = new THREE.SphereGeometry(diameter, 50, 50),
      material = new THREE.MeshNormalMaterial(),
      newBlob = new THREE.Mesh(sphereGeometry, material);

    perlinNoiseSphere(newBlob, randGen(localSeed));
    sphereGeometry.scale(
      ((1.5 * randGen(localSeed)) + 1),
      ((2 * randGen(localSeed)) + 0.8),
      ((1 * randGen(localSeed)) + 0.3),
    );

    newBlob.position.set(x,y,z);
    group.add(newBlob);
  }

  return group;
}

export default generateMask;

