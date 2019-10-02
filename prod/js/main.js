requirejs.config({
	baseUrl: 'js',

	paths: {
		mainScene: 'scenes/mainScene',
		menuScene: 'scenes/menuScene',
		shopScene: 'scenes/shopScene'
	}
});

function initApp() {
	require(["mainScene", "menuScene", "shopScene"], function (_mainScene, _menuScene, _shopScene) {
		"use strict";
		// our game's configuration
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
			scene: [_mainScene.mainScene, _menuScene.menuScene, _shopScene.shopScene],
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH
			},
			autoRound: false
		};
		var game = new Phaser.Game(config);
		window.game = game;
	});
}


initApp();
