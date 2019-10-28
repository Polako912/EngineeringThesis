using System;

namespace PharmacySearch.Dtos
{
    public class PharmacyDto
    {
        public string PharmacyDtoName { get; set; }
        public string PharmacyDtoCity { get; set; }
        public TimeSpan? OpenFromDto { get; set; }
        public TimeSpan? OpenToDto { get; set; }
        public string PharmacyDtoAddress { get; set; }
    }
}
