var TerrainEnum = {
		NUM_SIDES: 6,
		CLEARING: 64,
		FOREST: 128,
		FOREST_GOLD: 132,
		FOREST_GOLD_GREY_PURPLE: 134,
		FOREST_GREY: 131,
		FOREST_PURPLE: 133,
		GRASS: 135,
		GRASS_GREY: 136,
		MOUNTAIN: 129,
		RUINS: 9,
		properties: {
			128: {name: "forest", value: 128 },
			132: {name: "gold forest", value: 132 },
			134: {name: "forest gold grey purple", value: 134 },
			131: {name: "grey forest", value: 131 },
			133: {name: "purple forest", value: 133 },
			135: {name: "grass", value: 135 },
			136: {name: "grey grass", value: 136 },
			129: {name: "mountain", value: 129 },
			130: {name: "ruins", value: 130 }
		}
};
if (Object.freeze) {
	Object.freeze(TerrainEnum);
}