package akros.projectoverview.Argos.api.controller;

import akros.projectoverview.Argos.api.services.ServiceLocator;
import akros.projectoverview.Argos.persistence.entities.documents.ProjectDocument;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Tag(name = "linkage", description = "Linkage controller")
@RequiredArgsConstructor
@RequestMapping(path = "/link")
public class LinkageController {

    private final ServiceLocator serviceLocator;

    @PutMapping(path = "/employeeToMandate/{employeeId}/{mandateId}")
    public ResponseEntity linkEmployeeToMandate(@PathVariable String employeeId, @PathVariable String mandateId) {
        var employeeOptional = serviceLocator.findEmployeeById(employeeId);
        var mandateOptional = serviceLocator.findMandateById(mandateId);
        if (employeeOptional.isEmpty() || mandateOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var employee = employeeOptional.get();
        employee.getMandates().add(mandateId);

        var mandate = mandateOptional.get();
        mandate.setEmployee(employeeId);

        final var updatedEmployee = serviceLocator.saveNewEmployee(employee);
        final var updatedMandate = serviceLocator.saveNewMandate(mandate);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping(path = "/employeeFromMandate/{employeeId}/{mandateId}")
    public ResponseEntity unlinkEmployeeToMandate(@PathVariable String employeeId, @PathVariable String mandateId) {
        var employeeOptional = serviceLocator.findEmployeeById(employeeId);
        var mandateOptional = serviceLocator.findMandateById(mandateId);
        if (employeeOptional.isEmpty() || mandateOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var employee = employeeOptional.get();
        employee.getMandates().remove(mandateId);

        var mandate = mandateOptional.get();
        mandate.setEmployee(null);

        final var updatedEmployee = serviceLocator.saveNewEmployee(employee);
        final var updatedMandate = serviceLocator.saveNewMandate(mandate);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping(path = "/mandateToProject/{mandateId}/{projectId}")
    public ResponseEntity<ProjectDocument> linkMandateToProject(@PathVariable String mandateId, @PathVariable String projectId) {
        var mandateOptional = serviceLocator.findMandateById(mandateId);
        var projectOptional = serviceLocator.findProjectById(projectId);
        if (projectOptional.isEmpty() || mandateOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        var project = projectOptional.get();
        project.getMandates().add(mandateId);

        var mandate = mandateOptional.get();
        mandate.setProjectId(projectId);

        serviceLocator.saveNewProject(project);
        serviceLocator.saveNewMandate(mandate);

        return new ResponseEntity<>(project, HttpStatus.OK);

    }
    @PutMapping(path = "/mandateFromProject/{mandateId}/{projectId}")
    public ResponseEntity<ProjectDocument> unlinkMandateToProject(@PathVariable String mandateId, @PathVariable String projectId) {
        var mandateOptional = serviceLocator.findMandateById(mandateId);
        var projectOptional = serviceLocator.findProjectById(projectId);
        if (projectOptional.isEmpty() || mandateOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        var project = projectOptional.get();
        project.getMandates().remove(mandateId);

        var mandate = mandateOptional.get();
        mandate.setProjectId(null);

        serviceLocator.saveNewProject(project);
        serviceLocator.saveNewMandate(mandate);

        return new ResponseEntity<>(project, HttpStatus.OK);

    }

    @PutMapping(path = "/projectToCustomer/{projectId}/{customerId}")
    public ResponseEntity linkProjectToCustomer(@PathVariable String projectId, @PathVariable String customerId) {
        var customerOptional = serviceLocator.findCustomerById(customerId);
        var projectOptional = serviceLocator.findProjectById(projectId);
        if (projectOptional.isEmpty() || customerOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        var project = projectOptional.get();
        project.setCustomer(customerId);

        var customer = customerOptional.get();
        customer.getProjects().add(projectId);

        serviceLocator.saveNewProject(project);
        serviceLocator.saveNewCustomer(customer);

        return new ResponseEntity<>(HttpStatus.OK);

    }
    @PutMapping(path = "/projectFromCustomer/{projectId}/{customerId}")
    public ResponseEntity unlinkProjectToCustomer(@PathVariable String projectId, @PathVariable String customerId) {
        var customerOptional = serviceLocator.findCustomerById(customerId);
        var projectOptional = serviceLocator.findProjectById(projectId);
        if (projectOptional.isEmpty() || customerOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        var project = projectOptional.get();
        project.setCustomer(null);

        var customer = customerOptional.get();
        customer.getProjects().remove(projectId);

        serviceLocator.saveNewProject(project);
        serviceLocator.saveNewCustomer(customer);

        log.info("unlinked project: " + projectId + "\n from: " + customerId);

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
