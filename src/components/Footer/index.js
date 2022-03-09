import "../Footer/footer.css";
import { Facebook, Twitter, LinkedIn, Instagram } from "@material-ui/icons";

export default function Footer() {
  return (
    <div style={{ marginTop: "30px" }}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">
              Managethatmoney.com <i>MAKE SAVING EASIER </i> is an initiative to
              help the upcoming generation with the managing their money.
              MoneyManagerfocuses on providing the most efficient savings or
              manager as the managing has to be simple. We will help people
              build up savings and spend their money well. We hope to help
              people getting a better insight on what they spend their money on.
              Let's get started and make you money more effiecient!
            </p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li>
                <a href="http://scanfcode.com/about/">About Us</a>
              </li>
              <li>
                <a href="http://scanfcode.com/contact/">Contact Us</a>
              </li>
              <li>
                <a href="http://scanfcode.com/contribute-at-scanfcode/">
                  Contribute
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">
              Copyright &copy; 2022 All Rights Reserved by MoneyManager B.V.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li>
                <a class="facebook" href="https://www.facebook.com/">
                  <Facebook />
                </a>
              </li>
              <li>
                <a class="twitter" href="https://twitter.com/?lang=nl">
                  <Twitter />
                </a>
              </li>
              <li>
                <a class="dribbble" href="https://www.instagram.com/">
                  <Instagram />{" "}
                </a>
              </li>
              <li>
                <a class="linkedin" href="https://nl.linkedin.com/">
                  <LinkedIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
