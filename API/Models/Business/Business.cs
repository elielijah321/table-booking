using System.Collections.Generic;

namespace Project.Function
{
    public class Business : BaseEntity
    {
        public string BusinessName { get; set; }
        public IEnumerable<BusinessOffering> BusinessOfferings { get; set; }
        public IEnumerable<int> PartySizes { get; set; }
        public IEnumerable<string> TimeSlots { get; set; }
    }

    public class BusinessOffering : BaseEntity
    {
        public string Name { get; set; }
        public long PricePerPerson { get; set; }
    }
}