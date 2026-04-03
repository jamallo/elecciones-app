package com.elecciones.backend.config;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.candidato.repositorio.CandidatoRepositorio;
import com.elecciones.backend.comunidad.modelo.entidad.ComunidadAutonoma;
import com.elecciones.backend.comunidad.repositorio.ComunidadRepositorio;
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
import com.elecciones.backend.usuario.modelo.entidad.RolUsuario;
import com.elecciones.backend.usuario.modelo.entidad.Usuario;
import com.elecciones.backend.usuario.repositorio.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final ComunidadRepositorio comunidadRepositorio;
    private final EleccionRepositorio eleccionRepositorio;
    private final PartidoRepositorio partidoRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final InformacionPartidoRepositorio informacionPartidoRepositorio;
    private final CandidatoRepositorio candidatoRepositorio;
    private final EventoRepositorio eventoRepositorio;
    private final SedeRepositorio sedeRepositorio;
    private final ResultadoRepositorio resultadoRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        if (municipioRepositorio.count() > 0) {
            System.out.println("⚠️ Ya existen datos en la base de datos. No se cargarán datos iniciales.");
            return;
        }

        System.out.println("🚀 Cargando datos iniciales...");

        // ========== 1. COMUNIDADES AUTÓNOMAS ==========
        List<ComunidadAutonoma> comunidades = crearComunidades();
        comunidadRepositorio.saveAll(comunidades);
        System.out.println("✅ " + comunidades.size() + " comunidades autónomas creadas");

        // ========== 2. MUNICIPIOS (Asturias como ejemplo) ==========
        ComunidadAutonoma asturias = comunidadRepositorio.findByNombre("Asturias").orElseThrow();
        List<Municipio> municipios = crearMunicipiosAsturias(asturias);
        municipioRepositorio.saveAll(municipios);
        System.out.println("✅ " + municipios.size() + " municipios de Asturias creados");

        // ========== 3. ELECCIONES ==========
        List<Eleccion> elecciones = crearElecciones();
        eleccionRepositorio.saveAll(elecciones);
        System.out.println("✅ Elecciones creadas");

        Eleccion nacional = eleccionRepositorio.findByTipoAndAmbito("NACIONAL", "España").orElseThrow();
        Eleccion asturiasEleccion = eleccionRepositorio.findByTipoAndAmbito("AUTONOMICA", "Asturias").orElseThrow();
        Eleccion oviedoEleccion = eleccionRepositorio.findByTipoAndAmbito("MUNICIPAL", "Oviedo").orElseThrow();

        // ========== 4. PARTIDOS POLÍTICOS ==========
        List<Partido> partidos = crearPartidos();
        partidoRepositorio.saveAll(partidos);
        System.out.println("✅ " + partidos.size() + " partidos creados");

        Partido pp = partidoRepositorio.findBySiglas("PP").orElseThrow();
        Partido psoe = partidoRepositorio.findBySiglas("PSOE").orElseThrow();
        Partido vox = partidoRepositorio.findBySiglas("VOX").orElseThrow();
        Partido sumar = partidoRepositorio.findBySiglas("SUMAR").orElseThrow();
        Partido podemos = partidoRepositorio.findBySiglas("PODEMOS").orElseThrow();

        // ========== 5. RELACIONES PARTIDO-ELECCIÓN ==========
        // Elecciones Nacionales
        crearParticipacion(pp, nacional, "Partido Popular en España",
                "Programa nacional: Empleo, economía, unidad de España",
                "https://www.pp.es", "900123456");
        crearParticipacion(psoe, nacional, "PSOE en España",
                "Programa nacional: Escudo social, transición ecológica",
                "https://www.psoe.es", "900123457");
        crearParticipacion(vox, nacional, "Vox en España",
                "Programa nacional: Seguridad, reforma del estado",
                "https://www.vox.es", "900123458");
        crearParticipacion(sumar, nacional, "Sumar en España",
                "Programa nacional: Pacto verde, trabajo digno",
                "https://www.sumar.es", "900123459");

        // Elecciones Asturias
        crearParticipacion(pp, asturiasEleccion, "PP Asturias",
                "Programa para Asturias: Desarrollo rural, infraestructuras",
                "https://www.ppasturias.es", "985123456");
        crearParticipacion(psoe, asturiasEleccion, "FSA-PSOE",
                "Programa para Asturias: Sanidad, educación, políticas sociales",
                "https://www.psoeasturias.es", "985123457");
        crearParticipacion(vox, asturiasEleccion, "Vox Asturias",
                "Programa para Asturias: Seguridad, bajada de impuestos",
                "https://www.voxasturias.es", "985123458");
        crearParticipacion(podemos, asturiasEleccion, "Podemos Asturias",
                "Programa para Asturias: Renta básica, transición energética",
                "https://www.podemosasturias.es", "985123459");

        // Elecciones Oviedo
        crearParticipacion(pp, oviedoEleccion, "PP Oviedo",
                "Programa para Oviedo: Empleo, infraestructuras, bajada de impuestos",
                "https://www.ppoviedo.es", "985123460");
        crearParticipacion(psoe, oviedoEleccion, "PSOE Oviedo",
                "Programa para Oviedo: Servicios públicos, vivienda, cultura",
                "https://www.psoeoviedo.es", "985123461");
        crearParticipacion(vox, oviedoEleccion, "Vox Oviedo",
                "Programa para Oviedo: Seguridad ciudadana, limpieza",
                "https://www.voxoviedo.es", "985123462");
        crearParticipacion(sumar, oviedoEleccion, "Sumar Oviedo",
                "Programa para Oviedo: Movilidad sostenible, participación ciudadana",
                "https://www.sumaroviedo.es", "985123463");

        System.out.println("✅ Participaciones electoral creadas");

        // ========== 6. CANDIDATOS ==========
        // Obtener participaciones
        PartidoEleccion ppNacional = partidoEleccionRepositorio.findByPartidoIdAndEleccionId(pp.getId(), nacional.getId()).orElseThrow();
        PartidoEleccion ppOviedo = partidoEleccionRepositorio.findByPartidoIdAndEleccionId(pp.getId(), oviedoEleccion.getId()).orElseThrow();

        List<Candidato> candidatos = new ArrayList<>();
        candidatos.addAll(crearCandidatosNacionales(ppNacional, psoe, vox, sumar));
        candidatos.addAll(crearCandidatosOviedo(ppOviedo, psoe, vox, sumar, oviedoEleccion));
        candidatoRepositorio.saveAll(candidatos);
        System.out.println("✅ " + candidatos.size() + " candidatos creados");

        // ========== 7. EVENTOS ==========
        List<Evento> eventos = crearEventos(ppNacional, ppOviedo);
        eventoRepositorio.saveAll(eventos);
        System.out.println("✅ " + eventos.size() + " eventos creados");

        // ========== 8. SEDES ==========
        List<Sede> sedes = crearSedes(municipios, ppOviedo);
        sedeRepositorio.saveAll(sedes);
        System.out.println("✅ " + sedes.size() + " sedes creadas");

        // ========== 9. RESULTADOS ANTERIORES ==========
        List<ResultadoAnterior> resultados = crearResultadosAnteriores(oviedoEleccion);
        resultadoRepositorio.saveAll(resultados);
        System.out.println("✅ Resultados anteriores creados");

        // ========== 10. USUARIO ADMIN ==========
        Usuario admin = new Usuario();
        admin.setEmail("admin@elecciones.es");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setNombre("Administrador");
        admin.setApellidos("Sistema");
        admin.setRol(RolUsuario.ADMINISTRADOR);
        admin.setActivo(true);
        usuarioRepositorio.save(admin);
        System.out.println("✅ Usuario administrador creado (admin@elecciones.es / admin123)");

        System.out.println("🎉 ¡Datos iniciales cargados correctamente!");
    }

    private List<ComunidadAutonoma> crearComunidades() {
        return Arrays.asList(
                crearComunidad("Andalucía", "Sevilla", "#008000", "#FFFFFF", "#FFD700", "#F0F7F0"),
                crearComunidad("Aragón", "Zaragoza", "#ED1C24", "#FFD700", "#FFA500", "#FFF5F0"),
                crearComunidad("Asturias", "Oviedo", "#4B0082", "#FFD700", "#9B59B6", "#F5F0FF"),
                crearComunidad("Baleares", "Palma", "#0066CC", "#FFD700", "#3399FF", "#F0F5FF"),
                crearComunidad("Canarias", "Las Palmas", "#003366", "#FFFFFF", "#4D8CBF", "#F0F5FA"),
                crearComunidad("Cantabria", "Santander", "#E63946", "#FFD700", "#FF6B6B", "#FFF0F0"),
                crearComunidad("Castilla-La Mancha", "Toledo", "#800000", "#FFD700", "#B8860B", "#FFF5F0"),
                crearComunidad("Castilla y León", "Valladolid", "#800000", "#FFD700", "#B8860B", "#FFF5F0"),
                crearComunidad("Cataluña", "Barcelona", "#FFD700", "#ED1C24", "#FFA500", "#FFFFF0"),
                crearComunidad("Madrid", "Madrid", "#ED1C24", "#FFFFFF", "#FF6B6B", "#FFF0F0"),
                crearComunidad("País Vasco", "Vitoria", "#ED1C24", "#008000", "#FF6B6B", "#FFF0F0"),
                crearComunidad("Valencia", "Valencia", "#FFD700", "#ED1C24", "#FFA500", "#FFFFF0")
        );
    }

    private ComunidadAutonoma crearComunidad(String nombre, String capital, String colorPrimario,
                                             String colorSecundario, String colorAcento, String colorFondo) {
        ComunidadAutonoma c = new ComunidadAutonoma();
        c.setNombre(nombre);
        c.setCapital(capital);
        c.setColorPrimario(colorPrimario);
        c.setColorSecundario(colorSecundario);
        c.setColorAcento(colorAcento);
        c.setColorFondo(colorFondo);
        return c;
    }

    private List<Municipio> crearMunicipiosAsturias(ComunidadAutonoma asturias) {
        return Arrays.asList(
                crearMunicipio("Oviedo", asturias, 43.3619, -5.8494, 220000, "Asturias", "#00236C", "#1985FF", "#00A86B", "#F0F7FF"),
                crearMunicipio("Gijón", asturias, 43.5357, -5.6615, 271000, "Asturias", "#004d73", "#00a3e0", "#00B4D8", "#E6F4FF"),
                crearMunicipio("Avilés", asturias, 43.5567, -5.9250, 78000, "Asturias", "#006633", "#FFCC00", "#66CC66", "#F0FFF0"),
                crearMunicipio("Mieres", asturias, 43.2500, -5.7667, 38000, "Asturias", "#8B4513", "#DEB887", "#CD853F", "#FFF8F0"),
                crearMunicipio("Langreo", asturias, 43.3000, -5.7000, 35000, "Asturias", "#2C3E50", "#3498DB", "#5D6D7E", "#F5F7FA")
        );
    }

    private Municipio crearMunicipio(String nombre, ComunidadAutonoma comunidad, double lat, double lng,
                                     int poblacion, String provincia,String colorPrimario, String colorSecundario,
                                     String colorAcento, String colorFondo) {
        Municipio m = new Municipio();
        m.setNombre(nombre);
        m.setComunidadAutonoma(comunidad.getNombre());
        m.setLatitud(lat);
        m.setLongitud(lng);
        m.setPoblacion(poblacion);
        m.setProvincia(provincia);
        m.setColorPrimario(colorPrimario);
        m.setColorSecundario(colorSecundario);
        m.setColorAcento(colorAcento);
        m.setColorFondo(colorFondo);
        return m;
    }

    private List<Eleccion> crearElecciones() {
        return Arrays.asList(
                crearEleccion("NACIONAL", "España", 2027),
                crearEleccion("AUTONOMICA", "Asturias", 2027),
                crearEleccion("MUNICIPAL", "Oviedo", 2027)
        );
    }

    private Eleccion crearEleccion(String tipo, String ambito, int anio) {
        Eleccion e = new Eleccion();
        e.setTipo(tipo);
        e.setAmbito(ambito);
        e.setAnio(anio);
        return e;
    }

    private List<Partido> crearPartidos() {
        return Arrays.asList(
                crearPartido("Partido Popular", "PP", "/assets/partidos/pp.png", "#1E88E5", "#0D47A1", "#42A5F5", "#E3F2FD"),
                crearPartido("Partido Socialista Obrero Español", "PSOE", "/assets/partidos/psoe.png", "#E63946", "#C1121F", "#FF6B6B", "#FFEBEE"),
                crearPartido("Vox", "VOX", "/assets/partidos/vox.png", "#2E7D32", "#1B5E20", "#66BB6A", "#E8F5E9"),
                crearPartido("Sumar", "SUMAR", "/assets/partidos/sumar.png", "#FF9800", "#E65100", "#FFB74D", "#FFF3E0"),
                crearPartido("Podemos", "PODEMOS", "/assets/partidos/podemos.png", "#7B1FA2", "#4A148C", "#AB47BC", "#F3E5F5")
        );
    }

    private Partido crearPartido(String nombre, String siglas, String logoUrl,
                                 String colorPrimario, String colorSecundario,
                                 String colorAcento, String colorFondo) {
        Partido p = new Partido();
        p.setNombre(nombre);
        p.setSiglas(siglas);
        p.setLogoUrl(logoUrl);
        p.setColorPrimario(colorPrimario);
        p.setColorSecundario(colorSecundario);
        p.setColorAcento(colorAcento);
        p.setColorFondo(colorFondo);
        return p;
    }

    private void crearParticipacion(Partido partido, Eleccion eleccion, String programaResumen,
                                    String programaCompleto, String webUrl, String telefono) {
        PartidoEleccion pe = new PartidoEleccion();
        pe.setPartido(partido);
        pe.setEleccion(eleccion);
        partidoEleccionRepositorio.save(pe);

        InformacionPartido info = new InformacionPartido();
        info.setProgramaResumen(programaResumen);
        info.setProgramaCompleto(programaCompleto);
        info.setWebUrl(webUrl);
        info.setTelefonoContacto(telefono);
        info.setEmailContacto("info@" + partido.getSiglas().toLowerCase() + ".es");
        info.setPartidoEleccion(pe);
        informacionPartidoRepositorio.save(info);

        pe.setInformacion(info);
        partidoEleccionRepositorio.save(pe);
    }

    private List<Candidato> crearCandidatosNacionales(PartidoEleccion ppNacional, Partido psoe, Partido vox, Partido sumar) {
        List<Candidato> candidatos = new ArrayList<>();

        Candidato c1 = new Candidato();
        c1.setNombre("Alberto Núñez Feijóo");
        c1.setCargo("Presidente");
        c1.setFotoUrl("/assets/candidatos/feijoo.png");
        c1.setBiografia("Presidente del Partido Popular");
        c1.setPosicionLista(1);
        c1.setPartidoEleccion(ppNacional);
        candidatos.add(c1);

        return candidatos;
    }

    private List<Candidato> crearCandidatosOviedo(PartidoEleccion ppOviedo, Partido psoe, Partido vox, Partido sumar, Eleccion eleccion) {
        List<Candidato> candidatos = new ArrayList<>();

        Candidato c1 = new Candidato();
        c1.setNombre("Alfredo Canteli");
        c1.setCargo("Cabeza de lista");
        c1.setFotoUrl("/assets/candidatos/canteli.png");
        c1.setBiografia("Alcalde de Oviedo desde 2019");
        c1.setPosicionLista(1);
        c1.setPartidoEleccion(ppOviedo);
        candidatos.add(c1);

        return candidatos;
    }

    private List<Evento> crearEventos(PartidoEleccion ppNacional, PartidoEleccion ppOviedo) {
        List<Evento> eventos = new ArrayList<>();

        Evento e1 = new Evento();
        e1.setTitulo("Debate electoral nacional");
        e1.setDescripcion("Debate entre los candidatos a la presidencia del gobierno");
        e1.setFecha(LocalDateTime.now().plusDays(30));
        e1.setLugar("Congreso de los Diputados, Madrid");
        e1.setTipo("DEBATE");
        e1.setPartidoEleccion(ppNacional);
        eventos.add(e1);

        Evento e2 = new Evento();
        e2.setTitulo("Mitin del PP en Oviedo");
        e2.setDescripcion("Presentación de candidatos y programa electoral");
        e2.setFecha(LocalDateTime.now().plusDays(15));
        e2.setLugar("Plaza Mayor, Oviedo");
        e2.setTipo("MITIN");
        e2.setPartidoEleccion(ppOviedo);
        eventos.add(e2);

        return eventos;
    }

    private List<Sede> crearSedes(List<Municipio> municipios, PartidoEleccion ppOviedo) {
        List<Sede> sedes = new ArrayList<>();
        Municipio oviedo = municipios.get(0);

        Sede sedePp = new Sede();
        sedePp.setNombre("Sede del Partido Popular en Oviedo");
        sedePp.setDireccion("Calle Uría 12, Oviedo");
        sedePp.setLatitud(43.3625);
        sedePp.setLongitud(-5.8480);
        sedePp.setTipo("SEDE_PARTIDO");
        sedePp.setMunicipio(oviedo.getNombre());
        sedePp.setPartidoEleccion(ppOviedo);
        sedes.add(sedePp);

        return sedes;
    }

    private List<ResultadoAnterior> crearResultadosAnteriores(Eleccion eleccion) {
        List<ResultadoAnterior> resultados = new ArrayList<>();

        resultados.add(crearResultado(2019, "PP", 35000, 32.5, 12, eleccion));
        resultados.add(crearResultado(2019, "PSOE", 28000, 26.0, 9, eleccion));
        resultados.add(crearResultado(2019, "FORO", 15000, 14.0, 5, eleccion));
        resultados.add(crearResultado(2019, "PODEMOS", 12000, 11.0, 4, eleccion));
        resultados.add(crearResultado(2019, "VOX", 5000, 4.5, 0, eleccion));

        return resultados;
    }

    private ResultadoAnterior crearResultado(int anio, String partido, int votos, double porcentaje, int concejales, Eleccion eleccion) {
        ResultadoAnterior r = new ResultadoAnterior();
        r.setAnio(anio);
        r.setPartidoNombre(partido);
        r.setVotos(votos);
        r.setPorcentaje(porcentaje);
        r.setConcejales(concejales);
        r.setEleccion(eleccion);
        return r;
    }
}