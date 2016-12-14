$(document).ready(function () {

    BindData();
});

function BindData() {
    BindRawData();
    BindPackData();
    BindClrData();
    BindMchData();
    BindOthrsData();
}
function statusString(cellvalue, options, rowObject) {
    if (cellvalue == 0)
        return "In-Stock";
    else
        return "Out-Of-Stock";
}
function BindRawData() {
    $("#grdRaw").jqGrid({
        datatype: "local",
        colNames: ['wMaterialId', 'Brand Name', 'Bag No', 'Type', 'Status', 'Date-Time'],
        colModel: [
            { name: 'wMaterialId', index: 'wMaterialId', hidden: true },
            { name: 'BrandName', index: 'BrandName' },
            { name: 'BagNo', index: 'BagNo' },
             { name: 'sType', index: 'sType' },
             { name: 'Status', index: 'Status', formatter: statusString },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        multiselect: false,
        grouping: true,
        groupingView: {
            groupField: ['Status', 'wDateTime'],
            groupColumnShow: [false], groupOrder: ['asc', 'desc']
        },
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Raw Materials",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdRaw").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdRaw").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        },
        onSelectRow: function (rowId, rowId1, asd) {

        }
    });
    $("#grdRaw").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllRawData();
}

function GetAllRawData() {
    GetDataAsync('stockRegister.aspx/LoadRawData', function (response) {
        if (response.d != null) {
            jQuery("#grdRaw").jqGrid("clearGridData");
            jQuery("#grdRaw").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function BindPackData() {
    $("#grdPack").jqGrid({
        datatype: "local",
        colNames: ['wPackingId', 'Material Type', 'Weight', 'Type', 'Status', 'Date-Time'],
        colModel: [
            { name: 'wPackingId', index: 'wPackingId', hidden: true },
            { name: 'MaterialType', index: 'MaterialType' },
            { name: 'Weight', index: 'Weight' },
             { name: 'sType', index: 'sType' },
             { name: 'Status', index: 'Status', formatter: statusString },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        multiselect: false,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: $('#pager2'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['Status', 'wDateTime'],
            groupOrder: ['asc', 'desc']
        },
        caption: "Packing Materials",
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdPack").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdPack").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        }
    });
    $("#grdPack").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllPackData();
}

function GetAllPackData() {
    GetDataAsync('stockRegister.aspx/LoadPackData', function (response) {
        if (response.d != null) {
            jQuery("#grdPack").jqGrid("clearGridData");
            jQuery("#grdPack").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function BindClrData() {
    $("#grdClrs").jqGrid({
        datatype: "local",
        colNames: ['wColorId', 'Color Shade', 'Supplier', 'Status', 'Date-Time'],
        // , 'Quatity','NoBarrels','ChalanNo','WareHouse','CheckBy: 3,    Remarks: ""],
        colModel: [
            { name: 'wColorId', index: 'wColorId', hidden: true },
            { name: 'ColorShade', index: 'ColorShade' },
             { name: 'wSupplierId', index: 'wSupplierId' },
             { name: 'Status', index: 'Status', formatter: statusString },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        multiselect: false,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: $('#pager2'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['Status', 'wDateTime'],
            groupOrder: ['asc', 'desc']
        },
        caption: "Colors",
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdClrs").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdClrs").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        }
    });
    $("#grdClrs").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllClrsData();

}

function GetAllClrsData() {
    GetDataAsync('stockRegister.aspx/LoadClrsData', function (response) {
        if (response.d != null) {
            jQuery("#grdClrs").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function BindMchData() {
    $("#grdMchs").jqGrid({
        datatype: "local",
        colNames: ['wMachineryId', 'Brand Name', 'Machinery Type', 'Status', 'Date'],
        colModel: [
            { name: 'wMachineryId', index: 'wMachineryId', hidden: true },
            { name: 'Name', index: 'Name', width: 100 },
            { name: 'Type', index: 'Type', width: 90 },
             { name: 'Status', index: 'Status', formatter: statusString },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        multiselect: false,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['Status', 'wDateTime'],
            groupOrder: ['asc', 'desc']
        },
        caption: "Machinery",
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdMchs").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdMchs").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        }
    });
    $("#grdMchs").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllMchData();

}

function GetAllMchData() {
    GetDataAsync('Machinery.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdMchs").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function BindOthrsData() {
    $("#grdOthers").jqGrid({
        datatype: "local",
        colNames: ['wOtherId', 'Type', 'Status', 'InvoicNo', 'Date'],
        colModel: [
            { name: 'wOtherId', index: 'wOtherId', hidden: true },
            { name: 'Type', index: 'Type' },
            { name: 'Status', index: 'Status', formatter: statusString },
             { name: 'ChalanNo', index: 'ChalanNo' },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }

        ],
        multiselect: false,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: $('#pager4'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        grouping: true,
        groupingView: {
            groupField: ['Status', 'wDateTime'],
            groupColumnShow: [false], groupOrder: ['asc', 'desc']
        },
        caption: "Other Materials",
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdOthers").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdOthers").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        }
    });
    $("#grdOthers").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllOthrsData();
}

function GetAllOthrsData() {
    GetDataAsync('OtherItems.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdOthers").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}


