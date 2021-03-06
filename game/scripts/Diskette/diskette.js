var player; 
var scene;

var Dynamics = {
    U_SPRING: 1,
    L_SPRING: 2,
    R_SPRING: 3,
    UL_SPRING: 4,
    UR_SPRING: 5,
    VIRUS: 5,
    VIRUS_KILLER: 6
};

var Diskette = DODO.Kinematic.extend({
    spriteSheet: "Diskette/diskette.png",
    collisionResponse: "active",
    drawCollisionPolygon: false,
    elasticity: 0.5,
    springForce: 650,
    springScan: 1,
    bounceTreshold: 200,
    frameWidth: 32,
    frameHeight: 32,
    insertingFrameCount: 0,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.friction.x = 8;
        this.friction.y = 0;
        this.setGravity(0, 20, 60);
        this.maxVelocity.x = 600;
        this.maxVelocity.y = 800;
        this.dynamicsMap = this.scene.findLayerByName("Dynamics").tilemap;
        this.addAnimation("inserting", _.range(0, 10), 0.2);
        this.springSound = DODO.getAsset('Diskette/bounce.ogg');
        this.setAnchor(0.5, 0.5);
        this.position.x += this.width * this.anchor.x;
        this.position.y += this.height * this.anchor.y;
    },
    update: function () {
        if (this.inserting) {
            var currentAnimation = this.animation;
            if (currentAnimation.currentFrame.floor() !== this.insertingFrameCount % currentAnimation.totalFrames) {
                this.insertingFrameCount++;
            }
            if (this.insertingFrameCount >= currentAnimation.totalFrames * 2 + 6) {
                currentAnimation.stop();
                this.kill();
            }
            return;
        }
        var spring = this.detectDynamics();
        if (spring)
            this.processDynamics(spring);

        if (this.name === "Springer") {
//            window.console.log(this.velocity.y);
//            window.console.log(spring);
        }
        
        if (!this.standing) {
            this.friction.x = 4;
        }
        else {
            this.friction.x = 10;
        }
        this._super();
    },
    detectDynamics: function () {
        var tile = this.dynamicsMap.getTileAt(this.position.x, this.getBottom() + this.springScan);
        if (tile && this.velocity.y <= 0 &&
                (tile.gid === Dynamics.U_SPRING || tile.gid === Dynamics.UL_SPRING || tile.gid === Dynamics.UR_SPRING)) {
            return tile.gid;
        }
        tile = this.dynamicsMap.getTileAt(this.getRight() + this.springScan, this.position.y);
        if (tile && this.velocity.x <= 0 &&
                (tile.gid === Dynamics.L_SPRING || tile.gid === Dynamics.UL_SPRING)) {
            return tile.gid;
        }
        tile = this.dynamicsMap.getTileAt(this.getLeft() - this.springScan, this.position.y);
        if (tile && this.velocity.x >= 0 &&
                (tile.gid === Dynamics.R_SPRING || tile.gid === Dynamics.UR_SPRING)) {
            return tile.gid;
        }
    },
    processDynamics: function (spring) {
        if (spring === Dynamics.U_SPRING) {
            this.velocity.y = -this.springForce;
        }
        else if (spring === Dynamics.L_SPRING) {
            this.velocity.x = -this.springForce;
        }
        else if (spring === Dynamics.R_SPRING) {
            this.velocity.x = this.springForce;
        }
        else if (spring === Dynamics.UL_SPRING) {
            this.velocity.y = -this.springForce;
            this.velocity.x = -this.springForce;
        }
        else if (spring === Dynamics.UR_SPRING) {
            this.velocity.y = -this.springForce;
            this.velocity.x = +this.springForce;
        }
        this.springSound.play();
    },
    collideWithStatic: function (other, response) {
        this._super(other, response);

    },
    collideWithKinematic: function (other, response) {
        var elasticity = this.elasticity;
        if ((other instanceof Diskette) &&
                response.overlap) {
            if (Math.abs(response.overlapN.x) === 1 && this.velocity.x.abs() > this.bounceTreshold) {
                this.elasticity = 2;
            }
        }
        this._super(other, response);
        this.elasticity = elasticity;

        if (other instanceof Computer && response.aInB) {
            this.animation = "inserting";
            this.inserting = true;
            this.x = other.getSlotX() + this.width * this.anchor.x;
            this.collides = false;
        }
    }
});
