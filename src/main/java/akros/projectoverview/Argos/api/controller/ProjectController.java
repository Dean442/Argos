package akros.projectoverview.Argos.api.controller;

import akros.projectoverview.Argos.api.services.ServiceLocator;
import akros.projectoverview.Argos.persistence.entities.documents.IdList;
import akros.projectoverview.Argos.persistence.entities.documents.ProjectDocument;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@Tag(name = "projects", description = "Project controller")
@RequiredArgsConstructor
@RequestMapping(path = "/project")
public class ProjectController {

    private final ServiceLocator serviceLocator;

    @CrossOrigin()
    @GetMapping(path = "/{id}")
    public ResponseEntity<ProjectDocument> getProject(String id) {
        final var temp = serviceLocator.findProjectById(id);
        if(temp.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        var project = temp.get();

        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping(path = "/allProjects")
    public ResponseEntity<List<ProjectDocument>> getAllProjects() {
        final var allProjects = serviceLocator.findAllProjects();
        return new ResponseEntity<>(allProjects, HttpStatus.ACCEPTED);
    }

    @CrossOrigin()
    @PostMapping(path = "/projectsByIds")
    public ResponseEntity<List<ProjectDocument>> getProjectsByIds(@RequestBody IdList projectIds) {
        log.info("projectIds: " + projectIds.toString());
        List<ProjectDocument> collection = new ArrayList<>();
        projectIds.getIds().forEach(id -> {
            log.info(id);
            final var optional = serviceLocator.findProjectById(id);
            optional.ifPresent(collection::add);
        });
        log.info(collection.toString());
        return new ResponseEntity<>(collection, HttpStatus.OK);
    }

    @CrossOrigin()
    @PostMapping(path = "/newProject")
    public ResponseEntity<ProjectDocument> addNewProject(
            @RequestBody ProjectDocument project) {

        final var newProject = serviceLocator.saveNewProject(project);
        return new ResponseEntity<>(newProject, HttpStatus.ACCEPTED);
    }

    @CrossOrigin()
    @PutMapping(path = "/{id}")
    public ResponseEntity<ProjectDocument> updateProject(
            @PathVariable String id,
            @RequestBody ProjectDocument project) {

        final var oldProjectOptional = serviceLocator.findProjectById(id);

        if (oldProjectOptional.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        final var oldProject = oldProjectOptional.get();
        final var newProject = mergeProject(project, oldProject);

        final var updatedProject = serviceLocator.saveNewProject(newProject);
        return new ResponseEntity<>(updatedProject, HttpStatus.ACCEPTED);
    }

    @CrossOrigin()
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<ProjectDocument> deleteProject( @PathVariable String id) {
        final var deletedProject = serviceLocator.findProjectById(id).get();

        serviceLocator.deleteProject(id);
        return new ResponseEntity<>(deletedProject, HttpStatus.OK);

    }

    private ProjectDocument mergeProject(ProjectDocument project, ProjectDocument oldProject) {

        final var newProject = ProjectDocument.builder()
                .id(project.getId() != null ? project.getId() : oldProject.getId())
                .name(project.getName() != null ? project.getName() : oldProject.getName())
                .startDate(project.getStartDate() != null ? project.getStartDate() : oldProject.getStartDate())
                .endDate(project.getEndDate() != null ? project.getEndDate() : oldProject.getEndDate())
                .mandates(project.getMandates() != null ? project.getMandates() : oldProject.getMandates())
                .customer(project.getCustomer() != null ? project.getCustomer() : oldProject.getCustomer())
                .build();
        return newProject;
    }


}
