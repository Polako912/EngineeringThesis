using System.Collections.Generic;

namespace PharmacySearch.Dtos
{
    public class MedicineDto
    {
        public string MedicineDtoName { get; set; }
        public string MedicineDtoFullName { get; set; }
        public string MedicineDtoType  { get; set; }
        public string MedicineDtoCapacity { get; set; }
        public string PrescriptionDto { get; set; }
        public string ExpireTimeDto { get; set; }
        public string WhenToUseDto { get; set; }
        public string UsageDto { get; set; }
        public string MedicineDtoDescription { get; set; }
        public IEnumerable<PharmacyDto> PharmaciesDto { get; set; }
    }
}
