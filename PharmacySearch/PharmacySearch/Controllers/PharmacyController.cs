using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacySearch.Models;

namespace PharmacySearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmacyController : ControllerBase
    {
        private readonly PharmacyDBContext _context;

        public PharmacyController(PharmacyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPharmacies()
        {
            var pharmacies = await _context.Pharmacy
                .OrderBy(p => p.PharmacyName)
                .ToListAsync();

            return Ok(pharmacies);
        }
    }
}