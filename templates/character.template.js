/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
	    <basic-nav></basic-nav> \
	    <div class="col-sm-9"> \
		    <!-- -------------------- --> \
		    <!-- Select PC --> \
		    <!-- -------------------- --> \
    		<div class="col-sm-12"> \
		        <div class="form-group"> <!-- Select Entity --> \
			        <label for="selEntity" class="control-label col-sm-4">Choose:</label> \
					<div class="col-sm-8"> \
			        	<select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.name | uppercase for entity in entities track by entity.id"> \
			            	<option value="">---Please select---</option> <!-- not selected / blank option --> \
			        	</select> \
					</div> \
				</div> \
    		</div> \
		    <!-- -------------------- --> \
		    <!-- View PC --> \
		    <!-- -------------------- --> \
    		<div class="col-sm-4">&nbsp;</div> \
			<div class="col-sm-4"> \
				<h3 style="float:left;margin-right:5px;padding-top:6px;" ng-if="entitySelect!=null"><em>The</em></h3><h2 style="float:left;">{{entitySelect.name}}</h2> \
			</div> \
			<div class="col-sm-6"> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<strong>Weight/Vulnerability:</strong> {{entitySelect.vulnerability.harm_name}} \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"><strong>Special Advantages:</strong></div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
		    		<strong>{{entitySelect.advantage_one.name}}:</strong> {{entitySelect.advantage_one.description}} \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<strong>{{entitySelect.advantage_two.name}}:</strong> {{entitySelect.advantage_two.description}} \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"><strong>Trading Relationship:</strong></div> \
    			<div class="col-sm-12" ng-if="entitySelect.friendly!=null">Friendly: <span ng-repeat="group in entitySelect.friendly"><span ng-if="!$first">, </span>{{group.name}}</span></div> \
				<div class="col-sm-12" ng-if="entitySelect.friendly!=null">Unfriendly: <span ng-repeat="group in entitySelect.unfriendly"><span ng-if="!$first">, </span>{{group.name}}</span></div> \
    		</div> \
			<div class="col-sm-6"> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<em>{{entitySelect.evaluation}}</em> \
				</div> \
    			<div class="col-sm-12" ng-if="entitySelect!=null"> \
    				<strong>Starting Location:</strong> {{entitySelect.starting_location}} \
    			</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null" style="margin-bottom: 10px;"> \
					<strong>Development/Combat Chits:</strong> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
    				<div class="col-sm-3"">{{entitySelect.stage_one_name}}</div> \
    				<div class="box text-center" \
    						ng-class="{move: action.type.name==\'MOVE\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
    						ng-repeat="action in entitySelect.stage_one_actions"> \
    					<span class="smallest">{{action.type.name}}</span><br> \
    					<span class="pill">{{action.strength.code}}{{action.speed}}</span><br> \
    					<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
    				</div> \
    				<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_one_equipped_items"> \
						{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
    				</span> \
    			</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<div class="col-sm-3"">{{entitySelect.stage_two_name}}</div> \
					<div class="box text-center" \
							ng-class="{move: action.type.name==\'MOVE\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
							ng-repeat="action in entitySelect.stage_two_actions"> \
						<span class="smallest">{{action.type.name}}</span><br> \
						<span class="pill">{{action.strength.code}}{{action.speed}}</span><br> \
						<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
					</div> \
					<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_two_equipped_items"> \
    					{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
    				</span> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<div class="col-sm-3"">{{entitySelect.stage_three_name}}</div> \
					<div class="box text-center" \
							ng-class="{move: action.type.name==\'MOVE\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
							ng-repeat="action in entitySelect.stage_three_actions"> \
						<span class="smallest">{{action.type.name}}</span><br> \
						<span class="pill">{{action.strength.code}}{{action.speed}}</span><br> \
						<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
					</div> \
					<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_three_equipped_items"> \
						{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
					</span> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<div class="col-sm-3"">{{entitySelect.name}}</div> \
					<div class="box text-center" \
							ng-class="{move: action.type.name==\'MOVE\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
							ng-repeat="action in entitySelect.stage_four_actions"> \
						<span class="smallest">{{action.type.name}}</span><br> \
						<span class="pill">{{action.strength.code}}{{action.speed}}</span><br> \
						<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
					</div> \
					<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_four_equipped_items"> \
						{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
					</span> \
				</div> \
    		</div> \
    	</div> \
    </div> \
    ';
    $templateCache.put('characters', multiStr);
});