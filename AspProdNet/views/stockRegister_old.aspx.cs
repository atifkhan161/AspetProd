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
    public partial class stockRegister : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData)
        {
            Stock oEntry = JsonConvert.DeserializeObject<Stock>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Stocks.Add(oEntry);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.Stocks.OrderByDescending(obj => obj.Date).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }


    }
}