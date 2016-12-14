'use strict';

define(['underscore'], function () {

    var BaseGroupModel = function (MessageConstant) {

        //constructor
        function BaseGroupModel(model, groupTitle) {

            /* holds group item model */
            this.itemModel = model;

            /* holds group title/name */
            this.groupTitle = groupTitle;

            /* holds available data items */
            this.groupItems = [];

            /* holds all data item count */
            this.dataItemCount = 0;

            /* holds the group active/visible status */
            this.isGroupActive = false;

            /* holds the group active/visible select status */
            this.isAllowSelect = false;

            /* data status, holds the updated status of data availability */
            this.dataStatus = MessageConstant.LOADING;

        };

        /*
         * provides group title
         * @returns {String} groupTitle
         */
        BaseGroupModel.prototype.getGroupTitle = function () {
            return this.groupTitle;
        };

        /*
         * provides all available group data items
         * @returns {Array} data
         */
        BaseGroupModel.prototype.getDataItems = function () {
            return this.groupItems;
        };

        /*
         * sets all data item count
         * @param {String} count
         */
        BaseGroupModel.prototype.setDataItemCount = function (count) {
            this.dataItemCount = count;
        };

        /*
         * provides all data item count
         * @returns {String} dataItemCount
         */
        BaseGroupModel.prototype.getDataItemCount = function () {
            return this.dataItemCount;
        };

        /*
         * sets the group active/visible status
         * @param {Boolean} status
         */
        BaseGroupModel.prototype.setActive = function (status) {
            this.isGroupActive = status;
        };

        /*
         * provides the group active/visible status
         * @returns {String} dataItemCount
         */
        BaseGroupModel.prototype.isActive = function () {
            return this.isGroupActive;
        };

        /* sets the group active/visible select status
        * @param {Boolean} status
        */
        BaseGroupModel.prototype.setAllowSelect = function (status) {
            this.isAllowSelect = status;
        };

        /*
         * provides the group active/visible select status
         * @returns {String} isAllowSelect
         */
        BaseGroupModel.prototype.allowSelect = function () {
            return this.isAllowSelect;
        };

        /*
         * provides next page data for collection on the basis of defined client and server page sizes
         * @param {Function} callback - returns data items
         */
        BaseGroupModel.prototype.getNextPageData = function (callback) {

            var self = this;

            /* registering callback */
            this.itemModel.pagingParams.pageDataCallback = this.itemModel.pagingParams.pageDataCallback || function (data) {

                /* notify caller if callback is defined */
                if (callback) {
                    callback.call(self, data);
                    return;
                };

                /* adding data to item array */
                _.each(data, function (item) {
                    self.groupItems.push(item);
                });

                /* updating data status */
                self.updateDataStatus();
                
            };
            this.itemModel.getNextPageData();
        };

        /**
         * updates data status loading/complete.
         */
        BaseGroupModel.prototype.updateDataStatus = function () {
            if (this.groupItems.length === 0) {
                this.dataStatus = MessageConstant.NO_RECORDS_FOUND;
            } else {
                this.dataStatus = "";//clearing status
            }
        };

        /*
         * provides the data for collection
         * @param {Function} callback - returns data items
         */
        BaseGroupModel.prototype.getData = function () {
            var self = this;
            this.itemModel.url = this.itemModel.getModelBaseUrl() + this.itemModel.getODataQuery().toString();
            this.itemModel.isSpinner = true;
            this.itemModel.get().then(function (response) {
                self.groupItems = response;
            }, function (reason) {
                //error
            });;
        };

        /*
         * clear all data items and resets paging countersfrom group
         */
        BaseGroupModel.prototype.clearData = function () {
            this.itemModel.resetPagingParams();
            this.groupItems = [];
            this.dataStatus = MessageConstant.LOADING;
        };

        return BaseGroupModel;
    };

    return ['EMD.MessageConstant', BaseGroupModel];
});
