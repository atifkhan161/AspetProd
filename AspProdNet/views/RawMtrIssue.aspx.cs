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
    public partial class RawMtrIssue : System.Web.UI.Page
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
                List<User> olstOperator = olstUser.Where(ouser => ouser.wRoleId <= 2 || ouser.wRoleId == 4).ToList();
                List<User> olstShiftIncharge = olstUser.Where(ouser => ouser.wRoleId <= 2 || ouser.wRoleId == 5).ToList();
                ddlOperator.DataSource = olstOperator;
                ddlOperator.DataTextField = "sUser";
                ddlOperator.DataValueField = "wUserId";

                ddlOperator.DataBind();

                ddlChecked.DataSource = olstUser;
                ddlChecked.DataTextField = "sUser";
                ddlChecked.DataValueField = "wUserId";

                ddlChecked.DataBind();

                ddlShiftIncharge.DataSource = olstShiftIncharge;
                ddlShiftIncharge.DataTextField = "sUser";
                ddlShiftIncharge.DataValueField = "wUserId";

                ddlShiftIncharge.DataBind();

                List<Shift> olstStat = dbContext.Shifts.ToList();
                ddlShift.DataSource = olstStat;
                ddlShift.DataTextField = "sShift";
                ddlShift.DataValueField = "wShiftId";

                ddlShift.DataBind();


            }
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData)
        {
            BagConsumption oEntry = JsonConvert.DeserializeObject<BagConsumption>(sData);
            string sType = oEntry.sType;
            using (var dbContext = new aspet_devEntities())
            {
                if (sType == "Raw")
                {
                    Modals.RawMaterial oData = dbContext.RawMaterials.Where(x => x.wMaterialId == oEntry.wMaterialId).SingleOrDefault();
                    oData.Status = 1;
                    dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                }
                else if (sType == "Packing")
                {
                    PackingMaterial oData = dbContext.PackingMaterials.Where(x => x.wPackingId == oEntry.wMaterialId).SingleOrDefault();
                    oData.Status = 1;
                    dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                }
                else if (sType == "Clrs")
                {
                    Modals.Color oData = dbContext.Colors.Where(x => x.wColorId == oEntry.wMaterialId).SingleOrDefault();
                    oData.Status = 1;
                    dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                }
                else if (sType == "Others")
                {
                    MaterialOther oData = dbContext.MaterialOthers.Where(x => x.wOtherId == oEntry.wMaterialId).SingleOrDefault();
                    oData.Status = 1;
                    dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                }
                oEntry.date = DateTime.Now;
                dbContext.BagConsumptions.Add(oEntry);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.BagConsumptions.OrderByDescending(obj => obj.date).ToList();
                //var oList = dbContext.BagConsumptions.Join(dbContext.Users, po => po.wShiftUserId, mo => mo.wUserId, (main, mo) => new { main, mo.sUser })
                //    .Join(dbContext.Shifts, sh => sh.main.wShift, shf => shf.wShiftId, (main1, shd) => new { main1,shd.sShift}).ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData)
        {
            AspProdNet.Modals.BagConsumption oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.BagConsumption>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData)
        {
            AspProdNet.Modals.BagConsumption oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.BagConsumption>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.PackingMaterials.Remove(dbContext.Entry(oEntry));
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
                var oList = dbContext.BagConsumptions.Where(obj => obj.wBagId == id).SingleOrDefault();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }
    }
}