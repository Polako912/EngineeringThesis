using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PharmacySearch.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class MedicineController : Controller
    {
        [HttpGet]
        public Task<IActionResult> GetMedicineByName([FromQuery] string name)
        {
            return Ok();
        }

        public Task<IActionResult> GetMedicineByAvailability([FromQuery] bool isAvailable)
        {
            return Ok();
        }
    }
}