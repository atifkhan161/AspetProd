$(document).ready(function () {
    //// setAdminLevel();
    //ISViews();

    BindData();
});
function SearchByEmployeeName() {
    //  Fetch the text from our <input> control
    var searchString = $("#txtsearch").val();

    //  Prepare to pass a new search filter to our jqGrid
    var f = { groupOp: "OR", rules: [] };

    //  Remember to change the following line to reflect the jqGrid column you want to search for your string in
    //  In this example, I'm searching through the UserName column.

    f.rules.push({ field: "wTruckNo", op: "cn", data: searchString });

    var grid = $('#grdTruck');
    grid[0].p.search = f.rules.length > 0;
    $.extend(grid[0].p.postData, { filters: JSON.stringify(f) });
    grid.trigger("reloadGrid", [{ page: 1 }]);
}
function BindData() {
    $("#grdTruck").jqGrid({
        datatype: "local",
        colNames: ['TruckId', 'Truck No', 'Container No', 'Seal No', 'Quantity'],
        colModel: [
            { name: 'wTruckId', index: 'wTruckId', hidden: true },
            { name: 'wTruckNo', index: 'wTruckNo' },
            { name: 'wContainerNo', index: 'wContainerNo' },
             { name: 'wSealNo', index: 'wSealNo' },
            { name: 'sQuantity', index: 'sQuantity' }
        ],
        multiselect: false,
        rowNum: 20,
        rowList: [10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Registered Trucks",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {
                //var gridName = 'grdTruck';
                //$('#gbox_' + gridName).css({
                //    position: 'absolute',
                //    top: 0,
                //    bottom: $('#gbox_' + gridName + ' .ui-pager-control').outerHeight() + 'px',
                //    width: $("#dvhgt").width() + 'px'
                //});
                //$('#gbox_' + gridName + ' .ui-jqgrid-view').css({ 'height': '100%' });

                //$('#gbox_' + gridName + ' .ui-jqgrid-bdiv').css({
                //    position: 'absolute',
                //    top: $('#gbox_' + gridName + ' .ui-jqgrid-titlebar').outerHeight() + $('#gbox_' + gridName + ' .ui-jqgrid-hbox').outerHeight() + 'px',
                //    bottom: 0,
                //    left: 0,
                //    right: 0,
                //    height: '',
                //    width: ''
                //});
                $("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                $("#grdTruck").jqGrid('setGridHeight', $(window).height() - 250, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            //var AdvId = rowData['AdvocateId'];
            //openAdvDetail(AdvId);
        },
        onSelectRow: function (rowId, rowId1, asd) {
            var rowData = jQuery("#grdTruck").jqGrid("getRowData", rowId);
            jQuery("#spnTruckId").val(rowData.wTruckId);
            jQuery("#spnTruckNO").html("TruckNo :" + rowData.wTruckNo);
        }
    });
    $("#grdTruck").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    //$("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width(), true);
    //$("#grdTruck").jqGrid('setGridHeight', $("#dvhgt").height() - 70, true);

    $.ajax({
        type: "POST",
        url: "RawMaterial.aspx/LoadData",
        //                 data: "{cAdvocate :'" + JSON.stringify(cAdvocate) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                jQuery("#grdTruck").jqGrid('setGridParam',
       {
           datatype: 'local',
           data: JSON.parse(msg.d)
       }).trigger("reloadGrid");
            }
        }
    });



}

function Validate() {
    return true;
}

function SaveMaterial() {
    if (Validate()) {
        oMaterial = {
            wTruckId: $("#spnTruckId").val(),
            wMaterial: $(CtrlIds.ddlMaterial).val(),
            wSupplierId: $(CtrlIds.ddlSuplier).val(),
            sCompany: $("#txtCmpName").val(),
            sGrade: $("#txtGrade").val(),
            sChalan: $("#txtChalan").val(),
            sIDNO: $("#txtIdno").val(),
            dRentFrom: $("#dtFrom").val(),
            dRentTo: $("#dtTo").val(),
            sQuantity: $("#txtQty").val(),
            sTotal: $("#txtTotal").val(),
            sWareHouse: $("#txtWare").val(),
            sVisualCheck: $("#txtVSCheck").val(),
            sRemark: $("#txtRemark").val(),
            wMaterialType: $("#rBtmRaw")[0].checked == true ? 1 : 2
        };

        $.ajax({
            type: "POST",
            url: "RawMaterial.aspx/SaveEntry",
            contentType: "application/json; charset=utf-8",
            data: "{'sData':'" + JSON.stringify(oMaterial) + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                alert("saved");
                RedirectHome();

                //    HideWaitCursor();
            },
            error: function (result) {

                //   HideWaitCursor();
            }
        });
    }
}