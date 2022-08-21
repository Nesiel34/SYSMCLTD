using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wepapi.Models
{
    public class Address:ExtensionTable
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int CustomerId { get; set; }

    }
}
