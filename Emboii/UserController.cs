using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace BukuBaca.Api.Controllers;

[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public UserController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }
// ================================================================================================
    // GET ALL USER
    [HttpGet("GetAllData")]
    public IActionResult GetUserAll(){
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetAllUsers();
        } catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
// ================================================================================================
    // GET USER BY ID
    [HttpGet("GetUserById")]
    public IActionResult GetUserById(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetUserById(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
// ================================================================================================
    // CREATE USER
    [HttpPost("CreateUser")]
    public IActionResult CreateUser([FromBody] User user)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.CreateUser(user);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
// ================================================================================================
    // UPDATE USER
    [HttpPut("UpdateUser")]
    public IActionResult UpdateUser(int id, [FromBody] User user)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.UpdateUser(id, user);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

// ================================================================================================
    // DELETE USER
    [HttpPut("DeleteUser")]
    public IActionResult DeleteUser(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.DeleteUser(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}
