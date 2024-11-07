import { fireEvent, render, screen } from "@testing-library/react"
import { Navbar } from "../../../src/ui"
import { AuthContext } from "../../../src/auth"
import { MemoryRouter, useNavigate } from "react-router-dom"

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        authState: {
            logged: true,
            user: {
                name: 'pene',
                id: '123'
            }
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrar el nombre del usuario', () => {



        const username = contextValue.authState.user.name

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText(username)).toBeTruthy();
    })

    test('debe de llamar el logout y navigate cuando se hace click al botón', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true})
    })
})