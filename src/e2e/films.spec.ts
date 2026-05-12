import { createApp } from '../app.ts';
import { connectDB } from '../config/db-config.ts';
import { seed } from '../config/db-test.seed.ts';
import { env } from '../config/env.ts';
import request from 'supertest'

describe('Given routes Films', async () => {

    const prisma = await connectDB();
    const app = createApp(prisma);
    await seed();
    const urlBase =
    test('Valid DB in environment', () =>{
    expect(env.PGDATABASE).toBe('film_db_test'); //Comprobación de que estamos en la base de datos correcta
    })
    test('[GET]/api/films', async () => {
        const response =await request(app).get(urlBase).expect(200);
        expect(response.body).toBeInstanceOf(Array)
    });
      test('[GET]/api/films/1', async () => {
        const response = await request(app).get(urlBase + '/1').expect(201)
        expect(response.body).toBe(1)
// 
    });
  test('[GET]/api/films/100', async () => {
        await request(app).get(urlBase + '/100').expect(404)
    });
   
    
});
