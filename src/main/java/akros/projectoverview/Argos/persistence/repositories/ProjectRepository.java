package akros.projectoverview.Argos.persistence.repositories;

import akros.projectoverview.Argos.persistence.entities.documents.ProjectDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<ProjectDocument, String> {
}
