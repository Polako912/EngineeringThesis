using System.Collections.Generic;
using Microsoft.AspNetCore.ResponseCompression;
using PharmacySearch.Models;

namespace PharmacySearch.Dtos
{
    public class MedicineDto
    {
        public string MedicineDtoName { get; set; }
        public string MedicineDtoFullName { get; set; }
        public string MedicineDtoType  { get; set; }
        public string MedicineDtoCapacity { get; set; }
        public string Prescription { get; set; }
        public string IsAvailable { get; set; }
        public IEnumerable<PharmacyDto> PharmaciesDto { get; set; }
    }
}
