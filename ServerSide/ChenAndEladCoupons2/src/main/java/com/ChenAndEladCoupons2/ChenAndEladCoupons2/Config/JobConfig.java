package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Config;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Couponrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;
import java.util.List;

@Configuration
@EnableScheduling
/**
 * a class that runs a scheduled process (by cron definition)
 */
public class JobConfig {
    @Autowired
    Couponrepo couponrepo;


    @Scheduled(cron = "0 20 22 * * *")
    /**
     * this scheduled method runs over a list of coupons and checks if the EndDate has expired
     */
    public void scheduledCouponDeleteJob() {
        System.out.println("thread working********************************************");
        List<Coupon> couponList = couponrepo.findAll ();

        for (Coupon item : couponList) {
            java.util.Date currentDate = new Date (); //new Date(new java.util.Date().getTime())
            //checks if the coupon is expired
            if (currentDate.after(item.getEndDate())) {
                //deletes the purchase history of the coupon in the sql table and deletes the coupon from the sql table
                couponrepo.deleteById (item.getId());

                System.out.println("Coupon was expired and deleted from DB : " + item.getTitle());
            }


        }

    }
}

