const THREE = require('three');
const objectBuilder = require('./objectBuilder');

const lights = new THREE.AmbientLight(0x111111);


const buildLevelOne = function buildLevelOne() {
const scene = this.buildBlankLevelOne();

let mesh = objectBuilder.metalCrate({width: 3, height: 3, depth: 3}, {x: 5, y: 10, z: -5});
scene.add(mesh);

mesh = objectBuilder.questionCrate({width: 3, height: 3, depth: 3}, {x: 0, y: 10, z: -5})
scene.add(mesh);

mesh = objectBuilder.woodCrate({width: 3, height: 3, depth: 3}, {x: 0, y: 10, z: 5});
scene.add(mesh);

mesh = objectBuilder.ancientCrate({width: 3, height: 3, depth: 3}, {x: 0, y: 10, z: 10});
scene.add(mesh);

mesh = objectBuilder.grassFloor({width: 100, height: 3, depth: 100}, {x: 0, y: -2.5, z: 0});
scene.add(mesh);

return scene;
}

const buildBlankLevelOne = function buildBlankLevelOne() {
const scene = new THREE.Scene();
scene.add(lights);

// Sunlight
let sunlight = new THREE.DirectionalLight();
sunlight.position.set(250, 250, 325);
sunlight.intensity = 1.1;
sunlight.castShadow = true;
sunlight.shadow.mapSize.Width = sunlight.shadow.mapSize.Height = 2048;
sunlight.shadow.camera.near = 200;
sunlight.shadow.camera.far = 600;
// sunlight.shadow.camera.left = -200;
// sunlight.shadow.camera.right = 200;
// sunlight.shadow.camera.top = 200;
// sunlight.shadow.camera.bottom = -200;

scene.add(sunlight);

// Drop Shadow light (small, light shadow where object meets ground)
let droplight = new THREE.DirectionalLight();
droplight.position.set(0, 250, 0);
droplight.intensity = .3;
droplight.castShadow = true;
droplight.shadow.mapSize.Width = droplight.shadow.mapSize.Height = 2048;
droplight.shadow.camera.near = 200;
droplight.shadow.camera.far = 600;
// droplight.shadow.camera.left = -200;
// droplight.shadow.camera.right = 200;
// droplight.shadow.camera.top = 200;
// droplight.shadow.camera.bottom = -200;

scene.add(droplight);

//Sky
let sky = {};
let imagePrefix = "textures/dawnmountain-";
let directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
let imageSuffix = ".png";
sky.geometry = new THREE.CubeGeometry( 500, 500, 500 );

let materialArray = [];
for (let i = 0; i < 6; i++)
    materialArray.push( new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( imagePrefix + directions[i] + imageSuffix ),
        side: THREE.BackSide
    }));
sky.material = new THREE.MeshFaceMaterial( materialArray );
sky.mesh = new THREE.Mesh( sky.geometry, sky.material );
scene.add( sky.mesh );

return scene;
}

module.exports = function LevelBuilder() {
  this.buildLevelOne = buildLevelOne.bind(this);
  this.buildBlankLevelOne = buildBlankLevelOne.bind(this);
}