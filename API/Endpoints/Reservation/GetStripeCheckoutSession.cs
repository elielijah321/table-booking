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
using Stripe.Checkout;
using Project.Mappers;

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

            var newCreds = new StripeCredentialsRecord(creds.ApiKey, creds.Mode, creds.Currency, "http://localhost:5173/ElijahSoftware/reservation/success", "http://localhost:5173/ElijahSoftware/reservation/new/edit");

            var repo = RepositoryWrapper.GetRepo();

            var existingReservation = repo.GetReservationByStripeCheckoutSession(id);

            var session = StripeService.GetStripeCheckoutSession(newCreds, id);

            var request = session.ParseToReservationRequest();

            var business = repo.GetBusinessByAttribute(request.BusinessId.ToString());

            if (existingReservation == null)
            {
                repo.AddReservation(request);
            }

            var result = new ReservationSuccessModel
            {
                Name = session.CustomerDetails.Name,
                ReservationDate = DateTime.Parse(session.Metadata["date"]),
                Time = session.Metadata["time"],
                BusinessName = business.BusinessName,
            };

            return new OkObjectResult(result);
        }
    }
}
