package akros.projectoverview.Argos.persistence.repositories;

import akros.projectoverview.Argos.persistence.entities.documents.EmployeeDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends MongoRepository<EmployeeDocument, String> {
}
