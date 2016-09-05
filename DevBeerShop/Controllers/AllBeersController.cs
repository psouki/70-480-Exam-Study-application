using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using DevBeerShop.Models;
using Newtonsoft.Json;

namespace DevBeerShop.Controllers
{
    public class AllBeersController : Controller
    {
        // GET: AllBeers
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoadPage()
        {
            string result;
            using (StreamReader sr = new StreamReader(HostingEnvironment.MapPath("~/Scripts/own/json/beerFront.json")))
            {
                result = sr.ReadToEnd();
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Details()
        {
            return View();
        }

        public ActionResult GetBeerDetails(string id)
        {
            IEnumerable<Beer> beers = new List<Beer>();
            using (StreamReader sr = new StreamReader(HostingEnvironment.MapPath("~/Scripts/own/json/beerCatalog.json")))
            {
                beers = JsonConvert.DeserializeObject<IEnumerable<Beer>>(sr.ReadToEnd());
            }

            Beer result = beers.FirstOrDefault(b => b.beerId.Equals(id));

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSales()
        {
            IEnumerable<string> months = new List<string> {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            const int minimum = 97;
            Random rnd = new Random();

            ICollection<Sales> salesData = months.Select(month => new Sales
            {
                sales = rnd.Next(3, 13)*rnd.Next(3, 13) + minimum, month = month
            }).ToList();

            return Json(salesData, JsonRequestBehavior.AllowGet);
        }
    }
}