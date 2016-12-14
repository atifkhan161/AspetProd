$(document).ready(function () {
    //// setAdminLevel();
    //ISViews();   
    BindData();
});


function BindData() {

    $("#grdBag").jqGrid({
        datatype: "local",
        colNames: ['Date', 'Company name', 'Grade', 'Wt/Per Bag', 'Lot .No', 'Bag .No'],
        //, 'Shift', 'Operator Name', 'Shift Incharge', 'Cheked By'],
        colModel: [
            { name: 'date', index: 'date', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } },
            { name: 'sCompany', index: 'sCompany' },
            { name: 'sGrade', index: 'sGrade' },
             { name: 'swt', index: 'swt' },
            { name: 'wLot', index: 'wLot' },
             { name: 'wBagNo', index: 'wBagNo' }

        ],
        // multiselect: true,
        rowNum: 20,
        rowList: [ 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Material Bag Consuption",
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
                $("#grdBag").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdBag").jqGrid('setGridHeight', $(window).height() - 240, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            //var AdvId = rowData['AdvocateId'];
            //openAdvDetail(AdvId);
        }
    });
    $("#grdBag").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    //$("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width(), true);
    //$("#grdTruck").jqGrid('setGridHeight', $("#dvhgt").height() - 70, true);

    loadData();
}
function loadData() {
    $.ajax({
        type: "POST",
        url: "RawMtrIssue.aspx/LoadData",
        //                 data: "{cAdvocate :'" + JSON.stringify(cAdvocate) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                jQuery("#grdBag").jqGrid('setGridParam',
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

function SaveBagMaterial() {
    if (Validate()) {
        oBag = {
            date: $("#txtDate").val(),
            sCompany: $("#txtCmpName").val(),
            sGrade: $("#txtGrade").val(),
            swt: $("#txtWtBag").val(),
            wLot: $("#txtLot").val(),
            wBagNo: $("#txtBag").val(),
            wShift: $(CtrlIds.ddlShift).val(),
            wShiftUserId: $(CtrlIds.ddlShiftIncharge).val(),
            wCheckedBy: $(CtrlIds.ddlChecked).val(),
            wOperator: $(CtrlIds.ddlOperator).val()
        };

        $.ajax({
            type: "POST",
            url: "RawMtrIssue.aspx/SaveEntry",
            contentType: "application/json; charset=utf-8",
            data: "{'sData':'" + JSON.stringify(oBag) + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                alert("saved");
                loadData();
                //    HideWaitCursor();
            },
            error: function (result) {

                //   HideWaitCursor();
            }
        });
    }
}
//wBagId
//date
//sCompany
//sGrade
//swt
//wLot
//wBagNo
//sShift
//wShiftUserId
//wCheckedBy
//wOperator
