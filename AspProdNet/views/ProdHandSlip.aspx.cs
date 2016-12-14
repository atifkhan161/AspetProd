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
    public partial class ProdHandSlip : System.Web.UI.Page
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
                ddlChkd.DataSource = olstUser;
                ddlChkd.DataTextField = "sUser";
                ddlChkd.DataValueField = "wUserId";

                ddlChkd.DataBind();

                ddlprep.DataSource = olstUser;
                ddlprep.DataTextField = "sUser";
                ddlprep.DataValueField = "wUserId";

                ddlprep.DataBind();

            }
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveEntry(string sData, string sHandData)
        {
            Production oEntry = JsonConvert.DeserializeObject<Production>(sData);
            List<ProdHandling> olstHdn = JsonConvert.DeserializeObject < List<ProdHandling>>(sHandData);
            using (var dbContext = new aspet_devEntities())
            {
                dbContext.Productions.Add(oEntry);

                dbContext.SaveChanges();
                dbContext.Entry(oEntry).GetDatabaseValues();

                foreach (ProdHandling ohdn in olstHdn)
                {
                    ohdn.wProductionId = oEntry.wProductionId;
                }

                dbContext.ProdHandlings.AddRange(olstHdn);
                dbContext.SaveChanges();
            }
        }

    }
}