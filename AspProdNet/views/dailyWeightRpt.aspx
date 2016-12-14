<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="dailyWeightRpt.aspx.cs" Inherits="AspProdNet.views.dailyWeightRpt" %>

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
            <div id="divHd1" class="panel-heading">Daily Weight Report</div>
            <div class="panel-body">
                <div id="dvLSTHeight" class="col-xs-4">
                    <table id="grdLstPhyRpt" class="table" style="height: 100%">
                    </table>
                    <div id="pager1">
                    </div>
                </div>
                <div class="col-xs-8">

                    <div class="col-xs-6">
                        <label>Product:</label>
                        <input id="txtProd" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>Color:</label>
                        <input id="txtClr" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-4">
                        <label>Shift Incharge A:</label>
                        <asp:DropDownList ID="ddlShiftIncharge" runat="server" CssClass="form-control shiftA"></asp:DropDownList>
                    </div>
                    <div class="col-xs-4">
                        <label>Shift Incharge B:</label>
                        <asp:DropDownList ID="ddlShiftInchargeB" runat="server" CssClass="form-control shiftB"></asp:DropDownList>
                    </div>
                    <div class="col-xs-4">
                        <label>Shift Incharge C:</label>
                        <asp:DropDownList ID="ddlShiftInchargeC" runat="server" CssClass="form-control shiftC"></asp:DropDownList>
                    </div>
                    <div id="dvhgt" class="col-xs-12" style="margin-top: 10px; height: 330px">
                        <table id="grdDailyWt" class="table" style="height: 100%">
                        </table>
                        <div id="pager">
                        </div>
                    </div>
                    <div class="col-xs-12" style="margin-top: 1%">
                        <input type="button" class="btn btn-success" value="Save" id="btnSave" onclick="SaveVis()" />
                        <input type="button" class="btn btn-info" value="Update" id="btnUpdate" onclick="Update()" disabled />
                        <input type="button" class="btn btn-danger" value="Delete" id="btnDelete" onclick="Delete()" disabled />
                        <input type="button" class="btn btn-primary" value="New" id="btnNew" onclick="New()" disabled />
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script>
        var CtrlIds = {
            "ddlShiftIncharge": "#<%=ddlShiftIncharge.ClientID %>",
            "ddlShiftInchargeB": "#<%=ddlShiftInchargeB.ClientID %>",
            "ddlShiftInchargeC": "#<%=ddlShiftInchargeC.ClientID %>"
        };
    </script>
    <script src="../Scripts/views/jDailyWeight.js"></script>

</asp:Content>
