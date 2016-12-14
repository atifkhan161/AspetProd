var frmData;

frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wMaterialId': '#spnMatrlId',
            'oData.sType': 'input[name="rbtnOwn"]',
            'oData.AccountOf': '#txtAcctOf',
            'oData.BrandId': '#ddlBrand',
            'oData.Grade': '#txtGrade',
            'oData.ChalanNo': '#txtChalan',
            'oData.wSupplierId': '#ddlSuplier',
            'oData.TruckNo': '#txtTruckno',
            'oData.BagQuantity': '#txtQty',
            'oData.WareHouse': '#txtWare',
            'oData.BagNo': '#txtBagNo',
            'oData.CheckBy': '.ddlchkBy',
            'oData.VisualCheckBy': '#txtVSCheck',
            'oData.Remarks': '.dvNotesText',
            'oData.Weight': '#txtTotalWt'
        });


function GetNewData(bNext) {
    var returnData = {};
    returnData = {
        wMaterialId: -1,
        sType: "Own",
        AccountOf: "",
        BrandId: -1,
        Grade: "",
        ChalanNo: "",
        wSupplierId: 0,
        TruckNo: "",
        BagQuantity: "",
        Weight: "",
        BagNo: "",
        WareHouse: "",
        CheckBy: -1,
        VisualCheckBy: "",
        Remarks: ""
    };

    if (bNext) {
        returnData = frmData.oData;
        returnData.BagNo = "";
    }
    if (returnData.sType != "Own") {
        $(".divAccountOf").show();
    }
    else {
        $(".divAccountOf").hide();
    }
    return returnData;
}
function LoadBrands() {
    GetDataAsync('WebMethods.aspx/GetBrands', function (response) {
        var opts = JSON.parse(response.d);
        var ddl = $('#ddlBrand').selectize({
            create: true,
            createOnBlur: false,
            closeAfterSelect: true,
            options: opts,
            valueField: 'wBrandId',
            labelField: 'Name',
            onOptionAdd: function (value) {
                //  alert(value);
                GetDataAsync('WebMethods.aspx/SaveBrands', function (response) {
                    // value.wBrandId = parseInt(response.d);
                    $('#ddlBrand').selectize()[0].selectize.destroy();
                    LoadBrands();
                    frmData.oData.wBrandId = parseInt(response.d);
                }, function () { }, "{'sBrand' :'" + value + "'}");
            }
        });
    }, function () {

    });
}

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
$(document).ready(function () {

    LoadBrands();

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
    $("#btnSaveNext").attr('disabled', 'disabled');
    $("#txtQty").val(1);
});

function Save(bNext) {
    oValidator.validate();
    if ($("#ddlBrand").val() == "") {
        notie.alert(2, 'Enter Brand Name !', 2);
        return;
    }
    else {
        frmData.oData.BrandName = $("#ddlBrand").text();
        frmData.oData.BrandId = $("#ddlBrand").val();
    }

    if ($("#ddlSuplier").val() == "") {
        notie.alert(2, 'Enter Supplier Name !', 2);
        return;
    }
    else
        frmData.oData.wSupplierId = $("#ddlSuplier").val();
    frmData.oData.CheckBy = $(".ddlchkBy").val();

    if (!oValidator.hasErrors()) {

        ShowWaitCursor();
        GetDataAsync('RawMaterial.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            iTotalData = parseInt($("#txtQty").val());
            if (iTotalData === 1) {
                bNext = false;
                iTotalData--;
            }
            else if (iTotalData > 1) {
                iTotalData--;              
            }
            New(bNext);
            GetAllData();
            $("#txtQty").val(iTotalData);
            toggleSaveNext();

        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}
function setTotalBag(ele) {
    toggleSaveNext();
}
function keyDownTotalBag(ele) {
    var elem = ele;
    setTimeout(function () {
        toggleSaveNext();
    }, 1000);
}
function toggleSaveNext() {
    var val = $("#txtQty").val();
    if (val && parseInt(val)) {
        iTotalData = parseInt(val);
        if (iTotalData <= 1) {
            $("#btnSaveNext").attr('disabled', 'disabled');
            $("#btnSave").removeAttr('disabled');
        }
        else if (iTotalData > 1) {
            $("#btnSaveNext").removeAttr('disabled');
            $("#btnSave").attr('disabled', 'disabled');
        }
    }
    else {
        $("#btnSaveNext").attr('disabled', 'disabled');
    }
}
var iTotalData = 1;
function BindData() {
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: ['wMaterialId', 'Brand Name', 'Bag No', 'Type', 'Date-Time'],
        colModel: [
            { name: 'wMaterialId', index: 'wMaterialId', hidden: true },
            { name: 'BrandName', index: 'BrandName' },
            { name: 'BagNo', index: 'BagNo' },
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
        hiddengrid: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Raw Materials",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdTruck").jqGrid('setGridHeight', 300, true);
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
    GetDataAsync('RawMaterial.aspx/LoadData', function (response) {
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
    ShowWaitCursor();
    GetDataAsync('RawMaterial.aspx/LoadSingleData', function (response) {
        oRow = JSON.parse(response.d);
        frmData.oData = oRow;
        $("#ddlBrand")[0].selectize.setValue(oRow.BrandId);
        $("#ddlSuplier")[0].selectize.setValue(oRow.wSupplierId);
        DisableSave();
        if (frmData.oData.sType != "Own") {
            $(".divAccountOf").show();
        }
        else {
            $(".divAccountOf").hide();
        }
        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wMaterialId + "'}"
);
}

function EnableSave() {
    $("#btnSave").removeAttr('disabled');
    $("#btnSaveNext").removeAttr('disabled');
    $("#btnUpdate").attr('disabled', 'disabled');
    $("#btnDelete").attr('disabled', 'disabled');
    $("#btnNew").attr('disabled', 'disabled');

}

function DisableSave() {
    $("#btnSaveNext").attr('disabled', 'disabled');
    $("#btnSave").attr('disabled', 'disabled');
    $("#btnUpdate").removeAttr('disabled');
    $("#btnDelete").removeAttr('disabled');
    $("#btnNew").removeAttr('disabled');

}

function New(bNext) {
    frmData.oData = GetNewData(bNext);
    EnableSave();
}

function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        if ($("#ddlBrand").val() == "") {
            notie.alert(2, 'Enter Brand Name !', 2);
            return;
        }
        else {
            frmData.oData.BrandName = $("#ddlBrand").text();
            frmData.oData.BrandId = $("#ddlBrand").val();
        }

        if ($("#ddlSuplier").val() == "") {
            notie.alert(2, 'Enter Supplier Name !', 2);
            return;
        }
        else
            frmData.oData.wSupplierId = $("#ddlSuplier").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('RawMaterial.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2); GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('RawMaterial.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2); GetAllData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}

function ownChange() {
    if (frmData.oData.sType == "Own") {
        $(".divAccountOf").show();
    }
    else {
        $(".divAccountOf").hide();
    }
}

function toggleAccountOf(value) {
    if (value) {
        $(".divAccountOf").show();
    }
    else {
        $(".divAccountOf").hide();
    }
}
