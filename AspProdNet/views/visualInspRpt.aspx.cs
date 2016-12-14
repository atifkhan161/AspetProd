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
    public partial class visualInspRpt : System.Web.UI.Page
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
                List<User> olstUser = dbContext.Users.ToList();
                ddlInspected.DataSource = olstUser;
                ddlInspected.DataTextField = "sUser";
                ddlInspected.DataValueField = "wUserId";

                ddlInspected.DataBind();

                List<Shift> olstStat = dbContext.Shifts.ToList();
                ddlShiftIncharge.DataSource = olstStat;
                ddlShiftIncharge.DataTextField = "sShift";
                ddlShiftIncharge.DataValueField = "wShiftId";

                ddlShiftIncharge.DataBind();


            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData, string sHandData)
        {
            VisualReport oEntry = JsonConvert.DeserializeObject<VisualReport>(sData);
            List<VCavity> olstHdn = JsonConvert.DeserializeObject<List<VCavity>>(sHandData);
            using (var dbContext = new aspet_devEntities())
            {
                oEntry.Date = DateTime.Now;
                dbContext.VisualReports.Add(oEntry);

                dbContext.SaveChanges();
                dbContext.Entry(oEntry).GetDatabaseValues();

                foreach (VCavity ohdn in olstHdn)
                {
                    ohdn.wVisualId = oEntry.wVisualId;
                }

                dbContext.VCavities.AddRange(olstHdn);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.VisualReports.OrderByDescending(obj => obj.Date).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData, string sHandData)
        {
            AspProdNet.Modals.VisualReport oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.VisualReport>(sData);
            List<VCavity> olstHdn = JsonConvert.DeserializeObject<List<VCavity>>(sHandData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                foreach (VCavity oCav in olstHdn)
                {
                    dbContext.Entry(oCav).State = System.Data.Entity.EntityState.Modified;
                }
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData)
        {
            AspProdNet.Modals.VisualReport oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.VisualReport>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.PackingMaterials.Remove(dbContext.Entry(oEntry));
                dbContext.VCavities.Where(obj => obj.wVisualId == oEntry.wVisualId).ToList().ForEach(olst =>
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
                oList.Add(dbContext.VisualReports.Where(obj => obj.wVisualId == id).SingleOrDefault());
                oList.Add(dbContext.VCavities.Where(obj => obj.wVisualId == id).ToList());
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

    }
}