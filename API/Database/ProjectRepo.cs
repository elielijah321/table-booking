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

         public string AddPerson(UpdatePersonRequestModel request)
         {
            var entity = request.ToEntity();

            _ctx.People.Add(entity);
            SaveAll();

            return entity.Id.ToString();
         }

        public string UpdatePerson(UpdatePersonRequestModel request)
        {
            var entity = request.ToEntity();
            var entityToUpdate = _ctx.People.FirstOrDefault(c => c.Id == entity.Id);

            entityToUpdate.Name = entity.Name;

            SaveAll();

            return entity.Id.ToString();
        }

        public IEnumerable<Person> GetAllPeople()
        {
           return _ctx.People;
        }

        public Person GetPersonById(string id)
        {
           return GetAllPeople().FirstOrDefault(x => x.Id.ToString() == id);
        }

        // Save
        private bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

    }
}