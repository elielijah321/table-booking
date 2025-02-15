using System;
using Project.Function;

namespace Project.Mappers
{
    public static class ReservationMapper
    {
        public static Reservation ToEntity(this UpdateReservationRequestModel request)
        {
            return new Reservation
            {
                Id = request.Id,
            };
        }

        public static UpdateReservationRequestModel ToRequest(this Reservation entity)
        {
            return new UpdateReservationRequestModel
            {
                Id = entity.Id,
            };
        }

        public static UpdateReservationResponseModel ToResponse(this Reservation entity)
        {
            return new UpdateReservationResponseModel
            {
                Id = entity.Id,
            };
        }
    }
}