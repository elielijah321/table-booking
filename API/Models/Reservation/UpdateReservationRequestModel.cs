using System;

namespace Project.Function
{
    public class UpdateReservationRequestModel : Reservation
    {
        public string Time { get; set; }
        public int PricePerItem {get; set;}
    }
}