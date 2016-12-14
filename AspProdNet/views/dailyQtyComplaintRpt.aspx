<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="dailyQtyComplaintRpt.aspx.cs" Inherits="AspProdNet.views.dailyQtyComplaintRpt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="col-xs-12">
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">Daily Quality Complaint Report</div>
            <div class="panel-body">
                <div class="col-xs-12">
                    <div class="col-xs-5">
                        <%-- <div class="panel panel-default">
                    <div id="divHd1" class="panel-heading">Raw Materials</div>
                    <div class="panel-body">--%>
                        <div id="dvhgt" class="col-xs-12">
                            <table id="grdQtyCompl" class="table" style="height: 100%">
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
                        <span id="spnQtyComplId" class="pull-right" hidden="hidden">-1</span>
                        <%--</div>--%>
                        <div class="panel-body">
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Shift:</label>
                                    <select id="ddlShft" runat="server" class="form-control ddlShft" name="dmail" required="required"></select>
                                    <%--<input id="txtFreq" type="number" class="form-control" required="required" />--%>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>M/C:</label>
                                    <input id="txtMC" type="number" class="form-control" />
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Product:</label>
                                    <input id="txtProd" type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Weight:</label>
                                    <input id="txtwt" type="number" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Color:</label>
                                    <input id="txtClr" type="text" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Reporting To:</label>
                                    <input id="txtRepoTo" type="text" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Sign Q.C:</label>
                                    <select id="ddlchkBy" class="form-control ddlchkBy" name="dmail" required="required"></select>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="form-group">
                                    <label>Sign Production:</label>
                                    <select id="ddlSignProd" class="form-control ddlSignProd" name="dmail" required="required"></select>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Troubles:</label>
                                    <textarea id="txtTroubl" runat="server" rows="3" cols="3" class="form-control txtTroubl"></textarea>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Remarks:</label>
                                    <textarea id="dvResult" runat="server" rows="4" class="form-control dvResult"></textarea>
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
    <script src="../Scripts/views/jDailyQtyCompRpt.js"></script>
</asp:Content>
