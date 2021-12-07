using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        // dotnet ef migrations add initil -p .\Persistence\ -s .\API\
        public DbSet<Activity> activities { get; set; }
    }
}