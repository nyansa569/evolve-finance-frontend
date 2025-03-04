// import { TDocumentDefinitions } from 'pdfmake/interfaces';
// import pdfMake from 'pdfmake/build/pdfmake';  // Import pdfMake correctly
// import pdfFonts from 'pdfmake/build/vfs_fonts';  // Import fonts correctly

// // Define the function to generate the PDF
// const generateInvoicePDF = (invoiceData: any) => {
//   // Assign the fonts to pdfMake.vfs
//   pdfMake.vfs = pdfFonts.pdfMake.vfs;

//   const {
//     invoiceId,
//     customerId,
//     staffId,
//     companyName,
//     productList,
//     subtotal,
//     taxAmount,
//     transactionFee,
//     platformFee,
//     totalAmount,
//     paymentStatus,
//     status,
//     paymentMethod,
//     receiptReference,
//     createdAt,
//     updatedAt,
//   } = invoiceData;

//   // Define document content
//   const documentDefinition: TDocumentDefinitions = {
//     content: [
//       {
//         text: `Invoice #${invoiceId}`,
//         style: 'header',
//       },
//       {
//         text: `Issued to: ${companyName}`,
//         style: 'subheader',
//       },
//       {
//         text: `Customer ID: ${customerId}`,
//         style: 'normal',
//       },
//       {
//         text: `Staff ID: ${staffId}`,
//         style: 'normal',
//       },
//       {
//         text: `Receipt Reference: ${receiptReference}`,
//         style: 'normal',
//       },
//       {
//         text: `Payment Method: ${paymentMethod}`,
//         style: 'normal',
//       },
//       {
//         text: `Payment Status: ${paymentStatus}`,
//         style: 'normal',
//       },
//       {
//         text: `Invoice Status: ${status}`,
//         style: 'normal',
//       },
//       {
//         text: `Created At: ${createdAt}`,
//         style: 'normal',
//       },
//       {
//         text: `Updated At: ${updatedAt}`,
//         style: 'normal',
//       },
//       {
//         text: 'Product List:',
//         style: 'subheader',
//       },
//       {
//         style: 'table',
//         table: {
//           headerRows: 1,
//           widths: ['*', 'auto', 'auto', 'auto'],
//           body: [
//             ['Product Name', 'Quantity', 'Unit Price', 'Total'],
//             ...productList.map((product:any) => [
//               product.name,
//               product.quantity,
//               product.price,
//               (product.quantity * product.price).toFixed(2),
//             ]),
//           ],
//         },
//       },
//       {
//         text: `Subtotal: $${subtotal.toFixed(2)}`,
//         style: 'normal',
//       },
//       {
//         text: `Tax Amount: $${taxAmount.toFixed(2)}`,
//         style: 'normal',
//       },
//       {
//         text: `Transaction Fee: $${transactionFee.toFixed(2)}`,
//         style: 'normal',
//       },
//       {
//         text: `Platform Fee: $${platformFee.toFixed(2)}`,
//         style: 'normal',
//       },
//       {
//         text: `Total Amount: $${totalAmount.toFixed(2)}`,
//         style: 'normal',
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         marginBottom: 10,
//       },
//       subheader: {
//         fontSize: 14,
//         bold: true,
//         marginTop: 10,
//         marginBottom: 5,
//       },
//       normal: {
//         fontSize: 12,
//         marginBottom: 5,
//       },
//       table: {
//         fontSize: 10,
//         marginTop: 10,
//       },
//     },
//   };

//   // Generate the PDF
//   pdfMake.createPdf(documentDefinition).download(`Invoice_${invoiceId}.pdf`);
// };

// // Example usage:
// const invoiceData = {
//   _id: "123",
//   invoiceId: "INV001",
//   customerId: "C001",
//   staffId: "S001",
//   companyName: "ABC Corp",
//   productList: [
//     { name: 'Product 1', quantity: 2, price: 50 },
//     { name: 'Product 2', quantity: 1, price: 100 },
//   ],
//   subtotal: 200,
//   taxAmount: 20,
//   transactionFee: 5,
//   platformFee: 10,
//   totalAmount: 235,
//   paymentStatus: 'Completed',
//   status: 'Completed',
//   paymentMethod: 'Credit Card',
//   receiptReference: 'RC123',
//   createdAt: '2025-02-15 10:30',
//   updatedAt: '2025-02-15 12:00',
// };

// generateInvoicePDF(invoiceData);
