using System.Text.RegularExpressions;
using MySql.Data.MySqlClient;

public class DbManager
{
    private readonly string connectionString;
    private readonly MySqlConnection _connection;
    public DbManager(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
        _connection = new MySqlConnection(connectionString);
    }
// ================================================================================================
    // GET ALL USER
    public List<User> GetAllUsers()
    {
        List<User> userList = new List<User>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "select * from user";
                MySqlCommand command = new MySqlCommand(query,connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        User user = new User
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama = reader["nama"].ToString(),
                            username = reader["username"].ToString(),
                            sandi = reader["sandi"].ToString(),
                            status = Convert.ToInt32(reader["status"]),
                            role = Convert.ToInt32(reader["role"])
                        };
                        userList.Add(user);   
                    }
                }
            }
        } catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return userList;
    }
// ================================================================================================
    // GET USER BY ID
    public User GetUserById(int id)
    {   
    User user = null;
    try
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            string query = "SELECT * FROM user WHERE id = @id";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@id", id);
            connection.Open();
            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    user = new User
                    {
                        nama = reader["nama"].ToString(),
                        username = reader["username"].ToString(),
                        sandi = reader["sandi"].ToString(),
                        status = Convert.ToInt32(reader["status"]),
                        role = Convert.ToInt32(reader["role"]),
                    };
                }
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
    return user;
    }
// ================================================================================================
    // CREATE USER
    public int CreateUser(User user)
    {
        using (MySqlConnection connection = _connection)
    {
        string query = "INSERT INTO user (nama, username, sandi, role) VALUES (@nama, @username, @sandi, @role)";
        using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@nama", user.nama);
                command.Parameters.AddWithValue("@username", user.username);
                command.Parameters.AddWithValue("@sandi", user.sandi);
                command.Parameters.AddWithValue("@role", user.role);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
// ================================================================================================
    // UPDATE USER
    public int UpdateUser(int id, User user)
    {
        using (MySqlConnection connection = _connection)
    {
        string query = "UPDATE user SET nama = @nama, username = @username, sandi = @sandi, status = @status, role = @role WHERE id = @id";
        using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@nama", user.nama);
                command.Parameters.AddWithValue("@username", user.username);
                command.Parameters.AddWithValue("@sandi", user.sandi);
                command.Parameters.AddWithValue("@status", user.status);
                command.Parameters.AddWithValue("@role", user.role);
                command.Parameters.AddWithValue("@id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

// ================================================================================================
    // DELETE USER
    public int DeleteUser(int id)
    {
        using (MySqlConnection connection = _connection)
    {
        string query = "UPDATE user SET status = 0 WHERE id = @id";
        using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
}