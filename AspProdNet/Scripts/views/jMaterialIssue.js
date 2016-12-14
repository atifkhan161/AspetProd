var frmData;
//wBagId
//date
//sMaterial
//wMaterialId
//wShift
//wShiftUserId
//wCheckedBy
//wOperator
//MachineNo
frmData = Bind({
    oData: GetNewData()
},
        {
            // 'oData.wMaterialId': '#spnMatrlId',
            'oData.sType': 'input[name="rbtnOwn"]',
            //'oData.sMaterial': '#txtMaterial',
            'oData.MachineNo': '#txtMachNo',
            'oData.wShift': ".shft",
            'oData.wShiftUserId': ".shftIch",
            'oData.wCheckedBy': ".chkd",
            'oData.wOperator': ".optr"
        });


function GetNewData() {
    return {
        wMaterialId: -1,
        sType: "Raw",
        sMaterial: "",
        MachineNo: "",
        wShift: -1,
        wShiftUserId: -1,
        wCheckedBy: -1,
        wOperator: -1
    };
}
$(document).ready(function () {
    $("input[name='rbtnOwn']").click(function () {
        GetMaterialData(this.value);
    });

    GetMaterialData("Raw");
});

function Save() {
    oValidator.validate();
    if (frmData.oData.wMaterialId == -1) {
        notie.alert(2, 'Select Material !', 2);
        return;
    }

    if ($(".shft").val() == null) {
        notie.alert(2, 'Select Shift !', 2);
        return;
    }
    if ($(".shftIch").val() == null) {
        notie.alert(2, 'Select Shift Incharge !', 2);
        return;
    }
    if ($(".optr").val() == null) {
        notie.alert(2, 'Select Operator !', 2);
        return;
    }
    if ($(".chkd").val() == null) {
        notie.alert(2, 'Select User !', 2);
        return;
    }
    if (!oValidator.hasErrors()) {
        GetDataAsync('RawMtrIssue.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function GetAllData() {

    GetMaterialData(frmData.oData.sType);
}
function UpdateEntry(oRow) {
    GetDataAsync('RawMtrIssue.aspx/LoadSingleData', function (response) {
        oRow = JSON.parse(response.d);
        frmData.oData = oRow;
        DisableSave();

    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wBagId + "'}"
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
    //$("#btnUpdate").removeAttr('disabled');
    //$("#btnDelete").removeAttr('disabled');
    //$("#btnNew").removeAttr('disabled');

}

function New() {
    frmData.oData = GetNewData();
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

        GetDataAsync('RawMtrIssue.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2); GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('RawMtrIssue.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2); GetAllData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}
/*Material grid added and modal popup removed*/
function GetMaterialData(sType) {
    GetDataAsync('MaterialPopUp.aspx/LoadData', function (response) {
        if (response.d != null) {
            formatGridData(sType, response.d);
        }
    }, function () { }, "{'sType':'" + sType + "'}");
}

function formatGridData(sType, oData) {
    var colNames = [],
        colModel = [],
        caption = "Materials";
    if (sType == "Raw") {
        colNames = ['Date', 'ID', 'Name', 'Grade', 'Weight', 'Type', 'bagNo'];
        colModel = [
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } },
            { name: 'wMaterialId', index: 'wMaterialId', hidden: true },
            { name: 'BrandName', index: 'BrandName' },
            { name: 'Grade', index: 'Grade' },
            { name: 'Weight', index: 'Weight' },
            { name: 'sType', index: 'sType' },
            { name: 'BagNo', index: 'BagNo', hidden: true },
        ];
    }
    else if (sType == "Packing") {
        colNames = ['wPackingId', 'Material Type', 'Weight', 'Type', 'Date-Time', 'Quatity', 'WareHouse'];
        colModel = [
            { name: 'wPackingId', index: 'wPackingId', hidden: true },
            { name: 'MaterialType', index: 'MaterialType' },
            { name: 'Weight', index: 'Weight' },
             { name: 'sType', index: 'sType' },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } },
            { name: 'Quatity', index: 'Quatity', hidden: true },
            { name: 'WareHouse', index: 'WareHouse', hidden: true }
        ];
    }
    else if (sType == "Clrs") {
        colNames = ['wColorId', 'Color Shade', 'Truck No', 'Date-Time', 'Quatity', 'WareHouse', 'NoBarrels'];
        colModel = [
            { name: 'wColorId', index: 'wColorId', hidden: true },
            { name: 'ColorShade', index: 'ColorShade', width: 100 },
             //{ name: 'wSupplierId', index: 'wSupplierId', width: 90 },
            { name: 'TruckNo', index: 'TruckNo', width: 90 },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } },
            { name: 'Quatity', index: 'Quatity', hidden: true },
            { name: 'WareHouse', index: 'WareHouse', hidden: true },
            { name: 'NoBarrels', index: 'NoBarrels', hidden: true }
        ];
    }
    else if (sType == "Others") {
        colNames = ['wOtherId', 'Type', 'InvoicNo', 'Date-Time', 'Quatity', 'Weight', 'Stores'];
        colModel = [
            { name: 'wOtherId', index: 'wOtherId', hidden: true },
            { name: 'Type', index: 'Type' },
            //{ name: 'wSupplierId', index: 'wSupplierId' },
             { name: 'ChalanNo', index: 'ChalanNo' },
            { name: 'wDateTime', index: 'wDateTime', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } },
            { name: 'Quatity', index: 'Quatity', hidden: true },
            { name: 'Weight', index: 'Weight', hidden: true },
            { name: 'Stores', index: 'Stores', hidden: true }
        ];
    }
    sType = sType;
    bindIssueGrid(oData, colNames, colModel, caption);
}

function bindIssueGrid(oData, colNames, colModel, caption) {
    jQuery("#grdTruck").jqGrid("GridUnload");
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: colNames,
        colModel: colModel,
        multiselect: false,
        rowNum: 10,
        rowList: [10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        ignoreCase: true,
        //height: 340,
        //width: 500,
        caption: caption,
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdTruck").jqGrid('setGridHeight', 200, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            bindRowData(rowData);
        },
        onSelectRow: function (rowId, rowId1, asd) {

        }
    });
    $("#grdTruck").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    jQuery("#grdTruck").jqGrid("clearGridData");
    jQuery("#grdTruck").jqGrid('setGridParam', {
        datatype: 'local',
        data: JSON.parse(oData)
    }).trigger("reloadGrid");
}

function ownChange() {
    $(".divPacking ,.divRaw ,.divClrs ,.divOthers").find('input[type=text]').val("");
    $(".divPacking ,.divRaw ,.divClrs ,.divOthers").find('input[type=number]').val("");
    $("#divMaterialIssue").find('select').val(-1);
    frmData.oData.wMaterialId = -1;
    var sType = $("input[name=rbtnOwn]:checked")[0].value;
    if (sType == "Raw") {
        $(".divRaw").show();
        $(".divPacking").hide();
        $(".divClrs").hide();
        $(".divOthers").hide();
    }
    else if (sType == "Packing") {
        $(".divPacking").show();
        $(".divRaw").hide();
        $(".divClrs").hide();
        $(".divOthers").hide();
    }
    else if (sType == "Others") {
        $(".divOthers").show();
        $(".divClrs").hide();
        $(".divRaw").hide();
        $(".divPacking").hide();
    }
    else if (sType == "Clrs") {
        $(".divClrs").show();
        $(".divOthers").hide();
        $(".divRaw").hide();
        $(".divPacking").hide();
    }
}
var sType = "";
function bindRowData(rowData) {
    $(".divPacking ,.divRaw ,.divClrs ,.divOthers").find('input[type=text]').val(null);
    $(".divPacking ,.divRaw ,.divClrs ,.divOthers").find('input[type=number]').val(null);

    sType = $("input[name='rbtnOwn']:checked").val();
    if (sType == "Raw") {
        frmData.oData.wMaterialId = rowData.wMaterialId;
        $('#ddlBrand').val(rowData.BrandName);
        $('#txtGrade').val(rowData.Grade);
        $('#txtTotalWt').val(rowData.Weight);
        $('#txtBagNo').val(rowData.BagNo);
        $("input[name=rbtnOwn1][value='" + rowData.sType + "']").prop('checked', true);
    }
    else if (sType == "Packing") {
        frmData.oData.wMaterialId = rowData.wPackingId;
        $('#txtMaterialPack').val(rowData.MaterialType);
        $('#txtTotalWtPack').val(rowData.Weight);
        $('#txtQtyPack').val(rowData.Quatity);
        $('#txtWare').val(rowData.WareHouse);
        $("input[name=rbtnOwnPack][value='" + rowData.sType + "']").prop('checked', true);
    }
    else if (sType == "Others") {
        frmData.oData.wMaterialId = rowData.wOtherId;
        $('#txtMaterial').val(rowData.Type);
        $('#txtInvoice').val(rowData.ChalanNo);
        $('#txtQty').val(rowData.Quatity);
        $('#txtTotalWtOthrs').val(rowData.Weight);
        $('#txtStore').val(rowData.Stores);
    }
    else if (sType == "Clrs") {
        frmData.oData.wMaterialId = rowData.wColorId;
        $('#txtColorShade').val(rowData.ColorShade);
        $('#txtTruckno').val(rowData.TruckNo);
        $('#txtBarrels').val(rowData.TruckNo);
        $('#txtQtyClrs').val(rowData.TruckNo);
        $('#txtWareDet').val(rowData.TruckNo);
    }
}
