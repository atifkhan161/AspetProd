//oData.wOtherId
//oData.Name
//oData.Type
//oData.wSupplierId
//oData.TruckNo
//oData.Quatity
//oData.QType
//oData.InvoicNo
//oData.CheckBy
//oData.Remarks
//Status
//wDateTime
//oData.Stores
//oData.Weight
var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wOtherId': '#spnMatrlId',
            //'oData.Name':'',
            'oData.Type': '#txtMaterial',
            'oData.wSupplierId': '#ddlSuplier',
            //'oData.TruckNo':'',
            'oData.Quatity': '#txtQty',
            //'oData.QType':'',
            'oData.ChalanNo': '#txtInvoice',
            'oData.CheckBy': '.ddlchkBy',
            'oData.Remarks': '.dvNotesText',
            'oData.Stores': '#txtStore',
            'oData.Weight': '#txtTotalWt'
        });


function GetNewData() {
    return {
        wOtherId: -1,
        //Name
        Type: "",
        wSupplierId: 0,
        //TruckNo: "",
        Quatity: "",
        //QType
        ChalanNo: "",
        CheckBy: 3,
        Remarks: "",
        //Status
        //wDateTime
        Stores: "",
        Weight: ""
    };
}


$(document).ready(function () {

    GetDataAsync('WebMethods.aspx/GetSupplier', function (response) {
        var opts = JSON.parse(response.d);
        //var ddl = $('#ddlSuplier').selectize({
        //    create: true,
        //    createOnBlur: false,
        //    closeAfterSelect: true,
        //    options: opts,
        //    valueField: 'wSupplierId',
        //    labelField: 'sSupplier',
        //    onOptionAdd: function (value) {
        //        //  alert(value);
        //    }
        //});
        $.each(opts, function (index, item) {
            $('#ddlSuplier').append($('<option></option>').val(item['wSupplierId']).html(item['sSupplier']));
            
            $('#ddlSuplier').val(-1);
        });
    }, function () {

    });


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

function Save() {
    oValidator.validate();
    if ($("#txtMaterial").val() == "") {
        notie.alert(2, 'Enter Material Type !', 2);
        return;
    }
    else {
        frmData.oData.Type = $("#txtMaterial").val();
    }

    if ($("#ddlSuplier").val() == "") {
        notie.alert(2, 'Enter Supplier Name !', 2);
        return;
    }
    else
        frmData.oData.wSupplierId = $("#ddlSuplier").val();
    frmData.oData.CheckBy = $(".ddlchkBy").val();
    if (!oValidator.hasErrors()) {
        GetDataAsync('OtherItems.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function BindData() {
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: ['wOtherId', 'Type', 'InvoicNo', 'Date-Time'],
        colModel: [
            { name: 'wOtherId', index: 'wOtherId', hidden: true },
            { name: 'Type', index: 'Type' },
            //{ name: 'wSupplierId', index: 'wSupplierId' },
             { name: 'ChalanNo', index: 'ChalanNo' },
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
        caption: "Other Materials",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdTruck").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        },
        onSelectRow: function (rowId, rowId1, asd) {

        }
    });
    $("#grdTruck").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    GetDataAsync('OtherItems.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdTruck").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function GetAllData() {
    GetDataAsync('OtherItems.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdTruck").jqGrid('setGridParam',
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
    GetDataAsync('OtherItems.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);

        $("#ddlSuplier").val(frmData.oData.wSupplierId);
        $(".ddlchkBy").val(frmData.oData.CheckBy);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wOtherId + "'}"
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


function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        if ($("#txtMaterial").val() == "") {
            notie.alert(2, 'Enter Material Type !', 2);
            return;
        }
        else {
            frmData.oData.Type = $("#txtMaterial").val();
        }

        if ($(".ddlSuplier").val() == "") {
            notie.alert(2, 'Enter Supplier Name !', 2);
            return;
        }
        else
            frmData.oData.wSupplierId = $(".ddlSuplier").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('OtherItems.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('OtherItems.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        jQuery("#grdTruck").jqGrid("clearGridData");
        New();
        BindData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}