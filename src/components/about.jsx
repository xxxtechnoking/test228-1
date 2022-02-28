import React from "react";

export const About = (props) => {

  return (
    <div id="about">
      <div className="container">
        <div className="section-title text-center">
          <h2>about us</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img
              src="img/projpic/about.gif"
              // className="img-responsive"
              alt=""
              style={{borderRadius:10}}
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>About mint?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
