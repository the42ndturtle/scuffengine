import { Ray } from './Ray.mjs';
import { Camera } from './Camera.mjs';
import { View } from './View.mjs';
import { Wall } from './Wall.mjs'

export class Engine {
  constructor() {
    this.walls = [];
    this.cameras = [];
    this.players = [];
    this.floors = [];

    this.mainPlayer = undefined;

    this.keyDownCallbacks = {};
  }

  scale(num, inMin, inMax, outMin, outMax) {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  addWall(wall) {
    this.walls.push(wall);
  }

  addFloor(floor) {
    this.floors.push(floor);
  }

  addPlayer(player) {
    this.players.push(player);
    this.cameras.push(player.camera);
  }

  setMainPlayer(index) {
    this.mainPlayer = this.players[index];
  }

  tick() {
    const self = this;
    this.players.forEach(player => {
      player.tick(self);
    });
    this.cameras.forEach(camera => {
      camera.tick(self);
    });
  }

  start() {
    const self = this;
    setInterval(function() {
      self.tick();
    }, 1000/60);
  }

  stop() {

  }

  onKeyDown(key, callback) {
    this.keyDownCallbacks[key] = callback;

    document.addEventListener('keydown', e => {
      if(e.key == key) callback();
    });
  }
}
