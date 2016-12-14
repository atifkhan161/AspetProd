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
    public partial class users : System.Web.UI.Page
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
                List<UserRole> olstUser = dbContext.UserRoles.ToList();
                ddlOperator.DataSource = olstUser;
                ddlOperator.DataTextField = "sRole";
                ddlOperator.DataValueField = "wRoleId";

                ddlOperator.DataBind();
            }
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData)
        {
            User oEntry = JsonConvert.DeserializeObject<User>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                oEntry.timestamp = DateTime.Now;
                dbContext.Users.Add(oEntry);
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string LoadData()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                // var oList = dbContext.Users.Include(oInc => oInc.).OrderBy(oUsr=>oUsr.sUser).ToList();
                var List = from oUser in dbContext.Users
                           join roles in dbContext.UserRoles
                           on oUser.wRoleId equals roles.wRoleId
                           select new { oUser, roles };
                sReturn = JsonConvert.SerializeObject(List);
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
                var oList = dbContext.Users.Where(obj => obj.wUserId == id).SingleOrDefault();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void UpdateEntry(string sData)
        {
            AspProdNet.Modals.User oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.User>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                oEntry.timestamp = DateTime.Now;
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChanges();
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void DeleteEntry(string sData)
        {
            AspProdNet.Modals.User oEntry = JsonConvert.DeserializeObject<AspProdNet.Modals.User>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Entry(oEntry).State = System.Data.Entity.EntityState.Deleted;
                //  dbContext.RawMaterials.Remove(dbContext.Entry(oEntry));
                dbContext.SaveChanges();
            }
        }
    }
}