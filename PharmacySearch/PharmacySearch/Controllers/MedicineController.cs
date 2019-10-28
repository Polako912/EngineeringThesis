using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PharmacySearch.Data;
using PharmacySearch.Mappers;
using PharmacySearch.Models;

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
        public async Task<IActionResult> GetMedicineByName([FromRoute] string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var medicine = _context.Medicine
                    .Select(m => m)
                    .Where(m => m.MedicineName == name && m.Pharmacies.Any(x => x.FkMedicineId == m.MedicineId))
                    .Include(m => m.Pharmacies)
                    .ToList();

                return Ok(_mapper.GetMedicineDto(medicine));
            }

            var medicineNotFound = await _context.Medicine
                .OrderBy(m => m.MedicineName)
                .ToListAsync();

            return Ok(_mapper.GetMedicineDto(medicineNotFound));
        }
    }
}