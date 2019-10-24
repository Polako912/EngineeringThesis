using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PharmacySearch.Models
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

        public DbSet<Medicine> Medicine { get; set; }
        public DbSet<Pharmacy> Pharmacy { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                
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

                entity.Property(e => e.IsAvailable)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineCapacity)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineFullName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.MedicineType)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Prescription)
                    .HasMaxLength(5)
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
