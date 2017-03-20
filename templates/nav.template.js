/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
<!-- this menu will only be visible when screen is large. --> \
<div class="col-md-2 col-md-offset-1 visible-lg"> \
    <h2>Menu Item</h2> \
    <ul class="nav"> \
        <li class="nav-item"><a class="nav-link active" href="#!characters">Characters</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!weapons">Table I.1: List of Weapons</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!horses">Table I.2: List of Horses</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!armor">Table I.3: List of Armor</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!nativesbytype">Table I.4: List of Natives</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!nativesbycombat">Table I.5: Native Combat Statistics</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!monsters">Table I.6: List of Monsters</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!tiles">Tiles</a></li> \
    </ul> \
</div> \
<!-- this menu will only be visible when screen is medium or small. extra small has no menu. --> \
<div class="col-xs-2 col-xs-offset-1 visible-md visible-sm"> \
    <h3>Short Menu</h3> \
    <ol> \
        <li class="nav-item"><a class="nav-link active" href="#!characters">Characters</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!weapons">Weapons</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!horses">Horses</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!armor">Armor</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!natives">Natives</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!nativesbycombat">Natives In Combat</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!monsters">Natives In Combat</a></li> \
        <li class="nav-item"><a class="nav-link active" href="#!tiles">Tiles</a></li> \
    </ol> \
</div> \
    ';
    $templateCache.put('basic_nav', multiStr);
});