using Alphapar.BackOffice.DAL.Models;
using Alphapar.BackOffice.DAL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alphapar.BackOffice.Services
{
    public class MachineService : ICRUDService<MachineModel>
    {
        private readonly MachineRepository machineRepository;

        public MachineService()
        {
            machineRepository = new MachineRepository();
        }

        public void Delete(string id)
        {
            machineRepository.Machines.Delete(id);
        }

        public MachineModel Get(string id)
        {
            return machineRepository.Machines.Get(id);
        }

        public MachineModel[] GetAll()
        {
            return machineRepository.Machines.GetAll();
        }

        public void Insert(MachineModel entity)
        {
            machineRepository.Machines.Add(entity);
        }

        public MachineModel Update(MachineModel entity)
        {
            return machineRepository.Machines.Update(entity.ID, entity);
        }
    }
}
