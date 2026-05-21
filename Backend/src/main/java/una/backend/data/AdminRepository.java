package una.backend.data;
import una.backend.logic.Administrador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Administrador,Integer> {

}

