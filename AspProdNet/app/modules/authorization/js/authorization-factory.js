'use strict';

define([], function () {

    var AuthorizationFactory = function ($q,
        PermissionStore,
        EMDConstant,
        StorageFactory
        ) {
        return {
            setAllPermission: function () {
                var deferredObj = $q.defer();
                var self = this;
                if (StorageFactory.get("Presentation")) {
                    //PresentationStaffFactory.getPresentationRoles()
                    //    .then(function (response) {
                    //        var roleIds = _.unique(_.pluck(response, 'RoleId'));
                    //        //Roles and Permission :Define Permission
                    //        //Clear Permission
                    //        //PermissionStore.clearStore();
                    //        StorageFactory.set("URLROLES", JSON.stringify(roleIds));
                    //        self.setAllPermissionRoles(roleIds);
                    //        deferredObj.resolve();
                    //    }).catch(function (error) {
                    //        deferredObj.resolve();
                    //    });
                }
                return deferredObj.promise;
            },
            getAuthorizationRoles: function () {
                return StorageFactory.get("URLROLES");
            },
            setPermissionFromStorage: function (roleType) {
                return this.setAllPermissionRoles(JSON.parse(StorageFactory.get("URLROLES")), EMDConstant.EMD_ROLES[roleType]);
            },
            setAllPermissionRoles: function (roleIds) {
                PermissionStore.definePermission('Administrator', function () {
                    return _.contains(roleIds, EMDConstant.EMD_ROLES.Administrator);
                });
                PermissionStore.definePermission('Customer_Administrator', function () {
                    return _.contains(roleIds, EMDConstant.EMD_ROLES.Customer_Administrator);
                });
                PermissionStore.definePermission('Finance', function () {
                    return _.contains(roleIds, EMDConstant.EMD_ROLES.Finance);
                });
            }
        }
    }

    return ['$q',
        'PermissionStore',
        'EMD.AppConstant',
        'StorageFactory',
        AuthorizationFactory];
});


