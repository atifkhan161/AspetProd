using AspProdNet.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AspProdNet
{
    public partial class AspetLogIn : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           cDB.SetConString();
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string CheckUserLogin(string sUserName, string sPassWord)
        {
            string msg = "";
            using (var dbContext = new aspet_devEntities())
            {
                User oCurr = dbContext.Users.Where(oUser => oUser.sUser == sUserName).SingleOrDefault();
                if (oCurr == null || oCurr.sUser == null)
                    msg = "Invalid User name or Password";
                else if (oCurr.sPassword != sPassWord)
                    msg = "Invalid User name or Password";
                else if (oCurr.sPassword == sPassWord)
                    msg = "Done";
            }
            return msg;
        }

    }
}