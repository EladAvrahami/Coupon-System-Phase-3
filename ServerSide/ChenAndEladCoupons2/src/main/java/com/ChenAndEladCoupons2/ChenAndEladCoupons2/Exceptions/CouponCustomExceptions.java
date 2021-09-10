package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions;

import java.util.Date;

public class CouponCustomExceptions extends Exception {
    /**
     * Exception that we will send as massage every time that the exception is called
     * @param date
     * @param message the message that the exceptions gets and prints
     */
    public CouponCustomExceptions(Date date, String message) {

        super (message);
    }

}

