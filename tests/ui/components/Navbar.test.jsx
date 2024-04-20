import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../src/ui/components/Navbar";


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
        
    });
    //TODO : 1. Hacer el test de logout y navigate

    test(' ', () => {  




    })

});



