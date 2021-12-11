using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activites
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity activity { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _conetxt;
        private readonly IMapper _mapper;
            public Handler(DataContext conetxt,IMapper mapper)
            {
            _mapper = mapper;
            _conetxt = conetxt;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var  activite = await _conetxt.activities.FindAsync(request.activity.Id);

                _mapper.Map(request.activity, activite);


                await _conetxt.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}