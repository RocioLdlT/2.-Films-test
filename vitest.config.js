import { defineConfig } from 'vitest/config'
import {} from './src/config/setup_test.ts'

export default defineConfig ({
    test: {
        // ...specify options here.
    globals: true, // Pon globales todas las configuraciones de vitest para que las importaciones las recoja de vitest y no de node (como estaba sucediendo)
    enviroment : './src/config/setup_test.ts',
    coverage:{}
},
})
