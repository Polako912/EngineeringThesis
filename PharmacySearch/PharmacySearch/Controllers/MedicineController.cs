using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PharmacySearch.Controllers
{
    [Route("api/{controller}")]
    public class MedicineController : Controller
    {
        [HttpGet]
        public Task<IActionResult> GetMedicineByName([FromRoute] string name)
        {
            return Ok();
        }
    }
}