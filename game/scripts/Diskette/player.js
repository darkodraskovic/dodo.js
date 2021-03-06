var Player = Anime.extend({
    spriteSheet: "Diskette/player.png",
    throwForce: 750,
    throwTimer: 0,
    throwTime: 0.75,
    jumpForce: 680,
//    jumpForce: 600,
    speed: 500,
    mass: 0.4,
    drawCollisionPolygon: true,
//    elasticity: 0.5,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);

        DODO.game.renderer.view.style.cursor = "url(game/graphics/Diskette/crosshair.png), auto";
        DODO.game.renderer.view.addEventListener("mouseover", function (event) {
            DODO.game.renderer.view.style.cursor = "url(game/graphics/Diskette/crosshair.png), auto";
        });

        DODO.input.addMapping("left", DODO.Key.A);
        DODO.input.addMapping("right", DODO.Key.D);
        DODO.input.addMapping("jump", DODO.Key.SPACE);
        DODO.input.addMapping("crouch", DODO.Key.S);

        this.scene.bind('lmbpressed', this, function () {
            this.throwTimerRunning = true;
            this.throwTimer = 0;
            this.progressBarInner.setVisible(true);
        });
        this.scene.bind('lmbreleased', this, function () {
            this.throwBall(this.progressBarInner.percent.map(0, 100, 0, this.throwForce));
            this.progressBarInner.percent = 0;
            this.progressBarInner.setVisible(false);
        });
        this.scene.bind('rmbpressed', this, function () {
            if (this.throwTimerRunning) {
                this.throwTimerRunning = false;
            }
            else
                this.throwTimerRunning = true;
        });

        this.throwSound = DODO.getAsset('Diskette/throw.ogg');

        this.initMouseReactivity();
//        this.bind('lmbpressed', function () {window.console.log("Player pressed");});

        this.setPoint("ball", 0, -this.height / 3);

        this.scene.bind('created', this, function () {
            this.progressBarInner = new ProgressBarInner(this.scene.findLayerByName("Entities"),
                    this.position.x, this.position.y,
                    {color: DODO.Colors.purple, owner: this});
            this.progressBarInner.setVisible(false);
        });

        this.scene.camera.followee = this;
        scene = this.scene;
    },
    processControls: function () {
        if (DODO.input.down["right"] || DODO.input.down["left"]) {
            if (DODO.input.down["right"]) {
                this.velocity.x = this.speed;
            }
            else if (DODO.input.down["left"]) {
                this.velocity.x = -this.speed;
            }
            if (this.standing) {
                this.platformerState = "walking";
            }

        }
        else if (DODO.input.down["crouch"]) {
            this.platformerState = "crouching";
        }
        else if (this.standing) {
            this.platformerState = "idle";
        }
        if (!this.standing && this.platformerState !== "crouching") {
            this.platformerState = "falling";
        }

        if (this.platformerState === "crouching") {
            this.setCollisionSize(this.aabbWidth(), 44);
        }
        else {
            this.setCollisionSize(this.aabbWidth(), 68);
        }

        if (DODO.input.down["jump"]) {
            if (this.standing) {
                this.velocity.y = this.gravityN.y < 0 ? this.jumpForce : -this.jumpForce;
            }
        }
    },
    processFacing: function () {
        var mousePosition = this.scene.mouse;
        if (mousePosition.x < this.position.x) {
            this.facing = "left";
        } else {
            this.facing = "right";
        }
    },
    update: function () {
//        window.console.log(this.standing);
        this.processControls();
        this.processFacing();

        if (this.scene.lmbdown) {
            if (this.throwTimerRunning) {
                this.throwTimer += DODO.game.dt;
                this.progressBarInner.percent = this.throwTimer.map(0, this.throwTime, 0, 100).clamp(0, 100);
            }
        }

        this._super();
    },
    throwBall: function (force) {
        var ball = new Ball(this.layer, this.position.x, this.aabbTop() + (this.platformerState === "crouching" ? 16 : 20));
        var angle = DODO.angleTo(this.position, this.scene.mouse);
        ball.velocity.x = force * Math.cos(angle);
        ball.velocity.y = force * Math.sin(angle);
        this.throwSound.play();
    }
});

var alpha = 0.75;
var ProgressBarInner = DODO.Graphics.extend({
    frameWidth: 124,
    frameHeight: 20,
    graphics: true,
    padding: 2,
    percent: 0,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.beginFill(this.color, alpha);
        this.drawRect(0, 0, this.frameWidth, this.frameHeight);
        this.endFill();
        this.progressBarOuter = new ProgressBarOuter(this.scene.findLayerByName("Entities"), this.position.x, this.position.y,
                {color: DODO.Colors.darkslategray, owner: this.owner});
        this.pinTo = new DODO.addons.PinTo(this, {parent: this.progressBarOuter, name: "inner", offsetX: 2, offsetY: 2});
    },
    update: function () {
        this.pinTo.update();
        this.scale.x = this.percent / 100;
        this._super();
    },
    setVisible: function (visible) {
        this.visible = visible;
        this.progressBarOuter.visible = visible;
    }
});
var ProgressBarOuter = DODO.Graphics.extend({
    frameWidth: 128,
    frameHeight: 24,
    graphics: true,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.lineStyle(2, this.color, alpha);
        this.drawRect(0, 0, this.frameWidth, this.frameHeight);
        this.endFill();
    },
    update: function () {
        var mousePosition = this.scene.mouse;
        this.position.y = mousePosition.y;
        if (mousePosition.x < this.owner.position.x) {
            this.position.x = mousePosition.x;
        } else {
            this.position.x = mousePosition.x - this.width;
        }
    }
});
