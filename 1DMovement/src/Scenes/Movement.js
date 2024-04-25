class Movement extends Phaser.Scene {
    constructor() {
        super("movementScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Create variables to hold constant values for sprite locations
        this.startX = game.config.width / 2;
        this.startY = game.config.height - 50;
        this.leftBound = 20;
        this.rightBound = game.config.width - 20;

        // Variables for movement
        this.moveSpeed = 5;
        this.moveDirection = 0;

        // Array to hold lasers
        this.lasers = [];
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("ship", "ship.png");
        this.load.image("projectile", "projectile.png");
    }
    
    create() {
        let my = this.my; // Alias for this.my for readability

        // Sprite for player
        my.sprite.player = this.add.sprite(this.startX, this.startY, "ship");

        // Keys
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Aliases for readability
        let player = this.my.sprite.player;

        // Detect input to change movement direction
        if (Phaser.Input.Keyboard.JustDown(this.aKey)) {
            this.moveDirection = -1;
        }
        if (Phaser.Input.Keyboard.JustDown(this.dKey)) {
            this.moveDirection = 1;
        }
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            let laser = this.add.sprite(player.x, this.startY, "projectile");
            this.lasers.push(laser);
        }

        // Move player and laser
        player.x += this.moveSpeed * this.moveDirection;
        if (player.x < this.leftBound) { player.x = this.leftBound; }
        if (player.x > this.rightBound) { player.x = this.rightBound; }
        for (let laser of this.lasers) {
            laser.y -= this.moveSpeed;
        }
    }
}