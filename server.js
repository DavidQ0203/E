const express = require('express');
const fs = require('fs');
const ExcelJS = require('exceljs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Crear el archivo si no existe
const workbook = new ExcelJS.Workbook();
const filePath = 'suscripciones.xlsx';

if (fs.existsSync(filePath)) {
    workbook.xlsx.readFile(filePath).then(() => {
        console.log('Archivo Excel cargado');
    });
} else {
    const sheet = workbook.addWorksheet('Suscripciones');
    sheet.columns = [
        { header: 'Nombre', key: 'name' },
        { header: 'Email', key: 'email' },
    ];
    workbook.xlsx.writeFile(filePath);
}

app.post('/suscribirse', async (req, res) => {
    const { name, email } = req.body;

    const sheet = workbook.getWorksheet('Suscripciones');
    sheet.addRow({ name, email });
    await workbook.xlsx.writeFile(filePath);

    res.json({ message: 'Datos guardados en Excel' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});