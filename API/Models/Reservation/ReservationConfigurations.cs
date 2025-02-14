using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Function;

namespace Project.Configuration
{

    public class ReservationConfigurations : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.ToTable("Reservations", "dbo");
            
            builder.HasKey(e => e.Id)
                    .HasName("PK__Reservation");

            builder.Property(e => e.Id)
                    .HasDefaultValueSql("NEWID()");
        }
    }
}