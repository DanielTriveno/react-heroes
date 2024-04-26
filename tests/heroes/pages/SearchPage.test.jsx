import { fireEvent, render, screen} from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en <SearchPage> ', () => { 

    beforeEach( () => jest.clearAllMocks() );
        
    test('Debe de mostrarse correctamente con valores por defecto', () => { 

        const { container } = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );
        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar a Batman y el input con el valordelqueryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        expect( input ).toHaveValue('Batman');

        const img = screen.getByRole('img');
        expect( img ).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.qetByLabelText('alert-danger');
        expect( alert.style.display ).toBe('none');
    });
    
    test('Debe de mostrar un error si no se encuentra el heroe', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const alert = screen.qetByLabelText('alert-danger');
        expect( alert.style.display ).toBe('');
    });

    test( 'Debe de llamar el navigate a la pantalla nueva', () => { 

        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText',value: inputValue} });

        const form = screen.getByRole('form');
        fireEvent.submit( form ); 

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);

    });




}); 