import type { Request, Response, NextFunction } from "express";
import { customHeaders } from "./custom-headers.ts";

describe('Given ', () => {


const project: string;
const req: Request;
const res: Response;
const next: NextFunction;

    beforeEach(() => { 
        customHeaders = {
            setHeader: vi.fn().mockRejectedValue(project)
        }
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


