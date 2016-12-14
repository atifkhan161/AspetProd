var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wLogId': -1,
            'oData.wProductionId': -1,
            //'oData.wLogDate': '#txtDt',
            'oData.MachineHpte': '#txtMachHPET',
            'oData.partWt': '#txtPartWt',
            'oData.sShift': '.ddlShft',
            'oData.CycleTime': '#txtCycTim',
            'oData.PerformAvg': '#txtPer',
            'oData.ProdKg': '#txtProdKg',
            'oData.Rejection': '#txtRej',
            'oData.Lumps': '.txtLumps',
            'oData.PetMaterial': '.txtPetMat',
            //'oData.DownTime': '.txtDowntm',
            //'oData.LogTime': '.txtLogTim',
            'oData.ColTDS': '.txtTDS',
            'oData.ColPH': '.txtPH',
            'oData.ColTemp': '.txtTEMP',
            'oData.Plant': '.txtPLANT',
            'oData.Temprature': '.txtTempratr',
            'oData.Humidity': '.txtHumid',
            'oData.sRemarks': '.dvNotesText',
            'oData.wShiftIncharge': '.txtShftInchrg',
            'oData.wManager': '.txtManager'
            ////////////////////////////////////////////////////////

            //'oData.wLogDate': '#MainContent_txtDt',
            //'oData.MachineHpte': '#MainContent_txtMachHPET',
            //'oData.partWt': '#MainContent_txtPartWt',
            //'oData.sShift': '#MainContent_ddlShft',
            //'oData.CycleTime': '#MainContent_txtCycTim',
            //'oData.PerformAvg': '#MainContent_txtPer',
            //'oData.ProdKg': '#MainContent_txtProdKg',
            //'oData.Rejection': '#MainContent_txtRej',
            //'oData.Lumps': '#MainContent_txtLumps',
            //'oData.PetMaterial': '#MainContent_txtPetMat',
            //'oData.DownTime': '#MainContent_txtDowntm',
            //'oData.LogTime': '#MainContent_txtLogTim',
            //'oData.ColTDS': '#MainContent_txtTDS',
            //'oData.ColPH': '#MainContent_txtPH',
            //'oData.ColTemp': '#MainContent_txtTEMP',
            //'oData.Plant': '#MainContent_txtPLANT',
            //'oData.Temprature': '#MainContent_txtTempratr',
            //'oData.Humidity': '#MainContent_txtHumid',
            //'oData.sRemarks': '#MainContent_dvNotesText',
            //'oData.wShiftIncharge': '#MainContent_txtShftInchrg',
            //'oData.wManager': '#MainContent_txtManager'
        });

function GetNewData() {
    return {
        wLogId: -1,
        wProductionId: -1,
        //wLogDate: "",
        MachineHpte: "",
        partWt: "",
        sShift: "",
        CycleTime: "",
        PerformAvg: "",
        ProdKg: "",
        Rejection: "",
        Lumps: "",
        PetMaterial: "",
        //DownTime: "",
        //LogTime: "",
        ColTDS: "",
        ColPH: "",
        ColTemp: "",
        Plant: "",
        Temprature: "",
        Humidity: "",
        sRemarks: "",
        wShiftIncharge: "",
        wManager: ""
    };
}

function New() {
    frmData.oData = GetNewData();
    jQuery("#grdProdLog").jqGrid("clearGridData");

    EnableSave();
}
$(document).ready(function () {
    BindProdData();
    BindData();
});
function BindData() {

    $("#grdProdLog").jqGrid({
        //data: mydata,
        datatype: "local",
        colNames: ['Log ID', 'Time', 'R', 'L', 'Set', 'Act', 'Set', 'Act', 'Set', 'Act', 'IN', 'OUT', 'LP', 'HP', 'temp', 'Load', 'Unload', 'Texmo', 'Bar', 'Volts', 'SHOUT CONTER', 'QUALITY OK/NOT', 'OPERATOR NAME'],
        colModel: [
            { name: 'wLogId', index: 'SrNo', width: 90 },
            { name: 'Time', index: 'Time', editable: false, width: 90 },
            { name: 'RegretionR', index: 'R', editable: true, width: 90 },
            { name: 'RegrationL', index: 'L', editable: true, width: 90 },
            { name: 'ProcessS', index: 'Set1', editable: true, width: 90 },
            { name: 'ProcessA', index: 'Act1', editable: true, width: 90 },
            { name: 'DewS', index: 'Set2', editable: true, width: 90 },
            { name: 'DewA', index: 'Act2', editable: true, width: 90 },
            { name: 'DHDewS', index: 'Set3', editable: true, width: 90 },
            { name: 'DHDewA', index: 'Act3', editable: true, width: 90 },
            { name: 'PressureIn', index: 'In', editable: true, width: 90 },
            { name: 'PressureOUT', index: 'Out', editable: true, width: 90 },
            { name: 'PressureLp', index: 'LP', editable: true, width: 90 },
            { name: 'PressureHp', index: 'HP', editable: true, width: 90 },
            { name: 'CoolingTemp', index: 'temp', editable: true, width: 90 },
            { name: 'ACPressureLOad', index: 'load', editable: true, width: 90 },
            { name: 'ACPressureUnload', index: 'unload', editable: true, width: 90 },
            { name: 'CTPTExmo', index: 'texmo', editable: true, width: 90 },
            { name: 'CTPBar', index: 'bar', editable: true, width: 90 },
            { name: 'PhaseVolts', index: 'volts', editable: true, width: 90 },
            { name: 'ShoutConter', index: 'shout', editable: true, width: 90 },
            { name: 'Quality', index: 'quality', editable: true, width: 90 },
            { name: 'Operator', index: 'opName', editable: true, width: 90 }
        ],
        //multiselect: true,
        rowNum: 10,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: false,
        viewrecords: true,
        //height: 340,
        width: 2100,
        caption: "Log Sheet",
        beforeRequest: function () {
            setTimeout(function () {

                //$("#grdProdLog").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdProdLog").jqGrid('setGridHeight', $("#dvhgt").height() - 150, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            //var AdvId = rowData['AdvocateId'];
            //openAdvDetail(AdvId);
        }
    });
    jQuery("#grdProdLog").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
             { startColumnName: 'wLogId', numberOfColumns: 1, titleText: '' },
             { startColumnName: 'Time', numberOfColumns: 1, titleText: '' },
          { startColumnName: 'RegretionR', numberOfColumns: 6, titleText: '<center> DRYER<center />' },
          { startColumnName: 'DHDewS', numberOfColumns: 2, titleText: '<center>DEHUMIDIFIER<center/>' },
          { startColumnName: 'PressureIn', numberOfColumns: 5, titleText: '<center>CHILLER<center/>' },
          { startColumnName: 'ACPressureLOad', numberOfColumns: 2, titleText: '<center>AIR COMPRESSOR<center/>' },
        { startColumnName: 'CTPTExmo', numberOfColumns: 2, titleText: '<center>COOLING TOWER PUMP<center/>' },
{ startColumnName: 'PhaseVolts', numberOfColumns: 1, titleText: '<center>3 PHASE<center/>' }
        ]
    });
    jQuery("#grdProdLog").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
             { startColumnName: 'wLogId', numberOfColumns: 1, titleText: '' },
             { startColumnName: 'Time', numberOfColumns: 1, titleText: '' },
          { startColumnName: 'RegretionR', numberOfColumns: 2, titleText: '<center> Regeneration Temp<center />' },
          { startColumnName: 'ProcessS', numberOfColumns: 2, titleText: '<center>Process Temp<center/>' },
          { startColumnName: 'DewS', numberOfColumns: 2, titleText: '<center>Dew Point<center/>' },
           { startColumnName: 'DHDewS', numberOfColumns: 2, titleText: '<center>Dew Point<center/>' },
          { startColumnName: 'PressureIn', numberOfColumns: 4, titleText: '<center>Pressure<center/>' },
        { startColumnName: 'CoolingTemp', numberOfColumns: 1, titleText: '<center>COOLING Water<center/>' },
{ startColumnName: 'ACPressureLOad', numberOfColumns: 2, titleText: '<center>Pressure/Kg<center/>' }
        ]
    });

    $("#grdProdLog").navGrid('#pager', { view: false, del: false, add: false, edit: false, search: false, reload: false });
    $("#grdProdLog").jqGrid('inlineNav', '#pager',
        {
            edit: true, editicon: 'ui-icon-pencil',
            add: false, addicon: 'ui-icon-plus',
            save: true, saveicon: 'ui-icon-disk',
            cancel: false, cancelicon: 'ui-icon-cancel',

        });
    GetLogData();
}

function GetLogData() {
    var odata = [];
    for (i = 1; i <= 8; i++) {
        var oRow = {
            wLogId: i
        };
        odata.push(oRow);
    }

    jQuery("#grdProdLog").jqGrid('setGridParam', {
        datatype: 'local',
        data: odata
    }).trigger("reloadGrid");
}
var prodId;
function BindProdData() {
    $("#grdProdHand").jqGrid({
        datatype: "local",
        colNames: ['wLogId', 'Production Id', 'Log Date', 'Machine Hpte'],
        colModel: [
            { name: 'wLogId', index: 'wLogId', hidden: true },
            { name: 'wProductionId', index: 'wProductionId' },
            { name: 'wLogDate', index: 'wLogDate' },
            { name: 'MachineHpte', index: 'MachineHpte' }
        ],
        multiselect: false,
        rowNum: 10,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager1'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Production",
        beforeRequest: function () {
            setTimeout(function () {
                $("#grdProdHand").jqGrid('setGridWidth', $("#dvhgt1").width(), true);
                $("#grdProdHand").jqGrid('setGridHeight', $("#dvhgt1").height() - 70, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
            //GetAllData();
        },
        onSelectRow: function (rowId, rowId1, asd) {
            var rowData = jQuery("#grdProdHand").jqGrid("getRowData", rowId);
            //jQuery("#spnProdId").html(rowData.wProductionId);
            prodId = rowData.wProductionId;
            //$("#btnSaveLog").removeAttr('disabled');

            ////jQuery("#spnTruckId").val(rowData.wTruckId);
        }
    });

    $.ajax({
        type: "POST",
        url: "ProdLogSheet1.aspx/LoadData",
        //                 data: "{cAdvocate :'" + JSON.stringify(cAdvocate) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                jQuery("#grdProdHand").jqGrid('setGridParam',
       {
           datatype: 'local',
           data: JSON.parse(msg.d)
       }).trigger("reloadGrid");
            }
        }
    });
}

function GetAllData() {
    GetDataAsync('ProdLogSheet1.aspx/LoadData', function (response) {
        if (response.d != null) {
            jQuery("#grdProdHand").jqGrid('setGridParam',
   {
       datatype: 'local',
       data: JSON.parse(response.d)
   }).trigger("reloadGrid");
        }
    }

, function () {

});
}

function toggle() {
    $("#fldLogSheet")[0].style.display = "";
    $("#dvhgt")[0].style.display = "none";
    $("#lnkClose")[0].style.display = "";
    $("#lnkToggle")[0].style.display = "none";
}

function closeEdit() {
    $("#fldLogSheet")[0].style.display = "none";
    $("#dvhgt")[0].style.display = "";
    $("#lnkClose")[0].style.display = "none";
    $("#lnkToggle")[0].style.display = "";
}
function SaveLog() {
    var oProd = $('#grdProdLog').jqGrid('getGridParam', 'data');
    var Clientdata = {
        wLogId: -1,
        wProductionId: -1,
        //wLogDate: $('#txtDt').val(),
        MachineHpte: $('#txtMachHPET').val(),
        partWt: $('#txtPartWt').val(),
        sShift: $(CtrlIds.ddlShft).val(),
        CycleTime: $('#txtCycTim').val(),
        PerformAvg: $('#txtPer').val(),
        ProdKg: $('#txtProdKg').val(),
        Rejection: $('#txtRej').val(),
        Lumps: $(CtrlIds.txtLumps).val(),
        PetMaterial: $(CtrlIds.txtPetMat).val(),
        //DownTime: $(CtrlIds.txtDowntm).val(),
        //LogTime: $(CtrlIds.txtLogTim).val(),
        ColTDS: $(CtrlIds.txtTDS).val(),
        ColPH: $(CtrlIds.txtPH).val(),
        ColTemp: $(CtrlIds.txtTEMP).val(),
        Plant: $(CtrlIds.txtPLANT).val(),
        Temprature: $(CtrlIds.txtTempratr).val(),
        Humidity: $(CtrlIds.txtHumid).val(),
        sRemarks: $(CtrlIds.dvNotesText).val(),
        wShiftIncharge: $(CtrlIds.txtShftInchrg).val(),
        wManager: $(CtrlIds.txtManager).val()
    };

    $.ajax({
        type: "POST",
        url: "ProdLogSheet1.aspx/SaveEntry",
        contentType: "application/json; charset=utf-8",
        data: "{'sData':'" + JSON.stringify(oProd) + "','sHandData':'" + JSON.stringify(Clientdata) + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            notie.alert(1, 'Saved !', 2);
            $("#fldLogSheet")[0].style.display = "none";
            $("#dvhgt")[0].style.display = "";
            New();
            GetAllData();
            //RedirectHome();
            //    HideWaitCursor();
        },
        error: function (result) {

            //   HideWaitCursor();
        }
    });
}

function AddNewRow() {
    var data = {
        wLogId: -1,
        wProductionId: prodId,
        wLogDate: $('#txtDt').val(),
        MachineHpte: $('#txtMachHPET').val(),
        partWt: $('#txtPartWt').val(),
        sShift: $(CtrlIds.ddlShft).val(),
        CycleTime: $('#txtCycTim').val(),
        PerformAvg: $('#txtPer').val(),
        ProdKg: $('#txtProdKg').val(),
        Rejection: $('#txtRej').val(),
        Lumps: $(CtrlIds.txtLumps).val(),
        PetMaterial: $(CtrlIds.txtPetMat).val(),
        DownTime: $(CtrlIds.txtDowntm).val(),
        LogTime: $(CtrlIds.txtLogTim).val(),
        ColTDS: $(CtrlIds.txtTDS).val(),
        ColPH: $(CtrlIds.txtPH).val(),
        ColTemp: $(CtrlIds.txtTEMP).val(),
        Plant: $(CtrlIds.txtPLANT).val(),
        Temprature: $(CtrlIds.txtTempratr).val(),
        Humidity: $(CtrlIds.txtHumid).val(),
        sRemarks: $(CtrlIds.dvNotesText).val(),
        wShiftIncharge: $(CtrlIds.txtShftInchrg).val(),
        wManager: $(CtrlIds.txtManager).val()
    };
    //        jQuery("#grdClients").jqGrid('addRowData', 1, data);
    jQuery("#grdProdLog").addRowData(jQuery("#grdProdLog").jqGrid('getDataIDs') + 1, data, "last");

    //Clear TextFeilds
    //$('#txtTransfer')[0].value = "";
    //$('#txtProduce')[0].value = "";
    //$('#txtGoods')[0].value = "";
}

var oLogId;
function UpdateEntry(oRow) {
    ShowWaitCursor();
    jQuery("#grdProdLog").jqGrid("clearGridData");

    GetDataAsync('ProdLogSheet1.aspx/LoadSingleData', function (response) {
        if (response.d != "") {
            oUpData = JSON.parse(response.d);
            frmData.oData = oUpData.oProdLogList;
            jQuery("#grdProdLog").jqGrid('setGridParam', {
                datatype: 'local',
                data: oUpData.oLogList
            }).trigger("reloadGrid");
            oLogId = oUpData.oProdLogList.wLogId;
            //$('#txtDt').val(oUpData.oProdLogList.wLogDate);
            //$('#txtMachHPET').val(oUpData.oProdLogList.MachineHpte);
            //$('#txtPartWt').val(oUpData.oProdLogList.partWt);
            //$(CtrlIds.ddlShft).val(oUpData.oProdLogList.sShift);
            //$('#txtCycTim').val(oUpData.oProdLogList.CycleTime);
            //$('#txtPer').val(oUpData.oProdLogList.PerformAvg);
            //$('#txtProdKg').val(oUpData.oProdLogList.ProdKg);
            //$('#txtRej').val(oUpData.oProdLogList.Rejection);
            //$(CtrlIds.txtLumps).val(oUpData.oProdLogList.Lumps);
            //$(CtrlIds.txtPetMat).val(oUpData.oProdLogList.PetMaterial);
            //$(CtrlIds.txtDowntm).val(oUpData.oProdLogList.DownTime);
            //$(CtrlIds.txtLogTim).val(oUpData.oProdLogList.LogTime);
            //$(CtrlIds.txtTDS).val(oUpData.oProdLogList.ColTDS);
            //$(CtrlIds.txtPH).val(oUpData.oProdLogList.ColPH);
            //$(CtrlIds.txtTEMP).val(oUpData.oProdLogList.ColTemp);
            //$(CtrlIds.txtPLANT).val(oUpData.oProdLogList.Plant);
            //$(CtrlIds.txtTempratr).val(oUpData.oProdLogList.Temprature);
            //$(CtrlIds.txtHumid).val(oUpData.oProdLogList.Humidity);
            //$(CtrlIds.dvNotesText).val(oUpData.oProdLogList.sRemarks);
            //$(CtrlIds.txtShftInchrg).val(oUpData.oProdLogList.wShiftIncharge);
            //$(CtrlIds.txtManager).val(oUpData.oProdLogList.wManager);
        }
        else {
            jQuery("#grdProdLog").jqGrid("clearGridData");

            $('#txtDt').val("");
            $('#txtMachHPET').val("");
            $('#txtPartWt').val("");
            $(CtrlIds.ddlShft).val("");
            $('#txtCycTim').val("");
            $('#txtPer').val("");
            $('#txtProdKg').val("");
            $('#txtRej').val("");
            $(CtrlIds.txtLumps).val("");
            $(CtrlIds.txtPetMat).val("");
            $(CtrlIds.txtDowntm).val("");
            $(CtrlIds.txtLogTim).val("");
            $(CtrlIds.txtTDS).val("");
            $(CtrlIds.txtPH).val("");
            $(CtrlIds.txtTEMP).val("");
            $(CtrlIds.txtPLANT).val("");
            $(CtrlIds.txtTempratr).val("");
            $(CtrlIds.txtHumid).val("");
            $(CtrlIds.dvNotesText).val("");
            $(CtrlIds.txtShftInchrg).val("");
            $(CtrlIds.txtManager).val("");
        }
        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow.wLogId + "'}"
);
}

function Update() {
    var oProd = $('#grdProdLog').jqGrid('getGridParam', 'data');
    var Clientdata = {
        wLogId: oLogId,
        wProductionId: prodId,
        //wLogDate: $('#txtDt').val(),
        MachineHpte: $('#txtMachHPET').val(),
        partWt: $('#txtPartWt').val(),
        sShift: $(CtrlIds.ddlShft).val(),
        CycleTime: $('#txtCycTim').val(),
        PerformAvg: $('#txtPer').val(),
        ProdKg: $('#txtProdKg').val(),
        Rejection: $('#txtRej').val(),
        Lumps: $(CtrlIds.txtLumps).val(),
        PetMaterial: $(CtrlIds.txtPetMat).val(),
        DownTime: $(CtrlIds.txtDowntm).val(),
        LogTime: $(CtrlIds.txtLogTim).val(),
        ColTDS: $(CtrlIds.txtTDS).val(),
        ColPH: $(CtrlIds.txtPH).val(),
        ColTemp: $(CtrlIds.txtTEMP).val(),
        Plant: $(CtrlIds.txtPLANT).val(),
        Temprature: $(CtrlIds.txtTempratr).val(),
        Humidity: $(CtrlIds.txtHumid).val(),
        sRemarks: $(CtrlIds.dvNotesText).val(),
        wShiftIncharge: $(CtrlIds.txtShftInchrg).val(),
        wManager: $(CtrlIds.txtManager).val()
    };

    $.ajax({
        type: "POST",
        url: "ProdLogSheet1.aspx/UpdateEntry",
        contentType: "application/json; charset=utf-8",
        data: "{'sData':'" + JSON.stringify(oProd) + "','sHandData':'" + JSON.stringify(frmData.oData) + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            notie.alert(1, 'Updated !', 2);
            $("#fldLogSheet")[0].style.display = "none";
            $("#dvhgt")[0].style.display = "";
            New();
            GetAllData();
            //BindData();
            //RedirectHome();
            //    HideWaitCursor();
        },
        error: function (result) {

            //   HideWaitCursor();
        }
    });
}

function EnableSave() {
    $("#btnSaveLog").removeAttr('disabled');
    $("#btnUpdate").attr('disabled', 'disabled');
    $("#btnDelete").attr('disabled', 'disabled');
    $("#btnNew").attr('disabled', 'disabled');

}

function DisableSave() {
    $("#btnSaveLog").attr('disabled', 'disabled');
    $("#btnUpdate").removeAttr('disabled');
    $("#btnDelete").removeAttr('disabled');
    $("#btnNew").removeAttr('disabled');

}

function Delete() {
    var oProd = $('#grdProdLog').jqGrid('getGridParam', 'data');
    var Clientdata = {
        wLogId: oLogId,
        wProductionId: prodId,
        //wLogDate: $('#txtDt').val(),
        MachineHpte: $('#txtMachHPET').val(),
        partWt: $('#txtPartWt').val(),
        sShift: $(CtrlIds.ddlShft).val(),
        CycleTime: $('#txtCycTim').val(),
        PerformAvg: $('#txtPer').val(),
        ProdKg: $('#txtProdKg').val(),
        Rejection: $('#txtRej').val(),
        Lumps: $(CtrlIds.txtLumps).val(),
        PetMaterial: $(CtrlIds.txtPetMat).val(),
        DownTime: $(CtrlIds.txtDowntm).val(),
        LogTime: $(CtrlIds.txtLogTim).val(),
        ColTDS: $(CtrlIds.txtTDS).val(),
        ColPH: $(CtrlIds.txtPH).val(),
        ColTemp: $(CtrlIds.txtTEMP).val(),
        Plant: $(CtrlIds.txtPLANT).val(),
        Temprature: $(CtrlIds.txtTempratr).val(),
        Humidity: $(CtrlIds.txtHumid).val(),
        sRemarks: $(CtrlIds.dvNotesText).val(),
        wShiftIncharge: $(CtrlIds.txtShftInchrg).val(),
        wManager: $(CtrlIds.txtManager).val()
    };
    GetDataAsync('ProdLogSheet1.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);      
        New();
        jQuery("#grdProdHand").jqGrid("clearGridData");
        GetAllData();
        //BindData();
    }, function () { }, "{'sData':'" + JSON.stringify(oProd) + "','sHandData':'" + JSON.stringify(frmData.oData) + "'}");
}