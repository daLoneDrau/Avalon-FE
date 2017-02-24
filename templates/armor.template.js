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
			    	    <th class="head text-center">Weight and Vulnerability</th> \
			    	    <th class="head text-center">Protects against</th> \
					    <th colspan=3 class="text-center">Gold Price</th> \
		    	    </tr> \
				    <tr> \
						<th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub text-center">Intact</th> \
					    <th class="sub text-center">Damaged</th> \
					    <th class="sub text-center">Destroyed</th> \
				    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in entities | filter: nonmagicFilter | orderBy:[\'types[1].flag\']"> \
				        <td>{{entity.title}}</td> \
				        <td class="text-center">{{entity.weight_class.harm_name}}</td> \
				        <td class="text-center"> \
    						<span ng-repeat="protection in entity.protections"><span ng-show="!$first">, </span>{{protection.name}}</span> \
    					</td> \
				        <td class="text-center">{{entity.price}}</td> \
				        <td class="text-center">{{entity.price_damaged}}</td> \
        				<td class="text-center"><span ng-if="entity.price_destroyed==0">-</span><span ng-if="entity.price_destroyed>0">{{entity.price_destroyed}}</span></td> \
				    </tr> \
			    	<tr ng-repeat="entity in entities | filter: magicFilter | orderBy:[\'types[1].flag\']"> \
				        <td ng-class="{section:$first, last:$last}">{{entity.title}}</td> \
				        <td class="text-center" ng-class="{section:$first, last:$last}">{{entity.weight_class.harm_name}}</td> \
				        <td class="text-center" ng-class="{section:$first, last:$last}"> \
							<span ng-repeat="protection in entity.protections"><span ng-show="!$first">, </span>{{protection.name}}</span> \
						</td> \
				        <td class="text-center" ng-class="{section:$first, last:$last}">{{entity.price}}</td> \
				        <td class="text-center" ng-class="{section:$first, last:$last}">{{entity.price_damaged}}</td> \
						<td class="text-center" ng-class="{section:$first, last:$last}"><span ng-if="entity.price_destroyed==0">-</span><span ng-if="entity.price_destroyed>0">{{entity.price_destroyed}}</span></td> \
				    </tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('armor', multiStr);
});