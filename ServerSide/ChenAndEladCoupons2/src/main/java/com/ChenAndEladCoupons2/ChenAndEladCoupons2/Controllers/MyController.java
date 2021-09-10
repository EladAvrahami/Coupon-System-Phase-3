package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Controllers;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.UserDetails;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.ClientType;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.JWTutil;
import lombok.RequiredArgsConstructor;
import org.hibernate.usertype.UserType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("jwt")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class MyController {

    private JWTutil util;

    @GetMapping("login/{userEmail}/{userId}")
    public ResponseEntity<?> login ( @PathVariable String userId, @PathVariable String userEmail){
        String myToken = util.generateToken (new UserDetails("1", "userEmail",ClientType.company));
        return new ResponseEntity<> (myToken, HttpStatus.ACCEPTED);
    }

    @GetMapping ("test")
    public
     ResponseEntity<?> noLogin(){
        return new ResponseEntity<> ("hello guest",HttpStatus.OK);
    }

    @GetMapping("token")
    public ResponseEntity<?> checkToken(@RequestHeader(name = "Authorization")String token){
        if (util.validateToken(token)) {
            return new ResponseEntity<> ("hello admin...", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<> ("why who are you",HttpStatus.BAD_REQUEST);
            }

    }
}
