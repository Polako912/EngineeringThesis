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
                PrescriptionDto = x.Prescription,
                ExpireTimeDto = x.ExpireTime,
                WhenToUseDto = x.WhenToUse,
                UsageDto = x.Usage,
                MedicineDtoDescription = x.MedicineDescription,
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

        public List<PharmacyDto> GetPharmacyDto(List<Pharmacy> pharmacy)
        {
            return pharmacy?.Select(x => new PharmacyDto
            {
                PharmacyDtoName = x.PharmacyName,
                PharmacyDtoAddress = x.PharmacyAddress,
                PharmacyDtoCity = x.PharmacyCity,
                OpenFromDto = x.OpenFrom,
                OpenToDto = x.OpenTo
            }).ToList();
        }

        public List<MedicineDto> GetMedicinesDto(List<Medicine> medicine)
        {
            return medicine?.Select(x => new MedicineDto
            {
                MedicineDtoName = x.MedicineName,
                MedicineDtoFullName = x.MedicineFullName,
                MedicineDtoType = x.MedicineType,
                MedicineDtoCapacity = x.MedicineCapacity,
                PrescriptionDto = x.Prescription,
                ExpireTimeDto = x.ExpireTime,
                WhenToUseDto = x.WhenToUse,
                UsageDto = x.Usage,
                MedicineDtoDescription = x.MedicineDescription
            }).ToList();
        }
    }
}
