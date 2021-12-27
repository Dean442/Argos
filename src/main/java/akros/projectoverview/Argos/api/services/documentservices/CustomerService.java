package akros.projectoverview.Argos.api.services.documentservices;

import akros.projectoverview.Argos.persistence.entities.documents.CustomerDocument;
import akros.projectoverview.Argos.persistence.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Optional<CustomerDocument> findCustomerById(@NotNull String id) {
        return customerRepository.findById(id);
    }

    public CustomerDocument saveNewCustomer(CustomerDocument customer) {
        return customerRepository.save(customer);
    }


    public List<CustomerDocument> findAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomer(@NotNull String id) {
        customerRepository.deleteById(id);
    }
}
