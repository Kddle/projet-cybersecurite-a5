using Alphapar.BackOffice.DAL.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alphapar.BackOffice.DAL.Repos
{
    public class CustomerRepository
    {
        private IMongoDatabase database;
        protected Repository<CustomerModel> customers;

        public CustomerRepository()
        {
            var connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
            var client = new MongoClient(connectionString);

            string dbName = ConfigurationManager.AppSettings["DBName"];
            database = client.GetDatabase(dbName);
        }

        public Repository<CustomerModel> Customers
        {
            get
            {
                if (customers == null)
                    customers = new Repository<CustomerModel>(database, ConfigurationManager.AppSettings["CustomersTableName"]);

                return customers;
            }
        }
    }
}
