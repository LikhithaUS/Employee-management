const request = require("supertest");

const BASE_URL = "http://localhost:5000";

let employeeId;

describe("Employee Management API Testing", () => {

    // =========================
    // GET EMPLOYEES
    // =========================
    test("GET /api/employees", async () => {

        const response = await request(BASE_URL)
            .get("/api/employees");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        console.log("GET Employees:", response.body);
    });


    // =========================
    // POST EMPLOYEE
    // =========================
    test("POST /api/employees", async () => {

        const employee = {
            employeeId: `TEST${Date.now()}`,
            name: "Test Employee",
            department: "Testing",
            position: "QA Engineer",
            salary: 50000,
            email: `test${Date.now()}@gmail.com`
        };

        const response = await request(BASE_URL)
            .post("/api/employees")
            .send(employee);

        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty("_id");

        employeeId = response.body._id;

        console.log("POST Employee:", response.body);
    });


    // =========================
    // PUT EMPLOYEE
    // =========================
    test("PUT /api/employees/:id", async () => {

        expect(employeeId).toBeDefined();

        const response = await request(BASE_URL)
            .put(`/api/employees/${employeeId}`)
            .send({
                name: "Updated Test Employee",
                department: "Development",
                position: "React Developer",
                salary: 60000,
                email: `updated${Date.now()}@gmail.com`
            });

        expect(response.statusCode).toBe(200);

        console.log("PUT Employee:", response.body);
    });


    // =========================
    // DELETE EMPLOYEE
    // =========================
    test("DELETE /api/employees/:id", async () => {

        expect(employeeId).toBeDefined();

        const response = await request(BASE_URL)
            .delete(`/api/employees/${employeeId}`);

        expect(response.statusCode).toBe(200);

        console.log("DELETE Employee:", response.body);
    });

});