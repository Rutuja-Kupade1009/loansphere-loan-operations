
package com.loansphere.controller;

import com.loansphere.dto.CustomerRequestDTO;
import com.loansphere.dto.CustomerResponseDTO;
import com.loansphere.service.CustomerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    // Constructor Injection
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Create Customer
    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(
        @Valid @RequestBody CustomerRequestDTO customerDTO) {

        CustomerResponseDTO savedCustomer =
            customerService.createCustomer(customerDTO);

        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }
    // Get All Customers
    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {

        List<CustomerResponseDTO> customers =
                customerService.getAllCustomers();

        return ResponseEntity.ok(customers);
    }

    // Get Customer By ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(
            @PathVariable Long id) {

        CustomerResponseDTO customer =
                customerService.getCustomerById(id);

        return ResponseEntity.ok(customer);
    }

    // Update Customer
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDTO customerDTO) {

        CustomerResponseDTO updatedCustomer =
                customerService.updateCustomer(id, customerDTO);

        return ResponseEntity.ok(updatedCustomer);
    }

    // Delete Customer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.ok("Customer deleted successfully");
    }
    
    // Search Customers with Pagination and Sorting
    @GetMapping("/search")
    public ResponseEntity<Page<CustomerResponseDTO>> searchCustomers(

            @RequestParam(defaultValue = "") String keyword,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        // Validate pagination parameters
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "Page must be non-negative and size must be between 1 and 100"
            );
        }

        // Validate sortable fields
        if (!List.of("id", "firstName", "lastName", "email", "createdAt")
                .contains(sortBy)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<CustomerResponseDTO> customers =
                customerService.searchCustomers(keyword, pageable);

        return ResponseEntity.ok(customers);
    }

}
