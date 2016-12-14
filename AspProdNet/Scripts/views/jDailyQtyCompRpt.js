//wQtyComplantId
//sShift
//wMCno
//Product
//Weight
//color
//Troubles
//CheckBy
//ReportingTo
//ReportingTime
//wInspectedId
//solvedTime
//Status
//wDateTime
//sRemarks



var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wQtyComplantId': '#spnQtyComplId',
            'oData.sShift': '.ddlShft',
            'oData.wMCno': '#txtMC',
            'oData.Product': '#txtProd',
            'oData.Weight': '#txtwt',
            'oData.color': '#txtClr',
            'oData.Troubles': '.txtTroubl',
            'oData.ReportingTo': '#txtRepoTo',
            'oData.CheckBy': '.ddlchkBy',
            'oData.wInspectedId': '.ddlSignProd',
            'oData.sRemarks': '.dvResult'
        });


function GetNewData() {
    return {
        wQtyComplantId: -1,
        sShift: "",
        wMCno: "",
        Product: "",
        Weight: "",
        color: "",
        Troubles: "",
        ReportingTo: "",
        CheckBy: "",
        wInspectedId: "",
        sRemarks: ""
    };
}

$(document).ready(function () {
    GetDataAsync('WebMethods.aspx/GetAllUser', function (response) {
        var opts = JSON.parse(response.d);
        $.each(opts, function (index, item) {
            $('#ddlchkBy').append($('<option></option>').val(item['wUserId']).html(item['sUser']));
            $('#ddlSignProd').append($('<option></option>').val(item['wUserId']).html(item['sUser']));
            $('#ddlchkBy').val(-1);
            $('#ddlSignProd').val(-1);
        });
    }, function () {

    });

    BindData();
});

function BindData() {
    $("#grdQtyCompl").jqGrid({
        datatype: "local",
        colNames: ['wQtyComplantId', 'M/C No', 'Product', 'Weight', 'Color', 'Troubles', 'Date-Time'],
        colModel: [
            { name: 'wQtyComplantId', index: 'wQtyComplantId', hidden: true },
            { name: 'wMCno', index: 'wMCno', width: 100 },
            //{ name: 'sShift', index: 'sShift', width: 90 },
            { name: 'Product', index: 'Product', width: 90 },
            { name: 'Weight', index: 'Weight', width: 90 },
            { name: 'color', index: 'color', width: 90 },
            { name: 'Troubles', index: 'Troubles', width: 150 },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" }, width: 200 }
        ],
        multiselect: false,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        width: 900,
        caption: "",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdQtyCompl").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdQtyCompl").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        },
        onSelectRow: function (rowId, rowId1, asd) {

        }
    });
    $("#grdQtyCompl").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllData();

}

function GetAllData() {
    GetDataAsync('dailyQtyComplaintRpt.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdQtyCompl").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function UpdateEntry(oRow) {
    ShowWaitCursor();
    GetDataAsync('dailyQtyComplaintRpt.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);
        //$("#txtColorShade").val(oRow.ColorShade);

        $(".ddlShft").val(frmData.oData.sShift);
        $(".ddlSignProd").val(frmData.oData.wInspectedId);
        $(".ddlchkBy").val(frmData.oData.CheckBy);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wQtyComplantId + "'}"
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
        frmData.oData.sShift = $(".ddlShft").val();
        frmData.oData.wInspectedId = $(".ddlSignProd").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();
        GetDataAsync('dailyQtyComplaintRpt.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}


function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        frmData.oData.sShift = $(".ddlShft").val();
        frmData.oData.wInspectedId = $(".ddlSignProd").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('dailyQtyComplaintRpt.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('dailyQtyComplaintRpt.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        jQuery("#grdQtyCompl").jqGrid("clearGridData");
        New();
        BindData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}