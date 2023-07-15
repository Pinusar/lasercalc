import * as XLSX from "xlsx";

export default function downloadExcel(wsData, cutInsData) {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Results');

    const cutInsSheet = XLSX.utils.aoa_to_sheet(cutInsData);
    XLSX.utils.book_append_sheet(wb, cutInsSheet, 'Cut-ins');

    const wbOptions = { bookType: 'xlsx', type: 'array' };
    const excelData = XLSX.write(wb, wbOptions);
    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'results.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}