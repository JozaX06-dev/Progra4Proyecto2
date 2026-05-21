package una.backend.data;
import una.backend.logic.Puesto;
import una.backend.logic.Requisito;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequisitoRepository extends CrudRepository<Requisito,Integer> {
    List<Requisito> findByCaracteristicaIdIn(List<Integer> caracteristicaIds);
    List<Requisito> findByPuesto(Puesto puesto);
}