import { Branch } from './branch.js'
export class World {
	constructor(scene) {
		this.scene = scene;
		this.tree = this.scene.add.rectangle(this.scene.sys.game.config.width / 2, this.scene.sys.game.config.height / 2, 128, 1000, 0x989898);
		this.branches = [];


		for (var i = 5; i < 0; i++) {
			this.branches.push(new Branch(scene, i));
		}
		window.branches = this.branches
	}

	move() {
		var self = this;
		this.branches.forEach((branch, i) => {
			branch.level++;
			branch.rectangle.y = branch.levels[branch.level];
			if (branch.level >= 5) {
				branch.rectangle.destroy();
				// self.branches.splice(self.branches.indexOf(branches.filter(e => (e.level >= 5))), 1);
				self.branches = self.branches.filter(e => (e.level < 5))
				// delete self.branches[branch]
			}

		})
		var rnd = Math.random();
		if (rnd >= 0.03)
			this.spawnBranch();
	}

	spawnBranch() {
		this.branches.push(new Branch(this.scene, 0))
	}


}