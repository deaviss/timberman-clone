# timberman-clone
Timberman clone in Phaser3, which you can preview here [https://deaviss.github.io/timberman-clone/](https://deaviss.github.io/timberman-clone/)

# How to install
Basically just clone the repo, set up chrome-server and you're done.

# Features
1) Player  
	• Score
	• Highscore (saved in localStorage)
	• Coins (saved in localStorage) - after each game you play, score is added to coins
	• Health - it decreases each 50ms for 0.5. After each 5seconds the amount increases by 0.1. After player gets a point, hp goes up by 5.
	• Player can lose when he hits a branch
2) World  
	• Tree
	• Branches with 50% chance to spawn either on the left or right
2) Shop
	• It's an improv for now, some dummy skins, which change color