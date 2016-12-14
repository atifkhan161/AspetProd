using AspProdNet.Modals;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AspProdNet.views
{
    public partial class stockRegister1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadRawData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.RawMaterials.OrderByDescending(obj => obj.wMaterialId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadPackData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.PackingMaterials.OrderByDescending(obj => obj.wPackingId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadClrsData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.Colors.OrderByDescending(obj => obj.wColorId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadMchData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.Machineries.OrderByDescending(obj => obj.wMachineryId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadOthrsData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.MaterialOthers.OrderByDescending(obj => obj.wOtherId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }
    }
}