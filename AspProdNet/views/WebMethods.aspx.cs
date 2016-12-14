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
    public partial class WebMethods : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string GetBrands()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                var oList = dbContext.Brands.ToList();
                sReturn = JsonConvert.SerializeObject(oList);
            }
            return sReturn;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string SaveBrands(string sBrand)
        {
            string sReturn = "";

            using (var dbContext = new aspet_devEntities())
            {
                Brand oBrand = new Brand();
                oBrand.Name = sBrand;
                dbContext.Brands.Add(oBrand);
                dbContext.SaveChanges();
                dbContext.Entry(oBrand).GetDatabaseValues();
                sReturn = oBrand.wBrandId.ToString();
            }
            return sReturn;
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string GetSupplier()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                List<supplier> olstStat = dbContext.suppliers.ToList();
                sReturn = JsonConvert.SerializeObject(olstStat);
            }
            return sReturn;
        }


        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string SaveSupplier(string sBrand)
        {
            string sReturn = "";

            using (var dbContext = new aspet_devEntities())
            {
                supplier oBrand = new supplier();
                oBrand.sSupplier = sBrand;
                dbContext.suppliers.Add(oBrand);
                dbContext.SaveChanges();
                dbContext.Entry(oBrand).GetDatabaseValues();
                sReturn = oBrand.wSupplierId.ToString();
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string GetAllUser()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                List<User> olstStat = dbContext.Users.ToList();
                sReturn = JsonConvert.SerializeObject(olstStat);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string GetSupervisors()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                List<User> olst = dbContext.Users.Where(ouser => ouser.wRoleId <= 3 || ouser.wRoleId == 3).ToList();
                sReturn = JsonConvert.SerializeObject(olst);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string GetOperators()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                List<User> olstOperator = dbContext.Users.Where(ouser => ouser.wRoleId <= 2 || ouser.wRoleId == 4).ToList();
                sReturn = JsonConvert.SerializeObject(olstOperator);
            }
            return sReturn;
        }

        [System.Web.Services.WebMethod(EnableSession = true)]
        public static string GetShiftIncharges()
        {
            string sReturn = "";
            using (var dbContext = new aspet_devEntities())
            {
                List<User> olstShiftIncharge = dbContext.Users.Where(ouser => ouser.wRoleId <= 2 || ouser.wRoleId == 5).ToList();
                sReturn = JsonConvert.SerializeObject(olstShiftIncharge);
            }
            return sReturn;
        }
    }
}