using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using Office = Microsoft.Office.Core;
using Newtonsoft.Json;

// TODO:  When running this code, change the filepath in the "WriteFile" function to your own filepath!!! 


namespace ExcelAddIn2
{
    [ComVisible(true)]
    public class Ribbon1 : Office.IRibbonExtensibility
    {
        private Office.IRibbonUI ribbon;
        protected ThisAddIn main;

        public Ribbon1(ThisAddIn _main)
        {
            main = _main;
        }

        public Database ReadWriteCurrent(Office.IRibbonControl control, Database database, Worksheet sheet = null)
        {
            Workbook currentExcel = main.Application.ActiveWorkbook;
            Worksheet currentSheet = currentExcel.ActiveSheet;
            int currNr = 0;

            if (sheet != null && currentSheet != sheet)
            {
                currentSheet = sheet;
            }

            for (int x = 1; x <= main.Application.Sheets.Count; x++)
            {
                if (main.Application.Sheets[x] == currentSheet)
                {
                    currNr = x;
                    break;
                }
            }
            
            Range currentCells = currentSheet.UsedRange;

            List<string> objects = new List<string>();

            int currentCols = currentCells.Columns.Count;
            int currentRows = currentCells.Rows.Count;

            for (int i = 1; i <= currentRows; i++)
            {
                for (int j = 1; j <= currentCols; j++)
                {
                    if (currentCells.Cells[i, j] != null && currentCells.Cells[i, j].Value != null)
                    {
                        string cell = currentCells.Cells[i, j].Value.ToString();
                        objects.Add(cell);
                    }
                }
            }

            switch (currNr)
            {
                case (1):
                    database.Epics = JsonEpics(objects);
                    break;
                case (2):
                    database.Userstories = JsonUserstories(objects);
                    break;
                case (3):
                    database.Mistakes = JsonMistakes(objects);
                    break;
                case (4):
                    database.Acceptance_Tests = JsonAcceptanceTests(objects);
                    break;
                default:
                    break;
            }

            return database;
        }

        public void ReadWriteAll(Office.IRibbonControl control)
        {
            Workbook currentExcel = main.Application.ActiveWorkbook;
            Worksheet currentSheet = main.Application.ActiveSheet;
            Database database = new Database();
            int nrOfSheets = main.Application.Sheets.Count;

            for (int i = 1; i <= nrOfSheets; i++)
            {
                database = ReadWriteCurrent(control, database, main.Application.Sheets[i]);
            }
            
            // replace the name of the database with whatever you want it to be
            WriteFile("database_name", database);
        }

        public Epics JsonEpics(List<string> objects)
        {
            List<Epic> epics = new List<Epic>();
            int pointer = 2;

            for (int i = 2; i <= objects.Count / 2; i++)
            {
                Epic epic = new Epic();
                for (int j = 0; j < 2; j++)
                {
                    switch (j)
                    {
                        case (0):
                            epic.Epic_Title = RemoveSpacing(objects[pointer]);
                            break;
                        case (1):
                            epic.Epic_Text = RemoveSpacing(objects[pointer]);
                            break;
                        default:
                            break;
                    }
                    pointer++;
                }
                epics.Add(epic);
            }
            Epics e = new Epics();

            e.Number = epics.Count;
            e.Epics_List = epics;
            
            return e;
        }

        public UserStories JsonUserstories(List<string> objects)
        {
            List<UserStory> uss = new List<UserStory>();
            int pointer = 5;

            for (int i = 1; i < objects.Count / 5; i++)
            {
                UserStory us = new UserStory();
                for (int j = 0; j < 5; j++)
                {
                    switch (j)
                    {
                        case (0):
                            us.Epic_Title = RemoveSpacing(objects[pointer]);
                            break;
                        case (1):
                            break;
                        case (2):
                            us.Role = RemoveSpacing(objects[pointer]);
                            break;
                        case (3):
                            us.Action = RemoveSpacing(objects[pointer]);
                            break;
                        case (4):
                            us.Benefit = RemoveSpacing(objects[pointer]);
                            break;
                        default:
                            break;
                    }
                    pointer++;
                }
                uss.Add(us);
            }
            UserStories u = new UserStories();
            u.Number = uss.Count;
            u.Userstories = uss;
            
            return u;
        }

        public Mistakes JsonMistakes(List<string> objects)
        {
            List<Mistake> mts = new List<Mistake>();
            int pointer = 24;

            List<Mistake> atom = new List<Mistake>();
            List<Mistake> minim = new List<Mistake>();
            List<Mistake> full = new List<Mistake>();
            List<Mistake> prob = new List<Mistake>();
            List<Mistake> unam = new List<Mistake>();
            List<Mistake> ind = new List<Mistake>();

            for (int i = 0; i < (objects.Count - 24) / 4; i++)
            {
                Mistake mist = new Mistake();

                for (int j = 0; j < 4; j++)
                {
                    switch (j)
                    {
                        case (0):
                            mist.Epic_Title = RemoveSpacing(objects[pointer]);
                            break;
                        case (1):
                            mist.Role = RemoveSpacing(objects[pointer]);
                            break;
                        case (2):
                            mist.Action = RemoveSpacing(objects[pointer]);
                            break;
                        case (3):
                            mist.Benefit = RemoveSpacing(objects[pointer]);
                            break;
                        default:
                            break;
                    }
                    pointer++;
                }
                mts.Add(mist);
            }

            for (int x = 0; x < mts.Count; x++)
            {
                if (x == 0 || x == 1 || x == 12 || x == 18)
                {
                    atom.Add(mts[x]);
                }
                else if (x == 2 || x == 3 || x == 13 || x == 19)
                {
                    minim.Add(mts[x]);
                }
                else if (x == 4 || x == 5 || x == 14 || x == 20)
                {
                    full.Add(mts[x]);
                }
                else if (x == 6 || x == 7 || x == 15 || x == 21)
                {
                    prob.Add(mts[x]);
                }
                else if (x == 8 || x == 9 || x == 16 || x == 22)
                {
                    unam.Add(mts[x]);
                }
                else if (x == 10 || x == 11 || x == 17 || x == 23)
                {
                    ind.Add(mts[x]);
                }
            }

            Mistakes m = new Mistakes();

            m.Atomic = atom;
            m.Minimal = minim;
            m.Full_Sentence = full;
            m.Problem_Oriented = prob;
            m.Unambiguous = unam;
            m.Independent = ind;
            
            return m;
        }

        public AcceptanceTests JsonAcceptanceTests(List<string> objects)
        {
            List<AcceptanceTest> accs = new List<AcceptanceTest>();
            int pointer = 10;

            for (int i = 0; i < (objects.Count - 10) / 8; i++)
            {
                AcceptanceTest acc = new AcceptanceTest();
                for (int j = 0; j < 8; j++)
                {
                    switch (j)
                    {
                        case (0):
                            acc.Epic_Title = RemoveSpacing(objects[pointer]);
                            break;
                        case (1):
                            acc.usKey = Int32.Parse(objects[pointer]);
                            break;
                        case (2):
                            acc.Role = RemoveSpacing(objects[pointer]);
                            break;
                        case (3):
                            acc.Action = RemoveSpacing(objects[pointer]);
                            break;
                        case (4):
                            acc.Benefit = RemoveSpacing(objects[pointer]);
                            break;
                        case (5):
                            acc.Given = RemoveSpacing(objects[pointer]);
                            break;
                        case (6):
                            acc.When = RemoveSpacing(objects[pointer]);
                            break;
                        case (7):
                            acc.Then = RemoveSpacing(objects[pointer]);
                            break;
                        default:
                            break;
                    }
                    pointer++;
                }
                
                accs.Add(acc);
            }
            AcceptanceTests a = new AcceptanceTests();
            a.Number = accs.Count;
            a.Acceptance_Tests = accs;
            
            return a;
        }

        public static void WriteFile(string str, object obj)
        {
            // Replace the string with the path to the www\\assets\\json\\ folder within the BakeRE fileset
            string pc = "C:\\path_to_folder\\www\\assets\\json\\";
            using (StreamWriter writer = new StreamWriter(pc + str + ".json"))
            {
                writer.Write(JsonConvert.SerializeObject(obj, Formatting.Indented).Replace('_', ' '));
            }
        }

        public static string RemoveSpacing(string input)
        {
            string copy = input;

            if (copy.Last<char>() == ' ')
            {
                return copy.Trim(' ');
            }

            return input;
        }

        #region IRibbonExtensibility Members

        public string GetCustomUI(string ribbonID)
        {
            return GetResourceText("ExcelAddIn2.Ribbon1.xml");
        }

        #endregion

        #region Ribbon Callbacks
        //Create callback methods here. For more information about adding callback methods, visit https://go.microsoft.com/fwlink/?LinkID=271226

        public void Ribbon_Load(Office.IRibbonUI ribbonUI)
        {
            this.ribbon = ribbonUI;
        }

        #endregion

        #region Helpers

        private static string GetResourceText(string resourceName)
        {
            Assembly asm = Assembly.GetExecutingAssembly();
            string[] resourceNames = asm.GetManifestResourceNames();
            for (int i = 0; i < resourceNames.Length; ++i)
            {
                if (string.Compare(resourceName, resourceNames[i], StringComparison.OrdinalIgnoreCase) == 0)
                {
                    using (StreamReader resourceReader = new StreamReader(asm.GetManifestResourceStream(resourceNames[i])))
                    {
                        if (resourceReader != null)
                        {
                            return resourceReader.ReadToEnd();
                        }
                    }
                }
            }
            return null;
        }

        #endregion
    }
}
