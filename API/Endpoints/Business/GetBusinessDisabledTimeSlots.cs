using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;
using System.IO;
using Newtonsoft.Json;
using System.Linq;

namespace Project.Function
{
    public static class GetBusinessDisabledTimeSlots
    {
        [FunctionName("GetBusinessDisabledTimeSlots")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("GetBusinessDisabledTimeSlots function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<GetBusinessDisabledTimeSlotsRequest>(requestBody);

            var reservations = GetReservations();

            var result = GetOverbookedTimes(reservations, data.PartySize);

            return new OkObjectResult(result);
        }


        private static List<Reservation> GetReservations()
        {
            List<Reservation> reservations = new List<Reservation>
            {
                new Reservation { PartySize = 1, ReservationDate = DateTime.Today.AddHours(13) }, // 14:00
                new Reservation { PartySize = 1, ReservationDate = DateTime.Today.AddHours(13) }, // 14:00
                new Reservation { PartySize = 1, ReservationDate = DateTime.Today.AddHours(13).AddMinutes(15) }, // 14:00
                new Reservation { PartySize = 1, ReservationDate = DateTime.Today.AddHours(13).AddMinutes(15) }, // 14:00
                new Reservation { PartySize = 2, ReservationDate = DateTime.Today.AddHours(14) }, // 14:00 (Duplicate)
                new Reservation { PartySize = 3, ReservationDate = DateTime.Today.AddHours(16) }, // 16:00
                new Reservation { PartySize = 3, ReservationDate = DateTime.Today.AddHours(16) }, // 16:00
                new Reservation { PartySize = 3, ReservationDate = DateTime.Today.AddHours(16) }, // 16:00
            };
            return reservations;
        }

       static List<string> GetOverbookedTimes(List<Reservation> reservations, int partySize)
        {
            var maxBookings = new Dictionary<int, int>
            { // Party size, Max bookings
                { 1, 2 },  
                { 2, 2 },  
                { 3, 2 },  
                { 4, 2 },  
                { 5, 2 },  
                { 6, 2 },  
                { 7, 2 },  
                { 8, 2 },  
                { 9, 2 },  
                { 10, 2 },  
                { 11, 2 },  
                { 12, 2 },  
                { 13, 2 },  
                { 14, 2 },  
                { 15, 2 },  
                { 16, 2 },  
                { 17, 2 },  
                { 18, 2 },  
                { 19, 2 },  
                { 20, 2 },  
            };

            // Get reservations matching the given party size
            var filteredReservations =  reservations
                .Where(r => r.PartySize == partySize) // Only check for the given party size
                .GroupBy(r => r.ReservationDate.ToString("yyyy-MM-dd HH:mm")) // Group by exact time
                .Where(g => g.Count() >= maxBookings[partySize]) // Check if over limit
                .Select(g => g.Key.Split(' ')[1]) // Extract only the HH:mm part
                .ToList();

            return filteredReservations;
        }
    }
}
