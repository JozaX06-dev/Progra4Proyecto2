package una.backend.presentation.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.backend.logic.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private Service service;

    // ── DASHBOARD ──────────────────────────────────────────
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        Administrador admin = service.getAdminActual();
        return ResponseEntity.ok(admin);
    }

    // ── EMPRESAS PENDIENTES ────────────────────────────────
    @GetMapping("/empresasPendientes")
    public ResponseEntity<?> empresasPendientes() {
        return ResponseEntity.ok(service.empresasPendientes());
    }

    @PostMapping("/aprobarEmpresa/{usuarioId}")
    public ResponseEntity<?> aprobarEmpresa(@PathVariable Integer usuarioId) {
        String clave = service.aprobarEmpresa(usuarioId);
        return ResponseEntity.ok(Map.of(
                "clave", clave,
                "mensaje", "Empresa aprobada"
        ));
    }

    // ── OFERENTES PENDIENTES ───────────────────────────────
    @GetMapping("/oferentesPendientes")
    public ResponseEntity<?> oferentesPendientes() {
        return ResponseEntity.ok(service.oferentesPendientes());
    }

    @PostMapping("/aprobarOferente/{usuarioId}")
    public ResponseEntity<?> aprobarOferente(@PathVariable Integer usuarioId) {
        String clave = service.aprobarOferente(usuarioId);
        return ResponseEntity.ok(Map.of(
                "clave", clave,
                "mensaje", "Oferente aprobado"
        ));
    }

    // ── CARACTERÍSTICAS ────────────────────────────────────
    @GetMapping("/caracteristicas")
    public ResponseEntity<?> caracteristicas() {
        var raices = service.caracteristicasRaiz();
        return ResponseEntity.ok(Map.of(
                "caracteristicas", raices,
                "tieneHijos", service.mapTieneHijos(raices)
        ));
    }

    @GetMapping("/caracteristicas/hijos/{id}")
    public ResponseEntity<?> caracteristicasHijos(@PathVariable Integer id) {
        Caracteristica padre = service.caracteristicaFindById(id);
        var hijos = service.caracteristicasHijos(padre);
        return ResponseEntity.ok(Map.of(
                "caracteristicas", hijos,
                "tieneHijos", service.mapTieneHijos(hijos),
                "padre", padre
        ));
    }

    @PostMapping("/crearCaracteristica")
    public ResponseEntity<?> crearCaracteristica(@RequestBody Map<String, Object> body) {
        String nombre = (String) body.get("nombre");
        Integer padreId = body.get("padreId") != null
                ? (Integer) body.get("padreId")
                : null;
        service.crearCaracteristica(nombre, padreId);
        return ResponseEntity.ok("Característica creada");
    }

    // ── REPORTES ───────────────────────────────────────────
    @GetMapping("/reportes/{anio}")
    public ResponseEntity<?> reportes(@PathVariable Integer anio) {
        return ResponseEntity.ok(Map.of(
                "porMes", service.puestosPorMes(anio)
        ));
    }

    @GetMapping("/generarReporte/{anio}")
    public ResponseEntity<byte[]> generarReporte(@PathVariable Integer anio) throws Exception {
        byte[] pdf = service.generarReportePDF(anio);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=reporte_" + anio + ".pdf")
                .body(pdf);
    }
}