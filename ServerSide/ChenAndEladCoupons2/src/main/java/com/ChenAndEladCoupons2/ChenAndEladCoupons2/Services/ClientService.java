package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;

/**
 * an interface that contains the login method used by the Services implementing it
 */
public interface ClientService {

    boolean login(String email, String password) throws CouponCustomExceptions;
}
