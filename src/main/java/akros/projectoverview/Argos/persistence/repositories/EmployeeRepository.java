package akros.projectoverview.Argos.persistence.repositories;

import akros.projectoverview.Argos.persistence.entities.documents.EmployeeDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository extends MongoRepository<EmployeeDocument, String> {
}
