package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
 *this class contain all the basic parameters to create a Customer Obj
 */
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @Singular
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Coupon> coupons;

}
