<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="VehicleRegister.aspx.cs" Inherits="AspProdNet.views.VehicleRegister" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div class="col-xs-12">
        <fieldset>
            <legend>Vehicle Registration</legend>
            <div class="row">
                <div class="col-xs-6">
                    <label>Date:</label>
                    <input id="txtDate" type="date" class="form-control" />
                </div>
                <div class="col-xs-6">
                    <label>Truck No.:</label>
                    <input id="txtTruck" name="txtTruck" type="text" class="form-control" data-validation-required-message="Required" required />
                </div>
                <div class="col-xs-6">
                    <label>Container No.:</label>
                    <input id="txtContainer" type="text" class="form-control" />
                </div>
                <div class="col-xs-6">
                    <label>Seal No.:</label>
                    <input id="txtSeal" type="text" class="form-control" />
                </div>

                <div class="col-xs-6">
                    <label>Brand Name:</label>
                    <input id="txtBrand" type="text" class="form-control" />
                </div>
                <div class="col-xs-6">
                    <label>Quantity:</label>
                    <input id="txtQuantity" type="text" class="form-control" />
                </div>
                <div class="col-xs-6">
                    <label>Loading Supervisor:</label>
                    <%--<input id="txtLdSup" type="text" class="form-control" />--%>
                    <asp:DropDownList ID="ddlSupervisor" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>
                <div class="col-xs-6">
                    <label>Loading Station:</label>
                    <%-- <input id="txtldSta" type="text" class="form-control" />--%>
                    <asp:DropDownList ID="ddlStation" runat="server" CssClass="form-control"></asp:DropDownList>
                </div>


            </div>
            <div class="row">
                <div class="col-xs-12">
                    <label>Notes</label>
                    <textarea rows="6" id="txtNotes" class="form-control col-xs-12"></textarea>
                </div>
                <div class="col-xs-12" style="margin-top: 1%">
                    <input type="submit" class="btn btn-success" value="Save" id="btnSave"
                        <%-- onclick="SaveTruck();"--%>
                         />
                </div>
            </div>

        </fieldset>
    </div>
    <script src="../Scripts/views/jTruckRegister.js"></script>
    <script>
        var CtrlIds = {
            "ddlStation": "#<%=ddlStation.ClientID %>",
            "ddlSupervisor": "#<%=ddlSupervisor.ClientID %>"
        };
    </script>
</asp:Content>
