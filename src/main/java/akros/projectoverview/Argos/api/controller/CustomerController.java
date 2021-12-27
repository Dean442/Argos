package akros.projectoverview.Argos.api.controller;

import akros.projectoverview.Argos.api.services.ServiceLocator;
import akros.projectoverview.Argos.persistence.entities.documents.CustomerDocument;
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
@Tag(name = "customers", description = "Customer controller")
@RequiredArgsConstructor
@RequestMapping(path = "/customer")
public class CustomerController {

    private final ServiceLocator serviceLocator;

    @GetMapping(path = "/{id}")
    public ResponseEntity<CustomerDocument> getCustomer(
            @PathVariable String id) {

        var temp = serviceLocator.findCustomerById(id);
        if(temp.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        var customer = temp.get();

        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping(path = "/allCustomers")
    public ResponseEntity<List<CustomerDocument>> getAllCustomers() {
        final var allCustomers = serviceLocator.findAllCustomers();

        return new ResponseEntity<>(allCustomers, HttpStatus.OK);
    }

    @PostMapping(path = "/customersByIds")
    public ResponseEntity<List<CustomerDocument>> getCustomersByIds(@RequestBody IdList customerIds) {
        List<CustomerDocument> collection = new ArrayList<>();
        customerIds.getIds().forEach(id -> {
            final var optional = serviceLocator.findCustomerById(id);
            optional.ifPresent(collection::add);
        });
        return new ResponseEntity<>(collection, HttpStatus.OK);
    }

    @PostMapping(path = "/newCustomer")
    public ResponseEntity<CustomerDocument> addNewCustomer(
            @RequestBody CustomerDocument customer) {
        customer.setId(null);
        final var newCustomer = serviceLocator.saveNewCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.ACCEPTED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<CustomerDocument> updateCustomer(
            @PathVariable String id,
            @RequestBody CustomerDocument customer) {

        var oldCustomerOptional = serviceLocator.findCustomerById(id);
        if(oldCustomerOptional.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        final var oldCustomer = oldCustomerOptional.get();
        final var newCustomer = mergeCustomer(customer, oldCustomer);

        final var updatedCustomer = serviceLocator.saveNewCustomer(newCustomer);

        return new ResponseEntity<>(updatedCustomer, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<CustomerDocument> deleteCustomer(
            @PathVariable String id) {
        final var deletedCustomer = serviceLocator.findCustomerById(id).get();
        serviceLocator.deleteCustomer(id);
        return new ResponseEntity<>(deletedCustomer, HttpStatus.OK);
    }

    private CustomerDocument mergeCustomer(CustomerDocument customer, CustomerDocument oldCustomer) {
        final var newCustomer = CustomerDocument.builder()
                .id(customer.getId() != null ? customer.getId() : oldCustomer.getId())
                .name(customer.getName() != null ? customer.getName() : oldCustomer.getName())
                .projects(customer.getProjects() != null ? customer.getProjects() : oldCustomer.getProjects())
                .build();
        return newCustomer;
    }

}
