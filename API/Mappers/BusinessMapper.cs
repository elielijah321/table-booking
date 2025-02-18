using System;
using Project.Function;

namespace Project.Mappers
{
    public static class BusinessMapper
    {
        public static Business ToEntity(this UpdateBusinessRequestModel request)
        {
            return new Business
            {
                Id = request.Id,
            };
        }

        public static UpdateBusinessRequestModel ToRequest(this Business entity)
        {
            return new UpdateBusinessRequestModel
            {
                Id = entity.Id,
            };
        }

        public static UpdateBusinessResponseModel ToResponse(this Business entity)
        {
            return new UpdateBusinessResponseModel
            {
                Id = entity.Id,
            };
        }
    }
}