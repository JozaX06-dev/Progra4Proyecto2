package una.backend.presentation.oferente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import una.backend.logic.Caracteristica;
import una.backend.logic.Oferente;
import una.backend.logic.Service;
import una.backend.logic.Usuario;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/oferente")
public class OferenteController {

    @Autowired
    private Service service;

    @GetMapping("/menu")
    public ResponseEntity<?> show(){
        Oferente oferente = service.getOferenteActual();
        return ResponseEntity.ok(oferente);
    }

    @GetMapping("/misHabilidades")
    public ResponseEntity<?> showMisHabilidades(){
        Oferente oferente = service.getOferenteActual();
        List<Caracteristica> caracteristicas = service.caracteristicasRaiz();
        return ResponseEntity.ok(Map.of(
                "oferente",oferente,
                "habilidades", service.habilidadesOferente(oferente),
                "caracteristicas", caracteristicas,
                "tieneHijos", service.mapTieneHijos(caracteristicas),
                "nodosFinales", service.caracteristicasNodosFinales()
        ));
    }

    @GetMapping("/misHabilidades/{id}")
    public ResponseEntity<?> showHijosCaracteristica(@PathVariable Integer id){
        Oferente oferente = service.getOferenteActual();
        Caracteristica padre = service.caracteristicaFindById(id);
        List<Caracteristica> caracteristicas = service.caracteristicasHijos(padre);
        return ResponseEntity.ok(Map.of(
                "oferente",oferente,
                "habilidades",service.habilidadesOferente(oferente),
                "caracteristicas",caracteristicas,
                "padre",padre,
                "tieneHijos",service.mapTieneHijos(caracteristicas),
                "nodosFinales",service.caracteristicasNodosFinales()
        ));
    }

    @PostMapping("/agregarHabilidad")
    public ResponseEntity<?> agregarHabilidad(@RequestBody Map<String, Integer> body){
        Oferente oferente = service.getOferenteActual();
        service.agregarHabilidad(oferente, service.caracteristicaFindById(body.get("caracteristicaId")), body.get("nivel"));
        return ResponseEntity.ok("Habilidad agregada");
    }

    @GetMapping("/miCV")
    public ResponseEntity<?> showMiCV(){
        Oferente oferente = service.getOferenteActual();
        return ResponseEntity.ok(oferente);
    }

    @GetMapping("/revisarCV")
    public ResponseEntity<byte[]> revisarCV() throws IOException {
        Oferente oferente = service.getOferenteActual();
        Path ruta = Paths.get(oferente.getCv());
        byte[] cv = Files.readAllBytes(ruta);
        return ResponseEntity.ok().header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline: filename=cv.pdf")
                .body(cv);
    }

    @PostMapping("/subirCV")
    public ResponseEntity<?> subirCV(@RequestParam MultipartFile cv) throws IOException {
        Oferente oferente = service.getOferenteActual();
        oferente.setCv("uploads/cv/"+oferente.getId()+".pdf");
        service.guardarOferente(oferente);
        Path ruta = Paths.get("uploads/cv/"+oferente.getId()+".pdf");
        Files.createDirectories(ruta.getParent());
        cv.transferTo(ruta);
        return ResponseEntity.ok("CV subido");
    }
}
