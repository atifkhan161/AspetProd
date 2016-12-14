using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Web;

namespace AspProdNet.Modals
{
    public static class cDB
    {
        public static string ConString { get; set; }
        public static void SetConString()
        {
            DBConnectioin oDbConn = new DBConnectioin();
            ConString = oDbConn.GetConString();

            var Orig = System.Configuration.ConfigurationManager.ConnectionStrings["AspetProdEntities"].ConnectionString;
            var ecs = new EntityConnectionStringBuilder(Orig);
            ecs.ProviderConnectionString = ConString;
            ConString = ecs.ToString();
         //   return bValidLogin;
        }
    }

    public class DBBase
    {
        public string hostName = null;
        public string baseName = null;
        public string loginName = null;
        public string passWord = null;

        public DBBase()
        {
        }
    }

    public class DBConnectioin : DBBase
    {
        private INI ini;
        public static string conStr = null;


        #region Property
        public string DBhostName
        {
            get { return this.hostName; }
        }

        public string DBbaseName
        {
            get { return this.baseName; }
        }
        public string DBloginName
        {
            get { return this.loginName; }
        }
        public string DBpassWord
        {
            get { return this.passWord; }
        }

        #endregion

        public DBConnectioin()
        {
            ini = new INI();
        }

        private void Read()
        {
            ini.GetPara();
            this.hostName = ini.hostName;
            this.baseName = ini.baseName;
            this.loginName = ini.loginName;
            this.passWord = ini.passWord;
        }


        public void Write()
        {
            ini.hostName = this.hostName;
            ini.baseName = this.baseName;
            ini.loginName = this.loginName;
            ini.passWord = this.passWord;
            ini.SetPara();
        }
        public string GetConString()
        {
            this.Read();
            conStr = "data source=" + this.hostName + ";initial catalog=" + this.baseName + ";user id=" + this.loginName + ";password=" + this.passWord;
            conStr += ";MultipleActiveResultSets=True;App=EntityFramework";
            return conStr;
        }
    }

    public class INI : DBBase
    {
        protected string path = null;
        protected string fileName = "Config.ini";

        [DllImport("kernel32")]
        private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);
        [DllImport("kernel32")]
        private static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retVal, int size, string filePath);

        public INI()
        {
            this.path = HttpContext.Current.Server.MapPath("") + "\\BIN\\";
            //this.path = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath;
            //string p3 = HttpContext.Current.Server.MapPath("");
            //p3=p3.Replace("\\",);

        }

        private bool Write(string section, string key, string value)
        {
            try
            {
                WritePrivateProfileString(section, key, value, this.path + this.fileName);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private string Read(string section, string key)
        {
            StringBuilder temp = new StringBuilder(255);
            int i = GetPrivateProfileString(section, key, "", temp, 255, this.path + this.fileName);
            return temp.ToString();
        }

        public void GetPara()
        {
            this.hostName = Read("Info", "HostName");
            this.baseName = Read("Info", "baseName");
            this.loginName = Read("Info", "LoginName");
            this.passWord = Read("Info", "PassWord");
        }

        public void SetPara()
        {
            Write("Info", "HostName", this.hostName);
            Write("Info", "baseName", this.baseName);
            Write("Info", "LoginName", this.loginName);
            Write("Info", "PassWord", this.passWord);
        }
    }
}