using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace DevBeerShop.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BeerDetails()
        {
            return View();
        }

        public ActionResult AllBeers()
        {
            return View();
        }

        public ActionResult CheckOut()
        {
            return View();
        }

        public ActionResult FindUs()
        {
            return View();
        }

        public ActionResult Ranking()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Gift()
        {
            GiftBO gift = new GiftBO();
            GiftPromo giftPromo = new GiftPromo();

            var jsonStringData = new StreamReader(Request.InputStream).ReadToEnd();
            if (jsonStringData.Length > 0 )
            {
                gift = JsonConvert.DeserializeObject<GiftBO>(jsonStringData);
                if (gift.invoiceAverage == "high")
                {
                    if (gift.buyingStyle == "same")
                    {
                        giftPromo.name = "discount";
                        giftPromo.description = "10% discount"; 
                        giftPromo.helps = "To pay less.";
                    }
                    else if (gift.buyingStyle == "always new")
                    {
                        giftPromo.name = "t-shirt";
                        giftPromo.description = "Love for beer";
                        giftPromo.helps = "To express your love for the beer.";
                    }
                    else
                    {
                        giftPromo.name = "cup";
                        giftPromo.description = "cup for devBeer";
                        giftPromo.helps = "To drink with more pleasure.";
                    }
                }
                var jsonReturn = new JavaScriptSerializer().Serialize(giftPromo);
                Response.Write(jsonReturn);
                Response.End();
            }
            return View();
        }

        private class GiftBO
        {
            public string customerCategory { get; set; }
            public string buyingStyle { get; set; }
            public string invoiceAverage { get; set; }
        }

        private class GiftPromo
        {
            public string name { get; set; }
            public string description { get; set; }
            public string helps { get; set; }
        }
    }

}