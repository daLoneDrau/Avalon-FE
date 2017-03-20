/* jshint multistr: true */
/* jshint node: true */
"use strict";

// production
//var httpBasicBase = "http://service-osrapi.rhcloud.com/OSRAPI/basic_dnd/";

// local
var httpBasicBase = "http://localhost:8080/AvalonService/avalon/";

angular.module('restApp').factory('advantagesService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'advantages' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('armorConditionService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'armor_conditions' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('armorProtectionService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'armor_protections' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('attackTypeService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'attack_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('dailyPeriodService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'daily_periods' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('equipmentSlotService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'equipment_slots' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByCode = function (code) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/code/" + code));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('gameActionService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'game_actions' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('genderService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'genders' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('groupService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'groups' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, division));
        return defer.promise;
    };
    dataFactory.updateEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, division));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('horseTypeService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'horse_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, division));
        return defer.promise;
    };
    dataFactory.updateEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, division));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('magicColorService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'magic_colors' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByLongName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/long_name/" + name));
        return defer.promise;
    };
    dataFactory.getEntityByShortName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/short_name/" + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, division));
        return defer.promise;
    };
    dataFactory.updateEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, division));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('magicTypeService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'magic_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByCode = function (code) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/code/" + code));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});


angular.module('restApp').factory('objectTypeService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'object_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByCode = function (code) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/code/" + code));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});


angular.module('restApp').factory('vulnerabilityService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'vulnerabilities' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByCode = function (code) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/code/" + code));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('itemService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'io_item_data' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + '/name/' + name));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('npcService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'io_npc_data' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        return $http.get(urlBase + '/name/' + name);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('characterService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'io_pc_data' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        return $http.get(urlBase + '/name/' + name);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('tileService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'hex_tiles' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        return $http.get(urlBase + '/name/' + name);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
