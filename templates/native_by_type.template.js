/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
	    <div class="col-sm-12"> \
	    	<table class="table"> \
    			<thead> \
		    	    <tr> \
	    				<th class="head">Name</th> \
			    	    <th class="head">Weapon</th> \
			    	    <th class="head">Length</th> \
	    				<th class="head">Vulnerability</th> \
	    				<th class="head">Basic Gold Wage</th> \
					    <th colspan=2 class="text-center">Bounty</th> \
	    				<th class="head">Move Strength</th> \
	    				<th class="head">Weight</th> \
		    	    </tr> \
				    <tr> \
						<th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub">Notoriety</th> \
					    <th class="sub">Gold</th> \
	    				<th class="sub"></th> \
	    				<th class="sub"></th> \
				    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in types | orderBy:[\'-vulnerability.value\']"> \
				        <td ng-class="{section:$first, last:$last}">{{entity.title}}</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.equipped_items.EQUIP_SLOT_WEAPON.attack_method.name}}</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.equipped_items.EQUIP_SLOT_WEAPON.weapon_length}}</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.vulnerability.weight_class}}</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.wage}}</td> \
        				<td ng-class="{section:$first, last:$last}">{{entity.notoriety}}</td> \
						<td ng-class="{section:$first, last:$last}">{{entity.gold_bounty}}</td> \
						<td ng-class="{section:$first, last:$last}">{{entity.move_strength.weight_class}}</td> \
						<td ng-class="{section:$first, last:$last}">{{entity.weight.weight_class}}</td> \
        			</tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('nativesByType', multiStr);
});