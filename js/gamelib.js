			// *** Global library values, set keyboard handler to keep track of key up/down status.
		function getRandomArbitrary(minn, maxn) {
			return chance.floating({min: minn, max: maxn});
		}

		function getRandomInt(minn, maxn) {
			return chance.integer({min: minn, max: maxn});
		}

		var randx36 = function() {
		    return Math.random().toString(36).substr(2); // remove `0.`
		};

		var tokenx36 = function() {
		    return randx36() + randx36(); // to make it longer
		};

		function xpLevelUpAmt(l)
		{
			return 100 * Math.pow(2, l - 2);
		}

		var regionColours = [
			"#f00"
			,"#00f"
			,'#0f0'
			,"#f0f"
			,"#ff0"
			,"#0ff"
			,"#a00"
		];

		// *** Models and Views *********************************

		// ModelJSON is the base model for fetching game/object data from the server.
		var ModelJSON = Backbone.Model.extend({
			contentJSON: []
			,contentURL: ""
			,title: ""
			,contentStatus: 0
			,contentStatus_CodeList: { 0: 'Empty', 1: 'AJAXPending', 2: 'AJAXFailed', 3: 'Ready' }
			,onComplete: function () {}
			,load: function (contentURL)
			{
				this.contentJSON = [];
				this.contentURL = contentURL;
				var me = this;
				if (me.contentURL.length == 0) { return; }
				$.ajax({
					url: me.contentURL
					,dataType: 'json'
					,error: function () {
						me.contentJSON = [];
						console.log("ModelJSON: AJAX Error.");
						me.contentStatus = 2;
					}
					,success: function (d) {
						me.contentJSON = d;
						me.contentStatus = 3;
						me.onComplete();
					}
				});
			}
		});
		


		var ModelTileset = Backbone.Model.extend({
			name: "Tileset"
			,url: ""
			,image: undefined
			,tilewidth: 32
			,tileheight: 32
			,coordlist: undefined
			,load: function (url)
			{
				this.image = new Image();
				if (url == undefined)
				{
					url = this.url + "?v=" + tokenx36();
				}
				this.image.src = url;
				this.coordlist = [
					{"name": "Sea", "layer": 0, "x": 1, "y": 1, "movecost": 1, "fertility": 0,  "excludeIDs": [], "colour": "#28e", "bgImage": "image/bg_swampland.png"}
					,{"name": "Grass", "layer": 0, "x": 2, "y": 1, "movecost": 2, "fertility": 3,  "excludeIDs": [], "colour": "#8e5", "bgImage": "image/bg_swampland.png"}
					,{"name": "Plains", "layer": 0, "x": 3, "y": 1, "movecost": 2, "fertility": 2, "excludeIDs": [], "colour": "#9f4", "bgImage": "image/bg_swampland.png"}
					,{"name": "Desert", "layer": 0, "x": 4, "y": 1, "movecost": 2, "fertility": 2, "excludeIDs": [], "colour": "#dd9", "bgImage": "image/bg_swampland.png"}
					,{"name": "Roads", "layer": 1, "x": 8, "y": 4, "movecost": -2, "fertility": 0, "excludeIDs": [0], "colour": "#dd9", "bgImage": "image/bg_swampland.png"}	
					,{"name": "Forest", "layer": 1, "x": 10, "y": 1, "movecost": 2, "fertility": 1, "excludeIDs": [0], "colour": "#00a500", "bgImage": "image/bg_swampland.png"}
					,{"name": "Hills", "layer": 2, "x": 2, "y": 2, "movecost": 2, "fertility": -1, "excludeIDs": [0], "colour": "#dd9", "bgImage": "image/bg_swampland.png"}
					,{"name": "Mountains", "layer": 2, "x": 1, "y": 2, "movecost": 3, "fertility": -1, "excludeIDs": [0], "colour": "#bbb", "bgImage": "image/bg_swampland.png"}
					,{"name": "Crops", "layer": 1, "x": 4, "y": 2, "movecost": 0, "fertility": 3, "excludeIDs": [0], "colour": "#fdd", "bgImage": "image/bg_swampland.png"}
					,{"name": "Town", "layer": 2, "x": 1, "y": 3, "movecost": -1, "fertility": 0, "excludeIDs": [0], "colour": "#000", "bgImage": "image/bg_swampland.png"}
					,{"name": "City", "layer": 2, "x": 2, "y": 3, "movecost": -2, "fertility": 0, "excludeIDs": [0], "colour": "#000", "bgImage": "image/bg_swampland.png"}
					,{"name": "Metropolis", "layer": 2, "x": 3, "y": 3, "movecost": -2, "fertility": 0, "excludeIDs": [0], "colour": "#000", "bgImage": "image/bg_swampland.png"}
					,{"name": "Fog of War", "layer": 2, "x": 1, "y": 4, "movecost": 0, "fertility": 0, "excludeIDs": [], "colour": "#555", "bgImage": "image/bg_swampland.png"}
					,{"name": "Dead Forest", "layer": 2, "x": 9, "y": 4, "movecost": 1, "fertility": 0, "excludeIDs": [0], "colour": "#dc0", "bgImage": "image/bg_swampland.png"}
					,{"name": "River", "layer": 1, "x": 4, "y": 4, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "River East/West", "layer": 1, "x": 3, "y": 2, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "River North/South", "layer": 1, "x": 3, "y": 2, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "Riverbend West to North", "layer": 1, "x": 3, "y": 2, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "Riverbend South to West", "layer": 1, "x": 3, "y": 2, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "Riverbend East to North", "layer": 1, "x": 3, "y": 2, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "Riverbend South to East", "layer": 1, "x": 3, "y": 2, "movecost": -1, "fertility": 2, "excludeIDs": [0], "colour": "#00f", "bgImage": "image/bg_swampland.png"}
					,{"name": "Woods (Sparce)", "layer": 1, "x": 5, "y": 2, "movecost": 2, "fertility": 1, "excludeIDs": [0], "colour": "#00a500", "bgImage": "image/bg_swampland.png"}
					,{"name": "Woods", "layer": 1, "x": 6, "y": 2, "movecost": 2, "fertility": 1, "excludeIDs": [0], "colour": "#00a500", "bgImage": "image/bg_swampland.png"}
					,{"name": "Woods (Dense)", "layer": 1, "x": 7, "y": 2, "movecost": 2, "fertility": 1, "excludeIDs": [0], "colour": "#00a500", "bgImage": "image/bg_swampland.png"}
					,{"name": "Swamp", "layer": 0, "x": 13, "y": 5, "movecost": 4, "fertility": 1, "excludeIDs": [0], "colour": "#0fa", "bgImage": "image/bg_swampland.png"}
					,{"name": "Wall", "layer": 2, "x": 14, "y": 10, "movecost": 99, "fertility": 1, "excludeIDs": [0], "colour": "#ccc", "bgImage": "image/bg_swampland.png"}
					,{"name": "Wall Gate - Open", "layer": 2, "x": 14, "y": 10, "movecost": 0, "fertility": 1, "excludeIDs": [0], "colour": "#ccc", "bgImage": "image/bg_swampland.png"}
					,{"name": "Wall Gate - Closed", "layer": 2, "x": 14, "y": 10, "movecost": 99, "fertility": 1, "excludeIDs": [0], "colour": "#ccc", "bgImage": "image/bg_swampland.png"}
					,{"name": "Plantation", "layer": 2, "x": 14, "y": 9, "movecost": 99, "fertility": 1, "excludeIDs": [0], "colour": "#c00", "bgImage": "image/bg_swampland.png"}
				];
			}
			,addTile: function (name, tx, ty, l, mc)
			{
				this.coordlist.push({"name": name, "x": tx, "y": ty, "layer": l, "movecost": mc});
			}
			,getTile: function (i)
			{
				if (this.coordlist[i] != undefined) { return this.coordlist[i]; }
				return false;
			}
			,getTileByName: function (name)
			{
				var found = false;
				var index = 0;
				for (var i=0; i<this.coordlist.length; i++)
				{
					if (this.coordlist[i].name == name)
					{
						found = true; index = i;
						break;
					}
				}
				if (!found)
				{
					console.log("Error: getTile(" + name + ") not found.");
					return;
				}
				return this.coordlist[i];
			}
			,getIndexByName: function (name)
			{
				var found = false;
				var index = 0;
				for (var i=0; i<this.coordlist.length; i++)
				{
					if (this.coordlist[i].name == name)
					{
						found = true; index = i;
						break;
					}
				}
				if (!found)
				{
					console.log("Error: getTile(" + name + ") not found.");
					return 0;
				}
				return index;
			}
			,getIndex: function (i)
			{
				if (this.coordlist[i] != undefined)
				{
					return this.coordlist[i];
				}
				return false;
			}
			,countTiles: function()
			{
				return this.coordlist.length;
			}
		});

		var ModelMap = Backbone.Model.extend({
			name: "Map"
			,url: ""
			,mapwidth: 64
			,mapheight: 64
			,maplayers: 3
			,seed: undefined
			,tiles: []
			,units: []
			,objects: []

			// Map generation settings
			,voronoi_max: 128
			,voronoi_min: 96
			,voronoi: []
			,voronoi_colours: []
			,max_height: 10
			,min_height: 0
			,sea_height: 3.3
			,mountain_height: 9.8
			,hills_tolerance: 0.9		// Subtracted from the height in the mountain scenario, higher threshold means more frequent hills.
			,forest_tolerance: 1		
			,desert_tolerance: 2		// Number of desert squares that must be surrounding the tile before it's downgraded to a desert (out of 8)
			,riverCount: 6
			,grass_tolerance: 2
			
			,voronoi_distribution: 'normal'

			,randomizeVoronoi: function()
			{

				var name = "Unnamed";
				var v = {
					"height": height
					, "x": 0
					, "y": 0
					, "tolerance": 0.1
					, "name": name
					, "city": undefined
				};
				this.voronoi.push(v);
				v.x = this.mapwidth;
				this.voronoi.push(v);
				v.y = this.mapheight;
				v.x = 0;
				this.voronoi.push(v);				
				v.y = this.mapheight;
				v.x = this.mapwidth;
				this.voronoi.push(v);
				v.y = 0;
				v.x = parseInt(this.mapwidth / 2);
				this.voronoi.push(v);
				v.y = parseInt(this.mapheight / 2);
				v.x = 0;
				this.voronoi.push(v);
				v.y = this.mapheight;
				v.x = parseInt(this.mapwidth / 2);
				this.voronoi.push(v);
				v.y = parseInt(this.mapheight / 2);
				v.x = this.mapwidth;
				this.voronoi.push(v);
			
				var voronoi_max = getRandomInt(this.voronoi_min, this.voronoi_max);
				for (var i=0; i < voronoi_max; i++)
				{
					var name = "Unnamed";
					var height = getRandomArbitrary(this.min_height, this.max_height);

					var x = parseInt(chance.normal({mean: this.mapwidth / 2, dev: this.mapwidth * 0.4}));
					var y = parseInt(chance.normal({mean: this.mapheight / 2, dev: this.mapheight * 0.4}));

					if (x > this.mapwidth - 12)
					{
						height = 0;
					}
					if (y > this.mapheight - 12)
					{
						height = 0;
					}
					if (x < 12)
					{
						height = 0;
					}
					if (y < 12)
					{
						height = 0;
					}

					var tolerance = 0.1;
					var v = {
						"height": height
						, "x": x
						, "y": y
						, "tolerance": tolerance
						, "name": name
						, "city": undefined
					};
					this.voronoi.push(v);
					this.voronoi_colours.push(chance.pick(regionColours));
				}
			}

			,distance: function(p1, p2)
			{
				return Math.sqrt(
						(p2.x - p1.x) * (p2.x - p1.x)
						+ (p2.y - p1.y) * (p2.y - p1.y)
					);
			}

			,generate: function()
			{
				if (this.seed == undefined)
				{
					this.seed = chance.integer({min: 0, max: 9007199254740992});
				}
				chance = new Chance(this.seed);
				this.clear();
				this.voronoi = [];
				this.voronoi_colours = [];
				// Loop through each map point and calculate the closest voronoi neighbour, then
				// sample the voronoi point's height and add a random tolerance +/- that point's
				// value.
				this.randomizeVoronoi();
				
				var sea = this.tset.getIndexByName("Sea");
				var grass = this.tset.getIndexByName("Grass");
				var mountain = this.tset.getIndexByName("Mountains");
				var hill = this.tset.getIndexByName("Hills");

				for (var j=0; j < this.mapheight; j++)
				{
					for (var i=0; i < this.mapwidth; i++)
					{
						var closest = 0;
						var maxd = this.mapwidth * this.mapheight;
						var dist = Math.floor(this.distance(this.voronoi[closest], {x: i, y: j}));
						for (var v=1; v < this.voronoi.length; v++)
						{
							var ndist = Math.floor(this.distance(this.voronoi[v], {x: i, y: j}));
							if (ndist < dist)
							{
								dist = ndist;
								closest = v;
							}
						}
						var closestHeight = this.voronoi[closest].height + getRandomArbitrary(-1, 1);
						if (closestHeight < this.sea_height)
						{
							this.set(i,j,sea,0); // Set the tile to Sea if it's below sea level.
						}
						else if (closestHeight > this.mountain_height)
						{
							this.set(i,j,grass,0); // Set the tile to Grass if it's above sea level.
							this.set(i,j,mountain,2); // Set the tile on layer 2 to Mountain
						}
						else if (closestHeight > this.mountain_height - this.hills_tolerance)
						{
							this.set(i,j,grass,0); // Set the tile to Grass if it's above sea level.
							this.set(i,j,hill,2); // Set the tile on layer 2 to Hill
						}						
						else if (closestHeight > this.sea_height)
						{
							var tID = getRandomInt(1, 2);
							this.set(i,j,tID,0); // Set the tile to Grass or Plains if it's above sea level.
						}
						this.setVoronoi(i, j, closest);
						this.setHeight(i, j, closestHeight);
						this.setOwner(i, j, -1);
					}
				}
				
				//this.createRivers();
				
				this.doBiomes();

				// this.regionGeoTypes();
			}
			,regionGeoTypes: function()
			{
				for (var j=0; j < this.mapheight; j++)
				{
					for (var i=0; i < this.mapwidth; i++)
					{
					
						
						
					}
				}
			}
			,evolveBiomes: function()
			{
				var sea = this.tset.getIndexByName("Sea");
				var grass = this.tset.getIndexByName("Grass");
				var river = this.tset.getIndexByName("River");
				var desert = this.tset.getIndexByName("Desert");
				var forest = this.tset.getIndexByName("Woods");
				var plains = this.tset.getIndexByName("Plains");

				for (var j=0; j < this.mapheight; j++)
				{
					for (var i=0; i < this.mapwidth; i++)
					{
					
						var seaCount = 0;
						if (this.get(i - 1, j    , 0).tileid == sea) { seaCount++; }
						if (this.get(i + 1, j    , 0).tileid == sea) { seaCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == sea) { seaCount++; }
						if (this.get(i    , j - 1, 0).tileid == sea) { seaCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == sea) { seaCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == sea) { seaCount++; }
						if (this.get(i    , j + 1, 0).tileid == sea) { seaCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == sea) { seaCount++; }

						var riverCount = 0;
						if (this.get(i - 1, j    , 1).tileid == river) { riverCount++; }
						if (this.get(i + 1, j    , 1).tileid == river) { riverCount++; }
						if (this.get(i - 1, j - 1, 1).tileid == river) { riverCount++; }
						if (this.get(i    , j - 1, 1).tileid == river) { riverCount++; }
						if (this.get(i + 1, j - 1, 1).tileid == river) { riverCount++; }
						if (this.get(i - 1, j + 1, 1).tileid == river) { riverCount++; }
						if (this.get(i    , j + 1, 1).tileid == river) { riverCount++; }
						if (this.get(i + 1, j + 1, 1).tileid == river) { riverCount++; }
						
						var desertCount = 0;
						if (this.get(i - 1, j    , 0).tileid == desert) { desertCount++; }
						if (this.get(i + 1, j    , 0).tileid == desert) { desertCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == desert) { desertCount++; }
						if (this.get(i    , j - 1, 0).tileid == desert) { desertCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == desert) { desertCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == desert) { desertCount++; }
						if (this.get(i    , j + 1, 0).tileid == desert) { desertCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == desert) { desertCount++; }

						var grassCount = 0;
						if (this.get(i - 1, j    , 0).tileid == grass) { grassCount++; }
						if (this.get(i + 1, j    , 0).tileid == grass) { grassCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == grass) { grassCount++; }
						if (this.get(i    , j - 1, 0).tileid == grass) { grassCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == grass) { grassCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == grass) { grassCount++; }
						if (this.get(i    , j + 1, 0).tileid == grass) { grassCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == grass) { grassCount++; }

						var forestCount = 0;
						if (this.get(i - 1, j    , 1).tileid == forest) { forestCount++; }
						if (this.get(i + 1, j    , 1).tileid == forest) { forestCount++; }
						if (this.get(i - 1, j - 1, 1).tileid == forest) { forestCount++; }
						if (this.get(i    , j - 1, 1).tileid == forest) { forestCount++; }
						if (this.get(i + 1, j - 1, 1).tileid == forest) { forestCount++; }
						if (this.get(i - 1, j + 1, 1).tileid == forest) { forestCount++; }
						if (this.get(i    , j + 1, 1).tileid == forest) { forestCount++; }
						if (this.get(i + 1, j + 1, 1).tileid == forest) { forestCount++; }
							
						if (
							forestCount > this.forest_tolerance
							&& this.get(i, j, 1).tileid != 5
							&& this.get(i, j, 1).tileid != 6
							&& this.get(i, j, 1).tileid != 13
						)
						{
							if (this.get(i, j, 0).tileid == grass)
							{
								// Grassland to Forest.
								this.set(i, j, forest, 1);
							}
							else if (this.get(i, j, 0).tileid == plains && (seaCount > 0 || forestCount > this.forest_tolerance * 4))
							{
								if (getRandomArbitrary(0, 1) > 0.6)
								{								// Plains to Forest.
									this.set(i, j, forest, 1);
								}
							}
						}
						if (
							(
								this.get(i, j, 0).tileid == 2
								&& this.get(i, j, 1).tileid == 13
							)
							|| (
								this.get(i, j, 0).tileid == plains && (riverCount > 0 || seaCount > 0) && grassCount > 0
							)
						)
						{
							this.set(i, j, grass, 0)		// Upgrade to grassland
						}
						
						// Prevent forests from becoming too blobby: random die-off
						if (forestCount > 4 && this.get(i, j, 1).tileid == forest)
						{
							if (getRandomArbitrary(0, 1) > 0.8)
							{
								if (getRandomInt(0, 5) == 0)
								{
									this.set(i, j, 12, 1);
								}
								else
								{
									this.set(i, j, 0, 1);
								}
							}
						}
						
					}
				}
			}
			,createRivers: function()
			{
				var maxChecks = 1000;
				var river = this.tset.getIndexByName("River");
				var sea = this.tset.getIndexByName("Sea");
				var hills = this.tset.getIndexByName("Hills");
				var mountains = this.tset.getIndexByName("Mountains");
				for (var r=0; r < this.riverCount; r++)
				{
					var complete = false;
					var x = 0; var y = 0;
					var dx = 0; var dy = 0;
					

					while(!complete && maxChecks > 0)
					{
						x = getRandomInt(0, this.mapwidth - 10) + 5;
						y = getRandomInt(0, this.mapheight - 10) + 5;

						var seaCount = 0;
						if (this.get(x - 1, y    , 0).tileid == sea) { seaCount++; }
						if (this.get(x + 1, y    , 0).tileid == sea) { seaCount++; }
						if (this.get(x - 1, y - 1, 0).tileid == sea) { seaCount++; }
						if (this.get(x    , y - 1, 0).tileid == sea) { seaCount++; }
						if (this.get(x + 1, y - 1, 0).tileid == sea) { seaCount++; }
						if (this.get(x - 1, y + 1, 0).tileid == sea) { seaCount++; }
						if (this.get(x    , y + 1, 0).tileid == sea) { seaCount++; }
						if (this.get(x + 1, y + 1, 0).tileid == sea) { seaCount++; }

						var riverCount = 0;
						if (this.get(x - 1, y    , 1).tileid == river) { riverCount++; }
						if (this.get(x + 1, y    , 1).tileid == river) { riverCount++; }
						if (this.get(x - 1, y - 1, 1).tileid == river) { riverCount++; }
						if (this.get(x    , y - 1, 1).tileid == river) { riverCount++; }
						if (this.get(x + 1, y - 1, 1).tileid == river) { riverCount++; }
						if (this.get(x - 1, y + 1, 1).tileid == river) { riverCount++; }
						if (this.get(x    , y + 1, 1).tileid == river) { riverCount++; }
						if (this.get(x + 1, y + 1, 1).tileid == river) { riverCount++; }

						if (
							(this.get(x, y, 2).tileid == hills
							|| this.get(x, y, 2).tileid == mountains)
							&& seaCount == 0
							&& riverCount == 0
							)
						{
							complete = true;
						}
						maxChecks--;
					}
					complete = false;
					maxChecks = 5000;
					while(!complete && maxChecks > 0)
					{
						this.set(x, y, river, 1);
						var tile = this.get(x, y, 0);
						var left = this.get(x - 1, y, 0);
						var right = this.get(x + 1, y, 0);
						var up = this.get(x, y - 1, 0);
						var down = this.get(x, y + 1, 0);
						
						var heights = [];
						heights.push(left.height);
						heights.push(right.height);
						heights.push(up.height);
						heights.push(down.height);
						
						heights.sort(function compareNumbers(a, b) {
							return a - b;
						});

						if (left.height == heights[0] && this.get(x - 1, y, 1).tileid != river)
						{
							x--;
							dx = -1;
							dy = 0;
						}
						else if (up.height == heights[0] && this.get(x, y - 1, 1).tileid != river)
						{
							y--;
							dy = -1;
							dx = 0;
						}
						else if (down.height == heights[0] && this.get(x, y + 1, 1).tileid != river)
						{
							y++;
							dy = 1;
							dx = 0;
						}
						else if (right.height == heights[0] && this.get(x + 1, y, 1).tileid != river)
						{
							x++;
							dx = 1;
							dy = 0;
						}

						
						if (this.get(x, y, 0).tileid == 0
							|| x < 0 || y < 0
							|| x > this.mapwidth || y > this.mapheight)
						{
							complete = true;
						}
						else
						{
							var gh = this.get(x + dx, y + dy, 0).height - 0.2;
							this.setHeight(x + dx, y + dy, gh);
							//this.set(x, y, 13, 1);
						}
						maxChecks--;
						
					}

				}
			}
			,doBiomes: function()
			{
				for (var j=0; j < this.mapheight; j++)
				{
					for (var i=0; i < this.mapwidth; i++)
					{
					
						var seaCount = 0;
						if (this.get(i - 1, j    , 0).tileid == 0) { seaCount++; }
						if (this.get(i + 1, j    , 0).tileid == 0) { seaCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == 0) { seaCount++; }
						if (this.get(i    , j - 1, 0).tileid == 0) { seaCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == 0) { seaCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == 0) { seaCount++; }
						if (this.get(i    , j + 1, 0).tileid == 0) { seaCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == 0) { seaCount++; }

						var desertCount = 0;
						if (this.get(i - 1, j    , 0).tileid == 2) { desertCount++; }
						if (this.get(i + 1, j    , 0).tileid == 2) { desertCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i    , j - 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i    , j + 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == 2) { desertCount++; }

						var riverCount = 0;
						if (this.get(i - 1, j    , 1).tileid == 13) { riverCount++; }
						if (this.get(i + 1, j    , 1).tileid == 13) { riverCount++; }
						if (this.get(i - 1, j - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i    , j - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i + 1, j - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i - 1, j + 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i    , j + 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i + 1, j + 1, 1).tileid == 13) { riverCount++; }
						
						var grassCount = 0;
						if (this.get(i - 1, j    , 0).tileid == 1) { grassCount++; }
						if (this.get(i + 1, j    , 0).tileid == 1) { grassCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == 1) { grassCount++; }
						if (this.get(i    , j - 1, 0).tileid == 1) { grassCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == 1) { grassCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == 1) { grassCount++; }
						if (this.get(i    , j + 1, 0).tileid == 1) { grassCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == 1) { grassCount++; }
													
						if ( // Check to see if there are any water tiles within immediate surrounding 8 tiles.
							(seaCount > 0
							|| riverCount > 0)
							&& this.get(i, j, 1).tileid != 13 // Don't replace a river tile.
						)
						{
							// There is one sea square within the 8 surrounding, upgrade the tile.
							// Desert becomes grassland, grassland grows forest.
							if (this.get(i, j, 0).tileid == 2)
							{
								// Desert to Grass
								this.set(i, j, 1, 0);
							}
							else if (this.get(i, j, 0).tileid == 1
								&& (seaCount > this.forest_tolerance
									|| riverCount > this.forest_tolerance))
							{
								// Grass to Forest.
								this.set(i, j, 4, 1);
							}
						}
						
						if (this.get(i, j, 0).tileid == 0
							&& grassCount >= 5
						)
						{ 
							this.set(i, j, 0, 25); // Set surrounded landlocked tiles to swamp to help avoid
										// strange river terminals
						}
						
						if ( // Check to see if there are any desert tiles within the immediate surrounding 8 tiles.
							desertCount > this.desert_tolerance
							&& this.get(i, j, 0).tileid == 1
						)
						{
							this.set(i, j, 0, 2);
						}
							
						
					}
				}
			}
			,fertility: function(x, y)
			{
				// Return the aggregate of all layers' fertility values
				
				var tile = this.get(x, y, 0);
				var tile1 = this.get(x, y, 1);
				var tile2 = this.get(x, y, 2);
				var f = parseInt(this.tset.getTile(tile.tileid).fertility)
					+ parseInt(this.tset.getTile(tile1.tileid).fertility)
					+ parseInt(this.tset.getTile(tile2.tileid).fertility);
				return f;
			}
			,clear: function()
			{
				// Clear Tile/Unit/Object level data

				this.tiles = [];
				var layers = [];
				for (var k=0; k < this.maplayers; k++)
				{
					var tiles = [];
					for (var j=0; j < this.mapheight; j++)
					{
						var t = [];
						for (var i=0; i < this.mapwidth; i++)
						{
							t.push({"tileid": 0, "units": [], "voronoi": undefined, "objects": [], "discovered": [], "moisture": 0.0, "height": 0});
						}
						tiles.push(jQuery.extend(true, [], t));
					}
					layers.push(tiles);
				}
				this.tiles = layers;
			}
			,get: function (x, y, l) {
				if (this.tiles == undefined) { return false; }
				if (l == undefined) { l = 0; }
				if (this.tiles[l] == undefined) { return false; }
				if (this.tiles[l][y] == undefined)
				{
					return false;
				}				
				var t = this.tiles[l][y][x];
				if (t == undefined)
				{
					return false;
				}
				else
				{
					return t;
				}
			}
			,factoryMapPoint: function (
				i
				,units				// Units on the point.
				,v				// closest voronoi point (IE: which region the point belongs to)
				,h				// Altitude of the point.
				,objects			// Objects such as cities, plantations, fortifications, etc.
				,discovered			// Whether or not it's covered by Fog of War
				,moisture			// Moisture content of the point.
				,owner				// Whether or not the point is owned by a nation.
			)
			{
				return {"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture, "owner": owner};
			}
			,set: function (x, y, i, l)
			{
				if (l == undefined) { l = 0; }
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var units = this.tiles[l][y][x].units;
				var objects = this.tiles[l][y][x].objects;
				var discovered = this.tiles[l][y][x].discovered;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height; 
				var v = this.tiles[l][y][x].voronoi;
				var owner = this.tiles[l][y][x].owner;
				//{"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture, "owner": owner}
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;
			}
			,setOwner: function (x, y, owner)
			{
				if (owner == undefined)
				{
					owner = -1;
				}
				var l=0;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var i = this.tiles[l][y][x].tileid;
				var units = this.tiles[l][y][x].units;
				if (units == undefined) { return; }
				var objects = this.tiles[l][y][x].objects;
				var discovered = this.tiles[l][y][x].discovered;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height;
				var v = this.tiles[l][y][x].voronoi;
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;	
			}
			,setObject: function (x, y, obj)
			{
				if (obj == undefined)
				{
					//alert(obj);
					return;
				}
				var l=0;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var i = this.tiles[l][y][x].tileid;
				var units = this.tiles[l][y][x].units;
				if (units == undefined) { return; }
				this.tiles[l][y][x].objects = obj;
				var objects = jQuery.extend(true, {}, obj);
				// objects.push(obj); // Use this assignment for addObject
				var discovered = this.tiles[l][y][x].discovered;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height;
				var v = this.tiles[l][y][x].voronoi;
				var owner = this.tiles[l][y][x].owner;
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;	
			}
			,setVoronoi: function (x, y, v)
			{
				var l=0;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var i = this.tiles[l][y][x].tileid;
				var units = this.tiles[l][y][x].units;
				if (units == undefined) { return; }
				var objects = this.tiles[l][y][x].objects;
				var discovered = this.tiles[l][y][x].discovered;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height;
				var owner = this.tiles[l][y][x].owner;
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;	
			}
			,setMoisture: function (x, y, m)
			{
				var l=0;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var i = this.tiles[l][y][x].tileid;
				var units = this.tiles[l][y][x].units;
				if (units == undefined) { return; }
				var objects = this.tiles[l][y][x].objects;
				var discovered = this.tiles[l][y][x].discovered;
				var v = this.tiles[l][y][x].voronoi;
				var h = this.tiles[l][y][x].height;
				var owner = this.tiles[l][y][x].owner;
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": m, "owner": owner});
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;	
			}
			,setHeight: function (x, y, h)
			{
				var l=0;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				if (this.tiles[l][y][x] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var i = this.tiles[l][y][x].tileid;
				var units = this.tiles[l][y][x].units;
				if (units == undefined) { return; }
				var objects = this.tiles[l][y][x].objects;
				var discovered = this.tiles[l][y][x].discovered;
				var moisture = this.tiles[l][y][x].moisture;
				var v = this.tiles[l][y][x].voronoi;
				var owner = this.tiles[l][y][x].owner;
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;	
			}
			,setDiscovered: function (x, y, d)
			{
				if (isNaN(x) || isNaN(y)) { return; }
				if (x < 0) { x = 0 }
				if (x >= this.mapwidth) { x = this.mapwidth - 1 }
				if (y < 0) { y = 0 }
				if (y >= this.mapheight) { y = this.mapwidth - 1 }
				var l = 2;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var units = this.tiles[l][y][x].units;
				var objects = this.tiles[l][y][x].objects;
				var i = this.tiles[l][y][x].tileid;
				var discovered = this.tiles[l][y][x].discovered;
				discovered[d] = true;
				var v = this.tiles[l][y][x].voronoi;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height;
				var owner = this.tiles[l][y][x].owner;
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;
			}
			,setObscured: function (x, y, d)
			{
				if (isNaN(x) || isNaN(y)) { return; }
				if (x < 0) { x = 0 }
				if (x >= this.mapwidth) { x = this.mapwidth - 1 }
				if (y < 0) { y = 0 }
				if (y >= this.mapheight) { y = this.mapwidth - 1 }
				var l = 2;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var units = this.tiles[l][y][x].units;
				var objects = this.tiles[l][y][x].objects;
				var i = this.tiles[l][y][x].tileid;
				var discovered = this.tiles[l][y][x].discovered;
				discovered[d] = false;
				var v = this.tiles[l][y][x].voronoi;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height;
				var owner = this.tiles[l][y][x].owner;
				row.push(this.factoryMapPoint(i, units, v, h, objects, discovered, moisture, owner));
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;
			}
			,exploreAll: function(playerID)
			{
				for (var k=0; k<this.mapwidth; k++)
				{
					for (var i=0; i<this.mapheight; i++)
					{
						this.setDiscovered(i, k, playerID);
					}
				}
			}
			,exploreRegion: function(playerID, voronoiID)
			{
				for (var k=0; k<this.mapwidth; k++)
				{
					for (var i=0; i<this.mapheight; i++)
					{
						if (voronoiID == this.get(i, k, 0).voronoi)
						{
							this.setDiscovered(i, k, playerID);
						}
					}
				}
			}
			,setRegionOwner: function(playerID, voronoiID)
			{
				for (var k=0; k<this.mapwidth; k++)
				{
					for (var i=0; i<this.mapheight; i++)
					{
						if (voronoiID == this.get(i, k, 0).voronoi)
						{
							this.setOwner(i, k, playerID);
						}
					}
				}
			}
			,obscureAll: function(playerID)
			{
				for (var k=0; k<this.mapwidth; k++)
				{
					for (var i=0; i<this.mapheight; i++)
					{
						this.setObscured(i, k, playerID);
					}
				}
			}
			,exploreTile: function(x, y, unit)
			{
				var unitRange = unit.range;
				var ownerID = unit.ownerID;
				var x1 = x - unitRange;
				var y1 = y - unitRange;
				var x2 = x + 1 + unitRange;
				var y2 = y + 1 + unitRange;
				for (var k = y1; k < y2; k++)
				{
					for (var i = x1; i < x2; i++)
					{
						this.setDiscovered(i, k, ownerID);
					}
				}
			}
			,obscureTile: function(x, y, unit)
			{
				var unitRange = unit.range;
				var ownerID = unit.ownerID;
				var x1 = x - unitRange;
				var y1 = y - unitRange;
				var x2 = x + 1 + unitRange;
				var y2 = y + 1 + unitRange;
				for (var k = y1; k < y2; k++)
				{
					for (var i = x1; i < x2; i++)
					{
						this.setObscured(i, k, ownerID);
					}
				}
			}
			,addObject: function (x, y, object, l)
			{
				if (l == undefined) { l = 0; }
				if (this.tiles[l][y] == undefined)
				{
					return false;
				}
				this.tiles[l][y][x].objects.push(object);
			}
			,addUnit: function (x, y, unit)
			{
				var l = 0;
				unit.x = x;
				unit.y = y;
				var tile = this.get(x, y, l);
				var bp = this.voronoi[tile.voronoi].name;
				unit.citizen = new ModelCitizen({birthplace: bp, name: bp});
				
				if (this.tiles[l][y] == undefined)
				{
					return false;
				}
				this.tiles[l][y][x].units.push(unit);		
			}
			,removeUnit: function (x, y, unit)
			{
				var l = 0;
				x = parseInt(x);
				y = parseInt(y);
				var gi = this.getUnitIndex(x, y, unit);
				var units = this.getUnits(x, y);
				if (gi != undefined)
				{
					var newUnits = [];
					var rUnit = this.tiles[l][y][x].units[gi];
					for (var i=0; i < units.length; i++)
					{
						if (i != gi)
						{
							newUnits.push(units[i]);
						}
					}
					this.tiles[l][y][x].units = newUnits;
					return rUnit;
				}
			}
			,getUnit: function (x, y, i)
			{
				var units = this.getUnits(x, y);
				if (units == undefined) { return false; }
				return units[i];
			}
			,getUnits: function (x, y)
			{
				var l = 0;
				
				if (isNaN(x) || isNaN(y)) { return; }
				x = parseInt(x); y = parseInt(y);
				if (this.tiles[l] == undefined) { return; }
				var units = this.tiles[l][y][x].units;
				if (units == undefined)
				{
					return false;
				}
				else
				{
					return units;
				}
			}
			,getObjects: function (x, y)
			{
				var l = 0;
				
				if (isNaN(x) || isNaN(y)) { return; }
				x = parseInt(x); y = parseInt(y);
				if (this.tiles[l] == undefined) { return; }
				var objects = this.tiles[l][y][x].objects;
				if (objects == undefined)
				{
					return false;
				}
				else
				{
					return objects;
				}
			}
			,getCity: function (x, y, r)
			{
				if (r == undefined) { r = 2; }
				var l = 2;

				if (isNaN(x) || isNaN(y)) { return false; }
				x = parseInt(x); y = parseInt(y);
				if (this.tiles[l] == undefined) { return false; }

				var retval = [];

				if (r > 0)
				{
					for (var j = y - r; j < y + r; j++)
					{
						for (var k = x - r; k < x + r; k++)
						{
							if (j > 0 && j < this.mapheight
								&& k > 0 && k < this.mapwidth)
							{
								var objects = this.tiles[l][j][k].objects;
								if (objects == undefined)
								{
									//return false;
								}
								else
								{				
									if (objects.length > 0)
									{
										for (var i = 0; i < objects.length; i++)
										{
											if (objects[i].type == 'Town'
												|| objects[i].type == 'City'
												|| objects[i].type == 'Metropolis')
											{
												retval.push(objects[0]);
											}
										}
									}
									else
									{
										//return false;
									}
									//return false;
								}
							}
						}
					}
					if (retval.length > 0)
					{
						return retval;
					}
				}
				else
				{
					if (this.tiles[l][y] != undefined)
					{
						if (this.tiles[l][y][x] != undefined)
						{
							var objects = this.tiles[l][y][x].objects;
							if (objects == undefined)
							{
								return false;
							}
							else
							{				
								if (objects.length > 0)
								{
									for (var i = 0; i < objects.length; i++)
									{
										if (objects[i].type == 'Town'
											|| objects[i].type == 'City'
											|| objects[i].type == 'Metropolis')
										{
											return objects[0];
										}
									}
								}
								else
								{
									return false;
								}
								return false;
							}
						}
					}
				}
				
				return false;
			}
			,getUnitIndex: function (x, y, unit)
			{
				var units = this.getUnits(x, y);
				if (units == undefined) { return false; }
				
				for (var i=0; i < units.length; i++)
				{
					if (units[i] == unit)
					{
						return i;
					}
					else
					{
						return undefined;
					}
				}
			}
			,moveCost: function (x, y)
			{
				var tile0 = this.get(x, y, 0).tileid;
				var tile1 = this.get(x, y, 1).tileid;
				var tile2 = this.get(x, y, 2).tileid;
				
				var cost = 0;
				if (this.tset.tiledefs.contentJSON[tile0] != undefined)
				{
					cost += this.tset.tiledefs.contentJSON[tile0].movecost;
				}				
				if (this.tset.tiledefs.contentJSON[tile1] != undefined && tile1 > 0)
				{
					cost += this.tset.tiledefs.contentJSON[tile1].movecost;
				}				
				if (this.tset.tiledefs.contentJSON[tile2] != undefined && tile2 > 0)
				{
					cost += this.tset.tiledefs.contentJSON[tile2].movecost;
				}				
				return cost;
			}
			,moveUnit: function (x, y, unit, toX, toY)
			{
				x = parseInt(x);
				y = parseInt(y);
				toX = parseInt(toX);
				toY = parseInt(toY);
				var gu = this.getUnitIndex(x, y, unit);
				if (gu != undefined)
				{
					var destTileID = this.get(toX, toY, 0).tileid;
					var destTile = this.tset.getIndex(destTileID);

					if (unit.move_points - destTile.movecost > 0)
					{
						unit.move_points -= this.moveCost(toX, toY);
						if (unit.move_points <= 0)
						{
							unit.moving = false;
						}
						newUnit = jQuery.extend(true, {}, unit);
						this.obscureTile(x, y, unit);
						newUnit.move(toX, toY);
						this.addUnit(toX, toY, newUnit);
						this.removeUnit(x, y, unit);
						this.exploreTile(toX, toY, unit);
						return newUnit;
					}
				}
				// TODO: Iterate through the cities owned by that ownerID exploring each tile within that city's range
				// probably need to implement a condition on the explore/obscureTile methods to check if it's a city or unit type
				// and explore tiles appropriately (according to city's range. Probably larger ctiies have larger visible range);
				return unit;
			}
		});
		
		var ModelHistory = Backbone.Model.extend({
			name: "World History"
		});

		var ModelCitizen = Backbone.Model.extend({
			name: "Citizen"
			,url: ""
			,culture: undefined
			,birthplace: undefined
			,type: "Labourer"
			,xp: 0
			,level: 1
			,initialize: function (arg)
			{
				if (arg.type != undefined)
				{
					this.type = arg.type;
				}
				if (arg.xp != undefined)
				{
					this.xp = arg.xp;
				}
				if (arg.culture != undefined)
				{
					this.culture = arg.culture;
				}
				if (arg.level != undefined)
				{
					this.level = arg.level;
				}
				if (arg.birthplace != undefined)
				{
					this.birthplace = arg.birthplace;
				}
				if (arg.name != undefined)
				{
					this.name = arg.name;
				}
			}
		});
		
		var ModelUnitCitizen = Backbone.Model.extend({
			/*name: "Unit"
			,url: ""
			,ownerID: 0
			,citizen: undefined
			,abilities: undefined
			,inventory: []
			,x: 0
			,y: 0
			,offsetRate: 0.1
			,offsetx: 0
			,offsety: 0
			,destx: 0
			,desty: 0
			,weapon: undefined
			,armour: undefined
			,move_points: 0
			,range: 1
			,move_max: 0
			,max_troops: 100
			,attack: 1
			,attackRange: 1
			,health: 100
			,maxhealth: 100
			,spriteset: undefined
			,moving: true
			,bonusunitIDs: []*/
			doAI: function ()
			{
				// Default AI Function
				if (this.abilities.settle && this.move_points > 0)
				{
					var tile = map.mapdata.get(this.x, this.y, 0);

					var fertility = map.tset.getTile(tile.tileid).fertility;
					// If the settler is standing on a fertile tile, go ahead and settle,
					// otherwise pick the most promising direction and move.
					if (fertility > 0)
					{
						createSettlement(this.x, this.y, this);
					}
				}
				if (this.abilities.plow && this.move_points > 0)
				{
					var tile = map.mapdata.get(this.x, this.y, 0);
					if (tile.tileid != 25)
					{
						var city = map.mapdata.getCity(this.x, this.y);
						if (city)
						{
							$(this.el).find("#plow").show();
							var me = this;
							$(this.el).find("#plow").click(function () {
								me.unit.noOrders();
								map.mapdata.set(me.unit.x, me.unit.y, 7, 0);	// Crops
								map.mapdata.removeUnit(me.unit.x, me.unit.y, me.unit);
								city.units.push(me.unit);
								me.unit = undefined;
								me.hide();							
							});
						}
					}
				}
				if (this.abilities.buildWall && this.move_points > 0)
				{
					var tile = map.mapdata.get(this.x, this.y, 0);
					if (tile.tileid != 25)
					{
						var city = map.mapdata.getCity(this.x, this.y, 4);
						if (city)
						{
							$(this.el).find("#buildWall").show();
							var me = this;
							$(this.el).find("#buildWall").click(function () {
								me.unit.noOrders();
								map.mapdata.set(me.unit.x, me.unit.y, 26, 2);	// Wall section
								map.mapdata.removeUnit(me.unit.x, me.unit.y, me.unit);
								city.units.push(me.unit);
								me.unit = undefined;
								me.hide();							
							});
						}
					}
				}
				
				if (this.move_points > 0)
				{
					var up		= map.mapdata.get(this.x, this.y - 1, 1);
					var down	= map.mapdata.get(this.x, this.y + 1, 1);
					var left	= map.mapdata.get(this.x - 1, this.y, 1);
					var right	= map.mapdata.get(this.x + 1, this.y, 1);
					
					if (
						(up.tileid == 13 && down.tileid == 13)
					)
					{
						var rn = getRandomInt(0, 1);
						if (rn == 0)
						{
							map.moveUnit(this.x, this.y, this, this.x, this.y - 1);
						}
						else
						{
							map.moveUnit(this.x, this.y, this, this.x, this.y + 1);
						}
					}
					else if (
						(left.tileid != 13 && right.tileid == 13)
					)
					{
						var rn = getRandomInt(0, 1);
						if (rn == 0)
						{
							map.moveUnit(this.x, this.y, this, this.x - 1, this.y);
						}
						else
						{
							map.moveUnit(this.x, this.y, this, this.x + 1, this.y);
						}
					}
					else
					{
						var rn = getRandomInt(0, 3);
						if (rn == 0)
						{
							map.moveUnit(this.x, this.y, this, this.x - 1, this.y);
						}
						else if (rn == 1)
						{
							map.moveUnit(this.x, this.y, this, this.x + 1, this.y);
						}
						else if (rn == 2)
						{
							map.moveUnit(this.x, this.y, this, this.x, this.y - 1);
						}
						else if (rn == 3)
						{
							map.moveUnit(this.x, this.y, this, this.x, this.y + 1);
						}
					}
				}
			}
			,newTurn: function ()
			{
				if (this.ownerID == playerCurrent)
				{
					this.moving = true;
				}
				else
				{
					this.doAI();
					this.moving = false;
				}
				this.move_points = this.move_max;
			}
			,noOrders: function ()
			{
				this.move_points = 0;
				this.moving = false;
			}
			,initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 0;
				this.defense = 1;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Citizen";
				this.type = "Citizen";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 256, y: 896, w: 64, h: 64}
								]
							}
						]
					});
					
				this.moves = 5;
				this.health = 5;
				this.attack = 0;
				this.range = 2;
				this.defense = 1;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.cost = 10;
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;
				this.abilities = {
					"settle": true
				};
				this.ownerID = arg.ownerID;
			}
			,update: function()
			{
				if (this.moving && this.spriteset != undefined)
				{
					this.spriteset.frameAdvance();
				}
				//this.draw();
			}
			,move: function (x, y)
			{
				this.x = parseInt(x);
				this.y = parseInt(y);
			}
			,draw: function (x, y)
			{
				if (x == undefined)
				{
					x = this.x;
				}
				if (y == undefined)
				{
					y = this.y;				
				}
				this.spriteset.draw(x, y);
			}
		});
		
		var ModelUnitEngineer = ModelUnitCitizen.extend({
			initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 0;
				this.defense = 1;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Engineer";
				this.type = "Engineer";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 256, y: 768, w: 64, h: 64}
								]
							}
						]
					});
					
				this.moves = 5;
				this.health = 5;
				this.attack = 0;
				this.range = 2;
				this.defense = 1;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.cost = 10;
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;
				this.abilities = {
					"settle": false
					,"plow": true
				};
				this.ownerID = arg.ownerID;
			}
		});

		
		var ModelUnitEngineer = ModelUnitCitizen.extend({
			initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 0;
				this.defense = 1;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Engineer";
				this.type = "Engineer";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 256, y: 768, w: 64, h: 64}
								]
							}
						]
					});

				this.health = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;
				
				this.abilities = {
					"settle": false
					,"plow": true
				};
				this.ownerID = arg.ownerID;
			}
		});
		
		
		var ModelUnitRiflemen = ModelUnitCitizen.extend({
			initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 2;
				this.defense = 4;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Riflemen";
				this.type = "Riflemen";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 256, y: 640, w: 64, h: 64}
								]
							}
						]
					});
					
				this.health = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;

				this.abilities = {
					"settle": false
					,"plow": false
				};
				this.ownerID = arg.ownerID;
			}
		});

		var ModelUnitMechanizedInfantry = ModelUnitCitizen.extend({
			initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 2;
				this.defense = 4;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Mechanized Infantry";
				this.type = "Mechanized Infantry";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 0, y: 64, w: 64, h: 64}
								]
							}
						]
					});
					
				this.health = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;

				this.abilities = {
					"settle": false
					,"plow": false
				};
				this.ownerID = arg.ownerID;
			}
		});

		var ModelUnitTank = ModelUnitCitizen.extend({
			initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 2;
				this.defense = 4;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Tank";
				this.type = "Tank";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 0, y: 0, w: 64, h: 64}
								]
							}
						]
					});
					
				this.health = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;

				this.abilities = {
					"settle": false
					,"plow": false
				};
				this.ownerID = arg.ownerID;
			}
		});

		var ModelUnitArtillery = ModelUnitCitizen.extend({
			initialize: function (arg)
			{
				this.citizen = [];
				this.move_points = 3;
				this.move_max = 3;
				this.attack = 2;
				this.defense = 4;
				this.range = 2;
				this.health = 5;
				this.maxhealth = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costpopulation = 1;
				this.name = "Artillery";
				this.type = "Artillery";
				this.spriteset = new Spriteset({"url": "images/units.png", "spritedefs": [
							{name: "Unit", frames: [
									{x: 64, y: 0, w: 64, h: 64}
								]
							}
						]
					});
					
				this.health = 5;
				this.bonusunitIDs = [];
				this.excludetileIDs = [0];
				this.costitemIDs = [];
				this.costpopulation = 1;
				this.buildCost = 10;

				this.abilities = {
					"settle": false
					,"plow": false
				};
				this.ownerID = arg.ownerID;
			}
		});

// ***************** Item Definitions *****************		

		var ModelItem = Backbone.Model.extend({
			name: ""
			,description: ""
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: []
			,consumption: []
			,initialize: function(args)
			{
				if (args.name != undefined)
				{
					this.name = args.name;
				}
				if (args.description != undefined)
				{
					this.description = args.description;
				}
				if (args.qty != undefined)
				{
					this.qty = args.qty;
				}
			}
		});

		var ModelWheat = ModelItem.extend({
			name: "Wheat"
			,description: "Wheat is produced in farms, and can be exported and ground in mills into flour." 
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Farming"]
		});
		
		var ModelBeer = ModelItem.extend({
			name: "Beer"
			,variantName: ""
			,description: "Beer is produced at a brewers from wheat and satisfies the lower and middle classes."
			,url: ""
			,typeid: "food"
			,manufactureid: "brewery"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Brewery"]
		});
		
		var ModelRice = ModelItem.extend({
			name: "Rice"
			,description: "Rice is grown in farms and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Farming"]
		});

		var ModelCorn = ModelItem.extend({
			name: "Corn"
			,description: "Corn is grown on farms and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Farming"]
		});

		var ModelMutton = ModelItem.extend({
			name: "Mutton"
			,description: "Mutton is harvested from sheep grown on farms and can be exported as is, or sold on the market."
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Pastoralism"]
		});
				
		var ModelBeef = ModelItem.extend({
			name: "Beef"
			,description: "Beef is harvested from cows grown on farms and can be exported as is, or sold on the market."
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Pastoralism"]
		});
		
		var ModelApple = ModelItem.extend({
			name: "Apple"
			,description: "Apples are grown in orchards and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
				
		var ModelOrange = ModelItem.extend({
			name: "Fruit"
			,variantName: "Orange"
			,description: "Oranges are grown in groves and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
				
		var ModelCherry = ModelItem.extend({
			name: "Cherry"
			,description: "Cherries are grown in orchards and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});

		var ModelGrape = ModelItem.extend({
			name: "Fruit"
			,variantName: "Grape"
			,description: "Grapes are grown in vinyards and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "vinyard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Viticulture"]
		});
	
		var ModelPear = ModelItem.extend({
			name: "Fruit"
			,variantName: "Pear"
			,description: "Pears are grown in orchards and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
			
		var ModelOlive = ModelItem.extend({
			name: "Fruit"
			,variantName: "Olive"
			,description: "Olives are grown in groves and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "food"
			,manufactureid: "grove"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
		
		var ModelRawhide = ModelItem.extend({
			name: "Rawhide"
			,variantName: ""
			,description: "Rawhide is harvested from cows and sheep on farms and can be exported as is, or turned into other commodities."
			,url: ""
			,typeid: "material"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Pastoralism"]
		});
		
		var ModelWood = ModelItem.extend({
			name: "Wood"
			,variantName: ""
			,description: "Wood is harvested from a logging camp built on a patch of trees."
			,url: ""
			,typeid: "material"
			,manufactureid: "logging camp"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: []
		});
		
		var ModelLeather = ModelItem.extend({
			name: "Leather"
			,variantName: ""
			,description: "Leather is created out of rawhide from farms in tanneries and can be exported as is or turned into other commodities."
			,url: ""
			,typeid: "material"
			,manufactureid: "tannery"
			,consumption: ['rawhide']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Pastoralism"]
		});
		
		
		var ModelIronOre = ModelItem.extend({
			name: "Iron Ore"
			,variantName: ""
			,description: "Iron Ore is mined out of the ground in iron mines and can be smelted into Iron Ingots."
			,url: ""
			,typeid: "material"
			,manufactureid: "mine"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Iron Smelting"]
		});
		var ModelIronIngot = ModelItem.extend({
			name: "Iron Ingot"
			,variantName: ""
			,description: "Iron Ingots can be smelted out of Iron Ore in a Blacksmith and used to create other items."
			,url: ""
			,typeid: "material"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ore']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: true
			,weapon: false
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ['Iron Smelting']
		});
		var ModelIronSpear = ModelItem.extend({
			name: "Iron Spear"
			,variantName: ""
			,description: "Iron Spears are cheap and easy to produce, arming the majority of armies throughout history. They have good defense against horse and infanty but are vulnerable to ranged attack."
			,url: ""
			,typeid: "weapon"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ingot', 'Wood']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: true
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Blacksmithing"]
		});
		var ModelIronSword = ModelItem.extend({
			name: "Iron Sword"
			,variantName: ""
			,description: "Iron Swords are weapons of wealth and status, arming the elites and providing good offensive and defensive capabilities.  They are vulnerable to cavalry charge and like most infantry men, ranged attack."
			,url: ""
			,typeid: "weapon"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ingot', 'Iron Ingot']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: true
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Swordsmithing"]
		});
		var ModelIronHalberd = ModelItem.extend({
			name: "Iron Halberd"
			,description: "Iron Halberds are relatively cheap and easy to produce, frequently fielded by mercenaries and the moderately wealthy. An iron blade with a sturdy point attached to the end of a long wooden pole, they have good offensive and defensive capabilities against both cavalry and other infantry."
			,variantName: ""
			,url: ""
			,typeid: "weapon"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ingot', 'Iron Ingot', 'Wood']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: true
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Swordsmithing"]
		});
		var ModelIronHelm = ModelItem.extend({
			name: "Iron Helm"
			,variantName: ""
			,description: "Iron Helms protect from a quick death by braining."			
			,url: ""
			,typeid: "armor"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ingot', 'Iron Ingot']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: false
			,armor: false
			,helm: true
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Armorsmithing"]
		});
		var ModelIronMail = ModelItem.extend({
			name: "Iron Mail"
			,variantName: ""
			,url: ""
			,typeid: "armor"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ingot', 'Iron Ingot']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: false
			,armor: true
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Armorsmithing"]
		});
		var ModelIronPlatemail = ModelItem.extend({
			name: "Iron Platemail"
			,variantName: ""
			,url: ""
			,typeid: "armor"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Coal', 'Iron Ingot', 'Iron Ingot', 'Iron Ingot']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: false
			,armor: true
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Armorsmithing"]
		});
		var ModelIronShield = ModelItem.extend({
			name: "Iron Shield"
			,variantName: ""
			,url: ""
			,typeid: "armor"
			,manufactureid: "blacksmith"
			,consumption: ['Coal', 'Iron Ingot', 'Iron Ingot']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: false
			,armor: false
			,helm: false
			,shield: true
			,arrow: false
			,qty: 1
			,techRequirement: ["Armorsmithing"]
		});

		var ModelLeatherShield = ModelItem.extend({
			name: "Leather Shield"
			,variantName: ""
			,url: ""
			,typeid: "armor"
			,manufactureid: "leatherworker"
			,consumption: ['Rawhide', 'Wood']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: false
			,armor: false
			,helm: false
			,shield: true
			,arrow: false
			,qty: 1
			,techRequirement: ["Leatherworking"]
		});

		var ModelLeatherSling = ModelItem.extend({
			name: "Leather Sling"
			,variantName: ""
			,url: ""
			,typeid: "armor"
			,manufactureid: "leatherworker"
			,consumption: ['Rawhide']
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: false
			,material: false
			,weapon: true
			,armor: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Leatherworking"]
		});

// **** Populate Global Item List *************************

itemlist = {

	"Aluminium Ore": undefined
	,"Iron Ore": undefined
	,"Coal": undefined
	,"Food": undefined
	,"Rubber": undefined
	,"Oil": undefined

	,"Aluminium": undefined
	,"Supplies": undefined
	,"Steel": undefined
	
	,"Arms": undefined
};

function itemFactory(itemname)
{
	switch(itemname)
	{
		case 'Wheat':
			return new ModelWheat({});
		break;
		case 'Flour': 
			return new ModelFlour({});
		break;
		case 'Rice': console.log(new ModelRice({}));
			return new ModelRice({});
		break;
		case 'Corn': 
			return new ModelCorn({});
		break;
		case 'Mutton': 
			return new ModelMutton({});
		break;
		case 'Beef': 
			return new ModelBeef({});
		break;
		case 'Apple': 
			return new ModelApple({});
		break;
		case 'Orange': 
			return new ModelOrange({});
		break;
		case 'Cherry': 
			return new ModelCherry({});
		break;
		case 'Grape': 
			return new ModelGrape({});
		break;
		case 'Pear': 
			return new ModelPear({});
		break;
		case 'Olive': 
			return new ModelOlive({});
		break;
		case 'Rawhide': 
			return new ModelRawhide({});
		break;
		case 'Leather': 
			return new ModelLeather({});
		break;
		case 'Iron Ore': 
			return new ModelIronOre({});
		break;
		case 'Iron Ingot': 
			return new ModelIronIngot({});
		break;
		case 'Iron Spear': 
			return new ModelIronSpear({});
		break;
		case 'Iron Sword': 
			return new ModelIronSword({});
		break;
		case 'Iron Halberd':
			return new ModelIronHalberd({});
		break;
		case 'Iron Helm':
			return new ModelIronHelm({});
		break;
		case 'Iron Mail':
			return new ModelIronMail({});
		break;
		case 'Iron Platemail':
			return new ModelIronPlatemail({});
		break;
		case 'Iron Shield':
			return new ModelIronShield({});
		break;
		case 'Leather Shield':
			return new ModelLeatherShield({});
		break;
		case 'Leather Sling': 
			return new ModelLeatherSling({});	
		break;
	};
}

// **** Populate Global Item List *************************

var ModelRecipe = Backbone.Model.extend({
	name: ""
	,description: ""
	,url: ""
	,typeid: ""
	,consumes: []
	,produces: []
	,make: function(inventory)
	{
		// Take the consumes[] items from the inventory parameter
		// and place the produces[] items into the inventory if
		// there are enough.
		
		// TODO
		return false;
	}
});

var ModelRecipeBeer = ModelRecipe.extend({
	name: "Beer"
	,description: "1 Beer can brewed out of 2 wheat, counts as a luxury for lower and middle class citizens." 
	,consumes: [new ModelWheat({qty: 2})]
	,produces: [new ModelBeer({})]
});

var ModelRecipeIronSpear = ModelRecipe.extend({
	name: "Iron Spear"
	,description: "1 iron ingot fashioned into a spear point, fixed on the end of 2 wood."
	,consumes: [new ModelIronIngot({})]
	,produces: [new ModelWood({qty: 2})]
});

var ModelRecipeWoodenSpear = ModelRecipe.extend({
	name: "Wooden Spear"
	,description: ""
	,consumes: [new ModelWood({qty: 2})]
});

recipebook = {
	"Beer": new ModelRecipeBeer({})
	,"Wooden Spear": new ModelRecipeWoodenSpear({})
	,"Iron Spear": new ModelRecipeIronSpear({})
}

function itemListCount()
{
	var c = 0;

	for (var i in itemlist)
	{
		c++;
	}	
	
	return c;
}
function itemListFood()
{
	var il = [];
	for (var i in itemlist)
	{
		if (itemlist[i].food)
		{
			il.push(itemlist[i]);
		}
	}
	return il;
}

// ******************************************************		
		
		var ModelBuilding = Backbone.Model.extend({
			initialize: function(args)
			{
				this.city = undefined;
				this.produces = undefined;
				this.consumes = [];
				this.typeid = 0;
				this.buildCost = undefined;
				this.name = "Plantation";
				this.citizens = [];
				if (args.name != undefined)
				{
					this.name = args.name;
				}
				if (args.buildCost != undefined)
				{
					this.buildCost = args.buildCost;
				}
				if (args.produces != undefined)
				{
					this.produces = args.produces;
				}
				if (args.consumes != undefined)
				{
					this.consumes = args.consumes;
				}
				if (args.city != undefined)
				{
					this.city = args.city;
				}
			}
			,newTurn: function()
			{
				if (this.city != undefined)
				{
					if (this.produces != undefined)
					{
						this.city.inventory.addItem(this.produces);
					}
				}
			}
		});
		
		var ModelStructure = Backbone.Model.extend({
			initialize: function(args)
			{
				this.city = city;
				this.name = "City Structure";
				this.buildCost = 50;
				this.citizens = [];
				this.buildable = true;
			}
			,build: function ()
			{
				if (this.city == undefined)
				{
					return;
				}
			}
			,destroy: function ()
			{
				if (this.city == undefined)
				{
					return;
				}
			}
			,newTurn: function ()
			{
				if (this.city == undefined)
				{
					return;
				}
			}
		});
		
		var ModelFactory = ModelStructure.extend({
			initialize: function(args)
			{
				this.city = args.city;
				this.name = "Factory";
				this.buildCost = 50;
				this.citizens = [];
				this.buildable = true;
			}
			,build: function()
			{
				// Increase the city's manufacturing points.
				this.city.manufacturing += 5;
			}
			,destroy: function()
			{
				// Decrease the city's manufacturing points.
				this.city.manufacturing -= 5;
			}
		});
		
		var ModelWealth = ModelStructure.extend({
			initialize: function(args)
			{
				this.city = args.city;
				if (args.buildCost != undefined)
				{
					this.buildCost = args.buildCost;
				}
				else
				{
					this.buildCost = 0;
				}
				if (args.name != undefined)
				{
					this.name = args.name;
				}
				this.citizens = [];
				this.buildable = false;
			}
			,build: function()
			{
				// Increase the city's manufacturing points.
				
				// TODO: add the manufacturing points to the nation's treasury
				console.log("Nation " + map.nations[this.city.ownerID].name + " added " + this.city.manufacturing + " to its treasury.");
			}
			,destroy: function()
			{
				// Decrease the city's manufacturing points.
				this.city.manufacturing -= 5;
			}
		});
		
		var ModelStructureUnit = ModelStructure.extend({
			initialize: function(args)
			{
				this.city = args.city;
				if (args.buildCost != undefined)
				{
					this.buildCost = args.buildCost;
				}
				else
				{
					this.buildCost = 0;
				}
				if (args.name != undefined)
				{
					this.name = args.name;
				}
				this.citizens = [];
				this.buildable = false;
			}
			,build: function()
			{
				// Increase the city's manufacturing points.
				
				// TODO: add the manufacturing points to the nation's treasury
				unitFactory(map, this.city.x, this.city.y, this.name, this.city.ownerID);
			}
			,destroy: function()
			{
				// Decrease the city's manufacturing points.
				this.city.manufacturing -= 5;
			}
		});		
		
		var ModelInventory = Backbone.Model.extend({
			name: 'Inventory'
			,items: undefined
			,initialize: function(args)
			{
				this.items = {};
			}
			,count: function()
			{
				return items.length;
			}
			,addItem: function(itemname)
			{
				for (i in this.items)
				{
					if (i == itemname)
					{
						this.items[i].qty++;
						return true;
					}
				}
				// If the item wasn't found, add a new instance of that item to the stack.
				var newitem = itemFactory(itemname);
				console.log("Creating", newitem);
				this.items[itemname] = newitem;
			}
		});
		
		
		var ModelSettlement = Backbone.Model.extend({
			name: "Town"
			,type: "Town"
			,url: ""
			,citizens: undefined
			,production: "Wealth"
			,inventory: undefined
			,x: 0
			,y: 0
			,buildings: undefined
			,units: undefined
			,food: 0
			,food_growth: 10
			,ownerID: undefined
			,manufacturing: 5
			,newTurn: function ()
			{
				// Add food to the stockpile.
				this.food += map.mapdata.fertility(this.x, this.y);
				if (this.food > this.food_growth)
				{
					this.food -= this.food_growth;
					if (this.food < 0)
					{
						this.food = 0;
					}
					
					var ct = new ModelCitizen({birthplace: this.name, name: this.name, type: 'Villager'});
					this.citizens.push(ct);
				}
				
				// Subtract food from the stockpile.
				
				var ct = this.citizens.length;
				this.food -= ct;
				
				// If the town has no food left, expell the balance of citizens to become
				// wandering settlers or labourers, depending on the citizen type.
				
				if (this.food < 0)
				{
					console.log(this.citizens);
					var migrant = this.citizens.shift();
					console.log("Expelling migrant from", this.name, migrant.type, this.ownerID);
					var unit = unitFactory(map, this.x, this.y, "Settler", this.ownerID, migrant);
					console.log(unit);
					this.food = 0;
				}
				
				// Add manufacture points to the city model.
				this.mp += this.manufacturing;
				if (this.mp >= this.mp_max)
				{
					var structure = buildingFactory(this.production, this);
					if (structure.buildable)
					{
						alert("Building complete!");
					}
					structure.build();
					this.mp = 0;
					this.production = "Wealth";
					this.mp_max = 0;
					this.buildings.push(structure);
				}
				
				// TODO: run the new turn method for each city structure.
				
			}
			,initialize: function (arg)
			{
				this.citizens = [];
				this.production = "Wealth";
				this.mp = 0;
				this.mp_max = 0; // MP = manufacturing points
				this.inventory = new ModelInventory({name: 'Town Inventory'});
				this.x = 0;
				this.y = 0;
				this.buildings = [];
				this.units = [];
				this.food = 0;
				this.food_growth = 10;
				this.ownerID = undefined;
				this.manufacturing = 5;

				if (arg.manufacturing != undefined)
				{
					this.manufacturing = arg.manufacturing;
				}
				if (arg.x != undefined)
				{
					this.x = arg.x;
				}
				if (arg.y != undefined)
				{
					this.y = arg.y;
				}
				if (arg.name != undefined)
				{
					this.name = arg.name;
				}
				if (arg.type != undefined)
				{
					this.type = arg.type;
				}
				if (arg.ownerID != undefined)
				{
					this.ownerID = arg.ownerID;
				}
				if (arg.citizens != undefined)
				{
					this.citizens = this.citizens.concat(arg.citizens);
				}
			}
		});
		
		var ModelPathfindingNode = Backbone.Model.extend({
			name: 'Pathfinding Node'
			,start: false
			,finish: false
			,x: undefined
			,y: undefined
			,traversed: false
			,initialize: function (arg)
			{
				if (arg.traversed != undefined)
				{
					this.traversed = arg.traversed;
				}
				if (arg.x != undefined)
				{
					this.x = arg.x;
				}
				if (arg.y != undefined)
				{
					this.y = arg.y;
				}
				if (arg.start != undefined)
				{
					this.start = arg.start;
				}
				if (arg.finish != undefined)
				{
					this.finish = arg.finish;
				}
			}
		});
		var ModelPathfinding = Backbone.Model.extend({
			name: 'Pathfinding'
			,mapdata: undefined
			,isObstacle: function (x, y) {}
			,getCost: function (x, y) {}
		});

		var Map = Backbone.View.extend({
			el: "contents"
			,tset: undefined
			,mapdata: undefined
			,selectedUnit: undefined
			,unitdefs: undefined
			,scrollx: 0
			,scrolly: 0
			,scalex: 4
			,scaley: 4
			,tooltip: {x: 0, y: 0, text: ''}
			,tile_Forest: undefined
			,tile_Sea: undefined
			,nations: undefined
			,cultures: undefined
			,initialize: function (arg)
			{
				this.mapdata = arg.mapdata;
				//this.mapdata.generate();
				this.tset = arg.tileset;
				this.mapdata.tset = this.tset;
				this.unitdefs = unitdefs;
				
				this.tile_sea = this.tset.getIndexByName("Sea");
				this.tile_Forest = this.tset.getIndexByName("Woods");

				this.nations = [];

				// Insert human player for game setup.
				this.nations.push(new NationEngland({}));

				this.cultures = {
					'English': new CultureAnglo({})
					,'Slavic': new CultureSlavic({})
				};
			}
			,draw: function ()
			{
				var sea = this.tile_Sea;
				var forest = this.tile_Forest;
				
				var dtx; var dty;
				if (this.el == undefined) { return; }
				if (this.tset == undefined) { return; }
				if (this.mapdata == undefined) { return; }

				var ctx = document.getElementById(this.el).getContext("2d");
				this.tset.el = "#" + this.el;
				ctx.fillStyle = "#cacaca";
				ctx.fillRect(0, 0, 800, 800);

				var dx = 0; var dy = 0;
			
				var renderCities = [];
			
				var mapheight = this.mapdata.mapheight;
				if (mapheight > 20) { mapheight = this.scrolly + 20; }
				var mapwidth = this.mapdata.mapwidth;
				if (mapwidth > 25) { mapwidth = this.scrollx + 25; }

				for (var l=0; l<this.mapdata.maplayers; l++)
				{		
					dx = 0; dy = 0;
					for (var k=this.scrolly; k< this.scrolly + 20; k++)
					{
						for (var i=this.scrollx; i< this.scrollx + 25; i++)
						{
							var tile = this.mapdata.get(i, k, l);
							if (tile.discovered != undefined)
							{
								// Draw Tiles
								if ((l == 0) || (l > 0 && tile.tileid > 0))
								{
									if ((tile.tileid != 13
										&& tile.tileid != 4)
										|| l != 1)
									{
										this.tset.drawIndex(tile.tileid, dx, dy);
									}
									else if (tile.tileid == 13)
									{
										var up		= this.mapdata.get(i, k - 1, 1);
										var down	= this.mapdata.get(i, k + 1, 1);
										var left	= this.mapdata.get(i - 1, k, 1);
										var right	= this.mapdata.get(i + 1, k, 1);
										var tid = tile.tileid;
										
										/*if (up.tileid != 13 && down.tileid != 13)
										{
											tid = 14;
										}
										if (left.tileid != 13 && right.tileid != 13)
										{
											tid = 15;
										}
										if (down.tileid != 13 && right.tileid != 13)
										{
											tid = 16;
										}
										if (up.tileid != 13 && right.tileid != 13)
										{
											tid = 17;
										}
										if (down.tileid != 13 && left.tileid != 13)
										{
											tid = 18;
										}		
										if (left.tileid != 13 && up.tileid != 13)
										{
											tid = 19;
										}
										if (
											left.tileid != 13 && up.tileid != 13
											&& down.tileid != 13
										)
										{
											tid = 14
										}																
										if (
											right.tileid != 13 && up.tileid != 13
											&& down.tileid != 13
										)
										{
											tid = 14
										}
										if (
											left.tileid != 13 && up.tileid != 13
											&& right.tileid != 13
										)
										{
											tid = 15
										}																
										if (
											right.tileid != 13 && down.tileid != 13
											&& left.tileid != 13
										)
										{
											tid = 15
										}				*/												
										this.tset.drawIndex(tid, dx, dy);
									}
									else if (tile.tileid == forest)
									{
										var up		= this.mapdata.get(i, k - 1, 1);
										var down	= this.mapdata.get(i, k + 1, 1);
										var left	= this.mapdata.get(i - 1, k, 1);
										var right	= this.mapdata.get(i + 1, k, 1);
										var tid = tile.tileid;
										
										if (up.tileid != forest && left.tileid != forest)
										{
											tid = forest;
										}
										if (up.tileid != forest && right.tileid != forest)
										{
											tid = forest;
										}
										if (left.tileid != forest && down.tileid != forest)
										{
											tid = forest;
										}
										if (right.tileid != forest && down.tileid != forest)
										{
											tid = forest;
										}
										if (right.tileid != forest && down.tileid != forest
											&& up.tileid != forest && left.tileid != forest)
										{
											tid = forest;
										}													
										this.tset.drawIndex(tid, dx, dy);
									}
									var t = this.mapdata.get(i,k,0);										
								}
								
								// Draw Borders
								if (l == this.mapdata.maplayers - 1	/* && this.mapdata.get(i, k, l).discovered[0] == true*/)
								{
//									var borderWidth = 6;
									var scalex = 32; var scaley = 32;
									var west = this.mapdata.get(i - 1, k, 0); var east = this.mapdata.get(i + 1, k, 0);
									var north = this.mapdata.get(i, k - 1, 0); var south = this.mapdata.get(i, k + 1, 0);
									var v = this.mapdata.get(i, k, 0).voronoi;
									if (this.mapdata.get(i, k, 0).owner > -1)
									{
										ctx.globalAlpha = 0.1;
										for (var borderWidth = 1; borderWidth < 6; borderWidth++)
										{
											ctx.fillStyle = map.mapdata.voronoi_colours[v];
											if (
												west.voronoi != v
												&& west.voronoi != undefined
											)
											{
												ctx.fillRect(dx, dy, borderWidth, scaley);
											}
											if (
												east.voronoi != v
												&& east.voronoi != undefined
											)
											{
												ctx.fillRect(dx + scalex - borderWidth, dy, borderWidth, scaley);
											}
											if (
												south.voronoi != v
												&& south.voronoi != undefined
											)
											{
												ctx.fillRect(dx, dy + scaley - borderWidth, scalex, borderWidth);
											}
											if (
												north.voronoi != v
												&& north.voronoi != undefined
											)
											{
												ctx.fillRect(dx, dy, scalex, borderWidth);
											}
										}
										ctx.globalAlpha = 1.0;
									}
								}
								
								if (this.tooltip.text.length > 0
									&& (i == this.tooltip.x	&& k == this.tooltip.y)
								)
								{
									dtx = dx;
									dty = dy;
								}
							}
							if (tile)
							{
								if (
									(l == 2 && tile.discovered[playerCurrent])
									|| (l != 2)
								)
								{
									if (tile.units != undefined)
									{				
										// Draw Units
										tile = this.mapdata.get(i, k, 0);
										if ((l == this.mapdata.maplayers - 1) && tile.units.length > 0)
										{
											for (var u=0; u < tile.units.length; u++)
											{
												tile.units[u].update();
												tile.units[u].draw(dx, dy);
											}
										}
									}
								}
								else
								{
							
									this.tset.drawTile("Fog of War", dx, dy);
								}
							}
							
							var city = this.mapdata.getCity(i, k, 0);
							if (city != false)
							{
								if (city.type == "Town"
									|| city.type == "City"
									|| city.type == "Metropolis")
								{
									var city = {
										'name': city.name
										,'x': dx
										,'y': dy
										,'ownerID': city.ownerID
									};
								
									renderCities.push(city);
								}
							}
							

							dx += this.tset.tileWidth();
						}
						dy += this.tset.tileHeight();
						dx = 0;
					}
				}
				
				// Draw any Cities that are within the viewport
				for (var i=0; i < renderCities.length; i++)
				{
					var dx = renderCities[i].x;
					var dy = renderCities[i].y;
					var name = renderCities[i].name;
					var flag = this.nations[renderCities[i].ownerID].flag;
				
					ctx.fillStyle = "#fff";
					ctx.strokeStyle = "#000";
					ctx.font = "16px Arial";
					var w = ctx.measureText(name).width;
					ctx.strokeText(name, dx + 16 - Math.floor(w / 2), dy + 34);
					ctx.fillText(name, dx + 16 - Math.floor(w / 2), dy + 34);

					flag.draw(dx - Math.floor(w / 2) + 16, dy + 40, 16);
				}
				
				// Draw Tooltip information.
				if (dtx != undefined)
				{
					var units = map.mapdata.getUnits(this.tooltip.x, this.tooltip.y);
					
					ctx.strokeStyle = "#d00";
					ctx.strokeRect(dtx, dty, 32, 32);
					
					if (dtx + 256 > 800)
					{
						dtx -= 240;
					}
					if (dty + 134 > 600)
					{
						dty -= 172;
					}
					
					ctx.strokeStyle = "#dfdfdf";
					ctx.fillStyle = "#a0a0a0";
					ctx.strokeWidth = 1;
					ctx.fillRect(dtx - 5, dty + 38, 256, 128);
					ctx.strokeRect(dtx - 5, dty + 38, 256, 128);
										
					var tile0 = this.mapdata.get(this.tooltip.x, this.tooltip.y, 0);
					var tile1 = this.mapdata.get(this.tooltip.x, this.tooltip.y, 1);
					var tile2 = this.mapdata.get(this.tooltip.x, this.tooltip.y, 2);
			
					ctx.fillStyle = "#000";
					ctx.font = "16px Arial";
					var tname = this.tset.getTile(tile0.tileid).name; //this.tset.tiledefs.contentJSON[tile0.tileid].name;
					if (tile1.tileid > 0)
					{
						tname += ", " + this.tset.getTile(tile1.tileid).name;
					}
					if (tile2.tileid > 0)
					{
						tname += ", " + this.tset.getTile(tile2.tileid).name;
					}
					ctx.fillText(tname, dtx + 5, dty + 62);
					
					var suffix = "move points.";
					var cost = this.mapdata.moveCost(this.tooltip.x, this.tooltip.y);
					if (cost == 1)
					{
						suffix = "move point.";
					}
					ctx.fillText("Costs " + cost + " " + suffix, dtx + 5, dty + 94);
					ctx.fillText("Region:  " + this.mapdata.voronoi[tile0.voronoi].name, dtx + 5, dty + 126);
					ctx.fillText("Units: " + units.length + " Fertility: " + this.mapdata.fertility(this.tooltip.x, this.tooltip.y), dtx + 5, dty + 152);
				}
			}
			,drawMini: function ()
			{
				if (this.el == undefined) { return; }
				if (this.mapdata.tiles == undefined) { return; }
				if (this.mapdata.tiles[0] == undefined) { return; }
				if (this.tset == undefined) { return; }
				if (this.mapdata == undefined) { return; }

				var scalex = this.scalex;
				var scaley = this.scaley;
				
				var sea = this.tset.getIndexByName("Sea");

				var ctx = document.getElementById(this.el).getContext("2d");
				this.tset.el = "#" + this.el;
				ctx.fillStyle = "#cacaca";
				ctx.fillRect(0, 0, 800, 800);

				var dx = 0; var dy = 0;

				var mapheight = this.mapdata.mapheight;
				//if (mapheight > 20) { mapheight = this.scrolly + 20; }
				var mapwidth = this.mapdata.mapwidth;
				//if (mapwidth > 25) { mapwidth = this.scrollx + 25; }

				for (var l=0; l<this.mapdata.maplayers; l++)
				{		
					dx = 0; dy = 0;
					for (var k=0; k< mapheight; k++)
					{
						for (var i=0; i< mapwidth; i++)
						{
							var tile = this.mapdata.get(i, k, l);
							if (tile.discovered != undefined)
							{
								// Draw Tiles
								if ((l == 0) || (l > 0 && tile.tileid > 0))
								{
									//this.tset.drawIndex(tile.tileid, dx, dy);
									//var t = this.mapdata.get(i,k,0);
									var tileid = tile.tileid;
									if (this.tset.getIndex(tileid) != undefined)
									{

										var colr = this.tset.getIndex(tileid).colour;
										ctx.fillStyle = colr;
										ctx.fillRect(dx, dy, scalex, scaley);
										
									}										
								}
								var owner = this.mapdata.get(i, k, 0).owner;
								if (l == this.mapdata.maplayers - 1 && owner > -1)
								{
									var tile = this.mapdata.get(i, k, 0);
									var tileid = tile.tileid;
									var v = tile.voronoi;
									ctx.globalAlpha = 0.8;
									ctx.fillStyle = map.mapdata.voronoi_colours[v];
									ctx.fillRect(dx, dy, scalex, scaley);
									ctx.globalAlpha = 1.0;
								}
							}

							dx+=scalex;
							

						}
						dy+=scaley;
						dx = 0;
					}
				}

				dx = this.scrollx * scalex;
				dy = this.scrolly * scaley;
				ctx.strokeStyle = "#000";
				ctx.strokeRect(dx, dy, scalex * 25, scaley * 20);
			}
			,scrollMapX: function (v)
			{
				this.scrollx += v;
				this.mapdata.scrollx = this.scrollx;
			}
			,scrollMapY: function (v)
			{
				this.scrolly += v;
				this.mapdata.scrolly = this.scrolly;
			}
			,scrollMapXAbs: function (v)
			{
				this.scrollx = v;
				this.mapdata.scrollx = this.scrollx;
			}
			,scrollMapYAbs: function (v)
			{
				this.scrolly = v;
				this.mapdata.scrolly = this.scrolly;
			}
			,newTurn: function ()
			{

				var mapheight = this.mapdata.mapheight;
				var mapwidth = this.mapdata.mapwidth;
			
				var l = 0		
				dx = 0; dy = 0;
				for (var k=0; k<mapheight; k++)
				{
					for (var i=0; i<mapwidth; i++)
					{
						var tile = this.mapdata.get(i, k, l);
			
						// Reset Units for new turn
						
						if ((l == 0) && tile.units.length > 0)
						{
							for (var u=0; u < tile.units.length; u++)
							{
								tile.units[u].newTurn();
							}
						}
						
						var obj = map.mapdata.getObjects(i, k);
						if (obj != false)
						{
							obj.newTurn();
						}
						
						var city = this.mapdata.getCity(i, k, 0);
						if (city)
						{
							city.newTurn();
						}
					}
				}
			}
			,settle: function (x, y, settlement)
			{
				var outpost = this.tset.getName("Town");
				var outpostid = this.tset.getIndexByName("Town");
				this.mapdata.set(x, y, outpostid, outpost.layer);
				this.mapdata.addObject(x, y, settlement, outpost.layer);
				var ownerID = settlement.ownerID;
				if (this.mapdata.voronoi[this.mapdata.get(x, y, 0).voronoi].name == "Unnamed")
				{
					this.mapdata.voronoi[this.mapdata.get(x, y, 0).voronoi].name = settlement.name;
					this.mapdata.voronoi[this.mapdata.get(x, y, 0).voronoi].city = settlement;
				}
				map.nations[ownerID].cities.push(settlement);
			}
			,addUnit: function (x, y, unit)
			{
				unit.move(x, y);
				this.mapdata.addUnit(x, y, unit);
			}
			,addUnitByName: function (x, y, unitType)
			{
				unit.move(x, y);
				this.mapdata.addUnit(x, y, unit);
			}
			,moveUnit: function (x, y, unit, toX, toY)
			{
				return this.mapdata.moveUnit(x, y, unit, toX, toY);
			}
			,killUnit: function (x, y, unit, killer)
			{
				
			}
		});


		var ModelSpriteset = Backbone.Model.extend({
			load: function (url)
			{
				this.image = new Image();
				if (url == undefined)
				{
					url = this.url + "?v=" + tokenx36();
				}
				this.image.src = url;// + "?t=" + tokenx36();
			}
			,initialize: function(args)
			{
				this.name = "Spriteset";
				this.url = "";
				this.image = undefined;
				this.spritewidth = 32;
				this.spriteheight = 32;
				this.coordlist = args.coordlist;
				this.load(args.url);
			}
			,addSprite: function (name, frames)
			{
				this.coordlist.push({"name": name, "frames": frames});
			}
			,getSprite: function (i)
			{
				if (this.coordlist[i] != undefined) { return this.coordlist[i]; }
				return false;
			}
		});

		var Spriteset = Backbone.View.extend({
			el: "#contents"
			,initialize: function (arg)
			{
				this.spritedefs = arg.spritedefs;
				this.tset = new ModelSpriteset({"coordlist": arg.spritedefs, "url": arg.url});
				this.framecount = 0.0;
				this.increment = 1.0;
				this.animname = "Unit";
				this.animid = 0;
			}
			,getSprite: function (i)
			{
				return this.tset.getSprite(i);
			}
			,getName: function (name)
			{
				return this.tset.getSpriteByName(name);
			}
			,setAnimation: function (name)
			{
				for (var i=0; i<this.spritedefs.length; i++)
				{
					if (this.spritedefs[i].name == name)
					{
						this.animname = name;
						this.animid = i;
						return true;
					}
				}
				return false;
			}
			,setAnimationID: function (id)
			{
				if (this.spritedefs[id] != undefined)
				{
					this.animname = this.spritedefs[id].name;
					this.animid = id;
					return true;
				}
				return false;
			}
			,getIndexByName: function (name)
			{
				return this.tset.getIndexByName(name);
			}
			,draw: function (x, y)
			{
				var frame = this.tset.getSprite(this.animid).frames; 
				if (frame != false && frame != undefined)
				{
					if (this.tset.image != undefined)
					{
						var framecount = Math.floor(this.framecount);
						var sx = frame[framecount].x;
						var sy = frame[framecount].y;
						var sw = frame[framecount].w;
						var sh = frame[framecount].h;
						var ctx = $("#contents").get(0).getContext("2d");
						var ofx = frame[framecount].w - 46;
						var ofy = frame[framecount].h - 46;
						if (ofx < 0)
						{
							ofx = 0;
						}
						if (ofy < 0)
						{
							ofy = 0;
						}
						ctx.drawImage(this.tset.image, sx, sy, sw, sh, x - ofx, y - ofy, sw, sh);
					}
					else
					{
//						console.log("Sprite error", this.tset.image);	
					}
				}
			}
			,frameAdvance: function()
			{
				this.framecount += this.increment;
				if (this.tset.getSprite(this.animid) != undefined)
				{	
					if (this.tset.getSprite(this.animid).frames == undefined)
					{
						console.log("getSprite animid not found: ", this.animid);
					}
					else
					{
						if (this.framecount >= this.tset.getSprite(this.animid).frames.length)
						{
							this.framecount = 0;
						}
					}
				}
			}
			,update: function()
			{
				this.frameAdvance();
				this.draw(this.x, this.y);
			}
			,image: function()
			{
				return this.tset.image;
			}
		});

		var Tileset = Backbone.View.extend({
			el: "#contents"
			,el_tilebox: "#tiles"
			,showTilebox: true
			,initialize: function (arg)
			{
				this.tset = new ModelTileset();
				if (arg.tileimage != undefined)
				{
					this.tset.load(arg.tileimage);
				}
				this.tiledefs = new ModelJSON();
				if (arg.tiledefs != undefined)
				{
					//this.loadTiles(arg.tiledefs);
				}
			}
			,tileHeight: function()
			{
				if (this.tset.tileheight != undefined)
				{
					return this.tset.tileheight;
				}
				else
				{
					return 32;
				}
			}
			,tileWidth: function()
			{
				if (this.tset.tilewidth != undefined)
				{
					return this.tset.tilewidth;
				}
				else
				{
					return 32;
				}
			}
			,getTile: function (i)
			{
				return this.tset.getTile(i);
			}
			,getIndex: function (i)
			{
				return this.tset.getIndex(i);
			}
			,getName: function (name)
			{
				return this.tset.getTileByName(name);
			}
			,getIndexByName: function (name)
			{
				return this.tset.getIndexByName(name);
			}
			,load: function (url)
			{
				this.tset.load(url);
			}
			,blit: function (x, y, dx, dy)
			{
				if (this.tset.image == undefined) { return; }

				if (this.tset.image.complete)
				{
					var sw = this.tset.tilewidth;
					var sh = this.tset.tileheight;
					var sx = (x * sw) - sw;
					var sy = (y * sh) - sh;
					var ctx = $(this.el).get(0).getContext("2d");
					ctx.drawImage(this.tset.image, sx, sy, sw, sh, dx, dy, sw, sh);
				}		
			}
			,drawTile: function (name, x, y)
			{
				if (this.tset.countTiles() > 0)
				{
					t = this.getName(name);
					this.blit(t.x, t.y, x, y);
				}
			}
			,drawIndex: function (i, x, y)
			{
				if (this.tset.countTiles() > 0)
				{
					var t = this.tset.getIndex(i);
					if (t == undefined) { return; }
					this.blit(t.x, t.y, x, y);
				}
			}
		});

		var FlagNeutral = Backbone.Model.extend({
			el: "contents"
			,initialize: function (args)
			{
				if (args.field != undefined)
				{
					this.field = args.field;
				}
				else
				{
					this.field = {
						'colours': ['#dadada', '#fafafa', '#dadada']
						,'vertical': true
					};
				}
				if (args.symbol != undefined)
				{
					this.symbol = {
						'symbol': undefined
						,'vertical-location': 'centered'
						,'horizontal-location': 'centered'
					};
				}
				else
				{
					this.symbol = undefined;
				}
			}
			,draw: function (x, y, width, context)
			{
				if (context == undefined)			
				{
					var ctx = document.getElementById(this.el).getContext("2d");
				}
				else
				{
					var ctx = context;
				}
				var colourCount = this.field.colours.length;
				var colours = this.field.colours;
				var height = parseInt(Math.floor(width * 0.66));
				var barWidth = parseInt(Math.floor(width / colourCount));
				var barHeight = parseInt(Math.floor(height / colourCount));
				
				var offset = 0;
				for (var i=0; i < colourCount; i++)
				{
					ctx.fillStyle = colours[i];
					if (this.field.vertical == true)
					{
						ctx.fillRect(x + offset, y, barWidth, height);
						offset += barWidth;
					}
					else
					{
						ctx.fillRect(x, y + offset, width, barHeight);
						offset += barHeight;
					}
				}
			}
		});
		
		var FlagFrance = Backbone.Model.extend({
			el: "contents"
			,initialize: function (args)
			{
				if (args.field != undefined)
				{
					this.field = args.field;
				}
				else
				{
					this.field = {
						'colours': ['#00f', '#fff', '#f00']
						,'vertical': true
					};
				}
				if (args.symbol != undefined)
				{
					this.symbol = {
						'symbol': undefined
						,'vertical-location': 'centered'
						,'horizontal-location': 'centered'
					};
				}
				else
				{
					this.symbol = undefined;
				}
			}
		});
		
		var FlagEngland = FlagNeutral.extend({
			initialize: function (args)
			{
				if (args.field != undefined)
				{
					this.field = args.field;
				}
				else
				{
					this.field = {
						'colours': ['#f00', '#fff']
						,'vertical': true
					};
				}
				if (args.symbol != undefined)
				{
					this.symbol = {
						'symbol': undefined
						,'vertical-location': 'centered'
						,'horizontal-location': 'centered'
					};
				}
				else
				{
					this.symbol = undefined;
				}
			}
			,draw: function (x, y, width, context)
			{
				if (context == undefined)			
				{
					var ctx = document.getElementById(this.el).getContext("2d");
				}
				else
				{
					var ctx = context;
				}
								
				var colourCount = this.field.colours.length;
				var colours = this.field.colours;
				var height = parseInt(Math.floor(width * 0.66));
				var barWidth = parseInt(Math.floor(width * 0.05));
				var barHeight = parseInt(Math.floor(height * 0.05));
				var bwHalf = barWidth / 2;
				var bhHalf = barHeight / 2;
				if (bwHalf < 1)
				{
					bwHalf = 1;
				}
				if (bhHalf < 1)
				{
					bhHalf = 1;
				}

				ctx.fillStyle = "#f00";
				ctx.fillRect(x, y, width, height);
				ctx.fillStyle = "#fff";
				ctx.fillRect(x, y, parseInt(width / 2) - bwHalf, parseInt(height / 2) - bhHalf);
				ctx.fillRect(x + parseInt(width / 2) + bwHalf, y, parseInt(width / 2) - bwHalf, parseInt(height / 2) - bhHalf);
				ctx.fillRect(x, y + parseInt(height / 2) + bhHalf, parseInt(width / 2) - bwHalf, parseInt(height / 2) + bhHalf);
				ctx.fillRect(x + parseInt(width / 2) + bwHalf, y + parseInt(height / 2) + bhHalf, parseInt(width / 2) - bwHalf, parseInt(height / 2) + bhHalf);
			}
		});

		var NationTribe = Backbone.Model.extend({
			name: undefined
			,description: undefined
			,colour_primary: undefined
			,colour_secondary: undefined
			,initialize: function (args)
			{
				// Create properties from arguments or insert defaults;
				
				if (args.culture != undefined)
				{
					this.culture = new CultureLatin({});
				}
				else
				{
					this.culture = args.culture;
				}
				
				if (args.flag == undefined)
				{
					this.flag = new FlagNeutral({});
				}
				else
				{
					this.flag = args.flag;
				}
				if (args.name != undefined)
				{
					this.name = args.name;
				}
				else
				{
					this.name = 'Anonymous Tribe';
				}

				this.description = "Anonymous tribe, they have no recorded history or any cultural achievements worthy of mention.";

				// Create default properties
				this.cities = [];
				this.capitol = undefined;
				this.home_voronoi = undefined;

				this.units = [];
			}
		});

		var NationEngland = NationTribe.extend({
			initialize: function (args)
			{
				// Create properties from arguments or insert defaults;
				
				if (args.culture != undefined)
				{
					this.culture = new CultureLatin({});
				}
				else
				{
					this.culture = args.culture;
				}
				
				if (args.flag == undefined)
				{
					this.flag = new FlagEngland({});
				}
				else
				{
					this.flag = args.flag;
				}
				if (args.name != undefined)
				{
					this.name = args.name;
				}
				else
				{
					this.name = 'England';
				}
				if (args.colour_primary != undefined)
				{
					this.colour_primary = args.colour_primary;
				}
				else
				{
					this.colour_primary = "#f00";
				}
				if (args.colour_secondary != undefined)
				{
					this.colour_secondary = args.colour_primary;
				}
				else
				{
					this.colour_secondary = "#f00";
				}

				this.description = "England's long history began nearly 1600 years ago when the Anglo-Saxon tribes of the German and Danish North-Sea coasts began to migrate to the abandoned Roman colony of Brittania.  They settled in the fertile southern part of the island and began to form the linguistic and cultural core of what would eventually become England.";
				
				// Create default properties
				this.cities = [];
				this.capitol = undefined;
				this.home_voronoi = undefined;

				this.units = [];
			}
		});

		var CultureLatin = Backbone.Model.extend({
			initialize: function (args)
			{
				if (args.namelist == undefined)
				{
					this.prefixlist = [
								'Bru', 'Brut', 'Dom', 'Dem', 'Jul', 'Gae', 'Sev', 'August', 'Sever', 'Cat'
								, 'Sabin', 'Sab', 'Cae', 'Cal', 'Car', 'Had', 'Hadr', 'Tarqu', 'Que', 'Quae'
								, 'Rom', 'Romul', 'Rem', 'Vei', 'Vel', 'Val', 'Ver', "Pyr", "Epir", "Ith"
								,"Gaul", "Illyr", "Lyc", "Xyn", "Xyd", "Deu", "Panon", "Rhod", "Dac", "Tro"
							];
					this.suffixlist = [
								'ae', 'us', 'ii', 'ex', 'ix', 'a', 'as', 'ia', 'ria', 'lus', 'es', 'um', 'em'
								,'ilius', 'lis', 'lius', 'lium', 'lirum', 'urum', 'ilis', 'irix', 'ria', 'alus'
								,'ugus'
							];

					this.namelist = [];
				}
				else
				{
					this.namelist = args.namelist;
				}
			}
			,generateList: function(maxNames)
			{
				if (maxNames == undefined)
				{
					maxNames = 50;
				}
				this.namelist = [];
				var shortlist = [];
				for (var k = 0; k < maxNames; k++)
				{
					var randint = getRandomInt(0, this.prefixlist.length - 1);
					shortlist.push(this.prefixlist[randint]);
				}
	
				for (var k = 0; k < shortlist.length; k++)
				{
					var randint = getRandomInt(0, this.suffixlist.length - 1);
					var name = shortlist[k] + this.suffixlist[randint];
					name = name.replace("ee", "e");
					name = name.replace("rr", "r");
					name = name.replace("iii", "ii");
					this.namelist.push(name);
				}
			}
		});

		var CultureSlavic = CultureLatin.extend({
			initialize: function (args)
			{
				if (args.namelist == undefined)
				{
					this.prefixlist = [
								'Nov', 'Bel', 'Yish', 'Yak', 'Niz', 'Groz', 'Ros', 'Sib', 'Stal', 'Len'
								,'Kir', 'Ber', 'Tat', 'Tak', 'Mos', 'Bev', 'Lev', 'Tor'
							];
					this.suffixlist = [
								'ovna', 'ovnus', 'imir', 'islav', 'ovnir', 'orod', 'ora', 'iova', 'iana', 'in', 'inin'
								,'inish', 'ivka' ,'ovka', 'irilov', 'oronov', 'iria', 'iriov', 'iriovna', 'irina', 'orow'
								,'ow', 'imev', 'irev', 'ilev', 'orev', 'enev'
							];

					this.namelist = [];
				}
				else
				{
					this.namelist = args.namelist;
				}
			}
		});
		
		var CultureAnglo = CultureLatin.extend({
			initialize: function (args)
			{
				if (args.namelist == undefined)
				{
					this.prefixlist = [
								'Abing', 'Accring', 'Acle', 'Al', 'Adle', 'Alder', 'Angle', 'Al', 'Am', 'Ash', 'Ax', 'Ayl'
								,'Bake', 'Ban', 'Bar', 'Bas', 'Bat', 'Baw', 'Berke', 'Bex', 'Bos', 'Bil', 'Bishop', 'Black', 'Braid', 'Bran', 'Bridge', 'Brut', 'Bury', 'Bux'
								,'Cole', 'Cor', 'Col', 'Cot', 'Craw', 'Crom', 'Croy','Cros'
								,'Dart', 'Darl', 'Dawl', 'Don', 'Dor', 'Dove', 'Dud', 'Dun'
								,'Eden', 'Els', 'Elm', 'Ep', 'Ex'
								,'Fair', 'Fare', 'Farn', 'Faver', 'Fern', 'Ferry', 'Fleet', 'Flint', 'Frod'
								,'Gain', 'Gate', 'Gare', 'Gilling', 'God', 'Grave', 'Grim', 'Guild'
								,'Had', 'Hail', 'Hale', 'Hali', 'Har', 'Hart', 'Hen', 'Hey', 'Holt', 'Hor', 'Hunting', 'Hunt', 'Hyde'
								,'Il', 'Ilk', 'Ip', 'Ingle', 'Ivy', 'Imming'
								,'Jar'
								,'Kid', 'Kim', 'Kimber', 'Kes', 'Ken', 'Kings', 'Kirk', 'Knare', 'Knut'
								,'Lang', 'Lech', 'Leek', 'Leigh', 'Lod', 'Lough', 'Lyme'
								,'Mable', 'Maid', 'Maiden', 'Mal', 'Malt', 'Mans', 'Mar', 'Mel', 'Mil', 'Mor'
								,'Nail', 'Nan', 'Nel', 'New', 'Nun', 'North'
								,'Oak', 'Oaken', 'Old', 'Ol', 'Or', 'Ot'
								,'Pad', 'Pen', 'Pole', 'Ponte', 'Port', 'Pres', 'Prud'
								,'Rad', 'Raw', 'Ray', 'Read', 'Red', 'Rich', 'Roch', 'Roth', 'Rush', 'Ryde', 'Rye'
								,'Sale', 'Saf', 'Sal', 'San', 'Saw', 'Sax', 'Scar', 'Sea', 'Shef', 'Shep', 'Sher', 'Shere', 'Shrew', 'Shil', 'Sid', 'Skip', 'South', 'Stal', 'Stave', 'Steve', 'Swaf', 'Swan'
								,'Tad', 'Tam', 'Tav', 'Tel', 'Ten', 'Tet', 'Thet', 'Thorn', 'Thrap', 'Tid', 'Tip', 'Tot', 'Tow', 'Tyne'
								,'Uck', 'Upping', 'Up', 'Ut', 'Ux'
								,'Wade', 'Wad', 'Wain', 'Wall', 'Wal', 'Wan', 'Ware', 'Wat', 'Welling', 'Wed', 'Wem', 'Wen', 'West', 'Wether', 'Wey', 'Whit', 'White', 'Wey', 'Wick', 'Winter', 'Wind', 'Winds', 'Wil', 'Win', 'Wood', 'Work'
								,'Yar', 'Yate', 'Yeo'
								
							];
					this.suffixlist = [
								'don', 'ford', 'ton', 'town', 'burg', 'borough', 'burgh', 'ham', 'side', 'bourne'
								,'hill', 'over', 'ter', 'sey', 'bury', 'bridge', 'minster', 'well', 'ing', 'ness'
								,'dale', 'ley', 'wood', 'head', 'pool', 'rod', 'field', 'cester', 'ade', 'glade'
								,'shire', 'von', 'set', 'folk', 'ria', 'rey', 'ex', 'ight', 'by', 'thorpe', 'church'
								,'wich', 'chapel', 'fax'
							];

					this.namelist = [];
				}
				else
				{
					this.namelist = args.namelist;
				}
			}
		});

		// ********************************************************
		

