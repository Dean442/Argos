package akros.projectoverview.Argos.persistence.repositories;

import akros.projectoverview.Argos.persistence.entities.documents.CustomerDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<CustomerDocument, String> {


}
