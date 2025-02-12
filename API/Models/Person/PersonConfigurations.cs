using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Function;

namespace Project.Configuration
{

    public class PersonConfigurations : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.ToTable("Persons", "dbo");
            
            builder.HasKey(e => e.Id)
                    .HasName("PK__Person");

            builder.Property(e => e.Id)
                    .HasDefaultValueSql("NEWID()");
        }
    }
}