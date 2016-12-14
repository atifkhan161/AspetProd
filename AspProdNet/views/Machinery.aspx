<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Machinery.aspx.cs" Inherits="AspProdNet.views.Machinery1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="col-xs-12">
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">Machinery</div>
            <div class="panel-body">
                <div class="col-xs-12">
                    <div class="col-xs-5">
                        <%-- <div class="panel panel-default">
                    <div id="divHd1" class="panel-heading">Raw Materials</div>
                    <div class="panel-body">--%>
                        <div id="dvhgt" class="col-xs-12">
                            <table id="grdTruck" class="table" style="height: 100%">
                            </table>
                            <div id="pager">
                            </div>
                        </div>
                        <%-- </div>
                </div>--%>
                    </div>
                    <div class="col-xs-7">
                       <%-- <div class="panel panel-default">
                            <div id="divHd2" class="panel-heading">--%>
                                 
                    <span id="spnMatrlId" class="pull-right" hidden="hidden">-1</span>
                            <%--</div>--%>
                            <div class="panel-body">
                                <div class="col-xs-8">
                                    <div class="form-group">
                                        <label>Brand Name*:</label>
                                        <select id="ddlBrand" class="form-control ddlBrand" required="required"></select>
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Supplier*:</label>
                                        <select id="ddlSuplier" class="form-control ddlSuplier" name="dmail" required="required"></select>
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Machinery Type*:</label>
                                        <input type="text" id="txtMachineryTyp" class="form-control" required="required" />
                                        <%--<select id="ddlMachinTyp" class="form-control ddlMachinTyp" name="dmail" required="required"></select>--%>
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
                                        <label>Chalan No/Invoice No*:</label>
                                        <input id="txtChalan" type="number" class="form-control" required="required" />
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Transport Details:</label>
                                        <input id="txtTransDet" type="text" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Container No:</label>
                                        <input id="txtContainer" type="number" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Seal No:</label>
                                        <input id="txtSeal" type="number" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Quantity*:</label>
                                        <input id="txtQty" type="text" class="form-control" required="required" />
                                    </div>
                                </div>

                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Check By*:</label>
                                        <select id="ddlchkBy" class="form-control ddlchkBy" name="dmail" required="required"></select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Remark:</label>
                                        <textarea id="dvNotesText" runat="server" rows="2" class="form-control dvNotesText"></textarea>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <input type="button" class="btn btn-success" value="Save" id="btnSave" onclick="Save()" />
                                    <input type="button" class="btn btn-info" value="Update" id="btnUpdate" onclick="Update()" disabled="disabled" />
                                    <input type="button" class="btn btn-danger" value="Delete" id="btnDelete" onclick="Delete()" disabled="disabled" />
                                    <input type="button" class="btn btn-primary" value="New" id="btnNew" onclick="New()" disabled="disabled" />
                                </div>
                            </div>
                        <%--</div>--%>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="../Scripts/views/jMachinery.js"></script>
</asp:Content>
