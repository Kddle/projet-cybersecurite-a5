using Alphapar.BackOffice.DAL.Models;
using Alphapar.BackOffice.DAL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alphapar.BackOffice.Services
{
    public class PlanService : ICRUDService<PlanModel>
    {
        private readonly PlanRepository planRepository;

        public PlanService()
        {
            planRepository = new PlanRepository();
        }

        public void Delete(string id)
        {
            planRepository.Plans.Delete(id);
        }

        public PlanModel Get(string id)
        {
            return planRepository.Plans.Get(id);
        }

        public PlanModel[] GetAll()
        {
            return planRepository.Plans.GetAll();
        }

        public void Insert(PlanModel entity)
        {
            planRepository.Plans.Add(entity);
        }

        public PlanModel Update(PlanModel entity)
        {
            return planRepository.Plans.Update(entity.ID, entity);
        }
    }
}
