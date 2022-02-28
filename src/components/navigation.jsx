export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
          <img href="#page-top" src="img/projpic/top-logo.png" className="navbar-brand page-scroll" alt="" />{" "}
          </a>{" "}
       
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#roadmap" className="page-scroll">
                roadmap
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                team
              </a>
            </li>
            <li>
              <a href="#faq" className="page-scroll">
                FAQ
              </a>
            </li>
            <li className="menu_li">
              <a
                href={
                  props.data
                    ? props.data.twitter
                    : "https://twitter.com/GEEKFANCYCLUB"
                }
                className="page-scroll"
              >
                <img
                  src="img/projpic/twitter.webp"
                  target="_blank"
                  style={{ height: 30, width: 30 }}
                  alt="pic"
                />
              </a>
            </li>
            <li className="menu_li">
              <a href={props.data ? props.data.youtube : "https://discord.gg/WV63gFDXuT"} className="page-scroll">
                <img
                  src="img/projpic/discord.webp"
                  style={{ height: 30, width: 30}}
                  alt="pic"
                />
              </a>
            </li>
            <li className="menu_li">
              <a href={props.data ? props.data.youtube : "/"} className="page-scroll">
                <img
                  src="img/projpic/opensea.png"
                  style={{ height: 30, width: 30 }}
                  alt="pic"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
