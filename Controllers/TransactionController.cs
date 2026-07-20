using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_De_Controle_Financeiro.Data;
using Sistema_De_Controle_Financeiro.Models;

namespace Sistema_De_Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {

        private readonly AppDbContext _context;

       public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateTransaction([FromBody] Transaction newTransaction)
        {

            if(string.IsNullOrEmpty(newTransaction.Type))
            {
                return BadRequest(" O tipo é obrigatório");
            }

            var person = _context.Persons.Find(newTransaction.PersonId);

            if (person == null)
            {
                return BadRequest("A pessoa informada não existe");
            }

            if(person.age < 18 && newTransaction.Type.ToLower() != "gasto")
            {
                return BadRequest("Menores de 18 anos só podem cadastrar gastos");
            }

            newTransaction.Person = null;
            _context.Transactions.Add(newTransaction);
            _context.SaveChanges();

            return Ok(newTransaction);
        }


        [HttpGet]
        public IActionResult ListTransactions()
        {
            return Ok(_context.Transactions.ToList());
        }




    }
}
