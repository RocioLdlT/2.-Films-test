import type { Request, Response, NextFunction } from "express";
import type { AuthInterceptor } from "./auth.interceptor.ts";

describe('Given ', () => {

        let req: Request;
        let res: Response;
        let next: NextFunction;
        let authInterceptor: AuthInterceptor;

    beforeEach(() => { 
        req =  {} as Request;
        res = 
        next = 
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            expect(customHeaders).toBeDefined();
        });
        test('',)
    });
    describe('')
})
