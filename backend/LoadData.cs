using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;


public class Student{
    public string name {set;get;}
    public string id {set;get;}
}



[ApiController]
[Route("/api/[controller]")]

public class LoadData : ControllerBase
{   

    [HttpGet("getData")]
    public async Task<Student> GetData(){
        Student student = new Student();
        student.id="22k-4229";
        student.name="helo";
        return student;
    }
}
