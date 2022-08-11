using EmailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LApiNetCore5SendMailB01.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        private readonly IEmailSender _emailSender;

        public WeatherForecastController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        /* [HttpGet]
         public IEnumerable<WeatherForecast> Get()
         {
             var rng = new Random();
             return Enumerable.Range(1, 5).Select(index => new WeatherForecast
             {
                 Date = DateTime.Now.AddDays(index),
                 TemperatureC = rng.Next(-20, 55),
                 Summary = Summaries[rng.Next(Summaries.Length)]
             })
             .ToArray();
         }*/

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();

            var message = new Message(new string[]
            {
                "phucdnse140354@fpt.edu.vn"
            }, "Test email", "This is the content from our email.");
            _emailSender.SendEmail(message);

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("sendEmailAsync")]
        public async Task<IEnumerable<WeatherForecast>> SendEmailAsync()
        {
            var rng = new Random();
            var message = new Message(
                new string[]
                {
                    "phucdnse140354@fpt.edu.vn"
                },
                "Test email async",
                "This is the content from our async email."
                );

            await _emailSender.SendEmailAsync(message);
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
        Date = DateTime.Now.AddDays(index),
        TemperatureC = rng.Next(-20, 55),
        Summary = Summaries[rng.Next(Summaries.Length)]
    })
    .ToArray();

        }

        /**
         * Method send mail with attaching file
         */
        [HttpPost("createMaillAttachFile")]
        public async Task<IEnumerable<WeatherForecast>> CreateMailAddFile()
        {
            var rng = new Random();
            var files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();
            var message = new Message(new string[] { "phucdnse140354@fpt.edu.vn" }, "Test mail with Attachments", "This is the content from our mail with attachments.", files);
            await _emailSender.SendEmailAsync(message);
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
