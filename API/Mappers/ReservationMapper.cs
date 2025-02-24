using System;
using Project.Function;
using Stripe.Checkout;

namespace Project.Mappers
{
    public static class ReservationMapper
    {
        public static Reservation ToEntity(this UpdateReservationRequestModel request)
        {
            return new Reservation
            {
                Id = request.Id,
                PartySize = request.PartySize,
                ReservationDate = request.ReservationDate,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Notes = request.Notes,
                OfferingId = request.OfferingId,
                StripeSessionId = request.StripeSessionId,
                BusinessId = request.BusinessId,
            };
        }

        public static UpdateReservationRequestModel ToRequest(this Reservation entity)
        {
            return new UpdateReservationRequestModel
            {
                Id = entity.Id,
                PartySize = entity.PartySize,
                ReservationDate = entity.ReservationDate,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                Notes = entity.Notes,
                OfferingId = entity.OfferingId,
                StripeSessionId = entity.StripeSessionId,
            };
        }

        public static UpdateReservationResponseModel ToResponse(this Reservation entity)
        {
            return new UpdateReservationResponseModel
            {
                Id = entity.Id,
                PartySize = entity.PartySize,
                ReservationDate = entity.ReservationDate,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                Notes = entity.Notes,
                OfferingId = entity.OfferingId,
                StripeSessionId = entity.StripeSessionId,
            };
        }
    
        public static UpdateReservationRequestModel ParseToReservationRequest(this Session session)
        {
            var sessionMetaData = session.Metadata;
            var customerDetails = session.CustomerDetails;
            var name = customerDetails.Name;

            var _reservationDate = DateTime.Parse(sessionMetaData["date"].ToString());
            var _firstName = name.Split(" ")[0];
            var _lastName = name.Split(" ")[1];
            var _email = customerDetails.Email;
            var _phone = customerDetails.Phone;
            var _offeringId = sessionMetaData["offeringId"].ToString();
            var _partySize = int.Parse(sessionMetaData["partySize"].ToString());
            var _sessionId = session.Id;
            var businessId = sessionMetaData["businessId"].ToString();

            var _timeParts = sessionMetaData["time"].ToString().Split(":");
            var _hour = int.Parse(_timeParts[0]);
            var _minute = int.Parse(_timeParts[1]);

            _reservationDate = _reservationDate.AddHours(_hour).AddMinutes(_minute);

            UpdateReservationRequestModel request = new UpdateReservationRequestModel();

            request.ReservationDate = _reservationDate;
            request.PartySize = _partySize;
            request.FirstName = _firstName;
            request.LastName = _lastName;
            request.Email = _email;
            request.PhoneNumber = _phone;
            request.OfferingId = _offeringId;
            request.StripeSessionId = _sessionId;
            request.BusinessId = Guid.Parse(businessId);

            return request;
        }
    
    
    }
}