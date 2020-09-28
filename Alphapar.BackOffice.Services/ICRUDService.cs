using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alphapar.BackOffice.Services
{
    public interface ICRUDService<T> where T : class
    {
        void Insert(T entity);
        T Get(string id);
        T[] GetAll();
        void Delete(string id);
        T Update(T entity);
    }
}
