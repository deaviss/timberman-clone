import { UI_BUTTON } from '../UI/button.js';
import { DeathScreen } from '../components/deathScreen.js'
export class menuScene extends Phaser.Scene {
	constructor() {
		super({ key: 'menuScene' });
	}

	init() {
		var self = this;
		this.add.rectangle(0, 0, 900, 1000, 0x0000000, 0.7).setOrigin(0)
		this.mainGame = this.scene.get('mainScene');
		this.player = this.mainGame.player;
		console.log(this.player.score, this.player.coins);
		if (this.player.alive) {
			this.add.text(this.sys.game.config.width / 2, 200, 'Welcome back :)').setOrigin(0.5)
		} else {
			this.deathScreen = new DeathScreen(this);
			this.deathScreen.tween.play();
		}

		const fontCfg = {
			fontSize: '28px',
			fontFamily: 'Open-sans'
		}
		const buttonX = this.sys.game.config.width / 2;

		this.playButton = new UI_BUTTON(this, buttonX, 750, 150, 50, 0x998811, 'Play!', fontCfg)
			.onClick = () => {
				self.startGame();
			}
		this.shopButton = new UI_BUTTON(this, buttonX, 670, 150, 50, 0x118899, 'Shop', fontCfg)
			.onClick = () => {
				self.scene.start('shopScene')
			}
	}

	create() {
		var self = this;
		this.input.keyboard.on('keydown-' + 'K', function (event) {
			self.startGame();
		})
	}

	startGame() {
		var self = this;
		self.scene.resume('mainScene');
		self.scene.stop('menuScene')
		console.log('stopped scene')
		this.mainGame.startGame();
	}
}