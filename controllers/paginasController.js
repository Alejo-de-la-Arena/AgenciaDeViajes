import e from 'express';
import { Viaje } from '../models/Viaje.js'

const paginaInicio = (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    res.render('inicio', {
        pagina: 'Inicio'
    });
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    // Consultar BD
    const viajes = await Viaje.findAll();
    console.log(viajes)
    

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
};

const paginaTestimoniales = (req, res) => {
    res.render('testimoniales', {
        pagina: 'Testimoniales'
    });
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    
    try {
        const viaje = await Viaje.findOne( { where: { slug } } ) // Va a hacerle un where al que tenga el slug igual al del viaje correspondiente y se lo asignara al resultado 

        res.render('viaje', {
            pagina: 'Información Viaje', 
            viaje
        });

    } catch (error) {
        console.log(error)
    }

}   

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}