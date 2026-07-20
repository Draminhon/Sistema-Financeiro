using Microsoft.EntityFrameworkCore;
using Sistema_De_Controle_Financeiro.Models;
namespace Sistema_De_Controle_Financeiro.Data

{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

    }
}
