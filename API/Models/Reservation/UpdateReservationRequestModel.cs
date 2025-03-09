using System;

namespace Project.Function
{
    public class UpdateReservationRequestModel : Reservation
    {
        public string Time { get; set; }
        public int PricePerItem {get; set;}

        public new DateTime? CreatedAt { get; set; } = DateTime.Now;
        public new DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}