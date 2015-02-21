A_.SPRITES.Colliding = A_.SPRITES.Sprite.extend({
    collides: true,
    drawCollisionPolygon: true,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);

        this.response = new SAT.Response();
        this._vector = new SAT.Vector();
        
        this.collisionPolygon = this.createCollisionPolygon(this.collisionPolygon);
        this.setCollisionDebug();
        this.synchCollisionPolygon();
    },
    createCollisionPolygon: function (polygon) {
        if (!_.isNumber(this.collisionWidth))
            this.collisionWidth = this.getWidth();
        if (!_.isNumber(this.collisionHeight))
            this.collisionHeight = this.getHeight();
        if (!_.isNumber(this.collisionOffsetX))
            this.collisionOffsetX = 0;
        if (!_.isNumber(this.collisionOffsetY))
            this.collisionOffsetY = 0;

        var collisionPolygon;

        if (!polygon) {
            this.collisionOffsetX -= this.collisionWidth * this.getOrigin().x;
            this.collisionOffsetY -= this.collisionHeight * this.getOrigin().y;
            var box = new SAT.Box(new SAT.Vector(0, 0), this.collisionWidth, this.collisionHeight);
            collisionPolygon = box.toPolygon();
        } else {
            collisionPolygon = polygon;
            this.collisionOffsetX += collisionPolygon.offset.x;
            this.collisionOffsetY += collisionPolygon.offset.y;
        }
        
        collisionPolygon.setOffset(new SAT.Vector(this.collisionOffsetX, this.collisionOffsetY));
        collisionPolygon.scale = new SAT.Vector(1, 1);
        collisionPolygon.calcBounds();

//        if (this.interactive())
//            this.sprite.hitArea = A_.POLYGON.Utils.SATPolygonToPIXIPolygon(collisionPolygon, false);

        return collisionPolygon;
    },
    setCollisionDebug: function () {
        if (this.drawCollisionPolygon && A_.game.debug) {
            this.collisionPolygon.baked = A_.POLYGON.Utils.SATPolygonToPIXIPolygon(this.collisionPolygon, false);
            this.debugGraphics = new PIXI.Graphics();
            this.level.debugLayer.addChild(this.debugGraphics);
            A_.POLYGON.Utils.drawSATPolygon(this.debugGraphics, this.collisionPolygon, this.collisionPolygonStyle);
        }
    },
    updateDebug: function () {
        // Update debug transform
        var debugGraphics = this.debugGraphics;
        var colPol = this.collisionPolygon;
        debugGraphics.position.x = colPol.pos.x;
        debugGraphics.position.y = colPol.pos.y;
        debugGraphics.rotation = colPol.angle;
        debugGraphics.scale = colPol.scale;
    },
    collidesWithEntity: function (other) {
        this.response.clear();
        return (SAT.testPolygonPolygon(this.collisionPolygon, other.collisionPolygon, this.response));
    },
    collidesWithEntityAtOffset: function (other, offsetX, offsetY) {
        this.response.clear();
        this.collisionPolygon.translate(offsetX, offsetY);
        var collides = SAT.testPolygonPolygon(this.collisionPolygon, other.collisionPolygon, this.response);
        this.collisionPolygon.translate(-offsetX, -offsetY);
        return collides;
    },
    containsPoint: function (x, y) {
        this._vector.x = x;
        this._vector.y = y;
        return SAT.pointInPolygon(this._vector, this.collisionPolygon);
    },
//    TRANSFORMATIONS
    setScale: function (x, y) {
        this._super(x, y);
        this.collisionPolygon.setScale(x, y);
    },
    setScaleX: function (x) {
        this._super(x);
        this.collisionPolygon.setScaleX(x);
    },
    setScaleY: function (y) {
        this._super(y);
        this.collisionPolygon.setScaleY(y);
    },
    setSize: function (x, y) {
        this._super(x, y);
        this.collisionPolygon.setScale(this.getScaleX(), this.getScaleY());
    },
    setWidth: function (w) {
        this._super(w);
        this.collisionPolygon.setScaleX(this.getScaleX());
    },
    setHeight: function (h) {
        this._super(h);
        this.collisionPolygon.setScaleY(this.getScaleY());
    },
    setOrigin: function (x, y) {
        var delta = this._super(x, y);
        var colPol = this.collisionPolygon;

        this._vector.x = delta[0] + colPol.offset.x;
        this._vector.y = delta[1] + colPol.offset.y;
        colPol.setOffset(this._vector);

        if (this.debugGraphics) {
            this.debugGraphics.pivot.x -= delta[0] / colPol.scale.x;
            this.debugGraphics.pivot.y -= delta[1] / colPol.scale.y;
        }
    },
    synchCollisionPolygon: function () {
        var colPol = this.collisionPolygon;

        // Synch position.
        colPol.pos.x = this.position.x;
        colPol.pos.y = this.position.y;

        // Synch scale.
//        if (this.scale.x !== colPol.scale.x) {
//            this.collisionPolygon.setScaleX(this.scale.x);
//        }
//        if (this.scale.y !== colPol.scale.y) {
//            this.collisionPolygon.setScaleY(this.scale.y);
//        }

        // Synch rotation.
        if (this.getRotation() !== colPol.angle)
            colPol.setAngle(this.getRotation());

        if (this.debugGraphics) {
            this.updateDebug();
        }
    },
    removeFromLevel: function () {
        if (this.debugGraphics) {
            this.level.debugLayer.removeChild(this.debugGraphics);
            this.debugGraphics = null;
        }
        this._super();
    },
    // UTILS
    aabbWidth: function () {
        return this.collisionPolygon.getWidth();
    },
    aabbHeight: function () {
        return this.collisionPolygon.getHeight();
    },
    aabbBottom: function () {
        return this.collisionPolygon.getBottom();
    },
    aabbTop: function () {
        return this.collisionPolygon.getTop();
    },
    aabbLeft: function () {
        return this.collisionPolygon.getLeft();
    },
    aabbRight: function () {
        return this.collisionPolygon.getRight();
    },
    aabbCenterX: function () {
        return this.collisionPolygon.getCenterX();
    },
    aabbCenterY: function () {
        return this.collisionPolygon.getCenterY();
    },
    aabbOverlapsSegment: function (axis, a, b) {
        if (axis === "y") {
            return (this.aabbTop() < b && this.aabbBottom() > a);
        } else if (axis === "x") {
            return (this.aabbLeft() < b && this.aabbRight() > a);
        }
    },
    aabbOverlapsEntity: function (entity) {
        return (this.aabbTop() < entity.aabbBottom() && this.aabbBottom() > entity.aabbTop()
                && this.aabbLeft() < entity.aabbRight() && this.aabbRight() > entity.aabbLeft());
    }
});
