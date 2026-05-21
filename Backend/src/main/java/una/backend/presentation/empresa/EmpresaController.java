package una.backend.presentation.empresa;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import una.backend.logic.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@org.springframework.stereotype.Controller("empresas")
public class EmpresaController {
    @Autowired
    private Service service;
    @Autowired
    private HttpSession session;

    // ── DASHBOARD ──────────────────────────────────────────
    @GetMapping("/empresa/EmpresaDashboard")
    public String dashboard(Model model) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Empresa empresa = service.empresaFindById(usuario.getId());
        model.addAttribute("empresa", empresa);
        return "presentation/empresa/EmpresaDashboard";
    }
    // ── MIS PUESTOS ────────────────────────────────────────
    @GetMapping("/empresa/MisPuestos")
    public String misPuestos(Model model) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Empresa empresa = service.empresaFindById(usuario.getId());
        model.addAttribute("empresa", empresa);
        model.addAttribute("puestos", service.puestosFindByEmpresa(empresa));
        return "presentation/empresa/MisPuestos";
    }
    // ── DESACTIVAR PUESTO ──────────────────────────────────
    @PostMapping("/empresa/desactivarPuesto")
    public String desactivarPuesto(@RequestParam Integer puestoId) {
        service.desactivarPuesto(puestoId);
        return "redirect:/empresa/MisPuestos";
    }
    // ── PUBLICAR PUESTO (mostrar formulario) ───────────────
    @GetMapping("/empresa/PublicarPuesto")
    public String mostrarPublicarPuesto(Model model) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Empresa empresa = service.empresaFindById(usuario.getId());
        model.addAttribute("empresa", empresa);
        model.addAttribute("caracteristicas", service.caracteristicasNodosFinales());
        return "presentation/empresa/PublicarPuesto";
    }
    // ── PUBLICAR PUESTO (procesar formulario) ──────────────
    @PostMapping("/empresa/PublicarPuesto")
    public String procesarPublicarPuesto(@RequestParam String descripcion, @RequestParam Double salario, @RequestParam Integer esPublico, @RequestParam(required = false) List<Integer> caracteristicaIds, @RequestParam(required = false) List<Integer> niveles) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Empresa empresa = service.empresaFindById(usuario.getId());
        service.publicarPuesto(empresa, descripcion, salario, esPublico, caracteristicaIds, niveles);
        return "redirect:/empresa/MisPuestos";
    }
    // ── BUSCAR CANDIDATOS ──────────────────────────────────
    @GetMapping("/empresa/BuscarCandidatos")
    public String buscarCandidatos(@RequestParam Integer puestoId, Model model) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Empresa empresa = service.empresaFindById(usuario.getId());
        Puesto puesto = service.puestoFindById(puestoId);
        model.addAttribute("empresa", empresa);
        model.addAttribute("puesto", puesto);
        model.addAttribute("candidatos", service.buscarCandidatos(puesto));
        return "presentation/empresa/Buscarcandidatos";
    }
    // ── VER DETALLE DE CANDIDATO ───────────────────────────
    @GetMapping("/empresa/DetalleOferente")
    public String verDetalleOferente(@RequestParam Integer oferenteId, @RequestParam Integer puestoId, Model model) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        Empresa empresa = service.empresaFindById(usuario.getId());
        Oferente oferente = service.oferenteFindById(oferenteId);
        model.addAttribute("empresa", empresa);
        model.addAttribute("oferente", oferente);
        model.addAttribute("habilidades", service.habilidadesOferente(oferente));
        model.addAttribute("puestoId", puestoId);
        return "presentation/empresa/Verdetalles";
    }
    // ── VER CV DEL CANDIDATO ───────────────────────────────
    @GetMapping("/empresa/verCV")
    public ResponseEntity<byte[]> verCV(@RequestParam Integer oferenteId) throws IOException {
        Oferente oferente = service.oferenteFindById(oferenteId);
        Path ruta = Paths.get(oferente.getCv());
        byte[] contenido = Files.readAllBytes(ruta);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=cv.pdf")
                .body(contenido);
    }
    // ── SALIR ──────────────────────────────────────────────
    @GetMapping("/empresa/salir")
    public String salir() {
        session.invalidate();
        return "redirect:/";
    }
}