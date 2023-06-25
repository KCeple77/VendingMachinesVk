using System;
using System.Data.SqlClient;

class Program
{
    static void Main()
    {
        string serverName = "DESKTOP-353VLR5\\SQLEXPRESS";
        string databaseName = "Machines";
        string connectionString = $"Server={serverName};Database={databaseName};Trusted_Connection=True;";

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                Console.WriteLine("Connected to the database!");

                // Query the VendingMachines table and display the records
                string query = "SELECT SerialNumber, Products, Locations FROM VendingMachines";
                SqlCommand command = new SqlCommand(query, connection);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    int serialNumber = reader.GetInt32(0);
                    string products = reader.GetString(1);
                    string locations = reader.GetString(2);

                    Console.WriteLine($"Serial Number: {serialNumber}");
                    Console.WriteLine($"Products: {products}");
                    Console.WriteLine($"Locations: {locations}");
                    Console.WriteLine();
                }

                reader.Close();

                connection.Close();
                Console.WriteLine("Disconnected from the database!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}