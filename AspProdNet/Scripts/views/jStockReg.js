$(document).ready(function () {

    BindData();
    //$("#txtsearch").on('change keyup paste', function () {
    //    SearchByEmployeeName();
    //});


});
function SearchByEmployeeName() {
    //  Fetch the text from our <input> control
    var searchString = $("#txtsearch").val();

    //  Prepare to pass a new search filter to our jqGrid
    var f = { groupOp: "AND", rules: [] };

    //  Remember to change the following line to reflect the jqGrid column you want to search for your string in
    //  In this example, I'm searching through the UserName column.

    f.rules.push({ field: "Truck No", op: "cn", data: searchString });

    var grid = $('#grdStockReg');
    grid[0].p.search = f.rules.length > 0;
    $.extend(grid[0].p.postData, { filters: JSON.stringify(f) });
    grid.trigger("reloadGrid", [{ page: 1 }]);
}
//wStockId
//Department
//Date
//Particulares
//HPN
//Locker
//BoxNo
//Qty
//Remarks

function BindData() {
    $("#grdStockReg").jqGrid({
        datatype: "local",
        colNames: ['wStockId', 'Department', 'dd/MM', 'Particulars', 'HPN no.', 'Locker no.', 'Box no.', 'Qty', 'Remarks'],
        colModel: [
            { name: 'wStockId', index: 'AdvocateId', hidden: true },
            { name: 'Department', index: 'Department' },
            { name: 'Date', index: 'Date' },
            { name: 'Particulares', index: 'Particulares' },
             { name: 'HPN', index: 'HPN' },
            { name: 'Locker', index: 'Locker' },
            { name: 'BoxNo', index: 'BoxNo' },
        { name: 'Qty', index: 'Qty' },
        { name: 'Remarks', index: 'Remarks' }

        ],
        multiselect: true,
        rowNum: 10,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Stock Register",
        ignoreCase: true,
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdStockReg").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdStockReg").jqGrid('setGridHeight', $(window).height() - 440, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            //var AdvId = rowData['AdvocateId'];
            //openAdvDetail(AdvId);
        }
    });
   $("#grdStockReg").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
   
   LoadData();
}


function LoadData() {
    $.ajax({
        type: "POST",
        url: "stockRegister.aspx/LoadData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                jQuery("#grdStockReg").jqGrid('setGridParam',
       {
           datatype: 'local',
           data: JSON.parse(msg.d)
       }).trigger("reloadGrid");
            }
        }
    });
}
function SaveProd() {
    var oStock = {
        wStockId: -1,
      //  wMaterialId: -1,
        Department: $('#txtDep').val(),
        Date: $('#txtdate').val(),
        Particulares: $('#txtPtr').val(),
        HPN: $('#txtHpn').val(),
        Locker: $('#txtLck').val(),
        BoxNo: $('#txtBox').val(),
        Qty: $('#txtqty').val(),
        Remarks: $('#txtRemarks').val()
    }

    $.ajax({
        type: "POST",
        url: "stockRegister.aspx/SaveEntry",
        contentType: "application/json; charset=utf-8",
        data: "{'sData':'" + JSON.stringify(oStock) + "'}",
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
    $('#txtDep').val("");
   // $('#txtdate').val("");
    $('#txtPtr').val("");
    $('#txtHpn').val("");
    $('#txtLck').val("");
    $('#txtBox').val("");
    $('#txtqty').val("");
    $('#txtRemarks').val("");
}