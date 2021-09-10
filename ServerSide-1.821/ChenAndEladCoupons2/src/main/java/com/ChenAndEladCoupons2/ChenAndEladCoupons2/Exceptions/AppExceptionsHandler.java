package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.undo.CannotUndoException;
import java.util.Date;
@RestController
@ControllerAdvice
public class AppExceptionsHandler {

    // global exceptions handler
    @ExceptionHandler(value = { CouponCustomExceptions.class })
    public ResponseEntity<?> handleExceptions(CouponCustomExceptions e) {
        CouponCustomExceptions errorMessage = new CouponCustomExceptions(new Date(), e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
