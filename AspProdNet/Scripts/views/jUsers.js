var frmData;
frmData = Bind({
    oData: GetNewData()
},
        {
            'oData.wUserId': '#spnUserId',
            'oData.sUser': '#txtUser',
            'oData.sPassword': '#txtpass',
            'oData.wRoleId': '.ddlUser',
            'oData.sEmail': '#txtEmail',
            'oData.Contact': '#txtCntc',
            'oData.sNotes': '#txtRemarks'
        });


function GetNewData() {
    return {
        wUserId: -1,
        sUser: "",
        sPassword: "",
        wRoleId: "",
        sEmail: "",
        Contact: "",
        sNotes: "",
    };
}
var oValidator;
$(document).ready(function () {
    var oFrm = $('.frmMaster').validator();
    oValidator = oFrm.data('bs.validator');
    BindData();
});


function BindData() {
    $("#grdUser").jqGrid({
        datatype: "local",
        colNames: ['wUserId', 'User', 'Role', 'Email', 'Contact', 'Notes'],
        colModel: [
            { name: 'oUser.wUserId', index: 'oUser.wUserId', hidden: true },
            { name: 'oUser.sUser', index: 'oUser.sUser' },
            { name: 'roles.sRole', index: 'roles.sRole' },
            { name: 'oUser.sEmail', index: 'oUser.sEmail' },
            { name: 'oUser.Contact', index: 'oUser.Contact' },
            { name: 'oUser.sNotes', index: 'oUser.sNotes' }

        ],
        multiselect: false,
        rowNum: 10,
        rowList: [5, 10, 20, 50, 100],
        pager: $('#pager'),
        sortorder: "desc",
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        //height: 340,
        //width: 500,
        caption: "Users",
        beforeRequest: function () {
            setTimeout(function () {

                $("#grdUser").jqGrid('setGridWidth', $("#dvhgt").width(), true);
                $("#grdUser").jqGrid('setGridHeight', 200, true);
            });
        },
        ondblClickRow: function (rowId) {
            var rowData = jQuery(this).getRowData(rowId);
            UpdateEntry(rowData);
        }
    });
    $("#grdUser").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

    LoadData();
}


function LoadData() {
    $.ajax({
        type: "POST",
        url: "users.aspx/LoadData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != null) {
                jQuery("#grdUser").jqGrid('setGridParam',
       {
           datatype: 'local',
           data: JSON.parse(msg.d)
       }).trigger("reloadGrid");
            }
        }
    });
}
//wUserId
//sUser
//sPassword
//wRoleId
//timestamp
//sEmail
//sNotes
function SaveUser() {
    var oUser = {
        wUserId: -1,
        //  wMaterialId: -1,
        sUser: $('#txtUser').val(),
        sPassword: $('#txtpass').val(),
        wRoleId: $(CtrlIds.ddlUser).val(),
        sEmail: $('#txtEmail').val(),
        Contact: $('#txtCntc').val(),
        sNotes: $('#txtRemarks').val()
    }

    $.ajax({
        type: "POST",
        url: "users.aspx/SaveEntry",
        contentType: "application/json; charset=utf-8",
        data: "{'sData':'" + JSON.stringify(oUser) + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            alert("saved");
            LoadData();
            cLearFeilds();
            //    HideWaitCursor();
        },
        error: function (result) {

            //   HideWaitCursor();
        }
    });
}
function cLearFeilds() {
    $('#txtUser').val("");
    // $('#txtdate').val("");
    $('#txtpass').val("");
    $('#txtEmail').val("");
    $('#txtCntc').val("");
}

function UpdateEntry(oRow) {
    New();
    ShowWaitCursor();
    GetDataAsync('users.aspx/LoadSingleData', function (response) {
        frmData.oData = JSON.parse(response.d);

        DisableSave();

        HideWaitCursor();
    }, function () { HideWaitCursor(); }, "{'sId' :'" + oRow["oUser.wUserId"] + "'}"
);
}

function EnableSave() {
    $("#btnSave").removeAttr('disabled');
    $("#btnUpdate").attr('disabled', 'disabled');
    $("#btnDelete").attr('disabled', 'disabled');
    $("#btnNew").attr('disabled', 'disabled');

}

function DisableSave() {
    $("#btnSave").attr('disabled', 'disabled');
    $("#btnUpdate").removeAttr('disabled');
    $("#btnDelete").removeAttr('disabled');
    $("#btnNew").removeAttr('disabled');

}

function New() {
    frmData.oData = GetNewData();
    EnableSave();
}

function Save() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        GetDataAsync('users.aspx/SaveEntry', function (response) {
            notie.alert(1, 'Saved !', 2);
            New();
            LoadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}


function Update() {
    oValidator.validate();
    if (!oValidator.hasErrors()) {
        GetDataAsync('users.aspx/UpdateEntry', function (response) {
            notie.alert(4, 'Updated !', 2);
            New();
            LoadData();
        }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
    }
}

function Delete() {
    GetDataAsync('users.aspx/DeleteEntry', function (response) {
        notie.alert(1, 'Deleted !', 2);
        //GetAllData();
        New();
        jQuery("#grdUser").jqGrid("clearGridData");
        LoadData();
    }, function () { }, "{'sData':'" + JSON.stringify(frmData.oData) + "'}");
}