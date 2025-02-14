using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Project.Function
{
    public static class DeleteReservation
    {
        [FunctionName("DeleteReservation")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "DeleteReservation/{id}")] HttpRequest req,
            string id, ILogger log)
        {
            log.LogInformation("DeleteReservation function processed a request.");

            // RepositoryWrapper.GetRepo().DeleteDefendant(id);

            return new OkObjectResult("");
        }
    }
}
