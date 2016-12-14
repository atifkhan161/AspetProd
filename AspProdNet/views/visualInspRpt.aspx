<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="visualInspRpt.aspx.cs" Inherits="AspProdNet.views.visualInspRpt" %>

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
            margin-top: 2px;
        }
    </style>
    <div class="col-xs-12">
        <%-- <div class="col-xs-5">--%>
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">Visual Inspection Report</div>
            <div class="panel-body">
                <div id="dvLSTHeight" class="col-xs-4">
                    <table id="grdLstVisInsp" class="table" style="height: 100%">
                    </table>
                    <div id="pager">
                    </div>
                </div>
                <div class="col-xs-8">
                    <div class="col-xs-6">
                        <label>M/C:</label>
                        <input id="txtMC" type="number" class="form-control" required/>
                    </div>
                    <div class="col-xs-6">
                        <label>Product:</label>
                        <input id="txtProd" type="text" class="form-control" required/>
                    </div>

                    <div class="col-xs-6">
                        <label>Shift:</label>
                        <asp:DropDownList ID="ddlShiftIncharge" runat="server" CssClass="form-control ddlShift"></asp:DropDownList>
                    </div>

                    <div class="col-xs-6">
                        <label>Inspected By:</label>
                        <asp:DropDownList ID="ddlInspected" runat="server" CssClass="form-control ddlInsp"></asp:DropDownList>
                    </div>
                    <div id="dvhgt" class="col-xs-12" style="height: 250px; margin-top: 5px">
                        <table id="grdVisInsp" class="table" style="height: 100%">
                        </table>
                        <div id="pager1" class="pager">
                        </div>
                    </div>
                    <%-- <div class="col-xs-4">
                        <fieldset>
                            <legend>Cavity:</legend>

                            <label>Cavity No:</label>
                            <input id="txtCavity" type="text" class="form-control" />
                            <label>Status 1:</label>
                            <input id="txtStatus" type="text" class="form-control" /><label>Status 2:</label>
                            <input id="txtStatus2" type="text" class="form-control" />
                            <input type="button" class="btn btn-info" value="Add Row" id="btnAdd" style="margin-top: 5px" onclick="AddNewHandling();" />
                        </fieldset>
                    </div>--%>
                    <div class="col-xs-12">
                        <label>Remarks:</label>
                        <textarea id="txtRemarks" rows="2" class="form-control txtRemarks"></textarea>
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
    <script src="../Scripts/views/jVisualInspRpt.js"></script>
    <script>
        var CtrlIds = {
            "ddlInspected": "#<%=ddlInspected.ClientID %>",
            "ddlShiftIncharge": "#<%=ddlShiftIncharge.ClientID %>"
        };
    </script>
</asp:Content>
