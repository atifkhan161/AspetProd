<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="AspProdNet.Dashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Content/AppLeIcons.css" rel="stylesheet" />
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/bootstrap-dialog.css" rel="stylesheet" />
    <link href="Content/csshover.css" rel="stylesheet" />
    <style>
        body {
            background-color: honeydew;
        }

        nav > a > img {
            display: block;
            margin: 0 auto 5px auto;
        }

        nav > a {
            color: black;
            font-size: 14px;
            text-align: center;
            text-decoration: none;
        }

        nav img {
            height: 36px;
        }

        nav > a {
            padding: 7px 3px 5px 3px;
            margin: 0;
            display: inline-block;
            z-index: inherit;
            cursor: pointer;
            height: auto;
            width: 95px;
            -webkit-transition: background 100ms ease-in;
            -moz-transition: background 100ms ease-in;
            -o-transition: background 100ms ease-in;
            -ms-transition: background 100ms ease-in;
            transition: background 100ms ease-in;
        }

        legend {
            border-bottom: 1px solid darkgoldenrod;
        }

        #dvIcons > fieldset {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCont" class="">
            <div class="col-xs-12 headerCenter" style="border-bottom: 1px solid darkgoldenrod;">
                <div class="pull-left" style="background-color: #007196;">
                    <img src="Content/images/comp-logo.png" alt="Litigation Login" style="height: 60px;" />
                </div>
                <div class="pull-right">
                    <nav>
                        <a id="aInput" href="#fInput" class="hvr-float-shadow">
                            <img src="Content/images/TilesImg/truck29.png" />
                            Input
                        </a>
                        <a id="aProd" href="#fProd" class="hvr-float-shadow">
                            <img src="Content/images/TilesImg/factory.png" />
                            Production
                        </a><a id="afReports" href="#fReports" class="hvr-float-shadow" style="width:110px;">
                            <img src="Content/images/TilesImg/statistics2.png" />
                            Quality Check
                        </a>
                        <a id="afDemo" href="#fDemo" class="hvr-float-shadow">
                            <img src="Content/images/TilesImg/master.png" />
                            Master
                        </a>
                        <a id="aLogOut" onclick="window.location='AspetLogIn'" class="hvr-float-shadow">
                            <img src="Content/images/TilesImg/Logout.png" alt="Logout" />
                            Logout
                        </a>
                    </nav>
                </div>
            </div>
            <div id="dvIcons" class="iconsContainer">
                <div id="dvHeight" class="col-xs-12" style="overflow: auto">
                    <fieldset id="fInput" class="col-xs-12" style="margin-top: 0px;">
                        <legend>Input</legend>
                        <div class="icon__music col-xs-3 hvr-float-shadow" onclick="window.location='views/RawMaterial'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph " style="background-image: url('Content/images/TilesImg/worker5.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Raw Material Entry</div>
                            <div data-stacking-factor="1" class="icon__music--base  tileOrange">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <div class="icon__music col-xs-3" onclick="window.location='views/PackMaterial'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/delivery20.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Packing Material Entry</div>
                            <div data-stacking-factor="1" class="icon__music--base">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        
                        <div class="icon__music col-xs-3" onclick="window.location='views/Color'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/color-palette1.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Colors</div>
                            <div data-stacking-factor="1" class="icon__music--base titilePurple">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <div class="icon__music col-xs-3" onclick="window.location='views/Machinery'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/cashier1.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Machinery</div>
                            <div data-stacking-factor="1" class="icon__music--base tileCrim">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <div class="icon__music col-xs-3" onclick="window.location='views/OtherItems'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/washing11.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Other Items</div>
                            <div data-stacking-factor="1" class="icon__music--base tileGrey">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>                       
                    </fieldset>


                    <fieldset id="fProd" class="col-xs-12">
                        <legend>Production</legend>
                         <div class="icon__music col-xs-3" onclick="window.location='views/RawMtrIssue'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/worker8.png');"></div>

                            <div data-stacking-factor="0.4" class="icon__shows--text2">Raw Material Issue</div>
                            <div data-stacking-factor="1" class="icon__music--base tileGreen">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <%--<div class="icon__music col-xs-3" onclick="window.location='views/ProdHandSlip'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/newspaper11.png');"></div>

                            <div data-stacking-factor="0.4" class="icon__shows--text2">Production Handling Slip</div>
                            <div data-stacking-factor="1" class="icon__music--base tileBlue">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>--%>
                        <div class="icon__music col-xs-3" onclick="window.location='views/ResinMoistureRpt'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/moisturizing.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Moisture Analysis</div>
                            <div data-stacking-factor="1" class="icon__music--base tileGreen">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                         <div class="icon__music col-xs-3" onclick="window.location='views/ProdLogSheet1'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/log2.png');"></div>

                            <div data-stacking-factor="0.4" class="icon__shows--text2">Production Log Sheet</div>
                            <div data-stacking-factor="1" class="icon__music--base  tileSky">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <div class="icon__music col-xs-3" onclick="window.location='views/dailyQtyComplaintRpt'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/university1.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Daily Quality Complaint</div>
                            <div data-stacking-factor="1" class="icon__music--base tileOrange">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                       
                    </fieldset>
                    <fieldset id="fReports" class="col-xs-12">
                        <legend>Quality Check</legend>
                        <div class="icon__music col-xs-3" onclick="window.location='views/visualInspRpt'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/microscope4.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Visual Inspection Report</div>
                            <div data-stacking-factor="1" class="icon__music--base tileLGreen">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <div class="icon__music col-xs-3" onclick="window.location='views/physDimRpt'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/increase10.png');"></div>

                            <div data-stacking-factor="0.4" class="icon__shows--text2">Physical Dimension Report</div>
                            <div data-stacking-factor="1" class="icon__music--base tilePurple">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                        <div class="icon__music col-xs-3" onclick="window.location='views/dailyWeightRpt'">
                            <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/businessman58.png');"></div>
                            <div data-stacking-factor="0.4" class="icon__shows--text2">Daily Weight</div>
                            <div data-stacking-factor="1" class="icon__music--base  tileCrim">
                                <div data-stacking-factor="5" class="glow"></div>
                            </div>
                            <div data-stacking-factor="2" class="shadow"></div>
                        </div>
                    </fieldset>
                    <fieldset id="fDemo" class="col-xs-12">
                        <legend>Master</legend>
                        <div class="col-xs-12" style="margin-bottom: 20px;">
                            <div class="icon__music col-xs-3" onclick="window.location='views/stockRegister'">
                                <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/man337.png');"></div>
                                <div data-stacking-factor="0.4" class="icon__shows--text2">Stock Register</div>
                                <div data-stacking-factor="1" class="icon__music--base tileGrey">
                                    <div data-stacking-factor="5" class="glow"></div>
                                </div>
                                <div data-stacking-factor="2" class="shadow"></div>
                            </div>
                            <div class="icon__music col-xs-3" onclick="OpenWindow('Users','300px','views/users');">
                                <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/professional6.png');"></div>
                                <div data-stacking-factor="0.4" class="icon__shows--text2">Users</div>
                                <div data-stacking-factor="1" class="icon__music--base tileVoilet">
                                    <div data-stacking-factor="5" class="glow"></div>
                                </div>
                                <div data-stacking-factor="2" class="shadow"></div>
                            </div>
                            <div class="icon__music col-xs-3" onclick="OpenWindow('Material','300px','views/fMaterial');">
                                <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/downarrow16.png');"></div>
                                <div data-stacking-factor="0.4" class="icon__shows--text2">Material</div>
                                <div data-stacking-factor="1" class="icon__music--base tileOrange">
                                    <div data-stacking-factor="5" class="glow"></div>
                                </div>
                                <div data-stacking-factor="2" class="shadow"></div>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="icon__music col-xs-3" onclick="OpenWindow('Supplier','300px','views/fSupplier');">
                                <div data-stacking-factor="0.4" class="icon__music--glyph" style="background-image: url('Content/images/TilesImg/supp.png');"></div>
                                <div data-stacking-factor="0.4" class="icon__shows--text2">Supplier</div>
                                <div data-stacking-factor="1" class="icon__music--base tileGreen">
                                    <div data-stacking-factor="5" class="glow"></div>
                                </div>
                                <div data-stacking-factor="2" class="shadow"></div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </form>
    <script src="Scripts/jquery-1.10.2.min.js"></script>
    <script src="Scripts/ATicon.js"></script>
    <script src="Scripts/bootstrap.js"></script>
    <script src="Scripts/bootstrap-dialog.js"></script>
    <script src="Scripts/views/jCommon.js"></script>
    <script>
        (function () {
            'use strict';
            $("#dvHeight").height($(window).height() - 85);
            $.each($("#dvIcons").find(".icon__music"), function (id, icons) {
                $(icons).removeClass("col-xs-3");
                $(icons).addClass("hvr-float-shadow");
                $(icons).addClass("col-xs-10");
                $(icons).addClass("col-sm-3");
            });
            //ATicon.getInstance($('.icon__settings'));
            //ATicon.getInstance($('.icon__shows'));

        })();
    </script>
</body>

</html>
