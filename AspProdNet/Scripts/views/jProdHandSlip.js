$(document).ready(function () {
   
    BindData();
  
});
function BindData() {
    $("#grdProdHand").jqGrid({
        datatype: "local",
        colNames: ['wProdId', 'Produced No of Boxes/ Pcs', 'Transfer No of Boxes', 'Goods(Pcs.)', 'Manufacturing Date'],
        colModel: [
            { name: 'wProductionId', index: 'wProductionId', hidden: true },
            { name: 'wBoxes', index: 'wBoxes' },
            { name: 'wTransferBoxes', index: 'wTransferBoxes' },
             { name: 'wGoods', index: 'wGoods' },
            { name: 'dManufDate', index: 'dManufDate' }
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
        caption: "Production",
        beforeRequest: function () {
            setTimeout(function () {
                //var gridName = 'grdProdHand';
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
                $("#grdProdHand").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdProdHand").jqGrid('setGridHeight', $("#dvhgt").height() - 70, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            //var AdvId = rowData['AdvocateId'];
            //openAdvDetail(AdvId);
        }
    });
    //  $("#grdProdHand").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    //jQuery("#grdProdHand").jqGrid('setGridParam',
    //    {
    //        datatype: 'local',
    //        data: grdData
    //    }).trigger("reloadGrid");


}

function AddNewHandling() {
    var data = {
        wProductionId: -1,
        dManufDate: $('#txtMfgDate').val(),
        wGoods: $('#txtGoods').val(),
        wTransferBoxes: $('#txtTransfer').val(),
        wBoxes: $("#txtProduce").val()
    };
    //        jQuery("#grdClients").jqGrid('addRowData', 1, data);
    jQuery("#grdProdHand").addRowData(jQuery("#grdProdHand").jqGrid('getDataIDs') + 1, data, "last");

    //Clear TextFeilds
    $('#txtTransfer')[0].value = "";
    $('#txtProduce')[0].value = "";
    $('#txtGoods')[0].value = "";
}

function SaveProd() {
    var oProd = {
        wProductionId: -1,
        wMaterialId: -1,
        wIdNO: $('#txtId').val(),
        wDate: $('#dtFrom').val(),
        sSize: $('#txtPer').val(),
        sGrade: $('#txtGrade').val(),
        M1rejection: $('#txtRej1').val(),
        M1Lumps: $('#txtLump1').val(),
        M2rejection: $('#txtRej2').val(),
        M2Lumps: $('#txtLump2').val(),
        wPrepairedBy: $(CtrlIds.ddlChkd).val(),
        wReceivedBy: $(CtrlIds.ddlprep).val()
    }
    var Clientdata = $('#grdProdHand').jqGrid('getGridParam', 'data');

    $.ajax({
        type: "POST",
        url: "ProdHandSlip.aspx/SaveEntry",
        contentType: "application/json; charset=utf-8",
        data: "{'sData':'" + JSON.stringify(oProd) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}",
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