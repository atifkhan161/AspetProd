<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RawMaterial.aspx.cs" Inherits="AspProdNet.views.input.RawMaterial" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="col-xs-12">


        <div class="panel panel-default">
            <div id="divHd2" class="panel-heading">
                Raw Material Entry 
                    <span id="spnMatrlId" class="pull-right" hidden>-1</span>
            </div>
            <div class="panel-body">
                <div class="col-md-5 col-xs-12">
                    <div id="dvhgt" class="col-xs-12" style="margin-top: 10px;">
                        <table id="grdTruck" class="table" style="height: 100%">
                        </table>
                        <div id="pager">
                        </div>
                    </div>
                </div>
                <div class="col-md-7 col-xs-12">
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>
                                <input id="rBtmOwn" type="radio" name="rbtnOwn" value="Own" checked="checked" onchange="ownChange()" />Own</label>
                            <label>
                                <input id="rBtmCmp" type="radio" name="rbtnOwn" value="Job Work" checked="checked" onchange="ownChange()" />Job Work</label>
                        </div>

                    </div>
                    <div class="col-xs-4">
                        <div class="form-group divAccountOf" style="display: none">
                            <label>On Account Of*:</label>
                            <input id="txtAcctOf" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-8">
                        <div class="form-group">
                            <label>Brand Name*:</label>
                            <select id="ddlBrand" class="form-control" required></select>
                        </div>
                    </div>

                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Grade*:</label>
                            <input id="txtGrade" type="text" class="form-control" required />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Truck No*:</label>
                            <input id="txtTruckno" type="text" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Chalan No*:</label>
                            <input id="txtChalan" type="number" class="form-control" required />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Supplier*:</label>
                            <select id="ddlSuplier" class="form-control" name="dmail" required></select>
                        </div>
                    </div>


                    <div class="col-xs-4" >
                        <div class="form-group">
                            <label>Total No of Bags (Left):</label>
                            <input id="txtQty" type="number" class="form-control" value="1" onchange="setTotalBag(this)" onkeydown="keyDownTotalBag(this)" min="1" />
                            
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Total Weight*:</label>
                            <input id="txtTotalWt" type="number" class="form-control" Placeholder="Unit in Tons" required/>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Ware House No:</label>
                            <input id="txtWare" type="number" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Bag No/Bar Code No*:</label>
                            <div class="input-group">
                                <input id="txtBagNo" type="text" class="form-control" required />
                                <span class="input-group-btn" id="basic-addon3">
                                    <input type="button" class="btn-info btn" value="..." onclick=" OpenWindow('Select Bag No/Bar Code No', '400px', 'barCode');" /></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Visual Check*:</label>
                            <input id="txtVSCheck" type="text" class="form-control" placeholder="OK" required />
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Checked By*:</label>
                            <select id="ddlchkBy" class="form-control ddlchkBy" name="dmail" required></select>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label>Remark:</label>
                            <textarea id="dvNotesText" runat="server" rows="2" class="form-control dvNotesText"></textarea>
                        </div>
                    </div>
                    <div class="col-xs-12" style="margin-top: 1%">
                        <input type="button" class="btn btn-success" value="Save" id="btnSave" onclick="Save()" />
                        <input type="button" class="btn btn-success" value="Save & Next" id="btnSaveNext" onclick="Save(true)" />
                        <input type="button" class="btn btn-info" value="Update" id="btnUpdate" onclick="Update()" disabled />
                        <input type="button" class="btn btn-danger" value="Delete" id="btnDelete" onclick="Delete()" disabled />
                        <input type="button" class="btn btn-primary" value="New" id="btnNew" onclick="New()" disabled />
                    </div>

                </div>
            </div>
        </div>
    </div>

    <script src="../Scripts/views/jRawMaterial.js"></script>
</asp:Content>
