using System.Collections.Generic;
using System.Linq;
using PharmacySearch.Dtos;
using PharmacySearch.Models;

namespace PharmacySearch.Mappers
{
    public class DtoMapper
    {
        public List<MedicineDto> GetMedicineDto(List<Medicine> medicine)
        {
            return medicine?.Select(x => new MedicineDto
            {
                MedicineDtoName = x.MedicineName,
                MedicineDtoFullName = x.MedicineFullName,
                MedicineDtoType = x.MedicineType,
                MedicineDtoCapacity = x.MedicineCapacity,
                IsAvailable = x.IsAvailable,
                Prescription = x.Prescription,
                PharmaciesDto = x.Pharmacies.Select(p => new PharmacyDto
                {
                    PharmacyDtoName = p.PharmacyName,
                    PharmacyDtoAddress = p.PharmacyAddress,
                    PharmacyDtoCity = p.PharmacyCity,
                    OpenFromDto = p.OpenFrom,
                    OpenToDto = p.OpenTo
                }).ToList()

            }).ToList();
        }
    }
}
