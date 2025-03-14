using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Function
{
    public class Reservation : BaseEntity
    {
        public int PartySize { get; set; }
        public DateTime ReservationDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Notes { get; set; }
        public string OfferingId { get; set; }
        public string StripeSessionId { get; set; }
        
        [ForeignKey("Business")]
        public Guid BusinessId { get; set; }
    }
}