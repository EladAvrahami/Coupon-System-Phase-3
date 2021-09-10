package com.ChenAndEladCoupons2.ChenAndEladCoupons2.Services;

import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Company;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Coupon;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Beans.Customer;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Exceptions.CouponCustomExceptions;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Companyrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Couponrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.Repositories.Customerrepo;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.enums.Category;
import com.ChenAndEladCoupons2.ChenAndEladCoupons2.util.TablePrinter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
/**
 * a Service that allows the user to send orders to the DB as a facade
 */
public class CompanyService implements ClientService {

    @Autowired
    Companyrepo companyrepo;
    @Autowired
    Couponrepo couponrepo;
    @Autowired
    Customerrepo customerrepo;
    Company companyLoggedIn;


    public Company getCompanyLoggedIn() {
        return companyLoggedIn;
    }

    /**
     * a method that adds a Coupon to the Coupon table in the DB
     *
     * @param coupon the Coupon we want to add
     * @return boolean answer true if the Coupon was added ,or false.
     */
    public boolean addCoupon(Coupon coupon) throws CouponCustomExceptions {
        Coupon retObject = null;
        if (couponrepo.findByTitle(coupon.getTitle()) != null) {
            System.out.println("cant add this coupon since the title already exists ");
            throw new CouponCustomExceptions(new Date(), "* There's already a coupon with this title in your company.");
        }
        retObject = couponrepo.save(coupon);
        retObject.getId();
        List<Coupon> coupons = companyLoggedIn.getCoupons();
        coupons.add(coupon);
        companyLoggedIn.setCoupons(coupons);
        companyrepo.save(companyLoggedIn);
        System.out.println("coupon number :" + coupon.getId() + " was added");
        return true;
    }

    /**
     * Adds a list of coupons to a company. First checks that the company exists at the DB (by id)
     *
     * @param companyId - The id of the Company object.
     * @param coupons   - A list of Coupons objects.
     * @throws CouponCustomExceptions - 1. If there is no company with that id
     *                                - 2. If a coupon already exists at this company.
     * @throws CouponCustomExceptions - If the end date of this coupon has already passed.
     */
    public void addCouponsListToCompany(int companyId, List<Coupon> coupons) throws CouponCustomExceptions {
        if (!companyrepo.existsById(companyId)) {
            throw new CouponCustomExceptions(new Date(), "Company does NOT exist.");
        }
        Company company = companyrepo.findById(companyId);
        for (Coupon coupon : coupons) {
            if (company.getCoupons().contains(coupon)) {
                throw new CouponCustomExceptions(new Date(), "* Coupon " + coupon.getTitle() + " already exists in your company.");
            }
            if (coupon.getEndDate().before(new Date())) {
                throw new CouponCustomExceptions(new Date(), "* Coupon " + coupon.getTitle() + " has expired and can't be added.");
            }
        }
        company.setCoupons(coupons);
        companyrepo.save(company);
    }

    /**
     * Adds a list of coupons to the DB, only if the coupons don't already exist there (checks by
     * companyId and title).
     *
     * @param coupons - A list of coupons.
     * @throws CouponCustomExceptions - When a coupon already exists at the DB.
     */
    public void addCouponsListToDB(List<Coupon> coupons) throws CouponCustomExceptions {
        for (Coupon coupon : coupons) {
            if (couponrepo.findByTitleAndCompanyID(coupon.getTitle(), coupon.getCompanyID()) != null) {
                throw new CouponCustomExceptions(new Date(), "* Coupon " + coupon.getTitle() + " already exists in the DB.");
            }
            couponrepo.save(coupon);
        }
    }

    /**
     * a method that updates Coupon's details
     *
     * @param coupon the Coupon we want to update
     * @throws CouponCustomExceptions an exception that operates when an error occures
     */
    public void updateCoupon(Coupon coupon) throws CouponCustomExceptions {
        couponrepo.save(coupon);
        System.out.println("coupon number " + coupon.getId() + " was updated");
    }


    /**
     * a method that deletes a Coupon from the Coupon table in the DB
     *
     * @return boolean answer true if the Coupon was deleted ,or false.
     */
    public boolean deleteCoupon(int id) throws CouponCustomExceptions {
        if (!couponrepo.existsById(id)) {
            System.out.println("Coupon " + id + " does not exist.");
            throw new CouponCustomExceptions(new Date(), "* Coupon does not exist.");
        }
        couponrepo.deleteByCouponId(id);
        couponrepo.deleteByCouponsId(id);
        couponrepo.deleteById(id);
        System.out.println("coupon number " + id + " was deleted");
        return true;
    }

    /**
     * a method that gets and prints all the Coupons that belongs to the Company
     *
     * @return a list of Coupons
     */
    public List<Coupon> getAllCouponsPerCompany() throws CouponCustomExceptions {
        if (companyLoggedIn == null) {
            throw new CouponCustomExceptions(new Date(), "* There's no company logged-in.");
        }
        Company companyLI = companyrepo.getOne(companyLoggedIn.getId());
        TablePrinter.print(companyLI.getCoupons());
        //for (Coupon coupon2 : companyrepo.findCompanyById (companyID).getCoupons ()) {
        // TablePrinter.print (coupon2);
        //}
        return companyLI.getCoupons();
    }

    public Company getCompanyThatLoggedIn() {
        System.out.println(companyrepo.findById(companyLoggedIn.getId()));
        System.out.println("-----------------------------------------------------------------------");
        for (Coupon coupon : companyrepo.findById(companyLoggedIn.getId()).getCoupons()) {
            int num = 1;
            System.out.println("coupon number " + num + "\n" + coupon);
            num += 1;
            System.out.println("-------------------------------------------------------------------");
        }
        return companyrepo.findById(companyLoggedIn.getId());
    }

    public List<Coupon> getAllCouponsPerCompany(int id) throws CouponCustomExceptions {
        if (!companyrepo.existsById(id)) {
            throw new CouponCustomExceptions(new Date(), "* There's no coupon with that id.");
        }
        Company company = (companyrepo.getOne(id));
        TablePrinter.print(company.getCoupons());
        //for (Coupon coupon2 : companyrepo.findCompanyById (companyID).getCoupons ()) {
        // TablePrinter.print (coupon2);
        //}
        return company.getCoupons();
    }

    /**
     * a method that gets and prints all the Coupons that belongs to the Company by a specific category
     *
     * @param companyID the id of specific company by which we identify the Company
     * @param category  the enum item that we want to filter the Coupon list by.
     * @return a list of Coupons
     */
    public List<Coupon> getAllCouponsByCategoryPerCompany(int companyID, Category category) throws CouponCustomExceptions {
        if (!companyrepo.existsById(companyID)) {
            throw new CouponCustomExceptions(new Date(), "* There's NO company with this id.");
        }
        if (couponrepo.findByCategory(category) == null) {
            throw new CouponCustomExceptions(new Date(), "* There's NO such category.");
        }
        TablePrinter.print(couponrepo.findAllByCompanyIDAndCategory(companyID, category));
        //for (Coupon coupon2 : couponrepo.findAllByCompanyIDAndCategory (companyID, category)) {
        //    System.out.println (coupon2);
        //}
        return couponrepo.findAllByCompanyIDAndCategory(companyID, category);
    }

    /**
     * a method that gets and prints all the Coupons that belongs to the Company by price
     *
     * @param companyID the id of specific company by which we identify the Company
     * @param maxPrice  the high price that we filter the list by
     * @return a list of Coupons
     */
    public List<Coupon> getAllCouponsByPricePerCompany(int companyID, double maxPrice) throws CouponCustomExceptions {
        if (!companyrepo.existsById(companyID)) {
            throw new CouponCustomExceptions(new Date(), "* There's NO company with this id.");
        }
        if (maxPrice < 0) {
            throw new CouponCustomExceptions(new Date(), "* The price must be positive.");
        }
        List<Coupon> byMaxPrice = new ArrayList<>();
        Company companyLi = (companyrepo.getOne(companyID));
        for (Coupon coupon : companyLi.getCoupons()) {
            if (coupon.getPrice() <= maxPrice) {
                TablePrinter.print(coupon);
                byMaxPrice.add(coupon);
            }
        }
        return byMaxPrice;
    }

    @Override
    /**
     * a methods that checks the validity of the Company's email and password and return a boolean answer
     */
    public boolean login(String email, String password) throws CouponCustomExceptions {
        if (companyrepo.findByEmail(email) == null) {
            System.out.println("login wrong - please try again");
            throw new CouponCustomExceptions(new Date(), "You have typed wrong email. Try again");
        }
        if (companyrepo.findByPassword(password) == null) {
            System.out.println("login wrong - please try again");
            throw new CouponCustomExceptions(new Date(), "You have typed wrong password. Try again.");
        }
        companyLoggedIn = companyrepo.findByEmailAndPassword(email, password);
        return true;
    }

    public List<Coupon> getAllCoupons() {
        try {
            return couponrepo.findAll();
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        return null;
    }
}
