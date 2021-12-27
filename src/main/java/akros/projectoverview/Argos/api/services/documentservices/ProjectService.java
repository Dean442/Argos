package akros.projectoverview.Argos.api.services.documentservices;

import akros.projectoverview.Argos.persistence.entities.documents.ProjectDocument;
import akros.projectoverview.Argos.persistence.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Optional<ProjectDocument> findProjectById(String id) {
        return projectRepository.findById(id);

    }

    public ProjectDocument saveNewProject(ProjectDocument project) {
        return projectRepository.save(project);
    }

    public List<ProjectDocument> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }
}
