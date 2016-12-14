<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainView.aspx.cs" Inherits="AspProdNet.MainView" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=1024,initial-scale=1.00, minimum-scale=1.00" />
    <title>Aspet</title>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet'
        type='text/css' />
    <link rel="stylesheet" type="text/css" href="../Dtop/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/css/nav.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/css/tiles.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/themes/theme_default/theme.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/accordion/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/lightbox/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/panels/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/plugintemplate/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/tileflip/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/tilefliptext/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/tileslide/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/tileslidefx/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/tileslideshow/plugin.css" />
    <link rel="stylesheet" type="text/css" href="../Dtop/plugins/tiletemplate/plugin.css" />
    <link href="Content/SlideStatusBar.css" rel="stylesheet" />

    <style type="text/css">
        html {
            background-color: #fff;
        }

        #bgImage {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -4;
            min-width: 115%;
            min-height: 100%;
            -webkit-transition: margin-left 450ms linear;
            -moz-transition: margin-left 450ms linear;
            -o-transition: margin-left 450ms;
            -ms-transition: margin-left 450ms;
            transition: margin-left 450ms;
        }

        .tile {
            -webkit-transition-property: box-shadow, margin-left, margin-top;
            -webkit-transition-duration: 0.25s, 0.5s, 0.5s;
            -moztransition-property: box-shadow, margin-left, margin-top;
            -moz-transition-duration: 0.25s, 0.5s, 0.5s;
            -o-transition-property: box-shadow, margin-left, margin-top;
            -o-transition-duration: 0.25s, 0.5s, 0.5s;
            -ms-transition-property: box-shadow, margin-left, margin-top;
            -ms-transition-duration: 0.25s, 0.5s, 0.5s;
            transition-property: box-shadow, margin-left, margin-top;
            transition-duration: 0.25s, 0.5s, 0.5s;
        }
    </style>
    <link href="Content/sweet-alert.css" rel="stylesheet" />
    <link href="Content/ns-window.css" rel="stylesheet" />
    <script src="Scripts/jquery-1.10.2.min.js"></script>
    <script src="Scripts/ns-window.js"></script>
    <script src="Scripts/sweet-alert.min.js"></script>
    <!-- ======== Code For Accordion Start here ========== -->
    <link href="Dtop/plugins/accordion/Accordion.css" rel="stylesheet" type="text/css" />
    <script src="Dtop/plugins/accordion/jquery.dimensions.js" type="text/javascript"></script>
    <script src="Dtop/plugins/accordion/jquery.accordion.js" type="text/javascript"></script>
    <script type="text/javascript">
        function SetDelay() {
            setTimeout("make()", 100);
        }
        function make() {
            jQuery('#list1a').accordion();
            setTimeout("make()", 200);
        }
    </script>
    <!-- ======== Code For Accordion End here ========== -->
    <script type="text/javascript" src="Dtop/js/html5.js"></script>
    <script type="text/javascript">        window.jQuery || document.write('<\/script><script type="text/javascript" src="js/jquery1102.js"><\/script>')</script>
    <script type="text/javascript" src="Dtop/js/plugins.js"></script>
    <script type="text/javascript">
        scale = 145;
        spacing = 10;
        stitle = "File|Litigation Data|Litigation Details|Litigation Edit|Log Out";
        theme = 'theme_default';
        $group.titles = stitle.split('|'); //["File", "Planbook", "Reports/Views", "Admin"]; // ["File", "Planbook", "Reports/Views", "Admin", "Payroll", "CapEX"];
        $group.spacingFull = [4, 4, 4, 4, 4, 4, 3];
        $group.inactive.opacity = "1";
        $group.inactive.clickable = "1";
        $group.showEffect = 0;
        $group.direction = "horizontal";

        mouseScroll = "groups";

        siteTitle = 'Litigation';
        siteTitleHome = 'Home';
        showSpeed = 400;
        hideSpeed = 300;
        scrollSpeed = 550;

        device = "desktop";
        scrollHeader = "1";
        disableGroupScrollingWhenVerticalScroll = "";

        /*For background image*/
        bgMaxScroll = "130";
        bgScrollSpeed = "450";

        /*For responsive */
        autoRearrangeTiles = "1";
        autoResizeTiles = "1";
        rearrangeTreshhold = 2;

        /*Locale */
        lang = "en";
        l_pageNotFound = "404 - Page not Found";
        l_pageNotFoundDesc = "<h2 class='margin-t-0'>404 - Page not Found</h2>We're sorry, the page you're looking for is not found.";
        l_menu = "Menu";
        l_goToFullSiteRedirect = "You'll be redirected to the full site";
        panelDim = '0'; hidePanelOnClick = '1'; panelGroupScrolling = '';
        function LogOut() {
            $(window).attr("location", "LogIn.aspx");
        }
    </script>
    <script type="text/javascript" src="Dtop/plugins/accordion/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/lightbox/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/panels/desktop.js"></script>
    <script type="text/javascript" src="Dtop/plugins/plugintemplate/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/tileflip/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/tilefliptext/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/tileslide/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/tileslidefx/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/tileslideshow/plugin.js"></script>
    <script type="text/javascript" src="Dtop/plugins/tiletemplate/plugin.js"></script>
    <script type="text/javascript" src="Dtop/js/functions.js"></script>
    <script type="text/javascript" src="Dtop/js/main.js"></script>
    <style type="text/css">
        .bodyImg {
            background-repeat: repeat;
        }

        #headerTitles > img {
            width: 70px;
        }

        #catchScroll {
            background: rgb(30,30,30);
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=00)';
            filter: alpha(opacity=00);
            -moz-opacity: 0;
            -khtml-opacity: 0;
            opacity: 0;
        }

        .image {
            position: relative;
        }

            .image .text {
                position: absolute;
                top: 10px;
                left: 10px;
                width: 300px;
            }

        #tileContainer {
            display: block;
        }
    </style>
</head>
<body class="full desktop">
    <form id="form1" runat="server">
        <div style="display: none;">
            <input type="button" id="btnDialogClose" onclick="javascript: return CloseMe(this);"
                style="visibility: hidden;" />
            <input type="button" id="btnDialogOpen" onclick="javascript: return OpenDialog(this);"
                style="visibility: hidden;" />
            <input type="button" id="btnLevelClose" onclick="javascript: return CloseMe(this);"
                style="visibility: hidden;" />
            <input type="button" id="btnAlert" onclick="javascript: return Salert(this);"
                style="visibility: hidden;" />
            <asp:HiddenField ID="hdnPageType" runat="server" Value="" />
        </div>
        <div style="width: 500px">
            <header>
                <div id="headerWrapper">
                    <div id="headerCenter">
                        <div id="headerTitles" onclick="javascript:location.reload();" style="height: 80px">
                            <img src="Content/images/company-logo_temp.png" alt="Litigation Login" />
                            <h2><i><b></b></i></h2>
                        </div>
                        <nav>
                            <a id="group0">
                                <img src="Dtop/img/Content/law.png" alt="File" />
                                Input
                            </a>
                            <a id="group1" style="width: 130px">
                                <img src="Dtop/img/Content/law1.png" alt="Reports/Views" />
                                Production
                            </a>
                           
                            <a id="group3" onclick="LogOut()">
                                <img src="Dtop/img/Content/Logout.png" alt="Admin" />
                                Log Out
                            </a>

                        </nav>
                    </div>
                </div>
            </header>
            <div id="wrapper">
                <div id="centerWrapper">
                    <div id="tileContainer">
                        <img id='arrowLeft' class="navArrows" src='Dtop/themes/theme_default/img/primary/arrowLeft.png'
                            onclick="javascript:$group.goLeft();" alt="left arrow" />
                        <img id='arrowRight' class="navArrows" src='Dtop/themes/theme_default/img/primary/arrowRight.png'
                            onclick="javascript:$group.goRight();" alt="right arrow" />
                        <a href="#&amp;home" id="groupTitle0" class="groupTitle" style="margin-left: 0px; margin-top: 0px"
                            onclick="javascript:$group.goTo(0);">
                            <h3>Input</h3>
                        </a><a href="#&amp;group-3" id="groupTitle2" class="groupTitle" style="margin-left: 620px; margin-top: 0px"
                            onclick="javascript:$group.goTo(2);">
                            <h3>Production</h3>
                        </a>

                        <!--- File tab Start -->
                        <a class="tile tileBlue group0 " id="URSetting" onclick="window.location='views/VehicleRegister'" style="margin-top: 45px; margin-left: 0px; width: 300px; height: 145px;"
                            data-pos='45-0-300'>
                            <div class='tileTitleTop' style='margin-left: 20px; z-index: 11;'>
                                Register Vehicle
                            </div>
                            <div class="BigIcon" style="margin-top: -5px;">
                                <img title='' alt='' src="Dtop/img/Content/settings.png" height="80" width="80" />
                            </div>
                        </a><a class="tile tileSky group0 " id="AboutPP" onclick="window.location='views/RawMaterial'" style="margin-top: 45px; margin-left: 310px; width: 145px; height: 145px;"
                            data-pos='45-310-145' data-n="0">
                            <div class="SmallIcon" style="margin-top: 25px;">
                                <img title='' alt='' src="Dtop/img/Content/aboutus.png" height="80" width="80" />
                            </div>
                            <div class='tileTitleBottom' style='margin-left: 10px;'>
                                Raw Material Entry
                            </div>
                        </a><a class="tile tileGreen group0 " id="PP_C1Logout" onclick="LogOut();" href="javascript:void(0);"
                            style="margin-top: 200px; margin-left: 0px; width: 300px; height: 145px;" data-pos='45-0-300'>
                            <div class="BigIcon" style="margin-top: 25px; margin-left: 100px;">
                                <img title='' alt='' src="Dtop/img/Content/Logout.png" height="80" width="80" />
                            </div>
                            <div class='tileTitleBottom' style='margin-left: 20px;'>
                                LogOut
                            </div>
                        </a>
                        <!--- File tab End -->


                        <!--- Add Details tab Sart -->
                        <a id="A1" class="tile tileLGreen group2 " onclick="window.location='views/ProdHandSlip'" style="margin-top: 45px; margin-left: 620px; width: 300px; height: 145px;"
                            data-pos='45-620-300'>
                            <div class="BigIcon" style="margin-top: 25px;">
                                <img title='' alt='' src="Dtop/img/Content/MyRequest.png" height="80" width="80" />
                            </div>
                            <div class='tileTitleBottom' style='margin-left: 10px; z-index: 11;'>
                                Production Handling Slip
                            </div>
                        </a><a class="tile tileGrey group2 " id="a2" onclick="OpenUrl(this);" href="javascript:void(0);"
                            style="margin-top: 45px; margin-left: 930px; width: 145px; height: 145px;" data-pos='45-930-145'>
                            <div class='tileTitleTop' style='margin-left: 10px; z-index: 11;'>
                                Production Log Sheet
                            </div>
                            <div class="SmallIcon">
                                <img title='' alt='' src="Dtop/img/Content/Allocation.png" height="80" width="80" />
                            </div>
                        </a><a class="tile tilePurple group2 " id="a3" onclick="window.location='views/visualInspRpt'" href="javascript:void(0);"
                            style="margin-top: 200px; margin-left: 620px; width: 145px; height: 145px;"
                            data-pos='200-620-145'>
                            <div class="SmallIcon" style="margin-top: 25px;">
                                <img title='' alt='' src="Dtop/img/Content/NewEmp.png" height="80" width="80" />
                            </div>
                            <div class='tileTitleBottom' style='margin-left: 10px; z-index: 11;'>
                                Visual Inspection Report
                            </div>
                        </a>
                        <a class="tile tileGreen group2 " id="A4" onclick="window.location='views/physDimRpt'" href="javascript:void(0);"
                            style="margin-top: 200px; margin-left: 775px; width: 145px; height: 145px;"
                            data-pos='200-2025-145'>
                            <div class='tileTitleTop' style='margin-left: 10px; z-index: 11;'>
                                Physical Dimension Report
                            </div>
                            <div class="SmallIcon" style="margin-top: 0px;">
                                <img title='' alt='' src="Dtop/img/Content/NewPos.png" height="80" width="80" />
                            </div>
                        </a>
                        <a class="tile tileCrim group2 " id="A5" onclick="window.location='views/dailyWeightRpt'" href="javascript:void(0);"
                            style="margin-top: 200px; margin-left: 930px; width: 145px; height: 145px;"
                            data-pos='200-930-145'>
                            <div class='tileTitleTop' style='margin-left: 10px; z-index: 11;'>
                                Daily Weight
                            </div>
                            <div class="SmallIcon" style="margin-top: 0px;">
                                <img title='' alt='' src="Dtop/img/Content/Process.png" height="80" width="80" />
                            </div>
                        </a><a class="tile tileSky group2 " id="a7" onclick="window.location='views/stockRegister'" href="javascript:void(0);"
                            style="margin-top: 355px; margin-left: 620px; width: 300px; height: 145px;"
                            data-pos='355-620-300'>
                            <div class="BigIcon" style="margin-top: 25px;">
                                <img title='' alt='' src="Dtop/img/Content/NewEmp.png" height="80" width="80" />
                            </div>
                            <div class='tileTitleBottom' style='margin-left: 10px; z-index: 11;'>
                                Stock Register
                            </div>
                        </a><%--<a class="tile tileOrange group2 " id="A8" onclick="OpenUrl(this);" href="javascript:void(0);"
                            style="margin-top: 355px; margin-left: 930px; width: 145px; height: 145px;"
                            data-pos='355-930-145'>
                            <div class='tileTitleTop' style='margin-left: 10px; z-index: 11;'>
                                Add Authorized Person
                            </div>
                            <div class="SmallIcon" style="margin-top: 0px;">
                                <img title='' alt='' src="Dtop/img/Content/Audit.png" height="80" width="80" />
                            </div>
                        </a>--%>
                        <asp:HiddenField ID="hdnAdminLevel" runat="server" Value="0" />
                        <asp:HiddenField ID="hdnPreff" runat="server" Value="false" />
                        <!--- Edit View tab End -->
                      
                    </div>
                    <div id="subNavWrapper">
                    </div>
                    <div id="contentWrapper">
                        <div id="content">
                        </div>
                    </div>
                </div>
                <footer>
                    Software own by ISS INDIA
                </footer>
            </div>
            <div id="catchScroll" class="bodyImg">
            </div>
            <div id='panel' style='width: 285px; max-width: 600px; right: -400px;'>
                <img id='panelArrow' src='Dtop/themes/theme_default/img/panels/arrow.png' onclick='javascript:hidePanel();'
                    alt='hide panel' />
                <img id='panelLoader' src='Dtop/themes/theme_default/img/panels/loader.gif' alt='Loading...' />
                <div id='panelContent' style="height: 50px;">
                </div>
            </div>
        </div>
    </form>
</body>
</html>
