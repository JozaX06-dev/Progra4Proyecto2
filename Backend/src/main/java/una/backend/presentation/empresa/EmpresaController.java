package una.backend.presentation.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.backend.logic.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {

    @Autowired
    private Service service;

    // ── DASHBOARD ──────────────────────────────────────────
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        Empresa empresa = service.getEmpresaActual();
        return ResponseEntity.ok(empresa);
    }

    // ── MIS PUESTOS ────────────────────────────────────────
    @GetMapping("/misPuestos")
    public ResponseEntity<?> misPuestos() {
        Empresa empresa = service.getEmpresaActual();
        return ResponseEntity.ok(Map.of(
                "empresa", empresa,
                "puestos", service.puestosFindByEmpresa(empresa)
        ));
    }

    // ── DESACTIVAR PUESTO ──────────────────────────────────
    @PostMapping("/desactivarPuesto/{puestoId}")
    public ResponseEntity<?> desactivarPuesto(@PathVariable Integer puestoId) {
        service.desactivarPuesto(puestoId);
        return ResponseEntity.ok("Puesto desactivado");
    }

    // ── PUBLICAR PUESTO ────────────────────────────────────
    @GetMapping("/publicarPuesto")
    public ResponseEntity<?> mostrarPublicarPuesto() {
        return ResponseEntity.ok(Map.of(
                "caracteristicas", service.caracteristicasNodosFinales()
        ));
    }

    @PostMapping("/publicarPuesto")
    public ResponseEntity<?> procesarPublicarPuesto(@RequestBody Map<String, Object> body) {
        Empresa empresa = service.getEmpresaActual();
        String descripcion = (String) body.get("descripcion");
        Double salario = Double.parseDouble(body.get("salario").toString());
        Integer esPublico = (Integer) body.get("esPublico");

        List<Integer> caracteristicaIds = (List<Integer>) body.get("caracteristicaIds");
        List<Integer> niveles = (List<Integer>) body.get("niveles");

        service.publicarPuesto(empresa, descripcion, salario, esPublico, caracteristicaIds, niveles);
        return ResponseEntity.ok("Puesto publicado");
    }

    // ── BUSCAR CANDIDATOS ──────────────────────────────────
    @GetMapping("/buscarCandidatos/{puestoId}")
    public ResponseEntity<?> buscarCandidatos(@PathVariable Integer puestoId) {
        Puesto puesto = service.puestoFindById(puestoId);
        return ResponseEntity.ok(Map.of(
                "puesto", puesto,
                "candidatos", service.buscarCandidatos(puesto)
        ));
    }

    // ── DETALLE DE CANDIDATO ───────────────────────────────
    @GetMapping("/detalleOferente/{oferenteId}")
    public ResponseEntity<?> verDetalleOferente(@PathVariable Integer oferenteId) {
        Oferente oferente = service.oferenteFindById(oferenteId);
        return ResponseEntity.ok(Map.of(
                "oferente", oferente,
                "habilidades", service.habilidadesOferente(oferente)
        ));
    }

    // ── VER CV DEL CANDIDATO ───────────────────────────────
    @GetMapping("/verCV/{oferenteId}")
    public ResponseEntity<byte[]> verCV(@PathVariable Integer oferenteId) throws IOException {
        Oferente oferente = service.oferenteFindById(oferenteId);
        Path ruta = Paths.get(oferente.getCv());
        byte[] contenido = Files.readAllBytes(ruta);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=cv.pdf")
                .body(contenido);
    }
}