<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ResinMoistureRpt.aspx.cs" Inherits="AspProdNet.views.ResinMoistureRpt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="col-xs-12">
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">Moisture Analysis Report of Post Drying Resin</div>
            <div class="panel-body">
                <div class="col-xs-12">
                    <div class="col-xs-5">
                        <%-- <div class="panel panel-default">
                    <div id="divHd1" class="panel-heading">Raw Materials</div>
                    <div class="panel-body">--%>
                        <div id="dvhgt" class="col-xs-12">
                            <table id="grdResin" class="table" style="height: 100%">
                            </table>
                            <div id="pager">
                            </div>
                        </div>
                        <%-- </div>
                </div>--%>
                    </div>
                    <div class="col-xs-7">
                        <%--<div class="panel panel-default">
                            <div id="divHd2" class="panel-heading">--%>
                        <span id="spnResinId" class="pull-right" hidden="hidden">-1</span>
                        <%--</div>--%>
                        <div class="panel-body">
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Frequency/Lot:</label>
                                    <input id="txtFreq" type="number" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Resin Bag No:</label>
                                    <input id="txtResinBagno" type="number" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Resin Grade:</label>
                                    <input id="txtResinGrade" type="text" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Invoice No:</label>
                                    <input id="txtInvoice" type="number" class="form-control" />
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Machine No:</label>
                                    <input id="txtMachineNo" type="number" class="form-control" />
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Specifications:</label>
                                    <input id="txtSpec" type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Check By:</label>
                                    <select id="ddlchkBy" class="form-control ddlchkBy" name="dmail" required="required"></select>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Result:</label>
                                    <textarea id="dvResult" runat="server" rows="4" class="form-control dvResult"></textarea>
                                </div>
                            </div>
                            <div class="col-xs-12" style="margin-top: 10px">
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
    <script src="../Scripts/views/jResinRpt.js"></script>
</asp:Content>
