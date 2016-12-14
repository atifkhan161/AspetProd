<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="stockRegister_old.aspx.cs" Inherits="AspProdNet.views.stockRegister" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
    <script src="../Scripts/views/jStockReg.js"></script>
    <style>
        legend {
            display: block;
            width: 100%;
            padding: 0;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
            line-height: inherit;
            color: #212121;
            border: 0;
            border-bottom: 1px solid darkgoldenrod;
        }

        fieldset {
            margin-top: 20px;
        }
    </style>
    <div class="col-xs-12">
        <%--<div class="panel panel-default">--%>
        <%-- <div id="divHd1" class="panel-heading">Stock Register</div>
            <div class="panel-body">--%>
        <div id="dvhgt" class="col-xs-12" style="margin-top: 1px;">
            <table id="grdStockReg" class="table" style="height: 100%">
            </table>
            <div id="pager">
            </div>
        </div>
        <div class="col-xs-4">
            <label>Name of Department:</label>
            <input type="text" id="txtDep" runat="server" class="form-control" />
        </div>
        <div class="col-xs-4">
            <label>Particulars:</label>
            <input id="txtPtr" type="text" class="form-control" />
        </div>
        <div class="col-xs-4">
            <label>Date:</label>
            <input id="txtdate" type="date" class="form-control" />
        </div>
        <div class="col-xs-3">
            <label>HPN no:</label>
            <input id="txtHpn" type="number" class="form-control" />
        </div>
        <div class="col-xs-3">
            <label>Locker no:</label>
            <input id="txtLck" type="number" class="form-control" />
        </div>
        <div class="col-xs-3">
            <label>Box no:</label>
            <input id="txtBox" type="number" class="form-control" />
        </div>
        <div class="col-xs-3">
            <label>Qty:</label>
            <input id="txtqty" type="number" class="form-control" />
        </div>
        <div class="col-xs-12">
            <label>Remarks:</label>
            <textarea id="txtRemarks" rows="2" class="form-control"></textarea>
        </div>
        <div class="col-xs-12" style="margin-top:5px">
           <input type="button" class="btn btn-success" value="Add New" onclick="SaveProd();"/>
        </div>
        <%--  </div>
        </div>--%>
    </div>
</asp:Content>
