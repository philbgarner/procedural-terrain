var unitdefs = [
	{
		"name": "Spearman"
		,"spriteimage": "images/spearman32.png"
		,"spritedefs": "spearman_spritedefs.json"
		,"spriteset": new Spriteset({spriteimage: "images/spearman32.png", spritedefs: "spearman_spritedefs.json"})
		,"moves": 2
		,"health": 5
		,"attack": 2
		,"defense": 3
		,"range": 1
		,"bonusunitIDs": []
		,"excludetileIDs": [0]
		,"cost": 10
		,"costitemIDs": []
		,"costpopulation": 1
	}
	,{
		"name": "Archer"
		,"spriteimage": "images/archer32.png"
		,"spritedefs": "archer_spritedefs.json"
		,"spriteset": new Spriteset({spriteimage: "images/archer32.png", spritedefs: "archer_spritedefs.json"})
		,"moves": 2
		,"health": 5
		,"attack": 2
		,"range": 1
		,"defense": 3
		,"bonusunitIDs": []
		,"excludetileIDs": [0]
		,"cost": 10
		,"costitemIDs": []
		,"costpopulation": 1
	}
]
