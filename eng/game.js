function runGame() {
    requestAnimFrame(runGame);

    if (A_.game.isRunning === true) {
        A_.game.run();
    }
}

window.addEventListener("mousewheel", mouseWheelHandler, false);
function mouseWheelHandler(e) {
    var scaleDelta = 0.02;
    if (e.wheelDelta > 0) {
        A_.game.setScale(A_.game.scale + scaleDelta);
    } else {
        A_.game.setScale(A_.game.scale - scaleDelta);
    }
}

A_.Game = Class.extend({
    debug: true,
    scale: 1,
    screenW: 800,
    screenH: 600,
    stageColor: 0x757575,
    isRunning: false,
    rendererOptions: {
        antialiasing: false,
        transparent: false,
        resolution: 1
    },
//    spritesToDestroy: [],
//    spritesToCreate: [],
    init: function () {
        A_.game = this;
        this.stage = new PIXI.Stage(this.stageColor);
        this.renderer = PIXI.autoDetectRenderer(this.screenW, this.screenH, this.rendererOptions);
        document.body.appendChild(this.renderer.view);

        this.time = new Date().getTime();
        this.dt = new Date().getTime();

        this.spritesToDestroy = [];
        this.spritesToCreate = [];
        requestAnimFrame(runGame);
    },
    loadLevel: function (mapDataJSON, assetsToLoad, cameraOptions, debug) {
        this.mapDataJSON = mapDataJSON;
        this.assetsToLoad = assetsToLoad;
        this.cameraOptions = cameraOptions;
        this.debug = debug;

        this.levelLoader = new A_.LevelLoader(this.onLevelLoaded.bind(this), mapDataJSON, assetsToLoad);
        this.levelLoader.loadLevel();
    },
    onLevelLoaded: function () {
        this.collider = new A_.Collider();
        A_.collider = this.collider;

        this.level = new A_.Level();
        A_.level = this.level;

        createMap(this, this.levelLoader.mapDataParsed);

        this.level.setupCamera(this.cameraOptions);

        if (this.debug) {
            this.collider.setDebug();
            this.level.container.addChild(this.collider.debugLayer);
        }

        this.setScale(this.scale);

        this.stage.addChild(this.level.container);

        this.isRunning = true;

    },
    unloadLevel: function () {
        this.destroyLevel = true;
    },
    clearLevel: function () {
        this.collider = null;
        A_.collider = null;

        this.level = null;
        A_.level = null;

        this.levelLoader = null;

        delete(A_.game.level);
        delete(A_.game.collider);
        delete(A_.game.LevelLoader);

        this.stage.removeChildren();

        this.destroyLevel = false;
        this.loadLevel(this.mapDataJSON, this.assetsToLoad, this.cameraOptions, this.debug);
    },
    run: function () {
        if (!this.isRunning)
            return;

        var now = new Date().getTime();
        this.dt = now - this.time;
        this.time = now;
        this.dt /= 1000;

        this.processInput();

        _.each(this.level.updateSprites, function (sprite) {
            sprite.update();
        });

        this.collider.processCollisions();

        _.each(this.level.updateSprites, function (sprite) {
            sprite.postupdate();
        });

        this.destroySprites();

        this.postcreate();

        _.each(this.level.layers, function (layer) {
            if (layer["sort"]) {
                layer.children = _.sortBy(layer.children, function (child) {
                    return child.position.y;
                });
                _.each(layer.children, function (child, i) {
                    layer.setChildIndex(child, i);
                })
            }
        });

        if (this.debug) {
            this.collider.drawDebug();
        }

        this.level.camera.update();

        // Transform the position from container's scaled local system  
        // into stage's unscaled global system.
        this.level.container.position.x *= this.scale;
        this.level.container.position.y *= this.scale;

//        this.gameWorld.container.position.x = Math.round(this.gameWorld.container.position.x);
//        this.gameWorld.container.position.y = Math.round(this.gameWorld.container.position.y);

        this.renderer.render(this.stage);


        for (var action in A_.INPUT.actions) {
            if (A_.INPUT.pressed[action] === true) {
                A_.INPUT.pressed[action] = false;
            }
            if (A_.INPUT.released[action] === true) {
                A_.INPUT.released[action] = false;
            }
        }

        if (this.destroyLevel) {
            this.isRunning = false;
            this.clearLevel();
        }

    },
    createSprite: function (SpriteClass, layer, x, y, props, collisionPolygon) {
        if (!SpriteClass)
            return;

//        if (!_.contains(this.layers, layer)) {
//            layer = this.layers[0];
//        }
        if (!layer) {
            layer = this.level.layers[0];
        }


        var sprite = new SpriteClass(props);
        sprite.setCollision(collisionPolygon);

        if (this.debug) {
            sprite.debugGraphics = new PIXI.Graphics();
            this.collider.debugLayer.addChild(sprite.debugGraphics);
        }

        sprite.layer = layer;
        layer.addChild(sprite.sprite);
        sprite.setPosition(x, y);

        this.spritesToCreate.push(sprite);

        return sprite;
    },
    postcreate: function () {
        var that = this;
        _.each(this.spritesToCreate, function (sprite) {
            that.level.updateSprites.push(sprite);
        });
        this.spritesToCreate.length = 0;
    },
    destroySprite: function (sprite) {
        if (!_.contains(this.level.updateSprites, sprite))
            return;

        if (_.contains(this.collider.collisionSprites, sprite)) {
            this.collider.collisionSprites.splice(this.collider.collisionSprites.indexOf(sprite), 1);
        }

        if (sprite.collisionType) {
            switch (sprite.collisionType) {
                case "static":
                    this.collider.collisionStatics.splice(this.collider.collisionStatics.indexOf(sprite), 1);
                    break;
                case "dynamic":
                    this.collider.collisionDynamics.splice(this.collider.collisionDynamics.indexOf(sprite), 1);
                    break;
                case "sensor":
                    this.collider.collisionSensors.splice(this.collider.collisionSensors.indexOf(sprite), 1);
                    break;
            }
        }
        if (sprite.collisionPolygon) {
            delete(sprite.collisionPolygon);
        }
        if (sprite === this.level.camera.followee) {
            this.level.camera.followee = null;
        }
        // TODO: destroy collision mask

        if (sprite.debugGraphics) {
            sprite.debugGraphics.parent.removeChild(sprite.debugGraphics);
        }
        sprite.sprite.parent.removeChild(sprite.sprite);
        this.level.updateSprites.splice(this.level.updateSprites.indexOf(sprite), 1);
    },
    destroySprites: function () {
        var that = this;
        _.each(this.spritesToDestroy, function (sprite) {
            that.destroySprite(sprite)
        });
        this.spritesToDestroy.length = 0;
    },
    setScale: function (scale) {
        if (scale > 0.25 && scale < 1.5) {
            // scale the game world according to scale
            this.level.container.scale = new PIXI.Point(scale, scale);

            // position canvas in the center of the window if...
            // console.log(gameWorld.container.width); 
            // console.log(gameWorld.container.height); 
            // BUG: wrong behavior when screenBounded === false
            // BUG: zoom/in out camera movement strange behavior
            if (this.level.camera.followType === "bounded") {
                if (this.level.container.width < this.renderer.view.width) {
                    this.level.x = (this.renderer.view.width - this.level.container.width) / 2;
                    this.level.x /= scale;
                }
//            else {
//		this.gameWorld.x = 0;
//	    }
                if (this.level.container.height < this.renderer.view.height) {
                    this.level.y = (this.renderer.view.height - this.level.container.height) / 2;
                    this.level.y /= scale;
                }
//            else {
//		this.gameWorld.y = 0;
//	    }
            }

            // If the world is scaled 2x, camera sees 2x less and vice versa. 
            this.level.camera.width = this.renderer.view.width / scale;
            this.level.camera.height = this.renderer.view.height / scale;

//        this.camera.centerOn(player);

            this.scale = scale;
        }
    },
    processInput: function () {
        // #docs This will return the point containing global coordinates of the mouse,
        // more precisely, a point containing the coordinates of the global InteractionData position.
        // InteractionData holds all information related to an Interaction event.
        this.level.mousePosition = this.stage.getMousePosition().clone();
        // Transform the mouse position from the unscaled stage's global system to
        // the unscaled scaled gameWorld.container's system. 
        this.level.mousePosition.x /= this.scale;
        this.level.mousePosition.y /= this.scale;
        this.level.mousePosition.x += this.level.camera.x;
        this.level.mousePosition.y += this.level.camera.y;
    }
});