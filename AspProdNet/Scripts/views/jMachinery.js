

var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wMachineryId': '#spnMatrlId',
            'oData.BrandId': '.ddlBrand',
            'oData.Type': '#txtMachineryTyp',
            'oData.wSupplierId': '.ddlSuplier',
            'oData.TruckNo': '#txtTruckno',
            'oData.Quatity': '#txtQty',
            //'oData.QType': '',
            'oData.ChalanNo': '#txtChalan',
            'oData.CheckBy': '.ddlchkBy',
            'oData.Remarks': '.dvNotesText',
            //Status
            //wDateTime
            'oData.TransportDetails': '#txtTransDet',
            'oData.ContainerNo': '#txtContainer',
            'oData.SealNo': '#txtSeal'
        });


function GetNewData() {
    return {
        wMachineryId: -1,
        //Name: "",
        BrandId: -1,
        Type: "",
        wSupplierId: 0,
        TruckNo: "",
        Quatity: "",
        QType: "",
        ChalanNo: "",
        CheckBy: 3,
        Remarks: "",
        //Status
        //wDateTime
        TransportDetails: "",
        ContainerNo: "",
        SealNo: ""
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

    GetDataAsync('WebMethods.aspx/GetBrands', function (response) {
        var opts = JSON.parse(response.d);
        //var ddl = $('#ddlBrand').selectize({
        //    create: true,
        //    createOnBlur: false,
        //    closeAfterSelect: true,
        //    options: opts,
        //    valueField: 'wBrandId',
        //    labelField: 'Name',
        //    onOptionAdd: function (value) {
        //        //  alert(value);
        //    }
        //});
        $.each(opts, function (index, item) {
            $('#ddlBrand').append($('<option></option>').val(item['wBrandId']).html(item['Name']));
            $('#ddlBrand').val(-1);
        });
    }, function () {

    });

    //GetDataAsync('WebMethods.aspx/GetMachineType', function (response) {
    //    var opts = JSON.parse(response.d);       
    //    $.each(opts, function (index, item) {
    //        $('#ddlMachinTyp').append($('<option></option>').val(item['wBrandId']).html(item['Name']));
    //    });
    //}, function () {

    //});

    GetDataAsync('WebMethods.aspx/GetAllUser', function (response) {
        var opts = JSON.parse(response.d);
        $.each(opts, function (index, item) {
            $('#ddlchkBy').append($('<option></option>').val(item['wUserId']).html(item['sUser']));
            $('#ddlchkBy').val(-1);
        });
    }, function () {

    });

    BindData();
    //var optMachineType = ['A', 'B', 'C'];
    //$.each(optMachineType, function (index, item) {
    //    $('#ddlMachinTyp').append($('<option></option>').val(index).html(item));
    //});
});

function BindData() {
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: ['wMachineryId', 'Brand Name', 'Machinery Type', 'TruckNo', 'Date-Time'],
        colModel: [
            { name: 'wMachineryId', index: 'wMachineryId', hidden: true },
            { name: 'Name', index: 'Name', width: 100 },
            { name: 'Type', index: 'Type', width: 90 },
             //{ name: 'wSupplierId', index: 'wSupplierId', width: 90 },
            { name: 'TruckNo', index: 'TruckNo', width: 90 },
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
        caption: "Machinery",
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
    GetDataAsync('Machinery.aspx/LoadData', function (response) {
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
    GetDataAsync('Machinery.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);
        $("#ddlBrand").val(frmData.oData.BrandId);

        //$("#ddlBrand").text(oRow.Name);
        $("#ddlSuplier").val(frmData.oData.wSupplierId);
        $("#ddlchkBy").val(frmData.oData.CheckBy);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wMachineryId + "'}"
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
    if ($("#ddlBrand").val() == "") {
        notie.alert(2, 'Enter Brand Name !', 2);
        return;
    }
    else {
        frmData.oData.Name = $("#ddlBrand")[0][$("#ddlBrand")[0].selectedIndex].textContent;
        frmData.oData.BrandId = $("#ddlBrand").val();
    }
    if ($("#txtMachineryTyp").val() == "") {
        notie.alert(2, 'Enter Machine Type !', 2);
        return;
    }
    else {
        frmData.oData.Type = $("#txtMachineryTyp").val();
    }

    if ($(".ddlSuplier").val() == "") {
        notie.alert(2, 'Enter Supplier Name !', 2);
        return;
    }
    else
        frmData.oData.wSupplierId = $(".ddlSuplier").val();
    frmData.oData.CheckBy = $(".ddlchkBy").val();
    if (!oValidator.hasErrors()) {
        GetDataAsync('Machinery.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}


function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        if ($("#ddlBrand").val() == "") {
            notie.alert(2, 'Enter Brand Name !', 2);
            return;
        }
        else {
            //frmData.oData.Name = $("#ddlBrand").val();
            frmData.oData.Name = $("#ddlBrand")[0][$("#ddlBrand")[0].selectedIndex].textContent;
            frmData.oData.BrandId = $("#ddlBrand").val();
        }
        if ($("#txtMachineryTyp").val() == "") {
            notie.alert(2, 'Enter Machine Type !', 2);
            return;
        }
        else {
            frmData.oData.Type = $("#txtMachineryTyp").val();
        }

        if ($(".ddlSuplier").val() == "") {
            notie.alert(2, 'Enter Supplier Name !', 2);
            return;
        }
        else
            frmData.oData.wSupplierId = $(".ddlSuplier").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('Machinery.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('Machinery.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        New();
        jQuery("#grdTruck").jqGrid("clearGridData");
        BindData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}