using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreA5ApiUploadFileB01.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeId { get; set; } 
        [Column(TypeName ="nvarchar(100)")]
        public string EmployeeName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Occupation { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string ImageName { get; set; }   

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }


        //Pascal

    }
}
