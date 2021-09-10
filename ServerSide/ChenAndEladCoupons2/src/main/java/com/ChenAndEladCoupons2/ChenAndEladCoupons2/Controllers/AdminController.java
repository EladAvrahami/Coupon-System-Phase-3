package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Controllers;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.UserDetails;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CompanyException;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.LoginException;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.AdminService;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.CompanyService;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.CustomerService;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.ClientType;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.JWTutil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("coupons") //http://locahost:8080/coupons
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
/**
 * a class that contains the methods of the Admin Controller Rest Api (post get Put Delete)
 */
public class AdminController {

    private final JWTutil jwTutil;

    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;

    @PostMapping("adminLogin")
    public ResponseEntity<?> adminLogin(@RequestBody UserDetails userData) throws CouponCustomExceptions {
        if (adminService.login(userData.getEmail(), userData.getPassword())) {
            String myToken = jwTutil.generateToken(new UserDetails(userData.getEmail(), 0, ClientType.admin));
            return new ResponseEntity<>(myToken, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("addCompany") //http://localhost:8080/coupons/addCompany
    public ResponseEntity<?> addCompany(@RequestHeader(name = "Authorization") String token, @RequestBody Company company) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.addCompany(company));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COMPANIES
    @GetMapping("getAllCompanies")//http://localhost:8080/coupons/getallcompanies
    public ResponseEntity<?> getCompanies(@RequestHeader(name = "Authorization") String token) {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.getAllCompanies());
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("companyLoggedIn") //http://localhost:8080/coupons/companyLoggedIn
    public ResponseEntity<?> getCompanyLoggedIn(@RequestHeader(name = "Authorization") String token) {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.getCompany(companyService.getCompanyLoggedIn()));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("updateCompany") //http://localhost:8080/coupons/updateCompany/
    public ResponseEntity<?> updateCompany(@RequestHeader(name = "Authorization") String token, @RequestBody Company company) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            adminService.updateCompany(company);
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(null);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("deleteCompany/{id}")
    public ResponseEntity deleteCompany(@RequestHeader(name = "Authorization") String token, @PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            adminService.deleteCompany(id);
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(null);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("addCustomer") //http://localhost:8080/coupons/addCustomer
    public ResponseEntity<?> addCustomer(@RequestHeader(name = "Authorization") String token, @RequestBody Customer customer) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.addCustomer(customer));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("updateCustomer") //http://localhost:8080/coupons/updateCustomer
    public ResponseEntity updateCustomer(@RequestHeader(name = "Authorization") String token, @RequestBody Customer customer) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            adminService.updateCustomer(customer);
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(null);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //DELETE ONE CUSTOMER
    @DeleteMapping("deleteCustomer/{id}")
    public ResponseEntity<?> deleteCustomer(@RequestHeader(name = "Authorization") String token, @PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.deleteCustomer(id));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("getAllCustomers")//http://localhost:8080/coupons/getAllCustomers
    public ResponseEntity<?> getAllCustomers(@RequestHeader(name = "Authorization") String token) {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.getAllCustomers());
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ONE COMPANY
    @GetMapping("getOneCompany/{id}") //http://localhost:8080/coupons/getOneCompany/
    public ResponseEntity<?> getOneCompany(@RequestHeader(name = "Authorization") String token, @PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.getCompany(adminService.getCompanyById(id)));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("getOneCustomer/{id}") //http://localhost:8080/coupons/getOneCompany/
    public ResponseEntity<?> getOneCustomer(@RequestHeader(name = "Authorization") String token, @PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(adminService.getOneCustomer(id));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET COMPANY LOGGED IN
    @GetMapping("getCompanyLoggedIn") //http://localhost:8080/coupons/getCompanyLoggedIn
    public ResponseEntity<?> getOneCompany(@RequestHeader(name = "Authorization") String token) {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(companyService.getCompanyLoggedIn());
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET CUSTOMER LOGGED IN
    @GetMapping("getCustomerLoggedIn") //http://localhost:8080/coupons/getCustomerLoggedIn
    public ResponseEntity<?> getOneCustomer(@RequestHeader(name = "Authorization") String token) {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.admin)))
                    .body(customerService.getCustomerLoggedIn());
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}







