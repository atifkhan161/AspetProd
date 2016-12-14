
var frmData;
//wPhyDimId
//Date
//wMCNo
//wPerSize
//wShiftID
//wMouldNo

frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wPhyDimId': '#spnMatrlId',
            'oData.wMCNo': '#txtMC',
            'oData.wPerSize': '#txtPer',
            'oData.wShiftID': ".ddlShift",
            'oData.wMouldNo': "#txtMould"
        });


function GetNewData() {
    return {
        wPhyDimId: -1,
        wMCNo: "",
        wShiftID: 1,
        wPerSize: 1,
        wMouldNo: ""
    };
}



$(document).ready(function () {

    BindData1();
    BindLStData();

});
//wPhyCavityId
//wPhyDimId
//DimWeight
//NeckId
//TOTHeight
//NeckOd
//BodyDia
//Bend
//WallThickness
//PolariseLight
//wCavityNo

function BindData1() {
    $("#grdPhysDim").jqGrid({
        datatype: "local",
        colNames: ['wPhyCavityId', 'Id', 'Cavity No', 'Weight(gm)', 'Total Height(mm)', 'NeckID(mm)', 'NeckOD(mm)', 'Body Dia(mm)', 'Bend(mm)', 'WallThickness(mm)', 'Polaise Light Profile/ Flow'],
        colModel: [
            { name: 'wPhyCavityId', index: 'wPhyCavityId', hidden: true },
        { name: 'wPhyDimId', index: 'wPhyDimId', hidden: true },
        { name: 'wCavityNo', index: 'wCavityNo', editable: false },
             { name: 'DimWeight', index: 'DimWeight', editable: true },
            { name: 'TOTHeight', index: 'TOTHeight', editable: true },
             { name: 'NeckId', index: 'NeckId', editable: true },
            { name: 'NeckOd', index: 'NeckOd', editable: true },
            { name: 'BodyDia', index: 'BodyDia', editable: true },
            { name: 'Bend', index: 'Bend', editable: true },
        { name: 'WallThickness', index: 'WallThickness', editable: true },
        { name: 'PolariseLight', index: 'PolariseLight', editable: true }

        ],
        rowNum: 10,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Dimention",
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdPhysDim").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdPhysDim").jqGrid('setGridHeight', $("#dvhgt").height() - 80, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            //var AdvId = rowData['AdvocateId'];
            //openAdvDetail(AdvId);
            jQuery("#grdPhysDim").jqGrid('editRow', rowId);
        }
    });
    $("#grdPhysDim").navGrid('#pager', { view: false, del: false, add: false, edit: false, search: false, reload: false });
    $("#grdPhysDim").jqGrid('inlineNav', '#pager', { edit: true, editicon: 'ui-icon-pencil', add: false, addicon: 'ui-icon-plus', save: true, saveicon: 'ui-icon-disk', cancel: false, cancelicon: 'ui-icon-cancel' });
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

    jQuery("#grdPhysDim").jqGrid('setGridParam', {
        datatype: 'local',
        data: odata
    }).trigger("reloadGrid");
}
function BindLStData() {
    $("#grdLstPhyRpt").jqGrid({
        datatype: "local",
        colNames: ['ID', 'Mould ID', 'MC no', 'Perform Size', 'Date'],
        colModel: [
            { name: 'wPhyDimId', index: 'wPhyDimId' },
            { name: 'wMouldNo', index: 'wMouldNo' },
            { name: 'wMCNo', index: 'wMCNo' },
            { name: 'wPerSize', index: 'wPerSize' },
        { name: 'Date', index: 'Date', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } }
        ],
        rowNum: 15,
        rowList: [20, 50, 100],
        pager: $('#pager1'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        caption: "Visual Inspections",
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
    jQuery("#grdPhysDim").addRowData(jQuery("#grdPhysDim").jqGrid('getDataIDs') + 1, oData, "last");
}


function SaveVis() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        var Clientdata = $('#grdPhysDim').jqGrid('getGridParam', 'data');

        GetDataAsync('physDimRpt.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            loadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}");

    }
}


function loadData() {
    GetDataAsync('physDimRpt.aspx/LoadData', function (msg) {
        if (msg.d != null) {
            $("#grdLstPhyRpt").jqGrid("clearGridData", true).trigger("reloadGrid");
            jQuery("#grdLstPhyRpt").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(msg.d)
   }).trigger("reloadGrid");
        }
    });
}


function UpdateEntry(oRow) {
    GetDataAsync('physDimRpt.aspx/LoadSingleData', function (response) {
        oRow = JSON.parse(response.d);
        frmData.oData = oRow[0];
        $("#grdPhysDim").jqGrid("clearGridData", true).trigger("reloadGrid");
        jQuery("#grdPhysDim").jqGrid('setGridParam', {
            datatype: 'local',
            data: oRow[1]
        }).trigger("reloadGrid");
        DisableSave();

    }, function () { }, "{'sId' :'" + oRow.wPhyDimId + "'}"
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
    $("#grdPhysDim").jqGrid("clearGridData", true).trigger("reloadGrid");
    GetCavityData();
    EnableSave();
}

function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        var Clientdata = $('#grdPhysDim').jqGrid('getGridParam', 'data');
        GetDataAsync('physDimRpt.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            loadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}");
    }
}

function Delete() {
    GetDataAsync('physDimRpt.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        loadData();
        New();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}
