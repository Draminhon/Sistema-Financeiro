using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_De_Controle_Financeiro.Data;
using Sistema_De_Controle_Financeiro.Models;
namespace Sistema_De_Controle_Financeiro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreatePerson([FromBody] Person newPerson)
        {
            if (string.IsNullOrEmpty(newPerson.name) || int.IsNegative(newPerson.age))
            {
                return BadRequest(" O nome da pessoa é obrigatório");
            }
            _context.Persons.Add(newPerson);
            _context.SaveChanges(); 
            return Ok(newPerson);
        }


        [HttpGet]
        public IActionResult ListPersons()
        {
            return Ok(_context.Persons.ToList());
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePerson(int id)
        {

            var PersonFinded = _context.Persons.Find(id);
            if(PersonFinded != null)
            {
                _context.Persons.Remove(PersonFinded);

            }
            else
            {
                return NotFound();
            }

            _context.SaveChanges();
            return Ok();
        }
    }
}
