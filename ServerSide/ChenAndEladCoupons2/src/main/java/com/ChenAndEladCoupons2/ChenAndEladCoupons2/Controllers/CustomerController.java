package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Controllers;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.UserDetails;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.CompanyService;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.CustomerService;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
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
 * a class that contains the methods of the Customer Controller Rest Api (post get Put Delete)
 */
public class CustomerController {

    private final CustomerService customerService;
    private final CompanyService companyService;
    private final JWTutil jwTutil;
    @PostMapping("customerLogin")

    public ResponseEntity<?> customerLogin(@RequestBody UserDetails userData) throws CouponCustomExceptions {
        if (customerService.login(userData.getEmail(), userData.getPassword())) {
            String myToken = jwTutil.generateToken(new UserDetails( userData.getEmail(),customerService.getCustomerLoggedIn().getId(), ClientType.customer));
            return new ResponseEntity<>(myToken, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("purchaseCoupon/{couponId}") //http://localhost:8080/coupons/purchaseCoupon
    public ResponseEntity<?> purchaseCoupon(@RequestHeader(name = "Authorization") String token, @PathVariable int couponId) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            System.out.println("im in");
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.customer)))
                    .body(customerService.purchaseCoupon(couponId));
        } else {
            System.out.println("invalid coupon");
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

//    @PostMapping("purchaseCoupon/{id}")
//    @ResponseStatus(code = HttpStatus.CREATED)
//    public void purchaseCoupon(@PathVariable int id) throws CouponCustomExceptions {
//        customerService.purchaseCoupon (id);
//    }

    //GET ALL COUPONS PER COMPANY
    @GetMapping("getCouponsByCustomer")//http://localhost:8080/coupons/getCouponsByCompany/
    public ResponseEntity<?> getCouponsByCustomer(@RequestHeader(name = "Authorization") String token) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.customer)))
                    .body(customerService.getAllCouponsPerCustomer ());
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER CUSTOMER FROM ADMIN
    @GetMapping("getCouponsByCustomer2/{id}")//http://localhost:8080/coupons/getCouponsByCustomer2/
    public ResponseEntity<?> getCouponsByCustomer2(@RequestHeader(name = "Authorization") String token,@PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.customer)))
                    .body(customerService.getOneCustomerCoupons (id));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER CUSTOMER BY CATEGORY
    @GetMapping("getCouponsPerCustomerByCategory")//http://localhost:8080/coupons/getCouponsByCustomer2/
    public ResponseEntity<?> getCouponsPerCustomerByCategory(@RequestHeader(name = "Authorization") String token,@RequestBody Category category) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.customer)))
                    .body(customerService.getAllCouponsByCategoryPerCustomer (category));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER CUSTOMER BY MAXPRICE
    @GetMapping("getCouponsPerCustomerByMaxPrice/{maxPrice}")//http://localhost:8080/coupons/getCouponsPerCustomerByMaxPrice/
    public ResponseEntity<?> getCouponsPerCustomerByMaxPrice(@RequestHeader(name = "Authorization") String token,@PathVariable double maxPrice) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.customer)))
                    .body(customerService.getAllCouponsByMaxPricePerCustomer (maxPrice));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}


