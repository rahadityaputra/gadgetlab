import PDFDocument from "pdfkit";
import axiosUtils from "./axiosUtils.js";

const createPdf = async (data) => {
  const doc = new PDFDocument({size : "A4"});

  try {
    doc.fontSize(20).text(data.name, { align: "center" });
    doc.moveDown(1);

    // Gambar
    const img = await axiosUtils.fetchImageDevice(data.img);
    doc.image(img, { 
        fit: [250, 250], 
        align: "center" 
    });
    doc.moveDown(15);

    // Quick Spec Table
    doc.fontSize(16).text("Quick Specifications", { underline: true });
    data.quickSpec.forEach((spec) => {
      doc.fontSize(12).text(`${spec.name}: ${spec.value}`);
    });
    doc.moveDown(1);

    // Detail Spec Table
    data.detailSpec.forEach((category) => {
      doc.fontSize(16).text(category.category, { underline: true });
      category.specifications.forEach((spec) => {
        doc.fontSize(12).text(`${spec.name}: ${spec.value}`);
      });
      doc.moveDown(1);
    });

    doc.end();
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export default {
  createPdf,
};
