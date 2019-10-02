import { menuScene } from './scenes/menuScene.js'
import { mainScene } from './scenes/mainScene.js'
import { shopScene } from './scenes/shopScene.js'
var config = {
	type: Phaser.AUTO,
	width: 540,
	height: 960,
	physics: {
		default: "matter",
		matter: {
			debug: false
		}
	},
	scene: [mainScene, menuScene, shopScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	autoRound: false
};
var game = new Phaser.Game(config);