package una.backend.data;
import una.backend.logic.Habilidad;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import una.backend.logic.Oferente;
import java.util.List;

@Repository
public interface HabilidadRepository extends CrudRepository<Habilidad,Integer> {
    List<Habilidad> findByOferente(Oferente oferente);
}