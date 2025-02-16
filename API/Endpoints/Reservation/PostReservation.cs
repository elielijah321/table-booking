using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Web.Helpers;
using AremuCoreServices;
using AremuCoreServices.Helpers;
using System.Collections.Generic;
using AremuCoreServices.Models;
using AremuCoreServices.Models.Enums;
// using AzureFunctions.Models;

namespace Project.Function
{
    public static class PostReservation
    {
        [FunctionName("PostReservation")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("PostReservation function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<UpdateReservationRequestModel>(requestBody);
            var repo = RepositoryWrapper.GetRepo();

            if (data.Id == Guid.Empty)
            {
                // repo.AddPerson(data);
            }else
            {
                // repo.UpdatePerson(data);
            }

            var creds = TestHelper.GetStripeCredentialsRecord();

            var lineItems = new List<StripeLineItemRecord>();

            var productName = $"£{data.PricePerItem}.00 x {data.PartySize} guests";

            var total = data.PricePerItem * data.PartySize;

            var lineItem = new StripeLineItemRecord($"{productName}", total, 1);
            lineItems.Add(lineItem);

            var stripeLink = StripeService.CreateCheckoutSession(creds, lineItems, new List<StripePaymentType>() { StripePaymentType.CARD });

            var result = JsonConvert.SerializeObject(stripeLink);

            return new OkObjectResult(result);
        }
        
    }
}
