import { HpBar } from './hpbar.js';
import { PlayerSkins } from './playerSkins.js';
export class Player {
	constructor(scene, world) {
		this.scene = scene;
		this.ownedSkins = [{
			name: 'Lumbercwel 1',
			color: 0xea32cf
		}, {
			name: 'Lumbercwel 2',
			cost: 2000,
			color: 0x33aacc
		}]
		this.currentSkin = this.ownedSkins[0];
		var skins = new PlayerSkins(scene);
		this.rectangle = this.scene.add.rectangle(150, 850, 82, 128, this.currentSkin.color);
		this.score = 0;
		this.highScore = parseInt(localStorage.getItem('highscore')) || 0;
		this.world = world;
		this.alive = true;
		this.coins = parseInt(localStorage.getItem('coins')) || 0;
		this.hp = 100;
		this.maxHp = this.hp;
		this.baseHpStep = 0.5;
		this.hpStep = 0.5;
		this.hpBarBg = scene.add.rectangle(scene.sys.game.config.width / 2 - 102, 38, 204, 34, 0x333333).setOrigin(0);
		this.hpBar = scene.add.rectangle(scene.sys.game.config.width / 2 - 100, 40, 200, 30, 0xff0000).setOrigin(0);
		this.hpText = scene.add.text(scene.sys.game.config.width / 2, 56, 'Hp: 100').setOrigin(0.5);


		// this.hpBar = new HpBar(this);

	}

	create() {
		var self = this;
		this.tajmer = this.scene.time.addEvent({
			delay: 50,
			loop: true,
			callback: self.tajm,
			callbackScope: self
		})

		this.increaseStepTimer = this.scene.time.addEvent({
			delay: 5000,
			loop: true,
			callback: self.increaseStep,
			callbackScope: self
		})


		this.scoreText = this.scene.add.text(0, 0, `Score: ${this.score}\nHigh score: ${this.highScore}`, {
			color: '#eaeaea'
		}).setOrigin(0);
		var self = this;
		window.tap = function (sd) {
			self.tap(sd)
		}
	}

	tajm() {
		if (this.hp > 0)
			this.hp -= this.hpStep / 2;
		if (this.hp > 100)
			this.hp = 100;
		if (this.hp <= 0.5)
			this.hp = 0;
		this.hpBar.width = this.hp * 2;
		this.hpText.text = `Hp: ${Math.round(this.hp)}/${this.maxHp}`
	}

	increaseStep() {
		this.hpStep += 0.1
	}

	tap(side) {
		if (this.alive) {
			if (side == 'left') {
				// console.log('left')
				this.rectangle.x = 150;
				if (this.world.branches.length > 0)
					if (this.world.branches[0].side == 'left' && this.world.branches[0].level == 4) {
						this.die();
					} else if (this.world.branches[0].level == 4 && this.world.branches[0].side == 'right') {
						this.addPoint();
						this.restoreHp();
					}
			} else {
				// console.log('right')
				this.rectangle.x = this.scene.sys.game.config.width - 150;
				if (this.world.branches.length > 0)
					if (this.world.branches[0].side == 'right' && this.world.branches[0].level == 4) {
						this.die();
					} else if (this.world.branches[0].level == 4 && this.world.branches[0].side == 'left') {
						this.addPoint();
						this.restoreHp();
					}
			}
			this.world.move();
		}

		this.scoreText.text = `Score: ${this.score}\nHigh score: ${this.highScore}`;
	}




	die() {
		var self = this;
		console.log('you lost')
		this.scene.cameras.main.shake(50, 0.03)
		if (this.score > this.highScore) {
			this.highScore = this.score;
			localStorage.setItem('highscore', this.highScore)
		}
		this.coins += this.score;
		localStorage.setItem('coins', this.coins);
		this.alive = false;


		setTimeout(() => {
			self.world.branches.forEach(e => {
				e.rectangle.destroy();
			});
			self.world.branches = [];
			self.scene.scene.pause('mainScene')
			self.scene.scene.launch('menuScene', { admin: "adam" });
		}, 100);

	}

	addPoint() {
		this.score++;
	}

	restoreHp() {
		if (this.hp > 0) {
			this.hp += 5;
		}
	}

}