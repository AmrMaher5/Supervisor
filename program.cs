using System.Diagnostics;
using System.Web.Mvc;

public class ProgramController : Controller
{
    public ActionResult OpenProgram()
    {
        // افتح البرنامج المستهدف هنا
        Process.Start("Supervisor.exe");
        
        return Content("تم فتح البرنامج بنجاح");
    }
}