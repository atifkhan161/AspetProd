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
    public partial class physDimRpt : System.Web.UI.Page
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
            PhysicalReport oEntry = JsonConvert.DeserializeObject<PhysicalReport>(sData);
            List<PDCavity> olstHdn = JsonConvert.DeserializeObject<List<PDCavity>>(sHandData);
            using (var dbContext = new aspet_devEntities())
            {
                oEntry.Date = DateTime.Now;
                dbContext.PhysicalReports.Add(oEntry);

                dbContext.SaveChanges();
                dbContext.Entry(oEntry).GetDatabaseValues();

                foreach (PDCavity ohdn in olstHdn)
                {
                    ohdn.wPhyDimId = oEntry.wPhyDimId;
                }

                dbContext.PDCavities.AddRange(olstHdn);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.PhysicalReports.OrderByDescending(obj => obj.Date).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData, string sHandData)
        {
            AspProdNet.Modals.PhysicalReport oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.PhysicalReport>(sData);
            List<PDCavity> olstHdn = JsonConvert.DeserializeObject<List<PDCavity>>(sHandData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                foreach (PDCavity oCav in olstHdn)
                {
                    dbContext.Entry(oCav).State = System.Data.Entity.EntityState.Modified;
                }
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData)
        {
            AspProdNet.Modals.PhysicalReport oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.PhysicalReport>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.PackingMaterials.Remove(dbContext.Entry(oEntry));
                dbContext.PDCavities.Where(obj => obj.wPhyDimId == oEntry.wPhyDimId).ToList().ForEach(olst =>
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
                oList.Add(dbContext.PhysicalReports.Where(obj => obj.wPhyDimId == id).SingleOrDefault());
                oList.Add(dbContext.PDCavities.Where(obj => obj.wPhyDimId == id).ToList());
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

    }
}