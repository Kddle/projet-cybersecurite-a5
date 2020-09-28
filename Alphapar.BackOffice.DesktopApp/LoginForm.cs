using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Alphapar.BackOffice.DesktopApp
{
    public partial class LoginForm : Form
    {
        private string token = null;

        public LoginForm()
        {

            ServicePointManager.ServerCertificateValidationCallback = (sender, cert, chain, sslPolicyErrors) => true;

            InitializeComponent();
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {

        }

        private async void btn_login_Click(object sender, EventArgs e)
        {
            tb_message.Text = "";

            if (tb_username.Text.Length == 0 || tb_password.Text.Length == 0)
            {
                tb_message.Text = "Please fill in Username and Password fields.";
                return;
            }

            var content = new StringContent(JsonConvert.SerializeObject(new { username = tb_username.Text, password = tb_password.Text }), Encoding.UTF8, "application/json");

            try
            {
                var response = Program.HttpClient.PostAsync(ConfigurationManager.AppSettings["ServerAddress"] + "/api/Auth", content).Result;

                string responseBody = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    string token = responseBody.Replace("\"", string.Empty);
                    Program.HttpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    ApplicationForm applicationForm = new ApplicationForm();
                    Hide();
                    applicationForm.ShowDialog();
                    Close();
                }
                else
                {
                    tb_message.Text = response.ReasonPhrase;
                }
            } catch(Exception ex)
            {
                tb_message.Text = ex.InnerException.Message;
            }
        }
    }
}
