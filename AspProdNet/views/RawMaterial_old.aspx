<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RawMaterial_old.aspx.cs" Inherits="AspProdNet.views.RawMaterial" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style>
        .panel {
            margin-bottom: 5px;
        }

        /*.ui-jqgrid-view {
            height: 95%;
        }

        .ui-jqgrid {
            height: 100%;
        }*/
    </style>
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
    <script src="../Scripts/views/jRawMaterial.js"></script>
    <div class="col-xs-12">
        <div class="col-xs-5">
            <div class="panel panel-default">
                <div id="divHd1" class="panel-heading">Registered Vehicle</div>
                <div class="panel-body">

                    <div id="dvhgt" class="col-xs-12" style="margin-top: 10px;">
                        <table id="grdTruck" class="table" style="height: 100%">
                        </table>
                        <div id="pager">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-xs-7">
            <div class="panel panel-default">
                <div id="divHd2" class="panel-heading">
                    Material Entry 
                    <span id="spnTruckId" class="pull-right" hidden></span>
                    <span id="spnTruckNO" class="pull-right"></span>
                </div>
                <div class="panel-body">
                    <div class="col-xs-6">
                        <div class="col-xs-12">
                            <label>
                                <input id="rBtmRaw" type="radio" name="rbtnOption" value="1" checked="checked" />Raw Material Entry</label>

                        </div>
                        <div class="col-xs-12">
                            <label>
                                <input id="rBtmOwn" type="radio" name="rbtnOwn" value="0" checked="checked" />Own</label>
                            <label>
                                <input id="rBtmCmp" type="radio" name="rbtnOwn" value="1" checked="checked" />Company</label>
                        </div>

                    </div>
                    <div class="col-xs-6">
                        <div class="col-xs-12">
                            <label>
                                <input id="rBtmPac" type="radio" name="rbtnOption" value="2" checked="checked" />Packing Material Entry</label>
                        </div>
                        <div class="col-xs-12">
                            <label>
                                <input id="rBtmPacOwn" type="radio" name="rbtnPacOwn" value="0" checked="checked" class="pull-left" />Own</label>

                            <div class="col-xs-8 pull-right">
                                <select id="ddlOwn" class="form-control">
                                    <option value="0">Box</option>
                                    <option value="1">Cage</option>
                                    <option value="2">Liners</option>
                                    <option value="3">Bag</option>
                                </select>
                            </div>

                        </div>

                        <div class="col-xs-12">
                            <label>
                                <input id="rBtmPacCmp" type="radio" name="rbtnPacOwn" value="1" checked="checked" />Rental</label>
                        </div>

                    </div>
                    <div class="col-xs-6">
                        <label>Name:</label>
                        <input id="txtCmpName" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-3">
                        <label>From:</label>
                        <input id="dtFrom" type="date" class="form-control" />
                    </div>
                    <div class="col-xs-3">
                        <label>To:</label>
                        <input id="dtTo" type="date" class="form-control" />
                    </div>
                    <div class="col-xs-12">
                        <label>Grade:</label>
                        <input id="txtGrade" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>Material:</label>
                        <asp:DropDownList ID="ddlMaterial" runat="server" CssClass="form-control"></asp:DropDownList>

                    </div>
                    <div class="col-xs-6">
                        <label>Supplier:</label>
                        <asp:DropDownList ID="ddlSuplier" runat="server" CssClass="form-control"></asp:DropDownList>
                    </div>
                    <div class="col-xs-6">
                        <label>Chalan No:</label>
                        <input id="txtChalan" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>ID No:</label>
                        <input id="txtIdno" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>Quantity:</label>
                        <input id="txtQty" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-6">
                        <label>Total:</label>
                        <input id="txtTotal" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-4">
                        <label>Ware House No:</label>
                        <input id="txtWare" type="text" class="form-control" />
                    </div>
                    <div class="col-xs-4">
                        <label>Visual Check:</label>
                        <input id="txtVSCheck" type="text" class="form-control" placeholder="OK" />
                    </div>
                    <div class="col-xs-4">
                        <label>Remark:</label>
                        <input id="txtRemark" type="text" class="form-control" placeholder="OK" />
                    </div>
                    <div class="col-xs-12" style="margin-top: 1%">
                        <input type="button" class="btn btn-success" value="Save" id="btnSave" onclick="SaveMaterial()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var CtrlIds = {
            "ddlMaterial": "#<%=ddlMaterial.ClientID %>",
            "ddlSuplier": "#<%=ddlSuplier.ClientID %>"
        };
    </script>
</asp:Content>
