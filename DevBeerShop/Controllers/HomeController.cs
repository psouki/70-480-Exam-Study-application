using System.IO;
using System.Web.Hosting;
using System.Web.Mvc;

namespace DevBeerShop.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BuildPage()
        {
            string beers;
            using (StreamReader sr = new StreamReader(HostingEnvironment.MapPath("~/Scripts/own/json/beerFront.json")))
            {
                beers = sr.ReadToEnd();
            }

            return Json(beers, JsonRequestBehavior.AllowGet);
        }
    }

}