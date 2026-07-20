namespace Sistema_De_Controle_Financeiro.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }

        public decimal Value { get; set; }

        public int PersonId { get; set; }
        public Person? Person { get; set; }
    }
}
