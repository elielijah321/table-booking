using System;
using System.Collections.Generic;
using Project.Function;

namespace Project.Mappers
{
    public static class BusinessMapper
    {
        public static Business ToEntity(this UpdateBusinessRequestModel request)
        {
            return new Business
            {
                Id = request.Id,
                BusinessName = request.BusinessName,
                BusinessType = request.BusinessType,
                Email = request.Email,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber,
                DefaultOfferingName = request.DefaultOfferingName,
                DefaultOfferingPrice = request.DefaultOfferingPrice,
                BusinessOfferings = request.BusinessOfferings,
                MaxCapacity = request.MaxCapacity,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Interval = request.Interval,
            };
        }

        public static UpdateBusinessRequestModel ToRequest(this Business entity)
        {
            return new UpdateBusinessRequestModel
            {
                Id = entity.Id,
                BusinessName = entity.BusinessName,
                BusinessType = entity.BusinessType,
                Email = entity.Email,
                Address = entity.Address,
                PhoneNumber = entity.PhoneNumber,
                BusinessOfferings = entity.BusinessOfferings,
                DefaultOfferingName = entity.DefaultOfferingName,
                DefaultOfferingPrice = entity.DefaultOfferingPrice,
                MaxCapacity = entity.MaxCapacity,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                Interval = entity.Interval,
            };
        }

        public static UpdateBusinessResponseModel ToResponse(this Business entity)
        {
            return new UpdateBusinessResponseModel
            {
                Id = entity.Id,
                BusinessName = entity.BusinessName,
                BusinessType = entity.BusinessType,
                Email = entity.Email,
                Address = entity.Address,
                PhoneNumber = entity.PhoneNumber,
                DefaultOfferingName = entity.DefaultOfferingName,
                DefaultOfferingPrice = entity.DefaultOfferingPrice,
                BusinessOfferings = entity.BusinessOfferings,
                MaxCapacity = entity.MaxCapacity,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                Interval = entity.Interval,
                TimeSlots = GenerateTimeSlots(entity.StartTime, entity.EndTime, entity.Interval),
                Reservations = entity.Reservations,
            };
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
   
    }
}