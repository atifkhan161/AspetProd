<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="barCode.aspx.cs" Inherits="AspProdNet.views.barCode" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />

    <style type="text/css">
        body {
            padding-top: 0px;
            padding-bottom: 0px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <input type="file" id="file" style="width: 280px; line-height: 18px; padding: 20px;" />
            <p id="isbn" style="font-family: Helvetica, sans-serif; width: 320px; line-height: 18px; padding: 0; text-align: center;">
                Please select a sharp photo of a barcode above
           
            </p>
            <canvas id="canvas" width="2000" height="1500" style="width: 320px; height: 240px;"></canvas>


        </div>
        <input type="button" class="btn btn-info" value="Select No" onclick="Decode()" />
    </form>
    <script src="../Scripts/jquery-1.10.2.min.js"></script>
    <script src="../Scripts/plugins/barcode.js"></script>
    <script src="../Scripts/views/jCommon.js"></script>
    <script>
        $(document).ready(function () {

        });
        try {

            document.getElementById('file').onchange = function () {

                document.getElementById('isbn').innerHTML = 'Processing…';

                var image = new Image();

                image.onload = function () {

                    var canvas = document.getElementById('canvas');
                    var width = canvas.width;
                    var height = canvas.height;

                    var context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, width, height);

                    var barcode = new Barcode(context, width, height);
                    var line = barcode.scan();

                    if (line) {

                        document.getElementById('isbn').innerHTML = line.isbn;
                        barcode.print(line);

                    } else {
                        document.getElementById('isbn').innerHTML = 'Sorry, could not find barcode… please try again';
                    }
                };

                image.src = window.webkitURL.createObjectURL(this.files[0]);
            };

        } catch (e) {
            alert(e);
        }

        function Decode() {
            if ($("#isbn").html() != "Sorry, could not find barcode… please try again") {
                $(parent.window)[0].frmData.oData.BagNo = $("#isbn").html();
                $(parent.window)[0].oDialog.close();
            }
            else
                alert('Not a valid Bag No');

        }

    </script>
</body>
</html>
