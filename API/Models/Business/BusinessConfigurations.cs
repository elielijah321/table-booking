using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Function;

namespace Project.Configuration
{

    public class BusinessConfigurations : IEntityTypeConfiguration<Business>
    {
        public void Configure(EntityTypeBuilder<Business> builder)
        {
            builder.ToTable("Businesses", "dbo");
            
            builder.HasKey(e => e.Id)
                    .HasName("PK__Business");

            builder.Property(e => e.Id)
                    .HasDefaultValueSql("NEWID()");
        }
    }
}