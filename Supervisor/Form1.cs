using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Supervisor
{
    public partial class Form1 : Form
    {
        private int invoiceNumber = 0; // Initialize with the starting invoice number
        private List<string> memoryBook = new List<string>();
        private IFormatProvider parsedValue5;

        public EventHandler button5_Click1 { get; private set; }
        public EventHandler Button5_Click { get; private set; }
        public int dataGridViewYPosition { get; private set; }
        public float dataGridViewXPosition { get; private set; }
        public string rowData { get; private set; }
   

        public Form1()
        {
            InitializeComponent();
            InitializeDeleteButton();
            IncrementInvoiceNumber();
            textBox1.Text = invoiceNumber.ToString();
        }

        private void IncrementInvoiceNumber()
        {
            // Increment the invoice number
            invoiceNumber++;

            // Update the TextBox with the new invoice number
            textBox1.Text = invoiceNumber.ToString();

            // Add the new invoice number to the memory book
            memoryBook.Add(textBox1.Text); ;
        }

        private void InitializeDeleteButton()
        {
            Button deleteButton = new Button
            {
                Text = "Delete",
                Location = new Point(10, 10) // Adjust the button's position as needed
            };
            EventHandler Button5_Click1 = null;
            deleteButton.Click += Button5_Click1;
            Controls.Add(deleteButton);
        }

        private void GenerateInvoiceNumber()
        {
            int invoiceNumber = 0;
            // Increment the invoice number
            invoiceNumber++;

            // Update the TextBox with the new invoice number
            textBox1.Text = invoiceNumber.ToString();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            textBox2.Text = DateTime.Now.ToString("yyyy/MMM/dd");
            textBox3.Focus();
            textBox3.Select();
            textBox3.SelectAll();
        }

        private void textBox4_TextChanged(object sender, EventArgs e)
        {
            UpdateTextBox6();
        }

        private void textBox5_TextChanged(object sender, EventArgs e)
        {
            UpdateTextBox6();
        }

        private void UpdateTextBox6()
        {
            // Parse the values from TextBox4 and TextBox5
            if (double.TryParse(textBox4.Text, out double parsedValue4) &&
                double.TryParse(textBox5.Text, out double parsedValue5))
            {
                // Calculate the product
                double result = parsedValue4 * parsedValue5;

                // Display the result in TextBox6
                textBox6.Text = result.ToString();
            }
            else
            {
                // Handle invalid input (non-numeric values)
                MessageBox.Show("Please enter valid numeric values in TextBox4 and TextBox5.");
            }
        }

        private void printDocument1_PrintPage(object sender, System.Drawing.Printing.PrintPageEventArgs e)
        {
            // Define the printing logic here
            // For example, print the contents of your DataGridView

            // Set up the print font and location
            Font printFont = new Font("Arial", 12);
            float yPosition = 100;

            // Calculate the center position for label8
            float label8XPosition = (e.PageBounds.Width - e.Graphics.MeasureString(label8.Text, new Font("Arial", 14, FontStyle.Bold)).Width) / 2;
            e.Graphics.DrawString(label8.Text, new Font("Arial", 14, FontStyle.Bold), Brushes.Black, new PointF(label8XPosition, yPosition));
            yPosition += 30;

            // Calculate the center position for textBox1
            float textBox1XPosition = (e.PageBounds.Width - e.Graphics.MeasureString(textBox1.Text, new Font("Arial", 14, FontStyle.Bold)).Width) / 2;
            e.Graphics.DrawString(textBox1.Text, new Font("Arial", 14, FontStyle.Bold), Brushes.Black, new PointF(textBox1XPosition, yPosition));
            yPosition += 30;

            // Calculate the center position for textBox3
            float textBox3XPosition = (e.PageBounds.Width - e.Graphics.MeasureString(textBox3.Text, new Font("Arial", 14, FontStyle.Bold)).Width) / 2;
            e.Graphics.DrawString(textBox3.Text, new Font("Arial", 14, FontStyle.Bold), Brushes.Black, new PointF(textBox3XPosition, yPosition));
            yPosition += 30;

            // Calculate the center position for textBox2
            float textBox2XPosition = (e.PageBounds.Width - e.Graphics.MeasureString(textBox2.Text, new Font("Arial", 14, FontStyle.Bold)).Width) / 2;
            e.Graphics.DrawString(textBox2.Text, new Font("Arial", 14, FontStyle.Bold), Brushes.Black, new PointF(textBox2XPosition, yPosition));
            yPosition += 30;

            // Calculate the center position for dataGridView1
            float dataGridViewXPosition = (e.PageBounds.Width - dataGridView1.Width) / 2;
            float dataGridViewYPosition = yPosition; // Set the Y-position for dataGridView1
            yPosition += dataGridView1.Height += 30; // Add spacing after dataGridView1

            // Print the data rows
            for (int i = 0; i < dataGridView1.Rows.Count; i++)
            {
                yPosition += dataGridView1.Height += 30; // Add spacing after dataGridView1
                DataGridViewRow row = dataGridView1.Rows[i];
                string rowData = $"{row.Cells[0].Value},  {row.Cells[1].Value},  {row.Cells[2].Value},  {row.Cells[3].Value}";
                e.Graphics.DrawString(rowData, printFont, Brushes.Black, new PointF(dataGridViewXPosition, dataGridViewYPosition));
                dataGridViewYPosition += 30; // Adjust the Y-position for the next row
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            // Show the PrintDialog to select printer settings
            PrintDialog printDialog = new PrintDialog();
            printDialog.Document = printDocument1;

            if (printDialog.ShowDialog() == DialogResult.OK)
            {
                // Print the document
                printDocument1.Print();
            }
            GenerateInvoiceNumber();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            RestartApplication();
        }

        private void RestartApplication()
        {
            Application.Restart();
        }

        private void button7_Click(object sender, EventArgs e)
        {
            // Create a SaveFileDialog to allow the user to choose a save location
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "Text Files (*.txt)|*.txt|All Files (*.*)|*.*";
            saveFileDialog.DefaultExt = "txt";
            saveFileDialog.Title = "Save Data";

            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                // Get the chosen file path
                string filePath = saveFileDialog.FileName;

                try
                {
                    // Create a StringBuilder to store the data
                    StringBuilder dataToSave = new StringBuilder();

                    // Append the data from DataGridView to the StringBuilder
                    foreach (DataGridViewRow row in dataGridView1.Rows)
                    {
                        string rowData = $"{row.Cells[0].Value}, {row.Cells[1].Value}, {row.Cells[2].Value}, {row.Cells[3].Value}";
                        dataToSave.AppendLine(rowData);
                    }

                    // Save the data to the chosen file
                    System.IO.File.WriteAllText(filePath, dataToSave.ToString());

                    MessageBox.Show("Data saved successfully!", "Save Data", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error saving data: {ex.Message}", "Save Data Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // Get values from comboBox1, textBox5, and textBox4
            string value1 = textBox7.Text;
            string value2 = textBox5.Text;
            string value3 = textBox4.Text;
            string value4 = textBox6.Text;

            // Add a new row to DataGridView
            dataGridView1.Rows.Add(value1, value2, value3, value4);

            // Clear field values
            textBox7.Text = "";
            textBox5.Text = "1";
            textBox6.Text = "";

            // Now, move textBox3 to install its entry
            string value5 = textBox3.Text;
            // Insert the value at the appropriate location in your data structure or database
            // For example:
            // database.InsertValue(value5);

            // Clear textBox3 after installation
            textBox3.Text = value5;

        }
    }
}
