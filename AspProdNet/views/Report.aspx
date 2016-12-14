<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="AspProdNet.views.Report" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
    <script src="../Scripts/views/jVisualInspRpt.js"></script>
    <script src="../Scripts/views/jPhysDimRpt.js"></script>
    <script src="../Scripts/views/jDailyWeight.js"></script>

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
    <div class="col-sm-4 col-xs-12">
        <div class="panel panel-default">
            <div id="divHd0" class="panel-heading">General</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
    <div class="col-sm-8  col-xs-12">
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">General</div>
            <div class="panel-body">
                <div class="col-xs-4">
                    <label>Product:</label>
                    <input id="txtProd" type="text" class="form-control" />
                </div>
                <div class="col-xs-4">
                    <label>M/C:</label>
                    <input id="txtMC" type="text" class="form-control" />
                </div>
                <div class="col-xs-4">
                    <label>Date:</label>
                    <input id="txtDt" type="date" class="form-control" />
                </div>
                <div class="col-xs-4">
                    <label>Shift:</label>
                    <asp:DropDownList ID="ddlShft" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>
                <div class="col-xs-4">
                    <label>Mould ID No:</label>
                    <input id="txtMould" type="text" class="form-control" />
                </div>
                <div class="col-xs-4">
                    <label>Perform Size:</label>
                    <input id="txtPer" type="text" class="form-control" />
                </div>
                <div class="col-xs-4">
                    <label>Color:</label>
                    <input id="txtColor" type="text" class="form-control" />
                </div>
                <div class="col-xs-4">
                    <label>Defect Code:</label>
                    <asp:DropDownList ID="ddlDefCod" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>
                <div class="col-xs-4">
                    <label>Inspected By:</label>
                    <asp:DropDownList ID="ddlInspe" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>
                <div class="col-xs-12">
                    <ul class="nav nav-pills">
                        <li class="active"><a data-toggle="tab" href="#_page_1">Visual Inspection</a></li>
                        <li><a data-toggle="tab" href="#_page_8">Physical Dimension</a></li>
                        <li><a data-toggle="tab" href="#_page_2">Daily Weight Report</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="_page_1" class="tab-pane active fade in panel" style="margin-top: 10px; height: 360px">
                            <table id="grdVisInsp" class="table" style="height: 100%">
                            </table>
                            <div id="pager">
                            </div>
                        </div>
                        <div id="_page_8" class="tab-pane fade" style="margin-top: 10px; height: 360px;">
                            <table id="grdPhysDim" class="table" style="height: 100%">
                            </table>
                            <div id="pager1">
                            </div>
                        </div>
                        <div id="_page_2" class="tab-pane fade" style="margin-top: 10px; height: 360px; width: 750px">
                            <table id="grdDailyWt" class="table" style="height: 100%">
                            </table>
                            <div id="pager2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12" style="margin-top: 1%">
                    <input type="button" class="btn btn-success" value="Save" id="btnSave" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>

