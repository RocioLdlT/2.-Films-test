
import type { AppPrismaClient } from "../../config/db-config.ts"
import { FilmsRepo } from "./films.repo.ts"

describe ('Given a instance of FilmsRepo class', () => {
    // Arrange, en este caso lo he sacado fuera
    const prismaMock = { 
        //Con esto estamos mockeando prisma porque 
        // lo que nos interesa de este test es saber que los getters funciona. 
        // Las inyecciones de dependencias no nos interesan para los test, 
        // por lo que los identificamos con objetos vacíos del tipo que sean (AppPrismaClient).
        // Tengamos en cuenta que es un test unitario, en este caso, es un repo, 
        // asi que hay que preguntarse cuál es la esencia de ese archivo concretamente.
        // En el repo lo importante es comprobar nuestros métodos.
        film: {
            findMany: vitest.fn() //Las funciones vitest por defecto son void, no devuelven nada.
        }
    } as unknown as AppPrismaClient
    const repo = new FilmsRepo(prismaMock)

    describe('When method getAllFilms is called', () => {
        test('Then it return the array of films', async () => {
            // Act
            const films = await repo.getAllFilms()
            // Assert
            expect(films).toEqual([])
        })
    })
})
