using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LearnNetCoreAPIReact02.Models
{
    [Table("UsersContact")]
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Column("FirstName", TypeName = "nvarchar")]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Column("LastName", TypeName = "nvarchar")]
        [MaxLength(100)]
        public string LastName { get; set; }    
    }
}
