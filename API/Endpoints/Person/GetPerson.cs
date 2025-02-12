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
        [FunctionName("GetPerson")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetPerson/{id}")] HttpRequest req,
            string id, ILogger log)
        {
            log.LogInformation("GetPerson function processed a request.");

            var data = RepositoryWrapper.GetRepo().GetPersonById(id);

            return new OkObjectResult(data);
        }
    }
}
