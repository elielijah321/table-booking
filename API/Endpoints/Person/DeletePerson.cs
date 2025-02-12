using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Project.Function
{
    public static class DeletePerson
    {
        [FunctionName("DeletePerson")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "DeletePerson/{id}")] HttpRequest req,
            string id, ILogger log)
        {
            log.LogInformation("DeletePerson function processed a request.");

            // RepositoryWrapper.GetRepo().DeleteDefendant(id);

            return new OkObjectResult("");
        }
    }
}
