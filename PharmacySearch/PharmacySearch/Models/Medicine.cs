using System;
using System.Collections.Generic;

namespace PharmacySearch.Models
{
    public partial class Medicine
    {
        public Medicine()
        {
            Pharmacies = new HashSet<Pharmacy>();
        }

        public int MedicineId { get; set; }
        public string MedicineName { get; set; }
        public string MedicineType { get; set; }
        public string IsAvailable { get; set; }
        public string MedicineFullName { get; set; }
        public string Prescription { get; set; }
        public string MedicineCapacity { get; set; }

        public virtual ICollection<Pharmacy> Pharmacies { get; set; }
    }
}
