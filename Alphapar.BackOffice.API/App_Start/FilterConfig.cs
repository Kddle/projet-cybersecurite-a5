using System.Web;
using System.Web.Mvc;

namespace Alphapar.BackOffice.API
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
