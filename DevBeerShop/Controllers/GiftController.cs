using System.Web.Mvc;
using DevBeerShop.Models;

namespace DevBeerShop.Controllers
{
    public class GiftController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetGift(Gift gift)
        {
            GiftPromo giftPromo = new GiftPromo();
            
            if (gift.invoiceAverage == "high" || gift.customerCategory =="gold")
            {
                switch (gift.buyingStyle)
                {
                    case "same":
                        giftPromo.name = "discount";
                        giftPromo.description = "10% discount";
                        giftPromo.helps = "To pay less.";
                        break;
                    case "always new":
                        giftPromo.name = "t-shirt";
                        giftPromo.description = "Love for beer";
                        giftPromo.helps = "To express your love for the beer.";
                        break;
                    default:
                        giftPromo.name = "cup";
                        giftPromo.description = "cup for devBeer";
                        giftPromo.helps = "To drink with more pleasure.";
                        break;
                }
            }
            
            return Json(giftPromo, JsonRequestBehavior.AllowGet);
        }
    }
}