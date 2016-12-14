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
    public partial class dailyWeightRpt : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                LoadObjects();
            }
        }
        private void LoadObjects()
        {
            using (var dbContext = new aspet_devEntities())
            {
                List<User> olstStat = dbContext.Users.Where(ouser => ouser.wRoleId <= 2 || ouser.wRoleId == 5).ToList();
                ddlShiftIncharge.DataSource = olstStat;
                ddlShiftIncharge.DataTextField = "sUser";
                ddlShiftIncharge.DataValueField = "wUserId";

                ddlShiftIncharge.DataBind();

                ddlShiftInchargeB.DataSource = olstStat;
                ddlShiftInchargeB.DataTextField = "sUser";
                ddlShiftInchargeB.DataValueField = "wUserId";

                ddlShiftInchargeB.DataBind();

                ddlShiftInchargeC.DataSource = olstStat;
                ddlShiftInchargeC.DataTextField = "sUser";
                ddlShiftInchargeC.DataValueField = "wUserId";

                ddlShiftInchargeC.DataBind();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData, string sHandData)
        {
            DailyWeight oEntry = JsonConvert.DeserializeObject<DailyWeight>(sData);
            List<DWCavity> olstHdn = JsonConvert.DeserializeObject<List<DWCavity>>(sHandData);
            using (var dbContext = new aspet_devEntities())
            {
                oEntry.Date = DateTime.Now;
                dbContext.DailyWeights.Add(oEntry);

                dbContext.SaveChanges();
                dbContext.Entry(oEntry).GetDatabaseValues();

                foreach (DWCavity ohdn in olstHdn)
                {
                    ohdn.wDWId = oEntry.wDWId;
                }

                dbContext.DWCavities.AddRange(olstHdn);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.DailyWeights.OrderByDescending(obj => obj.Date).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData, string sHandData)
        {
            AspProdNet.Modals.DailyWeight oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.DailyWeight>(sData);
            List<DWCavity> olstHdn = JsonConvert.DeserializeObject<List<DWCavity>>(sHandData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                foreach (DWCavity oCav in olstHdn)
                {
                    dbContext.Entry(oCav).State = System.Data.Entity.EntityState.Modified;
                }
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData)
        {
            AspProdNet.Modals.DailyWeight oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.DailyWeight>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.PackingMaterials.Remove(dbContext.Entry(oEntry));
                dbContext.PDCavities.Where(obj => obj.wPhyDimId == oEntry.wDWId).ToList().ForEach(olst =>
                {
                    dbContext.Entry(olst).State = System.Data.Entity.EntityState.Deleted;
                });
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadSingleData(string sId)
        {
            string sReturn = "";
            int id = Convert.ToInt16(sId);
            using (var dbContext = new aspet_devEntities())
            {
                List<object> oList = new List<object>();
                oList.Add(dbContext.DailyWeights.Where(obj => obj.wDWId == id).SingleOrDefault());
                oList.Add(dbContext.DWCavities.Where(obj => obj.wDWId == id).ToList());
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

    }
}