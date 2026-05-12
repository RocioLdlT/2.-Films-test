
import type { TokenPayload } from '../types/login.ts';
import { AuthService } from './auth.ts';

// Necesitaremos que mockee zod que es quien nos está generando problemas
// para continuar con cada linea de nuestro código en el archivo auth.ts,
// por lo que necesitaremos "desactivar" zod, y esto implicará
// darle una estructura mínima al mock para que ignore lo que debe ignorar.
// En este mock podemos observar, si lo comparamos con nuestro Schema env.ts(en carpeta config),
// usamos object, coerce.number, enum y string, que son las que mockeamos.
// No hará nada, nos permitirá que el Schema de zod se desactivado PARA ESTE TEST.

// vitest.mock('zod', () => {
//     return{
//         object: vitest.fn().mockResolvedValue({
//             parse: vitest.fn().mockRejectedValue({
//                 SALT_ROUND
//             })
//         }),
//         coerce: {
//             number: vitest.fn(),
//         },
//         enum: vitest.fn(),
//         string: vitest.fn().mockReturnValue({
//             optional:  vitest.fn(),
//             min: vitest.fn()

//         })
//     }
// })

// En este caso querremos testear cada método de la clase AuthService:
describe('Given method hash from class AuthService', () => {
    describe('When it is executed', () => {
        test('Then return a string', async () => {
            // Es buena practica de principiante, para ubicarnos, comenzar por el Act,
            // llamando al método, que posteriormente lo guardaremos en una constante (hash)
            // Arrange
            const password = '123456'; // Veremos que en el método hash tendremos el parámetro password
            // Act
            const hash = await AuthService.hash(password);
            // Assert
            expect(hash).toBeTypeOf('string'); //
            expect(hash.length).toBeGreaterThan(password.length);
        });
    });
});
describe('Given method compare from class AuthService', () => {
    describe('When it is executed with a valid password', () => {
        test('Then it will return true', async () => {
            // Arrange
            const password = '123456';
            const hash = await AuthService.hash(password);
            // Act
            const result = await AuthService.compare(password, hash);
            // Assert
            expect(result).toBe(true);
        });
    });
    describe('When it is executed with a not valid password', () => {
        test('Then it will return false', async () => {
            // Arrange
            const password = 'Cualquier otra cosa';
            const hash = await AuthService.hash(password);
            // Act
            const result = await AuthService.compare(password, hash);
            // Assert
            expect(result).toBe(false);
        });
    });
});
describe('Given method generateToken from class AuthService', () => {
    describe('When it is executed', () => {
        test('Then ir will return a token (string)', () => {
        // Arrange
        const payloadMock = {} as TokenPayload 
        //Lo llamamos payloadMock (payload) del método generateToken para que se sobreentienda que,
        // en este caso, veamos que está realizando la función de un mock.
        // Solo nos interesa que el test compruebe que nos devuelve un string
        // Act
        const token = AuthService.generateToken(payloadMock) 
        // Assert
        expect(token).toBeTypeOf('string')
    });
    })
  
});
describe('Given method verifyToken from class AuthService', () => {
    describe('When it is executed with valid token', () => {
        test('Then it will return ...', async () => {
        // Arrange
        const payloadMock = {} as TokenPayload
        const token = AuthService.generateToken(payloadMock)
        // Act
        const {iat, ...result} = await AuthService.verifyTokenAsync(token)
        // Assert
        expect(result).toEqual(payloadMock)
        expect(iat).toBeTypeOf('number') //Buscar iat, relación con payload.
    });
    });
      describe('When it is executed with NOT valid token', () => {
        test('Then it will throw an error...', async () => {
        // Arrange
        const badToken = 'no soy un token'

        // Act + Assert (por necesidad)
        expect(() => await AuthService.verifyTokenAsync(badToken)).rejects.toThrow();
    
    });
    })
    
});
