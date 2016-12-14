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
    public partial class MaterialPopUp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData(string sType)
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                List<object> oData = new List<object>();
                if (sType == "Raw")
                {
                    oData = dbContext.RawMaterials.Where(x => x.Status == 0).ToList<object>();
                }
                else if (sType == "Packing")
                {
                    oData = dbContext.PackingMaterials.Where(x => x.Status == 0).ToList<object>();
                }
                else if (sType == "Clrs")
                {
                    oData = dbContext.Colors.Where(x => x.Status == 0).ToList<object>();
                }
                else if (sType == "Others")
                {
                    oData = dbContext.MaterialOthers.Where(x => x.Status == 0).ToList<object>();
                }
                sReturn = JsonConvert.SerializeObject(oData);
            }
            return sReturn;
        }
    }
    public class GridPopUp
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Quantity { get; set; }
        public DateTime? TimeStamp { get; set; }
        public string BrandId { get; set; }
        public string Grade { get; set; }
        public string Weight { get; set; }
        public string BagNo { get; set; }
    }
}