using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Alphapar.BackOffice.API.Logic
{
    public static class LoggerUtils
    {
        private static string Filename
        {
            get
            {
                return DateTime.Now.ToString("d").Replace('/', '_');
            }
        }

        public static void WriteLog(string message)
        {
            string path = ConfigurationManager.AppSettings["LogPath"] == null ? "C:" : ConfigurationManager.AppSettings["LogPath"];

            string fullpath = path[path.Length - 1] == '/' ? new StringBuilder(path).Append(Filename).ToString() : new StringBuilder(path).Append("/").Append(Filename).ToString();

            try
            {
                File.AppendAllText(fullpath, "\n" + message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}