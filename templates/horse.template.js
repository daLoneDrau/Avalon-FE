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
	    				<th>Name</th> \
			    	    <th>Vulnerability</th> \
			    	    <th>Move Bonus</th> \
					    <th>Gallop</th> \
					    <th>Walk</th> \
					    <th>Gold Price</th> \
		    	    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in entities | filter: ponyFilter | orderBy:[\'-price\',\'name\']"> \
				        <td>{{entity.title}}</td> \
				        <td>{{entity.weight_class.harm_name}}</td> \
    					<td>Double movement</td> \
				        <td> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    </td> \
				        <td> \
    						<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    </td> \
        				<td>{{entity.price}}</td> \
				    </tr> \
			    	<tr ng-repeat="entity in entities | filter: workhorseFilter | orderBy:[\'-price\',\'name\']"> \
			        	<td ng-class="{section:$first}">{{entity.title}}</td> \
				        <td ng-class="{section:$first}">{{entity.weight_class.harm_name}}</td> \
						<td ng-class="{section:$first}"> Extra move phase</td> \
				        <td ng-class="{section:$first}"> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    </td> \
				        <td ng-class="{section:$first}"> \
							<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    </td> \
						<td ng-class="{section:$first}">{{entity.price}}</td> \
				    </tr> \
			    	<tr ng-repeat="entity in entities | filter: warhorseFilter | orderBy:[\'-price\',\'name\']"> \
				        <td ng-class="{section:$first, last:$last}">{{entity.title}}</td> \
				        <td ng-class="{section:$first, last:$last}"> \
    						{{entity.weight_class.harm_name}} & Armored</span> \
						</td> \
						<td ng-class="{section:$first, last:$last}">None</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    </td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    </td> \
						<td ng-class="{section:$first, last:$last}">{{entity.price}}</td> \
				    </tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('horses', multiStr);
});