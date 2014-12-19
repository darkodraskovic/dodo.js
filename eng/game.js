A_.Game = Class.extend({
    scale: 1,
    screenW: 800,
    screenH: 600,
    stageColor: 0x757575,
    isRunning: false,
    mousePosition: {stage: {x: 0, y: 0}, level: {x: 0, y: 0}},
    init: function () {
        this.rendererOptions = A_.CONFIG.renderer;
        this.stage = new PIXI.Stage(this.stageColor);
        this.renderer = PIXI.autoDetectRenderer(this.screenW, this.screenH, this.rendererOptions);
        document.body.appendChild(this.renderer.view);
        this.origin = new PIXI.Point(0, 0);
        this.debug = A_.CONFIG.debug;

        this.initInput();

        this.time = new Date().getTime();
        this.dt = new Date().getTime();

        this.levels = [];
        this.level = null;
        this.spritesToDestroy = [];
        this.spritesToCreate = [];

        this.cameraOptions = A_.CONFIG.camera;

        this.sounds = [];
        requestAnimFrame(runGame);
    },
    initInput: function () {
        var that = this;
        this.stage.mousedown = function () {
            that.leftpressed = true;
            that.leftdown = true;
        };
        this.stage.mouseup = function () {
            that.leftreleased = true;
            that.leftdown = false;
        };
        this.stage.mouseupoutside = function () {
            that.rightreleased = true;
            that.rightdown = false;
        };
        this.stage.rightdown = function () {
            that.rightpressed = true;
            that.rightdown = true;
        };
        this.stage.rightup = function () {
            that.rightreleased = true;
            that.rightdown = false;
        };
        this.stage.rightupoutside = function () {
            that.rightreleased = true;
            that.rightdown = false;
        };
    },
    // LEVEL LOADING
    // Load empty LEVEL
    loadEmptyLevel: function (level) {
        if (!level) {
            level = {
                name: "empty",
                directoryPrefix: "",
                scripts: [],
                map: "",
                graphics: [],
                sounds: []
            };
        }
        this.levels.push(level);
        this.levelToLoad = level;
        this.onLevelLoaded = this.onEmptyLevelLoaded;

        if (this.level) {
            this.destroyLevel = true;
            this.activateLevelLoaderDeferred = true;
            return;
        } else {
            this.activateLevelLoader();
        }
    },
    onEmptyLevelLoaded: function () {
        window.console.log("Loaded EMPTY LEVEL :)");

        this.createLevelTemplate();

        var layer = this.level.createEmptyLayer();
        var text = new PIXI.Text("Level loaded :)", {font: "Bold 50px Courier New", fill: "Black",
            stroke: "LightGrey", strokeThickness: 0,
            dropShadow: true, dropShadowColor: '#444444', dropShadowAngle: Math.PI / 4, dropShadowDistance: 4});
        layer.addChild(text);
        text.anchor = new PIXI.Point(0.5, 0.5);
        text.position.x = this.renderer.width / 2;
        text.position.y = this.renderer.height / 2;
        this.level.addLayer(layer);

        this.startLevel();
    },
    // Load level from TILED
    loadTiledLevel: function (levelData) {
        if (!_.find(this.levels, function (level) {
            return level.name === levelData.name;
        })) {
            this.levels.push(levelData);
        }

        this.onLevelLoaded = this.onTiledLevelLoaded;

        if (this.level) {
            // Load level deferred: wait until the end of the game loop.
            this.destroyLevel = true;
            this.activateLevelLoaderDeferred = true;
            this.levelToLoad = levelData;
            return;
        } else {
            // Load level immediately.
            this.levelToLoad = levelData;
            this.activateLevelLoader();
        }
    },
    activateLevelLoader: function () {
        this.levelLoader = new A_.LevelLoader(this.levelToLoad.directoryPrefix);
        this.levelLoader.loadScripts(this.onScriptsLoaded.bind(this), this.levelToLoad.scripts);
    },
    onScriptsLoaded: function () {
        window.console.log("Loaded scripts");
        this.levelLoader.loadMap(this.onMapLoaded.bind(this), this.levelToLoad.map);
    },
    onMapLoaded: function () {
        window.console.log("Loaded map");
        this.levelLoader.loadGraphics(this.onGraphicsLoaded.bind(this), this.levelToLoad.graphics);
    },
    onGraphicsLoaded: function () {
        window.console.log("Loaded graphics");
        this.levelLoader.loadSounds(this.onSoundsLoaded.bind(this), this.levelToLoad.sounds);
    },
    onSoundsLoaded: function () {
        window.console.log("Loaded sounds");
        this.onLevelLoaded();
    },
    onTiledLevelLoaded: function () {
        window.console.log("Loaded TILED LEVEL :)");

        this.createLevelTemplate();

        createMap(this, this.levelLoader.mapDataParsed);

        this.startLevel();
    },
    // COMMON level routines
    createLevelTemplate: function () {
        this.collider = new A_.COLLISION.Collider();
        A_.collider = this.collider;

        this.level = new A_.Level();

        // If the level was loaded
        if (this.levelLoader.directoryPrefix)
            this.level.directoryPrefix = this.levelLoader.directoryPrefix;
        // If the empty level was created
        else
            this.level.directoryPrefix = "";

        this.level.width = 0;
        this.level.height = 0;

        A_.level = this.level;
        
        this.stage.addChild(this.level.container);
    },
    startLevel: function () {
        this.setupCamera();

        this.setScale(this.scale);

//        this.stage.addChild(this.level.container);
        // Debug layer must be added on top of the level container.
        if (this.debug) {
            this.level.addDebugLayer(this.collider.debugLayer);
        }

        this.level.name = this.levelToLoad.name;
        this.activateLevelLoaderDeferred = false;
        this.levelToLoad = null;
        this.onLevelLoaded = null;

        this.createSprites();
        this.isRunning = true;
        this.onLevelStarted();
    },
    onLevelStarted: function () {
        window.console.log("Level STARTS...");
    },
    unloadLevel: function () {
        this.destroyLevel = true;
    },
    clearLevel: function () {
        this.collider = null;
        A_.collider = null;

        this.level = null;
        A_.level = null;

        this.camera = null;
        A_.camera = null;

        this.levelLoader = null;

        delete(A_.game.level);
        delete(A_.game.collider);
        delete(A_.game.camera);
        delete(A_.game.LevelLoader);

        this.destroySounds();

        this.stage.removeChildren();

        this.destroyLevel = false;
    },
    // CAMERA
    setupCamera: function () {
        this.camera = new A_.CAMERA.Camera(A_.game.renderer.view.width, A_.game.renderer.view.height, this.cameraOptions);
        A_.camera = this.camera;
    },
    // SPRITE CREATION and DESTRUCTION
    createSprite: function (SpriteClass, layer, x, y, props, collisionPolygon) {
        if (!SpriteClass)
            return;

        if (!layer) {
            layer = this.level.layers[0];
        }

        var sprite = new SpriteClass(layer, x, y, props);
        if (sprite instanceof A_.SPRITES.Colliding && sprite.collides)
            sprite.setCollision(collisionPolygon);

        if (this.debug) {
            sprite.debugGraphics = new PIXI.Graphics();
            this.collider.debugLayer.addChild(sprite.debugGraphics);
        }

        this.spritesToCreate.push(sprite);
        sprite.onCreation();
        return sprite;
    },
    createSprites: function () {
        var that = this;
        _.each(this.spritesToCreate, function (sprite) {
            that.level.sprites.push(sprite);
            // TODO: Find out why this does not work.
//            sprite.onCreation();
        });
        this.spritesToCreate.length = 0;
    },
    destroySprite: function (sprite) {
        if (!_.contains(this.level.sprites, sprite))
            return;

        if (sprite.collisionPolygon)
            sprite.removeCollision();

        if (sprite === this.camera.followee) {
            this.camera.followee = null;
        }
        // TODO: destroy collision mask

        if (sprite.debugGraphics) {
            sprite.debugGraphics.parent.removeChild(sprite.debugGraphics);
        }
        sprite.sprite.parent.removeChild(sprite.sprite);
        this.level.sprites.splice(this.level.sprites.indexOf(sprite), 1);
    },
    destroySprites: function () {
        var that = this;
        _.each(this.spritesToDestroy, function (sprite) {
            that.destroySprite(sprite)
        });
        this.spritesToDestroy.length = 0;
    },
    createSound: function (props) {
        _.each(props["urls"], function (url, i, list) {
            list[i] = "sounds/" + this.level.directoryPrefix + url;
        }, this);
        var sound = new Howl(props);
        this.sounds.push(sound);
        return sound;
    },
    destroySounds: function () {
        _.each(this.sounds, function (sound) {
            sound.unload();
        });
        this.sounds.length = 0;
    },
    // GAME LOOP
    run: function () {
        if (!this.isRunning)
            return;
        var now = new Date().getTime();
        this.dt = now - this.time;
        this.time = now;
        this.dt /= 1000;

        this.processInput();

        this.update();

        this.manageSprites();

        this.render();

        this.postprocessInput();

        this.manageLevels();

    },
    update: function () {
        // User-defined global routine.
        this.preupdate();

        // Sprites' updates.
        _.each(this.level.sprites, function (sprite) {
            sprite.preupdate();
        });
        _.each(this.level.sprites, function (sprite) {
            sprite.update();
        });

        this.collider.processCollisions();

        _.each(this.level.sprites, function (sprite) {
            sprite.postupdate();
        });

        // User-defined global routine.
        this.postupdate();
    },
    preupdate: function () {

    },
    postupdate: function () {

    },
    manageSprites: function () {
        this.destroySprites();
        this.createSprites();
    },
    render: function () {
        _.each(this.level.spriteLayers, function (layer) {
            if (layer["sort"]) {
                layer.children = _.sortBy(layer.children, function (child) {
                    return child.position.y;
                });
            }
        });

        if (this.debug) {
            _.each(this.collider.collisionSprites, function (sprite) {
                sprite.drawDebug();
            })
        }

        this.camera.update();

        // Transform the position from container's scaled local system  
        // into stage's unscaled global system.
        this.level.container.position.x *= this.scale;
        this.level.container.position.y *= this.scale;

//        this.gameWorld.container.position.x = Math.round(this.gameWorld.container.position.x);
//        this.gameWorld.container.position.y = Math.round(this.gameWorld.container.position.y);

        this.renderer.render(this.stage);
    },
    processInput: function () {
        // #docs This will return the point containing global coordinates of the mouse,
        // more precisely, a point containing the coordinates of the global InteractionData position.
        // InteractionData holds all information related to an Interaction event.        
//        this.level.mousePosition = this.stage.getMousePosition().clone();
//        // Transform the mouse position from the unscaled stage's global system to
//        // the unscaled scaled gameWorld.container's system. 
//        this.level.mousePosition.x /= this.scale;
//        this.level.mousePosition.y /= this.scale;
//        this.level.mousePosition.x += this.camera.x;
//        this.level.mousePosition.y += this.camera.y;
        this.mousePosition.stage = this.stage.getMousePosition().clone();
        this.mousePosition.level = this.stage.getMousePosition().clone();
        this.mousePosition.level.x /= this.scale;
        this.mousePosition.level.y /= this.scale;
        this.mousePosition.level.x += this.camera.x;
        this.mousePosition.level.y += this.camera.y;
    },
    postprocessInput: function () {
        for (var action in A_.INPUT.actions) {
            if (A_.INPUT.pressed[action] === true) {
                A_.INPUT.pressed[action] = false;
            }
            if (A_.INPUT.released[action] === true) {
                A_.INPUT.released[action] = false;
            }
        }

        _.each(this.level.sprites, function (sprite) {
            if (sprite.interactive) {
                sprite.leftpressed = false;
                sprite.leftreleased = false;
                sprite.rightpressed = false;
                sprite.rightreleased = false;
            }
        });

        this.leftpressed = false;
        this.leftreleased = false;
        this.rightpressed = false;
        this.rightreleased = false;
    },
    manageLevels: function () {
        if (this.destroyLevel) {
            this.isRunning = false;
            this.clearLevel();
            if (this.activateLevelLoaderDeferred) {
                this.activateLevelLoader();
            }
        }
    },
    setScale: function (scale) {
        if (scale > 0.25 && scale < 5) {
            // scale the game world according to scale
            this.level.container.scale = new PIXI.Point(scale, scale);

            // position canvas in the center of the window if...
            // console.log(gameWorld.container.width); 
            // console.log(gameWorld.container.height); 
            // BUG: wrong behavior when screenBounded === false
            // BUG: zoom/in out camera movement strange behavior
            if (this.camera.followType === "bounded") {
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
            this.camera.width = this.renderer.view.width / scale;
            this.camera.height = this.renderer.view.height / scale;

//        this.camera.centerOn(player);

            this.scale = scale;
        }
    }
});

window.addEventListener("mousewheel", mouseWheelHandler, false);
function mouseWheelHandler(e) {
    var scaleDelta = 0.02;
    if (e.wheelDelta > 0) {
        A_.game.setScale(A_.game.scale + scaleDelta);
    } else {
        A_.game.setScale(A_.game.scale - scaleDelta);
    }
}
