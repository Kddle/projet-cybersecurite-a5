using Alphapar.BackOffice.DAL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Alphapar.BackOffice.DesktopApp
{
    public partial class ApplicationForm : Form
    {
        private string currentView = "Customers";

        private DataTable dt;

        public ApplicationForm()
        {
            InitializeComponent();
        }

        private async void ApplicationForm_Load(object sender, EventArgs e)
        {
            GetAll(currentView);
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private async void btn_cat_customers_Click(object sender, EventArgs e)
        {
            GetAll("Customers");
        }

        private async void btn_cat_plans_Click(object sender, EventArgs e)
        {
            GetAll("Plans");
        }

        private async void btn_cat_machines_Click(object sender, EventArgs e)
        {
            GetAll("Machines");
        }

        private async void GetAll(string route)
        {
            try
            {
                var sResponse = Program.HttpClient.GetAsync(ConfigurationManager.AppSettings["ServerAddress"] + "/api/" + route).Result;

                if (sResponse.IsSuccessStatusCode)
                {
                    string responseString = await sResponse.Content.ReadAsStringAsync();

                    switch (route)
                    {
                        case "Customers":
                            BuildGridView_Customers(responseString);
                            break;
                        case "Plans":
                            BuildGridView_Plans(responseString);
                            break;
                        case "Machines":
                            BuildGridView_Machines(responseString);
                            break;
                    }
                }
                else
                {
                    ErrorForm errorForm = new ErrorForm(sResponse.ReasonPhrase);
                    errorForm.ShowDialog();
                }
            }
            catch (Exception ex)
            {
                ErrorForm errorForm = new ErrorForm(ex.Message);
                errorForm.ShowDialog();
            }

        }

        private void BuildGridView_Customers(string data)
        {
            List<CustomerModel> customers = JsonConvert.DeserializeObject<List<CustomerModel>>(data);

            dt = new DataTable("Customers");

            dt.Columns.Add("Email");
            dt.Columns.Add("Firstname");
            dt.Columns.Add("Lastname");
            dt.Columns.Add("Country");
            dt.Columns.Add("Plans");

            foreach (CustomerModel customer in customers)
            {
                DataRow row = dt.NewRow();
                row["Email"] = customer.Email;
                row["Firstname"] = customer.Firstname;
                row["Lastname"] = customer.Lastname;
                row["Country"] = customer.Country;
                row["Plans"] = customer.Plans != null ? customer.Plans.Length : 0;
                dt.Rows.Add(row);
            }

            dgv_content.DataSource = dt;
        }

        private void BuildGridView_Plans(string data)
        {
            List<PlanModel> plans = JsonConvert.DeserializeObject<List<PlanModel>>(data);

            dt = new DataTable("Plans");

            dt.Columns.Add("Name");
            dt.Columns.Add("LastUpdated");
            dt.Columns.Add("Composition");

            foreach (PlanModel plan in plans)
            {
                DataRow row = dt.NewRow();
                row["Name"] = plan.Name;
                row["LastUpdated"] = plan.LastUpdated.ToLocalTime();
                row["Composition"] = plan.Composition != null ? plan.Composition.Length : 0;

                dt.Rows.Add(row);
            }

            dgv_content.DataSource = dt;
        }

        private void BuildGridView_Machines(string data)
        {
            List<MachineModel> machines = JsonConvert.DeserializeObject<List<MachineModel>>(data);

            dt = new DataTable("Machines");

            dt.Columns.Add("Name");

            foreach (MachineModel machine in machines)
            {
                DataRow row = dt.NewRow();
                row["Name"] = machine.Name;
                dt.Rows.Add(row);
            }

            dgv_content.DataSource = dt;
        }
    }
}
