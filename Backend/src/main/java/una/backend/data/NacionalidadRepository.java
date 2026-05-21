package una.backend.data;

import una.backend.logic.Nacionalidad;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NacionalidadRepository extends CrudRepository<Nacionalidad,String> {
}
