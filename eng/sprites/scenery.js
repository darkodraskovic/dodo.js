A_.SCENERY.TiledSprite = Class.extend({
    init: function (parent, props) {
        this.level = parent.level;
        
        for (var prop in props) {
            this[prop] = props[prop];
        }

        if (this.image) {
//            this.image = "graphics/" + A_.level.directoryPrefix + this.image;
            this.image = "graphics/" + this.level.directoryPrefix + this.image;
        }
        var texture = new PIXI.Texture.fromImage(this.image);
        
        if (!this.width) {
            this.width = 512;
        }
        if (!this.height) {
            this.height = 512;
        }
        this.sprite = new PIXI.TilingSprite(texture, this.width, this.height);
    },
    position: function (x, y) {
        this.position.x = x;
        this.position.y = y;
    }    
});


