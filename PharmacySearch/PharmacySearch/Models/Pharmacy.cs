using System;
using System.Collections.Generic;

namespace PharmacySearch.Models
{
    public class Pharmacy
    {
        public int PharmacyId { get; set; }
        public string PharmacyName { get; set; }
        public string PharmacyCity { get; set; }
        public TimeSpan? OpenFrom { get; set; }
        public TimeSpan? OpenTo { get; set; }
        public int FkMedicineId { get; set; }
        public string PharmacyAddress { get; set; }

        public virtual Medicine FkMedicine { get; set; }
    }
}
