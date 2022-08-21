using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wepapi.Models
{
    public class Customers:ExtensionTable
    {
        public string Name { get; set; }
        public string CustomerNumber { get; set; }

    }
}
