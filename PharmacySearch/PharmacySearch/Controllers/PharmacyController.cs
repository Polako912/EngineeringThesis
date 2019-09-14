using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PharmacySearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmacyController : ControllerBase
    {
        [HttpGet]
        public Task<IActionResult> GetPharmacyByName([FromQuery] string name)
        {
            return Ok();
        }

        [HttpGet]
        public Task<IActionResult> GetPharmacyByCity([FromQuery] string city)
        {
            return Ok();
        }
    }
}