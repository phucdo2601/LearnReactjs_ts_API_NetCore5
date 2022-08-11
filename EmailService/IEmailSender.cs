using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailService
{
    public interface IEmailSender
    {
        //function send mail basic
        void SendEmail(Message message);
        
        //async func sending email
        Task SendEmailAsync(Message message);
    }
}
