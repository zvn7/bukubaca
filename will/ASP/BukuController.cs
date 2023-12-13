using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Linq.Expressions;


[Route("api/[controller]")]
[ApiController]
public class BukuController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public BukuController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Buku
    [HttpGet("[controller]/getAllBuku")]
    public IActionResult GetBukus()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllBukus();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpGet("[controller]/getAvailableBuku")]
    public IActionResult GetBukuTersedia()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllBukuTersedia();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpGet("[controller]/getUnvailableBuku")]
    public IActionResult GetBukuTidakTersedia()
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllBukuTidakTersedia();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet("[controller]/getBukuById/{id}")]
    public IActionResult GetBukuById(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetBukuById(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet("[controller]/getBukuByParams")]
    public IActionResult GetBukuByParams(string parameter)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetBukuByParams(parameter);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpPost("[controller]/postBuku")]
    public IActionResult CreateBuku([FromBody] Buku buku)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.CreateBuku(buku);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpPut("[controller]/putBuku/{id}")]
    public IActionResult UpdateBuku(int id, [FromBody] Buku buku)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.UpdateBuku(id, buku);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpDelete("[controller]/deleteBuku/{id}")]
    public IActionResult DeleteBuku(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.DeleteBuku(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}