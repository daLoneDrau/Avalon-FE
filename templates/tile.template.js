/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
	    <div class="col-sm-12"> \
    		Tiles <br>\
    		<div class="tile_space" ng-bind-html="tile_markup"></div> \
	    </div> \
    </div> \
    ';
    $templateCache.put('tiles', multiStr);
});