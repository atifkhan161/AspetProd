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
    public partial class RawMaterial : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                LoadObjects();
            }
        }

        private void LoadObjects()
        {
            using (var dbContext = new aspet_devEntities())
            {
                List<Material> olst = dbContext.Materials.ToList();
                ddlMaterial.DataSource = olst;
                ddlMaterial.DataTextField = "sMaterial";
                ddlMaterial.DataValueField = "wMaterial";

                ddlMaterial.DataBind();

                List<supplier> olstStat = dbContext.suppliers.ToList();
                ddlSuplier.DataSource = olstStat;
                ddlSuplier.DataTextField = "sSupplier";
                ddlSuplier.DataValueField = "wSupplierId";

                ddlSuplier.DataBind();


            }
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.trucks.OrderByDescending(obj => obj.wTruckId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData)
        {
            MaterialEntry oEntry = JsonConvert.DeserializeObject<MaterialEntry>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.MaterialEntries.Add(oEntry);
                dbContext.SaveChanges();
            }
        }
    }
}