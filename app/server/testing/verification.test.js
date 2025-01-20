import cryptoUtils from "../src/utils/cryptoUtils";
import nodemailerUtils from "../src/utils/nodemailerUtils";

describe('test function sendVerificationCode', () => {
    test('seharusnya mengirimkan pesan yang berisi kode lewat gmail', async () => {
        const code = cryptoUtils.generateVerificationCode();
        const result = await nodemailerUtils.sendVerificationCode({code, to : "wahyudi009922@gmail.com"});
    });
});


