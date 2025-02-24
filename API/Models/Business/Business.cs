using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Function
{
    public class Business : BaseEntity
    {
        public string BusinessName { get; set; }
        public string Email { get; set; }
        public string BusinessType { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<BusinessOffering> BusinessOfferings { get; set; }
        public int MaxCapacity { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int Interval { get; set; }

        public string DefaultOfferingName { get; set; }
        public long DefaultOfferingPrice { get; set; }

        public virtual IEnumerable<Reservation> Reservations { get; set; }
    }

    public class BusinessOffering : BaseEntity
    {
        public string Name { get; set; }
        public long PricePerPerson { get; set; }
    }
}