import { render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


describe('Pruebas en <SearchPage> ', () => { 
        
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
    


}); 