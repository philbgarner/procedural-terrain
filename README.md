JavaScript Procedural RPG Generator
==========================================

Procedurally generated RPG world. Takes a random # seed and generates land, sea, rivers, etc. Places some starting 'units' and the world evolves over time. 2D top-down style turn-based RPG.
Still in development, this version shows the map generator based on voronoi diagrams, some towns support and basic units.

Inspired by procedural games such as Dwarf Fortress and Ultima Ratio Regnum, I have always wanted to create a top-down 2d JRPG style engine that is almost completely procedurally generated, the only human created assets being the graphics themselves and the base items in the game.

In the future I may consider trying my hand at creating the tiles procedurally also, however what I'm really interested in exploring in this project are the dialogue, battle and economic aspects of a JRPG. That means that I will be attempting to implement a scrolling tile engine for the overworld map, along with a side-view for fighting battles reminiscent of the Final Fantasy series of RPGs. Getting Started

Implementing this system would be pretty difficult without using some libraries to help JavaScript, so for this game I will be using jQuery for it's element selection/manipulation methods, its AJAX methods and also Backbone to take advantage of its object-oriented model/view/collection architecture. The default random number generator in JavaScript is not sufficient for this project either, because we need to be able to supply a seed to the map generator and have everything pre-generate the exact same way every time (as long as the other parameters are set the same also). This functionality is provided by ChanceJS.

