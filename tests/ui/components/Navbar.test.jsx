import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar/>', () => { 

    const contextValue = {
        logged: true,
        user: {
            name: 'Daniel Huber'
        },
        logout: jest.fn()
    }
    
    beforeEach( () => jest.clearAllMocks() );


    test('Debe de mostrar el nombre del usuario', () => { 
    
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>

        );
        //screen.debug();
        expect( screen.getByText('Daniel Huber') ).toBeTruthy();
    });

    test('Debe de llamar el logout y navigate cuando se hace click en el boton ', () => { 
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>

        );

        const logoutButton = screen.getByRole('button');
        fireEvent.click( logoutButton );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true });
    });

});



