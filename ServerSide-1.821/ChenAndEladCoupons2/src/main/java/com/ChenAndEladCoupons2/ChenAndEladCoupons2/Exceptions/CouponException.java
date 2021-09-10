package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions;

public class CouponException extends Exception {
    /**
     * Exception that we will send as massage every time that the exception is called
     * @param message the message that the exceptions gets and prints
     */
    public CouponException(String message) {

        super (message);
    }
}
