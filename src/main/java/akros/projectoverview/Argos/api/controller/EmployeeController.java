package akros.projectoverview.Argos.api.controller;

import akros.projectoverview.Argos.api.services.ServiceLocator;
import akros.projectoverview.Argos.persistence.entities.documents.EmployeeDocument;
import akros.projectoverview.Argos.persistence.entities.documents.IdList;
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
@Tag(name = "employees", description = "Employee controller")
@RequiredArgsConstructor
@RequestMapping(path = "/employee")
public class EmployeeController {

    private final ServiceLocator serviceLocator;
    @CrossOrigin()
    @GetMapping(path = "/{id}")
    public ResponseEntity<EmployeeDocument> getEmployee(@PathVariable String id) {
        var temp = serviceLocator.findEmployeeById(id);
        if(temp.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        final var employee = temp.get();
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    @CrossOrigin()
    @GetMapping(path = "/allEmployees")
    public ResponseEntity<List<EmployeeDocument>> getAllEmployees() {
        final var allEmployees = serviceLocator.findAllEmployees();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping(path = "/bench")
    public ResponseEntity<List<EmployeeDocument>> getBenchedEmployees() {
        final var benchedEmployees = serviceLocator.findBenchedEmployees();
        if (benchedEmployees.isEmpty()) {
            return new ResponseEntity<>(benchedEmployees, HttpStatus.OK);
        }
        log.info("releaseing benchedEmployees");
        log.info(benchedEmployees.toString());
        return new ResponseEntity<>(benchedEmployees, HttpStatus.OK);
    }
    @CrossOrigin()
    @PostMapping(path = "/employeesByIds")
    public ResponseEntity<List<EmployeeDocument>> getEmployeesByIds(@RequestBody IdList employeeIds) {
        List<EmployeeDocument> collection = new ArrayList<>();
        employeeIds.getIds().forEach(id -> {
            final var optional = serviceLocator.findEmployeeById(id);
            optional.ifPresent(collection::add);
        });
        return new ResponseEntity<>(collection, HttpStatus.OK);
    }
    @CrossOrigin()
    @PostMapping(path = "/newEmployee")
    public ResponseEntity<EmployeeDocument> addNewEmployee(
            @RequestBody EmployeeDocument employee) {
        log.info("adding new employee: " + employee.toString());
        employee.setId(null);
        final var newEmployee = serviceLocator.saveNewEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.ACCEPTED);
    }
    @CrossOrigin()
    @PutMapping(path = "/{id}")
    public ResponseEntity<EmployeeDocument> updateEmployee(
            @PathVariable String id,
            @RequestBody EmployeeDocument employee) {
        log.info(employee.toString());
        var temp = serviceLocator.findEmployeeById(id);
        if(temp.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        final var oldEmployee = temp.get();
        final var newEmployee = mergeEmployee(employee, oldEmployee);

        final var updatedEmployee = serviceLocator.saveNewEmployee(newEmployee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.ACCEPTED);
    }
    @CrossOrigin()
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<EmployeeDocument> deleteEmployee(@PathVariable String id) {
        log.info("deleting: " + id);
        final var deltetedEmployee = serviceLocator.findEmployeeById(id).get();
        serviceLocator.deleteEmployee(id);
        return new ResponseEntity<>(deltetedEmployee, HttpStatus.OK);
    }

    private EmployeeDocument mergeEmployee(EmployeeDocument employee, EmployeeDocument oldEmployee) {
        return EmployeeDocument.builder()
                .id(employee.getId() != null ? employee.getId() : oldEmployee.getId())
                .name(employee.getName() != null ? employee.getName() : oldEmployee.getName())
                .firstName(employee.getFirstName() != null ? employee.getFirstName() : oldEmployee.getFirstName())
                .profile(employee.getProfile() != null ? employee.getProfile() : oldEmployee.getProfile())
                .businessfield(employee.getBusinessfield() != null ? employee.getBusinessfield() : oldEmployee.getBusinessfield())
                .teamLeader(employee.getTeamLeader() != null ? employee.getTeamLeader() : oldEmployee.getTeamLeader())
                .mandates(employee.getMandates() != null ? employee.getMandates() : oldEmployee.getMandates())
                .happiness(employee.getHappiness() != 0 ? employee.getHappiness() : oldEmployee.getHappiness())
                .health(employee.getHealth() != null ? employee.getHealth() : oldEmployee.getHealth())
                .build();
    }
}
