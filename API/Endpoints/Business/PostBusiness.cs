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
    public static class PostBusiness
    {
        [FunctionName("PostBusiness")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("PostBusiness function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<UpdateBusinessRequestModel>(requestBody);
            var repo = RepositoryWrapper.GetRepo();

            if (data.Id == Guid.Empty)
            {
                repo.AddBusiness(data);
            }else
            {
                repo.UpdateBusiness(data);
            }


            return new OkObjectResult(data);
        }
        
    }
}
