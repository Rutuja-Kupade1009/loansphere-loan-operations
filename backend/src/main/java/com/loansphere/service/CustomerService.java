
package com.loansphere.service;

import com.loansphere.dto.CustomerRequestDTO;
import com.loansphere.dto.CustomerResponseDTO;
import com.loansphere.entity.Customer;
import com.loansphere.exception.ResourceNotFoundException;
import com.loansphere.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    // Constructor Injection
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // 1. Create Customer
    public CustomerResponseDTO createCustomer(CustomerRequestDTO dto) {

        // Check duplicate email
        if (customerRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException(
                    "Email already registered: " + dto.getEmail()
            );
        }

        // Convert DTO to Entity
        Customer customer = new Customer();

        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setDateOfBirth(dto.getDateOfBirth());
        customer.setAddress(dto.getAddress());

        // Save customer
        Customer savedCustomer = customerRepository.save(customer);

        // Convert Entity to Response DTO
        return convertToDTO(savedCustomer);
    }

    // 2. Get All Customers
    public List<CustomerResponseDTO> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // 3. Get Customer By ID
    public CustomerResponseDTO getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with ID: " + id
                        )
                );

        return convertToDTO(customer);
    }

    // 4. Update Customer
    public CustomerResponseDTO updateCustomer(
            Long id, CustomerRequestDTO dto) {

        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with ID: " + id
                        )
                );

        // Check if another customer already uses this email
        customerRepository.findByEmail(dto.getEmail())
                .filter(customer ->
                        !customer.getId().equals(id))
                .ifPresent(customer -> {
                    throw new IllegalArgumentException(
                            "Email already registered: " + dto.getEmail()
                    );
                });

        // Update customer details
        existingCustomer.setFirstName(dto.getFirstName());
        existingCustomer.setLastName(dto.getLastName());
        existingCustomer.setEmail(dto.getEmail());
        existingCustomer.setPhone(dto.getPhone());
        existingCustomer.setDateOfBirth(dto.getDateOfBirth());
        existingCustomer.setAddress(dto.getAddress());

        Customer updatedCustomer =
                customerRepository.save(existingCustomer);

        return convertToDTO(updatedCustomer);
    }

    // 5. Delete Customer
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with ID: " + id
                        )
                );

        customerRepository.delete(customer);
    }
    
    // 6. Search Customers with Pagination and Sorting
    public Page<CustomerResponseDTO> searchCustomers(
            String keyword, Pageable pageable) {

        Page<Customer> customers;

        if (keyword == null || keyword.isBlank()) {

            customers = customerRepository.findAll(pageable);

        } else {

            customers =
                    customerRepository
                    .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                            keyword,
                            keyword,
                            keyword,
                            pageable
                    );
        }

        return customers.map(this::convertToDTO);
    }


    // Entity to Response DTO Conversion
    private CustomerResponseDTO convertToDTO(Customer customer) {

        return new CustomerResponseDTO(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getDateOfBirth(),
                customer.getAddress(),
                customer.getCreatedAt()
        );
    }
}
