export interface Section0_1 {
  Market_Overview_Title: string;
  Highlight_1: string;
  Highlight_2: string;
  Article_Title: string;
  Article_Author: string;
  Author_Professional_Title: string;
  Author_Photo?: string | null;
  Article_Content: string;
}

export interface Section0_2_A_Row {
  Month: string;
  Number_of_Transactions: number | null;
}

export interface Section0_2_A {
  Table_Title: string;
  Summary_Paragraph: string;
  Chart_Title: string;
  Chart_Footnote?: string | null;
  Data: Section0_2_A_Row[];
}

export interface Section0_2_B_Row {
  Industry: string;
  Percentage: number | null;
}

export interface Section0_2_B {
  Summary_Paragraph: string;
  Chart_Title: string;
  Data: Section0_2_B_Row[];
}

export interface Section0_3_A_Row {
  Category: string;
  Value: number | null;
}

export interface Section0_3_A {
  Section_Title: string;
  Total_Volume_YTD_2025: string;
  Featured_Issuance_Name: string;
  Featured_Issuance_Details: string;
  Footnote?: string | null;
  Data: Section0_3_A_Row[];
}

export interface Section0_3_B_Row {
  Category: string;
  Value: string;
}

export interface Section0_3_B {
  Section_Title: string;
  Total_Volume_YTD_2025: string;
  Featured_Issuance_Name: string;
  Featured_Issuance_Amount: string;
  Footnote?: string | null;
  Data: Section0_3_B_Row[];
}

export interface Section1_0_A_Row {
  Year: string;
  Number_of_Transactions: number | null;
  Accumulated_Transaction_Value_USD_MM: number | null;
}

export interface Section1_0_A {
  Table_Title: string;
  Data: Section1_0_A_Row[];
}

export interface Section1_0_B_Row {
  Industry: string;
  Percentage: number | null;
}

export interface Section1_0_B {
  Table_Title: string;
  Data: Section1_0_B_Row[];
}

export interface Section1_1_Row {
  Target: string;
  Industry: string;
  Buyer: string;
  Seller: string;
  Date: string;
  Amount_USD_MM: string;
  Percentage_Acquired: string;
}

export interface Section1_1 {
  Table_Title: string;
  Footnote?: string | null;
  Data: Section1_1_Row[];
}

export interface Section2_0_A_Row {
  Year: string;
  Fixed_Rate_Percentage: number | null;
  Variable_Rate_Percentage: number | null;
  Total_Amount_MXN_MM: number | null;
}

export interface Section2_0_A {
  Section_Title: string;
  Chart_Title: string;
  Data: Section2_0_A_Row[];
}

export interface Section2_0_B_Row {
  Year: string;
  AAA_Percentage: number | null;
  AA_Percentage: number | null;
  A_Percentage: number | null;
  Total_Amount_MXN_MM: number | null;
}

export interface Section2_0_B {
  Section_Title: string;
  Chart_Title: string;
  Data: Section2_0_B_Row[];
}

export interface Section2_0_C_Row {
  Term: string;
  Latest: number | null;
  _6M_Projection: number | null;
  _12M_Projection: number | null;
}

export interface Section2_0_C {
  Section_Title: string;
  Chart_Title: string;
  Data: Section2_0_C_Row[];
}

export interface Section2_0_D_Row {
  Term: string;
  Latest: number | null;
  _6M_Projection: number | null;
  _12M_Projection: number | null;
}

export interface Section2_0_D {
  Section_Title: string;
  Chart_Title: string;
  Data: Section2_0_D_Row[];
}

export interface Section2_1_Row {
  Issuer: string;
  Issue_Date: string;
  Maturity_Date: string;
  Term_Years: number | null;
  Amount_MXN_MM: number | null;
  Rating_Fitch_SP_Moodys_HR: string;
  Rate_Reference: string;
  IPT: string;
  Spread_bps: string;
}

export interface Section2_1 {
  Section_Title: string;
  Data: Section2_1_Row[];
}

export interface Section3_0_A_Row {
  Year: string;
  Number_of_Transactions: number | null;
  Accumulated_Value_MXN_MM: number | null;
}

export interface Section3_0_A {
  Section_Title: string;
  Chart_Title: string;
  Data: Section3_0_A_Row[];
}

export interface Section3_0_B_Row {
  Issuer_Type: string;
  Percentage: number | null;
}

export interface Section3_0_B {
  Section_Title: string;
  Chart_Title: string;
  Data: Section3_0_B_Row[];
}

export interface Section3_0_C_Row {
  Year: string;
  Number_of_Transactions: number | null;
  Accumulated_Value_MXN_MM: number | null;
}

export interface Section3_0_C {
  Section_Title: string;
  Chart_Title: string;
  Data: Section3_0_C_Row[];
}

export interface Section3_0_D_Row {
  Year: string;
  Number_of_Transactions: number | null;
  Accumulated_Value_MXN_MM: number | null;
}

export interface Section3_0_D {
  Section_Title: string;
  Chart_Title: string;
  Data: Section3_0_D_Row[];
}

export interface Section3_1_Row {
  Instrument_Type: string;
  Ticker: string;
  Series: string;
  Placement_Type: string;
  Payment_Date: string;
  Shares_Issued_MM: number | null;
  Placement_Price_MXN: number | null;
  Amount_Placed_MXN_MM: number | null;
}

export interface Section3_1 {
  Section_Title: string;
  Data: Section3_1_Row[];
}

export interface Section4_0 {
  Section_Title: string;
  Legal_Notice_Content: string;
}

export interface ReportData {
  '0_1': Section0_1;
  '0_2_A': Section0_2_A;
  '0_2_B': Section0_2_B;
  '0_3_A': Section0_3_A;
  '0_3_B': Section0_3_B;
  '1_0_A': Section1_0_A;
  '1_0_B': Section1_0_B;
  '1_1': Section1_1;
  '2_0_A': Section2_0_A;
  '2_0_B': Section2_0_B;
  '2_0_C': Section2_0_C;
  '2_0_D': Section2_0_D;
  '2_1': Section2_1;
  '3_0_A': Section3_0_A;
  '3_0_B': Section3_0_B;
  '3_0_C': Section3_0_C;
  '3_0_D': Section3_0_D;
  '3_1': Section3_1;
  '4_0': Section4_0;
}
