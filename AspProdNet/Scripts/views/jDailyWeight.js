
var frmData;
//wDWId
//Date
//sProduct
//colour
//ACheckedBy
//BCheckedBy
//CCheckedBy


frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wDWId': '#spnMatrlId',
            'oData.sProduct': '#txtProd',
            'oData.colour': '#txtClr',
            'oData.ACheckedBy': ".shiftA",
            'oData.BCheckedBy': ".shiftB",
            'oData.CCheckedBy': ".shiftC"
        });


function GetNewData() {
    return {
        wDWId: -1,
        sProduct: "",
        colour: "",
        ACheckedBy: 1,
        BCheckedBy: 1,
        CCheckedBy: 1
    };
}

$(document).ready(function () {

    BindData2();
    BindLStData();

});
//wCavityId
//wCavityNo
//wDWId
//AWeight
//BWeight
//CWeight

function BindData2() {
    $("#grdDailyWt").jqGrid({
        datatype: "local",
        colNames: ['wCavityId', 'Cavity No', 'A:Weight(gm)', 'B:Weight(gm)', 'C:Weight(gm)'],
        colModel: [
           { name: 'wCavityId', index: 'wCavityId', hidden: true },
           { name: 'wCavityNo', index: 'wCavityNo', editable: false, width: '100' },
            { name: 'AWeight', index: 'AWeight', editable: true, width: '100' },
            { name: 'BWeight', index: 'BWeight', editable: true, width: '100' },
            { name: 'CWeight', index: 'CWeight', editable: true, width: '100' }
        ],
        rowNum: 10,
        rowList: [15, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Weight",
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdDailyWt").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdDailyWt").jqGrid('setGridHeight', $("#dvhgt").height() - 80, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);

        }
    });


    $("#grdDailyWt").navGrid('#pager', { view: false, del: false, add: false, edit: false, search: false, reload: false });
    $("#grdDailyWt").jqGrid('inlineNav', '#pager', { edit: true, editicon: 'ui-icon-pencil', add: false, addicon: 'ui-icon-plus', save: true, saveicon: 'ui-icon-disk', cancel: false, cancelicon: 'ui-icon-cancel' });
    GetCavityData();
}
function GetCavityData() {
    var odata = [];
    for (i = 1; i <= 48; i++) {
        var oRow = {
            wCavityNo: i
        };
        odata.push(oRow);
    }

    jQuery("#grdDailyWt").jqGrid('setGridParam', {
        datatype: 'local',
        data: odata
    }).trigger("reloadGrid");
}
function BindLStData() {
    $("#grdLstPhyRpt").jqGrid({
        datatype: "local",
        colNames: ['ID', 'Product', 'Colour', 'Date'],
        colModel: [
            { name: 'wDWId', index: 'wDWId' },
            { name: 'sProduct', index: 'sProduct' },
            { name: 'colour', index: 'colour' },
            { name: 'Date', index: 'Date', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        rowNum: 15,
        rowList: [20, 50, 100],
        pager: $('#pager1'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        caption: "Daily Weight",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdLstPhyRpt").jqGrid('setGridWidth', $("#dvLSTHeight").width(), true);
                $("#grdLstPhyRpt").jqGrid('setGridHeight', $(window).height() - 270, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        }
    });
    $("#grdLstPhyRpt").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    loadData();
}

function AddNewRow() {
    var oData = {};
    jQuery("#grdDailyWt").addRowData(jQuery("#grdDailyWt").jqGrid('getDataIDs') + 1, oData, "last");
}

//wDWId
//Date
//sProduct
//colour
//ACheckedBy
//BCheckedBy
//CCheckedBy

function SaveVis() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        var Clientdata = $('#grdDailyWt').jqGrid('getGridParam', 'data');

        GetDataAsync('dailyWeightRpt.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            loadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}");

    }
}


function loadData() {
    GetDataAsync('dailyWeightRpt.aspx/LoadData', function (msg) {
        if (msg.d != null) {
            $("#grdLstPhyRpt").jqGrid("clearGridData", true).trigger("reloadGrid");
            jQuery("#grdLstPhyRpt").jqGrid('setGridParam', {
                datatype: 'local',
                data: JSON.parse(msg.d)
            }).trigger("reloadGrid");
        }
    });
}


function UpdateEntry(oRow) {
    GetDataAsync('dailyWeightRpt.aspx/LoadSingleData', function (response) {
        oRow = JSON.parse(response.d);
        frmData.oData = oRow[0];
        $("#grdDailyWt").jqGrid("clearGridData", true).trigger("reloadGrid");
        jQuery("#grdDailyWt").jqGrid('setGridParam', {
            datatype: 'local',
            data: oRow[1]
        }).trigger("reloadGrid");
        DisableSave();

    }, function () { }, "{'sId' :'" + oRow.wDWId + "'}"
);
}

function EnableSave() {
    $("#btnSave").removeAttr('disabled');
    $("#btnUpdate").attr('disabled', 'disabled');
    $("#btnDelete").attr('disabled', 'disabled');
    $("#btnNew").attr('disabled', 'disabled');

}

function DisableSave() {
    $("#btnSave").attr('disabled', 'disabled');
    $("#btnUpdate").removeAttr('disabled');
    $("#btnDelete").removeAttr('disabled');
    $("#btnNew").removeAttr('disabled');

}

function New() {
    frmData.oData = GetNewData();
    $("#grdDailyWt").jqGrid("clearGridData", true).trigger("reloadGrid");
    GetCavityData();
    EnableSave();
}

function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        var Clientdata = $('#grdDailyWt').jqGrid('getGridParam', 'data');
        GetDataAsync('dailyWeightRpt.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            loadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}");
    }
}

function Delete() {
    GetDataAsync('dailyWeightRpt.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        loadData();
        New();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}