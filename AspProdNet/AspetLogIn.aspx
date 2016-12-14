<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AspetLogIn.aspx.cs" Inherits="AspProdNet.AspetLogIn" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <title></title>
    <style>
        body {
            background-color: #f2f2f2;
        }

        h1 {
            margin-top: 2px;
            margin-bottom: 5px;
            color: #007196;
        }

        h5 {
            color: #9498a1;
            font-size: 0.625em;
        }

        .modal-footer, .modal-body {
            border-top: 0px solid #e5e5e5;
        }

        .modal-header {
            border-bottom: 0px solid #e5e5e5;
        }

        #spinner {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url(../Content/images/486.GIF) center no-repeat #fff;
            opacity: 1;
        }
    </style>
</head>
<body background="Content/images/bg_ds.jpg">
    <div id="spinner" class="splinLoader"></div>
    <div id="loginModal" class="modal show" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="Content/images/login-icon.png" class="pull-left" />
                    <div class="pull-left">
                        <h1>Login to Aspet Thechnoplast</h1>
                        <h5>Enter your credentials below</h5>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form col-md-12 center-block">
                        <div class="form-group">
                            <input type="text" id="login-username" class="form-control input-lg" placeholder="User Name" />
                        </div>
                        <div class="form-group">
                            <input type="password" id="login-password" class="form-control input-lg" placeholder="Password" onkeypress="return submitenter(this,event)" />
                        </div>
                        <div class="form-group">
                            <select id="ddlEnv" class="form-control">
                                <option value="prod">Production</option>
                                <option value="maint">Maintenance</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-primary btn-lg btn-block" onclick="CheckUserLogin();" value="Log In" />
                            <%--  <span class="pull-right"><a href="#">Register</a></span><span><a href="#">Need help?</a></span>--%>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <script src="Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript">
        function submitenter(myfield, e) {
            var keycode;
            if (window.event)
                keycode = window.event.keyCode;
            else if (e) keycode = e.which;
            else return true;
            if (keycode == 13) {
                CheckUserLogin();
                return false;
            }
            else return true;
        }
        function CheckUserLogin() {
            if (validate()) {
                $(".splinLoader").show();
                $.ajax({
                    type: "POST",
                    url: "AspetLogIn.aspx/CheckUserLogin",
                    data: "{sUserName :'" + $("#login-username").val() + "',sPassWord :'" + $("#login-password").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        // Replace the div's content with the page method's return.
                        //                          alert(msg.d);
                        if (msg.d == "Done") {
                            redirectToDashBoard();
                        }
                        else {
                            alert(msg.d);
                            $(".splinLoader").fadeOut("slow");
                        }
                    },
                    error: function (result) {
                        //                          $(window).attr("location", "DefaultMIS.aspx");                
                        $(".splinLoader").fadeOut("slow");
                    }
                });
            }
            //  $(window).attr("location", "Dashboard.aspx");

        }
        function redirectToDashBoard() {
            if ($('#ddlEnv').val() == "prod") {
                $(window).attr("location", "Dashboard.aspx");
            }
            else if ($('#ddlEnv').val() == "maint") {
                $(window).attr("location", "app/index.html");
            }
        }
        function validate() {
            if ($("#login-username").val() == "") {
                alert('Please enter User Name!');
                return false;
            }
            if ($("#login-password").val() == "") {
                alert('Please enter Password!');
                return false;
            }

            return true;
        }

        function ForgetPass() {
            $.ajax({
                type: "POST",
                url: "LogIn.aspx/SendPass",
                data: "{sUserName :'" + $("#login-username").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    // Replace the div's content with the page method's return.
                    //                          alert(msg.d);
                    if (msg.d == null) {
                        //                          $(window).attr("location", "DefaultMIS.aspx");
                        alert('Check your mail for Authentication details.');
                    }
                    else {
                        //                          alert(msg.d);
                        alert('Check your mail for Authentication details.');

                    }
                },
                error: function (result) {
                    //                          $(window).attr("location", "DefaultMIS.aspx");                
                    $(".splinLoader").fadeOut("slow");
                }
            });
        }
        function EnterEvent(e) {
            if (e.keyCode == 13) {
                CheckUserLogin();
            }
        }
        $(window).load(function () {
            $(".splinLoader").fadeOut("slow");
        });
    </script>
</body>
</html>
