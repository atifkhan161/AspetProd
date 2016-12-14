<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProdHandSlip.aspx.cs" Inherits="AspProdNet.views.ProdHandSlip" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../Content/ui.jqgrid.css" rel="stylesheet" />
    <link href="../Content/redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/grid.locale-en.js"></script>
    <script src="../Scripts/jquery.jqGrid.src.js"></script>
    <script src="../Scripts/views/jProdHandSlip.js"></script>
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

        .panel {
            margin-bottom: 2px;
        }
    </style>
    <div class="col-xs-12">
        <%-- <div class="col-xs-5">--%>
        <div class="panel panel-default">
            <div id="divHd1" class="panel-heading">Production Handling Slip</div>
            <div class="panel-body">
                <div class="col-xs-7">
                    <div id="dvhgt" class="col-xs-12" style="height: 280px">
                        <table id="grdProdHand" class="table" style="height: 100%">
                        </table>
                        <div id="pager">
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <fieldset class="col-xs-12" style="margin-top: 5px">
                            <legend>Add New row</legend>
                            <div class="col-xs-6">
                                <label>Produced No of Boxes/ Pcs:</label>
                                <input id="txtProduce" type="number" class="form-control" />
                            </div>
                            <div class="col-xs-6">
                                <label>Transfer No of Boxes:</label>
                                <input id="txtTransfer" type="number" class="form-control" />
                            </div>
                            <div class="col-xs-6">
                                <label>Goods(Pcs.):</label>
                                <input id="txtGoods" type="number" class="form-control" />
                            </div>
                            <div class="col-xs-6">
                                <label>Manufacturing Date:</label>
                                <input id="txtMfgDate" type="date" class="form-control" />
                            </div>

                            <div class="col-xs-12" style="margin-top: 5px">
                                <input type="button" class="btn btn-success " value="Add Row" onclick="AddNewHandling();" />
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="col-xs-5">
                    <fieldset class="col-xs-12" style="margin-top: 0px">
                        <legend>Production Details</legend>
                        <div class="col-xs-6">
                            <label>From:</label>
                            <input id="dtFrom" type="date" class="form-control" />
                        </div>
                        <div class="col-xs-6">
                            <label>Perform Size:</label>
                            <input id="txtPer" type="text" class="form-control" />
                        </div>
                        <div class="col-xs-6">
                            <label>Grade:</label>
                            <input id="txtGrade" type="text" class="form-control" />
                        </div>
                        <div class="col-xs-6">
                            <label>ID Number</label>
                            <input id="txtId" type="text" class="form-control" />
                        </div>
                        <fieldset class="col-xs-6">
                            <legend>Machine I</legend>
                            <div class="col-xs-12">
                                <label>Rejection:</label>
                                <input id="txtRej1" type="text" class="form-control" />
                            </div>
                            <div class="col-xs-12">
                                <label>Lumps:</label>
                                <input id="txtLump1" type="text" class="form-control" />
                            </div>
                        </fieldset>
                        <fieldset class="col-xs-6">
                            <legend>Machine II</legend>
                            <div class="col-xs-12">
                                <label>Rejection:</label>
                                <input id="txtRej2" type="text" class="form-control" />
                            </div>
                            <div class="col-xs-12">
                                <label>Lumps:</label>
                                <input id="txtLump2" type="text" class="form-control" />
                            </div>
                        </fieldset>

                        <div class="col-xs-6">
                            <label>Prepared By:</label>
                            <asp:DropDownList ID="ddlprep" runat="server" CssClass="form-control"></asp:DropDownList>
                        </div>
                        <div class="col-xs-6">
                            <label>Received By:</label>
                            <asp:DropDownList ID="ddlChkd" runat="server" CssClass="form-control"></asp:DropDownList>
                        </div>
                    </fieldset>
                </div>
                <div class="col-xs-12">
                    <input type="button" class="btn btn-success pull-right" value="Save" id="btnSave" onclick="SaveProd();"/>
                </div>
            </div>
        </div>
        <%--</div>--%>
        <%-- <div class="col-xs-7">
            
        </div>--%>
    </div>
      <script>
          var CtrlIds = {
              "ddlChkd": "#<%=ddlChkd.ClientID %>",
              "ddlprep": "#<%=ddlprep.ClientID %>"
        };
    </script>
</asp:Content>
