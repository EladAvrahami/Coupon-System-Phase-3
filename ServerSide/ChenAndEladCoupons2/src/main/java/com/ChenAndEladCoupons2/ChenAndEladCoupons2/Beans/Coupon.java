package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
 *this class contain all the basic parameters to create a Coupon Obj
 */
public class Coupon {
    //@ManyToMany
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private int id;
    @Column(updatable = false)
    private int companyID;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private int amount;
    private double price;
    private String image;
}
