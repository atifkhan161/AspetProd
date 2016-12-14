<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MaterialPopUp.aspx.cs" Inherits="AspProdNet.views.MaterialPopUp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        body {
            padding-top: 0px;
            padding-bottom: 0px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="col-xs-12">
            <div id="dvhgt" class="col-xs-12" >
                <table id="grdTruck" class="table" style="height: 100%">
                </table>
                <div id="pager">
                </div>
            </div>
            <input type="button" class="btn btn-success" value="Select" onclick="SelectRowData();" />
        </div>
    </form>
    <script src="../Scripts/jquery-1.10.2.min.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/views/jCommon.js"></script>
    <script>
        $(document).ready(function () {
            var sType = $(parent.window)[0].frmData.oData.sType;
            GetData(sType);
        });
        function GetData(sType) {
            GetDataAsync('MaterialPopUp.aspx/LoadData', function (response) {
                if (response.d != null) {
                    BindData(response.d);
                }
            }, function () { }, "{'sType':'" + sType + "'}");
        }

        function BindData(oData) {
            $("#grdTruck").jqGrid({
                datatype: "local",
                colNames: ['Date', 'ID', 'Name', 'Quantity'],
                //, 'Shift', 'Operator Name', 'Shift Incharge', 'Cheked By'],
                colModel: [
                    { name: 'TimeStamp', index: 'TimeStamp', formatter: 'date', formatoptions: { srcformat: "ISO8601Long", newformat: "d/m/Y h:i A" } },
                    { name: 'ID', index: 'ID' },
                    { name: 'Name', index: 'Name' },
                     { name: 'Quantity', index: 'Quantity' }
                ],
                multiselect: false,
                rowNum: 10,
                rowList: [10, 20, 50, 100],
                pager: $('#pager'),
                sortorder: "desc",
                gridview: true,
                rownumbers: true,
                viewrecords: true,
                //height: 340,
                //width: 500,
                caption: "Raw Materials",
                beforeRequest: function () {
                    setTimeout(function () {
                        $("#grdTruck").jqGrid('setGridWidth', $("#dvhgt").width() - 5, true);
                        $("#grdTruck").jqGrid('setGridHeight', 200, true);
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

            jQuery("#grdTruck").jqGrid("clearGridData");
            jQuery("#grdTruck").jqGrid('setGridParam', {
                datatype: 'local',
                data: JSON.parse(oData)
            }).trigger("reloadGrid");
        }
        function SelectRowData() {
            var rowid = $("#grdTruck").jqGrid('getGridParam', 'selrow');
            if (rowid == null || rowid == undefined)
            {
                alert('Select Row');
                return;
            }
            var rowData = $("#grdTruck").getRowData(rowid);
            $(parent.window)[0].frmData.oData.sMaterial = rowData["ID"] + " -- " + rowData["Name"];
            $(parent.window)[0].frmData.oData.wMaterialId = rowData["ID"];
            $(parent.window)[0].oDialog.close();
        }
    </script>
</body>
</html>
