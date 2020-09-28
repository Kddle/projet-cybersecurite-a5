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
    public class MachineRepository
    {
        private IMongoDatabase database;
        protected Repository<MachineModel> machines;

        public MachineRepository()
        {
            var connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
            var client = new MongoClient(connectionString);

            string dbName = ConfigurationManager.AppSettings["DBName"];
            database = client.GetDatabase(dbName);
        }

        public Repository<MachineModel> Machines
        {
            get
            {
                if (machines == null)
                    machines = new Repository<MachineModel>(database, ConfigurationManager.AppSettings["MachinesTableName"]);

                return machines;
            }
        }
    }
}
