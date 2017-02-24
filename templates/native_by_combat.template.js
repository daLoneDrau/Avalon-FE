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
	    				<th class="head">Native</th> \
			    	    <th class="head">Type</th> \
	    				<th colspan=2 class="text-center">Unalerted Native</th> \
						<th colspan=2 class="text-center">Alerted Native</th> \
			    	    <th class="head">Horse</th> \
						<th colspan=2 class="text-center">Unalerted Horse</th> \
						<th colspan=2 class="text-center">Alerted Horse</th> \
		    	    </tr> \
				    <tr> \
						<th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub">Attack</th> \
					    <th class="sub">Move</th> \
					    <th class="sub">Attack</th> \
					    <th class="sub">Move</th> \
					    <th class="sub"></th> \
					    <th class="sub">Weight</th> \
					    <th class="sub">Speed</th> \
					    <th class="sub">Weight</th> \
					    <th class="sub">Speed</th> \
				    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in entities | orderBy:[\'id\']"> \
        				<td ng-class="{section:$first, last:$last}">{{entity.name}}</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.title}}</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="entity.unalerted_weight_class.code != \'N\'"> \
    							{{entity.unalerted_attack_weight.code}}</span> \
							<span ng-if="entity.unalerted_attack_speed > 0">{{entity.unalerted_attack_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.unalerted_attack_stars) track by $index">*</span> \
    					</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.unalerted_move}}</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'"> \
								{{entity.alerted_attack_weight.code}}</span> \
							<span ng-if="entity.alerted_attack_speed > 0">{{entity.alerted_attack_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.alerted_attack_stars) track by $index">*</span> \
						</td> \
					    <td ng-class="{section:$first, last:$last}">{{entity.alerted_move}}</td> \
				        <td ng-class="{section:$first, last:$last}"> \
    						<span ng-if="hasHorse(entity)">{{getHorseTitle(entity)}}</span> \
    					</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="hasHorse(entity)">{{getUnalertedHorseWeight(entity)}}</span> \
						</td> \
					        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="hasHorse(entity)">{{getUnalertedHorseSpeed(entity)}}</span> \
						</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="hasHorse(entity)">{{getAlertedHorseWeight(entity)}}</span> \
						</td> \
					        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="hasHorse(entity)">{{getAlertedHorseSpeed(entity)}}</span> \
						</td> \
        			</tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('nativesByCombat', multiStr);
});