using System;
using System.Collections.Generic;

namespace PharmacySearch.Models
{
    public class Pharmacy
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public IEnumerable<Medicine> Medicines { get; set; }
        public DateTime OpenHours { get; set; }
    }
}
