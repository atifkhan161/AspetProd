using AspProdNet.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace AspProdNet.views
{
    public partial class VehicleRegister : System.Web.UI.Page
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
                List<User> olst = dbContext.Users.Where(ouser => ouser.wRoleId <= 3 || ouser.wRoleId == 3).ToList();
                ddlSupervisor.DataSource = olst;
                ddlSupervisor.DataTextField = "sUser";
                ddlSupervisor.DataValueField = "wUserId";

                ddlSupervisor.DataBind();

                List<station> olstStat = dbContext.stations.ToList();
                ddlStation.DataSource = olstStat;
                ddlStation.DataTextField = "sStation";
                ddlStation.DataValueField = "wStationId";

                ddlStation.DataBind();

                
            }
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static void SaveTruck(string sData)
        {
            truck otruck = JsonConvert.DeserializeObject<truck>(sData);

            using (var dbContext = new aspet_devEntities())
            {
                dbContext.trucks.Add(otruck);
                dbContext.SaveChanges();
            }
        }
    }
}