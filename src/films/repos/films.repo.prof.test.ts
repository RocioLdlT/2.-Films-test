import  { type Mock, vi } from 'vitest';
import type { AppPrismaClient } from '../../config/db-config.ts';
import type { FilmCreateDTO, FilmUpdateDTO } from '../entities/film.dto.ts';
import { FilmsRepo } from './films.repo.ts';

describe('Given a instance of FilmsRepo class', () => {
    let repo: FilmsRepo;
    let prismaMock: AppPrismaClient;

    beforeEach(() => {
        prismaMock = {
            film: {
                findMany: vi.fn().mockResolvedValue([]),
                findUniqueOrThrow: vi.fn().mockResolvedValue({}),
                // findUniqueOrThrow: vi
                //     .fn()
                //     .mockImplementation(({ where: { id } }: { where: { id: number } }) => Promise.resolve({ id })),
                create: vi.fn().mockResolvedValue({}),
                update: vi.fn().mockResolvedValue({}),
                delete: vi.fn().mockResolvedValue({}),
            },
        } as unknown as AppPrismaClient;
        repo = new FilmsRepo(prismaMock);
    });

    // En Vitest, recuerda usar vi.clearAllMocks() o mockRestore() en afterEach para evitar que los tests se afecten entre sí.
    afterEach(() => {
        vi.clearAllMocks();
    });

    // Arrange

    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            // Act & Assert
            expect(repo).toBeDefined();
        });
        test('Then it should be a instance of FilmRepo', () => {
            // Act & Assert
            expect(repo).toBeInstanceOf(FilmsRepo);
        });
    });

    describe('When method getAllFilms is called', () => {
        test('Then it return the array of films', async () => {
            // Act
            const films = await repo.getAllFilms();
            // Assert
            expect(films).toEqual([]);
            // Assert de implementación: espero que prismaMock film findMany sea llamado.
            // Puedo esperar un array de films pero si miramos nuestro código tenemos un this.#prisma.film.findMany,
            // para comprobar que existe éste tiene que ser llamado.
            // Como en en beforeEach hemos hecho que el método findMany esté mockeado y espiado, podemos usar, el método .toHaveBeenCalled
            expect(prismaMock.film.findMany).toHaveBeenCalled();
        });
    });
    describe('When method getFilmByID is called', () => {
        describe('And the film with the given id exists', () => {
            test('Then it return the film', async () => {
                // Act
                const film = await repo.getFilmByID(1);
                // Assert de implementación
                expect(prismaMock.film.findUniqueOrThrow).toHaveBeenCalled()
                // Assert
                expect(film).toEqual({});
            });
        });
        describe('And the film with the given id NOT exists', () => {
            test('Then it throw an error', async () => {
                // Arrange: engañamos a TS indicándole que es un type Mock importado para también usar después .mockRejectedValueOnce
                (prismaMock.film.findUniqueOrThrow as Mock).mockRejectedValueOnce(
                    new Error('Film not found'),
                );
                // Act & Assert: método asíncrono que se usa para un "path non happy".
                await expect(repo.getFilmByID(999)).rejects.toThrow(
                    'Film not found',
                );
            });
        });
    });

    describe('When method createFilm is called', () => {
        test('Then it return the created film', async () => {
            // Act
            const film = await repo.createFilm({
                genres: ['Action'] // Lo ponemos para que le llegue algo de información 
                                    // y no salte en rojo la línea 58 de nuestro código del repo al comprobar el coverage
                // title: 'Test Film',
                // year: 2024,
                // director: 'Test Director',
                // duration: 120,
                // poster: 'test-poster.jpg',
                // rate: 8.5,
                // genres: ['Action', 'Adventure']
            } as FilmCreateDTO);
            // Assert
            expect(film).toEqual({});
        });
    });

    describe('When method updateFilm is called', () => {
        describe('And the film with the given id exists', () => {
            test('Then it return the updated film', async () => {
                // Act
                const film = await repo.updateFilm(1, {
                    // title: 'Updated Test Film',
                    // year: 2025,
                    // director: 'Updated Test Director',
                    // duration: 130,
                    // poster: 'updated-test-poster.jpg',
                    // rate: 9.0,
                    // genres: ['Action', 'Adventure', 'Sci-Fi']
                } as FilmUpdateDTO);
                // Assert
                expect(film).toEqual({});
            });
        });
        describe('And the film with the given id NOT exists', () => {
            test('Then it throw an error', async () => {
                // Arrange
                (prismaMock.film.update as Mock).mockRejectedValueOnce(
                    new Error('Film not found'),
                );
                // Act & Assert
                await expect(
                    repo.updateFilm(999, {} as FilmUpdateDTO),
                ).rejects.toThrow('Film not found');
            });
        });
    });

    describe('When method deleteFilm is called', () => {
        describe('And the film with the given id exists', () => {
            test('Then it return the deleted film', async () => {
                // Act
                const film = await repo.deleteFilm(1);
                // Assert
                expect(film).toEqual({});
            });
        });
        describe('And the film with the given id NOT exists', () => {
            test('Then it throw an error', async () => {
                // Arrange
                (prismaMock.film.delete as Mock).mockRejectedValueOnce(
                    new Error('Film not found'),
                );
                // Act & Assert
                await expect(repo.deleteFilm(999)).rejects.toThrow(
                    'Film not found',
                );
            });
        });
    });
});
