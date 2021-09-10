package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Config;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;



@Configuration
public class RestTemplateConfig {


    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate ();
    }



}
