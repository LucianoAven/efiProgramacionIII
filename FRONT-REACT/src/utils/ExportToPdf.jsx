import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data, title, columns) => {
  const doc = new jsPDF();
  doc.text(`Lista de ${title}`, 14, 10);

  // Si los datos ya están procesados (son objetos con claves en español), usarlos directamente
  const tableRows = data.map(item => columns.map(col => item[col] || ''));

  autoTable(doc, {
    head: [columns],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 10 },
    headStyles: { fillColor: '#e34529' } // ← AQUÍ se define el color del encabezado
  });

  const fecha = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175); 
  doc.text(`Generado el ${fecha}`, 14, doc.internal.pageSize.height - 20);
  doc.text("Hecho por Luciano Avendaño — 2025", 14, doc.internal.pageSize.height - 14);

  doc.save(`${title}.pdf`);
};
