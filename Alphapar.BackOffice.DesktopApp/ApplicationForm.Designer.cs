namespace Alphapar.BackOffice.DesktopApp
{
    partial class ApplicationForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btn_cat_machines = new System.Windows.Forms.Button();
            this.btn_cat_customers = new System.Windows.Forms.Button();
            this.btn_cat_plans = new System.Windows.Forms.Button();
            this.dgv_content = new System.Windows.Forms.DataGridView();
            this.lbl_debug = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgv_content)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btn_cat_machines);
            this.groupBox1.Controls.Add(this.btn_cat_customers);
            this.groupBox1.Controls.Add(this.btn_cat_plans);
            this.groupBox1.Location = new System.Drawing.Point(12, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(100, 127);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Categories :";
            // 
            // btn_cat_machines
            // 
            this.btn_cat_machines.Location = new System.Drawing.Point(6, 92);
            this.btn_cat_machines.Name = "btn_cat_machines";
            this.btn_cat_machines.Size = new System.Drawing.Size(88, 23);
            this.btn_cat_machines.TabIndex = 4;
            this.btn_cat_machines.Text = "Machines";
            this.btn_cat_machines.UseVisualStyleBackColor = true;
            this.btn_cat_machines.Click += new System.EventHandler(this.btn_cat_machines_Click);
            // 
            // btn_cat_customers
            // 
            this.btn_cat_customers.Location = new System.Drawing.Point(6, 34);
            this.btn_cat_customers.Name = "btn_cat_customers";
            this.btn_cat_customers.Size = new System.Drawing.Size(88, 23);
            this.btn_cat_customers.TabIndex = 2;
            this.btn_cat_customers.Text = "Customers";
            this.btn_cat_customers.UseVisualStyleBackColor = true;
            this.btn_cat_customers.Click += new System.EventHandler(this.btn_cat_customers_Click);
            // 
            // btn_cat_plans
            // 
            this.btn_cat_plans.Location = new System.Drawing.Point(6, 63);
            this.btn_cat_plans.Name = "btn_cat_plans";
            this.btn_cat_plans.Size = new System.Drawing.Size(88, 23);
            this.btn_cat_plans.TabIndex = 3;
            this.btn_cat_plans.Text = "Plans";
            this.btn_cat_plans.UseVisualStyleBackColor = true;
            this.btn_cat_plans.Click += new System.EventHandler(this.btn_cat_plans_Click);
            // 
            // dgv_content
            // 
            this.dgv_content.AllowUserToAddRows = false;
            this.dgv_content.AllowUserToDeleteRows = false;
            this.dgv_content.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgv_content.Location = new System.Drawing.Point(118, 12);
            this.dgv_content.Name = "dgv_content";
            this.dgv_content.ReadOnly = true;
            this.dgv_content.Size = new System.Drawing.Size(663, 426);
            this.dgv_content.TabIndex = 1;
            this.dgv_content.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
            // 
            // lbl_debug
            // 
            this.lbl_debug.AutoSize = true;
            this.lbl_debug.Location = new System.Drawing.Point(12, 455);
            this.lbl_debug.Name = "lbl_debug";
            this.lbl_debug.Size = new System.Drawing.Size(35, 13);
            this.lbl_debug.TabIndex = 2;
            this.lbl_debug.Text = "label1";
            // 
            // ApplicationForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(791, 533);
            this.Controls.Add(this.lbl_debug);
            this.Controls.Add(this.dgv_content);
            this.Controls.Add(this.groupBox1);
            this.Name = "ApplicationForm";
            this.Text = "ApplicationForm";
            this.Load += new System.EventHandler(this.ApplicationForm_Load);
            this.groupBox1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dgv_content)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btn_cat_machines;
        private System.Windows.Forms.Button btn_cat_customers;
        private System.Windows.Forms.Button btn_cat_plans;
        private System.Windows.Forms.DataGridView dgv_content;
        private System.Windows.Forms.Label lbl_debug;
    }
}