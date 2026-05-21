package una.backend.presentation.publico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.backend.logic.Caracteristica;
import una.backend.logic.Nacionalidad;
import una.backend.logic.Service;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/publico")
public class PublicoController {

    @Autowired
    private Service service;

    @GetMapping("/")
    public ResponseEntity<?> show(){
        return ResponseEntity.ok(Map.of(
                "puestos", service.find5PuestosPublicosActivos(),
                "tipoCambio", service.obtenerTipoCambioVenta()
        ));
    }

    @GetMapping("/registroOferente")
    public ResponseEntity<?> mostrarRegistroOferente(){
        return ResponseEntity.ok(service.nacionalidadFindAll());
    }

    @PostMapping("/registroOferente")
    public ResponseEntity<?> procesarRegistroOferente(@RequestBody Map<String, String> body) {
        Nacionalidad nacionalidad = service.nacionalidadFindById(body.get("nacionalidadIso"));
        service.registrarOferente(body.get("correo"), body.get("identificacion"), body.get("nombre"), body.get("apellido"), nacionalidad, body.get("telefono"), body.get("lugarResidencia"));
        return ResponseEntity.ok("Oferente registrado");
    }

    @PostMapping("/registroEmpresa")
    public ResponseEntity<?> procesarRegistroEmpresa(@RequestBody Map<String, String> body){
        service.registrarEmpresa(body.get("nombre"), body.get("correo"), body.get("localizacion"), body.get("telefono"), body.get("descripcion"));
        return ResponseEntity.ok("Empresa registrada");
    }

    @GetMapping("/buscarPuestos")
    public ResponseEntity<?> mostrarBuscarPuestos() {
        List<Caracteristica> arbol = service.obtenerArbolCaracteristicas();
        return ResponseEntity.ok(Map.of(
                "caracteristicas", arbol,
                "tieneHijos", service.mapTieneHijos(arbol),
                "tipoCambio", service.obtenerTipoCambioVenta(),
                "niveles", service.mapNiveles(arbol)
        ));
    }

    @PostMapping("/buscarPuestos")
    public ResponseEntity<?> procesarBuscarPuestos(@RequestBody(required = false) List<Integer> caracteristicasIds) {
        if (caracteristicasIds == null) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(service.buscarPuestosPorCaracteristicas(caracteristicasIds));
    }

    @GetMapping("/nacionalidades")
    public ResponseEntity<?> getNacionalidades() {
        return ResponseEntity.ok(service.nacionalidadFindAll());
    }
}
