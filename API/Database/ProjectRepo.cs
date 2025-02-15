using System.Collections.Generic;
using System.Linq;
using Project.Function;
using Project.Mappers;

namespace AzureFunctions.Database
{
    public class ProjectRepo
    {
        private readonly ProjectContext _ctx;

        public ProjectRepo(ProjectContext ctx)
        {
            _ctx = ctx;
        }

         public string AddPerson(UpdateReservationRequestModel request)
         {
            var entity = request.ToEntity();

            _ctx.Reservations.Add(entity);
            SaveAll();

            return entity.Id.ToString();
         }

        public string UpdatePerson(UpdateReservationRequestModel request)
        {
            var entity = request.ToEntity();
            var entityToUpdate = _ctx.Reservations.FirstOrDefault(c => c.Id == entity.Id);

            // entityToUpdate.Name = entity.Name;

            SaveAll();

            return entity.Id.ToString();
        }

        public IEnumerable<Reservation> GetAllReservations()
        {
           return _ctx.Reservations;
        }

        public Reservation GetReservationById(string id)
        {
           return GetAllReservations().FirstOrDefault(x => x.Id.ToString() == id);
        }

        // Save
        private bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

    }
}