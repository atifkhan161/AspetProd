<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fSupplier.aspx.cs" Inherits="AspProdNet.views.fSupplier" %>

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
    <form id="form1" runat="server" class="frmMaster">
        <div id="dvhgt" class="col-xs-12 col-sm-6">
            <table id="grdMaterial" class="table" style="height: 100%">
            </table>
            <div id="pager">
            </div>
        </div>
        <div class="col-xs-12 col-sm-6">
            <span id="spnSupprId" class="pull-right" hidden="hidden">-1</span>
            <label>Name:</label>
            <input id="txtUser" type="text" class="form-control" />
            <label>Notes:</label>
            <textarea id="txtRemarks" rows="7" class="form-control txtRemarks"></textarea>
            <div class="col-xs-12" style="margin-top: 5px">
                <input type="button" class="btn btn-success" id="btnSave" value="Save" onclick="Save();" />
                <input type="button" class="btn btn-info" value="Update" id="btnUpdate" onclick="Update()" disabled="disabled" />
                <input type="button" class="btn btn-danger" value="Delete" id="btnDelete" onclick="Delete()" disabled="disabled" />
                <input type="button" class="btn btn-primary" value="New" id="btnNew" onclick="New()" disabled="disabled" />
            </div>
        </div>
    </form>
    <script src="../Scripts/jquery-1.10.2.min.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
    <script src="../Scripts/plugins/bind.min.js"></script>
    <script src="../Scripts/plugins/selectize.js"></script>
    <%--<script src="../Scripts/plugins/selectize.min.js"></script>--%>
    <script src="../Scripts/plugins/notie.js"></script>
    <script src="../Scripts/plugins/validator.min.js"></script>
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/views/jCommon.js"></script>
    <script src="../Scripts/views/jSupplier.js"></script>
</body>
</html>
