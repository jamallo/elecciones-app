package com.elecciones.backend.config;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.candidato.repositorio.CandidatoRepositorio;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.evento.repositorio.EventoRepositorio;
import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import com.elecciones.backend.municipio.repositorio.MunicipioRepositorio;
import com.elecciones.backend.partido.modelo.entidad.InformacionPartido;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.InformacionPartidoRepositorio;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import com.elecciones.backend.resultado.modelo.entidad.ResultadoAnterior;
import com.elecciones.backend.resultado.repositorio.ResultadoRepositorio;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import com.elecciones.backend.sede.repositorio.SedeRepositorio;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CargadorDatosIniciales implements CommandLineRunner {

    private final MunicipioRepositorio municipioRepositorio;
    private final EleccionRepositorio eleccionRepositorio;
    private final PartidoRepositorio partidoRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final InformacionPartidoRepositorio informacionPartidoRepositorio;
    private final CandidatoRepositorio candidatoRepositorio;
    private final EventoRepositorio eventoRepositorio;
    private final SedeRepositorio sedeRepositorio;
    private final ResultadoRepositorio resultadoRepositorio;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        //Solo cargar si no hay datos
        if (municipioRepositorio.count() > 0) {
            System.out.println("Ya existen datos en la base de datos. No se cargarán datos iniciales.");
            return;
        }

        System.out.println("Cargando datos iniciales...");

        // MUNICIPIOS
        Municipio oviedo = new Municipio();
        oviedo.setNombre("Oviedo");
        oviedo.setProvincia("Asturias");
        oviedo.setComunidadAutonoma("Asturias");
        oviedo.setLatitud(43.3619);
        oviedo.setLongitud(-5.8494);
        oviedo.setPoblacion(220000);
        oviedo.setColorPrimario("#00236C");
        oviedo.setColorSecundario("#1985FF");
        oviedo.setColorAcento("#00A86B");
        oviedo.setColorFondo("#F0F7FF");
        municipioRepositorio.save(oviedo);
        System.out.println("Municipio creado: Oviedo");

        // ELECCIONES
        Eleccion municipal = new Eleccion();
        municipal.setTipo("MUNICIPAL");
        municipal.setAmbito("Oviedo");
        municipal.setAnio(2027);
        eleccionRepositorio.save(municipal);

        Eleccion autonomica = new Eleccion();
        autonomica.setTipo("AUTONOMICA");
        autonomica.setAmbito("Asturias");
        autonomica.setAnio(2027);
        eleccionRepositorio.save(autonomica);

        Eleccion nacional = new Eleccion();
        nacional.setTipo("NACIONAL");
        nacional.setAmbito("ESPAÑA");
        nacional.setAnio(2027);
        eleccionRepositorio.save(nacional);

        System.out.println("Elecciones creadas");

        // PARTIDOS

        Partido pp = new Partido();
        pp.setNombre("Partido Popular");
        pp.setSiglas("PP");
        pp.setLogoUrl("/assets/partidos/pp.png");
        pp.setColorPrimario("#1E88E5");
        pp.setColorSecundario("#0D47A1");
        pp.setColorAcento("#42A5F5");
        pp.setColorFondo("#E3F2FD");
        partidoRepositorio.save(pp);

        Partido psoe = new Partido();
        psoe.setNombre("Partido Socialista Obrero Español");
        psoe.setSiglas("PSOE");
        psoe.setLogoUrl("/assets/partidos/psoe.png");
        psoe.setColorPrimario("#E63946");
        psoe.setColorSecundario("#C1121F");
        psoe.setColorAcento("#FF6B6B");
        psoe.setColorFondo("#FFEBEE");
        partidoRepositorio.save(psoe);

        Partido vox = new Partido();
        vox.setNombre("Vox");
        vox.setSiglas("VOX");
        vox.setLogoUrl("/assets/partidos/vox.png");
        vox.setColorPrimario("#2E7D32");
        vox.setColorSecundario("#1B5E20");
        vox.setColorAcento("#66BB6A");
        vox.setColorFondo("#E8F5E9");
        partidoRepositorio.save(vox);

        Partido sumar = new Partido();
        sumar.setNombre("Sumar");
        sumar.setSiglas("SUMAR");
        sumar.setLogoUrl("/assets/partidos/sumar.png");
        sumar.setColorPrimario("#FF9800");
        sumar.setColorSecundario("#E65100");
        sumar.setColorAcento("#FFB74D");
        sumar.setColorFondo("#FFF3E0");
        partidoRepositorio.save(sumar);

        System.out.println("Partidos base creados");

        // PARTIDOS-ELECCIÓN PARA OVIEDO
        PartidoEleccion ppOviedo = new PartidoEleccion();
        ppOviedo.setPartido(pp);
        ppOviedo.setEleccion(municipal);
        partidoEleccionRepositorio.save(ppOviedo);

        PartidoEleccion psoeOviedo = new PartidoEleccion();
        psoeOviedo.setPartido(psoe);
        psoeOviedo.setEleccion(municipal);
        partidoEleccionRepositorio.save(psoeOviedo);

        PartidoEleccion voxOviedo = new PartidoEleccion();
        voxOviedo.setPartido(vox);
        voxOviedo.setEleccion(municipal);
        partidoEleccionRepositorio.save(voxOviedo);

        PartidoEleccion sumarOviedo = new PartidoEleccion();
        sumarOviedo.setPartido(sumar);
        sumarOviedo.setEleccion(municipal);
        partidoEleccionRepositorio.save(sumarOviedo);

        System.out.println("Relaciones partido-elección creadas");

        //INFORMACIÓN ESPECÍFICA POR ELECCIÓN
        InformacionPartido infoPpOviedo = new InformacionPartido();
        infoPpOviedo.setHistoriaResumen("Partido Popular en Oviedo. Centro-derecha.");
        infoPpOviedo.setHistoriaCompleta("Historia completa del PP en Oviedo...");
        infoPpOviedo.setProgramaResumen("Programa para Oviedo: empleo, infraestructuras, bajada de impuestos.");
        infoPpOviedo.setProgramaCompleto("Programa completo para Oviedo...");
        infoPpOviedo.setEmailContacto("oviedo@pp.es");
        infoPpOviedo.setTelefonoContacto("985123456");
        infoPpOviedo.setWebUrl("https://www.pp.es/oviedo");
        infoPpOviedo.setPartidoEleccion(ppOviedo);
        informacionPartidoRepositorio.save(infoPpOviedo);
        ppOviedo.setInformacion(infoPpOviedo);
        partidoEleccionRepositorio.save(ppOviedo);

        /*//PARTIDOS PARA ASTURIAS
        List<Partido> partidosAsturias = crearPartidosAutonomicas(autonomica);
        partidoRepositorio.saveAll(partidosAsturias);

        // PARTIDOS ESPAÑA
        List<Partido> partidoEspania = crearPartidosNacionales(nacional);
        partidoRepositorio.saveAll(partidoEspania);

        System.out.println("Partidos creados");*/

        //CANDIDATOS
        Candidato cabezaPp = new Candidato();
        cabezaPp.setNombre("Alfonso González");
        cabezaPp.setCargo("Cabeza de lista");
        cabezaPp.setFotoUrl("/assets/candidatos/pp-cabeza.png");
        cabezaPp.setBiografia("Experiencia política y profesional destacada.");
        cabezaPp.setPosicionLista(1);
        cabezaPp.setPartidoEleccion(ppOviedo);
        candidatoRepositorio.save(cabezaPp);

        Candidato numero2Pp = new Candidato();
        numero2Pp.setNombre("Elena López");
        numero2Pp.setCargo("Número 2");
        numero2Pp.setFotoUrl("/assets/candidatos/pp-numero2.png");
        numero2Pp.setBiografia("Comprometida con los valores del partido.");
        numero2Pp.setPosicionLista(2);
        numero2Pp.setPartidoEleccion(ppOviedo);
        candidatoRepositorio.save(numero2Pp);

        System.out.println("Candidatos creados");

        //EVENTOS
        Evento mitinPp = new Evento();
        mitinPp.setTitulo("Mitin electoral del Partido Popular");
        mitinPp.setDescripcion("Presentación de propuestas y encuentro con ciudadanos.");
        mitinPp.setFecha(LocalDateTime.now().plusDays(15));
        mitinPp.setLugar("Plaza Mayor, Oviedo");
        mitinPp.setTipo("MITIN");
        mitinPp.setPartidoEleccion(ppOviedo);
        eventoRepositorio.save(mitinPp);

        System.out.println("Eventos creados");

        //SEDES
        Sede sedePp = new Sede();
        sedePp.setNombre("Sede del Partido Popular en Oviedo");
        sedePp.setDireccion("Calle Uría 12, Oviedo");
        sedePp.setLatitud(43.3625);
        sedePp.setLongitud(-5.8480);
        sedePp.setTipo("SEDE_PARTIDO");
        sedePp.setMunicipio("Oviedo");
        sedePp.setPartidoEleccion(ppOviedo);
        sedeRepositorio.save(sedePp);

        //COLEGIOS ELECTORALES
        Sede colegio1 = new Sede();
        colegio1.setNombre("C.P. La Corredoria");
        colegio1.setDireccion("Calle de los Prados, Oviedo");
        colegio1.setLatitud(43.3720);
        colegio1.setLongitud(-5.8380);
        colegio1.setTipo("COLEGIO_ELECTORAL");
        colegio1.setMunicipio("Oviedo");
        sedeRepositorio.save(colegio1);

        System.out.println("Sedes creadas");

        // RESULTADOS ANTERIORES
        ResultadoAnterior resultado2019 = new ResultadoAnterior();
        resultado2019.setAnio(2019);
        resultado2019.setPartidoNombre("PP");
        resultado2019.setVotos(35000);
        resultado2019.setPorcentaje(32.5);
        resultado2019.setConcejales(12);
        resultado2019.setEleccion(municipal);
        resultadoRepositorio.save(resultado2019);

        System.out.println("Resultados anteriores creados");
        System.out.println("Datos iniciales cargados correctamente!");
    }

    /*private List<Partido> crearPartidosMunicipales(Eleccion eleccion) {
        return Arrays.asList(
                crearPartido("Partido Popular",
                        "PP",
                        "logo-pp.png",
                        "#1E88E5",
                        "#0D47A1",
                        "#42A5F5",
                        "#E3F2FD",
                        eleccion,
                        "Partido de centro-derecha fundado en 1989. Defiende la economía de mercado y la unidad de España.",
                        "Programa: más empleo, mejores servicios públicos, bajada de impuestos"),
                crearPartido("Partido Socialista Obrero Español",
                        "PSOE",
                        "logo-psoe.png",
                        "#E63946",
                        "#C1121F",
                        "#FF6B6B",
                        "#FFEBEE",
                        eleccion,
                        "Partido de centro-izquierda fundado en 1879. Defiende la justicia social y el estado del bienestar.",
                        "Programa: Sanidad pública, educación gratuita, políticas sociales."),
                crearPartido("Vox", "VOX",
                        "logo-vox.png",
                        "#2E7D32",
                        "#2E7D32",
                        "#2E7D32",
                        "#2E7D32",
                        eleccion,
                        "Partido de derecha conservadora. Defiende la identidad nacional y políticas migratorias restrictivas.",
                        "Programa: Seguridad, reforma del estado, bajada de impuestos."),
                crearPartido("Sumar", "SUMAR",
                        "logo-sumar.png",
                        "#FF9800",
                        "#FF9800",
                        "#FF9800",
                        "#FF9800",
                        eleccion,
                        "Plataforma progresista. Apuesta por la ecología, feminismo y derechos sociales.",
                        "Programa: Transición ecológica, igualdad, vivienda digna.")
        );
    }

    private List<Partido> crearPartidosAutonomicas(Eleccion eleccion) {
        return Arrays.asList(
                crearPartido("Foro Asturias",
                        "FORO",
                        "logo-foro.png",
                        "#9C27B0",
                        "#9C27B0",
                        "#9C27B0",
                        "#9C27B0",
                        eleccion,
                        "Partido regionalista asturiano. Defiende los intereses de Asturias.",
                        "Programa: Desarrollo rural, industrialización, protección del patrimonio asturiano."),
                crearPartido("Partido Popular", "PP",
                        "logo-pp.png",
                        "#1E88E5",
                        "#1E88E5",
                        "#1E88E5",
                        "#1E88E5",
                        eleccion,
                        "Partido de centro-derecha. Apuesta por el desarrollo económico de Asturias.",
                        "Programa: Empleo, infraestructuras, apoyo al sector primario."),
                crearPartido("PSOE Asturias", "PSOE",
                        "logo-psoe.png",
                        "#E63946",
                        "#E63946",
                        "#E63946",
                        "#E63946",
                        eleccion,
                        "Federación asturiana del PSOE. Defiende el estado de bienestar en la región.",
                        "Programa: sanidad, educación, políticas sociales en Asturias"),
                crearPartido("Podemos Asturias", "PODEMOS",
                        "logo-podemos.png",
                        "#7B1FA2",
                        "#7B1FA2",
                        "#7B1FA2",
                        "#7B1FA2",
                        eleccion,
                        "Partido de izquierda. Apuesta por la participación ciudadana y derechos sociales.",
                        "Programa: renta básica, transición energética, vivienda pública.")
        );
    }

    private List<Partido> crearPartidosNacionales(Eleccion eleccion) {
        return Arrays.asList(
                crearPartido("Partido Popular", "PP",
                        "logo-pp.png",
                        "#1E88E5",
                        "#1E88E5",
                        "#1E88E5",
                        "#1E88E5",
                        eleccion,
                        "Partido de centro-derecha. Líder de la oposición",
                        "Programa: reformas estructurales, bajada de impuestos, fortalecimiento de la economía."),
                crearPartido("PSOE", "PSOE",
                        "logo-psoe.png",
                        "#E63946",
                        "#E63946",
                        "#E63946",
                        "#E63946",
                        eleccion,
                        "Partido de centro-izquierda. En el gobierno actualmente.",
                        "Programa: escudo social, transición ecológica, igualdad de género."),
                crearPartido("Vox", "VOX",
                        "logo-vox.png",
                        "#2E7D32",
                        "#2E7D32",
                        "#2E7D32",
                        "#2E7D32",
                        eleccion,
                        "Partido de derecha conservadora. Tercera fuerza política.",
                        "Programa: seguridad, unidad nacional, reforma del estado."),
                crearPartido("Sumar", "SUMAR",
                        "logo-sumar.png",
                        "#FF9800",
                        "#FF9800",
                        "#FF9800",
                        "#FF9800",
                        eleccion,
                        "Plataforma de izquierdas. Apuesta por políticas verdes y feministas.",
                        "Programa: Pacto verde, trabajo digno, ciudado del medio ambiente."),
                crearPartido("Podemos", "PODEMOS",
                        "logo-podemos.png",
                        "#7B1FA2",
                        "#7B1FA2",
                        "#7B1FA2",
                        "#7B1FA2",
                        eleccion,
                        "Partido de izquierda. Enfocado en derechos sociales y participación ciudadana.",
                        "Programa: renta garantizada, vivienda social, soberanía energética.")
        );
    }

    private Partido crearPartido(String nombre,
                                 String siglas,
                                 String logoUrl,
                                 String colorPrimario,
                                 String colorSecundario,
                                 String colorAcento,
                                 String colorFondo,
                                 Eleccion eleccion,
                                 String historiaResumen,
                                 String programaResumen) {

        Partido partido = new Partido();
        partido.setNombre(nombre);
        partido.setSiglas(siglas);
        partido.setLogoUrl(logoUrl);
        partido.setColorPrimario(colorPrimario);
        partido.setColorSecundario(colorSecundario);
        partido.setColorAcento(colorAcento);
        partido.setColorFondo(colorFondo);
        partido.setEleccion(eleccion);

        InformacionPartido info = new InformacionPartido();
        info.setHistoriaResumen(historiaResumen);
        info.setHistoriaCompleta(historiaResumen + " " + historiaResumen + " (versión extendida).");
        info.setProgramaResumen(programaResumen);
        info.setProgramaCompleto(programaResumen + " " + programaResumen + " (versión extendida).");
        info.setEmailContacto("contacto@" + siglas.toLowerCase() + ".es");
        info.setTelefonoContacto("900" + (int)(Math.random()*900000 + 100000));
        info.setWebUrl("https://www." + siglas.toLowerCase() + ".es");
        info.setPartido(partido);

        partido.setInformacion(info);
        return partido;
    }

    private List<Candidato> crearCandidatos(List<Partido> partidos) {
        List<Candidato> candidatos = new java.util.ArrayList<>();

        for (Partido partido : partidos) {
            //Cabeza de lista
            Candidato cabeza = new Candidato();
            cabeza.setNombre(partido.getSiglas().equals("PP") ? "Alfonso González" :
                    partido.getSiglas().equals("PSOE") ? "María Fernández" :
                    partido.getSiglas().equals("VOX") ? "Carlos Rodríguez" :
                    partido.getSiglas().equals("SUMAR") ? "Laura Martínez" :
                    "Javier García");
            cabeza.setCargo("Cabeza de lista");
            cabeza.setFotoUrl("candidato-" + partido.getSiglas().toLowerCase() + ".png");
            cabeza.setBiografia("Experiencia política y profesional destacada.");
            cabeza.setPosicionLista(1);
            cabeza.setPartido(partido);
            candidatos.add(cabeza);

            //Número 2
            Candidato numero2 = new Candidato();
            numero2.setNombre(partido.getSiglas().equals("PP") ? "Elena López" :
                    partido.getSiglas().equals("PSOE") ? "José Manuel" :
                    partido.getSiglas().equals("VOX") ? "Ana Pérez" :
                    partido.getSiglas().equals("SUMAR") ? "David Sánchez" :
                    "Marta Ruiz");
            numero2.setCargo("Numero 2");
            numero2.setFotoUrl("candidato2-" + partido.getSiglas().toLowerCase() + ".png");
            numero2.setBiografia("Comprometido con los valores del partido.");
            numero2.setPosicionLista(2);
            numero2.setPartido(partido);
            candidatos.add(numero2);
        }
        return candidatos;
    }

    private List<Evento> crearEventos(List<Partido> partidos) {
        List<Evento> eventos = new ArrayList<>();

        for (Partido partido : partidos) {
            Evento mitin = new Evento();
            mitin.setTitulo("Mitin electoral de " + partido.getNombre());
            mitin.setDescripcion("Presentación de propuesta y encuentro con ciudadanos.");
            mitin.setFecha(LocalDateTime.now().plusDays(15));
            mitin.setLugar("Plaza Mayor, Oviedo");
            mitin.setTipo("MITIN");
            mitin.setPartido(partido);
            eventos.add(mitin);

            Evento ruedaPrensa = new Evento();
            ruedaPrensa.setTitulo("Rueda de prensa - Presentación de programa");
            ruedaPrensa.setDescripcion("Presentación oficial del programa electoral.");
            ruedaPrensa.setFecha(LocalDateTime.now().plusDays(7));
            ruedaPrensa.setLugar("Hotel de la Reconquista, Oviedo");
            ruedaPrensa.setTipo("RUEDA_PRENSA");
            ruedaPrensa.setPartido(partido);
            eventos.add(ruedaPrensa);
        }

        return eventos;
    }

    private List<Sede> crearSedes(Municipio municipio, List<Partido> partidos) {
        List<Sede> sedes = new ArrayList<>();

        // Colegios electorales
        String[] colegios = {"C.P. La Corredoria",
                "IES Alfonso II",
                "Colegio San ignacio",
                "Centro Cultural Laboral",
                "Facultad de Derecho"};
        double[] longitudes = {43.3720, 43.3550, 43.3580, 43.3680, 43.3625};
        double[] latitudes = {-5.8380, -5.8550, -5.8510, -5.8480, -5.8520};

        for (int i = 0; i < colegios.length; i++) {
            Sede colegio = new Sede();
            colegio.setNombre(colegios[i]);
            colegio.setDireccion("Calle" + colegios[i]);
            colegio.setLatitud(latitudes[i]);
            colegio.setLongitud(longitudes[i]);
            colegio.setTipo("COLEGIO_ELECTORAL");
            colegio.setMunicipio(municipio.getNombre());
            sedes.add(colegio);
        }

        //SEDES PARTIDOS
        String[] direcciones = {"Calle Uría 12",
                "Calle de la Independencia 5",
                "Avenida de Galicia 20",
                "Calle Cervantes 8",
                "Plaza de la Constitución 3"
        };

        for (int i = 0; i < partidos.size() && i < direcciones.length; i++) {
            Sede sede = new Sede();
            sede.setNombre("Sede de " + partidos.get(i).getNombre());
            sede.setDireccion(direcciones[i]);
            sede.setLongitud(-5.8494 + (Math.random() - 0.5) * 0.02);
            sede.setLatitud(43.3619 + (Math.random() - 0.5) * 0.02);
            sede.setTipo("SEDE_PARTIDO");
            sede.setPartido(partidos.get(i));
            sede.setMunicipio(municipio.getNombre());
            sedes.add(sede);
        }
        return sedes;
    }

    private List<ResultadoAnterior> crearResultadosAnteriores(Eleccion eleccion) {
        List<ResultadoAnterior> resultados = new ArrayList<>();

        //Resultados 2019
        resultados.add(crearResultado(2019,
                "PP",
                35000,
                32.5,
                12,
                eleccion));
        resultados.add(crearResultado(2019,
                "PSOE",
                28000,
                26.0,
                9,
                eleccion));
        resultados.add(crearResultado(2019,
                "FORO",
                15000,
                14.0,
                5,
                eleccion));
        resultados.add(crearResultado(2019,
                "PODEMOS",
                12000,
                11.0,
                4,
                eleccion));
        resultados.add(crearResultado(2019,
                "VOX",
                5000,
                4.5,
                0,
                eleccion));

        //Resultados 2015
        resultados.add(crearResultado(2015,
                "PP",
                38000,
                35.2,
                13,
                eleccion));
        resultados.add(crearResultado(2015,
                "PSOE",
                26000,
                24.0,
                8,
                eleccion));
        resultados.add(crearResultado(2015,
                "FORO",
                18000,
                16.7,
                6,
                eleccion));
        resultados.add(crearResultado(2015,
                "PODEMOS",
                15000,
                13.9,
                5,
                eleccion));

        return resultados;
    }

    private ResultadoAnterior crearResultado(Integer anio,
                                             String partidoNombre,
                                             Integer votos,
                                             double porcentaje,
                                             Integer concejales,
                                             Eleccion eleccion) {
        ResultadoAnterior resultado = new ResultadoAnterior();
        resultado.setAnio(anio);
        resultado.setPartidoNombre(partidoNombre);
        resultado.setVotos(votos);
        resultado.setPorcentaje(porcentaje);
        resultado.setConcejales(concejales);
        resultado.setEleccion(eleccion);

        return resultado;
    }*/
}
