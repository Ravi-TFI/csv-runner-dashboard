# CSV Runner Dashboard

This project is a data visualization dashboard built with Next.js and shadcn/ui. It allows users to upload a CSV file containing running data and view summary metrics and visualizations for all runners combined or on a per-person basis. This was built to fulfill the "CSV Runner Dashboard" take-home challenge requirements.

---

### **Assumptions**

-   **Data is Client-Side Only:** This is a client-side application. The uploaded data and dashboard state are lost upon refreshing the page. This was a deliberate decision to keep the scope focused on the frontend challenge without introducing backend or database complexity.
-   **Strict CSV Structure:** The application expects a clean CSV with the exact headers `date`, `person`, and `miles run`. It does not handle complex CSVs with merged cells or multiple tables.
-   **Standard Date Formats:** The app assumes dates in the CSV are in a format that the standard JavaScript `new Date()` constructor can parse (e.g., `YYYY-MM-DD`, `MM/DD/YYYY`).
-   **Performance:** The application is designed for moderately sized CSVs (up to a few thousand rows). Very large files might impact browser performance, as all processing happens on the client.

---

### **Prerequisites**

-   **Node.js:** v18.x or later
-   **npm** (or pnpm / yarn)

---

### **Setup**

1.  **Clone the repository:**
    ```bash
    # Replace with your repository URL
    git clone https://github.com/Ravi-TFI/csv-runner-dashboard.git
    cd YOUR_REPO_NAME
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    This project does not require any environment variables or a `.env` file to run.

4.  **Seed Data:**
    No database is used, so no seeding is required. A sample CSV file is provided in the `/public` directory for testing.

---

### **Run & Verify**

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

2.  **Verification Checklist (Step-by-step):**

    *   **Sample CSV Location:** A valid CSV file, `sample.csv`, is located in the `/public` folder for easy testing.

    *   **Test Case 1: Valid CSV Upload & Overall View**
        1.  Open the application. You will see the "Upload Your CSV" card.
        2.  Click the upload area and select `/public/sample.csv`.
        3.  **Verify:** The dashboard appears. The four metric cards should display the correct overall values (Total Miles: `36.4`, Average Miles: `6.07`, Max Miles: `9.1`, Total Runs: `6`). The chart and data table should show all 6 entries.

    *   **Test Case 2: Per-Person View**
        1.  With the `sample.csv` data loaded, click the dropdown menu that says "Overall View".
        2.  Select "Alice" from the list.
        3.  **Verify:** The metric cards, chart, and table instantly update to show only Alice's 3 runs (Total Miles: `18.2`, Average Miles: `6.07`, Max Miles: `9.0`, Total Runs: `3`).

    *   **Test Case 3: Invalid CSV (Bad Headers)**
        1.  Refresh the page to reset the application.
        2.  Create a local CSV file with incorrect headers (e.g., `date, name, distance`).
        3.  Upload this new file.
        4.  **Verify:** A red error alert appears with the message: "Invalid headers. Required: date, person, miles run".

    *   **Test Case 4: Invalid CSV (Bad Data)**
        1.  Refresh the page.
        2.  Create a local CSV file with a non-numeric value in the `miles run` column (e.g., `2024-01-01,Dave,five`).
        3.  Upload this file.
        4.  **Verify:** A red error alert appears with the message: "Row 2: 'miles run' must be a positive number."

---

### **Features & Limitations**

#### Features:
-   **Client-side CSV Parsing:** Uses PapaParse for fast and reliable in-browser parsing.
-   **Strict Data Validation:** Validates headers and data types on a row-by-row basis.
-   **Dynamic Dashboard:** Displays summary metrics (total, average, min, max miles).
-   **Interactive Chart:** Visualizes miles run over time using Recharts.
-   **View Filtering:** Seamlessly switch between an "Overall" view and "Per-Person" data.
-   **Detailed Error Handling:** Provides clear, user-friendly error messages for invalid inputs.
-   **Responsive Design:** A clean, mobile-first UI built with shadcn/ui and TailwindCSS.

#### Limitations & Future Improvements:
-   **No Data Persistence:** Data is lost on page refresh. A future improvement would be to store the data in `localStorage` to persist the session.
-   **Single Chart:** Only a line chart is provided. Could add a pie chart for total miles per person or a calendar heatmap of running activity.
-   **No Date Range Filtering:** Cannot filter the data by a specific date range.

---

### **Notes on Architecture**

-   **Folder Structure:** The application code is logically separated. The `lib/` directory contains all core business logic (CSV parsing, metric calculations, type definitions), keeping it decoupled from the UI. The `components/` directory contains all React components.
-   **State Management:** State is managed locally within the main `Dashboard` component using React hooks (`useState`, `useMemo`). This approach was chosen for its simplicity and is highly effective for the scope of this challenge, avoiding the overhead of a larger state management library.
- to-do
-   **Data Flow:** The app follows a clear, unidirectional data flow. The `FileUploader` component passes the uploaded file up to the parent `Dashboard` component. The `Dashboard` then acts as the single source of truth, processing the data and passing the results down as props to its children (`StatCard`, `RunnerChart`, `DataTable`).

---

### **Accessibility & UI**

-   **Accessibility:** The UI is built using `shadcn/ui`, which provides accessible components out of the box (e.g., proper ARIA attributes for `Select` and `Alert`, keyboard navigation). Form inputs like the file uploader are associated with labels and are focusable.
-   **UI Craft:**
    -   **Consistency:** A consistent design system is maintained using TailwindCSS and the `shadcn/ui` theme defined in `globals.css`.
    -   **Spacing & Typography:** Spacing is managed via `gap`, `p-`, and `space-y` utilities for visual consistency. The font hierarchy is clearly defined between titles, descriptions, and body content.
    -   **Responsiveness:** The layout uses a mobile-first approach with responsive grid layouts (`md:grid-cols-2`, `sm:flex-row`) to ensure a seamless experience on all screen sizes.
