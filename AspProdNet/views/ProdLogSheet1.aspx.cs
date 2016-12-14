using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspProdNet.Modals;
using Newtonsoft.Json;

namespace AspProdNet.views
{
    public partial class ProdLogSheet1 : System.Web.UI.Page
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
                ddlShft.DataSource = olstStat;
                ddlShft.DataTextField = "sShift";
                ddlShft.DataValueField = "wShiftId";

                ddlShft.DataBind();

                List<User> olstUser = dbContext.Users.ToList();
                txtShftInchrg.DataSource = olstUser;
                txtShftInchrg.DataTextField = "sUser";
                txtShftInchrg.DataValueField = "wUserId";

                txtShftInchrg.DataBind();

                txtManager.DataSource = olstUser;
                txtManager.DataTextField = "sUser";
                txtManager.DataValueField = "wUserId";

                txtManager.DataBind();
            }
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.ProdLogs.ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadLogData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.LogSheets.ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData, string sHandData)
        {
            //LogSheet oEntry = JsonConvert.DeserializeObject<LogSheet>(sData);
            List<LogSheet> oEntry = JsonConvert.DeserializeObject<List<LogSheet>>(sData);
            ProdLog olstHdn = JsonConvert.DeserializeObject<ProdLog>(sHandData);
            //List<ProdLog> olstHdn = JsonConvert.DeserializeObject<List<ProdLog>>(sHandData);
            using (var dbContext = new aspet_devEntities())
            {
                olstHdn.wLogDate = DateTime.Now;
                olstHdn.DownTime = DateTime.Now;
                olstHdn.LogTime = DateTime.Now;
                dbContext.ProdLogs.Add(olstHdn);
                dbContext.SaveChanges();
                dbContext.Entry(olstHdn).GetDatabaseValues();

                foreach (LogSheet ohdn in oEntry)
                {
                    ohdn.wLogId = olstHdn.wLogId;
                    ohdn.Time = DateTime.Now;
                }
                dbContext.LogSheets.AddRange(oEntry);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData, string sHandData)
        {
            List<LogSheet> oEntry = JsonConvert.DeserializeObject<List<LogSheet>>(sData);
            ProdLog olstHdn = JsonConvert.DeserializeObject<ProdLog>(sHandData);
            //List<ProdLog> olstHdn = JsonConvert.DeserializeObject<List<ProdLog>>(sHandData);
            using (var dbContext = new aspet_devEntities())
            {
                //dbContext.LogSheets.Add(oEntry);
                foreach (LogSheet ohdn in oEntry)
                {
                    ohdn.Time = DateTime.Now;
                    dbContext.Entry(ohdn).State = System.Data.Entity.EntityState.Modified;
                }

                //dbContext.ProdLogs.Add(olstHdn);
                olstHdn.wLogDate = DateTime.Now;
                olstHdn.DownTime = DateTime.Now;
                olstHdn.LogTime = DateTime.Now;
                dbContext.Entry(olstHdn).State = System.Data.Entity.EntityState.Modified;

                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData, string sHandData)
        {
            List<LogSheet> oEntry = JsonConvert.DeserializeObject<List<LogSheet>>(sData);
            ProdLog olstHdn = JsonConvert.DeserializeObject<ProdLog>(sHandData);

            using (var dbContext = new aspet_devEntities())
            {
                foreach (LogSheet ohdn in oEntry)
                {
                    dbContext.Entry(ohdn).State = System.Data.Entity.EntityState.Deleted;
                }
                dbContext.Entry(olstHdn).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.RawMaterials.Remove(dbContext.Entry(oEntry));
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
                var oList = dbContext.ProdLogs.Where(obj => obj.wLogId == id).ToList();
                if (oList.Count > 0)
                {
                    //int iLogId = Convert.ToInt16(oList[oList.Count - 1].wLogId);
                    var oLogData = dbContext.LogSheets.Where(obj => obj.wLogId == id).ToList();
                    sReturn = JsonConvert.SerializeObject(new
                    {
                        oProdLogList = oList[oList.Count - 1],
                        oLogList = oLogData
                    });
                }
                //else
                //    sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

    }
}