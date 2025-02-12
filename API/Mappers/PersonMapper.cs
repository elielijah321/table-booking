using System;
using Project.Function;

namespace Project.Mappers
{
    public static class PersonMapper
    {
        public static Person ToEntity(this UpdatePersonRequestModel request)
        {
            return new Person
            {
                Id = request.Id,
                Name = request.Name,
            };
        }

        public static UpdatePersonRequestModel ToRequest(this Person entity)
        {
            return new UpdatePersonRequestModel
            {
                Id = entity.Id,
                Name = entity.Name,
            };
        }

        public static UpdatePersonResponseModel ToResponse(this Person entity)
        {
            return new UpdatePersonResponseModel
            {
                Id = entity.Id,
                Name = entity.Name,
            };
        }
    }
}