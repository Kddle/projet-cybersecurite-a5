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
    public class PlanRepository
    {
        private IMongoDatabase database;
        protected Repository<PlanModel> plans;

        public PlanRepository()
        {
            var connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
            var client = new MongoClient(connectionString);

            string dbName = ConfigurationManager.AppSettings["DBName"];
            database = client.GetDatabase(dbName);
        }

        public Repository<PlanModel> Plans
        {
            get
            {
                if (plans == null)
                    plans = new Repository<PlanModel>(database, ConfigurationManager.AppSettings["PlansTableName"]);

                return plans;
            }
        }
    }
}
