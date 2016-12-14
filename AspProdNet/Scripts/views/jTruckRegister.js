
$(document).ready(function () {
    // $("#txtDate").val(today);
  //  $("input,select,textarea").not("[type=button]").jqBootstrapValidation({ autoAdd: { helpBlocks: false } });
});

function validate() {
    if (!$.isNumeric($("#txtContainer").val()))
        return false;
    if (!$.isNumeric($("#txtSeal").val()))
        return false;
    return true;
}

function SaveTruck() {
    if (validate()) {
        var oTruck = {
            vdate: $("#txtDate").val(),
            wTruckNo: $("#txtTruck").val(),
            wContainerNo: $("#txtContainer").val(),
            wSealNo: $("#txtSeal").val(),
            sBrandName: $("#txtBrand").val(),
            sQuantity: $("#txtQuantity").val(),
            wUserId: $(CtrlIds.ddlStation).val(),
            wStationId: $(CtrlIds.ddlStation).val(),
            sdesc: $("#txtNotes").val()

        };

        $.ajax({
            type: "POST",
            url: "VehicleRegister.aspx/SaveTruck",
            contentType: "application/json; charset=utf-8",
            data: "{'sData':'" + JSON.stringify(oTruck) + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                alert("saved");
                RedirectHome();

            //    HideWaitCursor();
            },
            error: function (result) {
                
             //   HideWaitCursor();
            }
        });

    }
}