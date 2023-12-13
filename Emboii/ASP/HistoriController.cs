using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class HistoriController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public HistoriController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // [HttpGet]
    // public IActionResult GetHistoris()
    // {
    //     try
    //     {
    //         response.status = 200;
    //         response.message = "Succes";
    //         response.data = _dbManager.GetAllHistoris();
    //     }
    //     catch (Exception ex)
    //     {
    //         response.status = 500;
    //         response.message = ex.Message;
    //     }
    //     return Ok(response);
    // }

    [HttpGet("[controller]/GetAllHistori")]
    public IActionResult GetHistori()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetHistori();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpGet("[controller]/GetHistoriById/{id}")]
    public IActionResult GetHistotyById(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetHistoriById(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpPost("[controller]/postHistori")]
    public IActionResult CreateHistori([FromBody] Histori histori)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.CreateHistori(histori);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

}