var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wMaterial': '#spnMatId',
            'oData.sMaterial': '#txtUser',
            'oData.sExt': '.txtRemarks'
        });


function GetNewData() {
    return {
        wMaterial: -1,
        sMaterial: "",
        sExt: ""
    };
}
var oValidator;
$(document).ready(function () {
    var oFrm = $('.frmMaster').validator();
    oValidator = oFrm.data('bs.validator');
    BindData();

});

//wMaterial
//sMaterial
//sExt

function BindData() {
    $("#grdMaterial").jqGrid({
        datatype: "local",
        colNames: ['wMaterial', 'sMaterial', 'Notes'],
        colModel: [
            { name: 'wMaterial', index: 'wMaterial', hidden: true },
            { name: 'sMaterial', index: 'sMaterial' },
            { name: 'sExt', index: 'sExt' }

        ],
        multiselect: false,
        rowNum: 10,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Materials",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdMaterial").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdMaterial").jqGrid('setGridHeight', 200, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        }
    });
    $("#grdMaterial").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    LoadData();
}

function LoadData() {
    $.ajax({
        type: "POST",
        url: "fMaterial.aspx/LoadData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                jQuery("#grdMaterial").jqGrid('setGridParam',
       {
           datatype: 'local',
           data: JSON.parse(msg.d)
       }).trigger("reloadGrid");
            }
        }
    });
}

function SaveMaterial() {
    var oMaterial = {
        wMaterial: -1,
        sMaterial: $('#txtUser').val(),
        sExt: $('#txtRemarks').val()
    }

    $.ajax({
        type: "POST",
        url: "fMaterial.aspx/SaveEntry",
        contentType: "application/json; charset=utf-8",
        data: "{'sData':'" + JSON.stringify(oMaterial) + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            alert("saved");
            LoadData();
            cLearFeilds();
            //    HideWaitCursor();
        },
        error: function (result) {

            //   HideWaitCursor();
        }
    });
}
function cLearFeilds() {
    $('#txtUser').val("");
    $('#txtRemarks').val("");
}

function UpdateEntry(oRow) {
    New();
    ShowWaitCursor();
    GetDataAsync('fMaterial.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wMaterial + "'}"
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
    EnableSave();
}

function Save() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        GetDataAsync('fMaterial.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            LoadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        GetDataAsync('fMaterial.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            New();
            LoadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('fMaterial.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        New();
        jQuery("#grdMaterial").jqGrid("clearGridData");
        LoadData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}