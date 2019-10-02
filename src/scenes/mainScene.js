import { Player } from '../components/player.js'
import { World } from '../components/world.js'
export class mainScene extends Phaser.Scene {
	constructor() {
		super({ key: 'mainScene' });
	}

	init() {
		this.world = new World(this);
		this.player = new Player(this, this.world);
	}

	create() {
		const self = this;

		const leftZone = this.add.zone(0, 0, this.sys.game.config.width / 2, this.sys.game.config.height).setOrigin(0).setInteractive();
		const rightZone = this.add.zone(this.sys.game.config.width / 2, 0, this.sys.game.config.width / 2, this.sys.game.config.height).setOrigin(0).setInteractive();
		this.input.keyboard.on('keydown-' + 'A', function (event) {
			self.player.tap('left')
		})
		this.input.keyboard.on('keydown-' + 'D', function (event) {
			self.player.tap('right')
		})
		leftZone.on('pointerdown', () => {
			self.player.tap('left')
		})
		rightZone.on('pointerdown', () => {
			self.player.tap('right')
		})

		self.player.create();

		this.scene.pause('mainScene')
		this.scene.launch('menuScene');
	}

	startGame() {
		this.player.hp = this.player.maxHp;
		this.player.alive = true;
		this.player.score = 0;
		this.player.hpStep = this.player.baseHpStep;
	}

	update() {

	}
}