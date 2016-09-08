using System.IO;
using System.Web.Hosting;
using System.Web.Mvc;

namespace DevBeerShop.Controllers
{
    public class RankingController : Controller
    {
        // GET: Ranking
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoadPage()
        {
            string result;
            using (StreamReader sr = new StreamReader(HostingEnvironment.MapPath("~/Scripts/own/json/beers.json")))
            {
                result = sr.ReadToEnd();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}