using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
// using AzureFunctions.Models;

namespace Project.Function
{
    public static class GetAllReservations
    {
        [FunctionName("GetAllReservations")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "GetAllReservations/{name}")] HttpRequest req,
            string name, ILogger log)
        {
            log.LogInformation("GetAllReservations function processed a request.");

            var repo = RepositoryWrapper.GetRepo();

            var data = repo.GetBusinessByAttribute(name).Reservations;

            return new OkObjectResult(data);
        }
    }
}
