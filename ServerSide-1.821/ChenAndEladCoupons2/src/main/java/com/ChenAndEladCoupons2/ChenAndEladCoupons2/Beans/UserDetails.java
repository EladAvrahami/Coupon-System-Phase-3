package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.ClientType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class UserDetails {

    private String password;
    private String email;
    public ClientType clientType;
    public int userId;
    //this c'tor is for authentication
    public UserDetails(String password, String email, ClientType clientType) {
        this.password = password;
        this.email = email;
        this.clientType = clientType;

    }

    ////this c'tor is for the token
    public UserDetails(String email, int userId, ClientType clientType) {
        this.email = email;
        this.userId = userId;
        this.clientType = clientType;

    }

    public UserDetails( String email, ClientType clientType) {
        this.email = email;
        this.clientType = clientType;

    }

}
