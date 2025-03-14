import React from "react";
import api from "../api/api.js"

const DeviceDetail = ({data}) => {

    console.log(data.detailSpec)
    const {id, name, img, detailSpec} = data;
    const handleDownloadButton = async() => {
      const blob = await api.getPdfFileDetailDevice(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}.pdf`; // Nama file yang akan diunduh
      document.body.appendChild(a);
      a.click(); // Simulasikan klik untuk mendownload file
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Bersihkan URL dari memory
    }
     return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{name}</h1>
        <div className="flex justify-center mb-4">
            <img src={img} alt="Gambar Gadget" className="rounded-lg"/>
        </div>

        <div>
            {detailSpec.map((spec, index) => {
                 return (   
                    <div key={index} className="mt-5">
                        <h1 className="text-center font-bold">{spec.category}</h1>
                         <table className="min-w-full border-collapse border border-gray-300">
                        <tbody>
                            {spec.specifications.map(({name, value}, index) => (
                            <tr key={index} className="border-b">
                                <td className="w-1/4 px-4 py-2 font-semibold border-r bg-gray-100 text-center">{name}</td>
                                <td className="w-1/2 px-4 py-2 text-center">{value}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                   </div>
                    )
                })}
     </div>
        <div className="text-center">
            <button onClick={handleDownloadButton} className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
                Download specifications (PDF)
            </button>
        </div>
      </div>
    )

}


export default DeviceDetail;
