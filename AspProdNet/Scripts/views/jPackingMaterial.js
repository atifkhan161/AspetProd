var frmData;
//wPackingId
//sType
//AccountOf
//MaterialType
//SuplierId
//TruckNo
//Quatity
//QType
//Weight
//WareHouse
//ChalanNo
//CheckBy
//Remarks


frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wPackingId': '#spnMatrlId',
            'oData.sType': 'input[name="rbtnOwn"]',
            'oData.AccountOf': '#txtAcctOf',
            'oData.MaterialType': '#txtMaterial',
            'oData.ChalanNo': '#txtChalan',
            'oData.SuplierId': '#ddlSuplier',
            'oData.TruckNo': '#txtTruckno',
            'oData.Quatity': '#txtQty',
            'oData.WareHouse': '#txtWare',
            'oData.CheckBy': '.ddlchkBy',
            'oData.Remarks': '.dvNotesText',
            'oData.Weight': '#txtTotalWt'
        });


function GetNewData() {
    return {
        wPackingId: -1,
        sType: "Own",
        AccountOf: "",
        ChalanNo: "",
        SuplierId: 0,
        TruckNo: "",
        Quatity: "",
        Weight: "",
        MaterialType: "",
        WareHouse: "",
        CheckBy: 3,
        Remarks: ""
    };
}
$(document).ready(function () {


    LoadSupplier();


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
function LoadSupplier() {
    GetDataAsync('WebMethods.aspx/GetSupplier', function (response) {
        var opts = JSON.parse(response.d);
        var ddl = $('#ddlSuplier').selectize({
            create: true,
            createOnBlur: false,
            closeAfterSelect: true,
            options: opts,
            valueField: 'wSupplierId',
            labelField: 'sSupplier',
            onOptionAdd: function (value) {
                //  alert(value);
                GetDataAsync('WebMethods.aspx/SaveSupplier', function (response) {
                    // value.wBrandId = parseInt(response.d);
                    $('#ddlSuplier').selectize()[0].selectize.destroy();
                    LoadBrands();
                    frmData.oData.wSupplierId = parseInt(response.d);
                }, function () { }, "{'sBrand' :'" + value + "'}");
            }
        });
    }, function () {

    });
}
function Save() {
    oValidator.validate();
    if ($("#ddlSuplier").val() == "") {
        notie.alert(2, 'Enter Supplier Name !', 2);
        return;
    }
    else
        frmData.oData.SuplierId = $("#ddlSuplier").val();
    frmData.oData.CheckBy = $(".ddlchkBy").val();
    if (!oValidator.hasErrors()) {
        GetDataAsync('PackMaterial.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            HideWaitCursor();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function BindData() {
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: ['wPackingId', 'Material Type', 'Weight', 'Type', 'Date-Time'],
        colModel: [
            { name: 'wPackingId', index: 'wPackingId', hidden: true },
            { name: 'MaterialType', index: 'MaterialType' },
            { name: 'Weight', index: 'Weight' },
             { name: 'sType', index: 'sType' },
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
        caption: "Packing Materials",
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

    GetAllData();
}

function GetAllData() {
    GetDataAsync('PackMaterial.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdTruck").jqGrid("clearGridData");
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
    GetDataAsync('PackMaterial.aspx/LoadSingleData', function (response) {
        oRow = JSON.parse(response.d);
        frmData.oData = oRow;
        $("#ddlSuplier")[0].selectize.setValue(oRow.SuplierId);
        DisableSave();
        if (frmData.oData.sType == "Job Work") {
            $(".divAccountOf").show();
        }
        else {
            $(".divAccountOf").hide();
        }
        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wPackingId + "'}"
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
        if ($("#ddlSuplier").val() == "") {
            notie.alert(2, 'Enter Supplier Name !', 2);
            return;
        }
        else
            frmData.oData.SuplierId = $("#ddlSuplier").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('PackMaterial.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2); GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('PackMaterial.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2); GetAllData(); New();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}

function ownChange() {
    if ($("input[name=rbtnOwn]:checked")[0].value == "Job Work") {
        $(".divAccountOf").show();
    }
    else {
        $(".divAccountOf").hide();
    }
}