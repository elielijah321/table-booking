using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Project.Function
{
    public static class GetCase
    {
        [FunctionName("GetReservation")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetReservation/{id}")] HttpRequest req,
            string id, ILogger log)
        {
            log.LogInformation("GetReservation function processed a request.");

            var data = RepositoryWrapper.GetRepo().GetReservationById(id);

            return new OkObjectResult(data);
        }
    }
}
