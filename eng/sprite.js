A_.SPRITES.AnimatedSprite = Class.extend({
    // init() is called when the sprite is instantiated with new keyword.
    init: function (parent, x, y, props) {
        // Add all the properties of the prop obj to this instance.
        if (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }
        }

//        if (this.image) {
//            this.image = "assets/" + this.image;
//            this.sprite = new PIXI.Sprite.fromImage(this.image);
//        } else if (this.frame) {
//            this.sprite = new PIXI.Sprite.fromFrame(this.frame);
//        } else if (this.texture) {
//            this.sprite = new PIXI.Sprite(this.texture);
//        } else if (this.baseTexture) {
//            this.sprite = new PIXI.Sprite(new PIXI.Texture(this.baseTexture, this.rectangle));
//        } else {
//        this.sprite = new PIXI.DisplayObjectContainer();
//        }
        var graphic = new PIXI.Graphics();
        graphic.beginFill(0xFFFFFF, 0);

        this.animations = {};
        if (!this.frame) {
            this.frame = {w: 0, h: 0};
        }
        if (this.animSheet) {
            this.animSheet = "graphics/" + A_.level.directoryPrefix + this.animSheet;
            this.baseTexture = new PIXI.BaseTexture.fromImage(this.animSheet, PIXI.scaleModes.LINEAR);
            // If the frame size is not specified in the class definition, 
            // or the frame w/h is set to 0, use the dims of the image itself.
            if (!this.frame.w) {
                this.frame.w = this.baseTexture.width;
            }
            if (!this.frame.h) {
                this.frame.h = this.baseTexture.height;
            }

            var colls = Math.round(this.baseTexture.width / this.frame.w);
            var rows = Math.round(this.baseTexture.height / this.frame.h);

            this.textures = [];
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < colls; j++)
                    this.textures[this.textures.length] = new PIXI.Texture(this.baseTexture,
                            new PIXI.Rectangle(j * this.frame.w, i * this.frame.h,
                                    this.frame.w, this.frame.h));
            }


            graphic.drawRect(0, 0, this.frame.w, this.frame.h);
            graphic.endFill();
            this.sprite = new PIXI.Sprite(graphic.generateTexture(false));

            var animations = new PIXI.DisplayObjectContainer();
            this.sprite.addChild(animations);

            this.addAnimation("default", [0], 1);
            this.setAnimation("default");
            this.addAnimation("all", _.range(0, this.textures.length), 0.05);
        } else {
            graphic.drawRect(0, 0, 1, 1);
            graphic.endFill();
            this.sprite = new PIXI.Sprite(graphic.generateTexture(false));

            var animations = new PIXI.DisplayObjectContainer();
            this.sprite.addChild(animations);
        }
        this.sprite.anchor = new PIXI.Point(0.5, 0.5);

        var sprites = new PIXI.DisplayObjectContainer();
        this.sprite.addChild(sprites);
        this.sprites = [];

        this.sprite.rotation = 0;

        if (!this.width)
            this.width = 1;
        if (!this.height)
            this.height = 1;

        this.alpha = 1;

        if (parent instanceof A_.SPRITES.AnimatedSprite) {
            parent.addSprite(this);
//            this.container = parent;
//            this.layer = this.container.layer;
        }
        else {
            this.layer = parent;
            this.layer.addChild(this.sprite);
        }
//        this.parent = parent;
        this.setPosition(x, y);

        this.spritePoints = [];
    },
    // SPRITE CHILDREN
    addSprite: function (sprite) {
        this.sprites.push(sprite);
        this.sprite.children[1].addChild(sprite.sprite);
        sprite.container = this;
        sprite.layer = this.layer;
        return sprite;
    },
    removeSprite: function (sprite) {
        this.sprites.splice(this.sprites.indexOf(sprite), 1);
        this.sprite.children[1].removeChild(sprite.sprite);
        sprite.container = null;
        sprite.layer = null;
        return sprite;
    },
    // PIXI/SAT dependent GETTERS and SETTERS.
    // Used to keep in sync PIXI, SAT and engine sprite properties
    getLevelPosition: function () {
        return A_.level.container.toLocal(A_.game.origin, this.sprite);
    },
    setPosition: function (x, y) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        _.each(this.spritePoints, function (sp) {
            sp.setPosition(x, y);
        });
    },
    setPositionRelative: function (x, y) {
        this.setPosition(this.sprite.position.x + x, this.sprite.position.y + y);
    },
    getPosition: function () {
        return this.sprite.position;
    },
    getPositionX: function () {
        return this.sprite.position.x;
    },
    getPositionY: function () {
        return this.sprite.position.y;
    },
    // TODO: setSize/width/height should affect spritepoints
    setSize: function (x, y) {
        this.sprite.width = x;
        this.sprite.height = y;
    },
    getSize: function () {
        return {width: this.sprite.width, height: this.sprite.height};
    },
    setWidth: function (width) {
        this.sprite.width = width;
    },
    getWidth: function () {
        return this.sprite.width;
    },
    setHeight: function (height) {
        this.sprite.height = height;
    },
    getHeight: function () {
        return this.sprite.height;
    },
    setScale: function (x, y) {
        var prevScale = this.getScale();
        this.sprite.scale = new PIXI.Point(x, y);
        _.each(this.spritePoints, function (sp) {
            sp.setScale(x / prevScale.x, y / prevScale.y);
        });
    },
    getScale: function () {
        return this.sprite.scale;
    },
    flip: function (axis) {
        var prevScale = this.getScale();
        if (axis === "x") {
            this.setScale(prevScale.x * -1, prevScale.y);
        } else if (axis === "y") {
            this.setScale(prevScale.x, prevScale.y * -1);
        }
    },
    setFlipped: function (axis, flip) {
        if (this.getFlipped(axis) && flip || !this.getFlipped(axis) && !flip) {
            return;
        }
        else
            this.flip(axis);
    },
    getFlipped: function (axis) {
        if (axis === "x") {
            if (this.getScale().x < 0)
                return true;
            else
                return false;
        }
        else if (axis === "y") {
            if (this.getScale().y < 0)
                return true;
            else
                return false;
        }
    },
    setRotation: function (n) {
        this.sprite.rotation = n;
        _.each(this.spritePoints, function (sp) {
            sp.setRotation(n);
        });
    },
    getRotation: function () {
        return this.sprite.rotation;
    },
    setAlpha: function (n) {
        this.sprite.alpha = n;
    },
    getAlpha: function () {
        return this.sprite.alpha;
    },
    // Z ORDER & LAYERS
    setZ: function (position) {
        // TODO
        var parent;
        if (this.container) {
            parent = this.container.sprite.children[1];
        } else
            parent = this.layer;

        if (typeof position === "string") {
            if (position === "top") {
                parent.setChildIndex(this.sprite, this.layer.children.length - 1);
                return;
            } else if (position === "bottom") {
                parent.setChildIndex(this.sprite, 0);
                return;
            }
        } else if (typeof position === "number") {
            if (position >= 0 && position < parent.children.length)
                parent.setChildIndex(this.sprite, position);
        }
    },
    moveToSprite: function (sprite, position) {
        var parent;
        if (this.getLayerName() !== sprite.getLayerName())
            return;
        else
            parent = this.layer;
        if (this.container) {
            if (this.container !== sprite.container)
                return;
            else
                parent = this.container.sprite.children[1];
        }
        if (position === "back" || position === "front") {
            parent.removeChild(this.sprite);
            parent.addChildAt(this.sprite, parent.getChildIndex(sprite.sprite));
            if (position === "front") {
                parent.swapChildren(this.sprite, sprite.sprite);
            }
        }
    },
    getZ: function () {
        var parent;

        if (this.container) {
            parent = this.container.sprite.children[1];
        } else
            parent = this.layer;

        return parent.getChildIndex(this.sprite);
    },
    getLayerName: function () {
        return this.layer.name;
    },
    getLayerNumber: function () {
        return this.layer.parent.getChildIndex(this.layer);
    },
    moveToLayer: function (layer) {
        if (typeof layer === "string") {
            var dest = A_.level.findLayerByName(layer);
        } else if (typeof layer === "number") {
            var dest = A_.level.findLayerByNumber(layer);
        }
        if (dest) {
            if (this.container) {
                this.container.removeSprite(this);
            } else
                this.layer.removeChild(this.sprite);

            dest.addChild(this.sprite);
            this.layer = dest;
            _.each(this.sprites, function (sprite) {
                sprite.layer = layer;
            });
        }
    },
    // ANCHOR
    getOrigin: function () {
        return this.sprite.anchor;
    },
    setOrigin: function (x, y) {
        var w = this.getWidth();
        var h = this.getHeight();
        var deltaX = x - this.sprite.anchor.x;
        var deltaY = y - this.sprite.anchor.y;
        var scale = this.getScale();

        var anchor = new PIXI.Point(x, y);
        this.sprite.anchor = anchor;
        _.each(this.animations, function (animation) {
            animation.anchor = anchor;
        });

        _.each(this.sprites, function (sprite) {
            sprite.setPositionRelative(-deltaX * w / scale.x, -deltaY * h / scale.y);
        });

        _.each(this.spritePoints, function (sp) {
            sp.point.x -= deltaX * w;
            sp.point.y -= deltaY * h;
        });

        var colPol = this.collisionPolygon;
        if (colPol) {
            var offset = new SAT.Vector(colPol.offset.x - deltaX * w, colPol.offset.y - deltaY * h);
            colPol.setOffset(offset);
        }

    },
    // SPRITE POINTS
    addSpritePoint: function (name, x, y) {
        var sprPt = {};
        sprPt.origPoint = new SAT.Vector(x, y);
        sprPt.point = new SAT.Vector(x, y);
        sprPt.calcPoint = new SAT.Vector(x, y);
        sprPt.name = name;
        sprPt.setPosition = function (x, y) {
            this.calcPoint.x = x + this.point.x;
            this.calcPoint.y = y + this.point.y;
        };
        sprPt.setRotation = function (rotation) {
            var rotVec = this.point.clone().rotate(rotation).sub(this.point);            
            this.calcPoint.add(rotVec);
        };
        sprPt.setScale = function (x, y) {
            this.point.x *= x;
            this.point.y *= y;
        };
        sprPt.getPosition = function () {
            return this.calcPoint;
        };
        sprPt.getPositionX = function () {
            return this.calcPoint.x;
        };
        sprPt.getPositionY = function () {
            return this.calcPoint.y;
        };
        this.spritePoints.push(sprPt);
        return sprPt;
    },
    getSpritePoint: function (name) {
        return _.find(this.spritePoints, function (sprPt) {
            return sprPt.name === name;
        });
    },
    // CREATION/DESTRUCTION & UPDATE
    preupdate: function () {

    },
    update: function () {

    },
    postupdate: function () {
//        _.each(this.spritePoints, function (sprPt) {
//            sprPt.update();
//        });
    },
    onCreation: function () {

    },
    destroy: function () {
        _.each(this.sprites, function (sprite) {
            sprite.destroy();
        })

        A_.game.spritesToDestroy.push(this);
        this.onDestruction();
    },
    onDestruction: function () {

    },
    // ANIMATION
    addAnimation: function (name, frames, speed) {
        // set default speed to 1; 
        if (!speed) {
            speed = 1;
        }

        var textures = [];
        for (var i = 0; i < frames.length; i++)
            textures[i] = this.textures[frames[i]];

        var animation = new PIXI.MovieClip(textures);

        animation.anchor.x = 0.5;
        animation.anchor.y = 0.5;
        animation.visible = false;
        // set the speed that the MovieClip will play at; higher is faster, lower is slower
        animation.animationSpeed = speed;
        this.sprite.children[0].addChild(animation);
        this.animations[name] = animation;
    },
    setAnimation: function (name, frame, speed) {
        // play from the start by default
        if (typeof frame === 'undefined') {
            if (this.currentAnimationName === name)
                return;
            frame = 0;
        }
        if (typeof speed !== 'undefined') {
            this.animations[name].animationSpeed = speed;
        }

        // Turn off the previously playing animation
        if (this.currentAnimation) {
            // Stops the MovieClip
            this.currentAnimation.stop();
            // The visibility of the object.
            this.currentAnimation.visible = false;
        }

        this.currentAnimation = this.animations[name];
        this.currentAnimationName = name;
        this.animations[name].visible = true;
        // goes to a frame and begins playing the animation
        this.animations[name].gotoAndPlay(frame);
    }
});

A_.SPRITES.CollisionSprite = A_.SPRITES.AnimatedSprite.extend({
    bounded: true,
    outOfBounds: false,
    collides: true,
    destroyThis: false,
    drawDebugGraphics: true,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);

        this.prevOverlapN = new SAT.Vector(0, 0);

        this.initInput();
    },
    initInput: function () {
        var that = this;
        if (this.interactive) {
            this.sprite.interactive = true;
            this.sprite.mousedown = function () {
                that.leftpressed = true;
                that.leftdown = true;
            };
            this.sprite.mouseup = function () {
                that.leftreleased = true;
                that.leftdown = false;
            };
            this.sprite.mouseupoutside = function () {
                that.leftreleased = true;
                that.leftdown = false;
            };
            this.sprite.rightdown = function () {
                that.rightpressed = true;
                that.rightdown = true;
            };
            this.sprite.rightup = function () {
                that.rightreleased = true;
                that.rightdown = false;
            };
            this.sprite.rightupoutside = function () {
                that.rightreleased = true;
                that.rightdown = false;
            };
        }
    },
    setInteractive: function () {
        this.sprite.interactive = true;
    },
    removeInteractive: function () {
        this.sprite.interactive = false;
    },
    setCollision: function (polygon) {
        if (!this.collisionSize)
            this.collisionSize = {};
        if (!this.collisionSize.w)
            this.collisionSize.w = this.sprite.width;
        if (!this.collisionSize.h)
            this.collisionSize.h = this.sprite.height;

        if (!this.collisionOffset) {
            this.collisionOffset = {};
        }
        if (!this.collisionOffset.x) {
            this.collisionOffset.x = 0;
        }
        if (!this.collisionOffset.y) {
            this.collisionOffset.y = 0;
        }

        if (polygon) {
            A_.game.collider.activateCollisionFor(this, polygon, null, null, this.collisionOffset.x, this.collisionOffset.y);
        }
        else {
            // Center the polygon and apply the offset.
            A_.game.collider.activateCollisionFor(this, polygon, this.collisionSize.w, this.collisionSize.h,
                    -this.collisionSize.w / 2 + this.collisionOffset.x, -this.collisionSize.h / 2 + this.collisionOffset.y);
        }

        if (this.collides || this.collisionResponse) {
            this.collides = true;
            if (!this.collisionResponse) {
                this.collisionResponse = "sensor";
                A_.game.collider.collisionDynamics.push(this);
            } else {
                if (this.collisionResponse === "static")
                    A_.game.collider.collisionStatics.push(this);
                else
                    A_.game.collider.collisionDynamics.push(this);
            }
            A_.game.collider.collisionSprites.push(this);
        }
    },
    update: function () {
        this._super();
    },
    postupdate: function () {
        this._super();

        if (this.bounded) {
            var pos = this.getPosition();
            this.setPosition(Math.max(this.collisionPolygon.w / 2, Math.min(pos.x, A_.game.level.width - this.collisionPolygon.w / 2)),
                    Math.max(this.collisionPolygon.h / 2, Math.min(pos.y, A_.game.level.height - this.collisionPolygon.h / 2)));
        } else {
            var pos = this.getPosition();
            if (pos.x < 0 || pos.x > A_.game.level.width || pos.y < 0 || pos.y > A_.game.level.height) {
                this.outOfBounds = true;
            }
        }
    },
    collideWithStatic: function (other, response) {
        this.prevOverlapN = response.overlapN;
        this.collided = true;

        if (this.collisionResponse !== "sensor")
            this.setPositionRelative(-response.overlapV.x, -response.overlapV.y);
    },
    collideWithDynamic: function (other, response) {
        this.prevOverlapN = response.overlapN;
        this.collided = true;

        if (this.collisionResponse === "static") {
            return;
        }
        else if (this.collisionResponse === "sensor") {
            return;
        } else {
            if (other.collisionResponse === "active") {
                if (this.collisionResponse === "active" || this.collisionResponse === "passive") {
                    if (this.collisionPolygon === response.a) {
                        this.setPositionRelative(-response.overlapV.x * 0.5,
                                -response.overlapV.y * 0.5);
                    } else {
                        this.setPositionRelative(response.overlapV.x * 0.5,
                                response.overlapV.y * 0.5);
                    }
                }
                else if (this.collisionResponse === "light") {
                    if (this.collisionPolygon === response.a) {
                        this.setPositionRelative(-response.overlapV.x, -response.overlapV.y);
                    } else {
                        this.setPositionRelative(response.overlapV.x, response.overlapV.y);
                    }
                }
            }
            else if (other.collisionResponse === "passive") {
                if (this.collisionResponse === "active") {
                    if (this.collisionPolygon === response.a) {
                        this.setPositionRelative(-response.overlapV.x * 0.5,
                                -response.overlapV.y * 0.5);
                    } else {
                        this.setPositionRelative(response.overlapV.x * 0.5,
                                response.overlapV.y * 0.5);
                    }
                }
            }
        }
    },
    containsPoint: function (x, y) {
        var response = new SAT.Response();
        var contains = SAT.pointInPolygon(new SAT.Vector(x, y), this.collisionPolygon);
        if (contains) {
            return response;
        } else {
            return false;
        }
    },
    setPosition: function (x, y) {
        this._super(x, y);
        if (this.collisionPolygon) {
            this.collisionPolygon.pos.x = this.getPositionX();
            this.collisionPolygon.pos.y = this.getPositionY();
        }
    },
    setScale: function (x, y) {
        this._super(x, y);
        if (this.collisionPolygon) {
            this.collisionPolygon.setScale(x, y);
        }
    },
    setSize: function (x, y) {
        this._super(x, y);
        if (this.collisionPolygon) {
            x = x / this.frame.w;
            y = y / this.frame.w;
            this.collisionPolygon.setScale(x, y);
        }
    },
    setWidth: function (x) {
        this._super(x);
        if (this.collisionPolygon) {
            x /= this.frame.w;
            this.collisionPolygon.setScale(x, this.collisionPolygon.scale.y);
        }
    },
    setHeight: function (y) {
        this._super(y);
        if (this.collisionPolygon) {
            y = y / this.frame.h;
            this.collisionPolygon.setScale(this.collisionPolygon.scale.x, y);
        }
    },
    setRotation: function (n) {
        this._super(n);
        if (this.collisionPolygon)
            this.collisionPolygon.setAngle(this.getRotation());
    }
});

A_.SPRITES.ArcadeSprite = A_.SPRITES.CollisionSprite.extend({
    isMoving: false,
    bounciness: 0.5,
    minBounceSpeed: 64,
    angularSpeed: 0,
    movementAngle: 0,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        this.velocity = new SAT.Vector(0, 0);
        this.gravity = new SAT.Vector(0, 0);
        this.friction = new SAT.Vector(32, 32);
        this.acceleration = new SAT.Vector(0, 0);
        this.maxVelocity = new SAT.Vector(256, 256);
        this.speed = new SAT.Vector(64, 64);
        this.maxSpeed = this.maxVelocity.len();
        this.bounced = {horizontal: false, vertical: false};
    },
    update: function () {
        this._super();

        // ARCADE PHYSICS
        var startPos = this.getPosition();

        if (this.moveForward) {
            this.movementAngle = this.getRotation();
        }

        var friction = this.friction.clone();
        var acceleration = this.acceleration.clone();
        if (this.moveAtAngle) {
            var sin = Math.sin(this.movementAngle);
            var cos = Math.cos(this.movementAngle);
            
            friction.x = Math.abs(friction.x * cos);
            friction.y = Math.abs(friction.y * sin);
            
            acceleration.x *= cos;
            acceleration.y *= sin;
        }

        if (this.gravity.x === 0) {
            if (this.velocity.x > 0) {
                this.velocity.x -= friction.x;
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                }
            }
            if (this.velocity.x < 0) {
                this.velocity.x += friction.x;
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                }
            }
        }
        if (this.gravity.y === 0) {
            if (this.velocity.y > 0) {
                this.velocity.y -= friction.y;
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                }
            }
            if (this.velocity.y < 0) {
                this.velocity.y += friction.y;
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                }
            }
        }

        this.velocity.add(acceleration);
        this.velocity.add(this.gravity);

        if (this.bounced.horizontal) {
            this.velocity.x = -this.velocity.x * this.bounciness;
        }
        if (this.bounced.vertical) {
            this.velocity.y = -this.velocity.y * this.bounciness;
        }
        this.bounced.horizontal = this.bounced.vertical = false;

        if (this.moveAtAngle) {
            var spd = this.velocity.len();
            if (spd > this.maxSpeed) {
                this.velocity.scale(this.maxSpeed / spd, this.maxSpeed / spd);
            }
        }
        else {
            this.velocity.x = this.velocity.x.clamp(-this.maxVelocity.x, this.maxVelocity.x);
            this.velocity.y = this.velocity.y.clamp(-this.maxVelocity.y, this.maxVelocity.y);
        }

        var vel = this.velocity.clone();
        vel.scale(A_.game.dt, A_.game.dt);

        var x = startPos.x + vel.x;
        var y = startPos.y + vel.y;
        this.setPosition(x, y);


        if (this.velocity.x !== 0 || this.velocity.y !== 0) {
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }

        if (this.angularSpeed) {
            this.setRotation(this.getRotation() + this.angularSpeed * A_.game.dt);
            this.isRotating = true;
        } else {
            this.isRotating = false;
        }
    },
    collideWithStatic: function (other, response) {
        this.processBounce(response.overlapN);
        this._super(other, response);
    },
    processBounce: function (currentOverlapN) {
        // This method must be called before the collide* _super in order
        // to fetch the correct this.previousOverlapN
        // BUG: the sprite does not bounce in tilemap corners
        if (currentOverlapN.x !== 0 && Math.abs(this.velocity.x) > this.speed.x) {
            if (this.prevOverlapN.y === 0)
                this.bounced.horizontal = true;
        }
        if (currentOverlapN.y !== 0 && Math.abs(this.velocity.y) > this.speed.y) {
            if (this.prevOverlapN.x === 0)
                this.bounced.vertical = true;
        }
    }
});
