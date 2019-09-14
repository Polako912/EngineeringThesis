using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacySearch.Models
{
    public class Medicine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string  Type { get; set; }
        public bool IsAvailable { get; set; }
        public string  FullName { get; set; }
        public Pharmacy Pharmacy { get; set; }
    }
}
