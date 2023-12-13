public class ReadHistori
{
    public int id { get; set; }
    public int id_buku { get; set; }
    public string? buku { get; set; }
    public int id_user { get; set; }

    public  string? peminjam { get; set; }
    public DateTime tanggal_pinjam { get; set; }
    public DateTime tanggal_kembali { get; set; }

}