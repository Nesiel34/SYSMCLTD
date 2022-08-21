using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wepapi.Models;

namespace Wepapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly Context _context;

        public AddressesController(Context context)
        {
            _context = context;
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public ActionResult<List<Address>> GetAddress(int id)
        {
            var address = _context.Address.Where(e => e.CustomerId == id).ToList();

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }
    }
}
