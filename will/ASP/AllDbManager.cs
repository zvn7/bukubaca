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

    // CREATE USER
    public int CreateUser(User user)
    {
        // Mengatur nilai default untuk status jika tidak ada nilai yang diberikan
        if (user.status == 0)
        {
            user.status = 1; // Set nilai default ke 1
        }
        using (MySqlConnection connection = _connection)
    {
        string query = "INSERT INTO user (nama, username, sandi, status, role) VALUES (@nama, @username, @sandi, @status, @role)";
        using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@nama", user.nama);
                command.Parameters.AddWithValue("@username", user.username);
                command.Parameters.AddWithValue("@sandi", user.sandi);
                command.Parameters.AddWithValue("@status", user.status);
                command.Parameters.AddWithValue("@role", user.role);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

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

    // END User


    // START Auth
    public List<User> GetUserByLogin(string username, string sandi)
    {
        List<User> userList = new List<User>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "select * from user where username = @username and sandi = @sandi";
                MySqlCommand command = new MySqlCommand(query,connection);
                command.Parameters.AddWithValue("@username", username);
                command.Parameters.AddWithValue("@sandi", sandi);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        User users = new User
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama = reader["nama"].ToString(),
                            username = reader["username"].ToString(),
                            sandi = reader["sandi"].ToString(),
                            status = Convert.ToInt32(reader["status"]),
                            role = Convert.ToInt32(reader["role"])
                        };
                        userList.Add(users);
                        
                    }
                }
            }
        } catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return userList;
    }
    // END Auth 

    // START Buku
    public List<Buku> GetAllBukus()
    {
        List<Buku> bukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            penerbit = reader["Penerbit"].ToString(),
                            kategori = reader["Kategori"].ToString(),
                            issn = reader["Issn"].ToString(),
                            jumlah_halaman = Convert.ToInt32(reader["Jumlah_halaman"]),
                            tahun = Convert.ToInt32(reader["Tahun"]),
                            status = Convert.ToInt32(reader["Status"])
                        };
                        bukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return bukuList;
    }

    public List<Buku> GetBukuById(int id)
    {
        List<Buku> bukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku WHERE Id = @id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            // id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            penerbit = reader["Penerbit"].ToString(),
                            kategori = reader["Kategori"].ToString(),
                            issn = reader["Issn"].ToString(),
                            jumlah_halaman = Convert.ToInt32(reader["Jumlah_halaman"]),
                            tahun = Convert.ToInt32(reader["Tahun"]),
                            status = Convert.ToInt32(reader["Status"])
                        };
                        bukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return bukuList;
    }

    public List<Buku> GetAllBukuTersedia()
    {
        List<Buku> bukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku where status = 1";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            penerbit = reader["Penerbit"].ToString(),
                            kategori = reader["Kategori"].ToString(),
                            issn = reader["Issn"].ToString(),
                            jumlah_halaman = Convert.ToInt32(reader["Jumlah_halaman"]),
                            tahun = Convert.ToInt32(reader["Tahun"]),
                            status = Convert.ToInt32(reader["Status"])
                        };
                        bukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return bukuList;
    }
    public List<Buku> GetAllBukuTidakTersedia()
    {
        List<Buku> bukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku where status = 0";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            penerbit = reader["Penerbit"].ToString(),
                            kategori = reader["Kategori"].ToString(),
                            issn = reader["Issn"].ToString(),
                            jumlah_halaman = Convert.ToInt32(reader["Jumlah_halaman"]),
                            tahun = Convert.ToInt32(reader["Tahun"]),
                            status = Convert.ToInt32(reader["Status"])
                        };
                        bukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return bukuList;
    }

    public List<Buku> GetBukuByParams(string parameter)
    {
        List<Buku> bukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM `buku` WHERE judul like @parameter or pengarang  like @parameter or kategori like @parameter;";
                string hasil = String.Format("'%{0}%'", parameter.ToString());
                string hasils = Regex.Replace(hasil, "[']", "");
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@parameter", hasils);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku bukus = new Buku
                        {
                            id = Convert.ToInt32(reader["id"]),
                            judul = reader["judul"].ToString(),
                            pengarang = reader["pengarang"].ToString(),
                            penerbit = reader["penerbit"].ToString(),
                            kategori = reader["kategori"].ToString(),
                            issn = reader["issn"].ToString(),
                            jumlah_halaman = Convert.ToInt32(reader["Jumlah_halaman"]),
                            tahun = Convert.ToInt32(reader["tahun"]),
                            status = Convert.ToInt32(reader["status"])
                        };
                        bukuList.Add(bukus);
                    }
                    Console.WriteLine(hasil);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return bukuList;
    }
    public List<Buku> GetBukuByParamsFix(string parameter)
    {
        List<Buku> bukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM `buku` WHERE judul = @Parameter or pengarang  = @Parameter or kategori = @Parameter;";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Parameter", parameter);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku bukus = new Buku
                        {
                            id = Convert.ToInt32(reader["id"]),
                            judul = reader["judul"].ToString(),
                            pengarang = reader["pengarang"].ToString(),
                            penerbit = reader["penerbit"].ToString(),
                            kategori = reader["kategori"].ToString(),
                            issn = reader["issn"].ToString(),
                            jumlah_halaman = Convert.ToInt32(reader["Jumlah_halaman"]),
                            tahun = Convert.ToInt32(reader["tahun"]),
                            status = Convert.ToInt32(reader["status"])
                        };
                        bukuList.Add(bukus);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return bukuList;
    }

    public int CreateBuku(Buku buku)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO buku (judul, pengarang, penerbit, kategori, issn, jumlah_halaman, tahun, status) VALUES (@Judul, @Pengarang, @Penerbit, @Kategori, @Issn, @Jumlah_halaman, @Tahun, @Status)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Judul", buku.judul);
                command.Parameters.AddWithValue("@Pengarang", buku.pengarang);
                command.Parameters.AddWithValue("@Penerbit", buku.penerbit);
                command.Parameters.AddWithValue("@Kategori", buku.kategori);
                command.Parameters.AddWithValue("@Issn", buku.issn);
                command.Parameters.AddWithValue("@Jumlah_halaman", buku.jumlah_halaman);
                command.Parameters.AddWithValue("@Tahun", buku.tahun);
                command.Parameters.AddWithValue("@Status", buku.status);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int UpdateBuku(int id, Buku buku)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE buku SET judul = @Judul, pengarang = @Pengarang, penerbit = @Penerbit, kategori = @Kategori, issn = @Issn, jumlah_halaman = @Jumlah_halaman, tahun = @Tahun WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Judul", buku.judul);
                command.Parameters.AddWithValue("@Pengarang", buku.pengarang);
                command.Parameters.AddWithValue("@Penerbit", buku.penerbit);
                command.Parameters.AddWithValue("@Kategori", buku.kategori);
                command.Parameters.AddWithValue("@Issn", buku.issn);
                command.Parameters.AddWithValue("@Jumlah_halaman", buku.jumlah_halaman);
                command.Parameters.AddWithValue("@Tahun", buku.tahun);
                // command.Parameters.AddWithValue("@Status", buku.status);
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int DeleteBuku(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE buku SET status = 0 WHERE id = @id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }


    //End Buku

    // History
    public List<ReadHistori> GetHistori()
    {
        List<ReadHistori> historiList = new List<ReadHistori>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "call getallhistori()";
                MySqlCommand command = new MySqlCommand(query,connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        ReadHistori historis = new ReadHistori
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_buku = Convert.ToInt32(reader["id_buku"]),
                            buku = reader["buku"].ToString(),
                            id_user = Convert.ToInt32(reader["id_user"]),
                            peminjam = reader["peminjam"].ToString(),
                            tanggal_pinjam = Convert.ToDateTime(reader["tanggal_pinjam"]),
                            tanggal_kembali = Convert.ToDateTime(reader["tanggal_kembali"])
                        };
                        historiList.Add(historis);
                    }
                }
            }
        } catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return historiList;
    }

    public List<Histori> GetHistoriById(int id)
    {
        List<Histori> historiList = new List<Histori>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM `histori_peminjaman` where id = @id";
                MySqlCommand command = new MySqlCommand(query,connection);
                command.Parameters.AddWithValue("@id", id); 
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Histori historis = new Histori
                        {
                            id = Convert.ToInt32(reader["id"]),
                            id_buku = Convert.ToInt32(reader["id_buku"]),
                            id_peminjam = Convert.ToInt32(reader["id_peminjam"]),
                            tanggal_pinjam = Convert.ToDateTime(reader["tanggal_pinjam"]),
                            tanggal_kembali = Convert.ToDateTime(reader["tanggal_kembali"])
                        };
                        historiList.Add(historis);
                    }
                }
            }
        } catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return historiList;
    }

    public int CreateHistori(Histori histori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO histori_peminjaman (id_buku, id_peminjam, tanggal_kembali) VALUES (@Id_Buku, @Id_Peminjam, @Tanggal_Kembali);"+
                "update buku set status = 0 where id = @Id_Buku;";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id_Buku", histori.id_buku);
                command.Parameters.AddWithValue("@Id_Peminjam", histori.id_peminjam);
                // command.Parameters.AddWithValue("@Tanggal_Pinjam", histori.tanggal_pinjam);
                command.Parameters.AddWithValue("@Tanggal_Kembali", histori.tanggal_kembali);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
    // End History
}