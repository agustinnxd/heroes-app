import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => {
    test('debe mostrar el login si no está autenticado', () => {

        const contextValue = {
            authState: {
                logged: false,
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        );

        expect(screen.getAllByText('Login').length).toBeGreaterThan(0);

    })

    test('debe mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            authState: {
                logged: true,
                user: {
                    name: 'Agustin',
                    id: '123'
                }
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Marvel').length).toBeGreaterThan(0);
    })
})