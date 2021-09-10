package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * an interface that connects by smart dialect to the Coupon Table in the DB
 */
public interface Couponrepo extends JpaRepository<Coupon, Integer> {

    Coupon findById(int id);

    Coupon findByCategory(Category category);

    Coupon findByCompanyID(int companyID);
    // Coupon findByIdAndCompanyID(int id, int CompanyID);

    Coupon findByTitle(String title);

    Coupon findByTitleAndCompanyID(String title, int companyID);

    //List<Coupon> findAllByCompanyIdAndCategory(int companyID, Category category);
    List<Coupon> findAllByCompanyIDAndCategory(int companyID, Category category);

    List<Coupon> findAllByCompanyIDAndPrice(int companyID, double price);

//    Coupon getById(int couponID);

    /**
     * Deletes purchases records from the "customer_coupons" table.
     *
     * @param id - The coupon's id.
     */
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM customer_coupons WHERE coupons_id=:id"
            , nativeQuery = true)
    void deleteByCouponId(int id);

    /**
     * Deletes purchases records from the "customer_coupons" table.
     *
     * @param id - The coupon's id.
     */
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM company_coupons WHERE coupons_id=:id"
            , nativeQuery = true)
    void deleteByCouponsId(int id);

    void deleteById(int id);
    //@Transactional
    //@Modifying
    //@Query(value = "DELETE from customers_coupons WHERE customer_id=:customerID AND coupons_id=:couponID", nativeQuery = true)
    //void deleteCouponPurchase(int customerID, int couponID);
    //List<Coupon> findBy

}
