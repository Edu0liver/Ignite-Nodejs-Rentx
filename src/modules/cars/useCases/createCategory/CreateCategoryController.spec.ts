import  request  from "supertest";
import {hash} from "bcrypt"
import { v4 as uuid} from "uuid"
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

describe("Create Category Controller", ()=>{

    let connection: Connection;

    beforeAll(async ()=>{
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();

        const password = hash("admin", 8);

        await connection.query(`
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `);
    })

    afterAll(async ()=>{
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new Category ", async () =>{

        const responseToken = await request(app).post("/sessions").send({
          email: "admin@rentx.com.br",
          password: "admin",
        });
  
        const { refresh_token } = responseToken.body;
  
        const response =  await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(201);
      });

      it("Should not be able to create a new Category with name exists", async () =>{

        const responseToken = await request(app).post("/sessions").send({
          email: "admin@rentx.com.br",
          password: "admin",
        });
  
        const { refresh_token } = responseToken.body;
  
        const response =  await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });
        
        expect(response.status).toBe(400);
      });
})