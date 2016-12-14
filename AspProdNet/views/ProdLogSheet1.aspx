<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProdLogSheet1.aspx.cs" Inherits="AspProdNet.views.ProdLogSheet1" %>

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
            margin-top: 20px;
            /*border: 1px solid #ccc;*/
        }

        .panel {
            margin-bottom: 2px;
        }
    </style>
    <div class="col-xs-12">
        <div class="col-xs-4">
            <div class="panel panel-default">
                <div id="divHd0" class="panel-heading">Production</div>
                <div class="panel-body">
                    <div id="dvhgt1" class="col-xs-12" style="height: 520px">
                        <table id="grdProdHand" class="table" style="height: 100%">
                        </table>
                        <div id="pager1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-8">
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                        Production Log Sheet
                        <%--<h4 class="panel-title">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Production Log Sheet
                            </a>
                        </h4>--%>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                        <div class="panel-body">
                            <div id="content">
                                <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
                                    <li class="active"><a href="#General" data-toggle="tab">General</a></li>
                                    <li><a href="#Log" data-toggle="tab">Log Sheet</a></li>
                                    <li><a href="#Details" data-toggle="tab">Details</a></li>
                                    <li><a href="#CoolingTawer" data-toggle="tab">Cooling Tower</a></li>
                                    <li><a href="#Remarks" data-toggle="tab">Remarks</a></li>
                                </ul>
                                <div id="my-tab-content" class="tab-content">
                                    <div class="tab-pane active" id="General" style="height: 430px;">
                                       <%-- <div class="col-xs-12" style="margin-top: 10px;">
                                            <label style="font-weight: bold">Production ID:</label>
                                            <span id="spnProdId" class="input-sm" style="font-weight: bold"></span>
                                        </div>--%>
                                        <div class="col-xs-12">
                                            <label>MACHINE HPET:</label>
                                            <input id="txtMachHPET" type="text" class="form-control" />
                                        </div>
                                       
                                        <div class="col-xs-12">
                                            <label>PART WT:</label>
                                            <input id="txtPartWt" type="text" class="form-control" />
                                        </div>
                                        <div class="col-xs-12">
                                            <label>Shift:</label>
                                            <asp:DropDownList ID="ddlShft" runat="server" CssClass="form-control ddlShft"></asp:DropDownList>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="Log">
                                        <div class="col-xs-12">
                                            <%--<input type="button" class="btn btn-default input-sm" value="Edit" id="btnEdit" onclick="toggle()" />--%>
                                            <%--<a onclick="toggle()" id="lnkToggle" style="cursor: pointer">Edit</a>--%>
                                            <a onclick="closeEdit()" id="lnkClose" style="cursor: pointer; display: none">Close</a>
                                        </div>
                                        <div id="dvhgt" class="col-xs-12" style="margin-top: 10px; height: 420px; overflow-x: scroll">
                                            <table id="grdProdLog" class="table" style="height: 100%">
                                            </table>
                                            <div id="pager">
                                            </div>
                                        </div>
                                        <fieldset id="fldLogSheet" class="col-xs-12" style="display: none; overflow-y: scroll; height: 420px; margin-top: -10px">
                                            <fieldset>
                                                <legend>DRYER</legend>
                                                <div class="col-xs-4">
                                                    <fieldset>
                                                        <legend>Regeration Temp</legend>
                                                        <div class="col-xs-6">
                                                            <label>R:</label>
                                                            <input id="txtR" type="text" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>L:</label>
                                                            <input id="txtL" type="text" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="col-xs-4">
                                                    <fieldset>
                                                        <legend>Process Temp</legend>
                                                        <div class="col-xs-6">
                                                            <label>Set:</label>
                                                            <input id="txtProcSet" type="text" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>Act:</label>
                                                            <input id="txtProcAct" type="text" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="col-xs-4">
                                                    <fieldset>
                                                        <legend>Dew Point</legend>
                                                        <div class="col-xs-6">
                                                            <label>Set:</label>
                                                            <input id="txtDewSet" runat="server" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>Act:</label>
                                                            <input id="txtDewAct" runat="server" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <legend>DEHUMIDIFIER</legend>
                                                <div class="col-xs-4">
                                                    <fieldset>
                                                        <legend>Dew Point</legend>
                                                        <div class="col-xs-6">
                                                            <label>Set:</label>
                                                            <input id="txtDehuSet" runat="server" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>Act:</label>
                                                            <input id="txtDehuAct" runat="server" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <legend>CHILLER</legend>
                                                <div class="col-xs-6">
                                                    <fieldset>
                                                        <legend>Pressure(Bar)</legend>
                                                        <div class="col-xs-6">
                                                            <label>IN:</label>
                                                            <input id="txtIN" runat="server" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>OUT:</label>
                                                            <input id="txtOUT" runat="server" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>LP:</label>
                                                            <input id="txtLP" runat="server" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>HP:</label>
                                                            <input id="txtHP" runat="server" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="col-xs-6">
                                                    <fieldset>
                                                        <legend>Cooling Water</legend>
                                                        <div class="col-xs-6">
                                                            <label>Temp:</label>
                                                            <input id="txtCoolTemp" runat="server" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <legend>AIR COMPRESSOR</legend>
                                                <div class="col-xs-4">
                                                    <fieldset>
                                                        <legend>Pressure/kG</legend>
                                                        <div class="col-xs-6">
                                                            <label>Load:</label>
                                                            <input id="txtLoad" runat="server" class="form-control" />
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label>Unload:</label>
                                                            <input id="txtUnload" runat="server" class="form-control" />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <legend>Cooling Tower Pump</legend>
                                                <div class="col-xs-4">
                                                    <div class="col-xs-6">
                                                        <label>Texmo:</label>
                                                        <input id="txtTexmo" type="text" runat="server" class="form-control" />
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <label>Bar:</label>
                                                        <input id="txtBar" runat="server" class="form-control" />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <div class="col-xs-6">
                                                <label>3 PHASE:</label>
                                                <input id="txtPhase" runat="server" class="form-control" />
                                            </div>
                                            <div class="col-xs-6">
                                                <label>SHOUT COUNTER:</label>
                                                <input id="txtShout" runat="server" class="form-control" />
                                            </div>
                                            <div class="col-xs-6">
                                                <label>QUALITY OK/NOT:</label>
                                                <input id="txtQty" type="datetime" runat="server" class="form-control" />
                                            </div>
                                            <div class="col-xs-6">
                                                <label>OPERATOR NAME:</label>
                                                <input id="txtOperNm" runat="server" class="form-control" />
                                            </div>
                                            <%--<div class="col-xs-12" style="margin-top: 1%">--%>
                                            <%--</div>--%>
                                        </fieldset>

                                    </div>
                                    <div class="tab-pane" id="Details" style="height: 430px;">
                                        <div class="col-xs-6">
                                            <label>CYCLE TIME(SEC):</label>
                                            <input id="txtCycTim" type="text" class="form-control" />
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Perform Avg Wt(Gm):</label>
                                            <input id="txtPer" type="text" class="form-control" />
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Production Kg(Bag/Box):</label>
                                            <input id="txtProdKg" type="text" class="form-control" />
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Rejection(Kg):</label>
                                            <input id="txtRej" type="text" class="form-control" />
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Lumps(Kg):</label>
                                            <input id="txtLumps" runat="server" class="form-control txtLumps" />
                                        </div>
                                        <div class="col-xs-6">
                                            <label>Pet Material:</label>
                                            <input id="txtPetMat" runat="server" class="form-control txtPetMat" />
                                        </div>
                                      <%--  <div class="col-xs-6">
                                            <label>DOWNTIME:</label>
                                            <input id="txtDowntm" type="text" runat="server" class="form-control txtDowntm" />
                                        </div>--%>
                                    </div>
                                    <div class="tab-pane" id="CoolingTawer" style="height: 430px;">
                                        <fieldset class="col-xs-12">
                                            <legend>COOLING TAWER</legend>
                                            <div class="col-xs-4">
                                                <label>TDS:</label>
                                                <input id="txtTDS" runat="server" class="form-control txtTDS" />
                                            </div>
                                            <div class="col-xs-4">
                                                <label>PH:</label>
                                                <input id="txtPH" runat="server" class="form-control txtPH" />
                                            </div>
                                            <div class="col-xs-4">
                                                <label>TEMP:</label>
                                                <input id="txtTEMP" runat="server" class="form-control txtTEMP" />
                                            </div>
                                        </fieldset>
                                        <fieldset class="col-xs-12">
                                            <div class="col-xs-6">
                                                <label>PLANT:</label>
                                                <input id="txtPLANT" runat="server" class="form-control txtPLANT" />
                                            </div>
                                            <div class="col-xs-6">
                                                <label>Temperature:</label>
                                                <input id="txtTempratr" runat="server" class="form-control txtTempratr" />
                                            </div>
                                            <div class="col-xs-6">
                                                <label>Humidity:</label>
                                                <input id="txtHumid" runat="server" class="form-control txtHumid" />
                                            </div>
                                           <%-- <div class="col-xs-6">
                                                <label>Time 12:00/24:00:</label>
                                                <input id="txtLogTim" type="datetime" runat="server" class="form-control txtLogTim" />
                                            </div>--%>
                                        </fieldset>

                                    </div>
                                    <div class="tab-pane" id="Remarks">
                                        <fieldset style="margin-top: 5px;">
                                            <legend>Remarks</legend>
                                            <textarea id="dvNotesText" runat="server" cols="110" rows="15" class="form-control dvNotesText"></textarea>
                                        </fieldset>
                                        <div class="col-xs-6">
                                            <label>Shift Incharge:</label>
                                            <asp:DropDownList ID="txtShftInchrg" runat="server" CssClass="form-control txtShftInchrg"></asp:DropDownList>
                                        </div>
                                        <div class="col-xs-6">
                                            <label>MANAGER(HOD):</label>
                                            <asp:DropDownList ID="txtManager" runat="server" CssClass="form-control txtManager"></asp:DropDownList>
                                        </div>
                                    </div>
                                    <div class="col-xs-12" style="margin-top: 10px">
                                        <input type="button" class="btn btn-success" value="Save" id="btnSaveLog" onclick="SaveLog()" />
                                        <input type="button" class="btn btn-info" value="Update" id="btnUpdate" onclick="Update()" disabled />
                                        <input type="button" class="btn btn-danger" value="Delete" id="btnDelete" onclick="Delete()" disabled />
                                        <input type="button" class="btn btn-primary" value="New" id="btnNew" onclick="New()" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../Scripts/views/jProdLog.js"></script>
    <script type="text/javascript">
        var CtrlIds = {
            "ddlShft": "#<%=ddlShft.ClientID %>",
            "txtDewSet": "#<%=txtDewSet.ClientID %>",
            "txtDewAct": "#<%=txtDewAct.ClientID %>",
            "txtDehuSet": "#<%=txtDehuSet.ClientID %>",
            "txtDehuAct": "#<%=txtDehuAct.ClientID %>",
            "txtIN": "#<%=txtIN.ClientID %>",
            "txtOUT": "#<%=txtOUT.ClientID %>",
            "txtLP": "#<%=txtLP.ClientID %>",
            "txtHP": "#<%=txtHP.ClientID %>",
            "txtCoolTemp": "#<%=txtCoolTemp.ClientID %>",
            "txtLoad": "#<%=txtLoad.ClientID %>",
            "txtUnload": "#<%=txtUnload.ClientID %>",
            "txtTexmo": "#<%=txtTexmo.ClientID %>",
            "txtBar": "#<%=txtBar.ClientID %>",
            "txtPhase": "#<%=txtPhase.ClientID %>",
            "txtShout": "#<%=txtShout.ClientID %>",
            "txtQty": "#<%=txtQty.ClientID %>",
            "txtOperNm": "#<%=txtOperNm.ClientID %>",
            "txtLumps": "#<%=txtLumps.ClientID %>",
            "txtPetMat": "#<%=txtPetMat.ClientID %>",
           <%-- "txtDowntm": "#<%=txtDowntm.ClientID %>",
            "txtLogTim": "#<%=txtLogTim.ClientID %>",--%>
            "txtTDS": "#<%=txtTDS.ClientID %>",
            "txtPH": "#<%=txtPH.ClientID %>",
            "txtTEMP": "#<%=txtTEMP.ClientID %>",
            "txtPLANT": "#<%=txtPLANT.ClientID %>",
            "txtTempratr": "#<%=txtTempratr.ClientID %>",
            "txtHumid": "#<%=txtHumid.ClientID %>",
            "dvNotesText": "#<%=dvNotesText.ClientID %>",
            "txtShftInchrg": "#<%=txtShftInchrg.ClientID %>",
            "txtManager": "#<%=txtManager.ClientID %>"
        };

    </script>

</asp:Content>
