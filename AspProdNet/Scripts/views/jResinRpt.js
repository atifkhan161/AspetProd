
var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wRsinRptId': '#spnResinId',
            'oData.resinBagNo': '#txtResinBagno',
            'oData.resinGrade': '#txtResinGrade',
            'oData.InvoiceNo': '#txtInvoice',
            'oData.machineNo': '#txtMachineNo',
            //'oData.QType
            'oData.Specification': '#txtSpec',
            'oData.Result': '.dvResult',
            'oData.CheckBy': '.ddlchkBy',
            'oData.freqPerLot': '#txtFreq'
        });


function GetNewData() {
    return {
        wRsinRptId: -1,
        resinBagNo: "",
        resinGrade: "",
        InvoiceNo: "",
        machineNo: "",
        Specification: "",
        Result: "",
        CheckBy: 3,
        freqPerLot: ""
    };
}

$(document).ready(function () {

    GetDataAsync('WebMethods.aspx/GetAllUser', function (response) {
        var opts = JSON.parse(response.d);
        $.each(opts, function (index, item) {
            $('#ddlchkBy').append($('<option></option>').val(item['wUserId']).html(item['sUser']));
            $('#ddlchkBy').val(-1);
        });
    }, function () {

    });

    BindData();

});

function BindData() {
    $("#grdResin").jqGrid({
        datatype: "local",
        colNames: ['wRsinRptId', 'Resin Bag No', 'Resin Grade', 'Invoice No', ' Machine No', 'Date-Time'],
        // , 'Quatity','NoBarrels','ChalanNo','WareHouse','CheckBy: 3,    Remarks: ""],
        colModel: [
            { name: 'wRsinRptId', index: 'wRsinRptId', hidden: true },
            { name: 'resinBagNo', index: 'resinBagNo', width: 100 },
            { name: 'resinGrade', index: 'resinGrade', width: 90 },
            { name: 'InvoiceNo', index: 'InvoiceNo', width: 90 },
            { name: 'machineNo', index: 'machineNo', width: 90 },
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
        //height: 340,
        //width: 500,
        caption: "",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdResin").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdResin").jqGrid('setGridHeight', $(window).height() - 280, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        },
        onSelectRow: function (rowId, rowId1, asd) {

        }
    });
    jQuery("#grdResin").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
          { startColumnName: 'resinGrade', numberOfColumns: 3, titleText: '<center> Sample Detail<center />' }
        ]
    });
    $("#grdResin").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetAllData();

}

function GetAllData() {
    GetDataAsync('ResinMoistureRpt.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdResin").jqGrid('setGridParam',
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
    GetDataAsync('ResinMoistureRpt.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);
        $(".ddlchkBy").val(frmData.oData.CheckBy);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wRsinRptId + "'}"
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

        frmData.oData.CheckBy = $(".ddlchkBy").val();
        GetDataAsync('ResinMoistureRpt.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}


function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {

        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('ResinMoistureRpt.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2); GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('ResinMoistureRpt.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        jQuery("#grdResin").jqGrid("clearGridData");
        New();
        BindData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}