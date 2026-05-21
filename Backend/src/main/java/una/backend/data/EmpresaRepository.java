package una.backend.data;
import una.backend.logic.Empresa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpresaRepository extends CrudRepository<Empresa,Integer> {
    List<Empresa> findByUsuarioActivo(byte activo);
}
