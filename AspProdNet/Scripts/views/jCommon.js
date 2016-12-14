/*==========================LocalStorage Start ==========================*/
function SetLocalStorage(sKey, sValue) {
    if (typeof (localStorage) == 'undefined') { }
    else {
        RemoveLocalStorageItem(sKey);
        localStorage.setItem(sKey, sValue);
    }
}
function GetLocalStorage(sKey) {
    return localStorage.getItem(sKey);
}
function RemoveLocalStorageItem(sKey) {
    localStorage.removeItem(sKey);
}
function ClearLocalStorage(sKey) {
    localStorage.clear();
}
/*==========================LocalStorage End ==========================*/

var oDialog;
function OpenWindow(ptitle, height, sUrl) {
    oDialog = BootstrapDialog.show({
        title: ptitle,
        size: BootstrapDialog.SIZE_WIDE,
        closable: true,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: function (dialog) {
            //  var Iframe = '<iframe id="iHold" runat="server" style="border: none;" src="'+ sUrl +'"></iframe>';
            var iHold = $('<iframe  id="iHold" runat="server" style="border: none;width:100%;height:' + height + ';" src="' + sUrl + '"></iframe>');

            return iHold;
        }
    });
}

function RedirectHome() {
    $(window).attr("location", "../Dashboard.aspx");
}

//Common Methods
function GetDataAsync(url, successfunction, errorFunction, odata) {
    ShowWaitCursor();
    var targetUrl = url;
    $.ajax({
        'url': targetUrl,
        'type': 'POST',
        data: odata,
        contentType: "application/json; charset=utf-8",
        'dataType': 'json',
        'success': function (resp) {
            HideWaitCursor();
            successfunction(resp);
        },
        'error': function () {
            notie.alert(3, "error" + targetUrl, 2);
            errorFunction();
            HideWaitCursor();
        }
    });
}

/*========================Wait Cursor===================================*/
function ShowWaitCursor() {
    //var w = $('.PPBody', this.window.document);
    //$('.waitCursor', this.window.document).remove();
    //w.append('<div class="waitCursor" align="center"></div>');

    $(".splinLoader").show();
}
function HideWaitCursor() {
    //$('.waitCursor', this.window.document).remove();
    $(".splinLoader").fadeOut("slow");
}
/*========================End Wait Cursor===============================*/