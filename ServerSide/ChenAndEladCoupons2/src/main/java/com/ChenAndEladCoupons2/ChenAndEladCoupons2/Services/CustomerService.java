package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponException;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Couponrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Customerrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.TablePrinter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
/**
 * a Service that allows the user to send orders to the DB as a facade
 */
public class CustomerService implements ClientService {
    @Autowired
    Customerrepo customerrepo;
    @Autowired
    Couponrepo couponrepo;

    Customer customerLoggedIn;


    public Customer getCustomerLoggedIn() {
        return customerLoggedIn;
    }

    /**
     * a method that prints and gets one Company from the Company table (by Company Object)
     *
     * @param customerID the id of specific Customer by which we identify the Customer
     * @return a Customer Object
     */
    public Customer getOneCustomer(int customerID) throws CouponCustomExceptions {
        if (!customerrepo.existsById(customerID)) {
            throw new CouponCustomExceptions(new Date(), "There's NO customer with that id.");
        }
        return customerrepo.getOne(customerID);
    }

    public boolean purchaseCoupon(int couponID) throws CouponCustomExceptions {
        Customer customerLI = (customerrepo.getOne(customerLoggedIn.getId()));
        System.out.println(customerLI);
        System.out.println("coupon id" + couponID);
        Coupon couponToPurchase = couponrepo.findById(couponID);
        //cant purchase the same coupon more than once
        if (customerLI.getCoupons().contains(couponToPurchase)) {
            throw new CouponCustomExceptions(new Date(), "* You already have this coupon.");
        }
        if (!couponrepo.existsById(couponID)) {
            throw new CouponCustomExceptions(new Date(), "* Coupon not found.");
        }
        if (couponToPurchase.getAmount() == 0) {
            throw new CouponCustomExceptions(new Date(), "* Coupon ran out of stock.");
        }
        if (couponToPurchase.getEndDate().before(new Date())) {
            throw new CouponCustomExceptions(new Date(), "* The coupon has expired.");
        } else {
            List<Coupon> coupons = (customerrepo.getOne(customerLoggedIn.getId())).getCoupons();
            coupons.add(couponrepo.findById(couponID));
            customerLI.setCoupons(coupons);
            customerrepo.saveAndFlush(customerLI);
            couponToPurchase.setAmount(couponToPurchase.getAmount() - 1);
            couponrepo.saveAndFlush(couponToPurchase);
            System.out.println("coupon number :" + couponID + " was purchased by :" + "customer number " + customerLoggedIn.getId());
            return true;
//        } catch (Exception err) {
//            System.out.println ("CustomerService.purchaseCoupon: " + err.getMessage ());
//        }
        }
    }

    /**
     * a method that deletes a coupon purchase and removes the Coupon from the Customer's Coupon list
     *
     * @param couponID the id of specific Coupon by which we identify the Coupon
     * @return boolean answer true if the coupon was deleted ,or false.
     */
    public boolean deleteCouponPurchase(int couponID) {
        Customer customerLI = (customerrepo.getOne(customerLoggedIn.getId()));
        Coupon couponToDelete = couponrepo.findById(couponID);
        for (Coupon coupon : customerrepo.findById(customerLoggedIn.getId()).getCoupons()) {
            List<Coupon> coupons = (customerrepo.getOne(customerLoggedIn.getId())).getCoupons();
            coupons.remove(couponrepo.findById(couponID));
            customerLI.setCoupons(coupons);
            customerrepo.saveAndFlush(customerLI);
            couponToDelete.setAmount(couponToDelete.getAmount() + 1);
            couponrepo.saveAndFlush(couponToDelete);
            System.out.println("coupon number :" + couponID + " was deleted by :" + "customer number " + customerLoggedIn.getId());
            return true;
        }
        return false;
    }

    /**
     * a method that get and prints the list of coupons of a Customer that logged in
     *
     * @return a list of Coupons
     */
    public List<Coupon> getAllCouponsPerCustomer() throws CouponCustomExceptions {
        if (customerLoggedIn == null) {
            throw new CouponCustomExceptions(new Date(), "* There's NO customer logged-in.");
        }
        Customer customerLI = (customerrepo.getOne(customerLoggedIn.getId()));
        TablePrinter.print(customerLI.getCoupons());
        //for (Coupon coupon : customerLI.getCoupons ()) {
        //    System.out.println (coupon);
        // }
        return customerLI.getCoupons();
    }

    public List<Coupon> getOneCustomerCoupons(int id) throws CouponCustomExceptions {
        if (!customerrepo.existsById(id)) {
            throw new CouponCustomExceptions(new Date(), "There's NO customer with that id.");
        }
        Customer customer = (customerrepo.getOne(id));
        TablePrinter.print(customer.getCoupons());
        //for (Coupon coupon2 : companyrepo.findCompanyById (companyID).getCoupons ()) {
        // TablePrinter.print (coupon2);
        //}
        return customer.getCoupons();
    }


    /**
     * a method that get and prints the list of coupons of a Customer filtered by Category
     *
     * @param category the enum item that we want to filter the Coupon list by.
     * @return a list of Coupons
     */
    public List<Coupon> getAllCouponsByCategoryPerCustomer(Category category) throws CouponCustomExceptions {
        if (customerLoggedIn == null) {
            throw new CouponCustomExceptions(new Date(), "* You are not logged-in.");
        }
        if (couponrepo.findByCategory(category) == null) {
            throw new CouponCustomExceptions(new Date(), "* There's no such category.");
        }
        Customer customerLI = (customerrepo.getOne(customerLoggedIn.getId()));
        for (Coupon coupon : customerLI.getCoupons()) {
            if (coupon.getCategory() == category)
                TablePrinter.print(coupon);
        }
        return customerLI.getCoupons().stream().filter(coupon -> coupon.getCategory() == category).collect(Collectors.toList());
    }

    /**
     * a method that gets and prints all the Coupons that belongs to the Customer by price
     *
     * @param maxPrice the high price that we filter the list by
     * @return a list of Coupons
     */
    public List<Coupon> getAllCouponsByMaxPricePerCustomer(double maxPrice) throws CouponCustomExceptions {
        List<Coupon> byMaxPrice = new ArrayList<>();
        Customer customerLI = (customerrepo.getOne(customerLoggedIn.getId()));
        if (customerLoggedIn == null) {
            throw new CouponCustomExceptions(new Date(), "* You are not logged-in.");
        }
        if (maxPrice < 0) {
            throw new CouponCustomExceptions(new Date(), "* The maximum price must be positive.");
        }
        for (Coupon coupon : customerLI.getCoupons()) {
            if (coupon.getPrice() <= maxPrice) {
                TablePrinter.print(coupon);
                byMaxPrice.add(coupon);
            }
        }
        return byMaxPrice;
    }


    @Override
    /**
     * a methods that checks the validity of the Customer's email and password and return a boolean answer
     */
    public boolean login(String email, String password) throws CouponCustomExceptions {
        if (customerrepo.findByEmail(email) == null) {
            System.out.println("You typed the wrong email. Try again.");
            throw new CouponCustomExceptions(new Date(), "* You typed the wrong email. Try again.");
        }
//        if (customerrepo.findByPassword(password) == null) {
//            System.out.println("You typed the wrong password. Try again.");
//            throw new CouponCustomExceptions(new Date(), "* You typed the wrong password. Try again.");
//        }
        customerLoggedIn = customerrepo.findByEmailAndPassword(email, password);
        return true;
    }
}

