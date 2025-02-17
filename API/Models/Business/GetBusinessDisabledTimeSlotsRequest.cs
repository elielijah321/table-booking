using System;

namespace Project.Function
{
    public class GetBusinessDisabledTimeSlotsRequest 
    {
        public string BusinessId { get; set; }
        public DateTime Date { get; set; }
        public int PartySize { get; set; }
    }
}