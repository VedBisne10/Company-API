const express = require("express");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const companies = [
    {
        id: 1,
        name: "ABC Technologies",
        city: "Pune"
    },
    {
        id: 2,
        name: "XYZ Solutions",
        city: "Mumbai"
    },
    {
        id: 3,
        name: "Tech World",
        city: "Hyderabad"
    }
];

app.get("/api/companies", (req, res) =>{
    res.json(companies);
});

app.get("/api/companies/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const company = companies.find(
        company => company.id === id
    );

    if (!company) {
        return res.status(404).json({
            message: "Company not found"
        });
    }

    res.json(company);
});

app.post("/api/companies", (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) {
        return res.status(400).json({
            message: "Name and city are required"
        });
    }

    const newId = companies.length > 0
        ? companies[companies.length - 1].id + 1
        : 1;

    const newCompany = {
        id: newId,
        name: name,
        city: city
    };

    companies.push(newCompany);
    
    res.status(201).json(newCompany);
});

app.put("/api/companies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const { name, city } = req.body;

    if (!name || !city) {
        return res.status(400).json({
            message: "Name and city are required"
        });
    }

    const company = companies.find(
        company => company.id === id
    );

    if (!company) {
        return res.status(404).json({
            message: "Company not found"
        });
    }

    company.name = name;
    company.city = city;

    res.status(200).json(company);
});

app.delete("/api/companies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const index = companies.findIndex(
        company => company.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Company not found"
        });
    }

    const deletedCompany = companies.splice(index, 1);
    
    res.json({
        message: "Company deleted successfully",
        company: deletedCompany[0]
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000: http://localhost:3000");
});


