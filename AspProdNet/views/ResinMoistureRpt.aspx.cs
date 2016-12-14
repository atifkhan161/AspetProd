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
    public partial class ResinMoistureRpt : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData)
        {
            AspProdNet.Modals.ResinMoistrRpt oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.ResinMoistrRpt>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                oEntry.wDateTime = DateTime.Now;
                oEntry.Status = 0;
                dbContext.ResinMoistrRpts.Add(oEntry);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.ResinMoistrRpts.OrderByDescending(obj => obj.wRsinRptId).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadSingleData(string sId)
        {
            string sReturn = "";
            int id = Convert.ToInt16(sId);
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.ResinMoistrRpts.Where(obj => obj.wRsinRptId == id).SingleOrDefault();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData)
        {
            AspProdNet.Modals.ResinMoistrRpt oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.ResinMoistrRpt>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                oEntry.wDateTime = DateTime.Now;
                oEntry.Status = 0;
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData)
        {
            AspProdNet.Modals.ResinMoistrRpt oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.ResinMoistrRpt>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.RawMaterials.Remove(dbContext.Entry(oEntry));
                dbContext.SaveChanges();
            }
        }
    }
}