using System;
using System.Collections.Generic;

namespace Project.Function
{
    public class UpdateBusinessResponseModel : Business
    {
        public IEnumerable<string> TimeSlots { get; set; }
    }
}