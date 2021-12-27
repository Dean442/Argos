package akros.projectoverview.Argos.api.services;

import akros.projectoverview.Argos.api.services.documentservices.CustomerService;
import akros.projectoverview.Argos.api.services.documentservices.EmployeeService;
import akros.projectoverview.Argos.api.services.documentservices.MandateService;
import akros.projectoverview.Argos.api.services.documentservices.ProjectService;
import akros.projectoverview.Argos.persistence.entities.documents.CustomerDocument;
import akros.projectoverview.Argos.persistence.entities.documents.EmployeeDocument;
import akros.projectoverview.Argos.persistence.entities.documents.MandateDocument;
import akros.projectoverview.Argos.persistence.entities.documents.ProjectDocument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class ServiceLocator {

    @Autowired
    private final CustomerService customerService;

    @Autowired
    private final ProjectService projectService;

    @Autowired
    private final MandateService mandateService;

    @Autowired
    private final EmployeeService employeeService;


    public Optional<CustomerDocument> findCustomerById(String id) {
        return customerService.findCustomerById(id);
    }

    public List<CustomerDocument> findAllCustomers() {return customerService.findAllCustomers();}

    public Optional<ProjectDocument> findProjectById(String id) {
        return projectService.findProjectById(id);
    }

    public Optional<MandateDocument> findMandateById(String id) {
        return mandateService.findMandateById(id);
    }

    public Optional<EmployeeDocument> findEmployeeById(String id) {
        return employeeService.findEmployeeById(id);
    }

    public CustomerDocument saveNewCustomer(CustomerDocument customer) {
        return customerService.saveNewCustomer(customer);
    }

    public void deleteCustomer(String id) {
        customerService.deleteCustomer(id);
    }

    public ProjectDocument saveNewProject(ProjectDocument project) {
        return projectService.saveNewProject(project);
    }

    public List<ProjectDocument> findAllProjects() {
        return projectService.findAllProjects();
    }

    public void deleteProject(String id) {
        projectService.deleteProject(id);
    }

    public List<MandateDocument> findAllMandates() {
        return mandateService.findAllMandates();
    }

    public MandateDocument saveNewMandate(MandateDocument mandate) {
        return mandateService.saveNewMandate(mandate);
    }

    public void deleteMandate(String id) {
        mandateService.deleteMandate(id);
    }

    public List<EmployeeDocument> findAllEmployees() {
        return employeeService.findAllEmployees();
    }

    public EmployeeDocument saveNewEmployee(EmployeeDocument employee) {
        return employeeService.saveNewEmployee(employee);
    }

    public void deleteEmployee(String id) {
        employeeService.deleteEmployee(id);
    }
}
