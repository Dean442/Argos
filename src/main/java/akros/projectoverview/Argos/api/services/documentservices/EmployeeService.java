package akros.projectoverview.Argos.api.services.documentservices;

import akros.projectoverview.Argos.persistence.entities.documents.EmployeeDocument;
import akros.projectoverview.Argos.persistence.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Optional<EmployeeDocument> findEmployeeById(String id) {
        return employeeRepository.findById(id);
    }

    public List<EmployeeDocument> findAllEmployees() {
        return employeeRepository.findAll();
    }

    public EmployeeDocument saveNewEmployee(EmployeeDocument employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }

    public List<EmployeeDocument> findBenchedEmployees() {
        List<EmployeeDocument> benchedEmployees = new ArrayList<>();
        final var allEmployees = employeeRepository.findAll();
        if (allEmployees.isEmpty()) {
            return null;
        }
        allEmployees.forEach(employee -> {
            if (employee.getMandates().isEmpty()){
                benchedEmployees.add(employee);
            }
        });
        return benchedEmployees;
    }
}
