package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * an interface that connects by smart dialect to the Company Table in the DB
 */
public interface Companyrepo extends JpaRepository<Company, Integer> {

    Company findById(int id);

    Company findByEmailAndPassword(String email, String password);

    Company findCompanyByNameOrEmail(String name, String email);

    Company findByNameOrEmail(String name, String email);

    Company findByName(String name);

    Company findByEmail(String email);

    Company findByPassword(String password);


}
