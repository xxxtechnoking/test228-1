import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Faq = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      id="faq"
      className="text-center"
    >
      <div className="container">
        <div className="section-title">
          <h2>FAQ</h2>
        </div>
      </div>
      <div className="faqchoice container">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="Accordion"
          sx={{
            marginBottom: "35px",
            color: "white",
            boxShadow: 1,
            border: 5,
            borderColor: "black",
            backgroundColor: "#0C1F6C",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0, color: "white" }}>
              What's an NFT?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              An NFT stands for “Non-fungible token” and is a fancy way of
              saying it’s a unique, one of a kind digital item that users can
              buy, own, and trade. Some NFTs main function are to be digital art
              and look cool, some offer additional utility like exclusive access
              to websites or participation in an event, think of it like a rare
              piece of art that can also act as a “members” card.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className="Accordion"
          sx={{
            marginBottom: "35px",
            color: "white",
            boxShadow: 1,
            border: 5,
            borderColor: "black",
            backgroundColor: "#0C1F6C",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0, color: "white" }}>
              Where does my NFT go after I purchase a GFC?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography  sx={{ color: "white" }}>
              Your Cool Cat NFT will appear in whatever address, You can see
              your GFC here from our website, View them on Opensea.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className="Accordion"
          sx={{
            marginBottom: "35px",
            color: "white",
            boxShadow: 1,
            border: 5,
            borderColor: "black",
            backgroundColor: "#0C1F6C",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0, color: "white" }}>
              What can I do with my GFC?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              You are free to do anything with them under a non-exclusive
              license.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          className="Accordion"
          sx={{
            marginBottom: "35px",
            color: "white",
            boxShadow: 1,
            border: 5,
            borderColor: "black",
            backgroundColor: "#0C1F6C",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0, color: "white" }}>
              Are GFC a good investment?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              That is ultimately a decision for you to make. We believe GFC nft
              have a long life ahead of them, and will be an ever growing and
              evolving project. Hopefully GFC go to the moon, but like anything
              in life, don’t spend money you can’t afford to not have.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          className="Accordion"
          sx={{
            marginBottom: "35px",
            color: "white",
            boxShadow: 1,
            border: 5,
            borderColor: "black",
            backgroundColor: "#0C1F6C",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0, color: "white" }}>
              What is Metamask?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              Metamask is a crypto wallet that can store your Ethereum, and is
              needed to purchase and mint a GFC. Having a wallet gives you an
              Ethereum address (i.e. 0xABCD….1234), this is where your NFT will
              be stored. Learn more about Metamask and how easy it is to use
              over here! https://metamask.io/
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
