using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspProdNet.Modals;

namespace AspProdNet.views
{
    public partial class Report : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var dbContext = new aspet_devEntities())
            {
                List<Shift> olstStat = dbContext.Shifts.ToList();
                ddlShft.DataSource = olstStat;
                ddlShft.DataTextField = "sShift";
                ddlShft.DataValueField = "wShiftId";

                ddlShft.DataBind();
            }
        }
    }
}