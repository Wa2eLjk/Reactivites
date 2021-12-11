using Application.Activites;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivites()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //activites/id

        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Detials.Query{Id = id});
        }

        [HttpPost] //add activite

        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command{Activity = activity}));
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id =id;
            return Ok(await Mediator.Send(new Edit.Command{activity =activity}));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }        
      





    }
}