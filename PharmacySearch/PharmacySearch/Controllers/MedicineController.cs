using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacySearch.Data;
using PharmacySearch.Mappers;

namespace PharmacySearch.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class MedicineController : Controller
    {
        private readonly PharmacyDBContext _context;
        private readonly DtoMapper _mapper;

        public MedicineController(PharmacyDBContext context, DtoMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetMedicines()
        {
            var medicine = await _context.Medicine
                .OrderBy(m => m.MedicineName)
                .ToListAsync();

            return Ok(medicine);
        }

        [HttpGet("{name}")]
        public IActionResult GetMedicineByName([FromRoute] string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var medicine = _context.Medicine
                    .Select(m => m)
                    .Where(m => m.MedicineName.Contains(name) && m.Pharmacies.Any(x => x.FkMedicineId == m.MedicineId))
                    .Include(m => m.Pharmacies)
                    .ToList();
                if (medicine.Count != 0)
                {
                    return Ok(_mapper.GetMedicineDto(medicine));
                }

                return NotFound();
            }

            return NotFound();
        }

        [HttpGet("{parameter}/find")]
        public IActionResult GetAnyMedicine([FromRoute] string parameter)
        {
            if (!string.IsNullOrEmpty(parameter))
            {
                var medicine = _context.Medicine
                    .Select(m => m)
                    .Where(m => m.MedicineName.Contains(parameter) || m.MedicineType.Contains(parameter) ||
                                m.MedicineFullName.Contains(parameter))
                    .ToList();

                if (medicine.Count != 0)
                {
                    return Ok(_mapper.GetMedicinesDto(medicine));
                }

                return NotFound();
            }

            return NotFound();
        }
    }
}