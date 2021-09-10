import "./Footer.css"

function Copyright():JSX.Element{
    return(
      <div className="footer">
      <div className=" footer-container">
        <div className="row no-gutters">
          <div className="col-12 col-md-6 col-lg-6 d-flex">
            <div className="footer-item">
              <p className="footer-header">Get to Know Us</p>
              <ul className="footer-ul">
                <li className="footer-li">About elad  <img src="" alt="" /> </li>
                <li className="footer-li">About chen</li>
                <li className="footer-li">About david </li>
              </ul>
            </div>
            
            <div className="footer-item">
              <p className="footer-header">Doing Business</p>
              <ul className="footer-ul">
                <li className="footer-li">About us</li>
                <li className="footer-li">Let us help you</li>
                <li className="footer-li">Doing Business</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <div className="footer-store">
              <img
                src="./assets/app_store.png"
                className="app-store-logo"
                alt=""
              />
              <img
                src="./assets/google_store.png"
                className="app-store-logo"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>






        // <div className="copyright">
            

        //     <br />
        //     &copy;All rights reserved to "coupons 'r' us" Ltd.
        
        // </div>
       
    );
}

export default Copyright;