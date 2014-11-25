var Bullet = A_.SPRITES.ArcadeSprite.extend({
    animSheet: "Muzzleflashes-Shots.png",
    frame: {w: 32, h: 32},
    collisionSize: {w: 12, h: 10},
    collisionResponse: "sensor",
    collidesWith: A_.COLLISION.Type.ENEMY,
    init: function (layer, x, y, props) {
        this._super(layer, x, y, props);
        this.friction.x = 0;
        this.friction.y = 0;
        this.maxVelocity.x = this.maxVelocity.y = 1000;
        this.speed = 600;
        this.bounded = false;
    },
    update: function () {
        this._super();
        if (this.outOfBounds) {
            this.destroy();
        }
    },
    collide: function (other, response) {
        if (other instanceof Agent) {
            other.alive = false;
            other.motionState = "idle";
            this.destroy();
        } else if (other.collisionResponse === "static") {
            this.destroy();
        }
    },
    collideWithTile: function () {
        this.destroy();
    }
});

var Laser = A_.SPRITES.CollisionSprite.extend({
//    expandSpeed: 800,
    animSheet: "Muzzleflashes-Shots.png",
    collides: false,
//    collisionResponse: "sensor",
//    collisionOffset: {x: 16, y: 0},
//    collisionSize: {w: 32, h: 12},
    frame: {w: 32, h: 32},
    bounded: false,
    init: function (layer, x, y, props) {
        this._super(layer, x, y, props);
        this.setAnimation("all", 18, 0);
        this.currentAnimation.anchor = new PIXI.Point(0, 0.5);
        this.rotation = A_.UTILS.angleTo(this.spawner.getPosition(), A_.game.mousePosition.level);
        this.postupdate();
        this.fire = A_.game.createSprite(LaserFire, A_.level.findLayerByName("Effects"),
                A_.game.mousePosition.level.x, A_.game.mousePosition.level.y);
        this.fire.laser = this;
        this.tip = {x: this.spawner.getPositionX(), y: this.spawner.getPositionY()};
    },
    update: function () {
        this.setPosition(this.spawner.getPositionX(), this.spawner.getPositionY());
//        this.setWidth(this.getWidth() + this.expandSpeed * A_.game.dt);

        this.rotation = A_.UTILS.angleTo(this.spawner.getPosition(), A_.game.mousePosition.level);
        this.setWidth(A_.UTILS.distanceTo(this.getPosition(), A_.game.mousePosition.level));
        this.tip.x = this.getPositionX() + Math.cos(this.rotation) * this.getWidth();
        this.tip.y = this.getPositionY() + Math.sin(this.rotation) * this.getWidth();
        
        if (A_.game.leftreleased) {
            this.fire.destroy();
            this.destroy();
        }
    },
    collide: function (other, response) {
        this._super();

        if (other.collisionResponse === "static") {
            if (!other.containsPoint(A_.game.mousePosition.level.x, A_.game.mousePosition.level.y))
                ;
//                this.setWidth(A_.UTILS.distanceTo(this.getPosition(), other.getPosition()));
        }
    },
});

var LaserFire = A_.SPRITES.AnimatedSprite.extend({
    animSheet: "Fire.png",
    frame: {w: 64, h: 64},
    init: function (layer, x, y, props) {
        this._super(layer, x, y, props);
        this.addAnimation("burn", [0, 1, 2], 0.3);
        this.setAnimation("burn");
    },
    update: function () {
        this.toTopOfLayer();
        this._super();
        this.setPosition(this.laser.tip.x, this.laser.tip.y);
    }
});

var Computer = A_.SPRITES.CollisionSprite.extend({
    animSheet: "Computer1.png",
    collisionResponse: "static",
    interactive: true,
    collisionType: A_.COLLISION.Type.ITEM,
    collidesWith: A_.COLLISION.Type.NONE,
    update: function (props) {
        this._super(props);
        if (this.leftpressed) {
            window.console.log("Pressed");
        }
        if (this.leftreleased) {
            window.console.log("Released");
        }
        if (this.leftdown) {
            window.console.log("Down");
        }
    }
})