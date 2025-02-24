using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;

namespace Project.Function
{
    public static class GetBusiness
    {
        [FunctionName("GetBusiness")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetBusiness/{name}")] HttpRequest req,
            string name, ILogger log)
        {
            log.LogInformation("GetBusiness function processed a request.");

            var data = RepositoryWrapper.GetRepo().GetBusinessByNameOrId(name);

            return new OkObjectResult(data);
        }
    }
}
