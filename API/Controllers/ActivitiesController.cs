using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        public DataContext Context { get; }
        public ActivitiesController(DataContext context)
        {
            Context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivites()
        {
            return await Context.activities.ToListAsync();
        }

        [HttpGet("{id}")] //activites/id

        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Context.activities.FindAsync(id);
        }




    }
}