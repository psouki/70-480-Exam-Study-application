using System.IO;
using System.Web.Hosting;
using System.Web.Mvc;

namespace DevBeerShop.Controllers
{
    public class GalleryController : Controller
    {
        // GET: Gallery
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoadPage()
        {
            string result;
            using (StreamReader sr = new StreamReader(HostingEnvironment.MapPath("~/Scripts/own/json/gallery.json")))
            {
                result = sr.ReadToEnd();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}