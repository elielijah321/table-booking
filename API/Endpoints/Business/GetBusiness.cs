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

            // var data = RepositoryWrapper.GetRepo().GetReservationById(id);

            var partySizes = GeneratePartySizes();
            var timeSlots = GenerateTimeSlots("13:00", "22:30", 15);

            var data = new Business();

            data.BusinessName = name;
            data.BusinessOfferings = new List<BusinessOffering>()
            { 
                new BusinessOffering() 
                { 
                    Name = "Deposit", 
                    PricePerPerson = 20 
                }
            };
            data.PartySizes = partySizes;
            data.TimeSlots = timeSlots;

            return new OkObjectResult(data);
        }


        private static List<string> GenerateTimeSlots(string startTime, string endTime, int intervalMinutes)
        {
            List<string> timeSlots = new List<string>();

            // Parse start and end times to TimeSpan
            TimeSpan start = TimeSpan.Parse(startTime);
            TimeSpan end = TimeSpan.Parse(endTime);
            TimeSpan interval = TimeSpan.FromMinutes(intervalMinutes);

            while (start < end)
            {
                TimeSpan nextSlot = start + interval;
                if (nextSlot > end) break; // Stop if next slot exceeds end time

                timeSlots.Add($"{start:hh\\:mm}");
                start = nextSlot;
            }

            return timeSlots;
        }

        private static List<int> GeneratePartySizes()
        {
            var partySizes = new List<int>();

            for (int i = 0; i < 20; i++)
            {
                partySizes.Add(i + 1);
            }

            return partySizes;
        }
    }
}
