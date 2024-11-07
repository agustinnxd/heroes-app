const { render, screen, fireEvent } = require("@testing-library/react")
const { MemoryRouter, useNavigate } = require("react-router-dom")
const { SearchPage } = require("../../../src/heroes/pages/SearchPage")

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        const img = screen.getByRole('img');
        expect(input.value).toBe('batman')
        expect(img.src).toContain('/assets/heroes/dc-batman')

    })

    test('debe de mostrar un error si no se encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        expect(screen.getByText('No results for')).toBeTruthy()
    })

    test('debe llamar el navigate a la pantalla nueva', () => {

        const inputValue = 'batman'

        render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const searchInput = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.change(searchInput, { target: { name: 'searchText', value: inputValue } });
        fireEvent.submit(form)

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)

    })
})