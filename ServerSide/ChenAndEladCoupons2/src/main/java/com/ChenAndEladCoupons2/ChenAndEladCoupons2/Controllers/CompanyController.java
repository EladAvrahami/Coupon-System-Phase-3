package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Controllers;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.UserDetails;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.AdminService;
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
 * a class that contains the methods of the Company Controller Rest Api (post get Put Delete)
 */
public class CompanyController {

    private final CompanyService companyService;
    private final CustomerService customerService;
    private final AdminService adminService;
    private final JWTutil jwTutil;

    @PostMapping("companyLogin")
    public ResponseEntity<?> companyLogin(@RequestBody UserDetails userData) throws CouponCustomExceptions{
        if (companyService.login(userData.getEmail(), userData.getPassword())) {
            String myToken = jwTutil.generateToken(new UserDetails(userData.getEmail(), companyService.getCompanyLoggedIn().getId(), ClientType.company));
            return new ResponseEntity<>(myToken, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("addCoupon") //http://localhost:8080/coupons/addCoupon
    public ResponseEntity<?> addCoupon(@RequestHeader(name = "Authorization") String token, @RequestBody Coupon coupon) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(companyService.addCoupon(coupon));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("deleteCoupon/{id}")
    public ResponseEntity<?> deleteCoupon(@RequestHeader(name = "Authorization") String token, @PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(companyService.deleteCoupon(id));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("updateCoupon") //http://localhost:8080/coupons/updateCoupon
    public ResponseEntity<?> updateCoupon(@RequestHeader(name = "Authorization") String token, @RequestBody Coupon coupon) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            companyService.updateCoupon(coupon);
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(null);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER COMPANY
    @GetMapping("getCouponsByCompany/{id}")//http://localhost:8080/coupons/getCouponsByCompany/
    public ResponseEntity<?> getCouponsByCompany(@RequestHeader(name = "Authorization") String token, @PathVariable int id) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(companyService.getAllCouponsPerCompany(id));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER COMPANY
    @GetMapping("getCouponsByCompany")//http://localhost:8080/coupons/getCouponsByCompany/
    public ResponseEntity<?> getCouponsByCompany2(@RequestHeader(name = "Authorization") String token) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(companyService.getAllCouponsPerCompany());
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER COMPANY BY CATEGORY
    @GetMapping("getCouponsByCategory")//http://localhost:8080/coupons/getCouponsByCompany/
    public ResponseEntity<?> getCouponsByCategory(@RequestHeader(name = "Authorization") String token, @RequestParam Category category) throws CouponCustomExceptions{
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(companyService.getAllCouponsByCategoryPerCompany(companyService.getCompanyLoggedIn().getId(), category));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    //GET ALL COUPONS PER COMPANY BY MAX PRICE
    @GetMapping("getCouponsByMaxPrice/{maxPrice}")//http://localhost:8080/coupons/getCouponsByCompany/
    public ResponseEntity<?> getCouponsByMaxPrice(@RequestHeader(name = "Authorization") String token, @PathVariable double maxPrice) throws CouponCustomExceptions {
        if (jwTutil.validateToken(token)) {
            return ResponseEntity.ok()
                    .header("Authorization", jwTutil.generateToken(new UserDetails(
                            jwTutil.extractEmail(token),
                            ClientType.company)))
                    .body(companyService.getAllCouponsByPricePerCompany(companyService.getCompanyLoggedIn().getId(), maxPrice));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("getAllCoupons")
    public ResponseEntity<?> getAllCoupons() {
        return new ResponseEntity<>(companyService.getAllCoupons(), HttpStatus.OK);
    }

}

