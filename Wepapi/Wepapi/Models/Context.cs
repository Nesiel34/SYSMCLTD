using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Wepapi.Models
{
    public class Context:DbContext
    {
        public Context (DbContextOptions<Context> options) : base(options)
        {

        }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<Address> Address { get; set; }

    }
}
