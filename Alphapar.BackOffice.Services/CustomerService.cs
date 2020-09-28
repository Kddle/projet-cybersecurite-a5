using Alphapar.BackOffice.DAL.Models;
using Alphapar.BackOffice.DAL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alphapar.BackOffice.Services
{
    public class CustomerService : ICRUDService<CustomerModel>
    {
        private readonly CustomerRepository customerRepository;

        public CustomerService()
        {
            customerRepository = new CustomerRepository();
        }

        public CustomerModel Get(string id)
        {
            return customerRepository.Customers.Get(id);
        }

        public CustomerModel[] GetAll()
        {
            return customerRepository.Customers.GetAll();
        }

        public void Insert(CustomerModel entity)
        {
            customerRepository.Customers.Add(entity);
        }

        public CustomerModel Update(CustomerModel entity)
        {
            return customerRepository.Customers.Update(entity.ID, entity);
        }

        public void Delete(string id)
        {
            customerRepository.Customers.Delete(id);
        }
    }
}
