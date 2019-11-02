using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacySearch.Data;
using PharmacySearch.Mappers;
using PharmacySearch.Models;

namespace PharmacySearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmacyController : ControllerBase
    {
        private readonly PharmacyDBContext _context;
        private readonly DtoMapper _mapper;

        public PharmacyController(PharmacyDBContext context, DtoMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPharmacies()
        {
            var pharmacies = await _context.Pharmacy
                .OrderBy(p => p.PharmacyName)
                .ToListAsync();

            return Ok(_mapper.GetPharmacyDto(pharmacies));
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetPharmacyByName([FromRoute] string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var pharmacy = _context.Pharmacy
                    .Select(p => p)
                    .Where(p => p.PharmacyName.Contains(name))
                    .ToList();

                return Ok(_mapper.GetPharmacyDto(pharmacy));
            }

            var pharmacyNotFound = await _context.Pharmacy
                .OrderBy(p => p.PharmacyName)
                .ToListAsync();

            return Ok(_mapper.GetPharmacyDto(pharmacyNotFound));
        }
    }
}