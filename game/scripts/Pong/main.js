var controller;
var level;

var GameController = A_.SPRITES.Graphics.extend({
    playingDrone: false,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        controller = this;
        level = this.level;
        this.level.setScale(2);

        A_.INPUT.addMapping("pause", A_.KEY.P);
        this.level.bind('pause', function () {
//            window.console.log("Paused");
        })
        this.level.bind('play', function () {
//            window.console.log("Played");
        })
    },
    update: function () {
        if (A_.INPUT.pressed["pause"]) {
            if (this.level.running)
                this.level.pause();
            else
                this.level.play();
        }

        this._super();
    }
});

// MENUS
var Text = A_.SPRITES.Text.extend({
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.initMouseReactivity();
        this.setMouseReactivity(true);
    }
});

var StartText = Text.extend({
    update: function () {
        if (this.leftpressed) {
            this.level.pause();
            levelManager.createLevel(pongPlayground, "playground");
        }

        this._super();
    }
});

// HUD

var PointsText = Text.extend({
    points: 0,
    update: function () {
        this.sprite.setText(this.points);

        this._super();
    }
});

// ENTITIES
var Ball = A_.SPRITES.Kinematic.extend({
    spriteSheet: "Pong/ball.png",
    collisionResponse: "lite",
    drawCollisionPolygon: false,
    elasticity: 1,
    bounceTreshold: 0,
//    wrap: true,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.friction.x = 0;
        this.friction.y = 0;
        this.maxVelocity.x = this.maxVelocity.y = 224;
        this.setGravity(0, 0);
        this.velocity.x = this.maxVelocity.x;
        this.velocity.y = _.random(-this.maxVelocity.y, this.maxVelocity.y);
        this.setOrigin(0.5, 0.5);
        this.level.bind('create', this, function () {
            this.pointsText = this.level.findSpriteByClass(PointsText);
        });
        this.breakSound = this.level.createSound({
            urls: ['Pong/xylo1.wav'],
            volume: 1
        });
        this.bounceSound = this.level.createSound({
            urls: ['Pong/bounce.wav'],
            volume: 1
        });
    },
    update: function () {
        if (this.getX() > this.level.getWidth()) {
            levelManager.destroyLevel(this.level);
            levelManager.findLevelByName("mainMenu").play();
        }

        this._super();
    },
    collideWithStatic: function (other, response) {
        this._super(other, response);
        if (response.overlap) {
            this.breakSound.play();
            other.destroy();
            this.pointsText.points++;
        }
    },
    collideWithKinematic: function (other, response) {
        this._super(other, response);
        if (response.overlap) {
            if (other instanceof Bar) {
                this.velocity.y += other.velocity.y * 0.75;
                this.bounceSound.play();
            }
        }
    }
});

var Bar = A_.SPRITES.Kinematic.extend({
    spriteSheet: "Pong/bar.png",
    collisionResponse: "active",
    drawCollisionPolygon: false,
    elasticity: 1,
    bounceTreshold: 0,
    velocityStep: 64,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.friction.x = 32;
        this.friction.y = 32;
        this.maxVelocity.x = this.maxVelocity.y = 288;
        this.setGravity(0, 0);

        A_.INPUT.addMapping("down", A_.KEY.S);
        A_.INPUT.addMapping("up", A_.KEY.W);
    },
    update: function () {
        if (A_.INPUT.down["up"]) {
            this.velocity.y -= this.velocityStep;
        }
        if (A_.INPUT.down["down"]) {
            this.velocity.y += this.velocityStep;
        }

        this._super();
    }
});

var Brick = A_.SPRITES.Colliding.extend({
    spriteSheet: "Pong/brick.png",
    drawCollisionPolygon: false,
    frameWidth: 16,
    frameHeight: 32,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.setAnimation("all");
        this.currentAnimation.gotoAndStop(_.random(0, 1));
    }
});