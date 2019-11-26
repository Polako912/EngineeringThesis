using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoreLinq;
using PharmacySearch.Data;
using PharmacySearch.Mappers;

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

            if (pharmacies.Count!=0)
            {
                return Ok(_mapper.GetPharmacyDto(pharmacies));
            }

            return NotFound();
        }

        [HttpGet("{name}")]
        public IActionResult GetPharmacyByName([FromRoute] string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var pharmacy = _context.Pharmacy
                    .Select(p => p)
                    .Where(p => p.PharmacyName.Contains(name))
                    .ToList();

                if (pharmacy.Count != 0)
                {
                    return Ok(_mapper.GetPharmacyDto(pharmacy).DistinctBy(x => x.PharmacyDtoAddress));
                }

                return NotFound();
            }

            return NotFound();
        }
    }
}