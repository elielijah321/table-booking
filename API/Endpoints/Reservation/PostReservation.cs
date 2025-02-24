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
using AremuCoreServices.Models.CredentialRecords;

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

            var business = repo.GetBusinessByNameOrId(data.BusinessId.ToString());

            var creds = TestHelper.GetStripeCredentialsRecord();

            bool isLocal = false;

            var domain = isLocal ? "http://localhost:5173" : "https://gentle-pond-0ecca781e.4.azurestaticapps.net";
            var successUrl = $"{domain}/{business.BusinessName}/reservation/success";
            var cancelUrl = $"{domain}/{business.BusinessName}/reservation/new/edit";

            var newCreds = new StripeCredentialsRecord(creds.ApiKey, creds.Mode, creds.Currency, successUrl, cancelUrl);

            var productName = $"£{data.PricePerItem}.00 x {data.PartySize} guests";
            var total = data.PricePerItem * data.PartySize;

            var lineItems = new List<StripeLineItemRecord>();
            var lineItem = new StripeLineItemRecord($"{productName}", total, 1);
            lineItems.Add(lineItem);

            var metadata = new Dictionary<string, string>()
            {
                {"offeringId", "test123"},
                {"date", data.ReservationDate.ToString()},
                {"time", data.Time},
                {"partySize", data.PartySize.ToString()},
                {"businessId", data.BusinessId.ToString()},
            };

            var stripeLink = StripeService.CreateCheckoutSession(newCreds, lineItems, StripePaymentType.CARD, metadata);
            var result = JsonConvert.SerializeObject(stripeLink);

            return new OkObjectResult(result);
        }
        
    }
}
