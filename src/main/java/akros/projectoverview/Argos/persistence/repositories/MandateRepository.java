package akros.projectoverview.Argos.persistence.repositories;

import akros.projectoverview.Argos.persistence.entities.documents.MandateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MandateRepository extends MongoRepository<MandateDocument, String> {
}
