package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Clr;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.LoginException;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Companyrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Couponrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Customerrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services.*;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.ClientType;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.MyUtil;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.TablePrinter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Order(1)
/**
 * a class that runs all the Admin logics by the services (implements Clr for it)
 */
public class AdminTest implements CommandLineRunner {

    @Autowired
    LoginManager loginManager;
    @Autowired
    CompanyService companyService;
    @Autowired
    AdminService adminService;


    public void run(String... args) throws CouponCustomExceptions, LoginException {

        Company company = Company.builder()
                .name("Toshiba")
                .email("toshiba@gmail.com")
                .password("123412341234")
                //.coupons(Arrays.asList(coupon,coupon3,coupon4,coupon5,coupon6,coupon7))
                .build();

        Company company2 = Company.builder()
                .name("Intel")
                .email("intel@gmail.com")
                .password("543254325432")
                //.coupons(Arrays.asList(coupon2,coupon8, coupon1))
                .build();

        Company company3 = Company.builder()
                .name("IBM")
                .email("ibm@gmail.com")
                .password("876587658765")
                .build();

        Company sameEmailMockCompany = Company.builder()
                .name("just a name")
                .email("chen@gmail.com")
                .password("1234")
                .build();

        Company sameNameMockCompany = Company.builder()
                .name("our successful company")
                .email("wonderful@gmail.com")
                .password("1234")
                .build();

        List<Company> companies = Arrays.asList(company, company2, company3);
        adminService.addCompaniesListToDB(companies);


        Customer customer = Customer.builder()
                .email("aviad@gmail.com")
                .password("232323232323")
                .firstName("aviad")
                .lastName("davidovich")
                .build();

        Customer customer2 = Customer.builder()
                .email("itay@gmail.com")
                .password("876587658765")
                .firstName("itay")
                .lastName("manoach")
                .build();

        Customer sameEmailMockCustomer = Customer.builder()
                .email("ourFavoritCustomer@gmail.com")
                .password("2323")
                .firstName("mickey")
                .lastName("elazar")
                .build();

        Customer customer3 = Customer.builder()
                .email("michelle@gmail.com")
                .password("232323232323")
                .firstName("michelle")
                .lastName("rabi")
                .build();

        List<Customer> customers = Arrays.asList(customer, customer2, customer3);
        adminService.addCustomersListToDB(customers);

        Coupon coupon = Coupon.builder()
                .amount(7)
                .companyID(1)
                .description("quite good coupon")
                .endDate(Date.valueOf("2025-05-05"))
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/Cloths2.jpg")
                .category(Category.clothes)
                .price(34.00)
                .startDate(Date.valueOf("2021-05-05"))
                .title("Cloths coupon 1")
                .build();


        Coupon coupon1 = Coupon.builder()
                .title("Cinema coupon 1")
                .price(434.00)
                .description("very nice")
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/cinema4.jpg")
                .companyID(1)
                .category(Category.movies)
                .startDate(Date.valueOf("2021-06-07"))
                .endDate(Date.valueOf("2025-05-07"))
                .amount(8)
                .build();

        Coupon coupon2 = Coupon.builder()
                .description("one in a lifetime")
                .amount(9)
                .startDate(Date.valueOf("2021-06-07"))
                .endDate(Date.valueOf("2025-05-07"))
                .companyID(1)
                .category(Category.vacation)
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/Vacation.jpg")
                .price(113.44)
                .title("Vacation coupon 1")
                .build();

        Coupon coupon3 = Coupon.builder()
                .title("Cloths coupon 2")
                .price(255.00)
                .companyID(1)
                .startDate(Date.valueOf("2021-06-07"))
                .endDate(Date.valueOf("2025-05-07"))
                .amount(7)
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/Cloths2.jpg")
                .description("first hand")
                .category(Category.clothes)
                .build();

        Coupon coupon4 = Coupon.builder()
                .amount(7)
                .companyID(1)
                .description("highly recommended!")
                .endDate(Date.valueOf("2025-05-05"))
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/Cloths2.jpg")
                .category(Category.clothes)
                .price(134.00)
                .startDate(Date.valueOf("2021-05-05"))
                .title("Cloths coupon 3")
                .build();

        Coupon coupon5 = Coupon.builder()
                .amount(7)
                .companyID(2)
                .description("high quality")
                .endDate(Date.valueOf("2025-05-05"))
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/Cloths2.jpg")
                .category(Category.clothes)
                .price(34.00)
                .startDate(Date.valueOf("2021-05-05"))
                .title("Cloths coupon 4")
                .build();


        Coupon coupon6 = Coupon.builder()
                .title("Cinema coupon 2")
                .price(134.00)
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/cinema4.jpg")
                .companyID(2)
                .category(Category.movies)
                .startDate(Date.valueOf("2021-09-09"))
                .endDate(Date.valueOf("2025-09-09"))
                .amount(0)
                .description("regular coupon")
                .build();

        Coupon coupon7 = Coupon.builder()
                .title("Flights coupon 1")
                .price(24.00)
                .companyID(2)
                .startDate(Date.valueOf("2021-06-07"))
                .endDate(Date.valueOf("2025-05-07"))
                .amount(4)
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/Airport2.png")
                .description("first class seats")
                .category(Category.flights)
                .build();

        Coupon coupon8 = Coupon.builder()
                .title("Cinema coupon 3")
                .price(134.00)
                .image("https://backendlessappcontent.com/F161E0F9-F7B0-3E9D-FF9E-0815CA080100/9AF04F41-0BAF-4825-B091-EA7E6355C2B8/files/myPictures/cinema4.jpg")
                .companyID(2)
                .category(Category.movies)
                .startDate(Date.valueOf("2021-06-07"))
                .endDate(Date.valueOf("2021-07-07"))
                .amount(8)
                .description("free movies")
                .build();

        List<Coupon> coupons = Arrays.asList(coupon, coupon1, coupon2, coupon3, coupon4, coupon5, coupon6, coupon7, coupon8);
        companyService.addCouponsListToDB(coupons);

        List<Coupon> coupons1 = Arrays.asList(coupon, coupon1, coupon2, coupon3, coupon4);
        List<Coupon> coupons2 = Arrays.asList(coupon5, coupon6, coupon7);

        companyService.addCouponsListToCompany(1, coupons1);
        companyService.addCouponsListToCompany(2, coupons2);

        CustomerService customerService = (CustomerService) loginManager.login("michelle@gmail.com", "232323232323", ClientType.customer);

        customerService.purchaseCoupon(2);
        customerService.purchaseCoupon(5);
        customerService.purchaseCoupon(8);

//      adminService.deleteCustomer(3);

//
//        //**************************************admin test**********************************************
//        System.out.println("***********************ADMIN SERVICE TEST *******************************");
//
//
//        //LOGIN FAILED
//        System.out.println("this is a demonstration of a non! successful login of an admin");
//        try {
//            AdminService adminService = (AdminService) loginManager.login("admin1@admin.com", "admin", ClientType.admin);
//        } catch (Exception err) {
//            System.out.println("Cannot login");
//        }
//        MyUtil.printRow();
//
//
//        //LOGIN SUCCESSFUL
//        System.out.println("this is a demonstration of a successful login of an admin");
//        MyUtil.printRow();
//        AdminService adminService = (AdminService) loginManager.login("admin@admin.com", "admin", ClientType.admin);
//        MyUtil.printRow();
//
//
//        //ADD NEW COMPANY SUCCESSFUL
//        System.out.println("this is a demonstration of an admin adding new company");
//
//        adminService.addCompany(company);
//        adminService.addCompany(company2);
//        adminService.addCompany(company3);
//        adminService.addCustomer(customer2);
//
//        adminService.addCustomer(customer3);
//
//        MyUtil.printRow();
//
//
//        //ADD COMPANY - FAILED (IDENTICAL COMPANY NAME)
//        System.out.println("this is a demonstration of an admin failed to add a new company because a company with this name already exists");
//        adminService.addCompany(sameNameMockCompany);
//
//
//        //ADD COMPANY - FAILED (IDENTICAL EMAIL)
//        System.out.println("this is a demonstration of an admin failed to add a new company because a company with this email already exists");
//        adminService.addCompany(sameEmailMockCompany);
//        MyUtil.printRow();
//
//        // COMPANY UPDATE - SUCCESSFUL
//        System.out.println(" this is a demonstration of an admin updating a company's email and password - successfully");
//        company.setEmail("test@walla.com");
//        company.setPassword("test new password");
//        adminService.updateCompany(company);
//        TablePrinter.print(company);
//        MyUtil.printRow();
//
//
//        // COMPANY UPDATE -  NOT SUCCESSFUL (BY ID)
//        System.out.println(" this is a demonstration of an admin trying to update a company's id -  not successfully");
//        company.setId(6);
//        adminService.updateCompany(company);
//        company.setId(1);
//        MyUtil.printRow();
//
//        // COMPANY UPDATE -  NOT SUCCESSFUL (BY NAME)
//        System.out.println(" this is a demonstration of an admin trying to update a company's name -  not successfully");
//        System.out.println("this is the company before the change");
//        adminService.getCompanyById(company.getId());
//        company.setName("name test");
//        adminService.updateCompany(company);
//        System.out.println("this is the company after the change: you can see the name stayed the same");
//        adminService.getCompanyById(company.getId());
//        MyUtil.printRow();
//
//        //GET ALL COMPANIES - SUCCESSFUL
//        System.out.println(" this is a demonstration of an admin presenting all of the companies successfully: ");
//        adminService.getAllCompanies();
//        MyUtil.printRow();
//
//        //GET ONE COMPANY BY COMPANYID
//        System.out.println(" this is a demonstration of an admin presenting one of the companies successfully: ");
//        adminService.getCompanyById(company.getId());
//        MyUtil.printRow();
//
//        //DELETE COMPANY - SUCCESSFUL
//        System.out.println(" this is a demonstration of an admin deleting a company successfully: ");
//        //adminService.deleteCompany (company.getId());
//        MyUtil.printRow();
//
//
//        //ADD ONE CUSTOMER - SUCCESSFUL
//        System.out.println(" this is a demonstration of an admin adding a customer successfully: ");
//        adminService.addCustomer(customer);
//        MyUtil.printRow();
//
//        //ADD ONE CUSTOMER -  NOT SUCCESSFUL (BY EMAIL)
//        System.out.println(" this is a demonstration of an admin adding a customer with the same email not successfully: ");
//        adminService.addCustomer(sameEmailMockCustomer);
//        MyUtil.printRow();
//
//        //UPDATE EXIST CUSTOMER - SUCCESSFUL
//        System.out.println(" this is a demonstration of an admin updating a customer successfully: ");
//        customer.setFirstName("meir");
//        customer.setLastName("cohen");
//        adminService.updateCustomer(customer);
//        MyUtil.printRow();
//
//        System.out.println(customer);
//
//        // CUSTOMER UPDATE -  NOT SUCCESSFUL (BY NAME)
//        System.out.println(" this is a demonstration of an admin trying to update a customer's name -  not successfully");
//        System.out.println("this is the customer before the change");
//        adminService.getOneCustomer(customer.getId());
//        company.setName("name test");
//        adminService.updateCustomer(customer);
//        System.out.println("this is the customer after the change: you can see the name stayed the same");
//        adminService.getOneCustomer(customer.getId());
//        MyUtil.printRow();
//
//        //GET ONE CUSTOMER (BY ID)
//        System.out.println(" this is a demonstration of an admin presenting one customer successfully: ");
//        adminService.getOneCustomer(customer.getId());
//        MyUtil.printRow();
//
//        //GET ALL CUSTOMERS
//        System.out.println(" this is a demonstration of an admin presenting all customers successfully: ");
//        adminService.getAllCustomers();
//        MyUtil.printRow();
//
//        //DELETE ONE CUSTOMER - SUCCESSFUL
//        System.out.println(" this is a demonstration of an admin deleting a customer  successfully: ");
//        //adminService.deleteCustomer (customer.getId ());
//        MyUtil.printRow();
//
//        System.out.println("***********************COMPANY SERVICE TEST *******************************");
//
//        //COMPANY LOGIN FAILED (BY PASSWORD)
//        System.out.println("this is a demonstration of a  not successful login of an company - by password");
//        try {
//            CompanyService companyService = (CompanyService) loginManager.login("dudu@gmail.com", "wrong password", ClientType.company);
//        } catch (Exception err) {
//            System.out.println("Cannot login - check your email and password again");
//        }
//        MyUtil.printRow();
//
//        //COMPANY LOGIN FAILED (BY EMAIL)
//        System.out.println("this is a demonstration of a  not successful login of an company - by email");
//        try {
//            CompanyService companyService = (CompanyService) loginManager.login("wrongEmail@walla.com", "5432", ClientType.company);
//        } catch (Exception err) {
//            System.out.println("Cannot login - check your email and password again");
//        }
//        MyUtil.printRow();
//
//        //LOGIN SUCCESSFUL
//        System.out.println("this is a demonstration of a successful login of a company");
//        CompanyService companyService = (CompanyService) loginManager.login("dudu@gmail.com", "5432", ClientType.company);
//        MyUtil.printRow();
//
//        companyService.addCoupon(coupon);
//        companyService.addCoupon(coupon1);
//        companyService.addCoupon(coupon3);
//        companyService.addCoupon(coupon4);
//
//
//        //ADD NEW COUPON SUCCESSFUL
//        System.out.println("this is a demonstration of an company adding a new coupon");
//        companyService.addCoupon(coupon5);
//        MyUtil.printRow();
//
//        //COUPON UPDATE SUCCESSFULLY
//        System.out.println("this is a demonstration of an company updating a coupon successfully");
//        coupon4.setAmount(8);
//        coupon4.setPrice(55);
//        companyService.updateCoupon(coupon5);
//        TablePrinter.print(coupon5);
//        MyUtil.printRow();
//
//        //COUPON UPDATE FAILED (COUPON_ID)
//        System.out.println("this is a demonstration of an company updating a coupon id not successfully");
//        //there is no coupon.setid because we made the id updatable = false
//        MyUtil.printRow();
//
//
//        //COUPON UPDATE FAILED (COMPANY_ID)
//        System.out.println("this is a demonstration of an company updating a coupon companyID not successfully");
//        System.out.println("this is the coupon before the change");
//        TablePrinter.print(couponrepo.findById(coupon5.getId()));
//        coupon4.setCompanyID(5);
//        companyService.updateCoupon(coupon5);
//        System.out.println("this is the coupon after the change: you can see the companyID stayed the same");
//        TablePrinter.print(couponrepo.findById(coupon5.getId()));
//        MyUtil.printRow();
//
//        //GET ALL COMPANY'S COUPONS
//        adminService.addCompany(company);
//        System.out.println("this is a demonstration of an company presenting all company's coupons");
//        companyService.getAllCouponsPerCompany();
//        MyUtil.printRow();
//
//        //GET ALL COMPANIES COUPONS BY CATEGORY
//        System.out.println("this is a demonstration of an company presenting all company's coupons by category");
//        System.out.println("these are the coupons for movies:");
//        companyService.getAllCouponsByCategoryPerCompany(company.getId(), Category.movies);
//        System.out.println("these are the coupons for clothes:");
//        companyService.getAllCouponsByCategoryPerCompany(company.getId(), Category.clothes);
//        System.out.println("these are the coupons for flights:");
//        companyService.getAllCouponsByCategoryPerCompany(company.getId(), Category.flights);
//        MyUtil.printRow();
//
//        //GET ALL COMPANIES COUPONS BELOW MAX PRICE
//        System.out.println("this is a demonstration of an company presenting all company's coupons below max price");
//        System.out.println("these are the coupons that costs below 100nis");
//        companyService.getAllCouponsByPricePerCompany(company.getId(), 0.0, 100.0);
//        System.out.println("these are the coupons that costs below 150nis");
//        companyService.getAllCouponsByPricePerCompany(company.getId(), 0.0, 150.0);
//        MyUtil.printRow();
//
//        //GET ALL COMPANY'S DETAILS BY ID
//        System.out.println("this is a demonstration of a company details show");
//        adminService.getCompanyById(company.getId());
//        MyUtil.printRow();
//
//        //DELETE COUPON (AND ALL OF HIS PURCHASES)
//        System.out.println("this is a demonstration of an company deleting a coupon successfully");
//        //companyService.deleteCoupon (coupon.getId ());
//        companyService.deleteCoupon(coupon5);
//        MyUtil.printRow();
//
//        System.out.println("***********************CUSTOMER SERVICE TEST *******************************");
//
//        //LOGIN  NOT SUCCESSFUL (BY EMAIL)
//        System.out.println("this is a demonstration of a not successful login of a customer");
//        try {
//            CustomerService customerService = (CustomerService) loginManager.login("wrongEmail@walla.com", "8765", ClientType.customer);
//        } catch (Exception err) {
//            System.out.println("Cannot login - check your email and password again");
//        }
//        MyUtil.printRow();
//
//        //COMPANY LOGIN FAILED (BY PASSWORD)
//        System.out.println("this is a demonstration of a  not successful login of an customer - by password");
//        try {
//            CustomerService customerService = (CustomerService) loginManager.login("ourFavoritCustomer2@gmail.com", "5432", ClientType.customer);
//        } catch (Exception err) {
//            System.out.println("Cannot login - check your email and password again");
//        }
//        MyUtil.printRow();
//
//
//        //LOGIN SUCCESSFUL
//        System.out.println("this is a demonstration of a successful login of a customer");
//        CustomerService customerService = (CustomerService) loginManager.login("ourFavoritCustomer2@gmail.com", "8765", ClientType.customer);
//        MyUtil.printRow();

//        //COUPON PURCHASE - SUCCESSFUL
//        System.out.println("this is a demonstration of a customer purchasing a coupon");
//        adminService.addCustomer(customer);
//        companyService.addCoupon(coupon);
//        companyService.addCoupon(coupon1);
        //customerService.purchaseCoupon(coupon.getId());
//        MyUtil.printRow();
//
//        //COUPON PURCHASE -  NOT SUCCESSFUL (COUPON WAS ALREADY PURCHASED BY CUSTOMER)
//        System.out.println("this is a demonstration of a customer not succeeding to purchase a coupon - already has the coupon");
//        customerService.purchaseCoupon(coupon.getId());
//        MyUtil.printRow();
//
//        //COUPON PURCHASE -  NOT SUCCESSFUL (NOT ENOUGH IN STOCK)
//        System.out.println("this is a demonstration of a customer not succeeding to purchase a coupon - out of stock");
//        coupon1.setAmount(0);
//        companyService.updateCoupon(coupon1);
//        customerService.purchaseCoupon(coupon1.getId());
//        MyUtil.printRow();
//
//        //COUPON PURCHASE -  NOT SUCCESSFUL (THE COUPON HAS EXPIRED)
//        System.out.println("this is a demonstration of a customer not succeeding to purchase a coupon - coupon has expired");
//        //companyFacade.deleteCoupon((couponDBDAO.getOneCouponByCoupon(coupon)).getId());
//        coupon1.setAmount(4);
//        coupon1.setEndDate((Date.valueOf("2020-06-07")));
//        companyService.updateCoupon(coupon1);
//        customerService.purchaseCoupon(coupon1.getId());
//        MyUtil.printRow();
//
//
//        //GET ALL THE COUPONS FOR THE CUSTOMER
//        System.out.println("this is a demonstration of a customer's coupon list");
//        coupon1.setEndDate((Date.valueOf("2022-06-07")));
//        companyService.updateCoupon(coupon1);
//        customerService.purchaseCoupon(coupon1.getId());
//        customerService.getAllCouponsPerCustomer();
//        MyUtil.printRow();
//
//        //GET ALL THE COUPONS FOR THE CUSTOMER BY CATEGORY
//        System.out.println("this is a demonstration of a customer's coupon list by category");
//        System.out.println("BY CLOTHES:");
//        customerService.getAllCouponsByCategoryPerCustomer(Category.clothes);
//        System.out.println("BY MOVIES");
//        customerService.getAllCouponsByCategoryPerCustomer(Category.movies);
//        MyUtil.printRow();
//
////        //GET ALL THE COUPONS FOR THE CUSTOMER BY MAX PRICE
////        System.out.println ("these are the coupons that costs below 100nis");
////        customerService.getAllCouponsByMaxPricePerCustomer (100);
////        System.out.println ("these are the coupons that costs below 150nis");
////        customerService.getAllCouponsByMaxPricePerCustomer (150);
////        MyUtil.printRow ();
//
//        //GET DETAILS FOR COSTUMER
//        System.out.println("this is a demonstration of a getting the customer's details");
//        TablePrinter.print(customerrepo.getOne(customerService.getCustomerLoggedIn().getId()));
//        MyUtil.printRow();
//
//        //DELETE COUPON PURCHASE
//        System.out.println("this is a demonstration of a customer deleting a coupon purchase");
//        //customerService.deleteCouponPurchase(coupon1.getId());
//        MyUtil.printRow();
//        //customerService.purchaseCoupon(coupon1.getId());
    }
}