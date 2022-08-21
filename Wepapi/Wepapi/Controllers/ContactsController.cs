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
    public class ContactsController : ControllerBase
    {
        private readonly Context _context;

        public ContactsController(Context context)
        {
            _context = context;
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public ActionResult<List<Contacts>> GetContacts(int id)
        {
            var contacts = _context.Contacts.Where(e => e.CustomerId == id).ToList();

            if (contacts == null)
            {
                return NotFound();
            }

            return contacts;
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<ActionResult<Contacts>> PostContacts(Contacts contacts)
        {
            _context.Contacts.Add(contacts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContacts", new { id = contacts.Id }, contacts);
        }

    }
}
