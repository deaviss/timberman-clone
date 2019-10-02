export class DeathScreen {
	constructor(scene) {
		this.scene = scene;

		var txt = scene.player.score >= scene.player.highScore ? `You lost with ${scene.player.score} score.\nNew highscore!` : `You lost with ${scene.player.score} score.`

		this.text = scene.add.text(scene.sys.game.config.width / 2, 200, txt, {
			fontSize: '24px',
			fontFamily: 'Open-sans',
			textAlign: 'center'
		}).setOrigin(0.5);
		var self = this;
		this.tween = scene.tweens.add({
			targets: [self.text],
			alpha: 0,
			duration: 1000,
			delay: 2000,
			y: '-=40',
			ease: 'Linear'
		})
	}

}	