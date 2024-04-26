import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js';

// req - lo que enviamos : res - lo que express nos responde

const promiseDB = [];

promiseDB.push( Viaje.findAll({ limit: 3 }) )
promiseDB.push( Testimonial.findAll({ limit: 3 }))

const paginaInicio = async (req, res) => { 
    // Consultar 3 viajes del modelo Viaje
    try {
        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });

    } catch (error) {
        console.log(error)
    }
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

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
    
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } }) // Va a hacerle un where al que tenga el slug igual al del viaje correspondiente y se lo asignara al resultado 

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
    paginaDetalleViaje,
}