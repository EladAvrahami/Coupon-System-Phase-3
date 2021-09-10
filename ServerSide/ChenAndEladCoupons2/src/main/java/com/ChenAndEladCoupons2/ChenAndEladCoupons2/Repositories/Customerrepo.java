package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * an interface that connects by smart dialect to the Customer Table in the DB
 */
public interface Customerrepo extends JpaRepository<Customer, Integer> {

    Customer findByEmailAndPassword(String email, String password);

//    void deleteById(int id);

    Customer findById(int id);

    Customer findByFirstName(String name);

    Customer findByEmail(String email);

    Customer findByPassword(String password);

    Customer getOneById(int customerID);
}
