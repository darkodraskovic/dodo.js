(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("diskette1",
{ "height":32,
 "layers":[
        {
         "height":32,
         "image":"..\/..\/graphics\/diskette\/sky.png",
         "name":"Background",
         "opacity":1,
         "properties":
            {
             "active":"true",
             "parallax":"0",
             "velocityX":"7",
             "velocityY":"0"
            },
         "type":"imagelayer",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }, 
        {
         "color":"#bee0ff",
         "draworder":"topdown",
         "height":32,
         "name":"Sky",
         "objects":[
                {
                 "height":96,
                 "name":"Sun",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"ScenerySun",
                 "visible":true,
                 "width":96,
                 "x":192,
                 "y":320
                }],
         "opacity":1,
         "properties":
            {
             "parallax":"5"
            },
         "type":"objectgroup",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }, 
        {
         "color":"#55aaff",
         "draworder":"topdown",
         "height":32,
         "name":"Buildings",
         "objects":[
                {
                 "height":64,
                 "name":"Pyramid",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"SceneryPyramid",
                 "visible":true,
                 "width":64,
                 "x":544,
                 "y":744
                }, 
                {
                 "height":64,
                 "name":"Pyramid",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"SceneryPyramid",
                 "visible":true,
                 "width":64,
                 "x":888,
                 "y":840
                }, 
                {
                 "height":64,
                 "name":"Pyramid",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"SceneryPyramid",
                 "visible":true,
                 "width":64,
                 "x":112,
                 "y":856
                }],
         "opacity":1,
         "properties":
            {
             "parallax":"10"
            },
         "type":"objectgroup",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }, 
        {
         "data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
         "height":32,
         "name":"Blocks",
         "opacity":1,
         "properties":
            {
             "baked":"true",
             "collisionResponse":"\"static\"",
             "image":"\"blocks.png\""
            },
         "type":"tilelayer",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":32,
         "name":"Dynamics",
         "opacity":1,
         "properties":
            {
             "baked":"true",
             "collisionResponse":"\"static\"",
             "image":"\"dynamics.png\""
            },
         "type":"tilelayer",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "height":32,
         "name":"Entities",
         "objects":[
                {
                 "height":68,
                 "name":"Player",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Player",
                 "visible":true,
                 "width":40,
                 "x":1320,
                 "y":456
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":504
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1224,
                 "y":488
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":392,
                 "y":328
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":456
                }, 
                {
                 "height":32,
                 "name":"Foo",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1408,
                 "y":952
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":408
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":360
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":840,
                 "y":808
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":264
                }, 
                {
                 "height":32,
                 "name":"Bar",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1008,
                 "y":824
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1440,
                 "y":960
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":384,
                 "y":960
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":168
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":208
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":312
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":840,
                 "y":744
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":840,
                 "y":680
                }, 
                {
                 "height":32,
                 "name":"Springer",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":376,
                 "y":704
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":696,
                 "y":104
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":928,
                 "y":360
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":992,
                 "y":504
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":896,
                 "y":360
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":992,
                 "y":464
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":928,
                 "y":448
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":928,
                 "y":504
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":960,
                 "y":960
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1144,
                 "y":464
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":392,
                 "y":368
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1264,
                 "y":944
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":896,
                 "y":504
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":896,
                 "y":456
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":896,
                 "y":408
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":928,
                 "y":408
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1376,
                 "y":488
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":960,
                 "y":504
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":896,
                 "y":312
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1024,
                 "y":504
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":960,
                 "y":408
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":960,
                 "y":456
                }, 
                {
                 "height":32,
                 "name":"Diskette",
                 "properties":
                    {

                    },
                 "rotation":0,
                 "type":"Diskette",
                 "visible":true,
                 "width":32,
                 "x":1416,
                 "y":496
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":48,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/..\/graphics\/diskette\/blocks.png",
         "imageheight":32,
         "imagewidth":192,
         "margin":0,
         "name":"blocks",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":32,
         "tilewidth":32
        }, 
        {
         "firstgid":43,
         "image":"..\/..\/graphics\/diskette\/dynamics.png",
         "imageheight":32,
         "imagewidth":160,
         "margin":0,
         "name":"dynamics",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":48
});