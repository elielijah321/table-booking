using System;
using System.Collections.Generic;
using System.Linq;
using Project.Function;
using Project.Mappers;

namespace AzureFunctions.Database
{
    public class ProjectRepo
    {
        private readonly ProjectContext _ctx;

        public ProjectRepo(ProjectContext ctx)
        {
            _ctx = ctx;
        }

        //Businesses
         public string AddBusiness(UpdateBusinessRequestModel request)
         {
            var entity = request.ToEntity();

            _ctx.Businesses.Add(entity);
            SaveAll();

            return entity.Id.ToString();
         }

        public string UpdateBusinessRequestModel(UpdateBusinessRequestModel request)
        {
            var entity = request.ToEntity();
            var entityToUpdate = _ctx.Businesses.FirstOrDefault(c => c.Id == entity.Id);

            // entityToUpdate.Name = entity.Name;

            SaveAll();

            return entity.Id.ToString();
        }

        public IEnumerable<Business> GetAllBusinesses()
        {
           return _ctx.Businesses;
        }

        public Business GetBusinessById(string id)
        {
        //    return GetAllBusinesses().FirstOrDefault(x => x.Id.ToString() == id);


            return  GetTestBusiness("Elijah's Kitchen");
        }


        public Business GetBusinessByName(string name)
        {
            return GetTestBusiness(name);
        //    return GetAllBusinesses().FirstOrDefault(x => x.Id.ToString() == name);
        }

        private Business GetTestBusiness(string name)
        {

            var timeSlots = GenerateTimeSlots("13:00", "22:30", 15);

            var data = new Business();

            data.BusinessName = name;
            data.BusinessOfferings = new List<BusinessOffering>()
            { 
                new BusinessOffering() 
                { 
                    Name = "Hair cut", 
                    PricePerPerson = 15 
                }
            };
            data.MaxCapacity = 5;
            data.TimeSlots = timeSlots;


            return data;

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
    


        //Reservations
         public string AddReservation(UpdateReservationRequestModel request)
         {
            var entity = request.ToEntity();

            _ctx.Reservations.Add(entity);
            SaveAll();

            return entity.Id.ToString();
         }

        public string UpdateReservation(UpdateReservationRequestModel request)
        {
            var entity = request.ToEntity();
            var entityToUpdate = _ctx.Reservations.FirstOrDefault(c => c.Id == entity.Id);

            // entityToUpdate.Name = entity.Name;

            SaveAll();

            return entity.Id.ToString();
        }

        public IEnumerable<Reservation> GetAllReservations()
        {
           return _ctx.Reservations;
        }

        public Reservation GetReservationById(string id)
        {
           return GetAllReservations().FirstOrDefault(x => x.Id.ToString() == id);
        }


        

        // Save
        private bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

    }
}