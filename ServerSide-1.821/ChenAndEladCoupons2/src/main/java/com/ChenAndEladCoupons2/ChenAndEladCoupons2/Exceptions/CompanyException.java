package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions;

public class CompanyException extends Exception{
    /**
     * Exception that we will send as massage every time that the exception is called
     * @param message the message that the exceptions gets and prints
     */
    public CompanyException (String message) {

        super(message);
    }
}
