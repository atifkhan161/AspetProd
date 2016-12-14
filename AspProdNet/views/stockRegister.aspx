<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="stockRegister.aspx.cs" Inherits="AspProdNet.views.stockRegister1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#home" data-toggle="tab" aria-expanded="false">Raw Material</a></li>
        <li class=""><a href="#profile" data-toggle="tab" aria-expanded="true">Packing Material</a></li>
        <li class=""><a href="#tbclrs" data-toggle="tab" aria-expanded="false">Colors</a></li>
        <li class=""><a href="#tbMachinery" data-toggle="tab" aria-expanded="false">Machinery</a></li>
        <li class=""><a href="#tbOthers" data-toggle="tab" aria-expanded="false">Others</a></li>

    </ul>
    <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade active in" id="home">
            <div id="dvhgt" class="col-xs-12 dvhgt">
                <table id="grdRaw" class="table grdRaw" style="height: 100%">
                </table>
                <div id="pager">
                </div>
            </div>
        </div>
        <div class="tab-pane fade " id="profile">
            <div id="" class="col-xs-12 dvhgt">
                <table id="grdPack" class="table" style="height: 100%">
                </table>
                <div id="pager1">
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tbclrs">
            <div id="" class="col-xs-12 dvhgt">
                <table id="grdClrs" class="table" style="height: 100%">
                </table>
                <div id="pager2">
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tbMachinery">
            <div id="" class="col-xs-12 dvhgt">
                <table id="grdMchs" class="table" style="height: 100%">
                </table>
                <div id="pager3">
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tbOthers">
            <div id="" class="col-xs-12 dvhgt">
                <table id="grdOthers" class="table" style="height: 100%">
                </table>
                <div id="pager4">
                </div>
            </div>
        </div>
    </div>
    <script src="../Scripts/views/jStockRegOrig.js"></script>
</asp:Content>
