<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RawMtrIssue.aspx.cs" Inherits="AspProdNet.views.RawMtrIssue" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>

    <div class="panel panel-default">
        <div id="divHd1" class="panel-heading">Raw Material Issue</div>
        <div class="panel-body">

            <div class="col-xs-5">

                <div id="dvhgt" class="col-xs-12">
                    <table id="grdTruck" class="table" style="height: 100%">
                    </table>
                    <div id="pager">
                    </div>
                </div>

            </div>

            <div id="divMaterialIssue" class="col-xs-7">

                <div class="col-xs-12">
                    <div class="form-group">
                        <label>
                            <input id="rBtmRaw" type="radio" name="rbtnOwn" value="Raw" checked="checked" onchange="ownChange()" />Raw Material</label>
                        <label>
                            <input id="rBtmPack" type="radio" name="rbtnOwn" value="Packing" onchange="ownChange()" />Packing Material</label>
                        <label>
                            <input id="rBtmClrs" type="radio" name="rbtnOwn" value="Clrs" onchange="ownChange()" />Color Material</label>
                        <label>
                            <input id="rBtmOthers" type="radio" name="rbtnOwn" value="Others" onchange="ownChange()" />Other Material</label>
                    </div>
                </div>
                <div class="divRaw">
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>
                                <input id="rBtmOwn" type="radio" name="rbtnOwn1" value="Own" checked="checked" />Own</label>
                            <label>
                                <input id="rBtmCmp" type="radio" name="rbtnOwn1" value="Job Work" />Job Work</label>
                        </div>
                    </div>
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>Brand Name*:</label>
                            <input id="ddlBrand" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Grade*:</label>
                            <input id="txtGrade" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>Total Weight*:</label>
                            <input id="txtTotalWt" type="number" class="form-control" placeholder="Unit in Tons" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Bag No/Bar Code No*:</label>
                            <input id="txtBagNo" type="text" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="divPacking" style="display: none">
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>
                                <input id="rBtmOwn1" type="radio" name="rbtnOwnPack" value="Own" checked="checked" />Own</label>
                            <label>
                                <input id="rBtmRnt" type="radio" name="rbtnOwnPack" value="Rental" />Rental</label>
                            <label>
                                <input id="rBtmCmp1" type="radio" name="rbtnOwnPack" value="Job Work" />Job Work</label>
                        </div>

                    </div>
                    <div class="col-xs-4">
                        <div class="form-group divAccountOf" style="display: none">
                            <label>On Account Of*:</label>
                            <input id="txtAcctOf" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Material Type*:</label>
                            <input type="text" id="txtMaterialPack" class="form-control" required />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Quantity*:</label>
                            <input id="txtQtyPack" type="number" class="form-control" required />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Weight:</label>
                            <input id="txtTotalWtPack" type="number" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Ware House No:</label>
                            <input id="txtWare" type="number" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="divClrs" style="display: none">
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>Color Shade*:</label>
                            <input id="txtColorShade" type="text" class="form-control" required="required" />
                            <%--<select id="ddlColorShade" class="form-control ddlColorShade" required="required"></select>--%>
                        </div>
                    </div>

                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Truck No*:</label>
                            <input id="txtTruckno" type="text" class="form-control" required="required" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>No of Barrels*:</label>
                            <input id="txtBarrels" type="number" class="form-control" required="required" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Quantity*:</label>
                            <input id="txtQtyClrs" type="text" class="form-control" required="required" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Warehouse Details:</label>
                            <input id="txtWareDet" type="text" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="divOthers" style="display: none">
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>Material Type*:</label>
                            <input type="text" id="txtMaterial" class="form-control" required="required" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Invoice No:</label>
                            <input id="txtInvoice" type="number" class="form-control" />
                        </div>
                    </div>

                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Quantity*:</label>
                            <input id="txtQty" type="number" class="form-control" required="required" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Total Weight:</label>
                            <input id="txtTotalWtOthrs" type="number" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Stores*:</label>
                            <input id="txtStore" type="text" class="form-control" required="required" />
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Machine Number*:</label>
                        <input type="text" class="form-control" id="txtMachNo" required />
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group">
                        <label>Shift*:</label>
                        <asp:DropDownList ID="ddlShift" runat="server" CssClass="form-control shft" required="required"></asp:DropDownList>

                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group">
                        <label>Shift Incharge*:</label>
                        <asp:DropDownList ID="ddlShiftIncharge" runat="server" CssClass="form-control shftIch" required="required"></asp:DropDownList>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group">
                        <label>Operator Name*:</label>
                        <asp:DropDownList ID="ddlOperator" runat="server" CssClass="form-control optr" required="required"></asp:DropDownList>

                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group">
                        <label>Checked By*:</label>
                        <asp:DropDownList ID="ddlChecked" runat="server" CssClass="form-control chkd" required="required"></asp:DropDownList>
                    </div>
                </div>
                <div class="col-xs-12" style="margin-top: 1%">
                    <input type="button" class="btn btn-success" value="Issue Material" id="btnSave" onclick="Save()" />
                </div>
            </div>

        </div>
    </div>

    <script>
        var CtrlIds = {
            "ddlChecked": "#<%=ddlChecked.ClientID %>",
            "ddlOperator": "#<%=ddlOperator.ClientID %>",
            "ddlShift": "#<%=ddlShift.ClientID %>",
            "ddlShiftIncharge": "#<%=ddlShiftIncharge.ClientID %>",
        };
    </script>
    <script src="../Scripts/views/jMaterialIssue.js"></script>

</asp:Content>
