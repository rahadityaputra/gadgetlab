import { app } from "../src/app";
import supertest from "supertest";
import jwtUtlils from "../src/utils/jwtUtlils";


describe("test post /api/users/logout", ()=> {
    let validToken, notValidToken;
    const key = "Sin#cos#tan123";
    beforeEach(async ()=>{
        // membuat token yang valid
        validToken = await jwtUtlils.createToken({
            payload : {
                username : "rahaditya"
            },
            privateKey : key,
            options : {
                algorithm : "HS256",
                expiresIn : "1h"
            }
        })


    })


    test("seharusnya 200 saat logout dengan token valid", async ()=>{
        const response = await supertest(app).post("/api/users/logout").set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toEqual({
            status : "success",
            message : "logout successfully"
        });
    })


})

