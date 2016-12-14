//wColorId
//ColorShade
//wSupplierId
//TruckNo
//Quatity
//QType
//NoBarrels
//ChalanNo
//WareHouse
//CheckBy
//Remarks
//Status
//wDateTime


var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wColorId': '#spnColorId',
            'oData.ColorShade': '#txtColorShade',
            'oData.wSupplierId': '.ddlSuplier',
            'oData.TruckNo': '#txtTruckno',
            'oData.Quatity': '#txtQty',
            //'oData.QType
            'oData.NoBarrels': '#txtBarrels',
            'oData.ChalanNo': '#txtChalan',
            'oData.WareHouse': '#txtWareDet',
            'oData.CheckBy': '.ddlchkBy',
            'oData.Remarks': '.dvNotesText'
        });


function GetNewData() {
    return {
        wColorId: -1,
        ColorShade: "",
        wSupplierId: 0,
        TruckNo: "",
        Quatity: "",
        NoBarrels: "",
        ChalanNo: "",
        WareHouse: "",
        CheckBy: 3,
        Remarks: ""
    };
}

$(document).ready(function () {

    GetDataAsync('WebMethods.aspx/GetSupplier', function (response) {
        var opts = JSON.parse(response.d);

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
    //var optColorShade = ['A', 'B', 'C', 'D', 'E'];
    //$.each(optColorShade, function (index, item) {
    //    $('#ddlColorShade').append($('<option></option>').val(index).html(item));
    //});
});

function BindData() {
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: ['wColorId', 'Color Shade', 'Truck No', 'Date-Time'],
        // , 'Quatity','NoBarrels','ChalanNo','WareHouse','CheckBy: 3,    Remarks: ""],
        colModel: [
            { name: 'wColorId', index: 'wColorId', hidden: true },
            { name: 'ColorShade', index: 'ColorShade', width: 100 },
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
        caption: "Color",
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
    GetDataAsync('Color.aspx/LoadData', function (response) {
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
    GetDataAsync('Color.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);
        //$("#txtColorShade").val(oRow.ColorShade);

        //$("#ddlColorShade").text(oRow.Name);
        $("#ddlSuplier").val(frmData.oData.wSupplierId);
        $(".ddlchkBy").val(frmData.oData.CheckBy);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wColorId + "'}"
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
    if ($("#txtColorShade").val() == "") {
        notie.alert(2, 'Enter Color shade !', 2);
        return;
    }
    else {
        //frmData.oData.Name = $("#ddlBrand")[0][$("#ddlBrand")[0].selectedIndex].textContent;
        frmData.oData.ColorShade = $("#txtColorShade").val();
    }


    if ($(".ddlSuplier").val() == "") {
        notie.alert(2, 'Enter Supplier Name !', 2);
        return;
    }
    else
        frmData.oData.wSupplierId = $(".ddlSuplier").val();
    frmData.oData.CheckBy = $(".ddlchkBy").val();
    if (!oValidator.hasErrors()) {
        GetDataAsync('Color.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}


function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        if ($("#txtColorShade").val() == "") {
            notie.alert(2, 'Enter Color shade !', 2);
            return;
        }
        else {
            //frmData.oData.Name = $("#ddlBrand")[0][$("#ddlBrand")[0].selectedIndex].textContent;
            frmData.oData.ColorShade = $("#txtColorShade").val();
        }

        if ($(".ddlSuplier").val() == "") {
            notie.alert(2, 'Enter Supplier Name !', 2);
            return;
        }
        else
            frmData.oData.wSupplierId = $(".ddlSuplier").val();
        frmData.oData.CheckBy = $(".ddlchkBy").val();

        GetDataAsync('Color.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            New();
            GetAllData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('Color.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        jQuery("#grdTruck").jqGrid("clearGridData");
        New();
        BindData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}