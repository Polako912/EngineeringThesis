using Microsoft.EntityFrameworkCore;
using PharmacySearch.Models;

namespace PharmacySearch.Data
{
    public partial class PharmacyDBContext : DbContext
    {
        public PharmacyDBContext()
        {
        }

        public PharmacyDBContext(DbContextOptions<PharmacyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Medicine> Medicine { get; set; }
        public virtual DbSet<Pharmacy> Pharmacy { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("server=desktop-5i6c7po\\sqlexpress;database=PharmacyDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Medicine>(entity =>
            {
                entity.Property(e => e.MedicineId)
                    .HasColumnName("MedicineID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ExpireTime)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineCapacity)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineFullName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Prescription)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Usage)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.WhenToUse)
                    .HasMaxLength(400)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Pharmacy>(entity =>
            {
                entity.Property(e => e.PharmacyId)
                    .HasColumnName("PharmacyID")
                    .ValueGeneratedNever();

                entity.Property(e => e.FkMedicineId).HasColumnName("Fk_MedicineID");

                entity.Property(e => e.PharmacyAddress)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PharmacyCity)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PharmacyName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkMedicine)
                    .WithMany(p => p.Pharmacy)
                    .HasForeignKey(d => d.FkMedicineId)
                    .HasConstraintName("FK__Pharmacy__Fk_Med__5DCAEF64");
            });
        }
    }
}
