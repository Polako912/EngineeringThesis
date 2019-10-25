using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacySearch.Data;
using PharmacySearch.Models;

namespace PharmacySearch.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class MedicineController : Controller
    {
        private readonly PharmacyDBContext _context;

        public MedicineController(PharmacyDBContext context)
        {
            _context = context;
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
                var medicine = from c in _context.Medicine
                    from p in c.Pharmacies
                    where c.MedicineName == name && p.FkMedicineId == c.MedicineId
                    select new { c, p.PharmacyName};

                return Ok(medicine);
            }

            var medicine1 = await _context.Medicine
                .OrderBy(m => m.MedicineName)
                .ToListAsync();

            return Ok(medicine1);
        }
    }
}