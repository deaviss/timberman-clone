import { PlayerSkins } from "../components/playerSkins.js";

export class UI_PANEL {
	constructor(scene, x, y, w, h) {
		this.scene = scene;

		// this.panel = scene.add.rectangle(x, y, w, h, 0xff0000, 0.4);
		this.background = scene.add.rectangle(scene.game.config.width / 2, scene.game.config.height / 2, 400, 800, 0x00ccff, 0.5)
		this.createContainer();
		this.player = scene.scene.get('mainScene').player
		this.playerGold = this.player.coins;
		var pSkins = new PlayerSkins(this);
		pSkins.skins.forEach(e => {
			this.addNewTimber(e.name, e.cost, e.color);
		});
		this.allowToBuy = true;
	}

	createContainer() {
		var t = this;
		var scene = this.scene;
		this.container = scene.add.container(scene.game.config.width / 2, scene.game.config.height / 2);
		// this.container.setSize(this.game.config.width * 2 - 250, this.game.config.height * 2 - 350)
		this.container.setSize(400, 800)
		var maskS = scene.add.graphics(this.container.x, this.container.y).clear()
			.fillStyle(0x00ffff, 0)
			.fillRect(
				this.container.x - this.container.width / 2,
				this.container.y - this.container.height / 2,
				this.container.width, this.container.height
			)
		var mask = this.container.createGeometryMask(maskS);
		this.container.setMask(mask);
		scene.input.on('pointermove', function (pointer) {
			if (pointer.isDown) {
				t.allowToBuy = false;
				var first = t.container.getAt(0);
				var second = t.container.getAt(2);
				var last = t.container.getAt(t.container.length - 1);
				var velY = pointer.position.y - pointer.prevPosition.y;
				t.container.each(item => {
					if (velY > 0 && first.y < -100) {
						item.y += velY;

					}
					if (velY < 0 && last.y > -100) {
						item.y += velY;
						// góra
					}
				})
				first.setY(second.y);
			} else {
				t.allowToBuy = true;
			}
		})

	}

	addNewitem(data) {
		var self = this;
		var items = [];
		self.container.each(e => {
			if (e.type != 'Text')
				items.push(e);
		})

		var last = items[items.length - 1]
		var x = -180;
		var y = -380;
		if (last) {
			if (last.x > 30)
				y = last.y + 200;
			else {
				x = last.x + 140;
				y = last.y;
			}
		}

		var rekt2 = self.scene.add.rectangle(x, y, 82, 128, data.color).setOrigin(0).setInteractive();
		rekt2.data = data;
		var goldText = self.scene.add.text(x + 42, y + 164, `${data.name}\nCost: ${data.cost}`, {
			align: 'center',
			lineSpacing: 0,
		}).setOrigin(0.5)

		rekt2.data.text = goldText;
		rekt2.on('pointerup', function () {
			if (self.allowToBuy == true)
				rekt2.data.cb();
		})

		self.container.add([rekt2, goldText])
	}

	addNewTimber(name, cost, color) {
		var self = this;
		var newTimber = {
			name: name,
			cost: cost,
			color: color,
			bought: false,
			used: false
		}

		newTimber.cb = function () {
			if (self.playerGold >= this.cost && !this.bought) {
				console.log(`You have just bought ${this.name} for ${this.cost}`);
				this.bought = true;
				self.playerGold -= this.cost;
				self.player.ownedSkins.push({
					name: this.name,
					color: this.color
				})

				this.text.text = `OWNED`
			}

			if (self.player.currentSkin.name == this.name) {
				this.used = true;
			}
			if (this.bought) {
				console.log('zmieniam na ' + this.name)
				self.player.currentSkin = {
					name: this.name,
					color: this.color
				}
			}
			self.player.updateSkin();
			self.player.saveGame();
		}

		if (self.player.ownedSkins.filter(x => { return x.name == newTimber.name }).length > 0) {
			newTimber.bought = true;
		}


		this.addNewitem(newTimber)



	}

	update(info) {
		var self = this;
		info.text = `💰${this.playerGold}`
		this.container.each(item => {
			var data = item.data;
			if (data) {
				if (!data.bought) {
					item.setAlpha(0.3)
				} else {
					item.setAlpha(0.7)
					data.text.text = `OWNED`
				}
				if (data.name == self.player.currentSkin.name) {
					item.setAlpha(1);
					data.text.text = `SELECTED`
				}
			}
		})
	}



}