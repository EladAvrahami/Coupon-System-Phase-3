package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CompanyException;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Companyrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Couponrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Customerrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.TablePrinter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
/**
 * a Service that allows the user to send orders to the DB as a facade
 */
public class AdminService implements ClientService {


    @Autowired
    Companyrepo companyrepo;
    @Autowired
    Customerrepo customerrepo;
    @Autowired
    Couponrepo couponrepo;

    private final String adminEmail = "admin@admin.com";
    private final String adminPass = "admin";

    /**
     * this method add a new company to our coupons System if doesn't exist already.
     *
     * @param company is a new object that we going create and add to our list of companies
     * @return boolean answer true if the Company was added ,or false.
     */
    public boolean addCompany(Company company) throws CouponCustomExceptions {
        //double check so that we won't add a double company by name or ID
        Company retObject = null;
        if (companyrepo.findByName(company.getName()) != null) {
            throw new CouponCustomExceptions(new Date(), "* There's already a company with that name in the DB. The company was NOT added.");
        }
        if (companyrepo.findByEmail(company.getEmail()) != null) {
            throw new CouponCustomExceptions(new Date(), "* There's already a company with that email in the DB. The company was NOT added.");
        }
        retObject = companyrepo.save(company);
        companyrepo.save(company);
        System.out.println("new company number " + company.getId() + " was added");
        retObject.getId(); // get id here
        return true;
    }

    /**
     * Adds a list of companies to the DB. Checks if they already exists there (by name
     * and email), and adds them only if they don't.
     *
     * @param companies - A list of companies.
     * @throws CouponCustomExceptions - When there is already a company with this name or email.
     */

    public void addCompaniesListToDB(List<Company> companies) throws CouponCustomExceptions {
        for (Company company : companies) {
            if (companyrepo.findByNameOrEmail(company.getName(), company.getEmail()) != null) {
                throw new CouponCustomExceptions(new Date(), "The company " + company.getName() + " already exists in the DB.");
            }
            companyrepo.save(company);
        }
    }

    /**
     * Adds a list of customers to the DB. Checks if they already exists there (by email),
     * and adds them only if they don't.
     *
     * @param customers - A list of customers.
     * @throws CouponCustomExceptions - When there's already a customer with that email.
     */

    public void addCustomersListToDB(List<Customer> customers) throws CouponCustomExceptions {
        for (Customer customer : customers) {
            if (customerrepo.findByEmail(customer.getEmail()) != null) {
                throw new CouponCustomExceptions(new Date(), "The customer " + customer.getFirstName() + " " + customer.getLastName() + " already exists in the DB.");
            }
            customerrepo.save(customer);
        }
    }

//    /**
//     * this method updates company's details
//     *
//     * @param companyID the id of specific company by which we identify the Company
//     * @throws CouponCustomExceptions an exception that operates when an error occures
//     */
//    public void updateCompany2(int companyID) throws CouponCustomExceptions {
//        if (!companyrepo.existsById(companyID)) {
//            throw new CouponCustomExceptions(new Date(), "* There's is NO a company with that id. Company was NOT updated.");
//        }
//            companyrepo.save(companyrepo.findCompanyById(companyID));
//    }

    /**
     * this method updates company's details
     *
     * @param company the company that we will update
     * @throws CouponCustomExceptions an exception that operates when an error occures
     */
    public void updateCompany(Company company) throws CouponCustomExceptions {
        if (!companyrepo.existsById(company.getId())) {
            System.out.println("Company number : " + company.getId() + " was NOT updated");
            throw new CouponCustomExceptions(new Date(), "* There's NO company with that id in the DB." +
                    " No editing was done.");
        }
        if (companyrepo.findByName(company.getName()) == null) {
            System.out.println("Company number : " + company.getId() + " was NOT updated");
            throw new CouponCustomExceptions(new Date(), "* You can't edit a company's name." +
                    " No editing was done.");
        }
        companyrepo.save(company);
        System.out.println("company number : " + company.getId() + " was updated");
    }

    /**
     * this method deletes a Company
     *
     * @param companyID the id of specific company by which we identify the Company
     * @return boolean answer true if the Company was deleted ,or false.
     */
    public boolean deleteCompany(int companyID) throws CouponCustomExceptions {
        if (!companyrepo.existsById(companyID)) {
            throw new CouponCustomExceptions(new Date(), "* There's NO company with that id in the DB." +
                    " No company was deleted.");
        }
        Company company = companyrepo.findById(companyID);
        company.getCoupons().forEach(coupon -> couponrepo.deleteByCouponId(coupon.getId()));
        company.getCoupons().forEach(coupon -> couponrepo.deleteByCouponsId(coupon.getId()));
        company.getCoupons().forEach(coupon -> couponrepo.deleteById(coupon.getId()));
        companyrepo.delete(companyrepo.getOne(companyID));
        System.out.println("company number " + companyID + " was deleted");
        return true;
    }

    /**
     * a method that prints and gets all the Companies in the table
     *
     * @return A list of companies from the Company table
     */
    public List<Company> getAllCompanies() {
        System.out.println("======================================================================");
        for (Company company : companyrepo.findAll()) {
            TablePrinter.print(company);
            System.out.println("======================================================================");
            System.out.println("this is the coupons list for company number: " + company.getId());
            for (Coupon coupon : company.getCoupons()) {
                int num = 1;
                System.out.println("coupon number " + num + "\n" + coupon);
                num += 1;
                System.out.println("-------------------------------------------------------------------");
            }
        }
        return companyrepo.findAll();
    }

    /**
     * a method that prints and gets one Company from the Company table
     *
     * @param companyid the id of specific company by which we identify the Company
     * @return a Company Object
     */
    public Company getCompanyById(int companyid) throws CouponCustomExceptions {
        if (!companyrepo.existsById(companyid)) {
            throw new CouponCustomExceptions(new Date(), "There's no company with that id.");
        }
        TablePrinter.print(companyrepo.findById(companyid));
        System.out.println("the company coupons: ");
        TablePrinter.print(companyrepo.findById(companyid).getCoupons());
        //for (Coupon coupon : companyrepo.findCompanyById (companyid).getCoupons ()) {
        // int num = 1;
        //System.out.println ("coupon number " + num + "\n");
        //num += 1;
        //System.out.println ("-------------------------------------------------------------------");
        return companyrepo.findById(companyid);
    }

    /**
     * a method that prints and gets one Company from the Company table (by Company Object)
     *
     * @param company the company that we get
     * @return a Company Object
     */
    public Company getCompany(Company company) {
        System.out.println(companyrepo.findById(company.getId()));
        System.out.println("-----------------------------------------------------------------------");
        for (Coupon coupon : companyrepo.findById(company.getId()).getCoupons()) {
            int num = 1;
            System.out.println("coupon number " + num + "\n" + coupon);
            num += 1;
            System.out.println("-------------------------------------------------------------------");
        }
        return companyrepo.findById(company.getId());
    }

    /**
     * a method that adds a Customer Object to the Customer table in the DB
     *
     * @param customer the Customer we want to add
     * @return boolean answer true if the customer was added ,or false.
     */
    public boolean addCustomer(Customer customer) throws CouponCustomExceptions {
        Customer retObject = null;
        if (customerrepo.findByEmail(customer.getEmail()) != null) {
            System.out.println("cant add customer");
            throw new CouponCustomExceptions(new Date(), "* There's already a customer with that email in the DB." +
                    "The customer was NOT added.");
        }
        retObject = customerrepo.save(customer);
        customerrepo.save(customer);
        retObject.getId();
        System.out.println("new Customer number " + customer.getId() + " was added");
        return true;
    }

    /**
     * this method updates customer's details
     *
     * @param customer the Customer Object that we want to update
     * @throws CouponCustomExceptions an exception that operates when an error occures
     */
    public void updateCustomer(Customer customer) throws CouponCustomExceptions {
        if (!customerrepo.existsById(customer.getId())) {
            System.out.println("company number : " + customer.getId() + "There's NO customer with that id in the DB.");
            throw new CouponCustomExceptions(new Date(), "* There's NO customer with that id in the DB." +
                    "The company was NOT updated.");
        }
        customerrepo.save(customer);
        System.out.println("customer number : " + customer.getId() + " was updated");
    }

    /**
     * a method that deletes a Customer from the Customer table in the DB
     *
     * @param customerID the id of specific Cutomer by which we identify the Customer
     * @return boolean answer true if the customer was deleted ,or false.
     */
    public boolean deleteCustomer(int customerID) throws CouponCustomExceptions {
        if (!customerrepo.existsById(customerID)) {
            throw new CouponCustomExceptions(new Date(), "There's NO customer with that id in the DB." +
                    "No delete was done.");
        }
        Customer customer = customerrepo.findById(customerID);
        List<Coupon> coupons = customer.getCoupons();
        coupons.clear();
        customer.setCoupons(coupons);
        customerrepo.saveAndFlush(customer);
        customerrepo.delete(customer);
        return true;
    }

    /**
     * a method that gets all the customers from the Customers table in the DB
     *
     * @return a list of Customers
     */
    public List<Customer> getAllCustomers() {
        for (Customer customer : customerrepo.findAll()) {
            TablePrinter.print(customer);
            for (Coupon coupon : customer.getCoupons()) {
                TablePrinter.print(coupon);
            }
        }
        return customerrepo.findAll();
    }

    /**
     * a method that gets one Customer from the Customers Table in the DB
     *
     * @param customerID the id of specific Customer by which we identify the Customer
     * @return a Customer Object
     */
    public Customer getOneCustomer(int customerID) throws CouponCustomExceptions {

        if (customerrepo.findById(customerID) == null) {
            throw new CouponCustomExceptions(new Date(), "There is no customer with that id.");
        }
        System.out.println(customerrepo.getOne(customerID));
        System.out.println("the customer's coupons are: ");
        TablePrinter.print(customerrepo.findById(customerID).getCoupons());
        //for (Coupon coupon2 : customerrepo.findById (customerID).get ().getCoupons ()) {
        //  System.out.println (coupon2);
        // }
        return customerrepo.getOne(customerID);

    }

    @Override
    /**
     * a methods that checks the validity of the admin's email and password and return a boolean answer
     */
    public boolean login(String email, String password) throws CouponCustomExceptions {
        if (!email.equalsIgnoreCase(adminEmail)) {
            throw new CouponCustomExceptions(new Date(), "You have typed wrong email. Try again.");
        }
        if (!password.equalsIgnoreCase(adminPass)) {
            throw new CouponCustomExceptions(new Date(), "You have typed wrong password. Try again.");
        }
        System.out.println("Admin login succeeded");
        return true;
    }


}
