import axios from "axios";


const fetchImageDevice = async (urlImage) => {
    try {
        const response = await axios.get(urlImage, { responseType: 'arraybuffer' });
        const result = Buffer.from(response.data, 'binary')
        return result;
        
    } catch (error) {
        console.log(error);
    }
}


export default {
    fetchImageDevice
}

