using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        //[HttpGet]
        //public ActionResult<IEnumerable<Medicine>> GetMedicineByName([FromRoute] string name)
        //{
        //    return Ok();
        //}

        //public ActionResult<IEnumerable<Medicine>> GetMedicineByAvailability([FromRoute] bool isAvailable)
        //{
        //    return Ok();
        //}
    }
}