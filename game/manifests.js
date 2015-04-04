var skorpio1 = {
    directory: "",
    type: "tiled",
    scripts: ["skorpio"],
    map: "map_skorpio1",
    graphics: ["AgentComplete.png", "AssaultRifle.png", "player_skorpio.png", "Computer1.png",
        "Explosion.png", "Fire.png", "Interior-Furniture.png",
        "Muzzleflashes-Shots.png"],
    sounds: [["explosion.mp3"], ["grunt.wav"], ["fire.wav"],
        ["gunshot.mp3"], ["laser-beam.mp3"]],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: true,
        followType: "bounded"
    }
};

var skorpio2 = A_.UTILS.copy(skorpio1);
skorpio2.map = "map_skorpio2";

farer1 = {
    directory: "",
    type: "generic",
    scripts: ["farer"],
    map: "",
    graphics: ["bullet.png", "Explosion.png", "laser.png",
        "nebula.png", "player_farer.png", "rotor.png", "starfield.png"],
    sounds: [["bullet.wav"], ["explosion.mp3"], ["laser-beam.mp3"]],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: true,
        followType: "centered"
    }
};

rot1 = {
    directory: "",
    type: "generic",
    scripts: ["rot"],
    map: "",
    graphics: ["player_rot.png", "tilemap.png"],
    sounds: [],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: true,
        followType: "bounded"
    }
};

platformer1 = {
    directory: "",
    type: "tiled",
    scripts: ["platformer"],
    map: "level1",
    graphics: ["ball.png", "sci-fi-platformer-tiles-32x32.png", "moving_platform.png", "player_platformer.png",
        "Explosion.png", "undead.png"],
    sounds: [["dull.wav"], ["e.wav"], ["grounded.wav"], ["jetpack.wav"], ["jump.wav"]],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: true,
        followType: "bounded"
    }
};

brownian = {
    directory: "",
    type: "tiled",
    scripts: ["brownian"],
    map: "brownian",
    graphics: [],
    sounds: [],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: true,
        followType: "centered"
    }
};

box2D = {
    directory: "box2D/",
    type: "tiled",
    scripts: ["box2D"],
    map: "Box2D",
    graphics: [],
    sounds: [],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: true,
        followType: "centered"
    }
};

var isometric = {
    directory: "Isometric/",
    type: "tiled",
    scripts: ["isometric"],
    map: "isometric3",
    graphics: ["cube.png", "player.png", "sphere.png", "tileset.png", "tileset2.png", "violettileset.png"],
    sounds: [],
    camera: {
        innerBoundOffset: 0.25,
        worldBounded: false,
        followType: "centered"
    }
};

var diskette = {
    directory: "diskette/",
    type: "tiled",
    scripts: ["diskette", "anime", "ball", "diskette", "computer",
        "player", "scenery"],
    map: "diskette1",
    graphics: ["ball.png", "blocks.png", "computer.png", "crosshair.png",
        "diskette.png", "dynamics.png", "medical.png", "moon.png", "owl.png",
        "player.png", "player_wb.png", "pyramid.png", "pyramidDisplacementMap.png", "sky.png", 
        "star.png", "sun.png"],
    sounds: [["bounce.ogg"], ["throw.ogg"]],
    camera: {
        innerBoundOffset: 0.35,
        worldBounded: true,
        followType: "bounded"
    }
};

A_.LEVEL.Manifests["skorpio1"] = skorpio1;
A_.LEVEL.Manifests["skorpio2"] = skorpio2;
A_.LEVEL.Manifests["platformer1"] = platformer1;
A_.LEVEL.Manifests["farer1"] = farer1;
A_.LEVEL.Manifests["rot1"] = rot1;
A_.LEVEL.Manifests["brownian"] = brownian;
A_.LEVEL.Manifests["diskette"] = diskette;
A_.LEVEL.Manifests["box2D"] = box2D;
A_.LEVEL.Manifests["isometric"] = isometric;