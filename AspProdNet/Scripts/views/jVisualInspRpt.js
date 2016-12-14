
var frmData;
//wVisualId
//wMCno
//sProduct
//Date
//wShiftId
//wDefectCodeId
//wInspectedId
//sNotes

frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wVisualId': '#spnMatrlId',
            'oData.wMCno': '#txtMC',
            'oData.sProduct': '#txtProd',
            'oData.wShiftId': ".ddlShift",
            'oData.wInspectedId': ".ddlInsp",
            'oData.sNotes': ".txtRemarks"
        });


function GetNewData() {
    return {
        wVisualId: -1,
        wMCno: "",
        sProduct: "",
        wShiftId: 1,
        wInspectedId: 1,
        sNotes: ""
    };
}




$(document).ready(function () {
    BindData();
    BindLStData();
});

function BindData() {
    $("#grdVisInsp").jqGrid({
        datatype: "local",
        colNames: ['ID', 'Cavity No', 'Status 1', 'Status 2'],
        colModel: [
            { name: 'wVCavityId', index: 'wVCavityNo', hidden: true },
            { name: 'wVCavityNo', index: 'wVCavityNo', width: '40px' },
            {
                name: 'sStatus1', index: 'sStatus1', editable: true, edittype: 'select', formatter: 'select',
                editoptions: { value: getAllDefectCode() }
            },
            {
                name: 'sStatus2', index: 'sStatus2', editable: true, edittype: 'select', formatter: 'select',
                editoptions: { value: getAllDefectCode() }
            }
        ],
        rowNum: 7,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager1'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Cavity",
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdVisInsp").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdVisInsp").jqGrid('setGridHeight', $("#dvhgt").height() - 80, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
        }
    });

    $("#grdVisInsp").navGrid('#pager1', { view: false, del: false, add: false, edit: false, search: false, reload: false });
    $("#grdVisInsp").jqGrid('inlineNav', '#pager1', { edit: true, editicon: 'ui-icon-pencil', add: false, addicon: 'ui-icon-plus', save: true, saveicon: 'ui-icon-disk', cancel: false, cancelicon: 'ui-icon-cancel' });
    GetCavityData();
}
function GetCavityData() {
    var odata = [];
    for (i = 1; i <= 48; i++) {
        var oRow = {
            wVCavityNo: i
        };
        odata.push(oRow);
    }

    jQuery("#grdVisInsp").jqGrid('setGridParam', {
        datatype: 'local',
        data: odata
    }).trigger("reloadGrid");
}
function BindLStData() {
    $("#grdLstVisInsp").jqGrid({
        datatype: "local",
        colNames: ['ID', 'MC no', 'Product', 'Date'],
        colModel: [
            { name: 'wVisualId', index: 'wVisualId' },
            { name: 'wMCno', index: 'wMCno' },
            { name: 'sProduct', index: 'sProduct' },
        { name: 'Date', index: 'Date', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        rowNum: 15,
        rowList: [20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        caption: "Visual Inspections",
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdLstVisInsp").jqGrid('setGridWidth', $("#dvLSTHeight").width(), true);
                $("#grdLstVisInsp").jqGrid('setGridHeight', $(window).height() - 270, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        }
    });
    $("#grdLstVisInsp").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    loadData();
}

function getAllDefectCode() {
    var states = {
        'SHORT SHOT': 'SHORT SHOT', 'BUBBLE': 'BUBBLE', 'LONG GATE': 'LONG GATE',
        'HAZINESS': 'HAZINESS', 'SILVER STEAKS': 'SILVER STEAKS', 'YELLOWISH': 'YELLOWISH',
        'BLACK SPOT': 'BLACK SPOT', 'PIN HOLE': 'PIN HOLE', 'SHRINKAGE': 'SHRINKAGE'
    };

    return states;

}
function AddNewHandling() {
    var data = {
        wVisualId: -1,
        wVCavityNo: $('#txtCavity').val(),
        sStatus1: $('#txtStatus').val(),
        sStatus2: $('#txtStatus2').val()
    };
    //        jQuery("#grdClients").jqGrid('addRowData', 1, data);
    jQuery("#grdVisInsp").addRowData(jQuery("#grdVisInsp").jqGrid('getDataIDs') + 1, data, "last");

    //Clear TextFeilds
    $('#txtCavity')[0].value = "";
    $('#txtStatus')[0].value = "";
    $('#txtStatus2')[0].value = "";
}
function loadData() {
   
    GetDataAsync('visualInspRpt.aspx/LoadData', function (msg) {
        if (msg.d != null) {
            $("#grdLstVisInsp").jqGrid("clearGridData", true).trigger("reloadGrid");
            jQuery("#grdLstVisInsp").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(msg.d)
   }).trigger("reloadGrid");
        }
    });
}
function SaveVis() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        var Clientdata = $('#grdVisInsp').jqGrid('getGridParam', 'data');

        GetDataAsync('visualInspRpt.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            loadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}");

    }
}

function UpdateEntry(oRow) {
    GetDataAsync('visualInspRpt.aspx/LoadSingleData', function (response) {
        oRow = JSON.parse(response.d);
        frmData.oData = oRow[0];
        $("#grdVisInsp").jqGrid("clearGridData", true).trigger("reloadGrid");
        jQuery("#grdVisInsp").jqGrid('setGridParam', {
            datatype: 'local',
            data: oRow[1]
        }).trigger("reloadGrid");
        DisableSave();

    }, function () { }, "{'sId' :'" + oRow.wVisualId + "'}"
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
    $("#grdVisInsp").jqGrid("clearGridData", true).trigger("reloadGrid");
    GetCavityData();
    EnableSave();
}

function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        var Clientdata = $('#grdVisInsp').jqGrid('getGridParam', 'data');
        GetDataAsync('visualInspRpt.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            loadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}");
    }
}

function Delete() {
    GetDataAsync('visualInspRpt.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        loadData();
        New();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}
