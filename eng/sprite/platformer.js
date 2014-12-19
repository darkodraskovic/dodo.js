A_.SPRITES.Platformer = A_.SPRITES.Kinematic.extend({
    platformerState: "grounded",
    movingState: "idle",
    jumpForce: 500,
    bounciness: 0,
    controlled: false,
    facing: "right",
    autoFlip: true,
    init: function (layer, x, y, props) {
        this._super(layer, x, y, props);
        this.gravity = new SAT.Vector(0, 20);
        this.friction = new SAT.Vector(48, 0);
        this.maxVelocity = new SAT.Vector(300, 600);
        this.force = new SAT.Vector(100, 100);

        this.slope = null;
        this.platform = null;
        
        if (this.controlled) {
            A_.INPUT.addMapping("left", A_.KEY.A);
            A_.INPUT.addMapping("right", A_.KEY.D);
            A_.INPUT.addMapping("jump", A_.KEY.SPACE);
        }
    },
    update: function () {
        if (this.controlled) {
            if (A_.INPUT.down["right"] || A_.INPUT.down["left"]) {
                this.applyForce = true;
                if (A_.INPUT.down["right"] && A_.INPUT.down["left"]) {
                    this.applyForce = false;
                }
                else if (A_.INPUT.down["right"]) {
                    this.facing = "right";
                }
                else if (A_.INPUT.down["left"]) {
                    this.facing = "left";
                }
            }
            else {
                this.applyForce = false;
            }

            if (A_.INPUT.down["jump"]) {
                this.tryJump = true;
            }
        }

        if (this.platform) {
            this.y(this.y() + this.platformDY + 2);
            this.platform = null;
        }
        
        if (this.applyForce) {
            if (this.facing === "right") {
                this.acceleration.x = this.force.x;
            }
            else if (this.facing === "left") {
                this.acceleration.x = -this.force.x;
            }
        }
        else {
            this.acceleration.x = 0;
        }


        if (this.tryJump) {
            if (this.platformerState === "grounded") {
                this.velocity.y = -this.jumpForce;
            }
            this.tryJump = false;
        }

        this._super();

        // STATES
        if (this.velocity.y > this.gravity.y) {
            this.platformerState = "falling";
        } else if (this.velocity.y < -this.gravity.y) {
            this.platformerState = "jumping";
        }

//        if (this.velocity.x > this.friction.x || this.velocity.x < -this.friction.x) {
        if (this.velocity.x !== 0) {
            this.movingState = "moving";
        } else {
            this.movingState = "idle";
        }

//        window.console.log(this.platformerState);

        // FLIP
        if (this.autoFlip) {
            if (this.facing === "right") {
                if (this.flipped("x")) {
                    this.flip("x");
                }
            } else if (this.facing === "left") {
                if (!this.flipped("x")) {
                    this.flip("x");
                }
            }
        }
    },
    calculateVelocity: function () {
        this._super();

        if (this.slope) {
            var slope = this.slope;
            if (slope.slopeRiseDirection === "right" && this.velocity.x > 0 || slope.slopeRiseDirection === "left" && this.velocity.x < 0) {
                this.velocity.x *= slope.slopeFactor;
            }
        }
    },
    applyVelocity: function () {
        this._super();

        if (this.slope) {
            var slope = this.slope;
            var srd = slope.slopeRiseDirection;
            if (srd === "right" && this.velocity.x < 0 || srd === "left" && this.velocity.x > 0) {
                var diffX = Math.abs(this.velocity.x) * A_.game.dt;
                var diffY = Math.abs(Math.tan(this.slope.slopeAngle) * diffX);
                this.y(this.y() + diffY);
            }
            this.slope = null;
        }
    },
    collideWithStatic: function (other, response) {
        this._super(other, response);

        if (response.overlapN.y !== 0) {
            if (response.overlapN.y === 1) {
                this.platformerState = "grounded";

//                if (this.bounciness === 0)
                this.velocity.y = 0;

            } else {
                if (this.bounciness === 0) {
                    if (this.platformerState !== "grounded") {
                        if (this.velocity.y < this.gravity.y) {
                            this.velocity.y = 0;
                            this.y(this.y() + this.velocity.y * A_.game.dt);
                        }
                    }
                }
            }
        }
        else if (response.overlapN.x !== 0) {
//            if (this.bounciness === 0)
            this.velocity.x = 0;
        }

        // SLOPE
        if (other.slope) {
            if (!other.slopeSet) {
                other.setSlope();
            }
            var y = this.collisionPolygon.getBottom();
            var xL = this.collisionPolygon.getLeft() - 2;
            var xR = this.collisionPolygon.getRight() + 2;

            if(other.containsPoint(xL, y) || other.containsPoint(xR, y)) {
                this.platformerState = "grounded";
//                if (this.bounciness === 0)
                this.velocity.y = 0;
                this.x(this.x() + response.overlapV.x);
                this.slope = other;
            };
        }

        // PLATFORM
        if (other.platform) {
            this.platform = other;
            this.platformDX = other.x() - other.prevX;
            this.platformDY = other.y() - other.prevY;
            this.x(this.x() + this.platformDX);
        }
    }
});