using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using AremuCoreServices.Helpers;
using AremuCoreServices.Models.CredentialRecords;
using AremuCoreServices;

namespace Project.Function
{
    public static class GetStripeCheckoutSession
    {
        [FunctionName("GetStripeCheckoutSession")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetStripeCheckoutSession/{id}")] HttpRequest req,
            string id, ILogger log)
        {
            log.LogInformation("GetStripeCheckoutSession function processed a request.");

            var creds = TestHelper.GetStripeCredentialsRecord();

            var newCreds = new StripeCredentialsRecord(creds.ApiKey, creds.Mode, creds.Currency, "http://localhost:5173/Tola/reservation/success", "http://localhost:5173/Tola/reservation/new/edit");


            var session = StripeService.GetStripeCheckoutSession(newCreds, id);



            ;


            // Console.WriteLine($"Session ID: {session.Id}");
            // Console.WriteLine($"Status: {session.Status}");
            // Console.WriteLine($"Payment Intent: {session.PaymentIntentId}");
            // Console.WriteLine($"Customer: {session.CustomerId}");

            // return new OkObjectResult(data);
            return new OkObjectResult(session);
        }
    }
}
