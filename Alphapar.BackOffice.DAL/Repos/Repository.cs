using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alphapar.BackOffice.DAL.Repos
{
    public class Repository<T> where T : class
    {
        private IMongoDatabase Database;
        private string TableName;
        private IMongoCollection<T> Collection;

        public Repository(IMongoDatabase db, string tableName)
        {
            Database = db;
            TableName = tableName;
            Collection = Database.GetCollection<T>(TableName);
        }

        public T Get(string id)
        {
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            return Collection.Find(filter).FirstOrDefault();
        }

        public T[] GetAll()
        {
            var col = Collection.Find(FilterDefinition<T>.Empty).ToList();
            if (col == null)
                return new List<T>().ToArray();
            else
                return col.ToArray();
        }

        public void Add(T entity)
        {
            Collection.InsertOne(entity);
        }

        public void Delete(string id)
        {
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            Collection.DeleteOne(filter);
        }

        public T Update(string id, T entity)
        {
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            var result = Collection.ReplaceOne(filter, entity);

            return entity; // temp
        }
    }
}
