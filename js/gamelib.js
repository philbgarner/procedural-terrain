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

		// *** Region NameGen Prototypes **********************************************************************

		function latin()
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
		latin.prototype.generateList = function()
		{
			this.namelist = [];
			var shortlist = [];
			for (var k = 0; k < 10; k++)
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
		};
	
		function germanic()
		{
			this.prefixlist = ['Eur', 'Ekk', 'Elf', 'Act', 'Ald', 'Eal', 'Rol', 'Stil', 'Ang', 'Jut', 'Will', 'Veld'
						, 'Ber', 'Os', 'Bil', 'Druc', 'Eber', 'Era', 'Far', 'Gan', 'Gang', 'Har', 'Man', 'Sieg'
						, 'Tan', 'Tanc', 'Wand', 'Wig', 'Thus', 'Thor', 'Tor', 'Wulf', "Ut"
					];
			this.suffixlist = ['ic', 'er', 'ulf', 'is', 'ad', 'ind', 'ild', 'und', 'old', 'eld', 'helm'
					,'and', 'en', 'ick', 'uck', 'olm', 'em', 'elm', 'im', 'ox', 'ech'
					];
		
			this.namelist = [];
		}
		germanic.prototype.generateList = function()
		{
			this.namelist = [];
			var shortlist = [];
			for (var k = 0; k < 10; k++)
			{
				var randint = getRandomInt(3, this.prefixlist.length - 1);
				shortlist.push(this.prefixlist[randint]);
			}
		
			for (var k = 0; k < shortlist.length; k++)
			{
				var randint = getRandomInt(3, this.suffixlist.length - 1);
				var name = shortlist[k] + this.suffixlist[randint]
				this.namelist.push(name);
			}
		};	

		function sumerian()
		{
			this.prefixlist = ['Am', 'Ad', 'Ma', 'Bil', 'Gar', 'Er', 'Ish', 'Giz', 'Mez', 'Haz', 'Mesh'
						,'Sha', 'Nin', 'Til', 'Ur', 'Zi'
					];
			this.suffixlist = ['la', 'rish', 'dri', 'kish', 'zal', 'zul', 'da', 'ma', 'shur', 'zi', 'maz', 'milla'
						,'bin', 'rah', 'bar'
					];
		
			this.namelist = [];
		}
		sumerian.prototype.generateList = function()
		{
			this.namelist = [];
			var shortlist = [];
			for (var k = 0; k < 10; k++)
			{
				var randint = getRandomInt(3, this.prefixlist.length - 1);
				shortlist.push(this.prefixlist[randint]);
			}
		
			for (var k = 0; k < shortlist.length; k++)
			{
				var randint = getRandomInt(3, this.suffixlist.length - 1);
				var name = shortlist[k] + this.suffixlist[randint]
				this.namelist.push(name);
			}
		};	
	
		function generateNames(selection)
		{
			var charset = document.getElementById('charset');
		
			var generator;
			if (selection == 'latin')
			{
				generator = new latin();
			}
			if (selection == 'germanic')
			{
				generator = new germanic();
			}
			if (selection == 'sumerian')
			{
				generator = new sumerian();
			}
			generator.generateList();
			return generator.namelist;
		}
		
		// *** Region NameGen Prototypes **********************************************************************

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
			,coordlist: []
			,load: function (url)
			{
				this.image = new Image();
				if (url == undefined)
				{
					url = this.url + "?v=" + tokenx36();
				}
				this.image.src = url;
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
			,voronoi_max: 48
			,voronoi_min: 32
			,voronoi: []
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

				var vnameList = generateNames("latin");
				vnameList = vnameList.concat(generateNames("germanic"));
				vnameList = vnameList.concat(generateNames("sumerian"));

				var name = vnameList[nameid];
				var v = {
					"height": height
					, "x": 0
					, "y": 0
					, "tolerance": 0.1
					, "name": name
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
					var nameid = getRandomInt(0, vnameList.length - 1);
					var name = vnameList[nameid];
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
					};
					this.voronoi.push(v);
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
				// Loop through each map point and calculate the closest voronoi neighbour, then
				// sample the voronoi point's height and add a random tolerance +/- that point's
				// value.
				this.randomizeVoronoi();

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
							this.set(i,j,0,0); // Set the tile to Sea if it's below sea level.
						}
						else if (closestHeight > this.mountain_height)
						{
							this.set(i,j,1,0); // Set the tile to Grass if it's above sea level.
							this.set(i,j,6,1); // Set the tile on layer 2 to Mountain
						}
						else if (closestHeight > this.mountain_height - this.hills_tolerance)
						{
							this.set(i,j,1,0); // Set the tile to Grass if it's above sea level.
							this.set(i,j,5,1); // Set the tile on layer 2 to Hill
						}						
						else if (closestHeight > this.sea_height)
						{
							var tID = getRandomInt(1, 2);
							this.set(i,j,tID,0); // Set the tile to Grass or Desert if it's above sea level.
						}
						this.setVoronoi(i, j, closest);
						this.setHeight(i, j, closestHeight);
					}
				}
				
				this.createRivers();
				
				this.doBiomes();

				
			}
			,evolveBiomes: function()
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

						var riverCount = 0;
						if (this.get(i - 1, j    , 1).tileid == 13) { riverCount++; }
						if (this.get(i + 1, j    , 1).tileid == 13) { riverCount++; }
						if (this.get(i - 1, j - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i    , j - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i + 1, j - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i - 1, j + 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i    , j + 1, 1).tileid == 13) { riverCount++; }
						if (this.get(i + 1, j + 1, 1).tileid == 13) { riverCount++; }
						
						var desertCount = 0;
						if (this.get(i - 1, j    , 0).tileid == 2) { desertCount++; }
						if (this.get(i + 1, j    , 0).tileid == 2) { desertCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i    , j - 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i    , j + 1, 0).tileid == 2) { desertCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == 2) { desertCount++; }

						var grassCount = 0;
						if (this.get(i - 1, j    , 0).tileid == 2) { grassCount++; }
						if (this.get(i + 1, j    , 0).tileid == 2) { grassCount++; }
						if (this.get(i - 1, j - 1, 0).tileid == 2) { grassCount++; }
						if (this.get(i    , j - 1, 0).tileid == 2) { grassCount++; }
						if (this.get(i + 1, j - 1, 0).tileid == 2) { grassCount++; }
						if (this.get(i - 1, j + 1, 0).tileid == 2) { grassCount++; }
						if (this.get(i    , j + 1, 0).tileid == 2) { grassCount++; }
						if (this.get(i + 1, j + 1, 0).tileid == 2) { grassCount++; }

						var forestCount = 0;
						if (this.get(i - 1, j    , 1).tileid == 4) { forestCount++; }
						if (this.get(i + 1, j    , 1).tileid == 4) { forestCount++; }
						if (this.get(i - 1, j - 1, 1).tileid == 4) { forestCount++; }
						if (this.get(i    , j - 1, 1).tileid == 4) { forestCount++; }
						if (this.get(i + 1, j - 1, 1).tileid == 4) { forestCount++; }
						if (this.get(i - 1, j + 1, 1).tileid == 4) { forestCount++; }
						if (this.get(i    , j + 1, 1).tileid == 4) { forestCount++; }
						if (this.get(i + 1, j + 1, 1).tileid == 4) { forestCount++; }
							
						if (
							forestCount > this.forest_tolerance
							&& this.get(i, j, 1).tileid != 5
							&& this.get(i, j, 1).tileid != 6
							&& this.get(i, j, 1).tileid != 13
						)
						{
							if (this.get(i, j, 0).tileid == 1)
							{
								// Grassland to Forest.
								this.set(i, j, 4, 1);
							}
							else if (this.get(i, j, 0).tileid == 2 && (seaCount > 0 || forestCount > this.forest_tolerance * 4))
							{
								if (getRandomArbitrary(0, 1) > 0.6)
								{								// Plains to Forest.
									this.set(i, j, 4, 1);
								}
							}
						}
						if (
							(
								this.get(i, j, 0).tileid == 2
								&& this.get(i, j, 1).tileid == 13
							)
							|| (
								this.get(i, j, 0).tileid == 2 && (riverCount > 0 || seaCount > 0) && grassCount > 0
							)
						)
						{
							this.set(i, j, 1, 0)		// Upgrade to grassland
						}
						
						// Prevent forests from becoming too blobby: random die-off
						if (forestCount > 4 && this.get(i, j, 1).tileid == 4)
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
						if (this.get(x - 1, y    , 0).tileid == 0) { seaCount++; }
						if (this.get(x + 1, y    , 0).tileid == 0) { seaCount++; }
						if (this.get(x - 1, y - 1, 0).tileid == 0) { seaCount++; }
						if (this.get(x    , y - 1, 0).tileid == 0) { seaCount++; }
						if (this.get(x + 1, y - 1, 0).tileid == 0) { seaCount++; }
						if (this.get(x - 1, y + 1, 0).tileid == 0) { seaCount++; }
						if (this.get(x    , y + 1, 0).tileid == 0) { seaCount++; }
						if (this.get(x + 1, y + 1, 0).tileid == 0) { seaCount++; }

						var riverCount = 0;
						if (this.get(x - 1, y    , 1).tileid == 13) { riverCount++; }
						if (this.get(x + 1, y    , 1).tileid == 13) { riverCount++; }
						if (this.get(x - 1, y - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(x    , y - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(x + 1, y - 1, 1).tileid == 13) { riverCount++; }
						if (this.get(x - 1, y + 1, 1).tileid == 13) { riverCount++; }
						if (this.get(x    , y + 1, 1).tileid == 13) { riverCount++; }
						if (this.get(x + 1, y + 1, 1).tileid == 13) { riverCount++; }

						if (
							(this.get(x, y, 1).tileid == 6
							|| this.get(x, y, 1).tileid == 5)
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
						this.set(x, y, 13, 1);
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

						if (left.height == heights[0] && this.get(x - 1, y, 1).tileid != 13)
						{
							x--;
							dx = -1;
							dy = 0;
						}
						else if (up.height == heights[0] && this.get(x, y - 1, 1).tileid != 13)
						{
							y--;
							dy = -1;
							dx = 0;
						}
						else if (down.height == heights[0] && this.get(x, y + 1, 1).tileid != 13)
						{
							y++;
							dy = 1;
							dx = 0;
						}
						else if (right.height == heights[0] && this.get(x + 1, y, 1).tileid != 13)
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
				var f = parseInt(this.tset.tiledefs.contentJSON[tile.tileid].fertility)
					+ parseInt(this.tset.tiledefs.contentJSON[tile1.tileid].fertility)
					+ parseInt(this.tset.tiledefs.contentJSON[tile2.tileid].fertility);
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
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture});
				row.push.apply(row, this.tiles[l][y].slice(x + 1));
				this.tiles[l][y] = row;
			}
			,setObject: function (x, y, obj)
			{
				var l=0;
				if (this.tiles[l] == undefined) { return; }
				if (this.tiles[l][y] == undefined) { return; }
				var row = this.tiles[l][y].slice(0, x);
				var i = this.tiles[l][y][x].tileid;
				var units = this.tiles[l][y][x].units;
				if (units == undefined) { return; }
				var objects = this.tiles[l][y][x].objects;
				objects.push(obj);
				var discovered = this.tiles[l][y][x].discovered;
				var moisture = this.tiles[l][y][x].moisture;
				var h = this.tiles[l][y][x].height;
				var v = this.tiles[l][y][x].voronoi;
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture});
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
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture});
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
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": m});
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
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture});
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
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture});
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
				row.push({"tileid": i, "units": units, "voronoi": v, "height": h, "objects": objects, "discovered": discovered, "moisture": moisture});
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
											if (objects[i].type == 'Settlement'
												|| objects[i].type == 'Outpost'
												|| objects[i].type == 'Town')
											{
												return objects[0];
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
				}
				else
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
								if (objects[i].type == 'Settlement'
									|| objects[i].type == 'Outpost'
									|| objects[i].type == 'Town')
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
						newUnit.move(toX, toY);
						this.addUnit(toX, toY, newUnit);
						this.removeUnit(x, y, unit);
						this.exploreTile(toX, toY, unit);
						return newUnit;
					}
				}
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
		var ModelUnit = Backbone.Model.extend({
			name: "Unit"
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
			,bonusunitIDs: []
			,doAI: function ()
			{
				// Default AI Function
				if (this.abilities.settle && this.move_points > 0)
				{
					var tile = map.mapdata.get(this.x, this.y, 0);

					var fertility = map.tset.tiledefs.contentJSON[tile.tileid].fertility;
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
				if (arg.citizen != undefined)
				{
					this.citizen = arg.citizen;
				}
				if (arg.name != undefined)
				{
					this.name = arg.name;
				}
				if (arg.moves != undefined)
				{
					this.move_points = arg.moves;
					this.move_max = arg.moves;
				}
				if (arg.attack != undefined)
				{
					this.attack = arg.attack;
				}
				if (arg.defense != undefined)
				{
					this.defense = arg.defense;
				}
				if (arg.range != undefined)
				{
					this.range = arg.range;
				}
				if (arg.health != undefined)
				{
					this.health = arg.health;
					this.maxhealth = arg.health;
				}
				if (arg.bonusunitIDs != undefined)
				{
					this.bonusunitIDs = arg.bonusunitIDs;
				}
				if (arg.excludetileIDs != undefined)
				{
					this.excludetileIDs = arg.excludetileIDs;
				}
				if (arg.cost != undefined)
				{
					this.cost = arg.cost;
				}
				if (arg.costitemIDs != undefined)
				{
					this.costitemIDs = arg.costitemIDs;
				}
				if (arg.costpopulation != undefined)
				{
					this.costpopulation = arg.costpopulation;
				}
				if (arg.spriteset != undefined)
				{
					this.spriteset = arg.spriteset;
				}
				else
				{
					//this.spriteset = new Spriteset({spriteimage: arg.spriteimage, spritedefs: arg.spritedefs});
					alert("Critical Error! Unit Spriteset not defined");
				}
				if (arg.abilities != undefined)
				{
					this.abilities = arg.abilities;
				}
				if (arg.name != undefined)
				{
					this.name = arg.name;
				}
				if (arg.ownerID != undefined)
				{
					this.ownerID = arg.ownerID;
				}
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
		
// ***************** Item Definitions *****************		

		var ModelItem = Backbone.Model.extend({
			name: ""
			,variantName: ""
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: []
			,initialize: function(args)
			{
				if (args.name != undefined)
				{
					this.name = args.name;
				}
			}
		});

		var ModelWheat = ModelItem.extend({
			name: "Grain"
			,variantName: "Wheat"
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Farming"]
		});	
		
		var ModelRice = ModelItem.extend({
			name: "Grain"
			,variantName: "Rice"
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Farming"]
		});

		var ModelCorn = ModelItem.extend({
			name: "Grain"
			,variantName: "Corn"
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Farming"]
		});

		var ModelMutton = ModelItem.extend({
			name: "Meat"
			,variantName: "Mutton"
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Pastoralism"]
		});
				
		var ModelBeef = ModelItem.extend({
			name: "Meat"
			,variantName: "Beef"
			,url: ""
			,typeid: "food"
			,manufactureid: "farm"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Pastoralism"]
		});
		
		var ModelApple = ModelItem.extend({
			name: "Fruit"
			,variantName: "Apple"
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
				
		var ModelOrange = ModelItem.extend({
			name: "Fruit"
			,variantName: "Orange"
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
				
		var ModelCherry = ModelItem.extend({
			name: "Fruit"
			,variantName: "Cherry"
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});

		var ModelGrape = ModelItem.extend({
			name: "Fruit"
			,variantName: "Grape"
			,url: ""
			,typeid: "food"
			,manufactureid: "vinyard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Viticulture"]
		});
	
		var ModelPear = ModelItem.extend({
			name: "Fruit"
			,variantName: "Pear"
			,url: ""
			,typeid: "food"
			,manufactureid: "orchard"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
			
		var ModelOlive = ModelItem.extend({
			name: "Fruit"
			,variantName: "Olive"
			,url: ""
			,typeid: "food"
			,manufactureid: "grove"
			,max_price: 10
			,min_price: 1
			,qualityFactor: 1
			,luxury: false
			,food: true
			,weapon: false
			,armour: false
			,helm: false
			,shield: false
			,arrow: false
			,qty: 1
			,techRequirement: ["Orchards"]
		});
			

// ******************************************************		
		
		var ModelBuilding = Backbone.Model.extend({
			name: "Plantation"
			,url: ""
			,typeid: 0	// Plantation/Mine/etc. Basically, raw materials.
			,buildCost: undefined
			,produces: undefined
			,consumes: undefined
			,citizens: []
			,city: undefined
			,initialize: function(args)
			{
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
				
			}
		});
		var ModelSettlement = Backbone.Model.extend({
			name: "Outpost"
			,type: "Outpost"
			,url: ""
			,citizens: []
			,inventory: []
			,x: 0
			,y: 0
			,buildings: []
			,units: []
			,food: 0
			,food_growth: 10
			,ownerID: undefined
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
					var typeid = createUnit_TYPES[migrant.type];
					var unit = createUnit(map, this.x, this.y, typeid, this.ownerID, migrant);
					console.log(unit);
					this.food = 0;
				}
				
			}
			,initialize: function (arg)
			{
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
			,initialize: function (arg)
			{
				this.mapdata = arg.mapdata;
				//this.mapdata.generate();
				this.tset = arg.tileset;
				this.mapdata.tset = this.tset;
				this.unitdefs = unitdefs;
			}
			,draw: function ()
			{
				var dtx; var dty;
				if (this.el == undefined) { return; }
				if (this.tset == undefined) { return; }
				if (this.mapdata == undefined) { return; }

				var ctx = document.getElementById(this.el).getContext("2d");
				this.tset.el = "#" + this.el;
				ctx.fillStyle = "#cacaca";
				ctx.fillRect(0, 0, 800, 800);

				var dx = 0; var dy = 0;
			
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
								if (
									(l == 2 && tile.discovered[playerCurrent])
									|| (l != 2)
								)
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
											
											if (up.tileid != 13 && down.tileid != 13)
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
											}																
											this.tset.drawIndex(tid, dx, dy);
										}
										else if (tile.tileid == 4)
										{
											var up		= this.mapdata.get(i, k - 1, 1);
											var down	= this.mapdata.get(i, k + 1, 1);
											var left	= this.mapdata.get(i - 1, k, 1);
											var right	= this.mapdata.get(i + 1, k, 1);
											var tid = tile.tileid;
											
											if (up.tileid != 4 && left.tileid != 4)
											{
												tid = 20;
											}
											if (up.tileid != 4 && right.tileid != 4)
											{
												tid = 21;
											}
											if (left.tileid != 4 && down.tileid != 4)
											{
												tid = 22;
											}
											if (right.tileid != 4 && down.tileid != 4)
											{
												tid = 23;
											}
											if (right.tileid != 4 && down.tileid != 4
												&& up.tileid != 4 && left.tileid != 4)
											{
												tid = 24;
											}													
											this.tset.drawIndex(tid, dx, dy);
										}
										var t = this.mapdata.get(i,k,0);										
									}

									// Draw Objects
									if (tile.objects != undefined)
									{
										if (l == 2 && tile.objects.length > 0) // Rendering Object layer (layer 3)
										{
											for (var o=0; o < tile.objects.length; o++)
											{
												if (tile.objects[o].type == "settlement"
													|| tile.objects[o].type == "town"
													|| tile.objects[o].type == "outpost")
												{									
													ctx.fillStyle = "#fff";
													ctx.strokeStyle = "#000";
													ctx.font = "16px Arial";
													var w = ctx.measureText(tile.objects[o].name).width;
													ctx.strokeText(tile.objects[o].name, dx + 16 - Math.floor(w / 2), dy + 34);
													ctx.fillText(tile.objects[o].name, dx + 16 - Math.floor(w / 2), dy + 34);
												}
											}
										}
									}
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
									if (this.tooltip.text.length > 0
										&& (i == this.tooltip.x	&& k == this.tooltip.y)
									)
									{
										dtx = dx;
										dty = dy;
									}
								}
								else
								{
									this.tset.drawTile("unexplored", dx, dy);
								}
							}
							
							dx += this.tset.tileWidth();
						}
						dy += this.tset.tileHeight();
						dx = 0;
					}
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
					var tname = this.tset.tiledefs.contentJSON[tile0.tileid].name;
					if (tile1.tileid > 0)
					{
						tname += ", " + this.tset.tiledefs.contentJSON[tile1.tileid].name;
					}
					if (tile2.tileid > 0)
					{
						tname += ", " + this.tset.tiledefs.contentJSON[tile2.tileid].name;
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
								if (
									(l == 2 && tile.discovered[playerCurrent])
									|| (l != 2)
								)
								{
									// Draw Tiles
									if ((l == 0) || (l > 0 && tile.tileid > 0))
									{
										//this.tset.drawIndex(tile.tileid, dx, dy);
										//var t = this.mapdata.get(i,k,0);
										var tileid = tile.tileid;
										if (this.tset.tiledefs.contentJSON[tileid] != undefined)
										{
											var colr = this.tset.tiledefs.contentJSON[tileid].colour;
											ctx.fillStyle = colr;
											ctx.fillRect(dx, dy, scalex, scaley);
										}
									}

									// Draw Objects
									/*if (tile.objects != undefined)
									{
										if (l == 2 && tile.objects.length > 0) // Rendering Object layer (layer 3)
										{
											for (var o=0; o < tile.objects.length; o++)
											{
												if (tile.objects[o].type == "settlement")
												{									
													ctx.fillStyle = "#fff";
													ctx.strokeStyle = "#000";
													ctx.font = "16px Arial";
													var w = ctx.measureText(tile.objects[o].name).width;
													ctx.strokeText(tile.objects[o].name, dx + 16 - Math.floor(w / 2), dy + 34);
													ctx.fillText(tile.objects[o].name, dx + 16 - Math.floor(w / 2), dy + 34);
												}
											}
										}
									}
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
									}*/
								}
								else
								{
									this.tset.drawTile("unexplored", dx, dy);
								}
							}
							/*							var tile = this.mapdata.get(i, k, l);
							var tileid = tile.tileid;
							/*if (tile.discovered != undefined)
							{
								if (!tile.discovered[playerCurrent] && l == 2)
								{
									tileid = TILE_UNEXPLORED;
								}
							}
//							if (l == 2) {console.log(tileid);}
							if (this.tset.tiledefs.contentJSON[tileid] != undefined) 
							{if (tileid == 2) {console.log("Drawing plains!");}
								var colr = this.tset.tiledefs.contentJSON[tileid].colour;
								ctx.fillStyle = colr;
								ctx.fillRect(dx, dy, scalex, scaley);
							}*/
							

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
				
				var outpost = this.tset.getName("Outpost");
				var outpostid = this.tset.getIndexByName("Outpost");
				this.mapdata.set(x, y, outpostid, outpost.layer);
				this.mapdata.addObject(x, y, settlement, outpost.layer);
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
			name: "Spriteset"
			,url: ""
			,image: undefined
			,spritewidth: 32
			,spriteheight: 32
			,coordlist: []
			,load: function (url)
			{
				this.image = new Image();
				if (url == undefined)
				{
					url = this.url + "?v=" + tokenx36();
				}
				this.image.src = url;// + "?t=" + tokenx36();
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
			,framecount: 0.0
			,increment: 1.0
			,animname: "Walk North"
			,animid: 0
			,tset: undefined
			,spritedefs: undefined
			,initialize: function (arg)
			{
				this.tset = new ModelSpriteset();
				if (arg.spriteimage != undefined)
				{
					this.spriteimage_file = arg.spriteimage;
					this.tset.load(arg.spriteimage);
				}
				this.spritedefs = new ModelJSON();
				if (arg.spritedefs != undefined)
				{
					this.loadSprites(arg.spritedefs);
					this.spritedefs_file = arg.spritedefs;
				}
			}
			,loadSprites: function (url)
			{
				var me = this;
				this.spritedefs.onComplete = function ()
					{
						for (var i=0; i < this.contentJSON.length; i++)
						{
							var t = this.contentJSON[i]; 
							var sprite = jQuery.extend(true, {}, t);
							me.tset.addSprite(sprite.name, sprite.frames);
						}
					}
				this.spritedefs.load(url + "?t=" + tokenx36());
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
				for (var i=0; i<this.spritedefs.contentJSON.length; i++)
				{
					if (this.spritedefs.contentJSON[i].name == name)
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
				if (this.spritedefs.contentJSON[id] != undefined)
				{
					this.animname = this.spritedefs.contentJSON[id].name;
					this.animid = id;
					return true;
				}
				return false;
			}
			,getIndexByName: function (name)
			{
				return this.tset.getIndexByName(name);
			}
			,load: function (url)
			{
				this.tset.load(url);
			}
			,draw: function (x, y)
			{
				var frame = this.tset.getSprite(this.animid).frames; 
				if (frame != false)
				{
					if (this.tset.image != undefined)
					{
						var framecount = Math.floor(this.framecount);
						var sx = frame[framecount].x;
						var sy = frame[framecount].y;
						var sw = frame[framecount].w;
						var sh = frame[framecount].h;
						var ctx = $("#contents").get(0).getContext("2d");
						ctx.drawImage(this.tset.image, sx, sy, sw, sh, x, y, sw, sh);
					}
					else
					{
						console.log("Sprite error", this.tset);	
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
					this.loadTiles(arg.tiledefs);
				}
			}
			,loadTiles: function (url)
			{
				var me = this;
				this.tiledefs.onComplete = function ()
					{
						var elements = "";
						for (var i=0; i < this.contentJSON.length; i++)
						{
							var t = this.contentJSON[i];
							var tile = jQuery.extend(true, {}, t);
							me.tset.addTile(tile.name, tile.x, tile.y, tile.layer, tile.movecost);
							elements += "<li class='tileselection'>" + tile.name + " (" + tile.x + ", " + tile.y + ")</li>";
						}
						if (me.showTilebox)
						{
							$(me.el_tilebox).html(elements);
							$(me.el_tilebox + " > li").css({
								"list-style-type": "none"
								,"display": "none"
								,"padding-right": "5px"
								,"cursor": "pointer"
							});
							$(me.el_tilebox + " > li").hover(function () {
								$(this).css("background-color", "#ccc");
							}
							,function () {
								$(this).css("background-color", "#fff");
							});
							$(me.el_tilebox + " > li").click(function () {
								$(me.el_tilebox + " > li").css("color", "#000");
								$(this).css("color", "#f00");
								tool_tileindex = $(this).index();
							});
						}
					}
				this.tiledefs.load("tiledefs.json");
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



		// ********************************************************