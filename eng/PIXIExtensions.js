(function () {
    // Extend PIXI.Container
    _.extend(PIXI.Container.prototype, DODO.Inputted.prototype);
    DODO.Container = PIXI.Container.extend({
        init: function () {
            PIXI.Container.call(this);
        }
    });

    // Extend PIXI.Sprite/Graphics/Text
    var displayObjectExtension = {
        destroyThis: false,
        updates: true,
        initializeSprite: function (parent, x, y) {
            parent.addChild(this);
            this.position.set(x || 0, y || 0);

            this.scene = parent.scene;
            this.scene.spritesToCreate.push(this);

            this.flip = new PIXI.Point();
            this.flip._container = this;
            Object.defineProperties(this.flip, {
                'x': {
                    set: function (flipped) {
                        if (flipped && this._container.scale.x > 0)
                            this._container.scale.x *= -1;
                        else if (!flipped && this._container.scale.x < 0)
                            this._container.scale.x *= -1;
                    },
                    get: function () {
                        return this._container.scale.x < 0;
                    }
                },
                'y': {
                    set: function (flipped) {
                        if (flipped && this._container.scale.y > 0)
                            this._container.scale.y *= -1;
                        else if (!flipped && this._container.scale.y < 0)
                            this._container.scale.y *= -1;
                    },
                    get: function () {
                        return this._container.scale.y < 0;
                    }
                }
            });
        },
        // Visual BOUNDS
        getScenePosition: function () {
            return this.scene.toLocal(this._sprite.scene.origin, this._sprite);
        },
        getScreenPosition: function () {
            return this.getGlobalPosition();
        },
        getLeft: function () {
            return this.getBounds().x / this.scene.scale + this.scene.camera.position.x;
        },
        getRight: function () {
            var bounds = this.getBounds();
            return (bounds.x + bounds.width) / this.scene.scale + this.scene.camera.position.x;
        },
        getTop: function () {
            return this.getBounds().y / this.scene.scale + this.scene.camera.position.y;
        },
        getBottom: function () {
            var bounds = this.getBounds();
            return (bounds.y + bounds.height) / this.scene.scale + this.scene.camera.position.y;
        },
        getCenterX: function () {
            return this.getLeft() + this.width / 2;
        },
        getCenterY: function () {
            return this.getTop() + this.height / 2;
        },
        overlapsSprite: function (sprite) {
            return (this.getTop() <= sprite.getBottom() && this.getBottom() >= sprite.getTop()
                    && this.getLeft() <= sprite.getRight() && this.getRight() >= sprite.getLeft());
        },
        isOnScreen: function () {
            var bounds = this.getBounds();
            var renderer = this.scene.game.renderer;

            if (bounds.x + bounds.width < 0)
                return false;
            if (bounds.x > renderer.width)
                return false;
            if (bounds.y + bounds.height < 0)
                return false;
            if (bounds.y > renderer.height)
                return false;

            return true;
        },
        // Sprite POINTS
        setPoint: function (name, x, y) {
            this.points = this.points || {};
            this.points[name] = {x: x, y: y};
        },
        getPoint: function (name) {
            this._vector.x = this.points[name].x * this.scale.x;
            this._vector.y = this.points[name].y * this.scale.y;
            this.rotation && this._vector.rotate(this.rotation);
            this._vector.x += this.position.x;
            this._vector.y += this.position.y;
            return this._vector;
        },
        // LAYER
        moveToSprite: function (sprite, position) {
            var layer = sprite.layer;
            if (layer) {
                this.layer = layer;
                if (position) {
                    layer.addChildAt(this, layer.getChildIndex(sprite));
                    if (position === "front") {
                        layer.swapChildren(this, sprite);
                    }
                }
            }
        },
        // LIFECYCLE
        update: function () {
        },
        kill: function () {
            if (this instanceof PIXI.extras.MovieClip)
                return;
            var spritesToDestroy = this.scene.spritesToDestroy;
            if (_.contains(spritesToDestroy, this))
                return;
            _.each(this.children, function (sprite) {
                sprite.kill && sprite.kill();
            });
            spritesToDestroy.push(this);
        },
        wipe: function () {
            this.trigger('destroyed');
            this.debind();
            this.parent && this.parent.removeChild(this);
        }
    };
    _.extend(PIXI.Sprite.prototype, displayObjectExtension);
    _.extend(PIXI.Graphics.prototype, displayObjectExtension);
    _.extend(PIXI.Text.prototype, displayObjectExtension);

    displayObjectExtension = {
        'z': {
            get: function () {
                return this.parent.getChildIndex(this) - (this.animations && this.animations.length) || 0;
            },
            set: function (position) {
                var parent = this.parent;
                if (_.isString(position)) {
                    if (position === "top") {
                        parent.setChildIndex(this, parent.children.length - 1);
                        return;
                    } else if (position === "bottom") {
                        parent.setChildIndex(this, (this.animations && this.animations.length) || 0);
                        return;
                    }
                } else if (_.isNumber(position)) {
                    if (position >= 0 && position < parent.children.length)
                        parent.setChildIndex(this, position);
                }
            }
        },
        'layer': {
            get: function () {
                var parent = this.parent;
                while (parent && !(parent instanceof DODO.Layer)) {
                    parent = parent.parent;
                }
                return parent;
            },
            set: function (layer) {
                if (_.isString(layer)) {
                    layer = this.scene.findLayerByName(layer);
                } else if (_.isNumber(layer)) {
                    layer = this.scene.findLayerByNumber(layer);
                }
                if (layer instanceof DODO.Layer) {
                    layer.addChild(this);
                    return layer;
                }
            }
        },
        'layerName': {
            get: function () {
                return this.layer.name;
            },
            set: function (name) {
                this.layer = name;
            }
        },
        'layerNumber': {
            get: function () {
                return this.layer.parent.getChildIndex(this.layer);
            },
            set: function (number) {
                this.layer = number;
            }
        }
    };
    Object.defineProperties(PIXI.Sprite.prototype, displayObjectExtension);
    Object.defineProperties(PIXI.Graphics.prototype, displayObjectExtension);
    Object.defineProperties(PIXI.Text.prototype, displayObjectExtension);
})();