<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="physDimRpt.aspx.cs" Inherits="AspProdNet.views.physDimRpt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
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
        <%-- <div class="col-xs-5">--%>
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">Physical Dimension Report</div>
            <div class="panel-body">
                <div id="dvLSTHeight" class="col-xs-4">
                    <table id="grdLstPhyRpt" class="table" style="height: 100%">
                    </table>
                    <div id="pager1">
                    </div>
                </div>
                <div class="col-xs-8">
                    <div class="col-xs-6">
                        <label>Mould ID No:</label>
                        <input id="txtMould" type="number" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>M/C no:</label>
                        <input id="txtMC" type="number" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>Perform Size:</label>
                        <input id="txtPer" type="number" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>Shift:</label>
                        <asp:DropDownList ID="ddlShiftIncharge" runat="server" CssClass="form-control ddlShift"></asp:DropDownList>
                    </div>
                    <div id="dvhgt" class="col-xs-12" style="margin-top: 10px; height: 330px">
                        <table id="grdPhysDim" class="table" style="height: 100%">
                        </table>
                        <div id="pager">
                        </div>
                        <%--<input type="button" class="btn btn-info" value="Add Row" onclick="AddNewRow();"/>--%>
                    </div>
                    <div class="col-xs-12" style="margin-top: 1%">
                        <input type="button" class="btn btn-success" value="Save" id="btnSave" onclick="SaveVis()" />
                        <input type="button" class="btn btn-info" value="Update" id="btnUpdate" onclick="Update()" disabled />
                        <input type="button" class="btn btn-danger" value="Delete" id="btnDelete" onclick="Delete()" disabled />
                        <input type="button" class="btn btn-primary" value="New" id="btnNew" onclick="New()" disabled />
                    </div>
                </div>
                <script>
                    var CtrlIds = {
                        "ddlShiftIncharge": "#<%=ddlShiftIncharge.ClientID %>"
                    };
                </script>
            </div>
        </div>
    </div>
    <script src="../Scripts/views/jPhysDimRpt.js"></script>

</asp:Content>
