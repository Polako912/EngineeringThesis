using System.Collections.Generic;

namespace PharmacySearch.Models
{
    public class Medicine
    {
        public Medicine()
        {
            Pharmacies = new HashSet<Pharmacy>();
        }

        public int MedicineId { get; set; }
        public string MedicineName { get; set; }
        public string MedicineType { get; set; }
        public string MedicineFullName { get; set; }
        public string Prescription { get; set; }
        public string MedicineCapacity { get; set; }
        public string ExpireTime { get; set; }
        public string WhenToUse { get; set; }
        public string Usage { get; set; }
        public string MedicineDescription { get; set; }

        public ICollection<Pharmacy> Pharmacies { get; set; }
    }
}
