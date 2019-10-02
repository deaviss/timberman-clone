export class Branch {
	constructor(scene, level) {
		this.scene = scene;
		/* 
			5 levels of branches
			lv1: 70
			lv2: 230
			lv3: 390 
			lv4: 550
			lv5: 710
		*/
		this.levels = [
			150, 290, 430, 570, 730
		]
		this.level = level;
		this.side = Math.random() > 0.5 ? 'left' : 'right';
		var bX = this.side == 'left' ? scene.sys.game.config.width / 2 - 114 : scene.sys.game.config.width / 2 + 114;
		this.rectangle = scene.add.rectangle(bX,
			this.levels[level], 100, 32, 0xff0000);
	}

}